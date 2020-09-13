/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const htmlparser = require('htmlparser2');
const createHash = require('sha.js');

const pluginName = 'script-hashes';

const SCRIPT_HASHES_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/script-hashes.json';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'cache-bundle.json';
  return () => this.gulp.src([ path.resolve(destPath, sourceFile) ])
    .pipe(through.obj((file, enc, callback) => {
      let cacheBundle = JSON.parse(String(file.contents));
      let hashes = {};
      /*
        Note: Metadata format
          cacheBundle = {
            "version": "version_123", // cache version
            "url?param=1": "body in string", // concise format for string data for .js, .html, .json, .svg; equivalent to { "body": "body in string", "Content-Type": "{type}" }
            "url?param=2": {
              "Location": "url?param=1", // link to the other content
              "Location": "data:image/jpeg;base64,...", // encoded body data; Note: "Location" appears only once in a metadata object, of course
              // If Non-dataURI "Location" exists, other metadata entries are ignored
              "Content-Type": "text/xml", // MIME type
              "body": "body in string", // content body
              "Other-Headers": "header value", // HTTP headers
            },
          }
      */
      for (let key in cacheBundle) {
        let content = cacheBundle[key];
        let url = new URL(key, 'https://localhost/');
        if (key === 'version') {
          continue;
        }
        if (typeof content === 'object') {
          if (typeof content['Content-Type'] === 'string' && content['Content-Type'].startsWith('text/html') && typeof content.body === 'string') {
            if (typeof content.body !== 'string') {
              continue;
            }
            content = content.body;
          }
          else {
            continue;
          }
        }
        let pathname = (url.protocol === 'https:' || url.protocol === 'http:') ? url.pathname : '';
        if (pathname && pathname.match(/([.]html?|[/])$/)) {
          let inScript = false;
          let inlineScript;
          let stream = new htmlparser.WritableStream({
            onopentag(name, attributes) {
              if (name === 'script') {
                inScript = true;
                inlineScript = '';
              }
              for (let attr in attributes) {
                let attrValue = attributes[attr];
                if (attrValue) {
                  let match = attrValue.match(/^\/\* ctx:(["'])([a-zA-Z0-9+/=]*)["'] raw:["']([a-zA-Z0-9+/=]*)["'] \*\/((.*\n?)*)$/);
                  if (match) {
                    const hash = createHash('sha256');
                    hash.update(attrValue);
                    let digest = hash.digest('hex');
                    hashes[digest] = decodeURIComponent(Buffer.from(match[2], 'base64').toString('binary'));
                  }
                }
              }
            },
            ontext(text) {
              if (inScript) {
                inlineScript += text;
              }
            },
            onclosetag(name) {
              if (name === 'script' && inScript) {
                if (inlineScript) {
                  let match = inlineScript.match(/^\/\* ctx:(["'])([a-zA-Z0-9+/=]*)["'] raw:["']([a-zA-Z0-9+/=]*)["'] \*\/((.*\n?)*)$/);
                  if (match) {
                    const hash = createHash('sha256');
                    hash.update(inlineScript);
                    let digest = hash.digest('hex');
                    hashes[digest] = decodeURIComponent(Buffer.from(match[2], 'base64').toString('binary'));
                  }
                }
              }
              inScript = false;
            }
          });
          stream.write(content);
          stream.end();
        }
      }
      let hashesJSON = JSON.stringify(hashes, null, 0);
      console.log('script-hashes = \n' + JSON.stringify(hashes, null, 2));
      cacheBundle[SCRIPT_HASHES_PSEUDO_URL] = hashesJSON;
      let cacheBundleJSON = JSON.stringify(cacheBundle, null, 2);
      file.contents = Buffer.from(cacheBundleJSON);
      this[pluginName] = this[pluginName] || {};
      this[pluginName].SCRIPT_HASHES_PSEUDO_URL = SCRIPT_HASHES_PSEUDO_URL;
      callback(null, file);
    }))
    .pipe(this.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'script-hashes-js' ],
};