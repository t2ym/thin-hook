class C {
  add(a, b) {
    return __hook__((a = 1, b = 2) => {
      let plus = (...args) => __hook__((x, y) => x + y, this, args);
      return plus(x, y);
    }, this, arguments);
  }
}