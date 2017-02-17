/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');
const htmlparser = require('htmlparser2');
const createHash = require('sha.js');

const espreeOptions = { range: true, tokens: true, comment: true, ecmaVersion: 8 };

function _preprocess(ast, isConstructor = false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking) {
  switch (ast.type) {
  case 'MethodDefinition':
    if (ast.kind === 'constructor') {
      isConstructor = true;
    }
    break;
  case 'FunctionDeclaration':
  case 'FunctionExpression':
    if (ast.__hooked__) {
      delete ast.__hooked__;
    }
    else if (typeof ast.body === 'object' &&
        !Array.isArray(ast.body) &&
        ast.body.type === 'BlockStatement' &&
        ast.body.body &&
        Array.isArray(ast.body.body)) {
      let params = ast.params;
      let body = ast.body.body;
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse(ast.generator
        ? 'function * f() { yield * ' + hookName + '(function * () {}, this, arguments, \'' + context + '\'); }'
        : isConstructor
          ? 'function f() { return ' + hookName + '(() => {}, null, arguments, \'' + context + '\'); }'
          : 'function f() { return ' + hookName + '(() => {}, this, arguments, \'' + context + '\'); }', espreeOptions).body[0];
      let f = ast.generator
        ? template.body.body[0].expression.argument.arguments[0]
        : template.body.body[0].argument.arguments[0];
      f.async = ast.async;
      f.params = ast.params;
      f.body.body = body;
      f.__hooked__ = true;
      ast.params = params.map(function _trim(param) {
        return param && (param.type === 'ArrayPattern'
          ? { type: param.type, elements: param.elements.map(element => _trim(element)) }
          : param.type === 'AssignmentPattern'
            ? param.left
            : param.type === 'ObjectPattern'
              ? { type: 'ObjectPattern', properties: param.properties.map(prop => prop.value.type === 'AssignmentPattern'
                ? ((p, v) => (p.value = v, p))(Object.assign({}, prop), prop.value.left)
                : prop) }
              : param);
      });
      ast.body = template.body;
    }
    break;
  case 'ArrowFunctionExpression':
    if (ast.__hooked__) {
      delete ast.__hooked__;
    }
    else {
      if (typeof ast.body === 'object' &&
          !Array.isArray(ast.body)) {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = espree.parse(ast.body.type === 'BlockStatement'
          ? '(...args) => ' + hookName + '(p => { return p; }, this, args, \'' + context + '\')'
          : ast.body.type === 'ObjectExpression'
            ? '(...args) => ' + hookName + '(p => ({ p: p }), this, args, \'' + context + '\')'
            : '(...args) => ' + hookName + '(p => p, this, args, \'' + context + '\')', espreeOptions).body[0].expression;
        let f = template.body.arguments[0];
        f.async = ast.async;
        f.params = ast.params;
        f.body = ast.body;
        f.__hooked__ = true;
        ast.params = template.params;
        ast.body = template.body;
      }
    }
    break;
  case 'NewExpression':
    if (metaHooking && ast.callee && ast.callee.name === 'Function') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
        espreeOptions).body[0].expression;
      ast.callee = template.callee;
    }
    break;
  case 'CallExpression':
    if (metaHooking &&
        ast.callee &&
        ast.callee.type === 'MemberExpression' &&
        ast.callee.object.type === 'Identifier' && ast.callee.object.name === 'Reflect' &&
        ((ast.callee.property.type === 'Identifier' && ast.callee.property.name === 'construct') || 
         (ast.callee.property.type === 'Literal' && ast.callee.property.value === 'construct')) &&
        ast.arguments && ast.arguments[0] && ast.arguments[0].type === 'Identifier' && ast.arguments[0].name === 'Function') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
        espreeOptions).body[0].expression;
      ast.arguments[0] = template.callee;
    }
    else if (metaHooking &&
      ast.callee && ast.callee.type === 'Identifier' && (ast.callee.name === 'setTimeout' || ast.callee.name === 'setInterval') &&
      ast.arguments && ast.arguments[0] && ast.arguments[0].type !== 'FunctionExpression' && ast.arguments[0].type !== 'ArrowFunctionExpression') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('hook.' + ast.callee.name + '(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\')',
          espreeOptions).body[0].expression;
      ast.callee = template;
    }
    break;
  case 'MetaProperty':
    // patch espree-generated AST to be compatible with that from esprima
    ast.meta = ast.meta.name;
    ast.property = ast.property.name;
    break;
  default:
    break;
  }
  for (let target in ast) {
    if (ast[target]) {
      astPath.push([target, ast[target]]);
      if (Array.isArray(ast[target])) {
        ast[target].forEach((item, index) => {
          if (item && typeof item === 'object' && typeof item.type === 'string') {
            astPath.push([index, item]);
            _preprocess(item, false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking);
            astPath.pop();
          }
        });
      }
      else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
        _preprocess(ast[target], isConstructor, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking);
      }
      astPath.pop();
    }
  }
}

