/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const zlib = require('pako');

const pluginName = 'gzip-json';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  return () => this.gulp.src(['cache-bundle.json', 'integrity.json'].map(n => path.resolve(destPath, n)), { base: destPath })
    .pipe(through.obj((file, enc, callback) => {
      file.contents = Buffer.from(zlib.gzip(file.contents));
      file.path += '.gz';
      callback(null, file);
    }))
    .pipe(this.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};