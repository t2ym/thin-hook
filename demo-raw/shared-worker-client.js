/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  let worker = new SharedWorker('shared-worker.js');

  worker.port.onmessage = function onMessage(event) {
    console.log('shared-worker-client.js: received message', event.data);
    chai.assert.equal(event.data, 12, 'shared-worker.js result');
  };
  let message = [3, 4];
  console.log('shared-worker-client.js: posting message ', JSON.stringify(message));
  worker.port.postMessage(message);
}
chai.assert.throws(() => {
  let blob = new Blob([`
    importScripts('../../hook.min.js?no-hook=true', '../no-hook-authorization.js?no-hook=true', '../bootstrap.js?no-hook=true', '../hook-callback.js?no-hook=true', '../hook-native-api.js?no-hook=true');
    self.addEventListener('connect', function(event) {
      let port = event.ports[0];

      port.addEventListener('message', function onMessage(event) {
        console.log('blob-shared-worker: received message ', JSON.stringify(event.data));
        let workerResult = event.data[0] * event.data[1];
        console.log('blob-shared-worker: posting message ', workerResult);
        port.postMessage(workerResult);
      });
      port.start();
    });
  `], { type: 'text/javascript' });
  let blobUrl = URL.createObjectURL(blob);
  let worker = new SharedWorker(blobUrl);

  worker.addEventListener('message', function onMessage(event) {
    console.log('shared-worker-client.js: received message', event.data);
    chai.assert.equal(event.data, 35, 'blob shared worker result');
  });
  let message = [5, 7];
  console.log('shared-worker-client.js: posting message ', JSON.stringify(message));
  worker.port.postMessage(message);
  if (!blobUrl.startsWith('blob:')) {
    throw new Error('Virtual Blob URL');
  }
}, /^Permission Denied:|Virtual Blob URL/);
chai.assert.throws(() => {
  new SharedWorker('shared-worker.xjs'); // illegal extensions
}, /^Permission Denied:/);
