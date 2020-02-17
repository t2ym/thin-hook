const __context_mapper__ = $hook$.$(__hook__, [
  'examples/with.js',
  '_p_gVar1;examples/with.js',
  'examples/with.js,gg',
  '_p_gVar1;examples/with.js,gg',
  'examples/with.js,a',
  '_p_Symbol;examples/with.js,a',
  'examples/with.js,b',
  'examples/with.js,v1',
  'examples/with.js,v2',
  'examples/with.js,v3',
  'examples/with.js,v4',
  'examples/with.js,g',
  'examples/with.js,v6',
  'examples/with.js,v7',
  'examples/with.js,C,method',
  'examples/with.js,CC,CC,method',
  'examples/with.js,f1',
  'examples/with.js,f2',
  'examples/with.js,o,comp',
  'examples/with.js,o,nonComputed',
  'examples/with.js,afunc',
  'examples/with.js,gen',
  '_p_chai;examples/with.js',
  '_p_gA1;examples/with.js',
  '_p_gX1;examples/with.js',
  'examples/with.js,a2',
  'examples/with.js,y',
  'examples/with.js,z',
  'examples/with.js,x'
]);
{
  $hook$.global(__hook__, __context_mapper__[0], 'gVar1', 'var')[__context_mapper__[1]] = 1;
  let gg = $hook$.global(__hook__, __context_mapper__[2], 'gVar1', 'get')[__context_mapper__[3]];
  let a = {
    foo: 1,
    bar: 2,
    [__hook__('.', $hook$.global(__hook__, __context_mapper__[4], 'Symbol', 'get')[__context_mapper__[5]], ['unscopables'], __context_mapper__[4])]: { bar: true }
  };
  with ($hook$.with(a, {
      gg: true,
      a: true
    })) {
    let x = 3;
    let y = 9;
    let z;
    let b = {
      y: 4,
      z: 5,
      u: 7,
      [__hook__('.', __hook__('w.', __with__, [
        'Symbol',
        () => Symbol
      ], __context_mapper__[6], false), ['unscopables'], __context_mapper__[6])]: { z: true }
    };
    with ($hook$.with(b, {
        x: true,
        y: true,
        z: true,
        b: true
      }, ...__with__)) {
      let v1 = __hook__('w.', __with__, [
        'foo',
        () => foo
      ], __context_mapper__[7], false);
      let v2 = __hook__('wtypeof', __with__, [
        'bar',
        () => typeof bar
      ], __context_mapper__[8], false);
      let v3 = __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[9], false);
      let v4 = __hook__('wtypeof', __with__, [
        'z',
        () => typeof z
      ], __context_mapper__[10], false);
      let u = 11;
      let v5 = u;
      let g = __hook__('w.', __with__, [
        'gVar1',
        () => gVar1
      ], __context_mapper__[11], false);
      __hook__('w=', __with__, [
        'foo',
        3,
        v => foo = v
      ], __context_mapper__[0], false);
      __hook__('w=', __with__, [
        'y',
        5,
        v => y = v
      ], __context_mapper__[0], false);
      g;
      __hook__('w++', __with__, [
        'y',
        () => y++
      ], __context_mapper__[0], false);
      __hook__('p++', __hook__('w.', __with__, [
        'a',
        () => a
      ], __context_mapper__[0], false), ['bar'], __context_mapper__[0]);
      __hook__('.', __hook__('w.', __with__, [
        'b',
        () => b
      ], __context_mapper__[0], false), ['z'], __context_mapper__[0]);
      __hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false) + __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false);
      __hook__('in', __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false), [__hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false)], __context_mapper__[0]);
      __hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false) && __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false);
      __hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false) ? __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false) : __hook__('w.', __with__, [
        'z',
        () => z
      ], __context_mapper__[0], false);
      if (__hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false)) {
      }
      while (__hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false)) {
      }
      do {
      } while (__hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false));
      for (__hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false); __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false); __hook__('w.', __with__, [
          'z',
          () => z
        ], __context_mapper__[0], false)) {
      }
      for (__hook__('w.=', __with__, [
          'x',
          {
            set ['='](v) {
              x = v;
            },
            get ['=']() {
              return x;
            }
          }
        ], __context_mapper__[0], false)['='] in __hook__('*', __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false), [], __context_mapper__[0])) {
      }
      for (__hook__('w.=', __with__, [
          'x',
          {
            set ['='](v) {
              x = v;
            },
            get ['=']() {
              return x;
            }
          }
        ], __context_mapper__[0], false)['='] of __hook__('*', __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false), [], __context_mapper__[0])) {
      }
      switch (__hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false)) {
      case __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false):
        break;
      }
      f1`value is ${ __hook__('w.', __with__, [
        'foo',
        () => foo
      ], __context_mapper__[0], false) }`;
      __hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false), __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false), __hook__('w.', __with__, [
        'z',
        () => z
      ], __context_mapper__[0], false);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
        'equal',
        [
          v1,
          1,
          'foo is 1'
        ]
      ], __context_mapper__[0]);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
        'equal',
        [
          v2,
          'undefined',
          'typeof bar is undefined'
        ]
      ], __context_mapper__[0]);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
        'equal',
        [
          v3,
          4,
          'y is 4'
        ]
      ], __context_mapper__[0]);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
        'equal',
        [
          v5,
          11,
          'u is 11'
        ]
      ], __context_mapper__[0]);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
        'equal',
        [
          v4,
          'undefined',
          'typeof z is undefined'
        ]
      ], __context_mapper__[0]);
      with ($hook$.with({
          z: 1,
          u: 2,
          [__hook__('.', __hook__('w.', __with__, [
            'Symbol',
            () => Symbol
          ], __context_mapper__[0], false), ['unscopables'], __context_mapper__[0])]: { u: true }
        }, {
          v1: true,
          v2: true,
          v3: true,
          v4: true,
          u: true,
          v5: true,
          g: true,
          method: true,
          B: true,
          C: true,
          CC: true,
          f1: true,
          f2: true,
          o: true,
          afunc: true,
          gen: true
        }, ...__with__)) {
        let v6 = __hook__('w.', __with__, [
          'z',
          () => z
        ], __context_mapper__[12], false);
        let v7 = __hook__('w.', __with__, [
          'u',
          () => u
        ], __context_mapper__[13], false);
        __hook__('()', __hook__('.', __hook__('w.', __with__, [
          'chai',
          () => chai
        ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
          'equal',
          [
            v6,
            1,
            'z is 1'
          ]
        ], __context_mapper__[0]);
        __hook__('()', __hook__('.', __hook__('w.', __with__, [
          'chai',
          () => chai
        ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
          'equal',
          [
            v7,
            11,
            'u is 11'
          ]
        ], __context_mapper__[0]);
        __hook__('w=', __with__, [
          'x',
          __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[0], false),
          v => x = v
        ], __context_mapper__[0], false);
      }
      delete u;
      __hook__('delete', u, ['prop'], __context_mapper__[0]);
      let method = 'method';
      class B {
      }
      class C extends B {
        ['method']() {
          return __hook__(() => {
          }, null, arguments, __context_mapper__[14]);
        }
      }
      let CC = class CC extends B {
        [method]() {
          return __hook__(() => {
          }, null, arguments, __context_mapper__[15]);
        }
      };
      function f1(aa, bb) {
        return __hook__((aa = __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[16], false), bb = __hook__('.', u, ['prop'], __context_mapper__[16])) => {
          return aa;
        }, null, arguments, __context_mapper__[16]);
      }
      new CC(y);
      __hook__('w()', __with__, [
        'x',
        [__hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[0], false)],
        (...args) => x(...args)
      ], __context_mapper__[0], false);
      __hook__('()', __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false), [
        'z',
        [__hook__('w.', __with__, [
            'x',
            () => x
          ], __context_mapper__[0], false)]
      ], __context_mapper__[0]);
      function f2(...args) {
        for (let arg of arguments)
          __hook__('*', arg, [], __context_mapper__[17]);
        return __hook__(([xx = __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[17], false)]) => {
          return __hook__('w.', __with__, [
            'aa',
            () => aa
          ], __context_mapper__[17], false);
        }, null, args, __context_mapper__[17]);
      }
      [__hook__('w.=', __with__, [
          'x',
          {
            set ['='](v) {
              x = v;
            },
            get ['=']() {
              return x;
            }
          }
        ], __context_mapper__[0], false)['='], __hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], __context_mapper__[0], false)['=']] = __hook__('*', [
        __hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false),
        __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false)
      ], [], __context_mapper__[0]);
      [__hook__('w.=', __with__, [
          'x',
          {
            set ['='](v) {
              x = v;
            },
            get ['=']() {
              return x;
            }
          }
        ], __context_mapper__[0], false)['='], ...(__hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], __context_mapper__[0], false))['=']] = __hook__('*', [
        __hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[0], false),
        ...__hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[0], false)
      ], [], __context_mapper__[0]);
      let o = {
        [__hook__('w.', __with__, [
          'comp',
          () => comp
        ], __context_mapper__[18], false)]: __hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[18], false),
        nonComputed: __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[19], false)
      };
      throw __hook__('w.', __with__, [
        'x',
        () => x
      ], __context_mapper__[0], false);
      async function afunc(x) {
        return __hook__(async x => {
          await __hook__('w()', __with__, [
            'foo',
            [],
            (...args) => foo(...args)
          ], __context_mapper__[20], false);
        }, null, arguments, __context_mapper__[20]);
      }
      function* gen(x) {
        yield* __hook__(function* (x) {
          yield __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[21], false);
          yield* [
            x,
            __hook__('w.', __with__, [
              'y',
              () => y
            ], __context_mapper__[21], false)
          ];
        }, this, arguments, __context_mapper__[21]);
      }
    }
    __hook__('()', __hook__('.', __hook__('w.', __with__, [
      'chai',
      () => chai
    ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
      'equal',
      [
        __hook__('.', b, ['y'], __context_mapper__[0]),
        6,
        'b.y is 6'
      ]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', $hook$.global(__hook__, __context_mapper__[0], 'chai', 'get')[__context_mapper__[22]], ['assert'], __context_mapper__[0]), [
    'equal',
    [
      __hook__('.', a, ['foo'], __context_mapper__[0]),
      3,
      'a.foo is 3'
    ]
  ], __context_mapper__[0]);
}
$hook$.global(__hook__, __context_mapper__[0], 'gA1', 'let')[__context_mapper__[23]] = [
  1,
  2
];
$hook$.global(__hook__, __context_mapper__[0], 'gX1', 'let')[__context_mapper__[24]] = {
  a: 1,
  b: 2
};
with ($hook$.with({
    gA1: [
      5,
      6
    ],
    gX1: {
      a: 4,
      b: 5
    }
  }, {})) {
  let a2 = [
    3,
    4,
    ...__hook__('w.', __with__, [
      'gA1',
      () => gA1
    ], __context_mapper__[25], false)
  ];
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      a2,
      [
        3,
        4,
        5,
        6
      ],
      'a2 is [ 3,4,5,6 ]'
    ]
  ], __context_mapper__[0]);
  let y = {
    c: 3,
    ...__hook__('*', __hook__('w.', __with__, [
      'gX1',
      () => gX1
    ], __context_mapper__[26], false), [], __context_mapper__[26])
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      y,
      {
        c: 3,
        a: 4,
        b: 5
      },
      'y is { c: 3, a: 4, b: 5 }'
    ]
  ], __context_mapper__[0]);
  let z = {
    a: 1,
    ...__hook__('*', {
      a: 1,
      b: 2,
      ...__hook__('*', function () {
        return __hook__(() => {
          return y;
        }, null, arguments, __context_mapper__[27]);
      }(), [], __context_mapper__[27])
    }, [], __context_mapper__[27])
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      z,
      {
        c: 3,
        a: 4,
        b: 5
      },
      'z is { c: 3, a: 4, b: 5 }'
    ]
  ], __context_mapper__[0]);
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'isOk',
    [
      __hook__('in', z, ['a'], __context_mapper__[0]),
      'a in z'
    ]
  ], __context_mapper__[0]);
  let p;
  let l1 = [];
  for (p in __hook__('*', z, [], __context_mapper__[0])) {
    __hook__('()', l1, [
      'push',
      [p]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('()', l1, [
        'sort',
        []
      ], __context_mapper__[0]),
      [
        'a',
        'b',
        'c'
      ],
      'z has a, b, c'
    ]
  ], __context_mapper__[0]);
  let l2 = [];
  for (p of __hook__('*', a2, [], __context_mapper__[0])) {
    __hook__('()', l2, [
      'push',
      [p]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      l2,
      [
        3,
        4,
        5,
        6
      ],
      'a2 lists [3,4,5,6]'
    ]
  ], __context_mapper__[0]);
  ({
    x: __hook__('w.=', __with__, [
      'x',
      {
        set ['='](v) {
          x = v;
        },
        get ['=']() {
          return x;
        }
      }
    ], __context_mapper__[28], false)['='],
    ...y
  } = __hook__('*', {
    x: __hook__('w.', __with__, [
      'x',
      () => x
    ], __context_mapper__[28], false),
    ...__hook__('*', y, [], __context_mapper__[0])
  }, [], __context_mapper__[0]));
  let {
    A,
    ...B
  } = __hook__('*', {
    A: y,
    p: a2,
    ...__hook__('*', y, [], __context_mapper__[0])
  }, [], __context_mapper__[0]);
  let [p1, p2 = y, ...p3] = __hook__('*', [
    2,
    ,
    5,
    __hook__('.', z, ['a'], __context_mapper__[0]),
    ...a2
  ], [], __context_mapper__[0]);
}