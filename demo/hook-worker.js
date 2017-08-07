importScripts('../hook.min.js?no-hook=true', 'context-generator.js?no-hook=true');
onmessage = function onMessage(event) {
  if (event.data === 'channel') {
    let port = event.ports[0];
    port.onmessage = function (hookEvent) {
      let message = JSON.parse(hookEvent.data);
      let id = message.shift();
      let type = message.shift();
      let parameters = message;
      let result;
      try {
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
        let end = Date.now();
      }
      catch (e) {
        port.postMessage(JSON.stringify([ id, 'error', e.toString() ], null, 0));
      }
    }
  }
}
