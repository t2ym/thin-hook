/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
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
      switch (typeof _class) {
      case 'object':
        if (_class === null) {
          return false;
        }
      case 'function':
        break;
      default:
        return false;
      }
      let gprop = virtualName;
      let gvalue = _class;
      let set = _globalObjects.get(_class);
      if (set) {
        if (set.has(virtualName)) {
          return false; // TODO: this redundancy checking may drop new properties of _class
        }
      }
      set = _globalObjects.set(gvalue, gprop);
      if (!set.rawHas(gprop)) {
        // Avoid redundant registration of the same object with proxied policies
        return false;
      }
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
    // ACL for new Proxy() and Proxy.revocable() to treat the created proxy object as an alias for the original target object
    // TODO: revoked proxy objects should be released
    static setAlias(revocable = false) {
      if (!revocable) {
        return function ProxyAcl(normalizedThisArg,
                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                 aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                 hookArgs /* [f, thisArg, args, context, newTarget, contextSymbol] */,
                                 applyAcl /* for recursive application of ACL */) {
          switch (aclArgs[4]) {
          case 'x':
            hookArgs[6] = (result) => _globalObjects.setAlias(normalizedArgs[0], result); // resultCallback
            return true;
          case 'r':
            return true;
          case 'w':
          default:
            return false;
          }
        };
      }
      else {
        return function ProxyRevocableAcl(normalizedThisArg,
                                          normalizedArgs /* ['property', args], ['property', value], etc. */,
                                          aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                          hookArgs /* [f, thisArg, args, context, newTarget, contextSymbol] */,
                                          applyAcl /* for recursive application of ACL */) {
          switch (aclArgs[4]) {
          case 'x':
            hookArgs[6] = (result) => _globalObjects.setAlias(normalizedArgs[1][0], result.proxy); // resultCallback
            return true;
          case 'r':
            return true;
          case 'w':
          default:
            return false;
          }
        };
      }
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
    // example: r = (name, prop) => name === 'window' && typeof prop === 'string' && prop.startsWith('prefix_')
    static patternAcl({ r = S_GLOBAL, w = S_GLOBAL, x = S_GLOBAL, R = S_GLOBAL, W = S_GLOBAL }) {
      const globalAcl = Policy.globalAcl();
      const pattern = arguments[0];
      return function patternAcl(normalizedThisArg,
                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                 aclArgs /* [name, isStatic, isObject, property, opType, context, target, normalizedArgs, hookArgs] */,
                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                 applyAcl /* for recursive application of ACL */) {
        if (pattern[aclArgs[4]]) {
          return pattern[aclArgs[4]] === S_GLOBAL ? globalAcl(...arguments) : pattern[aclArgs[4]](aclArgs[0], aclArgs[3]);
        }
        else {
          return globalAcl(...arguments);
        }
      };
    }
    static globalAcl() {
      return function globalAcl(normalizedThisArg,
                                normalizedArgs /* ['property', args], ['property', value], etc. */,
                                aclArgs /* [name, isStatic, isObject, property, opType, context, target, normalizedArgs, hookArgs] */,
                                hookArgs /* [f, thisArg, args, context, newTarget] */,
                                applyAcl /* for recursive application of ACL */) {
        let property = aclArgs[3];
        let rawProperty = _unescapePlatformProperties.get(property) || property;
        switch (property) {
        case S_ALL:
          switch (typeof normalizedThisArg) {
          case 'object':
            if (normalizedThisArg === null) {
              break;
            }
          case 'function':
            {
              let target = normalizedThisArg;
              // S_ALL for [S_GLOBAL] object is permitted
              target = Object.getPrototypeOf(target); // steps to the next chain
              let names, isStatic, isObject;
              let isAclNameChecked = false;
              while (target) {
                [names, isStatic, isObject] = detectName(target);
                if (names instanceof Set) {
                  isObject = true;
                  let isNoAclNameChecked = false;
                  for (let name of names) {
                    if (Reflect.has(acl, name)) {
                      isAclNameChecked = true;
                    }
                    else {
                      if (isNoAclNameChecked) {
                        continue;
                      }
                      name = undefined;
                      isNoAclNameChecked = true;
                    }
                    if (!applyAcl(name, isStatic, isObject, property, aclArgs[4], hookArgs[3], target, normalizedArgs, hookArgs)) {
                      //console.log('globalAcl: permission denied ', name, target, property);
                      return false;
                    }
                  }
                }
                if (isAclNameChecked) {
                  // stop tracking the chain if a named ACL is found and applied
                  break;
                }
                target = Object.getPrototypeOf(target);
              }
            }
            break;
          case 'boolean':
          case 'number':
          case 'string':
          case 'symbol':
            // TODO: access permission to primitive values and their constructors
            break;
          case 'undefined':
          default: // including 'bigint'
            break;
          }
          break;
        case S_UNSPECIFIED:
          // Unreachable for now as applyAcl is skipped for untracked functions
          break;
        case S_FUNCTION:
          // f.apply(normalizedThisArg)
          // f.call(normalizedThisArg)
          // f.bind(normalizedThisArg)
          // _globalMethods.get(f) === undefined
          // TODO: proper handling of untracked functions
          break;
        default:
          switch (typeof normalizedThisArg) {
          case 'object':
            if (normalizedThisArg === null) {
              break;
            }
          case 'function':
            switch (aclArgs[4]) {
            case 'r':
              if (_hasOwnProperty.call(normalizedThisArg, rawProperty)) {
                return true; // read an own property of this global object
              }
              else if (Reflect.has(normalizedThisArg, rawProperty)) {
                // read an inherited property
                let target = Object.getPrototypeOf(normalizedThisArg);
                let _names, _isStatic, _isObject;
                let isAclNameChecked = false;
                while (target) {
                  [_names, _isStatic, _isObject] = detectName(target, null);
                  if (_names instanceof Set) {
                    _isObject = true; // Adjust _isObject as true since target is a prototype of normalizedThisArg
                    let isNoAclNameChecked = false;
                    for (let _name of _names) {
                      if (Reflect.has(acl, _name)) {
                        isAclNameChecked = true;
                      }
                      else {
                        if (isNoAclNameChecked) {
                          continue;
                        }
                        _name = undefined;
                        isNoAclNameChecked = true;
                      }
                      // TODO: handle when normalizedThisArg itself is a prototype object of a function
                      if (!applyAcl(_name, _isStatic, _isObject, property, aclArgs[4], hookArgs[3], target, normalizedArgs, hookArgs)) {
                        return false;
                      }
                    }
                  }
                  if (isAclNameChecked) {
                    // stop tracking the chain if a named ACL is found and applied
                    break;
                  }
                  if (_hasOwnProperty.call(target, rawProperty)) {
                    break;
                  }
                  target = Object.getPrototypeOf(target);
                }
              }
              break;
            case 'w':
              // TODO: Array.isArray(property) ... Is the same result as a single property?
              if (aclArgs[1]) { // isStatic
                // access denied for a no-acl global object
                return false;
              }
              else {
                if (!aclArgs[2]) { // !isObject
                  // access denied for the prototype object of a no-acl global object
                  return false;
                }
                else {
                  // allow writing to an instance of this global object
                }
              }
              break;
            case 'R':
              if (aclArgs[1]) { // isStatic
                // access denied for getOwnPropertyDescriptor on this global object
                return false;
              }
              else {
                if (!aclArgs[2]) { // !isObject
                  // access denied for the prototype object of a no-acl global object
                  return false;
                }
                else {
                  // allow allowed for getOwnPropertyDescriptor on an instance of this global object
                }
              }
              break;
            case 'W':
              if (aclArgs[1]) { // isStatic
                // access denied for defineProperty on this global object
                return false;
              }
              else {
                if (!aclArgs[2]) { // !isObject
                  // access denied for the prototype object of a no-acl global object
                  return false;
                }
                else {
                  // allow writing to an instance of this global object
                }
              }
              break;
            case 'x':
              {
                let target = normalizedThisArg;
                if (_hasOwnProperty.call(normalizedThisArg, rawProperty)) {
                  // execute an own property method of this global object
                }
                else if (Reflect.has(normalizedThisArg, rawProperty)) {
                  // Prototype chain has the property
                  target = Object.getPrototypeOf(normalizedThisArg);
                  let _names, _isStatic, _isObject;
                  let isAclNameChecked = false;
                  while (target) {
                    [_names, _isStatic, _isObject] = detectName(target, null);
                    if (_names instanceof Set) {
                      _isObject = true; // Adjust _isObject as true since target is a prototype of normalizedThisArg
                      let isNoAclNameChecked = false;
                      for (let _name of _names) {
                        if (Reflect.has(acl, _name)) {
                          isAclNameChecked = true;
                        }
                        else {
                          if (isNoAclNameChecked) {
                            continue;
                          }
                          _name = undefined;
                          isNoAclNameChecked = true;
                        }
                        // TODO: handle when normalizedThisArg itself is a prototype object of a function
                        if (!applyAcl(_name, _isStatic, _isObject, property, 'x', hookArgs[3], target, normalizedArgs, hookArgs)) {
                          return false;
                        }
                      }
                    }
                    if (isAclNameChecked) {
                      // stop tracking the chain if a named ACL is found and applied
                      break;
                    }
                    if (_hasOwnProperty.call(target, rawProperty)) {
                      break;
                    }
                    target = Object.getPrototypeOf(target);
                  }
                }
                if (normalizedThisArg instanceof Object) {
                  let property = normalizedArgs[0];
                  if (Reflect.has(normalizedThisArg, property)) {
                    let value;
                    let desc;
                    if (_hasOwnProperty.call(target, property)) {
                      desc = Object.getOwnPropertyDescriptor(target, property);
                      value = desc.value;
                    }
                    switch (hookArgs[0]) {
                    case 'w()':
                    case 'wnew':
                      value = hookArgs[2][3];
                      break;
                    default:
                      break;
                    }
                    if (!value) {
                      break;
                    }
                    let names = _globalObjects.get(value);
                    if (names) {
                      for (let virtualName of names) {
                        let name = _globalMethods.split(virtualName);
                        let rawProp = name[name.length - 1];
                        let prop = _escapePlatformProperties.get(rawProp) || rawProp;
                        let obj = name[0];
                        let isStatic = name[1] !== 'prototype';
                        let isObject = !_hasOwnProperty.call(normalizedThisArg, property);
                        if (isStatic && isGlobalScopeObject.has(obj)) {
                          // ['window','globalObject']
                          obj = rawProp;
                          prop = S_UNSPECIFIED;
                        }
                        if (Reflect.has(acl, obj)) { // avoid recursive calls
                          // Apply ACL for the global method
                          if (!applyAcl(obj, isStatic, isObject, prop, 'x', hookArgs[3], value, normalizedArgs[1], hookArgs)) {
                            normalizedArgs.result = normalizedArgs[1].result;
                            return false;
                          }
                        }
                      }
                    }
                  }
                }
              }
              break;
            default: // unknown opType
              return false;
            }
            break;
          default:
            // TODO: handle primitives
            break;
          }
          break;
        }
        return true; // equivalent to 'rwxRW' acl
      };
    }
    static defaultAcl() {
      return function defaultAcl(normalizedThisArg,
                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                 aclArgs /* [name, isStatic, isObject, property, opType, context, target, normalizedArgs, hookArgs] */,
                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                 applyAcl /* for recursive application of ACL */) {
        let property = aclArgs[3];
        let rawProperty = _unescapePlatformProperties.get(property) || property;
        switch (property) {
        case S_ALL:
          switch (typeof normalizedThisArg) {
          case 'object':
            if (normalizedThisArg === null) {
              break;
            }
          case 'function':
            {
              let target = normalizedThisArg;
              // S_ALL for [S_DEFAULT] object is permitted
              target = Object.getPrototypeOf(target); // steps to the next chain
              let names, isStatic, isObject;
              let isAclNameChecked = false;
              while (target) {
                [names, isStatic, isObject] = detectName(target);
                if (names) {
                  isObject = true;
                  for (let name of names) {
                    if (Reflect.has(acl, name)) {
                      isAclNameChecked = true;
                    }
                    if (!applyAcl(name, isStatic, isObject, property, aclArgs[4], hookArgs[3], target, normalizedArgs, hookArgs)) {
                      //console.log('defaultAcl: permission denied ', name, target, property);
                      return false;
                    }
                  }
                }
                if (isAclNameChecked) {
                  // stop tracking the chain if a named ACL is found and applied
                  break;
                }
                target = Object.getPrototypeOf(target);
              }
            }
            break;
          case 'boolean':
          case 'number':
          case 'string':
          case 'symbol':
            // TODO: access permission to primitive values and their constructors
            break;
          case 'undefined':
          default: // including 'bigint'
            break;
          }
          break;
        case S_UNSPECIFIED:
          // Unreachable for now as applyAcl is skipped for untracked functions
          break;
        case S_FUNCTION:
          // f.apply(normalizedThisArg)
          // f.call(normalizedThisArg)
          // f.bind(normalizedThisArg)
          // _globalMethods.get(f) === undefined
          // TODO: proper handling of untracked functions
          break;
        default:
          switch (typeof normalizedThisArg) {
          case 'object':
            if (normalizedThisArg === null) {
              break;
            }
          case 'function':
            switch (aclArgs[4]) {
            case 'r':
              if (_hasOwnProperty.call(normalizedThisArg, rawProperty)) {
                return true; // read an own property of this anonymous object
              }
              else if (Reflect.has(normalizedThisArg, rawProperty)) {
                // read an inherited property
                let target = Object.getPrototypeOf(normalizedThisArg);
                let _names, _isStatic, _isObject;
                let isAclNameChecked = false;
                while (target) {
                  [_names, _isStatic, _isObject] = detectName(target, null);
                  if (_names) {
                    _isObject = true; // Adjust _isObject as true since target is a prototype of normalizedThisArg
                    for (let _name of _names) {
                      if (Reflect.has(acl, _name)) {
                        isAclNameChecked = true;
                      }
                      // TODO: handle when normalizedThisArg itself is a prototype object of a function
                      if (!applyAcl(_name, _isStatic, _isObject, property, aclArgs[4], hookArgs[3], target, normalizedArgs, hookArgs)) {
                        return false;
                      }
                    }
                  }
                  if (isAclNameChecked) {
                    // stop tracking the chain if a named ACL is found and applied
                    break;
                  }
                  if (_hasOwnProperty.call(target, rawProperty)) {
                    break;
                  }
                  target = Object.getPrototypeOf(target);
                }
              }
              break;
            case 'w':
              /* access allowed
              if (_hasOwnProperty.call(normalizedThisArg, rawProperty)) {
                // write an own property of this anonymous object
              }
              else if (Reflect.has(normalizedThisArg, rawProperty)) {
                // Prototype chain has the property
                // TODO: More research on these situations
                //   For a setter:
                //     Since "this" object is normalizedThisArg, the optimistic assumtion is that the inherited setter should not affect the chained object
                //   For a non-setter property
                //     Writing to a property of normalizedThisArg is harmless to the chained object but overrides the inherited property
              }
              */
              break;
            case 'R':
              // getOwnPropertyDescriptor on this anonymous object
              break;
            case 'W':
              // defineProperty on this anonymous object
              break;
            case 'x':
              {
                let target = normalizedThisArg;
                if (_hasOwnProperty.call(normalizedThisArg, rawProperty)) {
                  // execute an own property method of this anonymous object
                }
                else if (Reflect.has(normalizedThisArg, rawProperty)) {
                  // Prototype chain has the property
                  target = Object.getPrototypeOf(normalizedThisArg);
                  let _names, _isStatic, _isObject;
                  let isAclNameChecked = false;
                  while (target) {
                    [_names, _isStatic, _isObject] = detectName(target, null);
                    if (_names) {
                      _isObject = true; // Adjust _isObject as true since target is a prototype of normalizedThisArg
                      for (let _name of _names) {
                        if (Reflect.has(acl, _name)) {
                          isAclNameChecked = true;
                        }
                        // TODO: handle when normalizedThisArg itself is a prototype object of a function
                        if (!applyAcl(_name, _isStatic, _isObject, property, 'x', hookArgs[3], target, normalizedArgs, hookArgs)) {
                          return false;
                        }
                      }
                    }
                    if (isAclNameChecked) {
                      // stop tracking the chain if a named ACL is found and applied
                      break;
                    }
                    if (_hasOwnProperty.call(target, rawProperty)) {
                      break;
                    }
                    target = Object.getPrototypeOf(target);
                  }
                }
                if (normalizedThisArg instanceof Object) {
                  let property = normalizedArgs[0];
                  if (Reflect.has(normalizedThisArg, property)) {
                    let value;
                    let desc;
                    if (_hasOwnProperty.call(target, property)) {
                      desc = Object.getOwnPropertyDescriptor(target, property);
                      value = desc.value;
                    }
                    switch (hookArgs[0]) {
                    case 'w()':
                    case 'wnew':
                      value = hookArgs[2][3];
                      break;
                    default:
                      break;
                    }
                    if (!value) {
                      break;
                    }
                    let names = _globalObjects.get(value);
                    if (names) {
                      for (let virtualName of names) {
                        let name = _globalMethods.split(virtualName);
                        let rawProp = name[name.length - 1];
                        let prop = _escapePlatformProperties.get(rawProp) || rawProp;
                        let obj = name[0];
                        let _normalizedArgs = [rawProp, normalizedArgs[1]];
                        // Apply ACL for the global method
                        if (!applyAcl(obj, name[1] !== 'prototype', !Object.prototype.hasOwnProperty.call(normalizedThisArg, property), prop, 'x', hookArgs[3], _global[obj], _normalizedArgs, hookArgs)) {
                          normalizedArgs.result = _normalizedArgs.result;
                          return false;
                        }
                      }
                    }
                  }
                }
              }
              break;
            default: // unknown opType
              return false;
            }
            break;
          case 'string':
            return applyAcl('String', false, true, aclArgs[3], aclArgs[4], hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          case 'number':
            return applyAcl('Number', false, true, aclArgs[3], aclArgs[4], hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          case 'boolean':
            return applyAcl('Boolean', false, true, aclArgs[3], aclArgs[4], hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          case 'symbol':
            return applyAcl('Symbol', false, true, aclArgs[3], aclArgs[4], hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          case 'bigint':
            return applyAcl('BigInt', false, true, aclArgs[3], aclArgs[4], hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
          default:
            // TODO: handle primitives
            break;
          }
          break;
        }
        return true; // equivalent to 'rwxRW' acl
      };
    }
    static chainAcl(acl) {
      const chainAcl = function chainAcl(_acl, path = [ [_acl, 'acl'] ]) {
        let properties = Object.getOwnPropertySymbols(_acl).concat(Object.getOwnPropertyNames(_acl));
        for (let property of properties) {
          if (property === S_CHAIN) {
            let chain = _acl[S_CHAIN];
            let __acl;
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
              __acl = chain(path);
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
                __acl = path[path.length - 2][0].__proto__[path[path.length - 1][1]];
                if (__acl) {
                  Object.setPrototypeOf(_acl, __acl);
                }
                else {
                  console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
                }
                break;
              case S_OBJECT:
                try {
                  __acl = path[0][0].Object[S_PROTOTYPE][S_INSTANCE];
                  if (__acl) {
                    Object.setPrototypeOf(_acl, __acl);
                  }
                  else {
                    console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
                  }
                }
                catch (e) {
                  console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
                }
                break;
              case S_FUNCTION:
                try {
                  __acl = path[0][0].Function[S_PROTOTYPE][S_INSTANCE];
                  if (__acl) {
                    Object.setPrototypeOf(_acl, __acl);
                  }
                  else {
                    console.error('chainAcl: cannot chain to ' + chain.toString(), _acl);
                  }
                }
                catch (e) {
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
    }
/* @ifdef unchainAcl */
    static unchainAcl(acl) {
      const unchainAcl = function unchainAcl(_acl, path = [ [_acl, 'acl'] ]) {
        let properties = Object.getOwnPropertySymbols(_acl).concat(Object.getOwnPropertyNames(_acl));
        if (!_acl[S_CHAIN]) {
          Reflect.setPrototypeOf(_acl, null);
        }
        for (let property of properties) {
          if (property === S_CHAIN) {
          }
          else {
            let __acl = _acl[property];
            switch (typeof __acl) {
            case 'object':
              if (__acl) {
                path.push([__acl, property]);
                unchainAcl(__acl, path);
                path.pop();
              }
              break;
            default:
              break;
            }
          }
        }
      }
      unchainAcl(acl);
    }
/* @endif */
    static mergeAcl(target, ...sources) {
      const originalTarget = target;
      const mergeAcl = function mergeAcl(target, source) {
        if (!source) {
          return target;
        }
        let properties = Object.getOwnPropertySymbols(source).concat(Object.getOwnPropertyNames(source));
        PROPERTY_LOOP:
        for (let property of properties) {
          switch (property) {
          case S_PROXY:
          case S_CHAIN:
            if (originalTarget !== acl) {
              continue PROPERTY_LOOP; // skip S_PROXY and S_CHAIN properties
            }
            break;
          }
          if (_hasOwnProperty.call(target, property)) {
            let _target = target[property];
            let _source = source[property];
            switch (typeof _target) {
            case 'string':
            case 'function':
              if (typeof property === 'string' && property.startsWith('@')) {
                // override the target property
                _target = target[property] = _source;
                break;
              }
              // convert property: 'string' to property: { [S_DEFAULT]: 'string' }
              // convert property: func to property: { [S_DEFAULT]: func }
              _target = target[property] = { [S_DEFAULT]: _target };
            case 'object':
              switch (typeof _source) {
              case 'string':
              case 'function':
                // convert property: 'string' to property: { [S_DEFAULT]: 'string' }
                // convert property: func to property: { [S_DEFAULT]: func }
                _source = source[property] = { [S_DEFAULT]: _source };
              case 'object':
                mergeAcl(_target, _source); // recursively merge the object property
                break;
              default:
                console.error('mergeAcl: unexpected source property type', typeof _source, _source);
                break;
              }
              break;
            default:
              console.error('mergeAcl: unexpected target property type', typeof _target, _target);
              break;
            }
          }
          else if (Reflect.has(target, property)) {
            // inherited target[property]
            let _target = target[property];
            let _source = source[property];
            switch (typeof _target) {
            case 'string':
            case 'function':
              if (typeof property === 'string' && property.startsWith('@')) {
                // override the target property
                _target = target[property] = _source;
                break;
              }
              // convert property: 'string' to property: { [S_DEFAULT]: 'string' }
              // convert property: func to property: { [S_DEFAULT]: func }
              _target = target[property] = { [S_DEFAULT]: target[property] };
              switch (typeof _source) {
              case 'string':
              case 'function':
                // convert property: 'string' to property: { [S_DEFAULT]: 'string' }
                // convert property: func to property: { [S_DEFAULT]: func }
                _source = source[property] = { [S_DEFAULT]: _source };
              case 'object':
                mergeAcl(_target, _source); // recursively merge the object property
                break;
              default:
                console.error('mergeAcl: unexpected source property type', typeof _source, _source);
                break;
              }
              break;
            case 'object':
              // create a new own property inherited from target[property]
              _target = target[property] = Object.create(_target);
              switch (typeof _source) {
              case 'string':
              case 'function':
                // convert property: 'string' to property: { [S_DEFAULT]: 'string' }
                // convert property: func to property: { [S_DEFAULT]: func }
                _source = source[property] = { [S_DEFAULT]: _source };
              case 'object':
                mergeAcl(_target, _source); // recursively merge the object property
                break;
              default:
                console.error('mergeAcl: unexpected source property type', typeof _source, _source);
                break;
              }
            default:
              console.error('mergeAcl: unexpected target property type', typeof _target, _target);
              break;
            }
          }
          else {
            // no target[property]
            target[property] = source[property]; // copy the source property
          }
        }
        return target;
      };
      for (let source of sources) {
        mergeAcl(target, source);
      }
      return target;
    }
    static proxyAcl(acl) {
      const proxyAcl = function proxyAcl(_acl, path = [ [_acl, 'acl'] ]) {
        let properties = Object.getOwnPropertySymbols(_acl).concat(Object.getOwnPropertyNames(_acl));
        for (let property of properties) {
          if (property === S_PROXY) {
            let proxy = _acl[S_PROXY];
            switch (typeof proxy) {
            case 'object':
              if (proxy && path && path.length >= 2) {
                Policy.mergeAcl(proxy, _acl);
                path[path.length - 2][0][path[path.length - 1][1]] = proxy;
              }
              else {
                console.error('proxyAcl: cannot proxy from', path, 'to', proxy, _acl);
              }
              break;
            case 'function':
              let __acl = proxy(path);
              if (__acl && path && path.length >= 2) {
                Policy.mergeAcl(__acl, _acl);
                path[path.length - 2][0][path[path.length - 1][1]] = __acl;
              }
              else {
                console.error('proxyAcl: cannot proxy from', path, 'to ' + proxy.toString(), _acl);
              }
              break;
            case 'symbol':
              /*
              switch (proxy) {
              case S_PROXY:
                let __acl = path[path.length - 2][0].__proto__[path[path.length - 1][1]];
                if (__acl) {
                  Object.setPrototypeOf(_acl, __acl);
                }
                else {
                  console.error('proxyAcl: cannot proxy to ' + proxy.toString(), _acl);
                }
                break;
              default:
                console.error('proxyAcl: cannot recongnize proxy ' + proxy.toString(), _acl);
                break;
              }
              */
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
                proxyAcl(__acl, path);
                path.pop();
              }
              break;
            default:
              break;
            }
          }
        }
      }
      proxyAcl(acl);
    }
    /*
      resolve module paths via hook.parameters.importMapper(specifier, baseURI)
      
      Notes:
      - No resolution if hook.parameters.importMapper is not configured
        - hook.parameters.importMapper is a wrapper function of the Import Maps reference implementation
      - baseURI is hook.parameters.baseURI
      - Import Maps JSON is set in hook.parameters.importMapsJson as a string
        - Picking up from the native import maps script tag has not been implemented yet
      - A trivial fork of the Import Maps reference implementation is used for resolution
        - GitHub repository: https://github.com/t2ym/import-maps/tree/browserify/reference-implementation/lib
        - package.json at the top of the repository is added so that NPM can fetch the package from GitHub

      Resolutions:
      
      - Type: bare specifiers

          "lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js"
          "lit-html/" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js" - never conflicts with global property names
          "lit-html/*" -> "/components/thin-hook/demo/node_modules/lit-html/*"
          "lit-html/directives/repeat.js" -> "/components/thin-hook/demo/node_modules/lit-html/directives/repeat.js"
          "lit-html/,*" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js,*"

      - Type: relative paths from hook.parameters.baseURI

          "./modules/module1.js" -> "/components/thin-hook/demo/modules/module1.js"
          "./modules/module1.js,*" -> "/components/thin-hook/demo/modules/module1.js,*"

    */
    static resolveBareSpecifierAcl(_acl) {
      if (!hook.parameters.importMapper) {
        return; // no operation if importMapper is missing
      }
      // resolve bare specifiers in acl
      let paths;
      let resolved;
      for (let name in _acl) {
        if (name.startsWith('https://') || name.startsWith('/')) {
          continue; // skip already resolved specifiers
        }
        if (_acl[name][S_TYPE] !== S_NAMESPACE) {
          continue; // skip non-module ACLs
        }
        paths = name.split(',');
        if (paths.length === 1) {
          if (name.endsWith('/*')) {
            // bare-specifier/*
            resolved = hook.parameters.importMapper(name + '.js', hook.parameters.baseURI).replace(/\*\.js$/, '*');
          }
          else if (name.endsWith('/')) {
            // bare-specifier/
            resolved = hook.parameters.importMapper(name.substring(0, name.length - 1), hook.parameters.baseURI);
          }
          else {
            // bare-specifier
            resolved = hook.parameters.importMapper(name, hook.parameters.baseURI);
          }
        }
        else {
          // bare-specifier,anything,*
          if (paths[0].endsWith('/')) {
            paths[0] = hook.parameters.importMapper(paths[0].substring(0, paths[0].length - 1), hook.parameters.baseURI);
          }
          else {
            paths[0] = hook.parameters.importMapper(paths[0], hook.parameters.baseURI);
          }
          resolved = paths.join(',');
        }
        _acl[resolved] = _acl[name];
        delete _acl[name];
      }
    }
    /*
      Prefixed Module Name object:
        {
          "": { // root
            "components": {
              "thin-hook": {
                "demo": {
                  "node_modules": {
                    "lit-html": {
                      "*": "@lit-html",
                    },
                    "lit-element": {
                      "*": "@lit-element",
                    },
                  },
                },
              },
            },
          },
        };

      Notes:
      - Prefixed module names must end with '/*' like this:
        '/some/module-name/*'
    */
    static generatePrefixedModuleNames(_acl) {
      const prefixedModuleNames = Object.create(null);
      for (let name in _acl) {
        let paths = name.split('/');
        let cursor = prefixedModuleNames;
        if (paths.length > 1 && paths[0] === '' && paths[paths.length - 1] === '*') {
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
      this.prefixedModuleNames = prefixedModuleNames;
      return this.prefixedModuleNames;
    }
    /*
      flatternAcl(_acl):
      acl = {
        'module-name': {
          [S_TYPE]: S_NAMESPACE,
          exported: { // flattened as 'module-name,exported'

          },
        },
        className: {
          classProperty: { // flattened as 'className,classProperty'
            [S_TYPE]: S_CLASS,
          }
        },
      };
    */
    static flattenAcl(_acl) { // only 1 level for now
      for (let name in _acl) {
        if (typeof name === 'string' && typeof _acl[name] === 'object' && _acl[name]) {
          if (_acl[name][S_TYPE] === S_NAMESPACE) {
            // module namespace object
            for (let _export in _acl[name]) {
              if (_export[0] === '@') {
                continue;
              }
              let flattenName = name + ',' + _export;
              if (!_acl[flattenName]) {
                _acl[flattenName] = _acl[name][_export];
              }
            }
          }
          else {
            // class object
            for (let _property in _acl[name]) {
              if (_property[0] === '@') {
                continue;
              }
              if (!(_acl[name][_property] && typeof _acl[name][_property] === 'object' && _acl[name][_property][S_TYPE] === S_CLASS)) {
                continue;
              }
              // class property
              let flattenName = name + ',' + _property;
              if (!_acl[flattenName]) {
                _acl[flattenName] = _acl[name][_property];
              }
            }
          }
        }
      }
    }
    static getGlobalPolicy(acl) {
      return Reflect.has(acl, S_GLOBAL) ? acl[S_GLOBAL] : acl[S_DEFAULT];
    }
    static getModulePolicy(acl) {
      return Reflect.has(acl, S_MODULE) ? acl[S_MODULE] : acl[S_DEFAULT];
    }
    static getApplyAcl(acl) {
      const globalPolicy = this.getGlobalPolicy(acl);
      const modulePolicy = this.getModulePolicy(acl);
      function applyAcl(name, isStatic, isObject, property, opType, context, normalizedThisArg, normalizedArgs, hookArgs) {
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
          let cursor;
          let index;
          let prevIndex;
          let path;
          let length = context.length;
          let result;
    
          if (context[0] === '/' && (cursor = prefixedModuleContexts[''])) {
            index = prevIndex = 1;
            while (index < length) {
              index = context.indexOf('/', prevIndex); // next slash
              if (index === -1) {
                index = length;
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
            if (result) {
              context = contextNormalizer[context] = result; // cache the result
            }
          }
    
          if (!result) {
            result = S_DEFAULT;
            index = prevIndex = 0;
            cursor = prefixedContexts;
            while (index < length) {
              index = context.indexOf(',', prevIndex); // next comma
              if (index === -1) {
                index = length;
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
        }
        arguments[5] = context; // Note: In strict mode, function parameters are not bound to their corresponding elements of arguments
        //context = _context ? context : S_DEFAULT;
        isGlobal = isGlobalScopeObject.has(name);
        _acl = name
          ? name === 'Object' && isObject
            ? acl[S_DEFAULT]
            : Reflect.has(acl, name)
              ? acl[name]
              : (tmp = _globalMethods.split(name)).length === 1
                ? property === S_MODULE
                  ? modulePolicy
                  : globalPolicy // acl[S_GLOBAL] for a real global property
                : tmp.length === 2
                  ? Reflect.has(acl, tmp[0])
                    ? acl[tmp[0]][S_TYPE] === S_NAMESPACE
                      ? Reflect.has(acl[tmp[0]], tmp[1])
                        ? (acl[name] = acl[tmp[0]][tmp[1]])
                        : Reflect.has(acl[tmp[0]], S_DEFAULT)
                          ? acl[tmp[0]][S_DEFAULT]
                          : modulePolicy[S_DEFAULT]
                      : modulePolicy[S_DEFAULT]
                    : modulePolicy[S_DEFAULT]
                  : globalPolicy
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
              case S_MODULE:
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
                    ? isGlobal
/* @ifndef unchainAcl */
                      ? _acl[property] instanceof Object && Reflect.has(_acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                      ? _acl[property] && typeof _acl[property] === 'object' && Reflect.has(_acl[property], S_OBJECT)
/* @endif */
                        ? _acl[property][S_OBJECT]
                        : _acl[property]
                      : _acl[property]
                    : Reflect.has(_acl, context)
                      ? context === S_DEFAULT
                        ? isGlobal
                          ? Reflect.has(acl, property)
/* @ifndef unchainAcl */
                            ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                            ? acl[property] && typeof acl[property] === 'object' && Reflect.has(acl[property], S_OBJECT)
/* @endif */
                              ? acl[property][S_OBJECT]
                              : acl[property]
                            : acl[S_GLOBAL]
                          : _acl[context]
                        : _acl[context]
                      : isGlobal
                        ? Reflect.has(acl, property)
/* @ifndef unchainAcl */
                          ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                          ? acl[property] && typeof acl[property] === 'object' && Reflect.has(acl[property], S_OBJECT)
/* @endif */
                            ? acl[property][S_OBJECT]
                            : acl[property]
                          : acl[S_GLOBAL]
                        : _acl[S_DEFAULT];
                  if (typeof _acl === 'object') {
                    _acl = Reflect.has(_acl, S_OBJECT)
                      ? typeof _acl[S_OBJECT] === 'object'
                        ? Reflect.has(_acl[S_OBJECT], context)
                          ? _acl[S_OBJECT][context]
                          : _acl[S_OBJECT][S_DEFAULT]
                        : _acl[S_OBJECT]
                      : Reflect.has(_acl, context)
                        ? _acl[context]
                        : typeof _acl[S_DEFAULT] === 'object'
                          ? Reflect.has(_acl[S_DEFAULT], context)
                            ? _acl[S_DEFAULT][context]
                            : _acl[S_DEFAULT][S_DEFAULT]
                          : _acl[S_DEFAULT];
                  }
                  break;
                case 'object':
                  if (Array.isArray(property)) {
                    tmp = [];
                    for (_property of property) {
                      __acl = Reflect.has(_acl, property)
                        ? isGlobal
/* @ifndef unchainAcl */
                          ? _acl[property] instanceof Object && Reflect.has(_acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                          ? _acl[property] && typeof _acl[property] === 'object' && Reflect.has(_acl[property], S_OBJECT)
/* @endif */
                            ? _acl[property][S_OBJECT]
                            : _acl[property]
                          : _acl[property]
                        : Reflect.has(_acl, context)
                          ? context === S_DEFAULT
                            ? isGlobal
                              ? Reflect.has(acl, property)
/* @ifndef unchainAcl */
                                ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                                ? acl[property] && typeof acl[property] === 'object' && Reflect.has(acl[property], S_OBJECT)
/* @endif */
                                  ? acl[property][S_OBJECT]
                                  : acl[property]
                                : acl[S_GLOBAL]
                              : _acl[context]
                            : _acl[context]
                          : isGlobal
                            ? Reflect.has(acl, property)
/* @ifndef unchainAcl */
                              ? acl[property] instanceof Object && Reflect.has(acl[property], S_OBJECT)
/* @endif */
/* @ifdef unchainAcl */
                              ? acl[property] && typeof acl[property] === 'object' && Reflect.has(acl[property], S_OBJECT)
/* @endif */
                                ? acl[property][S_OBJECT]
                                : acl[property]
                              : acl[S_GLOBAL]
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
        SWITCH_ACL:
        switch (typeof _acl) {
        case 'string':
          if (_acl[opTypeMap[opType]] === opType) {
            return true;
          }
          break;
        case 'object':
          tmp = opTypeMap[opType];
          for (__acl of _acl) {
            switch (typeof __acl) {
            case 'string':
              if (__acl[tmp] !== opType) {
                break SWITCH_ACL;
              }
              break;
            case 'function':
              if (!__acl(normalizedThisArg, normalizedArgs, arguments, hookArgs, applyAcl)) {
                break SWITCH_ACL;
              }
              break;
            }
          }
          return true;
        case 'function':
          if (_acl(normalizedThisArg, normalizedArgs, arguments, hookArgs, applyAcl)) {
            return true;
          }
          break;
        case 'undefined':
        default:
          break;
        }
        // Permission Denied
        if (!normalizedArgs.result) {
          normalizedArgs.result = [...arguments];
        }
        return false;
      }
      return applyAcl;
    }
    static get tagToElementClass() {
      return { // from w3schools.com - may be incomplete
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
    }
    static protectGlobalVariableAcl(acl, list) {
      list.forEach(n => {
        Object.assign(acl, { [n]: '---' });
        Object.assign(acl[mainGlobalObjectName], { [n]: '---' });
      });
    }
    static get detectName() {
      const detectName = function detectName(target, boundParameters) {
        let prototype = target;
        let ctor = null;
        let isStatic = false;
        let isObject = true;
        let name;
        let bound = false;
        if (boundParameters && target === boundParameters._normalizedThisArg) {
          ctor = target ? target.constructor : null;
          bound = true;
        }
        else {
          try {
            switch (typeof target) {
            case 'object':
              if (target === null) {
                break;
              }
              name = _globalObjects.get(target);
              if (name) {
                isStatic = true;
                break;
              }
              ctor = target.constructor;
              if (typeof ctor === 'function' && Object.getPrototypeOf(target) === ctor.prototype) {
                break;
              }
              else if (typeof ctor === 'function' && target === ctor.prototype) {
                isObject = false;
                break;
              }
              else if (ctor && ctor !== Object) {
                ctor = null;
                try {
                  CTOR_LOOP:
                  while (!ctor) {
                    while (!_hasOwnProperty.call(prototype, 'constructor')) {
                      prototype = Object.getPrototypeOf(prototype);
                      name = _globalObjects.get(prototype);
                      if (name) {
                        isStatic = true;
                        isObject = false;
                        break CTOR_LOOP;
                      }
                    }
                    ctor = prototype.constructor;
                    if (ctor && ctor.prototype === prototype) {
                      break;
                    }
                    else {
                      ctor = null;
                      prototype = Object.getPrototypeOf(prototype);
                      name = _globalObjects.get(prototype);
                      if (name) {
                        isStatic = true;
                        isObject = false;
                        break;
                      }
                    }
                  }
                }
                catch (error) {
                }
              }
              break;
            case 'function':
              name = _globalObjects.get(target); // detect the global class/function name first
              if (name) {
                isStatic = true;
                break;
              }
              // detect its constructor
              // Note: super classes are not tracked since they are tracked in Policy.defaultAcl(), etc.
              ctor = target.constructor; // Most likely ctor === Function
              if (typeof ctor === 'function' && Object.getPrototypeOf(target) === ctor.prototype) {
                break;
              }
              else {
                // rare case
                ctor = null;
                try {
                  while (!ctor) {
                    while (!_hasOwnProperty.call(prototype, 'constructor')) {
                      prototype = Object.getPrototypeOf(prototype);
                    }
                    ctor = prototype.constructor;
                    if (ctor && ctor.prototype === prototype) {
                      break;
                    }
                    else {
                      ctor = null; // fake constructor
                      prototype = Object.getPrototypeOf(prototype);
                    }
                  }
                }
                catch (error) {
                }
              }
              break;
            case 'boolean':
            case 'number':
            case 'string':
            case 'symbol':
            case 'bigint':
              ctor = target.constructor;
              isObject = true; // target instanceof ctor
              break;
            case 'undefined':
            default:
              ctor = null;
              break;
            }
          }
          catch (e) {
            ctor = null;
          }
        }
        if (name) {
          return [name, isStatic, isObject];
        }
        if (ctor) {
          name = _globalObjects.get(ctor);
          if (name) {
            if (bound) {
              if (target.hasOwnProperty('constructor')) {
                isObject = false;
              }
            }
            else {
              if (ctor.prototype === target) {
                isObject = false;
              }
            }
          }
          else {
            if (ctor.prototype === target) {
              // TODO: function prototype object of a non-global function is mistreated as an instance object for ctor, which allows writing of prototype object properties
              //isObject = false;
            }
          }
        }
        return [name, isStatic, isObject];
      }
      return detectName;
    }
    static get operatorNormalizer() {
      return {
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
        'm': 'm',
        'm()': 'm()',
        'mnew': 'm()',
        'm++': 'm=',
        '++m': 'm=',
        'm--': 'm=',
        '--m': 'm=',
        'mtypeof': 'm',
        'm.=': 'm.=',
        'm=': 'm=v',
        'm+=': 'm=',
        'm-=': 'm=',
        'm*=': 'm=',
        'm/=': 'm=',
        'm%=': 'm=',
        'm**=': 'm=',
        'm<<=': 'm=',
        'm>>=': 'm=',
        'm>>>=': 'm=',
        'm&=': 'm=',
        'm^=': 'm=',
        'm|=': 'm=',
      };
    }
    static get targetNormalizer() {
      return {
        'f': 'xtf', // thisArg may not be this object for f
        'n': 'xfN',
        '.': 'rtp',
        '*': 'rt*',
        '=': 'wtpv',
        'd': 'Wtp',
        'm': 'rt-',
        'm()': 'xt-',
        'm=': 'wt-',
        'm.=': 'wt-c',
        'm=v': 'wt-v',
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
            get: 'r01v',
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
    }
    static getTargetNormalizerMap(targetNormalizer) {
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
      return targetNormalizerMap;
    }
    static getTargetNormalizerMapObject(operatorNormalizer, targetNormalizer) {
      const targetNormalizerMapObject = new Map();
      for (let op in operatorNormalizer) {
        targetNormalizerMapObject.set(op, targetNormalizer[operatorNormalizer[op]]);
      }
      return targetNormalizerMapObject;
    }
    static getIsSuperOperator(operatorNormalizer) {
      const isSuperOperator = new Map();
      for (let op in operatorNormalizer) {
        isSuperOperator.set(op, op.indexOf('s') >= 0);
      }
      return isSuperOperator;
    }
    /*
      resolve module paths via hook.parameters.importMapper(specifier, baseURI)
      
      Notes:
       - No resolution if hook.parameters.importMapper is not configured
         - hook.parameters.importMapper is a wrapper function of the Import Maps reference implementation
       - baseURI is hook.parameters.baseURI
       - Import Maps JSON is set in hook.parameters.importMapsJson as a string
         - Picking up from the native import maps script tag has not been implemented yet
       - A trivial fork of the Import Maps reference implementation is used for resolution
         - GitHub repository: https://github.com/t2ym/import-maps/tree/browserify/reference-implementation/lib
         - package.json at the top of the repository is added so that NPM can fetch the package from GitHub
  
      Resolutions:
      
       - Type: bare specifiers
  
          "lit-html": "@lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js": "@lit-html"
          "lit-html/": "@lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js": "@lit-html"
          "lit-html/*": "@lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/*": "@lit-html"
          "lit-html,*": "@lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js,*": "@lit-html"
          "lit-html/,*": "@lit-html" -> "/components/thin-hook/demo/node_modules/lit-html/lit-html.js,*": "@lit-html"
  
       - Type: relative paths from hook.parameters.baseURI
  
          "./modules/module1.js": "@module1" -> "/components/thin-hook/demo/modules/module1.js": "@module1"
          "./modules/module1.js,*": "@module1" -> "/components/thin-hook/demo/modules/module1.js,*": "@module1"
  
    */
    static resolveBareSpecifierContextNormalizer(contextNormalizer) {
      if (hook.parameters.importMapper) {
        // resolve bare specifiers in context normalizer
        let paths;
        let resolved;
        for (let c in contextNormalizer) {
          if (c.startsWith('https://') || c.startsWith('/')) {
            continue; // skip already resolved specifiers
          }
          paths = c.split(',');
          if (paths.length === 1) {
            if (c.endsWith('/*')) {
              // bare-specifier/*
              resolved = hook.parameters.importMapper(c + '.js', hook.parameters.baseURI).replace(/\*\.js$/, '*');
            }
            else if (c.endsWith('/')) {
              // bare-specifier/
              resolved = hook.parameters.importMapper(c.substring(0, c.length - 1), hook.parameters.baseURI);
            }
            else {
              // bare-specifier
              resolved = hook.parameters.importMapper(c, hook.parameters.baseURI);
            }
          }
          else {
            // bare-specifier,anything,*
            if (paths[0].endsWith('/')) {
              paths[0] = hook.parameters.importMapper(paths[0].substring(0, paths[0].length - 1), hook.parameters.baseURI);
            }
            else {
              paths[0] = hook.parameters.importMapper(paths[0], hook.parameters.baseURI);
            }
            resolved = paths.join(',');
          }
          contextNormalizer[resolved] = contextNormalizer[c];
          delete contextNormalizer[c];
        }
      }
    }
    /*
      Prefixed Module Contexts object:
        {
          "": { // root
            "components": {
              "thin-hook": {
                "demo": {
                  "node_modules": {
                    "lit-html": {
                      "*": "@lit-html",
                    },
                    "lit-element": {
                      "*": "@lit-element",
                    },
                  },
                },
              },
            },
          },
        };

      Notes:
      - Prefixed module context must end with '/*' like this:
        '/some/module-name/*'
    */
    static getPrefixedModuleContexts(contextNormalizer) {
      const prefixedModuleContexts = Object.create(null);
      for (let c in contextNormalizer) {
        let paths = c.split('/');
        let cursor = prefixedModuleContexts;
        if (paths.length > 1 && paths[0] === '' && paths[paths.length - 1] === '*') {
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
      return prefixedModuleContexts;
    }
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
    static getPrefixedContexts(contextNormalizer) {
      const prefixedContexts = Object.create(null);
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
      return prefixedContexts;
    }
    static get opTypeMap() {
      return {
        r: 0, w: 1, x: 2, R: 3, W: 4,
      };
    }
    static get isGlobalScopeObject() {
      const isGlobalScopeObject = new Map;
      [ 'window', 'self', '_global', 'frames', 'parent', 'top' ].forEach(g => {
        isGlobalScopeObject.set(g, true);
      });
      return isGlobalScopeObject;
    }
    static _mergePolicyModule({ contextNormalizer, acl }, source /* { contextNormalizer: {...}, acl: {...} } */) {
      // merge contextNormalizer by just copying and overwriting properties
      Object.assign(contextNormalizer, source.contextNormalizer);
      // merge acl by Policy.mergeAcl()
      Policy.mergeAcl(acl, source.acl);
    }
    static mergePolicyModules(target /* { contextNormalizer, acl } */, ...sources) {
      for (let source of sources) {
        Policy._mergePolicyModule(target, source);
      }
    }
  };