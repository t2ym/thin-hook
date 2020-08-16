// ImportDeclaration,specifier:ImportDefaultSpecifier,source
import defaultExport from "module-name";
// ImportDeclaration,specifier:ImportNamespaceSpecifier,source
import * as name from "./relative-module-name/module1.js";
// ImportDeclaration,specifier:ImportSpecifier,source
// ImportDeclaration,specifier:ImportSpecifier,imported,source
import { export1 as alias1, export2 } from "module-name";
import { foo, bar } from "module-name/path/to/specific/un-exported/file.js";
import defaultExport2, { export1 as alias11, export2 as alias2 } from "module-name";
import defaultExport3, * as name2 from "module-name";
import "module-name2";
import { storage } from "std:kv-storage";
var promise = import("module-name");
defaultExport + 1;
name;
alias1;
export2;
foo;
bar;
defaultExport2;
alias11;
alias2;
defaultExport3;
name2;
g;
storage;
promise;
export { alias1 as alias1exported };
export default defaultExport;
