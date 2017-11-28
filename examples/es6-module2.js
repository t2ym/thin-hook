import Test from './es6-module.js';
function f(a) {
  let t = new Test(a);
  console.log('new Test(' + a + ').a = ', t.a);
  chai.assert.equal(t.a, a, 't.a is ' + a);
}
f(2);
async function f2(a) {
  let module = await import('./es6-module.js'); // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
  let Test2 = module.default;
  let t = new Test2(a);
  console.log('new Test2(' + a + ').a = ', t.a);
  chai.assert.equal(t.a, a, 't.a is ' + a);
}
f2(3).then(() => {
  import('./es6-module.js').then(module => {
    let Test3 = module.default;
    let a = 4;
    let t = new Test3(a);
    console.log('new Test3(' + a + ').a = ', t.a);
    chai.assert.equal(t.a, a, 't.a is ' + a);
  });
});