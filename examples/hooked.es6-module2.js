import Test from './es6-module.js';
function f(a) {
  return __hook__(a => {
    let t = __hook__(Test, null, [a], 'examples/es6-module2.js,f,t', true);
    __hook__('#()', $hook$.global(__hook__, 'examples/es6-module2.js,f', 'console', '#get')['S_p_console;examples/es6-module2.js,f'], [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], 'examples/es6-module2.js,f')
      ]
    ], 'examples/es6-module2.js,f');
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, 'examples/es6-module2.js,f', 'chai', '#get')['S_p_chai;examples/es6-module2.js,f'], ['assert'], 'examples/es6-module2.js,f'), [
      'equal',
      [
        __hook__('#.', t, ['a'], 'examples/es6-module2.js,f'),
        a,
        't.a is ' + a
      ]
    ], 'examples/es6-module2.js,f');
  }, null, arguments, 'examples/es6-module2.js,f');
}
__hook__(f, null, [2], 'examples/es6-module2.js', 0);
async function f2(a) {
  return __hook__(async a => {
    let module = await __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
      'import()',
      './es6-module.js'
    ], 'examples/es6-module2.js,f2,module', NaN);
    // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
    let Test2 = __hook__('#.', module, ['default'], 'examples/es6-module2.js,f2,Test2');
    let t = __hook__(Test2, null, [a], 'examples/es6-module2.js,f2,t', true);
    __hook__('#()', $hook$.global(__hook__, 'examples/es6-module2.js,f2', 'console', '#get')['S_p_console;examples/es6-module2.js,f2'], [
      'log',
      [
        'new Test2(' + a + ').a = ',
        __hook__('#.', t, ['a'], 'examples/es6-module2.js,f2')
      ]
    ], 'examples/es6-module2.js,f2');
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, 'examples/es6-module2.js,f2', 'chai', '#get')['S_p_chai;examples/es6-module2.js,f2'], ['assert'], 'examples/es6-module2.js,f2'), [
      'equal',
      [
        __hook__('#.', t, ['a'], 'examples/es6-module2.js,f2'),
        a,
        't.a is ' + a
      ]
    ], 'examples/es6-module2.js,f2');
  }, null, arguments, 'examples/es6-module2.js,f2');
}
__hook__('#()', __hook__(f2, null, [3], 'examples/es6-module2.js', 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
          'import()',
          './es6-module.js'
        ], 'examples/es6-module2.js', NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], 'examples/es6-module2.js,Test3');
                let a = 4;
                let t = __hook__(Test3, null, [a], 'examples/es6-module2.js,t', true);
                __hook__('#()', $hook$.global(__hook__, 'examples/es6-module2.js', 'console', '#get')['S_p_console;examples/es6-module2.js'], [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], 'examples/es6-module2.js')
                  ]
                ], 'examples/es6-module2.js');
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, 'examples/es6-module2.js', 'chai', '#get')['S_p_chai;examples/es6-module2.js'], ['assert'], 'examples/es6-module2.js'), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], 'examples/es6-module2.js'),
                    a,
                    't.a is ' + a
                  ]
                ], 'examples/es6-module2.js');
              }, null, args, 'examples/es6-module2.js'))]
        ], 'examples/es6-module2.js');
      }, null, args, 'examples/es6-module2.js'))]
], 'examples/es6-module2.js');