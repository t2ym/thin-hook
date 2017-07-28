import Test from './es6-module.js';
function f(a) {
  return __hook__(a => {
    let t = new Test(a);
    __hook__('()', console, [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('.', t, ['a'], 'examples/es6-module2.js,f')
      ]
    ], 'examples/es6-module2.js,f');
    __hook__('()', __hook__('.', chai, ['assert'], 'examples/es6-module2.js,f'), [
      'equal',
      [
        __hook__('.', t, ['a'], 'examples/es6-module2.js,f'),
        a,
        't.a is 2'
      ]
    ], 'examples/es6-module2.js,f');
  }, this, arguments, 'examples/es6-module2.js,f');
}
f(2);