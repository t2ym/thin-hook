// ImportDeclaration,specifier:ImportDefaultSpecifier,source
const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module3.js',
  '/components/module-name/index.js',
  '/components/examples/relative-module-name/module1.js',
  '/components/module-name/path/to/specific/un-exported/file.js',
  '/components/module-name2/index.js',
  'std:kv-storage',
  '/components/examples/module3.js,promise',
  '/components/module-name/index.js,default',
  '/components/module-name/index.js,export1',
  '/components/module-name/index.js,export2',
  '/components/module-name/path/to/specific/un-exported/file.js,foo',
  '/components/module-name/path/to/specific/un-exported/file.js,bar',
  'S_p_g;/components/examples/module3.js',
  'std:kv-storage,storage'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module3.js';
import * as __context_mapper__module_namespace_1 from '/components/module-name/index.js';
import * as __context_mapper__module_namespace_2 from '/components/examples/relative-module-name/module1.js';
import * as __context_mapper__module_namespace_3 from '/components/module-name/path/to/specific/un-exported/file.js';
import * as __context_mapper__module_namespace_4 from '/components/module-name2/index.js';
import * as __context_mapper__module_namespace_5 from 'std:kv-storage';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'default',
      'export1',
      'export2',
      '*'
    ],
    [__context_mapper__[2]]: [
      __context_mapper__module_namespace_2,
      '*'
    ],
    [__context_mapper__[3]]: [
      __context_mapper__module_namespace_3,
      'foo',
      'bar'
    ],
    [__context_mapper__[4]]: [__context_mapper__module_namespace_4],
    [__context_mapper__[5]]: [
      __context_mapper__module_namespace_5,
      'storage'
    ]
  }
], __context_mapper__[0], NaN);
import defaultExport from '/components/module-name/index.js';
// ImportDeclaration,specifier:ImportNamespaceSpecifier,source
import * as name from '/components/examples/relative-module-name/module1.js';
// ImportDeclaration,specifier:ImportSpecifier,source
// ImportDeclaration,specifier:ImportSpecifier,imported,source
import {
  export1 as alias1,
  export2
} from '/components/module-name/index.js';
import {
  foo,
  bar
} from '/components/module-name/path/to/specific/un-exported/file.js';
import defaultExport2, {
  export1 as alias11,
  export2 as alias2
} from '/components/module-name/index.js';
import defaultExport3, * as name2 from '/components/module-name/index.js';
import '/components/module-name2/index.js';
import { storage } from '!!! invalid script url !!!';
var promise = __hook__((Import, ImportSpecifier) => import(ImportSpecifier), null, [
  'import()',
  'module-name',
  import.meta
], __context_mapper__[6], NaN);
__hook__('m', defaultExport, [__context_mapper__[7]], __context_mapper__[0], null) + 1;
__hook__('m', name, [__context_mapper__[2]], __context_mapper__[0], null);
__hook__('m', alias1, [__context_mapper__[8]], __context_mapper__[0], null);
__hook__('m', export2, [__context_mapper__[9]], __context_mapper__[0], null);
__hook__('m', foo, [__context_mapper__[10]], __context_mapper__[0], null);
__hook__('m', bar, [__context_mapper__[11]], __context_mapper__[0], null);
__hook__('m', defaultExport2, [__context_mapper__[7]], __context_mapper__[0], null);
__hook__('m', alias11, [__context_mapper__[8]], __context_mapper__[0], null);
__hook__('m', alias2, [__context_mapper__[9]], __context_mapper__[0], null);
__hook__('m', defaultExport3, [__context_mapper__[7]], __context_mapper__[0], null);
__hook__('m', name2, [__context_mapper__[1]], __context_mapper__[0], null);
$hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[12]];
__hook__('m', storage, [__context_mapper__[13]], __context_mapper__[0], null);
promise;
export {
  alias1 as alias1exported
};
export default __hook__('m', defaultExport, [__context_mapper__[7]], __context_mapper__[0], null);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);