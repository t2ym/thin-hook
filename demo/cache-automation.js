async function automationFunction() {
  /*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
  */
  const CACHE_STATUS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/cache-status.json';
  const AUTOMATION_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/automation.json';
  const PSEUDO_URL_PREFIX = 'https://thin-hook.localhost.localdomain/';
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
    await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json' }}));
    location.reload();
  }

  const timeoutForBundleSetFetched = 60000; // 60sec
  // wait for bundle-set-fetched event
  await new Promise((resolve, reject) => {
    const start = Date.now();
    let intervalId = setInterval(async () => {
      const now = Date.now();
      if (now - start > timeoutForBundleSetFetched) {
        reject('timeout for bundle-set-fetched');
      }
      try {
        let model = document.querySelector('live-localizer').shadowRoot
          .getElementById('main').shadowRoot
          .getElementById('dialog')
          .querySelector('live-localizer-panel').shadowRoot
          .getElementById('model');
        if (model) {
          clearInterval(intervalId);
          // Note: bundle-set-fetched is the load completion event for live-localizer widget and irrelevant to cache-bundle.json
          model.addEventListener('bundle-set-fetched', (event) => {
            resolve(event.type);
          });
        }
        else {
          // try again
        }
      }
      catch (e) {
        // try again
      }
    }, 1000);
  });

  await new Promise(async (resolve, reject) => {
    try {
      let menuItems = document.querySelector('my-app').shadowRoot
        .children[3] // app-drawer-layout
        .querySelector('app-drawer')
        .querySelector('iron-selector')
        .querySelectorAll('a');
      let result = [];
      for (let i = menuItems.length - 1; i >= 0; i--) {
        menuItems[i].click();
        result.push(menuItems[i].href);
        await new Promise(_resolve => {
          setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
        });
      }
      resolve(result);
    }
    catch (e) {
      reject(e.message);
    }
  });

  let result = await (async function cacheBundle() {
    const target = 'cache-bundle.json';
    const cacheBundleURL = new URL(target, hook.parameters.baseURI);
    const PSEUDO_URL_PREFIX = 'https://thin-hook.localhost.localdomain/';
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

  automationStatus.state = 'done';
  await (await caches.open(version)).put(new Request(AUTOMATION_PSEUDO_URL), new Response(JSON.stringify(automationStatus), { headers: { 'Content-Type': 'application/json' }}));

  return result;
}
