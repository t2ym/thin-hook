/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const { preprocess } = require('preprocess');
const through = require('through2');
const rename = require('gulp-rename');

const pluginName = 'no-hook-authorization';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const pluginDirname = __dirname;
  const sourceFile = this[pluginName] && this[pluginName].sourceFile
    ? this[pluginName].sourceFile
    : 'no-hook-authorization.js';
  const dest = this[pluginName].dest || path.resolve(this.path.base, this.path.root, sourceFile);
  const createHash = require('sha.js');
  return () => this.gulp.src([ path.resolve(pluginDirname, sourceFile) ])
    // 1st pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
          hashList: '    ' + Object.getOwnPropertyNames(this[pluginName].hash)
            .map(name => {
              let digest = this[pluginName].hash[name];
              if (typeof digest !== 'string') {
                const hash = createHash('sha256');
                hash.update(name.startsWith('inline:') // inline:pluginName
                  ? this[name.substring('inline:'.length)].inlineScript
                  : fs.readFileSync(name, 'utf-8'));
                digest = hash.digest('hex');
                this[pluginName].hash[name] = digest;
                if (name.startsWith(this.path.base)) {
                  name = name.substring(this.path.base.length + 1);
                }
              }
              return [ name, digest ];
            })
            .sort((a, b) => {
              if (this[pluginName].hints) {
                let indexA, indexB;
                indexA = this[pluginName].hints.indexOf(a[0]);
                indexB = this[pluginName].hints.indexOf(b[0]);
                if (indexA >= 0 && indexB >= 0) {
                  return indexA - indexB;
                }
                else if (indexA < 0 && indexB < 0) {
                  return a[0].localeCompare(b[0]);
                }
                else if (indexA >= 0) {
                  return -1;
                }
                else {
                  return 1;
                }
              }
              else {
                return a[0].localeCompare(b[0]);
              }
            })
            .filter(([ name, digest ], index, array) => {
              for (let i = 0; i < index - 1; i++) {
                if (digest === array[i][1]) {
                  return false;
                }
              }
              return true;
            })
            .map(([ name, digest ]) => `"${digest}": true, // ${name}`)
            .join('\n    '),
          hookWorker: this.getPluginUrl('hook-worker-js', pluginName),
        },
        {
          type: 'js',
          srcDir: pluginDirname, // in plugins/no-hook-authorization/
        }
      );
      script = script
        .replace(/\/\* #include /g, '/* @include ')
        .replace(/\/\* #ifdef /g, '/* @ifdef ')
        .replace(/\/\* #ifndef /g, '/* @ifndef ')
        .replace(/\/\* #endif /g, '/* @endif ')
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    // 2nd pass
    .pipe(through.obj((file, enc, callback) => {
      let script = String(file.contents);
      script = preprocess(script,
        {
          SPACE: ' ',
          EQUAL: '=',
          SEMICOLON: ';',
          ...Object.getOwnPropertyNames(this[pluginName]).reduce((acc, curr) => { acc[curr] = this[pluginName][curr]; return acc; }, {}),
        },
        {
          type: 'js',
          srcDir: configPath, // in demo-config/no-hook-authorization/
        }
      );
      file.contents = Buffer.from(script);
      callback(null, file);
    }))
    .pipe(rename(path.basename(dest))) // just in case dest is customized
    .pipe(this.gulp.dest(path.dirname(dest)))
    .pipe(through.obj((file, end, callback) => {
      if (path.extname(file.path) === '.js') {
        this['no-hook-authorization'] = this['no-hook-authorization'] || {};
        this['no-hook-authorization'].hash = this['no-hook-authorization'].hash || {};
        this['no-hook-authorization'].hash[file.path] = createHash('sha256').update(fs.readFileSync(dest, 'utf-8')).digest('hex');
      }
      callback(null, file);
    }))
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};