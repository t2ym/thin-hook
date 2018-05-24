const __context_mapper__ = $hook$.$(__hook__, [
  'examples/example4.js',
  '_p_setTimeout;examples/example4.js',
  'examples/example4.js,X',
  '_p_console;examples/example4.js,X',
  '_p_console;examples/example4.js',
  'examples/example4.js,f1',
  '_p_console;examples/example4.js,f1',
  '_p_setInterval;examples/example4.js',
  'examples/example4.js,f2',
  '_p_console;examples/example4.js,f2'
]);
{
  __hook__($hook$.global(__hook__, __context_mapper__[0], 'setTimeout', 'get')[__context_mapper__[1]], null, [
    function X() {
      return __hook__(() => {
        __hook__('()', $hook$.global(__hook__, __context_mapper__[2], 'console', 'get')[__context_mapper__[3]], [
          'log',
          ['setTimeout function']
        ], __context_mapper__[2]);
      }, null, arguments, __context_mapper__[2]);
    },
    1000
  ], __context_mapper__[0], 0);
  __hook__($hook$.global(__hook__, __context_mapper__[0], 'setTimeout', 'get')[__context_mapper__[1]], null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', $hook$.global(__hook__, __context_mapper__[0], 'console', 'get')[__context_mapper__[4]], [
          'log',
          ['setTimeout arrow function']
        ], __context_mapper__[0]);
      }, null, args, __context_mapper__[0])),
    1000
  ], __context_mapper__[0], 0);
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')('console.log("setTimeout string")', 1000);
  let f1 = (...args) =>
    (__hook__(() => {
      __hook__('()', $hook$.global(__hook__, __context_mapper__[5], 'console', 'get')[__context_mapper__[6]], [
        'log',
        ['setTimeout f1']
      ], __context_mapper__[5]);
    }, null, args, __context_mapper__[5]));
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')(f1, 1000);
  __hook__($hook$.global(__hook__, __context_mapper__[0], 'setInterval', 'get')[__context_mapper__[7]], null, [
    function X() {
      return __hook__(() => {
        __hook__('()', $hook$.global(__hook__, __context_mapper__[2], 'console', 'get')[__context_mapper__[3]], [
          'log',
          ['setInterval function']
        ], __context_mapper__[2]);
      }, null, arguments, __context_mapper__[2]);
    },
    1000
  ], __context_mapper__[0], 0);
  __hook__($hook$.global(__hook__, __context_mapper__[0], 'setInterval', 'get')[__context_mapper__[7]], null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', $hook$.global(__hook__, __context_mapper__[0], 'console', 'get')[__context_mapper__[4]], [
          'log',
          ['setInterval arrow function']
        ], __context_mapper__[0]);
      }, null, args, __context_mapper__[0])),
    1000
  ], __context_mapper__[0], 0);
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')('console.log("setInterval string")', 1000);
  let f2 = (...args) =>
    (__hook__(() => {
      __hook__('()', $hook$.global(__hook__, __context_mapper__[8], 'console', 'get')[__context_mapper__[9]], [
        'log',
        ['setInterval f2']
      ], __context_mapper__[8]);
    }, null, args, __context_mapper__[8]));
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'cachedMethod')(f2, 1000);
}