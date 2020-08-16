const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-default-as-reexported-from-source.js',
  '/components/module-name/index.js'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-default-as-reexported-from-source.js';
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
export {
  default as reexportedName
} from '/components/module-name/index.js';
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);