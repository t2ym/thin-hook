/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const through = require('through2');

const pluginName = '@thin-hook/demo-convert-skinny';

const configurator = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);

  return () => this.gulp.src([ path.resolve(destPath, '**/*') ], { base: destPath })
    .pipe(through.obj((file, enc, callback) => {
      if (file.path.match(/\.html$/)) {
        let html = String(file.contents);
        html = html.replace(/<!--__BEGIN__-->/g, '<!--{{{').replace(/<!--__END__-->/g, '}}}-->').replace(/\/\*__BEGIN__\*\//g, '/*{{{').replace(/\/\*__END__\*\//g, '}}}*/');
        file.contents = Buffer.from(html);
        callback(null, file);
      }
      else if (file.path.match(/\.js$/)) {
        let js = String(file.contents);
        js = js.replace(/\/\*__BEGIN__\*\//g, '/*{{{').replace(/\/\*__END__\*\//g, '}}}*/');
        file.contents = Buffer.from(js);
        callback(null, file);
      }
      else {
        callback(null, null);
      }
    }))
    .pipe(this.gulp.dest(destPath))
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};