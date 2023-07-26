/* additional parameters in hook.parameters.name = value; ... */
/* @ifdef enableMonitoring */
hook.parameters.noHook = [
  url => new URL(url).origin === '/* @echo reporterOrigin */',
];
/* @endif */