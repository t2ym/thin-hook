import Test from './es6-module.js';
import { constant, variable, func, MutatableClass, v2, setv2 } from './es6-module.js';
import * as mod from './es6-module.js';
import * as mod2 from './es6-module.js';
chai.assert.equal(constant, 1, 'constant is 1');
chai.assert.equal(variable, 1, 'variable is 1');
chai.assert.equal(v2, 2, 'v2 is 2');
chai.assert.equal(func(), 1, 'func() returns 1');
chai.assert.equal(mod.constant, constant, 'mod.constant === constant');
chai.assert.equal(mod.variable, variable, 'mod.variable === variable');
chai.assert.equal(mod.v2, v2, 'mod.v2 === v2');
chai.assert.equal(mod.func, func, 'mod.func === func');
chai.assert.equal(mod.default, Test, 'mod.default === Test');
chai.assert.equal(mod.MutatableClass, Test, 'mod.MutatableClass === Test');
chai.assert.equal(mod, mod2, 'mod === mod2');
export { default as T3 } from './es6-module.js';
export { mod as es6Module, Test as default };
class C2 extends Test {}
mod.mutateClass(C2);
chai.assert.throws(() => {
  MutatableClass = class C3 extends C2 {};
}, /Assignment to constant variable|MutatableClass is not defined/);
chai.assert.equal(MutatableClass, C2, 'MutatableClass === C2');
chai.assert.equal(mod.MutatableClass, C2, 'mod.MutatableClass === C2');
setv2(3);
chai.assert.throws(() => {
  mod.v2 = 4;
}, /Cannot assign to read only property|Cannot set property/);
chai.assert.equal(v2, 3, 'v2 is 3');
chai.assert.equal(mod.v2, 3, 'mod.v2 is 3');
mod.setv2(5);
chai.assert.equal(v2, 5, 'v2 is 5');
chai.assert.equal(mod.v2, 5, 'mod.v2 is 5');
console.log(Object.getOwnPropertyDescriptors(mod));
function f(a) {
  let t = new Test(a);
  console.log('new Test(' + a + ').a = ', t.a);
  chai.assert.equal(t.a, a, 't.a is ' + a);
}
f(2);
async function f2(a) {
  try {
    let module = await import('./es6-module.js'); // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
    let Test2 = module.default;
    let t = new Test2(a);
    console.log('new Test2(' + a + ').a = ', t.a);
    chai.assert.equal(t.a, a, 't.a is ' + a);
  }
  catch (e) {
    if (e.stack.indexOf('webpack-')) {
      console.log('Dynamic import is not yet supported in webpack');
      console.log(e);
    }
    else {
      throw e;
    }
  }
}
f2(3).then(() => {
  import('./es6-module.js').then(module => {
    let Test3 = module.default;
    let a = 4;
    let t = new Test3(a);
    console.log('new Test3(' + a + ').a = ', t.a);
    chai.assert.equal(t.a, a, 't.a is ' + a);
  })
  .catch(e => {
    if (e.stack.indexOf('webpack-')) {
      console.log('Dynamic import is not yet supported in webpack');
      console.log(e);
    }
    else {
      throw e;
    }
  });
});