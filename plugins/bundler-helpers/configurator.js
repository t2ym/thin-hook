/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { bundlerContextGeneratorFactory } = require('./bundlerContextGeneratorFactory.js');
const { hookTransformFactory } = require('./hookTransformFactory.js');
const { importMapperFactory } = require('./importMapperFactory.js');
const { contextGeneratorHelper } = require('./contextGeneratorHelper.js');

const pluginName = 'bundler-helpers';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  
  return (done) => {
    this.bundles = this.bundles || {};
    this.bundles.components = this.bundles.components || {};
    this.bundles.components.targetConfig = this;
    this.bundles.components.bundlerContextGeneratorFactory = bundlerContextGeneratorFactory;
    this.bundles.components.hookTransformFactory = hookTransformFactory;
    this.bundles.components.importMapperFactory = importMapperFactory;
    this.bundles.components.contextGeneratorHelper = contextGeneratorHelper;
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};