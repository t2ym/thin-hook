const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-assignement-pattern-left.js',
  '/components/examples/module-export-assignement-pattern-left.js,prop',
  '/components/examples/module-export-assignement-pattern-left.js,localName'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-assignement-pattern-left.js';
export {
  localName
};
let x = { prop: 'x' };
let {
  prop: localName = 'value'
} = __hook__('#*', x, [], __context_mapper__[0]);
// AssignmentPattern.left
({
  prop: __hook__('m.=', localName, [
    __context_mapper__[2],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[1], null)['='] = x
} = __hook__('#*', x, [], __context_mapper__[0]));
({
  prop: __hook__('#.=', __hook__('m', localName, [__context_mapper__[2]], __context_mapper__[1], null), ['p'], __context_mapper__[1])['='] = x
} = __hook__('#*', x, [], __context_mapper__[0]));
({
  prop: __hook__('#.=', __hook__('m', localName, [__context_mapper__[2]], __context_mapper__[1], null), ['p'], __context_mapper__[1])['=']
} = __hook__('#*', x, [], __context_mapper__[0]));
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);