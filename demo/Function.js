{
  let f1 = Function('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f1(1, 2), 3, 'Function() call');
  chai.assert.isOk(f1.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f1'] : true, 'Function() call is hooked');

  let f2 = new Function('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f2(1, 2), 3, 'new Function() call');
  chai.assert.isOk(f2.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f2'] : true, 'new Function() call is hooked');

  let f3 = Reflect.construct(Function, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f3(1, 2), 3, 'Reflect.construct(Function) call');
  chai.assert.isOk(f3.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f3'] : true, 'Reflect.construct(Function) call is normalized');

  let f4 = Reflect.apply(Function, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f4(1, 2), 3, 'Reflect.apply(Function) call');
  chai.assert.isOk(f4.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f4'] : true, 'Reflect.apply(Function) call is normalized');

  let f5 = Function.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f5(1, 2), 3, 'Function.apply() call');
  chai.assert.isOk(f5.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f5'] : true, 'Function.apply() call is normalized');

  let f6 = Function.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f6(1, 2), 3, 'Function.call() call');
  chai.assert.isOk(f6.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f6'] : true, 'Function.call() call is normalized');

  let F = Function;
  let f7 = F('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f7(1, 2), 3, 'indirect Function() call');
  chai.assert.isOk(f7.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f7'] : true, 'indirect Function() call is hooked');

  let f8 = new F('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f8(1, 2), 3, 'indirect new Function() call');
  chai.assert.isOk(f8.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f8'] : true, 'indirect new Function() call is hooked');

  let f9 = Reflect.construct(F, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f9(1, 2), 3, 'indirect Reflect.construct(Function) call');
  chai.assert.isOk(f9.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f9'] : true, 'indirect Reflect.construct(Function) call is normalized');

  let f10 = Reflect.apply(F, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f10(1, 2), 3, 'indirect Reflect.apply(Function) call');
  chai.assert.isOk(f10.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f10'] : true, 'indirect Reflect.apply(Function) call is normalized');

  let f11 = F.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f11(1, 2), 3, 'indirect Function.apply() call');
  chai.assert.isOk(f11.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f11'] : true, 'indirect Function.apply() call is normalized');

  let f12 = F.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f12(1, 2), 3, 'indirect Function.call() call');
  chai.assert.isOk(f12.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f12'] : true, 'indirect Function.call() call is normalized');

  chai.assert.throws(() => {
    Function.bind(null);
  }, /^Permission Denied:/)

  class SubclassFunction extends Function {}
  function ES5SubclassFunction (...args) {
    return Object.getPrototypeOf(ES5SubclassFunction)(...args);
  }
  Object.setPrototypeOf(ES5SubclassFunction, Function);
  Object.setPrototypeOf(ES5SubclassFunction.prototype, Function.prototype);

  let f13 = ES5SubclassFunction('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f13(1, 2), 3, 'ES5 subclass Function() call');
  chai.assert.isOk(f13.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label : 1, 1, 'ES5 subclass Function() call is hooked');

  let f14 = new SubclassFunction('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f14(1, 2), 3, 'new subclass Function() call');
  chai.assert.isOk(f14.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f14'] : true, 'new subclass Function() call is hooked');

  let f15 = Reflect.construct(SubclassFunction, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f15(1, 2), 3, 'Reflect.construct(subclass Function) call');
  chai.assert.isOk(f15.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f15'] : true, 'Reflect.construct(subclass Function) call is normalized');

  let f16 = Reflect.apply(ES5SubclassFunction, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f16(1, 2), 3, 'Reflect.apply(ES5 subclass Function) call');
  chai.assert.isOk(f16.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label : 2, 2, 'Reflect.apply(ES5 subclass Function) call is normalized');

  let f17 = ES5SubclassFunction.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f17(1, 2), 3, 'ES5 subclass Function.apply() call');
  chai.assert.isOk(f17.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label : 3, 3, 'ES5 subclass Function.apply() call is normalized');

  let f18 = ES5SubclassFunction.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f18(1, 2), 3, 'ES5 subclass Function.call() call');
  chai.assert.isOk(f18.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label : 4, 4, 'ES5 subclass Function.call() call is normalized');

  class CustomConstructorSubclassFunction extends Function {
    constructor(dummy, ...args) {
      super(...args);
    }
  }

  let f19 = new CustomConstructorSubclassFunction('dummy', 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f19(1, 2), 3, 'new subclass Function() call');
  chai.assert.isOk(f19.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(f19 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
  chai.assert.isOk(f19 instanceof Function, 'Generated function is an instanceof Function');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f19'] : true, 'new subclass Function() call is hooked');

  let f20 = Reflect.construct(CustomConstructorSubclassFunction, ['dummy', 'p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f20(1, 2), 3, 'Reflect.construct(subclass Function) call');
  chai.assert.isOk(f20.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(f20 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
  chai.assert.isOk(f20 instanceof Function, 'Generated function is an instanceof Function');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f20'] : true, 'Reflect.construct(subclass Function) call is normalized');

  const strictMode = function () {
    'use strict';

    let f1 = Function('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f1(1, 2), 3, 'Function() call');
    chai.assert.isOk(f1.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f1'] : true, 'Function() call is hooked');

    let f2 = new Function('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f2(1, 2), 3, 'new Function() call');
    chai.assert.isOk(f2.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f2'] : true, 'new Function() call is hooked');

    let f3 = Reflect.construct(Function, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f3(1, 2), 3, 'Reflect.construct(Function) call');
    chai.assert.isOk(f3.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f3'] : true, 'Reflect.construct(Function) call is normalized');

    let f4 = Reflect.apply(Function, window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f4(1, 2), 3, 'Reflect.apply(Function) call');
    chai.assert.isOk(f4.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f4'] : true, 'Reflect.apply(Function) call is normalized');

    let f5 = Function.apply(window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f5(1, 2), 3, 'Function.apply() call');
    chai.assert.isOk(f5.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f5'] : true, 'Function.apply() call is normalized');

    let f6 = Function.call(window, 'p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f6(1, 2), 3, 'Function.call() call');
    chai.assert.isOk(f6.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f6'] : true, 'Function.call() call is normalized');

    let F = Function;
    let f7 = F('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f7(1, 2), 3, 'indirect Function() call');
    chai.assert.isOk(f7.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f7'] : true, 'indirect Function() call is hooked');

    let f8 = new F('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f8(1, 2), 3, 'indirect new Function() call');
    chai.assert.isOk(f8.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f8'] : true, 'indirect new Function() call is hooked');

    let f9 = Reflect.construct(F, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f9(1, 2), 3, 'indirect Reflect.construct(Function) call');
    chai.assert.isOk(f9.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f9'] : true, 'indirect Reflect.construct(Function) call is normalized');

    let f10 = Reflect.apply(F, window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f10(1, 2), 3, 'indirect Reflect.apply(Function) call');
    chai.assert.isOk(f10.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f10'] : true, 'indirect Reflect.apply(Function) call is normalized');

    let f11 = F.apply(window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f11(1, 2), 3, 'indirect Function.apply() call');
    chai.assert.isOk(f11.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f11'] : true, 'indirect Function.apply() call is normalized');

    let f12 = F.call(window, 'p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f12(1, 2), 3, 'indirect Function.call() call');
    chai.assert.isOk(f12.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,f12'] : true, 'indirect Function.call() call is normalized');

    class SubclassFunction extends Function {}
    function ES5SubclassFunction (...args) {
      return Object.getPrototypeOf(ES5SubclassFunction)(...args);
    }
    Object.setPrototypeOf(ES5SubclassFunction, Function);
    Object.setPrototypeOf(ES5SubclassFunction.prototype, Function.prototype);

    let f13 = ES5SubclassFunction('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f13(1, 2), 3, 'ES5 subclass Function() call');
    chai.assert.isOk(f13.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,ES5SubclassFunction'].label : 1, 1, 'ES5 subclass Function() call is hooked');

    let f14 = new SubclassFunction('p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f14(1, 2), 3, 'new subclass Function() call');
    chai.assert.isOk(f14.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f14'] : true, 'new subclass Function() call is hooked');

    let f15 = Reflect.construct(SubclassFunction, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f15(1, 2), 3, 'Reflect.construct(subclass Function) call');
    chai.assert.isOk(f15.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f15'] : true, 'Reflect.construct(subclass Function) call is normalized');

    let f16 = Reflect.apply(ES5SubclassFunction, window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f16(1, 2), 3, 'Reflect.apply(ES5 subclass Function) call');
    chai.assert.isOk(f16.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,ES5SubclassFunction'].label : 2, 2, 'Reflect.apply(ES5 subclass Function) call is normalized');

    let f17 = ES5SubclassFunction.apply(window, ['p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f17(1, 2), 3, 'ES5 subclass Function.apply() call');
    chai.assert.isOk(f17.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,ES5SubclassFunction'].label : 3, 3, 'ES5 subclass Function.apply() call is normalized');

    let f18 = ES5SubclassFunction.call(window, 'p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f18(1, 2), 3, 'ES5 subclass Function.call() call');
    chai.assert.isOk(f18.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.equal(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,strictMode,ES5SubclassFunction'].label : 4, 4, 'ES5 subclass Function.call() call is normalized');

    class CustomConstructorSubclassFunction extends Function {
      constructor(dummy, ...args) {
        super(...args);
      }
    }

    let f19 = new CustomConstructorSubclassFunction('dummy', 'p1', 'p2', 'return p1 + p2');
    chai.assert.equal(f19(1, 2), 3, 'new subclass Function() call');
    chai.assert.isOk(f19.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(f19 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
    chai.assert.isOk(f19 instanceof Function, 'Generated function is an instanceof Function');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f19'] : true, 'new subclass Function() call is hooked');

    let f20 = Reflect.construct(CustomConstructorSubclassFunction, ['dummy', 'p1', 'p2', 'return p1 + p2']);
    chai.assert.equal(f20(1, 2), 3, 'Reflect.construct(subclass Function) call');
    chai.assert.isOk(f20.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(f20 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
    chai.assert.isOk(f20 instanceof Function, 'Generated function is an instanceof Function');
    chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Function['/components/thin-hook/demo/Function.js,strictMode,f20'] : true, 'Reflect.construct(subclass Function) call is normalized');

    chai.assert.throws(() => {
      let o = { F: (function () {}).constructor };
      o.F('return caches')();
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let o = { F: (function* () {}).constructor };
      o.F('yield caches')().next().value;
    }, /^Permission Denied:/);
  }
  strictMode();

  const AsyncFunction = (async function() {}).constructor;
  const asyncFunc = async function () {

    let f1 = AsyncFunction('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f1(1, 2), 3, 'AsyncFunction() call');
    chai.assert.isOk(f1.toString().includes('__hook__'), 'f1 Generated function is hooked');

    let f2 = new AsyncFunction('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f2(1, 2), 3, 'new AsyncFunction() call');
    chai.assert.isOk(f2.toString().includes('__hook__'), 'f2 Generated function is hooked');

    let f3 = Reflect.construct(AsyncFunction, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f3(1, 2), 3, 'Reflect.construct(AsyncFunction) call');
    chai.assert.isOk(f3.toString().includes('__hook__'), 'f3 Generated function is hooked');

    let f4 = Reflect.apply(AsyncFunction, window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f4(1, 2), 3, 'Reflect.apply(AsyncFunction) call');
    chai.assert.isOk(f4.toString().includes('__hook__'), 'f4 Generated function is hooked');

    let f5 = AsyncFunction.apply(window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f5(1, 2), 3, 'AsyncFunction.apply() call');
    chai.assert.isOk(f5.toString().includes('__hook__'), 'f5 Generated function is hooked');

    let f6 = AsyncFunction.call(window, 'p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f6(1, 2), 3, 'Function.call() call');
    chai.assert.isOk(f6.toString().includes('__hook__'), 'f6 Generated function is hooked');

    let F = AsyncFunction;
    let f7 = F('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f7(1, 2), 3, 'indirect AsyncFunction() call');
    chai.assert.isOk(f7.toString().includes('__hook__'), 'f7 Generated function is hooked');

    let f8 = new F('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f8(1, 2), 3, 'indirect new AsyncFunction() call');
    chai.assert.isOk(f8.toString().includes('__hook__'), 'f8 Generated function is hooked');

    let f9 = Reflect.construct(F, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f9(1, 2), 3, 'indirect Reflect.construct(AsyncFunction) call');
    chai.assert.isOk(f9.toString().includes('__hook__'), 'f9 Generated function is hooked');

    let f10 = Reflect.apply(F, window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f10(1, 2), 3, 'indirect Reflect.apply(AsyncFunction) call');
    chai.assert.isOk(f10.toString().includes('__hook__'), 'f10 Generated function is hooked');

    let f11 = F.apply(window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f11(1, 2), 3, 'indirect AsyncFunction.apply() call');
    chai.assert.isOk(f11.toString().includes('__hook__'), 'f11 Generated function is hooked');

    let f12 = F.call(window, 'p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f12(1, 2), 3, 'indirect AsyncFunction.call() call');
    chai.assert.isOk(f12.toString().includes('__hook__'), 'f12 Generated function is hooked');

    class SubclassFunction extends AsyncFunction {}
    function ES5SubclassFunction (...args) {
      return Object.getPrototypeOf(ES5SubclassFunction)(...args);
    }
    Object.setPrototypeOf(ES5SubclassFunction, AsyncFunction);
    Object.setPrototypeOf(ES5SubclassFunction.prototype, AsyncFunction.prototype);

    let f13 = ES5SubclassFunction('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f13(1, 2), 3, 'ES5 subclass AsyncFunction() call');
    chai.assert.isOk(f13.toString().includes('__hook__'), 'f13 Generated function is hooked');

    let f14 = new SubclassFunction('p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.isOk(await f14(1, 2), 3, 'f14 new subclass AsyncFunction() call');
    chai.assert.isOk(f14.toString().includes('__hook__'), 'f14 Generated function is hooked');

    let f15 = Reflect.construct(SubclassFunction, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f15(1, 2), 3, 'Reflect.construct(subclass AsyncFunction) call');
    chai.assert.isOk(f15.toString().includes('__hook__'), 'f15 Generated function is hooked');

    let f16 = Reflect.apply(ES5SubclassFunction, window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f16(1, 2), 3, 'Reflect.apply(ES5 subclass AsyncFunction) call');
    chai.assert.isOk(f16.toString().includes('__hook__'), 'f16 Generated function is hooked');

    let f17 = ES5SubclassFunction.apply(window, ['p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f17(1, 2), 3, 'ES5 subclass AsyncFunction.apply() call');
    chai.assert.isOk(f17.toString().includes('__hook__'), 'f17 Generated function is hooked');

    let f18 = ES5SubclassFunction.call(window, 'p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f18(1, 2), 3, 'ES5 subclass AsyncFunction.call() call');
    chai.assert.isOk(f18.toString().includes('__hook__'), 'f18 Generated function is hooked');

    class CustomConstructorSubclassFunction extends AsyncFunction {
      constructor(dummy, ...args) {
        super(...args);
      }
    }

    let f19 = new CustomConstructorSubclassFunction('dummy', 'p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })');
    chai.assert.equal(await f19(1, 2), 3, 'f19 new subclass AsyncFunction() call');
    chai.assert.isOk(f19.toString().includes('__hook__'), 'f19 Generated function is hooked');
    chai.assert.isOk(f19 instanceof CustomConstructorSubclassFunction, 'f19 Generated function is an instanceof the subclass');
    chai.assert.isOk(f19 instanceof AsyncFunction, 'f19 Generated function is an instanceof AsyncFunction');

    let f20 = Reflect.construct(CustomConstructorSubclassFunction, ['dummy', 'p1', 'p2', 'return await new Promise((resolve) => { setTimeout(() => { resolve(p1 + p2); }, 100); })']);
    chai.assert.equal(await f20(1, 2), 3, 'Reflect.construct(subclass AsyncFunction) call');
    chai.assert.isOk(f20.toString().includes('__hook__'), 'f20 Generated function is hooked');
    chai.assert.isOk(f20 instanceof CustomConstructorSubclassFunction, 'f20 Generated function is an instanceof the subclass');
    chai.assert.isOk(f20 instanceof AsyncFunction, 'f20 Generated function is an instanceof AsyncFunction');

    try {
      let o = { F: AsyncFunction };
      await o.F('return caches')();
    }
    catch (e) {
      chai.assert.throws(() => {
        throw e;
      }, /^Permission Denied:/);
    }
  }
  asyncFunc();

  const GeneratorFunction = (function* () {}).constructor;
  const generatorFunc = function () {

    let f1 = GeneratorFunction('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f1(1, 2).next().value, 3, 'GeneratorFunction() call');
    chai.assert.isOk(f1.toString().includes('__hook__'), 'Generated function is hooked');

    let f2 = new GeneratorFunction('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f2(1, 2).next().value, 3, 'new GeneratorFunction() call');
    chai.assert.isOk(f2.toString().includes('__hook__'), 'Generated function is hooked');

    let f3 = Reflect.construct(GeneratorFunction, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f3(1, 2).next().value, 3, 'Reflect.construct(GeneratorFunction) call');
    chai.assert.isOk(f3.toString().includes('__hook__'), 'Generated function is hooked');

    let f4 = Reflect.apply(GeneratorFunction, window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f4(1, 2).next().value, 3, 'Reflect.apply(GeneratorFunction) call');
    chai.assert.isOk(f4.toString().includes('__hook__'), 'Generated function is hooked');

    let f5 = GeneratorFunction.apply(window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f5(1, 2).next().value, 3, 'GeneratorFunction.apply() call');
    chai.assert.isOk(f5.toString().includes('__hook__'), 'Generated function is hooked');

    let f6 = GeneratorFunction.call(window, 'p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f6(1, 2).next().value, 3, 'GeneratorFunction.call() call');
    chai.assert.isOk(f6.toString().includes('__hook__'), 'Generated function is hooked');

    let F = GeneratorFunction;
    let f7 = F('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f7(1, 2).next().value, 3, 'indirect GeneratorFunction() call');
    chai.assert.isOk(f7.toString().includes('__hook__'), 'Generated function is hooked');

    let f8 = new F('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f8(1, 2).next().value, 3, 'indirect new GeneratorFunction() call');
    chai.assert.isOk(f8.toString().includes('__hook__'), 'Generated function is hooked');

    let f9 = Reflect.construct(F, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f9(1, 2).next().value, 3, 'indirect Reflect.construct(GeneratorFunction) call');
    chai.assert.isOk(f9.toString().includes('__hook__'), 'Generated function is hooked');

    let f10 = Reflect.apply(F, window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f10(1, 2).next().value, 3, 'indirect Reflect.apply(GeneratorFunction) call');
    chai.assert.isOk(f10.toString().includes('__hook__'), 'Generated function is hooked');

    let f11 = F.apply(window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f11(1, 2).next().value, 3, 'indirect GeneratorFunction.apply() call');
    chai.assert.isOk(f11.toString().includes('__hook__'), 'Generated function is hooked');

    let f12 = F.call(window, 'p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f12(1, 2).next().value, 3, 'indirect GeneratorFunction.call() call');
    chai.assert.isOk(f12.toString().includes('__hook__'), 'Generated function is hooked');

    class SubclassFunction extends GeneratorFunction {}
    function ES5SubclassFunction (...args) {
      return Object.getPrototypeOf(ES5SubclassFunction)(...args);
    }
    Object.setPrototypeOf(ES5SubclassFunction, GeneratorFunction);
    Object.setPrototypeOf(ES5SubclassFunction.prototype, GeneratorFunction.prototype);

    let f13 = ES5SubclassFunction('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f13(1, 2).next().value, 3, 'ES5 subclass GeneratorFunction() call');
    chai.assert.isOk(f13.toString().includes('__hook__'), 'Generated function is hooked');

    let f14 = new SubclassFunction('p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f14(1, 2).next().value, 3, 'new subclass GeneratorFunction() call');
    chai.assert.isOk(f14.toString().includes('__hook__'), 'Generated function is hooked');

    let f15 = Reflect.construct(SubclassFunction, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f15(1, 2).next().value, 3, 'Reflect.construct(subclass GeneratorFunction) call');
    chai.assert.isOk(f15.toString().includes('__hook__'), 'Generated function is hooked');

    let f16 = Reflect.apply(ES5SubclassFunction, window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f16(1, 2).next().value, 3, 'Reflect.apply(ES5 subclass GeneratorFunction) call');
    chai.assert.isOk(f16.toString().includes('__hook__'), 'Generated function is hooked');

    let f17 = ES5SubclassFunction.apply(window, ['p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f17(1, 2).next().value, 3, 'ES5 subclass GeneratorFunction.apply() call');
    chai.assert.isOk(f17.toString().includes('__hook__'), 'Generated function is hooked');

    let f18 = ES5SubclassFunction.call(window, 'p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f18(1, 2).next().value, 3, 'ES5 subclass GeneratorFunction.call() call');
    chai.assert.isOk(f18.toString().includes('__hook__'), 'Generated function is hooked');

    class CustomConstructorSubclassFunction extends GeneratorFunction {
      constructor(dummy, ...args) {
        super(...args);
      }
    }

    let f19 = new CustomConstructorSubclassFunction('dummy', 'p1', 'p2', 'yield p1 + p2');
    chai.assert.equal(f19(1, 2).next().value, 3, 'new subclass GeneratorFunction() call');
    chai.assert.isOk(f19.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(f19 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
    chai.assert.isOk(f19 instanceof GeneratorFunction, 'Generated function is an instanceof GeneratorFunction');

    let f20 = Reflect.construct(CustomConstructorSubclassFunction, ['dummy', 'p1', 'p2', 'yield p1 + p2']);
    chai.assert.equal(f20(1, 2).next().value, 3, 'Reflect.construct(subclass GeneratorFunction) call');
    chai.assert.isOk(f20.toString().includes('__hook__'), 'Generated function is hooked');
    chai.assert.isOk(f20 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
    chai.assert.isOk(f20 instanceof GeneratorFunction, 'Generated function is an instanceof Function');

    chai.assert.throws(() => {
      let o = { F: (function* () {}).constructor };
      o.F('yield caches')().next().value;
    }, /^Permission Denied:/);
  }
  generatorFunc();

  chai.assert.throws(() => {
    let o = { F: (function () {}).constructor };
    o.F('return caches')();
  }, /^Permission Denied:/);
}