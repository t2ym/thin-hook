{
  class A extends hook.global(__hook__, 'examples/subclass.js,A', 'Array', 'get')._p_Array {
    constructor(...args) {
      return __hook__((...args) => {
        super(...args);
      }, null, arguments, 'examples/subclass.js,A,constructor');
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__(super.isArray, this, [target], 'examples/subclass.js,A,static isArray,result');
        return result;
      }, this, arguments, 'examples/subclass.js,A,static isArray');
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__(super.map, this, [...args], 'examples/subclass.js,A,map,result');
        return result;
      }, this, arguments, 'examples/subclass.js,A,map');
    }
  }
  class AA extends A {
    constructor(...args) {
      return __hook__((...args) => {
        super(...args);
      }, null, arguments, 'examples/subclass.js,AA,constructor');
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__(super.isArray, this, [target], 'examples/subclass.js,AA,static isArray,result');
        return result;
      }, this, arguments, 'examples/subclass.js,AA,static isArray');
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__(super.map, this, [...args], 'examples/subclass.js,AA,map,result');
        return result;
      }, this, arguments, 'examples/subclass.js,AA,map');
    }
  }
  let aa = __hook__(AA, null, [
    1,
    2,
    3
  ], 'examples/subclass.js,aa', true);
}