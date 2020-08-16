const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-import-default-and-named-objects-from-source.js',
  '/components/module-name/index.js',
  '/components/module-name/index.js,default',
  '/components/module-name/index.js,localName2',
  '/components/module-name/index.js,importedName'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-import-default-and-named-objects-from-source.js';
import * as __context_mapper__module_namespace_1 from '/components/module-name/index.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'default',
      'localName2',
      'importedName'
    ]
  }
], __context_mapper__[0], NaN);
import localName, {
  localName2,
  importedName as localName3
} from '/components/module-name/index.js';
__hook__('m', localName, [__context_mapper__[2]], __context_mapper__[0], null);
__hook__('m', localName2, [__context_mapper__[3]], __context_mapper__[0], null);
__hook__('m', localName3, [__context_mapper__[4]], __context_mapper__[0], null);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);