hook.global(__hook__, 'examples/example3.js,NewFunction', 'NewFunction', 'class')._p_NewFunction = class NewFunction {
  adderGenerator(base) {
    return __hook__(base => {
      return new (__hook__('()', hook, [
        'Function',
        [
          '__hook__',
          [[
              'examples/example3.js,NewFunction,adderGenerator',
              {}
            ]],
          'method'
        ]
      ], 'examples/example3.js,NewFunction,adderGenerator'))('base', `return function generatedAdd(a, b) {
      let plus = (x, y) => base + x + y;
      return plus(a, b);
    }`)(base);
    }, this, arguments, 'examples/example3.js,NewFunction,adderGenerator');
  }
  addMethod(base, x, y) {
    return __hook__((base, x, y) => {
      return __hook__('()', this, [
        'adderGenerator',
        [base]
      ], 'examples/example3.js,NewFunction,addMethod')(x, y);
    }, this, arguments, 'examples/example3.js,NewFunction,addMethod');
  }
};
hook.global(__hook__, 'examples/example3.js,ReflectConstructFunction', 'ReflectConstructFunction', 'class')._p_ReflectConstructFunction = class ReflectConstructFunction {
  constructor() {
    return __hook__(() => {
      let c = __hook__('.', Reflect, ['construct'], 'examples/example3.js,ReflectConstructFunction,constructor,c')(__hook__('()', hook, [
        'Function',
        [
          '__hook__',
          [[
              'examples/example3.js,ReflectConstructFunction,constructor,c',
              {}
            ]],
          'method'
        ]
      ], 'examples/example3.js,ReflectConstructFunction,constructor,c'), ['return class C { m(x) { return x + 1; } }'], new.target);
      let c2 = __hook__('.', Reflect, ['construct'], 'examples/example3.js,ReflectConstructFunction,constructor,c2')(__hook__('()', hook, [
        'Function',
        [
          '__hook__',
          [[
              'examples/example3.js,ReflectConstructFunction,constructor,c2',
              {}
            ]],
          'method'
        ]
      ], 'examples/example3.js,ReflectConstructFunction,constructor,c2'), ['return class C { m(x) { return x + 1; } }'], new.target);
    }, null, arguments, 'examples/example3.js,ReflectConstructFunction,constructor');
  }
};