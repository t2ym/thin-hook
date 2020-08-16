const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module2.js',
  'S_p_chai;examples/es6-module2.js',
  'S_p_console;examples/es6-module2.js',
  'S_p_Object;examples/es6-module2.js',
  'examples/es6-module2.js,f',
  'examples/es6-module2.js,f,t',
  'S_p_console;examples/es6-module2.js,f',
  'S_p_chai;examples/es6-module2.js,f',
  'examples/es6-module2.js,f2',
  'examples/es6-module2.js,f2,module',
  'examples/es6-module2.js,f2,Test2',
  'examples/es6-module2.js,f2,t',
  'S_p_console;examples/es6-module2.js,f2',
  'S_p_chai;examples/es6-module2.js,f2',
  'examples/es6-module2.js,Test3',
  'examples/es6-module2.js,t'
]);
import Test from './es6-module.js';
import {
  constant,
  variable,
  func,
  MutatableClass,
  v2,
  setv2
} from './es6-module.js';
import * as mod from './es6-module.js';
import * as mod2 from './es6-module.js';
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    constant,
    1,
    'constant is 1'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    variable,
    1,
    'variable is 1'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    v2,
    2,
    'v2 is 2'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__(func, null, [], __context_mapper__[0], 0),
    1,
    'func() returns 1'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['constant'], __context_mapper__[0]),
    constant,
    'mod.constant === constant'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['variable'], __context_mapper__[0]),
    variable,
    'mod.variable === variable'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['v2'], __context_mapper__[0]),
    v2,
    'mod.v2 === v2'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['func'], __context_mapper__[0]),
    func,
    'mod.func === func'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['default'], __context_mapper__[0]),
    Test,
    'mod.default === Test'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['MutatableClass'], __context_mapper__[0]),
    Test,
    'mod.MutatableClass === Test'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    mod,
    mod2,
    'mod === mod2'
  ]
], __context_mapper__[0]);
export {
  default as T3
} from './es6-module.js';
export {
  mod as es6Module,
  Test as default
};
class C2 extends Test {
}
__hook__('#()', mod, [
  'mutateClass',
  [C2]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C3 extends C2 {
        };
      }, null, args, __context_mapper__[0])),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    MutatableClass,
    C2,
    'MutatableClass === C2'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['MutatableClass'], __context_mapper__[0]),
    C2,
    'mod.MutatableClass === C2'
  ]
], __context_mapper__[0]);
__hook__(setv2, null, [3], __context_mapper__[0], 0);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', mod, [
          'v2',
          4
        ], __context_mapper__[0]);
      }, null, args, __context_mapper__[0])),
    /Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    v2,
    3,
    'v2 is 3'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['v2'], __context_mapper__[0]),
    3,
    'mod.v2 is 3'
  ]
], __context_mapper__[0]);
__hook__('#()', mod, [
  'setv2',
  [5]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    v2,
    5,
    'v2 is 5'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['v2'], __context_mapper__[0]),
    5,
    'mod.v2 is 5'
  ]
], __context_mapper__[0]);
__hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'Object', '#get')[__context_mapper__[3]], [
      'getOwnPropertyDescriptors',
      [mod]
    ], __context_mapper__[0])]
], __context_mapper__[0]);
function f(a) {
  return __hook__(a => {
    let t = __hook__(Test, null, [a], __context_mapper__[5], true);
    __hook__('#()', $hook$.global(__hook__, __context_mapper__[4], 'console', '#get')[__context_mapper__[6]], [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], __context_mapper__[4])
      ]
    ], __context_mapper__[4]);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[4], 'chai', '#get')[__context_mapper__[7]], ['assert'], __context_mapper__[4]), [
      'equal',
      [
        __hook__('#.', t, ['a'], __context_mapper__[4]),
        a,
        't.a is ' + a
      ]
    ], __context_mapper__[4]);
  }, null, arguments, __context_mapper__[4]);
}
__hook__(f, null, [2], __context_mapper__[0], 0);
async function f2(a) {
  return __hook__(async a => {
    try {
      let module = await __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
        'import()',
        './es6-module.js'
      ], __context_mapper__[9], NaN);
      // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
      let Test2 = __hook__('#.', module, ['default'], __context_mapper__[10]);
      let t = __hook__(Test2, null, [a], __context_mapper__[11], true);
      __hook__('#()', $hook$.global(__hook__, __context_mapper__[8], 'console', '#get')[__context_mapper__[12]], [
        'log',
        [
          'new Test2(' + a + ').a = ',
          __hook__('#.', t, ['a'], __context_mapper__[8])
        ]
      ], __context_mapper__[8]);
      __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[8], 'chai', '#get')[__context_mapper__[13]], ['assert'], __context_mapper__[8]), [
        'equal',
        [
          __hook__('#.', t, ['a'], __context_mapper__[8]),
          a,
          't.a is ' + a
        ]
      ], __context_mapper__[8]);
    } catch (e) {
      if (__hook__('#()', __hook__('#.', e, ['stack'], __context_mapper__[8]), [
          'indexOf',
          ['webpack-']
        ], __context_mapper__[8])) {
        __hook__('#()', $hook$.global(__hook__, __context_mapper__[8], 'console', '#get')[__context_mapper__[12]], [
          'log',
          ['Dynamic import is not yet supported in webpack']
        ], __context_mapper__[8]);
        __hook__('#()', $hook$.global(__hook__, __context_mapper__[8], 'console', '#get')[__context_mapper__[12]], [
          'log',
          [e]
        ], __context_mapper__[8]);
      } else {
        throw e;
      }
    }
  }, null, arguments, __context_mapper__[8]);
}
__hook__('#()', __hook__(f2, null, [3], __context_mapper__[0], 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__('#()', __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
          'import()',
          './es6-module.js'
        ], __context_mapper__[0], NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], __context_mapper__[14]);
                let a = 4;
                let t = __hook__(Test3, null, [a], __context_mapper__[15], true);
                __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], __context_mapper__[0])
                  ]
                ], __context_mapper__[0]);
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], __context_mapper__[0]),
                    a,
                    't.a is ' + a
                  ]
                ], __context_mapper__[0]);
              }, null, args, __context_mapper__[0]))]
        ], __context_mapper__[0]), [
          'catch',
          [(...args) =>
              (__hook__(e => {
                if (__hook__('#()', __hook__('#.', e, ['stack'], __context_mapper__[0]), [
                    'indexOf',
                    ['webpack-']
                  ], __context_mapper__[0])) {
                  __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
                    'log',
                    ['Dynamic import is not yet supported in webpack']
                  ], __context_mapper__[0]);
                  __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
                    'log',
                    [e]
                  ], __context_mapper__[0]);
                } else {
                  throw e;
                }
              }, null, args, __context_mapper__[0]))]
        ], __context_mapper__[0]);
      }, null, args, __context_mapper__[0]))]
], __context_mapper__[0]);