const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/export2.js',
  '/components/examples/es6-module6.js',
  '/components/examples/es6-module7.js',
  '/components/examples/es6-module2.js',
  '/components/examples/es6-module5.js',
  '/components/examples/es6-module.js',
  '/components/examples/es6-module4.js',
  '/components/examples/es6-module3.js',
  '/components/examples/es6-module8.js',
  '/components/examples/es6-module9.js',
  '/components/examples/es6-module10.js',
  '/components/examples/es6-module.js,exported',
  '/components/examples/es6-module2.js,default',
  '/components/examples/es6-module3.js,default',
  '/components/examples/es6-module6.js,default',
  '/components/examples/es6-module7.js,importedOnly',
  '/components/examples/export2.js,exportedOnlyLet',
  '/components/examples/export2.js,exportedNameForExportedOnlyObject',
  'S_p_reexport1;/components/examples/export2.js'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/export2.js';
import * as __context_mapper__module_namespace_1 from '/components/examples/es6-module6.js';
import * as __context_mapper__module_namespace_2 from '/components/examples/es6-module7.js';
import * as __context_mapper__module_namespace_3 from '/components/examples/es6-module2.js';
import * as __context_mapper__module_namespace_4 from '/components/examples/es6-module5.js';
import * as __context_mapper__module_namespace_5 from '/components/examples/es6-module.js';
import * as __context_mapper__module_namespace_6 from '/components/examples/es6-module4.js';
import * as __context_mapper__module_namespace_7 from '/components/examples/es6-module3.js';
import * as __context_mapper__module_namespace_8 from '/components/examples/es6-module8.js';
import * as __context_mapper__module_namespace_9 from '/components/examples/es6-module9.js';
import * as __context_mapper__module_namespace_10 from '/components/examples/es6-module10.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'default'
    ],
    [__context_mapper__[2]]: [
      __context_mapper__module_namespace_2,
      'importedOnly'
    ],
    [__context_mapper__[3]]: [
      __context_mapper__module_namespace_3,
      'default'
    ],
    [__context_mapper__[4]]: [
      __context_mapper__module_namespace_4,
      '*'
    ],
    [__context_mapper__[5]]: [
      __context_mapper__module_namespace_5,
      'exported'
    ],
    [__context_mapper__[6]]: [
      __context_mapper__module_namespace_6,
      '*'
    ],
    [__context_mapper__[7]]: [
      __context_mapper__module_namespace_7,
      'default'
    ],
    [__context_mapper__[8]]: [
      __context_mapper__module_namespace_8,
      'reexport1'
    ],
    [__context_mapper__[9]]: [__context_mapper__module_namespace_9],
    [__context_mapper__[10]]: [__context_mapper__module_namespace_10]
  }
], __context_mapper__[0], NaN);
import importedOnlyDefault from '/components/examples/es6-module6.js';
import { importedOnly as importedOnlyAlias } from '/components/examples/es6-module7.js';
import D from '/components/examples/es6-module2.js';
import * as module5 from '/components/examples/es6-module5.js';
export {
  alias as reexportedalias,
  D as exportedD,
  module4 as exportedModule4,
  module5 as exportedModule5
};
import { exported as alias } from '/components/examples/es6-module.js';
import D2 from '/components/examples/es6-module3.js';
import * as module4 from '/components/examples/es6-module4.js';
//export { D2 as default };
export let exportedOnlyLet = 1;
let exportedOnlyObject = { p: 1 };
export {
  exportedOnlyObject as exportedNameForExportedOnlyObject
};
export {
  reexport1 as reexport1renamed
} from '/components/examples/es6-module8.js';
// es6-module8.js,reexport1
// *,reexport1renamed
export * from '/components/examples/es6-module9.js';
// es6-module9.js,*
import '/components/examples/es6-module10.js';
//export { reexportedDefault as default } from "./es6-module9.js";
export default 'default export value';
// *,default
__hook__('m', alias, [__context_mapper__[11]], __context_mapper__[0], null);
__hook__('m', D, [__context_mapper__[12]], __context_mapper__[0], null);
__hook__('m', D2, [__context_mapper__[13]], __context_mapper__[0], null);
__hook__('m', module4, [__context_mapper__[6]], __context_mapper__[0], null);
__hook__('m', module5, [__context_mapper__[4]], __context_mapper__[0], null);
__hook__('m', importedOnlyDefault, [__context_mapper__[14]], __context_mapper__[0], null);
__hook__('m', importedOnlyAlias, [__context_mapper__[15]], __context_mapper__[0], null);
__hook__('m', exportedOnlyLet, [__context_mapper__[16]], __context_mapper__[0], null);
__hook__('m', exportedOnlyObject, [__context_mapper__[17]], __context_mapper__[0], null);
$hook$.global(__hook__, __context_mapper__[0], 'reexport1', '#get')[__context_mapper__[18]];  //reexportedDefault;
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);