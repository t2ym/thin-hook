/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  var callTree = [['Phrases']];
  // { id: label: group: }
  var data = { nodes: [ { id: 'undefined', label: 'undefined', group: 'undefined' } ], edges: [] };
  var callTreeLastLength = callTree.length;
  var counter = 0;
  var calleeErrorCounter = 0;
  var log = [];
  var contexts = {};
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

    let result = newTarget ? Reflect.construct(f, args) : thisArg ? f.apply(thisArg, args) : f(...args);
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

      [ 'resolve', 'reject', 'all', 'race', 'prototype' ].forEach(prop => {
        _Promise[prop] = Promise[prop];
      });

      _Promise.prototype.then = function (...args) {
        return _global[hookName](_nativeMethods.Promise.proto.then, this, args, 'Promise,then');
      }

      _Promise.prototype.catch = function (...args) {
        return _global[hookName](_nativeMethods.Promise.proto.catch, this, args, 'Promise,catch');
      }
      return _Promise;                
    }

    _global.Promise = hookPromise('__hook__');

    EventTarget.prototype.addEventListener = function addEventListener(...args) {
      return _global.__hook__(_nativeMethods.EventTarget.proto.addEventListener, this, args, 'EventTarget,addEventListener');
    }
  }
}