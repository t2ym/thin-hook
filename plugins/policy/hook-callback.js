/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
if (hook.parameters[Symbol.for('hook-callback.js')]) {
  // skip reinstalling the plugin
}
else {
  const hook = self.hook;
  hook.parameters[self.Symbol.for('hook-callback.js')] = true;
  const Map = self.Map;
  const Set = self.Set;
  const Object = self.Object;
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  const Array = self.Array;
  const Symbol = self.Symbol;
  const JSON = self.JSON;
  const URL = self.URL;
  const Reflect = self.Reflect;
  const Function = self.Function;
  const FunctionPrototypeApply = Function.prototype.apply;
  const FunctionPrototypeCall = Function.prototype.call;
  const ReflectApply = Reflect.apply;
  const atob = self.atob;
  const createHash = hook.utils.createHash;
  const HTMLParser = hook.utils.HTMLParser;
  /* @include DistinctSet.js */

  /* @include SetMap.js */

/* @include GlobalMethodsWrapper.js */
  let wrapGlobalProperty; // = function (object, property, objectName); assigned at the bottom of this script
  /* @include Stack.js */
  // { id: label: group: }
  const data = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  const data2 = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  let counter = 0;
  let log = [];
  let contexts = {};
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
      emptyDocumentURL = (new URL('/* @echo emptyDocument */', location.href)).href
      otherWindowObjects = new Map();
      otherWindowObjects.set(Object, window);
    }
    else {
      emptyDocumentURL = window.top.emptyDocumentURL;
      otherWindowObjects = window.top.otherWindowObjects;
      otherWindowObjects.set(Object, window);
      otherWindowObjectsStatus = window.top.otherWindowObjectsStatus;
      otherWindowObjectsStatus.set = true;
    }
  }
  const _global = typeof window === 'object' ? window : self;
  Object.defineProperty(_global, '_global', { configurable: false, enumerable: false, writable: false, value: _global });
  _global._data = data;
  _global._data2 = data2;
  const _globalPropertyDescriptors = {};
  {
    let o = _global;
    let chain = [];
    while (o && o !== Object.prototype && o.constructor.name !== 'EventTarget') {
      chain.unshift(Object.getOwnPropertyDescriptors(o));
      o = Object.getPrototypeOf(o);
    }
    while (o = chain.shift()) {
      Object.assign(_globalPropertyDescriptors, o);
    }
    delete _globalPropertyDescriptors.constructor; // exclude constructor === Window
  }
  const contextNormalizer = Object.create(null);
  const acl = Object.create(null); // declared here for early reference
  const _globalObjects = new SetMap(acl);
  const _globalMethods = new GlobalMethodsWrapper(_globalObjects);
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
  Object.keys(_globalPropertyDescriptors)
    .sort()
    .reduce((acc, curr) => {
      const globalObjectNames = ['_global', 'frames', 'top', 'globalThis', 'content', 'self', 'window', 'parent'];
      //const globalProperties = { history: true, navigator: true, applicationCache: true, crypto: true, localStorage: true, indexedDB: true, caches: true, sessionStorage: true, document: true };
      if (_globalPropertyDescriptors[curr].value && typeof _globalPropertyDescriptors[curr].value !== 'number') {
        let existing = acc.get(_globalPropertyDescriptors[curr].value);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (curr === mainGlobalObjectName) {
            acc.set(_globalPropertyDescriptors[curr].value, curr);
          }
        }
        else {
          if (existing) {
            if (curr.startsWith('webkit') || curr.startsWith('WebKit')) {
              //console.log('_globalObjects.set: existing = ', [...existing], 'skipping = ', curr);
              return acc;
            }
            //console.log('_globalObjects.set: existing = ', [...existing], 'adding = ', curr);
          }
          acc.set(_globalPropertyDescriptors[curr].value, curr);
          let properties = Object.getOwnPropertyDescriptors(_globalPropertyDescriptors[curr].value);
          let prop;
          for (prop in properties) {
            if (typeof properties[prop].value === 'function') {
              _globalMethods.set(properties[prop].value, [curr, prop]);
            }
          }
          if (_globalPropertyDescriptors[curr].value.prototype && curr !== 'WorkerGlobalScope') { // skipping WorkerGlobalScope.prototype.*
            properties = Object.getOwnPropertyDescriptors(_globalPropertyDescriptors[curr].value.prototype);
            for (prop in properties) {
              if (prop === 'constructor') {
                continue; // skipping class.prototype.constructor === class
              }
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
            }
          }
        }
        else {
          if (!excludedGlobalProperties[curr]) {
            if (existing) {
              if (curr.startsWith('webkit') || curr.startsWith('WebKit')) {
                //console.log('_globalObjects.set: existing = ', [...existing], 'skipping = ', curr);
                return acc;
              }
              //console.log('_globalObjects.set: existing = ', [...existing], 'adding = ', curr);
            }
            acc.set(_global[curr], curr);
            let properties = Object.getOwnPropertyDescriptors(_global[curr]);
            let prop;
            for (prop in properties) {
              if (typeof properties[prop].value === 'function') {
                _globalMethods.set(properties[prop].value, [curr, prop]);
              }
            }
            if (_global[curr].prototype && curr !== 'WorkerGlobalScope') { // skipping WorkerGlobalScope.prototype.*
              properties = Object.getOwnPropertyDescriptors(_global[curr].prototype);
              for (prop in properties) {
                if (prop === 'constructor') {
                  continue; // skipping class.prototype.constructor === class
                }
                if (typeof properties[prop].value === 'function') {
                  _globalMethods.set(properties[prop].value, [curr, 'prototype', prop]);
                }
              }
            }
          }
        }
      }
      return acc;
    }, _globalObjects);
  const _objectStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Object);
  const _objectPropertyDescriptors = Object.getOwnPropertyDescriptors(Object.prototype);
  const _arrayStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Array);
  const _arrayPropertyDescriptors = Object.getOwnPropertyDescriptors(Array.prototype);
  const _stringStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(String);
  const _stringPropertyDescriptors = Object.getOwnPropertyDescriptors(String.prototype);
  const _functionStaticPropertyDescriptors = Object.getOwnPropertyDescriptors(Function);
  const _functionPropertyDescriptors = Object.getOwnPropertyDescriptors(Function.prototype);
  var globalObjectAccess = Object.create(null); // still global for normalize.js, etc.; __hook__acl does not use it
  const _boundFunctions = new WeakMap();
  const _escapePlatformProperties = new Map();
  const _unescapePlatformProperties = new Map();
  Object.getOwnPropertyNames(Object.prototype).concat(['prototype']).forEach(n => {
    _escapePlatformProperties.set(n, '$' + n + '$');
    _unescapePlatformProperties.set('$' + n + '$', n);
  });
  /* @include Symbols.js */
