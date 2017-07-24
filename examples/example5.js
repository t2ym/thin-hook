{
  class S {
    static sin(v) {
      return Math.sin(v);
    }
  }
  console.log(`
    Math.sin(1) = ${Math.sin(1)}
    S.sin(1) = ${S.sin(1)}
    function f(1) = ${function f(v) { return S.sin(v); }(1)}
    (v => S.sin(v))(1) = ${(v => S.sin(v))(1)}`);
}
