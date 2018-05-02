/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook, preprocess) {

  const DEFAULT_VERSION = '1';
  const UNINITIALIZED_VERSION = 'uninitialized';
  let version = UNINITIALIZED_VERSION;
  const CONFIGURATIONS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/configurations.json';
  const _self = (function(){}).constructor('return this')();

  if (typeof _self === 'object' && _self[Symbol.toStringTag] === 'ServiceWorkerGlobalScope') {
    version = new URL(location.href).searchParams.get('version') || DEFAULT_VERSION;
    caches.open('version_' + version)
      .then(cache => {
        return cache.match(CONFIGURATIONS_PSEUDO_URL).then(function(configurationsResponse) {
          if (configurationsResponse) {
            return configurationsResponse.text().then(function(configurationsJSON) {
              let configurations = JSON.parse(configurationsJSON);
              preprocess.setConfigurations(configurations);
              hook.parameters.noHookAuthorizationPreValidated = hook.parameters.noHookAuthorizationPreValidated || {};
              preprocess.getNoHookAuthorizationPreValidated().forEach(ticket => {
                hook.parameters.noHookAuthorizationPreValidated[ticket] = true;
              });
              preprocess.getContextGeneratorScripts().forEach(script => {
                (new Function(script))();
              });
            });
          }
        });
      })
      .catch(() => true);
  }

  function onInstall(event) {
    version = new URL(location.href).searchParams.get('version') || DEFAULT_VERSION;
  }

  function onActivate(event) {
    preprocess.setHookWorkers([]);
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || caches.delete(key)))));
  }

  function onMessage(event) {
    if (event.data === 'channel') {
      let hookWorkers = [];
      for (let i = 0; i < event.ports.length; i++) {
        hookWorkers.push({ worker: i, port: event.ports[i], taskQueueSize: 0 });
      }
      preprocess.setHookWorkers(hookWorkers);
    }
    else if (event.data === 'unload') {
      // Hook Workers are being unloaded with the document that created them
      preprocess.setHookWorkers([]);
    }
    else if (event.data === 'coverage' && typeof __coverage__ === 'object') {
      event.ports[0].postMessage(__coverage__);
    }
    else if (Array.isArray(event.data) && event.data[0] === 'plugin') {
    }
    else {
      console.error('Invalid message to Service Worker');
      event.ports[0].postMessage('error: Invalid message to Service Worker');
    }
  }

  function onFetch(event) {
    let restarted = false;
    if (version === UNINITIALIZED_VERSION) {
      // Service Worker configurations are lost after restart
      restarted = true;
      version = (new URL(location.href)).searchParams.get('version') || DEFAULT_VERSION;
    }
    event.respondWith(
      caches.open('version_' + version).then(function(cache) {
        return (restarted
          ? cache.match(CONFIGURATIONS_PSEUDO_URL).then(function(configurationsResponse) {
            if (configurationsResponse) {
              return configurationsResponse.text().then(function(configurationsJSON) {
                let configurations = JSON.parse(configurationsJSON);
                preprocess.setConfigurations(configurations);
                hook.parameters.noHookAuthorizationPreValidated = hook.parameters.noHookAuthorizationPreValidated || {};
                preprocess.getNoHookAuthorizationPreValidated().forEach(ticket => {
                  hook.parameters.noHookAuthorizationPreValidated[ticket] = true;
                });
                preprocess.getContextGeneratorScripts().forEach(script => {
                  (new Function(script))();
                });
                return cache.match(event.request);
              });
            }
            else {
              console.error('onFetch configurations not found');
              return cache.match(event.request);
            }
          })
          : cache.match(event.request)
        ).then(function(response) {
          if (typeof hook.parameters.checkRequest === 'function') {
            return hook.parameters.checkRequest(event, response);
          }
          else {
            return response;
          }
        }).then(function(response) {
          let cors = false;
          let request;
          if (!response) {
            if (event.request.method === 'GET' && event.request.url.indexOf('cors=true') >= 0) {
              cors = true;
              // no inheritance of auth information, etc. from event.request
              request = new Request(event.request.url.replace(/&cors=true/, '').replace(/\?cors=true$/, '').replace(/\?cors=true&/, '?'), { mode: 'cors' });
            }
            else if (event.request.method === 'GET' &&
              Array.isArray(hook.parameters.cors) &&
              hook.parameters.cors.filter(pattern =>
                typeof pattern === 'string' ? pattern === event.request.url : typeof pattern === 'function' ? pattern(event.request.url) : false
              ).reduce((prev, curr) => prev || curr, false)) {
              cors = true;
              request = new Request(event.request.url, { mode: 'cors' });
            }
            else {
              request = event.request.clone();
            }
          }
          return response || fetch(request).then(function(response) {
            if (response.type === 'opaque') {
              if (request && response.status === 0 &&
                Array.isArray(hook.parameters.opaque) &&
                hook.parameters.opaque.filter(pattern =>
                  typeof pattern === 'string'
                    ? pattern === request.url
                    : typeof pattern === 'function'
                      ? pattern(request.url)
                      : false
                ).reduce((prev, curr) => prev || curr, false)) {
                // opaque response is authorized
              }
              else {
                // opaque response is not authorized
                //console.error('unauthorized opaque response url = ' + request.url);
                response = null;
              }
            }
            else if (response.status === 200) {
              if (response.url) {
                let url = new URL(response.url);
                let noHook = url.searchParams.get('no-hook') === 'true' ||
                  (Array.isArray(hook.parameters.noHook) &&
                  hook.parameters.noHook.filter(pattern =>
                    typeof pattern === 'string' ? pattern === url.href : typeof pattern === 'function' ? pattern(url) : false
                  ).reduce((prev, curr) => prev || curr, false));
                if (url.pathname.match(/[.]m?js$/)) {
                  return response.text().then(async function(result) {
                    let sourceMap =
                      (Array.isArray(hook.parameters.sourceMap) &&
                        hook.parameters.sourceMap.filter(pattern =>
                        typeof pattern === 'string' ? pattern === url.href : typeof pattern === 'function' ? pattern(url) : false
                      ).reduce((prev, curr) => prev || curr, false))
                        ? { pathname: url.pathname } : null;
                    try {
                      if (noHook) {
                        let originalScript = result;
                        result = preprocess._validateNoHookScript(originalScript, url);
                        noHook = originalScript === result;
                        if (noHook) {
                          result = preprocess.mutateScriptConfigurationsJSON(result, url); // only for hook.min.js
                        }
                      }
                      if (!noHook) {
                        result = await hook(result, preprocess.getHookNameForServiceWorker(), [[cors ? response.url : url.pathname, {}]], preprocess.getContextGeneratorName(),
                          true, preprocess.getHookProperty(), sourceMap, true);
                      }
                    }
                    catch (e) {
                      if (preprocess.getDiscardHookErrors()) {
                        console.log(e);
                      }
                      else {
                        result = '/* Empty script due to a hook error */';
                        console.error(e);
                        throw e;
                      }
                    }
                    finally {
                      let processedResponse = new Response(result, { headers: {'Content-Type': 'text/javascript'} });
                      cache.put(event.request, processedResponse.clone());
                      return processedResponse;
                    }
                  });
                }
                else if (url.pathname.match(/(\/|[.]html?|[.]svg)$/)) {
                  let isSVG = url.pathname.match(/([.]svg)$/);
                  let original;
                  let decoded;
                  let contextGeneratorScripts = [];
                  return response.text().then(async function(result) {
                    try {
                      result = decoded = hook.serviceWorkerTransformers.decodeHtml(original = result);
                      result = await preprocess._preprocessHtml(
                        decoded,
                        preprocess.getHookNameForServiceWorker(),
                        url,
                        cors,
                        preprocess.getContextGeneratorName(),
                        contextGeneratorScripts,
                        original !== decoded,
                        true,
                        0,
                        preprocess.getHookProperty(),
                        true);
                    }
                    catch (e) {
                      if (preprocess.getDiscardHookErrors()) {
                        console.log(e);
                      }
                      else {
                        result = '<!-- Empty HTML due to a hook error -->';
                        console.error(e);
                        throw e;
                      }
                    }
                    finally {
                      let processedResponse = new Response(result, { headers: {'Content-Type': isSVG ? 'image/svg+xml' : 'text/html'} });
                      if (decoded === original) {
                        cache.put(event.request, processedResponse.clone());
                      }
                      else {
                        let match = decoded.replace(/\n/g, '\0')
                          .match(/<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*version=([^&]*)&[^"]*"><\/script>/);
                        if (match) {
                          let newVersion = match[1];
                          if (version !== newVersion) {
                            version = newVersion;
                            caches.keys()
                              .then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || caches.delete(key))))
                              .then(() => registration.update());
                          }
                        }
                      }
                      if (contextGeneratorScripts.length === 0) {
                        return processedResponse;
                      }
                      else {
                        let sequence = Promise.resolve();
                        contextGeneratorScripts.forEach(script => {
                          sequence = sequence.then(() => {
                            if (typeof script === 'string') {
                              let authorized = preprocess._validateNoHookScript(script, url, true);
                              if (script === authorized) {
                                (new Function(script))();
                                if (preprocess.getContextGeneratorScripts().indexOf(script) < 0) {
                                  preprocess.getContextGeneratorScripts().push(script);
                                }
                              }
                              else {
                                console.error('skip executing unauthorized inline context-generator script at ' + url.href);
                              }
                              return true;
                            }
                            else if (script instanceof URL) {
                              let scriptRequest = new Request(script, { mode: 'cors' });
                              return fetch(scriptRequest).then(scriptResponse => {
                                if (scriptResponse.status < 400) {
                                  return scriptResponse.text();
                                }
                                else {
                                  throw scriptResponse;
                                }
                              }).then(text => {
                                let authorized = preprocess._validateNoHookScript(text, script, true);
                                if (text === authorized) {
                                  (new Function(text))();
                                  if (preprocess.getContextGeneratorScripts().indexOf(text) < 0) {
                                    preprocess.getContextGeneratorScripts().push(text);
                                  }
                                }
                                else {
                                  console.error('skip executing unauthorized context-generator script at ' + script.href);
                                }
                                return true;
                              }).catch(error => {
                                console.log('Failed to fetch context generator script at ' + script, error);
                                if (preprocess.getDiscardHookErrors()) {
                                  return true;
                                }
                                else {
                                  if (error instanceof Response) {
                                    throw new Error('Failed to fetch context generator script at ' + script + ' ' + error.status + ' ' + error.statusText);
                                  }
                                  else {
                                    throw error;
                                  }
                                }
                              });
                            }
                            else {
                              return true;
                            }
                          })
                        });
                        return sequence.then(async () => {
                          let newConfigurationsJSON = JSON.stringify(preprocess.getConfigurations(),null,0);
                          let newConfigurationsRequest = new Request(CONFIGURATIONS_PSEUDO_URL);
                          let newConfigurationsResponse = new Response(newConfigurationsJSON, { headers: {'Content-Type': 'application/json'} });
                          cache.put(newConfigurationsRequest, newConfigurationsResponse);
                          // preprocess again after execution of all the context generator scripts
                          result = await preprocess._preprocessHtml(
                            decoded,
                            preprocess.getHookNameForServiceWorker(),
                            url,
                            cors,
                            preprocess.getContextGeneratorName(),
                            [],
                            original !== decoded,
                            true,
                            0,
                            preprocess.getHookProperty(),
                            true);
                          // Note: context generator scripts should not throw hook errors
                          return new Response(result, { headers: {'Content-Type': 'text/html'} });
                        });
                      }
                    }
                  });
                }
              }
            }
            return response;
          });
        }).catch(function(error) {
          throw error;
        });
      })
    );
  }

  function encodeHtml(html) {
    let html0 = html.replace(/\n/g, '\0');
    let match;
    if (match = html0.match(/^(.*)(<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*service-worker-ready=true"><\/script>.*)$/)) {
      html = (match[1] + match[2].replace(/<!--/g, '<C!--').replace(/-->/g, '--C>').replace(
        /^(.*<script [^>]*src="[^"]*\/hook[.]min[.]js\?[^"]*&service-worker-ready=)true("><\/script>)(.*)$/,
        '$1false$2</head></html><!--$3-->')).replace(/\0/g, '\n');
    }
    return html;
  }

  function decodeHtml(html) {
    let html0 = html.replace(/\n/g, '\0');
    if (html0.match(/<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*service-worker-ready=false"><\/script><\/head><\/html><!--/)) {
      html = html0.replace(
        /^(.*<script [^>]*src="[^"]*\/hook[.]min[.]js\?[^"]*&service-worker-ready=)false("><\/script>)<\/head><\/html><!--(.*)-->$/,
        '$1true$2$3').replace(/<C!--/g, '<!--').replace(/--C>/g, '-->').replace(/\0/g, '\n');
    }
    return html;
  }

  let hookWorkerChannelTransferred = false;

  function hookWorkerHandler(event) {
    if (event.data === 'channel') {
      let port = event.ports[0];
      port.onmessage = function (hookEvent) {
        let message;
        try {
          message = JSON.parse(hookEvent.data);
        }
        catch (parseError) {
          console.error('Hook worker: unknown hookEvent message ', hookEvent.data);
          return;
        }
        let id = message.shift();
        let type = message.shift();
        let parameters = message;
        let result;
        try {
          //console.log('Hook worker: received request ' + id);
          switch (type) {
          case 'text/javascript':
            result = hook(...parameters);
            break;
          case 'text/html':
            result = hook.hookHtml(...parameters);
            break;
          default:
            throw new Error('hookWorker: Unknown type: ' + type);
            break;
          }
          port.postMessage(JSON.stringify([ id, 'success', result ], null, 0));
        }
        catch (e) {
          port.postMessage(JSON.stringify([ id, 'error', e.toString() ], null, 0));
        }
      }
      hookWorkerChannelTransferred = true;
    }
    else if (event.data === 'ping') {
      postMessage({
        hookWorkerChannelTransferred: hookWorkerChannelTransferred
      });
    }
    else if (event.data === 'coverage') {
      if (typeof __coverage__ === 'object') {
        postMessage(__coverage__);
      }
      else {
        postMessage({});
      }
    }
    else {
      console.error('Hook worker: unknown message ', event.data);
    }
  }

  const workerEventTarget = typeof window === 'object' ? document.createElement('div') : null;
  let hookWorkerReady = false;

  async function _collectHookWorkerCoverage(timeout = 5000) {
    let hookWorkers = [];
    let interval = 100;
    let retryCount = timeout / interval;
    let intervalId;
    hookWorkers = await new Promise((resolve, reject) => {
      if (hookWorkerReady) {
        resolve(preprocess.getHookWorkers());
      }
      else {
        workerEventTarget.addEventListener('hook-worker-ready', function onHookWorkerReady(event) {
          workerEventTarget.removeEventListener('hook-worker-ready', onHookWorkerReady);
          if (hookWorkerReady) {
            resolve(preprocess.getHookWorkers());
          }
          else {
            throw new Error('_collectHookWorkerCoverage: hook-worker-ready event without hookWorkerReady === true');
          }
        });
      }
    });
    if (Array.isArray(hookWorkers) && hookWorkers.length > 0) {
      return await Promise.all(hookWorkers.map(({ worker, channel }) => new Promise((resolve, reject) => {
        worker.onmessage = function onMessage(event) {
          if (event.data.error) {
            reject(event.data.error);
          }
          else {
            resolve(event.data);
          }
          worker.onmessage = null;
        };
        worker.postMessage('coverage');
      })));
    }
    else {
      return [];
    }
  }

  function pingHookWorkers() {
    let hookWorkers = preprocess.getHookWorkers();
    if (Array.isArray(hookWorkers) && hookWorkers.length > 0) {
      let intervalId = setInterval(() => {
        let done = hookWorkers
          .map((hookWorker) => hookWorker.hookWorkerChannelTransferred)
          .reduce((acc, curr) => acc = acc && curr, true);
        if (done) {
          clearInterval(intervalId);
          hookWorkerReady = true;
          workerEventTarget.dispatchEvent(new Event('hook-worker-ready'));
        }
        hookWorkers.forEach((hookWorker, index) => {
          if (!hookWorker.hookWorkerChannelTransferred) {
            hookWorker.worker.onmessage = function onMessage(event) {
              if (event.data && event.data.hookWorkerChannelTransferred) {
                hookWorker.hookWorkerChannelTransferred = true;
                hookWorker.worker.onmessage = null;
              }
            }
            hookWorker.worker.postMessage('ping');
          }
        });
      }, 1000);
    }
  }

  function startPingService() {
    console.log('service-worker.js: startPingService');
    navigator.serviceWorker.addEventListener('message', function (event) {
      let port = event.ports[0];
      let data = event.data;
      //console.log('startPingService: received ', JSON.stringify(data));
      if (port && Array.isArray(data) && data[0] === 'ping') {
        //console.log('startPingService: postMessage ', JSON.stringify(data));
        port.postMessage(data);
      }
    });
  }

  function registerServiceWorker(fallbackUrl = './index-no-service-worker.html', reloadTimeout = 500, inactiveReloadTimeout = 1000) {
    if ('serviceWorker' in navigator) {
      let script = document.currentScript || Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook.min.js/))[0];
      let src = new URL(script.src, window.location.href);
      if (src.searchParams.has('service-worker-ready')) {
        startPingService();
        navigator.serviceWorker.register(script.src.replace(/\&service-worker-ready=.*$/, '&service-worker-initiator=' + location.pathname), { scope: src.searchParams.get('sw-root') || window.location.pathname.replace(/\/[^\/]*$/, '/') })
          .then(registration => {
            let serviceWorker = registration.active || registration.waiting || registration.installing;
            if (serviceWorker) {
              if (!(src.searchParams.get('service-worker-ready') === 'true' && registration.active)) {
                serviceWorker.addEventListener('statechange', function (e) {
                  let src = new URL(script.src, "https://host/");
                  if (src.searchParams.get('service-worker-ready') !== 'true') {
                    window.location.reload();
                  }
                });
                setTimeout(function() { window.location.reload(); }, inactiveReloadTimeout);
              }
              else {
                preprocess.setupHookWorkers();
                pingHookWorkers();
              }
            }
            else {
              setTimeout(function() { window.location.reload(); }, reloadTimeout);
            }
          });
      }
    }
    else {
      let src = new URL(document.currentScript.src, "https://host/");
      let match = src.search.match(/[&\?]fallback-page=([^&\?]*)/);
      if (match) {
        fallbackUrl = match[1];
      }
      window.location = fallbackUrl;
    }
  }

  return {
    serviceWorkerHandlers: {
      install: onInstall,
      activate: onActivate,
      message: onMessage,
      fetch: onFetch,
    },
    serviceWorkerTransformers: {
      encodeHtml: encodeHtml,
      decodeHtml: decodeHtml
    },
    hookWorkerHandler: hookWorkerHandler,
    _collectHookWorkerCoverage: _collectHookWorkerCoverage,
    registerServiceWorker: registerServiceWorker
  };
}
