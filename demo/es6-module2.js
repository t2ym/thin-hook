import Test from './es6-module.js';
function f(a) {
  let t = new Test(a);
  console.log('new Test(' + a + ').a = ', t.a);
  chai.assert.equal(t.a, a, 't.a is 2');
}
f(2);
