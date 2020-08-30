/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  // Moved from hook-native-api.js
  const enableDebugging /* @echo EQUAL */ /* @echo enableDebugging */;
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
  /* #include wildcardWhitelist.js */
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
    const _Infinity = Infinity;
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
                    _Error.stackTraceLimit = _Infinity;
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
                      _Error.stackTraceLimit = _Infinity;
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
                      _Error.stackTraceLimit = _Infinity;
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
                        _Error.stackTraceLimit = _Infinity;
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
                      _Error.stackTraceLimit = _Infinity;
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
                        _Error.stackTraceLimit = _Infinity;
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