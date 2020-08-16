import { n } from "./circular2.js";
try {
  console.log('n=', n);
  n++;
}
catch (e) {
  console.log(e);
}
/*
import storage from "std:kv-storage";
export class ExportClass { };
export const export1 = 1;
export const { property1: constproperty1, property2: constproperty2 } = { property1: 'property1value', property2: 'property2value' };
let o = { a: 1, b: 2, c: 3 };
try {
  console.log(Reflect.has(name, 'rest'));
  console.log(Object.getOwnPropertyDescriptor(name, 'rest'));
  name.rest;
}
catch (e) {
  console.log(e);
}
let { a, b, ...rest } = o; // acorn 5.7.3 can support this syntax while acorn 5.3.0 cannot
export { a, b, rest };
console.log(name.rest);
rest = { x: 4 };
console.log(name.rest);
export var v = 1;
//delete o.a;
//delete a; // Delete of an unqualified identifier in strict mode.
console.log(name);
for (let n in name) {
  console.log('module.' + n, name[n]);
}
storage;
*/
/*
try {
  name.a = 1;
  name.ExportClass = null;
}
catch (e) {
  console.log(e);
}
*/