{
  class A extends $hook$.global(__hook__, 'examples/subclass.js,A', 'Array', 'get')['_p_Array;examples/subclass.js,A'] {
    constructor(...args) {
      return __hook__((...args) => {
        __hook__((newTarget, ...args) => super(...args), null, [
          new.target,
          ...args
        ], 'examples/subclass.js,A,constructor', '');
      }, null, arguments, 'examples/subclass.js,A,constructor');
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__('s()', this, [
          'isArray',
          [target],
          p => super[p]
        ], 'examples/subclass.js,A,static isArray,result');
        return result;
      }, null, arguments, 'examples/subclass.js,A,static isArray');
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__('s()', this, [
          'map',
          [...args],
          p => super[p]
        ], 'examples/subclass.js,A,map,result');
        return result;
      }, null, arguments, 'examples/subclass.js,A,map');
    }
    static get sprop() {
      return __hook__(() => {
        return 'value of A.sprop';
      }, null, arguments, 'examples/subclass.js,A,get sprop');
    }
    get prop() {
      return __hook__(() => {
        return 'value of A.prop';
      }, null, arguments, 'examples/subclass.js,A,get prop');
    }
    get nprop() {
      return __hook__(() => {
        return __hook__('#.', this, ['_nprop'], 'examples/subclass.js,A,get nprop');
      }, null, arguments, 'examples/subclass.js,A,get nprop');
    }
    set nprop(value) {
      return __hook__(value => {
        __hook__('#=', this, [
          '_nprop',
          value
        ], 'examples/subclass.js,A,set nprop');
      }, null, arguments, 'examples/subclass.js,A,set nprop');
    }
  }
  class AA extends A {
    constructor(...args) {
      return __hook__((...args) => {
        __hook__((newTarget, ...args) => super(...args), null, [
          new.target,
          ...args
        ], 'examples/subclass.js,AA,constructor', '');
      }, null, arguments, 'examples/subclass.js,AA,constructor');
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__('s()', this, [
          'isArray',
          [target],
          p => super[p]
        ], 'examples/subclass.js,AA,static isArray,result');
        return result;
      }, null, arguments, 'examples/subclass.js,AA,static isArray');
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__('s()', this, [
          'map',
          [...args],
          p => super[p]
        ], 'examples/subclass.js,AA,map,result');
        return result;
      }, null, arguments, 'examples/subclass.js,AA,map');
    }
    static get sprop() {
      return __hook__(() => {
        return __hook__('s.', this, [
          'sprop',
          p => super[p]
        ], 'examples/subclass.js,AA,get sprop') + ' via AA';
      }, null, arguments, 'examples/subclass.js,AA,get sprop');
    }
    get prop() {
      return __hook__(() => {
        return __hook__('s.', this, [
          'prop',
          p => super[p]
        ], 'examples/subclass.js,AA,get prop') + ' via AA';
      }, null, arguments, 'examples/subclass.js,AA,get prop');
    }
    check() {
      return __hook__(() => {
        let result = [];
        __hook__('s=', this, [
          'nprop',
          1,
          (p, v) => super[p] = v
        ], 'examples/subclass.js,AA,check');
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], 'examples/subclass.js,AA,check')]
        ], 'examples/subclass.js,AA,check');
        // 1
        __hook__('s+=', this, [
          'nprop',
          1,
          (p, v) => super[p] += v
        ], 'examples/subclass.js,AA,check');
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], 'examples/subclass.js,AA,check')]
        ], 'examples/subclass.js,AA,check');
        // 2
        __hook__('s++', this, [
          'nprop',
          p => super[p]++
        ], 'examples/subclass.js,AA,check');
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], 'examples/subclass.js,AA,check')]
        ], 'examples/subclass.js,AA,check');
        // 3
        return result;
      }, null, arguments, 'examples/subclass.js,AA,check');
    }
  }
  let aa = __hook__(AA, null, [
    1,
    2,
    3
  ], 'examples/subclass.js,aa', true);
}