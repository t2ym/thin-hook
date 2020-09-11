/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const browserify = require('browserify');
const licensify = require('licensify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const File = require('vinyl');
const fs = require('fs');
const through = require('through2');
const chai = require('chai');
const assert = chai.assert;
const espree = require('espree');
const escodegen = require('escodegen');
const { _trimStartEndRaw } = require('./build-helpers.js');

const pluginName = '@thin-hook/build';

const configurator = function (targetConfig) {
  return () => browserify(path.resolve(this.path.hook, 'hook.js'), { standalone: 'hook' })
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
        minifiedCode = minifiedCode.replace(/var define,module,exports;/,
          'var define,module,exports;const _global_=new Function("return this")();const Reflect=_global_.Reflect,String=_global_.String,Array=_global_.Array,RegExp=_global_.RegExp,Object=_global_.Object,Uint8Array=_global_.Uint8Array,RangeError=_global_.RangeError,parseInt=_global_.parseInt,parseFloat=_global_.parseFloat,ArrayBuffer=_global_.ArrayBuffer,Symbol=_global_.Symbol,setTimeout=_global_.setTimeout,clearTimeout=_global_.clearTimeout,URL=_global_.URL,console=_global_.console,JSON=_global_.JSON;');
        file = new File({
          cwd: file.cwd,
          base: file.base,
          path: file.path,
        });
        file.contents = Buffer.from(licenseHeader + minifiedCode);
      }
      catch (e) {
        fs.writeFileSync('_originalAst.json', originalAstJson);
        fs.writeFileSync('_minifiedAst.json', minifiedAstJson);
        throw e;
      }
      callback(null, file);
    }))
    .pipe(this.gulp.dest(this.path.hook));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};