'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const shell = require('gulp-shell');
const rename = require('gulp-rename');
const ImportMaps = require("@jsenv/node-module-import-map");
const rollup = require('rollup');
const rollupPluginBrowserifyTransform = require('rollup-plugin-browserify-transform');
const browserify = require('browserify');
const browserifyBuiltins = require('browserify/lib/builtins.js');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const nodeLibsBrowser = require('node-libs-browser');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
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

gulp.task('certificates',
  gulp.series(
    shell.task(`${targetConfig.commands.certificates} localhost`),
    shell.task(`${targetConfig.commands.certificates} client client`),
    shell.task(process.env['SERVER_HOST']
      ? `${targetConfig.commands.certificates} ${process.env['SERVER_HOST']}`
      : `echo you can set environment variable SERVER_HOST={host name for your demo server. Note: defaults to localhost}`),
    shell.task(process.env['VALIDATION_HOST']
      ? `${targetConfig.commands.certificates} ${process.env['VALIDATION_HOST']}`
      : `echo you can set environment variable VALIDATION_HOST={host name for the validation service for your demo. Note: defaults to localhost}`),
  )
);

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

const enhancedResolve = require('enhanced-resolve');
const resolveSync = enhancedResolve.create.sync({ // webPackConfig.resolve
  extensions: ['.js', '.json']
});

const urlForCurrentDir = '/components/thin-hook';

function bundlerContextGeneratorFactory(nodeLibs) {
  // Note: Not tested on Windows
  return function bundlerContextGenerator(astPath) {
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
    else if ((ast.type === 'ImportDeclaration' || ast.type === 'ExportNamedDeclaration' || ast.type === 'ExportAllDeclaration') && ast.source && ast.resolvedSource) {
      ast.resolvedSource = path.relative(path.dirname(astPath[0][0]), ast.resolvedSource);
      if (!ast.resolvedSource.startsWith('.')) {
        ast.resolvedSource = './' + ast.resolvedSource;
      }
    }
    else if (ast.type === 'Program' && ast.moduleDependencies) {
      for (let _module in ast.moduleDependencies) {
        let resolvedSource;
        if (ast.moduleDependencies[_module][0] === 'export') {
          resolvedSource = './' + path.relative(path.dirname(ast.moduleDependencies[_module].source), ast.moduleDependencies[_module].source);
        }
        else if (ast.moduleDependencies[_module].source.startsWith('.')) {
          resolvedSource = ast.moduleDependencies[_module].source; // relative path
        }
        else {
          resolvedSource = path.relative(path.dirname(astPath[0][0]), _module);
          if (!resolvedSource.startsWith('.')) {
            resolvedSource = './' + ast.resolvedSource;
          }
        }
        ast.moduleDependencies[_module].resolvedSource = resolvedSource; // for rollup
      }
    }
    return context;
  };
}

hook.contextGenerators.rollup = bundlerContextGeneratorFactory({});
hook.contextGenerators.webpack = bundlerContextGeneratorFactory(nodeLibsBrowser);
hook.contextGenerators.browserify = bundlerContextGeneratorFactory(browserifyBuiltins);

// Hook transformer - browserify transform
function hookTransformFactory(contextGeneratorName, importMapperFactory) {
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
        if (importMapperFactory) {
          hook.parameters.importMapper = importMapperFactory(file);
        }
        code = hook(code,
          '__hook__', // hookName = '__hook__',
          [ Object.assign([ context, {} ], { source: file }) ], // initialContext = [],
          contextGeneratorName, // contextGeneratorName = 'method',
          true, // metaHooking = true,
          true, // _hookProperty = getHookProperty(),
          null, // _sourceMap = null,
          false, // asynchronous = false,
          false, // _compact = getCompact(),
          true, // _hookGlobal = getHookGlobal(),
          '_uNpREdiC4aB1e_', // _hookPrefix = getHookPrefix(),
          { require: true, module: true, exports: true } // initialScope = null
        );
        if (importMapperFactory) {
          hook.parameters.importMapper = null;
        }
      }
      console.log('hook ', file);
      stream.push(code);
      callback(null);
    }
    return through(transform, flush);
  }
}

// Paths for import maps
const demoProjectDirectoryRelativePathFromCurrentDir = 'demo/';
  // demo/ -- project directory for demo
  // demo/package.json -- frontend nodejs package.json for the thin-hook demo
  // demo/package-lock.json -- lock file for the frontend nodejs packages
  // demo/node_modules/ -- frontend nodejs packages for modules
  // demo/modules/ -- private/local frontend modules, whose paths are configurable in demo/modules-private.importmap
