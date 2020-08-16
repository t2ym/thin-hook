const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-import-namespace-as-local-from-source-then-export-local-as-default.js',
  '/components/module-name/index.js'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-import-namespace-as-local-from-source-then-export-local-as-default.js';
import * as __context_mapper__module_namespace_1 from '/components/module-name/index.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      '*'
    ]
  }
], __context_mapper__[0], NaN);
import * as localName from '/components/module-name/index.js';
export {
  localName as default
};
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);