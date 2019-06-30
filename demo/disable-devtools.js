/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  if (typeof hook === 'function') {
    hook.parameters.appPathRoot = '/'; // The app assets are under location.origin + appPathRoot
  }
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
        if (top.hook && top.hook.parameters && top.hook.parameters.baseURI) {
          baseURI = top.hook.parameters.baseURI;
        }
        else {
          top.location = 'about:blank';
        }
      }
      break;
    case 'ServiceWorkerGlobalScope':
      if (new URL(location.href).searchParams.has('service-worker-initiator')) {
        baseURI = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
      }
      else if (location.pathname.includes('/disable-devtools.js')) {
        baseURI = location.href;
        self.disableDevToolsAsServiceWorker = true;
      }
      self.devToolsDetectedAtServiceWorker = false;
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
    const criticalServiceWorkerGlobalObjectsWrapper = function criticalServiceWorkerGlobalObjectsWrapper(name) {
      return self[name];
    }
    const onDevToolsDetected = function (type) {
      switch (self.constructor.name) {
      case 'Window':
        //console.clear();
        let script = Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook.min.js/))[0];
        let src = new URL(script.src, window.location.href);
        let swRoot = src.searchParams.get('sw-root') || window.location.pathname.replace(/\/[^\/]*$/, '/');
        navigator.serviceWorker.register(new URL('disable-devtools.js', baseURI).href, { scope: swRoot }).then(() => {
          navigator.serviceWorker.getRegistration().then(registration => {
            registration.update();
            location = 'about:blank';
          });
        });
        //navigator.serviceWorker.getRegistration().then(registration => { console.log('onDevToolsDetected: unregister Service Worker'); registration.unregister(); });
        break;
      case 'ServiceWorkerGlobalScope':
        console.clear();
        const version = (new URL(location.href)).searchParams.get('version') || '1';
        const CONFIGURATIONS_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/configurations.json';
        criticalServiceWorkerGlobalObjectsWrapper('caches').keys()
          .then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || criticalServiceWorkerGlobalObjectsWrapper('caches').delete(key))))
          .then(() => {
            criticalServiceWorkerGlobalObjectsWrapper('caches').open('version_' + version)
              .then(function(cache) {
                cache.keys()
                  .then(function(keys) {
                    keys.forEach(function(request) {
                      if (request.url !== CONFIGURATIONS_PSEUDO_URL) {
                        cache.delete(request);
                      }
                    });
                    switch (type) {
                    case 'view-source':
                      break;
                    default:
                      haltDebugger('self', 'r');
                      break;
                    }
                  });
            });
          });
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
    const commandLineAPIs = ['getEventListeners']; // The longer the list, the more overheads.
    const _self = self;
    let halted = false;
    const isFromCommandLine = function () {
      if (halted) {
        return true;
      }
      let result = false;
      let i = 0;
      while (!result && i < commandLineAPIs.length) {
        let f = _self[commandLineAPIs[i]];
        if (typeof f === 'function' && f.toString().includes('Command Line API')) {
          result = true;
          break;
        }
        i++;
      }
      return result;
    }
    const _Error = Error;
    const _location = location.href;
    const _console = console;
    const _JSON = JSON;
    if (typeof self === 'object' && self.constructor.name === 'ServiceWorkerGlobalScope') {
      _Error.stackTraceLimit = Infinity;
      Object.freeze(_Error);
    }
    const isFromServiceWorker = function () {
      const rawStack = new _Error().stack;
      const stack = rawStack.split(/\n/);
      const thirdLine = stack[3];
      const lastLine = stack[stack.length - 1];
      let result = lastLine.includes(_location) &&
        ((thirdLine.includes('criticalServiceWorkerGlobalObjectsWrapper') && !rawStack.includes('eval at <anonymous>')) ||
         (!lastLine.includes('haltDebugger') && !lastLine.includes('devtoolsDetectorMessageHandlerForServiceWorker')));
      //_console.log((result ? '' : '!') + 'isFromServiceWorker ' + _JSON.stringify(stack, null, 2));
      return result;
    }
    const isFromDevTools = function () {
      const stack = (new _Error().stack).split(/\n/);
      //console.log('isFromDevTools', JSON.stringify(stack, null, 2));
      return stack && stack.length > 0 && (
        stack[stack.length - 1].includes('remoteFunction') ||
        (stack.length > 3 && stack[stack.length - 3].includes('remoteFunction')));
    }
    const _originalFetch = self.fetch;
    const criticalServiceWorkerGlobalObjects = typeof self === 'object' && self.constructor.name === 'ServiceWorkerGlobalScope'
      ? [
          [WorkerGlobalScope.prototype, 'caches'],
          [EventTarget.prototype, 'addEventListener'],
          [EventTarget.prototype, 'removeEventListener'],
          [self, 'registration'],
          [self, 'fetch'],
          [self, 'onfetch'],
          [self, 'oninstall'],
          [self, 'onactivate'],
          [self, 'onmessage'],
          [self, 'hook'], // Note: hook and $hook$ are configurable only in Service Worker
          [self, '$hook$'],
        ]
      : null;
    const errorReportBaseUrl = (new URL('errorReport.json', baseURI)).pathname;
    const _Headers = Headers;
    const reportHacking = async function reportHacking(property, opType) {
      let errorReportUrl = errorReportBaseUrl;
      let data = {
        'context': 'ServiceWorkerGlobalScope,console',
        'error': 'HackingDetected',
        'message': 'Hacking to Service Worker via Dev Tools is detected',
        'name': 'self',
        'isStatic': true,
        'isObject': true,
        'property': property,
        'opType': opType,
      };
      //console.log('reportHacking', JSON.stringify(data, null, 2));
      let errorReportResponseJSON;
      try {
        let errorReportResponse = await _originalFetch(errorReportUrl, {
          method: 'POST', // Note: On 'GET' method, make sure the request reaches the server through the Service Worker with appropriate cache control.
          headers: new _Headers({
            'Content-Type': 'application/json'
          }),
          body: _JSON.stringify(data,null,0),
          mode: 'same-origin',
          cache: 'no-cache'
        });
        let errorReportResponseText = await errorReportResponse.text();
        errorReportResponseJSON = _JSON.parse(errorReportResponseText) || {};
      }
      catch (e) {
        errorReportResponseJSON = {
          severity: 'permissive' // default severity on a fetch error
        };
      }
      finally {
        switch (errorReportResponseJSON.severity) {
        case 'critical':
        default:
          self.devToolsDetectedAtServiceWorker = true; // Note: This should have been set as true
          return false;
        case 'observing':
        case 'permissive':
          return true;
        }
      }
    }
    const deleteGlobals = function () {
      let _object = self;
      let _ObjectEntries = Object.entries;
      let _Object = Object;
      let _getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
      let _getPrototypeOf = Object.getPrototypeOf;
      while (_object) {
        _ObjectEntries.call(_Object, _getOwnPropertyDescriptors.call(_Object, _object)).forEach(([name, desc]) => {
          if (desc.configurable) {
            delete _object[name];
          }
        });
        _object = _getPrototypeOf.call(_Object, _object);
      }
    }
    const haltDebugger = async function haltDebugger (property, opType) {
      // Optionally report the hacking behavior to the server via _originalFetch.
      await reportHacking(property, opType);
      // Optionally show some warning messages to the console against the hacking
      console.log('!!! WARNING !!! You are not expected to analyze or modify the application. Your hacking activities are being monitored by the server.');
      const _eval = eval;
      criticalServiceWorkerGlobalObjectsWrapper('registration').update();
      halted = true; // isFromCommandLine always returns true
      deleteGlobals(); // Note: Say sayonara to the world
      //_eval('while (true) { debugger; }'); // Note: Stop responding to fetch events as well; 1 thread in the infinite loop with 100% usage
    }
    const paralyzeServiceWorkerConsole = function (targets) {
      targets.forEach(([object, property]) => {
        let desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc) {
          if (desc.value) {
            Object.defineProperty(object, property, {
              configurable: false,
              enumerable: desc.enumerable,
              get: function get () {
                if (!isFromServiceWorker()) {
                  haltDebugger(property, 'r');
                  return undefined;
                }
                return desc.value;
              }
            });
          }
          else if (desc.set) {
            Object.defineProperty(object, property, {
              configurable: false,
              enumerable: desc.enumerable,
              get: function get () {
                if (!isFromServiceWorker()) {
                  haltDebugger(property, 'r');
                  return undefined;
                }
                return desc.get.call(this);
              },
              set: function set (value) {
                if (!isFromServiceWorker()) {
                  haltDebugger(property, 'w');
                  return undefined;
                }
                return desc.set.call(this, value);
              },
            });
          }
          else if (desc.get) {
            Object.defineProperty(object, property, {
              configurable: false,
              enumerable: desc.enumerable,
              get: function get () {
                if (!isFromServiceWorker()) {
                  haltDebugger(property, 'r');
                  return undefined;
                }
                return desc.get.call(this);
              },
            });
          }
        }
      });
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
        const port = event.ports[0];
        //console.log('devtoolsDetectorMessageHandlerForServiceWorker: message received', JSON.stringify(event.data));
        const beforeDebugger = Date.now();
        const workerResult = ['plugin', 'DevToolsDetection', 'start', beforeDebugger]; // start response
        //console.log('devtoolsDetectorMessageHandlerForServiceWorker: postMessage', JSON.stringify(workerResult));
        port.postMessage(workerResult);
        setTimeout(() => {
          if (workerResult[2] === 'start') {
            console.log('devtoolsDetectorMessageHandlerForServiceWorker: timed out on threshold', event.data[2]);
            onDevToolsDetected();
          }
        }, event.data[2]);
        (new Function('debugger'))(); // hide variables in the closure
        const afterDebugger = Date.now();
        workerResult[2] = 'end';
        workerResult[3] = devToolsDetectedAtServiceWorker ? event.data[2] : afterDebugger - beforeDebugger;
        //console.log('devtoolsDetectorMessageHandlerForServiceWorker: postMessage', JSON.stringify(workerResult), devToolsDetectedAtServiceWorker);
        port.postMessage(workerResult);
        if (workerResult[3] >= event.data[2] || devToolsDetectedAtServiceWorker) {
          console.log('devtoolsDetectorMessageHandlerForServiceWorker: afterDebugger - beforeDebugger = ', workerResult[3], ' >= threshold', event.data[2]);
          onDevToolsDetected(devToolsDetectedAtServiceWorker);
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
                    //console.log('disable-devtools.js: received', JSON.stringify(event.data));
                    status = 'start';
                    setTimeout(() => {
                      status = 'timeout';
                      resolve(devtoolsDetectionThreshold);
                    }, devtoolsDetectionThreshold);
                    break;
                  case 'end':
                    //console.log('disable-devtools.js: received', JSON.stringify(event.data));
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
              //console.log('disable-devtools.js: posting message to Service Worker', JSON.stringify(message));
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
              //console.log('disable-devtools.js: within the threshold', response);
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
    if (self.constructor.name === 'ServiceWorkerGlobalScope' && !self.disableDevToolsAsServiceWorker) {
      const start = Date.now();
      debugger;
      const end = Date.now();
      if (!self.devtoolsDetectorForServiceWorkerInstalled) {
        self.devtoolsDetectorForServiceWorkerInstalled = true;
        console.log('disable-devtools.js: installing message handler to Service Worker');
        self.addEventListener('message', devtoolsDetectorMessageHandlerForServiceWorker);
        // Access to caches or registration paralyzes the console
        paralyzeServiceWorkerConsole(criticalServiceWorkerGlobalObjects);
      }
      if (end - start >= devtoolsDetectionThreshold) {
        onDevToolsDetected();
      }
      // Referrer Policy
      let base = new URL(baseURI);
      let aboutBlankRedirectorUrl = new URL('about-blank-redirector.html', base).href;
      let appUrlStartsWith = base.origin + (hook.parameters.appPathRoot || '/');
      const originalCheckRequest = hook.parameters.checkRequest;
      hook.parameters.checkRequest = function (event, response, cache) {
        let url = new URL(event.request.url);
        let action = 'pass';
        if (url.origin + url.pathname === baseURI) {
          // entry URI
          /*
          console.log('checkRequest: request.url = ', event.request.url, 
            ' referrer = ', event.request.referrer, 
            ' isReload = ', event.isReload, 
            ' request.destination = ', event.request.destination,
            ' event.clientId = ', event.clientId); // Disappointingly, clientId is always empty and useless
          */
          action = 'pass'; // check via the ping service
        }
        else {
          // non-entry URI
          if (!event.request.referrer) {
            if (url.pathname.endsWith('.svg') && url.searchParams.get('referrer') === 'hook.parameters.emptySvg') {
              // Note: ?referrer=hook.parameters.emptySvg is appended to URL for SVG in hook.parameters.emptySvg
              //       Any recognizable strings in URL can be used for the detection.
              action = 'pass'; // pass .svg requests with no referrer only from hook.parameters.emptySvg
            }
            else {
              if (!event.request.destination || event.request.destination === 'sharedworker') {
                action = 'pass'; // SharedWorker script
              }
              else {
                action = 'reject'; // reject no referrer
              }
            }
          }
          else if (event.request.url.startsWith(appUrlStartsWith)) {
            if (event.request.referrer.startsWith(appUrlStartsWith)) {
              action = 'pass';
            }
            else {
              action = 'reject'; // reject out of app referrers
            }
          }
          else {
            action = 'pass';
          }
        }
        if (action === 'reject') {
          console.error('hook.parameters.checkRequest: rejecting url = ' + event.request.url + ' with referrer = ' + event.request.referrer);
          self.devToolsDetectedAtServiceWorker = 'view-source'; // Note: Invalid access to resources is treated as Dev Tools detection
          return Response.redirect('about:blank');
        }
        if (originalCheckRequest) {
          return originalCheckRequest(event, response, cache);
        }
        else {
          return response;
        }
      };
      // Check Clients from Service Worker
      let clientsRecentRequests = new Map();
      let clientsLastResponses = new Map();
      let pingClientsIntervalId = setInterval(async () => {
        (await self.clients.matchAll()).forEach(client => {
          let url = new URL(client.url);
          if (url.origin + url.pathname === baseURI ||
              url.origin + url.pathname === baseURI + 'index.html') {
            // entry URI
            //console.log('pingClients: found entry URI client id =', client.id, ' url = ', client.url);
            let channel = new MessageChannel();
            let requestTimestamp = Date.now();
            channel.port1.addEventListener('message', (event) => {
              if (Array.isArray(event.data) && event.data[0] === 'ping' && event.data[1] === client.id) {
                //console.log('pingClients: received response id = ', client.id);
                let rtt = Date.now() - event.data[2];
                clientsLastResponses.set(client.id, rtt);
                let recentRequests = clientsRecentRequests.get(client.id);
                if (recentRequests) {
                  while (recentRequests.length > 0 && recentRequests[0] <= event.data[2]) {
                    recentRequests.shift();
                  }
                }
              }
            });
            channel.port1.start();
            //console.log('pingClients: sending request id = ', client.id);
            client.postMessage([ 'ping', client.id, requestTimestamp ], [ channel.port2 ]);
            let recentRequests = clientsRecentRequests.get(client.id);
            if (!recentRequests) {
              recentRequests = [requestTimestamp]; // [oldest unresponded, ...,  newest]
              clientsRecentRequests.set(client.id, recentRequests);
            }
            else {
              recentRequests.push(requestTimestamp);
            }
          }
        });
      }, devtoolsDetectionInterval);
      let checkClientsIntervalId = setInterval(async () => {
        let ids;
        let activeClients;
        let allClients;
        allClients = await self.clients.matchAll();
        activeClients = allClients.filter(client => {
          let url = new URL(client.url);
          return url.origin + url.pathname === baseURI || url.origin + url.pathname === baseURI + 'index.html';
        });
        ids = activeClients.map(client => client.id);
        //console.log('pingClients: activeClients ', JSON.stringify(ids));
        let svgClients;
        svgClients = allClients.filter(client => {
          let url = new URL(client.url);
          return url.pathname.match(/[.]svg$/);
        });
        let closed = new Set();
        let noResponses = new Set();
        let longestRtt = -1;
        for (let [ id, rtt ] of clientsLastResponses.entries()) {
          if (longestRtt < rtt) {
            longestRtt = rtt;
          }
        }
        if (longestRtt < 0) {
          // no rtt yet; no timeout until at least one rtt is observed
          longestRtt = Infinity;
        }
        else if (longestRtt < devtoolsDetectionInterval) {
          // longestRtt = min(small rtt, devtoolsDetectionInterval)
          longestRtt = devtoolsDetectionInterval;
        }
        //console.log('longestRtt = ', longestRtt);
        //console.log('clientsRecentRequests', clientsRecentRequests);
        //console.log('clientsLastResponses', clientsLastResponses);
        for (let [ id, recentRequests ] of clientsRecentRequests.entries()) {
          //console.log('pingClients: entry id = ', id, ' recentRequests = ', JSON.stringify(recentRequests));
          if (ids.includes(id)) {
            let rtt = clientsLastResponses.has(id) ? clientsLastResponses.get(id) : undefined;
            if (typeof rtt === 'undefined') {
              rtt = Date.now() - (recentRequests[0] || 0);
            }
            //console.log('pingClients: rtt = ', rtt, ' for id = ', id, ' recentRequests = ', JSON.stringify(recentRequests));
            if (rtt >= longestRtt * 2) {
              // no response for long time
              //console.log('pingClients: no responses for id = ', id);
              noResponses.add(id);
            }
          }
          else {
            //console.log('pingClients: closed.add(id = ' + id + ')');
            closed.add(id);
          }
        }
        for (let [ id, rtt ] of clientsLastResponses.entries()) {
          if (!ids.includes(id)) {
            //console.log('pingClients: closed.add(id = ' + id + ')');
            closed.add(id);
          }
        }
        // clean up closed clients
        for (let id of closed.values()) {
          clientsRecentRequests.delete(id);
          clientsLastResponses.delete(id);
        }
        // take actions for clients with no or delayed responses
        for (let client of activeClients) {
          if (noResponses.has(client.id)) {
            client.navigate(aboutBlankRedirectorUrl); // Navigate client with no responses to about:blank
            clientsRecentRequests.delete(client.id);
            self.devToolsDetectedAtServiceWorker = true; // shutdown the app
          }
        }
        for (let client of svgClients) {
          if (client.frameType === 'top-level') {
            client.navigate(aboutBlankRedirectorUrl); // Navigate SVG image client in non-nested frames to about:blank
            self.devToolsDetectedAtServiceWorker = 'view-source'; // shutdown the app
          }
        }
      }, devtoolsDetectionInterval);
    }
    else if (self.constructor.name === 'ServiceWorkerGlobalScope' && self.disableDevToolsAsServiceWorker) {
      const _Response = Response;
      const _skipWaiting = skipWaiting;
      const _clients = clients;
      addEventListener('install', function(event) {
        _skipWaiting();
      });

      addEventListener('activate', function(event) {
        _clients.claim();
        if (typeof self === 'object') {
          deleteGlobals();
        }
      });

      addEventListener('fetch', function(event) {
        return _Response.redirect('about:blank');
      });

      if (typeof setTimeout === 'function') {
        setTimeout(deleteGlobals, 0);
      }
    }
    if (self.constructor.name === 'SharedWorkerGlobalScope') {
      (async function () {
        while (true) {
          //console.log('devtoolsDetectorSharedWorker: started');
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