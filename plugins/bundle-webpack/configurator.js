/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const nodeLibsBrowser = require('node-libs-browser');

const pluginName = 'bundle-webpack';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const tasks = [];

  const registerComponents = (done) => {
    this.bundles = this.bundles || {};
    this.bundles.components = this.bundles.components || {};
    this.bundles.components.targetConfig = this;
    this.bundles.components.webpack = webpack;
    this.bundles.components.webpackStream = webpackStream;
    this.bundles['node-builtins-wrapper'] = this.bundles['node-builtins-wrapper'] || {};
    this.bundles['node-builtins-wrapper'].webpack = nodeLibsBrowser;
    done();
  }
  registerComponents.displayName = `${pluginName} register-components`;
  tasks.push(registerComponents);

  // Hook modules in webpack
  // NOTES:
  // - Wrappers like __webpack_require__ are not hooked
  this.bundles.targets.filter(target => this.bundles[target.bundler].configurator === pluginName).forEach(target => {
    let task = () => this.bundles.components.webpackStream(this.bundles[target.bundler].options(target, this), this.bundles.components.webpack)
      .pipe(through.obj((file, end, callback) => {
        if (path.extname(file.path) === '.js') {
          this['no-hook-authorization'] = this['no-hook-authorization'] || {};
          this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
          this['no-hook-authorization'].hash[path.resolve(target.outputBase, target.output)] = true;
        }
        callback(null, file);
      }))
      .pipe(this.gulp.dest(target.outputBase));
    task.displayName = `${pluginName} ${target.output}`;
    tasks.push(task);
  });
  return this.gulp.series(...tasks);
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'bundler-helpers' ],
};