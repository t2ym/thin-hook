const __context_mapper__ = $hook$.$(__hook__, [
  'examples/subclass.js,A',
  '_p_Array;examples/subclass.js,A',
  'examples/subclass.js,A,constructor',
  'examples/subclass.js,A,static isArray',
  'examples/subclass.js,A,static isArray,result',
  'examples/subclass.js,A,map',
  'examples/subclass.js,A,map,result',
  'examples/subclass.js,A,get sprop',
  'examples/subclass.js,A,get prop',
  'examples/subclass.js,A,get nprop',
  'examples/subclass.js,A,set nprop',
  'examples/subclass.js,AA,constructor',
  'examples/subclass.js,AA,static isArray',
  'examples/subclass.js,AA,static isArray,result',
  'examples/subclass.js,AA,map',
  'examples/subclass.js,AA,map,result',
  'examples/subclass.js,AA,get sprop',
  'examples/subclass.js,AA,get prop',
  'examples/subclass.js,AA,check',
  'examples/subclass.js,aa'
]);
{
  class A extends $hook$.global(__hook__, __context_mapper__[0], 'Array', 'get')[__context_mapper__[1]] {
    constructor(...args) {
      return __hook__((...args) => {
        __hook__((newTarget, ...args) => super(...args), null, [
          new.target,
          ...args
        ], __context_mapper__[2], '');
      }, null, arguments, __context_mapper__[2]);
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__('s()', this, [
          'isArray',
          [target],
          p => super[p]
        ], __context_mapper__[4]);
        return result;
      }, null, arguments, __context_mapper__[3]);
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__('s()', this, [
          'map',
          [...args],
          p => super[p]
        ], __context_mapper__[6]);
        return result;
      }, null, arguments, __context_mapper__[5]);
    }
    static get sprop() {
      return __hook__(() => {
        return 'value of A.sprop';
      }, null, arguments, __context_mapper__[7]);
    }
    get prop() {
      return __hook__(() => {
        return 'value of A.prop';
      }, null, arguments, __context_mapper__[8]);
    }
    get nprop() {
      return __hook__(() => {
        return __hook__('#.', this, ['_nprop'], __context_mapper__[9]);
      }, null, arguments, __context_mapper__[9]);
    }
    set nprop(value) {
      return __hook__(value => {
        __hook__('#=', this, [
          '_nprop',
          value
        ], __context_mapper__[10]);
      }, null, arguments, __context_mapper__[10]);
    }
  }
  class AA extends A {
    constructor(...args) {
      return __hook__((...args) => {
        __hook__((newTarget, ...args) => super(...args), null, [
          new.target,
          ...args
        ], __context_mapper__[11], '');
      }, null, arguments, __context_mapper__[11]);
    }
    static isArray(target) {
      return __hook__(target => {
        let result = __hook__('s()', this, [
          'isArray',
          [target],
          p => super[p]
        ], __context_mapper__[13]);
        return result;
      }, null, arguments, __context_mapper__[12]);
    }
    map(...args) {
      return __hook__((...args) => {
        let result = __hook__('s()', this, [
          'map',
          [...args],
          p => super[p]
        ], __context_mapper__[15]);
        return result;
      }, null, arguments, __context_mapper__[14]);
    }
    static get sprop() {
      return __hook__(() => {
        return __hook__('s.', this, [
          'sprop',
          p => super[p]
        ], __context_mapper__[16]) + ' via AA';
      }, null, arguments, __context_mapper__[16]);
    }
    get prop() {
      return __hook__(() => {
        return __hook__('s.', this, [
          'prop',
          p => super[p]
        ], __context_mapper__[17]) + ' via AA';
      }, null, arguments, __context_mapper__[17]);
    }
    check() {
      return __hook__(() => {
        let result = [];
        __hook__('s=', this, [
          'nprop',
          1,
          (p, v) => super[p] = v
        ], __context_mapper__[18]);
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], __context_mapper__[18])]
        ], __context_mapper__[18]);
        // 1
        __hook__('s+=', this, [
          'nprop',
          1,
          (p, v) => super[p] += v
        ], __context_mapper__[18]);
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], __context_mapper__[18])]
        ], __context_mapper__[18]);
        // 2
        __hook__('s++', this, [
          'nprop',
          p => super[p]++
        ], __context_mapper__[18]);
        __hook__('#()', result, [
          'push',
          [__hook__('s.', this, [
              'nprop',
              p => super[p]
            ], __context_mapper__[18])]
        ], __context_mapper__[18]);
        // 3
        return result;
      }, null, arguments, __context_mapper__[18]);
    }
  }
  let aa = __hook__(AA, null, [
    1,
    2,
    3
  ], __context_mapper__[19], true);
}