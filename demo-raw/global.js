'use strict';
var _global_A = 1;
chai.assert.throws(() => {
  ({ inaccessible: _global_A });
}, /^Permission Denied:/)
chai.assert.throws(() => {
  ({ inaccessible: _global_A = { accessible: _global_A }.accessible });
}, /^Permission Denied:/)
{
  const logContextStack = () => {};
  logContextStack();
  const usingPromise = function usingPromise() {
    logContextStack();
    new Promise(function promiseCallback(resolve) {
        logContextStack();
        setTimeout(function setTimeoutCallback() {
          logContextStack();
          resolve(1);
        }, 100);
      })
      .then(function thenCallback(result) {
        logContextStack();
        //console.error('usingPromise.then', result);
      });
  }
  usingPromise();
  logContextStack();
}
