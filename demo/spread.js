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