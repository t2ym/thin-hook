var mod = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get constant () { return constant; },
  get func () { return func; },
  get variable () { return variable; },
  get v2 () { return variable2; },
  get setv2 () { return setVariable2; },
  get MutatableClass () { return MutatableClass; },
  get mutateClass () { return mutateClass; },
  get default () { return Test; }
});
var __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__module_namespace_2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get es6Module () { return mod; },
  get default () { return Test; },
  get T3 () { return Test; }
});
var __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__module_namespace_0 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module.js',
  '/components/thin-hook/demo/es6-module.js,Test,constructor',
  '/components/thin-hook/demo/es6-module.js,Test,get a',
  '/components/thin-hook/demo/es6-module.js,func',
  '/components/thin-hook/demo/es6-module.js,mutateClass',
  '/components/thin-hook/demo/es6-module.js,MutatableClass',
  '/components/thin-hook/demo/es6-module.js,setVariable2',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module.js,setVariable2',
  '/components/thin-hook/demo/es6-module.js,v2'
]);
class Test {
  constructor(a) {
    return __hook__(a => {
      __hook__('#=', this, [
        '_a',
        a
      ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[1]);
    }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[1]);
  }
  get a() {
    return __hook__(() => {
      return __hook__('#.', this, ['_a'], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[2]);
    }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[2]);
  }
}
const constant = 1;
function func() {
  return __hook__(() => {
    return 1;
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[3]);
}
let variable = 1;
let variable2 = 2;
let MutatableClass = Test;
function mutateClass(C) {
  return __hook__(C => {
    __hook__('m=', MutatableClass, [
      __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[5],
      C,
      v => MutatableClass = v
    ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[4], null);
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[4]);
}
function setVariable2(v) {
  return __hook__(v => {
    __hook__('#()', $hook$.global(__hook__, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[6], 'console', '#get')[__ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[7]], [
      'log',
      [
        'setVariable2 this = ',
        this
      ]
    ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[6]);
    // NOTE: *this* is undefined in setv2() while *this* is the exported namespace object in module.setv2()
    __hook__('m=', variable2, [
      __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[8],
      v,
      v => variable2 = v
    ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[6], null);
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[6]);
}
__hook__(() => {
}, null, [
  'export',
  __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[0],
  mod
], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[0], NaN);

const __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module2.js',
  '/components/thin-hook/demo/es6-module.js',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js',
  '/components/thin-hook/demo/es6-module.js,constant',
  '/components/thin-hook/demo/es6-module.js,variable',
  '/components/thin-hook/demo/es6-module.js,v2',
  '/components/thin-hook/demo/es6-module.js,func',
  '/components/thin-hook/demo/es6-module.js,default',
  '/components/thin-hook/demo/es6-module2.js,C2',
  '/components/thin-hook/demo/es6-module.js,MutatableClass',
  '/components/thin-hook/demo/es6-module.js,setv2',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js',
  'S_uNpREdiC4aB1e_Object;/components/thin-hook/demo/es6-module2.js',
  '/components/thin-hook/demo/es6-module2.js,f',
  '/components/thin-hook/demo/es6-module2.js,f,t',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js,f',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js,f',
  '/components/thin-hook/demo/es6-module2.js,f2',
  '/components/thin-hook/demo/es6-module2.js,f2,module',
  '/components/thin-hook/demo/es6-module2.js,f2,Test2',
  '/components/thin-hook/demo/es6-module2.js,f2,t',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js,f2',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js,f2',
  '/components/thin-hook/demo/es6-module2.js,Test3',
  '/components/thin-hook/demo/es6-module2.js,t'
]);
__hook__(() => {
}, null, [
  'import',
  {
    [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]]: [
      mod,
      'default',
      'constant',
      'variable',
      'func',
      'MutatableClass',
      'v2',
      'setv2',
      '*'
    ]
  }
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], NaN);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', constant, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[3]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    1,
    'constant is 1'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', variable, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[4]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    1,
    'variable is 1'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[5]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    2,
    'v2 is 2'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m()', func, [
      __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[6],
      [],
      (...args) => func(...args)
    ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    1,
    'func() returns 1'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['constant'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', constant, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[3]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.constant === constant'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['variable'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', variable, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[4]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.variable === variable'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['v2'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', variable2, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[5]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.v2 === v2'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['func'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', func, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[6]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.func === func'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['default'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', Test, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[7]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.default === Test'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['MutatableClass'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    __hook__('m', Test, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[7]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod.MutatableClass === Test'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    'mod === mod2'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
class C2 extends __hook__('m', Test, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[7]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[8], null) {
}
__hook__('#()', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), [
  'mutateClass',
  [C2]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
/*
chai.assert.throws(() => {
  MutatableClass = class C3 extends C2 {};
}, /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/);
*/
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', MutatableClass, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[9]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    C2,
    'MutatableClass === C2'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['MutatableClass'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    C2,
    'mod.MutatableClass === C2'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('m()', setVariable2, [
  __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[10],
  [3],
  (...args) => setVariable2(...args)
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), [
          'v2',
          4
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
      }, null, args, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0])),
    /Permission Denied: Cannot access|Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[5]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    3,
    'v2 is 3'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['v2'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    3,
    'mod.v2 is 3'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), [
  'setv2',
  [5]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[5]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null),
    5,
    'v2 is 5'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null), ['v2'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
    5,
    'mod.v2 is 5'
  ]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[11]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'Object', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[12]], [
      'getOwnPropertyDescriptors',
      [__hook__('m', mod, [__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[1]], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], null)]
    ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0])]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
function f(a) {
  return __hook__(a => {
    let t = __hook__('mnew', Test, [
      __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[7],
      [a],
      (...args) => new Test(...args)
    ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[14], null);
    __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[15]], [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13])
      ]
    ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13]);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[16]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13]), [
      'equal',
      [
        __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13]),
        a,
        't.a is ' + a
      ]
    ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13]);
  }, null, arguments, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[13]);
}
__hook__(f, null, [2], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 0);
async function f2(a) {
  return __hook__(async a => {
    try {
      let module = await __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
        'import()',
        './es6-module.js',
        { url: '/components/thin-hook/demo/es6-module2.js' }
      ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[18], NaN);
      // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
      let Test2 = __hook__('#.', module, ['default'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[19]);
      let t = __hook__(Test2, null, [a], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[20], true);
      __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[21]], [
        'log',
        [
          'new Test2(' + a + ').a = ',
          __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17])
        ]
      ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]);
      __hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[22]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]), [
        'equal',
        [
          __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]),
          a,
          't.a is ' + a
        ]
      ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]);
    } catch (e) {
      if (__hook__('#()', __hook__('#.', e, ['stack'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]), [
          'indexOf',
          ['webpack-']
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]) >= 0) {
        __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[21]], [
          'log',
          ['Dynamic import is not yet supported in webpack']
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]);
        __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[21]], [
          'log',
          [e]
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]);
      } else {
        throw e;
      }
    }
  }, null, arguments, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[17]);
}
__hook__('#()', __hook__(f2, null, [3], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__('#()', __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
          'import()',
          './es6-module.js',
          { url: '/components/thin-hook/demo/es6-module2.js' }
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[23]);
                let a = 4;
                let t = __hook__(Test3, null, [a], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[24], true);
                __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[11]], [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0])
                  ]
                ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'chai', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[2]], ['assert'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]),
                    a,
                    't.a is ' + a
                  ]
                ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
              }, null, args, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]))]
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
          'catch',
          [(...args) =>
              (__hook__(e => {
                if (__hook__('#()', __hook__('#.', e, ['stack'], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]), [
                    'indexOf',
                    ['webpack-']
                  ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0])) {
                  __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[11]], [
                    'log',
                    ['Dynamic import is not yet supported in webpack']
                  ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
                  __hook__('#()', $hook$.global(__hook__, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], 'console', '#get')[__1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[11]], [
                    'log',
                    [e]
                  ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
                } else {
                  throw e;
                }
              }, null, args, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]))]
        ], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
      }, null, args, __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]))]
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0]);
__hook__(() => {
}, null, [
  'export',
  __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0],
  __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__module_namespace_2
], __1effb8fa12918dd766ec1f0355cbf50ad7b0234f6200c9acb31ed24ee1c39cf1__[0], NaN);

