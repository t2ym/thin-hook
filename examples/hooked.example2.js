const __context_mapper__ = $hook$.$(__hook__, [
  'examples/example2.js,C',
  '_p_C;examples/example2.js,C',
  'examples/example2.js,C,add',
  'examples/example2.js,C,add,plus'
]);
$hook$.global(__hook__, __context_mapper__[0], 'C', 'class')[__context_mapper__[1]] = class C {
  add(a, b) {
    return __hook__((a = 1, b = 2) => {
      let plus = (...args) => __hook__((x, y) => x + y, null, args, __context_mapper__[3]);
      return __hook__(plus, null, [
        a,
        b
      ], __context_mapper__[2], 0);
    }, null, arguments, __context_mapper__[2]);
  }
};