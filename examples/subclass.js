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
    static get sprop() {
      return 'value of A.sprop';
    }
    get prop() {
      return 'value of A.prop';
    }
    get nprop() {
      return this._nprop;
    }
    set nprop(value) {
      this._nprop = value;
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
    static get sprop() {
      return super.sprop + ' via AA';
    }
    get prop() {
      return super.prop + ' via AA';
    }
    check() {
      let result = [];
      super.nprop = 1;
      result.push(super.nprop); // 1
      super.nprop += 1;
      result.push(super.nprop); // 2
      super.nprop++;
      result.push(super.nprop); // 3
      return result;
    }
  }
  let aa = new AA(1, 2, 3);
}
