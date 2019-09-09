'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
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
const File = require('vinyl');
const uglify = require('gulp-uglify');
const fs = require('fs');
const through = require('through2');
const path = require('path');
const del = require('del');
const chai = require('chai');
const assert = chai.assert;
const espree = require('espree');
const escodegen = require('escodegen');
const createHash = require('sha.js');
const crypto = require('crypto');
const forge = require('node-forge');
const zlib = require('pako');
const { URL } = require('url');

if (!gulp.series) {
  // polyfill for gulp 3
  gulp.series = (...tasks) => (done) => runSequence(...tasks, done);
}

const hook = require('./hook.js');

gulp.task('examples', () => {
  return gulp.src([ 'examples/**/*.js', '!examples/**/hooked.*' ])
    //.pipe(sourcemaps.init())
    .pipe(through.obj((file, enc, callback) => {
      let code = String(file.contents);
      let basename = path.basename(file.path);
      let hooked = hook(code, '__hook__', [ [ 'examples/' + basename, { static: '__context_mapper__' } ] ], 'cachedMethod');
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

gulp.task('demo:convert:skinny', () => {
  return gulp.src([ 'demo/**/*' ], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      if (file.path.match(/\.html$/)) {
        let html = String(file.contents);
        html = html.replace(/<!--__BEGIN__-->/g, '<!--{{{').replace(/<!--__END__-->/g, '}}}-->').replace(/\/\*__BEGIN__\*\//g, '/*{{{').replace(/\/\*__END__\*\//g, '}}}*/');
        file.contents = new Buffer(html);
        callback(null, file);
      }
      else if (file.path.match(/\.js$/)) {
        let js = String(file.contents);
        js = js.replace(/\/\*__BEGIN__\*\//g, '/*{{{').replace(/\/\*__END__\*\//g, '}}}*/');
        file.contents = new Buffer(js);
        callback(null, file);
      }
      else {
        callback(null, null);
      }
    }))
    .pipe(gulp.dest('demo'))
});

gulp.task('demo:convert:full', () => {
  return gulp.src([ 'demo/**/*' ], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      if (file.path.match(/\.html$/)) {
        let html = String(file.contents);
        html = html.replace(/<!--{{{/g, '<!--__BEGIN__-->').replace(/}}}-->/g, '<!--__END__-->').replace(/\/\*{{{/g, '/*__BEGIN__*/').replace(/}}}\*\//g, '/*__END__*/');
        file.contents = new Buffer(html);
        callback(null, file);
      }
      else if (file.path.match(/\.js$/)) {
        let js = String(file.contents);
        js = js.replace(/\/\*{{{/g, '/*__BEGIN__*/').replace(/}}}\*\//g, '/*__END__*/');
        file.contents = new Buffer(js);
        callback(null, file);
      }
      else {
        callback(null, null);
      }
    }))
    .pipe(gulp.dest('demo'))
});

gulp.task('integrity-service-helpers', shell.task('npm run integrity-service-helpers'));

gulp.task('validation-console', shell.task('npm run validation-console'));

gulp.task('clean-gzip', () => {
  return del(['demo/cache-bundle.json.gz', 'demo/integrity.json.gz'], { base: 'demo' });
});

let version = 'version_1';
gulp.task('get-version', (done) => {
  return gulp.src(['demo/original-index.html'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      let versionIndex = html.indexOf('/hook.min.js?version=') + '/hook.min.js?version='.length;
      let versionIndexEnd = html.indexOf('&', versionIndex);
      version = 'version_' + html.substring(versionIndex, versionIndexEnd);
      callback(null, file);
    }))
    .pipe(through.obj((file, enc, callback) => {
      done();
    }));
});

gulp.task('demo-certificates',
  gulp.series(
    shell.task('npm run demo-certificates -- localhost'),
    shell.task('npm run demo-certificates -- client client'),
    shell.task(process.env['SERVER_HOST']
      ? `npm run demo-certificates -- ${process.env['SERVER_HOST']}`
      : `echo you can set environment variable SERVER_HOST={host name for your demo server. Note: defaults to localhost}`),
    shell.task(process.env['VALIDATION_HOST']
      ? `npm run demo-certificates -- ${process.env['VALIDATION_HOST']}`
      : `echo you can set environment variable VALIDATION_HOST={host name for the validation service for your demo. Note: defaults to localhost}`),
  )
);

// key pair for mitm detection, not for HTTPS
const demoKeysFolder = 'demo-keys';
const keysJSONName = 'keys.json';
const keysJSONPath = path.join('.', demoKeysFolder, keysJSONName);

const SHA256 = {};
SHA256.hashBits = 256;
SHA256.hashBytes = SHA256.hashBits / 8;
SHA256.hashName = 'sha' + SHA256.hashBits;

const RSA = {};
RSA.keyBits = 2048; // at least 2048 to encrypt keys of 2 * 256 bits (= 64 bytes) in RSA-OAEP
RSA.keyBytes = RSA.keyBits / 8;
RSA.keyPairE = 0x10001;
RSA.privateKeyName = 'rsa-private-key.pem';
RSA.publicKeyName = 'rsa-public-key.pem';

const ECDSA = {};
ECDSA.privateKeyName = 'ecdsa-private-key.pem';
ECDSA.publicKeyName = 'ecdsa-public-key.pem';

const AES_GCM = {};
AES_GCM.keyLength =  32; // bytes
AES_GCM.ivLength = 12; // bytes
AES_GCM.tagLength = 16; // 128 bits
AES_GCM.sessionIdKeyName = 'session-id-aes-key';
AES_GCM.sessionIdIvName = 'session-id-aes-iv';

const scriptsHashHexName = 'scriptsHashHex';
const htmlHashHexName = 'htmlHashHex';

gulp.task('demo-keys', (done) => {
  // generate RSA key pair
  let keypair = forge.pki.rsa.generateKeyPair({ bits: RSA.keyBits, e: RSA.keyPairE });
  let rsaPrivateKeyPEM = forge.pki.privateKeyToPem(keypair.privateKey).replace(/\r/g, '');
  let rsaPublicKeyPEM = forge.pki.publicKeyToPem(keypair.publicKey).replace(/\r/g, '');

  // generate ECDSA key pair
  let ecdsaKeyPair = crypto.generateKeyPairSync('ec',
    {
      namedCurve: 'P-256',
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

  // generate session ID key and iv
  let sessionIdAesKeyBase64 = crypto.randomFillSync(Buffer.alloc(AES_GCM.keyLength)).toString('base64');
  let sessionIdAesIvBase64 = crypto.randomFillSync(Buffer.alloc(AES_GCM.ivLength)).toString('base64');

  try {
    fs.mkdirSync(demoKeysFolder);
  }
  catch (e) {
    // EEXIST
  }

  let keys = {
    version: version,
    [RSA.privateKeyName]: rsaPrivateKeyPEM,
    [RSA.publicKeyName]: rsaPublicKeyPEM,
    [ECDSA.privateKeyName]: ecdsaKeyPair.privateKey,
    [ECDSA.publicKeyName]: ecdsaKeyPair.publicKey,
    [AES_GCM.sessionIdKeyName]: sessionIdAesKeyBase64,
    [AES_GCM.sessionIdIvName]: sessionIdAesIvBase64,
  };
  let keysJSON = JSON.stringify(keys, null, 2) + '\n';

  fs.writeFileSync(keysJSONPath, keysJSON, 'utf-8');
  done();
});

gulp.task('update-integrity-js', () => {
  return gulp.src(['demo/integrity.js'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      let keys = JSON.parse(fs.readFileSync(keysJSONPath, 'utf-8'));
      let rsaPublicKeyPEM = keys[RSA.publicKeyName];
      let rsaPublicKeyBase64 = rsaPublicKeyPEM.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/[ \r\n\t]/g, '');
      let ecdsaPublicKeyPEM = keys[ECDSA.publicKeyName];
      let ecdsaPublicKeyBase64 = ecdsaPublicKeyPEM.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/[ \r\n\t]/g, '');
      script = script.replace(/RSA\.publicKeyBase64 = '([^']*)'/, 'RSA.publicKeyBase64 = \'' + rsaPublicKeyBase64 + '\'');
      script = script.replace(/ECDSA\.publicKeyBase64 = '([^']*)'/, 'ECDSA.publicKeyBase64 = \'' + ecdsaPublicKeyBase64 + '\'');
      file.contents = new Buffer(script);
      callback(null, file);
    }))
    .pipe(gulp.dest('demo'));
});

