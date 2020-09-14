/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');

const pluginName = 'generate-cert-sh';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.keys);
  const pluginDirname = __dirname;
  const sourceFile = this.certificates && this.certificates.generateCertSh
    ? this.certificates.generateCertSh
    : 'generate_cert.sh';
  return () => this.gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          generateCertSh: this.certificates.generateCertSh,
          keys: this.path.keys,
          demoCA: this.certificates.CA,
          C: this.certificates.DN.C,
          ST: this.certificates.DN.ST,
          O: this.certificates.DN.O,
          OU: this.certificates.DN.OU,
          CN: this.certificates.DN.CN,
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/generate-cert-sh/
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
  dependencies: [],
};