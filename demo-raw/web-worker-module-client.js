/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  let isModuleWorkerImplemented = true;
  let isModuleWorkerEnabled = false;
  /*
  try {
    new Worker('about:blank', { type: 'xxx' } )
  }
  catch (e) {
    if (e.name === 'TypeError') {
      isModuleWorkerImplemented = true;
    }
    else {
      console.log('web-worker-module-client.js: Worker("module.js", { type: "module" }) is not implemented');
    }
  }
  */
  let worker;
  if (isModuleWorkerImplemented) {
    try {
      worker = new Worker('web-worker-module.js', { type: 'module' });
      isModuleWorkerEnabled = true;
    }
    catch (e) {
      console.log(e);
    }
  }

  if (isModuleWorkerEnabled) {
    worker.addEventListener('message', function onMessage(event) {
      console.log('web-worker-module-client.js: received message', event.data);
      chai.assert.equal(event.data, 12, 'web-worker-module.js result');
    });
    let message = [3, 4];
    console.log('web-worker-module-client.js: posting message ', JSON.stringify(message));
    worker.postMessage(message);
  }
}
