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
const waitAfterGoTo = 15000;

(async () => {
  let result;

  await new Promise(resolve => setTimeout(resolve, 4000));
  console.log('wait 4000');

  browser = await puppeteer.launch({ headless: true, args: [ '--disable-gpu' ], executablePath: chromePath });
  page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  // tests
  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
  result = await page.evaluate(function hackCreateHash() {
    try {
      let update = hook.utils.createHash.sha256.prototype.__proto__.update;
      let stolenCodes = [];
      hook.utils.createHash.sha256.prototype.__proto__.update = function hackedUpdate(code) {
        stolenCodes.push(code);
        return update.call(this, ''); // broken hash
      };
      let hash = hook.utils.createHash('sha256');
      hash.update('abc\n');
      return hash.digest('hex') + ';' + stolenCodes.join(';');
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: hackCreateHash:', result);
  chai.assert.equal(result, 'Cannot read property \'sha256\' of undefined', 'cannot hack hook.utils.createHash()');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
  result = await page.evaluate(function getNavigatorViaHook() {
    try {
      return __hook__('.', this, ['navigator'], 'context').constructor.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getNavigatorViaHook:', result);
  chai.assert.equal(result, '__hook__: invalid context', 'cannot access navigator via __hook__');
  result = await page.evaluate(function getNavigatorViaHook2() {
    try {
      return __hook__('.', this, ['navigator'], Symbol.for('context')).constructor.name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getNavigatorViaHook2:', result);
  chai.assert.equal(result, 'Cannot read property \'for\' of undefined', 'cannot access navigator via __hook__');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
  result = await page.evaluate(function getGoogleCharts() {
    try {
      return typeof google.charts + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getGoogleCharts:', result);
  chai.assert.equal(result, 'Cannot read property \'charts\' of undefined', 'cannot access caches');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
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

  await page.goto(targetURL);
  console.log('goto', targetURL);
  await page.waitFor(waitAfterGoTo);
  console.log('waitFor(' + waitAfterGoTo + ')');
  result = await page.evaluate(async function getEvalObject() {
    try {
      return hook.eval('__hook__')('Object').name + ' at ' + location.href;
    }
    catch (error) {
      return error.message;
    }
  });
  console.log('test: getEvalObject:', result);
  chai.assert.equal(result, 'unknown error', 'cannot access Object via hook.eval');

  // end of tests

  browser.close();
})();