const privateImportMapFileInDemoProjectDirectory = 'modules-private.importmap'; // import maps for private/local modules for demo (manually configured)
  // demo/modules-private.importmap
const normalizedUrlPathImportMapFileInProjectDirectory = 'modules.importmap'; // embedded into bootstrap.js as hook.parameters.importMapsJson
  // demo/modules.importmap
  // Notes:
  //  - JSON for the generated import maps is embedded into demo/bootstrap.js as a string value for hook.parameters.importMapsJson 
  //  - Normalized absolute URL paths for modules are used as their contexts in preprocessed code and acl
  //  - Scoped import maps for "bare-specifier/" are copied to global imports so that "bare-specifier/path/module.js" can be resolved from outside of the module scope
  //  - **NOT** loaded via <script type="importmap" src="modules.importmap"></script> nor <script type="importmap">JSON</script> for the time being

// Convert relative URL paths to their corresponding absolute URL paths
// Note: baseUrlPath must end with '/' if it is for a directory URL
const convertToAbsoluteUrlPath = function (url, baseUrlPath) {
  if (url.startsWith('.')) {
    //console.log('convertToAbsolutePath', baseUrlPath, url);
    url = new URL(url, 'file://' + baseUrlPath).pathname;
    //url = path.resolve(baseUrlPath, url) + (url.endsWith('/') ? '/' : '');
  }
  return url;
};

// Normalize relative URL paths in an import maps object as their corresponding absolute ones
const normalizeImportMap = function (importMaps, baseUrlPath) {
  function _normalize(normalized, original) {
    switch (typeof original) {
    case 'object':
      if (original) {
        for (let key in original) {
          normalized[convertToAbsoluteUrlPath(key, baseUrlPath)] = _normalize({}, original[key]);
        }
      }
      return normalized;
    case 'string':
      return convertToAbsoluteUrlPath(original, baseUrlPath);
    default:
      return original;
    }
  }
  return _normalize({}, importMaps);
};

// Copy module scopes with "bare-specifier/" to global imports in import maps 
// so that "bare-specifier/path/to/module.js" can be resolved from outside of the "bare-specifier" module
/*
  importMaps = {
    "imports": {
      "bare-specifier": "/components/bare-specifier/main.js"
    },
    "scopes": {
      "/components/bare-specifier/": {
        "bare-specifier/": "/components/bare-specifier/" // copy this property to imports["bare-specifier/"]
      }
    }
  }
*/
const copyModuleScopesToImports = function (importMaps) {
  for (let mod in importMaps.scopes) {
    let scope = importMaps.scopes[mod];
    for (let specifier in scope) {
      if (specifier.endsWith('/') && importMaps.imports && !importMaps.imports[specifier]) {
        let bareSpecifier = specifier.substring(0, specifier.length - 1);
        if (importMaps.imports[bareSpecifier]) {
          importMaps.imports[specifier] = scope[specifier];
        }
      }
    }
  }
  return importMaps;
}

// Reinstall frontend nodejs modules for demo in demo/node_modules/ with the locked versions in demo/package-lock.json
gulp.task('frontend-modules-locked', shell.task(targetConfig.commands['frontend-modules-locked']));

// Generate import maps
//  - Using "@jsenv/node-module-import-map" for the time being
gulp.task('generate-import-maps', async () => {
  const projectDirectoryFileUrl = new URL(demoProjectDirectoryRelativePathFromCurrentDir, `file://${__dirname}/`);
  const baseUrlPath = new URL(demoProjectDirectoryRelativePathFromCurrentDir, `file://${urlForCurrentDir}/`).pathname;
  const privateImportMapFileUrl = new URL(privateImportMapFileInDemoProjectDirectory, projectDirectoryFileUrl);
  const normalizedImportMapFilePath = new URL(normalizedUrlPathImportMapFileInProjectDirectory, projectDirectoryFileUrl).pathname;
  const importMapInputs = [
    ImportMaps.getImportMapFromNodeModules({
      projectDirectoryUrl: projectDirectoryFileUrl,
      projectPackageDevDependenciesIncluded: false,
      packagesExportsPreference: ["import", "node", "require"],
    }),
    ImportMaps.getImportMapFromFile(privateImportMapFileUrl),
    {
      imports: {
        foo: "./bar.js", // dummy
        "module-on-cdn": "https://cdn.domain.com/path/cdn-module/index.js" // dummy
      },
    },
  ];
  
  let importMaps = await ImportMaps.generateImportMapForProject(importMapInputs, {
    projectDirectoryUrl: projectDirectoryFileUrl,
    importMapFile: false,
  });
  
  const importMapsJSON = JSON.stringify(copyModuleScopesToImports(normalizeImportMap(importMaps, baseUrlPath)), null, 2);
  fs.writeFileSync(normalizedImportMapFilePath, importMapsJSON);
  console.log(importMapsJSON);
});

