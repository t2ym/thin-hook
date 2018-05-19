{
  let baseObject = {
    method(x, y) {
      return __hook__((x, y) => {
        return x + y;
      }, null, arguments, 'examples/super.js,baseObject,method');
    }
  };
  let subObject = {
    method(x, y) {
      return __hook__((x, y) => {
        return __hook__('s()', this, [
          'method',
          [
            x,
            y
          ],
          p => super[p]
        ], 'examples/super.js,subObject,method') * 2;
      }, null, arguments, 'examples/super.js,subObject,method');
    }
  };
  __hook__('()', $hook$.global(__hook__, 'examples/super.js', 'Object', 'get')['_p_Object;examples/super.js'], [
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