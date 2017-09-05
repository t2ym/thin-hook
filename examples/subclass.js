{
  class A extends Array {
    constructor(...args) {
      super(...args);
    }
    static isArray(target) {
      let result = super.isArray(target);
      return result;
    }
    map(...args) {
      let result = super.map(...args);
      return result;
    }
  }
  class AA extends A {
    constructor(...args) {
      super(...args);
    }
    static isArray(target) {
      let result = super.isArray(target);
      return result;
    }
    map(...args) {
      let result = super.map(...args);
      return result;
    }
  }
  let aa = new AA(1, 2, 3);
}
