const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-object-destructuring-local.js',
  '/components/examples/module-export-object-destructuring-local.js,localName'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-object-destructuring-local.js';
export let {localName} = __hook__('#*', { localName: 'value' }, [], __context_mapper__[0]);
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
({
  localName: __hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[1], null)['=']
} = __hook__('#*', { localName: 'value2' }, [], __context_mapper__[0]));
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);