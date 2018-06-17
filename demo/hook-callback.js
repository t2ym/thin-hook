/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  const Map = self.Map;
  const Set = self.Set;
  class SetMap extends Map {
    set(key, value) {
      let set;
      if (super.has(key)) {
        set = super.get(key);
      }
      else {
        set = new Set();
        super.set(key, set);
      }
      set.add(value);
      return this;
    }
    static getStringValues(set, delim = ' ') {
      let values = [];
      if (set instanceof Set) {
        for (let v of set.values()) {
          values.push(v);
        }
      }
      else if (typeof set === 'string') {
        values.push(set);
      }
      return values.join(delim);
    }
  };
  const Object = self.Object;
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  const Array = self.Array;
  const Symbol = self.Symbol;
  const JSON = self.JSON;
  const URL = self.URL;
  const Reflect = self.Reflect;
  const atob = self.atob;
  const createHash = hook.utils.createHash;
  const HTMLParser = hook.utils.HTMLParser;
  let wrapGlobalProperty; // = function (object, property, objectName); assigned at the bottom of this script
  class Stack {
    constructor(stack) {
      // Note: O(1)
      if (stack instanceof Stack) {
        this._top = stack._top;
      }
      else {
        this._top = undefined;
      }
    }
    push(item) {
      // Note: O(1)
      this._top = {
        item: item,
        next: this._top
      };
    }
    pop() {
      // Note: O(1)
      let _top = this._top;
      if (_top) {
        this._top = _top.next;
        if (this._top && !this._top.item) {
          // Note: An empty item at the top empties the stack
          this._top = undefined;
        }
        return _top.item;
      }
      else {
        return undefined;
      }
    }
    top() {
      // Note: O(1)
      if (this._top) {
        return this._top.item;
      }
      else {
        return undefined;
      }
    }
    isEmpty() {
      // Note: O(1)
      return !this._top;
    }
    toString(indent = 0) {
      // Note: O(n)?
      let array = [];
      for (let _item = this._top; _item; _item = _item.next) {
        array.unshift(_item.item);
      }
      // [bottom, ..., top]
      return JSON.stringify(array, null, indent);
    }
    get length() {
      // Note: O(n)
      let _item = this._top, n;
      for (n = 0; _item; _item = _item.next) {
        n++;
      }
      return n;
    }
  }
  function logContextStack(n = 2) {
    console.error('contextStack', contextStack.toString(n));
  }
  // { id: label: group: }
  const data = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  const data2 = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  let counter = 0;
  let log = [];
  var contexts = {}; // still global for normalize.js, etc.; __hook__acl does not use it
  let globalPropertyContexts = {};
  let contextTransitions = {};
  let contextReverseTransitions = {};
  let lastContext;
  let contextStack = new Stack(); // local variable
  let contextStackLog = {};
  let callbacks = {};
  let reverseCallbacks = {};
  let pseudoContextArgument = Symbol('callback context');
  let callbackFunctions = new WeakMap();
  var emptyDocumentURL;
  var otherWindowObjects = new Map();
  var otherWindowObjectsStatus = { set: false };
  if (typeof window === 'object') {
    if (window.top === window) {
      emptyDocumentURL = (new URL('./empty-document.html', location.href)).href
      otherWindowObjects = new Map();
      otherWindowObjects.set(Object, window);
    }
    else {
      emptyDocumentURL = window.top.emptyDocumentURL;
      otherWindowObjects = window.top.otherWindowObjects;
      otherWindowObjectsStatus = window.top.otherWindowObjectsStatus;
    }
  }
  const _global = typeof window === 'object' ? window : self;
  Object.defineProperty(_global, '_global', { configurable: false, enumerable: false, writable: false, value: _global });
  _global._data = data;
  _global._data2 = data2;
  var _globalPropertyDescriptors = {};
  {
    let o = _global;
    while (o && o !== Object.prototype) {
      Object.assign(_globalPropertyDescriptors, Object.getOwnPropertyDescriptors(o));
      o = Object.getPrototypeOf(o);
    }
  }
  let _globalMethods = new Map();
  const excludedGlobalProperties = { isSecureContext: true };
  const mainGlobalObjectName = typeof window === 'object' ? 'window' : 'self';
  Object.entries(Object.getOwnPropertyDescriptors(_global))
    .filter(([name, desc]) => desc.get && desc.set && desc.configurable &&
      (name.startsWith('on') ||
      ['name', 'status', 'defaultStatus', 'defaultstatus'].indexOf(name) >= 0 ||
      !(_global[name] instanceof Object)))
    .map(([name, desc]) => name)
    .forEach((name) => {
      excludedGlobalProperties[name] = true;
    });
  let _globalObjects = Object.keys(_globalPropertyDescriptors)
    .sort()
    .reduce((acc, curr) => {
      const globalObjectNames = ['_global', 'frames', 'top', 'global', 'self', 'window', 'parent'];
      //const globalProperties = { history: true, navigator: true, applicationCache: true, crypto: true, localStorage: true, indexedDB: true, caches: true, sessionStorage: true, document: true };
      if (_globalPropertyDescriptors[curr].value && typeof _globalPropertyDescriptors[curr].value !== 'number') {
        let existing = acc.get(_globalPropertyDescriptors[curr].value);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (curr === mainGlobalObjectName) {
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
        else {
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
      else if (_globalPropertyDescriptors[curr].get && typeof _globalPropertyDescriptors[curr].get === 'function' && _global[curr] /*&& !_globalPropertyDescriptors[curr].set*/) {
        let existing = acc.get(_global[curr]);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (curr === mainGlobalObjectName) {
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
        else {
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
    }, new SetMap());
  const _objectStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Object);
  const _objectPropertyDescriptors = Object.getOwnPropertyDescriptors(Object.prototype);
  const _arrayStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Array);
  const _arrayPropertyDescriptors = Object.getOwnPropertyDescriptors(Array.prototype);
  const _stringStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(String);
  const _stringPropertyDescriptors = Object.getOwnPropertyDescriptors(String.prototype);
  const _functionStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Function);
  const _functionPropertyDescriptors = Object.getOwnPropertyDescriptors(Function.prototype);
  var globalObjectAccess = Object.create(null); // still global for normalize.js, etc.; __hook__acl does not use it
  /*
  if (!_global._globalObjects) {
    // in a ES module for hook-native-api.js
    _global._globalObjects = _globalObjects;
    _global._globalMethods = _globalMethods;
  }
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
  const S_INSTANCE = Symbol('instance'); // instance object
  const S_CHAIN = Symbol('chain'); // chained policy
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
    'delete': 'd',
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
    '.=': '=',
    '#.': '.',
    '#[]': '.',
    '#in': '.',
    '#*': '*',
    '#()': '()',
    '#p++': '=',
    '#++p': '=',
    '#p--': '=',
    '#--p': '=',
    '#delete': 'd',
    '#=': '=',
    '#+=': '=',
    '#-=': '=',
    '#*=': '=',
    '#/=': '=',
    '#%=': '=',
    '#**=': '=',
    '#<<=': '=',
    '#>>=': '=',
    '#>>>=': '=',
    '#&=': '=',
    '#^=': '=',
    '#|=': '=',
    '#.=': '=',
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
    'w.': '.',
    'w[]': '.',
    'w()': '()',
    'wnew': '()',
    'w++': '=',
    '++w': '=',
    'w--': '=',
    '--w': '=',
    'wtypeof': '.',
    'wdelete': 'd',
    'w.=': '=',
    'w=': '=',
    'w+=': '=',
    'w-=': '=',
    'w*=': '=',
    'w/=': '=',
    'w%=': '=',
    'w**=': '=',
    'w<<=': '=',
    'w>>=': '=',
    'w>>>=': '=',
    'w&=': '=',
    'w^=': '=',
    'w|=': '=',
  };
  const targetNormalizer = {
    'f': 'xtf', // thisArg may not be this object for f
    'n': 'xfN',
    '.': 'rtp',
    '*': 'rt*',
    '=': 'wtpv',
    'd': 'Wtp',
    '()': {
      Object: {
        [S_DEFAULT]: 'xtp',
        create: 'r0-',
        getOwnPropertyDescriptor: 'R01',
        getOwnPropertyDescriptors: 'R0*',
        getOwnPropertyNames: 'r0*',
        getOwnPropertySymbols: 'r0*',
        getPrototypeOf: 'r0P',
        keys: 'r0*',
        entries: 'r0*',
        values: 'r0*',
        defineProperty: 'W01v',
        defineProperties: 'W0.v',
        setPrototypeOf: 'w0P',
        freeze: 'w0*',
        seal: 'w0*',
        assign: 'w0.v',
        [S_PROTOTYPE]: {
          [S_DEFAULT]: 'xtp',
          $hasOwnProperty$: 'rt0',
          $__lookupGetter__$: 'Rt0',
          $__lookupSetter__$: 'Rt0',
          $__defineGetter__$: 'Wt0',
          $__defineSetter__$: 'Wt0',
          $propertyIsEnumerable$: 'rt0',
        }
      },
      Reflect: {
        [S_DEFAULT]: 'xtp',
        get: 'r01',
        getPrototypeOf: 'r0P',
        has: 'r01',
        getOwnPropertyDescriptor: 'R01',
        isExtensible: 'r0-',
        ownKeys: 'r0*',
        defineProperty: 'W01v',
        deleteProperty: 'W01',
        set: 'w01v',
        setPrototypeOf: 'w0P',
        preventExtensions: 'w0*',
        construct: 'x0N',
        apply: 'x10R',
        [S_PROTOTYPE]: 'xtp'
      },
      Function: {
        [S_DEFAULT]: 'xtp',
        [S_PROTOTYPE]: {
          [S_DEFAULT]: 'xtp',
          apply: 'x0tR',
          call: 'x0tR',
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
  const targetNormalizerMapObject = new Map();
  const isSuperOperator = new Map();
  for (let op in operatorNormalizer) {
    targetNormalizerMapObject.set(op, targetNormalizer[operatorNormalizer[op]]);
    isSuperOperator.set(op, op.indexOf('s') >= 0);
  }
  // TODO: Access control list is too hard to maintain. An easier, automated, and modular approach is preferable. 
  const contextNormalizer = {
    '/components/iron-location/iron-location.html,script@1800,_updateUrl': '@route_manipulator',
    '/components/iron-location/iron-location.html,script@1800,_globalOnClick': '@route_manipulator',
    '/components/thin-hook/demo/web-worker-client.js,worker': '@worker_manipulator',
    '/components/thin-hook/demo/web-worker-client.js': '@worker_manipulator',
    '/components/thin-hook/demo/web-worker-module-client.js,worker': '@worker_manipulator',
    '/components/thin-hook/demo/web-worker-module-client.js': '@worker_manipulator',
    '/components/thin-hook/demo/shared-worker-client.js,worker': '@shared_worker_manipulator',
    '/components/thin-hook/demo/shared-worker-client.js': '@shared_worker_manipulator',
    '/components/thin-hook/demo/normalize.js': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,f': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,get': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,caches': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,F,Function': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,dummyClass3Instance': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,SubClass1': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,SubClass2': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,SubClass3': '@normalization_checker',
    '/components/thin-hook/demo/normalize.js,BaseClass1,constructor': '@XClass1_constructor',
    '/components/thin-hook/demo/normalize.js,SubClass1,constructor': '@XClass1_constructor',
    '/components/thin-hook/demo/normalize.js,SubClass2,constructor': '@XClass1_constructor',
    '/components/thin-hook/demo/normalize.js,SubClass3,constructor': '@XClass1_constructor',
    '/components/thin-hook/demo/Function.js': '@Function_js',
    '/components/thin-hook/demo/Function.js,strictMode': '@Function_js',
    '/components/thin-hook/demo/Function.js,F': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,F': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode': '@normalization_checker',
    '/components/thin-hook/demo/Function.js,f3': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,f3': '@Function_reader',
    '/components/thin-hook/demo/Function.js,f4': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,f4': '@Function_reader',
    '/components/thin-hook/demo/Function.js,SubclassFunction': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,SubclassFunction': '@Function_reader',
    '/components/thin-hook/demo/Function.js,CustomConstructorSubclassFunction': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,CustomConstructorSubclassFunction': '@Function_reader',
    '/components/thin-hook/demo/Function.js,cannotBindFunction': '@Function_cannotBindFunction',
    '/components/thin-hook/demo/normalize.js,ArraySubclass2,constructor': '@super_normalization_checker',
    '/components/thin-hook/demo/normalize.js,ArraySubclass4,constructor': '@super_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,boundF': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,b': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,B,static now': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,cannotAccessNavigator': '@normalization_checker_cannot_access_navigator',
    '/components/dexie/dist/dexie.min.js,r': '@custom_error_constructor_creator',
    '/components/firebase/firebase-app.js': '@firebase_app',
    '/components/firebase/firebase-auth.js,t': '@custom_error_constructor_creator',
    '/components/polymer/lib/utils/templatize.html,script@695,upgradeTemplate': '@template_element_prototype_setter',
    '/components/thin-hook/demo/my-view2.html,script@2946,getData': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2946,attached,_lastEdges': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2946,drawGraph': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2946,descriptors': '@window_enumerator',
    '/components/thin-hook/demo/my-view2.html,script@2946': '@Object_prototype_reader',
    '/components/web-animations-js/web-animations-next-lite.min.js': '@web_animations_next_lite',
    '/components/live-localizer/live-localizer-browser-storage.html,script@3348,modelReady': '@Dexie_instantiator',
    '/components/deepcopy/build/deepcopy.min.js,u': '@Object_keys_reader',
    '/components/dexie/dist/dexie.min.js,jn': '@Object_keys_reader',
    '/components/dexie/dist/dexie.min.js,Pn': '@Object_getPrototypeOf_reader',
    '/components/firebase/firebase-app.js,*': '@firebase_app',
    '/components/firebase/firebase-app.js,p': '@Object_getPrototypeOf_reader',
    '/components/dexie/dist/dexie.min.js,In': '@Object_getOwnPropertyDescriptor_reader',
    '/components/firebase/firebase-auth.js': '@firebase_auth',
    '/components/firebase/firebase-auth.js,*': '@firebase_auth',
    '/components/firebase/firebase-auth.js,Xb': '@Object_defineProperty_reader',
    '/components/dexie/dist/dexie.min.js,Cn': '@Object_method_reader',
    '/components/firebase/firebase-database.js': '@firebase_database',
    '/components/firebase/firebase-database.js,*': '@firebase_database',
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
    '/components/firebase/firebase-database.js,ir': '@document_createElement_reader',
    '/components/firebase/firebase-database.js,or': '@iframe_contentWindow_accessor',
    '/components/firebase/firebase-messaging.js': '@firebase_messaging',
    '/components/firebase/firebase-messaging.js,*': '@firebase_messaging',
    '/components/firebase/firebase-messaging.js,24,k,e': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-messaging.js,24,P,e': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-storage.js': '@firebase_storage',
    '/components/firebase/firebase-storage.js,*': '@firebase_storage',
    '/components/polymerfire/firebase-common-behavior.html,script@437,__appNameChanged': '@polymerfire', // TODO: More contexts should be mapped to @polymerfire
    '/components/polymerfire/firebase-app.html,script@802,__computeApp': '@polymerfire',
    '/components/polymerfire/firebase-auth.html,script@2320,_providerFromName': '@polymerfire',
    '/components/polymer/lib/mixins/element-mixin.html,script@926,*': '@Polymer_element_mixin',
    '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,*': '@Polymer_legacy_element_mixin',
    '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,fire': '@Event_detail_writer',
    '/components/polymer/lib/mixins/property-effects.html,script@914,setupBindings': '@HTMLElement___dataHost_writer',
    '/components/polymer/lib/mixins/property-accessors.html,script@741': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,*': '@Polymer_property_accessors',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,props': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,proto': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-effects.html,script@914,*': '@Polymer_property_effects',
    '/components/polymer/lib/mixins/template-stamp.html,script@630,*': '@Polymer_template-stamp',
    '/components/polymer/lib/legacy/polymer.dom.html,script@701': '@Event___domApi_writer',
    '/components/polymer/lib/legacy/polymer.dom.html,script@701,forwardMethods': '@DocumentFragment_querySelector_reader',
    '/components/polymer/lib/elements/dom-module.html,script@634': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-bind.html,script@777': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-repeat.html,script@816': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-repeat.html,script@816,*': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-if.html,script@754': '@Polymer_lib',
    '/components/polymer/lib/elements/array-selector.html,script@699': '@Polymer_lib',
    '/components/polymer/lib/elements/custom-style.html,script@662': '@Polymer_lib',
    '/components/polymer/lib/legacy/class.html,script@581,*': '@Polymer_legacy_class',
    '/components/polymer/lib/legacy/polymer-fn.html,script@568': '@Polymer_lib',
    '/components/polymer/lib/utils/import-href.html,script@567,*': '@Polymer_lib',
    '/components/polymer/lib/utils/mixin.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/boot.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/case-map.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/resolve-url.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/style-gather.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/path.html,*': '@Polymer_lib',
    '/components/polymer/lib/utils/async.html,*': '@Polymer_lib',
    '/components/polymer/lib/mixins/property-accessors.html,*': '@Polymer_lib',
    '/components/chai/chai.js,30': '@custom_error_constructor_creator',
    '/components/chai/chai.js,9,hasProtoSupport': '@Object__proto__reader',
    '/components/chai/chai.js,36,getType,type': '@Object_prototype_reader',
    '/components/chai/chai.js,24,type': '@Object_prototype_reader',
    '/components/chai/chai.js,*': '@chai_js',
    '/components/dexie/dist/dexie.min.js,p': '@Object_static_method_user',
    '/components/dexie/dist/dexie.min.js,*': '@dexie_js',
    '/components/dexie/dist/dexie.min.js': '@dexie_js',
    '/components/webcomponentsjs/webcomponents-lite.js': '@Object_assign_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Xa,b': '@Event_ja_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,rc,get composed': '@Event_ja_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,lc': '@Event__target_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Ja': '@Event_composed_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,kc': '@Event_composedPath_executor',
    '/components/webcomponentsjs/webcomponents-lite.js,rc,get target': '@Event_composedPath_executor',
    '/components/webcomponentsjs/webcomponents-lite.js,rc,composedPath': '@Event_ya_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,rc,stopPropagation': '@Event_ka_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,rc,get relatedTarget': '@Event_za_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,nd': '@HTMLElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,nd,b': '@HTMLElement_proto_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,nd,b,e': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,rd': '@CustomEvent_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,I': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,bc': '@HTMLElement___shady_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,u': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,l': '@DocumentFragment_$__proto__$_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Ra': '@DocumentFragment_querySelectorAll_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,la': '@HTMLElement___shady_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Wb': '@HTMLElement___shady_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Wd': '@HTMLElement_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Ba': '@HTMLElement_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,wb': '@HTMLElement_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,lc,d': '@Event_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,c': '@Node_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,eb': '@Node_prototype_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Mc': '@Element_matches_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,M': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,M,e': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,yb': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,hd,b': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,$c,b': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,cd': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,hb': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,ib': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Fa': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Aa': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,ua': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,xa': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,a': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,ke': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Q,b': '@customElement_localName_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,h': '@customElement_localName_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Bd,a': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,mc': '@Node_prototype_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,U': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,S': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Ha': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Sb': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Mb': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,Ia': '@TreeWalker_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,b': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,d,b': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,id': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,xd': '@FocusEvent_currentTarget_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,oa': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,cc': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,T': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,*': '@webcomponents-lite',
    '/components/thin-hook/demo/es6-module2.js,f2,module': '@Module_importer',
    '/components/thin-hook/demo/es6-module2.js': '@Module_importer',
    '/components/thin-hook/demo/es6-module4.js': '@import.meta_reader',
    '/components/thin-hook/demo/es6-module4.js,baseUrl': '@import.meta_reader',
    '/components/thin-hook/demo/es6-module4.js,f': '@import.meta_reader,f',
    '/components/thin-hook/demo/es6-module4.js,f,*': '@import.meta_reader,f',
    '/components/polymer/lib/utils/async.html,script@566,timeOut,run': '@setTimeout_reader',
    '/components/thin-hook/demo/,script@4861': '@document_writer',
    '/components/thin-hook/demo/,script@5088': '@document_writer',
    '/components/thin-hook/demo/,script@5089': '@document_writer',
    '/components/thin-hook/demo/sub-document.html,*': '@document_writer',
    '/components/thin-hook/demo/commonjs2.js': '@path_join_prohibited',
    '/components/thin-hook/demo/commonjs2.js,tty': '@tty_prohibited',
    '/components/live-localizer/live-localizer-lazy.html,*': '@live-localizer-lazy',
    '/components/live-localizer/draggable-behavior.html,*': '@draggable-behavior',
    '/components/iron-location/iron-location.html,*': '@iron-location',
    '/components/live-localizer/live-localizer-model.html,script@1001,reload': '@route_manipulator',
    '/components/xliff-conv/xliff-conv.js': '@xliff-conv',
    '/components/xliff-conv/xliff-conv.js,*': '@xliff-conv',
    '/components/iron-a11y-announcer/iron-a11y-announcer.html,*': '@iron-a11y-announcer',
    '/components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html,*': '@iron-a11y-keys-behavior',
    '/components/thin-hook/demo/spread.js': '@spread_js',
    '/components/thin-hook/demo/spread.js,*': '@spread_js',
    '/components/thin-hook/demo/lhs.js': '@lhs_js',
    '/components/thin-hook/demo/lhs.js,*': '@lhs_js',
    '/components/thin-hook/demo/,*': '@demo_entry_page_scripts',
    '/components/i18n-behavior/i18n-behavior.html,script@754,isStandardPropertyConfigurable,langPropertyDescriptor': '@lang_descriptor_reader',
    '/components/i18n-behavior/i18n-behavior.html,*': '@i18n-behavior',
    '/components/i18n-behavior/i18n-attr-repo.html,*': '@i18n-behavior',
    '/components/i18n-number/i18n-number.html,*': '@i18n-number',
    '/components/thin-hook/node_modules/process/browser.js': '@process_browser_js',
    '/components/thin-hook/demo/normalize.js,GetterSetterClass': '@GetterSetterClass',
    '/components/thin-hook/demo/normalize.js,GetterSetterClass,*': '@GetterSetterClass',
    '/components/thin-hook/demo/normalize.js,createProperty': '@GetterSetterClass_creator',
    '/components/thin-hook/demo/normalize.js,createProperty,get': '@GetterSetterClass_creator',
    '/components/thin-hook/demo/normalize.js,createProperty,set': '@GetterSetterClass_creator',
    '/components/thin-hook/demo/normalize.js,writeProperty': '@GetterSetterClass_writer',
    '/components/thin-hook/demo/normalize.js,readProperty': '@GetterSetterClass_reader',
    '/components/thin-hook/demo/my-view3.html,*': '@iframe_contentWindow_accessor',
    '/components/thin-hook/demo/sub-document.html,script@8036,onLoad': '@iframe_contentWindow_accessor',
    '/components/thin-hook/demo/sub-document.html,script@8036,onLoad,*': '@iframe_contentWindow_accessor',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js,41,o': '@iframe_contentWindow_accessor',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js,26': '@iframe_contentWindow_accessor',
    '/components/thin-hook/demo/my-view1.html,script@4544,attached': '@svg_contentWindow_accessor',
    '/components/iron-behaviors/iron-control-state.html,script@581,properties,_boundFocusBlurHandler,type': '@Function_reader',
    '/components/paper-ripple/paper-ripple.html,script@4438,properties,_boundAnimate,type': '@Function_reader',
    '/components/iron-ajax/iron-ajax.html,script@1410,properties,_boundHandleResponse,type': '@Function_reader',
    '/components/vaadin-grid/vaadin-grid-table.html,script@8651,properties,bindData': '@Function_reader',
    '/components/thin-hook/demo/global.js': '@global_js',
    '/components/thin-hook/demo/global.js,inaccessible': '@global_js_inaccessible',
    '/components/thin-hook/demo/global.js,inaccessible,accessible': '@global_js_accessible',
    'https://thin-hook.localhost.localdomain/automation.json,*': '@cache_automation',
  };
  /*
    Prefixed Contexts object:
      {
        '/components/thin-hook/demo/es6-module2.js': {
          '*': '@Module_importer2', // fallback for '/components/thin-hook/demo/es6-module2.js,f2,A'
          'f2': {
            'module': {
              '*': '@Module_importer', // fallback for '/components/thin-hook/demo/es6-module2.js,f2,module,X'
            },
          },
        },
      };

    Notes:
    - Prefixed context must end with ',*' like this:
      '/some/filepath.js,something,*'
  */
  const prefixedContexts = {};
  for (let c in contextNormalizer) {
    let paths = c.split(',');
    let cursor = prefixedContexts;
    if (paths.length > 1 && paths[paths.length - 1] === '*') {
      for (let path of paths) {
        if (path === '*') {
          cursor[path] = contextNormalizer[c];
          break;
        }
        else {
          if (!Reflect.has(cursor, path)) {
            cursor[path] = {};
          }
          cursor = cursor[path];
        }
      }
    }
  }
  const opTypeMap = {
    r: 0, w: 1, x: 2, R: 3, W: 4,
  };
  const isGlobalScopeObject = new Map();
  [ 'window', 'self', '_global', 'frames', 'parent', 'top' ].forEach(g => {
    isGlobalScopeObject.set(g, true);
  });
  // An example ABAC policy wrapper class
  const Policy = class Policy {
    // plain ACL
    static acl(_acl) {
      return function (normalizedThisArg,
                       normalizedArgs /* ['property', args], ['property', value], etc. */,
                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                       applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        return _acl[opTypeMap[opType]] === opType;
      };
    }
    // args condition
    static args(condition) { // Policy.args("opType === 'x' && typeof args[0] === 'string'")
      // TODO: More refinement
      return new Function('Policy', 'contextNormalizer', `return function (normalizedThisArg, normalizedArgs, aclArgs, hookArgs, applyAcl) {
        const opType = aclArgs[4];
        const args = typeof hookArgs[0] === 'string' ? normalizedArgs[1] : normalizedArgs;
        return ${condition};
      }`)(this, contextNormalizer);
    }
    // Track a class with the specified virtual name in ACL
    // Note:
    //  - Not applicable to module namespace objects, which have classes in properties like MODULE_NAME.CLASS_NAME
    static trackClass(virtualName, _class) {
      let gprop = virtualName;
      let gvalue = _class;
      let set = _globalObjects.get(_class);
      if (set) {
        if (set.has(virtualName)) {
          return false; // TODO: this redundancy checking may drop new properties of _class
        }
      }
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
      return true;
    }
    // Avoid cloning of access-controlled global objects to other global objects which have different or no specific ACLs
    static avoidGlobalClone() {
      return function windowAcl(normalizedThisArg,
                                normalizedArgs /* ['property', args], ['property', value], etc. */,
                                aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                hookArgs /* [f, thisArg, args, context, newTarget] */,
                                applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        if (opType === 'w' || opType === 'W') {
          ///console.log('windowAcl:', aclArgs, normalizedArgs);
          if (Array.isArray(aclArgs[3])) {
            switch (normalizedArgs[0]) {
            case 'assign':
              for (let newName in normalizedArgs[1][1]) {
                let value = normalizedArgs[1][1][newName];
                let currentName = _globalObjects.get(value);
                if (currentName instanceof Set) {
                  for (let _currentName of currentName) {
                    if (_currentName !== newName) {
                      if (Reflect.has(acl, _currentName)) {
                        //console.error('windowAcl: cloning access-controlled window.' + _currentName + ' to window.' + newName);
                        return false;
                      }
                    }
                  }
                }
              }
              break;
            case 'defineProperties':
              for (let newName in normalizedArgs[1][1]) {
                let value;
                if (Reflect.has(normalizedArgs[1][1][newName], 'value')) {
                  value = normalizedArgs[1][1][newName].value;
                }
                else if (Reflect.has(normalizedArgs[1][1][newName], 'get')) {
                  value = normalizedArgs[1][1][newName].get.call(normalizedThisArg);
                }
                let currentName = _globalObjects.get(value);
                if (currentName instanceof Set) {
                  for (let _currentName of currentName) {
                    if (_currentName !== newName) {
                      if (Reflect.has(acl, _currentName)) {
                        //console.error('windowAcl: cloning access-controlled window.' + _currentName + ' to window.' + newName);
                        return false;
                      }
                    }
                  }
                }
              }
              break;
            default:
              break;
            }
          }
          else {
            let value;
            let newName;
            switch (normalizedArgs[0]) {
            case 'defineProperty':
              newName = normalizedArgs[1][1];
              if (normalizedArgs[1][2] && typeof normalizedArgs[1][2] === 'object') {
                if (Reflect.has(normalizedArgs[1][2], 'value')) {
                  value = normalizedArgs[1][2].value;
                }
                else if (Reflect.has(normalizedArgs[1][2], 'get')) {
                  value = normalizedArgs[1][2].get.call(normalizedThisArg);
                }
              }
              else {
                return false;
              }
              break;
            case '__defineGetter__':
              newName = normalizedArgs[1][0];
              if (typeof normalizedArgs[1][1] === 'function') {
                value = normalizedArgs[1][1].call(normalizedThisArg);
              }
              else {
                return false;
              }
              break;
            default:
              newName = normalizedArgs[0];
              value = normalizedArgs[1];
              break;
            }
            let currentName = _globalObjects.get(value);
            if (currentName instanceof Set) {
              for (let _currentName of currentName) {
                if (_currentName !== newName) {
                  if (Reflect.has(acl, _currentName)) {
                    //console.error('windowAcl: cloning access-controlled window.' + _currentName + ' to window.' + newName);
                    return false;
                  }
                }
              }
            }
          }
        }
        return 'rwxRW'[opTypeMap[opType]] === opType; // equivalent to 'rwxRW' acl
      };
    }
  };
  const tagToElementClass = { // from w3schools.com - may be incomplete
    a: 'HTMLAnchorElement',
    abbr: 'HTMLElement',
    acronym: 'HTMLElement',
    address: 'HTMLElement',
    applet: 'HTMLUnknownElement',
    area: 'HTMLAreaElement',
    article: 'HTMLElement',
    aside: 'HTMLElement',
    audio: 'HTMLAudioElement',
    b: 'HTMLElement',
    base: 'HTMLBaseElement',
    basefont: 'HTMLElement',
    bdi: 'HTMLElement',
    bdo: 'HTMLElement',
    big: 'HTMLElement',
    blockquote: 'HTMLQuoteElement',
    body: 'HTMLBodyElement',
    br: 'HTMLBRElement',
    button: 'HTMLButtonElement',
    canvas: 'HTMLCanvasElement',
    caption: 'HTMLTableCaptionElement',
    center: 'HTMLElement',
    cite: 'HTMLElement',
    code: 'HTMLElement',
    col: 'HTMLTableColElement',
    colgroup: 'HTMLTableColElement',
    data: 'HTMLDataElement',
    datalist: 'HTMLDataListElement',
    dd: 'HTMLElement',
    del: 'HTMLModElement',
    details: 'HTMLDetailsElement',
    dfn: 'HTMLElement',
    dialog: 'HTMLDialogElement',
    dir: 'HTMLDirectoryElement',
    div: 'HTMLDivElement',
    dl: 'HTMLDListElement',
    dt: 'HTMLElement',
    em: 'HTMLElement',
    embed: 'HTMLEmbedElement',
    fieldset: 'HTMLFieldSetElement',
    figcaption: 'HTMLElement',
    figure: 'HTMLElement',
    font: 'HTMLFontElement',
    footer: 'HTMLElement',
    form: 'HTMLFormElement',
    frame: 'HTMLFrameElement',
    frameset: 'HTMLFrameSetElement',
    h1: 'HTMLHeadingElement',
    h2: 'HTMLHeadingElement',
    h3: 'HTMLHeadingElement',
    h4: 'HTMLHeadingElement',
    h5: 'HTMLHeadingElement',
    h6: 'HTMLHeadingElement',
    head: 'HTMLHeadElement',
    header: 'HTMLElement',
    hr: 'HTMLHRElement',
    html: 'HTMLHtmlElement',
    i: 'HTMLElement',
    iframe: 'HTMLIFrameElement',
    img: 'HTMLImageElement',
    input: 'HTMLInputElement',
    ins: 'HTMLModElement',
    kbd: 'HTMLElement',
    label: 'HTMLLabelElement',
    legend: 'HTMLLegendElement',
    li: 'HTMLLIElement',
    link: 'HTMLLinkElement',
    main: 'HTMLElement',
    map: 'HTMLMapElement',
    mark: 'HTMLElement',
    menu: 'HTMLMenuElement',
    menuitem: 'HTMLUnknownElement',
    meta: 'HTMLMetaElement',
    meter: 'HTMLMeterElement',
    nav: 'HTMLElement',
    noframes: 'HTMLElement',
    noscript: 'HTMLElement',
    object: 'HTMLObjectElement',
    ol: 'HTMLOListElement',
    optgroup: 'HTMLOptGroupElement',
    option: 'HTMLOptionElement',
    output: 'HTMLOutputElement',
    p: 'HTMLParagraphElement',
    param: 'HTMLParamElement',
    picture: 'HTMLPictureElement',
    pre: 'HTMLPreElement',
    progress: 'HTMLProgressElement',
    q: 'HTMLQuoteElement',
    rp: 'HTMLElement',
    rt: 'HTMLElement',
    ruby: 'HTMLElement',
    s: 'HTMLElement',
    samp: 'HTMLElement',
    script: 'HTMLScriptElement',
    section: 'HTMLElement',
    select: 'HTMLSelectElement',
    slot: 'HTMLSlotElement',
    small: 'HTMLElement',
    source: 'HTMLSourceElement',
    span: 'HTMLSpanElement',
    strike: 'HTMLElement',
    strong: 'HTMLElement',
    style: 'HTMLStyleElement',
    sub: 'HTMLElement',
    summary: 'HTMLElement',
    sup: 'HTMLElement',
    table: 'HTMLTableElement',
    tbody: 'HTMLTableSectionElement',
    td: 'HTMLTableCellElement',
    template: 'HTMLTemplateElement',
    textarea: 'HTMLTextAreaElement',
    tfoot: 'HTMLTableSectionElement',
    th: 'HTMLTableCellElement',
    thead: 'HTMLTableSectionElement',
    time: 'HTMLTimeElement',
    title: 'HTMLTitleElement',
    tr: 'HTMLTableRowElement',
    track: 'HTMLTrackElement',
    tt: 'HTMLElement',
    u: 'HTMLElement',
    ul: 'HTMLUListElement',
    var: 'HTMLElement',
    video: 'HTMLVideoElement',
    wbr: 'HTMLElement',
  };
  const acl = {
    // blacklist objects/classes
    caches: '---',
    __hook__: '---', // TODO: ineffective
    __unexpected_access_to_hook_callback_function__: '---',
    __unexpected_access_to_hook_with_object__: '---',
    __unexpected_access_to_hook_alias_object__: '---',
    hook: '---',
    $hook$: '---',
    top: 'r--',
    parent: 'r--',
    frames: 'r--',
    global: 'r--',
    self: 'r--',
    _global: 'r--',
    [mainGlobalObjectName]: { // overwrite self: in worker threads
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: Policy.avoidGlobalClone(),
      [S_ALL]: '---',
      '@window_enumerator': 'r--R-',
      caches: '---',
      __hook__: '---',
      __unexpected_access_to_hook_callback_function__: '---',
      __unexpected_access_to_hook_with_object__: '---',
      __unexpected_access_to_hook_alias_object__: '---',
      hook: '---',
      $hook$: '---',
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
        '@Function_js': 'r--',
      },
      btoa: {
        [S_DEFAULT]: 'r-x',
        '@normalization_checker': '---',
        '@bind_normalization_checker': 'r--',
      }
    },
    Window: {
      [S_DEFAULT]: 'r--',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'r--',
        '@window_enumerator': 'r--R-',
        addEventListener: {
          [S_DEFAULT]: '--x',
          '@Node_prototype_writer': 'rwx',
        },
        removeEventListener: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
      },
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
      '@normalization_checker': 'r-x',
      '@bind_normalization_checker': 'r-x',
    },
    Object: {
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: '--x',
      '@Object_static_method_reader': 'r--',
      '@Object_static_method_user': 'r-x',
      '@Object_assign_reader': 'r--',
      '@Object__proto__reader': 'r--',
      '@normalization_checker': 'r--',
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
        '@normalization_checker': 'r-x',
        '@bind_normalization_checker': 'r-x',
      },
      defineProperty: {
        [S_DEFAULT]: '--x',
        '@Object_defineProperty_reader': 'r--',
        '@bind_normalization_checker': 'r-x',
      },
      assign: {
        [S_DEFAULT]: '--x',
        '@Object_assign_reader': 'r-x',
      },
      $prototype$: 'r--',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        '@HTMLElement_prototype_reader': 'r--',
        '@Object_prototype_reader': 'r-x',
        '@window_enumerator': 'r--R-',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'rwx',
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
          dummyObjectMethod: {
            [S_DEFAULT]: 'r-x',
            '@bind_normalization_checker': '---',
          },
        },
      },
      // Polymer examines 'Object' as a Polymer property descriptor object since vaadin-grid.properties._rowDetailsTemplate has the value 'Object'.
      // Note: The following 5 ACLs are unnecessary if the vaadin-grid element is not defined.
      computed: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'r--',
      },
      readOnly: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'r--',
      },
      reflectToAttribute: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'r--',
      },
      notify: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'r--',
      },
      observer: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'r--',
      },
    },
    import: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@Module_importer': '--x',
      },
      [S_DEFAULT]: '---',
      invalidImportUrl: '---',
      meta: {
        [S_DEFAULT]: function importMetaAcl(normalizedThisArg,
                                            normalizedArgs /* ['property', args], ['property', value], etc. */,
                                            aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                            hookArgs /* [f, thisArg, args, context, newTarget] */,
                                            applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          const contexts = {
            '@import.meta_reader': true,
            '@import.meta_reader,f': true,
          };
          if (contexts.hasOwnProperty(aclArgs[5]) && opType === 'r') {
            Policy.trackClass('import.meta', hookArgs[0]());
            return true;
          }
          return false;
        },
        url: {
          [S_DEFAULT]: '---',
          '@import.meta_reader': 'r--',
        },
      },
    },
    'import.meta': {
      [S_CHAIN]: () => acl.import.meta,
    },
    require: {
      [S_OBJECT]: {
        [S_DEFAULT]: function requireAcl(normalizedThisArg,
                                         normalizedArgs /* ['require', './module.js'] */,
                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                         applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          if (opType === 'x') {
            console.log('requireAcl: ' + hookArgs[3] + ': require(' + (normalizedArgs[1] ? '\'' + normalizedArgs[1].toString() + '\'' : normalizedArgs[1]) + ') resolved = ' + normalizedArgs[2].toString());
            // recursively apply ACL for the target module for reading
            return applyAcl(normalizedArgs[2], true, true, S_UNSPECIFIED, 'r', hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          }
          else {
            console.log('requireAcl: ' + hookArgs[3] + ': opType = ' + opType + ' for require');
            return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
          }
        },
      },
      [S_DEFAULT]: '---',
      invalidRequireName: '---',
    },
    navigator: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'r--',
        '@normalization_checker': 'r--R-',
        '@normalization_checker_cannot_access_navigator': '---',
      },
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
      [S_OBJECT]: {
        [S_DEFAULT]: 'r--',
        '@location_setter': 'rw-',
      },
      [S_DEFAULT]: 'r--',
      [S_ALL]: '---',
      reload: {
        [S_DEFAULT]: '---',
        '@route_manipulator': 'r-x',
      },
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
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@worker_manipulator': function _WorkerAcl(normalizedThisArg,
                                                   normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                   aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                   hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                   applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          if (opType === 'x') {
            let url = normalizedArgs[0].trim().toLowerCase();
            if (url.startsWith('blob:') || url.startsWith('data:')) {
              return false;
            }
          }
          return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
        },
      },
      [S_DEFAULT]: '---',
      [S_ALL]: '---',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_ALL]: '---',
        [S_INSTANCE]: {
          [S_DEFAULT]: '---',
          '@worker_manipulator': 'rwx',
        },
      },
    },
    SharedWorker: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@shared_worker_manipulator': function _WorkerAcl(normalizedThisArg,
                                                          normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                          aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                          hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                          applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          if (opType === 'x') {
            let url = normalizedArgs[0].trim().toLowerCase();
            if (url.startsWith('blob:') || url.startsWith('data:')) {
              return false;
            }
          }
          return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
        },
      },
      [S_DEFAULT]: '---',
      [S_ALL]: '---',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_ALL]: '---',
        [S_INSTANCE]: {
          [S_DEFAULT]: '---',
          '@shared_worker_manipulator': 'rwx',
        },
      },
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
          '@custom_error_constructor_creator': 'rwxRW',
          '@firebase_app': 'rwx',
        },
      }
    },
    EventTarget: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: 'r-x',
      [S_ALL]: '---',
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_prototype_reader': 'r--',
        '@window_enumerator': 'r--R-',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'r-x',
          [S_ALL]: '---',
        },
      },
    },
    Node: {
      [S_CHAIN]: () => acl.EventTarget,
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: 'r-x',
      [S_ALL]: '---',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_prototype_reader': 'r--',
        '@Node_prototype_reader': 'r--',
        '@Object_assign_reader': 'r--',
        addEventListener: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        removeEventListener: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        appendChild: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
          '@Node_prototype_writer': 'rwxRW',
        },
        removeChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        replaceChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        insertBefore: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        cloneNode: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        getRootNode: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        isConnected: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        dispatchEvent: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        parentElement: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        parentNode: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        nextSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        previousSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        childNodes: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@Node_prototype_reader': 'rwxR-',
        },
        lastChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        textContent: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        innerHTML: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        baseURI: {
          [S_DEFAULT]: 'r--',
          '@Object_assign_reader': 'rw--W',
          '@Node_prototype_reader': 'rw-R-',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        className: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        nextElementSibling: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        previousElementSibling: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        childElementCount: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        activeElement: {
          [S_DEFAULT]: 'r--',
          '@Node_prototype_writer': 'rwxRW',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'r-x',
          [S_ALL]: '---',
        },
      },
    },
    Text: {
      [S_DEFAULT]: 'r-x',
      [S_CHAIN]: () => acl.Node,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        '@HTMLElement___shady_writer': 'rwxRW',
        '@Node_prototype_writer': 'rwxRW',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'rwx', // TODO: Loose ACL
          '@HTMLElement___shady_writer': 'rwxRW',
        },
      },
    },
    TreeWalker: {
      [S_DEFAULT]: 'r-x',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'r-x',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'r-x',
          '@TreeWalker_writer': 'rwx',
        },
      },
    },
    Element: {
      [S_DEFAULT]: 'r-x',
      [S_CHAIN]: () => acl.Node,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_prototype_reader': 'r--',
        '@Object_assign_reader': 'r--',
        animate: {
          [S_DEFAULT]: 'r-x',
          '@web_animations_next_lite': 'rwx',
        },
        getAnimations: {
          [S_DEFAULT]: 'r-x',
          '@web_animations_next_lite': 'rwx',
        },
        matches: {
          [S_DEFAULT]: 'r--',
          '@Element_matches_reader': 'r--',
        },
        addEventListener: 'r-x',
        removeEventListener: 'r-x',
        appendChild: 'r-x',
        setAttribute: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        setAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        getAttribute: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        getAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        removeAttribute: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        removeAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        attachShadow: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        insertAdjacentElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        before: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        after: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        slot: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        assignedSlot: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        querySelector: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        querySelectorAll: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        assignedNodes: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        shadowRoot: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        className: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        nextElementSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        previousElementSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        innerHTML: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        replaceWith: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        remove: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'rwx',
          // Note: This ACL may significantly degrade performance
          innerHTML: function innerHtmlAcl(normalizedThisArg,
                                           normalizedArgs /* ['property', args], ['property', value], etc. */,
                                           aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                           hookArgs /* [f, thisArg, args, context, newTarget] */,
                                           applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            let result = 'rw-'[opTypeMap[opType]] === opType;
            if (result) {
              if (opType === 'w') {
                //console.log('set innerHTML: context = ' + hookArgs[3]);
                let stream = new HTMLParser.WritableStream({
                  onopentag(name, attributes) {
                    //console.log('set innerHTML: tagName = ' + name);
                    // TODO: Apply ACL for attributes as well with normalization of attributes to properties (mostly identical)
                    result = result && applyAcl('document', true, true, 'createElement', 'x', hookArgs[3], document, ['createElement', [name.toLowerCase()]], hookArgs);
                  },
                });
                stream.write(normalizedArgs[1]);
                stream.end();
              }
            }
            return result;
          },
        },
      },
    },
    HTMLElement: {
      [S_DEFAULT]: 'r-x',
      [S_CHAIN]: () => acl.Element,
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_writer': 'rwx',
      },
      $prototype$: {
        [S_DEFAULT]: 'r--',
        '@HTMLElement_prototype_reader': 'r--',
      },
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_ALL]: '---',
        '@HTMLElement_prototype_reader': 'r--',
        [S_DEFAULT]: 'r-x',
        textContent: {
          [S_DEFAULT]: 'rw-',
          '@Node_prototype_writer': 'rwxRW',
        },
        innerHTML: {
          [S_DEFAULT]: '---',
          '@HTMLElement_prototype_reader': 'r--R-',
          '@Node_prototype_writer': 'rwxRW',
        },
        blur: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        __shady: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement___shady_writer': 'rwx',
          '@Object_assign_reader': 'rwx',
        },
        insertAdjacentElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        type: 'rw-',
        __dataHost: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement___dataHost_writer': 'rwx',
        },
        __domApi: {
          [S_DEFAULT]: 'r-x',
          '@Event___domApi_writer': 'rwx',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          $__proto__$: {
            [S_DEFAULT]: 'r--',
            '@HTMLElement_proto_writer': 'rw-',
          },
        },
      },
    },
    HTMLVideoElement: {
      [S_CHAIN]: () => acl.HTMLMediaElement,
    },
    HTMLUnknownElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLUListElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTrackElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTitleElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTimeElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTextAreaElement: {
      [S_CHAIN]: () => acl.HTMLElement,
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
      },
    },
    HTMLTableSectionElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTableRowElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTableElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTableColElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTableCellElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLTableCaptionElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLStyleElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLSpanElement: {
      [S_CHAIN]: () => acl.HTMLElement,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          'lang': {
            [S_DEFAULT]: 'rw-',
            '@lang_descriptor_reader': 'rw-R-',
          },
        },
      },
    },
    HTMLSourceElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLSlotElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLShadowElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLSelectElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLScriptElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLQuoteElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLProgressElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLPreElement: {
      [S_CHAIN]: () => acl.HTMLElement,
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@document_writer': '---',
      },
      '@document_writer': '---',
    },
    HTMLPictureElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLParamElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLParagraphElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLOutputElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLOptionElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLOptGroupElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLObjectElement: {
      [S_CHAIN]: () => acl.HTMLElement,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          contentDocument: {
            [S_DEFAULT]: '---',
            '@svg_contentWindow_accessor': function _svgContentDocumentAcl(normalizedThisArg,
                                                                           normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                           aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                           hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                           applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('data') || !normalizedThisArg.data) {
                return false; // reject on empty data
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg.contentWindow;
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
          contentWindow: {
            [S_DEFAULT]: '---',
            '@svg_contentWindow_accessor': function _svgContentWindowAcl(normalizedThisArg,
                                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                         applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('data') || !normalizedThisArg.data) {
                return false; // reject on empty data
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg[normalizedArgs[0]]
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
        },
      },
    },
    HTMLOListElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLModElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMeterElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMetaElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMenuElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMediaElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMarqueeElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLMapElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLLinkElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLLegendElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLLabelElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLLIElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLInputElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLImageElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLIFrameElement: {
      [S_CHAIN]: () => acl.HTMLElement,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          addEventListener: {
            [S_DEFAULT]: '---',
            '@iframe_contentWindow_accessor': function _iframeAddEventListenerAcl(normalizedThisArg,
                                                                                  normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                                  aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                                  hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                                  applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (opType === 'x') {
                if (normalizedArgs[1] && normalizedArgs[1][0] === 'load') {
                  if (!normalizedThisArg.src) {
                    normalizedThisArg.src = emptyDocumentURL;
                  }
                  if (hookArgs[0] === '()' || hookArgs[0] === '#()') {
                    if (hookArgs[1] === normalizedThisArg && hookArgs[2][1][0] === 'load') {
                      let onloadAttribute = normalizedThisArg.getAttribute('onload');
                      if (onloadAttribute && 
                          (onloadAttribute.startsWith('event.target.contentDocument.write(') ||
                           onloadAttribute.startsWith('let iframe = this; fetch(new Request('))) {
                        hookArgs[2][1][0] = 'srcdoc-load';
                      }
                    }
                  }
                }
              }
              return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
            },
          },
          onload: {
            [S_DEFAULT]: '---',
            '@iframe_contentWindow_accessor': function _iframeOnloadAcl(normalizedThisArg,
                                                                        normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                        aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                        hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                        applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (opType === 'w') {
                if (hookArgs[1] === normalizedThisArg && hookArgs[2][0] === normalizedArgs[0]) {
                  let onloadAttribute = normalizedThisArg.getAttribute('onload');
                  if (onloadAttribute && 
                      (onloadAttribute.startsWith('event.target.contentDocument.write(') ||
                       onloadAttribute.startsWith('let iframe = this; fetch(new Request('))) {
                    hookArgs[2][0] = '_onload'; // dummy to avoid overriding the existing onload event converted from srcdoc
                    normalizedThisArg.addEventListener('srcdoc-load', hookArgs[2][1]); // Redirect to srcdoc-load
                  }
                }
              }
              return 'rw-'[opTypeMap[opType]] === opType; // equivalent to 'rw-' acl
            },
          },
          contentDocument: {
            [S_DEFAULT]: '---',
            '@iframe_contentWindow_accessor': function _iframeContentDocumentAcl(normalizedThisArg,
                                                                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                                 aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                                 applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
                return false; // reject on empty src
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg.contentWindow;
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
          contentWindow: {
            [S_DEFAULT]: '---',
            '@iframe_contentWindow_accessor': function _iframeContentWindowAcl(normalizedThisArg,
                                                                               normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                               aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                               hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                               applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
                return false; // reject on empty src
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg[normalizedArgs[0]]
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
        },
      },
    },
    HTMLHtmlElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLHeadingElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLHeadElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLHRElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLFrameSetElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLFrameElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLFormElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLFontElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLFieldSetElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLEmbedElement: {
      [S_CHAIN]: () => acl.HTMLElement,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          contentDocument: {
            [S_DEFAULT]: '---',
            '@svg_contentWindow_accessor': function _svgContentDocumentAcl(normalizedThisArg,
                                                                           normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                           aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                           hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                           applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
                return false; // reject on empty src
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg.contentWindow;
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
          contentWindow: {
            [S_DEFAULT]: '---',
            '@svg_contentWindow_accessor': function _svgContentWindowAcl(normalizedThisArg,
                                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                         applyAcl /* for recursive application of ACL */) {
              let opType = aclArgs[4];
              if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
                return false; // reject on empty src
              }
              if (this.contentWindow && !this.contentWindow.__hook__) {
                return false; // reject on missing hook infrastructure
              }
              if (opType === 'r') {
                let contentWindow = normalizedThisArg[normalizedArgs[0]]
                otherWindowObjects.set(contentWindow.Object, contentWindow);
                otherWindowObjectsStatus.set = true;
              }
              return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
            },
          },
        },
      },
    },
    HTMLDivElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDirectoryElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDialogElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDetailsElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDataListElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDataElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLDListElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLContentElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLCanvasElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLButtonElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLBodyElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLBaseElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLBRElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLAudioElement: {
      [S_CHAIN]: () => acl.HTMLMediaElement,
    },
    HTMLAreaElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    HTMLAnchorElement: {
      [S_CHAIN]: () => acl.HTMLElement,
    },
    Array: {
      [S_DEFAULT]: 'r-x',
      '@super_normalization_checker': '---',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'rwx',
        map: {
          [S_DEFAULT]: 'r-x',
          '@bind_normalization_checker': 'r--',
        },
        [S_INSTANCE]: {
          [S_DEFAULT]: 'rwxRW',
        },
      },
    },
    Function: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE], // Function is an instance of Function itself
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@Function_reader': 'r-x',
        '@Function_js': 'r-x',
        '@Function_cannotBindFunction': '--x',
        '@normalization_checker': 'r-x',
        '@Polymer_lib': 'r-x',
        '@Object_prototype_reader': 'r--',
      },
      [S_DEFAULT]: 'r-x',
      '@bind_normalization_checker': 'r-x',
      $__proto__$: 'r--',
      $prototype$: 'r--',
      $constructor$: 'r-x',
      [S_PROTOTYPE] : {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        [S_DEFAULT]: 'r-x',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: function defaultAcl(normalizedThisArg,
                                           normalizedArgs /* ['property', args], ['property', value], etc. */,
                                           aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                           hookArgs /* [f, thisArg, args, context, newTarget] */,
                                           applyAcl /* for recursive application of ACL */) {
            if (aclArgs[4] === 'x') {
              if (normalizedThisArg instanceof Object) {
                let property = normalizedArgs[0];
                if (Reflect.has(normalizedThisArg, property)) {
                  let value = normalizedThisArg[property];
                  let name = _globalMethods.get(value);
                  if (name) {
                    let rawProp = name[name.length - 1];
                    let prop = _escapePlatformProperties.get(rawProp) || rawProp;
                    let obj = name[0];
                    // Apply ACL for the global method
                    return applyAcl(obj, name[1] !== 'prototype', !Object.prototype.hasOwnProperty.call(normalizedThisArg, property), prop, 'x', hookArgs[3], _global[obj], [rawProp, normalizedArgs[1]], hookArgs);
                  }
                }
              }
            }
            return true; // equivalent to 'rwx' acl
          },
          [S_ALL]: 'r--',
          $__proto__$: 'rw-',
          $prototype$: 'rw-',
          $constructor$: 'r-x',
          apply: 'r-x',
          call: 'r-x',
          bind: {
            [S_DEFAULT]: 'r-x',
            '@bind_normalization_checker': '--x',
          },
        },
      },
    },
    Event: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
      [S_DEFAULT]: 'r-x',
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@Object_assign_reader': 'rwx',
      },
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        [S_DEFAULT]: 'r-x',
        __patchProto: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'rwx',
          $__proto__$: {
            [S_DEFAULT]: 'rw-', // TODO: Loose ACL
            '@Event__target_writer': 'rwx',
          },
          ja: {
            [S_DEFAULT]: 'r-x',
            '@Event_ja_writer': 'rwx',
          },
          __target: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          za: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          Bb: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          composed: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          composedPath: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          target: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          relatedTarget: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          stopPropagation: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          stopImmediatePropagation: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwxRW',
          },
          __target: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          za: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          __target: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          za: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          __target: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
          za: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
        },
      },
    },
    UIEvent: {
      [S_CHAIN]: () => acl.Event,
    },
    CustomEvent: {
      [S_CHAIN]: () => acl.Event,
      [S_DEFAULT]: 'r-x',
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@Object_assign_reader': 'rwx',
      },
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        $__proto__$: {
          [S_DEFAULT]: 'r--',
          '@Event__target_writer': 'rw-',
        },
        __patchProto: {
          [S_DEFAULT]: 'r--',
          '@Event__target_writer': 'rw-',
        },
        composed: {
          [S_DEFAULT]: 'r--',
          '@Event_composed_writer': 'rw-',
        },
        composedPath: {
          [S_DEFAULT]: 'r--',
          '@Event_composed_writer': 'rw-RW',
          '@Event_composedPath_executor': 'rwx',
        },
        stopPropagation: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwx',
        },
        stopImmediatePropagation: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwx',
        },
        target: {
          [S_DEFAULT]: 'r--',
          '@Event_composed_writer': 'rw-',
        },
        relatedTarget: {
          [S_DEFAULT]: 'r--',
          '@Event_composed_writer': 'rw-',
        },
        __target: {
          [S_DEFAULT]: 'r--',
          '@Event__target_writer': 'rw-',
        },
        ja: {
          [S_DEFAULT]: 'r--',
          '@Event_ja_writer': 'rw-',
        },
        za: {
          [S_DEFAULT]: 'r--',
          '@Event__target_writer': 'rw-',
        },
        Bb: {
          [S_DEFAULT]: 'r--',
          '@Event__target_writer': 'rw-',
        },
        ya: {
          [S_DEFAULT]: 'r--',
          '@Event_ya_writer': 'rw-',
        },
      },
    },
    FocusEvent: {
      [S_CHAIN]: () => acl.UIEvent,
      [S_DEFAULT]: 'r-x',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          composed: {
            [S_DEFAULT]: 'r--',
            '@Event_composed_writer': 'rw-RW',
          },
          currentTarget: {
            [S_DEFAULT]: 'r--',
            '@FocusEvent_currentTarget_writer': 'rwxRW',
          },
          eventPhase: {
            [S_DEFAULT]: 'r--',
            '@FocusEvent_currentTarget_writer': 'rwxRW',
          },
        },
      },
    },
    MouseEvent: {
      [S_CHAIN]: () => acl.UIEvent,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          $__proto__$: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
        },
      },
    },
    WheelEvent: {
      [S_CHAIN]: () => acl.MouseEvent,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          $__proto__$: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
        },
      },
    },
    AnimationEvent: {
      [S_CHAIN]: () => acl.Event,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          $__proto__$: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
        },
      },
    },
    KeyboardEvent: {
      [S_CHAIN]: () => acl.UIEvent,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          $__proto__$: {
            [S_DEFAULT]: 'r-x',
            '@Event__target_writer': 'rwx',
          },
        },
      },
    },
    DocumentFragment: {
      [S_CHAIN]: () => acl.Node,
      [S_DEFAULT]: 'r-x',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        $__proto__$: {
          [S_DEFAULT]: 'r--',
          '@DocumentFragment_$__proto__$_writer': 'rw-',
        },
        querySelector: {
          [S_DEFAULT]: '--x',
          '@Node_prototype_writer': 'rwxRW',
          '@DocumentFragment_querySelector_reader': 'r-x',
        },
        querySelectorAll: {
          [S_DEFAULT]: '--x',
          '@Node_prototype_writer': 'rwxRW',
          '@DocumentFragment_querySelectorAll_reader': 'r-x',
          '@DocumentFragment_querySelector_reader': 'r-x',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
          '@Node_prototype_writer': 'rwxRW',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
          '@Node_prototype_writer': 'rwxRW',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'rwx',
          $__proto__$: {
            [S_DEFAULT]: 'r-x',
            '@DocumentFragment_$__proto__$_writer': 'rwx',
          },
          _renderRoot: {
            [S_DEFAULT]: 'r-x',
            '@Object_assign_reader': 'rwx',
          },
          addEventListener: {
            [S_DEFAULT]: 'r-x',
            '@Object_assign_reader': 'rwx',
          },
          removeEventListener: {
            [S_DEFAULT]: 'r-x',
            '@Object_assign_reader': 'rwx',
          },
          getElementById: {
            [S_DEFAULT]: 'r-x',
            '@Object_assign_reader': 'rwx',
          },
          childNodes: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          children: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          childElementCount: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          firstChild: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          lastChild: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          textContent: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          firstElementChild: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          lastElementChild: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          innerHTML: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
          activeElement: {
            [S_DEFAULT]: 'rwx',
            '@Node_prototype_writer': 'rwxRW',
          },
        },
      },
    },
    Date: {
      [S_DEFAULT]: 'r-x',
      now: {
        [S_DEFAULT]: 'r-x',
        '@bind_normalization_checker': 'r--',
      },
    },
    Math: {
      [S_DEFAULT]: 'r-x',
      PI: {
        [S_DEFAULT]: 'r--',
        '@normalization_checker': 'r--R-',
      },
    },
    Crypto: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        getRandomValues: '---',
        subtle: '---',
        [S_INSTANCE]: {
          getRandomValues: '--x',
          subtle: {
            [S_CHAIN]: () => acl.SubtleCrypto[S_PROTOTYPE][S_INSTANCE],
          },
        },
      },
    },
    crypto: {
      [S_CHAIN]: () => acl.Crypto[S_PROTOTYPE][S_INSTANCE],
    },
    SubtleCrypto: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        [S_DEFAULT]: '---',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'r-x',
        },
      },
    },
    btoa: {
      [S_DEFAULT]: 'r-x',
    },
    setTimeout: {
      [S_DEFAULT]: 'r-x',
      '@setTimeout_reader': 'r-x',
      '@firebase_app': 'r-x',
      '@process_browser_js': 'r-x',
    },
    Document: {
      [S_CHAIN]: () => acl.Node,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        createElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        createElementNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        importNode: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        getElementById: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        querySelector: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        querySelectorAll: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        activeElement: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        },
        _activeElement: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwxRW',
        },
      },
    },
    HTMLDocument: {
      [S_CHAIN]: () => acl.Document,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          __shady: {
            [S_DEFAULT]: 'r-x',
            '@HTMLElement___shady_writer': 'rwx',
          },
        },
      },
    },
    document: {
      [S_CHAIN]: () => acl.HTMLDocument[S_PROTOTYPE][S_INSTANCE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      write: {
        [S_DEFAULT]: '---',
        // TODO: Apply ACL for tags in HTML like in Element.innerHTML ACL
        '@document_writer': '--x',
      },
      timeline: {
        [S_DEFAULT]: 'r-x',
        '@web_animations_next_lite': 'rwxRW',
      },
      createElement: {
        [S_DEFAULT]: function createElementAcl(normalizedThisArg,
                                               normalizedArgs /* ['property', args], ['property', value], etc. */,
                                               aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                               hookArgs /* [f, thisArg, args, context, newTarget] */,
                                               applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let result = (aclArgs[5] === '@document_createElement_reader' ? 'r-x' : '--x')[opTypeMap[opType]] === opType;
          if (result) {
            if (opType === 'x') {
              //console.log('document.createElement: tagName = ' + normalizedArgs[1][0] + ' context = ' + hookArgs[3]);
              // This ACL can be forwarded to its corresponding HTMLElement subclass ACL or a custom element ACL like the following
              let tag = normalizedArgs[1][0].toLowerCase();
              let name;
              if (tagToElementClass.hasOwnProperty(tag)) {
                name = tagToElementClass[tag];
              }
              if (!name) {
                if (tag.indexOf('-') < 0) {
                  // Supplement missing tag in the table for the next lookup
                  name = tagToElementClass[tag] = document.createElement(tag).constructor.name;
                  console.log('createElementAcl: Supplement the missing tag "' + tag + '" with "' + tagToElementClass[tag] + '" in tagToElementClass table');
                }
                else {
                  // Custom Elements with hyphen(s) in the name
                  // Note: Use the custom element name itself as its virtual object name in ACL here for now.
                  //       The name can be customized such as 'CustomElement:tag-name' to avoid name conflicts in ACL.
                  // Note: The custom element may not be defined yet.
                  name = tag;
                }
              }
              // Apply ACL for the element class
              result = applyAcl(name, true, true, S_UNSPECIFIED, 'x', hookArgs[3], HTMLElement /* TODO: More appropriate normalizedThisArg */, [], hookArgs);
            }
          }
          return result;
        },
      },
      createElementNS: {
        [S_DEFAULT]: function createElementNSAcl(normalizedThisArg,
                                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                 aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                 applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let result = '--x'[opTypeMap[opType]] === opType;
          if (result) {
            if (opType === 'x') {
              // This ACL can be forwarded to its corresponding HTMLElement subclass ACL or a custom element ACL like the following
              let tag = normalizedArgs[1][1].toLowerCase();
              let name;
              if (tagToElementClass.hasOwnProperty(tag)) {
                name = tagToElementClass[tag];
              }
              if (!name) {
                if (tag.indexOf('-') < 0) {
                  // Supplement missing tag in the table for the next lookup
                  name = tagToElementClass[tag] = document.createElementNS(normalizedArgs[1][0], tag).constructor.name;
                  console.log('createElementNSAcl: Supplement the missing tag "' + tag + '" with "' + tagToElementClass[tag] + '" in tagToElementClass table');
                }
                else {
                  // Custom Elements with hyphen(s) in the name
                  // Note: Use the custom element name itself as its virtual object name in ACL here for now.
                  //       The name can be customized such as 'CustomElement:tag-name' to avoid name conflicts in ACL.
                  // Note: The custom element may not be defined yet.
                  name = tag;
                }
              }
              // Apply ACL for the element class
              result = applyAcl(name, true, true, S_UNSPECIFIED, 'x', hookArgs[3], HTMLElement /* TODO: More appropriate normalizedThisArg */, [], hookArgs);
            }
          }
          return result;
        },
      },
      __handlers: {
        [S_DEFAULT]: 'r-x',
        '@Event_composedPath_executor': 'rwx',
      },
      __CE_hasRegistry: {
        [S_DEFAULT]: 'r-x',
        '@Object_assign_reader': 'rwx',
      },
    },
    // Custom Elements
    customElements: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE][S_INSTANCE],
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@customElements_reader': 'r--',
        '@Event___domApi_writer': 'r--',
        '@Polymer_lib': 'r--',
        '@Object_assign_reader': 'rwxRW', // webcomponents-lite.js
      },
      [S_DEFAULT]: '---',
      define: {
        [S_DEFAULT]: '---',
        '@Object_assign_reader': 'rwx',
        '@customElements_reader': 'rwx',
        '@Polymer_lib': function customElementsDefineAcl(normalizedThisArg,
                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                         applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let args = normalizedArgs[1];
          if (opType === 'x') {
            let name = args[0];
            let ctor = args[1];
            let base = Object.getPrototypeOf(ctor);
            //console.log('customElementsDefineAcl context = ' + hookArgs[3] + ' element name = ' + name);
            if (!Reflect.has(acl, name)) {
              const baseElementsMap = {
                PolymerGenerated: 'Polymer.LegacyElement',
                PolymerElement: 'Polymer.Element',
                HTMLElement: 'HTMLElement',
                // Element is omitted
                Function: 'Function',
                Object: 'Object',
              };
              let proto = Object.getPrototypeOf(ctor);
              while (proto && !Reflect.has(baseElementsMap, proto.name)) {
                proto = Object.getPrototypeOf(proto);
              }
              // Register acl[name], chained to the base class
              if (proto && Reflect.has(baseElementsMap, proto.name)) {
                Policy.trackClass(baseElementsMap[proto.name], proto);
                acl[name] = Object.create(acl[baseElementsMap[proto.name]]);
              }
              else {
                acl[name] = Object.create(acl.HTMLElement);
              }
            }
            return Policy.trackClass(name, ctor); // synchronous just before definition
          }
          else {
            return false;
          }
        },
      },
      get: {
        [S_DEFAULT]: '--x',
        '@Object_assign_reader': 'r-x',
      },
      whenDefined: {
        [S_DEFAULT]: '--x',
      },
      forcePolyfill: {
        [S_DEFAULT]: '---',
        '@Object_assign_reader': 'r--',
      },
      polyfillWrapFlushCallback: {
        [S_DEFAULT]: '---',
        '@Object_assign_reader': 'rwx',
        '@Event___domApi_writer': 'r-x',
      },
      '@Object_assign_reader': 'rwx',
      '@customElements_reader': 'r--',
    },
    Polymer: {
      [S_DEFAULT]: 'rwx', // TODO: Loose ACL
      '@Polymer_lib': 'rwxRW', // TODO: Loose ACL
    },
    // Example base policy for custom elements generated via the Polymer({}) legacy method
    'Polymer.LegacyElement': { // virtual name
      [S_CHAIN]: () => acl.HTMLElement, // TODO: should be Polymer.Element virtual object
      [S_OBJECT]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
      },
      '@Polymer_element_mixin': 'rwx',
      '@iron-a11y-announcer': 'rw-',
      '@Polymer_lib': 'rwx',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: '---',
        $__proto__$: {
          [S_DEFAULT]: '---',
          '@Polymer_element_mixin': 'rw-',
        },
        $constructor$: {
          [S_DEFAULT]: '---',
          '@customElements_reader': 'r--',
          '@Object_assign_reader': 'r--',
          '@Polymer_element_mixin': 'r--',
          '@Node_prototype_reader': 'r--',
          '@Polymer_property_effects': 'r--',
        },
        '@Polymer_element_mixin': 'rwx',
        '@Polymer_legacy_element_mixin': 'rwx',
        '@Polymer_property_effects': 'rwx',
        '@Polymer_property_accessors': 'rwxRW',
        '@Polymer_legacy_class': 'rwx',
        '@iron-a11y-keys-behavior': 'rwx',
        '@customElements_reader': 'r--',
        '@HTMLElement_proto_writer' : 'r--',
        type: {
          [S_DEFAULT]: '---',
          '@Polymer_property_accessors': 'rwxRW',
        },
        _template: {
          [S_DEFAULT]: '---',
          '@Polymer_legacy_class': 'rwx',
          '@Polymer_element_mixin': 'rwx',
        },
        is: 'r--',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          // TODO: Loose ACL. Policies can be defined per property.
          [S_DEFAULT]: 'rwx',
          nodeType: 'r--',
          '@Polymer_element_mixin': 'rwx',
          '@Polymer_legacy_element_mixin': 'rwx',
          '@Polymer_legacy_class': 'rwx',
          '@Polymer_property_effects': 'rwx',
          '@Polymer_property_accessors': 'rwx',
          '@Event___domApi_writer': 'rwx',
          '@DocumentFragment_querySelector_reader': 'r-x',
          '@customElement_localName_reader': 'r--',
          '@Object_assign_reader': 'rwx',
          '@Polymer_lib': 'rwx',
          '@customElements_reader': 'r-x',
          '@webcomponents-lite': 'rwx',
          '@HTMLElement___shady_writer': 'rwx',
          '@FocusEvent_currentTarget_writer': 'rwx',
        },
      },
    },
    'Polymer.Element': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'], // TODO: Define specific ACL for Polymer.Element
    },
    'i18n-attr-repo': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        isLocalizableAttribute: {
          [S_DEFAULT]: '---',
          '@i18n-behavior': '--x',
        },
        _created: {
          [S_DEFAULT]: '---',
          '@i18n-behavior': '--x',
        },
      },
    },
    'i18n-number': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        resolveUrl: {
          [S_DEFAULT]: '---',
          '@i18n-number': '--x',
        },
      },
    },
    'i18n-behavior': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        _fetchStatus: {
          [S_DEFAULT]: '---',
          '@i18n-behavior': 'rw-',
        },
      },
    },
    'my-app': {
      [S_CHAIN]: () => acl['i18n-behavior'],
    },
    'my-view1': {
      [S_CHAIN]: () => acl['i18n-behavior'],
    },
    'my-view2': {
      [S_CHAIN]: () => acl['i18n-behavior'],
    },
    'my-view3': {
      [S_CHAIN]: () => acl['i18n-behavior'],
    },
    'live-localizer-model': {
      [S_CHAIN]: () => acl['i18n-behavior'],
    },
    'live-localizer-firebase-storage': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          model: {
            [S_DEFAULT]: 'rw-', // TODO: Loose ACL
            '@Polymer_property_accessors': 'rw-RW',
          },
        },
      },
    },
    'live-localizer-storage-view': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
        },
      },
    },
    'live-localizer-main': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    },
    'live-localizer-panel': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    },
    'live-localizer-dialog': {
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    },
    'live-localizer': {
      [S_DEFAULT]: 'r-x',
      [S_CHAIN]: () => acl['Polymer.LegacyElement'],
      [S_OBJECT]: {
        [S_CHAIN]: S_CHAIN,
        '@document_writer': '---',
      },
      '@document_writer': '---',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: '---',
          '@live-localizer-lazy': 'rwx',
          tagName: {
            [S_DEFAULT]: '---',
            '@iron-location': 'r--',
          },
          '@cache_automation': 'r--',
        },
      },
    },
    BehaviorsStore: {
      [S_DEFAULT]: 'r--',
      '@i18n-behavior': 'rwxRW',
      '@draggable-behavior': 'rwxRW',
      _I18nAttrRepo: {
        [S_DEFAULT]: 'r-x',
        '@i18n-behavior': function _I18nAttrRepoAcl(normalizedThisArg,
                                                    normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                    aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                    hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                    applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          if (opType === 'w') {
            Policy.trackClass('BehaviorsStore._I18nAttrRepo', normalizedArgs[1]);
          }
          return 'rwx'[opTypeMap[opType]] === opType; // equivalent to 'rwx' acl
        },
      },
    },
    'BehaviorsStore._I18nAttrRepo': {
      [S_DEFAULT]: 'r-x',
      '@i18n-behavior': 'rwx',
      '@Polymer_legacy_class': 'r-xR-',
    },
    // blocked private API
    DummyClass: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': '-w-',
      },
      [S_DEFAULT]: '---',
    },
    DummyClass2: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@normalization_checker': 'rwx',
      },
      [S_DEFAULT]: 'r-x',
      isDummy: '---',
      dummyMethod: '---',
      dummyMethod2: 'r--',
    },
    DummyClass3: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rwx',
      },
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rwx',
      staticMethod: {
        [S_DEFAULT]: '---',
        '@normalization_checker': '--x',
      },
      staticProperty: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rw-',
      },
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'r--',
        prototypeProperty: {
          [S_DEFAULT]: '---',
          '@normalization_checker': 'rw-',
        },
        prototypeProperty2: {
          [S_DEFAULT]: '---',
          '@normalization_checker': 'r--',
        },
        [S_INSTANCE]: {
          [S_DEFAULT]: '---',
          '@normalization_checker': 'rwx',
          instanceMethod: {
            [S_DEFAULT]: '---',
            '@normalization_checker': '--x',
          },
          instanceProperty: {
            [S_DEFAULT]: '---',
            '@normalization_checker': 'rw-',
          },
        },
      },
    },
    BaseClass1: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rwx',
        '@XClass1_constructor': 'rwx',
      },
      [S_DEFAULT]: '---',
      staticMethod: {
        [S_DEFAULT]: '---',
        '@normalization_checker': '--x',
      },
      staticProperty: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rw-',
      },
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_INSTANCE]: {
          [S_DEFAULT]: '---',
          instanceMethod: {
            [S_DEFAULT]: '---',
            '@normalization_checker': '--x',
          },
          instanceProperty: {
            [S_DEFAULT]: '---',
            '@XClass1_constructor': 'rw-',
            '@normalization_checker': 'rw-',
          },
        },
      },
    },
    SubClass1: {
      [S_CHAIN]: () => acl.BaseClass1,
      staticProperty: {
        [S_CHAIN]: S_CHAIN,
        '@normalization_checker': 'r--',
      },
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.BaseClass1[S_PROTOTYPE],
        [S_INSTANCE]: {
          [S_CHAIN]: (path /* [ [acl, 'acl'], [acl.SubClass1, 'SubClass1'], [acl.SubClass1[S_PROTOTYPE], S_PROTOTYPE], [acl.SubClass1[S_PROTOTYPE][S_INSTANCE], S_INSTANCE] ] */) => 
            path[path.length - 2][0].__proto__[path[path.length - 1][1]], // equivalent to acl.BaseClass1[S_PROTOTYPE].__proto__[S_INSTANCE]
          instanceProperty: {
            [S_CHAIN]: S_CHAIN, // alias for (path) => path[path.length - 2][0].__proto__[path[path.length - 1][1]]
            '@normalization_checker': 'r--', // override
          },
        },
      },
    },
    SubClass2: {
      [S_CHAIN]: () => acl.SubClass1,
      staticProperty: {
        [S_CHAIN]: S_CHAIN,
        '@normalization_checker': 'rw-', // override SubClass1's 'r--' acl
      },
      staticMethod: {
        [S_CHAIN]: S_CHAIN,
        '@normalization_checker': '---', // override BaseClass1's '--x' acl
      },
    },
    SubClass3: {
      [S_CHAIN]: () => acl.SubClass2,
      staticProperty: {
        [S_CHAIN]: S_CHAIN,
        // ABAC policy by a function with raw parameters
        '@normalization_checker': function plainAcl(normalizedThisArg,
                                                    normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                    aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                    hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                    applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
        },
      },
      staticProperty2: {
        [S_DEFAULT]: '---',
        '@normalization_checker': Policy.acl('r--'), // plain policy function equivalent to 'r--' acl
      },
      staticMethod: {
        [S_CHAIN]: S_CHAIN,
        '@normalization_checker': Policy.args("opType === 'x' && typeof args[0] === 'number' && typeof args[1] === 'number' && args[0] > 0 && args[1] > 0"), // check arguments
      },
    },
    DummyContainer: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'r--',
        '@normalization_checker': 'rwxRW',
      },
      [S_DEFAULT]: '---',
      '': 'r--',
      navigator: {
        [S_DEFAULT]: function _copiedNavigatorAcl(normalizedThisArg,
                                                  normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                  aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                  hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                  applyAcl /* for recursive application of ACL */) {
          // TODO: automate and force this process
          let opType = aclArgs[4];
          let target;
          if (opType === 'r') {
            Policy.trackClass('DummyContainer.navigator', normalizedThisArg[normalizedArgs[0]]);
            return true;
          }
          return false;
        },
        language: {
          [S_DEFAULT]: 'r--',
          '@normalization_checker': '---',
        },
      },
    },
    'DummyContainer.navigator': {
      [S_DEFAULT]: 'r--', // avoid redundant calls of Policy.trackClass('DummyContainer.navigator', target)
      [S_CHAIN]: () => acl.DummyContainer.navigator,
    },
    UniterableArray: {
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
    },
    GetterSetterClass: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
      [S_DEFAULT]: '---',
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rwx',
        '@GetterSetterClass_creator': 'r-x',
        '@GetterSetterClass_writer': 'r--',
        '@GetterSetterClass_reader': 'r--',
      },
      '@GetterSetterClass': 'rwx',
      staticProperty: {
        [S_DEFAULT]: '---',
        '@GetterSetterClass_creator': 'rw-RW',
        '@GetterSetterClass_writer': 'rw-',
        '@GetterSetterClass_reader': 'r--',
      },
      clonedStaticProperty: {
        [S_DEFAULT]: '---',
        '@GetterSetterClass_creator': 'rw-RW',
        '@GetterSetterClass_writer': 'rw-',
        '@GetterSetterClass_reader': 'r--',
      },
      $prototype$: {
        [S_DEFAULT]: '---',
        '@GetterSetterClass_creator': 'r--',
        '@GetterSetterClass_writer': 'r--', // for verification
        '@GetterSetterClass_reader': 'r--', // for verification
      },
      [S_PROTOTYPE]: {
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
        [S_DEFAULT]: '---',
        prototypeProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rw-RW',
        },
        clonedPrototypeProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rw-RW',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: '---',
          '@GetterSetterClass': 'rwx',
          prototypeProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'rwx',
            '@GetterSetterClass_writer': 'rw-',
            '@GetterSetterClass_reader': 'r--',
          },
          clonedPrototypeProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'rwx',
            '@GetterSetterClass_writer': 'rw-',
            '@GetterSetterClass_reader': 'r--',
          },
          instanceProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'rw-RW',
            '@GetterSetterClass_writer': 'rw-',
            '@GetterSetterClass_reader': 'r--',
          },
          getInstanceProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'r--',
          },
          setInstanceProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'r--',
          },
          clonedInstanceProperty: {
            [S_DEFAULT]: '---',
            '@GetterSetterClass_creator': 'rw-RW',
            '@GetterSetterClass_writer': 'rw-',
            '@GetterSetterClass_reader': 'r--',
          },
        },
      },
    },
    // 3rd party API
    firebase: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@polymerfire': 'r--',
        '@firebase_app': 'rw-RW',
        '@firebase_auth': 'r--',
      },
      [S_DEFAULT]: '---', // Note: Only @polymerfire can access firebase API
      '@firebase_app': 'rw-',
      '@firebase_auth': 'r--',
      '@firebase_storage': 'r--',
      '@firebase_messaging': 'r--',
      '@firebase_database': 'r--',
      '@firebase_app_initializer': '--x',
      '@polymerfire': 'r-x',
      // TODO: Apply more detailed ACLs to deeper objects in modules
      initializeApp: {
        [S_DEFAULT]: '---', // Note: No others can initialize firebase app
        '@polymerfire': 'r-x', // Note: polymerfire can solely initialize firebase app
      },
    },
    Dexie: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'r--',
        '@dexie_js': 'rwxRW',
        '@Dexie_instantiator': 'r-x', // Note: No others can instantiate Dexie
      },
      [S_DEFAULT]: 'r-x',
      '@dexie_js': 'rwxRW',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        '@dexie_js': 'rwxRW',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'r-x',
          '@dexie_js': 'rwxRW',
          '@custom_error_constructor_creator': 'rwxRW',
        },
      },
    },
    XliffConv: {
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@xliff-conv': 'rwxRW',
      },
      [S_DEFAULT]: 'r-x',
      '@xliff-conv': 'rwxRW',
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
    // global variables for demo acl
    gA1: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    gX1: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    gU: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    gRestP: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    gA: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    gRestE: {
      [S_DEFAULT]: '---',
      '@spread_js': 'rwxRW',
    },
    _GV1: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV2: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV3: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV4: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV5: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV6: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV7: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV8: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV9: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV10: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV11: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GV12: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GO1: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    _GO2: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    lhsvalues: {
      [S_DEFAULT]: '---',
      '@lhs_js': 'rwxRW',
    },
    gvv: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gvv1: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gvv2: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv0: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv00: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    ga: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gb: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
      '@chai_js': 'r--',
    },
    ga1: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gb1: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gb2: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv2: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv3: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gv4: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    xx: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    uu: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    vv: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    q: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gl: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gc: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gC2: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gC4: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gC: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gC3: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    v2: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
      '@normalization_checker': 'r--',
    },
    v4: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
      '@normalization_checker': 'r--',
    },
    gfunc: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    globalConstant: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    globalVariable: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    globalClass: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    gf: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    ll1: {
      [S_DEFAULT]: '---',
      '@demo_entry_page_scripts': 'rwxRW',
    },
    globalObject: {
      [S_DEFAULT]: 'rw-',
    },
    _global_A: {
      [S_DEFAULT]: '---',
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@global_js': 'rwxRW',
        '@global_js_inaccessible': '---',
        '@global_js_accessible': 'rw-',
      },
    },
    onerror: {
      [S_DEFAULT]: 'rw-',
    },
    origin: {
      [S_DEFAULT]: 'r--',
    },
    locationbar: {
      [S_DEFAULT]: 'r-x',
    },
    menubar: {
      [S_DEFAULT]: 'r-x',
    },
    personalbar: {
      [S_DEFAULT]: 'r-x',
    },
    scrollbars: {
      [S_DEFAULT]: 'r-x',
    },
    statusbar: {
      [S_DEFAULT]: 'r-x',
    },
    toolbar: {
      [S_DEFAULT]: 'r-x',
    },
    external: {
      [S_DEFAULT]: 'r-x',
    },
    screen: {
      [S_DEFAULT]: 'r-x',
    },
    innerWidth: {
      [S_DEFAULT]: 'r--',
    },
    innerHeight: {
      [S_DEFAULT]: 'r--',
    },
    scrollX: {
      [S_DEFAULT]: 'r--',
    },
    pageXOffset: {
      [S_DEFAULT]: 'r--',
    },
    scrollY: {
      [S_DEFAULT]: 'r--',
    },
    pageYOffset: {
      [S_DEFAULT]: 'r--',
    },
    screenX: {
      [S_DEFAULT]: 'r--',
    },
    screenY: {
      [S_DEFAULT]: 'r--',
    },
    outerWidth: {
      [S_DEFAULT]: 'r--',
    },
    outerHeight: {
      [S_DEFAULT]: 'r--',
    },
    devicePixelRatio: {
      [S_DEFAULT]: 'r--',
    },
    clientInformation: {
      [S_CHAIN]: () => acl.navigator,
    },
    event: {
      [S_DEFAULT]: 'r--',
    },
    offscreenBuffering: {
      [S_DEFAULT]: 'r--',
    },
    screenLeft: {
      [S_DEFAULT]: 'r--',
    },
    screenTop: {
      [S_DEFAULT]: 'r--',
    },
    performance: {
      [S_DEFAULT]: 'r-x',
    },
    visualViewport: {
      [S_DEFAULT]: 'r-x',
    },
    // bundled modules
    '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js': {
      [S_DEFAULT]: 'r-x',
      xliffStates: '---',
    },
    '/components/thin-hook/demo/commonjs2.js': {
      [S_DEFAULT]: 'r--', // add() is not executable
    },
    '/components/thin-hook/node_modules/path-browserify/index.js': {
      [S_DEFAULT]: 'r-x',
      join: {
        [S_DEFAULT]: '--x',
        '@path_join_prohibited': '---',
      },
    },
    '/components/thin-hook/node_modules/tty-browserify/index.js': {
      [S_DEFAULT]: 'r-x',
      '@tty_prohibited': '---',
    },
    // default for global objects
    [S_GLOBAL]: {
      [S_OBJECT]: 'r-x',
      [S_DEFAULT]: Policy.avoidGlobalClone(),
      [S_ALL]: 'r--',
      $__proto__$: 'r--',
      $prototype$: 'r--',
      $constructor$: 'r-x',
      [S_PROTOTYPE]: {
        [S_OBJECT]: 'r--',
        [S_DEFAULT]: Policy.avoidGlobalClone(), // TODO: Use S_INSTANCE policy
        [S_ALL]: 'r--',
        $__proto__$: 'r--',
        $prototype$: 'r--',
        $constructor$: 'r-x',
      },
    },
    // default for non-global objects
    [S_DEFAULT]: {
      [S_OBJECT]: 'rwx',
      [S_DEFAULT]: function defaultAcl(normalizedThisArg,
                                       normalizedArgs /* ['property', args], ['property', value], etc. */,
                                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                                       applyAcl /* for recursive application of ACL */) {
        if (aclArgs[4] === 'x') {
          if (normalizedThisArg instanceof Object) {
            let property = normalizedArgs[0];
            if (Reflect.has(normalizedThisArg, property)) {
              let value = normalizedThisArg[property];
              let name = _globalMethods.get(value);
              if (name) {
                let rawProp = name[name.length - 1];
                let prop = _escapePlatformProperties.get(rawProp) || rawProp;
                let obj = name[0];
                // Apply ACL for the global method
                return applyAcl(obj, name[1] !== 'prototype', !Object.prototype.hasOwnProperty.call(normalizedThisArg, property), prop, 'x', hookArgs[3], _global[obj], [rawProp, normalizedArgs[1]], hookArgs);
              }
            }
          }
        }
        return true; // equivalent to 'rwxRW' acl
      },
      [S_ALL]: 'rwxRW',
    }
  };
  // protect hook-callback.js variables
  [
    'emptyDocumentURL',
    'otherWindowObjects',
    'otherWindowObjectsStatus',
    'counter',
    'log',
    'contexts',
    'globalPropertyContexts',
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
    'showContextStackLog',
    'hookBenchmark',
  ].forEach(n => {
    Object.assign(acl, { [n]: '---' });
    Object.assign(acl[mainGlobalObjectName], { [n]: '---' });
  });
  const chainAcl = function chainAcl(_acl, path = [ [_acl, 'acl'] ]) {
    let properties = Object.getOwnPropertySymbols(_acl).concat(Object.getOwnPropertyNames(_acl));
    for (let property of properties) {
      if (property === S_CHAIN) {
        let chain = _acl[S_CHAIN];
        switch (typeof chain) {
        case 'object':
          if (chain) {
            Object.setPrototypeOf(_acl, chain);
          }
          else {
            console.error('chainAcl: cannot chain to a null object', _acl);
          }
          break;
        case 'function':
          let __acl = chain(path);
          if (__acl) {
            Object.setPrototypeOf(_acl, __acl);
          }
          else {
            console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
          }
          break;
        case 'symbol':
          switch (chain) {
          case S_CHAIN:
            let __acl = path[path.length - 2][0].__proto__[path[path.length - 1][1]];
            if (__acl) {
              Object.setPrototypeOf(_acl, __acl);
            }
            else {
              console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
            }
            break;
          default:
            console.error('chainAcl: cannot recongnize chain ' + chain.toString(), _acl);
            break;
          }
          break;
        default:
          break;
        }
      }
      else {
        let __acl = _acl[property];
        switch (typeof __acl) {
        case 'object':
          if (__acl) {
            path.push([__acl, property]);
            chainAcl(__acl, path);
            path.pop();
          }
          break;
        default:
          break;
        }
      }
    }
  }
  chainAcl(acl);
  const applyAcl = function applyAcl(name, isStatic, isObject, property, opType, context, normalizedThisArg, normalizedArgs, hookArgs) {
    const names = name;
    if (names instanceof Set) {
      let result = true;
      for (name of names.values()) {
        if (!(result = applyAcl(name, isStatic, isObject, property, opType, context, normalizedThisArg, normalizedArgs, hookArgs))) {
          break;
        }
      }
      return result;
    }
    let _context, _acl, __acl, _property, isGlobal, tmp;
    while (_context = contextNormalizer[context]) {
      context = _context;
      if (context === S_DEFAULT) {
        break;
      }
      if (context[0] === '@') {
        break;
      }
    }
    if (!_context) {
      // prefixedSearch for context
      let cursor = prefixedContexts;
      let index = 0;
      let prevIndex = index;
      let path;
      let length = context.length;
      let result = S_DEFAULT;

      while (index < length) {
        index = context.indexOf(',', prevIndex); // next comma
        if (index === -1) {
          index = context.length;
        }
        path = context.substring(prevIndex, index);
        index++;
        if (Reflect.has(cursor, '*')) {
          result = cursor['*'];
        }
        if (Reflect.has(cursor, path)) {
          cursor = cursor[path];
          prevIndex = index;
        }
        else {
          break;
        }
      }
      context = contextNormalizer[context] = result; // cache the result
    }
    //context = _context ? context : S_DEFAULT;
    isGlobal = isGlobalScopeObject.has(name);
    _acl = name
      ? name === 'Object' && isObject
        ? acl[S_DEFAULT]
        : Reflect.has(acl, name)
          ? acl[name]
          : Reflect.has(acl, S_GLOBAL)
            ? acl[S_GLOBAL]
            : acl[S_DEFAULT]
      : acl[S_DEFAULT];
    if (typeof _acl === 'object') {
      if (typeof property === 'undefined') {
        _acl = context === S_DEFAULT
          ? Reflect.has(_acl, S_OBJECT)
            ? _acl[S_OBJECT]
            : _acl[S_DEFAULT]
          : Reflect.has(_acl, context)
            ? _acl[context]
            : Reflect.has(_acl, S_OBJECT)
              ? _acl[S_OBJECT]
              : _acl[S_DEFAULT];
      }
      else {
        if (!isStatic) {
          if (Reflect.has(_acl, S_PROTOTYPE)) {
            _acl = _acl[S_PROTOTYPE];
            if (Reflect.has(_acl, S_INSTANCE)) {
              if (isObject) {
                _acl = _acl[S_INSTANCE];
              }
            }
          }
        }
        if (typeof _acl === 'object') {
          switch (property) {
          case S_ALL:
            _acl = context === S_DEFAULT
              ? Reflect.has(_acl, S_ALL)
                ? _acl[S_ALL]
                : _acl[S_DEFAULT]
              : Reflect.has(_acl, context)
                ? _acl[context] 
                : Reflect.has(_acl, S_ALL)
                  ? _acl[S_ALL] 
                  : _acl[S_DEFAULT];
            if (typeof _acl === 'object') {
              _acl = Reflect.has(_acl, S_ALL)
                ? _acl[S_ALL]
                : _acl[S_DEFAULT];
            }
            break;
          case S_UNSPECIFIED:
            if (Reflect.has(_acl, S_OBJECT)) {
              _acl = _acl[S_OBJECT];
            }
            if (typeof _acl === 'object') {
              _acl = Reflect.has(_acl, context)
                ? _acl[context]
                : _acl[S_DEFAULT];
            }
            if (typeof _acl === 'object') {
              _acl = _acl[S_DEFAULT];
            }
            break;
          case S_FUNCTION:
            _acl = Reflect.has(_acl, context)
              ? _acl[context]
              : _acl[S_DEFAULT];
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
              _acl = Reflect.has(_acl, property)
                ? _acl[property]
                : Reflect.has(_acl, context)
                  ? context === S_DEFAULT
                    ? isGlobal
                      ? Reflect.has(acl, property)
                        ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
                          ? acl[property][S_OBJECT]
                          : acl[property]
                        : acl[S_GLOBAL]
                      : _acl[context]
                    : _acl[context]
                  : isGlobal
                    ? Reflect.has(acl, property)
                      ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
                        ? acl[property][S_OBJECT]
                        : acl[property]
                      : acl[S_GLOBAL]
                    : _acl[S_DEFAULT];
              if (typeof _acl === 'object') {
                _acl = Reflect.has(_acl, context)
                  ? _acl[context]
                  : _acl[S_DEFAULT];
              }
              break;
            case 'object':
              if (Array.isArray(property)) {
                tmp = [];
                for (_property of property) {
                  __acl = Reflect.has(_acl, _property)
                    ? _acl[_property]
                    : Reflect.has(_acl, context)
                      ? _acl[context]
                      : _acl[S_DEFAULT];
                  if (typeof __acl === 'object') {
                    __acl = Reflect.has(__acl, context)
                      ? __acl[context]
                      : __acl[S_DEFAULT];
                  }
                  tmp.push(__acl);
                }
                _acl = tmp;
              }
              else {
                _acl = Reflect.has(_acl, property)
                  ? _acl[property]
                  : Reflect.has(_acl, context)
                    ? _acl[context]
                    : _acl[S_DEFAULT];
                if (typeof _acl === 'object') {
                  _acl = Reflect.has(_acl, context)
                    ? _acl[context]
                    : _acl[S_DEFAULT];
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
        switch (typeof __acl) {
        case 'string':
          if (__acl[tmp] !== opType) {
            return false;
          }
          break;
        case 'function':
          if (!__acl(normalizedThisArg, normalizedArgs, arguments, hookArgs, applyAcl)) {
            return false;
          }
          break;
        }
      }
      return true;
    case 'function':
      return _acl(normalizedThisArg, normalizedArgs, arguments, hookArgs, applyAcl);
    case 'undefined':
    default:
      return false;
    }
  }
  // Handle exceptions
  const errorReportBaseUrl = (new URL('errorReport.json', typeof window === 'object' ? top.location : location)).pathname;
  const criticalErrorPageUrl = 'about:blank';
  let hookCallbackCompatibilityTestDone = false;
  const _caches = caches; // Take a backup just in case (still not robust)
  // Optionally, hide caches completely.
  // Object.defineProperty(_global, 'caches', { configurable: false, enumerable: false, writable: false, value: null });
  // Object.defineProperty(_global, 'CacheStorage', { configurable: false, enumerable: false, writable: false, value: null });
  const onThrowAsync = async function onThrowAsync(error, hookArgs, contextStack, aclArgs) {
    if (!hookCallbackCompatibilityTestDone || !error.message.match(/^Permission Denied:/) || !Array.isArray(aclArgs)) {
      return true; // Skipping non-ACL errors for the demo. They can be reported to the server, of course.
    }
    // Report the error to the server
    // Notes:
    //  - Customizations are required such as
    //    1. Use a HTTP POST message to report more detailed data on the error
    //    2. Clean up caches and other application data if the error is regarded as fatal
    //    3. Unregister the running Service Worker instance
    //    4. Transition to a predefined critical error page or about:blank
    //    etc.
    //
    //console.log('aclArgs = ', aclArgs);
    let errorReportUrl = errorReportBaseUrl/* +
      '?context=' + encodeURIComponent(hookArgs[3]) +
      '&error=' + error.name +
      '&message=' + encodeURIComponent(error.message) +
      (Array.isArray(aclArgs)
        ? ('&name=' + (typeof aclArgs[0] === 'string' ? encodeURIComponent(aclArgs[0]) : 'typeof:' + typeof aclArgs[0]) +
           '&property=' + (typeof aclArgs[3] === 'string' ? encodeURIComponent(aclArgs[3]) : 'typeof:' + typeof aclArgs[3]) +
           '&opType=' + aclArgs[4])
        : '');*/
    let data = {
      'context': hookArgs[3],
      'error': error.name,
      'message': error.message,
    };
    if (Array.isArray(aclArgs)) {
      data['name'] =  typeof aclArgs[0] === 'string'
        ? aclArgs[0]
        : aclArgs[0] instanceof Set
          ? SetMap.getStringValues(aclArgs[0], ' ')
          : 'typeof:' + typeof aclArgs[0];
      data['isStatic'] = aclArgs[1];
      data['isObject'] = aclArgs[2];
      data['property'] =  typeof aclArgs[3] === 'string' ? aclArgs[3] : 'typeof:' + typeof aclArgs[3];
      data['opType'] = aclArgs[4];
    }
    let errorReportResponseJSON;
    try {
      let errorReportResponse = await fetch(errorReportUrl, {
        method: 'POST', // Note: On 'GET' method, make sure the request reaches the server through the Service Worker with appropriate cache control.
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data,null,0),
        mode: 'same-origin',
        cache: 'no-cache'
      });
      let errorReportResponseText = await errorReportResponse.text();
      errorReportResponseJSON = JSON.parse(errorReportResponseText) || {};
    }
    catch (e) {
      errorReportResponseJSON = {
        severity: 'permissive' // default severity on a fetch error
      };
    }
    finally {
      switch (errorReportResponseJSON.severity) {
      case 'critical':
      default:
        //let keys = await _caches.keys()
        //await Promise.all(keys.map(key => _caches.delete(key)));
        location = criticalErrorPageUrl;
        return false;
      case 'observing':
      case 'permissive':
        return true;
      }
    }
  }
  const onThrow = function onThrow(error, hookArgs, contextStack, aclArgs) {
    onThrowAsync(error, hookArgs, contextStack, aclArgs);
    // Synchronous immediate handling of the error
    /*
    if (hookCallbackCompatibilityTestDone && error.message.match(/^Permission Denied:/) && Array.isArray(aclArgs)) {
      location = criticalErrorPageUrl; // Note: Probably no time to report errors to the server
    }
    // Skipping non-ACL errors
    */
  }
  class StrictModeWrapper {
    static ['#.'](o, p) { return o[p]; }
    static ['#[]'](o, p) { return o[p]; }
    static ['#*'](o) { return o; }
    static ['#in'](o, p) { return p in o; }
    static ['#()'](o, p, a) { return o[p](...a); }
    static ['#p++'](o, p) { return o[p]++; }
    static ['#++p'](o, p) { return ++o[p]; }
    static ['#p--'](o, p) { return o[p]--; }
    static ['#--p'](o, p) { return --o[p]; }
    static ['#delete'](o, p) { return delete o[p]; }
    static ['#='](o, p, v) { return o[p] = v; }
    static ['#+='](o, p, v) { return o[p] += v; }
    static ['#-='](o, p, v) { return o[p] -= v; }
    static ['#*='](o, p, v) { return o[p] *= v; }
    static ['#/='](o, p, v) { return o[p] /= v; }
    static ['#%='](o, p, v) { return o[p] %= v; }
    static ['#**='](o, p, v) { return o[p] **= v; }
    static ['#<<='](o, p, v) { return o[p] <<= v; }
    static ['#>>='](o, p, v) { return o[p] >>= v; }
    static ['#>>>='](o, p, v) { return o[p] >>>= v; }
    static ['#&='](o, p, v) { return o[p] &= v; }
    static ['#^='](o, p, v) { return o[p] ^= v; }
    static ['#|='](o, p, v) { return o[p] |= v; }
    static ['#.='](o, p) { return { set ['='](v) { o[p] = v; }, get ['=']() { return o[p]; } }; }
  }
  const GeneratorFunction = (function * () {}).constructor;
  const AsyncFunction = (async function () {}).constructor;
  const FunctionPrototype = Function.prototype;
  // full features
  const __hook__ = function __hook__(f, thisArg, args, context, newTarget, contextSymbol) {
    let _lastContext;
    let _f;
    let normalizedThisArg = thisArg;
    let _args = args;
    let boundParameters;
    counter++;
    if (args[0] === pseudoContextArgument) {
      return context;
    }
    contextSymbol = context;
    if (typeof context !== 'symbol') {
      let e = new Error('__hook__: invalid context')
      onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
      throw e;
    }
    context = __hook__[context];
    if (!context) {
      let e = new Error('__hook__: invalid context')
      onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
      throw e;
    }
    _lastContext = lastContext;
    if (!contexts[context]) {
      let group = context.split(/[,:]/)[0];
      let node = { id: context, label: context, group: group };
      data.nodes.push(node);
      contexts[context] = true;
    }

    if ((context === 'setTimeout' || context === 'setInterval' || context.indexOf('Promise') === 0 || context === 'EventTarget,addEventListener') && args) {
      let l = args.length < 2 ? args.length : 2;
      for(let i = 0; i < l; i++) {
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
    lastContext = context;
    contextStack.push(context);
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

    let result;
    try {
      let globalAssignments;
      if (otherWindowObjectsStatus.set) {
        let _Object;
        switch (typeof f) {
        case 'function':
          if (!(f instanceof Object)) {
            _Object = f.apply.constructor.__proto__.__proto__.constructor;
          }
          break;
        case 'string':
          if (thisArg && !(thisArg instanceof Object) && typeof thisArg.hasOwnProperty === 'function') {
            _Object = thisArg.hasOwnProperty.constructor.__proto__.__proto__.constructor;
          }
          break;
        }
        if (_Object && _Object !== Object) {
          let contentWindow = otherWindowObjects.get(_Object);
          if (contentWindow) {
            if (contentWindow.__hook__) {
              //console.log('applying __hook__ of contentWindow');
              contentWindow.__hook__[contextSymbol] = context;
              context = contextSymbol;
              result = contentWindow.__hook__.apply(contentWindow, arguments);
              contextStack.pop();
              return result;
            }
            else {
              console.error('contentWindow.__hook__ not found for ', contentWindow);
            }
          }
        }
      }
      _f = f;
      boundParameters = _boundFunctions.get(f);
      if (!boundParameters) {
        switch (f) {
        case '()':
        case '#()':
          switch (typeof thisArg) {
          case 'function':
            switch (_args[0]) {
            case 'apply':
              boundParameters = _boundFunctions.get(thisArg);
              if (boundParameters) {
                _args = _args[1][1];
              }
              break;
            case 'call':
              boundParameters = _boundFunctions.get(thisArg);
              if (boundParameters) {
                _args = _args[1].slice(1);
              }
              break;
            default:
              boundParameters = _boundFunctions.get(thisArg[_args[0]]);
              if (boundParameters) {
                _args = _args[1];
              }
              break;
            }
            break;
          case 'object':
            if (thisArg === Reflect && _args[0] === 'apply') {
              boundParameters = _boundFunctions.get(_args[1][0]);
              if (boundParameters) {
                _args = _args[1][2];
              }
              break;
            }
          default:
            boundParameters = _boundFunctions.get(thisArg[_args[0]]);
            if (boundParameters) {
              _args = _args[1];
            }
            break;
          }
          break;
        case 's()':
          boundParameters = _boundFunctions.get(_args[2](_args[0]));
          if (boundParameters) {
            _args = _args[1];
          }
          break;
        default:
          break;
        }
      }
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
        /*
        if (context === '/components/thin-hook/demo/my-view2.html,script@2442,getData' && _f === '()' && args[0] === 'bind') {
          debugger;
        }
        */
        // property access
        if (newTarget === false) { // resolve the scope in 'with' statement body
          let varName = _args[0];
          let __with__ = thisArg;
          let scope = _global;
          let _scope;
          let i;
          for (i = 0; i < __with__.length; i++) {
            _scope = __with__[i];
            if (Reflect.has(_scope, varName)) {
              if (_scope[Symbol.unscopables] && _scope[Symbol.unscopables][varName]) {
                continue;
              }
              else {
                scope = _scope;
                break;
              }
            }
          }
          thisArg = normalizedThisArg = scope;
        }
        if (boundParameters) {
          normalizedThisArg = boundParameters._normalizedThisArg;
          _args = [ boundParameters._f, boundParameters._args.concat(_args) ];
        }
        let name = _globalObjects.get(normalizedThisArg);
        let isStatic = typeof normalizedThisArg === 'function';
        if (boundParameters) {
          isStatic = boundParameters.isStatic;
          name = boundParameters.name;
        }
        let ctor;
        let isObject = typeof normalizedThisArg === 'object';
        if (!name && _f.indexOf('s') >= 0) {
          if (isStatic) {
            ctor = normalizedThisArg;
          }
          else {
            ctor = normalizedThisArg.constructor;
            if (ctor) {
              if (_hasOwnProperty.call(normalizedThisArg, 'constructor')) {
                isObject = false;
              }
            }
          }
          name = _globalObjects.get(ctor);
          while (!name && typeof ctor === 'function') {
            ctor = Object.getPrototypeOf(ctor);
            name = _globalObjects.get(ctor);
          }
        }
        if (!name && normalizedThisArg instanceof Object) {
          ctor = normalizedThisArg.constructor;
          name = _globalObjects.get(ctor);
          if (name) {
            isStatic = false;
            if (typeof ctor === 'function') {
              if (_hasOwnProperty.call(normalizedThisArg, 'constructor')) {
                isObject = false;
              }
            }
          }
        }
        let rawProperty = _args[0];
        let property = _escapePlatformProperties.get(rawProperty) || rawProperty;
        let op = operatorNormalizer[_f];
        let target = targetNormalizer[op];
        let opType;
        globalAssignments = {};
        if (typeof target === 'object') {
          do {
            if (normalizedThisArg instanceof Object) {
              switch (typeof rawProperty) {
              case 'string':
                if (boundParameters) {
                  target = targetNormalizerMap.get(boundParameters._f);
                }
                else {
                  target = targetNormalizerMap.get(normalizedThisArg[rawProperty]);
                }
                break;
              case 'function':
                target = targetNormalizerMap.get(rawProperty);
                break;
              default:
                target = undefined;
                break;
              }
              if (!target) {
                target = 'xtp';
              }
            }
            else if (typeof _args[0] === 'function') {
              target = targetNormalizerMap.get(_args[0]);
            }
            let _t;
            let _p;
            if (typeof target === 'string') {
              opType = target[0]; // r, w, x
              switch (target[1]) {
              case 't': _t = normalizedThisArg; break;
              case '0': _t = _args[1][0]; break;
              case '1': _t = _args[1][1]; break;
              case 'f': _t = _f; break;
              case 'p': _t = _args[0]; break;
              case 'c': _t = context; break;
              case 'n': _t = newTarget; break;
              case 'P': _t = '__proto__'; break;
              case 'T': _t = 'prototype'; break;
              case 'C': _t = 'constructor'; break;
              case 'N': _t = S_CONSTRUCT; break;
              case '-': _t = S_UNSPECIFIED; break;
              case '*': _t = S_ALL; break;
              case '.': _t = S_TARGETED; break; // { prop1: {}, prop2: {}, ... }
              default: break;
              }
              switch (target[2]) {
              case 'p': _p = _args[0]; break;
              case '1': _p = _args[1][1]; break;
              case '*': _p = S_ALL; break;
              case '.': _p = S_TARGETED; break; // { prop1: {}, prop2: {}, ... }
              case '-': _p = S_UNSPECIFIED; break;
              case 't': _p = normalizedThisArg; break;
              case '0': _p = _args[1][0]; break;
              case 'f': _p = _f; break;
              case 'c': _p = context; break;
              case 'n': _p = newTarget; break;
              case 'P': _p = '__proto__'; break;
              case 'T': _p = 'prototype'; break;
              case 'C': _p = 'constructor'; break;
              case 'N': _p = S_CONSTRUCT; break;
              default: break;
              }
              switch (typeof _t) {
              case 'object':
              case 'string':
              case 'function':
              case 'symbol':
              case 'boolean':
                if (_t === null || _t === undefined) {
                  name = _globalObjects.get(_global); // non-strict mode default this
                  if (!name) {
                    break;
                  }
                }
                else {
                  name = _globalObjects.get(_t);
                }
                isStatic = typeof _t === 'function';
                normalizedThisArg = _t;
                isObject = typeof normalizedThisArg === 'object';
                if (!name) {
                  ctor = _t.constructor;
                  name = _globalObjects.get(ctor);
                  if (name) {
                    isStatic = false;
                    if (typeof ctor === 'function') {
                      if (_t.hasOwnProperty('constructor')) {
                        isObject = false;
                      }
                    }
                  }
                }
                if (!name && typeof _f === 'string' && _f.indexOf('s') >= 0) {
                  isStatic = typeof _t === 'function';
                  if (isStatic) {
                    ctor = _t;
                  }
                  else {
                    ctor = _t.constructor;
                    if (isObject && typeof ctor === 'function') {
                      if (_t.hasOwnProperty('constructor')) {
                        isObject = false;
                      }
                    }
                  }
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
                        case 'W01v':
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
                        case 'W0.v':
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
                      if (_globalObj instanceof Set) {
                        rawProperty = [];
                        for (let _obj of _globalObj.values()) {
                          rawProperty.push(_obj);
                        }
                        property = rawProperty.map(p => _escapePlatformProperties.get(p) || p);
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
              case 'number':
              default:
                normalizedThisArg = _t;
                rawProperty = _p;
                break;
              }

            }
            if (typeof target === 'string' && target[3] === 'R') {
              boundParameters = null;
              let _target = target;
              let _boundArgs;
              _f = normalizedThisArg ? normalizedThisArg[rawProperty] : undefined;
              target = _f ? targetNormalizerMap.get(_f) : undefined;
              if (typeof target !== 'string') {
                if (typeof _p === 'function') {
                  let _boundParameters = _boundFunctions.get(_p);
                  if (_boundParameters) {
                    target = targetNormalizerMap.get(_boundParameters.f);
                    if (typeof target === 'string') {
                      rawProperty = _boundParameters.f.name;
                      _boundArgs = _boundParameters.args;
                    }
                  }
                }
              }
              if (typeof target === 'string') {
                switch (_args[0]) {
                case 'apply':
                  if (_target === 'x10R') {
                    _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][2]) : _args[1][2] ];
                  }
                  else {
                    _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][1]) : _args[1][1] ];
                  }
                  break;
                case 'call':
                  _args = [ rawProperty, _boundArgs ? _boundArgs.concat(Array.prototype.slice.call(_args[1], 1)) : Array.prototype.slice.call(_args[1], 1) ];
                  break;
                }
                continue;
              }
              else {
                break;
              }
            }
            else {
              break;
            }
          }
          while (true);
        }
        else if (typeof target === 'string') {
          opType = target[0];
          if (target[2] === '*') {
            property = rawProperty = S_ALL;
          }
          if (name instanceof Set) {
            for (let _name of name.values()) {
              switch (_name) {
              case 'window':
              case 'self':
                if (target === 'wtpv') { // window.property = v
                  switch (_f) {
                  case '=':
                  case '#=':
                    if (_args[1] instanceof Object) {
                      globalAssignments[rawProperty] = _args[1];
                    }
                    break;
                  default:
                    break;
                  }
                }
                break;
              default:
                break;
              }
            }
          }
        }
        if (!isObject) {
          if (name instanceof Set && name.has('Function')) {
            if (normalizedThisArg !== FunctionPrototype) {
              isObject = true; // function is an instance of Function
            }
          }
        }
        if (!applyAcl(name, isStatic, isObject, property, opType, context, normalizedThisArg, _args, arguments)) {
          // if (property === 'Object' && context.startsWith('/components/webcomponentsjs/webcomponents-lite.js')) {
          //   console.error('ACL: denied name =', name, 'isStatic =', isStatic, 'isObject = ', (typeof normalizedThisArg === 'object'), 'property =', property, 'opType =', opType, 'context = ', context);
          //   debugger;
          //   applyAcl(name, isStatic, typeof normalizedThisArg === 'object', property, opType, context);
          // }
          /*
          if (typeof property === 'string') {
            console.warn(isStatic ?
  `
    '${context}': '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}',

  ${name}: {
    ${property}: {
      [S_DEFAULT]: 'r-x',
      '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}': 'rwx',
    },
  },
  ` :
  `
    '${context}': '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}',

  ${name}: {
    [S_PROTOTYPE]: {
      ${property}: {
        [S_DEFAULT]: 'r-x',
        '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}': 'rwx',
      },
    },
  },
  `);
          }
          throw new Error('Permission Denied: Cannot access ' + opType + ' ' + name + (isStatic ? '.' : '.prototype.') + (typeof property === 'string' ? property : '') + ' from ' + context);
          */
          result = [ name, isStatic, isObject, property, opType, context, normalizedThisArg, _args, arguments ];
          throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
        }
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
        let it = name instanceof Set ? name.values() : [];
        for (let _name of it) {
          switch (_name) {
          case 'Object':
            if (!isStatic) {
              if (!_objectPropertyDescriptors[rawProperty]) {
                _name = null;
              }
            }
            break;
          case 'Array':
            if (!isStatic) {
              if (!_arrayPropertyDescriptors[rawProperty]) {
                _name = null;
              }
            }
            break;
          case 'String':
            if (!isStatic) {
              if (!_stringPropertyDescriptors[rawProperty]) {
                _name = null;
              }
            }
            break;
          case 'Function':
            if (!isStatic) {
              if (!_functionPropertyDescriptors[rawProperty]) {
                _name = null;
              }
            }
            break;
          default:
            break;
          }
          if (_name) {
            let forName;
            let forProp;
            let id;
            if (!globalPropertyContexts[context]) {
              let group = context.split(/[,:]/)[0];
              data2.nodes.push({ id: context, label: context, group: group });
              globalPropertyContexts[context] = true;
            }
            if (!globalObjectAccess[_name]) {
              globalObjectAccess[_name] = {};
              data2.nodes.push({ id: _name, label: _name, group: _name });
            }
            forName = globalObjectAccess[_name];
            if (typeof property === 'string') {
              id = isStatic || typeof normalizedThisArg === 'object'
                ? _name + '.' + rawProperty
                : _name + '.prototype.' + rawProperty
              if (!forName[property]) {
                forName[property] = {};
                data2.nodes.push({ id: id, label: (_unescapePlatformProperties.get(property) || property), group: _name });
                data2.edges.push({ from: _name, to: id, dashes: true, arrows: 'to' });
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
                id = isStatic || typeof normalizedThisArg === 'object' ? _name + '.' + rawProperty : _name + '.prototype.' + rawProperty;
                if (!forName[property[i]]) {
                  forName[property[i]] = {};
                  data2.nodes.push({ id: id, label: rawProperty, group: _name });
                  data2.edges.push({ from: _name, to: id, dashes: true, arrows: 'to' });
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
              forName = globalObjectAccess[_name];
              if (!forName[context]) {
                forName[context] = { from: '/' + context, to: _name, label: 0, arrows: 'to' };
                data2.edges.push(forName[context]);
              }
              forName[context].label++;
            }
          }
        }
      }
      else if (newTarget) {
        let name = _globalObjects.get(f);
        let superClass = f;
        while (!name && typeof superClass === 'function') {
          superClass = Object.getPrototypeOf(superClass);
          name = _globalObjects.get(superClass);
        }
        if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
          result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
          throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
          //console.error('ACL: denied name =', name, 'isStatic =', true, 'isObject = ', false, 'property =', S_UNSPECIFIED, 'opType =', 'x', 'context = ', context);
          //debugger;
          //applyAcl(name, true, false, S_UNSPECIFIED, 'x', context);
        }
        if (name) {
          // new operator for a global class
          for (let _name of name.values()) {
            let forName;
            if (!globalPropertyContexts[context]) {
              let group = context.split(/[,:]/)[0];
              data2.nodes.push({ id: '/' + context, label: context, group: group });
              globalPropertyContexts[context] = true;
            }
            if (!globalObjectAccess[_name]) {
              globalObjectAccess[_name] = {};
              data2.nodes.push({ id: _name, label: _name, group: _name });
            }
            forName = globalObjectAccess[_name];
            if (!forName[context]) {
              forName[context] = { from: '/' + context, to: _name, label: 0, arrows: 'to' };
              data2.edges.push(forName[context]);
            }
            forName[context].label++;
          }
        }
      }
      else {
        let name = _globalMethods.get(f);
        if (name) {
          // call of a native method
          let forName;
          let forProp;
          let id = name.join('.');
          let rawProp = name[name.length - 1];
          let prop = _escapePlatformProperties.get(rawProp) || rawProp;
          let obj = name[0];
          if (!applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments)) {
            result = [ obj, name[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments ];
            throw new Error('Permission Denied: Cannot access ' + obj);
            //console.error('ACL: denied name =', name, 'isStatic =', name[1] !== 'prototype', 'isObject = ', false, 'property =', prop, 'opType =', 'x', 'context = ', context);
            //debugger;
            //applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context);
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
        else if (newTarget === '') {
          let obj = Object.getPrototypeOf(args[0]);
          name = _globalObjects.get(obj);
          if (!name) {
            while (!name) {
              obj = Object.getPrototypeOf(obj);
              if (typeof obj === 'function') {
                name = _globalObjects.get(obj);
              }
              else {
                break;
              }
            }
          }
          if (name) {
            // super() call
            if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
              result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
              throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
            }
            for (let _name of name.values()) {
              // new operator for a global class
              let forName;
              if (!globalPropertyContexts[context]) {
                let group = context.split(/[,:]/)[0];
                data2.nodes.push({ id: '/' + context, label: context, group: group });
                globalPropertyContexts[context] = true;
              }
              if (!globalObjectAccess[_name]) {
                globalObjectAccess[_name] = {};
                data2.nodes.push({ id: _name, label: _name, group: _name });
              }
              forName = globalObjectAccess[_name];
              if (!forName[context]) {
                forName[context] = { from: '/' + context, to: _name, label: 0, arrows: 'to' };
                data2.edges.push(forName[context]);
              }
              forName[context].label++;
            }
          }
        }
        else if (Number.isNaN(newTarget)) {
          name = args[0];
          switch (name) {
          case 'import()':
            {
              // import('module.js')
              name = 'import'; // Note: virtual object name 'import'
              let property = S_UNSPECIFIED;
              if (!args[1] || typeof args[1] !== 'string' ||
                !args[1].match(/^\s*(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?\s*$/)) {
                property = 'invalidImportUrl'; // Note: virtual property 'invalidImportUrl'
              }
              if (!applyAcl(name, true, false, property, 'x', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'x', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
              }
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
            break;
          case 'import.meta':
            {
              // import.meta
              name = 'import'; // Note: virtual object name 'import'
              let property = 'meta'; // Note: virtual property name 'meta'
              if (!applyAcl(name, true, false, property, 'r', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'r', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + name);
              }
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
            break;
          case 'require':
            {
              // require('module.js'); args = [ 'require', './module.js', '/resolved/component/path/to/module.js' ]
              let property = S_UNSPECIFIED;
              if (!args[1] || typeof args[1] !== 'string') {
                property = 'invalidRequireName'; // Note: virtual property 'invalidRequireName'
              }
              if (!applyAcl(name, true, false, property, 'x', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'x', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + name);
              }
              // access allowed
              if (args[2][0] === '/') { // TODO: Only pre-hooked modules are handled for now.
                // load and register the object with its virtual name
                thisArg = f(); // The path argument is not required since it is embedded in the function body
                if (thisArg instanceof Object) {
                  let virtualName = args[2];
                  _globalObjects.set(thisArg, virtualName);
                  let _properties = Object.getOwnPropertyDescriptors(thisArg);
                  let _prop;
                  for (_prop in _properties) {
                    if (typeof _properties[_prop].value === 'function') {
                      _globalMethods.set(_properties[_prop].value, [virtualName, _prop]);
                    }
                  }
                  if (thisArg.prototype) {
                    _properties = Object.getOwnPropertyDescriptors(thisArg.prototype);
                    for (_prop in _properties) {
                      if (typeof _properties[_prop].value === 'function') {
                        _globalMethods.set(_properties[_prop].value, [virtualName, 'prototype', _prop]);
                      }
                    }
                  }
                }
                f = '*'; // return result = thisArg;
              }
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
            break;
          default:
            break;
          }
        }
      }

      let args1 = args[1]; // for '()'
      switch (f) {
      case Function:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args);
        break;
      case AsyncFunction:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, false, true);
        break;
      case GeneratorFunction:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, true, false);
        break;
      case '()':
      case '#()':
        switch (thisArg) {
        case Reflect:
          switch (args[0]) {
          case 'construct':
            if (args[1]) {
              switch (args[1][0]) {
              case Function:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              case AsyncFunction:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              case GeneratorFunction:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              default:
                if (Function.isPrototypeOf(args[1][0])) {
                  args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
                  if (args[1][2]) {
                    args1.push(args[1][2]);
                  }
                }
                break;
              }
            }
            break;
          case 'apply':
            if (args[1]) {
              switch (args[1][0]) {
              case Function:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2])];
                break;
              case AsyncFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], false, true)];
                break;
              case GeneratorFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], true, false)];
                break;
              default:
                if (Function.isPrototypeOf(args[1][0])) {
                  args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
                }
                break;
              }
            }
            break;
          default:
            break;
          }
          break;
        case Function:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1))];
            break;
          default:
            break;
          }
          break;
        case AsyncFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), false, true)];
            break;
          default:
            break;
          }
          break;
        case GeneratorFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), true, false)];
            break;
          default:
            break;
          }
          break;
        case undefined:
          break;
        default:
          if (args[0] === 'constructor') {
            if (thisArg instanceof GeneratorFunction) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
            }
            else if (thisArg instanceof AsyncFunction) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
            }
            else if (thisArg instanceof Function) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
            }
          }
          else {
            switch (thisArg[args[0]]) {
            case Function:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
              break;
            case AsyncFunction:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
              break;
            case GeneratorFunction:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
              break;
            default:
              break;
            }
          }
          break;
        }
        break;
      case 's()':
        switch (args[2](args[0])) {
        case Function:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
          break;
        case AsyncFunction:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
          break;
        case GeneratorFunction:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
          break;
        default:
          break;
        }
        break;
      case 'bind':
        switch (thisArg) {
        case Function:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method');
          break;
        case AsyncFunction:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', false, true);
          break;
        case GeneratorFunction:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', true, false);
          break;
        default:
          break;
        }
        break;
      default:
        if (typeof f === 'function') {
          if (Function.isPrototypeOf(f) && newTarget) {
            args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, GeneratorFunction.isPrototypeOf(f), AsyncFunction.isPrototypeOf(f));
          }
          else if (newTarget === '') {
            if (Function.isPrototypeOf(args[0])) {
              args = [ args[0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args.slice(1), GeneratorFunction.isPrototypeOf(args[0]), AsyncFunction.isPrototypeOf(args[0])) ];
            }
          }
        }
        break;
      }
      if (typeof f !== 'string') {
        result = newTarget
          ? Reflect.construct(f, args)
          : thisArg
            ? f.apply(thisArg, args)
            : f(...args);
      }
      else {
        // property access
        switch (f) {
        // getter
        case '.':
        case '[]':
          result = thisArg[args[0]];
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
          result = thisArg[args[0]](...args1);
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
          result = thisArg[args[0]] = args[1];
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
        // LHS property access
        case '.=':
          result = { set ['='](v) { thisArg[args[0]] = v; }, get ['=']() { return thisArg[args[0]]; } };
          break;
        // strict mode operators prefixed with '#'
        // getter
        case '#.':
        case '#[]':
          result = StrictModeWrapper['#.'](thisArg, args[0]);
          break;
        // enumeration
        case '#*':
          result = StrictModeWrapper['#*'](thisArg);
          break;
        // property existence
        case '#in':
          result = StrictModeWrapper['#in'](thisArg, args[0]);
          break;
        // funcation call
        case '#()':
          result = StrictModeWrapper['#()'](thisArg, args[0], args1);
          break;
        // unary operators
        case '#p++':
          result = StrictModeWrapper['#p++'](thisArg, args[0]);
          break;
        case '#++p':
          result = StrictModeWrapper['#++p'](thisArg, args[0]);
          break;
        case '#p--':
          result = StrictModeWrapper['#p--'](thisArg, args[0]);
          break;
        case '#--p':
          result = StrictModeWrapper['#--p'](thisArg, args[0]);
          break;
        case '#delete':
          result = StrictModeWrapper['#delete'](thisArg, args[0]);
          break;
        // assignment operators
        case '#=':
          result = StrictModeWrapper['#='](thisArg, args[0], args[1]);
          break;
        case '#+=':
          result = StrictModeWrapper['#+='](thisArg, args[0], args[1]);
          break;
        case '#-=':
          result = StrictModeWrapper['#-='](thisArg, args[0], args[1]);
          break;
        case '#*=':
          result = StrictModeWrapper['#*='](thisArg, args[0], args[1]);
          break;
        case '#/=':
          result = StrictModeWrapper['#/='](thisArg, args[0], args[1]);
          break;
        case '#%=':
          result = StrictModeWrapper['#%='](thisArg, args[0], args[1]);
          break;
        case '#**=':
          result = StrictModeWrapper['#**='](thisArg, args[0], args[1]);
          break;
        case '#<<=':
          result = StrictModeWrapper['#<<='](thisArg, args[0], args[1]);
          break;
        case '#>>=':
          result = StrictModeWrapper['#>>='](thisArg, args[0], args[1]);
          break;
        case '#>>>=':
          result = StrictModeWrapper['#>>>='](thisArg, args[0], args[1]);
          break;
        case '#&=':
          result = StrictModeWrapper['#&='](thisArg, args[0], args[1]);
          break;
        case '#^=':
          result = StrictModeWrapper['#^='](thisArg, args[0], args[1]);
          break;
        case '#|=':
          result = StrictModeWrapper['#|='](thisArg, args[0], args[1]);
          break;
        // LHS property access
        case '#.=':
          result = StrictModeWrapper['#.='](thisArg, args[0]);
          break;
        // getter for super
        case 's.':
        case 's[]':
          result = args[1](args[0]);
          break;
        // super method call
        case 's()':
          result = args[2](args[0]).apply(thisArg, args1);
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
        // getter in 'with' statement body
        case 'w.':
        case 'w[]':
          result = args[1]();
          break;
        // function call in 'with' statement body
        case 'w()':
          result = args[2](...args[1]);
          break;
        // constructor call in 'with' statement body
        case 'wnew':
          result = args[2](...args[1]);
          break;
        // unary operators in 'with' statement body
        case 'w++':
        case '++w':
        case 'w--':
        case '--w':
          result = args[1]();
          break;
        // unary operators in 'with' statement body
        case 'wtypeof':
        case 'wdelete':
          result = args[1]();
          break;
        // LHS value in 'with' statement body (__hook__('w.=', __with__, ['p', { set ['='](v) { p = v } } ], 'context', false)['='])
        case 'w.=':
          result = args[1];
          break;
        // assignment operators in 'with' statement body
        case 'w=':
        case 'w+=':
        case 'w-=':
        case 'w*=':
        case 'w/=':
        case 'w%=':
        case 'w**=':
        case 'w<<=':
        case 'w>>=':
        case 'w>>>=':
        case 'w&=':
        case 'w^=':
        case 'w|=':
          result = args[2](args[1]);
          break;
        // default (invalid operator)
        default:
          f(); // throw TypeError: f is not a function
          result = null;
          break;
        }
      }
      if (globalAssignments) {
        if (_global.constructor.name === 'Window') {
          for (let name in globalAssignments) {
            wrapGlobalProperty([_global, name, 'window']);
          }
        }
      }

      lastContext = _lastContext;
      // if (contextStack[contextStack.length - 1] !== context) { debugger; }
      contextStack.pop();
    }
    catch (e) {
      onThrow(e, arguments, contextStack, result); // result contains arguments to applyAcl, or undefined
      lastContext = _lastContext;
      contextStack.pop();
      throw e;
    }
    return result;
  }

  // acl only
  const __hook__acl = function __hook__acl(f, thisArg, args, context, newTarget, contextSymbol) {
    let _lastContext;
    let _f;
    let normalizedThisArg = thisArg;
    let _args = args;
    let boundParameters;
    counter++;
    contextSymbol = context;
    if (typeof context !== 'symbol') {
      let e = new Error('__hook__: invalid context')
      onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
      throw e;
    }
    context = __hook__acl[context];
    if (!context) {
      let e = new Error('__hook__: invalid context')
      onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
      throw e;
    }
    _lastContext = lastContext;
    lastContext = context;
    contextStack.push(context);

    let result;
    try {
      let hasGlobalAssignments = false;
      let globalAssignments;
      if (otherWindowObjectsStatus.set) {
        let _Object;
        switch (typeof f) {
        case 'function':
          if (!(f instanceof Object)) {
            _Object = f.apply.constructor.__proto__.__proto__.constructor;
          }
          break;
        case 'string':
          if (thisArg && !(thisArg instanceof Object) && typeof thisArg.hasOwnProperty === 'function') {
            _Object = thisArg.hasOwnProperty.constructor.__proto__.__proto__.constructor;
          }
          break;
        }
        if (_Object && _Object !== Object) {
          let contentWindow = otherWindowObjects.get(_Object);
          if (contentWindow) {
            if (contentWindow.__hook__) {
              //console.log('applying __hook__ of contentWindow');
              contentWindow.__hook__[contextSymbol] = context;
              context = contextSymbol;
              result = contentWindow.__hook__.apply(contentWindow, arguments);
              contextStack.pop();
              return result;
            }
            else {
              console.error('contentWindow.__hook__ not found for ', contentWindow);
            }
          }
        }
      }
      _f = f;
      boundParameters = _boundFunctions.get(f);
      if (!boundParameters) {
        switch (f) {
        case '()':
        case '#()':
          switch (typeof thisArg) {
          case 'function':
            switch (_args[0]) {
            case 'apply':
              boundParameters = _boundFunctions.get(thisArg);
              if (boundParameters) {
                _args = _args[1][1];
              }
              break;
            case 'call':
              boundParameters = _boundFunctions.get(thisArg);
              if (boundParameters) {
                _args = _args[1].slice(1);
              }
              break;
            default:
              boundParameters = _boundFunctions.get(thisArg[_args[0]]);
              if (boundParameters) {
                _args = _args[1];
              }
              break;
            }
            break;
          case 'object':
            if (thisArg === Reflect && _args[0] === 'apply') {
              boundParameters = _boundFunctions.get(_args[1][0]);
              if (boundParameters) {
                _args = _args[1][2];
              }
              break;
            }
          default:
            boundParameters = _boundFunctions.get(thisArg[_args[0]]);
            if (boundParameters) {
              _args = _args[1];
            }
            break;
          }
          break;
        case 's()':
          boundParameters = _boundFunctions.get(_args[2](_args[0]));
          if (boundParameters) {
            _args = _args[1];
          }
          break;
        default:
          break;
        }
      }
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
        /*
        if (context === '/components/thin-hook/demo/my-view2.html,script@2442,getData' && _f === '()' && args[0] === 'bind') {
          debugger;
        }
        */
        // property access
        if (newTarget === false) { // resolve the scope in 'with' statement body
          let varName = _args[0];
          let __with__ = thisArg;
          let scope = _global;
          let _scope;
          let i;
          for (i = 0; i < __with__.length; i++) {
            _scope = __with__[i];
            if (Reflect.has(_scope, varName)) {
              if (_scope[Symbol.unscopables] && _scope[Symbol.unscopables][varName]) {
                continue;
              }
              else {
                scope = _scope;
                break;
              }
            }
          }
          thisArg = normalizedThisArg = scope;
        }
        if (boundParameters) {
          normalizedThisArg = boundParameters._normalizedThisArg;
          _args = [ boundParameters._f, boundParameters._args.concat(_args) ];
        }
        let name = _globalObjects.get(normalizedThisArg);
        let isStatic = typeof normalizedThisArg === 'function';
        if (boundParameters) {
          isStatic = boundParameters.isStatic;
          name = boundParameters.name;
        }
        let ctor;
        let isObject = typeof normalizedThisArg === 'object';
        if (!name && isSuperOperator.get(_f)) {
          if (isStatic) {
            ctor = normalizedThisArg;
          }
          else {
            ctor = normalizedThisArg.constructor;
            if (ctor) {
              if (_hasOwnProperty.call(normalizedThisArg, 'constructor')) {
                isObject = false;
              }
            }
          }
          name = _globalObjects.get(ctor);
          while (!name && typeof ctor === 'function') {
            ctor = Object.getPrototypeOf(ctor);
            name = _globalObjects.get(ctor);
          }
        }
        if (!name && normalizedThisArg instanceof Object) {
          ctor = normalizedThisArg.constructor;
          name = _globalObjects.get(ctor);
          if (name) {
            isStatic = false;
            if (typeof ctor === 'function') {
              if (_hasOwnProperty.call(normalizedThisArg, 'constructor')) {
                isObject = false;
              }
            }
          }
        }
        let rawProperty = _args[0];
        let property = _escapePlatformProperties.get(rawProperty) || rawProperty;
        let target = targetNormalizerMapObject.get(_f);
        let opType;
        globalAssignments = {};
        if (typeof target === 'object') {
          do {
            if (normalizedThisArg instanceof Object) {
              switch (typeof rawProperty) {
              case 'string':
                if (boundParameters) {
                  target = targetNormalizerMap.get(boundParameters._f);
                }
                else {
                  target = targetNormalizerMap.get(normalizedThisArg[rawProperty]);
                }
                break;
              case 'function':
                target = targetNormalizerMap.get(rawProperty);
                break;
              default:
                target = undefined;
                break;
              }
              if (!target) {
                target = 'xtp'; // [S_DEFAULT]
              }
            }
            else if (typeof _args[0] === 'function') {
              target = targetNormalizerMap.get(_args[0]);
            }
            let _t;
            let _p;
            if (typeof target === 'string') {
              opType = target[0]; // r, w, x
              switch (target[1]) {
              case 't': _t = normalizedThisArg; break;
              case '0': _t = _args[1][0]; break;
              case '1': _t = _args[1][1]; break;
              case 'f': _t = _f; break;
              case 'p': _t = _args[0]; break;
              case 'c': _t = context; break;
              case 'n': _t = newTarget; break;
              case 'P': _t = '__proto__'; break;
              case 'T': _t = 'prototype'; break;
              case 'C': _t = 'constructor'; break;
              case 'N': _t = S_CONSTRUCT; break;
              case '-': _t = S_UNSPECIFIED; break;
              case '*': _t = S_ALL; break;
              case '.': _t = S_TARGETED; break; // { prop1: {}, prop2: {}, ... }
              default: break;
              }
              switch (target[2]) {
              case 'p': _p = _args[0]; break;
              case '1': _p = _args[1][1]; break;
              case '*': _p = S_ALL; break;
              case '.': _p = S_TARGETED; break; // { prop1: {}, prop2: {}, ... }
              case '-': _p = S_UNSPECIFIED; break;
              case 't': _p = normalizedThisArg; break;
              case '0': _p = _args[1][0]; break;
              case 'f': _p = _f; break;
              case 'c': _p = context; break;
              case 'n': _p = newTarget; break;
              case 'P': _p = '__proto__'; break;
              case 'T': _p = 'prototype'; break;
              case 'C': _p = 'constructor'; break;
              case 'N': _p = S_CONSTRUCT; break;
              default: break;
              }
              switch (typeof _t) {
              case 'object':
              case 'string':
              case 'function':
              case 'symbol':
              case 'boolean':
                if (_t === null || _t === undefined) {
                  name = _globalObjects.get(_global); // non-strict mode default this
                  if (!name) {
                    break;
                  }
                }
                else {
                  name = _globalObjects.get(_t);
                }
                isStatic = typeof _t === 'function';
                normalizedThisArg = _t;
                isObject = typeof normalizedThisArg === 'object';
                if (!name) {
                  ctor = _t.constructor;
                  name = _globalObjects.get(ctor);
                  if (name) {
                    isStatic = false;
                    if (typeof ctor === 'function') {
                      if (_t.hasOwnProperty('constructor')) {
                        isObject = false;
                      }
                    }
                  }
                }
                if (!name && isSuperOperator.get(_f)) {
                  isStatic = typeof _t === 'function';
                  if (isStatic) {
                    ctor = _t;
                  }
                  else {
                    ctor = _t.constructor;
                    if (isObject && typeof ctor === 'function') {
                      if (_t.hasOwnProperty('constructor')) {
                        isObject = false;
                      }
                    }
                  }
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
                    switch (target) {
                    case 'w01v':
                    case 'W01v':
                      switch (name) {
                      case 'window':
                      case 'self':
                        switch (_args[0]) {
                        case 'defineProperty': // Object.defineProperty(window, 'property', { value: v }); Reflect.defineProperty(window, 'property', { value: v })
                          if (_args[1][2] && _args[1][2].value instanceof Object) {
                            hasGlobalAssignments = true;
                            globalAssignments[rawProperty] = _args[1][2].value;
                          }
                          break;
                        case 'set': // Reflect.set(window, 'property', v)
                          if (_args[1][2] instanceof Object) {
                            hasGlobalAssignments = true;
                            globalAssignments[rawProperty] = _args[1][2];
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
                    case 'w0.v':
                    case 'W0.v':
                      switch (name) {
                      case 'window':
                      case 'self':
                        let props;
                        switch (_args[0]) {
                        case 'defineProperties': // Object.defineProperties(window, { 'property': { value: v } })
                          props = _args[1][1];
                          for (let p in props) {
                            if (props[p] && props[p].value instanceof Object) {
                              hasGlobalAssignments = true;
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
                                  hasGlobalAssignments = true;
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
                      if (_globalObj instanceof Set) {
                        rawProperty = [];
                        for (let _obj of _globalObj.values()) {
                          rawProperty.push(_obj);
                        }
                        property = rawProperty.map(p => _escapePlatformProperties.get(p) || p);
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
              case 'number':
              default:
                normalizedThisArg = _t;
                rawProperty = _p;
                break;
              }
            }
            if (typeof target === 'string' && target[3] === 'R') {
              boundParameters = null;
              let _target = target;
              let _boundArgs;
              _f = normalizedThisArg ? normalizedThisArg[rawProperty] : undefined;
              target = _f ? targetNormalizerMap.get(_f) : undefined;
              if (typeof target !== 'string') {
                if (typeof _p === 'function') {
                  let _boundParameters = _boundFunctions.get(_p);
                  if (_boundParameters) {
                    target = targetNormalizerMap.get(_boundParameters.f);
                    if (typeof target === 'string') {
                      rawProperty = _boundParameters.f.name;
                      _boundArgs = _boundParameters.args;
                    }
                  }
                }
              }
              if (typeof target === 'string') {
                switch (_args[0]) {
                case 'apply':
                  if (_target === 'x10R') {
                    _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][2]) : _args[1][2] ];
                  }
                  else {
                    _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][1]) : _args[1][1] ];
                  }
                  break;
                case 'call':
                  _args = [ rawProperty, _boundArgs ? _boundArgs.concat(Array.prototype.slice.call(_args[1], 1)) : Array.prototype.slice.call(_args[1], 1) ];
                  break;
                }
                continue;
              }
              else {
                break;
              }
            }
            else {
              break;
            }
          }
          while (true);
        }
        else if (typeof target === 'string') {
          opType = target[0];
          if (target[2] === '*') {
            property = rawProperty = S_ALL;
          }
          if (name instanceof Set) {
            for (let _name of name.values()) {
              switch (_name) {
              case 'window':
              case 'self':
                if (target === 'wtpv') { // window.property = v
                  switch (_f) {
                  case '=':
                  case '#=':
                    if (_args[1] instanceof Object) {
                      hasGlobalAssignments = true;
                      globalAssignments[rawProperty] = _args[1];
                    }
                    break;
                  default:
                    break;
                  }
                }
                break;
              default:
                break;
              }
            }
          }
        }
        if (!isObject) {
          if (name instanceof Set && name.has('Function')) {
            if (normalizedThisArg !== FunctionPrototype) {
              isObject = true; // function is an instance of Function
            }
          }
        }
        if (!applyAcl(name, isStatic, isObject, property, opType, context, normalizedThisArg, _args, arguments)) {
          // if (name === 'Object' && context.startsWith('/components/dexie/dist/dexie.min.js')) {
          //   console.error('ACL: denied name =', name, 'isStatic =', isStatic, 'isObject = ', (typeof normalizedThisArg === 'object'), 'property =', property, 'opType =', opType, 'context = ', context);
          //   debugger;
          //   applyAcl(name, isStatic, typeof normalizedThisArg === 'object', property, opType, context);
          // }
          /*
          if (typeof property === 'string') {
            console.warn(isStatic ?
  `
    '${context}': '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}',

  ${name}: {
    ${property}: {
      [S_DEFAULT]: 'r-x',
      '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}': 'rwx',
    },
  },
  ` :
  `
    '${context}': '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}',

  ${name}: {
    [S_PROTOTYPE]: {
      ${property}: {
        [S_DEFAULT]: 'r-x',
        '${contextNormalizer[context] || '@' + name + '_' + property + '_' + (opType === 'w' ? 'writer' : 'executor')}': 'rwx',
      },
    },
  },
  `);
          }
          throw new Error('Permission Denied: Cannot access ' + opType + ' ' + name + (isStatic ? '.' : '.prototype.') + (typeof property === 'string' ? property : '') + ' from ' + context);
          */
          result = [ name, isStatic, isObject, property, opType, context, normalizedThisArg, _args, arguments ];
          throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
        }
        if (typeof target === 'string' && target === 'r0tb') {
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
        if (hasGlobalAssignments) {
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
        }
      }
      else if (newTarget) {
        let name = _globalObjects.get(f);
        let superClass = f;
        while (!name && typeof superClass === 'function') {
          superClass = Object.getPrototypeOf(superClass);
          name = _globalObjects.get(superClass);
        }
        if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
          result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
          throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
          //console.error('ACL: denied name =', name, 'isStatic =', true, 'isObject = ', false, 'property =', S_UNSPECIFIED, 'opType =', 'x', 'context = ', context);
          //debugger;
          //applyAcl(name, true, false, S_UNSPECIFIED, 'x', context);
        }
      }
      else {
        let name = _globalMethods.get(f);
        if (name) {
          // call of a native method
          let rawProp = name[name.length - 1];
          let prop = _escapePlatformProperties.get(rawProp) || rawProp;
          let obj = name[0];
          if (!applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments)) {
            result = [ obj, name[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments ];
            throw new Error('Permission Denied: Cannot access ' + obj);
            //console.error('ACL: denied name =', name, 'isStatic =', name[1] !== 'prototype', 'isObject = ', false, 'property =', prop, 'opType =', 'x', 'context = ', context);
            //debugger;
            //applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', context);
          }
        }
        else if (newTarget === '') {
          let obj = Object.getPrototypeOf(args[0]);
          name = _globalObjects.get(obj);
          if (!name) {
            while (!name) {
              obj = Object.getPrototypeOf(obj);
              if (typeof obj === 'function') {
                name = _globalObjects.get(obj);
              }
              else {
                break;
              }
            }
          }
          if (name) {
            // super() call
            if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
              result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
              throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
            }
          }
        }
        else if (Number.isNaN(newTarget)) {
          name = args[0];
          switch (name) {
          case 'import()':
            {
              // import('module.js')
              name = 'import'; // Note: virtual object name 'import'
              let property = S_UNSPECIFIED;
              if (!args[1] || typeof args[1] !== 'string' ||
                !args[1].match(/^\s*(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?\s*$/)) {
                property = 'invalidImportUrl'; // Note: virtual property 'invalidImportUrl'
              }
              if (!applyAcl(name, true, false, property, 'x', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'x', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + name);
              }
            }
            break;
          case 'import.meta':
            {
              // import.meta
              name = 'import'; // Note: virtual object name 'import'
              let property = 'meta'; // Note: virtual property name 'meta'
              if (!applyAcl(name, true, false, property, 'r', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'r', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + name);
              }
            }
            break;
          case 'require':
            {
              // require('module.js'); args = [ 'require', './module.js', '/resolved/component/path/to/module.js' ]
              let property = S_UNSPECIFIED;
              if (!args[1] || typeof args[1] !== 'string') {
                property = 'invalidRequireName'; // Note: virtual property 'invalidRequireName'
              }
              if (!applyAcl(name, true, false, property, 'x', context, normalizedThisArg, _args, arguments)) {
                result = [ name, true, false, property, 'x', context, normalizedThisArg, _args, arguments ];
                throw new Error('Permission Denied: Cannot access ' + name);
              }
              // access allowed
              if (args[2][0] === '/') { // TODO: Only pre-hooked modules are handled for now.
                // load and register the object with its virtual name
                thisArg = f(); // The path argument is not required since it is embedded in the function body
                if (thisArg instanceof Object) {
                  let virtualName = args[2];
                  _globalObjects.set(thisArg, virtualName);
                  let _properties = Object.getOwnPropertyDescriptors(thisArg);
                  let _prop;
                  for (_prop in _properties) {
                    if (typeof _properties[_prop].value === 'function') {
                      _globalMethods.set(_properties[_prop].value, [virtualName, _prop]);
                    }
                  }
                  if (thisArg.prototype) {
                    _properties = Object.getOwnPropertyDescriptors(thisArg.prototype);
                    for (_prop in _properties) {
                      if (typeof _properties[_prop].value === 'function') {
                        _globalMethods.set(_properties[_prop].value, [virtualName, 'prototype', _prop]);
                      }
                    }
                  }
                }
                f = '*'; // return result = thisArg;
              }
            }
            break;
          default:
            break;
          }
        }
      }

      let args1 = args[1]; // for '()'
      switch (f) {
      case Function:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args);
        break;
      case AsyncFunction:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, false, true);
        break;
      case GeneratorFunction:
        args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, true, false);
        break;
      case '()':
      case '#()':
        switch (thisArg) {
        case Reflect:
          switch (args[0]) {
          case 'construct':
            if (args[1]) {
              switch (args[1][0]) {
              case Function:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              case AsyncFunction:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              case GeneratorFunction:
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              default:
                if (Function.isPrototypeOf(args[1][0])) {
                  args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
                  if (args[1][2]) {
                    args1.push(args[1][2]);
                  }
                }
                break;
              }
            }
            break;
          case 'apply':
            if (args[1]) {
              switch (args[1][0]) {
              case Function:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2])];
                break;
              case AsyncFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], false, true)];
                break;
              case GeneratorFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], true, false)];
                break;
              default:
                if (Function.isPrototypeOf(args[1][0])) {
                  args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
                }
                break;
              }
            }
            break;
          default:
            break;
          }
          break;
        case Function:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1))];
            break;
          default:
            break;
          }
          break;
        case AsyncFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), false, true)];
            break;
          default:
            break;
          }
          break;
        case GeneratorFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), true, false)];
            break;
          default:
            break;
          }
          break;
        case undefined:
          break;
        default:
          if (args[0] === 'constructor') {
            if (thisArg instanceof GeneratorFunction) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
            }
            else if (thisArg instanceof AsyncFunction) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
            }
            else if (thisArg instanceof Function) {
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
            }
          }
          else {
            switch (thisArg[args[0]]) {
            case Function:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
              break;
            case AsyncFunction:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
              break;
            case GeneratorFunction:
              args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
              break;
            default:
              break;
            }
          }
          break;
        }
        break;
      case 's()':
        switch (args[2](args[0])) {
        case Function:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
          break;
        case AsyncFunction:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
          break;
        case GeneratorFunction:
          args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
          break;
        default:
          break;
        }
        break;
      case 'bind':
        switch (thisArg) {
        case Function:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method');
          break;
        case AsyncFunction:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', false, true);
          break;
        case GeneratorFunction:
          thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', true, false);
          break;
        default:
          break;
        }
        break;
      default:
        if (typeof f === 'function') {
          if (Function.isPrototypeOf(f) && newTarget) {
            args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, GeneratorFunction.isPrototypeOf(f), AsyncFunction.isPrototypeOf(f));
          }
          else if (newTarget === '') {
            if (Function.isPrototypeOf(args[0])) {
              args = [ args[0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args.slice(1), GeneratorFunction.isPrototypeOf(args[0]), AsyncFunction.isPrototypeOf(args[0])) ];
            }
          }
        }
        break;
      }
      if (typeof f !== 'string') {
        if (newTarget) {
          result = Reflect.construct(f, args);
        }
        else if (thisArg) {
          result = f.apply(thisArg, args);
        }
        else {
          result = f(...args);
        }
      }
      else {
        // property access
        switch (f) {
        // getter
        case '.':
        case '[]':
          result = thisArg[args[0]];
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
          result = thisArg[args[0]](...args1);
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
          result = thisArg[args[0]] = args[1];
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
        // LHS property access
        case '.=':
          result = { set ['='](v) { thisArg[args[0]] = v; }, get ['=']() { return thisArg[args[0]]; } };
          break;
        // strict mode operators prefixed with '#'
        // getter
        case '#.':
        case '#[]':
          result = StrictModeWrapper['#.'](thisArg, args[0]);
          break;
        // enumeration
        case '#*':
          result = StrictModeWrapper['#*'](thisArg);
          break;
        // property existence
        case '#in':
          result = StrictModeWrapper['#in'](thisArg, args[0]);
          break;
        // funcation call
        case '#()':
          result = StrictModeWrapper['#()'](thisArg, args[0], args1);
          break;
        // unary operators
        case '#p++':
          result = StrictModeWrapper['#p++'](thisArg, args[0]);
          break;
        case '#++p':
          result = StrictModeWrapper['#++p'](thisArg, args[0]);
          break;
        case '#p--':
          result = StrictModeWrapper['#p--'](thisArg, args[0]);
          break;
        case '#--p':
          result = StrictModeWrapper['#--p'](thisArg, args[0]);
          break;
        case '#delete':
          result = StrictModeWrapper['#delete'](thisArg, args[0]);
          break;
        // assignment operators
        case '#=':
          result = StrictModeWrapper['#='](thisArg, args[0], args[1]);
          break;
        case '#+=':
          result = StrictModeWrapper['#+='](thisArg, args[0], args[1]);
          break;
        case '#-=':
          result = StrictModeWrapper['#-='](thisArg, args[0], args[1]);
          break;
        case '#*=':
          result = StrictModeWrapper['#*='](thisArg, args[0], args[1]);
          break;
        case '#/=':
          result = StrictModeWrapper['#/='](thisArg, args[0], args[1]);
          break;
        case '#%=':
          result = StrictModeWrapper['#%='](thisArg, args[0], args[1]);
          break;
        case '#**=':
          result = StrictModeWrapper['#**='](thisArg, args[0], args[1]);
          break;
        case '#<<=':
          result = StrictModeWrapper['#<<='](thisArg, args[0], args[1]);
          break;
        case '#>>=':
          result = StrictModeWrapper['#>>='](thisArg, args[0], args[1]);
          break;
        case '#>>>=':
          result = StrictModeWrapper['#>>>='](thisArg, args[0], args[1]);
          break;
        case '#&=':
          result = StrictModeWrapper['#&='](thisArg, args[0], args[1]);
          break;
        case '#^=':
          result = StrictModeWrapper['#^='](thisArg, args[0], args[1]);
          break;
        case '#|=':
          result = StrictModeWrapper['#|='](thisArg, args[0], args[1]);
          break;
        // LHS property access
        case '#.=':
          result = StrictModeWrapper['#.='](thisArg, args[0]);
          break;
        // getter for super
        case 's.':
        case 's[]':
          result = args[1](args[0]);
          break;
        // super method call
        case 's()':
          result = args[2](args[0]).apply(thisArg, args1);
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
        // getter in 'with' statement body
        case 'w.':
        case 'w[]':
          result = args[1]();
          break;
        // function call in 'with' statement body
        case 'w()':
          result = args[2](...args[1]);
          break;
        // constructor call in 'with' statement body
        case 'wnew':
          result = args[2](...args[1]);
          break;
        // unary operators in 'with' statement body
        case 'w++':
        case '++w':
        case 'w--':
        case '--w':
          result = args[1]();
          break;
        // unary operators in 'with' statement body
        case 'wtypeof':
        case 'wdelete':
          result = args[1]();
          break;
        // LHS value in 'with' statement body (__hook__('w.=', __with__, ['p', { set ['='](v) { p = v } } ], 'context', false)['='])
        case 'w.=':
          result = args[1];
          break;
        // assignment operators in 'with' statement body
        case 'w=':
        case 'w+=':
        case 'w-=':
        case 'w*=':
        case 'w/=':
        case 'w%=':
        case 'w**=':
        case 'w<<=':
        case 'w>>=':
        case 'w>>>=':
        case 'w&=':
        case 'w^=':
        case 'w|=':
          result = args[2](args[1]);
          break;
        // default (invalid operator)
        default:
          f(); // throw TypeError: f is not a function
          result = null;
          break;
        }
      }
      if (hasGlobalAssignments) {
        if (_global.constructor.name === 'Window') {
          for (let name in globalAssignments) {
            wrapGlobalProperty([_global, name, 'window']);
          }
        }
      }

      lastContext = _lastContext;
      // if (contextStack[contextStack.length - 1] !== context) { debugger; }
      contextStack.pop();
    }
    catch (e) {
      onThrow(e, arguments, contextStack, result); // result contains arguments to applyAcl, or undefined
      lastContext = _lastContext;
      contextStack.pop();
      throw e;
    }
    return result;
  }

  function showContextStackLog() {
    let asyncCalls = Object.keys(contextStackLog).filter(c => c.match(/(setTimeout|setInterval|Promise)/g));
    console.log(asyncCalls);
  }

  const __hook__min = function __hook__min(f, thisArg, args, context, newTarget) {
    let normalizedThisArg = thisArg;
    if (newTarget === false) { // resolve the scope in 'with' statement body
      let varName = args[0];
      let __with__ = thisArg;
      let scope = _global;
      let _scope;
      let i;
      for (i = 0; i < __with__.length; i++) {
        _scope = __with__[i];
        if (Reflect.has(_scope, varName)) {
          if (_scope[Symbol.unscopables] && _scope[Symbol.unscopables][varName]) {
            continue;
          }
          else {
            scope = _scope;
            break;
          }
        }
      }
      thisArg = normalizedThisArg = scope;
    }
    let result;
    let args1 = args[1]; // for '()'
    switch (f) {
    case Function:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args);
      break;
    case AsyncFunction:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, false, true);
      break;
    case GeneratorFunction:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, true, false);
      break;
    case '()':
    case '#()':
      switch (thisArg) {
      case Reflect:
        switch (args[0]) {
        case 'construct':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            case AsyncFunction:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            case GeneratorFunction:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            default:
              if (Function.isPrototypeOf(args[1][0])) {
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
              }
              break;
            }
          }
          break;
        case 'apply':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2])];
              break;
            case AsyncFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], false, true)];
              break;
            case GeneratorFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], true, false)];
              break;
            default:
              if (Function.isPrototypeOf(args[1][0])) {
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
              }
              break;
            }
          }
          break;
        default:
          break;
        }
        break;
      case Function:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1))];
          break;
        default:
          break;
        }
        break;
      case AsyncFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), false, true)];
          break;
        default:
          break;
        }
        break;
      case GeneratorFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), true, false)];
          break;
        default:
          break;
        }
        break;
      case undefined:
        break;
      default:
        if (args[0] === 'constructor') {
          if (thisArg instanceof GeneratorFunction) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
          }
          else if (thisArg instanceof AsyncFunction) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
          }
          else if (thisArg instanceof Function) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
          }
        }
        else {
          switch (thisArg[args[0]]) {
          case Function:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
            break;
          case AsyncFunction:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
            break;
          case GeneratorFunction:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
            break;
          default:
            break;
          }
        }
        break;
      }
      break;
    case 's()':
      switch (args[2](args[0])) {
      case Function:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
        break;
      case AsyncFunction:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
        break;
      case GeneratorFunction:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
        break;
      default:
        break;
      }
      break;
    case 'bind':
      switch (thisArg) {
      case Function:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method');
        break;
      case AsyncFunction:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', false, true);
        break;
      case GeneratorFunction:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', true, false);
        break;
      default:
        break;
      }
      break;
    default:
      if (typeof f === 'function') {
        if (Function.isPrototypeOf(f) && newTarget) {
          args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, GeneratorFunction.isPrototypeOf(f), AsyncFunction.isPrototypeOf(f));
        }
        else if (newTarget === '') {
          if (Function.isPrototypeOf(args[0])) {
            args = [ args[0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args.slice(1), GeneratorFunction.isPrototypeOf(args[0]), AsyncFunction.isPrototypeOf(args[0])) ];
          }
        }
      }
      break;
    }
    if (typeof f !== 'string') {
      if (newTarget) {
        result = Reflect.construct(f, args);
      }
      else if (thisArg) {
        result = f.apply(thisArg, args);
      }
      else {
        result = f(...args);
      }
    }
    else {
      // property access
      switch (f) {
      // getter
      case '.':
      case '[]':
        result = thisArg[args[0]];
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
        result = thisArg[args[0]](...args1);
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
        result = thisArg[args[0]] = args[1];
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
      // LHS property access
      case '.=':
        result = { set ['='](v) { thisArg[args[0]] = v; }, get ['=']() { return thisArg[args[0]]; } };
        break;
      // strict mode operators prefixed with '#'
      // getter
      case '#.':
      case '#[]':
        result = StrictModeWrapper['#.'](thisArg, args[0]);
        break;
      // enumeration
      case '#*':
        result = StrictModeWrapper['#*'](thisArg);
        break;
      // property existence
      case '#in':
        result = StrictModeWrapper['#in'](thisArg, args[0]);
        break;
      // funcation call
      case '#()':
        result = StrictModeWrapper['#()'](thisArg, args[0], args1);
        break;
      // unary operators
      case '#p++':
        result = StrictModeWrapper['#p++'](thisArg, args[0]);
        break;
      case '#++p':
        result = StrictModeWrapper['#++p'](thisArg, args[0]);
        break;
      case '#p--':
        result = StrictModeWrapper['#p--'](thisArg, args[0]);
        break;
      case '#--p':
        result = StrictModeWrapper['#--p'](thisArg, args[0]);
        break;
      case '#delete':
        result = StrictModeWrapper['#delete'](thisArg, args[0]);
        break;
      // assignment operators
      case '#=':
        result = StrictModeWrapper['#='](thisArg, args[0], args[1]);
        break;
      case '#+=':
        result = StrictModeWrapper['#+='](thisArg, args[0], args[1]);
        break;
      case '#-=':
        result = StrictModeWrapper['#-='](thisArg, args[0], args[1]);
        break;
      case '#*=':
        result = StrictModeWrapper['#*='](thisArg, args[0], args[1]);
        break;
      case '#/=':
        result = StrictModeWrapper['#/='](thisArg, args[0], args[1]);
        break;
      case '#%=':
        result = StrictModeWrapper['#%='](thisArg, args[0], args[1]);
        break;
      case '#**=':
        result = StrictModeWrapper['#**='](thisArg, args[0], args[1]);
        break;
      case '#<<=':
        result = StrictModeWrapper['#<<='](thisArg, args[0], args[1]);
        break;
      case '#>>=':
        result = StrictModeWrapper['#>>='](thisArg, args[0], args[1]);
        break;
      case '#>>>=':
        result = StrictModeWrapper['#>>>='](thisArg, args[0], args[1]);
        break;
      case '#&=':
        result = StrictModeWrapper['#&='](thisArg, args[0], args[1]);
        break;
      case '#^=':
        result = StrictModeWrapper['#^='](thisArg, args[0], args[1]);
        break;
      case '#|=':
        result = StrictModeWrapper['#|='](thisArg, args[0], args[1]);
        break;
      // LHS property access
      case '#.=':
        result = StrictModeWrapper['#.='](thisArg, args[0]);
        break;
      // getter for super
      case 's.':
      case 's[]':
        result = args[1](args[0]);
        break;
      // super method call
      case 's()':
        result = args[2](args[0]).apply(thisArg, args1);
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
      // getter in 'with' statement body
      case 'w.':
      case 'w[]':
        result = args[1]();
        break;
      // function call in 'with' statement body
      case 'w()':
        result = args[2](...args[1]);
        break;
      // constructor call in 'with' statement body
      case 'wnew':
        result = args[2](...args[1]);
        break;
      // unary operators in 'with' statement body
      case 'w++':
      case '++w':
      case 'w--':
      case '--w':
        result = args[1]();
        break;
      // unary operators in 'with' statement body
      case 'wtypeof':
      case 'wdelete':
        result = args[1]();
        break;
      // LHS value in 'with' statement body (__hook__('w.=', __with__, ['p', { set ['='](v) { p = v } } ], 'context', false)['='])
      case 'w.=':
        result = args[1];
        break;
      // assignment operators in 'with' statement body
      case 'w=':
      case 'w+=':
      case 'w-=':
      case 'w*=':
      case 'w/=':
      case 'w%=':
      case 'w**=':
      case 'w<<=':
      case 'w>>=':
      case 'w>>>=':
      case 'w&=':
      case 'w^=':
      case 'w|=':
        result = args[2](args[1]);
        break;
      // default (invalid operator)
      default:
        f(); // throw TypeError: f is not a function
        result = null;
        break;
      }
    }
    return result;
  }

  const hookCallbacks = {
    __hook__,    // full features (acl + contextStack + graph)
    __hook__acl, // acl only (acl + contextStack)
    __hook__min, // minimal (no acl)
  };

  Object.defineProperty(_global, '__hook__', { configurable: false, enumerable: false, writable: false, value: hookCallbacks.__hook__ });
  _globalObjects.set(_global.__hook__, '__hook__');

  hook.hookCallbackCompatibilityTest();
  hookCallbackCompatibilityTestDone = true;

  function hookBenchmark(h = __hook__, r = 10000000) {
    if (typeof h === 'string') {
      switch (h) {
      case '__hook__min':
        h = __hook__min;
        break;
      case '__hook__acl':
        h = __hook__acl;
        break;
      default:
        h = __hook__;
        break;
      }
    }
    let f = function(a) { return a; }
    let o = {a:1,f:f};
    let results = [];
    let start = Date.now();
    for (let i = 0; i < r; i++) {
      h('.', o, ['a'], 'context');
    }
    let end = Date.now();
    results.push(['.', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h('=', o, ['a',i], 'context');
    }
    end = Date.now();
    results.push(['=', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h('()', o, ['f', [i]], 'context');
    }
    end = Date.now();
    results.push(['()', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h(f, null, [i], 'context');
    }
    end = Date.now();
    results.push(['f', end - start]);
    navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, 'Chrome $1')
    console.log(navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, 'Chrome $1') + ' ' + results.map((result) => result[0] + ' in ' + result[1] + 'ms (' + (new Intl.NumberFormat()).format(parseInt(1000 * r / result[1])) +' op/s)').join(', ') + ' with ' + h.name + '\n' +
    navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, '| $1 ') + '| 0.0.* | ' + results.map((result) => (new Intl.NumberFormat()).format(parseInt(1000 * r / result[1]))).join(' | ') + ' |');
  }

  // Moved from hook-native-api.js
  const enableDebugging = false;
  const onUnexpectedAccessToGlobalObject = function onUnexpectedAccessToGlobalObject(op, name, value, oldValue) {
    switch (op) {
    case 'get':
      console.error('onUnexpectedAccessToGlobalObject: get name:' + name);
      setTimeout(() => {
        location = 'about:blank';
      }, 100);
      return undefined;
    case 'set':
      console.error('onUnexpectedAccessToGlobalObject: set name:' + name);
      setTimeout(() => {
        location = 'about:blank';
      }, 100);
      return undefined;
    default:
      setTimeout(() => {
        location = 'about:blank';
      }, 100);
      throw new Error('onUnexpectedAccessToGlobalObject');
      break;
    }
  };
  [
    //'Function',
    'eval',
    'setTimeout',
    'setInterval',
    'Node',
    'Element',
    'HTMLScriptElement',
    'HTMLIFrameElement',
    'HTMLObjectElement',
    'HTMLEmbedElement',
    'HTMLAnchorElement',
    'HTMLAreaElement',
    'Document',
    'importScripts',
  ].forEach((name) => {
    if (_global[name]) {
      let hooked = hook[name](Symbol.for('__hook__'), [[name, { random: name === 'Node' }]], 'method');
      /*_global.*/_globalObjects.set(hooked, name);
      /*_global.*/_globalMethods.set(hooked, [ (typeof window === 'object' ? 'window' : 'self'), name ]);
      Object.defineProperty(_global, name, { value: hooked, configurable: true, enumerable: false, writable: false });
      //hook.hook(hooked);
    }
  });
  //hook.global(__hook__, 'hook-native-api.js', 'Function', 'set')._pp_Function = hook.global(__hook__, 'hook-native-api.js', 'Function', 'get')._pp_Function;
  const whitelist = new Set();
  const origin = location.origin;
  const noHookAuthorization = hook.parameters.noHookAuthorizationParameter;
  [
  ].forEach(url => whitelist.add(url));
  const wildcardWhitelist = [
    new RegExp('^at (.* [(])?' + origin + '/components/'), // trust the site contents including other components
    new RegExp('^at ([^(]* [(])?' + 'https://cdnjs.cloudflare.com/ajax/libs/vis/4[.]18[.]1/vis[.]min[.]js'),
    new RegExp('^at ([^(]* [(])?' + 'https://www.gstatic.com/charts/loader[.]js'),
  ];
  const excludes = new Set();
  [
    'window.Math', // for vis.min.js to work in decent speed
  ].forEach(name => excludes.add(name));
  if (typeof window === 'object') {
    const _Object = Object;
    const _Array = Array;
    const _window = window;
    const _Error = Error;
    const _EventTarget = EventTarget;
    const _Math = Math;
    const _console = console;
    const _undefined = undefined;
    const isWhitelisted = function isWhitelisted(top, bottom) {
      if (whitelist.has(bottom) || whitelist.has(top)) {
        return true;
      }
      for (let i = 0; i < wildcardWhitelist.length; i++) {
        if (top.match(wildcardWhitelist[i])) {
          whitelist.add(top); // cache whitelist result
          return true;
        }
        else if (bottom.match(wildcardWhitelist[i])) {
          whitelist.add(bottom); // cache whitelist result
          return true;
        }
      }
      return false;
    };
    _window[Symbol.for('wrapGlobalProperty')] = wrapGlobalProperty = function ([object, properties, objectName, moveto]) {
      let names;
      if (properties === '*') {
        names = _Object.getOwnPropertyNames(object);
      }
      else if (_Array.isArray(properties)) {
        names = properties;
      }
      else if (typeof properties === 'string') {
        names = [properties];
      }
      names.forEach(name => {
        if (excludes.has(objectName + '.' + name)) {
          return;
        }
        let desc = _Object.getOwnPropertyDescriptor(object, name);
        if (moveto || desc.configurable) {
          if (typeof desc.get === 'function') {
            _Object.defineProperty(moveto || object, name, {
              configurable: desc.configurable,
              enumerable: desc.enumerable,
              get: function get() {
                  if (contextStack.isEmpty()) {
                    _Error.stackTraceLimit = Infinity;
                    let error = new _Error();
                    let stackTrace = error.stack.split(/\n/);
                    let top = stackTrace[2].trim();
                    let bottom = stackTrace.pop().trim();
                    if (!isWhitelisted(top, bottom)) {
                      _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                      if (!enableDebugging) {
                        return onUnexpectedAccessToGlobalObject('get', objectName + '.' + name, desc.get.call(this));
                      }
                    }
                    else {
                      //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                    }
                  }
                  return desc.get.call(this);
                },
              set: typeof desc.set === 'function'
                ? function set(value) {
                    if (contextStack.isEmpty()) {
                      _Error.stackTraceLimit = Infinity;
                      let error = new _Error();
                      let stackTrace = error.stack.split(/\n/);
                      let top = stackTrace[2].trim();
                      let bottom = stackTrace.pop().trim();
                      if (!isWhitelisted(top, bottom)) {
                        _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                        if (!enableDebugging) {
                          return onUnexpectedAccessToGlobalObject('set', objectName + '.' + name, value, desc.get.call(this));
                        }
                      }
                      else {
                        //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                      }
                    }
                    desc.set.call(this, value);
                  }
                : _undefined,
            });
          }
          else {
            // desc.value
            let hiddenValue = desc.value;
            if (!moveto && objectName.endsWith('.prototype')) {
              _Object.defineProperty(object, name, {
                configurable: desc.configurable,
                enumerable: desc.enumerable,
                get: function get() {
                    let result = hiddenValue;
                    if (contextStack.isEmpty()) {
                      _Error.stackTraceLimit = Infinity;
                      let error = new _Error();
                      let stackTrace = error.stack.split(/\n/);
                      let top = stackTrace[2].trim();
                      let bottom = stackTrace.pop().trim();
                      if (!isWhitelisted(top, bottom)) {
                        _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                        if (!enableDebugging) {
                          return onUnexpectedAccessToGlobalObject('get', objectName + '.' + name, hiddenValue, hiddenValue);
                        }
                      }
                      else {
                        //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                      }
                    }
                    return result;
                  },
                set: desc.writable
                  ? function set(value) {
                      if (contextStack.isEmpty()) {
                        _Error.stackTraceLimit = Infinity;
                        let error = new _Error();
                        let stackTrace = error.stack.split(/\n/);
                        let top = stackTrace[2].trim();
                        let bottom = stackTrace.pop().trim();
                        if (!isWhitelisted(top, bottom)) {
                          _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                          if (!enableDebugging) {
                            return onUnexpectedAccessToGlobalObject('set', objectName + '.' + name, value, hiddenValue);
                          }
                        }
                        else {
                          //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                        }
                      }
                      if (this === object) {
                        hiddenValue = value;
                      }
                      else {
                        _Object.defineProperty(this, name, {
                          configurable: true,
                          enumerable: true,
                          writable: true,
                          value: value,
                        });
                      }
                    }
                  : _undefined,
              });
            }
            else {
              _Object.defineProperty(moveto || object, name, {
                configurable: desc.configurable,
                enumerable: desc.enumerable,
                get: function get() {
                    let result = hiddenValue;
                    if (contextStack.isEmpty()) {
                      _Error.stackTraceLimit = Infinity;
                      let error = new _Error();
                      let stackTrace = error.stack.split(/\n/);
                      let top = stackTrace[2].trim();
                      let bottom = stackTrace.pop().trim();
                      if (!isWhitelisted(top, bottom)) {
                        _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                        if (!enableDebugging) {
                          return onUnexpectedAccessToGlobalObject('get', objectName + '.' + name, hiddenValue, hiddenValue);
                        }
                      }
                      else {
                        //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                      }
                    }
                    return result;
                  },
                set: desc.writable
                  ? function set(value) {
                      if (contextStack.isEmpty()) {
                        _Error.stackTraceLimit = Infinity;
                        let error = new _Error();
                        let stackTrace = error.stack.split(/\n/);
                        let top = stackTrace[2].trim();
                        let bottom = stackTrace.pop().trim();
                        if (!isWhitelisted(top, bottom)) {
                          _console.error('access to ' + objectName + '.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                          if (!enableDebugging) {
                            return onUnexpectedAccessToGlobalObject('set', objectName + '.' + name, value, hiddenValue);
                          }
                        }
                        else {
                          //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                        }
                      }
                      hiddenValue = value;
                    }
                  : _undefined,
              });
            }
          }
        }
        else {
          // object.name is not configurable
        }
      });
    };
    [
      [ _window, '*', 'window' ],
      [ _Object.prototype, 'constructor', 'Object.prototype' ],
      [ _Object.prototype, [
                             'hasOwnProperty',
                             'isPrototypeOf',
                             'propertyIsEnumerable',
                             'toLocaleString',
                             'toString',
                             'valueOf',
                             '__defineGetter__',
                             '__defineSetter__',
                             '__lookupGetter__',
                             '__lookupSetter__',
                             '__proto__',
                           ],             'window',          _window ],
      [ _Object.prototype, [
                             'hasOwnProperty',
                             'isPrototypeOf',
                             'propertyIsEnumerable',
                             'toLocaleString',
                             'toString',
                             'valueOf',
                             '__defineGetter__',
                             '__defineSetter__',
                             '__lookupGetter__',
                             '__lookupSetter__',
                             '__proto__',
                           ],             'Math',            _Math ],
      [ _Object.prototype, [
                             '__defineGetter__',
                             '__defineSetter__',
                             '__lookupGetter__',
                             '__lookupSetter__',
                           ],             'Object.prototype' ],
      [ Symbol.prototype, 'constructor', 'Symbol.prototype' ],
      [ _EventTarget.prototype, 
                           [
                             'addEventListener',
                             'removeEventListener',
                             'dispatchEvent',
                           ],             'window',          _window ],
      [ hook.utils, '*', 'hook.utils' ],
    ].forEach(wrapGlobalProperty);
  }
}