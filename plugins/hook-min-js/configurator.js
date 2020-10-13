/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const gulpIf = require('gulp-if');

const pluginName = 'hook-min-js';

const configurator = function (targetConfig) {
  const source = path.resolve(this.path.hook, 'hook.min.js');
  const dest = this[pluginName].dest;
  const pluginDirname = __dirname;

  return () => this.gulp.src([ source ], { base: this.path.hook })
    .pipe(gulpIf(dest && source !== dest, this.gulp.dest(path.dirname(dest))))
    .pipe(through.obj((file, end, callback) => {
      if (path.extname(file.path) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        this['no-hook-authorization'].hash[file.path] = true;
      }
      callback(null, file);
    }));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};