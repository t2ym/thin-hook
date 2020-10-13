/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

const pluginName = 'empty-document';

const configurator = function (targetConfig) {
  return this.inject.injectors.html(pluginName);
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'injector-helpers' ],
};