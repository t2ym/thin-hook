const __context_mapper__ = $hook$.$(__hook__, [
  'examples/example1.js,A1',
  '_p_A1;examples/example1.js,A1',
  'examples/example1.js,A1,constructor',
  'examples/example1.js,A1,method',
  'examples/example1.js,A1,method2',
  'examples/example1.js,X1',
  '_p_X1;examples/example1.js,X1',
  '_p_A1;examples/example1.js,X1',
  'examples/example1.js,X1,constructor',
  'examples/example1.js,X1,a',
  'examples/example1.js,X1,a,x',
  'examples/example1.js,X1,a,y',
  'examples/example1.js,X1,a,z',
  'examples/example1.js,X1,a,u',
  'examples/example1.js,X1,get b',
  'examples/example1.js,X1,method',
  'examples/example1.js,X1,amethod',
  'examples/example1.js,X1,amethod,afunc',
  'examples/example1.js,X1,gmethod',
  'examples/example1.js,X1,static smethod',
  'examples/example1.js,Y1',
  '_p_Y1;examples/example1.js,Y1',
  '_p_X1;examples/example1.js,Y1',
  'examples/example1.js,Y1,constructor',
  'examples/example1.js',
  '_p_o;examples/example1.js',
  'examples/example1.js,generator',
  'examples/example1.js,f',
  '_p_f;examples/example1.js,f',
  'examples/example1.js,afunc',
  '_p_afunc;examples/example1.js,afunc',
  'examples/example1.js,gfunc',
  '_p_gfunc;examples/example1.js,gfunc',
  'examples/example1.js,destructuring',
  '_p_destructuring;examples/example1.js,destructuring',
  'examples/example1.js,d',
  '_p_d;examples/example1.js,d',
  'examples/example1.js,d,descructuringWithObjects',
  'examples/example1.js,d,c',
  '_p_undefined;examples/example1.js,d,c',
  '_p_undefined;examples/example1.js,d'
]);
$hook$.global(__hook__, __context_mapper__[0], 'A1', 'class')[__context_mapper__[1]] = class A1 {
  constructor(x, y, z) {
    return __hook__((x, y = 3, z = 5) => {
      __hook__('#=', this, [
        'x',
        x
      ], __context_mapper__[2]);
      __hook__('#=', this, [
        'y',
        y
      ], __context_mapper__[2]);
      __hook__('#=', this, [
        'z',
        z
      ], __context_mapper__[2]);
    }, null, arguments, __context_mapper__[2]);
  }
  method(a, b, c) {
    return __hook__((a, b = 4, c = 9) => {
      return a + b + c;
    }, null, arguments, __context_mapper__[3]);
  }
  method2(a, b, c) {
    return __hook__((a = 1, b = 3, c = 7) => {
      return a + b + c + 1;
    }, null, arguments, __context_mapper__[4]);
  }
};
$hook$.global(__hook__, __context_mapper__[5], 'X1', 'class')[__context_mapper__[6]] = class X1 extends $hook$.global(__hook__, __context_mapper__[5], 'A1', 'get')[__context_mapper__[7]] {
  constructor(x, y, z) {
    return __hook__((x, y, z = 9) => {
      __hook__((newTarget, ...args) => super(...args), null, [
        new.target,
        x,
        y,
        z
      ], __context_mapper__[8], '');
      __hook__('#=', this, [
        'xyz',
        {
          x: x,
          y: y,
          z: z
        }
      ], __context_mapper__[8]);
    }, null, arguments, __context_mapper__[8]);
  }
  a(p, nn) {
    return __hook__((p = 1, nn = 3) => {
      let x = (...args) => __hook__(n => __hook__('#.', this, ['b'], __context_mapper__[10]) + n, null, args, __context_mapper__[10]);
      let y = (...args) =>
        (__hook__(n => {
          return __hook__('#.', this, ['b'], __context_mapper__[11]) + n;
        }, null, args, __context_mapper__[11]));
      let z = (...args) => __hook__((p, n) => ({
        p: p * 2,
        n: n * 3
      }), null, args, __context_mapper__[12]);
      let u = (...args) => __hook__((p, n) => [
        p * 2,
        n * 3
      ], null, args, __context_mapper__[13]);
      return __hook__(x, null, [nn], __context_mapper__[9], 0) + __hook__(y, null, [p], __context_mapper__[9], 0) + __hook__('#.', __hook__(z, null, [
        p,
        nn
      ], __context_mapper__[9], 0), ['p'], __context_mapper__[9]) + __hook__('#.', __hook__(u, null, [
        p,
        nn
      ], __context_mapper__[9], 0), [1], __context_mapper__[9]);
    }, null, arguments, __context_mapper__[9]);
  }
  get b() {
    return __hook__(() => {
      return 1;
    }, null, arguments, __context_mapper__[14]);
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
      ], __context_mapper__[15]) + 1;
    }, null, arguments, __context_mapper__[15]);
  }
  async amethod(a, b, c) {
    return __hook__(async (a, b = a + 3, c = b + 3) => {
      let afunc = async (...args) => __hook__(async (x, y, z) => x * y * z, null, args, __context_mapper__[17]);
      return await __hook__(afunc, null, [
        a,
        b,
        c
      ], __context_mapper__[16], 0);
    }, null, arguments, __context_mapper__[16]);
  }
  *gmethod(a, b, c) {
    yield* __hook__(function* (a, b = a * 5, c = a * b * 4) {
      yield a;
      yield b;
      yield c;
    }, this, arguments, __context_mapper__[18]);
  }
  static smethod(a, b, c) {
    return __hook__((a = 2, b = a * 2, c = b * 3) => {
      return a + b + c;
    }, null, arguments, __context_mapper__[19]);
  }
};
$hook$.global(__hook__, __context_mapper__[20], 'Y1', 'class')[__context_mapper__[21]] = class Y1 extends $hook$.global(__hook__, __context_mapper__[20], 'X1', 'get')[__context_mapper__[22]] {
  constructor(x, y, z) {
    return __hook__((x = 3, y = x * 3, z = x * y * 5) => {
      __hook__((newTarget, ...args) => super(...args), null, [
        new.target,
        x,
        y,
        z
      ], __context_mapper__[23], '');
      __hook__('#=', this, [
        'XYZ',
        {
          x: x,
          y: y,
          z: z
        }
      ], __context_mapper__[23]);
    }, null, arguments, __context_mapper__[23]);
  }
};
$hook$.global(__hook__, __context_mapper__[24], 'o', 'let')[__context_mapper__[25]] = {
  *generator() {
    yield* __hook__(function* () {
      yield 1;
      yield 2;
    }, this, arguments, __context_mapper__[26]);
  }
};
$hook$.global(__hook__, __context_mapper__[27], 'f', 'function')[__context_mapper__[28]] = function f(a, b, c) {
  return __hook__((a, b, c) => {
    return a + b + c;
  }, null, arguments, __context_mapper__[27]);
};
$hook$.global(__hook__, __context_mapper__[29], 'afunc', 'function')[__context_mapper__[30]] = async function afunc(a, b, c) {
  return __hook__(async (a, b, c) => {
    return a + b + c;
  }, null, arguments, __context_mapper__[29]);
};
$hook$.global(__hook__, __context_mapper__[31], 'gfunc', 'function')[__context_mapper__[32]] = function* gfunc(a, b, c) {
  yield* __hook__(function* (a, b, c) {
    // comment for gfunc
    yield* [
      a,
      b,
      c
    ];
  }, this, arguments, __context_mapper__[31]);
};
$hook$.global(__hook__, __context_mapper__[33], 'destructuring', 'function')[__context_mapper__[34]] = function destructuring(...args) {
  return __hook__(([x, , [y = 2], z = 3], [a, b = 5, c = 6]) => {
    return x + y + z + a + b + c;
  }, null, args, __context_mapper__[33]);
};
$hook$.global(__hook__, __context_mapper__[35], 'd', 'function')[__context_mapper__[36]] = function d() {
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
      }, null, arguments, __context_mapper__[37]);
    }, null, [
      {
        b: 2,
        c: $hook$.global(__hook__, __context_mapper__[38], 'undefined', 'get')[__context_mapper__[39]],
        x: 4,
        y: 5
      },
      [
        ,
        7,
        $hook$.global(__hook__, __context_mapper__[35], 'undefined', 'get')[__context_mapper__[40]]
      ]
    ], __context_mapper__[35], 0);
  }, null, arguments, __context_mapper__[35]);
};