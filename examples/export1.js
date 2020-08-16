// Exporting individual features
export let letname1, letname2 = 'letname2value', letnameN = 'letnameNvalue';
export var varname1, varname2 = 'varname2value', varnameN = 'varnameNvalue';
export const constname1 = 'constname1value', constname2 = 'constname2value', constnameN = 'constnameNvalue';
export const { property1: constproperty1, property2: constproperty2 } = { property1: 'property1value', property2: 'property2value' };
export const [ constelement1, constelement2, ...restelement1 ] = [ 'constelement1value', 'constelement2value' ];
export function functionName() {}
export class ClassName {}
//export let { a, b, ...r } = { a: 1, b: 2, c: 3, d: 4 }; // unsupported?

// Export list
let name1, name2, nameN;
export { name1, name2, nameN };

// Renaming exports
const variable1 = 'variable1value', variable2 = 'variable2value'
export { variable1 as variable1export, variable2 as variable2export, global1 as global1export };

// Exporting destructured assignments with renaming
const obj = { name1property: 'name1propertyvalue', bar: 'barvalue' };
export const { name1property, bar: name2property } = obj;

// Default exports
export default 'default exported ' + 'expression';
//export default function () {} // also class, function*
//export default function name1defaultfunction() {} // also class, function*
//let name1default = 'name1 default value';
//export { name1default as default };

// Aggregating modules
export * from "module-name"; // does not set the default export
export { reexportname1, reexportname2, reexportnameN } from "module-name";
export { import1 as name1import1, import2 as name2import2 } from "module-name";
// module-name,import1
// export1.js,name1import1

//export { default } from "module-name";
letname1;
letname2;
letnameN;
varname1;
varname2;
varnameN;
constname1;
constname2;
constnameN;
constproperty1;
constproperty2;
constelement1;
constelement2;
restelement1;
functionName;
ClassName;
name1;
name2;
nameN;
variable1;
variable2;
global1;
name1property;
name2property;
// these are not imported locally
//reexportname1;
//reexportname2;
//reexportnameN;
//import1;
//import2;
