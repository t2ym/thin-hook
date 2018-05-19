{
  __hook__($hook$.global(__hook__, 'examples/example4.js', 'setTimeout', 'get')['_p_setTimeout;examples/example4.js'], null, [
    function X() {
      return __hook__(() => {
        __hook__('()', $hook$.global(__hook__, 'examples/example4.js,X', 'console', 'get')['_p_console;examples/example4.js,X'], [
          'log',
          ['setTimeout function']
        ], 'examples/example4.js,X');
      }, null, arguments, 'examples/example4.js,X');
    },
    1000
  ], 'examples/example4.js', 0);
  __hook__($hook$.global(__hook__, 'examples/example4.js', 'setTimeout', 'get')['_p_setTimeout;examples/example4.js'], null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', $hook$.global(__hook__, 'examples/example4.js', 'console', 'get')['_p_console;examples/example4.js'], [
          'log',
          ['setTimeout arrow function']
        ], 'examples/example4.js');
      }, null, args, 'examples/example4.js')),
    1000
  ], 'examples/example4.js', 0);
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')('console.log("setTimeout string")', 1000);
  let f1 = (...args) =>
    (__hook__(() => {
      __hook__('()', $hook$.global(__hook__, 'examples/example4.js,f1', 'console', 'get')['_p_console;examples/example4.js,f1'], [
        'log',
        ['setTimeout f1']
      ], 'examples/example4.js,f1');
    }, null, args, 'examples/example4.js,f1'));
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')(f1, 1000);
  __hook__($hook$.global(__hook__, 'examples/example4.js', 'setInterval', 'get')['_p_setInterval;examples/example4.js'], null, [
    function X() {
      return __hook__(() => {
        __hook__('()', $hook$.global(__hook__, 'examples/example4.js,X', 'console', 'get')['_p_console;examples/example4.js,X'], [
          'log',
          ['setInterval function']
        ], 'examples/example4.js,X');
      }, null, arguments, 'examples/example4.js,X');
    },
    1000
  ], 'examples/example4.js', 0);
  __hook__($hook$.global(__hook__, 'examples/example4.js', 'setInterval', 'get')['_p_setInterval;examples/example4.js'], null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', $hook$.global(__hook__, 'examples/example4.js', 'console', 'get')['_p_console;examples/example4.js'], [
          'log',
          ['setInterval arrow function']
        ], 'examples/example4.js');
      }, null, args, 'examples/example4.js')),
    1000
  ], 'examples/example4.js', 0);
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')('console.log("setInterval string")', 1000);
  let f2 = (...args) =>
    (__hook__(() => {
      __hook__('()', $hook$.global(__hook__, 'examples/example4.js,f2', 'console', 'get')['_p_console;examples/example4.js,f2'], [
        'log',
        ['setInterval f2']
      ], 'examples/example4.js,f2');
    }, null, args, 'examples/example4.js,f2'));
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')(f2, 1000);
}