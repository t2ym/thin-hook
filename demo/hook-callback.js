/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  var callTree = [['Phrases']];
  // { id: label: group: }
  var data = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  var data2 = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
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
  var _global = typeof window === 'object' ? window : self;
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
  var _globalObjects = Object.keys(_globalPropertyDescriptors)
    .sort()
    .reduce((acc, curr) => {
      const globalObjectNames = ['top', 'global', 'self', 'window'];
      if (_globalPropertyDescriptors[curr].value && typeof _globalPropertyDescriptors[curr].value !== 'number') {
        let existing = acc.get(_globalPropertyDescriptors[curr].value);
        if (globalObjectNames.indexOf(curr) >= 0) {
          if (globalObjectNames.indexOf(existing) < globalObjectNames.indexOf(curr)) {
            acc.set(_globalPropertyDescriptors[curr].value, curr);
          }
        }
        else if (!existing || (existing.length > curr.length)) {
          acc.set(_globalPropertyDescriptors[curr].value, curr);
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
  var globalObjectAccess = {};
  _global.__hook__ = function __hook__(f, thisArg, args, context, newTarget) {
    counter++;
    if (args[0] === pseudoContextArgument) {
      return context;
    }
    let _lastContext = lastContext;
    if (!contexts[context]) {
      let group = context.split(/[,:]/)[0];
      let node = { id: context, label: context, group: group };
      data.nodes.push(node);
    }
    contexts[context] = true;
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

    if (typeof f === 'string') {
      // property access
      let name = _globalObjects.get(thisArg);
      let isStatic = true;
      let ctor;
      if (!name) {
        ctor = thisArg.constructor;
        name = _globalObjects.get(ctor);
        if (name) {
          isStatic = false;
        }
      }
      if (name === 'Object') {
        if (isStatic) {
          if (!_objectStaticPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
        else {
          if (!_objectPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
      }
      else if (name === 'Array') {
        if (isStatic) {
          if (!_arrayStaticPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
        else {
          if (!_arrayPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
      }
      else if (name === 'String') {
        if (isStatic) {
          if (!_stringStaticPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
        else {
          if (!_stringPropertyDescriptors[args[0]]) {
            name = null;
          }
        }
      }
      if (name) {
        // thisArg is a global object or an instance of one
        let forName;
        let forProp;
        let id = isStatic ? name + '.' + args[0] : name + '.prototype.' + args[0];
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
        /*
        // skip property name for generating a simpler graph
        if (!forName[context]) {
          forName[context] = { from: context, to: name, label: 0, arrows: 'to' };
          data2.edges.push(forName[context]);
        }
        forName[context].label++;
        */
        if (!forName[args[0]]) {
          forName[args[0]] = {};
          data2.nodes.push({ id: id, label: args[0], group: name });
          data2.edges.push({ from: name, to: id, dashes: true, arrows: 'to' });
        }
        forProp = forName[args[0]];
        if (!forProp[context]) {
          forProp[context] = { from: context, to: id, label: 0, arrows: 'to' };
          data2.edges.push(forProp[context]);
        }
        forProp[context].label++;
      }
    }
    else if (newTarget) {
      let name = _globalObjects.get(f);
      let superClass = f;
      while (!name && typeof superClass === 'function') {
        superClass = Object.getPrototypeOf(superClass);
        name = _globalObjects.get(superClass);
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

    let result;
    if (typeof f === 'function') {
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
      // funcation call
      case '()':
        result = thisArg[args[0]].apply(thisArg, args[1]);
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
      // default (invalid operator)
      default:
        result = null;
        break;
      }
    }
    lastContext = _lastContext;
    // if (contextStack[contextStack.length - 1] !== context) { debugger; }
    contextStack.pop();
    return result;
  }

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