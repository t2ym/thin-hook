{
  let baseURI;
  let noHookAuthorization = '';
  switch (self.constructor.name) {
  case 'Window':
    if (self === top) {
      baseURI = location.href;
    }
    else {
      baseURI = location.href;//top.hook.parameters.baseURI;
    }
    hook.parameters.baseURI = baseURI;
    noHookAuthorization = new URL(document.querySelector('script').src).searchParams.get('no-hook-authorization');
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
  hook.parameters.bootstrap = `<script>frameElement.dispatchEvent(new Event('srcdoc-load'))</script>`;
  hook.parameters.onloadWrapper = `event.target.addEventListener('srcdoc-load', () => { $onload$ })`;
  hook.parameters.emptySvg =
    `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script><![CDATA[ location = new URL("$location$?referrer=hook.parameters.emptySvg", location.ancestorOrigins ? location.ancestorOrigins[0] : "$origin$").href; ]]></script></svg>`;
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
  const origin = location.host;
  let importMapsJson = `
    {
      "imports": {
        "HookApiTest": "/components/HookApiTest/index.js",
        "module-name.js": "/components/module-name/module-name.js",
        "module-name.mjs": "/components/module-name/module-name.mjs",
        "module.js": "/components/module/module.js",
        "module.mjs": "/components/module/module.mjs"
      }
    }`;
  if (importMapsJson) {
    let baseURL = new URL(hook.parameters.baseURI).pathname;
    let normalizedBaseURL = baseURL[0] === '/'
      ? location.origin + baseURL
      : baseURL;
    let resolvedURLCache = new Map();
    hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(importMapsJson, normalizedBaseURL);
    hook.parameters.XimportMapper =
      (specifier, scriptURL) => {
        console.log(`importMapper(${specifier}, ${scriptURL})`);
        const key = specifier + ';' + scriptURL;
        let resolvedURL = resolvedURLCache.get(key);
        try {
          if (!resolvedURL) {
            if (scriptURL[0] === '/') {
              scriptURL = 'https://' + origin + scriptURL;
            }
            resolvedURL = hook.utils.importMaps.resolve(specifier, hook.parameters.parsedImportMap, scriptURL);
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
        return resolvedURL;
      }
  }

  //console.log('bootstrap.js: location.href = ' + location.href + ' baseURI = ' + baseURI + ' bootstrap = ' + hook.parameters.bootstrap);
}
