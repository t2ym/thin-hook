{
  var gVar1 = 1;
  let gg = gVar1;
  let a = { foo: 1, bar: 2, [Symbol.unscopables]: { bar: true } };
  with (a) {
    let x = 3;
    let y = 9;
    let z;
    let b = { y: 4, z: 5, u: 7, [Symbol.unscopables]: { z: true } };
    with (b) {
      let v1 = foo;
      let v2 = typeof bar;
      let v3 = y;
      let v4 = typeof z;
      let u = 11;
      let v5 = u;
      let g = gVar1;
      foo = 3;
      y = 5;
      g;
      y++;
      a.bar++;
      b.z;
      x + y;
      x in y;
      x && y;
      x ? y : z;
      if (x) {}
      while (x) {}
      do {} while (x);
      for (x; y; z) {}
      for (x in y) {}
      for (x of y) {}
      switch (x) {
      case y: break;
      }
      f1`value is ${foo}`;
      x, y, z;
      chai.assert.equal(v1, 1, 'foo is 1');
      chai.assert.equal(v2, 'undefined', 'typeof bar is undefined');
      chai.assert.equal(v3, 4, 'y is 4');
      chai.assert.equal(v5, 11, 'u is 11');
      chai.assert.equal(v4, 'undefined', 'typeof z is undefined');
      with ({ z:1, u: 2, [Symbol.unscopables]: { u: true } }) {
        let v6 = z;
        let v7 = u;
        chai.assert.equal(v6, 1, 'z is 1');
        chai.assert.equal(v7, 11, 'u is 11');
        x = y;
      }
      delete u;
      delete u.prop;
      let method = 'method';
      class B {}
      class C extends B {
        [method]() {}
      }
      let CC = class CC extends B {
        [method]() {}
      }
      function f1(aa = y, bb = u.prop) {
        return aa;
      }
      new CC(y);
      x(y);
      y.z(x);
      function f2([xx = y]) {
        return aa;
      }
      [x, y] = [x, y];
      [x, ...y] = [x, ...y];
      let o = {
        [comp]: x,
        nonComputed: y
      };
      throw x;
      async function afunc(x) {
        await foo();
      }
      function* gen(x) {
        yield y;
        yield* [x, y];
      }
    }
    chai.assert.equal(b.y, 6, 'b.y is 6');
  }
  chai.assert.equal(a.foo, 3, 'a.foo is 3');
}
let gA1 = [ 1, 2 ];
let gX1 = { a: 1, b: 2 };
with ({ gA1: [ 5, 6 ], gX1: { a: 4, b: 5 } }) {
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
  ({ x, ...y } = { x: x, ...y });
  let { A, ...B } = { A: y, p: a2, ...y };
  let [ p1, p2 = y, ...p3 ] = [ 2, , 5, z.a, ...a2 ];
}

