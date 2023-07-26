/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2023, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');

const pluginName = 'non-js-imports';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const pluginDirname = __dirname;
  const wrapper = this['non-js-imports'].wrapper;
  let sources = this['non-js-imports'].sources;
  if (sources.length == 0) {
    sources = [ 'inexistent-dummy-glob-for-avoiding-error' ];
  }
  return () => this.gulp.src(sources, { allowEmpty: true })
    .pipe(through.obj((file, enc, callback) => {
      wrapper(file, callback);
    }))
    .pipe(this.gulp.dest(function (file) {
      //console.log(path.dirname(file.path));
      return path.dirname(file.path);
    }))
    /*
    .pipe(through.obj((file, end, callback) => {
      if (path.extname(file.path) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        this['no-hook-authorization'].hash[file.path] = true;
      }
      callback(null, file);
    }))
    */
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};