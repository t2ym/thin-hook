/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');

const configurator = (configPath, destPath, {
    sourceFile = 'disable-devtools.js',
    devtoolsDisabled = 'true',
  } = {}) =>
  () => gulp.src([ path.resolve(__dirname, sourceFile) ])
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          devtoolsDisabled: typeof devtoolsDisabled === 'undefined' ? 'true' : devtoolsDisabled,
        },
        {
          type: 'js',
          srcDir: __dirname, // in plugin/disable-devtools/
        }
      );
      script = script.replace(/\/\* #include /g, '/* @include ');
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    /*
    // 2nd pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/disable-devtools/ ; Note: unused
        }
      );
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    */
    .pipe(gulp.dest(destPath));

module.exports = {
  configurator,
};