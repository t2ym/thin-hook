/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

// return globs for frontend paths
const targets = function (targetConfig) {
  const frontend = path.resolve(this.path.base, this.path.frontend);
  const rootUrl = this.url.root;
  return [
    ...['js', 'html', 'json', 'css'].map(ext => path.resolve(frontend, '**/*.' + ext)),
    `!${path.resolve(frontend, rootUrl.substring(1), this.path.encodedIndexHtml)}`,
    ...['gz', 'gif'].map(ext => '!' + path.resolve(frontend, '**/*.' + ext))
  ];
}

module.exports = {
  targets,
};