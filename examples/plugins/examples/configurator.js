/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const pluginName = '@thin-hook/examples';

const init = function (targetConfig) {
  for (let subtask of ['@thin-hook/script-examples', '@thin-hook/module-examples', '@thin-hook/module-examples-dependencies']) {
    this.gulp.task(subtask);
  }
}

const configurator = function (targetConfig) {
  return this.gulp.series('@thin-hook/script-examples', '@thin-hook/module-examples', '@thin-hook/module-examples-dependencies')
}

module.exports = {
  init,
  configurator,
  name: pluginName,
  dependencies: [],
};