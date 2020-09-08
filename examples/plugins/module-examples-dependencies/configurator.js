/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const fs = require('fs');

const pluginName = '@thin-hook/module-examples-dependencies';

const configurator = (targetConfig) => {
  const pluginDirname = __dirname;
  const hook = targetConfig['thin-hook'].hook;
  
  return (done) => {
    fs.writeFileSync(targetConfig[pluginName].moduleDependenciesPath, JSON.stringify(hook.parameters.moduleDependencies, null, 2), 'utf8');
    hook.parameters.moduleDependencies = null;
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ '@thin-hook/module-examples' ],
};