'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const browserifyBuiltins = require('browserify/lib/builtins.js');
const licensify = require('licensify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const loaderUtils = require('loader-utils');
const nodeLibsBrowser = require('node-libs-browser');
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
const createHash = require('sha.js');

const hook = require('./hook.js');

gulp.task('examples', () => {
  return gulp.src([ 'examples/**/*.js', '!examples/**/hooked.*' ])
    //.pipe(sourcemaps.init())
    .pipe(through.obj((file, enc, callback) => {
      let code = String(file.contents);
      let basename = path.basename(file.path);
      let hooked = hook(code, '__hook__', [ [ 'examples/' + basename, {} ] ], 'cachedMethod');
      file.contents = new Buffer(hooked);
      callback(null, file);
    }))
    .pipe(rename((path) => { path.basename = 'hooked.' + path.basename; }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./examples'));
});

let lastHtml = 'old';
let currentHtml = '';
let lastJs = 'old';
let currentJs = '';

gulp.task('_demo', (done) => {
  runSequence('browserify-commonjs', 'webpack-es6-module', 'webpack-commonjs', 'update-no-hook-authorization', 'update-no-hook-authorization-in-html', 'encode-demo-html', done);
});

gulp.task('demo', (done) => {
  runSequence('browserify-commonjs', 'webpack-es6-module', 'webpack-commonjs', 'update-no-hook-authorization', 'update-no-hook-authorization-in-html', 'encode-demo-html', 'cache-bundle', done);
});

gulp.task('cache-bundle', shell.task('npm run cache-bundle'));

gulp.task('update-no-hook-authorization', (done) => {
  setTimeout(() => {
    return gulp.src(['demo/no-hook-authorization.js'], { base: 'demo' })
      //.pipe(sourcemaps.init())
      .pipe(through.obj((file, enc, callback) => {
        let js = String(file.contents);
        let scripts = [
          'hook.min.js',
          'demo/disable-devtools.js',
          'demo/context-generator.js',
          'demo/bootstrap.js',
          'demo/hook-callback.js',
          'demo/hook-native-api.js',
          'demo/hook-worker.js',
          'demo/cache-bundle.js',
          'demo/browserify-commonjs.js',
          'demo/webpack-es6-module.js',
          'demo/webpack-commonjs.js'
        ];
        let digests = scripts.map(scriptPath => {
          const hash = hook.utils.createHash('sha256');
          let hookScript = fs.readFileSync(scriptPath, 'UTF-8');
          hash.update(hookScript);
          let digest = hash.digest('hex');
          console.log('hash: ' + digest + ' scriptPath: ' + scriptPath);
          return digest;
        });
        for (let i = 0; i < scripts.length; i++) {
          js = js.replace(new RegExp(`"([a-z0-9]*)": true, // ${scripts[i]}`), `"${digests[i]}": true, // ${scripts[i]}`);
        }
        lastJs = currentJs;
        currentJs = js;
        file.contents = new Buffer(js);
        callback(null, file);
      }))
      .pipe(gulpif(lastJs !== currentJs, gulp.dest('demo')))
      .pipe(through.obj((file, enc, callback) => {
        done();
      }));
  }, 1000);
});

let rawInlineNoHookScript = `
  {
    hook.parameters.cors = [
      'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js',
      (url) => {
        let _url = new URL(url);
        return _url.hostname !== location.hostname &&
          !_url.href.match(/^(https:\\/\\/www.gstatic.com|https:\\/\\/apis.google.com\\/js\\/api.js|https:\\/\\/apis.google.com\\/_\\/)/);
      }
    ];
    hook.parameters.opaque = [
      'https://www.gstatic.com/charts/loader.js',
      (url) => {
        let _url = new URL(url);
        return _url.hostname !== location.hostname &&
          _url.href.match(/^(https:\\/\\/www.gstatic.com|https:\\/\\/apis.google.com\\/js\\/api.js|https:\\/\\/apis.google.com\\/_\\/)/);
      }
    ];
    hook.parameters.worker = {
      scripts: [
        '../hook.min.js?no-hook=true',
        'no-hook-authorization.js?no-hook=true',
        'hook-callback.js?no-hook=true',
        'hook-native-api.js?no-hook=true'
      ]
    };
  }
  `;

gulp.task('update-no-hook-authorization-in-html', (done) => {
  let lastHash = 'old';
  let currentHash = '';
  setTimeout(() => {
    return gulp.src(['demo/empty-document.html', 'demo/sub-document.html', 'demo/sub-sub-document.html'], { base: 'demo' })
      //.pipe(sourcemaps.init())
      .pipe(through.obj((file, enc, callback) => {
        let html = String(file.contents);
        let digests = [ 'demo/no-hook-authorization.js' ].map(scriptPath => {
          const hash = hook.utils.createHash('sha256');
          let hookScript = fs.readFileSync(scriptPath, 'UTF-8');
          hash.update(hookScript);
          let digest = hash.digest('hex');
          console.log('hash: ' + digest + ' scriptPath: ' + scriptPath);
          return digest;
        });
        html = html.replace(/no-hook-authorization=([a-z0-9]*),/, 'no-hook-authorization=' + digests[0] + ',');
        lastHash = currentHash;
        currentHash = digests[0];
        file.contents = new Buffer(html);
        callback(null, file);
      }))
      .pipe(gulpif(lastHash !== currentHash, gulp.dest('demo')))
      .pipe(through.obj((file, enc, callback) => {
        done();
      }));
  }, 1000);
});


gulp.task('encode-demo-html', (done) => {
  setTimeout(() => {
    return gulp.src(['demo/original-index.html'], { base: 'demo' })
      //.pipe(sourcemaps.init())
      .pipe(through.obj((file, enc, callback) => {
        let html = String(file.contents);
        let digests = [ 'demo/no-hook-authorization.js', 'rawInlineNoHookScript' ].map(scriptPath => {
          const hash = hook.utils.createHash('sha256');
          let hookScript = scriptPath !== 'rawInlineNoHookScript' ? fs.readFileSync(scriptPath, 'UTF-8') : rawInlineNoHookScript;
          hash.update(hookScript);
          let digest = hash.digest('hex');
          console.log('hash: ' + digest + ' scriptPath: ' + scriptPath);
          return digest;
        });
        html = html.replace(/no-hook-authorization=([a-z0-9]*),([a-z0-9]*),/,
          'no-hook-authorization=' + digests.join(',') + ',');
        lastHtml = currentHtml;
        currentHtml = html;
        file.contents = new Buffer(html);
        callback(null, file);
      }))
      .pipe(gulpif(lastHtml !== currentHtml, gulp.dest('demo')))
      .pipe(through.obj((file, enc, callback) => {
        let html = String(file.contents);
        let transformed = hook.serviceWorkerTransformers.encodeHtml(html);
        file.contents = new Buffer(transformed);
        callback(null, file);
      }))
      .pipe(rename('index.html'))
      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('demo'))
      .pipe(through.obj((file, enc, callback) => {
        done();
      }));
  }, 1000);
});

gulp.task('build:test', (done) => {
  runSequence('build:instrument', 'build:coverage', 'build:test-html', done);
});

gulp.task('build:test-html', () => {
  return gulp.src(['test/**/*-test-original.html'], { base: 'test/' })
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      let transformed = hook.serviceWorkerTransformers.encodeHtml(html);
      file.contents = new Buffer(transformed);
      callback(null, file);
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/-original$/, '');
    }))
    .pipe(gulp.dest('test/'));
});

