$hook$.global(__hook__, 'examples/example1.js,A1', 'A1', 'class')._p_A1 = class A1 {
  constructor(x, y, z) {
    return __hook__((x, y = 3, z = 5) => {
      __hook__('#=', this, [
        'x',
        x
      ], 'examples/example1.js,A1,constructor');
      __hook__('#=', this, [
        'y',
        y
      ], 'examples/example1.js,A1,constructor');
      __hook__('#=', this, [
        'z',
        z
      ], 'examples/example1.js,A1,constructor');
    }, null, arguments, 'examples/example1.js,A1,constructor');
  }
  method(a, b, c) {
    return __hook__((a, b = 4, c = 9) => {
      return a + b + c;
    }, null, arguments, 'examples/example1.js,A1,method');
  }
  method2(a, b, c) {
    return __hook__((a = 1, b = 3, c = 7) => {
      return a + b + c + 1;
    }, null, arguments, 'examples/example1.js,A1,method2');
  }
};
$hook$.global(__hook__, 'examples/example1.js,X1', 'X1', 'class')._p_X1 = class X1 extends $hook$.global(__hook__, 'examples/example1.js,X1', 'A1', 'get')._p_A1 {
  constructor(x, y, z) {
    return __hook__((x, y, z = 9) => {
      __hook__((newTarget, ...args) => super(...args), null, [
        new.target,
        x,
        y,
        z
      ], 'examples/example1.js,X1,constructor', '');
      __hook__('#=', this, [
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
      let x = (...args) => __hook__(n => __hook__('#.', this, ['b'], 'examples/example1.js,X1,a,x') + n, null, args, 'examples/example1.js,X1,a,x');
      let y = (...args) =>
        (__hook__(n => {
          return __hook__('#.', this, ['b'], 'examples/example1.js,X1,a,y') + n;
        }, null, args, 'examples/example1.js,X1,a,y'));
      let z = (...args) => __hook__((p, n) => ({
        p: p * 2,
        n: n * 3
      }), null, args, 'examples/example1.js,X1,a,z');
      let u = (...args) => __hook__((p, n) => [
        p * 2,
        n * 3
      ], null, args, 'examples/example1.js,X1,a,u');
      return __hook__(x, null, [nn], 'examples/example1.js,X1,a', 0) + __hook__(y, null, [p], 'examples/example1.js,X1,a', 0) + __hook__('#.', __hook__(z, null, [
        p,
        nn
      ], 'examples/example1.js,X1,a', 0), ['p'], 'examples/example1.js,X1,a') + __hook__('#.', __hook__(u, null, [
        p,
        nn
      ], 'examples/example1.js,X1,a', 0), [1], 'examples/example1.js,X1,a');
    }, null, arguments, 'examples/example1.js,X1,a');
  }
  get b() {
    return __hook__(() => {
      return 1;
    }, null, arguments, 'examples/example1.js,X1,get b');
  }
  method(a, b, c) {
    return __hook__((a, b = 0, c = b + 3) => {
      return __hook__('s()', this, [
        'method2',
        [
          a,
          b,
          c
        ],
        p => super[p]
      ], 'examples/example1.js,X1,method') + 1;
    }, null, arguments, 'examples/example1.js,X1,method');
  }
  async amethod(a, b, c) {
    return __hook__(async (a, b = a + 3, c = b + 3) => {
      let afunc = async (...args) => __hook__(async (x, y, z) => x * y * z, null, args, 'examples/example1.js,X1,amethod,afunc');
      return await __hook__(afunc, null, [
        a,
        b,
        c
      ], 'examples/example1.js,X1,amethod', 0);
    }, null, arguments, 'examples/example1.js,X1,amethod');
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
    }, null, arguments, 'examples/example1.js,X1,static smethod');
  }
};
$hook$.global(__hook__, 'examples/example1.js,Y1', 'Y1', 'class')._p_Y1 = class Y1 extends $hook$.global(__hook__, 'examples/example1.js,Y1', 'X1', 'get')._p_X1 {
  constructor(x, y, z) {
    return __hook__((x = 3, y = x * 3, z = x * y * 5) => {
      __hook__((newTarget, ...args) => super(...args), null, [
        new.target,
        x,
        y,
        z
      ], 'examples/example1.js,Y1,constructor', '');
      __hook__('#=', this, [
        'XYZ',
        {
          x: x,
          y: y,
          z: z
        }
      ], 'examples/example1.js,Y1,constructor');
    }, null, arguments, 'examples/example1.js,Y1,constructor');
  }
};
$hook$.global(__hook__, 'examples/example1.js', 'o', 'let')._p_o = {
  *generator() {
    yield* __hook__(function* () {
      yield 1;
      yield 2;
    }, this, arguments, 'examples/example1.js,generator');
  }
};
$hook$.global(__hook__, 'examples/example1.js,f', 'f', 'function')._p_f = function f(a, b, c) {
  return __hook__((a, b, c) => {
    return a + b + c;
  }, null, arguments, 'examples/example1.js,f');
};
$hook$.global(__hook__, 'examples/example1.js,afunc', 'afunc', 'function')._p_afunc = async function afunc(a, b, c) {
  return __hook__(async (a, b, c) => {
    return a + b + c;
  }, null, arguments, 'examples/example1.js,afunc');
};
$hook$.global(__hook__, 'examples/example1.js,gfunc', 'gfunc', 'function')._p_gfunc = function* gfunc(a, b, c) {
  yield* __hook__(function* (a, b, c) {
    // comment for gfunc
    yield* [
      a,
      b,
      c
    ];
  }, this, arguments, 'examples/example1.js,gfunc');
};
$hook$.global(__hook__, 'examples/example1.js,destructuring', 'destructuring', 'function')._p_destructuring = function destructuring(...args) {
  return __hook__(([x, , [y = 2], z = 3], [a, b = 5, c = 6]) => {
    return x + y + z + a + b + c;
  }, null, args, 'examples/example1.js,destructuring');
};
$hook$.global(__hook__, 'examples/example1.js,d', 'd', 'function')._p_d = function d() {
  return __hook__(() => {
    return __hook__(function descructuringWithObjects({
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
      }, null, arguments, 'examples/example1.js,d,descructuringWithObjects');
    }, null, [
      {
        b: 2,
        c: $hook$.global(__hook__, 'examples/example1.js,d,c', 'undefined', 'get')._p_undefined,
        x: 4,
        y: 5
      },
      [
        ,
        7,
        $hook$.global(__hook__, 'examples/example1.js,d', 'undefined', 'get')._p_undefined
      ]
    ], 'examples/example1.js,d', 0);
  }, null, arguments, 'examples/example1.js,d');
};