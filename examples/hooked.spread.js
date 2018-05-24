const __context_mapper__ = $hook$.$(__hook__, [
  'examples/spread.js',
  '_p_gA1;examples/spread.js',
  '_p_gX1;examples/spread.js',
  'examples/spread.js,a2',
  '_p_gA1;examples/spread.js,a2',
  'examples/spread.js,y',
  '_p_gX1;examples/spread.js,y',
  'examples/spread.js,z',
  'examples/spread.js,ff',
  '_p_ff;examples/spread.js,ff',
  'examples/spread.js,ff,a2',
  'examples/spread.js,ff,y',
  'examples/spread.js,ff,z',
  '_p_ff;examples/spread.js'
]);
$hook$.global(__hook__, __context_mapper__[0], 'gA1', 'let')[__context_mapper__[1]] = [
  1,
  2
];
$hook$.global(__hook__, __context_mapper__[0], 'gX1', 'let')[__context_mapper__[2]] = {
  a: 1,
  b: 2
};
{
  let a2 = [
    3,
    4,
    ...$hook$.global(__hook__, __context_mapper__[3], 'gA1', 'get')[__context_mapper__[4]]
  ];
  let y = {
    c: 3,
    ...__hook__('*', $hook$.global(__hook__, __context_mapper__[5], 'gX1', 'get')[__context_mapper__[6]], [], __context_mapper__[5])
  };
  let z = {
    a: 1,
    ...__hook__('*', {
      a: 1,
      b: 2,
      ...__hook__('*', __hook__(function () {
        return __hook__(() => {
          return y;
        }, null, arguments, __context_mapper__[7]);
      }, null, [], __context_mapper__[7], 0), [], __context_mapper__[7])
    }, [], __context_mapper__[7])
  };
  __hook__('in', z, ['a'], __context_mapper__[0]);
  let p;
  for (p in __hook__('*', z, [], __context_mapper__[0])) {
  }
  for (p of __hook__('*', a2, [], __context_mapper__[0])) {
  }
}
$hook$.global(__hook__, __context_mapper__[8], 'ff', 'function')[__context_mapper__[9]] = function ff() {
  return __hook__(() => {
    with ($hook$.with({
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
        ...__hook__('w.', __with__, [
          'gA1',
          () => gA1
        ], __context_mapper__[10], false)
      ];
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'a2',
            () => a2
          ], __context_mapper__[8], false),
          [
            3,
            4,
            5,
            6
          ],
          'a2 is [ 3,4,5,6 ]'
        ]
      ], __context_mapper__[8]);
      let y = {
        c: 3,
        ...__hook__('*', __hook__('w.', __with__, [
          'gX1',
          () => gX1
        ], __context_mapper__[11], false), [], __context_mapper__[11])
      };
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'y',
            () => y
          ], __context_mapper__[8], false),
          {
            c: 3,
            a: 4,
            b: 5
          },
          'y is { c: 3, a: 4, b: 5 }'
        ]
      ], __context_mapper__[8]);
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
              ], __context_mapper__[12], false);
            }, null, arguments, __context_mapper__[12]);
          }(), [], __context_mapper__[12])
        }, [], __context_mapper__[12])
      };
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'z',
            () => z
          ], __context_mapper__[8], false),
          {
            c: 3,
            a: 4,
            b: 5
          },
          'z is { c: 3, a: 4, b: 5 }'
        ]
      ], __context_mapper__[8]);
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'isOk',
        [
          __hook__('in', __hook__('w.', __with__, [
            'z',
            () => z
          ], __context_mapper__[8], false), ['a'], __context_mapper__[8]),
          'a in z'
        ]
      ], __context_mapper__[8]);
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
        ], __context_mapper__[8], false)['='] in __hook__('*', __hook__('w.', __with__, [
          'z',
          () => z
        ], __context_mapper__[8], false), [], __context_mapper__[8])) {
        __hook__('()', __hook__('w.', __with__, [
          'l1',
          () => l1
        ], __context_mapper__[8], false), [
          'push',
          [__hook__('w.', __with__, [
              'p',
              () => p
            ], __context_mapper__[8], false)]
        ], __context_mapper__[8]);
      }
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'deepEqual',
        [
          __hook__('()', __hook__('w.', __with__, [
            'l1',
            () => l1
          ], __context_mapper__[8], false), [
            'sort',
            []
          ], __context_mapper__[8]),
          [
            'a',
            'b',
            'c'
          ],
          'z has a, b, c'
        ]
      ], __context_mapper__[8]);
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
        ], __context_mapper__[8], false)['='] of __hook__('*', __hook__('w.', __with__, [
          'a2',
          () => a2
        ], __context_mapper__[8], false), [], __context_mapper__[8])) {
        __hook__('()', __hook__('w.', __with__, [
          'l2',
          () => l2
        ], __context_mapper__[8], false), [
          'push',
          [__hook__('w.', __with__, [
              'p',
              () => p
            ], __context_mapper__[8], false)]
        ], __context_mapper__[8]);
      }
      __hook__('()', __hook__('.', __hook__('w.', __with__, [
        'chai',
        () => chai
      ], __context_mapper__[8], false), ['assert'], __context_mapper__[8]), [
        'deepEqual',
        [
          __hook__('w.', __with__, [
            'l2',
            () => l2
          ], __context_mapper__[8], false),
          [
            3,
            4,
            5,
            6
          ],
          'a2 lists [3,4,5,6]'
        ]
      ], __context_mapper__[8]);
    }
  }, null, arguments, __context_mapper__[8]);
};
__hook__($hook$.global(__hook__, __context_mapper__[0], 'ff', 'get')[__context_mapper__[13]], null, [], __context_mapper__[0], 0);