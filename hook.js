/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');

const espreeOptions = { range: true, tokens: true, comment: true, ecmaVersion: 8 };

function _preprocess(ast, isConstructor = false, hookName, astPath, contextGenerator = () => '') {
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
    if (ast.callee && ast.callee.name === 'Function') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]]))(\'statement\');', espreeOptions).body[0].expression;
      ast.callee = template.callee;
    }
    break;
  case 'CallExpression':
    if (ast.callee &&
        ast.callee.type === 'MemberExpression' &&
        ast.callee.object.type === 'Identifier' && ast.callee.object.name === 'Reflect' &&
        ((ast.callee.property.type === 'Identifier' && ast.callee.property.name === 'construct') || 
         (ast.callee.property.type === 'Literal' && ast.callee.property.value === 'construct')) &&
        ast.arguments && ast.arguments[0] && ast.arguments[0].type === 'Identifier' && ast.arguments[0].name === 'Function') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]]))(\'statement\');', espreeOptions).body[0].expression;
      ast.arguments[0] = template.callee;
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
            _preprocess(item, false, hookName, astPath, contextGenerator);
            astPath.pop();
          }
        });
      }
      else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
        _preprocess(ast[target], isConstructor, hookName, astPath, contextGenerator);
      }
      astPath.pop();
    }
  }
}

const escodegenOptions = { format: { indent: { style: '  ' }, }, comment: true };

function hook(code, hookName = '__hook__', initialContext = [], contextGenerator = generateMethodContext) {
  let targetAst = espree.parse(code, espreeOptions);
  let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
  initialContext.push(['root', targetAst]);
  if (typeof contextGenerator === 'string') {
    contextGenerator = hook.contextGenerators[contextGenerator] || generateMethodContext;
  }
  _preprocess(targetAst, false, hookName, initialContext, contextGenerator);
  return escodegen.generate(astWithComments, escodegenOptions);
}

function __hook__(f, thisArg, args, context) {
  return thisArg ? f.apply(thisArg, args) : f(...args);
}

function generateAstPathContext(astPath) {
  return astPath.map(([ path, node ]) => node && node.type
    ? '[' + path + ']' + node.type + (node.id && node.id.name ? ':' + node.id.name : (node.key && node.key.name ? ':' + node.key.name : ''))
    : path).join(',');
}

function generateMethodContext(astPath) {
  return astPath.map(([ path, node ], index) => node && node.type
    ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name ? node.key.name : ''))
    : index === 0 ? path : '').filter(p => p).join(',');
}

const _global = typeof window === 'object' ? window : typeof global === 'object' ? global : typeof self === 'object' ? self : this;
const _native = {
  Function: Function
};
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
  _freeze[target.name].static.forEach(prop => {
    _freezeProperty(target, prop);
  });
  _freeze[target.name].proto.forEach(prop => {
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
    case 'eval':
    case 'write':
    case 'HTMLScriptElement':
    default:
      break;
    }
  });
}

module.exports = Object.freeze(Object.assign(hook, {
  __hook__: __hook__,
  hook: hookPlatform,
  Function: hookFunction,
  contextGenerators: {
    'null': () =>'',
    'astPath': generateAstPathContext,
    'method': generateMethodContext
  }
}));