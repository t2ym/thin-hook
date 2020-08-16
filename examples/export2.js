import importedOnlyDefault from "./es6-module6.js";
import { importedOnly as importedOnlyAlias } from "./es6-module7.js";
import D from "./es6-module2.js";
import * as module5 from "./es6-module5.js";
export { alias as reexportedalias, D as exportedD, module4 as exportedModule4, module5 as exportedModule5 };
import { exported as alias } from "./es6-module.js";
import D2 from "./es6-module3.js";
import * as module4 from "./es6-module4.js";
//export { D2 as default };
export let exportedOnlyLet = 1;
let exportedOnlyObject = { p: 1 };
export { exportedOnlyObject as exportedNameForExportedOnlyObject };
export { reexport1 as reexport1renamed } from "./es6-module8.js";
// es6-module8.js,reexport1
// *,reexport1renamed
export * from "./es6-module9.js";
// es6-module9.js,*
import "./es6-module10.js";
//export { reexportedDefault as default } from "./es6-module9.js";
export default 'default export value';
// *,default
alias;
D;
D2;
module4;
module5;
importedOnlyDefault;
importedOnlyAlias;
exportedOnlyLet;
exportedOnlyObject;
reexport1;
//reexportedDefault;
