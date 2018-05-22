/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/*
  # Assuming HTTPS server at localhost is serving the site proxied to http://localhost:8080/
  nginx.conf:
    http {
      # ...
      server {
        listen       localhost:443 ssl http2 default_server;
        # ...
        client_max_body_size 100M;
        # ...
        ssl_certificate "/etc/nginx/certs/localhost.crt";
        ssl_certificate_key "/etc/nginx/certs/localhost.key";
      }
      #...
      # Service-Worker-Allowed header
      add_header Service-Worker-Allowed /;
      #...
      # Proxy setting to npm run demo at localhost:8080
      location / {
        proxy_pass http://localhost:8080/;
      }
      #...
    }
*/

let targetURL = 'https://localhost/components/thin-hook/demo/';

const puppeteer = require('puppeteer');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const del = require('del');
let chromePath = '/usr/bin/google-chrome';
switch (process.platform) {
case 'linux':
  chromePath = '/usr/bin/google-chrome';
  break;
case 'darwin':
  chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  break;
case 'win32':
  chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  break;
default:
  chromePath = '/usr/bin/google-chrome';
  break;
}

(async () => {
  console.log('"killall chrome" may help when puppeteer is unstable');
  const targetFolder = 'demo';
  const target = 'cache-bundle.json';
  await del([path.join(targetFolder, target)]);
  console.log('clean up ' + target);
  await new Promise(resolve => setTimeout(resolve, 4000));
  console.log('wait 4000');
  const browser = await puppeteer.launch({ headless: true, args: [ '--disable-gpu' ], executablePath: chromePath });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  /*
  page.on('frameattached', function onFrameAttached() {
    console.log('frameattached');
  });

  // for customized puppeteer/lib/Page.js
  page.on('framestartedloading', async function onFrameStartedLoading() {
    console.log('framestartedloading');
  });
  */

  page.on('domcontentloaded', async function onDomContentLoaded() {
    console.log('domcontentloaded');
  });

  page.on('load', function onLoad() {
    console.log('load');
  });


  let result;

  // tests
  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(function getCaches() {
    try {
      return caches.constructor.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getCaches:', result);
  chai.assert.equal(result, 'Cannot read property \'constructor\' of undefined', 'cannot access caches');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(function getObjectIndirect() {
    try {
      let result = this.__proto__.__proto__.__proto__.__proto__.constructor.name;
      return result + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getObjectIndirect:', result);
  chai.assert.equal(result, 'Cannot read property \'__proto__\' of undefined', 'cannot access Object via prototype chain');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(function getPolymer() {
    try {
      return Polymer.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getPolymer:', result);
  chai.assert.equal(result, 'Cannot read property \'name\' of undefined', 'cannot access non-native global property Polymer');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(function getLookupGetter() {
    try {
      return __lookupGetter__.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getLookupGetter:', result);
  chai.assert.equal(result, 'Cannot read property \'name\' of undefined', 'cannot access __lookupGetter__');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(function getAddEventListener() {
    try {
      return addEventListener.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getAddEventListener:', result);
  chai.assert.equal(result, 'Cannot read property \'name\' of undefined', 'cannot access addEventListener from EventTarget.prototype');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(async function getPrototypeLookupGetter() {
    try {
      return this.__proto__.__proto__.__proto__.__proto__.__lookupGetter__.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getPrototypeLookupGetter:', result);
  chai.assert.equal(result, 'Cannot read property \'__proto__\' of undefined', 'cannot access __lookupGetter__ via __proto__');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(async function getMathLookupGetter() {
    try {
      return Math.__lookupGetter__.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getMathLookupGetter:', result);
  chai.assert.equal(result, 'Cannot read property \'name\' of undefined', 'cannot access __lookupGetter__ via Math');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');
  result = await page.evaluate(async function getMathAbsLookupGetter() {
    try {
      return Math.abs.__lookupGetter__.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getMathAbsLookupGetter:', result);
  chai.assert.equal(result, 'Cannot read property \'name\' of undefined', 'cannot access __lookupGetter__ via Math.abs');
  await page.waitFor(1000);
  result = await page.evaluate(function checkLocation() {
    try {
      return location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: checkLocation:', result);
  chai.assert.equal(result, 'about:blank', 'location is about:blank');


  // end of tests

  // start generation of cache-bundle.json
  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(15000);
  console.log('waitFor(15000)');

  result = await page.evaluate(function waitForBundleSetFetched() {
    return new Promise(resolve => {
      let intervalId = setInterval(async () => {
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
              resolve('Event ' + event.type);
            });
          }
          else {
            // try again
          }
        }
        catch (e) {
          // try again
        }
      }, 100);
    });
  });
  console.log('load', result);

  result = await page.evaluate(function clearCache() {
    return new Promise(resolve => {
      let result = [];
      caches.keys()
        .then(keys => Promise
          .all(keys
            .map(key => { result.push(key); return caches.delete(key); })))
              .then(() => { resolve(result); });
    });
  });
  console.log('clear caches', result);

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(2000);
  console.log('waitFor(2000)');

  result = await page.evaluate(function waitForBundleSetFetched() {
    return new Promise(resolve => {
      let intervalId = setInterval(async () => {
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
              resolve('Event ' + event.type);
            });
          }
          else {
            // try again
          }
        }
        catch (e) {
          // try again
        }
      }, 100);
    });
  });
  console.log('reload', result);

  result = await page.evaluate(function navigateToCacheTargets() {
    return new Promise(async (resolve) => {
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
    });
  });
  console.log('navigate\n', result);

  let rawCacheBundleJSON;
  rawCacheBundleJSON = await page.evaluate(async function cacheBundle() {
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
    return JSON.stringify(cacheBundle,null,0);
  });
  console.log('cacheBundle raw length = ', rawCacheBundleJSON.length, ' bytes');

  let rawCacheBundle = JSON.parse(rawCacheBundleJSON);
  let cacheBundle = { version: rawCacheBundle.version };
  let keys = Object.keys(rawCacheBundle).sort();
  for (let key of keys) {
    if (key !== 'version') {
      cacheBundle[key] = rawCacheBundle[key];
    }
  }
  let cacheBundleJSON = JSON.stringify(cacheBundle, null, 2);
  let cacheBundlePath = path.join(__dirname, target);
  fs.writeFileSync(cacheBundlePath, cacheBundleJSON);
  keys.splice(keys.indexOf('version'), 1);
  console.log(cacheBundlePath, 'version = ', cacheBundle.version,' length = ', cacheBundleJSON.length, ' bytes with ', keys.length, ' files = \n', JSON.stringify(keys, null, 2));

  browser.close();

})();
