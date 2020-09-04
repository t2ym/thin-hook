/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');
const createHash = require('sha.js');
const File = require('vinyl');

const pluginName = 'integrity-json';

// generate integrity.json for static contents
const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  const pluginDirname = __dirname;
  const integrityJSONPath = path.resolve(destPath, 'integrity.json');
  let files = [];
  let integrity = {};
  let toUrlPath = function (fullPath) { // convert full file path to URL path for the target application
    let urlPath;
    for (let [ _fullPath, _urlPath ] of targetConfig.url.mappings) {
      if (fullPath.startsWith(_fullPath + '/')) {
        urlPath = path.join(_urlPath, fullPath.substring(_fullPath.length + '/'.length));
        break;
      }
    }
    if (!urlPath) {
      throw new Error(`${pluginName}: toUrlPath(): "${fullPath}" cannot be mapped to URL`);
    }
    return urlPath;
  };
  return () => gulp.src(require(path.resolve(configPath, 'targets.js')).targets(targetConfig), { base: targetConfig.path.base })
    .pipe(through.obj(
      function (file, enc, callback) {
        if (file.contents) {
          let hash = createHash('sha256');
          hash.update(file.contents);
          let digest = hash.digest('base64');
          files.push([toUrlPath(file.path), digest]);
        }
        callback(null, null);
      },
      function (callback) {
        integrity.version = targetConfig['get-version'].version;
        files.sort((a, b) => a[0].localeCompare(b[0]));
        for (let file of files) {
          integrity[file[0]] = file[1];
        }
        //console.log(JSON.stringify(integrity, null, 2));
        this.push(new File({
          cwd: targetConfig.path.base,
          base: targetConfig.path.base,
          path: integrityJSONPath,
          contents: Buffer.from(JSON.stringify(integrity, null, 2)),
        }));
        callback();
      }
    ))
    .pipe(gulp.dest(targetConfig.path.base));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'get-version' ],
};