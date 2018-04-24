/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  const devtoolsDisabled = true; // Use false and rebuild with gulp demo to enable Dev Tools
  const devtoolsDetectionThreshold = 200; // 200ms
  const devtoolsDetectionInterval = 500; // 500ms
  const devtoolsDetectionStartTimeout = 1000; // 1000ms
  if (devtoolsDisabled) {
    let baseURI;
    let isMainDocument = false;
    switch (self.constructor.name) {
    case 'Window':
      if (self === top) {
        baseURI = location.href;
        isMainDocument = true;
      }
      else {
        baseURI = top.hook.parameters.baseURI;
      }
      break;
    case 'ServiceWorkerGlobalScope':
      baseURI = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
      break;
    case 'DedicatedWorkerGlobalScope':
    case 'SharedWorkerGlobalScope':
      // For Hook Workers; Insignificant in hooked web workers
      baseURI = new URL(location.origin + 
          (new URL(location.href).searchParams.has('service-worker-initiator')
            ? new URL(location.href).searchParams.get('service-worker-initiator')
            : location.pathname
          )
        ).href;
      break;
    default:
      baseURI = location.href;
      break;
    }
    const onDevToolsDetected = function () {
      switch (self.constructor.name) {
      case 'Window':
        console.clear();
        location = 'about:blank';
        break;
      case 'ServiceWorkerGlobalScope':
        console.clear();
        caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))).then(() => registration.unregister()));
        break;
      case 'DedicatedWorkerGlobalScope':
      case 'SharedWorkerGlobalScope':
        console.clear();
        self.close();
        break;
      default:
        console.clear();
        break;
      }
    }
    // devtoolsDetectorSharedWorkerScript unused for now
    const devtoolsDetectorSharedWorkerScript = `
      onconnect = function(event) {
        let port = event.ports[0];
        console.log('devtoolsDetectorWorkerScript: connected');
        port.addEventListener('message', (_event) => {
          console.log('devtoolsDetectorSharedWorkerScript: message received', JSON.stringify(_event.data));
          let beforeDebugger = Date.now();
          debugger;
          let afterDebugger = Date.now();
          let workerResult = [_event.data[0], afterDebugger - beforeDebugger];
          port.postMessage(workerResult);
        });
        port.start();
      }`;
    // devtoolsDetectorWorkerScript unused for now
    const devtoolsDetectorWorkerScript = `
      self.addEventListener('message', function onMessage(event) {
        console.log('devtoolsDetectorWorkerScript: message received', JSON.stringify(event.data));
        let beforeDebugger = Date.now();
        debugger;
        let afterDebugger = Date.now();
        let workerResult = [event.data[0], afterDebugger - beforeDebugger];
        postMessage(workerResult);
      });
    `;
    const devtoolsDetectorMessageHandlerForServiceWorker = function devtoolsDetectorMessageHandlerForServiceWorker (event) {
      if (Array.isArray(event.data) && event.data[0] === 'plugin' && event.data[1] === 'DevToolsDetection') {
        let port = event.ports[0];
        console.log('devtoolsDetectorMessageHandlerForServiceWorker: message received', JSON.stringify(event.data));
        let beforeDebugger = Date.now();
        let workerResult = ['plugin', 'DevToolsDetection', 'start', beforeDebugger]; // start response
        console.log('devtoolsDetectorMessageHandlerForServiceWorker: postMessage', JSON.stringify(workerResult));
        port.postMessage(workerResult);
        setTimeout(() => {
          if (workerResult[2] === 'start') {
            console.log('devtoolsDetectorMessageHandlerForServiceWorker: timed out on threshold', event.data[2]);
            onDevToolsDetected();
          }
        }, event.data[2]);
        debugger;
        let afterDebugger = Date.now();
        workerResult[2] = 'end';
        workerResult[3] = afterDebugger - beforeDebugger;
        console.log('devtoolsDetectorMessageHandlerForServiceWorker: postMessage', JSON.stringify(workerResult));
        port.postMessage(workerResult);
        if (workerResult[3] >= event.data[2]) {
          console.log('devtoolsDetectorMessageHandlerForServiceWorker: afterDebugger - beforeDebugger = ', workerResult[3], ' >= threshold', event.data[2]);
          onDevToolsDetected();
          caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))).then(() => registration.unregister()));
        }
      }
    }

    if (isMainDocument) {
      /*
      let sharedWorker = new SharedWorker('data:text/javascript;base64,' + btoa(devtoolsDetectorSharedWorkerScript));

      sharedWorker.port.onmessage = function onMessage(event) {
        console.log('disable-devtools.js: received message', event.data);
      };
      setInterval(() => {
        let message = ['MainDocument'];
        console.log('disable-devtools.js: posting message ', JSON.stringify(message));
        sharedWorker.port.postMessage(message);
      }, 5000);
      */

      /*
      let dedicatedWorker = new Worker('data:text/javascript;base64,' + btoa(devtoolsDetectorWorkerScript));

      dedicatedWorker.onmessage = function onMessage(event) {
        console.log('disable-devtools.js: received message', event.data);
      };
      setInterval(() => {
        let message = ['MainDocument'];
        console.log('disable-devtools.js: posting message ', JSON.stringify(message));
        dedicatedWorker.postMessage(message);
      }, 5000);
      */

      (async function () {
        let devToolsDetected = false;
        while (!devToolsDetected) {
          let message = ['plugin', 'DevToolsDetection', devtoolsDetectionThreshold];
          let status = 'init';
          let channel;
          let response = await Promise.race([
            new Promise((resolve, reject) => {
              if (channel) {
                channel.port1.close();
              }
              channel = new MessageChannel();
              channel.port1.addEventListener('message', (event) => {
                if (Array.isArray(event.data) && event.data[0] === 'plugin' && event.data[1] === 'DevToolsDetection') {
                  switch (event.data[2]) {
                  case 'start':
                    console.log('disable-devtools.js: received', JSON.stringify(event.data));
                    status = 'start';
                    setTimeout(() => {
                      status = 'timeout';
                      resolve(devtoolsDetectionThreshold);
                    }, devtoolsDetectionThreshold);
                    break;
                  case 'end':
                    console.log('disable-devtools.js: received', JSON.stringify(event.data));
                    if (status === 'init' || status === 'start') {
                      status = 'end';
                      resolve(event.data[3]);
                    }
                    else {
                      console.log('disable-devtools.js: discarded', JSON.stringify(event.data));
                    }
                    break;
                  default:
                    console.log('disable-devtools.js: received unknown data', JSON.stringify(event.data));
                    break;
                  }
                }
              });
              channel.port1.start();
              console.log('disable-devtools.js: posting message to Service Worker', JSON.stringify(message));
              navigator.serviceWorker.controller.postMessage(message, [ channel.port2 ]);
            }),
            new Promise((resolve, reject) => {            
              setTimeout(() => {
                switch (status) {
                case 'init':
                  status = 'starttimeout';
                  console.log('disable-devtools.js: timeout for start');
                  resolve(devtoolsDetectionStartTimeout);
                  break;
                case 'start':
                case 'end':
                case 'timeout':
                default:
                  break;
                }
              }, devtoolsDetectionStartTimeout);
            })
          ]);
          switch (status) {
          case 'init':
          case 'start':
          case 'end':
            if (response >= devtoolsDetectionThreshold) {
              console.log('disable-devtools.js: reached the threshold', response);
              devToolsDetected = true;
            }
            else {
              console.log('disable-devtools.js: within the threshold', response);
              await new Promise((resolve) => {
                setTimeout(resolve, devtoolsDetectionInterval);
              });
            }
            break;
          case 'timeout':
            console.log('disable-devtools.js: timed out', response);
            devToolsDetected = true;
            break;
          case 'starttimeout':
          default:
            break;
          }
          if (devToolsDetected) {
            break;
          }
        }
        if (devToolsDetected) {
          onDevToolsDetected();
        }
      })();
    }
    if (self.constructor.name === 'ServiceWorkerGlobalScope') {
      if (!self.devtoolsDetectorForServiceWorkerInstalled) {
        self.devtoolsDetectorForServiceWorkerInstalled = true;
        console.log('disable-devtools.js: installing message handler to Service Worker');
        self.addEventListener('message', devtoolsDetectorMessageHandlerForServiceWorker);
      }
    }
    if (self.constructor.name === 'SharedWorkerGlobalScope') {
      (async function () {
        while (true) {
          console.log('devtoolsDetectorSharedWorker: started');
          let status = 'start';
          let beforeDebugger = Date.now();
          setTimeout(() => {
            if (status === 'start') {
              console.log('devtoolsDetectorSharedWorker: timed out on threshold', devtoolsDetectionThreshold);
              onDevToolsDetected();
            }
          }, devtoolsDetectionThreshold);
          debugger;
          let afterDebugger = Date.now();
          status = 'end';
          if (afterDebugger - beforeDebugger >= devtoolsDetectionThreshold) {
            console.log('devtoolsDetectorSharedWorker: afterDebugger - beforeDebugger = ', afterDebugger - beforeDebugger, ' >= threshold', devtoolsDetectionThreshold);
            onDevToolsDetected();
          }
          await new Promise((resolve) => {
            setTimeout(resolve, devtoolsDetectionInterval);
          });
        }
      })();
    }
  }
}