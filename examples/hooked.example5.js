const __context_mapper__ = $hook$.$(__hook__, [
  'examples/example5.js,S,static sin',
  'S_p_Math;examples/example5.js,S,static sin',
  'examples/example5.js',
  '_p_console;examples/example5.js',
  '_p_Math;examples/example5.js',
  'examples/example5.js,f'
]);
{
  class S {
    static sin(v) {
      return __hook__(v => {
        return __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'Math', '#get')[__context_mapper__[1]], [
          'sin',
          [v]
        ], __context_mapper__[0]);
      }, null, arguments, __context_mapper__[0]);
    }
  }
  __hook__('()', $hook$.global(__hook__, __context_mapper__[2], 'console', 'get')[__context_mapper__[3]], [
    'log',
    [`
    Math.sin(1) = ${ __hook__('()', $hook$.global(__hook__, __context_mapper__[2], 'Math', 'get')[__context_mapper__[4]], [
        'sin',
        [1]
      ], __context_mapper__[2]) }
    S.sin(1) = ${ __hook__('()', S, [
        'sin',
        [1]
      ], __context_mapper__[2]) }
    function f(1) = ${ __hook__(function f(v) {
        return __hook__(v => {
          return __hook__('()', S, [
            'sin',
            [v]
          ], __context_mapper__[5]);
        }, null, arguments, __context_mapper__[5]);
      }, null, [1], __context_mapper__[2], 0) }
    (v => S.sin(v))(1) = ${ __hook__((...args) => __hook__(v => __hook__('()', S, [
        'sin',
        [v]
      ], __context_mapper__[2]), null, args, __context_mapper__[2]), null, [1], __context_mapper__[2], 0) }`]
  ], __context_mapper__[2]);
}