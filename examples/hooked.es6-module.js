class Test {
  constructor(a) {
    return __hook__(a => {
      __hook__('#=', this, [
        '_a',
        a
      ], 'examples/es6-module.js,Test,constructor');
    }, null, arguments, 'examples/es6-module.js,Test,constructor');
  }
  get a() {
    return __hook__(() => {
      return __hook__('#.', this, ['_a'], 'examples/es6-module.js,Test,get a');
    }, null, arguments, 'examples/es6-module.js,Test,get a');
  }
}
export default Test;