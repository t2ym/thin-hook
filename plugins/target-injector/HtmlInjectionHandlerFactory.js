/*
@license https://github.com/t2ym/thin-hook/blob/master/plugins/target-injector/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const { InjectionHandlerBase } = require('./InjectionHandlerBase.js');

function HtmlInjectionHandlerFactory({ Parser, DomHandler, cssauron }) {

  class EnumerableDomHandler extends DomHandler {
    constructor(...args) {
      super(...args);
      this.allNodes = new Set();
    }
    addNode(node) {
      super.addNode(node);
      this.allNodes.add(node);
    }
  }

  class HtmlInjectionHandler extends InjectionHandlerBase {
    parse() {
      let dom;
      const domHandler = new EnumerableDomHandler(
        function (error, _dom) {
          if (error) {
            throw error;
          } else {
            dom = _dom;
          }
        }, 
        {
          withStartIndices: true,
          withEndIndices: true,
        }
      );
      const parser = new Parser(domHandler, { lowerCaseTags: false, lowerCaseAttributeNames: false, recognizeSelfClosing: true });
      parser.write(this.injector.data);
      parser.end();
      const language = cssauron({
        tag: 'name',
        contents: function(node) { return node && node.children && node.children[0] ? node.children[0].data || '' : ''; },
        id: function(node) { return node && node.attribs ? node.attribs.id : null; },
        class: function (node) { return node && node.attribs ? node.attribs.class : null; },
        parent: 'parent',
        children: function (node) { return node && node.children ? node._children || (node._children = node.children.filter(child => ['tag','script'].includes(child.type))) : [] },
        attr: function (node, attr) { return node && node.attribs ? node.attribs[attr] : undefined; },
      }, function(type, pattern, data) {
        if ((type === 'tag' || type === 'script') && typeof pattern === 'string' && typeof data === 'string') {
          return pattern.toLowerCase() === data.toLowerCase();
        } else {
          return pattern === data;
        }
      });
      return { dom, parser, domHandler, language };
    }
    select(selector = '') {
      let { dom, parser, domHandler, language } = this.injector.parsedData;
      let htmlSelector = language(selector);
      let nodes = new Set();
      let selected = this.injector.selected;
      if (!(selected && selected.length > 0)) {
        selected = domHandler.allNodes;
      }
      for (let node of selected) {
        let _nodes = htmlSelector(node);
        if (!_nodes) {
          continue;
        }
        if (!Array.isArray(_nodes)) {
          _nodes = [_nodes];
        }
        for (let matchedNodes of _nodes) {
          nodes.add(matchedNodes);
        }
      }
      return [...nodes];
    }
    _locator(node) {
      if (node) {
        let { startIndex, endIndex } = node;
        if (typeof startIndex === 'number' && startIndex >= 0 && typeof endIndex === 'number' && endIndex >= 0) {
          return { start: startIndex, end: endIndex + 1, };
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
    _getIndent(node) {
      let indent = '';
      if (node.prev && node.prev.type === 'text') {
        if (typeof node.prev.data === 'string') {
          let match = node.prev.data.match(/(\n[ \t]*)$/);
          if (match) {
            indent = match[1]; // indentation
          }
        }
      }
      return indent;
    }
    _getFirstChildPos(node, data) {
      if (node.type === 'tag' || node.type === 'script') {
        let openTagEnd = data.indexOf('>', node.startIndex);
        if (openTagEnd >= 0) {
          return openTagEnd + 1; // just after <tagName>
        }
      }
      return node.endIndex + 1; // appending
    }
    _getLastChildPos(node, data) {
      if (node.type === 'tag' || node.type === 'script') {
        let closeTagStart = data.lastIndexOf('</', node.endIndex);
        if (closeTagStart >= 0) {
          return closeTagStart; // just before </tagName>
        }
      }
      return node.endIndex + 1; // appending
    }
    inject(string) {
      let action = this.injector.action;
      let childIndent = this.injector.options.childIndent || '  ';
      let selected = this.injector.selected;
      let Injector = this.injector.constructor;
      let data = this.injector.data;
      let injected = data;
      let prefix, postfix;
      let childPos;
      for (let node of selected) {
        let position = this._locator(node);
        if (position && position.start >= 0 && position.end >= 0) {
          switch (action) {
          case Injector.REPLACE:
            injected = `${data.slice(0, position.start)}${string}${data.slice(position.end)}`;
            break;
          case Injector.INSERT_BEFORE:
            prefix = '';
            postfix = this._getIndent(node);
            injected = `${data.slice(0, position.start)}${prefix}${string}${postfix}${data.slice(position.start)}`;
            break;
          case Injector.INSERT_AFTER:
            prefix = this._getIndent(node);
            postfix = '';
            injected = `${data.slice(0, position.end)}${prefix}${string}${postfix}${data.slice(position.end)}`;
            break;
          case Injector.PREPEND_CHILD:
            childPos = this._getFirstChildPos(node, data);
            prefix = this._getIndent(node);
            postfix = '';
            if (childPos <= node.endIndex) {
              if (prefix) {
                prefix += childIndent;
              }
            }
            injected = `${data.slice(0, childPos)}${prefix}${string}${postfix}${data.slice(childPos)}`;
            break;
          case Injector.APPEND_CHILD:
            childPos = this._getLastChildPos(node, data);
            prefix = this._getIndent(node);
            postfix = '';
            if (childPos <= node.endIndex) {
              postfix = prefix;
              if (prefix) {
                prefix = childIndent;
              }
            }
            injected = `${data.slice(0, childPos)}${prefix}${string}${postfix}${data.slice(childPos)}`;
            break;
          case Injector.NONE:
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

  return HtmlInjectionHandler;
}

module.exports = {
  HtmlInjectionHandlerFactory,
}