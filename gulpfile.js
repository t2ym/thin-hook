'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const shell = require('gulp-shell');
const rename = require('gulp-rename');
const fs = require('fs');
const through = require('through2');
const path = require('path');
const stringify = require('json-stringify-safe');

const targetConfig = require('./demo-config/config.js');
gulp.registry(targetConfig); // targetConfig as custom gulp registry
console.log('targetConfig', stringify(targetConfig, null, 2));

const hook = targetConfig['thin-hook'].hook;

gulp.task('@thin-hook/examples');

let lastHtml = 'old';
let currentHtml = '';
let lastJs = 'old';
let currentJs = '';

gulp.task('@thin-hook/demo-convert-skinny');

gulp.task('@thin-hook/demo-convert-full');

gulp.task('@thin-hook/demo-gulpfile-js');

gulp.task('integrity-service-helpers', shell.task(targetConfig.commands['integrity-service-helpers']));

gulp.task('validation-console', shell.task(targetConfig.commands['validation-console']));

gulp.task('clean-gzip-json');

gulp.task('get-version');

gulp.task('generate-cert-sh');

gulp.task('certificates');

gulp.task('keys');

gulp.task('cache-automation-js');

gulp.task('cache-bundle-js');

gulp.task('about-blank-redirector');

gulp.task('content-loader-js');

gulp.task('mark-parsed-js');

gulp.task('script-hashes-js');

gulp.task('wrap-globals-js');

gulp.task('hook-native-api-js');

gulp.task('context-generator-js');

gulp.task('integrity-js');

gulp.task('integrity-json');

gulp.task('policy');

gulp.task('disable-devtools');

gulp.task('automation-secret');

gulp.task('cache-bundle-automation-json');

gulp.task('dummy-integrity');

gulp.task('cache-bundle-automation', shell.task(targetConfig.commands['cache-bundle']));

gulp.task('script-hashes');

gulp.task('script-hashes-integrity');

gulp.task('update-html-hash', shell.task(targetConfig.commands['updateHtmlHash']));

gulp.task('gzip-json');

gulp.task('puppeteer-attack-test', shell.task(targetConfig.commands['puppeteerAttackTest']));

