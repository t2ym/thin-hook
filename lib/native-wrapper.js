/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook, preprocess) {

  const _global = typeof window === 'object' ? window : typeof global === 'object' ? global : typeof self === 'object' ? self : this;
  // TODO: automate generation of these objects
  const _native = {
    Function: _global.Function,
    eval: _global.eval,
    setTimeout: _global.setTimeout,
    setInterval: _global.setInterval,
    HTMLScriptElement: _global.HTMLScriptElement,
    Node: _global.Node,
    Element: _global.Element,
    HTMLAnchorElement: _global.HTMLAnchorElement,
    HTMLAreaElement: _global.HTMLAreaElement,
    Document: typeof document === 'object'
      ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor.prototype, 'write')
        ? Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor
        : Object.getPrototypeOf(document).constructor
      : null
  };
  const _nativeMethods = {
    Node: {
      static: {},
      proto: {
        textContent: _native.Node ? Object.getOwnPropertyDescriptor(_native.Node.prototype, 'textContent') : {}
      }
    },
    Element: {
      static: {},
      proto: {
        innerHTML: _native.Element ? Object.getOwnPropertyDescriptor(_native.Element.prototype, 'innerHTML') : {},
        setAttribute: _native.Element ? Object.getOwnPropertyDescriptor(_native.Element.prototype, 'setAttribute') : {}
      }
    },
    HTMLAnchorElement: {
      static: {},
      proto: {
        href: _native.HTMLAnchorElement ? Object.getOwnPropertyDescriptor(_native.HTMLAnchorElement.prototype, 'href') : {}
      }
    },
    HTMLAreaElement: {
      static: {},
      proto: {
        href: _native.HTMLAreaElement ? Object.getOwnPropertyDescriptor(_native.HTMLAreaElement.prototype, 'href') : {}
      }
    },
    HTMLScriptElement: {
      static: {},
      proto: {
        type: _native.HTMLScriptElement ? Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'type') : {}
      }
    },
    Document: {
      static: {},
      proto: {
        write: _native.Document ? Object.getOwnPropertyDescriptor(_native.Document.prototype, 'write') : {}
      }
    }
  }
  const _freeze = {
    Function: { static: [], proto: [ 'apply', 'call', 'bind', 'arguments' ] }
  };

  function hookFunctionArguments(hookName = preprocess.getHookNameForServiceWorker(), initialContext = [['Function', {}]], contextGenerator = preprocess.getContextGeneratorName(), args, isGenerator = false) {
    if (args.length >= 1) {
      let params = args.slice(0, args.length - 1).join(',');
      let original = args[args.length - 1];
      let match = original.match(new RegExp('^[\s]*(\'use strict\';)?[\s]*void ?\'params=([^\']*)\';[\s]*void ?\'original=([^\']*)\''));
      let skip = false;
      if (match) {
        if (match[2] === params) {
          skip = true;
        }
        else {
          original = decodeURIComponent(atob(match[3]));
        }
      }
      if (!skip) {
        let context = initialContext[0][0];
        let hooked = hook('(function ' + (isGenerator ? '*' : '') + '(' + (args.length ? args.slice(0, args.length - 1).join(',') : '') + ') {' +
          original + '})',
          hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
          preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { arguments: true });
        let useStrict = hooked.indexOf('\'use strict\';');
        let firstReturn = isGenerator ? hooked.indexOf('yield*') : hooked.indexOf('return ');
        hooked = (useStrict >= 0 && useStrict < firstReturn
          ? '\'use strict\';' + 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';'
          : 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';') +
          hooked.substr(firstReturn).replace(/\n/g, '\0').replace(/^(.*)[^\}]*\}[^\}]*$/m, '$1').replace(/\0/g, '\n');
        //console.warn('hookFunctionArguments: context = ' + context + '\noriginal = \n' + original + '\nhooked = \n' + hooked);
        args = args.slice();
        args[args.length - 1] = hooked;
      }
    }
    return args;
  }

  function hookFunction(hookName = preprocess.getHookNameForServiceWorker(), initialContext = [['Function', {}]], contextGenerator = preprocess.getContextGeneratorName()) {
    let f = function Function(...args) {
      if (args.length >= 1) {
        let params = args.slice(0, args.length - 1).join(',');
        let original = args[args.length - 1];
        let match = original.match(new RegExp('^[\s]*(\'use strict\';)?[\s]*void ?\'params=([^\']*)\';[\s]*void ?\'original=([^\']*)\''));
        let skip = false;
        if (match) {
          if (match[2] === params) {
            skip = true;
          }
          else {
            original = decodeURIComponent(atob(match[3]));
          }
        }
        if (!skip) {
          let context = initialContext[0][0];
          let hooked = hook('(function (' + (args.length ? args.slice(0, args.length - 1).join(',') : '') + ') {' +
            original + '})',
            hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
            preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { arguments: true });
          let useStrict = hooked.indexOf('\'use strict\';');
          let firstReturn = hooked.indexOf('return ');
          hooked = (useStrict >= 0 && useStrict < firstReturn
            ? '\'use strict\';' + 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';'
            : 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';') +
            hooked.substr(firstReturn).replace(/\n/g, '\0').replace(/^(.*)[^\}]*\}[^\}]*$/m, '$1').replace(/\0/g, '\n');
          //console.warn('hookFunction: context = ' + context + '\noriginal = \n' + original + '\nhooked = \n' + hooked);
          args = args.slice();
          args[args.length - 1] = hooked;
        }
      }
      return Reflect.construct(_native.Function, args);
    }
    Object.defineProperty(f, Symbol.species, { value: _native.Function });
    Object.defineProperty(f, Symbol.hasInstance, { value: function (instance) {
      return instance instanceof _native.Function;
    }});
    Object.setPrototypeOf(f, _native.Function);
    Object.setPrototypeOf(f.prototype, _native.Function.prototype);
    return f;
  }

  function hookEval(hookName, initialContext = [['eval', {}]], contextGenerator, initialScope = {}) {
    // Note: In no-hook scripts, hooked _global.eval is bound to the global scope, not the local one
    //       To work aournd this limitation, attach the default evalWrapper explicitly in the second argument like this:
    //       eval(script, (script, eval) => eval(script))
    //       The default argument explicitly uses _eval (not eval) to force the evaluation bound to the global scope
    let _eval = function (script, evalWrapper = (script, _eval) => _eval(script)) {
      if (!evalWrapper || typeof evalWrapper !== 'function' ||
          (evalWrapper.toString().replace(/ /g, '') !== '(script,eval)=>eval(script)' &&
           evalWrapper.toString().replace(/ /g, '') !== '(script,_eval)=>_eval(script)')) {
        console.error('hook.eval: invalid eval wrapper function "' + evalWrapper.toString() + '"');
        evalWrapper = (script, _eval) => _eval(script);
        script = '/* invalidated eval script due to invalid eval wrapper function */';
      }
      else if (typeof script === 'string') {
        script = hook(script,
          hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
          preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), initialScope);
      }
      return _global[hookName](evalWrapper, this, [script, _native.eval], 'eval');
    }
    Object.defineProperty(_eval, 'name', { configurable: false, writable: false, enumerable: false, value: 'eval' });
    return _eval;
  }

  function hookSetTimeout(hookName, initialContext = [['setTimeout', {}]], contextGenerator) {
    return function setTimeout(...args) {
      if (typeof args[0] === 'string') {
        args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
      }
      return _global[hookName](_native.setTimeout, _global, args, 'setTimeout');
    }
  }

  function hookSetInterval(hookName, initialContext = [['setInterval', {}]], contextGenerator) {
    return function setInterval(...args) {
      if (typeof args[0] === 'string') {
        args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
      }
      return _global[hookName](_native.setInterval, _global, args, 'setInterval');
    }
  }

  const jsMimeTypes = [
    '',
    'application/ecmascript',
    'application/javascript',
    'application/x-ecmascript',
    'application/x-javascript',
    'text/ecmascript',
    'text/javascript',
    'text/javascript1.0',
    'text/javascript1.1',
    'text/javascript1.2',
    'text/javascript1.3',
    'text/javascript1.4',
    'text/javascript1.5',
    'text/jscript',
    'text/livescript',
    'text/x-ecmascript',
    'text/x-javascript',
    'module'
  ];

  function hookNode(hookName, initialContext = [['Node', {}]], contextGenerator) {
    if (_native.Node && Object.getOwnPropertyDescriptor(_native.Node.prototype, 'textContent').configurable) {
      Object.defineProperty(_native.Node.prototype, 'textContent', {
        configurable: false,
        enumerable: _nativeMethods.Node.proto.textContent.enumerable,
        get: _nativeMethods.Node.proto.textContent.get,
        set: function (value) {
          if (this instanceof _native.HTMLScriptElement) {
            if (jsMimeTypes.indexOf(this.type ? this.type.toLowerCase() : '') >= 0) {
              // TODO: import/export syntax support for type=module
              value = hook(value, hookName, initialContext, contextGenerator);
            }
          }
          return _global[hookName](_nativeMethods.Node.proto.textContent.set, this, [value], this.constructor.name + ',set textContent');
        }
      });
    }
    return _native.Node;
  }

  function hookElement(hookName, initialContext = [['Element', {}]], contextGenerator) {
    if (_native.Element && Object.getOwnPropertyDescriptor(_native.Element.prototype, 'setAttribute').configurable) {
      Object.defineProperty(_native.Element.prototype, 'setAttribute', {
        configurable: false,
        enumerable: _nativeMethods.Element.proto.setAttribute.enumerable,
        writable: false,
        value: function setAttribute(name, value) {
          let doHook = false;
          let _name = name ? name.toLowerCase() : '';
          let _value = typeof value === 'string' ? value.trim() : '';
          switch (_name) {
          case 'type':
            if (this instanceof _native.HTMLScriptElement &&
                jsMimeTypes.indexOf(_value.toLowerCase()) >= 0 &&
                jsMimeTypes.indexOf(this.type ? this.type.toLowerCase() : '') < 0) {
              if (this.textContent.indexOf(hookName) < 0) {
                doHook = true;
              }
            }
            break;
          case 'href':
            if (_value.startsWith('javascript:')) {
              value = 'javascript:' +
                hook('(() => { ' + _value.substr(11) + ' })()', hookName, [[ this.constructor.name + ',setAttribute,' + _name, {}]], contextGenerator);
            }
            break;
          default:
            if (_name.match(/^on[a-z]{1,}$/)) {
              value = 'return ' +
                hook('(() => { ' + value + ' })()', hookName, [[ this.constructor.name + ',setAttribute,' + _name, {}]], contextGenerator);
            }
            break;
          }
          let result = _global[hookName](_nativeMethods.Element.proto.setAttribute.value, this, [name, value], this.constructor.name + ',setAttribute');
          if (doHook) {
            this.textContent = this.textContent;
          }
          return result;
        }
      });
    }
    return _native.Element;
  }

  function hookHTMLScriptElement(hookName, initialContext = [['HTMLScriptElement', {}]], contextGenerator) {
    hookNode(hookName, initialContext, contextGenerator); // Node.textContent
    hookElement(hookName, initialContext, contextGenerator); // Element.setAttribute('type')
    if (_native.HTMLScriptElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'type').configurable) {
      Object.defineProperty(_native.HTMLScriptElement.prototype, 'type', {
        configurable: false,
        enumerable: _nativeMethods.HTMLScriptElement.proto.type.enumerable,
        get: _nativeMethods.HTMLScriptElement.proto.type.get,
        set: function (value) {
          let doHook = false;
          if (this instanceof _native.HTMLScriptElement &&
              jsMimeTypes.indexOf(value ? value.toLowerCase() : '') >= 0 &&
              jsMimeTypes.indexOf(this.type ? this.type.toLowerCase() : '') < 0) {
            if (this.textContent.indexOf(hookName) < 0) {
              doHook = true;
            }
          }
          let result = _global[hookName](_nativeMethods.HTMLScriptElement.proto.type.set, this, [value], this.constructor.name + ',set type');
          if (doHook) {
            this.textContent = this.textContent;
          }
          return result;
        }
      });
    }
    return _native.HTMLScriptElement;
  }

  function hookHrefProperty(hookName, target, contextGenerator) {
    if (_native[target] && Object.getOwnPropertyDescriptor(_native[target].prototype, 'href').configurable) {
      Object.defineProperty(_native[target].prototype, 'href', {
        configurable: false,
        enumerable: _nativeMethods[target].proto.href.enumerable,
        get: _nativeMethods[target].proto.href.get,
        set: function href(value) {
          let doHook = false;
          let _value = typeof value === 'string' ? value.trim() : '';
          if (_value.startsWith('javascript:')) {
            value = 'javascript:' +
              hook('(() => { ' + _value.substr(11) + ' })()', hookName, [[ this.constructor.name + ',set href', {}]], contextGenerator);
          }
          return _global[hookName](_nativeMethods[target].proto.href.set, this, [value], this.constructor.name + ',set href');
        }
      });
    }
    return _native[target];
  }

  function hookHTMLAnchorElement(hookName, initialContext = [['HTMLAnchorElement', {}]], contextGenerator) {
    return hookHrefProperty(hookName, 'HTMLAnchorElement', contextGenerator);
  }

  function hookHTMLAreaElement(hookName, initialContext = [['HTMLAreaElement', {}]], contextGenerator) {
    return hookHrefProperty(hookName, 'HTMLAreaElement', contextGenerator);
  }

  function hookDocument(hookName, initialContext = [['Document', {}]], contextGenerator, calculateScriptOffset = false) {
    if (_native.Document && Object.getOwnPropertyDescriptor(_native.Document.prototype, 'write').configurable) {
      Object.defineProperty(_native.Document.prototype, 'write', {
        configurable: false,
        enumerable: _nativeMethods.Document.proto.write.enumerable,
        writable: false,
        value: function write(markup) {
          let scriptOffset = 0;
          if (calculateScriptOffset) {
            for (let i = 0; i < this.childNodes.length; i++) {
              let node = this.childNodes[i];
              let innerHTML = node.innerHTML;
              let textContent = node.textContent;
              if (innerHTML) {
                scriptOffset += innerHTML.length;
              }
              else if (textContent) {
                scriptOffset += textContent.length;
                if (node.nodeType === node.COMMENT_NODE) {
                  scriptOffset += 7; //'<!---->'.length;
                }
              }
            }
          }
          let processed = preprocess._preprocessHtml(
            markup,
            hookName,
            new URL(this.location),
            _global.location.hostname !== this.location.hostname,
            contextGenerator,
            [],
            false,
            true,
            scriptOffset,
            preprocess.getHookProperty());
          return _global[hookName](_nativeMethods.Document.proto.write.value, this, [processed], this.constructor.name + ',write');
        }
      });
    }
    return _native.Document;
  }

  // hook.global
  let _globalPrototypes = [];
  {
    let o = _global;
    while (o) {
      _globalPrototypes.push(o);
      o = Object.getPrototypeOf(o);
    }
  }

  function hookGlobal(hookCallback, context, name, type) {
    let proxy = _global;
    let status = 'undefined';
    let descriptor;
    let proxyDescriptor;
    let newProxyDescriptor;
    let _hookPrefix = preprocess.getHookPrefix();
    let i;
    for (i = 0; !descriptor && i < _globalPrototypes.length; i++) {
      descriptor = Object.getOwnPropertyDescriptor(_globalPrototypes[i], name);
    }
    if (descriptor) {
      status = 'var';
    }
    proxyDescriptor = Object.getOwnPropertyDescriptor(proxy, _hookPrefix + name);
    if (!proxyDescriptor) {
      newProxyDescriptor = {
        configurable: false,
        enumerable: false,
        get: function () {
          return hookCallback('.', _global, [name], context);
        },
        set: function (value) {
          hookCallback('=', _global, [name, value], context);
        }
      };
    }

    switch (status + '-' + type) {
    case 'undefined-get':
      throw new ReferenceError(name + ' is not defined');
      break;
    case 'undefined-var':
    case 'undefined-function':
    case 'undefined-let':
    case 'undefined-class':
      hookCallback('()', Object, [ 'defineProperty', [ _global, name, { configurable: false, enumerable: true, writable: true, value: undefined } ] ], context);
      if (newProxyDescriptor) {
        Object.defineProperty(proxy, _hookPrefix + name, newProxyDescriptor);
      }
      break;
    case 'undefined-set':
      // implicit definition
      hookCallback('()', Object, [ 'defineProperty', [ _global, name, { configurable: true, enumerable: true, writable: true, value: undefined } ] ], context);
      if (newProxyDescriptor) {
        Object.defineProperty(proxy, _hookPrefix + name, newProxyDescriptor);
      }
      break;
    case 'undefined-const':
      Object.defineProperty(proxy, _hookPrefix + name, {
        configurable: false,
        enumerable: false,
        get: function () {
          return hookCallback('.', _global, [name], context);
        },
        set: function (value) {
          hookCallback('=', _global, [name, value], context);
          hookCallback('()', Object, [ 'defineProperty', [ _global, name, { configurable: false, enumerable: true, writable: false, value: value } ] ], context);
        }
      });
      break;
    case 'undefined-typeof':
    case 'var-var':
    case 'var-function':
    case 'var-get':
    case 'var-set':
    case 'var-typeof':
      if (newProxyDescriptor) {
        Object.defineProperty(proxy, _hookPrefix + name, newProxyDescriptor);
      }
      break;
    case 'var-let':
    case 'var-const':
    case 'var-class':
      throw new SyntaxError('Identifier \'' + name + '\' has already been declared status = ' + status + ' type = ' + type);
      break;
    case 'undefined-delete':
    case 'var-delete':
      proxy = hookCallback('delete', _global, [name], context);
      break;
    default:
      console.error('hook.global: unknown status-type pair', status, type);
      break;
    }
    return proxy;
  }

  function _freezeProperties(target) {
    function _freezeProperty(target, prop) {
      let desc = Object.getOwnPropertyDescriptor(target, prop);
      if (desc && desc.configurable) {
        desc.configurable = false;
        if (desc.writable) {
          desc.writable = false;
        }
        Object.defineProperty(target, prop, desc);
      }
    }
    _freeze[target.name] && _freeze[target.name].static && _freeze[target.name].static.forEach(prop => {
      _freezeProperty(target, prop);
    });
    _freeze[target.name] && _freeze[target.name].proto && _freeze[target.name].proto.forEach(prop => {
      _freezeProperty(target.prototype, prop);
    });
  }

  function hookPlatform(...targets) {
    let platform = _global;
    targets.forEach(target => {
      switch (target.name) {
      case 'Function':
        Object.getOwnPropertyNames(_native[target.name]).forEach(prop => {
          let desc = Object.getOwnPropertyDescriptor(_native[target.name], prop);
          if (desc) {
            Object.defineProperty(target, prop, desc);
          }
        });
        Object.defineProperty(target, 'toString',
          { value: function toString() { return 'function ' + target.name + '() { [native code] }' },
            configurable: false, enumerable: false, writable: false });
        Object.defineProperty(_native[target.name].prototype, 'constructor',
          { value: target, configurable: false, enumerable: false, writable: false });
        _freezeProperties(target);
        Object.defineProperty(platform, target.name,
          { value: target, configurable: false, enumerable: false, writable: false });
        break;
      case 'setTimeout':
      case 'setInterval':
        Object.defineProperty(target, 'toString',
          { value: function toString() { return 'function ' + target.name + '() { [native code] }' },
            configurable: false, enumerable: false, writable: false });
        _freezeProperties(target);
        Object.defineProperty(platform, target.name,
          { value: target, configurable: false, enumerable: false, writable: false });
        break;
      case 'HTMLScriptElement':
        _freezeProperties(target);
        Object.defineProperty(platform, target.name,
          { value: target, configurable: false, enumerable: false, writable: false });
        break;
      case 'eval':
        _freezeProperties(target);
        Object.defineProperty(platform, target.name,
          { value: target, configurable: false, enumerable: false, writable: false });
        break;
      case 'write':
      default:
        break;
      }
    });
  }

  return {
    hook: hookPlatform,
    global: hookGlobal,
    Function: hookFunction,
    FunctionArguments: hookFunctionArguments,
    eval: hookEval,
    setTimeout: hookSetTimeout,
    setInterval: hookSetInterval,
    Node: hookNode,
    Element: hookElement,
    HTMLAnchorElement: hookHTMLAnchorElement,
    HTMLAreaElement: hookHTMLAreaElement,
    HTMLScriptElement: hookHTMLScriptElement,
    Document: hookDocument,
  };
}