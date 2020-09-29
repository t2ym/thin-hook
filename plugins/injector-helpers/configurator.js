/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { InjectorFactory, InjectionHandlerBase } = require('target-injector');
const { HtmlInjectionHandlerFactory } = require('target-injector/HtmlInjectionHandlerFactory.js');
const { JsInjectionHandlerFactory } = require('target-injector/JsInjectionHandlerFactory.js');

const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const cssauron = require('cssauron');

const parser = require('espree'); // can be esprima or acorn
const estraverse = 'estraverse'; // hand a string specifier to patch the component in InjectorFactory
const esquery = require('esquery');

const pluginName = 'injector-helpers';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  
  return (done) => {
    const Injector = InjectorFactory({
      html: {
        factory: HtmlInjectionHandlerFactory,
        components: {
          Parser, DomHandler, cssauron,
        },
        extensions: [ '.html', '.htm' ],
      },
      js: {
        factory: JsInjectionHandlerFactory,
        components: {
          parser, estraverse, esquery, /*, parserOptions: parserOptions */
        },
        extensions: [ '.js', '.mjs' ],
      },
    });
    
    this.inject = this.inject || {};
    this.inject.components = this.inject.components || {};
    this.inject.components.targetConfig = this;
    this.inject.components.Injector = Injector;
    this.inject.components.InjectionHandlerBase = InjectionHandlerBase;
    this.inject.components.HtmlInjectionHandlerFactory = HtmlInjectionHandlerFactory;
    this.inject.components.JsInjectionHandlerFactory = JsInjectionHandlerFactory;
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};