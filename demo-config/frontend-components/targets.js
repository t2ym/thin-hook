/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

// return globs for frontend paths
const targets = function (targetConfig, blocked) {
  return [
    path.resolve(this.path.hook, 'hook.min.js'),
    path.resolve(this.path.base, this.path.root, '**/*'),
    '!' + path.resolve(this.path.base, this.path.root, this.path.decodedIndexHtml),
    '!' + path.resolve(this.path.base, this.path.root, 'index-fb.html'),
    '!' + path.resolve(this.path.base, this.path.root, 'gulpfile.js'),
    path.resolve(this.path.base, this.path.components, '**/*'), 
    '!' + path.resolve(this.path.base, this.path.components, 'intl/**/*'), // only for unsupported Safari 9
    '!' + path.resolve(this.path.base, this.path.components, '**/test/**/*'),
    '!' + path.resolve(this.path.base, this.path.components, '**/demo/**/*'),
    ...blocked
  ];
}

module.exports = {
  targets,
};