{
  $hook$.global(__hook__, 'examples/with.js', 'gVar1', 'var')._p_gVar1 = 1;
  let gg = $hook$.global(__hook__, 'examples/with.js,gg', 'gVar1', 'get')._p_gVar1;
  let a = {
    foo: 1,
    bar: 2,
    [__hook__('.', Symbol, ['unscopables'], 'examples/with.js,a')]: { bar: true }
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
      ], 'examples/with.js,b', false), ['unscopables'], 'examples/with.js,b')]: { z: true }
    };
    with ($hook$.with(__hook__('w.', __with__, [
        'b',
        () => b
      ], 'examples/with.js', false), {
        x: true,
        y: true,
        z: true,
        b: true
      }, ...__with__)) {
      let v1 = __hook__('w.', __with__, [
        'foo',
        () => foo
      ], 'examples/with.js,v1', false);
      let v2 = __hook__('wtypeof', __with__, [
        'bar',
        () => typeof bar
      ], 'examples/with.js,v2', false);
      let v3 = __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js,v3', false);
      let v4 = __hook__('wtypeof', __with__, [
        'z',
        () => typeof z
      ], 'examples/with.js,v4', false);
      let u = 11;
      let v5 = __hook__('w.', __with__, [
        'u',
        () => u
      ], 'examples/with.js,v5', false);
      let g = __hook__('w.', __with__, [
        'gVar1',
        () => gVar1
      ], 'examples/with.js,g', false);
      __hook__('w=', __with__, [
        'foo',
        3,
        v => foo = v
      ], 'examples/with.js', false);
      __hook__('w=', __with__, [
        'y',
        5,
        v => y = v
      ], 'examples/with.js', false);
      __hook__('w.', __with__, [
        'g',
        () => g
      ], 'examples/with.js', false);
      __hook__('w++', __with__, [
        'y',
        () => y++
      ], 'examples/with.js', false);
      __hook__('p++', __hook__('w.', __with__, [
        'a',
        () => a
      ], 'examples/with.js', false), ['bar'], 'examples/with.js');
      __hook__('.', __hook__('w.', __with__, [
        'b',
        () => b
      ], 'examples/with.js', false), ['z'], 'examples/with.js');
      __hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false) + __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false);
      __hook__('in', __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false), [__hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false)], 'examples/with.js');
      __hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false) && __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false);
      __hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false) ? __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false) : __hook__('w.', __with__, [
        'z',
        () => z
      ], 'examples/with.js', false);
      if (__hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false)) {
      }
      while (__hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false)) {
      }
      do {
      } while (__hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false));
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
        ], 'examples/with.js', false)['=']; __hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js', false); __hook__('w.', __with__, [
          'z',
          () => z
        ], 'examples/with.js', false)) {
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
        ], 'examples/with.js', false)['='] in __hook__('*', __hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], 'examples/with.js', false)['='], [], 'examples/with.js')) {
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
        ], 'examples/with.js', false)['='] of __hook__('*', __hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], 'examples/with.js', false)['='], [], 'examples/with.js')) {
      }
      switch (__hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false)) {
      case __hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js', false):
        break;
      }
      __hook__('w.', __with__, [
        'f1',
        () => f1
      ], 'examples/with.js', false)`value is ${ __hook__('w.', __with__, [
        'foo',
        () => foo
      ], 'examples/with.js', false) }`;
      __hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false), __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false), __hook__('w.', __with__, [
        'z',
        () => z
      ], 'examples/with.js', false);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
        'equal',
        [
          __hook__('w.', __with__, [
            'v1',
            () => v1
          ], 'examples/with.js', false),
          1,
          'foo is 1'
        ]
      ], 'examples/with.js');
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
        'equal',
        [
          __hook__('w.', __with__, [
            'v2',
            () => v2
          ], 'examples/with.js', false),
          'undefined',
          'typeof bar is undefined'
        ]
      ], 'examples/with.js');
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
        'equal',
        [
          __hook__('w.', __with__, [
            'v3',
            () => v3
          ], 'examples/with.js', false),
          4,
          'y is 4'
        ]
      ], 'examples/with.js');
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
        'equal',
        [
          __hook__('w.', __with__, [
            'v5',
            () => v5
          ], 'examples/with.js', false),
          11,
          'u is 11'
        ]
      ], 'examples/with.js');
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
        'equal',
        [
          __hook__('w.', __with__, [
            'v4',
            () => v4
          ], 'examples/with.js', false),
          'undefined',
          'typeof z is undefined'
        ]
      ], 'examples/with.js');
      with ($hook$.with({
          z: 1,
          u: 2,
          [__hook__('.', __hook__('w.', __with__, [
            'Symbol',
            () => Symbol
          ], 'examples/with.js', false), ['unscopables'], 'examples/with.js')]: { u: true }
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
        ], 'examples/with.js,v6', false);
        let v7 = __hook__('w.', __with__, [
          'u',
          () => u
        ], 'examples/with.js,v7', false);
        __hook__('()', __hook__('.', __hook__('w.', __with__, [
          'chai',
          () => chai
        ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
          'equal',
          [
            __hook__('w.', __with__, [
              'v6',
              () => v6
            ], 'examples/with.js', false),
            1,
            'z is 1'
          ]
        ], 'examples/with.js');
        __hook__('()', __hook__('.', __hook__('w.', __with__, [
          'chai',
          () => chai
        ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
          'equal',
          [
            __hook__('w.', __with__, [
              'v7',
              () => v7
            ], 'examples/with.js', false),
            11,
            'u is 11'
          ]
        ], 'examples/with.js');
        __hook__('w=', __with__, [
          'x',
          __hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/with.js', false),
          v => x = v
        ], 'examples/with.js', false);
      }
      __hook__('wdelete', __with__, [
        'u',
        () => delete u
      ], 'examples/with.js', false);
      __hook__('delete', __hook__('w.', __with__, [
        'u',
        () => u
      ], 'examples/with.js', false), ['prop'], 'examples/with.js');
      let method = 'method';
      class B {
      }
      class C extends __hook__('w.', __with__, [
        'B',
        () => B
      ], 'examples/with.js,C', false) {
        [__hook__('w.', __with__, [
          'method',
          () => method
        ], 'examples/with.js,C,method', false)]() {
          return __hook__(() => {
          }, null, arguments, 'examples/with.js,C');
        }
      }
      let CC = class CC extends __hook__('w.', __with__, [
        'B',
        () => B
      ], 'examples/with.js,CC,CC', false) {
        [__hook__('w.', __with__, [
          'method',
          () => method
        ], 'examples/with.js,CC,CC,method', false)]() {
          return __hook__(() => {
          }, null, arguments, 'examples/with.js,CC,CC');
        }
      };
      function f1(aa, bb) {
        return __hook__((aa = __hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js,f1', false), bb = __hook__('.', __hook__('w.', __with__, [
          'u',
          () => u
        ], 'examples/with.js,f1', false), ['prop'], 'examples/with.js,f1')) => {
          return __hook__('w.', __with__, [
            'aa',
            () => aa
          ], 'examples/with.js,f1', false);
        }, null, arguments, 'examples/with.js,f1');
      }
      __hook__('wnew', __with__, [
        'CC',
        [__hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/with.js', false)],
        (...args) => new CC(...args)
      ], 'examples/with.js', false);
      __hook__('w()', __with__, [
        'x',
        [__hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/with.js', false)],
        (...args) => x(...args)
      ], 'examples/with.js', false);
      __hook__('()', __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false), [
        'z',
        [__hook__('w.', __with__, [
            'x',
            () => x
          ], 'examples/with.js', false)]
      ], 'examples/with.js');
      function f2(...args) {
        return __hook__(([xx = __hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/with.js,f2', false)]) => {
          return __hook__('w.', __with__, [
            'aa',
            () => aa
          ], 'examples/with.js,f2', false);
        }, null, args, 'examples/with.js,f2');
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
        ], 'examples/with.js', false)['='], __hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], 'examples/with.js', false)['=']] = [
        __hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false),
        __hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js', false)
      ];
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
        ], 'examples/with.js', false)['='], ...(__hook__('w.=', __with__, [
          'y',
          {
            set ['='](v) {
              y = v;
            },
            get ['=']() {
              return y;
            }
          }
        ], 'examples/with.js', false))['=']] = [
        __hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js', false),
        ...__hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js', false)
      ];
      let o = {
        [__hook__('w.', __with__, [
          'comp',
          () => comp
        ], 'examples/with.js,o,comp', false)]: __hook__('w.', __with__, [
          'x',
          () => x
        ], 'examples/with.js,o', false),
        nonComputed: __hook__('w.', __with__, [
          'y',
          () => y
        ], 'examples/with.js,o,nonComputed', false)
      };
      throw __hook__('w.', __with__, [
        'x',
        () => x
      ], 'examples/with.js', false);
      async function afunc(x) {
        return __hook__(async x => {
          await __hook__('w()', __with__, [
            'foo',
            [],
            (...args) => foo(...args)
          ], 'examples/with.js,afunc', false);
        }, null, arguments, 'examples/with.js,afunc');
      }
      function* gen(x) {
        yield* __hook__(function* (x) {
          yield __hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/with.js,gen', false);
          yield* [
            __hook__('w.', __with__, [
              'x',
              () => x
            ], 'examples/with.js,gen', false),
            __hook__('w.', __with__, [
              'y',
              () => y
            ], 'examples/with.js,gen', false)
          ];
        }, this, arguments, 'examples/with.js,gen');
      }
    }
    __hook__('()', __hook__('.', __hook__('w.', __with__, [
      'chai',
      () => chai
    ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
      'equal',
      [
        __hook__('.', __hook__('w.', __with__, [
          'b',
          () => b
        ], 'examples/with.js', false), ['y'], 'examples/with.js'),
        6,
        'b.y is 6'
      ]
    ], 'examples/with.js');
  }
  __hook__('()', __hook__('.', chai, ['assert'], 'examples/with.js'), [
    'equal',
    [
      __hook__('.', a, ['foo'], 'examples/with.js'),
      3,
      'a.foo is 3'
    ]
  ], 'examples/with.js');
}
$hook$.global(__hook__, 'examples/with.js', 'gA1', 'let')._p_gA1 = [
  1,
  2
];
$hook$.global(__hook__, 'examples/with.js', 'gX1', 'let')._p_gX1 = {
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
    ], 'examples/with.js,a2', false)
  ];
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'a2',
        () => a2
      ], 'examples/with.js', false),
      [
        3,
        4,
        5,
        6
      ],
      'a2 is [ 3,4,5,6 ]'
    ]
  ], 'examples/with.js');
  let y = {
    c: 3,
    ...__hook__('*', __hook__('w.', __with__, [
      'gX1',
      () => gX1
    ], 'examples/with.js,y', false), [], 'examples/with.js,y')
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'y',
        () => y
      ], 'examples/with.js', false),
      {
        c: 3,
        a: 4,
        b: 5
      },
      'y is { c: 3, a: 4, b: 5 }'
    ]
  ], 'examples/with.js');
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
          ], 'examples/with.js,z', false);
        }, null, arguments, 'examples/with.js,z');
      }(), [], 'examples/with.js,z')
    }, [], 'examples/with.js,z')
  };
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'z',
        () => z
      ], 'examples/with.js', false),
      {
        c: 3,
        a: 4,
        b: 5
      },
      'z is { c: 3, a: 4, b: 5 }'
    ]
  ], 'examples/with.js');
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'isOk',
    [
      __hook__('in', __hook__('w.', __with__, [
        'z',
        () => z
      ], 'examples/with.js', false), ['a'], 'examples/with.js'),
      'a in z'
    ]
  ], 'examples/with.js');
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
    ], 'examples/with.js', false)['='] in __hook__('*', __hook__('w.=', __with__, [
      'z',
      {
        set ['='](v) {
          z = v;
        },
        get ['=']() {
          return z;
        }
      }
    ], 'examples/with.js', false)['='], [], 'examples/with.js')) {
    __hook__('()', __hook__('w.', __with__, [
      'l1',
      () => l1
    ], 'examples/with.js', false), [
      'push',
      [__hook__('w.', __with__, [
          'p',
          () => p
        ], 'examples/with.js', false)]
    ], 'examples/with.js');
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'deepEqual',
    [
      __hook__('()', __hook__('w.', __with__, [
        'l1',
        () => l1
      ], 'examples/with.js', false), [
        'sort',
        []
      ], 'examples/with.js'),
      [
        'a',
        'b',
        'c'
      ],
      'z has a, b, c'
    ]
  ], 'examples/with.js');
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
    ], 'examples/with.js', false)['='] of __hook__('*', __hook__('w.=', __with__, [
      'a2',
      {
        set ['='](v) {
          a2 = v;
        },
        get ['=']() {
          return a2;
        }
      }
    ], 'examples/with.js', false)['='], [], 'examples/with.js')) {
    __hook__('()', __hook__('w.', __with__, [
      'l2',
      () => l2
    ], 'examples/with.js', false), [
      'push',
      [__hook__('w.', __with__, [
          'p',
          () => p
        ], 'examples/with.js', false)]
    ], 'examples/with.js');
  }
  __hook__('()', __hook__('.', __hook__('w.', __with__, [
    'chai',
    () => chai
  ], 'examples/with.js', false), ['assert'], 'examples/with.js'), [
    'deepEqual',
    [
      __hook__('w.', __with__, [
        'l2',
        () => l2
      ], 'examples/with.js', false),
      [
        3,
        4,
        5,
        6
      ],
      'a2 lists [3,4,5,6]'
    ]
  ], 'examples/with.js');
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
    ], 'examples/with.js,x', false)['='],
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
    ], 'examples/with.js', false))['=']
  } = {
    x: __hook__('w.', __with__, [
      'x',
      () => x
    ], 'examples/with.js,x', false),
    ...__hook__('*', __hook__('w.', __with__, [
      'y',
      () => y
    ], 'examples/with.js', false), [], 'examples/with.js')
  });
  let {
    A,
    ...B
  } = {
    A: __hook__('w.', __with__, [
      'y',
      () => y
    ], 'examples/with.js,A', false),
    p: __hook__('w.', __with__, [
      'a2',
      () => a2
    ], 'examples/with.js,p', false),
    ...__hook__('*', __hook__('w.', __with__, [
      'y',
      () => y
    ], 'examples/with.js', false), [], 'examples/with.js')
  };
  let [p1, p2 = __hook__('w.', __with__, [
      'y',
      () => y
    ], 'examples/with.js', false), ...p3] = [
    2,
    ,
    5,
    __hook__('.', __hook__('w.', __with__, [
      'z',
      () => z
    ], 'examples/with.js', false), ['a'], 'examples/with.js'),
    ...__hook__('w.', __with__, [
      'a2',
      () => a2
    ], 'examples/with.js', false)
  ];
}