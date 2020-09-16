/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const through = require('through2');

// Hook transformer - browserify transform
function hookTransformFactory(contextGeneratorName, target, importMapperFactory, contextGeneratorHelper) {
  const targetConfig = this.targetConfig; // this === this.bundles.components
  const hook = targetConfig['thin-hook'].hook;
  hook.contextGenerators[contextGeneratorName] = 
    targetConfig.bundles.components.bundlerContextGeneratorFactory(
      targetConfig.bundles['node-builtins-wrapper'][contextGeneratorName] || {},
      contextGeneratorHelper
    );
  
  return function hookTransform(file) {
    let chunks = [];
    function transform(chunk, encoding, callback) {
      chunks.push(chunk);
      callback();
    }
    function flush(callback) {
      let stream = this;
      let code = Buffer.concat(chunks).toString();
      let context = targetConfig.mapper(targetConfig.url.mappings, file);
      if (!file.match(/\/node_modules\/webpack\/buildin\/module[.]js$/)) { // TODO: Hooking webpack/buildin/module.js raises an error
        if (importMapperFactory) {
          hook.parameters.importMapper = importMapperFactory.call(targetConfig, file);
        }
        code = hook(code,
          '__hook__', // hookName = '__hook__',
          [ Object.assign([ context, {} ], { source: file, targetConfig, }) ], // initialContext = [],
          contextGeneratorName, // contextGeneratorName = 'method',
          true, // metaHooking = true,
          true, // _hookProperty = getHookProperty(),
          targetConfig.bundles['thin-hook'].sourceMap(file, targetConfig), // _sourceMap = null,
          false, // asynchronous = false,
          targetConfig.bundles['thin-hook'].compact, // _compact = getCompact(),
          true, // _hookGlobal = getHookGlobal(),
          targetConfig.bundles['thin-hook'].hookPrefix, // _hookPrefix = getHookPrefix(),
          targetConfig.bundles['thin-hook'].initialScope(file, target, targetConfig), // initialScope = null
        );
        if (importMapperFactory) {
          hook.parameters.importMapper = null;
        }
      }
      console.log('hook ', file);
      stream.push(code);
      callback(null);
    }
    return through(transform, flush);
  }
}

module.exports = {
  hookTransformFactory,
};