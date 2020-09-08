/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const rename = require('gulp-rename');

const fs = require('fs');

const pluginName = '@thin-hook/module-examples';

const configurator = (targetConfig) => {
  const destPath = targetConfig['@thin-hook/examples'].base;
  const pluginDirname = __dirname;
  const moduleExampleDependencies = {};
  const moduleExamples = []
  const hook = targetConfig['thin-hook'].hook;
  
  return () => targetConfig.gulp.src([ 'module*.js', 'export*.js', 'circular*.js', '!module-import1.js', '!plugins/**/*' ].map(glob => {
        if (glob.startsWith('!')) {
          return '!' + path.resolve(targetConfig['@thin-hook/examples'].base, glob.substring(1));
        }
        else {
          return path.resolve(targetConfig['@thin-hook/examples'].base, glob);
        }
      }))
    //.pipe(sourcemaps.init())
    .pipe(through.obj(function (file, enc, callback) {
      // bundle files must come earlier
      moduleExamples.push(file);
      callback();
    }, function (callback) {
      moduleExamples.sort(function(file1, file2) {
        var path1 = file1.path;
        var path2 = file2.path;
        return path1.localeCompare(path2);
      });
      for (let i = 0; i < moduleExamples.length; i++) {
        let file = moduleExamples[i];
        let code = String(file.contents);
        let basename = path.basename(file.path);
        let relativePath = path.relative(targetConfig.path.hook, file.path);
        const origin = 'location.origin';
        let baseURL = path.join(targetConfig[pluginName].baseURL, relativePath);
        let normalizedBaseURL = baseURL[0] === '/'
          ? 'https://' + origin + baseURL
          : baseURL;
        let resolvedURLCache = new Map();
        let json = fs.readFileSync(targetConfig[pluginName].importMapsPath, 'UTF-8');
        hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(json, normalizedBaseURL);
        hook.parameters.importMapper =
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
        hook.parameters.moduleDependencies = moduleExampleDependencies;
        let hooked = hook(code, '__hook__', [ [ baseURL, { static: '__context_mapper__' } ] ], 'cachedMethod');
        file.contents = Buffer.from(hooked);
        this.push(file);
      }
      hook.parameters.importMapper = null;
      callback();
    }))
    .pipe(rename(_path => { _path.basename = 'hooked.' + _path.basename; }))
    //.pipe(sourcemaps.write('.'))
    .pipe(targetConfig.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};