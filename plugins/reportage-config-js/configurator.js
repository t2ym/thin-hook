/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2023, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const { preprocess } = require('preprocess');
const through = require('through2');
const rename = require('gulp-rename');

const pluginName = 'reportage-config-js';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'reportage.config.js';
  const dest = this[pluginName].dest || path.resolve(this.path.base, this.path.test, sourceFile);
  return () => this.gulp.src([ path.resolve(configPath, sourceFile) ])
    /*
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/bootstrap-js/
        }
      );
      script = script
        .replace(/\/\* #include /g, '/* @include ')
        .replace(/\/\* #ifdef /g, '/* @ifdef ')
        .replace(/\/\* #ifndef /g, '/* @ifndef ')
        .replace(/\/\* #endif /g, '/* @endif ')
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    */
    // 2nd pass
    .pipe(through.obj((file, enc, callback) => {
      let config = String(file.contents);
      config = preprocess(config,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/bootstrap-js/
        }
      );
      file.contents = Buffer.from(config);
      callback(null, file);
    }))
    .pipe(rename(path.basename(dest))) // just in case dest is customized
    .pipe(this.gulp.dest(path.dirname(dest)))
    .pipe(through.obj((file, end, callback) => {
      if (path.extname(file.path) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        Object.assign(this['no-hook-authorization'].hash, this.reportage.hashList());
      }
      callback(null, file);
    }))
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ ],
};