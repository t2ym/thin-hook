importScripts(/* @echo pluginScripts */);
/* @ifndef customHookWorkerHandler */
onmessage = hook.hookWorkerHandler;/* @endif */
/* @ifdef customHookWorkerHandler */
/* #include hookWorkerHandler.js */
/* @endif */