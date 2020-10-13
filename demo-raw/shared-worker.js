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
