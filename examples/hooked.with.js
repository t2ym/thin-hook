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
  'examples/with.js,v5',
  'examples/with.js,g',
  'examples/with.js,v6',
  'examples/with.js,v7',
  'examples/with.js,C',
  'examples/with.js,C,method',
  'examples/with.js,CC,CC',
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
  'examples/with.js,x',
  'examples/with.js,A',
  'examples/with.js,p'
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
    with ($hook$.with(__hook__('w.', __with__, [
        'b',
        () => b
      ], __context_mapper__[0], false), {
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
      let v5 = __hook__('w.', __with__, [
        'u',
        () => u
      ], __context_mapper__[11], false);
      let g = __hook__('w.', __with__, [
        'gVar1',
        () => gVar1
      ], __context_mapper__[12], false);
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
      __hook__('w.', __with__, [
        'g',
        () => g
      ], __context_mapper__[0], false);
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
      __hook__('w.', __with__, [
        'f1',
        () => f1
      ], __context_mapper__[0], false)`value is ${ __hook__('w.', __with__, [
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
          __hook__('w.', __with__, [
            'v1',
            () => v1
          ], __context_mapper__[0], false),
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
          __hook__('w.', __with__, [
            'v2',
            () => v2
          ], __context_mapper__[0], false),
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
          __hook__('w.', __with__, [
            'v3',
            () => v3
          ], __context_mapper__[0], false),
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
          __hook__('w.', __with__, [
            'v5',
            () => v5
          ], __context_mapper__[0], false),
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
          __hook__('w.', __with__, [
            'v4',
            () => v4
          ], __context_mapper__[0], false),
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
        ], __context_mapper__[13], false);
        let v7 = __hook__('w.', __with__, [
          'u',
          () => u
        ], __context_mapper__[14], false);
        __hook__('()', __hook__('.', __hook__('w.', __with__, [
          'chai',
          () => chai
        ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
          'equal',
          [
            __hook__('w.', __with__, [
              'v6',
              () => v6
            ], __context_mapper__[0], false),
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
            __hook__('w.', __with__, [
              'v7',
              () => v7
            ], __context_mapper__[0], false),
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
      __hook__('wdelete', __with__, [
        'u',
        () => delete u
      ], __context_mapper__[0], false);
      __hook__('delete', __hook__('w.', __with__, [
        'u',
        () => u
      ], __context_mapper__[0], false), ['prop'], __context_mapper__[0]);
      let method = 'method';
      class B {
      }
      class C extends __hook__('w.', __with__, [
        'B',
        () => B
      ], __context_mapper__[15], false) {
        ['method']() {
          return __hook__(() => {
          }, null, arguments, __context_mapper__[16]);
        }
      }
      let CC = class CC extends __hook__('w.', __with__, [
        'B',
        () => B
      ], __context_mapper__[17], false) {
        [__hook__('w.', __with__, [
          'method',
          () => method
        ], __context_mapper__[18], false)]() {
          return __hook__(() => {
          }, null, arguments, __context_mapper__[18]);
        }
      };
      function f1(aa, bb) {
        return __hook__((aa = __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[19], false), bb = __hook__('.', __hook__('w.', __with__, [
          'u',
          () => u
        ], __context_mapper__[19], false), ['prop'], __context_mapper__[19])) => {
          return __hook__('w.', __with__, [
            'aa',
            () => aa
          ], __context_mapper__[19], false);
        }, null, arguments, __context_mapper__[19]);
      }
      __hook__('wnew', __with__, [
        'CC',
        [__hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[0], false)],
        (...args) => new CC(...args)
      ], __context_mapper__[0], false);
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
          __hook__('*', arg, [], __context_mapper__[20]);
        return __hook__(([xx = __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[20], false)]) => {
          return __hook__('w.', __with__, [
            'aa',
            () => aa
          ], __context_mapper__[20], false);
        }, null, args, __context_mapper__[20]);
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
        ], __context_mapper__[21], false)]: __hook__('w.', __with__, [
          'x',
          () => x
        ], __context_mapper__[21], false),
        nonComputed: __hook__('w.', __with__, [
          'y',
          () => y
        ], __context_mapper__[22], false)
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
          ], __context_mapper__[23], false);
        }, null, arguments, __context_mapper__[23]);
      }
      function* gen(x) {
        yield* __hook__(function* (x) {
          yield __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[24], false);
          yield* [
            __hook__('w.', __with__, [
              'x',
              () => x
            ], __context_mapper__[24], false),
            __hook__('w.', __with__, [
              'y',
              () => y
            ], __context_mapper__[24], false)
          ];
        }, this, arguments, __context_mapper__[24]);
      }
    }
    __hook__('()', __hook__('.', __hook__('w.', __with__, [
      'chai',
      () => chai
    ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
      'equal',
      [
        __hook__('.', __hook__('w.', __with__, [
          'b',
          () => b
        ], __context_mapper__[0], false), ['y'], __context_mapper__[0]),
        6,
        'b.y is 6'
      ]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', $hook$.global(__hook__, __context_mapper__[0], 'chai', 'get')[__context_mapper__[25]], ['assert'], __context_mapper__[0]), [
    'equal',
    [
      __hook__('.', a, ['foo'], __context_mapper__[0]),
      3,
      'a.foo is 3'
    ]
  ], __context_mapper__[0]);
}
$hook$.global(__hook__, __context_mapper__[0], 'gA1', 'let')[__context_mapper__[26]] = [
  1,
  2
];
$hook$.global(__hook__, __context_mapper__[0], 'gX1', 'let')[__context_mapper__[27]] = {
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
    ], __context_mapper__[28], false)
  ];
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'a2',
        () => a2
      ], __context_mapper__[0], false),
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
    ], __context_mapper__[29], false), [], __context_mapper__[29])
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'y',
        () => y
      ], __context_mapper__[0], false),
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
          return __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[30], false);
        }, null, arguments, __context_mapper__[30]);
      }(), [], __context_mapper__[30])
    }, [], __context_mapper__[30])
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'z',
        () => z
      ], __context_mapper__[0], false),
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
      __hook__('in', __hook__('w.', __with__, [
        'z',
        () => z
      ], __context_mapper__[0], false), ['a'], __context_mapper__[0]),
      'a in z'
    ]
  ], __context_mapper__[0]);
  let p;
  let l1 = [];
  for (__hook__('w.=', __with__, [
      'p',
      {
        set ['='](v) {
          p = v;
        },
        get ['=']() {
          return p;
        }
      }
    ], __context_mapper__[0], false)['='] in __hook__('*', __hook__('w.', __with__, [
      'z',
      () => z
    ], __context_mapper__[0], false), [], __context_mapper__[0])) {
    __hook__('()', __hook__('w.', __with__, [
      'l1',
      () => l1
    ], __context_mapper__[0], false), [
      'push',
      [__hook__('w.', __with__, [
          'p',
          () => p
        ], __context_mapper__[0], false)]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('()', __hook__('w.', __with__, [
        'l1',
        () => l1
      ], __context_mapper__[0], false), [
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
  for (__hook__('w.=', __with__, [
      'p',
      {
        set ['='](v) {
          p = v;
        },
        get ['=']() {
          return p;
        }
      }
    ], __context_mapper__[0], false)['='] of __hook__('*', __hook__('w.', __with__, [
      'a2',
      () => a2
    ], __context_mapper__[0], false), [], __context_mapper__[0])) {
    __hook__('()', __hook__('w.', __with__, [
      'l2',
      () => l2
    ], __context_mapper__[0], false), [
      'push',
      [__hook__('w.', __with__, [
          'p',
          () => p
        ], __context_mapper__[0], false)]
    ], __context_mapper__[0]);
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], __context_mapper__[0], false), ['assert'], __context_mapper__[0]), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'l2',
        () => l2
      ], __context_mapper__[0], false),
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
    ], __context_mapper__[31], false)['='],
    ...(__hook__('w.=', __with__, [
      'y',
      {
        set ['='](v) {
          y = v;
        },
        get ['=']() {
          return y;
        }
      }
    ], __context_mapper__[0], false))['=']
  } = __hook__('*', {
    x: __hook__('w.', __with__, [
      'x',
      () => x
    ], __context_mapper__[31], false),
    ...__hook__('*', __hook__('w.', __with__, [
      'y',
      () => y
    ], __context_mapper__[0], false), [], __context_mapper__[0])
  }, [], __context_mapper__[0]));
  let {
    A,
    ...B
  } = __hook__('*', {
    A: __hook__('w.', __with__, [
      'y',
      () => y
    ], __context_mapper__[32], false),
    p: __hook__('w.', __with__, [
      'a2',
      () => a2
    ], __context_mapper__[33], false),
    ...__hook__('*', __hook__('w.', __with__, [
      'y',
      () => y
    ], __context_mapper__[0], false), [], __context_mapper__[0])
  }, [], __context_mapper__[0]);
  let [p1, p2 = __hook__('w.', __with__, [
      'y',
      () => y
    ], __context_mapper__[0], false), ...p3] = __hook__('*', [
    2,
    ,
    5,
    __hook__('.', __hook__('w.', __with__, [
      'z',
      () => z
    ], __context_mapper__[0], false), ['a'], __context_mapper__[0]),
    ...__hook__('w.', __with__, [
      'a2',
      () => a2
    ], __context_mapper__[0], false)
  ], [], __context_mapper__[0]);
}