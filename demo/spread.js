let gA1 = [ 1, 2 ];
let gX1 = { a: 1, b: 2 };
let { gU, ...gRestP } = { u: 1, v: 2, w: 3 };
let [ gA, ...gRestE ] = [ 1, 2, 3 ];
{
  let a2 = [ 3, 4, ...gA1 ];
  let y = { c: 3, ...gX1 };
  let z = { a: 1, ...{ a: 1, b: 2, ...(function () { return y; })() } };
  let { u, ...restP } = { u: 1, v: 2, w: 3 };
  let [ a3, ...restE ] = [ 1, 2, 3 ];

  chai.assert.throws(() => {
    let w = { ...window };
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let w = { ...(function () { return window })() };
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let n = { ...navigator };
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    'caches' in window;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    'serviceWorker' in navigator;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    for (let p in window) {}
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    for (let p in navigator) {}
  }, /^Permission Denied:/);

  window.UniterableArray = class UniterableArray extends Array {};
  chai.assert.throws(() => {
    let a = new UniterableArray(1, 2, 3);
    for (let p of a) {}
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    (new Function ('\'use strict\'; eval(\'for (var i = 0 in {}) {}\');'))();
  });

}
() => {

  'property' in target //(target.property)
  //Note: target is hooked if it is global
  for (p in target) //(target.*)
  //Note: target is hooked if it is global
  for (v of target) //(target.*)
  //Note: target is hooked if it is global
  Object.create(target) //(target.*)
  //Note: target is hooked if it is global

}
{
  function ff() {
    let gA1 = [ 1, 2 ];
    let gX1 = { a: 1, b: 2 };
    with ({ gA1: [ 5, 6 ], gX1: { a: 4, b: 5 }, v1: 1, v2: 2, v3: 3 }) {
      let a2 = [ 3, 4, ...gA1 ];
      chai.assert.deepEqual(a2, [ 3, 4, 5, 6 ], 'a2 is [ 3,4,5,6 ]');
      let y = { c: 3, ...gX1 };
      chai.assert.deepEqual(y, { c: 3, a: 4, b: 5 }, 'y is { c: 3, a: 4, b: 5 }');
      let z = { a: 1, ...{ a: 1, b: 2, ...(function () { return y; })() } };
      chai.assert.deepEqual(z, { c: 3, a: 4, b: 5 }, 'z is { c: 3, a: 4, b: 5 }');
      chai.assert.isOk('a' in z, 'a in z');
      let p;
      let l1 = [];
      for (p in z) {
        l1.push(p);
      }
      chai.assert.deepEqual(l1.sort(), [ 'a', 'b', 'c' ], 'z has a, b, c');
      let l2 = [];
      for (p of a2) {
        l2.push(p);
      }
      chai.assert.deepEqual(l2, [3,4,5,6], 'a2 lists [3,4,5,6]');
      [ v1, ...v3 ] = [ v1 + 1, ...[v2 + 1, v3]];
      chai.assert.equal(v1, 2, 'v1 is 2');
      chai.assert.equal(v2, 2, 'v2 is 2');
      chai.assert.deepEqual(v3, [3, 3], 'v3 is [3,3]');
      ({p, ...gX1} = { p: gA1, ...y });
      chai.assert.deepEqual(p, [5,6], 'p is [5,6]');
      chai.assert.deepEqual(gX1, { c: 3, a: 4, b: 5 }, 'gX1 is { c: 3, a: 4, b: 5 }');
    }
  }
  ff();
}