/*
@license https://github.com/t2ym/thin-hook/blob/master/plugins/target-injector/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');

const { InjectionHandlerBase } = require('./InjectionHandlerBase.js');

function InjectorFactory(handlers) {

  class Injector {
    constructor(target, options = {}) {
      this.target = target;
      this.options = options;
      this.setHandlers();
      this.detectType();
      this.readData();
    }
    setHandlers() {
      this.handlers = {};
      if (this.constructor.handlers) {
        for (let handler in this.constructor.handlers) {
          if (InjectionHandlerBase.isPrototypeOf(this.constructor.handlers[handler])) {
            this.handlers[handler] = this.constructor.handlers[handler];
          }
          else {
            throw new Error(`${this.constructor.name}: Invalid handler handlers["${handler}"]`);
          }
        }
      }
      if (this.options.handlers) {
        for (let handler in this.options.handlers) {
          if (InjectionHandlerBase.isPrototypeOf(this.options.handlers[handler])) {
            this.handlers[handler] = this.options.handlers[handler];
          }
          else {
            throw new Error(`${this.constructor.name}: Invalid handler options.handlers["${handler}"]`);
          }
        }
      }
    }
    readData() {
      if (typeof this.options.data === 'string') {
        this.data = this.options.data;
      }
      else {
        this.data = fs.readFileSync(this.target, 'utf-8');
      }
    }
    detectType() {
      if (typeof this.options.type === 'string') {
        this.type = this.options.type;
      }
      else {
        let extension = path.extname(this.target);
        if (this.constructor.types[extension]) {
          this.type = this.constructor.types[extension];
        }
        else {
          this.type = this.constructor.types['*'];
        }
      }
    }
    parse() {
      if (this.handlers[this.type]) {
        let Handler = this.handlers[this.type];
        this.handler = new Handler(this);
      }
      else {
        throw new Error(`${this.constructor.name}: Handler for type ${this.type} is missing`);
      }
      if (this.injected) {
        // reparsing
        this.data = this.injected;
        this.selected = null;
      }
      this.parsedData = this.handler.parse();
      return this;
    }
    // select('selector1', 'selector2', ...)
    // select(function selector1(injector) { return "selector" }, ...)
    select(...selectors) {
      let selected;
      let selector;
      let found = false;
      this.selectors = selectors;
      for (let i = 0; i < selectors.length; i++) {
        selector = selectors[i];
        if (typeof selector === 'function') {
          selector = selector.call(this, this);
        }
        selected = this.handler.select(selector);
        if (Array.isArray(selected) && selected.length > 0) {
          this.selector = selector;
          this.selectorIndex = i;
          this.selected = selected;
          found = true;
          break;
        }
      }
      if (!found) {
        this.selector = null;
        this.selectorIndex = -1;
        this.selected = [];
      }
      return this;
    }
    // validate('action1forselector1', 'action2forselector2')
    // validate(function validator(injector) { })
    validate(...actions) {
      let validator = actions[0];
      if (typeof validator === 'function') {
        if (!validator.call(this, this)) {
          throw new Error(`${this.constructor.name}: ${this.target} is invalid ${this.error || ''}`);
        }
      }
      else {
        if (Array.isArray(this.selected) && this.selected.length === 1) {
          if (this.selectors[this.selectorIndex] === this.selector && typeof actions[this.selectorIndex] === 'string') {
            this.action = actions[this.selectorIndex];
          }
          else if (typeof actions[0] === 'string') {
            this.action = actions[0];
          }
        }
        else {
          throw new Error(`${this.constructor.name}: ${this.target} is invalid; only 1 node must be selected with selectors ${JSON.stringify(this.selectors, null, 2)}; \nselected = ${this.selected}`);
        }
      }
      return this;
    }
    // inject('string1', 'string2')
    // inject('string2', function callbackForString2 (injector) { return 'string' })
    inject(...strings) {
      let string;
      if (this.selectors[this.selectorIndex] === this.selector && typeof strings[this.selectorIndex] === 'string') {
        string = strings[this.selectorIndex];
      }
      else if (this.selectors[this.selectorIndex] === this.selector && typeof strings[this.selectorIndex] === 'function') {
        string = strings[this.selectorIndex].call(this, this);
      }
      else if (typeof strings[0] === 'string') {
        string = strings[0];
      }
      this.action = this.action || this.constructor.INSERT_AFTER;
      this.injected = this.handler.inject(string);
      return this;
    }
    // dest(outputPath)
    // dest((output) => { console.log(output); })
    dest(output) {
      if (typeof output === 'string') {
        fs.writeFileSync(output, this.injected, 'utf-8');
      }
      else if (typeof output === 'function') {
        output.call(this, this.injected);
      }
      return this;
    }
  }
  
  Object.assign(Injector, {
    REPLACE: 'replace',
    INSERT_BEFORE: 'insertBefore',
    INSERT_AFTER: 'insertAfter',
    PREPEND_CHILD: 'prependChild',
    APPEND_CHILD: 'appendChild',
    NONE: 'none',
    handlers: {},
    types: {},
  });

  // Set up Injector.handlers and Injector.types
  let estraverse;
  let defaultType;
  for (let type in handlers) {
    let { factory, components, extensions } = handlers[type];
    for (let name in components) {
      if (!defaultType) {
        defaultType = type;
      }
      if (type === 'js' && name === 'estraverse' && typeof components[name] === 'string') {
        estraverse = components[name];
        components[name] = null;
      }
      else if (name.endsWith('Options') && typeof components[name] === 'object') {
        continue;
      }
      else if (typeof components[name] !== 'string') {
        continue;
      }
      else {
        let component = require(components[name]);
        if (components[name] !== name) {
          component = component[name];
        }
        components[name] = component;
      }
    }
    Injector.handlers[type] = factory(components);
    for (let extension of extensions) {
      Injector.types[extension] = type;
    }
  }
  Injector.types['*'] = defaultType;
  
  if (handlers.js && typeof estraverse === 'string') {
    // patch estraverse.attachComments for trailingComments to work
    new Injector(require.resolve(estraverse))
      .parse().select(
        '[type="FunctionDeclaration"][id.name="attachComments"] ' +
        '[type="ObjectExpression"] ' +
        '[type="Property"][key.name="leave"] ' +
        '[type="BinaryExpression"][operator="<"] ' +
        '[type="MemberExpression"][object.property.name="extendedRange"]'
      ).validate('insertAfter').inject(' - 1')
      .parse().select(
        '[type="FunctionDeclaration"][id.name="attachComments"] ' +
        '[type="ObjectExpression"] ' +
        '[type="Property"][key.name="leave"] ' +
        '[type="BinaryExpression"][operator="==="] ' +
        '[type="MemberExpression"][object.property.name="extendedRange"]'
      ).validate('insertAfter').inject(' - 1')
      .parse().select(
        '[type="FunctionDeclaration"][id.name="attachComments"] ' +
        '[type="ObjectExpression"] ' +
        '[type="Property"][key.name="leave"] ' +
        '[type="BinaryExpression"][operator=">"] ' +
        '[type="MemberExpression"][object.property.name="extendedRange"]'
      ).validate('insertAfter').inject(' - 1')
      .dest(injected => {
        estraverse = {};
        let _module = { exports: estraverse };
        new Function('module', 'exports', 'require', injected)(_module, estraverse, require);
        Injector.handlers.js = handlers.js.factory(Object.assign(handlers.js.components, { estraverse }));
      });
  }

  return Injector;
}

module.exports = {
  InjectorFactory,
  InjectionHandlerBase,
}