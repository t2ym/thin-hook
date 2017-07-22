/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook, preprocess) {

  let version = '1';

  function onInstall(event) {
    let serviceWorkerUrl = new URL(location.href);
    version = serviceWorkerUrl.searchParams.get('version') || version;
  }

  function onActivate(event) {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || caches.delete(key)))));
  }

  function onFetch(event) {
    event.respondWith(
      caches.open('version_' + version).then(function(cache) {
        return cache.match(event.request).then(function(response) {
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
            if (response.status === 200) {
              if (response.url) {
                let url = new URL(response.url);
                let noHook = url.searchParams.get('no-hook') === 'true';
                if (url.pathname.match(/[.]js$/)) {
                  return response.text().then(function(result) {
                    try {
                      if (noHook) {
                        let originalScript = result;
                        result = preprocess._validateNoHookScript(originalScript, url);
                        noHook = originalScript === result;
                      }
                      if (!noHook) {
                        result = hook(result, preprocess.getHookNameForServiceWorker(), [[cors ? response.url : url.pathname, {}]], preprocess.getContextGeneratorName());
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
                else if (url.pathname.match(/(\/|[.]html?)$/)) {
                  let original;
                  let decoded;
                  let contextGeneratorScripts = [];
                  return response.text().then(function(result) {
                    try {
                      result = decoded = hook.serviceWorkerTransformers.decodeHtml(original = result);
                      result = preprocess._preprocessHtml(
                        decoded,
                        preprocess.getHookNameForServiceWorker(),
                        url,
                        cors,
                        preprocess.getContextGeneratorName(),
                        contextGeneratorScripts,
                        original !== decoded,
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
                      let processedResponse = new Response(result, { headers: {'Content-Type': 'text/html'} });
                      if (decoded === original) {
                        cache.put(event.request, processedResponse.clone());
                      }
                      else {
                        let match = decoded.replace(/\n/g, '\0')
                          .match(/<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*version=(.*)&[^"]*"><\/script>/);
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
                        return sequence.then(() => {
                          // preprocess again after execution of all the context generator scripts
                          result = preprocess._preprocessHtml(
                            decoded,
                            preprocess.getHookNameForServiceWorker(),
                            url,
                            cors,
                            preprocess.getContextGeneratorName(),
                            [],
                            original !== decoded,
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

  function registerServiceWorker(fallbackUrl = './index-no-service-worker.html', reloadTimeout = 500, inactiveReloadTimeout = 1000) {
    if ('serviceWorker' in navigator) {
      let script = document.currentScript || Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook.min.js/))[0];
      let src = new URL(script.src, window.location.href);
      if (src.searchParams.has('service-worker-ready')) {
        navigator.serviceWorker.register(script.src.replace(/\&service-worker-ready=.*$/, ''), { scope: src.searchParams.get('sw-root') || window.location.pathname.replace(/\/[^\/]*$/, '/') })
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
      fetch: onFetch
    },
    serviceWorkerTransformers: {
      encodeHtml: encodeHtml,
      decodeHtml: decodeHtml
    },
    registerServiceWorker: registerServiceWorker
  };
}
