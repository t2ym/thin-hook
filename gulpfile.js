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
const chai = require('chai');
const assert = chai.assert;
const espree = require('espree');
const escodegen = require('escodegen');

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

function _trimStartEndRaw(ast) {
  if (ast && typeof ast === 'object') {
    [ 'start', 'end', 'raw' ].forEach(prop => {
      if (ast && ast.hasOwnProperty(prop)) {
        delete ast[prop];
      }
    });
  }
  for (let target in ast) {
    if (ast[target]) {
      if (Array.isArray(ast[target])) {
        for (let i = 0; i < ast[target].length; i++) {
          let item = ast[target][i];
          if (item && typeof item === 'object' && typeof item.type === 'string') {
            _trimStartEndRaw(ast[target][i]);
          }
        }
      }
      else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
        _trimStartEndRaw(ast[target]);
      }
    }
  }
}

gulp.task('build', () => {
  return browserify('./hook.js', { standalone: 'hook' })
    .bundle()
    .pipe(source('hook.min.js'))
    .pipe(buffer())
    //.pipe(babel({ "presets": [ 'es2015' ]}))
    //.pipe(uglify({ mangle: true }))
    .pipe(through.obj((file, end, callback) => {
      // robust minification by escodegen's compact option
      let code = String(file.contents);
      let espreeOptions = { range: false, tokens: false, comment: false, ecmaVersion: 8 };
      let originalAst = espree.parse(code, espreeOptions);
      let minifiedCode = escodegen.generate(originalAst, { format: { compact: true } });
      let minifiedAst = espree.parse(minifiedCode, espreeOptions);
      _trimStartEndRaw(originalAst);
      _trimStartEndRaw(minifiedAst);
      let originalAstJson = JSON.stringify(originalAst, null, 2);
      let minifiedAstJson = JSON.stringify(minifiedAst, null, 2);
      try {
        assert.equal(minifiedAstJson, originalAstJson, 'Minified AST is identical to the original AST');
        file.contents = new Buffer(minifiedCode);
      }
      catch (e) {
        fs.writeFileSync('_originalAst.json', originalAstJson);
        fs.writeFileSync('_minifiedAst.json', minifiedAstJson);
        throw e;
      }
      callback(null, file);
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', (done) => {
  runSequence('build', 'examples', done);
});
