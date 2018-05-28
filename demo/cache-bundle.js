const enableCacheBundle = true;
if (enableCacheBundle) {
  if (self.constructor.name === 'ServiceWorkerGlobalScope') {
    const cacheBundleURL = new URL('cache-bundle.json', hook.parameters.baseURI);
    const saveURL = new URL('errorReport.json', hook.parameters.baseURI);
    const PSEUDO_URL_PREFIX = 'https://thin-hook.localhost.localdomain/';
    const CACHE_STATUS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/cache-status.json';
    const DEFAULT_VERSION = '1'
    const version = 'version_' + (new URL(location.href).searchParams.get('version') || DEFAULT_VERSION);

    const loadCache = async function loadCache(cache) {
      let response = await fetch(cacheBundleURL.href);
      if (!response.ok) {
        // failed to fetch cache bundle
        console.error('cache-bundle.js: failed to fetch cache bundle ', cacheBundleURL.href, ' status ', response.status, ' statusText ', response.statusText);
        return false;
      }
      let cacheBundle = JSON.parse(await response.text());
      let baseURI = hook.parameters.baseURI;
      if (cacheBundle.version === version) {
        for (let key in cacheBundle) {
          if (key === 'version') {
            continue;
          }
          let url = new URL(key, baseURI);
          let extension = url.pathname.match(/([.][a-z]*)$/)[1];
          let contentType;
          switch (extension) {
          case '.js':
            contentType = 'text/javascript';
            break;
          case '.html':
            contentType = 'text/html';
            break;
          case '.json':
            contentType = 'application/json';
            break;
          case '.svg':
            contentType = 'image/svg+xml';
            break;
          default:
            contentType = 'text/plain';
            break;
          }
          cache.put(new Request(new URL(key, baseURI).href), new Response(cacheBundle[key], { headers: {'Content-Type': contentType} }));
        }
        return true;
      }
      else {
        // version mismatch
        // discard the cache bundle
        console.error('cache-bundle.js: cacheBundle.version ', cacheBundle.version, ' !== current version ', version);
        return false;
      }
    };

    const uploadCacheBundle = async function uploadCacheBundle(cacheBundle) {
      let data = {
        type: 'cache-bundle.json',
        data: JSON.stringify(cacheBundle,null,0),
      };
      //console.log('uploadCacheBundle', JSON.stringify(data, null, 2));
      let saveURLResponseJSON;
      try {
        let saveURLResponse = await fetch(saveURL, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(data,null,0),
          mode: 'same-origin',
          cache: 'no-cache',
        });
        if (!saveURLResponse.ok) {
          // failed to upload cache bundle
          console.error('cache-bundle.js: failed to upload cache bundle ', saveURL.href, ' status ', saveURLResponse.status, ' statusText ', saveURLResponse.statusText);
          throw new Error('failed to upload cache bundle URL: ' + saveURL.href + ' status: ' + saveURLResponse.status + ' statusText: ' + saveURLResponse.statusText);
        }
        let saveURLResponseText = await saveURLResponse.text();
        saveURLResponseJSON = JSON.parse(saveURLResponseText) || {};
      }
      catch (e) {
        saveURLResponseJSON = {
          status: 'error',
          message: e.message,
        };
      }
      finally {
        switch (saveURLResponseJSON.status) {
        case 'ok':
          return true;
        default:
          return false;
        }
      }
    };

    const saveCache = async function saveCache(cache) {
      let requests = await cache.keys();
      let cacheBundle = { version: version };
      let baseURI = hook.parameters.baseURI;
      let origin = new URL(baseURI).origin;

      for (let request of requests) {
        if (request.url.startsWith(cacheBundleURL.href) || request.url.startsWith(PSEUDO_URL_PREFIX)) {
          continue;
        }
        let response = await cache.match(request);
        let text = await response.text();
        let url = new URL(request.url, baseURI);
        let key = origin === url.origin ? url.pathname : request.url;
        cacheBundle[key] = text;
      }

      return await uploadCacheBundle(cacheBundle);
    };

    const cacheBundle = async function cacheBundle() {
      try {
        let cache = await caches.open(version);
        let cacheStatus = { status: 'load' }; // default cacheStatus
        let cacheStatusResponse = await cache.match(CACHE_STATUS_PSEUDO_URL);
        if (cacheStatusResponse) {
          cacheStatus = JSON.parse(await cacheStatusResponse.text());
        }
        switch (cacheStatus.status) {
        default:
        case 'load': // cache-bundle.json -> Cache
          if (self.cacheBundleLoading) {
            break;
          }
          self.cacheBundleLoading = true;
          await loadCache(cache); // race condition with hook.min.js
          cacheStatus.status = 'loaded';
          await cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json' }}));
          self.cacheBundleLoading = false;
          break;
        case 'loaded': // loadCache() done; additional hook.min.js -> Cache if necessary
          // no operations
          break;
        case 'reset': // reset the cache
          // Note: Other loading processes are in progress and the cache is being updated in parallel
          await caches.delete(version);
          break;
        case 'save': // Cache -> cache-bundle.json
          await saveCache(cache);
          // transition to 'loaded' status
          cacheStatus.status = 'loaded';
          await cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json' }}));
          break;
        }
      }
      catch (e) {
        console.error('cache-bundle.js: exception ', e);
      }
    };

    self.addEventListener('message', function cacheBundleMessageHandlerForServiceWorker (event) {
      if (Array.isArray(event.data) && event.data[0] === 'plugin' && event.data[1] === 'cacheBundle') {
        if (event.data[2] === 'trigger') {
          cacheBundle();
        }
      }
    });

    const originalCheckRequest = hook.parameters.checkRequest;
    hook.parameters.checkRequest = function (event, response, cache) {
      if (self.cacheBundleLoading && !response) {
        return new Promise((resolve, reject) => {
          let intervalId = setInterval(() => {
            if (!self.cacheBundleLoading) {
              clearInterval(intervalId);
              if (originalCheckRequest) {
                //console.log('cache-bundle.js: waited for bundled caching for ' + event.request.url);
                cache.match(event.request).then((_response) => {
                  resolve(originalCheckRequest(event, _response, cache));
                });
              }
              else {
                resolve(response);
              }
            }
          }, 100);
        });
      }
      else {
        if (originalCheckRequest) {
          return originalCheckRequest(event, response, cache);
        }
        else {
          return response;
        }
      }
    }

    cacheBundle();
  }
  else if (self.constructor.name === 'Window' && top === self) {
    const CACHE_STATUS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/cache-status.json';
    const AUTOMATION_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/automation.json';
    const PSEUDO_URL_PREFIX = 'https://thin-hook.localhost.localdomain/';
    const DEFAULT_VERSION = '1';
    const DEFAULT_HOOK_NAME = '__hook__';
    const DEFAULT_CONTEXT_GENERATOR_NAME = 'method';
    const href = location.href;
    const hookJsURL = new URL(document.querySelector('script').src, href);
    const version = 'version_' + hookJsURL.searchParams.get('version') || DEFAULT_VERSION;
    const hookName = hookJsURL.searchParams.get('hook-name') || DEFAULT_HOOK_NAME;
    const contextGeneratorName = hookJsURL.searchParams.get('context-generator-name') || DEFAULT_CONTEXT_GENERATOR_NAME;
    const serviceWorkerReady = hookJsURL.searchParams.get('service-worker-ready') === 'true';
    const currentScript = document.currentScript;
    const automation = async function automation(status) {
      /*
        status = {
          state: 'init',
          serverSecret: '459a3f38a12c261ae88bcac370c63ba9c31125733d50484650566865433f5694',
          script: 'async function automationFunction() {}'
        }
      */
      const scriptURL = new URL(currentScript.src, href);
      const authorization = scriptURL.searchParams.get('authorization');
      let hash = hook.utils.createHash('sha256');
      hash.update(status.serverSecret + status.script);
      let digest = hash.digest('hex');
      if (digest === authorization) {
        // script is authorized
        const automationFunction = hook.Function(Symbol.for(hookName), [[ AUTOMATION_PSEUDO_URL, {} ]], contextGeneratorName)
          ('version', 'href', 'status', 'return ' + status.script)(version, href, status);
        //console.log('cache-bundle.js: automationFunction: ' + automationFunction.toString());
        const automationFunctionResultName = '__' + status.serverSecret + '__';
        const automationFunctionWrapper = async function automationFunctionWrapper() {
          try {
            // clear cache
            let automationStatus = JSON.parse(await (await (await caches.open(version)).match(AUTOMATION_PSEUDO_URL)).text());
            if (automationStatus.state === 'init') {
              let cache = await caches.open(version);
              let keys = await cache.keys();
              for (let key of keys) {
                if (key.url.startsWith(PSEUDO_URL_PREFIX)) {
                  continue;
                }
                await cache.delete(key);
              }
              automationStatus.state = 'cleaned';
              //console.log('cache-bundle.js: cleaned caches');
              await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json' }}));
              await new Promise(resolve => setTimeout(resolve, 5000));
              location.reload();
            }

            // automate navigation
            await automationFunction();
            //console.log('cache-bundle.js: automationFunction() exited');

            // collect cache
            let result = await (async function cacheBundle() {
              const target = 'cache-bundle.json';
              const cacheBundleURL = new URL(target, hook.parameters.baseURI);
              const DEFAULT_VERSION = '1'
              const version = 'version_' + (new URL(document.querySelector('script').src, location.href).searchParams.get('version') || DEFAULT_VERSION);
              let cache = await caches.open(version);
              let requests = await cache.keys();
              let cacheBundle = { version: version };
              let baseURI = hook.parameters.baseURI;
              let origin = new URL(baseURI).origin;

              for (let request of requests) {
                if (request.url.startsWith(cacheBundleURL.href) || request.url.startsWith(PSEUDO_URL_PREFIX)) {
                  continue;
                }
                let response = await cache.match(request);
                let text = await response.text();
                let url = new URL(request.url, baseURI);
                let key = origin === url.origin ? url.pathname : request.url;
                cacheBundle[key] = text;
              }
              return JSON.stringify(cacheBundle, null, 0);
            })();
            //console.log('cache-bundle.js: collected raw cache bundle');

            automationStatus.state = 'done';
            await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json' }}));
            //console.log('cache-bundle.js: done');
            return result;
          }
          catch (e) {
            //console.log('cache-bundle.js: error ', e);
            return e.message;
          }
        };
        console.log('cache-bundle.js: calling automationFunctionWrapper()');
        const automationFunctionResult = await automationFunctionWrapper();
        console.log('cache-bundle.js: automationFunctionWrapper() exited with ', automationFunctionResult);
        Object.defineProperty(window, automationFunctionResultName, {
          configurable: true,
          enumerable: false,
          get: function get() {
            delete window[automationFunctionResultName];
            return automationFunctionResult;
          }
        });
      }
      else {
        // script is not authorized
        await caches.delete(version); // clear the caches
        location = 'about:blank';
      }
    };
    const watcher = async function watcher() {
      let intervalId = setInterval(async function () {
        let cache = await caches.open(version);
        let cacheStatus;
        let cacheStatusResponse = await cache.match(CACHE_STATUS_PSEUDO_URL);
        if (cacheStatusResponse) {
          cacheStatus = JSON.parse(await cacheStatusResponse.text());
        }
        if (!cacheStatus || cacheStatus.status !== 'loaded') {
          return;
        }
        clearInterval(intervalId);
        let automationStatus;
        let automationResponse = await cache.match(AUTOMATION_PSEUDO_URL);
        if (automationResponse) {
          automationStatus = JSON.parse(await automationResponse.text());
        }
        if (automationStatus) {
          await automation(automationStatus);
        }
      }, 1000);
    };
    if (serviceWorkerReady) {
      window.addEventListener('load', function onLoad(event) {
        window.removeEventListener('load', onLoad);
        watcher();
      });
    }
    let status = new URL(location.href).searchParams.get('cache-bundle');
    if (status) {
      let cacheStatus = { status: status };
      caches.open(version).then(cache => {
        cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json' }}))
          .then(() => {
            navigator.serviceWorker.controller.postMessage(['plugin', 'cacheBundle', 'trigger'], []); // one-way message
          })
      });
    }
  }
}