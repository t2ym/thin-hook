class A1 {
  constructor(x, y = 3, z = 5) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  method(a, b = 4, c = 9) {
    return a + b + c;
  }
  method2(a = 1, b = 3, c = 7) {
    return a + b + c + 1;
  }
} 
class X1 extends A1 {
  constructor(x, y, z = 9) {
    super(x, y, z);
    this.xyz = { x: x, y: y, z: z };
  }
  a(p = 1, nn = 3) {
    let x = n => this.b + n;
    let y = n => { return this.b + n; };
    let z = (p, n) => ({ p: p * 2, n: n * 3 });
    let u = (p, n) => ([ p * 2, n * 3 ]);
    return x(nn) + y(p) + z(p, nn).p + u(p, nn)[1];
  }
  get b() {
    return 1;
  }
  method(a, b = 0, c = b + 3) {
    return super.method2(a, b, c) + 1;
  }
  async amethod(a, b = a + 3, c = b + 3) {
    let afunc = async (x, y, z) => x * y * z;
    return await afunc(a, b, c);
  }
  * gmethod(a, b = a * 5, c = a * b * 4) {
    yield a;
    yield b;
    yield c;
  }
  static smethod(a = 2, b = a * 2, c = b * 3) {
    return a + b + c;
  }
}
class Y1 extends X1 {
  constructor(x = 3, y = x * 3, z = x * y * 5) {
    super(x, y, z);
    this.XYZ = { x: x, y: y, z: z };
  }
}
let o = {
  *generator() {
    yield 1;
    yield 2;
  }
}
function f(a, b, c) {
  return a + b + c;
}
async function afunc(a, b, c) {
  return a + b + c;
}
function * gfunc(a, b, c) {
  // comment for gfunc
  yield * [a, b, c];
}
function destructuring([x, , [y = 2], z = 3], [a, b = 5, c = 6]) {
  return x + y + z + a + b + c;
}
function d() {
  return (function descructuringWithObjects({a = 1, b = 0, c = 3, x:d = 0, y:e},
    [f = 6, g = 0, h = 8]) {
    return a === 1 && b === 2 && c === 3 && d === 4 &&
    e === 5 && f === 6 && g === 7 && h === 8;
  }({b:2, c:undefined, x:4, y:5},[, 7, undefined]));
}
