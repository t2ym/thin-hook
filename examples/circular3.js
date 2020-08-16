import * as ns from "./circular3.js";
import * as exportedName from "./circular4.js";
import D, { ExportedClass as aliasClass } from "./circular4.js";
import D2, * as ns2 from "./circular4.js";
export { exportedName, D as default, aliasClass };
console.log(ns);
