/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');

const pluginName = 'cache-bundle-automation-json';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'cache-bundle.json';
  return (done) => {
    const cacheAutomationScript = fs.readFileSync(this['automation-secret'].cacheAutomationScriptPath, 'utf-8');
    fs.writeFileSync(path.resolve(destPath, sourceFile), JSON.stringify({
      "version": this['get-version'].version,
      "https://thin-hook.localhost.localdomain/automation.json": JSON.stringify({
        "state": "init", // update state in the script to perform operations including reloading
        "serverSecret": this['automation-secret'].serverSecret,
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