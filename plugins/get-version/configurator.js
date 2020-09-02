/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');

const pluginName = 'get-version';

const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  const pluginDirname = __dirname;
  const sourceFile = targetConfig.path.decodedIndexHtml || 'original-index.html';
  let version = 'version_1';
  return (done) => gulp.src([path.resolve(destPath, sourceFile)])
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      let versionIndex = html.indexOf('/hook.min.js?version=') + '/hook.min.js?version='.length;
      let versionIndexEnd = html.indexOf('&', versionIndex);
      version = 'version_' + html.substring(versionIndex, versionIndexEnd);
      callback(null, file);
    }))
    .pipe(through.obj((file, enc, callback) => {
      targetConfig[pluginName] = targetConfig[pluginName] || {};
      targetConfig[pluginName].version = version;
      //console.log('targetConfig', targetConfig);
      done();
    }));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};