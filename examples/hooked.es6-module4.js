const __context_mapper__ = $hook$.$(__hook__, [
  'examples/es6-module4.js,baseUrl',
  'examples/es6-module4.js',
  'S_p_console;examples/es6-module4.js',
  'S_p_chai;examples/es6-module4.js',
  'S_p_undefined;examples/es6-module4.js',
  'examples/es6-module4.js,f',
  'examples/es6-module4.js,f,meta',
  'S_p_chai;examples/es6-module4.js,f'
]);
import Test from './es6-module.js';
const baseUrl = __hook__('#.', __hook__(() => import.meta, null, ['import.meta'], __context_mapper__[0], NaN), ['url'], __context_mapper__[0]);
__hook__('#()', $hook$.global(__hook__, __context_mapper__[1], 'console', '#get')[__context_mapper__[2]], [
  'log',
  ['import.meta.url = ' + baseUrl]
], __context_mapper__[1]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[1], 'chai', '#get')[__context_mapper__[3]], ['assert'], __context_mapper__[1]), [
  'isOk',
  [
    __hook__('#()', baseUrl, [
      'endsWith',
      ['/es6-module4.js']
    ], __context_mapper__[1]),
    'import.meta.url'
  ]
], __context_mapper__[1]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[1], 'chai', '#get')[__context_mapper__[3]], ['assert'], __context_mapper__[1]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __hook__(() => import.meta, null, ['import.meta'], __context_mapper__[1], NaN), [
          'url',
          $hook$.global(__hook__, __context_mapper__[1], 'undefined', '#get')[__context_mapper__[4]]
        ], __context_mapper__[1]);
      }, null, args, __context_mapper__[1])),
    /^Permission Denied:/
  ]
], __context_mapper__[1]);
__hook__(function f() {
  return __hook__(() => {
    const meta = __hook__(() => import.meta, null, ['import.meta'], __context_mapper__[6], NaN);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __context_mapper__[5], 'chai', '#get')[__context_mapper__[7]], ['assert'], __context_mapper__[5]), [
      'throws',
      [
        (...args) =>
          (__hook__(() => {
            __hook__('#.', __hook__(() => import.meta, null, ['import.meta'], __context_mapper__[5], NaN), ['url'], __context_mapper__[5]);
          }, null, args, __context_mapper__[5])),
        /^Permission Denied:/
      ]
    ], __context_mapper__[5]);
  }, null, arguments, __context_mapper__[5]);
}, null, [], __context_mapper__[1], 0);