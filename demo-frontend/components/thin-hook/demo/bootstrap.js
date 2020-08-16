if (hook.parameters[Symbol.for('bootstrap.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('bootstrap.js')] = true;
  let baseURI;
  let noHookAuthorization = '';
  switch (self.constructor.name) {
  case 'Window':
    if (self === top) {
      baseURI = location.href;
    }
    else {
      baseURI = top.hook.parameters.baseURI;
    }
    hook.parameters.baseURI = baseURI;
    let script = top.document.querySelector('script');
    let src = script.src;
    if (!src) {
      location = 'about:blank'; // top SVG is not supported
    }
    noHookAuthorization = new URL(src, baseURI).searchParams.get('no-hook-authorization');
    break;
  case 'ServiceWorkerGlobalScope':
    baseURI = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
    hook.parameters.baseURI = baseURI;
    noHookAuthorization = new URL(location.href).searchParams.get('no-hook-authorization');
    break;
  case 'DedicatedWorkerGlobalScope':
  case 'SharedWorkerGlobalScope':
    // For Hook Workers; Insignificant in hooked web workers
    baseURI = new URL(location.origin + 
        (new URL(location.href).searchParams.has('service-worker-initiator')
          ? new URL(location.href).searchParams.get('service-worker-initiator')
          : location.pathname
        )
      ).href;
    hook.parameters.baseURI = baseURI;
    noHookAuthorization = new URL(location.href).searchParams.has('no-hook-authorization') ? new URL(location.href).searchParams.get('no-hook-authorization') : '';
    break;
  default:
    baseURI = location.href;
    hook.parameters.baseURI = baseURI;
    break;
  }
  hook.parameters.emptyDocumentUrl = new URL('./empty-document.html', baseURI);
  hook.parameters.bootstrap = `<script src="${new URL('mark-parsed.js?no-hook=true', baseURI).href.substring(new URL(baseURI).origin.length)}"></script>`;
  hook.parameters.onloadWrapper = `event.target.addEventListener('srcdoc-load', () => { $onload$ })`;
  //hook.parameters.virtualBlobUrlTargetType = new Map([['text/html', 'file.html'],['text/javascript', 'file.js'],['image/svg+xml', 'file.svg']]);
  //hook.parameters.virtualBlobBaseUrl = new URL('blob/', baseURI).href;
  if (hook.parameters.virtualBlobUrlTargetType && hook.parameters.virtualBlobBaseUrl) {
    hook.parameters.revertVirtualBlobUrl = function (srcUrl) {
      if (srcUrl instanceof URL) {
        if (srcUrl.protocol === 'https:') {
          if (srcUrl.href.startsWith(hook.parameters.virtualBlobBaseUrl)) {
            let bloburl = srcUrl.searchParams.get('bloburl');
            if (bloburl.startsWith('blob:')) {
              srcUrl = new URL(bloburl);
            }
          }
        }
      }
      return srcUrl;
    };
    if (self.constructor.name === 'Window') {
      // wrap URL.createObjectURL(blob)
      // target blob.type in hook.parameters.virtualBlobUrlTargetType
      // original URL: blob:https://origin/9a76ffaa-9d4d-40dd-a7d4-b5af9491eb20
      // virtual  URL: https://origin/entry/blob/file.html?bloburl=blob%3Ahttps%3A%2F%2Forigin%2F9a76ffaa-9d4d-40dd-a7d4-b5af9491eb20
      const desc = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: function createObjectURL(blob) {
          let url = desc.value.call(this, blob);
          let filename;
          if (blob && (filename = hook.parameters.virtualBlobUrlTargetType.get(blob.type))) {
            url = hook.parameters.virtualBlobBaseUrl + filename + '?bloburl=' + encodeURIComponent(url);
          }
          return url;
        },
      });
    }
    if (self.constructor.name === 'ServiceWorkerGlobalScope') {
      const originalCheckRequest = hook.parameters.checkRequest;
      // interpret virtual URL and convert it to the blob URL
      hook.parameters.checkRequest = async function (event, response, cache) {
        if (originalCheckRequest) {
          response = await originalCheckRequest(event, response, cache);
        }
        let url = new URL(event.request.url);
        if (!response && url.href.startsWith(hook.parameters.virtualBlobBaseUrl)) {
          let bloburl = url.searchParams.get('bloburl');
          if (bloburl) {
            let request = new Request(bloburl, { mode: 'same-origin' });
            // redirect request to the blob URL by overriding event.request.clone() with a function returning the blob url request
            //   Note: event.request.clone() is called before fetch(request)
            Object.defineProperty(event.request, 'clone', {
              configurable: true,
              writable: false,
              value: function clone() {
                return request;
              },
            });
            // disable caching by overriding cache.put() with an empty async function
            //   Note: The cache object is dedicated to FetchEvent for the request and the response
            Object.defineProperty(cache, 'put', {
              configurable: true,
              writable: false,
              value: async function put() {
                return undefined;
              },
            });
          }
        }
        return response;
      };
      const originalCheckResponse = hook.parameters.checkResponse;
      // adjust response as if it is fetched via the virtual URL instead of the blob URL so that the response body can be preprocessed
      hook.parameters.checkResponse = async function (event, request, response, cache) {
        if (typeof response.url === 'string' && response.url.startsWith('blob:')) {
          let type = response.headers.get('content-type');
          let filename = hook.parameters.virtualBlobUrlTargetType.get(type);
          if (filename) {
            let url = hook.parameters.virtualBlobBaseUrl + filename + '?bloburl=' + encodeURIComponent(response.url);
            response = new Response(response.body, { status: response.status, statusText: response.statusText, headers: response.headers });
            Object.defineProperty(response, 'url', { value: url, writable: false, enumerable: false });
          }
        }
        if (originalCheckResponse) {
          response = await originalCheckResponse(event, request, response, cache);
        }
        return response;
      };
    }
  }
  // Set as true for mitigating the impacts of #362 [Vulnerability][Chrome Canary 86] SVG images and HTML documents loaded in <object>, <embed> elements bypass Service Worker
  hook.parameters.hangUpOnEmbedAndObjectElement = false; // Note: If the value is true, all <embed> and <object> elements are prohibited and the app will hang up on them
  hook.parameters.emptySvg = hook.parameters.hangUpOnEmbedAndObjectElement
    ? `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script><![CDATA[ location = "about:blank"; ]]></script></svg>`
    : `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script><![CDATA[ location = new URL("$location$?referrer=hook.parameters.emptySvg", location.ancestorOrigins ? location.ancestorOrigins[0] : "$origin$").href; ]]></script></svg>`;
  hook.parameters.bootstrapSvgScripts = `
    <script xlink:href="${new URL('../../thin-hook/hook.min.js?no-hook=true&hook-name=__hook__&context-generator-name=method&discard-hook-errors=false&fallback-page=index-fb.html&hook-property=true&hook-global=true&hook-prefix=_uNpREdiC4aB1e_&compact=true&no-hook-authorization=', baseURI).href.replace(/\&/g, '&amp;').substring(location.origin.length) + noHookAuthorization}"></script>
    <script xlink:href="${new URL('no-hook-authorization.js?no-hook=true', baseURI).href.substring(location.origin.length)}"></script>
    <script xlink:href="${new URL('context-generator.js?no-hook=true', baseURI).href.substring(location.origin.length)}"></script>
    <script xlink:href="${new URL('bootstrap.js?no-hook=true', baseURI).href.substring(location.origin.length)}"></script>
    <script xlink:href="${new URL('hook-callback.js?no-hook=true', baseURI).href.substring(location.origin.length)}"></script>
    <script xlink:href="${new URL('hook-native-api.js?no-hook=true', baseURI).href.substring(location.origin.length)}"></script>`;
  hook.parameters.noHookAuthorizationParameter = noHookAuthorization;
  hook.parameters.noHookAuthorizationFailed = {};
  hook.parameters.noHookAuthorizationPassed = {};
  hook.parameters.importMapsJson = `{
    "imports": {
      "thin-hook-demo/": "/components/thin-hook/demo/",
      "thin-hook-demo": "/components/thin-hook/demo/index",
      "lit-element": "/components/thin-hook/demo/node_modules/lit-element/lit-element.js",
      "lit-html": "/components/thin-hook/demo/node_modules/lit-html/lit-html.js",
      "module-name": "/components/thin-hook/demo/modules/module-name/index.js",
      "module-name/": "/components/thin-hook/demo/modules/module-name/",
      "module-name2": "/components/thin-hook/demo/modules/module-name2/index.js",
      "foo": "/components/thin-hook/demo/bar.js",
      "module-on-cdn": "https://cdn.domain.com/path/cdn-module/index.js",
      "lit-element/": "/components/thin-hook/demo/node_modules/lit-element/",
      "lit-html/": "/components/thin-hook/demo/node_modules/lit-html/"
    },
    "scopes": {
      "/components/thin-hook/demo/node_modules/lit-element/": {
        "lit-element/": "/components/thin-hook/demo/node_modules/lit-element/"
      },
      "/components/thin-hook/demo/node_modules/lit-html/": {
        "lit-html/": "/components/thin-hook/demo/node_modules/lit-html/"
      }
    }
  }`;
  if (typeof hook.parameters.importMapsJson === 'string') {
    const origin = location.host;
    let baseURL = new URL(hook.parameters.baseURI).pathname;
    let normalizedBaseURL = baseURL[0] === '/'
      ? location.origin + baseURL
      : baseURL;
    let resolvedURLCache = new Map();
    hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(hook.parameters.importMapsJson, normalizedBaseURL);
    hook.parameters.importMapper =
      (specifier, scriptURL) => {
        const key = specifier + ';' + scriptURL;
        let resolvedURL = resolvedURLCache.get(key);
        try {
          if (!resolvedURL) {
            if (scriptURL[0] === '/') {
              scriptURL = 'https://' + origin + scriptURL;
            }
            if (specifier.endsWith('/')) {
              specifier = specifier.substring(0, specifier.length - 1);
            }
            resolvedURL = hook.utils.importMaps.resolve(specifier, hook.parameters.parsedImportMap, new URL(scriptURL));
            if (resolvedURL.host === origin) {
              resolvedURL = resolvedURL.pathname + resolvedURL.search + resolvedURL.hash;
            }
            else {
              resolvedURL = resolvedURL.href;
            }
            resolvedURLCache.set(key, resolvedURL);
          }
        }
        catch (e) {
          resolvedURL = specifier;
        }
        //console.log(`importMapper(${specifier}, ${scriptURL}) = ${resolvedURL}`);
        return resolvedURL;
      }
  }
  //console.log('bootstrap.js: location.href = ' + location.href + ' baseURI = ' + baseURI + ' bootstrap = ' + hook.parameters.bootstrap);
}
