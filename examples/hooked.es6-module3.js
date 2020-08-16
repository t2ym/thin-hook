const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module3.js',
  'S_p_chai;examples/es6-module3.js',
  'S_p_console;examples/es6-module3.js',
  'S_p_Object;examples/es6-module3.js'
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
import T2 from './es6-module2.js';
import {
  es6Module,
  T3
} from './es6-module2.js';
import * as mod4 from './es6-module2.js';
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
    5,
    'v2 is 5'
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
    __hook__('#.', __hook__('#.', mod, ['MutatableClass'], __context_mapper__[0]), ['name'], __context_mapper__[0]),
    'C2',
    'mod.MutatableClass.name === "C2"'
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
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    es6Module,
    mod,
    'es6Module === mod'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    T2,
    Test,
    'T2 === Test'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    T3,
    Test,
    'T3 === Test'
  ]
], __context_mapper__[0]);
class C4 extends Test {
}
__hook__('#()', mod, [
  'mutateClass',
  [C4]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C5 extends C4 {
        };
      }, null, args, __context_mapper__[0])),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    MutatableClass,
    C4,
    'MutatableClass === C4'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['MutatableClass'], __context_mapper__[0]),
    C4,
    'mod.MutatableClass === C4'
  ]
], __context_mapper__[0]);
__hook__(setv2, null, [6], __context_mapper__[0], 0);
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
    6,
    'v2 is 6'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['v2'], __context_mapper__[0]),
    6,
    'mod.v2 is 6'
  ]
], __context_mapper__[0]);
__hook__('#()', mod, [
  'setv2',
  [7]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    v2,
    7,
    'v2 is 7'
  ]
], __context_mapper__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[0], 'chai', '#get')[__context_mapper__[1]], ['assert'], __context_mapper__[0]), [
  'equal',
  [
    __hook__('#.', mod, ['v2'], __context_mapper__[0]),
    7,
    'mod.v2 is 7'
  ]
], __context_mapper__[0]);
__hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'Object', '#get')[__context_mapper__[3]], [
      'getOwnPropertyDescriptors',
      [mod]
    ], __context_mapper__[0])]
], __context_mapper__[0]);