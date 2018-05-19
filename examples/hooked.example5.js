{
  class S {
    static sin(v) {
      return __hook__(v => {
        return __hook__('#()', $hook$.global(__hook__, 'examples/example5.js,S,static sin', 'Math', '#get')['S_p_Math;examples/example5.js,S,static sin'], [
          'sin',
          [v]
        ], 'examples/example5.js,S,static sin');
      }, null, arguments, 'examples/example5.js,S,static sin');
    }
  }
  __hook__('()', $hook$.global(__hook__, 'examples/example5.js', 'console', 'get')['_p_console;examples/example5.js'], [
    'log',
    [`
    Math.sin(1) = ${ __hook__('()', $hook$.global(__hook__, 'examples/example5.js', 'Math', 'get')['_p_Math;examples/example5.js'], [
        'sin',
        [1]
      ], 'examples/example5.js') }
    S.sin(1) = ${ __hook__('()', S, [
        'sin',
        [1]
      ], 'examples/example5.js') }
    function f(1) = ${ __hook__(function f(v) {
        return __hook__(v => {
          return __hook__('()', S, [
            'sin',
            [v]
          ], 'examples/example5.js,f');
        }, null, arguments, 'examples/example5.js,f');
      }, null, [1], 'examples/example5.js', 0) }
    (v => S.sin(v))(1) = ${ __hook__((...args) => __hook__(v => __hook__('()', S, [
        'sin',
        [v]
      ], 'examples/example5.js'), null, args, 'examples/example5.js'), null, [1], 'examples/example5.js', 0) }`]
  ], 'examples/example5.js');
}