/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');

const pluginName = 'cache-automation-js';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'cache-automation.js';
  return () => this.gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          LF: '\n',
          EMPTY: '',
          enableMonitoring: this.mode.enableMonitoring || undefined, // for @ifdef enableMonitoring
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/cache-automation-js/
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
          LF: '\n',
          EMPTY: '',
          enableMonitoring: this.mode.enableMonitoring || undefined, // for @ifdef enableMonitoring
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/cache-automation-js/
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