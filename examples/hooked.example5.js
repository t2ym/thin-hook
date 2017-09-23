{
  class S {
    static sin(v) {
      return __hook__(v => {
        return __hook__('()', Math, [
          'sin',
          [v]
        ], 'examples/example5.js,S,static sin');
      }, null, arguments, 'examples/example5.js,S,static sin');
    }
  }
  __hook__('()', console, [
    'log',
    [`
    Math.sin(1) = ${ __hook__('()', Math, [
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