// generate demo/integrity.json for static contents
// Note: toWebPath() and gulp.src() have to be customized for the target application.
// TODO: Handle cross origin contents
gulp.task('integrity-json', () => {
  const integrityJSONPath = 'demo/integrity.json';
  const entryPageRelativeFilePath = 'demo/index.html';
  const entryPagePath = entryPageRelativeFilePath.split('/')[0] + '/'
  let files = [];
  let cwd;
  let base;
  let integrity = { version: version };
  // toWebPath() must be customized for the target application
  let toWebPath = function (fullpath) { // convert full file path to URL path for the target application
    // for components via polyserve
    const componentRootPath = '/components'
    const thisComponentPath = cwd.split(path.sep).pop(); // 'thin-hook'
    const mappedComponentPath = 'bower_components'; // should be customized
    let fullPaths = fullpath.split(path.sep);
    let cwdPaths = cwd.split(path.sep);
    let relativePaths = fullPaths.slice(cwdPaths.length);
    let paths = [];
    paths.push(componentRootPath);
    if (relativePaths[0] === mappedComponentPath) {
      paths = paths.concat(relativePaths.slice(1));
    }
    else {
      paths.push(thisComponentPath);
      paths = paths.concat(relativePaths);
    }
    return paths.join('/');
  };
  return gulp.src([
      'hook.min.js',
      'demo/**/*',
      'bower_components/**/*',
      // 'node_modules/**/*', // this demo does not use components directly from node_modules
      // integrity.json itself
      '!' + integrityJSONPath,
      '!demo/**/*.gz',
      '!demo/errorReport.json',
      // original index.html
      '!demo/original-index.html',
      '!demo/index.html',
      '!node_modules/**/*', // this demo does not use components directly from node_modules
      '!test/**/*',
      '!lib/**/*',
      '!demo-keys/**/*',
      '!demo-backend/**/*',
      '!examples/**/*',
      '!bower_components/**/test/**/*',
      '!bower_components/**/demo/**/*',
    ], { base: '.' })
    .pipe(through.obj(
      function (file, enc, callback) {
        if (file.contents) {
          let hash = hook.utils.createHash('sha256');
          hash.update(file.contents);
          let digest = hash.digest('base64');
          cwd = file.cwd;
          base = file.base;
          files.push([toWebPath(file.path), digest]);
        }
        callback(null, null);
      },
      function (callback) {
        files.sort((a, b) => a[0].localeCompare(b[0]));
        for (let file of files) {
          integrity[file[0]] = file[1];
        }
        //console.log(JSON.stringify(integrity, null, 2));
        this.push(new File({
          cwd: cwd,
          base: base,
          path: integrityJSONPath,
          contents: Buffer.from(JSON.stringify(integrity, null, 2)),
        }));
        callback();
      }
    ))
    .pipe(gulp.dest('.'));
});

