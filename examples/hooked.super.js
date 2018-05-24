const __context_mapper__ = $hook$.$(__hook__, [
  'examples/super.js,baseObject,method',
  'examples/super.js,subObject,method',
  'examples/super.js',
  '_p_Object;examples/super.js'
]);
{
  let baseObject = {
    method(x, y) {
      return __hook__((x, y) => {
        return x + y;
      }, null, arguments, __context_mapper__[0]);
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
        ], __context_mapper__[1]) * 2;
      }, null, arguments, __context_mapper__[1]);
    }
  };
  __hook__('()', $hook$.global(__hook__, __context_mapper__[2], 'Object', 'get')[__context_mapper__[3]], [
    'setPrototypeOf',
    [
      subObject,
      baseObject
    ]
  ], __context_mapper__[2]);
  __hook__('()', subObject, [
    'method',
    [
      2,
      3
    ]
  ], __context_mapper__[2]) === 10;
}