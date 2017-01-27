/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');

const espreeOptions = { range: true, tokens: true, comment: true, ecmaVersion: 8 };

function _espreeParse(code) {
  return espree.parse(code, espreeOptions);
}

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
      let template = _espreeParse(ast.generator
        ? 'function * f() { yield * ' + hookName + '(function * () {}, this, arguments, \'' + context + '\'); }'
        : isConstructor
          ? 'function f() { return ' + hookName + '(() => {}, null, arguments, \'' + context + '\'); }'
          : 'function f() { return ' + hookName + '(() => {}, this, arguments, \'' + context + '\'); }').body[0];
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
        let template = _espreeParse(ast.body.type === 'BlockStatement'
          ? '(...args) => ' + hookName + '(p => { return p; }, this, args, \'' + context + '\')'
          : ast.body.type === 'ObjectExpression'
            ? '(...args) => ' + hookName + '(p => ({ p: p }), this, args, \'' + context + '\')'
            : '(...args) => ' + hookName + '(p => p, this, args, \'' + context + '\')').body[0].expression;
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

function preprocess(code, hookName = '__hook__', initialContext = [], contextGenerator = generateMethodContext) {
  let targetAst = espree.parse(code, espreeOptions);
  let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
  initialContext.push(['root', targetAst]);
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

module.exports = {
  hook: __hook__,
  preprocess: preprocess,
  nullContextGenerator: () => '',
  astPathContextGenerator: generateAstPathContext,
  methodContextGenerator: generateMethodContext,
  escodegenOptions: escodegenOptions,
  espreeOptions: espreeOptions
};