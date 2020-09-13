/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
(function scriptHashesJsWrapper() {
  if (hook.parameters[Symbol.for('script-hashes.js')]) {
    return; // skip reinstalling the plugin
  }
  hook.parameters[Symbol.for('script-hashes.js')] = true;
  const scriptHashesJs = `/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
(${scriptHashesJsWrapper.toString()})();`;
  const SCRIPT_HASHES_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/script-hashes.json';
  if (self.constructor.name === 'ServiceWorkerGlobalScope') {
    const originalCheckRequest = hook.parameters.checkRequest;
    const scriptHashesJsURLSWNotReady = new URL('script-hashes.js?no-hook=true&service-worker-ready=false', hook.parameters.baseURI).href;
    const scriptHashesJsURLSWReady = new URL('script-hashes.js?no-hook=true&service-worker-ready=true', hook.parameters.baseURI).href;
    let scriptHashes;
    let mutatedScriptHashesJs;
    hook.parameters.checkRequest = async function (event, response, cache) {
      if (event.request.url === scriptHashesJsURLSWReady || event.request.url === scriptHashesJsURLSWNotReady) {
        let responseJs;
        if (!scriptHashes) {
          let scriptHashesResponse = await cache.match(SCRIPT_HASHES_PSEUDO_URL);
          if (scriptHashesResponse) {
            hook.parameters.scriptHashes = scriptHashes = JSON.parse(await scriptHashesResponse.text());
            mutatedScriptHashesJs = scriptHashesJs.replace('hook.parameters.scriptHashes = ' + '{}', 'hook.parameters.scriptHashes = ' + JSON.stringify(scriptHashes, null, 2));
          }
          else {
            // building
            cache.put(new Request(scriptHashesJsURLSWNotReady), new Response(scriptHashesJs, { headers: { 'Content-Type': 'text/javascript' } }));
          }
        }
        if ((hook.parameters[Symbol.for('integrity.js')] ? (hook.parameters.integrity && hook.parameters.integrity.version === version) : true) &&
          event.request.url === scriptHashesJsURLSWReady) {
          responseJs = mutatedScriptHashesJs || scriptHashesJs;
        }
        else {
          responseJs = scriptHashesJs;
        }
        if (event.request.url === scriptHashesJsURLSWReady) {
          response = new Response(responseJs, { headers: { 'Content-Type': 'text/javascript' } });
        }
        return response;
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
  }
  hook.parameters.scriptHashes = {};
  hook.parameters.scriptHashes.attachBaseURI = true;
})();