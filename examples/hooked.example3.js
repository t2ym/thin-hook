const __context_mapper__ = $hook$.$(__hook__, [
  'examples/example3.js,NewFunction',
  '_p_NewFunction;examples/example3.js,NewFunction',
  'examples/example3.js,NewFunction,adderGenerator',
  'S_p_Function;examples/example3.js,NewFunction,adderGenerator',
  'examples/example3.js,NewFunction,addMethod',
  'examples/example3.js,ReflectConstructFunction',
  '_p_ReflectConstructFunction;examples/example3.js,ReflectConstructFunction',
  'examples/example3.js,ReflectConstructFunction,constructor',
  'examples/example3.js,ReflectConstructFunction,constructor,c',
  'S_p_Reflect;examples/example3.js,ReflectConstructFunction,constructor,c',
  'S_p_Function;examples/example3.js,ReflectConstructFunction,constructor,c',
  'examples/example3.js,ReflectConstructFunction,constructor,c2',
  'S_p_Reflect;examples/example3.js,ReflectConstructFunction,constructor,c2',
  'S_p_Function;examples/example3.js,ReflectConstructFunction,constructor,c2'
]);
$hook$.global(__hook__, __context_mapper__[0], 'NewFunction', 'class')[__context_mapper__[1]] = class NewFunction {
  adderGenerator(base) {
    return __hook__(base => {
      return __hook__(__hook__($hook$.global(__hook__, __context_mapper__[2], 'Function', '#get')[__context_mapper__[3]], null, [
        'base',
        `return function generatedAdd(a, b) {
      let plus = (x, y) => base + x + y;
      return plus(a, b);
    }`
      ], __context_mapper__[2], true), null, [base], __context_mapper__[2], 0);
    }, null, arguments, __context_mapper__[2]);
  }
  addMethod(base, x, y) {
    return __hook__((base, x, y) => {
      return __hook__(__hook__('#()', this, [
        'adderGenerator',
        [base]
      ], __context_mapper__[4]), null, [
        x,
        y
      ], __context_mapper__[4], 0);
    }, null, arguments, __context_mapper__[4]);
  }
};
$hook$.global(__hook__, __context_mapper__[5], 'ReflectConstructFunction', 'class')[__context_mapper__[6]] = class ReflectConstructFunction {
  constructor() {
    return __hook__(() => {
      let c = __hook__('#()', $hook$.global(__hook__, __context_mapper__[8], 'Reflect', '#get')[__context_mapper__[9]], [
        'construct',
        [
          $hook$.global(__hook__, __context_mapper__[8], 'Function', '#get')[__context_mapper__[10]],
          ['return class C { m(x) { return x + 1; } }'],
          new.target
        ]
      ], __context_mapper__[8]);
      let c2 = __hook__('#()', $hook$.global(__hook__, __context_mapper__[11], 'Reflect', '#get')[__context_mapper__[12]], [
        'construct',
        [
          $hook$.global(__hook__, __context_mapper__[11], 'Function', '#get')[__context_mapper__[13]],
          ['return class C { m(x) { return x + 1; } }'],
          new.target
        ]
      ], __context_mapper__[11]);
    }, null, arguments, __context_mapper__[7]);
  }
};