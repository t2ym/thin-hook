/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');

const pluginName = 'get-version';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this.path.decodedIndexHtml || 'original-index.html';
  let version = 'version_1';
  return (done) => this.gulp.src([path.resolve(destPath, sourceFile)])
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      let versionIndex = html.indexOf('/hook.min.js?version=') + '/hook.min.js?version='.length;
      let versionIndexEnd = html.indexOf('&', versionIndex);
      version = 'version_' + html.substring(versionIndex, versionIndexEnd);
      callback(null, file);
    }))
    .pipe(through.obj((file, enc, callback) => {
      this[pluginName] = this[pluginName] || {};
      this[pluginName].version = version;
      done();
    }));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};