const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/circular3.js',
  '/components/examples/circular4.js',
  'S_p_console;/components/examples/circular3.js'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/circular3.js';
import * as __context_mapper__module_namespace_1 from '/components/examples/circular4.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      '*',
      'default',
      'ExportedClass'
    ]
  }
], __context_mapper__[0], NaN);
import * as ns from '/components/examples/circular3.js';
import * as exportedName from '/components/examples/circular4.js';
import D, { ExportedClass as aliasClass } from '/components/examples/circular4.js';
import D2, * as ns2 from '/components/examples/circular4.js';
export {
  exportedName,
  D as default,
  aliasClass
};
__hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
  'log',
  [__hook__('m', ns, [__context_mapper__[0]], __context_mapper__[0], null)]
], __context_mapper__[0]);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);