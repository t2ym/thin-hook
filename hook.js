/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');
const htmlparser = require('htmlparser2');
const createHash = require('sha.js');
const convert = require('convert-source-map');
const preprocess = require('./lib/preprocess.js')(espree, escodegen, htmlparser, createHash, convert);
const hook = preprocess.hook;
const serviceWorker = require('./lib/service-worker.js')(hook, preprocess);
const contextGenerators = require('./lib/context-generator.js')(hook);
const hookCallbacks = require('./lib/hook-callback.js')(hook, preprocess);
const nativeWrappers = require('./lib/native-wrapper.js')(hook, preprocess);

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
    },
    parameters: {}
  }
));