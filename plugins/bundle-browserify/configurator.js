/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const browserify = require('browserify');
const browserifyBuiltins = require('browserify/lib/builtins.js');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const pluginName = 'bundle-browserify';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const tasks = [];

  const registerComponents = (done) => {
    this.bundles = this.bundles || {};
    this.bundles.components = this.bundles.components || {};
    this.bundles.components.targetConfig = this;
    this.bundles.components.browserify = browserify;
    this.bundles['node-builtins-wrapper'] = this.bundles['node-builtins-wrapper'] || {};
    this.bundles['node-builtins-wrapper'].browserify = browserifyBuiltins;
    done();
  }
  registerComponents.displayName = `${pluginName} register-components`;
  tasks.push(registerComponents);

  // Hook CommonJs modules in browserify
  // NOTES:
  // - Wrappers are not hooked
  this.bundles.targets.filter(target => this.bundles[target.bundler].configurator === pluginName).forEach(target => {
    let task = () => {
      let stream = this.bundles.components.browserify(path.resolve(target.entryBase, target.entry), this.bundles[target.bundler].browserify(target, this));
      let transforms = this.bundles[target.bundler].transform(target, this);
      if (!(Array.isArray(transforms) && Array.isArray(transforms[0]))) {
        transforms = [transforms];
      }
      transforms.forEach(([transform, options]) => {
        stream = stream.transform(transform, options);
      });
      stream = stream
        .bundle()
        .pipe(source(target.output))
        .pipe(buffer())
        .pipe(through.obj((file, end, callback) => {
          if (path.extname(file.path) === '.js') {
            this['no-hook-authorization'] = this['no-hook-authorization'] || {};
            this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
            this['no-hook-authorization'].hash[path.resolve(target.outputBase, target.output)] = true;
          }
          callback(null, file);
        }))
        .pipe(this.gulp.dest(destPath));
      return stream;
    };
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