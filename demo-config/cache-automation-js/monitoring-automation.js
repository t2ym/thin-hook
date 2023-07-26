/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2023, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
// status.state === 'init' at the first load; value can be updated
console.log('monitoring-automation.js: invoking automation status.state = ' + status.state);
// any asynchronous statements for monitoring can be inserted here
if (location.origin !== '/* @echo targetAppOrigin */') {
  await import('/* @echo driverURL */'); // on wildcard origins
}
else {
  status.state = 'done';
  // other properties of status object can be set
  //status.automation = 'skipped';
}
