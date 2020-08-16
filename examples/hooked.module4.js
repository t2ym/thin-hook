const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module4.js',
  '/components/examples/module1.js',
  '/components/examples/module4.js,ExtendedClass',
  '/components/examples/module1.js,BaseClass',
  '/components/examples/module4.js,ExtendedClass,constructor'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module4.js';
import * as __context_mapper__module_namespace_1 from '/components/examples/module1.js';
__hook__(() => {
}, null, [
  'import',
  {
    [__context_mapper__[1]]: [
      __context_mapper__module_namespace_1,
      'BaseClass'
    ]
  }
], __context_mapper__[0], NaN);
import { BaseClass } from '/components/examples/module1.js';
let Args = [
  1,
  2,
  3
];
class ExtendedClass extends __hook__('m', BaseClass, [__context_mapper__[3]], __context_mapper__[2], null) {
  constructor(...Args) {
    return __hook__((...Args) => {
      __hook__((newTarget, ...args) => super(...args), null, [
        new.target,
        ...Args
      ], __context_mapper__[4], '');
    }, null, arguments, __context_mapper__[4]);
  }
}
__hook__(ExtendedClass, null, [...Args], __context_mapper__[0], true);
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);