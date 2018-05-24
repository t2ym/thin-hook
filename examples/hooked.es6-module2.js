const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module2.js,f',
  'examples/es6-module2.js,f,t',
  'S_p_console;examples/es6-module2.js,f',
  'S_p_chai;examples/es6-module2.js,f',
  'examples/es6-module2.js',
  'examples/es6-module2.js,f2',
  'examples/es6-module2.js,f2,module',
  'examples/es6-module2.js,f2,Test2',
  'examples/es6-module2.js,f2,t',
  'S_p_console;examples/es6-module2.js,f2',
  'S_p_chai;examples/es6-module2.js,f2',
  'examples/es6-module2.js,Test3',
  'examples/es6-module2.js,t',
  'S_p_console;examples/es6-module2.js',
  'S_p_chai;examples/es6-module2.js'
]);
import Test from './es6-module.js';
function f(a) {
  return __hook__(a => {
    let t = __hook__(Test, null, [a], __context_mapper__[1], true);
    __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], __context_mapper__[0])
      ]
    ], __context_mapper__[0]);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[3]], ['assert'], __context_mapper__[0]), [
      'equal',
      [
        __hook__('#.', t, ['a'], __context_mapper__[0]),
        a,
        't.a is ' + a
      ]
    ], __context_mapper__[0]);
  }, null, arguments, __context_mapper__[0]);
}
__hook__(f, null, [2], __context_mapper__[4], 0);
async function f2(a) {
  return __hook__(async a => {
    let module = await __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
      'import()',
      './es6-module.js'
    ], __context_mapper__[6], NaN);
    // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
    let Test2 = __hook__('#.', module, ['default'], __context_mapper__[7]);
    let t = __hook__(Test2, null, [a], __context_mapper__[8], true);
    __hook__('#()', $hook$.global(__hook__, __context_mapper__[5], 'console', '#get')[__context_mapper__[9]], [
      'log',
      [
        'new Test2(' + a + ').a = ',
        __hook__('#.', t, ['a'], __context_mapper__[5])
      ]
    ], __context_mapper__[5]);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[5], 'chai', '#get')[__context_mapper__[10]], ['assert'], __context_mapper__[5]), [
      'equal',
      [
        __hook__('#.', t, ['a'], __context_mapper__[5]),
        a,
        't.a is ' + a
      ]
    ], __context_mapper__[5]);
  }, null, arguments, __context_mapper__[5]);
}
__hook__('#()', __hook__(f2, null, [3], __context_mapper__[4], 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
          'import()',
          './es6-module.js'
        ], __context_mapper__[4], NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], __context_mapper__[11]);
                let a = 4;
                let t = __hook__(Test3, null, [a], __context_mapper__[12], true);
                __hook__('#()', $hook$.global(__hook__, __context_mapper__[4], 'console', '#get')[__context_mapper__[13]], [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], __context_mapper__[4])
                  ]
                ], __context_mapper__[4]);
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[4], 'chai', '#get')[__context_mapper__[14]], ['assert'], __context_mapper__[4]), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], __context_mapper__[4]),
                    a,
                    't.a is ' + a
                  ]
                ], __context_mapper__[4]);
              }, null, args, __context_mapper__[4]))]
        ], __context_mapper__[4]);
      }, null, args, __context_mapper__[4]))]
], __context_mapper__[4]);