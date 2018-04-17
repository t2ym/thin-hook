import '../hook.min.js?no-hook=true';
import './no-hook-authorization.js?no-hook=true';
import './bootstrap.js?no-hook=true';
import './hook-callback.js?no-hook=true';
import './hook-native-api.js?no-hook=true';
import Test from './es6-module.js';
try {
  importScripts('invalid.json');
}
catch (e) {
  console.log('web-worker-module.js: invalidating invalid.json in importScripts', e);
}
try {
  Object.getOwnPropertyDescriptors(self);
  throw new Error('web-worker-module.js: Object.getOwnPropertyDescriptors(self) does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker-module.js:')) {
    throw e;
  }
  else {
    console.log('web-worker-module.js:', e.message);
  }
}
try {
  caches;
  throw new Error('web-worker-module.js: caches does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker-module.js:')) {
    throw e;
  }
  else {
    console.log('web-worker-module.js:', e.message);
  }
}
try {
  _globalObjects;
  throw new Error('web-worker-module.js: _globalObjects does not throw');
}
catch (e) {
  if (e.message.startsWith('web-worker-module.js:')) {
    throw e;
  }
  else {
    console.log('web-worker-module.js:', e.message);
  }
}
self.addEventListener('message', function onMessage(event) {
  console.log('web-worker-module.js: received message ', JSON.stringify(event.data));
  let workerResult = event.data[0] * event.data[1];
  console.log('web-worker-module.js: posting message ', workerResult);
  postMessage(workerResult);
});
