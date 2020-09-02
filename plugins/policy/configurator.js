/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');

const pluginName = 'policy';

const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  const enableDebugging = targetConfig.mode.enableDebugging;
  const pluginDirname = __dirname;
  const sourceFile = targetConfig[pluginName] && targetConfig[pluginName].sourceFile
    ? targetConfig[pluginName].sourceFile
    : 'hook-callback.js';
  return () => gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          enableDebugging: typeof enableDebugging === 'undefined' ? 'false' : enableDebugging,
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
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/policy/
        }
      );
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    .pipe(gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};