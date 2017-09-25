/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  var callTree = [['Phrases']];
  // { id: label: group: }
  const data = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  const data2 = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  var callTreeLastLength = callTree.length;
  var counter = 0;
  var calleeErrorCounter = 0;
  var log = [];
  var contexts = {};
  var globalPropertyContexts = {};
  var locationContexts = {};
  var contextTransitions = {};
  var contextReverseTransitions = {};
  var lastContext;
  var contextStack = [];
  var contextStackLog = {};
  var callbacks = {};
  var reverseCallbacks = {};
  var pseudoContextArgument = Symbol('callback context');
  var callbackFunctions = new WeakMap();
  _global = typeof window === 'object' ? window : self;
  Object.defineProperty(_global, '_global', { configurable: false, enumerable: false, writable: false, value: _global });
  _global._data = data;
  _global._data2 = data2;
  var _globalPropertyDescriptors = {};
  {
    let o = _global;
    while (o) {
      Object.assign(_globalPropertyDescriptors, Object.getOwnPropertyDescriptors(_global));
      o = Object.getPrototypeOf(o);
    }
  }
  var _globalMethods = new Map();
  const excludedGlobalProperties = { isSecureContext: true };
  var _globalObjects = Object.keys(_globalPropertyDescriptors)
    .sort()
    .reduce((acc, curr) => {
      const globalObjectNames = ['_global', 'frames', 'top', 'global', 'self', 'window'];
      //const globalProperties = { history: true, navigator: true, applicationCache: true, crypto: true, localStorage: true, indexedDB: true, caches: true, sessionStorage: true, document: true };
      if (_globalPropertyDescriptors[curr].value && typeof _globalPropertyDescriptors[curr].value !== 'number') {
        let existing = acc.get(_globalPropertyDescriptors[curr].value);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (globalObjectNames.indexOf(existing) < globalObjectNames.indexOf(curr)) {
            acc.set(_globalPropertyDescriptors[curr].value, curr);
            let properties = Object.getOwnPropertyDescriptors(_globalPropertyDescriptors[curr].value);
            let prop;
            for (prop in properties) {
              if (typeof properties[prop].value === 'function') {
                _globalMethods.set(properties[prop].value, [curr, prop]);
              }
            }
          }
        }
        else if (!existing || (existing.length > curr.length)) {
          acc.set(_globalPropertyDescriptors[curr].value, curr);
          let properties = Object.getOwnPropertyDescriptors(_globalPropertyDescriptors[curr].value);
          let prop;
          for (prop in properties) {
            if (typeof properties[prop].value === 'function') {
              _globalMethods.set(properties[prop].value, [curr, prop]);
            }
          }
          if (_globalPropertyDescriptors[curr].value.prototype) {
            properties = Object.getOwnPropertyDescriptors(_globalPropertyDescriptors[curr].value.prototype);
            for (prop in properties) {
              if (typeof properties[prop].value === 'function') {
                _globalMethods.set(properties[prop].value, [curr, 'prototype', prop]);
              }
            }
          }
        }
      }
      else if (_globalPropertyDescriptors[curr].get && typeof _globalPropertyDescriptors[curr].get === 'function' && _global[curr] && !_globalPropertyDescriptors[curr].set) {
        let existing = acc.get(_global[curr]);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (globalObjectNames.indexOf(existing) < globalObjectNames.indexOf(curr)) {
            if (_global[curr]) {
              acc.set(_global[curr], curr);
              let properties = Object.getOwnPropertyDescriptors(_global[curr]);
              let prop;
              for (prop in properties) {
                if (typeof properties[prop].value === 'function') {
                  _globalMethods.set(properties[prop].value, [curr, prop]);
                }
              }
            }
          }
        }
        else if (!existing || (existing.length > curr.length)) {
          if (!excludedGlobalProperties[curr]) {
            acc.set(_global[curr], curr);
            let properties = Object.getOwnPropertyDescriptors(_global[curr]);
            let prop;
            for (prop in properties) {
              if (typeof properties[prop].value === 'function') {
                _globalMethods.set(properties[prop].value, [curr, prop]);
              }
            }
            if (_global[curr].prototype) {
              properties = Object.getOwnPropertyDescriptors(_global[curr].prototype);
              for (prop in properties) {
                if (typeof properties[prop].value === 'function') {
                  _globalMethods.set(properties[prop].value, [curr, 'prototype', prop]);
                }
              }
            }
          }
        }
      }
      return acc;
    }, new Map());
  var _objectStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Object);
  var _objectPropertyDescriptors = Object.getOwnPropertyDescriptors(Object.prototype);
  var _arrayStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Array);
  var _arrayPropertyDescriptors = Object.getOwnPropertyDescriptors(Array.prototype);
  var _stringStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(String);
  var _stringPropertyDescriptors = Object.getOwnPropertyDescriptors(String.prototype);
  var _functionStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Function);
  var _functionPropertyDescriptors = Object.getOwnPropertyDescriptors(Function.prototype);
  var globalObjectAccess = {};
  var _blacklistObjects = {};
  /*
  {
    caches: true,
    navigator: {
      serviceWorker: true,
      usb: true,
      geolocation: true,
    },
    location: {
      reload: true,
      $__proto__$: true,
    },
    DummyClass: true,
    DummyClass2: {
      isDummy: true,
      dummyMethod: true,
    }
  };
  Object.assign(_blacklistObjects, { window: _blacklistObjects, self: _blacklistObjects });
  */
  const _boundFunctions = new WeakMap();
  const _escapePlatformProperties = new Map();
  const _unescapePlatformProperties = new Map();
  Object.getOwnPropertyNames(Object.prototype).concat(['prototype']).forEach(n => {
    _escapePlatformProperties.set(n, '$' + n + '$');
    _unescapePlatformProperties.set('$' + n + '$', n);
  });
  const S_GLOBAL = Symbol('global'); // global object
  const S_PROTOTYPE = Symbol('prototype'); // prototype object
  const S_DEFAULT = Symbol('default'); // default policy
  const S_OBJECT = Symbol('object'); // parent object
  const S_FUNCTION = Symbol('function'); // function
  const S_CONSTRUCT = Symbol('construct'); // new operation
  const S_UNSPECIFIED = Symbol('unspecified'); // no property is specified
  const S_ALL = Symbol('all properties'); // all properties are specified
  const S_TARGETED = Symbol('targeted properties'); // properties are targeted
  const operatorNormalizer = {
    '.': '.',
    '[]': '.',
    'in': '.',
    '*': '*',
    '()': '()',
    'p++': '=',
    '++p': '=',
    'p--': '=',
    '--p': '=',
    'delete': '=',
    '=': '=',
    '+=': '=',
    '-=': '=',
    '*=': '=',
    '/=': '=',
    '%=': '=',
    '**=': '=',
    '<<=': '=',
    '>>=': '=',
    '>>>=': '=',
    '&=': '=',
    '^=': '=',
    '|=': '=',
    's.': '.',
    's[]': '.',
    's()': '()',
    's++': '=',
    '++s': '=',
    's--': '=',
    '--s': '=',
    's=': '=',
    's+=': '=',
    's-=': '=',
    's*=': '=',
    's/=': '=',
    's%=': '=',
    's**=': '=',
    's<<=': '=',
    's>>=': '=',
    's>>>=': '=',
    's&=': '=',
    's^=': '=',
    's|=': '=',
  };
  const targetNormalizer = {
    'f': 'xtf', // thisArg may not be this object for f
    'n': 'xfN',
    '.': 'rtp',
    '*': 'rt*',
    '=': 'wtpv',
    '()': {
      Object: {
        [S_DEFAULT]: 'xtp',
        create: 'r0-',
        getOwnPropertyDescriptor: 'r01',
        getOwnPropertyDescriptors: 'r0*',
        getOwnPropertyNames: 'r0*',
        getOwnPropertySymbols: 'r0*',
        getPrototypeOf: 'r0P',
        keys: 'r0*',
        entries: 'r0*',
        values: 'r0*',
        defineProperty: 'w01v',
        defineProperties: 'w0.v',
        setPrototypeOf: 'w0P',
        freeze: 'w0*',
        seal: 'w0*',
        assign: 'w0.v',
        [S_PROTOTYPE]: {
          [S_DEFAULT]: 'xtp',
          $hasOwnProperty$: 'rt0',
          $__lookupGetter__$: 'rt0',
          $__lookupSetter__$: 'wt0',
          $__defineGetter__$: 'wt0',
          $__defineSetter__$: 'wt0',
          $propertyIsEnumerable$: 'rt0',
        }
      },
      Reflect: {
        [S_DEFAULT]: 'xtp',
        get: 'r01',
        getPrototypeOf: 'r0P',
        has: 'r01',
        getOwnPropertyDescriptor: 'r01',
        isExtensible: 'r0-',
        ownKeys: 'r0*',
        defineProperty: 'w01v',
        deleteProperty: 'w01',
        set: 'w01v',
        setPrototypeOf: 'w0P',
        preventExtensions: 'w0*',
        construct: 'x0N',
        apply: 'x10',
        [S_PROTOTYPE]: 'xtp'
      },
      Function: {
        [S_DEFAULT]: 'xtp',
        [S_PROTOTYPE]: {
          [S_DEFAULT]: 'xtp',
          apply: 'x0t',
          call: 'x0t',
          bind: 'r0tb',
        }
      },
      [S_DEFAULT]: 'xtp'
    }
  };
  const targetNormalizerMap = new Map();
  for (let t of Object.getOwnPropertyNames(targetNormalizer['()']).concat(Object.getOwnPropertySymbols(targetNormalizer['()']))) {
    let target;
    let f;
    if (typeof t === 'string') {
      if (typeof targetNormalizer['()'][t] === 'object') {
        for (let sp of Object.getOwnPropertyNames(targetNormalizer['()'][t]).concat(Object.getOwnPropertySymbols(targetNormalizer['()'][t]))) {
          if (typeof sp === 'string') {
            target = targetNormalizer['()'][t][sp];
            f = _global[t][_unescapePlatformProperties.get(sp) || sp];
            targetNormalizerMap.set(f, target);
          }
          else if (sp === S_PROTOTYPE) {
            if (typeof targetNormalizer['()'][t][sp] === 'object') {
              for (let p of Object.getOwnPropertyNames(targetNormalizer['()'][t][sp]).concat(Object.getOwnPropertySymbols(targetNormalizer['()'][t][sp]))) {
                if (typeof p === 'string') {
                  target = targetNormalizer['()'][t][sp][p];
                  f = _global[t].prototype[_unescapePlatformProperties.get(p) || p];
                  targetNormalizerMap.set(f, target);
                }
                else if (p === S_DEFAULT) {
                  target = targetNormalizer['()'][t][sp][p];
                  f = _global[t].prototype;
                  targetNormalizerMap.set(f, target);
                }
              }
            }
            else {
              target = targetNormalizer['()'][t][sp];
              f = _global[t].prototype;
              targetNormalizerMap.set(f, target);
            }
          }
          else if (sp === S_DEFAULT) {
            if (typeof targetNormalizer['()'][t][sp] === 'object') {
              for (let p of Object.getOwnPropertyNames(targetNormalizer['()'][t][sp]).concat(Object.getOwnPropertySymbols(targetNormalizer['()'][t][sp]))) {
                if (typeof p === 'string') {
                  target = targetNormalizer['()'][t][sp][p];
                  f = _global[t][_unescapePlatformProperties.get(p) || p];
                  targetNormalizerMap.set(f, target);
                }
                else if (p === S_DEFAULT) {
                  target = targetNormalizer['()'][t][sp][p];
                  f = _global[t];
                  targetNormalizerMap.set(f, target);
                }
              }
            }
            else {
              target = targetNormalizer['()'][t][sp];
              f = _global[t];
              targetNormalizerMap.set(f, target);
            }
          }
        }
      }
      else {
        target = targetNormalizer['()'][t];
        f = _global[t];
        targetNormalizerMap.set(f, target);
      }
    }
    else if (t === S_DEFAULT) {
      if (typeof targetNormalizer['()'][t] === 'object') {
        // TODO
      }
      else {
        target = targetNormalizer['()'][t];
        f = _global;
        targetNormalizerMap.set(f, target);
      }        
    }
  }
  // TODO: Access control list is too hard to maintain. An easier, automated, and modular approach is preferable. 
  const contextNormalizer = {
    '/components/iron-location/iron-location.html,script@1800,_updateUrl': '@route_manipulator',
    '/components/iron-location/iron-location.html,script@1800,_globalOnClick': '@route_manipulator',
    '/components/thin-hook/demo/web-worker-client.js,worker': '@worker_manipulator',
    '/components/thin-hook/demo/web-worker-client.js': '@worker_manipulator',
    '/components/thin-hook/demo/normalize.js': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,f': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,boundF': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,b': '@bind_normalization_checker',
    '/components/dexie/dist/dexie.min.js,r': '@custom_error_constructor_creator',
    '/components/firebase/firebase-app.js': '@custom_error_constructor_creator',
    '/components/firebase/firebase-auth.js,t': '@custom_error_constructor_creator',
    '/components/polymer/lib/utils/templatize.html,script@695,upgradeTemplate': '@template_element_prototype_setter',
    '/components/thin-hook/demo/my-view2.html,script@2513,getData': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2513,attached,_lastEdges': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2513,drawGraph': '@hook_visualizer',
    '/components/web-animations-js/web-animations-next-lite.min.js': '@web_animations_next_lite',
    '/components/polymerfire/firebase-app.html,script@802,__computeApp': '@firebase_app_initializer',
    '/components/live-localizer/live-localizer-browser-storage.html,script@3348,modelReady': '@Dexie_instantiator',
    '/components/deepcopy/build/deepcopy.min.js,u': '@Object_keys_reader',
    '/components/dexie/dist/dexie.min.js,jn': '@Object_keys_reader',
    '/components/dexie/dist/dexie.min.js,Pn': '@Object_getPrototypeOf_reader',
    '/components/firebase/firebase-app.js,p': '@Object_getPrototypeOf_reader',
    '/components/dexie/dist/dexie.min.js,In': '@Object_getOwnPropertyDescriptor_reader',
    '/components/firebase/firebase-auth.js,Xb': '@Object_defineProperty_reader',
    '/components/dexie/dist/dexie.min.js,Cn': '@Object_method_reader',
    '/components/firebase/firebase-database.js,u,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,lt,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,St,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Ut,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Zt,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,ie,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Ln,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Qn,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Er,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,jr,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-database.js,Gr,t': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-messaging.js,k,e': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-messaging.js,P,e': '@Object_setPrototypeOf_reader',
    '/components/polymer/lib/mixins/element-mixin.html,script@926,createPropertyFromConfig': '@Object_static_method_reader', // bug?
    '/components/chai/chai.js': '@custom_error_constructor_creator',
    '/components/chai/chai.js,hasProtoSupport': '@Object__proto__reader',
    '/components/dexie/dist/dexie.min.js,p': '@Object_static_method_user',
  };
  const acl = {
    // blacklist objects/classes
    caches: '---',
    __hook__: '---', // TODO: ineffective
    __unexpected_access_to_hook_callback_function__: '---',
    // blacklist properties
    hook: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: '---',
      [S_ALL]: '---',
      Function: '---',
      eval: '--x',
      setTimeout: '--x',
      setInterval: '--x',
    },
    window: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
      caches: '---',
      __hook__: '---',
      __unexpected_access_to_hook_callback_function__: '---',
      hook: '---',
      _data: {
        [S_DEFAULT]: '---',
        '@hook_visualizer': 'r--',
      },
      _data2: {
        [S_DEFAULT]: '---',
        '@hook_visualizer': 'r--',
      },
      globalObjectAccess: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'r--',
      },
      btoa: {
        [S_DEFAULT]: 'r-x',
        '@normalization_checker': '---',
        '@bind_normalization_checker': 'r--',
      }
    },
    _data: {
      [S_DEFAULT]: '---',
      '@hook_visualizer': 'r--',
    },
    _data2: {
      [S_DEFAULT]: '---',
      '@hook_visualizer': 'r--',
    },
    Reflect: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: '--x',
      '@bind_normalization_checker': 'r-x',
    },
    Object: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: '--x',
      '@Object_static_method_reader': 'r--',
      '@Object_static_method_user': 'r-x',
      '@bind_normalization_checker': 'r-x',
      $__proto__$: 'r--',
      create: 'r-x',
      keys: {
        [S_DEFAULT]: '--x',
        '@Object_keys_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      getPrototypeOf: {
        [S_DEFAULT]: '--x',
        '@Object_getPrototypeOf_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      setPrototypeOf: {
        [S_DEFAULT]: '--x',
        '@Object_setPrototypeOf_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      getOwnPropertyDescriptor: {
        [S_DEFAULT]: '--x',
        '@Object_getOwnPropertyDescriptor_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      defineProperty: {
        [S_DEFAULT]: '--x',
        '@Object_defineProperty_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      $prototype$: 'r--',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'rwx',
        $toString$: 'r-x',
        $__proto__$: { [S_DEFAULT]: 'r-x', },
        $constructor$: { [S_DEFAULT]: 'r-x', },
        $__defineGetter__$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $__defineSetter__$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $__lookupGetter__$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $__lookupSetter__$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $hasOwnProperty$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $isPrototypeOf$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $propertyIsEnumerable$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $toLocaleString$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $toString$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
        $valueOf$: { [S_DEFAULT]: '--x', '@Object_method_reader': 'r-x', },
      }
    },
    navigator: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r--',
      [S_ALL]: '---',
      serviceWorker: '---',
      usb: '---',
      geolocation: '---',
      'a_new_navigator_property': {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rw-',
      },
    },
    // read-only except for manipulators
    location: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r--',
      [S_ALL]: '---',
      reload: '---',
      $__proto__$: '---',
      href: {
        [S_DEFAULT]: 'r--',
        '@route_manipulator': 'rw-',
      }
    },
    // call-only for manipulators
    history: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
      replaceState: {
        [S_DEFAULT]: '---',
        '@route_manipulator': '--x',
      },
      pushState: {
        [S_DEFAULT]: '---',
        '@route_manipulator': '--x',
      }
    },
    Worker: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r--',
      [S_ALL]: '---',
      '@worker_manipulator': 'r-x',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_ALL]: '---',
        '@worker_manipulator': 'rwx',
      }
    },
    Error: {
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: 'r-x',
      [S_ALL]: 'r--',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'rwx',
        [S_ALL]: '---',
        $constructor$: {
          [S_DEFAULT]: 'r-x',
          '@custom_error_constructor_creator': 'rwx',
        },
      }
    },
    HTMLTemplateElement: {
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: 'r--',
      [S_ALL]: 'r--',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'rwx',
        [S_ALL]: '---',
        $__proto__$: {
          [S_DEFAULT]: 'r--',
          '@template_element_prototype_setter': 'rw-',
        },
      }
    },
    Array: {
      [S_DEFAULT]: 'r-x',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'rwx',
        map: {
          [S_DEFAULT]: 'r-x',
          '@bind_normalization_checker': 'r--',
        },
      },
    },
    Function: {
      [S_OBJECT]: '--x',
      [S_DEFAULT]: 'rwx',
      '@bind_normalization_checker': 'r-x',
      $__proto__$: 'r--',
      $prototype$: 'r--',
      $constructor$: 'r-x',
      [S_PROTOTYPE] : {
        [S_DEFAULT]: 'rwx',
        [S_ALL]: 'r--',
        $__proto__$: 'rw-',
        $prototype$: 'rw-',
        $constructor$: 'r-x',
        apply: 'r-x',
        call: 'r-x',
        bind: {
          [S_DEFAULT]: 'r-x',
          '@bind_normalization_checker': '--x',
        }
      },
    },
    btoa: {
      [S_DEFAULT]: 'r-x',
    },
    // blocked private API
    DummyClass: '---',
    DummyClass2: {
      [S_DEFAULT]: 'r-x',
      isDummy: '---',
      dummyMethod: '---',
      dummyMethod2: 'r--',
    },
    UniterableArray: {
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
    },
    // 3rd party API
    firebase: {
      [S_DEFAULT]: 'rwx', // Note: Internal and external accesses are not distinguished
      initializeApp: {
        [S_DEFAULT]: '---', // Note: No others can initialize firebase app
        '@firebase_app_initializer': 'r-x', // Note: polymerfire can solely initialize firebase app
      }
    },
    Dexie: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'rw-', // Note: Internal and external accesses are not distinguished
        '@Dexie_instantiator': 'r-x', // Note: No others can instantiate Dexie
      },
      [S_DEFAULT]: 'rwx', // Note: Internal and external accesses are not distinguished
    },
    SequenceEffect: {
      [S_DEFAULT]: 'r-x',
      '@web_animations_next_lite': 'rwx',
      $prototype$: {
        [S_DEFAULT]: 'r--',
        '@web_animations_next_lite': 'rw-',
      }
    },
    GroupEffect: {
      [S_DEFAULT]: 'r-x',
      '@web_animations_next_lite': 'rwx',
      $prototype$: {
        [S_DEFAULT]: 'r--',
        '@web_animations_next_lite': 'rw-',
      }
    },
    // default for global objects
    [S_GLOBAL]: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'rwx',
      [S_ALL]: 'r--',
      $__proto__$: 'r--',
      $prototype$: 'r--',
      $constructor$: 'r-x',
      [S_PROTOTYPE]: {
        [S_OBJECT]: 'r--',
        [S_DEFAULT]: 'rwx',
        [S_ALL]: 'r--',
        $__proto__$: 'r--',
        $prototype$: 'r--',
        $constructor$: 'r-x',
      }
    },
    // default for non-global objects
    [S_DEFAULT]: {
      [S_OBJECT]: 'rwx',
      [S_DEFAULT]: 'rwx',
      [S_ALL]: 'rwx',
    }
  };
  // protect hook-callback.js variables
  [
    'callTree',
    'callTreeLastLength',
    'counter',
    'calleeErrorCounter',
    'log',
    'contexts',
    'globalPropertyContexts',
    'locationContexts',
    'contextTransitions',
    'contextReverseTransitions',
    'lastContext;',
    'contextStack',
    'contextStackLog',
    'callbacks',
    'reverseCallbacks',
    'pseudoContextArgument',
    'callbackFunctions',
    '_globalPropertyDescriptors',
    '_globalMethods',
    '_globalObjects',
    '_objectStaticPropertyDescriptors',
    '_objectPropertyDescriptors',
    '_arrayStaticPropertyDescriptors',
    '_arrayPropertyDescriptors',
    '_stringStaticPropertyDescriptors',
    '_stringPropertyDescriptors',
    '_functionStaticPropertyDescriptors',
    '_functionPropertyDescriptors',
    '_blacklistObjects',
  ].forEach(n => {
    Object.assign(acl, { [n]: '---' });
    Object.assign(acl.window, { [n]: '---' });
  });
  const opTypeMap = {
    r: 0, w: 1, x: 2
  };
  function applyAcl(name, isStatic, isObject, property, opType, context) {
    let _context, _acl, __acl, _property, tmp;
    while (_context = contextNormalizer[context]) {
      context = _context;
      if (context[0] === '@') {
        break;
      }
    }
    context = _context ? context : S_DEFAULT;
    _acl = name
      ? name === 'Object' && isObject
        ? acl[S_DEFAULT]
        : acl[name] || acl[S_GLOBAL] || acl[S_DEFAULT]
      : acl[S_DEFAULT];
    if (typeof _acl === 'object') {
      if (typeof property === 'undefined' || property === '') {
        _acl = context === S_DEFAULT
          ? _acl[S_OBJECT] || _acl[S_DEFAULT]
          : _acl[context] || _acl[S_OBJECT] || _acl[S_DEFAULT];
      }
      else {
        if (!isStatic) {
          _acl = _acl[S_PROTOTYPE] || _acl;
        }
        if (typeof _acl === 'object') {
          switch (property) {
          case S_ALL:
            _acl = context === S_DEFAULT
              ? _acl[S_ALL] || _acl[S_DEFAULT]
              : _acl[context] || _acl[S_ALL] || _acl[S_DEFAULT];
            if (typeof _acl === 'object') {
              _acl = _acl[S_ALL] || _acl[S_DEFAULT];
            }
            break;
          case S_UNSPECIFIED:
            _acl = _acl[context] || _acl[S_DEFAULT];
            if (typeof _acl === 'object') {
              _acl = _acl[S_DEFAULT];
            }
            break;
          case S_FUNCTION:
            _acl = _acl[context] || _acl[S_DEFAULT];
            if (typeof _acl === 'object') {
              _acl = _acl[S_DEFAULT];
            }
            break;
          default:
            switch (typeof property) {
            case 'string':
            case 'number':
            case 'symbol':
            case 'function':
            case 'boolean':
            case 'undefined':
              _acl = _acl[property] || _acl[context] || _acl[S_DEFAULT];
              if (typeof _acl === 'object') {
                _acl = _acl[context] || _acl[S_DEFAULT];
              }
              break;
            case 'object':
              if (Array.isArray(property)) {
                tmp = [];
                for (_property of property) {
                  __acl = _acl[_property] || _acl[context] || _acl[S_DEFAULT];
                  if (typeof __acl === 'object') {
                    __acl = __acl[context] || __acl[S_DEFAULT];
                  }
                  tmp.push(__acl);
                }
                _acl = tmp;
              }
              else {
                _acl = _acl[property] || _acl[context] || _acl[S_DEFAULT];
                if (typeof _acl === 'object') {
                  _acl = _acl[context] || _acl[S_DEFAULT];
                }
              }
              break;
            default:
              _acl = '---';
              break;
            }
            break;
          }
        }
      }
    }
    switch (typeof _acl) {
    case 'string':
      return _acl[opTypeMap[opType]] === opType;
    case 'object':
      tmp = opTypeMap[opType];
      for (__acl of _acl) {
        if (__acl[tmp] !== opType) {
          return false;
        }
      }
      return true;
    case 'undefined':
    default:
      return false;
    }
  }
  Object.defineProperty(_global, '__hook__', { configurable: false, enumerable: false, writable: false, value: function __hook__(f, thisArg, args, context, newTarget) {
    counter++;
    if (args[0] === pseudoContextArgument) {
      return context;
    }
    let _lastContext = lastContext;
    //#PROFILE function setContexts() {
    if (!contexts[context]) {
      let group = context.split(/[,:]/)[0];
      let node = { id: context, label: context, group: group };
      data.nodes.push(node);
    }
    contexts[context] = true;
    //#PROFILE }
    //#PROFILE setContexts();
    //#PROFILE function registerAsyncCallback() {
    if ((context === 'setTimeout' || context === 'setInterval' || context.indexOf('Promise') === 0 || context === 'EventTarget,addEventListener') && args) {
      for(let i = 0; i < 2; i++) {
        if (typeof args[i] === 'function') {
          let cbContext = callbackFunctions.get(args[i]);
          if (typeof cbContext === 'undefined') {
            cbContext = args[i].toString().indexOf('__hook__') >= 0;
            if (cbContext) {
              cbContext = args[i](pseudoContextArgument);
            }
            callbackFunctions.set(args[i], cbContext);
          }
          if (cbContext) {
            reverseCallbacks[lastContext] = reverseCallbacks[lastContext] || {};
            reverseCallbacks[lastContext][context] = reverseCallbacks[lastContext][context] || {};
            if (!reverseCallbacks[lastContext][context][cbContext]) {
              let edge = { from: lastContext, to: cbContext, label: context, dashes: true, arrows: 'to' };
              data.edges.push(edge);
            }
            reverseCallbacks[lastContext][context][cbContext] = args[i];
            callbacks[cbContext] = callbacks[cbContext] || {};
            callbacks[cbContext][context] = callbacks[cbContext][context] || {};
            callbacks[cbContext][context][lastContext] = args[i];
            //console.log('Registering CALLBACK ' + lastContext + ' -> ' + context + ' -> callback ' + cbContext, args[i]);
          }
        }
        else if (i === 0 && (context === 'setTimeout' || context === 'setInterval') && typeof args[i] === 'string') {
          let lines = args[i].split(/\n/);
          let match = lines[lines.length - 1].match(/}, this, args, '([^']*)'\)\)\)\(\);/);
          if (match) {
            let cbContext = match[1];
            reverseCallbacks[lastContext] = reverseCallbacks[lastContext] || {};
            reverseCallbacks[lastContext][context] = reverseCallbacks[lastContext][context] || {};
            reverseCallbacks[lastContext][context][cbContext] = args[i];
            callbacks[cbContext] = callbacks[cbContext] || {};
            callbacks[cbContext][context] = callbacks[cbContext][context] || {};
            callbacks[cbContext][context][lastContext] = args[i];
            //console.log('Registering CALLBACK script ' + lastContext + ' -> ' + context + ' -> callback script ' + cbContext, args[i]);
          }
        }
      }
    }
    //#PROFILE }
    //#PROFILE registerAsyncCallback();
    //#PROFILE function registerContextTransition() {
    lastContext = context;
    contextStack.push(context);
    //contextStackLog[contextStack.join(' -> ')] = true;
    contextTransitions[_lastContext] = contextTransitions[_lastContext] || {};
    if (!contextTransitions[_lastContext][context]) {
      if (_lastContext) {
        let edge = { from: _lastContext, to: context, arrows: 'to' };
        data.edges.push(edge);
      }
      else {
        if (callbacks[context]) {
          // async callback
        }
        else {
          let edge = { from: 'undefined', to: context, arrows: 'to' };
          data.edges.push(edge);
        }
      }
    }
    contextTransitions[_lastContext][context] = true;
    contextReverseTransitions[context] = contextReverseTransitions[context] || {};
    contextReverseTransitions[context][_lastContext] = true;
    //#PROFILE }
    //#PROFILE registerContextTransition();

    /*
    if (callbacks[context]) {
      let c = 0;
      for (let asyncEventContext in callbacks[context]) {
        for (let callerContext in callbacks[context][asyncEventContext]) {
          c++;
          //console.log('Async CALLBACK ' + callerContext + ' -> ' + asyncEventContext + ' -> ' + context);
        }
      }
      if (c !== 1) {
        //console.log('CALLBACK with possibility of ' + c + ' multiple callers for ' + context);
      }
    }
    */

    let _f = f;
    let boundParameters = _boundFunctions.get(f);
    if (boundParameters) {
      if (!boundParameters._args) {
        // Merge multiple binding operations
        let _boundParametersList = [boundParameters];
        let _normalizedThisArg = boundParameters.normalizedThisArg;
        let _originalF = boundParameters.f;
        let _boundParameters = _boundFunctions.get(boundParameters.f);
        let _args;
        if (_boundParameters) {
          while (_boundParameters) {
            _boundParametersList.push(_boundParameters);
            _boundParameters = _boundFunctions.get(_boundParameters.f);
          }
          // _boundParametersList = [lastBind, ..., firstBind]
          _args = [];
          _normalizedThisArg = _boundParametersList[_boundParametersList.length - 1].normalizedThisArg;
          _originalF = _boundParametersList[_boundParametersList.length - 1].f;
          while (_boundParameters = _boundParametersList.pop()) {
            if (!_boundParameters._normalizedThisArg) {
              _boundParameters._normalizedThisArg = _normalizedThisArg;
            }
            if (!_boundParameters._originalF) {
              _boundParameters._f = _originalF;
            }
            if (_boundParameters._args) {
              _args = _boundParameters._args;
            }
            else {
              _boundParameters._args = _args = _args.concat(_boundParameters.args);
            }
          }
        }
        else {
          boundParameters._args = boundParameters.args;
          boundParameters._normalizedThisArg = _normalizedThisArg;
          boundParameters._f = _originalF;
        }
      }
      _f = '()';
    }
    if (typeof _f === 'string') {
      //#PROFILE function normalizeOperation() {
      /*
      if (context === '/components/thin-hook/demo/my-view2.html,script@2442,getData' && _f === '()' && args[0] === 'bind') {
        debugger;
      }
      */
      // property access
      let normalizedThisArg = thisArg;
      let _args = args;
      if (boundParameters) {
        normalizedThisArg = boundParameters._normalizedThisArg;
        _args = [ boundParameters._f, boundParameters._args.concat(args) ];
      }
      let name = _globalObjects.get(normalizedThisArg);
      let isStatic = typeof normalizedThisArg === 'function';
      if (boundParameters) {
        isStatic = boundParameters.isStatic;
        name = boundParameters.name;
      }
      let ctor;
      if (!name && _f.indexOf('s') >= 0) {
        //#PROFILE function trackSuperConstructors() {
        ctor = isStatic ? normalizedThisArg : normalizedThisArg.constructor;
        name = _globalObjects.get(ctor);
        while (!name && typeof ctor === 'function') {
          ctor = Object.getPrototypeOf(ctor);
          name = _globalObjects.get(ctor);
        }
        //#PROFILE }
        //#PROFILE trackSuperConstructors();
      }
      if (!name && normalizedThisArg instanceof Object) {
        ctor = normalizedThisArg.constructor;
        name = _globalObjects.get(ctor);
        if (name) {
          isStatic = false;
        }
      }
      let rawProperty = _args[0];
      let property = _escapePlatformProperties.get(rawProperty) || rawProperty;
      let op = operatorNormalizer[_f];
      let target = targetNormalizer[op];
      let opType;
      let globalAssignments = {};
      if (typeof target === 'object') {
        //#PROFILE function targetNormalizerMapGet() {
        if (normalizedThisArg instanceof Object) {
          switch (typeof _args[0]) {
          case 'string':
            if (boundParameters) {
              target = targetNormalizerMap.get(boundParameters._f);
            }
            else {
              target = targetNormalizerMap.get(normalizedThisArg[_args[0]]);
            }
            break;
          case 'function':
            target = targetNormalizerMap.get(_args[0]);
            break;
          default:
            target = undefined;
            break;
          }
          if (!target) {
            let type;
            if (typeof normalizedThisArg === 'object') {
              type = normalizedThisArg.constructor.prototype;
            }
            else {
              type = normalizedThisArg;
            }
            while (!target && type) {
              target = targetNormalizerMap.get(type);
              type = Object.getPrototypeOf(type);
            }
          }
        }
        else if (typeof _args[0] === 'function') {
          target = targetNormalizerMap.get(_args[0]);
        }
        //#PROFILE }
        //#PROFILE targetNormalizerMapGet();
        let argsMap = {
          f: _f,
          t: normalizedThisArg,
          p: _args[0],
          0: _args[1][0],
          1: _args[1][1],
          c: context,
          n: newTarget,
          P: '__proto__',
          T: 'prototype',
          C: 'constructor',
          N: S_CONSTRUCT,
          '-': S_UNSPECIFIED,
          '*': S_ALL,
          '.': S_TARGETED, // { prop1: {}, prop2: {}, ... }
        };
        if (typeof target === 'string') {
          //#PROFILE function applyTargetMap() {
          opType = target[0]; // r, w, x
          let _t = argsMap[target[1]];
          let _p = argsMap[target[2]];
          switch (typeof _t) {
          case 'object':
          case 'string':
          case 'function':
          case 'symbol':
          case 'boolean':
            if (_t === null) {
              break;
            }
            name = _globalObjects.get(_t);
            isStatic = typeof _t === 'function';
            normalizedThisArg = _t;
            if (!name) {
              ctor = _t.constructor;
              name = _globalObjects.get(ctor);
              if (name) {
                isStatic = false;
              }
            }
            if (!name && _f.indexOf('s') >= 0) {
              isStatic = typeof _t === 'function';
              ctor = isStatic ? _t : _t.constructor;
              name = _globalObjects.get(ctor);
              normalizedThisArg = ctor;
              while (!name && typeof ctor === 'function') {
                ctor = Object.getPrototypeOf(ctor);
                name = _globalObjects.get(ctor);
                normalizedThisArg = ctor;
              }
            }
            if (name) {
              property = rawProperty = undefined;
              switch (typeof _p) {
              case 'string':
                rawProperty = _p;
                property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                if (target[3] === 'v') {
                  switch (name) {
                  case 'window':
                  case 'self':
                    switch (target) {
                    case 'w01v':
                      switch (_args[0]) {
                      case 'defineProperty': // Object.defineProperty(window, 'property', { value: v }); Reflect.defineProperty(window, 'property', { value: v })
                        if (_args[1][2] && _args[1][2].value instanceof Object) {
                          globalAssignments[rawProperty] = _args[1][2].value;
                        }
                        break;
                      case 'set': // Reflect.set(window, 'property', v)
                        if (_args[1][2] instanceof Object) {
                          globalAssignments[rawProperty] = _args[1][2];
                        }
                        break;
                      default:
                        break;
                      }
                      break;
                    case 'w0.v':
                      let props;
                      switch (_args[0]) {
                      case 'defineProperties': // Object.defineProperties(window, { 'property': { value: v } })
                        props = _args[1][1];
                        for (let p in props) {
                          if (props[p] && props[p].value instanceof Object) {
                            globalAssignments[p] = props[p].value;
                          }
                        }
                        break;
                      case 'assign': // Object.assign(window, { 'property': v })
                        for (let i = 1; i < _args[1].length; i++) {
                          props = _args[1][i];
                          if (props instanceof Object) {
                            for (let p in props) {
                              if (props[p] instanceof Object) {
                                globalAssignments[p] = props[p];
                              }
                            }
                          }
                        }
                        break;
                      default:
                        break;
                      }
                      break;
                    default:
                      break;
                    }
                    break;
                  default:
                    break;
                  }
                }
                break;
              case 'number':
              case 'boolean':
              case 'undefined':
                property = rawProperty = _p;
                break;
              case 'symbol':
                switch (_p) {
                case S_UNSPECIFIED:
                  property = _p;
                  break;
                case S_TARGETED:
                  if (_args[1][1] instanceof Object) {
                    rawProperty = [];
                    for (let i = 1; i < _args[1].length; i++) {
                      // TODO: Are inherited properties targeted?
                      rawProperty = rawProperty.concat(Object.keys(_args[1][i]));
                    }
                    property = rawProperty.map(p => _escapePlatformProperties.get(p) || p);
                  }
                  break;
                case S_ALL:
                  property = _p;
                  break;
                case S_CONSTRUCT:
                  rawProperty = 'constructor';
                  property = S_UNSPECIFIED;
                  break;
                default:
                  property = rawProperty = _p;
                  break;
                }
                break;
              case 'function':
                if (normalizedThisArg === _global) {
                  let _globalObj = _globalObjects.get(_p);
                  if (_globalObj) {
                    rawProperty = _globalObj;
                    property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                  }
                  else {
                    property = rawProperty = S_FUNCTION;
                  }
                }
                else {
                  let _method = _globalMethods.get(_p);
                  if (_method) {
                    if (_method[0] === name) {
                      rawProperty = _method[_method.length - 1];
                      property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                    }
                    else {
                      name = _method[0]; // Overwrite name, e.g., Array.prototype.map.call(document.querySelectorAll('div'), (node) => node.name); 'NodeList' is overwritten by 'Array'
                      rawProperty = _method[_method.length - 1];
                      property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                    }
                  }
                  else {
                    property = rawProperty = S_FUNCTION;
                  }
                }
                break;
              case 'object':
                property = rawProperty = _p; // TODO: proper handling
                break;
              default:
                break;
              }
            }
            break;
          case 'undefined':
            break;
          case 'number': // TODO: proper handling
            break;
          default:
            break;
          }
          //#PROFILE }
          //#PROFILE applyTargetMap();
        }
      }
      else if (typeof target === 'string') {
        opType = target[0];
        if (target[2] === '*') {
          property = rawProperty = S_ALL;
        }
        switch (name) {
        case 'window':
        case 'self':
          if (target === 'wtpv') { // window.property = v
            if (_f === '=' && _args[1] instanceof Object) {
              globalAssignments[rawProperty] = _args[1];
            }
          }
          break;
        default:
          break;
        }
      }
      if (!applyAcl(name, isStatic, typeof normalizedThisArg === 'object', property, opType, context)) {
        // if (name === 'Object' && context.startsWith('/components/dexie/dist/dexie.min.js')) {
        //   console.error('ACL: denied name =', name, 'isStatic =', isStatic, 'isObject = ', (typeof normalizedThisArg === 'object'), 'property =', property, 'opType =', opType, 'context = ', context);
        //   debugger;
        //   applyAcl(name, isStatic, typeof normalizedThisArg === 'object', property, opType, context);
        // }
        throw new Error('Permission Denied: Cannot access ' + name);
      }
      // TODO: For robust security, the exception should not provide any information on the blocked objects/properties.
      //#PROFILE function handleBlacklistProperty() {
      let _blacklist = _blacklistObjects[name];
      if (_blacklist) {
        if (typeof _blacklist === 'object') {
          if (property) {
            if (typeof property === 'string') {
              if (typeof _blacklist[property] === 'boolean') {
                //throw new Error('Permission Denied: Cannot access');
                throw new Error('Permission Denied: Cannot access ' + name + '.' + rawProperty);
              }
            }
            else if (Array.isArray(property)) {
              for (let i = 0; i < property.length; i++) {
                if (typeof _blacklist[property[i]] === 'boolean') {
                  //throw new Error('Permission Denied: Cannot access');
                  throw new Error('Permission Denied: Cannot access ' + name + '.' + (_unescapePlatformProperties.get(property[i]) || property[i]));
                }
              }
            }
            else if (property === S_ALL) {
              //throw new Error('Permission Denied: Cannot access');
              throw new Error('Permission Denied: Cannot access ' + name + '.*');
            }
            else if (property === S_UNSPECIFIED) {
              // OK
            }
          }
          else {
            // OK
          }
        }
        else {
          //throw new Error('Permission Denied: Cannot access');
          throw new Error('Permission Denied: Cannot access ' + name);
        }
      }
      //#PROFILE }
      //#PROFILE handleBlacklistProperty();
      if (typeof target === 'string' && target[3] === 'b') {
        let _method = _globalMethods.get(thisArg);
        boundParameters = {
          f: thisArg,
          name: name,
          thisArg: args[1][0],
          normalizedThisArg: _method
            ? _method[1] === 'prototype'
              ? { constructor: _global[_method[0]] }
              : _global[_method[0]]
            : args[1][0],
          isStatic: _method ? (_method[1] !== 'prototype') : (typeof args[1][0] === 'function'),
          property: typeof rawProperty === 'string' ? rawProperty : thisArg,
          args: args[1].slice(1),
        };
        f = 'bind';
      }
      for (let gprop in globalAssignments) {
        //console.log('global assignment ', gprop);
        let gvalue = globalAssignments[gprop];
        _globalObjects.set(gvalue, gprop);
        let _properties = Object.getOwnPropertyDescriptors(gvalue);
        let _prop;
        for (_prop in _properties) {
          if (typeof _properties[_prop].value === 'function') {
            _globalMethods.set(_properties[_prop].value, [gprop, _prop]);
          }
        }
        if (gvalue.prototype) {
          _properties = Object.getOwnPropertyDescriptors(gvalue.prototype);
          for (_prop in _properties) {
            if (typeof _properties[_prop].value === 'function') {
              _globalMethods.set(_properties[_prop].value, [gprop, 'prototype', _prop]);
            }
          }
        }
      }
      //#PROFILE function excludePrimitiveObjectProperties() {
      switch (name) {
      case 'Object':
        if (!isStatic) {
          if (!_objectPropertyDescriptors[rawProperty]) {
            name = null;
          }
        }
        break;
      case 'Array':
        if (!isStatic) {
          if (!_arrayPropertyDescriptors[rawProperty]) {
            name = null;
          }
        }
        break;
      case 'String':
        if (!isStatic) {
          if (!_stringPropertyDescriptors[rawProperty]) {
            name = null;
          }
        }
        break;
      case 'Function':
        if (!isStatic) {
          if (!_functionPropertyDescriptors[rawProperty]) {
            name = null;
          }
        }
        break;
      default:
        break;
      }
      //#PROFILE }
      //#PROFILE excludePrimitiveObjectProperties();
      if (name) {
        //#PROFILE function updateAccessGraph() {
        // thisArg is a global object or an instance of one
        let forName;
        let forProp;
        let id;
        if (!globalPropertyContexts[context]) {
          let group = context.split(/[,:]/)[0];
          data2.nodes.push({ id: context, label: context, group: group });
          globalPropertyContexts[context] = true;
        }
        if (!globalObjectAccess[name]) {
          globalObjectAccess[name] = {};
          data2.nodes.push({ id: name, label: name, group: name });
        }
        forName = globalObjectAccess[name];
        if (typeof property === 'string') {
          id = isStatic || typeof normalizedThisArg === 'object'
            ? name + '.' + rawProperty
            : name + '.prototype.' + rawProperty
          if (!forName[property]) {
            forName[property] = {};
            data2.nodes.push({ id: id, label: (_unescapePlatformProperties.get(property) || property), group: name });
            data2.edges.push({ from: name, to: id, dashes: true, arrows: 'to' });
          }
          forProp = forName[property];
          if (!forProp[context]) {
            forProp[context] = { from: context, to: id, label: 0, arrows: 'to' };
            data2.edges.push(forProp[context]);
          }
          forProp[context].label++;
        }
        else if (Array.isArray(property)) {
          for (let i = 0; i < property.length; i++) {
            rawProperty = _unescapePlatformProperties.get(property[i]) || property[i];
            id = isStatic || typeof normalizedThisArg === 'object' ? name + '.' + rawProperty : name + '.prototype.' + rawProperty;
            if (!forName[property[i]]) {
              forName[property[i]] = {};
              data2.nodes.push({ id: id, label: rawProperty, group: name });
              data2.edges.push({ from: name, to: id, dashes: true, arrows: 'to' });
            }
            forProp = forName[property[i]];
            if (!forProp[context]) {
              forProp[context] = { from: context, to: id, label: 0, arrows: 'to' };
              data2.edges.push(forProp[context]);
            }
            forProp[context].label++;
          }
        }
        else {
          forName = globalObjectAccess[name];
          if (!forName[context]) {
            forName[context] = { from: '/' + context, to: name, label: 0, arrows: 'to' };
            data2.edges.push(forName[context]);
          }
          forName[context].label++;
        }
        //#PROFILE }
        //#PROFILE updateAccessGraph();
      }
      //#PROFILE }
      //#PROFILE normalizeOperation();
    }
    else if (newTarget) {
      //#PROFILE function handleNewOperation() {
      let name = _globalObjects.get(f);
      let superClass = f;
      while (!name && typeof superClass === 'function') {
        superClass = Object.getPrototypeOf(superClass);
        name = _globalObjects.get(superClass);
      }
      if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context)) {
        throw new Error('Permission Denied: Cannot access ' + name);
        //console.error('ACL: denied name =', name, 'isStatic =', true, 'isObject = ', false, 'property =', S_UNSPECIFIED, 'opType =', 'x', 'context = ', context);
        //debugger;
        //applyAcl(name, true, false, S_UNSPECIFIED, 'x', context);
      }
      let _blacklist = _blacklistObjects[name];
      if (_blacklist) {
        if (typeof _blacklist === 'boolean') {
          throw new Error('Permission Denied: Cannot access ' + name);
        }
      }
      if (name) {
        // new operator for a global class
        let forName;
        if (!globalPropertyContexts[context]) {
          let group = context.split(/[,:]/)[0];
          data2.nodes.push({ id: '/' + context, label: context, group: group });
          globalPropertyContexts[context] = true;
        }
        if (!globalObjectAccess[name]) {
          globalObjectAccess[name] = {};
          data2.nodes.push({ id: name, label: name, group: name });
        }
        forName = globalObjectAccess[name];
        if (!forName[context]) {
          forName[context] = { from: '/' + context, to: name, label: 0, arrows: 'to' };
          data2.edges.push(forName[context]);
        }
        forName[context].label++;
      }
      //#PROFILE }
      //#PROFILE handleNewOperation();
    }
    else {
      //#PROFILE function handleFunctionCall() {
      let name = _globalMethods.get(f);
      if (name) {
        // call of a native method
        let forName;
        let forProp;
        let id = name.join('.');
        let rawProp = name[name.length - 1];
        let prop = _escapePlatformProperties.get(rawProp) || rawProp;
        let obj = name[0];
        if (!applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context)) {
          throw new Error('Permission Denied: Cannot access ' + obj);
          //console.error('ACL: denied name =', name, 'isStatic =', name[1] !== 'prototype', 'isObject = ', false, 'property =', prop, 'opType =', 'x', 'context = ', context);
          //debugger;
          //applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context);
        }
        let _blacklist = _blacklistObjects[obj];
        if (_blacklist) {
          if (typeof _blacklist === 'object') {
            if (typeof _blacklist[prop] === 'boolean') {
              throw new Error('Permission Denied: Cannot access ' + obj + '.' + prop);
            }
          }
          else {
            throw new Error('Permission Denied: Cannot access ' + obj);
          }
        }
        if (!globalPropertyContexts[context]) {
          let group = context.split(/[,:]/)[0];
          data2.nodes.push({ id: '/' + context, label: context, group: group });
          globalPropertyContexts[context] = true;
        }
        if (!globalObjectAccess[obj]) {
          globalObjectAccess[obj] = {};
          data2.nodes.push({ id: obj, label: obj, group: obj });
        }
        forName = globalObjectAccess[obj];
        if (!forName[prop]) {
          forName[prop] = {};
          data2.nodes.push({ id: id, label: rawProp, group: obj });
          data2.edges.push({ from: obj, to: id, dashes: true, arrows: 'to' });
        }
        forProp = forName[prop];
        if (!forProp[context]) {
          forProp[context] = { from: context, to: id, label: 0, arrows: 'to' };
          data2.edges.push(forProp[context]);
        }
        forProp[context].label++;
      }
      //#PROFILE }
      //#PROFILE handleFunctionCall();
    }

    let result;
    let args1 = args[1]; // for '()'
    function *gen() {}
    switch (f) {
    case Function:
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
      break;
    case '()':
      switch (thisArg) {
      case Reflect:
        switch (args[0]) {
        case 'construct':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              // TODO: args[1][2] as newTarget
              args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype.constructor === gen.constructor)];
              }
              break;
            }
          }
          break;
        case 'apply':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2])];
              break;
            default:
              break;
            }
          }
          break;
        default:
          break;
        }
        break;
      case Function:
        thisArg = hook.Function('__hook__', [[context, {}]]);
        break;
      default:
        break;
      }
      break;
    default:
      if (f.prototype instanceof Function && newTarget) {
        args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype.constructor === gen.constructor);
      }
      else if (typeof f === 'function' && f.toString().match(/\(newTarget, ?[.][.][.]args\) ?=> ?super\([.][.][.]args\)/)) {
        try {
          if (f.toString().match(/\(newTarget, ?[.][.][.]args\) ?=> ?super\([.][.][.]args\)/)) {
            if (args[0] && Object.getPrototypeOf(args[0]) === Function) {
              args = [ args[0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args.slice(1)) ];
            }
          }
        }
        catch (e) { }
      }
      break;
    }
    if (typeof f !== 'string') {
      //#PROFILE function callFunction() {
      result = newTarget
        ? Reflect.construct(f, args)
        : thisArg
          ? f.apply(thisArg, args)
          : f(...args);
      //#PROFILE }
      //#PROFILE callFunction();
    }
    else {
      //#PROFILE function accessProperty() {
      // property access
      switch (f) {
      // getter
      case '.':
      case '[]':
        //#PROFILE function getProperty() {
        result = thisArg[args[0]];
        //#PROFILE }
        //#PROFILE getProperty();
        break;
      // enumeration
      case '*':
        result = thisArg;
        break;
      // property existence
      case 'in':
        result = args[0] in thisArg;
        break;
      // funcation call
      case '()':
        //#PROFILE function callProperty() {
        result = thisArg[args[0]].apply(thisArg, args1);
        //#PROFILE }
        //#PROFILE callProperty();
        break;
      case 'bind':
        let _boundFunction = thisArg[args[0]](...args[1]);
        _boundFunctions.set(_boundFunction, boundParameters);
        result = _boundFunction;
        break;
      // unary operators
      case 'p++':
        result = thisArg[args[0]]++;
        break;
      case '++p':
        result = ++thisArg[args[0]];
        break;
      case 'p--':
        result = thisArg[args[0]]--;
        break;
      case '--p':
        result = --thisArg[args[0]];
        break;
      case 'delete':
        result = delete thisArg[args[0]];
        break;
      // assignment operators
      case '=':
        //#PROFILE function assignProperty() {
        result = thisArg[args[0]] = args[1];
        //#PROFILE }
        //#PROFILE assignProperty();
        break;
      case '+=':
        result = thisArg[args[0]] += args[1];
        break;
      case '-=':
        result = thisArg[args[0]] -= args[1];
        break;
      case '*=':
        result = thisArg[args[0]] *= args[1];
        break;
      case '/=':
        result = thisArg[args[0]] /= args[1];
        break;
      case '%=':
        result = thisArg[args[0]] %= args[1];
        break;
      case '**=':
        result = thisArg[args[0]] **= args[1];
        break;
      case '<<=':
        result = thisArg[args[0]] <<= args[1];
        break;
      case '>>=':
        result = thisArg[args[0]] >>= args[1];
        break;
      case '>>>=':
        result = thisArg[args[0]] >>>= args[1];
        break;
      case '&=':
        result = thisArg[args[0]] &= args[1];
        break;
      case '^=':
        result = thisArg[args[0]] ^= args[1];
        break;
      case '|=':
        result = thisArg[args[0]] |= args[1];
        break;
      // getter for super
      case 's.':
      case 's[]':
        result = args[1](args[0]);
        break;
      // super method call
      case 's()':
        result = args[2](args[0]).apply(thisArg, args[1]);
        break;
      // unary operators for super
      case 's++':
      case '++s':
      case 's--':
      case '--s':
        result = args[1].apply(thisArg, args);
        break;
      // assignment operators for super
      case 's=':
      case 's+=':
      case 's-=':
      case 's*=':
      case 's/=':
      case 's%=':
      case 's**=':
      case 's<<=':
      case 's>>=':
      case 's>>>=':
      case 's&=':
      case 's^=':
      case 's|=':
        result = args[2].apply(thisArg, args);
        break;
      // default (invalid operator)
      default:
        f(); // throw TypeError: f is not a function
        result = null;
        break;
      }
      //#PROFILE }
      //#PROFILE accessProperty();
    }
    lastContext = _lastContext;
    // if (contextStack[contextStack.length - 1] !== context) { debugger; }
    contextStack.pop();
    return result;
  }});

  function showContextStackLog() {
    let asyncCalls = Object.keys(contextStackLog).filter(c => c.match(/(setTimeout|setInterval|Promise)/g));
    console.log(asyncCalls);
  }
  {
    let _native = {
      Promise: Promise,
      HTMLScriptElement: typeof HTMLScriptElement === 'function' ? HTMLScriptElement : undefined,
      Node: typeof Node === 'function' ? Node : undefined,
      Element: typeof Element === 'function' ? Element : undefined,
      eval: typeof eval === 'function' ? eval : undefined
    }
    let _nativeMethods = {
      Promise: {
        static: {
          resolve: Promise.resolve,
          reject: Promise.reject,
          all: Promise.all,
          race: Promise.race
        },
        proto: {
          then: Promise.prototype.then,
          catch: Promise.prototype.catch
        }
      },
      EventTarget: {
        static: {},
        proto: {
          addEventListener: EventTarget.prototype.addEventListener
        }
      }
    }
    let contextGeneratorName = 'method2';

    function hookPromise(hookName) {
      let _Promise = function Promise(...args) {
        return _global[hookName](_native.Promise, null, args, 'Promise', new.target);
      };

      _Promise.prototype = _native.Promise.prototype;
      _Promise.prototype.constructor = _Promise;

      _Promise.resolve = function (...args) {
        return _global[hookName](_nativeMethods.Promise.static.resolve, this, args, 'Promise,static resolve');
      }

      _Promise.reject = function (...args) {
        return _global[hookName](_nativeMethods.Promise.static.reject, this, args, 'Promise,static reject');
      }

      _Promise.all = function (...args) {
        return _global[hookName](_nativeMethods.Promise.static.all, this, args, 'Promise,static all');
      }

      _Promise.race = function (...args) {
        return _global[hookName](_nativeMethods.Promise.static.race, this, args, 'Promise,static race');
      }

      _Promise.prototype.then = function (...args) {
        return _global[hookName](_nativeMethods.Promise.proto.then, this, args, 'Promise,then');
      }

      _Promise.prototype.catch = function (...args) {
        return _global[hookName](_nativeMethods.Promise.proto.catch, this, args, 'Promise,catch');
      }

      /*
        Subclassing is simpler (no new.target) but easily hackable via its prototype chain
      */
      /*
      let _Promise = class Promise extends _native.Promise {
        constructor(...args) {
          _global[hookName]((...args) => super(...args), null, args, 'Promise');
        }
        then(...args) {
          return _global[hookName]((...args) => super.then(...args), this, args, 'Promise,then');
        }
        catch(...args) {
          return _global[hookName]((...args) => super.catch(...args), this, args, 'Promise,catch');
        }
      }
      */
      return _Promise;                
    }

    _global.Promise = hookPromise('__hook__');

    EventTarget.prototype.addEventListener = function addEventListener(...args) {
      return _global.__hook__(_nativeMethods.EventTarget.proto.addEventListener, this, args, 'EventTarget,addEventListener');
    }
  }
}