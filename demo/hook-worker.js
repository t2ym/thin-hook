importScripts('../hook.min.js?no-hook=true', 'context-generator.js?no-hook=true');
onmessage = function onMessage(event) {
  if (event.data === 'channel') {
    let port = event.ports[0];
    port.onmessage = function (hookEvent) {
      let message;
      try {
        message = JSON.parse(hookEvent.data);
      }
      catch (parseError) {
        console.error('Hook worker: unknown hookEvent message ', hookEvent.data);
        return;
      }
      let id = message.shift();
      let type = message.shift();
      let parameters = message;
      let result;
      try {
        //console.log('Hook worker: received request ' + id);
        switch (type) {
        case 'text/javascript':
          result = hook(...parameters);
          break;
        case 'text/html':
          result = hook.hookHtml(...parameters);
          break;
        default:
          throw new Error('hookWorker: Unknown type: ' + type);
          break;
        }
        port.postMessage(JSON.stringify([ id, 'success', result ], null, 0));
      }
      catch (e) {
        port.postMessage(JSON.stringify([ id, 'error', e.toString() ], null, 0));
      }
    }
  }
  else {
    console.error('Hook worker: unknown message ', event.data);
  }
}
