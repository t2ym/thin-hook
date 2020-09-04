/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

// get thin-hook package path even from within thin-hook package
const hookPath = (() => {
  try {
    let hookJs = require.resolve('thin-hook');
    if (hookJs) {
      return path.dirname(hookJs);
    }
  }
  catch (e) {}
  let dirname = __dirname;
  let packageName;
  while (!packageName) {
    let packagePath = path.resolve(dirname, 'package.json');
    if (fs.existsSync(packagePath)) {
      let package = require(packagePath);
      packageName = package.name;
      break;
    }
    dirname = path.resolve(dirname, '..');
    if (dirname === '/') {
      break;
    }  
  }
  if (packageName === 'thin-hook') {
    return dirname;
  }
  else {
    return path.resolve(__dirname, '..');
  }
})();

const basePath = module.parent.path;
const configPath = __dirname;
const plugins = 'plugins';

// register gulp task
// Note: this function must be called via targetConfig.task() so that this is the targetConfig object
const task = function (pluginName) {
  const targetConfig = this;
  const configuratorPath = path.resolve(targetConfig.path.hook, targetConfig.path.plugins, pluginName, 'configurator.js');
  const plugin = require(configuratorPath);
  if (plugin.name !== pluginName) {
    throw new Error(`targetConfig.task("${pluginName}"): plugin.name === ${plugin.name} does not match`);
  }
  return gulp.task(pluginName,
    gulp.series(
      Object.assign((done) => {
        if (Array.isArray(plugin.dependencies)) {
          plugin.dependencies.forEach(dependency => {
            if(!(targetConfig[dependency] && targetConfig[dependency].done)) {
              throw new Error(`plugin task "${pluginName}": dependent task "${dependency}" has not completed`);
            }
          });
        }
        done();
      }, { displayName: `${pluginName} check dependencies` }),
      Object.assign(plugin.configurator(targetConfig), { displayName: `${pluginName} configurator` }),
      Object.assign((done) => {
        targetConfig[pluginName] = targetConfig[pluginName] || {};
        targetConfig[pluginName].done = true;
        done();
      }, { displayName: `${pluginName} done` }),
    )
  );
}

const targetConfig = {
  task: task,
  path: {
    base: basePath,
    root: 'demo',
    config: path.relative(basePath, configPath),
    backend: 'demo-backend',
    frontend: 'demo-frontend',
    keys: 'demo-keys',
    encodedIndexHtml: 'index.html',
    decodedIndexHtml: 'original-index.html',
    hook: hookPath,
    plugins: plugins,
  },
  url: {
    mappings: [
      // [ fullPath, urlPath ] in directory path names
      [path.resolve(basePath, 'bower_components'), '/components'], // highest priority in mapping
      [path.resolve(basePath, 'demo'), '/components/thin-hook/demo'], // path.resolve(targetConfig.path.base, targetConfig.path.root) is interpreted as root
      [hookPath, '/components/thin-hook'], // for hook.min.js
    ],
  },
  mode: {
    enableDebugging: false,
    devtoolsDisabled: true,
  },
};

module.exports = targetConfig;
