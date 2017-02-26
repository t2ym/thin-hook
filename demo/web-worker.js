importScripts('../hook.min.js?no-hook=true', 'no-hook-authorization.js?no-hook=true', 'hook-callback.js?no-hook=true', 'hook-native-api.js?no-hook=true');
self.addEventListener('message', function onMessage(event) {
  console.log('web-worker.js: received message ', JSON.stringify(event.data));
  let workerResult = event.data[0] * event.data[1];
  console.log('web-worker.js: posting message ', workerResult);
  postMessage(workerResult);
});
