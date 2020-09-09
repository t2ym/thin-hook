/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');
const rename = require('gulp-rename');

const pluginName = '@thin-hook/script-examples';

const configurator = function (targetConfig) {
  const destPath = this['@thin-hook/examples'].base;
  const pluginDirname = __dirname;
  const hook = this['thin-hook'].hook;
  
  return () => this.gulp.src([ '**/*.js', '!**/hooked.*', '!module*.js', '!export*.js', '!circular*.js', '!plugins/**/*' ].map(glob => {
        if (glob.startsWith('!')) {
          return '!' + path.resolve(this['@thin-hook/examples'].base, glob.substring(1));
        }
        else {
          return path.resolve(this['@thin-hook/examples'].base, glob);
        }
      }))
    //.pipe(sourcemaps.init())
    .pipe(through.obj((file, enc, callback) => {
      let code = String(file.contents);
      let basename = path.basename(file.path);
      let hooked = hook(code, '__hook__', [ [ 'examples/' + basename, { static: '__context_mapper__' } ] ], 'cachedMethod');
      file.contents = Buffer.from(hooked);
      callback(null, file);
    }))
    .pipe(rename(_path => { _path.basename = 'hooked.' + _path.basename; }))
    //.pipe(sourcemaps.write('.'))
    .pipe(this.gulp.dest(destPath));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};