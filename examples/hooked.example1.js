class A1 {
  constructor(x, y, z) {
    return __hook__((x, y = 3, z = 5) => {
      this.x = x;
      this.y = y;
      this.z = z;
    }, null, arguments);
  }
  method(a, b, c) {
    return __hook__((a, b = 4, c = 9) => {
      return a + b + c;
    }, this, arguments);
  }
  method2(a, b, c) {
    return __hook__((a = 1, b = 3, c = 7) => {
      return a + b + c + 1;
    }, this, arguments);
  }
}
class X1 extends A1 {
  constructor(x, y, z) {
    return __hook__((x, y, z = 9) => {
      super(x, y, z);
      this.xyz = {
        x: x,
        y: y,
        z: z
      };
    }, null, arguments);
  }
  a(p, nn) {
    return __hook__((p = 1, nn = 3) => {
      let x = (...args) => __hook__(n => this.b + n, this, args);
      let y = (...args) =>
        (__hook__(n => {
          return this.b + n;
        }, this, args));
      let z = (...args) => __hook__((p, n) => ({
        p: p * 2,
        n: n * 3
      }), this, args);
      let u = (...args) => __hook__((p, n) => [
        p * 2,
        n * 3
      ], this, args);
      return x(nn) + y(p) + z(p, nn).p + u(p, nn)[1];
    }, this, arguments);
  }
  get b() {
    return __hook__(() => {
      return 1;
    }, this, arguments);
  }
  method(a, b, c) {
    return __hook__((a, b = 0, c = b + 3) => {
      return super.method2(a, b, c) + 1;
    }, this, arguments);
  }
  async amethod(a, b, c) {
    return __hook__(async (a, b = a + 3, c = b + 3) => {
      let afunc = async (...args) => __hook__(async (x, y, z) => x * y * z, this, args);
      return await afunc(a, b, c);
    }, this, arguments);
  }
  *gmethod(a, b, c) {
    yield* __hook__(function* (a, b = a * 5, c = a * b * 4) {
      yield a;
      yield b;
      yield c;
    }, this, arguments);
  }
  static smethod(a, b, c) {
    return __hook__((a = 2, b = a * 2, c = b * 3) => {
      return a + b + c;
    }, this, arguments);
  }
}
class Y1 extends X1 {
  constructor(x, y, z) {
    return __hook__((x = 3, y = x * 3, z = x * y * 5) => {
      super(x, y, z);
      this.XYZ = {
        x: x,
        y: y,
        z: z
      };
    }, null, arguments);
  }
}
let o = {
  *generator() {
    yield* __hook__(function* () {
      yield 1;
      yield 2;
    }, this, arguments);
  }
};
function f(a, b, c) {
  return __hook__((a, b, c) => {
    return a + b + c;
  }, this, arguments);
}
async function afunc(a, b, c) {
  return __hook__(async (a, b, c) => {
    return a + b + c;
  }, this, arguments);
}
function* gfunc(a, b, c) {
  yield* __hook__(function* (a, b, c) {
    // comment for gfunc
    yield* [
      a,
      b,
      c
    ];
  }, this, arguments);
}
function destructuring([x, , [y], z], [a, b, c]) {
  return __hook__(([x, , [y = 2], z = 3], [a, b = 5, c = 6]) => {
    return x + y + z + a + b + c;
  }, this, arguments);
}