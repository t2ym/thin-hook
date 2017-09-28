let gA1 = [ 1, 2 ];
let gX1 = { a: 1, b: 2 };
{
  let a2 = [ 3, 4, ...gA1 ];
  let y = { c: 3, ...gX1 };
  let z = { a: 1, ...{ a: 1, b: 2, ...(function () { return y; })() } };
  'a' in z;
  let p;
  for (p in z) {}
  for (p of a2) {}
}
function ff() {
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
  }
}
ff();