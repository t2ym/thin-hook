/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  let worker = new Worker('web-worker.js');

  worker.addEventListener('message', function onMessage(event) {
    console.log('web-worker-client.js: received message', event.data);
    chai.assert.equal(event.data, 12, 'web-worker.js result');
  });
  let message = [3, 4];
  console.log('web-worker-client.js: posting message ', JSON.stringify(message));
  worker.postMessage(message);
}
chai.assert.throws(() => {
  let blob = new Blob([`
    importScripts('../../hook.min.js?no-hook=true', '../no-hook-authorization.js?no-hook=true', '../bootstrap.js?no-hook=true', '../hook-callback.js?no-hook=true', '../hook-native-api.js?no-hook=true');
    self.addEventListener('message', async (event) => {
      try {
        caches.keys().then(keys => postMessage(keys[0]));
      }
      catch (e) {
        postMessage('version_' + e.message);
      }
    });
  `], { type: 'text/javascript' });
  let blobUrl = URL.createObjectURL(blob);
  let worker = new Worker(blobUrl);

  worker.addEventListener('message', function onMessage(event) {
    console.log('web-worker-client.js: received message', event.data);
    chai.assert.isOk(event.data.startsWith('version_'), 'blob worker result');
  });
  let message = [];
  console.log('web-worker-client.js: posting message ', JSON.stringify(message));
  worker.postMessage(message);
  if (!blobUrl.startsWith('blob:')) {
    throw new Error('Virtual Blob URL');
  }
}, /^Permission Denied:|Virtual Blob URL/);
chai.assert.throws(() => {
  new Worker('web-worker.xjs'); // illegal extensions
}, /^Permission Denied:/);