function _trimStartEndRaw(ast) {
  if (ast && typeof ast === 'object') {
    [ 'start', 'end', 'raw' ].forEach(prop => {
      if (ast && ast.hasOwnProperty(prop)) {
        if (prop === 'raw' && ast[prop].match(/(\\xaa\\xb5|\\u200c\\u200d)/) && ast.hasOwnProperty('value')) {
          ast.value = ast.raw.replace(/^\"(.*)\"/, '$1');
        }
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

const enhancedResolve = require('enhanced-resolve');
const resolveSync = enhancedResolve.create.sync({ // webPackConfig.resolve
  extensions: ['.js', '.json']
});

const urlForCurrentDir = '/components/thin-hook';

function bundlerContextGeneratorFactory(nodeLibs) {
  // Note: Not tested on Windows
  return function requireContextGenerator(astPath) {
    let ast = astPath[astPath.length - 1][1];
    let context = hook.contextGenerators.method(astPath);
    if (ast.type === 'CallExpression' &&
        ast.callee.type === 'Identifier' &&
        ast.callee.name === 'require' &&
        ast.arguments.length === 1 &&
        ast.arguments[0].type === 'Literal' &&
        typeof ast.arguments[0].value === 'string') {
      let name = ast.arguments[0].value;
      let origin = context.split(/,/)[0];
      let cwd = process.cwd();
      let originUrlDir = path.dirname(origin);
      let originPhysicalDir = cwd + originUrlDir.substring(urlForCurrentDir.length);
      let adjustedName = name;
      let resolved;
      let componentPath;
      let componentName;
      if (name[0] === '.') {
        resolved = resolveSync({}, originPhysicalDir, name);
      }
      else {
        resolved = nodeLibs[name];
        if (!resolved) {
          resolved = resolveSync({}, cwd, name);
        }
      }
      componentPath = resolved.substring(cwd.length);
      componentName = urlForCurrentDir + componentPath;
      console.log('requireContextGenerator: context = ' + context + ' name = ' + name + ' componentName = ' + componentName);
      context += '|' + componentName;
    }
    return context;
  };
}

hook.contextGenerators.webpack = bundlerContextGeneratorFactory(nodeLibsBrowser);
hook.contextGenerators.browserify = bundlerContextGeneratorFactory(browserifyBuiltins);

// Hook transformer - browserify transform
function hookTransformFactory(contextGeneratorName) {
  return function hookTransform(file) {
    let cwd = process.cwd();
    let chunks = [];
    function transform(chunk, encoding, callback) {
      chunks.push(chunk);
      callback();
    }
    function flush(callback) {
      let stream = this;
      let code = Buffer.concat(chunks).toString();
      let context =
        //file.substring(cwd.length); // based on the build path
        urlForCurrentDir + file.substring(cwd.length); // based on the polyserve path mapping without --npm option
      if (!file.match(/\/node_modules\/webpack\/buildin\/module[.]js$/)) { // TODO: Hooking webpack/buildin/module.js raises an error
        code = hook(code,
          '__hook__', // hookName = '__hook__',
          [ [ context, {} ] ], // initialContext = [],
          contextGeneratorName, // contextGeneratorName = 'method',
          true, // metaHooking = true,
          true, // _hookProperty = getHookProperty(),
          null, // _sourceMap = null,
          false, // asynchronous = false,
          false, // _compact = getCompact(),
          true, // _hookGlobal = getHookGlobal(),
          '_pp_', // _hookPrefix = getHookPrefix(),
          { require: true, module: true, exports: true } // initialScope = null
        );
      }
      console.log('hook ', file);
      stream.push(code);
      callback(null);
    }
    return through(transform, flush);
  }
}


// Hook CommonJs modules in browserify
// NOTES:
// - Wrappers are not hooked
gulp.task('browserify-commonjs', () => {
  const cwd = process.cwd();
  return browserify('./demo/commonjs.js', { standalone: 'commonjs_module', insertGlobals: false, insertGlobalVars: {
      __hook__: undefined
    } })
    .transform({ global: true }, hookTransformFactory('browserify'))
    .bundle()
    .pipe(source('browserify-commonjs.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./demo'));

});

// Hook CommonJs modules in webpack
// NOTES:
// - Wrappers like __webpack_require__ are not hooked
gulp.task('webpack-commonjs', () => {
  const cwd = process.cwd();
  const webpackConfig = {
    entry: "./demo/commonjs.js",
    output: {
      filename: "webpack-commonjs.js"
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          transforms: [
            hookTransformFactory('webpack')
          ]
        }
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'transform-loader?0',
      }],
    },
  };
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('./demo'));

});

// Hook ES6 modules in webpack
// NOTES:
// - Wrappers like __webpack_require__ are not hooked
gulp.task('webpack-es6-module', () => {
  const cwd = process.cwd();
  const webpackConfig = {
    entry: "./demo/es6-module3.js",
    output: {
      filename: "webpack-es6-module.js"
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          transforms: [
            hookTransformFactory('webpack')
          ]
        }
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'transform-loader?0',
      }],
    },
  };
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('./demo'));
});

