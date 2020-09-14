/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

const pluginName = '@thin-hook/demo-gulpfile-js';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;

  return () => this.gulp.src([ path.resolve(pluginDirname, 'gulpfile.js') ], { base: pluginDirname })
    .pipe(this.gulp.dest(destPath))
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};