gulp.task('update-no-hook-authorization', (done) => {
  setTimeout(() => {
    return gulp.src(['demo/no-hook-authorization.js'], { base: 'demo' })
      //.pipe(sourcemaps.init())
      .pipe(through.obj((file, enc, callback) => {
        let js = String(file.contents);
        let scripts = [
          'hook.min.js',
          'demo/integrity.js',
          'demo/disable-devtools.js',
          'demo/context-generator.js',
          'demo/bootstrap.js',
          'demo/hook-callback.js',
          'demo/hook-native-api.js',
          'demo/hook-worker.js',
          'demo/cache-bundle.js',
          'demo/wrap-globals.js',
          'demo/script-hashes.js',
          'demo/content-loader.js',
          'demo/mark-parsed.js',
          'demo/browserify-commonjs.js',
          'demo/webpack-es6-module.js',
          'demo/webpack-commonjs.js',
          'demo/rollup-es6-module.js',
          'demo/rollup-module1.js',
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

        let integrity = [
          [ 'hook.min.js', '../../thin-hook/hook.min.js[?][^"]*' ],
          [ 'demo/no-hook-authorization.js', 'no-hook-authorization.js[?]no-hook=true' ],
          [ 'demo/integrity.js' , 'integrity.js[?]no-hook=true' ],
          [ 'demo/disable-devtools.js' , 'disable-devtools.js[?]no-hook=true' ],
          [ 'demo/context-generator.js' , 'context-generator.js[?]no-hook=true' ],
          [ 'demo/bootstrap.js' , 'bootstrap.js[?]no-hook=true' ],
          [ 'demo/cache-bundle.js' , 'cache-bundle.js[?]no-hook=true&authorization=[a-z0-9]*' ],
          [ 'demo/hook-callback.js' , 'hook-callback.js[?]no-hook=true' ],
          [ 'demo/script-hashes.js', 'script-hashes.js[?]no-hook=true&service-worker-ready=false' ],
          [ 'rawInlineNoHookScript', '(context-generator no-hook integrity=")([^"]*)(")' ],
        ].map(([ scriptPath, scriptUrl ]) => {
          const hashFunction = 'sha256';
          const hash = hook.utils.createHash(hashFunction);
          let hookScript = scriptPath !== 'rawInlineNoHookScript' ? fs.readFileSync(scriptPath, 'UTF-8') : rawInlineNoHookScript;
          hash.update(hookScript);
          let integrity = hashFunction + '-' + hash.digest('base64');
          console.log('integrity: ' + integrity + ' scriptPath: ' + scriptPath);
          return [ scriptPath, scriptUrl, integrity, hookScript ];
        });
        html = html.replace(/no-hook-authorization=([a-z0-9]*),([a-z0-9]*),/,
          'no-hook-authorization=' + digests.join(',') + ',');
        html = html.replace(/(src="cache-bundle[.]js\?no-hook=true&authorization=)([a-z0-9,]*)"/, '$1' + targetConfig['automation-secret'].authorization + '"');
        integrity.forEach(([ scriptPath, scriptUrl, integrity, hookScript ]) => {
          if (scriptPath === 'rawInlineNoHookScript') {
            html = html.replace(new RegExp(scriptUrl), `$1${integrity}$3`);
          }
          else if (scriptPath === 'hook.min.js') {
            const hashFunction = 'sha256';
            const urlMatch = html.match(new RegExp(`src="(${scriptUrl})"`));
            if (urlMatch && urlMatch[1]) {
              const url = new URL(urlMatch[1], 'https://localhost/components/thin-hook/demo/');
              const params = url.searchParams;
              const getParam = (params, name, _default) => params.has(name) ? params.get(name) : _default;
              let mutatedScript = hookScript.replace(
                /('{"hookNameForServiceWorker":")(__hook__)(","contextGeneratorName":")(method)(","discardHookErrors":)(true)(,"hookProperty":)(true)(,"hookGlobal":)(true)(,"hookPrefix":")(_p_)(","compact":)(false)(,"noHookAuthorizationPreValidated":\[\],"contextGeneratorScripts":\[\]}')/,
                '$1' + getParam(params, 'hook-name', '__hook__') +
                '$3' + getParam(params, 'context-generator-name', 'method') +
                '$5' + getParam(params, 'discard-hook-errors', 'true') +
                '$7' + getParam(params, 'hook-property', 'true') +
                '$9' + getParam(params, 'hook-global', 'true') +
                '$11' + getParam(params, 'hook-prefix', '_p_') +
                '$13' + getParam(params, 'compact', 'false') +
                '$15');
              const hash = hook.utils.createHash(hashFunction);
              hash.update(mutatedScript);
              let integrityMutated = hashFunction + '-' + hash.digest('base64');
              html = html.replace(new RegExp(`( *)integrity="([^"]*)"( *)src="(${scriptUrl})"`),
                `$1integrity="${integrity} ${integrityMutated}"$3src="$4"`);
            }
          }
          else {
            html = html.replace(new RegExp(`src="(${scriptUrl})"( *)integrity="([^"]*)"`), `src="$1"$2integrity="${integrity}"`);
          }
        });
        lastHtml = currentHtml;
        currentHtml = html;
        file.contents = new Buffer(html);
        callback(null, file);
      }))
      .pipe(gulpif(lastHtml !== currentHtml, gulp.dest('demo')))
      .pipe(through.obj((file, enc, callback) => {
        let html = String(file.contents);
        let transformed = hook.serviceWorkerTransformers.encodeHtml(html);
        file.contents = Buffer.from(transformed);
        callback(null, file);
      }))
      .pipe(rename('index.html'))
      .pipe(through.obj((file, enc, callback) => {
        // for demo-backend/integrityService.js
        // demo-backend/whitelist.json - list of URL paths which can be retrieved without encryption
        // demo-backend/blacklist.json - list of URL paths which cannot be retrieved
        let html = String(file.contents);
        let whitelist = {};
        let blacklist = {};
        const entryPageURL = new URL('https://localhost/components/thin-hook/demo/');
        whitelist[entryPageURL.pathname] = true;
        blacklist[new URL('index.html', entryPageURL).pathname] = true;
        let stream = new hook.utils.HTMLParser.WritableStream({
          onopentag(name, attributes) {
            if (name === 'script') {
              const src = attributes['src'];
              if (src) {
                const url = new URL(src, entryPageURL);
                whitelist[url.pathname] = true;
              }
            }
          },
        });
        stream.write(html);
        stream.end();
        fs.writeFileSync('demo-backend/whitelist.json', JSON.stringify(whitelist, null, 2));
        fs.writeFileSync('demo-backend/blacklist.json', JSON.stringify(blacklist, null, 2));
        callback(null, file);
      }))
      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('demo'))
      .pipe(through.obj((file, enc, callback) => {
        done();
      }));
  }, 1000);
});

gulp.task('clean-frontend');

gulp.task('frontend-components');

gulp.task('gzip-frontend');

// Reinstall frontend nodejs modules for demo in demo/node_modules/ with the locked versions in demo/package-lock.json
gulp.task('frontend-modules-locked', shell.task(targetConfig.commands['frontend-modules-locked']));

gulp.task('generate-import-maps');

// Embed demo/modules.importmap into demo/bootstrap.js as a JSON string value for hook.parameters.importMapsJson
gulp.task('embed-import-maps', () => {
  return gulp.src(['demo/bootstrap.js'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      const normalizedImportMapFilePath = path.resolve(targetConfig.path.base, targetConfig.path.root, targetConfig['import-maps'].importMapName);
      let importMapsJson = fs.readFileSync(normalizedImportMapFilePath, 'utf-8');
      importMapsJson = importMapsJson.split(/\n/).join('\n  '); // indent JSON with 2 spaces
      let code = String(file.contents);
      code = code.replace(/hook[.]parameters[.]importMapsJson = `[^`]*`/, 'hook.parameters.importMapsJson = `' + importMapsJson + '`');
      file.contents = Buffer.from(code);
      callback(null, file);
    }))
    .pipe(gulp.dest('demo'))
});

// Update import maps
gulp.task('import-maps', 
  gulp.series(
    'frontend-modules-locked',
    'generate-import-maps',
    'embed-import-maps',
  )
);

gulp.task('bundler-helpers');

gulp.task('bundle-browserify');

gulp.task('bundle-webpack');

gulp.task('bundle-rollup');

gulp.task('bundles',
  gulp.series(
    'bundler-helpers',
    'bundle-browserify',
    'bundle-webpack',
    'bundle-rollup',
  )
);

gulp.task('injector-helpers');

gulp.task('inject',
  gulp.series(
    'update-no-hook-authorization',
    'update-no-hook-authorization-in-html',
    'encode-demo-html',
  )
);

gulp.task('@thin-hook/build');

gulp.task('@thin-hook/build-test');

// Skip the standard transform middleware for polyserve
gulp.task('patch-wct-istanbul', () => {
  return gulp.src([ 'test/plugin.js' ], { base: 'test' })
    .pipe(gulp.dest('node_modules/wct-istanbul/lib'));
});

gulp.task('test', gulp.series('patch-wct-istanbul', shell.task('wct')));

gulp.task('cache-bundle',
  gulp.series('get-version', 'dummy-integrity', 'cache-bundle-automation-json', 'cache-bundle-automation', 'script-hashes', 'script-hashes-integrity', 'update-html-hash')
);

gulp.task('frontend',
  gulp.series('clean-frontend', 'frontend-components', 'gzip-frontend')
);

gulp.task('_demo',
  gulp.series(
    'injector-helpers',
    //'integrity-service-helpers',
    //'validation-console',
    'clean-gzip-json',
    'get-version',
    'keys',
    '@thin-hook/demo-gulpfile-js',
    'about-blank-redirector',
    'content-loader-js',
    'mark-parsed-js',
    'script-hashes-js',
    'wrap-globals-js',
    'hook-native-api-js',
    'context-generator-js',
    'cache-bundle-js',
    'cache-automation-js',
    'automation-secret', 
    //'import-maps'
    //'bundles',
    'integrity-js',
    'inject',
    'cache-bundle',
    'integrity-json',
    'gzip-json',
    'frontend',
  )
);

gulp.task('demo',
  gulp.series(
    'injector-helpers',
    'integrity-service-helpers',
    'validation-console',
    'clean-gzip-json',
    'get-version',
    'generate-cert-sh',
    'certificates',
    'keys',
    '@thin-hook/demo-gulpfile-js',
    'about-blank-redirector',
    'content-loader-js',
    'mark-parsed-js',
    'script-hashes-js',
    'wrap-globals-js',
    'hook-native-api-js',
    'context-generator-js',
    'cache-bundle-js',
    'cache-automation-js',
    'automation-secret', 
    'import-maps',
    'bundles',
    'policy',
    'disable-devtools',
    'integrity-js',
    'inject',
    'cache-bundle',
    'integrity-json',
    'gzip-json',
    'frontend',
  )
);

gulp.task('default',
  gulp.series('@thin-hook/build', '@thin-hook/build-test', '@thin-hook/examples', 'demo')
);

gulp.task('https', shell.task(targetConfig.commands.https));
gulp.task('http', shell.task(targetConfig.commands.http));
