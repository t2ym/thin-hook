/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook, preprocess, he) {
  const _Symbol = Symbol;

  const _global = typeof window === 'object' ? window : typeof global === 'object' ? global : typeof self === 'object' ? self : this;
  // TODO: automate generation of these objects
  const _native = {
    Function: _global.Function,
    GeneratorFunction: (function*(){}).constructor,
    eval: _global.eval,
    setTimeout: _global.setTimeout,
    setInterval: _global.setInterval,
    HTMLScriptElement: _global.HTMLScriptElement,
    HTMLIFrameElement: _global.HTMLIFrameElement,
    HTMLObjectElement: _global.HTMLObjectElement,
    HTMLEmbedElement: _global.HTMLEmbedElement,
    Node: _global.Node,
    Element: _global.Element,
    HTMLAnchorElement: _global.HTMLAnchorElement,
    HTMLAreaElement: _global.HTMLAreaElement,
    Document: typeof document === 'object'
      ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor.prototype, 'write')
        ? Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor
        : Object.getPrototypeOf(document).constructor
      : null,
    importScripts: typeof _global.importScripts === 'function' ? _global.importScripts : undefined,
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
        setAttribute: _native.Element ? Object.getOwnPropertyDescriptor(_native.Element.prototype, 'setAttribute') : {},
        removeAttribute: _native.Element ? Object.getOwnPropertyDescriptor(_native.Element.prototype, 'removeAttribute') : {}
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
        type: _native.HTMLScriptElement ? Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'type') : {},
        src: _native.HTMLScriptElement ? Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'src') : {},
        text: _native.HTMLScriptElement ? Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'text') : {}
      }
    },
    HTMLIFrameElement: {
      static: {},
      proto: {
        srcdoc: _native.HTMLIFrameElement ? Object.getOwnPropertyDescriptor(_native.HTMLIFrameElement.prototype, 'srcdoc') : {},
        src: _native.HTMLIFrameElement ? Object.getOwnPropertyDescriptor(_native.HTMLIFrameElement.prototype, 'src') : {},
        onload: _native.HTMLIFrameElement ? Object.getOwnPropertyDescriptor(_native.HTMLIFrameElement.prototype, 'onload') : {}
      }
    },
    HTMLObjectElement: {
      static: {},
      proto: {
        data: _native.HTMLObjectElement ? Object.getOwnPropertyDescriptor(_native.HTMLObjectElement.prototype, 'data') : {},
      }
    },
    HTMLEmbedElement: {
      static: {},
      proto: {
        src: _native.HTMLEmbedElement ? Object.getOwnPropertyDescriptor(_native.HTMLEmbedElement.prototype, 'src') : {},
      }
    },
    Document: {
      static: {},
      proto: {
        write: _native.Document ? Object.getOwnPropertyDescriptor(_native.Document.prototype, 'write') : {},
        writeln: _native.Document ? Object.getOwnPropertyDescriptor(_native.Document.prototype, 'writeln') : {},
      }
    }
  }
  const _freeze = {
    Function: { static: [], proto: [ 'apply', 'call', 'bind', 'arguments' ] }
  };

  function hookFunctionArguments(hookName = preprocess.getHookNameForServiceWorker(), initialContext = [['Function', {}]], contextGenerator = preprocess.getContextGeneratorName(), args, isGenerator = false, isAsync = false) {
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
        let hooked = hook('(' + (isAsync ? 'async ' : '') + 'function ' + (isGenerator ? '*' : '') + '(' + (args.length ? args.slice(0, args.length - 1).join(',') : '') + ') {' +
          original + '})',
          hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
          preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { arguments: true });
        let useStrict = hooked.indexOf('\'use strict\';');
        let contextMapper = hooked.substring(0, hooked.indexOf(']);') + 3);
        let firstReturn = isGenerator ? hooked.indexOf('yield*') : hooked.indexOf('return ');
        hooked = (useStrict >= 0 && useStrict < firstReturn
          ? '\'use strict\';' + 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';'
          : 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';') +
          contextMapper +
          hooked.substr(firstReturn).replace(/\n/g, '\0').replace(/^(.*)[^\}]*\}[^\}]*$/m, '$1').replace(/\0/g, '\n');
        //console.warn('hookFunctionArguments: context = ' + context + '\noriginal = \n' + original + '\nhooked = \n' + hooked);
        args = args.slice();
        args[args.length - 1] = hooked;
      }
    }
    return args;
  }

  function hookFunction(hookName = preprocess.getHookNameForServiceWorker(), initialContext = [['Function', {}]], contextGenerator = preprocess.getContextGeneratorName(), isGenerator = false, isAsync = false) {
    let f;
    if (isGenerator) {
      f = function GeneratorFunction(...args) {
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
            let hooked = hook('(' + (isAsync ? 'async ' : '') + 'function* (' + (args.length ? args.slice(0, args.length - 1).join(',') : '') + ') {' +
              original + '})',
              hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
              preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { arguments: true });
            let useStrict = hooked.indexOf('\'use strict\';');
            let contextMapper = hooked.substring(0, hooked.indexOf(']);') + 3);
            let firstReturn = hooked.indexOf('yield*');
            hooked = (useStrict >= 0 && useStrict < firstReturn
              ? '\'use strict\';' + 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';'
              : 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';') +
              contextMapper +
              hooked.substr(firstReturn).replace(/\n/g, '\0').replace(/^(.*)[^\}]*\}[^\}]*$/m, '$1').replace(/\0/g, '\n');
            //console.warn('hookFunction: context = ' + context + '\noriginal = \n' + original + '\nhooked = \n' + hooked);
            args = args.slice();
            args[args.length - 1] = hooked;
          }
        }
        return Reflect.construct(_native.GeneratorFunction, args);
      }
      Object.defineProperty(f, Symbol.species, { value: _native.GeneratorFunction });
      Object.defineProperty(f, Symbol.hasInstance, { value: function (instance) {
        return instance instanceof _native.GeneratorFunction;
      }});
      Object.setPrototypeOf(f, _native.GeneratorFunction);
      Object.setPrototypeOf(f.prototype, _native.GeneratorFunction.prototype);
    }
    else {
      f = function Function(...args) {
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
            let hooked = hook('(' + (isAsync ? 'async ' : '') + 'function (' + (args.length ? args.slice(0, args.length - 1).join(',') : '') + ') {' +
              original + '})',
              hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
              preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { arguments: true });
            let useStrict = hooked.indexOf('\'use strict\';');
            let contextMapper = hooked.substring(0, hooked.indexOf(']);') + 3);
            let firstReturn = hooked.indexOf('return ');
            hooked = (useStrict >= 0 && useStrict < firstReturn
              ? '\'use strict\';' + 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';'
              : 'void \'params=' + params + '\';' + 'void \'original=' + btoa(encodeURIComponent(original)) + '\';') +
              contextMapper +
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
    }
    return f;
  }

  function hookEval(hookName, initialContext = [['eval', {}]], contextGenerator, initialScope = {}) {
    // Note: In no-hook scripts, hooked _global.eval is bound to the global scope, not the local one
    //       To work aournd this limitation, attach the default evalWrapper explicitly in the second argument like this:
    //       eval(script, (script, eval) => eval(script))
    //       The default argument explicitly uses _eval (not eval) to force the evaluation bound to the global scope
    let _eval = function (script, evalWrapper = new Function('return (script, _eval) => _eval(script)')()) {
      if (!evalWrapper || typeof evalWrapper !== 'function' ||
          (evalWrapper.toString().replace(/ /g, '') !== '(script,eval)=>eval(script)' &&
           evalWrapper.toString().replace(/ /g, '') !== '(script,_eval)=>_eval(script)')) {
        console.error('hook.eval: invalid eval wrapper function "' + evalWrapper.toString() + '"');
        evalWrapper = (script, _eval) => _eval(script);
        script = '/* invalidated eval script due to invalid eval wrapper function */';
      }
      else if (typeof script === 'string') {
        if (initialScope['$use_strict$']) {
          script = '\'use strict\';' + script;
        }
        // hook may throw exceptions
        script = hook(script,
          hookName, initialContext, contextGenerator, true, preprocess.getHookProperty(), null, false,
          preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), initialScope);
      }
      return _global[hookName](evalWrapper, this, [script, _native.eval], getContextSymbol(_global[hookName], 'eval'));
    }
    Object.defineProperty(_eval, 'name', { configurable: false, writable: false, enumerable: false, value: 'eval' });
    return _eval;
  }

  let contextToSymbols = {};
  function getContextSymbol(hookCallback, context) {
    let symbol;
    if (Reflect.has(contextToSymbols, context)) {
      symbol = contextToSymbols[context];
    }
    else {
      symbol = contextToSymbols[context] = _Symbol();
      hookCallback[symbol] = context;
    }
    return symbol;
  }

  function hookSetTimeout(hookName, initialContext, contextGenerator) {
    return function setTimeout(...args) {
      if (typeof args[0] === 'string') {
        args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
      }
      return _global[hookName](_native.setTimeout, _global, args, getContextSymbol(_global[hookName], 'setTimeout'));
    }
  }

  function hookSetInterval(hookName, initialContext = [['setInterval', {}]], contextGenerator) {
    return function setInterval(...args) {
      if (typeof args[0] === 'string') {
        args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
      }
      return _global[hookName](_native.setInterval, _global, args, getContextSymbol(_global[hookName], 'setInterval'));
    }
  }

  function hookImportScripts() {
    return function importScripts(...args) {
      let _args = args.map((arg) => {
        let path = ('' + arg).trim();
        if (path.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?$/)) {
          return arg;
        }
        else {
          return '!!! invalid url !!!';
        }
      });
      // TODO: ABAC
      return _global[preprocess.getHookNameForServiceWorker()](_native.importScripts, _global, _args, getContextSymbol(_global[preprocess.getHookNameForServiceWorker()], 'importScripts'));
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

  const hookedScripts = new Set();

  function hookNode(hookName, initialContext = [['Node', {random: true}]], contextGenerator) {
    if (_native.Node && Object.getOwnPropertyDescriptor(_native.Node.prototype, 'textContent').configurable) {
      Object.defineProperty(_native.Node.prototype, 'textContent', {
        configurable: false,
        enumerable: _nativeMethods.Node.proto.textContent.enumerable,
        get: _nativeMethods.Node.proto.textContent.get,
        set: function (value) {
          if (this instanceof _native.HTMLScriptElement) {
            if (!hookedScripts.has(value)) {
              // All the contents are treated as JavaScript regardless of MIME types to avoid vulnerability
              value = hook(value, hookName, initialContext, contextGenerator);
              hookedScripts.add(value); // Add the hooked script in the set of hookedScripts
            }
          }
          return _global[hookName](_nativeMethods.Node.proto.textContent.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set textContent'));
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
              doHook = true;
            }
            break;
          case 'src':
            if (this instanceof _native.HTMLScriptElement) {
              if (_value) {
                let srcUrl = new URL(_value, 'https://localhost/');
                switch (srcUrl.protocol) {
                case 'https:':
                case 'http:':
                  if (!srcUrl.pathname.match(/[.]m?js$/)) {
                    value = ''; // invalid script source path
                  }
                  break;
                case 'data:': // TODO: handle data
                case 'blob:': // TODO: handle blob
                case 'javascript:':
                default:
                  value = ''; // invalid script source path
                  break;
                }
              }
              else {
                value = '';
              }
              if (!value) {
                _nativeMethods.Element.proto.removeAttribute.value.call(this, 'src');
                return;
              }
            }
            else if (this instanceof _native.HTMLIFrameElement) {
              if (_value) {
                let url = new URL(hook.parameters.baseURI || location); // TODO: More consistent and robust value for url
                let srcUrl = new URL(_value, location);
                switch (srcUrl.protocol) {
                case 'https:':
                case 'http:':
                  break;
                case 'data:': // TODO: original onload attribute has to be called only once, while called twice
                  {
                    let dataURL = srcUrl.pathname.match(/^([a-zA-Z\/+]*)(;[^, ]*)?,(.*)$/);
                    if (dataURL && dataURL[1] === 'text/html') {
                      let body;
                      if (dataURL[2] === ';base64') {
                        body = atob(dataURL[3]);
                      }
                      else {
                        body = dataURL[3];
                      }
                      if (hook.parameters.emptyDocumentUrl) {
                        value = hook.parameters.emptyDocumentUrl.pathname +
                          '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (this.id ? '@' + this.id : ''));
                      }
                      let srcDecoded = body + (hook.parameters.bootstrap || '');
                      let onload = 'event.target.contentDocument.write(`' + srcDecoded.replace(/`/g, '\\`') + '`);';
                      if (hook.parameters.onloadWrapper && this.hasAttribute('onload')) {
                        onload += hook.parameters.onloadWrapper.replace('$onload$', this.getAttribute('onload'));
                      }
                      _nativeMethods.Element.proto.setAttribute.value.call(this, 'onload', onload);
                    }
                    else if (dataURL && dataURL[1] === 'image/svg+xml') {
                      // block data:image/svg+xml URL
                      value = '';
                    }
                    else {
                      // TODO: Handle other MIME types properly
                    }
                  }
                  break;
                case 'blob:':
                  {
                    if (hook.parameters.emptyDocumentUrl) {
                      value = hook.parameters.emptyDocumentUrl.pathname +
                        '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (this.id ? '@' + this.id : ''));
                    }
                    let onload = 'let iframe = this; ' +
                      'fetch(new Request("' + srcUrl.href + '")).then(response => response.blob())' +
                      '.then(blob => { let reader = new FileReader(); if (blob.type === "text/html") {' + 
                      'reader.addEventListener("loadend", () => { ' +
                        'iframe.contentDocument.write(reader.result + \`' + hook.parameters.bootstrap + '\`); }); ' +
                      'reader.readAsText(blob); } else if (blob.type !== "image/svg+xml") { ' + 
                      'reader.addEventListener("loadend", () => { iframe.src = reader.result; iframe.removeAttribute("onload"); }); ' +
                      'reader.readAsDataURL(blob); }});';
                    if (hook.parameters.onloadWrapper && this.hasAttribute('onload') && !this.getAttribute('onload').startsWith('let iframe = this; fetch(new Request(')) {
                      onload += hook.parameters.onloadWrapper.replace('$onload$', this.getAttribute('onload'));
                    }
                    _nativeMethods.Element.proto.setAttribute.value.call(this, 'onload', onload);
                  }
                  break;
                case 'javascript:':
                default:
                  value = '';
                  break;
                }
              }
              else {
                value = '';
              }
              if (!value) {
                // Note: It is strange that the indirect call to removeAttribute here invokes an exception "call is not a function"
                //       Execute at the next closed timing to avoid this exception, suspecting some stack issues.
                //       this.removeAttribute('src') also throws an exception
                //_nativeMethods.Element.proto.removeAttribute.value.call(this, 'src');
                _native.setTimeout.call(_global, function () { this.removeAttribute('src') }.bind(this), 0);
                return;
              }
            }
            else if (this instanceof _native.HTMLEmbedElement) {
              let url = new URL(hook.parameters.baseURI || location);
              let _srcUrl = new URL(value, url);
              switch (_srcUrl.protocol) {
              case 'https:':
              case 'http:':
                // Note: embed src https URL bypasses Service Worker in the first request
                // convert <embed type="image/svg+xml" src="image.svg"> regardless of type
                value = 'data:image/svg+xml;base64,' + btoa(hook.parameters.emptySvg.replace('$location$',
                  (_srcUrl.origin === url.origin ? _srcUrl.href.substring(url.origin.length) : _srcUrl.href)));
                break;
              case 'data:': // block data:
              case 'blob:': // block blob:
              case 'javascript:': // block javascript:
              default:
                value = '';
                break;
              }
              if (!value) {
                _nativeMethods.Element.proto.removeAttribute.value.call(this, 'src');
                return;
              }
            }
            break;
          case 'srcdoc':
            if (this instanceof _native.HTMLIFrameElement) {
              if (hook.parameters.emptyDocumentUrl) {
                let _emptySrc = hook.parameters.emptyDocumentUrl.pathname;
                // set src="empty-document.html"
                _nativeMethods.Element.proto.setAttribute.value.call(this, 'src', _emptySrc);
              }
              let srcdocDecoded = he.decode(_value + (hook.parameters.bootstrap || ''), { isAttributeValue: true });

              name = 'onload';
              value = 'event.target.contentDocument.write(`' + srcdocDecoded.replace(/`/g, '\\`') + '`);';
              if (hook.parameters.onloadWrapper && this.getAttribute('onload') && !this.getAttribute('onload').startsWith('event.target.contentDocument.write(')) {
                value += hook.parameters.onloadWrapper.replace('$onload$', this.getAttribute('onload'));
              }
            }
            break;
          case 'href':
            if (_value.startsWith('javascript:')) {
              value = 'javascript:' +
                hook('(() => { ' + _value.substr(11) + ' })()', hookName, [[ this.constructor.name + ',setAttribute,' + _name, {}]], contextGenerator);
            }
            break;
          case 'data':
            if (this instanceof _native.HTMLObjectElement) {
              let url = new URL(hook.parameters.baseURI || location);
              let _dataUrl = new URL(value, url);
              switch (_dataUrl.protocol) {
              case 'https:':
              case 'http:':
                // Note: object data https URL bypasses Service Worker in the first request
                // convert <object type="image/svg+xml" data="image.svg"> regardless of type
                value = 'data:image/svg+xml;base64,' + btoa(hook.parameters.emptySvg.replace('$location$',
                  (_dataUrl.origin === url.origin ? _dataUrl.href.substring(url.origin.length) : _dataUrl.href)));
                break;
              case 'data:': // block data:
              case 'blob:': // block blob:
              case 'javascript:': // block javascript:
              default:
                value = '';
                break;
              }
              if (!value) {
                _nativeMethods.Element.proto.removeAttribute.value.call(this, 'data');
                return;
              }
            }
            break;
          default:
            if (_name.match(/^on[a-z]{1,}$/)) {
              value = hook('(() => { ' + value + ' })()', hookName, [[ this.constructor.name + ',setAttribute,' + _name, {}]], contextGenerator, true, preprocess.getHookProperty(),
                          null, false, preprocess.getCompact(), preprocess.getHookGlobal(), preprocess.getHookPrefix(), { event: true });
              let insertReturnAt = value.indexOf('\']);') + 4;
              value = value.substring(0, insertReturnAt) + 'return ' + value.substring(insertReturnAt);
            }
            break;
          }
          // TODO: ABAC
          let result = _global[hookName](_nativeMethods.Element.proto.setAttribute.value, this, [name, value], getContextSymbol(_global[hookName], this.constructor.name + ',setAttribute'));
          if (doHook) {
            this.textContent = this.textContent;
          }
          return result;
        }
      });
    }
    if (_native.Element && Object.getOwnPropertyDescriptor(_native.Element.prototype, 'innerHTML').configurable) {
      Object.defineProperty(_native.Element.prototype, 'innerHTML', {
        configurable: false,
        enumerable: _nativeMethods.Element.proto.innerHTML.enumerable,
        get: _nativeMethods.Element.proto.innerHTML.get,
        set: function (value) {
          let processed = preprocess._preprocessHtml(
            value,
            hookName,
            new URL(document.location),
            _global.location.hostname !== document.location.hostname,
            contextGenerator,
            [],
            false,
            true,
            0,
            preprocess.getHookProperty());
          // TODO: ABAC
          return _global[hookName](_nativeMethods.Element.proto.innerHTML.set, this, [processed], getContextSymbol(_global[hookName], this.constructor.name + ',set innerHTML'));
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
            doHook = true;
          }
          let result = _global[hookName](_nativeMethods.HTMLScriptElement.proto.type.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set type'));
          if (doHook) {
            this.textContent = this.textContent;
          }
          return result;
        }
      });
    }
    if (_native.HTMLScriptElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'src').configurable) {
      Object.defineProperty(_native.HTMLScriptElement.prototype, 'src', {
        configurable: false,
        enumerable: _nativeMethods.HTMLScriptElement.proto.type.enumerable,
        get: _nativeMethods.HTMLScriptElement.proto.src.get,
        set: function (value) {
          let doHook = false;
          if (this instanceof _native.HTMLScriptElement) {
            let _value = typeof value === 'string' ? value.trim() : '';
            if (_value) {
              let srcUrl = new URL(_value, location);
              switch (srcUrl.protocol) {
              case 'https:':
              case 'http:':
                if (!srcUrl.pathname.match(/[.]m?js$/)) {
                  value = ''; // invalid script source path
                }
                break;
              case 'data:': // TODO: handle data URL
              case 'blob:': // TODO: handle blob
              case 'javascript:':
              default:
                value = ''; // invalid script source path
                break;
              }
            }
            else {
              value = '';
            }
            if (!value) {
              _nativeMethods.Element.proto.removeAttribute.value.call(this, 'src');
              return;
            }
          }
          let result = _global[hookName](_nativeMethods.HTMLScriptElement.proto.src.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set src'));
          return result;
        }
      });
    }
    if (_native.HTMLScriptElement && Object.getOwnPropertyDescriptor(_native.HTMLScriptElement.prototype, 'text').configurable) {
      Object.defineProperty(_native.HTMLScriptElement.prototype, 'text', {
        configurable: false,
        enumerable: _nativeMethods.HTMLScriptElement.proto.text.enumerable,
        get: _nativeMethods.HTMLScriptElement.proto.text.get,
        set: function (value) {
          if (this instanceof _native.HTMLScriptElement) {
            if (!hookedScripts.has(value)) {
              // All the contents are treated as JavaScript regardless of MIME types to avoid vulnerability
              value = hook(value, hookName, initialContext, contextGenerator);
              hookedScripts.add(value); // Add the hooked script in the set of hookedScripts
            }
          }
          return _global[hookName](_nativeMethods.HTMLScriptElement.proto.text.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set text'));
        }
      });
    }
    return _native.HTMLScriptElement;
  }

  function hookHTMLIFrameElement(hookName, initialContext = [['HTMLIFrameElement', {}]], contextGenerator) {
    hookElement(hookName, initialContext, contextGenerator); // Element.setAttribute('srcdoc')
    if (_native.HTMLIFrameElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLIFrameElement.prototype, 'srcdoc').configurable) {
      Object.defineProperty(_native.HTMLIFrameElement.prototype, 'srcdoc', {
        configurable: false,
        enumerable: _nativeMethods.HTMLIFrameElement.proto.srcdoc.enumerable,
        get: _nativeMethods.HTMLIFrameElement.proto.srcdoc.get,
        set: function (value) {
          // TODO: set srcdoc property properly
          this.setAttribute('srcdoc', value); // TODO: Is this feasible?
        }
      });
    }
    if (_native.HTMLIFrameElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLIFrameElement.prototype, 'src').configurable) {
      Object.defineProperty(_native.HTMLIFrameElement.prototype, 'src', {
        configurable: false,
        enumerable: _nativeMethods.HTMLIFrameElement.proto.src.enumerable,
        get: _nativeMethods.HTMLIFrameElement.proto.src.get,
        set: function (value) {
          if (value) {
            let url = new URL(hook.parameters.baseURI || location); // TODO: More consistent and robust value for url
            let srcUrl = new URL(value, location);
            switch (srcUrl.protocol) {
            case 'https:':
            case 'http:':
              break;
            case 'data:': // TODO: original onload attribute has to be called only once, while called twice
              {
                let dataURL = srcUrl.pathname.match(/^([a-z\/]*)(;[^, ]*)?,(.*)$/);
                if (dataURL && dataURL[1] === 'text/html') {
                  let body;
                  if (dataURL[2] === ';base64') {
                    body = atob(dataURL[3]);
                  }
                  else {
                    body = dataURL[3];
                  }
                  if (hook.parameters.emptyDocumentUrl) {
                    value = hook.parameters.emptyDocumentUrl.pathname +
                      '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (this.id ? '@' + this.id : ''));
                  }
                  let srcDecoded = body + (hook.parameters.bootstrap || '');
                  let onload = 'event.target.contentDocument.write(`' + srcDecoded.replace(/`/g, '\\`') + '`);';
                  if (hook.parameters.onloadWrapper && this.hasAttribute('onload')) {
                    onload += hook.parameters.onloadWrapper.replace('$onload$', this.getAttribute('onload'));
                  }
                  _nativeMethods.Element.proto.setAttribute.value.call(this, 'onload', onload);
                }
                else {
                  // TODO: Handle other MIME types properly
                }
              }
              break;
            case 'blob:':
              {
                if (hook.parameters.emptyDocumentUrl) {
                  value = hook.parameters.emptyDocumentUrl.pathname +
                    '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (this.id ? '@' + this.id : ''));
                }
                let onload = 'let iframe = this; ' +
                  'fetch(new Request("' + srcUrl.href + '")).then(response => response.blob())' +
                  '.then(blob => { let reader = new FileReader(); if (blob.type === "text/html") {' + 
                  'reader.addEventListener("loadend", () => { ' +
                    'iframe.contentDocument.write(reader.result + \`' + hook.parameters.bootstrap + '\`); }); ' +
                  'reader.readAsText(blob); } else { ' + 
                  'reader.addEventListener("loadend", () => { iframe.src = reader.result; iframe.removeAttribute("onload"); }); ' +
                  'reader.readAsDataURL(blob); }});';
                if (hook.parameters.onloadWrapper && this.hasAttribute('onload') && !this.getAttribute('onload').startsWith('let iframe = this; fetch(new Request(')) {
                  onload += hook.parameters.onloadWrapper.replace('$onload$', this.getAttribute('onload'));
                }
                _nativeMethods.Element.proto.setAttribute.value.call(this, 'onload', onload);
              }
              break;
            case 'javascript:':
            default:
              value = '';
              break;
            }
          }
          else {
            value = '';
          }
          if (!value) {
            _nativeMethods.Element.proto.removeAttribute.value.call(this, 'src');
            return; // Note: Setting a null string results in this.location, which is unexpected 
          }
          _global[hookName](_nativeMethods.HTMLIFrameElement.proto.src.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set src'));
        }
      });
    }
    return _native.HTMLIFrameElement;
  }

  function hookHTMLObjectElement(hookName, initialContext = [['HTMLObjectElement', {}]], contextGenerator) {
    hookElement(hookName, initialContext, contextGenerator); // Element.setAttribute('data')
    if (_native.HTMLObjectElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLObjectElement.prototype, 'data').configurable) {
      Object.defineProperty(_native.HTMLObjectElement.prototype, 'data', {
        configurable: false,
        enumerable: _nativeMethods.HTMLObjectElement.proto.data.enumerable,
        get: _nativeMethods.HTMLObjectElement.proto.data.get,
        set: function (value) {
          // TODO: set data property properly
          this.setAttribute('data', value); // TODO: Is this feasible?
        }
      });
    }
    return _native.HTMLObjectElement;
  }

  function hookHTMLEmbedElement(hookName, initialContext = [['HTMLEmbedElement', {}]], contextGenerator) {
    hookElement(hookName, initialContext, contextGenerator); // Element.setAttribute('src')
    if (_native.HTMLEmbedElement &&
        Object.getOwnPropertyDescriptor(_native.HTMLEmbedElement.prototype, 'src').configurable) {
      Object.defineProperty(_native.HTMLEmbedElement.prototype, 'src', {
        configurable: false,
        enumerable: _nativeMethods.HTMLEmbedElement.proto.src.enumerable,
        get: _nativeMethods.HTMLEmbedElement.proto.src.get,
        set: function (value) {
          // TODO: set src property properly
          this.setAttribute('src', value); // TODO: Is this feasible?
        }
      });
    }
    return _native.HTMLEmbedElement;
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
          return _global[hookName](_nativeMethods[target].proto.href.set, this, [value], getContextSymbol(_global[hookName], this.constructor.name + ',set href'));
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
          let url = new URL(this.location);
          if (hook.parameters.emptyDocumentUrl) {
            if (url.origin === hook.parameters.emptyDocumentUrl.origin &&
                url.pathname === hook.parameters.emptyDocumentUrl.pathname) {
              // this.location is empty-document.html
              if (url.searchParams.has('url')) {
                // get virtual url from empty-document.html?url=
                url = new URL(url.searchParams.get('url'), hook.parameters.emptyDocumentUrl.origin);
              }
            }
          }
          let processed = preprocess._preprocessHtml(
            markup,
            hookName,
            url,
            _global.location.hostname !== this.location.hostname,
            contextGenerator,
            [],
            false,
            true,
            scriptOffset,
            preprocess.getHookProperty());
          return _global[hookName](_nativeMethods.Document.proto.write.value, this, [processed], getContextSymbol(_global[hookName], this.constructor.name + ',write'));
        }
      });
    }
    if (_native.Document && Object.getOwnPropertyDescriptor(_native.Document.prototype, 'writeln').configurable) {
      Object.defineProperty(_native.Document.prototype, 'writeln', {
        configurable: false,
        enumerable: _nativeMethods.Document.proto.writeln.enumerable,
        writable: false,
        value: function writeln(markup) {
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
          let url = new URL(this.location);
          if (hook.parameters.emptyDocumentUrl) {
            if (url.origin === hook.parameters.emptyDocumentUrl.origin &&
                url.pathname === hook.parameters.emptyDocumentUrl.pathname) {
              // this.location is empty-document.html
              if (url.searchParams.has('url')) {
                // get virtual url from empty-document.html?url=
                url = new URL(url.searchParams.get('url'), hook.parameters.emptyDocumentUrl.origin);
              }
            }
          }
          let processed = preprocess._preprocessHtml(
            markup,
            hookName,
            url,
            _global.location.hostname !== this.location.hostname,
            contextGenerator,
            [],
            false,
            true,
            scriptOffset,
            preprocess.getHookProperty());
          return _global[hookName](_nativeMethods.Document.proto.writeln.value, this, [processed], getContextSymbol(_global[hookName], this.constructor.name + ',writeln'));
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
    let strictModePrefix = '';
    let symbolContext = context;
    if (typeof symbolContext !== 'symbol') {
      // context is not a symbol
      return undefined;
    }
    context = hookCallback[symbolContext];
    if (!context) {
      // invalid symbol context
      return undefined;
    }
    let wrapperProperty;
    let wrapperPropertySymbolMap;
    let wrapperPropertySymbol;
    let i;
    if (type[0] === '#') {
      strictModePrefix = '#';
      _hookPrefix = 'S' + _hookPrefix;
      type = type.substr(1);
    }
    for (i = 0; !descriptor && i < _globalPrototypes.length; i++) {
      descriptor = Object.getOwnPropertyDescriptor(_globalPrototypes[i], name);
    }
    if (descriptor) {
      status = 'var';
    }
    wrapperProperty = _hookPrefix + name + ';' + context;
    wrapperPropertySymbolMap = hookGlobal[symbolContext];
    if (!wrapperPropertySymbolMap) {
      // invalid symbolContext
      return undefined;
    }
    wrapperPropertySymbol = wrapperPropertySymbolMap[wrapperProperty];
    if (type !== 'delete' && type !== '#delete' && !wrapperPropertySymbol) {
      // invalid wrapperProperty
      return undefined;
    }
    proxyDescriptor = Object.getOwnPropertyDescriptor(proxy, wrapperPropertySymbol);
    if (!proxyDescriptor) {
      newProxyDescriptor = {
        configurable: false,
        enumerable: false,
        get: function get() {
          return hookCallback(strictModePrefix + '.', _global, [name], symbolContext);
        },
        set: function set(value) {
          return hookCallback(strictModePrefix + '=', _global, [name, value], symbolContext);
        },
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
      hookCallback(strictModePrefix + '()', Object, [ 'defineProperty', [ _global, name, { configurable: false, enumerable: true, writable: true, value: undefined } ] ], symbolContext);
      if (newProxyDescriptor) {
        Object.defineProperty(proxy, wrapperPropertySymbol, newProxyDescriptor);
      }
      break;
    case 'undefined-set':
      if (strictModePrefix) {
        // Error in strict mode
        throw new ReferenceError(name + ' is not defined');
      }
      else {
        // implicit definition
        hookCallback(strictModePrefix + '()', Object, [ 'defineProperty', [ _global, name, { configurable: true, enumerable: true, writable: true, value: undefined } ] ], symbolContext);
        if (newProxyDescriptor) {
          Object.defineProperty(proxy, wrapperPropertySymbol, newProxyDescriptor);
        }
      }
      break;
    case 'undefined-const':
      Object.defineProperty(proxy, wrapperPropertySymbol, {
        configurable: false,
        enumerable: false,
        get: function () {
          return hookCallback('.', _global, [name], symbolContext);
        },
        set: function (value) {
          hookCallback(strictModePrefix + '=', _global, [name, value], symbolContext);
          hookCallback(strictModePrefix + '()', Object, [ 'defineProperty', [ _global, name, { configurable: false, enumerable: true, writable: false, value: value } ] ], symbolContext);
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
        Object.defineProperty(proxy, wrapperPropertySymbol, newProxyDescriptor);
      }
      break;
    case 'var-let':
    case 'var-const':
    case 'var-class':
      throw new SyntaxError('Identifier \'' + name + '\' has already been declared status = ' + status + ' type = ' + type);
      break;
    case 'undefined-delete':
    case 'var-delete':
      proxy = hookCallback(strictModePrefix + 'delete', _global, [name], symbolContext);
      break;
    default:
      console.error('hook.global: unknown status-type pair', status, type);
      break;
    }
    return proxy;
  }

  function hookWith(...scopes) {
    let scope = scopes[0];
    scope[preprocess.getHookWith()] = scopes;
    return scope;
  }

  function contextSymbolGenerator(symbolToContext, contexts) {
    let result = [];
    let contextToSymbol = {};
    let hookGlobal = hook.global;
    for (let i = 0; i < contexts.length; i++) {
      symbolToContext[result[i] = _Symbol()] = contexts[i];
      contextToSymbol[contexts[i]] = result[i];
      hookGlobal[result[i]] = contextToSymbol;
    }
    return result;
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
      /*
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
       */
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
      case 'importScripts':
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

  return Object.freeze({
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
    HTMLIFrameElement: hookHTMLIFrameElement,
    HTMLObjectElement: hookHTMLObjectElement,
    HTMLEmbedElement: hookHTMLEmbedElement,
    Document: hookDocument,
    with: hookWith,
    importScripts: hookImportScripts,
    $: contextSymbolGenerator,
  });
}