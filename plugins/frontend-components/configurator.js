/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');

const pluginName = 'frontend-components';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const cacheBundleJSONPath = path.resolve(destPath, 'cache-bundle.json');

  return function () {
    const cacheBundle = require(cacheBundleJSONPath);
    const blocked = [];
    for (let cached in cacheBundle) {
      if (cached === 'version') {
        continue;
      }
      if (!cached.startsWith('/')) {
        continue;
      }
      let url = new URL(cached, 'https://localhost');
      if (url.searchParams.get('no-hook') === 'true') {
        continue;
      }
      blocked.push('!' + this.mapper(this.url.reverseMappings, url.pathname));
    }
  
    return this.gulp.src(require(path.resolve(configPath, 'targets.js')).targets.call(this, this, blocked))
      .pipe(through.obj((file, enc, callback) => {
        file.path = path.resolve(this.path.base, this.path.frontend, this.mapper(this.url.mappings, file.path).substring(1));
        file.base = path.resolve(this.path.base, this.path.frontend);
        callback(null, file);
      }))
      .pipe(this.gulp.dest(path.resolve(this.path.base, this.path.frontend)));
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};