/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const del = require('del');

const pluginName = 'clean-frontend';

const configurator = function (targetConfig) {
  return () => del([path.resolve(this.path.base, this.path.frontend)]);
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};