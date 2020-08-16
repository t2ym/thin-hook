const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-import-default-as-local-from-source.js',
  '/components/module-name/index.js',
  '/components/module-name/index.js,default'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-import-default-as-local-from-source.js';
import * as __context_mapper__module_namespace_1 from '/components/module-name/index.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'default'
    ]
  }
], __context_mapper__[0], NaN);
import { default as localName } from '/components/module-name/index.js';
__hook__('m', localName, [__context_mapper__[2]], __context_mapper__[0], null);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);