const __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module3.js',
  '/components/thin-hook/demo/es6-module.js',
  '/components/thin-hook/demo/es6-module2.js',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module3.js',
  '/components/thin-hook/demo/es6-module.js,constant',
  '/components/thin-hook/demo/es6-module.js,variable',
  '/components/thin-hook/demo/es6-module.js,v2',
  '/components/thin-hook/demo/es6-module.js,func',
  '/components/thin-hook/demo/es6-module.js,default',
  '/components/thin-hook/demo/es6-module2.js,es6Module',
  '/components/thin-hook/demo/es6-module2.js,default',
  '/components/thin-hook/demo/es6-module2.js,T3',
  '/components/thin-hook/demo/es6-module3.js,C4',
  '/components/thin-hook/demo/es6-module.js,MutatableClass',
  '/components/thin-hook/demo/es6-module.js,setv2',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module3.js',
  'S_uNpREdiC4aB1e_Object;/components/thin-hook/demo/es6-module3.js'
]);
__hook__(() => {
}, null, [
  'import',
  {
    [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]]: [
      mod,
      'default',
      'constant',
      'variable',
      'func',
      'MutatableClass',
      'v2',
      'setv2',
      '*'
    ],
    [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[2]]: [
      __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__module_namespace_2,
      'default',
      'es6Module',
      'T3',
      '*'
    ]
  }
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], NaN);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', constant, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[4]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    1,
    'constant is 1'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', variable, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[5]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    1,
    'variable is 1'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[6]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    5,
    'v2 is 5'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m()', func, [
      __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[7],
      [],
      (...args) => func(...args)
    ], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    1,
    'func() returns 1'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['constant'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    __hook__('m', constant, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[4]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod.constant === constant'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['variable'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    __hook__('m', variable, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[5]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod.variable === variable'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['v2'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    __hook__('m', variable2, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[6]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod.v2 === v2'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['func'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    __hook__('m', func, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[7]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod.func === func'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['default'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[8]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod.default === Test'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['MutatableClass'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), ['name'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    'C2',
    'mod.MutatableClass.name === "C2"'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'mod === mod2'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[9]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'es6Module === mod'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[10]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[8]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'T2 === Test'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[11]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[8]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    'T3 === Test'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
class C4 extends __hook__('m', Test, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[8]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[12], null) {
}
__hook__('#()', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), [
  'mutateClass',
  [C4]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
/*
chai.assert.throws(() => {
  MutatableClass = class C5 extends C4 {};
}, /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/);
*/
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', MutatableClass, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[13]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    C4,
    'MutatableClass === C4'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['MutatableClass'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    C4,
    'mod.MutatableClass === C4'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('m()', setVariable2, [
  __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[14],
  [6],
  (...args) => setVariable2(...args)
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), [
          'v2',
          4
        ], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
      }, null, args, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0])),
    /Permission Denied: Cannot access|Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[6]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    6,
    'v2 is 6'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['v2'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    6,
    'mod.v2 is 6'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), [
  'setv2',
  [7]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('m', variable2, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[6]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null),
    7,
    'v2 is 7'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'chai', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[3]], ['assert'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null), ['v2'], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]),
    7,
    'mod.v2 is 7'
  ]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__('#()', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'console', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[15]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], 'Object', '#get')[__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[16]], [
      'getOwnPropertyDescriptors',
      [__hook__('m', mod, [__8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[1]], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], null)]
    ], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0])]
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0]);
__hook__(() => {
}, null, [
  'export',
  __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0],
  __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__module_namespace_0
], __8dd2993df3e081a9fd83b83b43243996c7e0b4e8ae430315b7f6098689462fa2__[0], NaN);
