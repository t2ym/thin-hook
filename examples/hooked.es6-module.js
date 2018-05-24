const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module.js,Test,constructor',
  'examples/es6-module.js,Test,get a'
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
export default Test;