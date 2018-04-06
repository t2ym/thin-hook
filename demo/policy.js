/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const S_POLICY = Symbol('policy');
const S_DEFAULT = Symbol('default');
const S_INSTANCE = Symbol('instance');
const S_TEMPLATE = Symbol('template');
const _global = new Function('return this')();
const Policy = {
  $__proto__$: 'Link:Policy.Window.prototype',
  Window: {
    $__proto__$: 'Link:Policy.EventTarget',
    prototype: {
      $__proto__$: 'Link:Policy.WindowProperties.prototype',
      constructor: 'Link:Policy.Window',
    },
  },
  WindowProperties: {
    $__proto__$: 'Link:Policy.Function.prototype',
    prototype: {
      $__proto__$: 'Link:Policy.EventTarget.prototype',
      constructor: 'Link:Policy.WindowProperties',
    },
  },
  EventTarget: {
    $__proto__$: 'Link:Policy.Function.prototype',
    prototype: {
      $__proto__$: 'Link:Policy.Object.prototype',
      constructor: 'Link:Policy.EventTarget',
    },
  },
  Object: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    keys: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
    },
    defineProperty: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: null,
      constructor: 'Link:Policy.Object',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      [S_INSTANCE]: {
        $__proto__$: 'Link:Policy.Object.prototype',
        [S_POLICY]() {},
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
      },
      hasOwnProperty: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
    },
  },
  Function: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: 'Link:Policy.Object.prototype',
      constructor: 'Link:Policy.Function',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      [S_INSTANCE]: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
      },
      apply: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
      bind: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
    },
  },
  Symbol: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    for: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
    },
    keyFor: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
    },
    hasInstance: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
    },
    unscopables: {
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: 'Link:Policy.Function.prototype',
      constructor: 'Link:Policy.Symbol',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      toString: {
        $__proto__$: 'Link:Policy.Function.prototype',
        constructor: 'Link:Policy.Function',
        [S_POLICY]() {},
      },
    },
  },
  Array: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    isArray: {
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: 'Link:Policy.Object.prototype',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      [S_INSTANCE]: {
        $__proto__$: 'Link:Policy.Array.prototype',
        [S_POLICY]() {},
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
      },
      map: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
    },
  },
  // TODO: window object
  /*
  window: {

  },
  Window: {

  },
  */
  A: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    staticMethod: {
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: 'Link:Policy.Function.prototype',
      constructor: 'Link:Policy.A',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      [S_INSTANCE]: {
        $__proto__$: 'Link:Policy.A.prototype',
        [S_POLICY]() {},
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
        instanceProperty: {
          [S_POLICY]() {},
        },
      },
      instanceMethod: {
        $__proto__$: 'Link:Policy.Function.prototype',
        constructor: 'Link:Policy.Function',
        [S_POLICY]() {},
      },
    },
  },
  B: {
    $__proto__$: 'Link:Policy.A',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    staticMethod: {
      [S_POLICY]() {},
    },
    prototype: {
      $__proto__$: 'Link:Policy.A.prototype',
      constructor: 'Link:Policy.B',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      [S_INSTANCE]: {
        $__proto__$: 'Link:Policy.B.prototype',
        [S_POLICY]() {},
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
        instanceProperty: {
          [S_POLICY]() {},
        },
      },
      instanceMethod: {
        $__proto__$: 'Link:Policy.Function.prototype',
        constructor: 'Link:Policy.Function',
        [S_POLICY]() {},
      },
    },
  },
  [S_TEMPLATE]: {
    BasePolicy: class BasePolicy {
      constructor() {}
      get policy() {
        return {
          [S_POLICY]() {},
        };
      }
    },
  },
};
const __proto__PropertyDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
const policyFunctionGenerator = function policyFunctionGenerator(policyPath) {
  //console.log('policyFunctionGenerator:', policyPath);
  return function (f, thisArg, args, context, newTarget) {
    return policyPath;
  }
}
const compilePolicy = function compilePolicy(policy, policyPath = []) {
  switch (typeof policy) {
  case 'object':
    if (policy) {
      let isProtoSpecified = false;
      let properties = Object.getOwnPropertyNames(policy).concat(Object.getOwnPropertySymbols(policy));
      for (let property of properties) {
        switch (property) {
        case '$__proto__$':
          policyPath.push('__proto__');
          Object.setPrototypeOf(policy, compilePolicy(policy[property], policyPath));
          policyPath.pop();
          // Note: __proto__ getter/setter are not configured and unavailable in the Policy object
          Object.defineProperty(policy, '__proto__', __proto__PropertyDescriptor);
          isProtoSpecified = true;
          break;
        default:
          policyPath.push(property);
          policy[property] = compilePolicy(policy[property], policyPath);
          policyPath.pop();
          break;
        }
      }
      if (isProtoSpecified) {
        delete policy.$__proto__$;
      }
      else {
        Object.setPrototypeOf(policy, null);
      }
    }
    break;
  case 'string':
    if (policy.startsWith('Link:')) {
      let path = policy.substring(5).split(/[.]/);
      let i = 0;
      let _policy = path[i] === 'Policy' ? Policy : _global[path[i]];
      while (++i < path.length) {
        _policy = _policy[path[i]];
        if (typeof _policy === 'undefined') {
          break;
        }
      }
      policy = _policy;
    }
    break;
  case 'function':
    policy = policyFunctionGenerator(policyPath.map(p => p.toString()).join('.'));
    break;
  default:
  case 'undefined':
  case 'number':
  case 'boolean':
  case 'symbol':
    break;
  }
  return policy;
}
_global.A = class A {
  constructor() {}
  static staticMethod() {}
  static staticMethod2() {}
  instanceMethod() {}
  instanceMethod2() {}
}
_global.B = class B extends A {
  constructor() { super(); }
  static staticMethod() {}
  static staticMethod2() {}
  instanceMethod() {}
  instanceMethod2() {}
}
const policyMap = new WeakMap();
// TODO: getter/setter handling
// TODO: automatic merging of global objects
const mapPolicy = function mapPolicy(policy, object = _global, path = []) {
  switch (typeof policy) {
  case 'object':
    if (policy) {
      if (path.length === 0 && object === _global) {
        policyMap.set(object, policy); // global
      }
      let properties = Object.getOwnPropertyNames(policy).concat(Object.getOwnPropertySymbols(policy));
      for (let property of properties) {
        let value;
        switch (typeof property) {
        case 'string':
          value = object[property];
          switch (typeof value) {
          case 'function':
          case 'object':
            if (value !== null) {
              let _policy = policy[property];
              if (typeof _policy === 'string' && _policy.startsWith('Link:')) {
              }
              else {
                policyMap.set(value, _policy);
                //console.log('policyMap.set(', value, ', ', policy, '[' + property + '] = ', policy[property], ') path = ', path.join('.'));
              }
            }
            break;
          default:
            break;
          }
          switch (typeof policy[property]) {
          case 'object':
            path.push(property);
            mapPolicy(policy[property], object[property], path);
            path.pop();
          }
          break;
        default:
          break;
        }
      }
    }
    break;
  default:
    break;
  }
}
mapPolicy(Policy);
compilePolicy(Policy);
const getPolicy = function getPolicy(object, property) {
  let target = typeof property === 'undefined' ? object : object[property];
  let policy = policyMap.get(target);
  if (policy === undefined && property !== undefined) {
    let _policy = policyMap.get(object);
    if (typeof _policy === 'object' && _policy) {
      policy = _policy[property] || _policy[S_DEFAULT];
      if (policy) {
        if (target instanceof Object) {
          policyMap.set(target, policy);
        }
      }
    }
  }
  if (policy === undefined) {
    let __proto__ = target ? Object.getPrototypeOf(target) : null;
    let __proto__orig = __proto__;
    while (__proto__ && (_protoPolicy = policyMap.get(__proto__)) === undefined) {
      __proto__ = Object.getPrototypeOf(__proto__);
      if (__proto__ === __proto__orig) {
        break;
      }
    }
    if (typeof _protoPolicy === 'object' && _protoPolicy) {
      let instancePolicy = _protoPolicy[S_INSTANCE];
      if (typeof instancePolicy === 'object' && instancePolicy) {
        policy = instancePolicy[property] || instancePolicy[S_DEFAULT];
      }
      else {
        policy = _protoPolicy[property] || _protoPolicy[S_DEFAULT];
      }
      if (policy) {
        switch (typeof target) {
        case 'object':
        case 'function':
          policyMap.set(target, policy);
          break;
        default:
          break;
        }
      }
    }
  }
  if (typeof policy === 'object' && policy) {
    return policy;
  }
}