/* @include Policy.js */
  // TODO: Access control list is too hard to maintain. An easier, automated, and modular approach is preferable. 
  /* #include policy.js */
  const operatorNormalizer = Policy.operatorNormalizer;
  const targetNormalizer = Policy.targetNormalizer;
  const targetNormalizerMap = Policy.getTargetNormalizerMap(targetNormalizer);
  const targetNormalizerMapObject = Policy.getTargetNormalizerMapObject(operatorNormalizer, targetNormalizer);
  const isSuperOperator = Policy.getIsSuperOperator(operatorNormalizer);
  const tagToElementClass = Policy.tagToElementClass;
  Policy.resolveBareSpecifierContextNormalizer(contextNormalizer);
  const prefixedModuleContexts = Policy.getPrefixedModuleContexts(contextNormalizer);
  const prefixedContexts = Policy.getPrefixedContexts(contextNormalizer);
  const opTypeMap = Policy.opTypeMap;
  const isGlobalScopeObject = Policy.isGlobalScopeObject;
  { // Preprocess acl entries
    // protect hook-callback.js variables
    Policy.protectGlobalVariableAcl(acl, [
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
    ]);
    Policy.chainAcl(acl);
/* @ifdef unchainAcl */
    Policy.unchainAcl(acl);
/* @endif */
    Policy.proxyAcl(acl);
    Policy.resolveBareSpecifierAcl(acl);
    Policy.generatePrefixedModuleNames(acl);
    Policy.flattenAcl(acl);
  }
  const applyAcl = Policy.getApplyAcl(acl);
/* @include errorReport.js */
  /* @include StrictModeWrapper.js */
  const detectName = Policy.detectName;
  const GeneratorFunction = (function * () {}).constructor;
  const AsyncFunction = (async function () {}).constructor;
  const FunctionPrototype = Function.prototype;
/* @ifdef __hook__ */
/* @include __hook__.js */
/* @endif */
/* @ifdef __hook__acl */
/* @include __hook__acl.js */
/* @endif */
  function showContextStackLog() {
    let asyncCalls = Object.keys(contextStackLog).filter(c => c.match(/(setTimeout|setInterval|Promise)/g));
    console.log(asyncCalls);
  }

/* @ifdef __hook__min */
/* @include __hook__min.js */
/* @endif */
  const hookCallbacks = {
/* @ifdef __hook__ */
    __hook__,    // full features (acl + contextStack + graph)
/* @endif */
/* @ifdef __hook__acl */
    __hook__acl, // acl only (acl + contextStack)
/* @endif */
/* @ifdef __hook__min */
    __hook__min, // minimal (no acl)
/* @endif */
  };

  Object.defineProperty(_global, '__hook__', { configurable: false, enumerable: false, writable: false, value: hookCallbacks.__hook__/* @echo __hook__callback */ });
  _globalObjects.set(_global.__hook__, '__hook__');

  hook.hookCallbackCompatibilityTest();
  hookCallbackCompatibilityTestDone = true;

/* @ifdef hookBenchmark */
/* @include hookBenchmark.js */
/* @endif */
/* @include mutation-observer.js */
/* @include hook-native-api.js */
}