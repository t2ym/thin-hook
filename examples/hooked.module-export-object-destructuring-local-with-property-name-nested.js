const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-object-destructuring-local-with-property-name-nested.js',
  '/components/examples/module-export-object-destructuring-local-with-property-name-nested.js,localName',
  '/components/examples/module-export-object-destructuring-local-with-property-name-nested.js,prop,prop'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-object-destructuring-local-with-property-name-nested.js';
export let {
  prop: {prop: localName}
} = __hook__('#*', { prop: { prop: 'value' } }, [], __context_mapper__[0]);
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
({
  prop: {
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
    ], __context_mapper__[2], null)['=']
  }
} = __hook__('#*', { prop: { prop: 'value2' } }, [], __context_mapper__[0]));
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);