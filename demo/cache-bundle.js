const enableCacheBundle = true;
if (hook.parameters[Symbol.for('cache-bundle.js')]) {
  // skip reinstalling the plugin
}
else if (enableCacheBundle) {
  hook.parameters[Symbol.for('cache-bundle.js')] = true;
  // optional significantHeaders to include certain headers in cache response headers
  hook.parameters.significantHeaders = {
    //'Last-Modified': true,
  };
  hook.parameters.cacheableContentTypes = {
    // Note: text/html, text/javascript, image/svg+xml must not be included here
    'text/css': true,
    'image/png': true,
    'application/json': true, // for targeted URLs
  };
  hook.parameters.validateCacheableUrl = (url, contentType) => {
    let _url = new URL(url);
    if (_url.hostname === location.hostname) {
      // contentType has been normalized by eliminating the trailing '; charset=utf-8'
      if (contentType === 'application/json') {
        // targeted Content-Type URL pairs
        return _url.pathname.startsWith('/components/thin-hook/demo/locales/'); // with static JSON contents
      }
      else {
        // other contents
        return _url.pathname.startsWith('/components/');
      }
    }
    else {
      // from CDNs
      return _url.href.match(/^(https:[/][/]cdnjs[.]cloudflare[.]com[/]ajax[/]libs[/]|https:[/][/]fonts[.]googleapis[.]com[/]css)/);
    }
  };
  const cacheBundleURL = new URL('cache-bundle.json', hook.parameters.baseURI);
  const saveURL = new URL('errorReport.json', hook.parameters.baseURI);
  const PSEUDO_URL_PREFIX = 'https://thin-hook.localhost.localdomain/';
  const CACHE_STATUS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/cache-status.json';
  const AUTOMATION_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/automation.json';

  const toBase64 = function toBase64(data) {
    return btoa(String.fromCodePoint(...new Uint8Array(data)));
  }
  const toHex = function (data) {
    let result = '';
    let view = new DataView(data);
    for (let i = 0; i < data.byteLength; i++) {
      result += view.getUint8(i).toString(16).padStart(2, '0');
    }
    return result;
  }

  const getCacheStatus = async function getCacheStatus(cache) {
    let cacheStatus;
    try {
      let cacheStatusResponse = await cache.match(CACHE_STATUS_PSEUDO_URL);
      if (cacheStatusResponse && cacheStatusResponse.headers.get('User-Agent') === navigator.userAgent) {
        cacheStatus = JSON.parse(await cacheStatusResponse.text());
      }
      else {
        let promises = []
        for (let request of await cache.keys()) {
          promises.push(cache.delete(request));
        }
        await Promise.all(promises);
      }
    }
    catch (e) {
    }
    return cacheStatus;
  }

  const loadCache = async function loadCache(cache, version, initialStatus) {
    let integrity, secureFetch;
    if (hook.parameters.integrityReady instanceof Promise) {
      ({ integrity, secureFetch } = await hook.parameters.integrityReady);
      if (version !== integrity.version) {
        console.error('cache-bundle.js: version mismatch with integrity.version', version, integrity.version);
        return false;
      }
    }
    if (!await cache.match(AUTOMATION_PSEUDO_URL)) {
      if (initialStatus !== 'load') {
        let cacheStatus = await getCacheStatus(cache);
        if (cacheStatus && cacheStatus.status) {
          // caches for the current version exist or are being loaded
          // skip fetching cache-bundle.json since there is nothing more to do
          //console.log('cache-bundle.js: loadCache skip fetching cache-bundle.json; cacheStatus.status = ' + cacheStatus.status);
          let trials = 0;
          while (!(cacheStatus && cacheStatus.status === 'loaded')) {
            await new Promise(resolve => setTimeout(resolve, 100)); // sleep 100ms
            cacheStatus = await getCacheStatus(cache);
            trials++;
            if (trials > 300) { // 30 seconds = 100ms * 300
              break;
            }
          }
          if (trials <= 300) {
            return true;
          }
          else {
            console.error('cache-bundle.js: loadCache timed out waiting for loaded status set by other tabs');
          }
        }
      }
    }
    let response = await (secureFetch || fetch)(cacheBundleURL.href);
    if (!response.ok) {
      // failed to fetch cache bundle
      console.error('cache-bundle.js: failed to fetch cache bundle ', cacheBundleURL.href, ' status ', response.status, ' statusText ', response.statusText);
      return false;
    }
    const clone = response.clone();
    let cacheBundle = JSON.parse(await response.text());
    let baseURI = hook.parameters.baseURI;
    if (hook.parameters.integrityReady instanceof Promise) {
      //console.log('cache-bundle.js: integrity ' + hook.parameters.integrity.version + ' is ready');
      if (hook.parameters.integrity.version !== version) {
        // version mismatch
        // discard the cache bundle
        console.error('cache-bundle.js: integrity.version ', hook.parameters.integrity.version, ' !== current version ', version);
        return false;
      }
      const arrayBuffer = await clone.arrayBuffer();
      const hash = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const digest = toBase64(hash);

      let cacheBundleIntegrity =  hook.parameters.integrity[cacheBundleURL.pathname];
      if (typeof cacheBundleIntegrity !== 'string') {
        if (typeof hook.parameters.integrity[AUTOMATION_PSEUDO_URL] === 'string') {
          let status = JSON.parse(hook.parameters.integrity[AUTOMATION_PSEUDO_URL]);
          const scriptURL = new URL(Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src && s.src.match(/\/cache-bundle.js/))[0].src, baseURI);
          const authorization = scriptURL.searchParams.get('authorization');
          const authorizationHash = await crypto.subtle.digest('SHA-256', new TextEncoder("utf-8").encode(status.serverSecret + status.script));
          const authorizationDigest = toHex(authorizationHash);
          if (authorizationDigest === authorization) {
            cacheBundleIntegrity = digest; // cache-bundle.json generation is in progress
          }
        }
        else {
          // invalid integrity for cache-bundle.json
          // discard the cache bundle
          console.error('cache-bundle.js: invalid integrity["' + cacheBundleURL.pathname + '"] ', cacheBundleIntegrity);
          return false;
        }
      }

      if (cacheBundleIntegrity === digest) {
        //console.log('cache-bundle.js: ' + version + ' integrity matched for ' + cacheBundleURL.pathname);
      }
      else {
        console.error('cache-bundle.js: ' + version + ' integrity not matched for ', cacheBundleURL.pathname, cacheBundleIntegrity, digest);
        return false;
      }
    }
    if (cacheBundle.version === version) {
      let promises = [];
      for (let key in cacheBundle) {
        if (key === 'version') {
          continue;
        }
        let url = new URL(key, baseURI);
        let match = url.pathname.match(/([.][a-z0-9_]*)$/);
        let extension = match ? match[1] : '';
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
        let content = cacheBundle[key];
        let body = content;
        let headers = {
          'Content-Type': contentType
        };
        /*
          Note: Metadata format
            cacheBundle = {
              "version": "version_123", // cache version
              "url?param=1": "body in string", // concise format for string data for .js, .html, .json, .svg; equivalent to { "body": "body in string", "Content-Type": "{type}" }
              "url?param=2": {
                "Location": "url?param=1", // link to the other content
                "Location": "data:image/jpeg;base64,...", // encoded body data; Note: "Location" appears only once in a metadata object, of course
                // If Non-dataURI "Location" exists, other metadata entries are ignored
                "Content-Type": "text/xml", // MIME type
                "body": "body in string", // content body
                "Other-Headers": "header value", // HTTP headers
              },
            }
        */
        if (typeof content === 'object') {
          // handle metadata
          while (typeof content === 'object') {
            let value;
            let _content = content;
            if (value = content['Location']) {
              if (value.startsWith('data:')) {
                let match = value.match(/^data:([^,; ]*)(;[^, ]*)?,(.*)$/);
                if (match) {
                  contentType = match[1];
                  if (match[2] === ';base64') {
                    body = fetch(value).then(res => res.blob());
                    content = undefined;
                  }
                  else {
                    body = match[3];
                    content = undefined;
                  }
                  headers['Content-Type'] = contentType;
                }
                else {
                  console.error('cache-bundle.js: discarding malformatted data URL in Location', value);
                  content = undefined;
                  body = undefined;
                }
              }
              else {
                let link = value;
                body = cacheBundle[link];
                content = body;
                continue;
              }
            }
            for (let header in _content) {
              switch (header) {
              case 'Location':
              case 'body':
                break;
              default:
                headers[header] = _content[header];
                break;
              }
            }
            if (typeof _content.body === 'string') {
              body = _content.body;
              content = undefined;
            }
          }
        }
        if (typeof body !== 'undefined') {
          if (body instanceof Promise) {
            promises.push(body.then(_body => cache.put(new Request(new URL(key, baseURI).href), new Response(_body, { headers: headers }))));
          }
          else {
            promises.push(cache.put(new Request(new URL(key, baseURI).href), new Response(body, { headers: headers })));
          }
        }
      }
      await Promise.all(promises);
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
    console.log('uploadCacheBundle', JSON.stringify(data, null, 2));
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

  const generateCacheBundleEntry = async function generateCacheBundleEntry(cacheBundle, request, response, baseURI) {
    let origin = new URL(baseURI).origin;
    let url = new URL(request.url, baseURI);
    let match = url.pathname.match(/([.][a-z0-9]*)$/);
    let extension = match ? match[1] : '';
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
      break;
    }
    if (contentType) {
      // concise format
      // Note: Redundant body data are NOT processed here
      let text = await response.text();
      let key = origin === url.origin ? request.url.substring(origin.length) : request.url;
      let significantHeaders = hook.parameters.significantHeaders;
      let content = text;
      if (significantHeaders && Object.keys(significantHeaders).length > 0) {
        let headers = response.headers;
        for (let name in significantHeaders) {
          if (headers.has(name)) {
            if (typeof content === 'string') {
              content = {
                'Content-Type': contentType,
                body: content,
              };
            }
            content[name] = headers.get(name);
          }
        }
      }
      cacheBundle[key] = content;
    }
    else {
      // metadata format
      let content = {};
      let headers = response.headers;
      contentType = headers.get('Content-Type');
      content['Content-Type'] = contentType;
      if (contentType.startsWith('text/') || contentType.match(/^application[/](xml|javascript)/)) {
        content['body'] = await response.text();
      }
      else {
        // data URL
        let blob = await response.blob();
        content['Location'] = await new Promise(resolve => {
          let reader = new FileReader();
          reader.addEventListener('loadend', () => {
            // Note: readAsDataURL returns data:application/octet-stream;base64,...
            resolve(reader.result.replace(/^data:([^;]*);base64,/, `data:${contentType};base64,`));
          });
          reader.readAsDataURL(blob);
        });
      }
      let significantHeaders = hook.parameters.significantHeaders;
      if (significantHeaders && Object.keys(significantHeaders).length > 0) {
        let headers = response.headers;
        for (let name in significantHeaders) {
          if (headers.has(name)) {
            content[name] = headers.get(name);
          }
        }
      }
      let key = origin === url.origin ? request.url.substring(origin.length) : request.url;
      cacheBundle[key] = content;
    }
  }

  const saveCache = async function saveCache(cache, version) {
    let requests = await cache.keys();
    let cacheBundle = { version: version };
    let baseURI = hook.parameters.baseURI;
    let origin = new URL(baseURI).origin;

    for (let request of requests) {
      if (request.url.startsWith(cacheBundleURL.href) || request.url.startsWith(PSEUDO_URL_PREFIX)) {
        continue;
      }
      let response = await cache.match(request);
      await generateCacheBundleEntry(cacheBundle, request, response, baseURI);
    }

    return await uploadCacheBundle(cacheBundle);
  };

  const cacheBundle = async function cacheBundle(version, halt, initialStatus) {
    let cacheStatus = { status: initialStatus || 'load' }; // default cacheStatus
    try {
      let cache = await caches.open(version);
      let cacheStatusResponse = await cache.match(CACHE_STATUS_PSEUDO_URL);
      if (cacheStatusResponse && cacheStatusResponse.headers.get('User-Agent') === navigator.userAgent) {
        cacheStatus = JSON.parse(await cacheStatusResponse.text());
      }
      else {
        await caches.delete(version);
        cache = await caches.open(version);
      }
      switch (cacheStatus.status) {
      default:
      case 'load': // transition to loading state
        await caches.delete(version); // delete the empty cache temporarily
        cache = null;
        if (document.prerendering) {
          console.log(`cache-bundle.js: awaiting while document is in prerendering`);
          await new Promise((resolve, reject) => {
            let listener;
            document.addEventListener('prerenderingchange', listener = () => {
              if (!document.prerendering) {
                document.removeEventListener('prerenderingchange', listener);
                resolve();
              }
            });
          });
        }
        const action = await new Promise((resolve, reject) => {
          if (hook.parameters.actionOnPrerenderingChange) {
            resolve(hook.parameters.actionOnPrerenderingChange);
          }
          else {
            let listener;
            document.addEventListener('action-on-prerenderingchange', listener = (event) => {
              document.removeEventListener('action-on-prerenderingchange', listener);
              resolve(event.detail.name);
            });
          }
        });
        switch (action) {
        case 'resume':
        default:
          cache = await caches.open(version);
          break;
        case 'reload':
          await new Promise((resolve, reject) => { /* never settles */ });
          break;
        }
        cacheStatus.status = 'loading';
        await cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }}));
        break;
      case 'loading': // cache-bundle.json -> Cache
        if (await loadCache(cache, version, initialStatus)) {
          cacheStatus.status = 'loaded';
        }
        else {
          cacheStatus.status = 'error';
        }
        await cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }}));
        break;
      case 'loaded': // loadCache() done; additional hook.min.js -> Cache if necessary
        break;
      case 'error': // error in loadCache()
        if (typeof halt === 'function') {
          await halt();
        }
        break;
      case 'reset': // reset the cache
        // Note: Other loading processes are in progress and the cache is being updated in parallel
        await caches.delete(version);
        break;
      case 'save': // Cache -> cache-bundle.json
        await saveCache(cache, version);
        // transition to 'loaded' status
        cacheStatus.status = 'loaded';
        await cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }}));
        break;
      }
      if (typeof hook.parameters.cacheBundleResolve === 'function' && cacheStatus.status === 'loaded') {
        hook.parameters.cacheBundleResolve();
        hook.parameters.cacheBundleResolve = null;
      }
      if (typeof hook.parameters.cacheBundleReject === 'function' && cacheStatus.status === 'error') {
        hook.parameters.cacheBundleReject();
        hook.parameters.cacheBundleReject = null;
      }
    }
    catch (e) {
      console.error('cache-bundle.js: exception ' + e.message);
      if (typeof hook.parameters.cacheBundleReject === 'function') {
        hook.parameters.cacheBundleReject(e);
        hook.parameters.cacheBundleReject = null;
        cacheStatus.status = 'error';
      }
    }
    return 'cacheBundle("' + version + '", "' + cacheStatus.status + '")';
  };

  if (self.constructor.name === 'ServiceWorkerGlobalScope') {
    if (hook.parameters.cacheableContentTypes && Object.values(hook.parameters.cacheableContentTypes).length > 0) {
      const originalCheckResponse = hook.parameters.checkResponse;
      const cacheableContentTypes = hook.parameters.cacheableContentTypes;
      const validateCacheableUrl = hook.parameters.validateCacheableUrl;
      hook.parameters.checkResponse = async function additionalCaching(event, request, response, cache) {
        if (originalCheckResponse) {
          response = await originalCheckResponse(event, request, response, cache);
        }
        if (request.method === 'GET' && response.status === 200) {
          let headers = response.headers;
          let contentType = headers.get('Content-Type').split(';')[0];
          if (cacheableContentTypes[contentType]) {
            let isCacheableUrl = false;
            if (validateCacheableUrl) {
              isCacheableUrl = validateCacheableUrl(request.url, contentType);
            }
            else {
              isCacheableUrl = true;
            }
            if (isCacheableUrl) {
              cache.put(request, response.clone());
            }
          }
        }
        return response;
      }
    }
  }
  if (self.constructor.name === 'Window' && top === self) {
    const createHash = hook.utils.createHash;
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
      let hash = createHash('sha256');
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
              console.log('cache-bundle.js: cleaned caches');
              await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }}));
              await new Promise(resolve => setTimeout(resolve, 5000));
              location.reload();
            }

            // automate navigation
            console.log('cache-bundle.js: calling automationFunction()');
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
                await generateCacheBundleEntry(cacheBundle, request, response, baseURI);
              }
              return JSON.stringify(cacheBundle, null, 0);
            })();
            //console.log('cache-bundle.js: collected raw cache bundle');

            automationStatus.state = 'done';
            await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }}));
            //console.log('cache-bundle.js: done');
            return result;
          }
          catch (e) {
            //console.log('cache-bundle.js: error ', e);
            return e.name + ' ' + e.message + '\n' + e.stack;
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
      let inProcessing = false;
      let intervalId = setInterval(async function () {
        if (inProcessing) {
          return;
        }
        inProcessing = true;
        let cache = await caches.open(version);
        let cacheStatus;
        let cacheStatusResponse = await cache.match(CACHE_STATUS_PSEUDO_URL);
        if (cacheStatusResponse && cacheStatusResponse.headers.get('User-Agent') === navigator.userAgent) {
          cacheStatus = JSON.parse(await cacheStatusResponse.text());
        }
        else {
          await caches.delete(version);
          cache = await caches.open(version);
        }
        if (!cacheStatus || cacheStatus.status !== 'loaded') {
          inProcessing = false;
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
        inProcessing = false;
      }, 1000);
    };
    if (serviceWorkerReady) {
      window.addEventListener('load', function onLoad(event) {
        window.removeEventListener('load', onLoad);
        watcher();
      });
    }
    let status = new URL(location.href).searchParams.get('cache-bundle');
    if (serviceWorkerReady && status) {
      let cacheStatus = { status: status };
      caches.open(version).then(cache => {
        cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json' }}))
          .then(() => cacheBundle(version))
          .then(() => cacheBundle(version))
          .then(() => cacheBundle(version));
      });
    }
    else if (!serviceWorkerReady) {
      const halt = async function halt() {
        let registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          let result = await registration.unregister();
          console.error('cache-bundle.js: halting: unregistering Service Worker: result = ' + result);
        }
        console.error('cache-bundle.js: halt');
        location = 'about:blank';
      }

      const tasks = hook.parameters.preServiceWorkerTasks = hook.parameters.preServiceWorkerTasks || [];
      let cacheStatus;
      let initialStatus;
      tasks.push(caches.open(version)
        .then(cache => getCacheStatus(cache))
        .then((_cacheStatus) => {
          if (_cacheStatus) {
            cacheStatus = _cacheStatus;
            status = _cacheStatus.status;
          }
          else {
            initialStatus = 'load';
            cacheStatus = { status: status = initialStatus };
          }
        })
        .then(() => caches.open(version))
        .then(cache => initialStatus === 'load' ? cache.put(new Request(CACHE_STATUS_PSEUDO_URL), new Response(JSON.stringify(cacheStatus), { headers: { 'Content-Type': 'application/json', 'User-Agent': navigator.userAgent }})) : true)
        .then(() => cacheBundle(version, halt, initialStatus))
        .then(() => cacheBundle(version, halt, initialStatus))
        .then(() => cacheBundle(version, halt, initialStatus)));
    }
  }
}