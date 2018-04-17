importScripts('../hook.min.js?no-hook=true', 'context-generator.js?no-hook=true', 'bootstrap.js?no-hook=true');
onmessage = hook.hookWorkerHandler;