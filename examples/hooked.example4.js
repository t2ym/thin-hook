{
  hook.global(__hook__, 'examples/example4.js', 'setTimeout', 'get')._p_setTimeout(function X() {
    return __hook__(() => {
      __hook__('()', console, [
        'log',
        ['setTimeout function']
      ], 'examples/example4.js,X');
    }, null, arguments, 'examples/example4.js,X');
  }, 1000);
  hook.global(__hook__, 'examples/example4.js', 'setTimeout', 'get')._p_setTimeout((...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setTimeout arrow function']
      ], 'examples/example4.js');
    }, null, args, 'examples/example4.js')), 1000);
  __hook__('()', hook, [
    'setTimeout',
    [
      '__hook__',
      [[
          'examples/example4.js',
          {}
        ]],
      'method'
    ]
  ], 'examples/example4.js')('console.log("setTimeout string")', 1000);
  let f1 = (...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setTimeout f1']
      ], 'examples/example4.js,f1');
    }, null, args, 'examples/example4.js,f1'));
  __hook__('()', hook, [
    'setTimeout',
    [
      '__hook__',
      [[
          'examples/example4.js',
          {}
        ]],
      'method'
    ]
  ], 'examples/example4.js')(f1, 1000);
  hook.global(__hook__, 'examples/example4.js', 'setInterval', 'get')._p_setInterval(function X() {
    return __hook__(() => {
      __hook__('()', console, [
        'log',
        ['setInterval function']
      ], 'examples/example4.js,X');
    }, null, arguments, 'examples/example4.js,X');
  }, 1000);
  hook.global(__hook__, 'examples/example4.js', 'setInterval', 'get')._p_setInterval((...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setInterval arrow function']
      ], 'examples/example4.js');
    }, null, args, 'examples/example4.js')), 1000);
  __hook__('()', hook, [
    'setInterval',
    [
      '__hook__',
      [[
          'examples/example4.js',
          {}
        ]],
      'method'
    ]
  ], 'examples/example4.js')('console.log("setInterval string")', 1000);
  let f2 = (...args) =>
    (__hook__(() => {
      __hook__('()', console, [
        'log',
        ['setInterval f2']
      ], 'examples/example4.js,f2');
    }, null, args, 'examples/example4.js,f2'));
  __hook__('()', hook, [
    'setInterval',
    [
      '__hook__',
      [[
          'examples/example4.js',
          {}
        ]],
      'method'
    ]
  ], 'examples/example4.js')(f2, 1000);
}