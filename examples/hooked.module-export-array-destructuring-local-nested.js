const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-array-destructuring-local-nested.js',
  '/components/examples/module-export-array-destructuring-local-nested.js,localName'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-array-destructuring-local-nested.js';
export let [[localName]] = __hook__('#*', [['value']], [], __context_mapper__[0]);
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
[[__hook__('m.=', localName, [
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
    ], __context_mapper__[0], null)['=']]] = __hook__('#*', [['value2']], [], __context_mapper__[0]);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);