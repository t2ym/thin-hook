hook.global(__hook__, 'examples/spread.js', 'gA1', 'let')._p_gA1 = [
  1,
  2
];
hook.global(__hook__, 'examples/spread.js', 'gX1', 'let')._p_gX1 = {
  a: 1,
  b: 2
};
{
  let a2 = [
    3,
    4,
    ...hook.global(__hook__, 'examples/spread.js,a2', 'gA1', 'get')._p_gA1
  ];
  let y = {
    c: 3,
    ...__hook__('*', hook.global(__hook__, 'examples/spread.js,y', 'gX1', 'get')._p_gX1, [], 'examples/spread.js,y')
  };
  let z = {
    a: 1,
    ...__hook__('*', {
      a: 1,
      b: 2,
      ...__hook__('*', __hook__(function () {
        return __hook__(() => {
          return y;
        }, null, arguments, 'examples/spread.js,z');
      }, null, [], 'examples/spread.js,z', 0), [], 'examples/spread.js,z')
    }, [], 'examples/spread.js,z')
  };
  __hook__('in', z, ['a'], 'examples/spread.js');
  let p;
  for (p in __hook__('*', z, [], 'examples/spread.js')) {
  }
  for (p of __hook__('*', a2, [], 'examples/spread.js')) {
  }
}
hook.global(__hook__, 'examples/spread.js,ff', 'ff', 'function')._p_ff = function ff() {
  return __hook__(() => {
    with (hook.with({
        gA1: [
          5,
          6
        ],
        gX1: {
          a: 4,
          b: 5
        }
      }, { arguments: true })) {
      let a2 = [
        3,
        4,
        ...gA1
      ];
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'a2',
            () => a2
          ], 'examples/spread.js,ff', false),
          [
            3,
            4,
            5,
            6
          ],
          'a2 is [ 3,4,5,6 ]'
        ]
      ], 'examples/spread.js,ff');
      let y = {
        c: 3,
        ...__hook__('*', hook.global(__hook__, 'examples/spread.js,ff,y', 'gX1', 'get')._p_gX1, [], 'examples/spread.js,ff,y')
      };
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'y',
            () => y
          ], 'examples/spread.js,ff', false),
          {
            c: 3,
            a: 4,
            b: 5
          },
          'y is { c: 3, a: 4, b: 5 }'
        ]
      ], 'examples/spread.js,ff');
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
              ], 'examples/spread.js,ff,z', false);
            }, null, arguments, 'examples/spread.js,ff,z');
          }(), [], 'examples/spread.js,ff,z')
        }, [], 'examples/spread.js,ff,z')
      };
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'z',
            () => z
          ], 'examples/spread.js,ff', false),
          {
            c: 3,
            a: 4,
            b: 5
          },
          'z is { c: 3, a: 4, b: 5 }'
        ]
      ], 'examples/spread.js,ff');
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'isOk',
        [
          __hook__('in', __hook__('w.', __with__, [
            'z',
            () => z
          ], 'examples/spread.js,ff', false), ['a'], 'examples/spread.js,ff'),
          'a in z'
        ]
      ], 'examples/spread.js,ff');
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
        ], 'examples/spread.js,ff', false)['='] in __hook__('*', __hook__('w.=', __with__, [
          'z',
          {
            set ['='](v) {
              z = v;
            },
            get ['=']() {
              return z;
            }
          }
        ], 'examples/spread.js,ff', false)['='], [], 'examples/spread.js,ff')) {
        __hook__('()', __hook__('w.', __with__, [
          'l1',
          () => l1
        ], 'examples/spread.js,ff', false), [
          'push',
          [__hook__('w.', __with__, [
              'p',
              () => p
            ], 'examples/spread.js,ff', false)]
        ], 'examples/spread.js,ff');
      }
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'deepEqual',
        [
          __hook__('()', __hook__('w.', __with__, [
            'l1',
            () => l1
          ], 'examples/spread.js,ff', false), [
            'sort',
            []
          ], 'examples/spread.js,ff'),
          [
            'a',
            'b',
            'c'
          ],
          'z has a, b, c'
        ]
      ], 'examples/spread.js,ff');
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
        ], 'examples/spread.js,ff', false)['='] of __hook__('*', __hook__('w.=', __with__, [
          'a2',
          {
            set ['='](v) {
              a2 = v;
            },
            get ['=']() {
              return a2;
            }
          }
        ], 'examples/spread.js,ff', false)['='], [], 'examples/spread.js,ff')) {
        __hook__('()', __hook__('w.', __with__, [
          'l2',
          () => l2
        ], 'examples/spread.js,ff', false), [
          'push',
          [__hook__('w.', __with__, [
              'p',
              () => p
            ], 'examples/spread.js,ff', false)]
        ], 'examples/spread.js,ff');
      }
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], 'examples/spread.js,ff', false), ['assert'], 'examples/spread.js,ff'), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'l2',
            () => l2
          ], 'examples/spread.js,ff', false),
          [
            3,
            4,
            5,
            6
          ],
          'a2 lists [3,4,5,6]'
        ]
      ], 'examples/spread.js,ff');
    }
  }, null, arguments, 'examples/spread.js,ff');
};
__hook__(ff, null, [], 'examples/spread.js', 0);