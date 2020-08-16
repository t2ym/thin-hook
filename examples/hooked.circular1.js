const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/circular1.js',
  '/components/examples/circular2.js',
  'S_p_console;/components/examples/circular1.js',
  '/components/examples/circular2.js,n'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/circular1.js';
import * as __context_mapper__module_namespace_1 from '/components/examples/circular2.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'n'
    ]
  }
], __context_mapper__[0], NaN);
import { n } from '/components/examples/circular2.js';
try {
  __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
    'log',
    [
      'n=',
      __hook__('m', n, [__context_mapper__[3]], __context_mapper__[0], null)
    ]
  ], __context_mapper__[0]);
  __hook__('m++', n, [
    __context_mapper__[3],
    () => n++
  ], __context_mapper__[0], null);
} catch (e) {
  __hook__('#()', $hook$.global(__hook__, __context_mapper__[0], 'console', '#get')[__context_mapper__[2]], [
    'log',
    [e]
  ], __context_mapper__[0]);
}  /*
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
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);