gulp.task('build', () => {
  return browserify('./hook.js', { standalone: 'hook' })
    .plugin(licensify)
    .bundle()
    .pipe(source('hook.min.js'))
    .pipe(buffer())
    //.pipe(babel({ "presets": [ 'es2015' ]}))
    //.pipe(uglify({ mangle: true }))
    .pipe(through.obj((file, end, callback) => {
      // robust minification by escodegen's compact option
      let code = String(file.contents);
      let licenseHeader = code.substring(0, code.indexOf('*/') + 3);
      let espreeOptions = { range: false, tokens: false, comment: false, ecmaVersion: 8 };
      let originalAst = espree.parse(code, espreeOptions);
      let unconfigurableGlobalHookAst = espree.parse(
        "Object.defineProperty(g, 'hook', { configurable: g.constructor.name === 'ServiceWorkerGlobalScope', enumerable: false, writable: false, value: f() });",
        espreeOptions).body[0];
      let unconfigurableGlobalHookAliasAst = espree.parse(
        "Object.defineProperty(g, '$hook$', { configurable: g.constructor.name === 'ServiceWorkerGlobalScope', enumerable: false, writable: false, value: g.hook });",
        espreeOptions).body[0];
      let serviceWorkerHandlerRegistrationAst = espree.parse(
        "if (g.constructor.name === 'ServiceWorkerGlobalScope')" +
        "{ for (let h in hook.serviceWorkerHandlers) { g.addEventListener(h, hook.serviceWorkerHandlers[h]) } }",
        espreeOptions).body[0];
      let serviceWorkerRegistrationAst = espree.parse(
        "if (g.constructor.name === 'Window') { hook.registerServiceWorker(); }", espreeOptions).body[0];
      let expectedOriginalGlobalHookAst = espree.parse('g.hook = f();', espreeOptions).body[0];
      _trimStartEndRaw(expectedOriginalGlobalHookAst);
      _trimStartEndRaw(originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2]);
      assert.equal(
        JSON.stringify(originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2], null, 2),
        JSON.stringify(expectedOriginalGlobalHookAst, null, 2), 'g.hook = f() exists');
      // replace g.hook = f() with unconfigurable property definition
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2] = unconfigurableGlobalHookAst;
      // append alias $hook$ with unconfigurable property definition
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[3] = unconfigurableGlobalHookAliasAst;
      // append service worker handler registration code
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[4] = serviceWorkerHandlerRegistrationAst;
      // append service worker registration code
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[5] = serviceWorkerRegistrationAst;
      _trimStartEndRaw(originalAst);
      let minifiedCode = escodegen.generate(originalAst, { format: { compact: true } });
      let minifiedAst = espree.parse(minifiedCode, espreeOptions);
      _trimStartEndRaw(minifiedAst);
      let originalAstJson = JSON.stringify(originalAst, null, 2);
      let minifiedAstJson = JSON.stringify(minifiedAst, null, 2);
      try {
        assert.equal(minifiedAstJson, originalAstJson, 'Minified AST is identical to the original AST');
        file.contents = new Buffer(licenseHeader + minifiedCode);
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

const exec = require('child_process').exec;

gulp.task('build:instrument', () => {
  return gulp.src([ 'hook.js', 'lib/*.js' ], { base: '.' })
    .pipe(through.obj((file, end, callback) => {
      exec('nyc instrument ' + path.relative(file.cwd, file.path), { maxBuffer: 10 * 1024 * 1024 }, function (err, stdout, stderr) {
        if (err) {
          callback(err)
        }
        else {
          file.contents = new Buffer(stdout);
          callback(null, file);
        }
      })
    }))
    .pipe(gulp.dest('test/coverage'));
});

gulp.task('build:coverage', () => {
  return browserify('test/coverage/hook.js', { standalone: 'hook' })
    .plugin(licensify)
    .bundle()
    .pipe(source('hook.min.js'))
    .pipe(buffer())
    //.pipe(babel({ "plugins": [ 'babel-plugin-istanbul' ]}))
    //.pipe(uglify({ mangle: true }))
    .pipe(through.obj((file, end, callback) => {
      // robust minification by escodegen's compact option
      let code = String(file.contents);
      let licenseHeader = code.substring(0, code.indexOf('*/') + 3);
      let espreeOptions = { range: false, tokens: false, comment: false, ecmaVersion: 8 };
      let originalAst = espree.parse(code, espreeOptions);
      let unconfigurableGlobalHookAst = espree.parse(
        "Object.defineProperty(g, 'hook', { configurable: g.constructor.name === 'ServiceWorkerGlobalScope', enumerable: false, writable: false, value: f() });",
        espreeOptions).body[0];
      let unconfigurableGlobalHookAliasAst = espree.parse(
        "Object.defineProperty(g, '$hook$', { configurable: g.constructor.name === 'ServiceWorkerGlobalScope', enumerable: false, writable: false, value: g.hook });",
        espreeOptions).body[0];
      let serviceWorkerHandlerRegistrationAst = espree.parse(
        "if (g.constructor.name === 'ServiceWorkerGlobalScope')" +
        "{ for (let h in hook.serviceWorkerHandlers) { g.addEventListener(h, hook.serviceWorkerHandlers[h]) } }",
        espreeOptions).body[0];
      let serviceWorkerRegistrationAst = espree.parse(
        "if (g.constructor.name === 'Window') { hook.registerServiceWorker(); }", espreeOptions).body[0];
      let expectedOriginalGlobalHookAst = espree.parse('g.hook = f();', espreeOptions).body[0];
      _trimStartEndRaw(expectedOriginalGlobalHookAst);
      _trimStartEndRaw(originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2]);
      assert.equal(
        JSON.stringify(originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2], null, 2),
        JSON.stringify(expectedOriginalGlobalHookAst, null, 2), 'g.hook = f() exists');
      // replace g.hook = f() with unconfigurable property definition
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[2] = unconfigurableGlobalHookAst;
      // append alias $hook$ with unconfigurable property definition
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[3] = unconfigurableGlobalHookAliasAst;
      // append service worker handler registration code
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[4] = serviceWorkerHandlerRegistrationAst;
      // append service worker registration code
      originalAst.body[0].expression.callee.body.body[0].alternate.alternate.body[5] = serviceWorkerRegistrationAst;
      _trimStartEndRaw(originalAst);
      let minifiedCode = escodegen.generate(originalAst, { format: { compact: true } });
      let minifiedAst = espree.parse(minifiedCode, espreeOptions);
      _trimStartEndRaw(minifiedAst);
      let originalAstJson = JSON.stringify(originalAst, null, 2);
      let minifiedAstJson = JSON.stringify(minifiedAst, null, 2);
      try {
        assert.equal(minifiedAstJson, originalAstJson, 'Minified AST is identical to the original AST');
        file.contents = new Buffer(licenseHeader + minifiedCode);
      }
      catch (e) {
        fs.writeFileSync('_originalAst.json', originalAstJson);
        fs.writeFileSync('_minifiedAst.json', minifiedAstJson);
        throw e;
      }
      callback(null, file);
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('delayed-demo', (done) => {
  setTimeout(() => {
    runSequence('demo', done);
  }, 1000);
});

gulp.task('watchdemo', function() {
  gulp.watch(['demo/original-index.html', 'demo/hook-callback.js', 'demo/disable-devtools.js'], ['delayed-demo']);
});

gulp.task('delayed-build', (done) => {
  setTimeout(() => {
    runSequence('build', 'build:test', 'examples', 'demo', done);
  }, 1000);
});

gulp.task('watch', function() {
  gulp.watch(['hook.js', 'lib/**/*.js'], ['delayed-build']);
});

gulp.task('default', (done) => {
  runSequence('build', 'build:test', 'examples', 'demo', done);
});
