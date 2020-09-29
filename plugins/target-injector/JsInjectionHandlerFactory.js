/*
@license https://github.com/t2ym/thin-hook/blob/master/plugins/target-injector/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const { InjectionHandlerBase } = require('./InjectionHandlerBase.js');

function JsInjectionHandlerFactory({ parser, estraverse, esquery, parserOptions = {
    // for espree
    script: {
      loc: false,
      range: true,
      tokens: true,
      comment: true,
      ecmaVersion: 2018,
      //sourceFile: sourceFile,
      sourceType: 'script',
      ecmaFeatures: {
        jsx: false,
        globalReturn: false,
        impliedStrict: false,
        experimentalObjectRestSpread: true,
      }
    },
    module: {
      loc: false,
      range: true,
      tokens: true,
      comment: true,
      ecmaVersion: 2018,
      //sourceFile: sourceFile,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: false,
        globalReturn: false,
        impliedStrict: true,
        experimentalObjectRestSpread: true,
      },
    },
    isModuleError(e) {
      return e.name === 'SyntaxError' &&
             e.message.match(/'import' and 'export' may appear only with 'sourceType: module'/);
    },
    methods: {
      script: 'parse', // 'parseScript' for esprima
      module: 'parse', // 'parseModule' for esprima
    },
  } }) {

  class JsInjectionHandler extends InjectionHandlerBase {
    parse() {
      let targetAst;
      try {
        targetAst = parser[parserOptions.methods.script](this.injector.data, parserOptions.script);
      }
      catch (e) {
        if (parserOptions.isModuleError(e)) {
          targetAst = parser[parserOptions.methods.module](this.injector.data, parserOptions.module);
        }
        else {
          throw e;
        }
      }
      // Support prev and next attributes
      const attachSiblings = (ast) => {
        for (let prop in ast) {
          if (ast.type === 'Program' && (prop === 'comments' || prop === 'tokens')) {
            continue;
          }
          if (ast[prop] && (ast[prop].prev || ast[prop].next)) {
            continue;
          }
          if (Array.isArray(ast[prop])) {
            for (let i = 0; i < ast[prop].length; i++) {
              if (ast[prop][i] && typeof ast[prop][i].type === 'string') {
                let prev, next;
                if (i === 0) {
                  prev = null;
                }
                else {
                  prev = ast[prop][i - 1];
                }
                if (i >= ast[prop].length - 1) {
                  next = null;
                }
                else {
                  next = ast[prop][i + 1];
                }
                ast[prop][i].prev = prev;
                ast[prop][i].next = next;
                attachSiblings(ast[prop][i]);
              }
            }
          }
          else if (ast[prop] && typeof ast[prop].type === 'string') {
            attachSiblings(ast[prop]);
          }
        }
      }
      attachSiblings(targetAst);
      if (estraverse) {
        targetAst = estraverse.attachComments(targetAst, targetAst.comments, targetAst.tokens);
      }
      return { targetAst, parser, estraverse, esquery };
    }
    select(selector = '') {
      let { targetAst, parser, esquery } = this.injector.parsedData;
      let jsSelector = esquery.parse(selector);
      let selected = this.injector.selected;
      if (!(selected && selected.length > 0)) {
        selected = targetAst;
      }
      let nodes;
      if (Array.isArray(selected)) {
        nodes = new Set();
        for (let node of selected) {
          let _nodes = esquery.match(node, jsSelector);
          if (!_nodes) {
            continue;
          }
          for (let matchedNodes of _nodes) {
            nodes.add(matchedNodes);
          }
        }
        nodes = [...nodes];
      }
      else {
        nodes = esquery.match(selected, jsSelector);
      }
      return nodes;
    }
    _locator(node) {
      if (node && typeof node.start === 'number' && typeof node.end === 'number') {
        let { start, end } = node;
        return { start, end };
      }
      return null;
    }
    _getIndent(node) {
      let indent = '';
      let start = this._getIndex(node.loc.start);
      let data = this.injector.data;
      let previousNewLine = data.lastIndexOf('\n', start);
      let precedingSpaces = data.substring(previousNewLine + 1, start);
      if (precedingSpaces.match(/^\s$/)) {
        indent = prviousNewLine >= 0 ? '\n' + precedingSpaces : precedingSpaces;
      }
      return indent;
    }
    inject(string) {
      let action = this.injector.action;
      let selected = this.injector.selected;
      let Injector = this.injector.constructor;
      let data = this.injector.data;
      let injected = data;
      let prefix, postfix;
      for (let node of selected) {
        let position = this._locator(node);
        if (position && position.start >= 0 && position.end >= 0) {
          switch (action) {
          case Injector.REPLACE:
            injected = `${data.slice(0, position.start)}${string}${data.slice(position.end)}`;
            break;
          case Injector.INSERT_BEFORE:
            prefix = '';
            postfix = '';
            injected = `${data.slice(0, position.start)}${prefix}${string}${postfix}${data.slice(position.start)}`;
            break;
          case Injector.INSERT_AFTER:
            prefix = '';
            postfix = '';
            injected = `${data.slice(0, position.end)}${prefix}${string}${postfix}${data.slice(position.end)}`;
            break;
          case Injector.NONE:
          case Injector.PREPEND_CHILD:
          case Injector.APPEND_CHILD:
            break;
          default:
            throw new Error(`${this.constructor.name}: inject() unknown action "${action}" for injecting ${string}`);
          }
        } 
        else {
          throw new Error(`${this.constructor.name}: inject() cannot locate position to inject ${string}`);
        }
      }
      return injected;
    }
  }

  return JsInjectionHandler;
}

module.exports = {
  JsInjectionHandlerFactory,
}