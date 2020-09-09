/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const del = require('del');

const pluginName = 'clean-gzip-json';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  return () => del(['cache-bundle.json', 'integrity.json'].map(n => path.resolve(destPath, n + '.gz')), { base: destPath });
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};