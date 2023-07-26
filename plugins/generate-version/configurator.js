/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2023, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const pluginName = 'generate-version';

const configurator = function (targetConfig) {
  const generator = this['generate-version'].generators[this['generate-version'].scheme];
  if (typeof generator === 'function') {
    this['hook-min-js'].searchParams.version = generator();
  }
  console.log(`[generate-version] version = ${this['hook-min-js'].searchParams.version}`)
  return () => this.gulp.src('package.json'); // dummy
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};