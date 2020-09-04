/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

// return globs for target entries in integrity.json
const targets = (targetConfig) => {
  const destPath = path.resolve(targetConfig.path.base, targetConfig.path.root);
  return [
    path.resolve(targetConfig.path.hook, 'hook.min.js'),
    path.resolve(destPath, '**/*'),
    path.resolve(targetConfig.path.base, 'bower_components/**/*'),
    // integrity.json itself
    '!' + path.resolve(destPath, 'integrity.json'),
    '!' + path.resolve(destPath, '**/*.gz'),
    '!' + path.resolve(destPath, 'errorReport.json'),
    // decoded index.html
    '!' + path.resolve(destPath, targetConfig.path.decodedIndexHtml),
    // encoded index.html
    '!' + path.resolve(destPath, targetConfig.path.encodedIndexHtml),
    '!' + path.resolve(targetConfig.path.base, 'bower_components/**/test/**/*'),
    '!' + path.resolve(targetConfig.path.base, 'bower_components/**/demo/**/*'),
  ];
}

module.exports = {
  targets: targets,
};