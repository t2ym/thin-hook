/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
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
