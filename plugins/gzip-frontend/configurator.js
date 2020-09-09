/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const zlib = require('pako');

const pluginName = 'gzip-frontend';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  return function () {
    const frontend = path.resolve(this.path.base, this.path.frontend);
    return this.gulp.src(require(path.resolve(configPath, 'targets.js')).targets.call(this, this), { base: frontend })
      .pipe(through.obj((file, enc, callback) => {
        let data = file.contents;
        if (data && data.byteLength > 1000) { // gzip files larger than 1000 bytes
          file.contents = Buffer.from(zlib.gzip(data));
          file.path += '.gz';
        }
        callback(null, file);
      }))
      .pipe(this.gulp.dest(frontend));
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};