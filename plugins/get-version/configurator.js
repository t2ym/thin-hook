/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

const pluginName = 'get-version';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  let version = 'version_1';
  return (done) => {
    version = 'version_' + this['hook-min-js'].searchParams.version;
    if (!this[pluginName]) {
      this[pluginName] =  {};
    } 
    this[pluginName].version = version;
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};