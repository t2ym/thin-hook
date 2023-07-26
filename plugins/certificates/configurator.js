/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const shell = require('gulp-shell');

const pluginName = 'certificates';

const configurator = function (targetConfig) {
  const SERVER_HOST = this.server.host === 'localhost' && !this.mode.enableMonitoring ? null : this.server.host;
  const SERVER_MODE = this.mode.enableMonitoring ? 'wildcard' : '';
  const VALIDATION_HOST = this.validationService.host === 'localhost' ? null : this.validationService.host;
  return this.gulp.series(
    shell.task(`${this.commands.certificates} localhost`),
    shell.task(`${this.commands.certificates} client client`),
    shell.task(SERVER_HOST
      ? `${this.commands.certificates} ${SERVER_HOST} ${SERVER_MODE}`
      : `echo you can set environment variable SERVER_HOST={host name for your demo server. Note: defaults to localhost}`),
    shell.task(VALIDATION_HOST
      ? `${this.commands.certificates} ${VALIDATION_HOST}`
      : `echo you can set environment variable VALIDATION_HOST={host name for the validation service for your demo. Note: defaults to localhost}`),
  );
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'generate-cert-sh' ],
};