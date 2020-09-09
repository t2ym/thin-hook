/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');

const fs = require('fs');

const pluginName = 'integrity-js';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'integrity.js';
  return () => this.gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      let keys = JSON.parse(fs.readFileSync(this['keys'].keysJSONPath, 'utf-8'));
      let rsaPublicKeyPEM = keys[this['keys'].RSA.publicKeyName];
      let rsaPublicKeyBase64 = rsaPublicKeyPEM.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/[ \r\n\t]/g, '');
      let ecdsaPublicKeyPEM = keys[this['keys'].ECDSA.publicKeyName];
      let ecdsaPublicKeyBase64 = ecdsaPublicKeyPEM.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/[ \r\n\t]/g, '');
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          rsaPublicKeyBase64: `'${rsaPublicKeyBase64}'`,
          ecdsaPublicKeyBase64: `'${ecdsaPublicKeyBase64}'`,
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/policy/
        }
      );
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    .pipe(this.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'keys' ],
};