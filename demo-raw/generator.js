{
  // generators and "this" object
  let o = { start: 3, end: 6 };
  function * nonStrictGenerator() {
    if (this) {
      if (this instanceof Window) {
        yield * [4, 5, 6];
      }
      else {
        for (let i = this.start; i <= this.end; i++) {
          yield i;
        }
      }
    }
    else {
      yield * [1, 2, 3]; // dead code
    }
  }
  let a = [];
  for (let v of nonStrictGenerator()) {
    a.push(v);
  }
  chai.assert.deepEqual(a, [4,5,6], 'generator for of');
  let aa = [];
  for (let v of nonStrictGenerator.call(o)) {
    aa.push(v);
  }
  chai.assert.deepEqual(aa, [3,4,5,6], 'generator for of');
  let aaa = [];
  for (let v of nonStrictGenerator.call(null)) { // this defaults to window
    aaa.push(v);
  }
  chai.assert.deepEqual(aaa, [4,5,6], 'generator for of');

  function * generator() {
    'use strict';
    if (this) {
      for (let i = this.start; i <= this.end; i++) {
        yield i;
      }
    }
    else {
      yield * [1, 2, 3];
    }
  }
  let b = [];
  for (let v of generator()) {
    b.push(v);
  }
  chai.assert.deepEqual(b, [1,2,3], 'generator for of');
  let bb = [];
  for (let v of generator.call(o)) {
    bb.push(v);
  }
  chai.assert.deepEqual(bb, [3,4,5,6], 'generator for of');
  let bbb = [];
  for (let v of generator.call(null)) { // this defaults to undefined
    bbb.push(v);
  }
  chai.assert.deepEqual(bbb, [1,2,3], 'generator for of');

  class GeneratorCheck {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }
    * generator() {
      if (this) {
        for (let i = this.start; i <= this.end; i++) {
          yield i;
        }
      }
      else {
        yield * [1, 2, 3];
      }
    }
  }
  let gc = new GeneratorCheck(7, 9);
  let c = [];
  for (let v of gc.generator()) {
    c.push(v);
  }
  chai.assert.deepEqual(c, [7,8,9], 'generator method for of');
  let cc = [];
  for (let v of gc.generator.call(o)) {
    cc.push(v);
  }
  chai.assert.deepEqual(cc, [3,4,5,6], 'generator method for of');
  let ccc = [];
  for (let v of gc.generator.call(null)) { // this defaults to undefined
    ccc.push(v);
  }
  chai.assert.deepEqual(ccc, [1,2,3], 'generator method for of');
}
