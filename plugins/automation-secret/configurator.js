/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');
const crypto = require('crypto');
const createHash = require('sha.js');
const readline = require('readline');

const pluginName = 'automation-secret';

const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  const pluginDirname = __dirname;
  const sourceFile = targetConfig[pluginName] && targetConfig[pluginName].sourceFile
    ? targetConfig[pluginName].sourceFile
    : 'cache-automation.js';
  return (done) => gulp.src([path.resolve(destPath, sourceFile)])
    .pipe(through.obj((file, enc, callback) => {
      // server secret for cache-automation.js
      (async () => {
        let usePreconfiguredServerSecret = false;
        if (targetConfig[pluginName] && targetConfig[pluginName].serverSecret) {
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          usePreconfiguredServerSecret = await new Promise((resolve, reject) => {
            rl.question(`
  
*****************************************************************************************************************************************
  
plugin: ${pluginName}
  
targetConfig["${pluginName}"].serverSecret is set as "${targetConfig[pluginName].serverSecret}"
  
The current configuration must be solely for debugging purposes and must never be applied for production.
If serverSecret should be known to attackers, the web application would have a severe vulnerability through a crafted automation script.
The obligatory configuration for production is to use a onetime random serverSecret that is immediately discarded after each build.

*****************************************************************************************************************************************
  
Can you confirm this vulnerable configuration for serverSecret? (y/N) `, (answer) => {
              rl.close();
              if (['y', 'Y', 'yes', 'YES'].indexOf(answer) >= 0) {
                console.log('Preconfigured serverSecret is used');
                resolve(true);
              }
              else {
                console.log('Onetime random serverSecret is used');
                resolve(false);
              }
            });
          });
        }
        const serverSecret = usePreconfiguredServerSecret ? targetConfig[pluginName].serverSecret : crypto.randomFillSync(Buffer.alloc(32)).toString('hex');
        const cacheAutomationScript = String(file.contents);
        let authorization; // sha256(serverSecret + cacheAutomationScript)
        let hash = createHash('sha256');
        hash.update(serverSecret + cacheAutomationScript);
        authorization = hash.digest('hex');
        targetConfig[pluginName] = targetConfig[pluginName] || {};
        targetConfig[pluginName].serverSecret = serverSecret;
        targetConfig[pluginName].cacheAutomationScriptPath = file.path;
        targetConfig[pluginName].authorization = authorization;
        //console.log(targetConfig);
        done();
      })();
    }));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};