const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-object-destructuring-local-with-property-name-and-default-value.js',
  '/components/examples/module-export-object-destructuring-local-with-property-name-and-default-value.js,localName',
  '/components/examples/module-export-object-destructuring-local-with-property-name-and-default-value.js,prop'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-object-destructuring-local-with-property-name-and-default-value.js';
export let {
  prop: localName = 'value'
} = __hook__('#*', { prop: 'value2' }, [], __context_mapper__[0]);
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
({
  prop: __hook__('m.=', localName, [
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
  ], __context_mapper__[2], null)['='] = 'value3'
} = __hook__('#*', { prop: 'value4' }, [], __context_mapper__[0]));
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);