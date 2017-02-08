class NewFunction {
  adderGenerator(base) {
    return new Function('base', `return function generatedAdd(a, b) {
      let plus = (x, y) => base + x + y;
      return plus(a, b);
    }`)(base);
  }
  addMethod(base, x, y) {
    return this.adderGenerator(base)(x, y);
  }
}
class ReflectConstructFunction {
  constructor () {
    let c = Reflect.construct(Function, ['return class C { m(x) { return x + 1; } }'], new.target);
    let c2 = Reflect['construct'](Function, ['return class C { m(x) { return x + 1; } }'], new.target);
  }
}
