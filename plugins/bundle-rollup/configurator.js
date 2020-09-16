/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const rollupPluginBrowserifyTransform = require('rollup-plugin-browserify-transform');

const pluginName = 'bundle-rollup';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const moduleDependenciesFileName = 'moduleDependencies.json'; // TODO: make configurable
  const hook = this['thin-hook'].hook;
  const tasks = [];

  const registerComponents = (done) => {
    this.bundles = this.bundles || {};
    this.bundles.components = this.bundles.components || {};
    this.bundles.components.targetConfig = this;
    this.bundles.components.rollup = rollup;
    this.bundles.components.rollupPluginBrowserifyTransform = rollupPluginBrowserifyTransform;
    this.bundles['node-builtins-wrapper'] = this.bundles['node-builtins-wrapper'] || {};
    this.bundles['node-builtins-wrapper'].rollup = {};
    done();
  }
  registerComponents.displayName = `${pluginName} register-components`;
  tasks.push(registerComponents);
  
  // Hook ES6 modules in rollup
  const task = async () => {
    let targets = this.bundles.targets.filter(target => this.bundles[target.bundler].configurator === pluginName);
    hook.parameters.moduleDependencies = Object.create(null);
    for (let target of targets) {
      const bundle = await this.bundles.components.rollup.rollup(this.bundles[target.bundler].inputOptions(target, this));
      await bundle.write(this.bundles[target.bundler].outputOptions(target, this));
      if (path.extname(target.output) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        this['no-hook-authorization'].hash[path.resolve(target.outputBase, target.output)] = true;
      }
    }

    // sort names in moduleDependencies
    const moduleDependencies = hook.parameters.moduleDependencies; // store the original
    hook.parameters.moduleDependencies = Object.create(null);
    for (let name of Object.getOwnPropertyNames(moduleDependencies).sort()) {
      hook.parameters.moduleDependencies[name] = moduleDependencies[name];    
    }
  
    fs.writeFileSync(
      path.resolve(this.path.base, this.path.root, moduleDependenciesFileName),
      JSON.stringify(hook.parameters.moduleDependencies, null, 2),
      'utf8'
    );
    hook.parameters.moduleDependencies = null;
  }
  task.displayName = `${pluginName} bundle-modules`;
  tasks.push(task);

  return this.gulp.series(...tasks);
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'bundler-helpers' ],
};