const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module.js,Test,constructor',
  'examples/es6-module.js,Test,get a',
  'examples/es6-module.js,func',
  'examples/es6-module.js,mutateClass',
  'examples/es6-module.js,setVariable2',
  'S_p_console;examples/es6-module.js,setVariable2'
]);
class Test {
  constructor(a) {
    return __hook__(a => {
      __hook__('#=', this, [
        '_a',
        a
      ], __context_mapper__[0]);
    }, null, arguments, __context_mapper__[0]);
  }
  get a() {
    return __hook__(() => {
      return __hook__('#.', this, ['_a'], __context_mapper__[1]);
    }, null, arguments, __context_mapper__[1]);
  }
}
export const constant = 1;
export function func() {
  return __hook__(() => {
    return 1;
  }, null, arguments, __context_mapper__[2]);
}
let variable = 1;
let variable2 = 2;
let MutatableClass = Test;
function mutateClass(C) {
  return __hook__(C => {
    MutatableClass = C;
  }, null, arguments, __context_mapper__[3]);
}
function setVariable2(v) {
  return __hook__(v => {
    __hook__('#()', $hook$.global(__hook__, __context_mapper__[4], 'console', '#get')[__context_mapper__[5]], [
      'log',
      [
        'setVariable2 this = ',
        this
      ]
    ], __context_mapper__[4]);
    // NOTE: *this* is undefined in setv2() while *this* is the exported namespace object in module.setv2()
    variable2 = v;
  }, null, arguments, __context_mapper__[4]);
}
export {
  variable,
  variable2 as v2,
  setVariable2 as setv2,
  MutatableClass,
  mutateClass
};
export default Test;