hook.global(__hook__, 'examples/spread.js', 'gA1', 'let')._p_gA1 = [
  1,
  2
];
hook.global(__hook__, 'examples/spread.js', 'gX1', 'let')._p_gX1 = {
  a: 1,
  b: 2
};
{
  let a2 = [
    3,
    4,
    ...hook.global(__hook__, 'examples/spread.js,a2', 'gA1', 'get')._p_gA1
  ];
  let y = {
    c: 3,
    ...__hook__('*', hook.global(__hook__, 'examples/spread.js,y', 'gX1', 'get')._p_gX1, [], 'examples/spread.js,y')
  };
  let z = {
    a: 1,
    ...__hook__('*', {
      a: 1,
      b: 2,
      ...__hook__('*', __hook__(function () {
        return __hook__(() => {
          return y;
        }, this, arguments, 'examples/spread.js,z');
      }, this, [], 'examples/spread.js,z', 0), [], 'examples/spread.js,z')
    }, [], 'examples/spread.js,z')
  };
  __hook__('in', z, ['a'], 'examples/spread.js');
  let p;
  for (p in __hook__('*', z, [], 'examples/spread.js')) {
  }
  for (p of __hook__('*', a2, [], 'examples/spread.js')) {
  }
}