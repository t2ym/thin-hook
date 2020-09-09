/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

// return globs for target entries in integrity.json
const targets = function (targetConfig) {
  const destPath = path.resolve(this.path.base, this.path.root);
  return [
    path.resolve(this.path.hook, 'hook.min.js'),
    path.resolve(destPath, '**/*'),
    path.resolve(this.path.base, this.path.components, '**/*'),
    // integrity.json itself
    '!' + path.resolve(destPath, 'integrity.json'),
    '!' + path.resolve(destPath, '**/*.gz'),
    '!' + path.resolve(destPath, 'errorReport.json'),
    // decoded index.html
    '!' + path.resolve(destPath, this.path.decodedIndexHtml),
    // encoded index.html
    '!' + path.resolve(destPath, this.path.encodedIndexHtml),
    '!' + path.resolve(this.path.base, this.path.components, '**/test/**/*'),
    '!' + path.resolve(this.path.base, this.path.components, '**/demo/**/*'),
  ];
}

module.exports = {
  targets,
};