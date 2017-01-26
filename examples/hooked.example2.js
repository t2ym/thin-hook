class C {
  add(a, b) {
    return __hook__((a = 1, b = 2) => {
      let plus = (...args) => __hook__((x, y) => x + y, this, args, 'examples/example2.js,C,add,plus');
      return plus(x, y);
    }, this, arguments, 'examples/example2.js,C,add');
  }
}