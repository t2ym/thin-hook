/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const createHash = require('sha.js');
const File = require('vinyl');

const pluginName = 'integrity-json';

// generate integrity.json for static contents
const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const integrityJSONPath = path.resolve(destPath, 'integrity.json');
  const cacheBundleJSONPath = path.resolve(destPath, 'cache-bundle.json');
  let files = [];
  let integrity = {};
  let cacheBundleJSON;
  let toUrlPath = (fullPath) => { // convert full file path to URL path for the target application
    let urlPath;
    try {
      urlPath = this.mapper(this.url.mappings, fullPath);
    }
    catch (e) {
      throw new Error(`${pluginName}: toUrlPath(): "${fullPath}" cannot be mapped to URL`);
    }
    return urlPath;
  };
  const removeRedundantCacheBundleEntries = (integrity, cacheBundleJSON) => {
    let originalCacheBundle = JSON.parse(cacheBundleJSON);
    let keys = Object.keys(originalCacheBundle);
    let cacheBundle = {};
    for (let urlPath of keys) {
      if (urlPath === 'version') {
      }
      else if (!urlPath.startsWith('/')) {
      }
      else {
        let pathname = new URL(urlPath, 'https://localhost').pathname;
        if (integrity[pathname]) {
          // pathname is a static file
          if (typeof originalCacheBundle[urlPath] === 'object' &&
              typeof originalCacheBundle[urlPath].Location === 'string' &&
              originalCacheBundle[urlPath].Location.startsWith('/') &&
              !originalCacheBundle[urlPath]['Content-Type'] &&
              new URL(originalCacheBundle[urlPath].Location, 'https://localhost').pathname === pathname &&
              pathname !== toUrlPath(path.resolve(this.path.hook, 'hook.min.js'))) {
            continue; // skip redundant entry
          }
        }
      }
      cacheBundle[urlPath] = originalCacheBundle[urlPath];
    }
    cacheBundleJSON = JSON.stringify(cacheBundle, null, 2);
    let hash = createHash('sha256');
    hash.update(cacheBundleJSON);
    let digest = hash.digest('base64');
    integrity[toUrlPath(cacheBundleJSONPath)] = digest;
    return cacheBundleJSON;
  }
  return () => this.gulp.src(require(path.resolve(configPath, 'targets.js')).targets.call(this, this), { base: this.path.base })
    .pipe(through.obj(
      function (file, enc, callback) {
        if (file.contents) {
          if (file.path === cacheBundleJSONPath) {
            cacheBundleJSON = String(file.contents);
          }
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
        if (cacheBundleJSON) {
          cacheBundleJSON = removeRedundantCacheBundleEntries(integrity, cacheBundleJSON);
          this.push(new File({
            cwd: targetConfig.path.base,
            base: targetConfig.path.base,
            path: cacheBundleJSONPath,
            contents: Buffer.from(cacheBundleJSON),
          }));
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
    .pipe(this.gulp.dest(this.path.base));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'get-version' ],
};