// server secret for cache-automation.js
const serverSecret = crypto.randomFillSync(Buffer.alloc(32)).toString('hex');
const cacheBundlePath = path.join('demo', 'cache-bundle.json');
const cacheAutomationScriptPath = path.join('demo', 'cache-automation.js');
const cacheAutomationScript = fs.readFileSync(cacheAutomationScriptPath, 'UTF-8');
const integrityJSONPath = path.join('demo', 'integrity.json');
let authorization; // sha256(serverSecret + cacheAutomationScript)
let hash = hook.utils.createHash('sha256');
hash.update(serverSecret + cacheAutomationScript);
authorization = hash.digest('hex');

gulp.task('cache-bundle-automation-json', (done) => {
  fs.writeFileSync(cacheBundlePath, JSON.stringify({
    "version": version,
    "https://thin-hook.localhost.localdomain/automation.json": JSON.stringify({
      "state": "init", // update state in the script to perform operations including reloading
      "serverSecret": serverSecret,
      "script": cacheAutomationScript
    },null,0)
  },null,2))
  done();
});

// generate a dummy demo/integrity.json for cache-bundle generation
gulp.task('dummy-integrity', (done) => {
  fs.writeFileSync(integrityJSONPath, JSON.stringify({
    "version": version,
    "https://thin-hook.localhost.localdomain/automation.json": JSON.stringify({
      "state": "init", // update state in the script to perform operations including reloading
      "serverSecret": serverSecret,
      "script": cacheAutomationScript
    },null,0)
  },null,2))
  done();
});

