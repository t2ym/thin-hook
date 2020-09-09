/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const through = require('through2');
const createHash = require('sha.js');

const pluginName = 'script-hashes-integrity';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'cache-bundle.json';
  return () => this.gulp.src([ path.resolve(destPath, this.path.encodedIndexHtml), path.resolve(destPath, this.path.decodedIndexHtml) ])
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      const cacheBundle = require(path.resolve(destPath, sourceFile));
      const scriptHashes = JSON.parse(cacheBundle[this['script-hashes'].SCRIPT_HASHES_PSEUDO_URL]);
      const scriptHashesJs = fs.readFileSync(path.resolve(destPath, 'script-hashes.js'), 'UTF-8');
      const mutatedScriptHashesJs = scriptHashesJs.replace('hook.parameters.scriptHashes = {}', 'hook.parameters.scriptHashes = ' + JSON.stringify(scriptHashes, null, 2));
      const hashFunction = 'sha256';
      const hash = createHash(hashFunction);
      hash.update(mutatedScriptHashesJs);
      const integrity = hashFunction + '-' + hash.digest('base64');
      const scriptUrl = 'script-hashes.js[?]no-hook=true&service-worker-ready=false';
      html = html.replace(new RegExp(`src="(${scriptUrl})"( *)integrity="([^"]*)( [^"]*)?"`), `src="$1"$2integrity="$3 ${integrity}"`);
      /*
      console.log('scriptHashes = ' + JSON.stringify(scriptHashes, null, 2));
      console.log('scriptHashesJs = ' + scriptHashesJs);
      console.log('mutatedScriptHashesJs = ' + mutatedScriptHashesJs);
      */
      console.log('mutatedScriptHashesJs integrity = ' + integrity);
      //console.log('html = ' + html);
      file.contents = Buffer.from(html);
      callback(null, file);
    }))
    .pipe(this.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'script-hashes' ],
};