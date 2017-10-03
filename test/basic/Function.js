{
  let f1 = Function('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f1(1, 2), 3, 'Function() call');
  chai.assert.isOk(f1.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f1'], 'Function() call is hooked');

  let f2 = new Function('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f2(1, 2), 3, 'new Function() call');
  chai.assert.isOk(f2.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f2'], 'new Function() call is hooked');

  let f3 = Reflect.construct(Function, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f3(1, 2), 3, 'Reflect.construct(Function) call');
  chai.assert.isOk(f3.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f3'], 'Reflect.construct(Function) call is normalized');

  let f4 = Reflect.apply(Function, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f4(1, 2), 3, 'Reflect.apply(Function) call');
  chai.assert.isOk(f4.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f4'], 'Reflect.apply(Function) call is normalized');

  let f5 = Function.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f5(1, 2), 3, 'Function.apply() call');
  chai.assert.isOk(f5.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f5'], 'Function.apply() call is normalized');

  let f6 = Function.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f6(1, 2), 3, 'Function.call() call');
  chai.assert.isOk(f6.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f6'], 'Function.call() call is normalized');

  let F = Function;
  let f7 = F('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f7(1, 2), 3, 'indirect Function() call');
  chai.assert.isOk(f7.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f7'], 'indirect Function() call is hooked');

  let f8 = new F('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f8(1, 2), 3, 'indirect new Function() call');
  chai.assert.isOk(f8.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f8'], 'indirect new Function() call is hooked');

  let f9 = Reflect.construct(F, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f9(1, 2), 3, 'indirect Reflect.construct(Function) call');
  chai.assert.isOk(f9.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f9'], 'indirect Reflect.construct(Function) call is normalized');

  let f10 = Reflect.apply(F, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f10(1, 2), 3, 'indirect Reflect.apply(Function) call');
  chai.assert.isOk(f10.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f10'], 'indirect Reflect.apply(Function) call is normalized');

  let f11 = F.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f11(1, 2), 3, 'indirect Function.apply() call');
  chai.assert.isOk(f11.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f11'], 'indirect Function.apply() call is normalized');

  let f12 = F.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f12(1, 2), 3, 'indirect Function.call() call');
  chai.assert.isOk(f12.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,f12'], 'indirect Function.call() call is normalized');

  class SubclassFunction extends Function {}
  function ES5SubclassFunction (...args) {
    return Object.getPrototypeOf(ES5SubclassFunction)(...args);
  }
  Object.setPrototypeOf(ES5SubclassFunction, Function);
  Object.setPrototypeOf(ES5SubclassFunction.prototype, Function.prototype);

  let f13 = ES5SubclassFunction('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f13(1, 2), 3, 'ES5 subclass Function() call');
  chai.assert.isOk(f13.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.equal(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label, 1, 'ES5 subclass Function() call is hooked');

  let f14 = new SubclassFunction('p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f14(1, 2), 3, 'new subclass Function() call');
  chai.assert.isOk(f14.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f14'], 'new subclass Function() call is hooked');

  let f15 = Reflect.construct(SubclassFunction, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f15(1, 2), 3, 'Reflect.construct(subclass Function) call');
  chai.assert.isOk(f15.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f15'], 'Reflect.construct(subclass Function) call is normalized');

  let f16 = Reflect.apply(ES5SubclassFunction, window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f16(1, 2), 3, 'Reflect.apply(ES5 subclass Function) call');
  chai.assert.isOk(f16.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.equal(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label, 2, 'Reflect.apply(ES5 subclass Function) call is normalized');

  let f17 = ES5SubclassFunction.apply(window, ['p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f17(1, 2), 3, 'ES5 subclass Function.apply() call');
  chai.assert.isOk(f17.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.equal(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label, 3, 'ES5 subclass Function.apply() call is normalized');

  let f18 = ES5SubclassFunction.call(window, 'p1', 'p2', 'return p1 + p2');
  chai.assert.equal(f18(1, 2), 3, 'ES5 subclass Function.call() call');
  chai.assert.isOk(f18.toString().includes('__hook__'), 'Generated function is hooked');
  //chai.assert.equal(globalObjectAccess.window.Function['/components/thin-hook/demo/Function.js,ES5SubclassFunction'].label, 4, 'ES5 subclass Function.call() call is normalized');

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
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f19'], 'new subclass Function() call is hooked');

  let f20 = Reflect.construct(CustomConstructorSubclassFunction, ['dummy', 'p1', 'p2', 'return p1 + p2']);
  chai.assert.equal(f20(1, 2), 3, 'Reflect.construct(subclass Function) call');
  chai.assert.isOk(f20.toString().includes('__hook__'), 'Generated function is hooked');
  chai.assert.isOk(f20 instanceof CustomConstructorSubclassFunction, 'Generated function is an instanceof the subclass');
  chai.assert.isOk(f20 instanceof Function, 'Generated function is an instanceof Function');
  //chai.assert.isOk(globalObjectAccess.Function['/components/thin-hook/demo/Function.js,f20'], 'Reflect.construct(subclass Function) call is normalized');

}