gulp.task('cache-bundle-automation', shell.task('npm run cache-bundle'));

const SCRIPT_HASHES_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/script-hashes.json';
gulp.task('script-hashes', () => {
  return gulp.src(['demo/cache-bundle.json'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      let cacheBundle = JSON.parse(String(file.contents));
      let hashes = {};
      /*
        Note: Metadata format
          cacheBundle = {
            "version": "version_123", // cache version
            "url?param=1": "body in string", // concise format for string data for .js, .html, .json, .svg; equivalent to { "body": "body in string", "Content-Type": "{type}" }
            "url?param=2": {
              "Location": "url?param=1", // link to the other content
              "Location": "data:image/jpeg;base64,...", // encoded body data; Note: "Location" appears only once in a metadata object, of course
              // If Non-dataURI "Location" exists, other metadata entries are ignored
              "Content-Type": "text/xml", // MIME type
              "body": "body in string", // content body
              "Other-Headers": "header value", // HTTP headers
            },
          }
      */
      for (let key in cacheBundle) {
        let content = cacheBundle[key];
        let url = new URL(key, 'https://localhost/');
        if (key === 'version') {
          continue;
        }
        if (typeof content === 'object') {
          if (typeof content['Content-Type'] === 'string' && content['Content-Type'].startsWith('text/html') && typeof content.body === 'string') {
            if (typeof content.body !== 'string') {
              continue;
            }
            content = content.body;
          }
          else {
            continue;
          }
        }
        let pathname = (url.protocol === 'https:' || url.protocol === 'http:') ? url.pathname : '';
        if (pathname && pathname.match(/([.]html?|[/])$/)) {
          let inScript = false;
          let inlineScript;
          let stream = new hook.utils.HTMLParser.WritableStream({
            onopentag(name, attributes) {
              if (name === 'script') {
                inScript = true;
                inlineScript = '';
              }
              for (let attr in attributes) {
                let attrValue = attributes[attr];
                if (attrValue) {
                  let match = attrValue.match(/^\/\* ctx:(["'])([a-zA-Z0-9+/=]*)["'] raw:["']([a-zA-Z0-9+/=]*)["'] \*\/((.*\n?)*)$/);
                  if (match) {
                    const hash = hook.utils.createHash('sha256');
                    hash.update(attrValue);
                    let digest = hash.digest('hex');
                    hashes[digest] = decodeURIComponent(new Buffer(match[2], 'base64').toString('binary'));
                  }
                }
              }
            },
            ontext(text) {
              if (inScript) {
                inlineScript += text;
              }
            },
            onclosetag(name) {
              if (name === 'script' && inScript) {
                if (inlineScript) {
                  let match = inlineScript.match(/^\/\* ctx:(["'])([a-zA-Z0-9+/=]*)["'] raw:["']([a-zA-Z0-9+/=]*)["'] \*\/((.*\n?)*)$/);
                  if (match) {
                    const hash = hook.utils.createHash('sha256');
                    hash.update(inlineScript);
                    let digest = hash.digest('hex');
                    hashes[digest] = decodeURIComponent(new Buffer(match[2], 'base64').toString('binary'));
                  }
                }
              }
              inScript = false;
            }
          });
          stream.write(content);
          stream.end();
        }
      }
      let hashesJSON = JSON.stringify(hashes, null, 0);
      console.log('script-hashes = \n' + JSON.stringify(hashes, null, 2));
      cacheBundle[SCRIPT_HASHES_PSEUDO_URL] = hashesJSON;
      let cacheBundleJSON = JSON.stringify(cacheBundle, null, 2);
      file.contents = new Buffer(cacheBundleJSON);
      callback(null, file);
    }))
    .pipe(gulp.dest('demo'));
});

gulp.task('script-hashes-integrity', () => {
  return gulp.src(['demo/index.html', 'demo/original-index.html'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      let html = String(file.contents);
      const cacheBundle = require('./demo/cache-bundle.json');
      const scriptHashes = JSON.parse(cacheBundle[SCRIPT_HASHES_PSEUDO_URL]);
      const scriptHashesJs = fs.readFileSync('./demo/script-hashes.js', 'UTF-8');
      const mutatedScriptHashesJs = scriptHashesJs.replace('hook.parameters.scriptHashes = {}', 'hook.parameters.scriptHashes = ' + JSON.stringify(scriptHashes, null, 2));
      const hashFunction = 'sha256';
      const hash = hook.utils.createHash(hashFunction);
      hash.update(mutatedScriptHashesJs);
      const integrity = hashFunction + '-' + hash.digest('base64');
      const scriptUrl = 'script-hashes.js[?]no-hook=true&service-worker-ready=false';
      html = html.replace(new RegExp(`src="(${scriptUrl})"( *)integrity="([^"]*)( [^"]*)?"`), `src="$1"$2integrity="$3 ${integrity}"`);
      /*
      console.log('scriptHashes = ' + JSON.stringify(scriptHashes, null, 2));
      console.log('scriptHashesJs = ' + scriptHashesJs);
      console.log('mutatedScriptHashesJs = ' + mutatedScriptHashesJs);
      */
      console.log('mutatedScriptHashesJs integrity = ' + integrity);
      //console.log('html = ' + html);
      file.contents = new Buffer(html);
      callback(null, file);
    }))
    .pipe(gulp.dest('demo'));
});

gulp.task('update-html-hash', shell.task('npm run updateHtmlHash'));

gulp.task('gzip', () => {
  return gulp.src(['demo/cache-bundle.json', 'demo/integrity.json'], { base: 'demo' })
    .pipe(through.obj((file, enc, callback) => {
      let data = file.contents;
      file.contents = Buffer.from(zlib.gzip(data));
      file.path = file.path + '.gz';
      callback(null, file);
    }))
    .pipe(gulp.dest('demo'));
});

gulp.task('puppeteer-attack-test', shell.task('npm run test:attack'));

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
        html = html.replace(/(src="cache-bundle[.]js\?no-hook=true&authorization=)([a-z0-9,]*)"/, '$1' + authorization + '"');
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

gulp.task('clean-demo-frontend', () => {
  return del(['demo-frontend']);
});

gulp.task('demo-frontend-components', () => {
  const cacheBundle = require('./demo/cache-bundle.json');
  const blocked = [];
  const componentsFilePath = 'bower_components/';
  const componentsUrlPath = '/components/';
  const packageName = 'thin-hook';
  for (let cached in cacheBundle) {
    if (cached === 'version') {
      continue;
    }
    if (!cached.startsWith('/')) {
      continue;
    }
    let url = new URL(cached, 'https://localhost');
    if (url.searchParams.get('no-hook') === 'true') {
      continue;
    }
    let urlPathname = url.pathname;
    let filePathname;
    if (urlPathname.startsWith('/components/thin-hook/')) {
      continue;
    }
    // dependent components
    filePathname = urlPathname.replace(new RegExp(`^${componentsUrlPath}`), componentsFilePath);
    blocked.push('!' + filePathname);
  }
  //console.log('blocked', blocked);

  return gulp.src([
      'bower_components/**/*', 
      '!bower_components/intl/**/*', // only for unsupported Safari 9
      '!bower_components/**/test/**/*',
      '!bower_components/**/demo/**/*',
      ...blocked
    ], { base: 'bower_components/' })
    //.pipe(debug())
    .pipe(gulp.dest('demo-frontend/components'));
});

gulp.task('demo-frontend-core', () => {
  const cacheBundle = require('./demo/cache-bundle.json');
  const blocked = [];
  const componentsFilePath = 'demo/';
  const packageName = 'thin-hook';
  const componentsUrlPath = '/components/' + packageName + '/demo/';
  for (let cached in cacheBundle) {
    if (cached === 'version') {
      continue;
    }
    if (!cached.startsWith('/')) {
      continue;
    }
    let url = new URL(cached, 'https://localhost');
    if (url.searchParams.get('no-hook') === 'true') {
      continue;
    }
    let urlPathname = url.pathname;
    let filePathname;
    if (!urlPathname.startsWith(componentsUrlPath)) {
      continue;
    }
    // core components
    filePathname = urlPathname.replace(new RegExp(`^${componentsUrlPath}`), componentsFilePath);
    blocked.push('!' + filePathname);
  }
  //console.log('blocked', blocked);

  return gulp.src([
    'hook.min.js',
    'demo/**/*',
    '!demo/original-index.html',
    '!demo/gulpfile.js',
    ...blocked
  ], { base: '.' })
    //.pipe(debug())
    .pipe(gulp.dest('demo-frontend/components/thin-hook'));
});

gulp.task('gzip-demo-frontend', () => {
  return gulp.src([
      'demo-frontend/**/*.js',
      'demo-frontend/**/*.html',
      'demo-frontend/**/*.json',
      'demo-frontend/**/*.css',
      '!demo-frontend/components/thin-hook/demo/index.html',
      '!**/*.gz',
      '!**/*.gif'
    ], { base: 'demo-frontend' })
    .pipe(through.obj((file, enc, callback) => {
      let data = file.contents;
      if (data && data.byteLength > 1000) { // gzip files larger than 1000 bytes
        file.contents = Buffer.from(zlib.gzip(data));
        file.path = file.path + '.gz';
      }
      callback(null, file);
    }))
    .pipe(gulp.dest('demo-frontend'));
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
          '_uNpREdiC4aB1e_', // _hookPrefix = getHookPrefix(),
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
    .pipe(gulp.dest('test'));
});

// Skip the standard transform middleware for polyserve
gulp.task('patch-wct-istanbul', () => {
  return gulp.src([ 'test/plugin.js' ], { base: 'test' })
    .pipe(gulp.dest('node_modules/wct-istanbul/lib'));
});

gulp.task('delay', (done) => {
  setTimeout(done, 1000);
});

gulp.task('cache-bundle',
  gulp.series('get-version', 'dummy-integrity', 'cache-bundle-automation-json', 'cache-bundle-automation', 'script-hashes', 'script-hashes-integrity', 'update-html-hash')
);

gulp.task('build:test',
  gulp.series('build:instrument', 'build:coverage', 'build:test-html')
);

gulp.task('demo-frontend',
  gulp.series('clean-demo-frontend', 'demo-frontend-components', 'demo-frontend-core', 'gzip-demo-frontend')
);

gulp.task('_demo',
  gulp.series(
    //'integrity-service-helpers',
    //'validation-console',
    'clean-gzip',
    'get-version',
    //'demo-keys',
    //'browserify-commonjs',
    //'webpack-es6-module',
    //'webpack-commonjs',
    'update-integrity-js',
    'update-no-hook-authorization',
    'update-no-hook-authorization-in-html',
    'encode-demo-html',
    'cache-bundle',
    'integrity-json',
    'gzip',
    'demo-frontend',
  )
);

gulp.task('demo',
  gulp.series(
    'integrity-service-helpers',
    'validation-console',
    'clean-gzip',
    'get-version',
    'demo-certificates',
    'demo-keys',
    'browserify-commonjs',
    'webpack-es6-module',
    'webpack-commonjs',
    'update-integrity-js',
    'update-no-hook-authorization',
    'update-no-hook-authorization-in-html',
    'encode-demo-html',
    'cache-bundle',
    'integrity-json',
    'gzip',
    'demo-frontend',
  )
);

gulp.task('delayed-demo',
  gulp.series('delay', 'demo')
);

gulp.task('delayed-build',
  gulp.series('delay', 'build', 'build:test', 'examples', 'demo')
);

gulp.task('default',
  gulp.series('build', 'build:test', 'examples', 'demo')
);
