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
  const automationCacheBundle = JSON.parse(fs.readFileSync(path.join(targetFolder, target), 'UTF-8'));
  const automationCacheBundleStatus = JSON.parse(automationCacheBundle["https://thin-hook.localhost.localdomain/automation.json"]);
  const serverSecret = automationCacheBundleStatus.serverSecret;
  console.log('serverSecret', serverSecret);
  await new Promise(resolve => setTimeout(resolve, 4000));
  console.log('wait 4000');
  let browser = await puppeteer.launch({ headless: true, args: [ '--disable-gpu' ], executablePath: chromePath });
  let page = await browser.newPage();
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


  // start generation of cache-bundle.json
  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(4000);
  console.log('waitFor(4000)');

  let rawCacheBundleJSON;
  while (!rawCacheBundleJSON) {
    try {
      rawCacheBundleJSON = await page.evaluate(new Function(`return async function cacheBundle() {
        try {
          return __${serverSecret}__;
        }
        catch (e) {
          return [][0]; // undefined;
        }
      }`)());
    }
    catch (e) {
      // try again
      console.log(e.message);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
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
