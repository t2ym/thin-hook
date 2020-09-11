/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const pluginName = '@thin-hook/build-test';

const init = function (targetConfig) {
  for (let subtask of ['@thin-hook/build-instrument', '@thin-hook/build-coverage', '@thin-hook/build-test-html']) {
    this.gulp.task(subtask);
  }
}

const configurator = function (targetConfig) {
  return this.gulp.series('@thin-hook/build-instrument', '@thin-hook/build-coverage', '@thin-hook/build-test-html')
}

module.exports = {
  init,
  configurator,
  name: pluginName,
  dependencies: [],
};