// Embed demo/modules.importmap into demo/bootstrap.js as a JSON string value for hook.parameters.importMapsJson
gulp.task('embed-import-maps', () => {
  return gulp.src(['demo/bootstrap.js'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      const normalizedImportMapFilePath = path.resolve(__dirname, demoProjectDirectoryRelativePathFromCurrentDir, normalizedUrlPathImportMapFileInProjectDirectory);
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

// Hook ES6 modules in rollup
// NOTES:
gulp.task('rollup-es-modules', async () => {
  const importMapperFactory = function importMapperFactory(filePath) {
    const importMapsJson = fs.readFileSync(path.resolve(__dirname, demoProjectDirectoryRelativePathFromCurrentDir, normalizedUrlPathImportMapFileInProjectDirectory), 'utf8');
    const baseURLDirPath = path.join(urlForCurrentDir, demoProjectDirectoryRelativePathFromCurrentDir);
    const packageRelativeFilePath = path.relative(path.join(__dirname, demoProjectDirectoryRelativePathFromCurrentDir), filePath);
    const origin = 'location.origin';
    let baseURLPath = path.join(baseURLDirPath, packageRelativeFilePath);
    let normalizedBaseURL = baseURLPath[0] === '/'
      ? 'https://' + origin + baseURLPath
      : baseURLPath;
    let resolvedURLCache = new Map();
    hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(importMapsJson, normalizedBaseURL);
    hook.parameters._importMapper =
      (specifier, scriptURL) => {
        const key = specifier + ';' + scriptURL;
        let resolvedURL = resolvedURLCache.get(key);
        if (!resolvedURL) {
          if (scriptURL[0] === '/') {
            scriptURL = 'https://' + origin + scriptURL;
          }
          if (specifier.endsWith('/')) {
            specifier = specifier.substring(0, specifier.length - 1);
          }
          resolvedURL = hook.utils.importMaps.resolve(specifier, hook.parameters.parsedImportMap, new URL(scriptURL));
          if (resolvedURL.host === origin) {
            resolvedURL = resolvedURL.pathname + resolvedURL.search + resolvedURL.hash;
          }
          else {
            resolvedURL = resolvedURL.href;
          }
          resolvedURLCache.set(key, resolvedURL);
        }
        //console.log(`importMapper(${specifier}, ${scriptURL}) = ${resolvedURL}`);
        return resolvedURL;
      }
    return hook.parameters._importMapper;
  };

  const targets = [
    [ './demo/es6-module3.js', './demo/rollup-es6-module.js' ],
    [ './demo/modules/module1.js', './demo/rollup-module1.js' ],
  ];
  hook.parameters.moduleDependencies = Object.create(null);
  for (let [input, output] of targets) {
    const bundle = await rollup.rollup({
      input: input,
      treeshake: false,
      plugins: [
        rollupPluginBrowserifyTransform(hookTransformFactory('rollup', importMapperFactory))
      ]
    });
  
    await bundle.write({
      file: output,
      format: 'esm',
    });
  }
  const moduleDependenciesFileName = 'moduleDependencies.json';

  // sort names in moduleDependencies
  const moduleDependencies = hook.parameters.moduleDependencies; // store the original
  hook.parameters.moduleDependencies = Object.create(null);
  for (let name of Object.getOwnPropertyNames(moduleDependencies).sort()) {
    hook.parameters.moduleDependencies[name] = moduleDependencies[name];    
  }

  fs.writeFileSync(
    path.resolve(__dirname, demoProjectDirectoryRelativePathFromCurrentDir, moduleDependenciesFileName),
    JSON.stringify(hook.parameters.moduleDependencies, null, 2),
    'utf8'
  );
  hook.parameters.moduleDependencies = null;
});

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
    //'browserify-commonjs',
    //'webpack-es6-module',
    //'webpack-commonjs',
    'integrity-js',
    'update-no-hook-authorization',
    'update-no-hook-authorization-in-html',
    'encode-demo-html',
    'cache-bundle',
    'integrity-json',
    'gzip-json',
    'frontend',
  )
);

gulp.task('demo',
  gulp.series(
    'integrity-service-helpers',
    'validation-console',
    'clean-gzip-json',
    'get-version',
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
    'browserify-commonjs',
    'webpack-es6-module',
    'webpack-commonjs',
    'rollup-es-modules',
    'policy',
    'disable-devtools',
    'integrity-js',
    'update-no-hook-authorization',
    'update-no-hook-authorization-in-html',
    'encode-demo-html',
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
