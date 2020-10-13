'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');
const stringify = require('json-stringify-safe');

const targetConfig = require('./demo-config/config.js');
gulp.registry(targetConfig); // targetConfig as custom gulp registry
console.log('targetConfig', stringify(targetConfig, null, 2));

[
  // TODO: Can these entries be obtained from `ls plugins/*/configurator.js`? What is the appropriate order of registrations? 'inject' must be the last to register
  '@thin-hook/build',
  '@thin-hook/build-test',
  '@thin-hook/examples',
  '@thin-hook/demo-convert-skinny',
  '@thin-hook/demo-convert-full',
  '@thin-hook/demo-gulpfile-js',
  'clean-gzip-json',
  'get-version',
  'generate-cert-sh',
  'certificates',
  'keys',
  'entry-page',
  'hook-min-js',
  'bootstrap-js',
  'hook-worker-js',
  'no-hook-authorization',
  'url-parameters',
  'empty-document',
  'cache-automation-js',
  'cache-bundle-js',
  'about-blank-redirector',
  'content-loader-js',
  'mark-parsed-js',
  'script-hashes-js',
  'wrap-globals-js',
  'hook-native-api-js',
  'context-generator-js',
  'integrity-js',
  'integrity-json',
  'policy',
  'disable-devtools',
  'automation-secret',
  'cache-bundle-automation-json',
  'dummy-integrity',
  'script-hashes',
  'script-hashes-integrity',
  'gzip-json',
  'clean-frontend',
  'frontend-components',
  'gzip-frontend',
  'generate-import-maps',
  'bundler-helpers',
  'bundle-browserify',
  'bundle-webpack',
  'bundle-rollup',
  'dependency-graph',
  'injector-helpers',
  // Notes on 'inject' plugin
  // - targetConfig.commands are registered as tasks
  // - Plugins with targetConfig[plugin].series are registered as gulp.task(plugin, gulp.series(...this[plugin].series))
  // - Each phase in targetConfig.inject.phases is registered as gulp.task(phase, gulp.series('injector-helpers', ...dependencies))
  // - A helper task `${phase}-phase` for each phase is registered as gulp.task(`${phase}-phase`, (done) => { this.inject.currentPhase = phase; done(); })
  // - 'inject dependencies' is registered to perform dependency tasks for this.inject.currentPhase
  // - 'inject' is registered as gulp.task('inject', gulp.series(...phases))
  'inject',
].forEach(plugin => gulp.task(plugin));

gulp.task('default',
  gulp.series(
    '@thin-hook/build',
    '@thin-hook/build-test',
    '@thin-hook/examples',
    'inject', // Process tasks in targetConfig.inject.phases
    /* equivalent to 'inject'
      gulp.series(
        'clean',
        'backend',
        'plugin',
        'cache',
        'frontend'
      )
    */
    'dependency-graph',
  )
);

// Skip the standard transform middleware for polyserve
gulp.task('patch-wct-istanbul', () => {
  return gulp.src([ 'test/plugin.js' ], { base: 'test' })
    .pipe(gulp.dest('node_modules/wct-istanbul/lib'));
});

gulp.task('test', gulp.series('patch-wct-istanbul', shell.task('wct')));
