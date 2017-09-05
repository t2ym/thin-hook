{
  let baseObject = {
    method(x, y) {
      return __hook__((x, y) => {
        return x + y;
      }, this, arguments, 'examples/super.js,baseObject,method');
    }
  };
  let subObject = {
    method(x, y) {
      return __hook__((x, y) => {
        return __hook__(super.method, this, [
          x,
          y
        ], 'examples/super.js,subObject,method') * 2;
      }, this, arguments, 'examples/super.js,subObject,method');
    }
  };
  __hook__('()', Object, [
    'setPrototypeOf',
    [
      subObject,
      baseObject
    ]
  ], 'examples/super.js');
  __hook__('()', subObject, [
    'method',
    [
      2,
      3
    ]
  ], 'examples/super.js') === 10;
}