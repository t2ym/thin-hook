{
  class S {
    static sin(v) {
      return __hook__(v => {
        return Math.sin(v);
      }, this, arguments, 'examples/example5.js,S,static sin');
    }
  }
  console.log(`
    Math.sin(1) = ${ Math.sin(1) }
    S.sin(1) = ${ S.sin(1) }
    function f(1) = ${ function f(v) {
    return __hook__(v => {
      return S.sin(v);
    }, this, arguments, 'examples/example5.js,f');
  }(1) }
    (v => S.sin(v))(1) = ${ ((...args) => __hook__(v => S.sin(v), this, args, 'examples/example5.js'))(1) }`);
}