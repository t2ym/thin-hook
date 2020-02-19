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

let targetURL = 'https://localhost:8080/components/thin-hook/demo/'; // no nginx proxy instead of the above config

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
const loadOnly = process.argv[2] === 'loadOnly';

(async () => {
  console.log('"killall chrome" may help when puppeteer is unstable');
  const targetFolder = 'demo';
  const target = 'cache-bundle.json';
  const automationCacheBundle = loadOnly ? null : JSON.parse(fs.readFileSync(path.join(targetFolder, target), 'UTF-8'));
  const automationCacheBundleStatus = loadOnly ? null : JSON.parse(automationCacheBundle["https://thin-hook.localhost.localdomain/automation.json"]);
  const serverSecret = loadOnly ? '' : automationCacheBundleStatus.serverSecret;
  console.log('serverSecret', serverSecret);
  await new Promise(resolve => setTimeout(resolve, 4000));
  console.log('wait 4000');
  //let browser = await puppeteer.launch({ headless: true, dumpio: false, args: ['--disable-gpu', '--no-sandbox', '--no-setsuid-sandbox'], executablePath: chromePath }); // terse and fastest
  let browser = await puppeteer.launch({ headless: false, dumpio: true, args: [ '--disable-gpu', '--enable-logging=stderr' ], executablePath: chromePath });
  //let browser = await puppeteer.launch({ headless: false, dumpio: true, args: [ '--disable-gpu', '--enable-logging=stderr', '--auto-open-devtools-for-tabs' ], executablePath: chromePath });
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
  if (loadOnly) {
    browser.close();
    return;
  }

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
  console.log('cacheBundle raw ', rawCacheBundleJSON.length > 1000 ? ' length = ' + rawCacheBundleJSON.length + ' bytes' : rawCacheBundleJSON);
  let rawCacheBundle = JSON.parse(rawCacheBundleJSON);
  let cacheBundle = { version: rawCacheBundle.version };
  let keys = Object.keys(rawCacheBundle).sort();
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
  let bodyData = new Map();
  for (let key of keys) {
    if (key === 'version') {
      continue;
    }
    let content = rawCacheBundle[key];
    if (typeof content === 'object') {
      if (content['Location']) {
        if (content['Location'].startsWith('data:')) {
          if (bodyData.has(content['Location'])) {
            let link = bodyData.get(content['Location']);
            cacheBundle[key] = {
              "Location": link
            };
          }
          else {
            bodyData.set(content['Location'], key);
            cacheBundle[key] = content;
          }
        }
        else {
          // unexpected
          // discarding the entry
          console.error('Discarding the entry ' + key + ' ' + JSON.stringify(content, null, 2));
        }
      }
      else if (typeof content['body'] === 'string') {
        let bodyKey = content['Content-Type'] + '\n' + content['body'];
        if (bodyData.has(bodyKey)) {
          let link = bodyData.get(bodyKey);
          cacheBundle[key] = {
            "Location": link
          };
        }
        else {
          bodyData.set(bodyKey, key);
          cacheBundle[key] = content;
        }
      }
    }
    else {
      if (bodyData.has(content)) {
        let link = bodyData.get(content);
        cacheBundle[key] = {
          "Location": link
        };
      }
      else {
        bodyData.set(content, key);
        cacheBundle[key] = content;
      }
    }
  }
  let cacheBundleJSON = JSON.stringify(cacheBundle, null, 2);
  let cacheBundlePath = path.join(__dirname, '..', 'demo', target);
  fs.writeFileSync(cacheBundlePath, cacheBundleJSON);
  keys.splice(keys.indexOf('version'), 1);
  console.log(cacheBundlePath, 'version = ', cacheBundle.version,' length = ', cacheBundleJSON.length, ' bytes with ', keys.length, ' files = \n', JSON.stringify(keys, null, 2));

  browser.close();
})();
