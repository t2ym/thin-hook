/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
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
      let trackResultAsGlobal = S_GLOBAL;
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
      switch (newTarget) {
      case null: // resolve module context
        let moduleContextSymbol, moduleContext;
        moduleContextSymbol = args[0];
        if (typeof moduleContextSymbol !== 'symbol') {
          let e = new Error('__hook__: invalid module context')
          onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
          throw e;
        }
        moduleContext = __hook__[moduleContextSymbol];
        if (!moduleContext) {
          let e = new Error('__hook__: invalid module context')
          onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
          throw e;
        }
        args[0] = moduleContext; // override the module symbol context in args[0] with its corresponding string module context for applyAcl
        _f = null;
        break;
      case false: // resolve the scope in 'with' statement body
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
        break;
      }
      boundParameters = _boundFunctions.get(f);
      if (!boundParameters) {
        switch (f) {
        case '()':
        case '#()':
        case 'w()':
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
        if (boundParameters) {
          normalizedThisArg = boundParameters._normalizedThisArg;
          _args = [ boundParameters._f, boundParameters._args.concat(_args) ];
        }
        let name = _globalObjects.get(normalizedThisArg);
        let isStatic = true;
        if (boundParameters) {
          isStatic = boundParameters.isStatic;
          name = boundParameters.name;
        }
        let ctor;
        let isObject = false;
        if (!name && isSuperOperator.get(_f)) {
          let _isStatic = isStatic;
          let _isObject = isObject;
          if (typeof normalizedThisArg === 'function') {
            ctor = normalizedThisArg;
          }
          else {
            _isStatic = false;
            ctor = normalizedThisArg.constructor;
            if (ctor) {
              _isObject = !_hasOwnProperty.call(normalizedThisArg, 'constructor');
            }
          }
          if (ctor) {
            name = _globalObjects.get(ctor);
            while (!name && typeof ctor === 'function') {
              ctor = Object.getPrototypeOf(ctor);
              name = _globalObjects.get(ctor);
            }
            if (name) {
              isStatic = _isStatic;
              isObject = _isObject;
            }
          }
        }
        if (!name && normalizedThisArg instanceof Object) {
          [name, isStatic, isObject] = detectName(normalizedThisArg, boundParameters);
        }
        let rawProperty = _args[0];
        let property = _escapePlatformProperties.get(rawProperty) || rawProperty;
        let op = operatorNormalizer[_f];
        let target = targetNormalizer[op];
        let opType;
        globalAssignments = {};
        if (typeof target === 'object') {
          do {
            switch (typeof normalizedThisArg) {
            case 'object':
            case 'function':
            case 'string':
            case 'number':
            case 'boolean':
            case 'symbol':
            case 'bigint':
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
              break;
            default:
              if (typeof _args[0] === 'function') {
                target = targetNormalizerMap.get(_args[0]);
              }
              else {
                target = 'xtp';
              }
              break;
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
              case 'number':
              case 'bigint':
                name = _globalObjects.get(_t);
                normalizedThisArg = _t;
                isStatic = true;
                isObject = false;
                if (!name && isSuperOperator.get(_f)) {
                  let _isStatic = isStatic;
                  let _isObject = isObject;
                  if (typeof _t === 'function') {
                    ctor = _t;
                  }
                  else {
                    _isStatic = false;
                    ctor = _t.constructor;
                    if (ctor) {
                      _isObject = !_hasOwnProperty.call(_t, 'constructor');
                    }
                  }
                  if (ctor) {
                    name = _globalObjects.get(ctor);
                    while (!name && typeof ctor === 'function') {
                      ctor = Object.getPrototypeOf(ctor);
                      name = _globalObjects.get(ctor);
                    }
                    if (name) {
                      isStatic = _isStatic;
                      isObject = _isObject;
                      normalizedThisArg = ctor;
                    }
                  }
                }
                if (!name) {
                  [name, isStatic, isObject] = detectName(normalizedThisArg, boundParameters);
                }
                if (true /* name */) { // Note: Normalize property even for acl[S_DEFAULT][S_DEFAULT]: defaultAcl(), which is not used by default
                  property = rawProperty = undefined;
                  switch (typeof _p) {
                  case 'string':
                    rawProperty = _p;
                    property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                  case 'symbol':
                    if (target[3] === 'v') {
                      switch (target) {
                      case 'r01v':
                        if (_args[1][2]) {
                          let _obj = _args[1][2];
                          let _name = _globalObjects.get(_obj);
                          let _isStatic = true;
                          let _isObject = false;
                          let __p = _escapePlatformProperties.get(_p) || _p;
                          if (!_name) {
                            [_name, _isStatic, _isObject] = detectName(_obj, null);
                          }
                          if (!applyAcl(_name, _isStatic, _isObject, __p, 'r', context, _obj, _args, arguments)) {
                            result = [_name, _isStatic, _isObject, __p, 'r', context, _obj, _args, arguments];
                            throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(_name));
                          }
                        }
                        if (normalizedThisArg instanceof _global.constructor || _args[1][2] === _global) {
                          switch (_args[0]) {
                          case 'get': // Reflect.get(window, 'property', receiver)
                            trackResultAsGlobal = rawProperty;
                            break;
                          default:
                            break;
                          }
                        }
                        break;
                      case 'w01v':
                      case 'W01v':
                        if (normalizedThisArg === _global) {
                          switch (_args[0]) {
                          case 'defineProperty': // Object.defineProperty(window, 'property', { value: v }); Reflect.defineProperty(window, 'property', { value: v })
                            if (_args[1][2]) {
                              let desc = _args[1][2];
                              let value;
                              if (typeof desc.get === 'function') {
                                value = desc.get.call(_global);
                              }
                              else {
                                value = desc.value;
                              }
                              if (typeof value === 'function' || (value && typeof value === 'object')) {
                                globalAssignments[rawProperty] = value;
                              }
                            }
                            break;
                          case 'set': // Reflect.set(window, 'property', v)
                            if (_args[1][2]) {
                              let value = _args[1][2];
                              if (typeof value === 'function' || (value && typeof value === 'object')) {
                                globalAssignments[rawProperty] = value;
                              }
                            }
                            break;
                          default:
                            break;
                          }
                        }
                        break;
                      case 'w0.v':
                      case 'W0.v':
                        if (normalizedThisArg === _global) {
                          let props;
                          switch (_args[0]) {
                          case 'defineProperties': // Object.defineProperties(window, { 'property': { value: v } })
                            props = _args[1][1];
                            for (let p in props) {
                              let desc = props[p];
                              let value;
                              if (typeof desc.get === 'function') {
                                value = desc.get.call(_global);
                              }
                              else {
                                value = desc.value;
                              }
                              if (typeof value === 'function' || (value && typeof value === 'object')) {
                                globalAssignments[p] = value;
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
                  switch (typeof _p) {
                  case 'string':
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
                      rawProperty = [];
                      for (let i = 1; i < _args[1].length; i++) {
                        let _obj = _args[1][i];
                        if (!_obj) {
                          continue;
                        }
                        if (_obj instanceof Object || typeof _obj === 'object') {
                          let _name = _globalObjects.get(_obj);
                          let _isStatic = true;
                          let _isObject = false;
                          if (!_name) {
                            [_name, _isStatic, _isObject] = detectName(_obj, null);
                          }
                          if (!applyAcl(_name, _isStatic, _isObject, S_ALL, 'r', context, _obj, _args, arguments)) {
                            result = [_name, _isStatic, _isObject, S_ALL, 'r', context, _obj, _args, arguments];
                            throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(_name));
                          }
                          // TODO: Are inherited properties targeted?
                          rawProperty = rawProperty.concat(Object.keys(_args[1][i]));
                        }
                      }
                      property = rawProperty.map(p => _escapePlatformProperties.get(p) || p);
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
                        if (name && name.has(_method[0])) {
                          if (_method.length > 1) {
                            rawProperty = _method[_method.length - 1];
                            property = _escapePlatformProperties.get(rawProperty) || rawProperty;
                          }
                          else {
                            property = rawProperty = S_UNSPECIFIED;
                          }
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
              switch (_args[0]) {
              case 'apply':
              case FunctionPrototypeApply:
              case ReflectApply:
                if (_target === 'x10R') {
                  _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][2]) : _args[1][2] ];
                }
                else {
                  _args = [ rawProperty, _boundArgs ? _boundArgs.concat(_args[1][1]) : _args[1][1] ];
                }
                break;
              case 'call':
              case FunctionPrototypeCall:
                _args = [ rawProperty, _boundArgs ? _boundArgs.concat(Array.prototype.slice.call(_args[1], 1)) : Array.prototype.slice.call(_args[1], 1) ];
                break;
              }
              if (typeof target === 'string') {
                continue;
              }
              else {
                break;
              }
            }
            else if (target === 'x0N') {
              // Reflect.construct(Class, args)
              _args = _args[1][1];
              break;
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
            if (normalizedThisArg === _global) {
              switch (target) {
              case 'rtp':
                switch (_f) {
                case '.':
                case '#.':
                  trackResultAsGlobal = rawProperty;
                  break;
                default:
                  break;
                }
                break;
              case 'wtpv':
                switch (_f) {
                case '=':
                case '#=':
                  if (_args[1] instanceof Object || (_args[1] && typeof _args[1] === 'object')) {
                    globalAssignments[rawProperty] = _args[1];
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
        if (target === 'r0tb') {
          // TODO: recursive should always be true but some incompatiblity remains
          let recursive = args !== _args;
          let _thisArg = recursive ? normalizedThisArg[rawProperty] : thisArg;
          let __args = recursive ? _args : args;
          let _method = _globalMethods.get(_thisArg);
          boundParameters = {
            f: _thisArg,
            name: name,
            thisArg: __args[1][0],
            normalizedThisArg: _method
              ? _method[1] === 'prototype'
                ? { constructor: _global[_method[0]] }
                : _global[_method[0]]
              : __args[1][0],
            isStatic: _method ? (_method[1] !== 'prototype') : (typeof __args[1][0] === 'function'),
            property: typeof rawProperty === 'string' ? rawProperty : _thisArg,
            args: __args[1].slice(1),
          };
          f = 'bind';
        }
        for (let gprop in globalAssignments) {
          //console.log('global assignment ', gprop);
          Policy.trackClass(gprop, globalAssignments[gprop]);
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
      else if (newTarget === null) {
        // module
        let name = args[0]; // moduleContext;
        switch (typeof thisArg) {
        case 'object':
          if (thisArg === null) {
            break;
          }
        case 'function':
          // functions and non-null objects
          _globalObjects.set(thisArg, name);
          name = _globalObjects.get(thisArg);
          break;
        }
        let target = targetNormalizerMapObject.get(f);
        switch (target) {
        case 'wt-v':
          hasGlobalAssignments = true;
          trackResultAsGlobal = args[0]; // moduleContext
        case 'rt-':
        case 'xt-':
        case 'wt-':
        case 'wt-c':
          if (!applyAcl(name, true, false, S_MODULE, target[0], context, normalizedThisArg, _args, arguments)) {
            result = [ name, true, false, S_MODULE, target[0], context, normalizedThisArg, _args, arguments ];
            throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
          }
          break;
        default:
          break;
        }
      }
      else {
        let name;
        if ((name = _globalObjects.get(f))) {
          if (!applyAcl(name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments)) {
            result = [ name, true, false, S_UNSPECIFIED, 'x', context, normalizedThisArg, _args, arguments ];
            throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(name));
          }
          if (name) {
            // function call for a global function
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
          for (let _name of name) {
            let _method = _globalMethods.split(_name);
            if (_method.length === 1) {
              continue;
            }
            let rawProp = _method[_method.length - 1];
            let prop = _escapePlatformProperties.get(rawProp) || rawProp;
            let obj = _method[0];
            if (!applyAcl(obj, _method[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments)) {
              result = [ obj, _method[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments ];
              throw new Error('Permission Denied: Cannot access ' + obj);
            }
            let forName;
            let forProp;
            let id = _method.join('.');
            if (!applyAcl(obj, _method[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments)) {
              result = [ obj, _method[1] !== 'prototype', false, prop, 'x', context, normalizedThisArg, _args, arguments ];
              throw new Error('Permission Denied: Cannot access ' + obj);
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
          case 'export':
            {
              // import * as __context_mapper__module_namespace_0 from '/resolved/self-module-name.js'; // circular import of self module
              // At the tail of each module
              // __hook__(() => {}, null, ['export',__context_mapper__[0], __context_mapper__module_namespace_0], __context_mapper__[0], NaN)
              const moduleContextSymbol = args[1];
              if (typeof moduleContextSymbol !== 'symbol') {
                let e = new Error('__hook__: invalid context');
                onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
                throw e;
              }
              const moduleContext = __hook__[moduleContextSymbol];
              if (!moduleContext) {
                let e = new Error('__hook__: invalid context');
                onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
                throw e;
              }
              let property;
              if (!applyAcl(moduleContext, true, false, S_MODULE, 'W', context, normalizedThisArg, _args, arguments)) {
                result = [moduleContext, true, false, S_MODULE, 'W', context, normalizedThisArg, _args, arguments];
                throw new Error('Permission Denied: Cannot access ' + moduleContext);
              }
              // export access allowed
              // register the object with its virtual name
              thisArg = normalizedThisArg = args[2]; // module namespace object for moduleContext
              if (typeof thisArg === 'object' && thisArg[Symbol.toStringTag] === 'Module') {
                _globalObjects.set(thisArg, moduleContext);
                let virtualName = moduleContext + ','; // /components-path/module-name/file.js,
                for (property in thisArg) { // enumerate named exports including default
                  let _export = thisArg[property];
                  if (_export) {
                    switch (typeof _export) {
                    case 'object':
                    case 'function':
                      // TODO: Properly handle mutations of methods in _export
                      Policy.trackClass(virtualName + property, _export);
                      break;
                    default:
                      break;
                    }
                  }
                }
                // apply ACLs for named exports
                for (property in thisArg) {
                  let _export = thisArg[property];
                  let _name = virtualName + property;
                  switch (typeof _export) {
                  case 'object':
                    if (_export === null) {
                      break;
                    }
                  case 'function':
                    _name = _globalObjects.get(_export);
                    break;
                  }
                  if (!applyAcl(_name, true, false, S_MODULE, 'W', context, _export, _args, arguments)) {
                    result = [_name, true, false, S_MODULE, 'W', context, _export, _args, arguments];
                    throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(_name));
                  }
                }
              }
            }
            break;
          case 'import':
            {
              /* 
                // At the head of each module
                import * as __context_mapper__module_namespace_0 from "/components/this-module/index.js";
                import * as __context_mapper__module_namespace_1 from "/components/module-name/index.js";
                import * as __context_mapper__module_namespace_2 from "/components/module-name/path/to/specific/un-exported/file.js";
                __hook__(() => {}, null, ['import',
                  {
                    [__context_mapper__[6]]: [
                      __context_mapper__module_namespace_1,
                      'default',
                      '*',
                      'export1',
                      'export2',
                      'export3',
                      'reexportname1',
                      'reexportname2',
                      'reexportnameN',
                      'import1',
                      'import2',
                    ],
                    [__context_mapper__[11]]: [
                      __context_mapper__module_namespace_2,
                      'foo',
                      'bar',
                    ],
                  }
                ], __context_mapper__[0], NaN);
              */
              for (let moduleContextSymbol of Object.getOwnPropertySymbols(args[1])) {
                const moduleContext = __hook__[moduleContextSymbol];
                const imports = args[1][moduleContextSymbol];
                if (!moduleContext) {
                  let e = new Error('__hook__: invalid context');
                  onThrow(e, arguments, contextStack); // result contains arguments to applyAcl, or undefined
                  throw e;
                }
                let property = S_MODULE;
                if (!applyAcl(moduleContext, true, false, property, 'R', context, normalizedThisArg, _args, arguments)) {
                  result = [moduleContext, true, false, property, 'R', context, normalizedThisArg, _args, arguments];
                  throw new Error('Permission Denied: Cannot access ' + moduleContext);
                }
                // import access allowed
                thisArg = normalizedThisArg = imports[0]; // module namespace object for moduleContext
                if (typeof thisArg === 'object' && thisArg[Symbol.toStringTag] === 'Module') {
                  // apply ACLs for named imports
                  let virtualName = moduleContext + ',';
                  for (let i = 1; i < imports.length; i++) {
                    property = imports[i];
                    let _import = thisArg[property];
                    let _name = property === '*' ? moduleContext : virtualName + property;
                    switch (typeof _import) {
                    case 'object':
                      if (_import === null) {
                        break;
                      }
                    case 'function':
                      _name = _globalObjects.get(_import);
                      break;
                    }
                    if (!applyAcl(_name, true, false, S_MODULE, 'R', context, _import, _args, arguments)) {
                      result = [_name, true, false, S_MODULE, 'R', context, _import, _args, arguments];
                      throw new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(_name));
                    }
                  }
                }
              }
            }
            break;
          case 'import()':
            {
              // import('module.js')
              let property = S_UNSPECIFIED;
              let specifier = args[1];
              let importMeta = args[2];
              if (specifier && hook.parameters.importMapper && importMeta) {
                specifier = hook.parameters.importMapper(specifier, importMeta.url);
              }
              if (!specifier || typeof specifier !== 'string' ||
                !specifier.match(/^\s*(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?\s*$/)) {
                property = 'invalidImportUrl'; // Note: virtual property 'invalidImportUrl'
              }
              else {
                name = specifier;
                if (!applyAcl(name, true, false, S_MODULE, 'R', context, normalizedThisArg, _args, arguments)) {
                  result = [ name, true, false, S_MODULE, 'R', context, normalizedThisArg, _args, arguments ];
                  throw new Error('Permission Denied: Cannot access ' + name);
                }
                args[1] = specifier; // resolved path name
              }
              name = 'import'; // Note: virtual object name 'import'
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
                  Policy.trackClass(args[2] /* virtualName */, thisArg);
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
        // read ES module
        case 'm':
          result = thisArg;
          break;
        // function call to ES module
        case 'm()':
          result = args[2](...args[1]);
          break;
        // constructor call to ES module
        case 'mnew':
          result = args[2](...args[1]);
          break;
        // update operators
        case 'm++':
        case '++m':
        case 'm--':
        case '--m':
        // unary operator
        case 'mtypeof':
          result = args[1]();
          break;
        // LHS value assignment on ES module with args[1] = (cb) => ({set ['='](v){a=v;cb(v);}, get ['='](){return a;}}) 
        case 'm.=':
          result = args[1](v => Policy.trackClass(args[0] /* moduleContext */, v));
          break;
        // assignment operators on ES module
        case 'm=': // trackResultAsGlobal === args[0] === moduleContext
        case 'm+=':
        case 'm-=':
        case 'm*=':
        case 'm/=':
        case 'm%=':
        case 'm**=':
        case 'm<<=':
        case 'm>>=':
        case 'm>>>=':
        case 'm&=':
        case 'm^=':
        case 'm|=':
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
        if (trackResultAsGlobal !== S_GLOBAL) {
          if (result !== _global && (typeof result === 'function' || (result && typeof result === 'object'))) {
            let _name = _globalObjects.get(result);
            if (!_name || !_name.has(trackResultAsGlobal)) {
              Policy.trackClass(trackResultAsGlobal, result);
            }
          }
        }
        if (_global.constructor.name === 'Window') {
          for (let name in globalAssignments) {
            wrapGlobalProperty([_global, name, 'window']);
          }
        }
      }
      if (arguments[6]) {
        arguments[6](result); // resultCallback = hookArgs[6]
      }

      lastContext = _lastContext;
      // if (contextStack[contextStack.length - 1] !== context) { debugger; }
      contextStack.pop();
    }
    catch (e) {
      if (Array.isArray(result) && Array.isArray(result[7]) && Array.isArray(result[7].result)) {
        // result = [name, isStatic, isObject, property, opType, context, normalizedThisArg, normalizedArgs, hookArgs]
        // Adjust error message
        //   Note: typeof result[7].result[0] is most likely a string. Thus only the first object that has denied permission should be shown.
        let rawContext = result[5];
        let normalizedArgs = result[7];
        e = new Error('Permission Denied: Cannot access ' + SetMap.getStringValues(normalizedArgs.result[0]));
        result = normalizedArgs.result;
        result[5] = rawContext;
        delete normalizedArgs.result; // delete the used result property
      }
      arguments[3] = context; // In strict mode, elements in arguments are not bound to their corresponding argument variables
      arguments[5] = contextSymbol;
      onThrow(e, arguments, contextStack, result); // result contains arguments to applyAcl, or undefined
      lastContext = _lastContext;
      contextStack.pop();
      throw e;
    }
    return result;
  }
