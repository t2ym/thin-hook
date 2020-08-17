import { LitElement, html } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import * as litHtmlNamespace from "lit-html";
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Button, ClearButton } from "@spectrum-web-components/button";
import '@spectrum-web-components/button/sp-button.js';
import {
  exportedName,
  exportedName2,
  ExportedClass,
  inaccessibleString,
  inaccessibleNumber,
  inaccessibleBoolean,
  inaccessibleSymbol,
  inaccessibleNull,
  inaccessibleUndefined,
  inaccessibleBigInt,
  inaccessibleFunction,
  inaccessibleObject
} from "./module2.js";
import { UnspecifiedExport } from "./module3.js";

import("lit-html").then(dynamicModule => {
  if (import.meta.url.indexOf('rollup') >= 0) {
    console.warn('dynamically imported "lit-html" module may conflict with that in this bundle ', import.meta.url);
  }
  else {
    chai.assert.equal(dynamicModule, litHtmlNamespace, 'dynamically imported module matches with that from static import')
  }
});
/*
import defaultImportLocalName from "./module2.js";
export { ExportedClass_local1 as ExportedClass_local1_renamedExport1 }; // export comes before import
export { ExportedClass_local1 as ExportedClass_local1_renamedExport2 };
import { ExportedClass as ExportedClass_local1, ExportedClass as ExportedClass_local2 } from "./module2.js";
export { ExportedClass as ExportedClass_renamedExport1 };
export { ExportedClass as ExportedClass_renamedExport2 };
export { ExportedClass_local2 as ExportedClass_local2_renamedExport1 };
export { ExportedClass_local2 as ExportedClass_local2_renamedExport2 };
import "./module4.js"; // no imported variables
import * as module2Namesapce from "./module2.js";
export * from "./module5.js";
export { module2Namesapce };
export { ExportedClass as ReexportedClass };
export default ExportedClass;
//export default class DefaultExport {};
//export { DefaultExport as default };
class LaterExportedClass {}
export { LaterExportedClass as RenamedLaterExportedClass };
export { PreExportedClass as RenamedPreExportedClass };
class PreExportedClass {}
class MultiplyExportedClass {}
export { MultiplyExportedClass as MultiplyExportedClass_renamed1, MultiplyExportedClass as MultiplyExportedClass_renamed2 };
*/

export class HelloWorld extends LitElement {
  render() {
    return html`<div>Hello, World!</div>`;
  }
}
if (!customElements.get("hello-world")) {
  customElements.define("hello-world", HelloWorld);
}
else {
  console.warn('skipping registration of "hello-world" custom element as it has already been defined', import.meta.url);
}

chai.assert.equal(typeof UnspecifiedExport, 'function', 'typeof UnspecifiedExport'); // readable
let unspecifiedExportObject = new UnspecifiedExport(); // callable
chai.assert.equal(unspecifiedExportObject.property, 'property value', 'UnspecifiedExport.property'); // readable
chai.assert.throws(() => { UnspecifiedExport.nonwritable = true; }, /^Permission Denied:/); // not writable via Policy.globalAcl()

chai.assert.equal(exportedName + 'concatenated', 'exportedNameValueconcatenated', 'exported readable string value'); // readable
chai.assert.equal(typeof exportedName, 'string', 'typeof exported string value'); // readable
//chai.assert.throws(() => { exportedName = 'new value'; }, /^Permission Denied:/); // not writable
chai.assert.throws(() => { exportedName(); }, /^Permission Denied:/); // not callable

chai.assert.throws(() => { exportedName2; }, /^Permission Denied:/); // not readable

// call
let exportedClassObject = new ExportedClass();
chai.assert.equal(exportedClassObject.readableProperty, 'readable', 'readable object property');
chai.assert.throws(() => { exportedClassObject.readableProperty(); }, /^Permission Denied:/); // not callable
chai.assert.throws(() => { exportedClassObject.unreadableProperty; }, /^Permission Denied:/);
chai.assert.equal(ExportedClass.callableStaticMethod(), 'called', 'callable static method');
chai.assert.throws(() => { ExportedClass.callableStaticMethod; }, /^Permission Denied:/);
chai.assert.equal(exportedClassObject.callableMethod('abc'), 'string', 'callable method');
chai.assert.throws(() => { exportedClassObject.callableMethod; }, /^Permission Denied:/);

// read
chai.assert.throws(() => { inaccessibleString; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject; }, /^Permission Denied:/);
// read via unary operator
chai.assert.throws(() => { typeof inaccessibleString; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleNumber; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleBoolean; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleSymbol; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleNull; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleUndefined; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleBigInt; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleFunction; }, /^Permission Denied:/);
chai.assert.throws(() => { typeof inaccessibleObject; }, /^Permission Denied:/);
/*
// update operator (throws before operations)
chai.assert.throws(() => { inaccessibleString++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction++; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject++; }, /^Permission Denied:/);
*/
// call operator (throws before operations)
chai.assert.throws(() => { inaccessibleString(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction(); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject(); }, /^Permission Denied:/);
// new operator (throws before operations)
chai.assert.throws(() => { new inaccessibleString(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleNumber(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleBoolean(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleSymbol(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleNull(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleUndefined(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleBigInt(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleFunction(); }, /^Permission Denied:/);
chai.assert.throws(() => { new inaccessibleObject(); }, /^Permission Denied:/);
/*
// assignment operators
chai.assert.throws(() => { inaccessibleString = 'abc'; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNumber = 1; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBoolean = true; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleSymbol = Symbol('new value'); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleNull = null; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleUndefined = undefined; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleBigInt = BigInt(1); }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleFunction = function () {}; }, /^Permission Denied:/);
chai.assert.throws(() => { inaccessibleObject = {}; }, /^Permission Denied:/);
// LHS values
chai.assert.throws(() => { [ inaccessibleString ] = [ 'abc' ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleNumber ] = [ 1 ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleBoolean ] = [ true ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleSymbol ] = [ Symbol('new value') ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleNull ] = [ null ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleUndefined ] = [ undefined ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleBigInt ] = [ BigInt(1) ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleFunction ] = [ function () {} ]; }, /^Permission Denied:/);
chai.assert.throws(() => { [ inaccessibleObject ] = [ {} ]; }, /^Permission Denied:/);
*/
