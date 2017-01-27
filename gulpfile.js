'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const fs = require('fs');
const through = require('through2');
const path = require('path');

const hook = require('./hook.js');

gulp.task('examples', () => {
  return gulp.src([ 'examples/**/*.js', '!examples/**/hooked.*' ])
    //.pipe(sourcemaps.init())
    .pipe(through.obj((file, enc, callback) => {
      let code = String(file.contents);
      let basename = path.basename(file.path);
      let hooked = hook(code, '__hook__', [ [ 'examples/' + basename, {} ] ], hook.methodContextGenerator);
      file.contents = new Buffer(hooked);
      callback(null, file);
    }))
    .pipe(rename((path) => { path.basename = 'hooked.' + path.basename; }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./examples'));
});

gulp.task('build', () => {
  return browserify('./hook.js', { standalone: 'hook' })
    .bundle()
    .pipe(source('hook.min.js'))
    .pipe(buffer())
    .pipe(babel({ "presets": [ 'es2015' ]}))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', (done) => {
  runSequence('build', 'examples', done);
});
