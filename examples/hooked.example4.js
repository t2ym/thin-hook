{
  __hook__(setTimeout, null, [
    function X() {
      return __hook__(() => {
        __hook__('()', console, [
          'log',
          ['setTimeout function']
        ], 'examples/example4.js,X');
      }, null, arguments, 'examples/example4.js,X');
    },
    1000
  ], 'examples/example4.js', 0);
  __hook__(setTimeout, null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', console, [
          'log',
          ['setTimeout arrow function']
        ], 'examples/example4.js');
      }, null, args, 'examples/example4.js')),
    1000
  ], 'examples/example4.js', 0);
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')('console.log("setTimeout string")', 1000);
  let f1 = (...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setTimeout f1']
      ], 'examples/example4.js,f1');
    }, null, args, 'examples/example4.js,f1'));
  $hook$.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')(f1, 1000);
  __hook__(setInterval, null, [
    function X() {
      return __hook__(() => {
        __hook__('()', console, [
          'log',
          ['setInterval function']
        ], 'examples/example4.js,X');
      }, null, arguments, 'examples/example4.js,X');
    },
    1000
  ], 'examples/example4.js', 0);
  __hook__(setInterval, null, [
    (...args) =>
      (__hook__(() => {
        __hook__('()', console, [
          'log',
          ['setInterval arrow function']
        ], 'examples/example4.js');
      }, null, args, 'examples/example4.js')),
    1000
  ], 'examples/example4.js', 0);
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')('console.log("setInterval string")', 1000);
  let f2 = (...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setInterval f2']
      ], 'examples/example4.js,f2');
    }, null, args, 'examples/example4.js,f2'));
  $hook$.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')(f2, 1000);
}