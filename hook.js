/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');
const htmlparser = require('htmlparser2');
const createHash = require('sha.js');
const convert = require('convert-source-map');
const he = require('he');
const zlib = require('pako');
const { parseFromString } = require('import-maps/reference-implementation/lib/parser.js');
const { resolve } = require('import-maps/reference-implementation/lib/resolver.js');
const preprocess = require('./lib/preprocess.js')(espree, escodegen, htmlparser, createHash, convert, he);
const hook = preprocess.hook;
const serviceWorker = require('./lib/service-worker.js')(hook, preprocess);
const contextGenerators = require('./lib/context-generator.js')(hook);
const hookCallbacks = require('./lib/hook-callback.js')(hook, preprocess);
const nativeWrappers = require('./lib/native-wrapper.js')(hook, preprocess, he);

module.exports = Object.freeze(Object.assign(hook, 
  preprocess.public,
  hookCallbacks,
  contextGenerators,
  serviceWorker,
  nativeWrappers, 
  {
    utils: {
      createHash: createHash,
      HTMLParser: htmlparser,
      zlib: zlib,
      importMaps: {
        parseFromString: parseFromString,
        resolve: resolve
      }
    },
    parameters: {}
  }
));