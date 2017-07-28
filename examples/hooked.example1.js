class A1 {
  constructor(x, y, z) {
    return __hook__((x, y = 3, z = 5) => {
      __hook__('=', this, [
        'x',
        x
      ], 'examples/example1.js,A1,constructor');
      __hook__('=', this, [
        'y',
        y
      ], 'examples/example1.js,A1,constructor');
      __hook__('=', this, [
        'z',
        z
      ], 'examples/example1.js,A1,constructor');
    }, null, arguments, 'examples/example1.js,A1,constructor');
  }
  method(a, b, c) {
    return __hook__((a, b = 4, c = 9) => {
      return a + b + c;
    }, this, arguments, 'examples/example1.js,A1,method');
  }
  method2(a, b, c) {
    return __hook__((a = 1, b = 3, c = 7) => {
      return a + b + c + 1;
    }, this, arguments, 'examples/example1.js,A1,method2');
  }
}
class X1 extends A1 {
  constructor(x, y, z) {
    return __hook__((x, y, z = 9) => {
      super(x, y, z);
      __hook__('=', this, [
        'xyz',
        {
          x: x,
          y: y,
          z: z
        }
      ], 'examples/example1.js,X1,constructor');
    }, null, arguments, 'examples/example1.js,X1,constructor');
  }
  a(p, nn) {
    return __hook__((p = 1, nn = 3) => {
      let x = (...args) => __hook__(n => __hook__('.', this, ['b'], 'examples/example1.js,X1,a,x') + n, this, args, 'examples/example1.js,X1,a,x');
      let y = (...args) =>
        (__hook__(n => {
          return __hook__('.', this, ['b'], 'examples/example1.js,X1,a,y') + n;
        }, this, args, 'examples/example1.js,X1,a,y'));
      let z = (...args) => __hook__((p, n) => ({
        p: p * 2,
        n: n * 3
      }), this, args, 'examples/example1.js,X1,a,z');
      let u = (...args) => __hook__((p, n) => [
        p * 2,
        n * 3
      ], this, args, 'examples/example1.js,X1,a,u');
      return x(nn) + y(p) + __hook__('.', z(p, nn), ['p'], 'examples/example1.js,X1,a') + __hook__('.', u(p, nn), [1], 'examples/example1.js,X1,a');
    }, this, arguments, 'examples/example1.js,X1,a');
  }
  get b() {
    return __hook__(() => {
      return 1;
    }, this, arguments, 'examples/example1.js,X1,get b');
  }
  method(a, b, c) {
    return __hook__((a, b = 0, c = b + 3) => {
      return super.method2(a, b, c) + 1;
    }, this, arguments, 'examples/example1.js,X1,method');
  }
  async amethod(a, b, c) {
    return __hook__(async (a, b = a + 3, c = b + 3) => {
      let afunc = async (...args) => __hook__(async (x, y, z) => x * y * z, this, args, 'examples/example1.js,X1,amethod,afunc');
      return await afunc(a, b, c);
    }, this, arguments, 'examples/example1.js,X1,amethod');
  }
  *gmethod(a, b, c) {
    yield* __hook__(function* (a, b = a * 5, c = a * b * 4) {
      yield a;
      yield b;
      yield c;
    }, this, arguments, 'examples/example1.js,X1,gmethod');
  }
  static smethod(a, b, c) {
    return __hook__((a = 2, b = a * 2, c = b * 3) => {
      return a + b + c;
    }, this, arguments, 'examples/example1.js,X1,static smethod');
  }
}
class Y1 extends X1 {
  constructor(x, y, z) {
    return __hook__((x = 3, y = x * 3, z = x * y * 5) => {
      super(x, y, z);
      __hook__('=', this, [
        'XYZ',
        {
          x: x,
          y: y,
          z: z
        }
      ], 'examples/example1.js,Y1,constructor');
    }, null, arguments, 'examples/example1.js,Y1,constructor');
  }
}
let o = {
  *generator() {
    yield* __hook__(function* () {
      yield 1;
      yield 2;
    }, this, arguments, 'examples/example1.js,o,generator');
  }
};
function f(a, b, c) {
  return __hook__((a, b, c) => {
    return a + b + c;
  }, this, arguments, 'examples/example1.js,f');
}
async function afunc(a, b, c) {
  return __hook__(async (a, b, c) => {
    return a + b + c;
  }, this, arguments, 'examples/example1.js,afunc');
}
function* gfunc(a, b, c) {
  yield* __hook__(function* (a, b, c) {
    // comment for gfunc
    yield* [
      a,
      b,
      c
    ];
  }, this, arguments, 'examples/example1.js,gfunc');
}
function destructuring([x, , [y], z], [a, b, c]) {
  return __hook__(([x, , [y = 2], z = 3], [a, b = 5, c = 6]) => {
    return x + y + z + a + b + c;
  }, this, arguments, 'examples/example1.js,destructuring');
}
function d() {
  return __hook__(() => {
    return function descructuringWithObjects({
      a,
      b,
      c,
      x: d,
      y: e
    }, [f, g, h]) {
      return __hook__(({
        a = 1,
        b = 0,
        c = 3,
        x: d = 0,
        y: e
      }, [f = 6, g = 0, h = 8]) => {
        return a === 1 && b === 2 && c === 3 && d === 4 && e === 5 && f === 6 && g === 7 && h === 8;
      }, this, arguments, 'examples/example1.js,d,descructuringWithObjects');
    }({
      b: 2,
      c: undefined,
      x: 4,
      y: 5
    }, [
      ,
      7,
      undefined
    ]);
  }, this, arguments, 'examples/example1.js,d');
}