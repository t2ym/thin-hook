export let exportedName = 'exportedNameOriginalValue'; // writable only in module2
export let exportedName2 = 'exportedName2Value';
// exported but inaccessible
export let inaccessibleString = 'inaccessible string value';
export let inaccessibleNumber = -1;
export let inaccessibleBoolean = false;
export let inaccessibleSymbol = Symbol('inaccessible');
export let inaccessibleNull = null;
export let inaccessibleUndefined = undefined;
export let inaccessibleBigInt = BigInt('1000000000000000000000000000000000000000');
export let inaccessibleFunction = function inaccessibleFunction() {};
export let inaccessibleObject = { inaccessible: true };

export class ExportedClass {
  constructor() {
    this.readableProperty = 'readable';
    this.unreadableProperty = 'unreadable';
  }
  static callableStaticMethod() { return 'called'; }
  callableMethod(x) { return typeof x; }
}

// write
exportedName = 'exportedNameValue';
chai.assert.throws(() => { exportedName(); }, /^Permission Denied:/);

// read
chai.assert.throws(() => { inaccessibleString; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject; }, /^Permission Denied:/);
// read via unary operator
chai.assert.throws(() => { typeof inaccessibleString; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleNumber; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleBoolean; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleSymbol; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleNull; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleUndefined; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleBigInt; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleFunction; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleObject; }, /^Permission Denied:/);
/*
// update operator (throws before operations)
chai.assert.throws(() => { inaccessibleString++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject++; }, /^Permission Denied:/);
*/
// call operator (throws before operations)
chai.assert.throws(() => { inaccessibleString(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject(); }, /^Permission Denied:/);
// new operator (throws before operations)
chai.assert.throws(() => { new inaccessibleString(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleNumber(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleBoolean(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleSymbol(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleNull(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleUndefined(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleBigInt(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleFunction(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleObject(); }, /^Permission Denied:/);
/*
// assignment operators
chai.assert.throws(() => { inaccessibleString = 'abc'; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber = 1; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean = true; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol = Symbol('new value'); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull = null; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined = undefined; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt = BigInt(1); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction = function () {}; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject = {}; }, /^Permission Denied:/);
// LHS values
chai.assert.throws(() => { [ inaccessibleString ] = [ 'abc' ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleNumber ] = [ 1 ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleBoolean ] = [ true ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleSymbol ] = [ Symbol('new value') ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleNull ] = [ null ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleUndefined ] = [ undefined ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleBigInt ] = [ BigInt(1) ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleFunction ] = [ function () {} ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleObject ] = [ {} ]; }, /^Permission Denied:/);
*/
