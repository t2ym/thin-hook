hook.global(__hook__, 'examples/example2.js,C', 'C', 'class')._p_C = class C {
  add(a, b) {
    return __hook__((a = 1, b = 2) => {
      let plus = (...args) => __hook__((x, y) => x + y, this, args, 'examples/example2.js,C,add,plus');
      return __hook__(plus, this, [
        a,
        b
      ], 'examples/example2.js,C,add', 0);
    }, this, arguments, 'examples/example2.js,C,add');
  }
};