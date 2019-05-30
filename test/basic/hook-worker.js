importScripts('../hook.min.js?no-hook=true', '../script-hashes.js?no-hook=true&service-worker-ready=true');
onmessage = hook.hookWorkerHandler;