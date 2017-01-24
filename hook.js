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

function _preprocess(ast, isConstructor = false, hookName) {
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
      let template = _espreeParse(ast.generator
        ? 'function * f() { yield * ' + hookName + '(function * () {}, this, arguments); }'
        : isConstructor
          ? 'function f() { return ' + hookName + '(() => {}, null, arguments); }'
          : 'function f() { return ' + hookName + '(() => {}, this, arguments); }').body[0];
      let f = ast.generator
        ? template.body.body[0].expression.argument.arguments[0]
        : template.body.body[0].argument.arguments[0];
      f.async = ast.async;
      f.params = ast.params;
      f.body.body = body;
      f.__hooked__ = true;
      ast.params = params.map(param => param.type === 'AssignmentPattern' ? param.left : param)
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
        let template = _espreeParse(ast.body.type === 'BlockStatement'
          ? '(...args) => ' + hookName + '(p => { return p; }, this, args)'
          : ast.body.type === 'ObjectExpression'
            ? '(...args) => ' + hookName + '(p => ({ p: p }), this, args)'
            : '(...args) => ' + hookName + '(p => p, this, args)').body[0].expression;
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
      if (Array.isArray(ast[target])) {
        ast[target].forEach(item => {
          if (item && typeof item === 'object' && typeof item.type === 'string') {
            _preprocess(item, false, hookName);
          }
        });
      }
      else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
        _preprocess(ast[target], isConstructor, hookName);
      }
    }
  }
}

const escodegenOptions = {
  format: {
    indent: {
      style: '  ',
      base: 0,
      adjustMultilineComment: false
    },
    newline: '\n',
    space: ' ',
    json: false,
    renumber: false,
    hexadecimal: false,
    quotes: 'single',
    escapeless: false,
    compact: false,
    parentheses: true,
    semicolons: true,
    safeConcatenation: false
  },
  moz: {
    starlessGenerator: false,
    parenthesizedComprehensionBlock: false,
    comprehensionExpressionStartsWithAssignment: false
  },
  parse: null,
  comment: true,
  sourceMap: undefined,
  sourceMapRoot: null,
  sourceMapWithCode: false,
  file: undefined,
  //sourceContent: originalSource,
  directive: false,
  verbatim: undefined
};

function preprocess(code, hookName = '__hook__') {
  let targetAst = espree.parse(code, espreeOptions);
  let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
  _preprocess(targetAst, false, hookName);
  return escodegen.generate(astWithComments, escodegenOptions);
}

function __hook__(f, thisArg, args, context) {
  return thisArg ? f.apply(thisArg, args) : f(...args);
}

module.exports = {
  hook: __hook__,
  preprocess: preprocess,
  espree: espree,
  escodegen: escodegen,
  escodegenOptions: escodegenOptions,
  expreeOptions: espreeOptions
};