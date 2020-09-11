/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const rename = require('gulp-rename');

const pluginName = '@thin-hook/build-test-html';

const configurator = function (targetConfig) {
  const hook = this['thin-hook'].hook;
  return () => this.gulp.src([path.resolve(this.path.hook, this.path.test, '**/*-test-original.html')], { base: path.resolve(this.path.hook, this.path.test) })
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      let transformed = hook.serviceWorkerTransformers.encodeHtml(html);
      file.contents = Buffer.from(transformed);
      callback(null, file);
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/-original$/, '');
    }))
    .pipe(this.gulp.dest(path.resolve(this.path.hook, this.path.test)));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};