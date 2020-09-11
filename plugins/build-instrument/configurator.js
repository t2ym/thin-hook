/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const exec = require('child_process').exec;
const through = require('through2');

const pluginName = '@thin-hook/build-instrument';

const configurator = function (targetConfig) {
  return () => this.gulp.src([ path.resolve(this.path.hook, 'hook.js'), path.resolve(this.path.hook, 'lib/*.js') ], { base: this.path.hook })
    .pipe(through.obj((file, end, callback) => {
      exec('nyc instrument ' + path.relative(file.cwd, file.path), { maxBuffer: 10 * 1024 * 1024 }, function (err, stdout, stderr) {
        if (err) {
          callback(err)
        }
        else {
          file.contents = Buffer.from(stdout);
          callback(null, file);
        }
      })
    }))
    .pipe(this.gulp.dest(path.resolve(this.path.hook, this.path.test, 'coverage')));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};