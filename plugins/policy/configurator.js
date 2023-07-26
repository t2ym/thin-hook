/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const rename = require('gulp-rename');

const pluginName = 'policy';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const enableDebugging = this.mode.enableDebugging;
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'hook-callback.js';
  const dest = this[pluginName].dest;
  return () => this.gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          enableDebugging: typeof enableDebugging === 'undefined' ? 'false' : enableDebugging,
          enableMonitoring: this.mode.enableMonitoring || undefined, // for @ifdef enableMonitoring
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/policy/
        }
      );
      script = script.replace(/\/\* #include /g, '/* @include ');
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    // 2nd pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          enableMonitoring: this.mode.enableMonitoring || undefined, // for @ifdef enableMonitoring
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/policy/
        }
      );
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    .pipe(rename(path.basename(dest))) // just in case dest is customized
    .pipe(this.gulp.dest(path.dirname(dest)))
    .pipe(through.obj((file, end, callback) => {
      if (path.extname(file.path) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        this['no-hook-authorization'].hash[file.path] = true;
      }
      callback(null, file);
    }))
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};