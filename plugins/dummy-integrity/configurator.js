/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');
const fs = require('fs');

const pluginName = 'dummy-integrity';

const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  const pluginDirname = __dirname;
  const sourceFile = targetConfig[pluginName] && targetConfig[pluginName].sourceFile
    ? targetConfig[pluginName].sourceFile
    : 'integrity.json';
  return (done) => {
    // generate a dummy demo/integrity.json for cache-bundle generation
    const cacheAutomationScript = fs.readFileSync(targetConfig['automation-secret'].cacheAutomationScriptPath, 'utf-8');
    fs.writeFileSync(path.resolve(destPath, sourceFile), JSON.stringify({
      "version": targetConfig['get-version'].version,
      "https://thin-hook.localhost.localdomain/automation.json": JSON.stringify({
        "state": "init", // update state in the script to perform operations including reloading
        "serverSecret": targetConfig['automation-secret'].serverSecret,
        "script": cacheAutomationScript,
      }, null, 0)
    }, null, 2));
    done();
  };
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'get-version', 'automation-secret' ],
};