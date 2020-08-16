// Exporting individual features
const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/export1.js',
  '/components/module-name/index.js',
  '/components/examples/export1.js,functionName',
  '/components/examples/export1.js,letname1',
  '/components/examples/export1.js,letname2',
  '/components/examples/export1.js,letnameN',
  '/components/examples/export1.js,varname1',
  '/components/examples/export1.js,varname2',
  '/components/examples/export1.js,varnameN',
  '/components/examples/export1.js,constname1',
  '/components/examples/export1.js,constname2',
  '/components/examples/export1.js,constnameN',
  '/components/examples/export1.js,constproperty1',
  '/components/examples/export1.js,constproperty2',
  '/components/examples/export1.js,constelement1',
  '/components/examples/export1.js,constelement2',
  '/components/examples/export1.js,restelement1',
  '/components/examples/export1.js,ClassName',
  '/components/examples/export1.js,name1',
  '/components/examples/export1.js,name2',
  '/components/examples/export1.js,nameN',
  '/components/examples/export1.js,variable1export',
  '/components/examples/export1.js,variable2export',
  'S_p_global1;/components/examples/export1.js',
  '/components/examples/export1.js,name1property',
  '/components/examples/export1.js,name2property'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/export1.js';
import * as __context_mapper__module_namespace_1 from '/components/module-name/index.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'reexportname1',
      'reexportname2',
      'reexportnameN',
      'import1',
      'import2'
    ]
  }
], __context_mapper__[0], NaN);
export let letname1, letname2 = 'letname2value', letnameN = 'letnameNvalue';
export var varname1, varname2 = 'varname2value', varnameN = 'varnameNvalue';
export const constname1 = 'constname1value', constname2 = 'constname2value', constnameN = 'constnameNvalue';
export const {
  property1: constproperty1,
  property2: constproperty2
} = __hook__('#*', {
  property1: 'property1value',
  property2: 'property2value'
}, [], __context_mapper__[0]);
export const [constelement1, constelement2, ...restelement1] = __hook__('#*', [
  'constelement1value',
  'constelement2value'
], [], __context_mapper__[0]);
export function functionName() {
  return __hook__(() => {
  }, null, arguments, __context_mapper__[2]);
}
export class ClassName {
}
//export let { a, b, ...r } = { a: 1, b: 2, c: 3, d: 4 }; // unsupported?
// Export list
let name1, name2, nameN;
export {
  name1,
  name2,
  nameN
};
// Renaming exports
const variable1 = 'variable1value', variable2 = 'variable2value';
export {
  variable1 as variable1export,
  variable2 as variable2export,
  undefined as global1export
};
// Exporting destructured assignments with renaming
const obj = {
  name1property: 'name1propertyvalue',
  bar: 'barvalue'
};
export const {
  name1property,
  bar: name2property
} = __hook__('#*', obj, [], __context_mapper__[0]);
// Default exports
export default 'default exported ' + 'expression';
//export default function () {} // also class, function*
//export default function name1defaultfunction() {} // also class, function*
//let name1default = 'name1 default value';
//export { name1default as default };
// Aggregating modules
export * from '/components/module-name/index.js';
// does not set the default export
export {
  reexportname1,
  reexportname2,
  reexportnameN
} from '/components/module-name/index.js';
export {
  import1 as name1import1,
  import2 as name2import2
} from '/components/module-name/index.js';
// module-name,import1
// export1.js,name1import1
//export { default } from "module-name";
__hook__('m', letname1, [__context_mapper__[3]], __context_mapper__[0], null);
__hook__('m', letname2, [__context_mapper__[4]], __context_mapper__[0], null);
__hook__('m', letnameN, [__context_mapper__[5]], __context_mapper__[0], null);
__hook__('m', varname1, [__context_mapper__[6]], __context_mapper__[0], null);
__hook__('m', varname2, [__context_mapper__[7]], __context_mapper__[0], null);
__hook__('m', varnameN, [__context_mapper__[8]], __context_mapper__[0], null);
__hook__('m', constname1, [__context_mapper__[9]], __context_mapper__[0], null);
__hook__('m', constname2, [__context_mapper__[10]], __context_mapper__[0], null);
__hook__('m', constnameN, [__context_mapper__[11]], __context_mapper__[0], null);
__hook__('m', constproperty1, [__context_mapper__[12]], __context_mapper__[0], null);
__hook__('m', constproperty2, [__context_mapper__[13]], __context_mapper__[0], null);
__hook__('m', constelement1, [__context_mapper__[14]], __context_mapper__[0], null);
__hook__('m', constelement2, [__context_mapper__[15]], __context_mapper__[0], null);
__hook__('m', restelement1, [__context_mapper__[16]], __context_mapper__[0], null);
__hook__('m', functionName, [__context_mapper__[2]], __context_mapper__[0], null);
__hook__('m', ClassName, [__context_mapper__[17]], __context_mapper__[0], null);
__hook__('m', name1, [__context_mapper__[18]], __context_mapper__[0], null);
__hook__('m', name2, [__context_mapper__[19]], __context_mapper__[0], null);
__hook__('m', nameN, [__context_mapper__[20]], __context_mapper__[0], null);
__hook__('m', variable1, [__context_mapper__[21]], __context_mapper__[0], null);
__hook__('m', variable2, [__context_mapper__[22]], __context_mapper__[0], null);
$hook$.global(__hook__, __context_mapper__[0], 'global1', '#get')[__context_mapper__[23]];
__hook__('m', name1property, [__context_mapper__[24]], __context_mapper__[0], null);
__hook__('m', name2property, [__context_mapper__[25]], __context_mapper__[0], null);  // these are not imported locally
                                                                                      //reexportname1;
                                                                                      //reexportname2;
                                                                                      //reexportnameN;
                                                                                      //import1;
                                                                                      //import2;
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);