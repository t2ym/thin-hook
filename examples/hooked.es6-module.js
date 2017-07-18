class Test {
  constructor(a) {
    return __hook__(a => {
      this._a = a;
    }, null, arguments, 'examples/es6-module.js,Test,constructor');
  }
  get a() {
    return __hook__(() => {
      return this._a;
    }, this, arguments, 'examples/es6-module.js,Test,get a');
  }
}
export default Test;