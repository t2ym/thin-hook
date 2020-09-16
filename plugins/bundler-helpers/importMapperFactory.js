/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');

function importMapperFactory(filePath) {
  const targetConfig = this;
  const hook = targetConfig['thin-hook'].hook;
  const importMapsJson = fs.readFileSync(path.resolve(targetConfig.path.base, targetConfig.path.root, targetConfig['import-maps'].importMapName), 'utf8');
  const origin = 'location.origin';
  let baseURLPath = targetConfig.mapper(targetConfig.url.mappings, filePath);
  let normalizedBaseURL = baseURLPath[0] === '/'
    ? 'https://' + origin + baseURLPath
    : baseURLPath;
  let resolvedURLCache = new Map();
  hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(importMapsJson, normalizedBaseURL);
  hook.parameters._importMapper =
    (specifier, scriptURL) => {
      const key = specifier + ';' + scriptURL;
      let resolvedURL = resolvedURLCache.get(key);
      if (!resolvedURL) {
        if (scriptURL[0] === '/') {
          scriptURL = 'https://' + origin + scriptURL;
        }
        if (specifier.endsWith('/')) {
          specifier = specifier.substring(0, specifier.length - 1);
        }
        resolvedURL = hook.utils.importMaps.resolve(specifier, hook.parameters.parsedImportMap, new URL(scriptURL));
        if (resolvedURL.host === origin) {
          resolvedURL = resolvedURL.pathname + resolvedURL.search + resolvedURL.hash;
        }
        else {
          resolvedURL = resolvedURL.href;
        }
        resolvedURLCache.set(key, resolvedURL);
      }
      //console.log(`importMapper(${specifier}, ${scriptURL}) = ${resolvedURL}`);
      return resolvedURL;
    }
  return hook.parameters._importMapper;
};
  
module.exports = {
  importMapperFactory,
};