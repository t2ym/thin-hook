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
    '#delete': '=',
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
    'wdelete': '=',
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
    '/components/thin-hook/demo/Function.js,strictMode': '@normalization_checker',
    '/components/thin-hook/demo/Function.js,f3': '@Function_reader',
    '/components/thin-hook/demo/Function.js,strictMode,f3': '@Function_reader',
    '/components/thin-hook/demo/normalize.js,ArraySubclass2,constructor': '@super_normalization_checker',
    '/components/thin-hook/demo/normalize.js,ArraySubclass4,constructor': '@super_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,boundF': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,b': '@bind_normalization_checker',
    '/components/thin-hook/demo/normalize.js,bindCheck,B,static now': '@bind_normalization_checker',
    '/components/dexie/dist/dexie.min.js,r': '@custom_error_constructor_creator',
    '/components/firebase/firebase-app.js': '@firebase_app',
    '/components/firebase/firebase-auth.js,t': '@custom_error_constructor_creator',
    '/components/polymer/lib/utils/templatize.html,script@695,upgradeTemplate': '@template_element_prototype_setter',
    '/components/thin-hook/demo/my-view2.html,script@2491,getData': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2491,attached,_lastEdges': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2491,drawGraph': '@hook_visualizer',
    '/components/thin-hook/demo/my-view2.html,script@2491,descriptors': '@window_enumerator',
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
    '/components/firebase/firebase-messaging.js': '@firebase_messaging',
    '/components/firebase/firebase-messaging.js,*': '@firebase_messaging',
    '/components/firebase/firebase-messaging.js,24,k,e': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-messaging.js,24,P,e': '@Object_setPrototypeOf_reader',
    '/components/firebase/firebase-storage.js': '@firebase_storage',
    '/components/firebase/firebase-storage.js,*': '@firebase_storage',
    '/components/polymerfire/firebase-common-behavior.html,script@437,__appNameChanged': '@polymerfire', // TODO: More contexts should be mapped to @polymerfire
    '/components/polymerfire/firebase-app.html,script@802,__computeApp': '@polymerfire',
    '/components/polymerfire/firebase-auth.html,script@2320,_providerFromName': '@polymerfire',
    '/components/polymer/lib/mixins/element-mixin.html,script@926,createPropertyFromConfig': '@Object_static_method_reader', // bug?
    '/components/polymer/lib/mixins/element-mixin.html,script@926,*': '@Polymer_element_mixin',
    '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,*': '@Polymer_legacy_element_mixin',
    '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,fire': '@Event_detail_writer',
    '/components/polymer/lib/mixins/property-effects.html,script@914,setupBindings': '@HTMLElement___dataHost_writer',
    '/components/polymer/lib/mixins/property-accessors.html,script@741': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,*': '@Polymer_property_accessors',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,props': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-accessors.html,script@741,proto': '@HTMLElement_prototype_reader',
    '/components/polymer/lib/mixins/property-effects.html,script@914,*': '@Polymer_property_effects',
    '/components/polymer/lib/legacy/polymer.dom.html,script@701': '@Event___domApi_writer',
    '/components/polymer/lib/legacy/polymer.dom.html,script@701,forwardMethods': '@DocumentFragment_querySelector_reader',
    '/components/polymer/lib/elements/dom-module.html,script@634': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-bind.html,script@777': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-repeat.html,script@816': '@Polymer_lib',
    '/components/polymer/lib/elements/dom-if.html,script@754': '@Polymer_lib',
    '/components/polymer/lib/elements/array-selector.html,script@699': '@Polymer_lib',
    '/components/polymer/lib/elements/custom-style.html,script@662': '@Polymer_lib',
    '/components/polymer/lib/legacy/class.html,script@581,*': '@Polymer_legacy_class',
    '/components/polymer/lib/legacy/polymer-fn.html,script@568': '@Polymer_lib',
    '/components/polymer/lib/utils/import-href.html,script@567,*': '@Polymer_lib',
    '/components/chai/chai.js,30': '@custom_error_constructor_creator',
    '/components/chai/chai.js,9,hasProtoSupport': '@Object__proto__reader',
    '/components/chai/chai.js,36,getType,type': '@Object_prototype_reader',
    '/components/chai/chai.js,24,type': '@Object_prototype_reader',
    '/components/dexie/dist/dexie.min.js,p': '@Object_static_method_user',
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
    '/components/webcomponentsjs/webcomponents-lite.js,rd': '@CustomEvent_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,I': '@HTMLElement_blur_writer',
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
    '/components/webcomponentsjs/webcomponents-lite.js,yb': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,hd,b': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,$c,b': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,cd': '@HTMLElement_insertAdjacentElement_writer',
    '/components/webcomponentsjs/webcomponents-lite.js,ua': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,xa': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,a': '@customElements_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,Q,b': '@customElement_localName_reader',
    '/components/webcomponentsjs/webcomponents-lite.js,h': '@customElement_localName_reader',
    '/components/thin-hook/demo/es6-module2.js,f2,module': '@Module_importer',
    '/components/thin-hook/demo/es6-module2.js': '@Module_importer',
    '/components/polymer/lib/utils/async.html,script@566,timeOut,run': '@setTimeout_reader',
    '/components/thin-hook/demo/,script@4861': '@document_writer',
    '/components/thin-hook/demo/,script@5056': '@document_writer',
    '/components/thin-hook/demo/sub-document.html,script@1157': '@document_writer',
    '/components/thin-hook/demo/commonjs2.js': '@path_join_prohibited',
    '/components/thin-hook/demo/commonjs2.js,tty': '@tty_prohibited',
    '/components/live-localizer/live-localizer-lazy.html,*': '@live-localizer-lazy',
    '/components/iron-location/iron-location.html,*': '@iron-location',
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
    r: 0, w: 1, x: 2
  };
  const isGlobalScopeObject = new Map();
  [ 'window', 'self' ].forEach(g => {
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
      if (_globalObjects.has(_class)) {
        return false;
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
        if (opType === 'w') {
          ///console.log('windowAcl:', aclArgs, normalizedArgs);
          if (Array.isArray(aclArgs[3])) {
            switch (normalizedArgs[0]) {
            case 'assign':
              for (let newName in normalizedArgs[1][1]) {
                let value = normalizedArgs[1][1][newName];
                let currentName = _globalObjects.get(value);
                if (currentName) {
                  if (currentName !== newName) {
                    if (Reflect.has(acl, currentName)) {
                      //console.error('windowAcl: cloning access-controlled window.' + currentName + ' to window.' + newName);
                      return false;
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
                if (currentName) {
                  if (currentName !== newName) {
                    if (Reflect.has(acl, currentName)) {
                      //console.error('windowAcl: cloning access-controlled window.' + currentName + ' to window.' + newName);
                      return false;
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
            if (currentName) {
              if (currentName !== newName) {
                if (Reflect.has(acl, currentName)) {
                  //console.error('windowAcl: cloning access-controlled window.' + currentName + ' to window.' + newName);
                  return false;
                }
              }
            }
          }
        }
        return 'rwx'[opTypeMap[opType]] === opType; // equivalent to 'rwx' acl
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
    // blacklist properties
    window: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: Policy.avoidGlobalClone(),
      [S_ALL]: '---',
      '@window_enumerator': 'r--',
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
      }
    },
    import: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@Module_importer': '--x',
      },
      [S_DEFAULT]: '---',
      invalidImportUrl: '---',
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
      [S_OBJECT]: {
        [S_DEFAULT]: 'r--',
        '@location_setter': 'rw-',
      },
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
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@worker_manipulator': 'r-x',
      },
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
          '@HTMLElement_blur_writer': 'rwx',
        },
        removeEventListener: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        appendChild: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        removeChild: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        replaceChild: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        insertBefore: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        cloneNode: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        getRootNode: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        isConnected: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        dispatchEvent: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        parentElement: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        parentNode: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        nextSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        previousSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        childNodes: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        firstChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        lastChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        textContent: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        baseURI: {
          [S_DEFAULT]: 'r--',
          '@Object_assign_reader': 'rw-',
        },
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          [S_DEFAULT]: 'r-x',
          [S_ALL]: '---',
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
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        setAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        getAttribute: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        getAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        removeAttribute: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        removeAttributeNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        attachShadow: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        insertAdjacentElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        before: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        after: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        slot: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        assignedSlot: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        querySelector: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        querySelectorAll: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        assignedNodes: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        shadowRoot: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        className: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        nextElementSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        previousElementSibling: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        innerHTML: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        replaceWith: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        remove: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
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
                let stream = new hook.utils.HTMLParser.WritableStream({
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
        textContent: 'rw-',
        blur: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        __shady: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement___shady_writer': 'rwx',
          '@Object_assign_reader': 'rwx',
        },
        insertAdjacentElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
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
      },
    },
    Function: {
      [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE], // Function is an instance of Function itself
      [S_OBJECT]: {
        [S_DEFAULT]: '--x',
        '@Function_reader': 'r-x',
        '@normalization_checker': 'r-x',
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
                    return applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', hookArgs[3], _global[obj], [rawProp, normalizedArgs[1]], hookArgs);
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
            '@Event_composed_writer': 'rwx',
          },
          composedPath: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwx',
          },
          target: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwx',
          },
          relatedTarget: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwx',
          },
          stopPropagation: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwx',
          },
          stopImmediatePropagation: {
            [S_DEFAULT]: 'r-x',
            '@Event_composed_writer': 'rwx',
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
          '@Event_composed_writer': 'rw-',
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
          '@HTMLElement_blur_writer': 'rwx',
          '@DocumentFragment_querySelector_reader': 'r-x',
        },
        querySelectorAll: {
          [S_DEFAULT]: '--x',
          '@HTMLElement_blur_writer': 'rwx',
          '@DocumentFragment_querySelectorAll_reader': 'r-x',
          '@DocumentFragment_querySelector_reader': 'r-x',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
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
      [S_DEFAULT]: '--x',
      '@setTimeout_reader': 'r-x',
    },
    Document: {
      [S_CHAIN]: () => acl.Node,
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        createElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        createElementNS: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        importNode: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        getElementById: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        querySelector: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        querySelectorAll: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
        },
        childElementCount: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        firstElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        lastElementChild: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        children: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        activeElement: {
          [S_DEFAULT]: 'r-x',
          '@Node_prototype_writer': 'rwx',
        },
        append: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        prepend: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_insertAdjacentElement_writer': 'rwx',
        },
        _activeElement: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement_blur_writer': 'rwx',
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
        '@web_animations_next_lite': 'rwx',
      },
      createElement: {
        [S_DEFAULT]: function createElementAcl(normalizedThisArg,
                                               normalizedArgs /* ['property', args], ['property', value], etc. */,
                                               aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                               hookArgs /* [f, thisArg, args, context, newTarget] */,
                                               applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let result = '--x'[opTypeMap[opType]] === opType;
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
        '@document_createElement_reader': 'r--',
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
      },
      [S_DEFAULT]: '---',
      define: {
        [S_DEFAULT]: '---',
        '@Object_assign_reader': 'rwx',
        '@Polymer_lib': function customElementsDefineAcl(normalizedThisArg,
                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                         applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let args = normalizedArgs[1];
          if (opType === 'x') {
            let name = args[0];
            let baseClass = args[1];
            //console.log('customElementsDefineAcl context = ' + hookArgs[3] + ' element name = ' + name);
            return Policy.trackClass(name, baseClass); // synchronous just before definition
            // customElements.whenDefined(name).then(() => { Policy.trackClass(name, baseClass); }); // asynchronous just after definition - Is this reliable for tracking all the accesses?
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
        '@Object_assign_reader': 'r--',
        '@Event___domApi_writer': 'r--',
      },
    },
    // Example base policy for custom elements generated via the Polymer({}) legacy method
    'Polymer.LegacyElement': { // virtual name
      [S_CHAIN]: () => acl.HTMLElement, // TODO: should be Polymer.Element virtual object
      [S_OBJECT]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
      },
      '@Polymer_element_mixin': 'rwx',
      [S_PROTOTYPE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: '---',
        $__proto__$: {
          [S_DEFAULT]: '---',
          '@Polymer_element_mixin': 'rw-',
        },
        '@Polymer_element_mixin': 'rwx',
        '@Polymer_legacy_element_mixin': 'rwx',
        '@Polymer_property_effects': 'rwx',
        [S_INSTANCE]: {
          [S_CHAIN]: S_CHAIN,
          // TODO: Loose ACL. Policies can be defined per property.
          '@Polymer_element_mixin': 'rwx',
          '@Polymer_legacy_element_mixin': 'rwx',
          '@Polymer_legacy_class': 'rwx',
          '@Polymer_property_effects': 'rwx',
          '@Polymer_property_accessors': 'rwx',
          '@Event___domApi_writer': 'rwx',
          '@DocumentFragment_querySelector_reader': 'r--',
          '@customElement_localName_reader': 'r--',
          '@Object_assign_reader': 'rwx',
          '@Polymer_lib': 'rwx',
        },
      },
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
          [S_DEFAULT]: function liveLocalizerAcl(normalizedThisArg,
                                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                 aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                 applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            console.log('liveLocalizerAcl context = ' + hookArgs[3].toString() + ' ' + aclArgs[0].toString() + '.' + aclArgs[3].toString() + ' opType = ' + opType);
            // TODO: ACL can be automatically generated here
            return '---'[opTypeMap[opType]] === opType; // equivalent to '---' acl
          },
          '@live-localizer-lazy': 'rwx',
          tagName: {
            [S_DEFAULT]: '---',
            '@iron-location': 'r--',
          },
        },
      },
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
    UniterableArray: {
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
    },
    // 3rd party API
    firebase: {
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@polymerfire': 'r--',
        '@firebase_app': 'rw-',
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
                return applyAcl(obj, name[1] !== 'prototype', false, prop, 'x', hookArgs[3], _global[obj], [rawProp, normalizedArgs[1]], hookArgs);
              }
            }
          }
        }
        return true; // equivalent to 'rwx' acl
      },
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
    'showContextStackLog',
    'hookBenchmark',
  ].forEach(n => {
    Object.assign(acl, { [n]: '---' });
    Object.assign(acl.window, { [n]: '---' });
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
      if (typeof property === 'undefined' || property === '') {
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
                        ? Reflect.has(acl[property], S_OBJECT)
                          ? acl[property][S_OBJECT]
                          : acl[property]
                        : acl[S_GLOBAL]
                      : _acl[context]
                    : _acl[context]
                  : isGlobal
                    ? Reflect.has(acl, property)
                      ? Reflect.has(acl[property], S_OBJECT)
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
  const errorReportBaseUrl = (new URL('errorReport.json', location)).pathname;
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
      data['name'] =  typeof aclArgs[0] === 'string' ? aclArgs[0] : 'typeof:' + typeof aclArgs[0];
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
  const FunctionPrototype = Function.prototype;
  // full features
  const __hook__ = function __hook__(f, thisArg, args, context, newTarget) {
    let _lastContext;
    let _f;
    let normalizedThisArg = thisArg;
    let _args = args;
    let boundParameters;
    counter++;
    if (args[0] === pseudoContextArgument) {
      return context;
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
              if (normalizedThisArg.hasOwnProperty('constructor')) {
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
              if (normalizedThisArg.hasOwnProperty('constructor')) {
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
        let globalAssignments = {};
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
                  name = _globalObjectsGet(_global); // non-strict mode default this
                  if (!name) {
                    break;
                  }
                }
                else {
                  name = _globalObjectsGet(_t);
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
        if (!isObject) {
          if (name === 'Function') {
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
          throw new Error('Permission Denied: Cannot access ' + name);
        }
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
        if (name) {
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
        else if (newTarget === '') {
          let obj = Object.getPrototypeOf(args[0]);
          name = _globalObjectsGet(obj);
          if (!name) {
            while (!name) {
              obj = Object.getPrototypeOf(obj);
              if (typeof obj === 'function') {
                name = _globalObjectsGet(obj);
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
              throw new Error('Permission Denied: Cannot access ' + name);
            }
            let _blacklist = _blacklistObjects[name];
            if (_blacklist) {
              if (typeof _blacklist === 'boolean') {
                throw new Error('Permission Denied: Cannot access ' + name);
              }
            }
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
              let _blacklist = _blacklistObjects[name];
              if (_blacklist) {
                if (typeof _blacklist === 'boolean') {
                  throw new Error('Permission Denied: Cannot access ' + name);
                }
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
              let _blacklist = _blacklistObjects[name];
              if (_blacklist) {
                if (typeof _blacklist === 'boolean') {
                  throw new Error('Permission Denied: Cannot access ' + name);
                }
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
        args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
        break;
      case GeneratorFunction:
        args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, true);
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
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              default:
                if (args[1][0].prototype instanceof Function) {
                  args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype instanceof GeneratorFunction)];
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
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2])];
                break;
              case GeneratorFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], true)];
                break;
              default:
                if (args[1][0].prototype instanceof Function) {
                  args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], args[1][0].prototype instanceof GeneratorFunction)];
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
            args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1))];
            break;
          default:
            break;
          }
          break;
        case GeneratorFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], true)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1), true)];
            break;
          default:
            break;
          }
          break;
        default:
          if (thisArg instanceof GeneratorFunction && args[0] === 'constructor') {
            args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
          }
          else if (thisArg instanceof Function && args[0] === 'constructor') {
            args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
          }
          break;
        }
        break;
      case 's()':
        switch (args[2](args[0])) {
        case Function:
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
          break;
        case GeneratorFunction:
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
          break;
        default:
          break;
        }
        break;
      case 'bind':
        switch (thisArg) {
        case Function:
          thisArg = hook.Function('__hook__', [[context, {}]], 'method');
          break;
        case GeneratorFunction:
          thisArg = hook.Function('__hook__', [[context, {}]], 'method', true);
          break;
        default:
          break;
        }
        break;
      default:
        if (typeof f === 'function') {
          if (f.prototype instanceof Function && newTarget) {
            args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype instanceof GeneratorFunction);
          }
          else if (newTarget === '') {
            if (args[0] && Object.getPrototypeOf(args[0]) === Function) {
              args = [ args[0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args.slice(1)) ];
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

  // Issue #155 [demo][hook-callback][Chrome Canary 63.0.3239.0] Map.get() is very slow
  // Note: Expecting JIT compiler to expand this function inline
  const _globalObjectsGet = typeof window === 'object'
    ? function _globalObjectsGet(o) {
        switch (o) {
        case undefined: return undefined;
        case Object: return 'Object';
        case Array: return 'Array';
        case Function: return 'Function';
        case Math: return 'Math';
        case window: return 'window';
        case RegExp: return 'RegExp';
        default:
          return _globalObjects.get(o);
        }
      }
    : function _globalObjectsGet(o) {
        switch (o) {
        case undefined: return undefined;
        case Object: return 'Object';
        case Array: return 'Array';
        case Function: return 'Function';
        case Math: return 'Math';
        case RegExp: return 'RegExp';
        default:
          return _globalObjects.get(o);
        }
      };

  // acl only
  const __hook__acl = function __hook__acl(f, thisArg, args, context, newTarget) {
    let _lastContext;
    let _f;
    let normalizedThisArg = thisArg;
    let _args = args;
    let boundParameters;
    counter++;
    _lastContext = lastContext;
    lastContext = context;
    contextStack.push(context);

    let result;
    try {
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
        let name = _globalObjectsGet(normalizedThisArg);
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
              if (normalizedThisArg.hasOwnProperty('constructor')) {
                isObject = false;
              }
            }
          }
          name = _globalObjectsGet(ctor);
          while (!name && typeof ctor === 'function') {
            ctor = Object.getPrototypeOf(ctor);
            name = _globalObjectsGet(ctor);
          }
        }
        if (!name && normalizedThisArg instanceof Object) {
          ctor = normalizedThisArg.constructor;
          name = _globalObjectsGet(ctor);
          if (name) {
            isStatic = false;
            if (typeof ctor === 'function') {
              if (normalizedThisArg.hasOwnProperty('constructor')) {
                isObject = false;
              }
            }
          }
        }
        let rawProperty = _args[0];
        let property = _escapePlatformProperties.get(rawProperty) || rawProperty;
        let target = targetNormalizerMapObject.get(_f);
        let opType;
        let hasGlobalAssignments = false;
        let globalAssignments = {};
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
                  name = _globalObjectsGet(_global); // non-strict mode default this
                  if (!name) {
                    break;
                  }
                }
                else {
                  name = _globalObjectsGet(_t);
                }
                isStatic = typeof _t === 'function';
                normalizedThisArg = _t;
                isObject = typeof normalizedThisArg === 'object';
                if (!name) {
                  ctor = _t.constructor;
                  name = _globalObjectsGet(ctor);
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
                  name = _globalObjectsGet(ctor);
                  normalizedThisArg = ctor;
                  while (!name && typeof ctor === 'function') {
                    ctor = Object.getPrototypeOf(ctor);
                    name = _globalObjectsGet(ctor);
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
                      let _globalObj = _globalObjectsGet(_p);
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
          switch (name) {
          case 'window':
          case 'self':
            if (target === 'wtpv') { // window.property = v
              if (_f === '=' && _args[1] instanceof Object) {
                hasGlobalAssignments = true;
                globalAssignments[rawProperty] = _args[1];
              }
            }
            break;
          default:
            break;
          }
        }
        if (!isObject) {
          if (name === 'Function') {
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
          throw new Error('Permission Denied: Cannot access ' + name);
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
        let name = _globalObjectsGet(f);
        let superClass = f;
        while (!name && typeof superClass === 'function') {
          superClass = Object.getPrototypeOf(superClass);
          name = _globalObjects.get(superClass);
        }
        if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
          result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
          throw new Error('Permission Denied: Cannot access ' + name);
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
          name = _globalObjectsGet(obj);
          if (!name) {
            while (!name) {
              obj = Object.getPrototypeOf(obj);
              if (typeof obj === 'function') {
                name = _globalObjectsGet(obj);
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
              throw new Error('Permission Denied: Cannot access ' + name);
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
        args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
        break;
      case GeneratorFunction:
        args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, true);
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
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
                break;
              default:
                if (args[1][0].prototype instanceof Function) {
                  args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype instanceof GeneratorFunction)];
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
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2])];
                break;
              case GeneratorFunction:
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], true)];
                break;
              default:
                if (args[1][0].prototype instanceof Function) {
                  args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], args[1][0].prototype instanceof GeneratorFunction)];
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
            args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1))];
            break;
          default:
            break;
          }
          break;
        case GeneratorFunction:
          switch (args[0]) {
          case 'apply':
            args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], true)];
            break;
          case 'call':
            args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1), true)];
            break;
          default:
            break;
          }
          break;
        default:
          if (thisArg instanceof GeneratorFunction && args[0] === 'constructor') {
            args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
          }
          else if (thisArg instanceof Function && args[0] === 'constructor') {
            args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
          }
          break;
        }
        break;
      case 's()':
        switch (args[2](args[0])) {
        case Function:
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
          break;
        case GeneratorFunction:
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
          break;
        default:
          break;
        }
        break;
      case 'bind':
        switch (thisArg) {
        case Function:
          thisArg = hook.Function('__hook__', [[context, {}]], 'method');
          break;
        case GeneratorFunction:
          thisArg = hook.Function('__hook__', [[context, {}]], 'method', true);
          break;
        default:
          break;
        }
        break;
      default:
        if (typeof f === 'function') {
          if (f.prototype instanceof Function && newTarget) {
            args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype instanceof GeneratorFunction);
          }
          else if (newTarget === '') {
            if (args[0] && Object.getPrototypeOf(args[0]) === Function) {
              args = [ args[0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args.slice(1)) ];
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
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
      break;
    case GeneratorFunction:
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, true);
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
              args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype instanceof GeneratorFunction)];
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
              args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2])];
              break;
            case GeneratorFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], true)];
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], args[1][0].prototype instanceof GeneratorFunction)];
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
          args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1))];
          break;
        default:
          break;
        }
        break;
      case GeneratorFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], true)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1), true)];
          break;
        default:
          break;
        }
        break;
      default:
        if (thisArg instanceof GeneratorFunction && args[0] === 'constructor') {
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
        }
        else if (thisArg instanceof Function && args[0] === 'constructor') {
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
        }
        break;
      }
      break;
    case 's()':
      switch (args[2](args[0])) {
      case Function:
        args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
        break;
      case GeneratorFunction:
        args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
        break;
      default:
        break;
      }
      break;
    case 'bind':
      switch (thisArg) {
      case Function:
        thisArg = hook.Function('__hook__', [[context, {}]], 'method');
        break;
      case GeneratorFunction:
        thisArg = hook.Function('__hook__', [[context, {}]], 'method', true);
        break;
      default:
        break;
      }
      break;
    default:
      if (typeof f === 'function') {
        if (f.prototype instanceof Function && newTarget) {
          args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype instanceof GeneratorFunction);
        }
        else if (newTarget === '') {
          if (args[0] && Object.getPrototypeOf(args[0]) === Function) {
            args = [ args[0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args.slice(1)) ];
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
}