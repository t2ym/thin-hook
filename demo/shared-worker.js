importScripts('../hook.min.js?no-hook=true', 'no-hook-authorization.js?no-hook=true', 'disable-devtools.js?no-hook=true', 'bootstrap.js?no-hook=true', 'hook-callback.js?no-hook=true', 'hook-native-api.js?no-hook=true');
onconnect = function(event) {
  let port = event.ports[0];

  port.addEventListener('message', function onMessage(event) {
    console.log('shared-worker.js: received message ', JSON.stringify(event.data));
    let workerResult = event.data[0] * event.data[1];
    console.log('shared-worker.js: posting message ', workerResult);
    port.postMessage(workerResult);
  });
  port.start();
}
