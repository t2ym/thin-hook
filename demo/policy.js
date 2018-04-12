/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const S_POLICY = Symbol('policy');
const S_DEFAULT = Symbol('default');
const S_INSTANCE = Symbol('instance');
const S_TEMPLATE = Symbol('template');
const _global = new Function('return this')();
const Policy = {
  $__proto__$: 'Link:Policy.Window.prototype',
  [S_DEFAULT]: {
    [S_POLICY]() {},
  },
  window: 'Link:Policy',
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
        toString: {
          $__proto__$: 'Link:Policy.Function.prototype',
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
      $__proto__$: 'Link:Policy.Symbol.prototype',
      [S_POLICY]() {},
    },
    unscopables: {
      $__proto__$: 'Link:Policy.Symbol.prototype',
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
      [S_INSTANCE]: {
        [S_DEFAULT]: {
          [S_POLICY]() {},
        },
        toString: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
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
        map: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
        forEach: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
      },
      map: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
      forEach: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
    },
  },
  NodeList: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
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
        forEach: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
      },
      forEach: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
    },
  },
  A: {
    $__proto__$: 'Link:Policy.Function.prototype',
    [S_POLICY]() {},
    [S_DEFAULT]: {
      [S_POLICY]() {},
    },
    staticMethod: {
      $__proto__$: 'Link:Policy.Function.prototype',
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
      },
      instanceMethod: {
        $__proto__$: 'Link:Policy.Function.prototype',
        constructor: 'Link:Policy.Function',
        [S_POLICY]() {},
      },
      instanceProperty: {
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
    [Symbol.hasInstance]: {
      $__proto__$: 'Link:Policy.Function.prototype',
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
      },
      instanceMethod: {
        $__proto__$: 'Link:Policy.Function.prototype',
        constructor: 'Link:Policy.Function',
        [S_POLICY]() {},
      },
      instanceProperty: {
        [S_POLICY]() {},
      },
    },
  },
  moduleA: {
    $__proto__$: 'Link:Policy.Object.prototype',
    classA: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      staticMethodA: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
      prototype: {
        $__proto__$: 'Link:Policy.Object.prototype',
        constructor: 'Link:Policy.moduleA.classA',
        [S_POLICY]() {},
        instanceMethodA: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
      },
    },
  },
  moduleB: {
    $__proto__$: 'Link:Policy.Object.prototype',
    classA: {
      $__proto__$: 'Link:Policy.Function.prototype',
      [S_POLICY]() {},
      [S_DEFAULT]: {
        [S_POLICY]() {},
      },
      staticMethodA: {
        $__proto__$: 'Link:Policy.Function.prototype',
        [S_POLICY]() {},
      },
      prototype: {
        $__proto__$: 'Link:Policy.Object.prototype',
        constructor: 'Link:Policy.moduleB.classA',
        [S_POLICY]() {},
        instanceMethodA: {
          $__proto__$: 'Link:Policy.Function.prototype',
          [S_POLICY]() {},
        },
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
  console.log('policyFunctionGenerator:', policyPath);
  return function (f, thisArg, args, context, newTarget) {
    /*
    if (f === '.') {
      console.log('thisArg = ', thisArg, 'property = ', args[0], 'path =', policyPath);
    }
    else {
      console.log('f = ', f, 'path =', policyPath);
    }
    */
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
  static [Symbol.hasInstance](instance) { return instance instanceof Object; }
  instanceMethod() {}
  instanceMethod2() {}
}
class classA {
  static staticMethodA() {}
  static staticMethodB() {}
  instanceMethodA() {}
  instanceMethodB() {}
};
class PolicyMap extends WeakMap {
  constructor() {
    super();
    this[S_DEFAULT] = Policy[S_DEFAULT];
  }
  set(key, value) {
    let set;
    if (super.has(key)) {
      set = super.get(key);
      if (set instanceof Set) {
        set.add(value);
      }
      else {
        if (set !== value) {
          set = (new Set()).add(set).add(value);
          super.set(key, set);
        }
      }
    }
    else {
      set = value;
      super.set(key, set);
    }
    return this;
  }
};
const policyMap = new PolicyMap();
// TODO: getter/setter handling
// TODO: automatic merging of global objects
const mapPolicy = function mapPolicy(policy, object, path = []) {
  switch (typeof policy) {
  case 'object':
    if (policy) {
      if (typeof object === 'object' && object) {
        policyMap.set(object, policy);
        console.log('policyMap.set(', object, ', ', policy, ' path = ', path.join('.'));
      }
      if (typeof object === 'undefined') {
        break;
      }
      let properties = Object.getOwnPropertyNames(policy).concat(Object.getOwnPropertySymbols(policy));
      for (let property of properties) {
        let value;
        switch (typeof property) {
        case 'string':
          if (property === '__proto__' || property === 'constructor') {
            break;
          }
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
                console.log('policyMap.set(', value, ', ', policy, '[' + property + '] = ', policy[property], ') path = ', path.join('.'));
              }
            }
            break;
          case 'symbol':
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
        case 'symbol':

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
mapPolicy(Policy, _global);
compilePolicy(Policy);
_global.moduleA = {
  classA: classA,
};
_global.moduleB = {
  classA: classA,
};
mapPolicy(Policy.moduleA, _global.moduleA, ['moduleA']);
mapPolicy(Policy.moduleB, _global.moduleB, ['moduleB']);
let defaultPolicy = policyMap[S_DEFAULT];
const applyPolicy = function applyPolicy(object, property, expected, actual) {
  /*
  let propertyValue;
  let propertyPolicy; 

  if (typeof property !== 'undefined') {
    propertyValue = object[property];
    if (propertyValue instanceof Object) {
      propertyPolicy = policyMap.get(propertyValue);
      if (propertyPolicy) {

      }
    }
  }
  */
  let objectPolicySet = policyMap.get(object);
  let isChained = false;
  let result = true;
  if (!objectPolicySet) {
    let __proto__;
    switch (typeof object) {
    default:
    case 'object':
    case 'function':
      __proto__ = object.__proto__;
      break;
    case 'string':
      __proto__ = String.prototype;
      break;
    case 'symbol':
      __proto__ = Symbol.prototype;
      break;
    case 'number':
      __proto__ = Number.prototype;
      break;
    case 'boolean':
      __proto__ = Boolean.prototype;
      break;
    case 'undefined':
      __proto__ = null;
      break;
    }
    objectPolicySet = policyMap.get(__proto__);
    isChained = true; // TODO: handle undefined properly
    if (!objectPolicySet) {
      __proto__ = __proto__.__proto__;
      while (__proto__) {
        objectPolicySet = policyMap.get(__proto__);
        if (objectPolicySet) {
          break;
        }
        __proto__ = __proto__.__proto__;
      }
    }
    if (objectPolicySet && object instanceof Object) {
      policyMap.set(object, objectPolicySet);
    }
  }
  if (!objectPolicySet) {
    objectPolicySet = defaultPolicy;
    if (objectPolicySet && object instanceof Object) {
      policyMap.set(object, objectPolicySet);
    }
  }
  let objectPolicyIterator;
  let objectPolicy;
  let policyPath;
  if (objectPolicySet instanceof Set) {
    objectPolicyIterator = objectPolicySet.values();
    objectPolicy = objectPolicyIterator.next().value;
    if (typeof property !== 'undefined') {
      while (objectPolicy) {
        propertyPolicy = objectPolicy[property] || objectPolicy[S_DEFAULT];
        if (propertyPolicy) {
          policyPath = propertyPolicy[S_POLICY]('.', object, [ property ], 'context', undefined, isChained);
          if (expected && !expected.includes(policyPath)) {
            if (!actual.includes(policyPath)) {
              actual.push(policyPath);
            }
            result = false;
          }
        }
        else {
          console.error('Cannot find a policy', object, property);
        }
        objectPolicy = objectPolicyIterator.next().value;
      }
    }
    else {
      while (objectPolicy) {
        policyPath = objectPolicy[S_POLICY]('.', object, [ property ], 'context', undefined, isChained);
        if (expected && !expected.includes(policyPath)) {
          if (!actual.includes(policyPath)) {
            actual.push(policyPath);
          }
          result = false;
        }
        objectPolicy = objectPolicyIterator.next().value;
      }
    }
  }
  else {
    objectPolicy = objectPolicySet;
    if (typeof property !== 'undefined') {
      propertyPolicy = objectPolicy[property] || objectPolicy[S_DEFAULT];
      if (propertyPolicy) {
        policyPath = propertyPolicy[S_POLICY]('.', object, [ property ], 'context', undefined, isChained);
        if (expected && !expected.includes(policyPath)) {
          if (!actual.includes(policyPath)) {
            actual.push(policyPath);
          }
          result = false;
        }
      }
      else {
        console.error('Cannot find a policy', object, property);
      }
    }
    else {
      policyPath = objectPolicy[S_POLICY]('.', object, [ property ], 'context', undefined, isChained);
      if (expected && !expected.includes(policyPath)) {
        if (!actual.includes(policyPath)) {
          actual.push(policyPath);
        }
        result = false;
      }
    }
  }
  return result;
}

const objects = [
  [ [A], 'A', ['A.Symbol(policy)'] ],
  [ [window, 'A'], 'window.A', ['A.Symbol(policy)']],
  [ [A, 'prototype'], 'A.prototype', ['A.prototype.Symbol(policy)'] ],
  [ [new A()], 'new A()', ['A.prototype.Symbol(policy)'] ],
  [ [(new A()), 'instanceMethod'], '(new A()).instanceMethod', ['A.prototype.instanceMethod.Symbol(policy)'] ],
  [ [(new A()), 'instanceProperty'], '(new A()).instanceProperty', ['A.prototype.instanceProperty.Symbol(policy)'] ],
  [ [A, 'staticMethod'], 'A.staticMethod property', ['A.staticMethod.Symbol(policy)'] ],
  [ [A.staticMethod], 'A.staticMethod object', ['A.staticMethod.Symbol(policy)'] ],
  [ [A.staticMethod, 'apply'], 'A.staticMethod.apply', ['Function.prototype.apply.Symbol(policy)'] ],
  [ [(new A()), 'hasOwnProperty'], '(new A()).hasOwnProperty', ['Object.prototype.hasOwnProperty.Symbol(policy)'] ],
  [ [Symbol, 'hasInstance'], 'Symbol.hasInstance', ['Symbol.hasInstance.Symbol(policy)'] ],
  [ [Symbol.hasInstance, 'toString'], 'Symbol.hasInstance.toString', ['Symbol.prototype.toString.Symbol(policy)'] ],
  [ [Symbol, 'unscopables'], 'Symbol.unscopables', ['Symbol.unscopables.Symbol(policy)'] ],
  [ [Symbol.unscopables, 'toString'], 'Symbol.unscopables.toString', ['Symbol.prototype.toString.Symbol(policy)'] ],
  [ [Symbol, 'for'], 'Symbol.for', ['Symbol.for.Symbol(policy)'] ],
  [ [[]], '[]', ['Array.prototype.Symbol(policy)'] ],
  [ [Array, 'isArray'], 'Array.isArray property', ['Array.isArray.Symbol(policy)'] ],
  [ [Array.isArray], 'Array.isArray object', ['Array.isArray.Symbol(policy)'] ],
  [ [[], 'map'], '[].map', ['Array.prototype.map.Symbol(policy)'] ],
  [ [[], 'forEach'], '[].forEach property', ['Array.prototype.forEach.Symbol(policy)'] ],
  [ [[].forEach], '[].forEach object', ['Array.prototype.forEach.Symbol(policy)','NodeList.prototype.forEach.Symbol(policy)'] ],
  [ [B.__proto__, 'constructor' ], 'B.__proto__.constructor property', ['Function.Symbol(policy)'] ],
  [ [B.__proto__.constructor ], 'B.__proto__.constructor object', ['Function.Symbol(policy)'] ],
  [ [new B(), 'constructor' ], 'new B().constructor', ['B.Symbol(policy)'] ],
  [ [['a'], 0], '[\'a\'][0]', ['Array.prototype.Symbol(default).Symbol(policy)'] ],
  [ [B, Symbol.hasInstance], 'B[Symbol.hasInstance]', ['B.Symbol(Symbol.hasInstance).Symbol(policy)'] ],
  [ [moduleA, 'classA' ], 'moduleA.classA property', ['moduleA.classA.Symbol(policy)'] ],
  [ [moduleA.classA], 'moduleA.classA object', ['moduleA.classA.Symbol(policy)', 'moduleB.classA.Symbol(policy)'] ],
  [ [moduleB, 'classA' ], 'moduleB.classA', ['moduleB.classA.Symbol(policy)'] ],
  [ [moduleA.classA, 'staticMethodA'], 'moduleA.classA.staticMethodA property', ['moduleA.classA.staticMethodA.Symbol(policy)', 'moduleB.classA.staticMethodA.Symbol(policy)'] ],
  [ [moduleA.classA.staticMethodA], 'moduleA.classA.staticMethodA object', ['moduleA.classA.staticMethodA.Symbol(policy)', 'moduleB.classA.staticMethodA.Symbol(policy)'] ],
];
for (let obj of objects) {
  let f, thisArg, args, context, newTarget;
  if (obj[0].length > 1) {
    f = '.';
    thisArg = obj[0][0];
    args = [ obj[0][1] ];
  }
  else {
    f = obj[0][0];
    thisArg = null;
    args = [];
  }
  context = 'context';
  newTarget = undefined;
  {
    let it = 10000000;
    let object = obj[0][0];
    let property = obj[0][1];
    let expected = obj[2];
    let actual = [];
    let result = true;
    let start = Date.now();
    result = applyPolicy(object, property, expected, actual);
    for (let i = 1; i < it; i++) {
      applyPolicy(object, property);
    }
    let end = Date.now();
    console[result ? 'log' : 'error'](
      ('        ' + (new Intl.NumberFormat()).format(parseInt(1000 * it / (end - start)))).substr(-12) + ' op/s',
      ('        ' + (new Intl.NumberFormat()).format(parseInt(1000000 * (end - start) / it))).substr(-6) + ' ns/op',
      result,
      obj[1],
      expected.join(','), 
      (result ? '' : 'actual = ' + actual.join(',')));
  }
}
`
__hook__acl
| 65.0.3325.181 | 0.0.228 | 2,077,274 | 2,083,333 | 1,608,234 | 8,928,571 |
__hook__min
| 65.0.3325.181 | 0.0.228 | 19,801,980 | 16,977,928 | 14,727,540 | 15,105,740 |
`;
/*
TODOs:
  - [S_INSTANCE] and isChained
  - Policy scopes:
    - object policy
    - property policy
    - value policy
  - Property mutations and policyMap updates
  - Policy function parameters
  - Normalization in policy functions
  - Context-to-Policy mapping
  - and many more
*/

/*
let m = {
  navigator: { Policy.navigator, Policy.clientInformation },
  navigator.serviceWorker: { Policy.navigator.serviceWorker, Policy.clientInformation[S_DEFAULT] },
  window: { 'window', 'self', 'top', 'frame' },
  Array.prototype: { Policy.Array.prototype },
  Array.prototype.forEach: { Policy.Array.prototype.forEach, Policy.NodeList.prototype.forEach },
  NodeList.prototype: { Policy.NodeList.prototype },
};
*/