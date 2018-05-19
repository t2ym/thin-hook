$hook$.global(__hook__, 'examples/example3.js,NewFunction', 'NewFunction', 'class')['_p_NewFunction;examples/example3.js,NewFunction'] = class NewFunction {
  adderGenerator(base) {
    return __hook__(base => {
      return __hook__(__hook__($hook$.global(__hook__, 'examples/example3.js,NewFunction,adderGenerator', 'Function', '#get')['S_p_Function;examples/example3.js,NewFunction,adderGenerator'], null, [
        'base',
        `return function generatedAdd(a, b) {
      let plus = (x, y) => base + x + y;
      return plus(a, b);
    }`
      ], 'examples/example3.js,NewFunction,adderGenerator', true), null, [base], 'examples/example3.js,NewFunction,adderGenerator', 0);
    }, null, arguments, 'examples/example3.js,NewFunction,adderGenerator');
  }
  addMethod(base, x, y) {
    return __hook__((base, x, y) => {
      return __hook__(__hook__('#()', this, [
        'adderGenerator',
        [base]
      ], 'examples/example3.js,NewFunction,addMethod'), null, [
        x,
        y
      ], 'examples/example3.js,NewFunction,addMethod', 0);
    }, null, arguments, 'examples/example3.js,NewFunction,addMethod');
  }
};
$hook$.global(__hook__, 'examples/example3.js,ReflectConstructFunction', 'ReflectConstructFunction', 'class')['_p_ReflectConstructFunction;examples/example3.js,ReflectConstructFunction'] = class ReflectConstructFunction {
  constructor() {
    return __hook__(() => {
      let c = __hook__('#()', $hook$.global(__hook__, 'examples/example3.js,ReflectConstructFunction,constructor,c', 'Reflect', '#get')['S_p_Reflect;examples/example3.js,ReflectConstructFunction,constructor,c'], [
        'construct',
        [
          $hook$.global(__hook__, 'examples/example3.js,ReflectConstructFunction,constructor,c', 'Function', '#get')['S_p_Function;examples/example3.js,ReflectConstructFunction,constructor,c'],
          ['return class C { m(x) { return x + 1; } }'],
          new.target
        ]
      ], 'examples/example3.js,ReflectConstructFunction,constructor,c');
      let c2 = __hook__('#()', $hook$.global(__hook__, 'examples/example3.js,ReflectConstructFunction,constructor,c2', 'Reflect', '#get')['S_p_Reflect;examples/example3.js,ReflectConstructFunction,constructor,c2'], [
        'construct',
        [
          $hook$.global(__hook__, 'examples/example3.js,ReflectConstructFunction,constructor,c2', 'Function', '#get')['S_p_Function;examples/example3.js,ReflectConstructFunction,constructor,c2'],
          ['return class C { m(x) { return x + 1; } }'],
          new.target
        ]
      ], 'examples/example3.js,ReflectConstructFunction,constructor,c2');
    }, null, arguments, 'examples/example3.js,ReflectConstructFunction,constructor');
  }
};