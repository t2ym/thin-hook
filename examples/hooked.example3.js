class NewFunction {
  adderGenerator(base) {
    return __hook__(base => {
      return new (hook.Function('__hook__', [[
          'examples/example3.js,NewFunction,adderGenerator',
          {}
        ]], 'method'))('base', `return function generatedAdd(a, b) {
      let plus = (x, y) => base + x + y;
      return plus(a, b);
    }`)(base);
    }, this, arguments, 'examples/example3.js,NewFunction,adderGenerator');
  }
  addMethod(base, x, y) {
    return __hook__((base, x, y) => {
      return this.adderGenerator(base)(x, y);
    }, this, arguments, 'examples/example3.js,NewFunction,addMethod');
  }
}
class ReflectConstructFunction {
  constructor() {
    return __hook__(() => {
      let c = Reflect.construct(hook.Function('__hook__', [[
          'examples/example3.js,ReflectConstructFunction,constructor,c',
          {}
        ]], 'method'), ['return class C { m(x) { return x + 1; } }'], new.target);
      let c2 = Reflect['construct'](hook.Function('__hook__', [[
          'examples/example3.js,ReflectConstructFunction,constructor,c2',
          {}
        ]], 'method'), ['return class C { m(x) { return x + 1; } }'], new.target);
    }, null, arguments, 'examples/example3.js,ReflectConstructFunction,constructor');
  }
}