const objects = [
  [ [A], 'A' ],
  [ [A.prototype], 'A.prototype' ],
  [ [new A()], 'new A()' ],
  [ [(new A()).instanceMethod], '(new A()).instanceMethod' ],
  [ [(new A()), 'instanceProperty'], '(new A()).instanceProperty' ],
  [ [A.staticMethod], 'A.staticMethod' ],
  [ [A.staticMethod.apply], 'A.staticMethod.apply' ],
  [ [(new A()).hasOwnProperty], '(new A()).hasOwnProperty' ],
  [ [Symbol, 'hasInstance'], 'Symbol.hasInstance' ],
  [ [Symbol.hasInstance, 'toString'], 'Symbol.hasInstance.toString' ],
  [ [Symbol, 'unscopables'], 'Symbol.unscopables' ],
  [ [Symbol.unscopables, 'toString'], 'Symbol.unscopables.toString' ],
  [ [Symbol.for], 'Symbol.for' ],
  [ [[]], '[]' ],
  [ [Array.isArray], 'Array.isArray' ],
  [ [[].map], '[].map' ],
  [ [['a'], 0], '[\'a\'][0]' ], // TODO: Array.prototype.Symbol(instance).Symbol(default).Symbol(policy) is expected
];
for (let obj of objects) {
  console.log('getPolicy(' + obj[1] + ') = ' + getPolicy(...obj[0])[S_POLICY]());
}
