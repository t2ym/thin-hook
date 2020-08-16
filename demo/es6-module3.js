import Test from './es6-module.js';
import { constant, variable, func, MutatableClass, v2, setv2 } from './es6-module.js';
import * as mod from './es6-module.js';
import * as mod2 from './es6-module.js';
import T2 from './es6-module2.js';
import { es6Module, T3 } from './es6-module2.js';
import * as mod4 from './es6-module2.js';
chai.assert.equal(constant, 1, 'constant is 1');
chai.assert.equal(variable, 1, 'variable is 1');
chai.assert.equal(v2, 5, 'v2 is 5');
chai.assert.equal(func(), 1, 'func() returns 1');
chai.assert.equal(mod.constant, constant, 'mod.constant === constant');
chai.assert.equal(mod.variable, variable, 'mod.variable === variable');
chai.assert.equal(mod.v2, v2, 'mod.v2 === v2');
chai.assert.equal(mod.func, func, 'mod.func === func');
chai.assert.equal(mod.default, Test, 'mod.default === Test');
chai.assert.equal(mod.MutatableClass.name, 'C2', 'mod.MutatableClass.name === "C2"');
chai.assert.equal(mod, mod2, 'mod === mod2');
chai.assert.equal(es6Module, mod, 'es6Module === mod');
chai.assert.equal(T2, Test, 'T2 === Test');
chai.assert.equal(T3, Test, 'T3 === Test');
class C4 extends Test {}
mod.mutateClass(C4);
/*
chai.assert.throws(() => {
  MutatableClass = class C5 extends C4 {};
}, /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/);
*/
chai.assert.equal(MutatableClass, C4, 'MutatableClass === C4');
chai.assert.equal(mod.MutatableClass, C4, 'mod.MutatableClass === C4');
setv2(6);
chai.assert.throws(() => {
  mod.v2 = 4;
}, /Permission Denied: Cannot access|Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/);
chai.assert.equal(v2, 6, 'v2 is 6');
chai.assert.equal(mod.v2, 6, 'mod.v2 is 6');
mod.setv2(7);
chai.assert.equal(v2, 7, 'v2 is 7');
chai.assert.equal(mod.v2, 7, 'mod.v2 is 7');
console.log(Object.getOwnPropertyDescriptors(mod));
