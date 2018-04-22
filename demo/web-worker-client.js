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
    onmessage = (event) => {
      caches.keys().then(keys => postMessage(keys[0]));
    }
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
}, /^Permission Denied:/);