function _preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking = true, scriptOffset = 0) {
  let processed = '';
  let inScript = false;
  let noHook = false;
  let contextGeneratorAttr = false;
  let src = '';
  let inlineScript = '';
  let stream = new htmlparser.WritableStream({
    onopentag(name, attributes) {
      let attrs = '';
      let attrNoHook = typeof attributes['no-hook'] === 'string';
      for (let attr in attributes) {
        if (attr.match(/^on[a-z]{1,}$/) && attributes[attr]) {
          if (!attrNoHook) {
            attributes[attr] = 'return ' + hook('(() => { ' + attributes[attr] + '})()',
              hookNameForServiceWorker,
              [[(cors ? response.url : url.pathname) + ',' + name
              + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
              + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
          }
        }
        else if (attributes[attr] && attributes[attr].indexOf('javascript:') === 0) {
          if (!attrNoHook) {
            attributes[attr] = 'javascript:' + hook('(() => { ' + attributes[attr].substr(11) + '})()',
              hookNameForServiceWorker,
              [[(cors ? response.url : url.pathname) + ',' + name
              + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
              + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
          }
        }
        attrs += ' ' + attr + (attributes[attr]
          ? attributes[attr].indexOf('"') >= 0
            ? '=\'' + attributes[attr] + '\''
            : '="' + attributes[attr] + '"' : '');
      }
      processed += '<' + name + attrs + '>';
      if (name === 'script') {
        inScript = true;
        noHook = attrNoHook;
        src = attributes.src;
        inlineScript = '';
        contextGeneratorAttr = attributes['context-generator'];
        if (src && src.match(/\/hook[.]min[.]js\?/)) {
          let srcUrl = new URL(src, 'https://host/');
          if (srcUrl.searchParams.has('hook-name')) {
            hookNameForServiceWorker = srcUrl.searchParams.get('hook-name');
          }
          if (srcUrl.searchParams.has('context-generator-name')) {
            contextGeneratorName = srcUrl.searchParams.get('context-generator-name') || 'method';
          }
          if (srcUrl.searchParams.has('discard-hook-errors')) {
            discardHookErrors = srcUrl.searchParams.get('discard-hook-errors') === 'true';
          }
        }
        if (isDecoded && typeof contextGeneratorAttr === 'string' && src) {
          contextGeneratorScripts.push(new URL(src, url));
        }
      }
    },
    ontext(text) {
      if (inScript) {
        inlineScript += text;
      }
      else {
        processed += text;
      }
    },
    onclosetag(name) {
      if (name === 'script' && inScript) {
        if (isDecoded && typeof contextGeneratorAttr === 'string' && inlineScript) {
          contextGeneratorScripts.push(new Function(inlineScript));
        }
        if (inlineScript && !noHook) {
          inlineScript = hook(inlineScript, hookNameForServiceWorker,
            [[(cors ? url.href : url.pathname) + ',script@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
        }
        processed += inlineScript;
        inScript = false;
        noHook = false;
        src = '';
      }
      processed += '</' + name + '>';
    },
    oncomment(data) {
      processed += '<!--' + data + '-->';
    },
    onerror(error) {
      throw error;
    }
  });
  stream.write(html);
  stream.end();
  return processed;
}

const escodegenOptions = { format: { indent: { style: '  ' }, }, comment: true };

function hook(code, hookName = '__hook__', initialContext = [], contextGeneratorName = 'method', metaHooking = true) {
  let targetAst = espree.parse(code, espreeOptions);
  let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
  contextGeneratorName = hook.contextGenerators[contextGeneratorName] ? contextGeneratorName : 'method';
  let contextGenerator = hook.contextGenerators[contextGeneratorName];
  initialContext.push(['root', targetAst]);
  _preprocess(targetAst, false, hookName, initialContext, contextGeneratorName, contextGenerator, metaHooking);
  return escodegen.generate(astWithComments, escodegenOptions);
}

function __hook__(f, thisArg, args, context) {
  return thisArg ? f.apply(thisArg, args) : f(...args);
}

function generateAstPathContext(astPath) {
  return astPath.map(([ path, node ]) => node && node.type
    ? '[' + path + ']' + node.type + (node.id && node.id.name ? ':' + node.id.name : (node.key && node.key.name
      ? ':' + (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
    : path).join(',');
}

function generateMethodContext(astPath) {
  return astPath.map(([ path, node ], index) => node && node.type
    ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name
      ? (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
    : index === 0 ? path : '').filter(p => p).join(',');
}

const _global = typeof window === 'object' ? window : typeof global === 'object' ? global : typeof self === 'object' ? self : this;
// TODO: automate generation of these objects
const _native = {
  Function: _global.Function,
  setTimeout: _global.setTimeout,
  setInterval: _global.setInterval,
  HTMLScriptElement: _global.HTMLScriptElement,
  Node: _global.Node,
  Element: _global.Element,
  HTMLAnchorElement: _global.HTMLAnchorElement,
  HTMLAreaElement: _global.HTMLAreaElement,
  Document: _global.Document
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
      write: _native.Element ? Object.getOwnPropertyDescriptor(_native.Document.prototype, 'write') : {}
    }
  }
}
const _freeze = {
  Function: { static: [], proto: [ 'apply', 'call', 'bind', 'arguments' ] }
};

function hookFunction(hookName, initialContext = [['Function', {}]], contextGenerator) {
  return function Function(...args) {
    if (args.length >= 1) {
      let hooked = 'return ' + hook('(() => { ' + args[args.length - 1] + ' })(arguments)', hookName, initialContext, contextGenerator);
      args[args.length - 1] = hooked;
    }
    return Reflect.construct(_native.Function, args);
  }
}

function hookSetTimeout(hookName, initialContext = [['setTimeout', {}]], contextGenerator) {
  return function setTimeout(...args) {
    if (typeof args[0] === 'string') {
      args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
    }
    return _global[hookName](_native.setTimeout, this, args, 'setTimeout');
  }
}

function hookSetInterval(hookName, initialContext = [['setInterval', {}]], contextGenerator) {
  return function setInterval(...args) {
    if (typeof args[0] === 'string') {
      args[0] = hook('(() => { ' + args[0] + ' })()', hookName, initialContext, contextGenerator);
    }
    return _global[hookName](_native.setInterval, this, args, 'setInterval');
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

function hookDocument(hookName, initialContext = [['Document', {}]], contextGenerator) {
  if (_native.Document && Object.getOwnPropertyDescriptor(_native.Document.prototype, 'write').configurable) {
    Object.defineProperty(_native.Document.prototype, 'write', {
      configurable: false,
      enumerable: _nativeMethods.Document.proto.write.enumerable,
      writable: false,
      value: function write(markup) {
        let scriptOffset = 0;
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
        let processed = _preprocessHtml(
          markup,
          hookName,
          new URL(this.location),
          _global.location.hostname !== this.location.hostname,
          contextGenerator,
          [],
          false,
          true,
          scriptOffset);
        return _global[hookName](_nativeMethods.Document.proto.write.value, this, [processed], this.constructor.name + ',write');
      }
    });
  }
  return _native.Document;
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
    case 'write':
    default:
      break;
    }
  });
}

let hookNameForServiceWorker = '__hook__';
let contextGeneratorName = 'method';
let discardHookErrors = true;
let version = '1';

function onInstall(event) {
  let serviceWorkerUrl = new URL(location.href);
  version = serviceWorkerUrl.searchParams.get('version') || version;
}

function onActivate(event) {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || caches.delete(key)))));
}

function onFetch(event) {
  event.respondWith(
    caches.open('version_' + version).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        let cors = false;
        let request;
        if (!response) {
          if (event.request.url.indexOf('cors=true') >= 0) {
            cors = true;
            // no inheritance of auth information, etc. from event.request
            request = new Request(event.request.url.replace(/&cors=true/, '').replace(/\?cors=true$/, '').replace(/\?cors=true&/, '?'), { mode: 'cors' });
          }
          else if (Array.isArray(hook.parameters.cors) &&
            hook.parameters.cors.filter(pattern =>
              typeof pattern === 'string' ? pattern === event.request.url : typeof pattern === 'function' ? pattern(event.request.url) : false
            ).reduce((prev, curr) => prev || curr, false)) {
            cors = true;
            request = new Request(event.request.url, { mode: 'cors' });
          }
          else {
            request = event.request.clone();
          }
        }
        return response || fetch(request).then(function(response) {
          if (response.status === 200) {
            if (response.url) {
              let url = new URL(response.url);
              if (!response.url.match(/no-hook=true/) && url.pathname.match(/[.]js$/)) {
                return response.text().then(function(result) {
                  try {
                    result = hook(result, hookNameForServiceWorker, [[cors ? response.url : url.pathname, {}]], contextGeneratorName);
                  }
                  catch (e) {
                    if (discardHookErrors) {
                      console.log(e);
                    }
                    else {
                      throw e;
                    }
                  }
                  finally {
                    let processedResponse = new Response(result, { headers: {'Content-Type': 'text/javascript'} });
                    cache.put(event.request, processedResponse.clone());
                    return processedResponse;
                  }
                });
              }
              else if (url.pathname.match(/(\/|[.]html?)$/)) {
                let original;
                let decoded;
                let contextGeneratorScripts = [];
                return response.text().then(function(result) {
                  try {
                    result = decoded = hook.serviceWorkerTransformers.decodeHtml(original = result);
                    result = _preprocessHtml(
                      decoded,
                      hookNameForServiceWorker,
                      url,
                      cors,
                      contextGeneratorName,
                      contextGeneratorScripts,
                      original !== decoded,
                      true);
                  }
                  catch (e) {
                    if (discardHookErrors) {
                      console.log(e);
                    }
                    else {
                      throw e;
                    }
                  }
                  finally {
                    let processedResponse = new Response(result, { headers: {'Content-Type': 'text/html'} });
                    if (decoded === original) {
                      cache.put(event.request, processedResponse.clone());
                    }
                    else {
                      let match = decoded.replace(/\n/g, '\0')
                        .match(/<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*version=(.*)&[^"]*"><\/script>/);
                      if (match) {
                        let newVersion = match[1];
                        if (version !== newVersion) {
                          version = newVersion;
                          caches.keys()
                            .then(keys => Promise.all(keys.map(key => (key === 'version_' + version) || caches.delete(key))))
                            .then(() => registration.update());
                        }
                      }
                    }
                    if (contextGeneratorScripts.length === 0) {
                      return processedResponse;
                    }
                    else {
                      let sequence = Promise.resolve();
                      contextGeneratorScripts.forEach(script => {
                        sequence = sequence.then(() => {
                          if (typeof script === 'function') {
                            script();
                            return true;
                          }
                          else if (script instanceof URL) {
                            let scriptRequest = new Request(script, { mode: 'cors' });
                            return fetch(scriptRequest).then(scriptResponse => {
                              if (scriptResponse.status < 400) {
                                return scriptResponse.text();
                              }
                              else {
                                throw scriptResponse;
                              }
                            }).then(text => {
                              (new Function(text))();
                              return true;
                            }).catch(error => {
                              console.log('Failed to fetch context generator script at ' + script, error);
                              if (discardHookErrors) {
                                return true;
                              }
                              else {
                                if (error instanceof Response) {
                                  throw new Error('Failed to fetch context generator script at ' + script + ' ' + error.status + ' ' + error.statusText);
                                }
                                else {
                                  throw error;
                                }
                              }
                            });
                          }
                          else {
                            return true;
                          }
                        })
                      });
                      return sequence.then(() => processedResponse);
                    }
                  }
                });
              }
            }
          }
          return response;
        });
      }).catch(function(error) {
        throw error;
      });
    })
  );
}

function encodeHtml(html) {
  let html0 = html.replace(/\n/g, '\0');
  let match;
  if (match = html0.match(/^(.*)(<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*service-worker-ready=true"><\/script>.*)$/)) {
    html = (match[1] + match[2].replace(/<!--/g, '<C!--').replace(/-->/g, '--C>').replace(
      /^(.*<script [^>]*src="[^"]*\/hook[.]min[.]js\?[^"]*&service-worker-ready=)true("><\/script>)(.*)$/,
      '$1false$2</head></html><!--$3-->')).replace(/\0/g, '\n');
  }
  return html;
}

function decodeHtml(html) {
  let html0 = html.replace(/\n/g, '\0');
  if (html0.match(/<script [^>]*src="[^"]*\/hook[.]min[.]js[\?][^"]*service-worker-ready=false"><\/script><\/head><\/html><!--/)) {
    html = html0.replace(
      /^(.*<script [^>]*src="[^"]*\/hook[.]min[.]js\?[^"]*&service-worker-ready=)false("><\/script>)<\/head><\/html><!--(.*)-->$/,
      '$1true$2$3').replace(/<C!--/g, '<!--').replace(/--C>/g, '-->').replace(/\0/g, '\n');
  }
  return html;
}

function registerServiceWorker(fallbackUrl = './index-no-service-worker.html', reloadTimeout = 500, inactiveReloadTimeout = 1000) {
  if ('serviceWorker' in navigator) {
    let script = document.currentScript || Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook.min.js/))[0];
    let src = new URL(script.src, window.location.href);
    if (src.searchParams.has('service-worker-ready')) {
      navigator.serviceWorker.register(script.src.replace(/\&service-worker-ready=.*$/, ''), { scope: src.searchParams.get('sw-root') || window.location.pathname.replace(/\/[^\/]*$/, '/') })
        .then(registration => {
          let serviceWorker = registration.active || registration.waiting || registration.installing;
          if (serviceWorker) {
            if (!(src.searchParams.get('service-worker-ready') === 'true' && registration.active)) {
              serviceWorker.addEventListener('statechange', function (e) {
                let src = new URL(script.src, "https://host/");
                if (src.searchParams.get('service-worker-ready') !== 'true') {
                  window.location.reload();
                }
              });
              setTimeout(function() { window.location.reload(); }, inactiveReloadTimeout);
            }
          }
          else {
            setTimeout(function() { window.location.reload(); }, reloadTimeout);
          }
        });
    }
  }
  else {
    let src = new URL(document.currentScript.src, "https://host/");
    let match = src.search.match(/[&\?]fallback-page=([^&\?]*)/);
    if (match) {
      fallbackUrl = match[1];
    }
    window.location = fallbackUrl;
  }
}

module.exports = Object.freeze(Object.assign(hook, {
  __hook__: __hook__,
  hook: hookPlatform,
  Function: hookFunction,
  setTimeout: hookSetTimeout,
  setInterval: hookSetInterval,
  Node: hookNode,
  Element: hookElement,
  HTMLAnchorElement: hookHTMLAnchorElement,
  HTMLAreaElement: hookHTMLAreaElement,
  HTMLScriptElement: hookHTMLScriptElement,
  Document: hookDocument,
  serviceWorkerHandlers: {
    install: onInstall,
    activate: onActivate,
    fetch: onFetch
  },
  serviceWorkerTransformers: {
    encodeHtml: encodeHtml,
    decodeHtml: decodeHtml
  },
  registerServiceWorker: registerServiceWorker,
  contextGenerators: {
    'null': () => '',
    'astPath': generateAstPathContext,
    'method': generateMethodContext
  },
  utils: {
    createHash: createHash
  },
  parameters: {}
}));