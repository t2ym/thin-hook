try {
  importScripts('invalid.json');
}
catch (e) {
  console.log('web-worker.js: invalidating invalid.json in importScripts', e);
}
importScripts('unauthorized-no-hook-worker-script.js?no-hook=true');
if (self.unauthorizedNoHookWorkerScriptExecuted) {
  throw new Error('web-worker.js: self.unauthorizedNoHookWorkerScriptExecuted exists');
}
try {
  Object.getOwnPropertyDescriptors(self);
  throw new Error('web-worker.js: Object.getOwnPropertyDescriptors(self) does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker.js:')) {
    throw e;
  }
  else {
    console.log('web-worker.js:', e.message);
  }
}
try {
  caches;
  throw new Error('web-worker.js: caches does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker.js:')) {
    throw e;
  }
  else {
    console.log('web-worker.js:', e.message);
  }
}
try {
  _globalObjects;
  throw new Error('web-worker.js: _globalObjects does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker.js:')) {
    throw e;
  }
  else {
    console.log('web-worker.js:', e.message);
  }
}
self.addEventListener('message', function onMessage(event) {
  console.log('web-worker.js: received message ', JSON.stringify(event.data));
  let workerResult = event.data[0] * event.data[1];
  console.log('web-worker.js: posting message ', workerResult);
  postMessage(workerResult);
});
