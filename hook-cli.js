#!/usr/bin/env node
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const hook = require('./hook.js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let hookName = '__hook__';
let contextGenerator = hook.methodContextGenerator;
let hashContextGenerator = hook.methodContextGenerator;
let hashSalt = '__hashSalt__';
let contexts = {};
let contextsJson = './contexts.json';

if (process.argv.length <= 2) {
  let cmd = path.basename(process.argv[1]);
  console.log(
`Thin Hook Preprocessor

Usage: ${cmd} [--hook={hookName}] [--context={contextGenarator}] targets ...

Options:
  --hook={hookName} : Hook callback. Default: __hook__
  --context={contextGenerator} : Context generator. Valid values: method null astPath hash hashAstPath. Default: method
  --hashSalt={hashSalt} : Salt for hash generator. Default: __hashSalt__
  --contextsJson={contexts.json} : Path to contexts.json. Default: contexts.json
`);
}

function generateHashContext(astPath) {
  const hash = crypto.createHash('sha256');
  let methodContext = hashContextGenerator(astPath);
  hash.update(hashSalt + methodContext);
  let hashContext = hash.digest('hex');
  astPath[0][1][hashContext] = methodContext;
  return hashContext;
}

for (let i = 2; i < process.argv.length; i++) {
  let match = process.argv[i].match(/^--hook=(.*)$/);
  if (match) {
    hookName = match[1];
    continue;
  }
  match = process.argv[i].match(/^--context=(.*)$/);
  if (match) {
    switch (match[1]) {
    case 'null':
      contextGenerator = hook.nullContextGenerator;
      break;
    case 'astPath':
      contextGenerator = hook.astPathContextGenerator;
      break;
    case 'hash':
      contextGenerator = generateHashContext;
      hashContextGenerator = hook.methodContextGenerator;
      break;
    case 'hashAstPath':
      contextGenerator = generateHashContext;
      hashContextGenerator = hook.astPathContextGenerator;
      break;
    case 'method':
    default:
      contextGenerator = hook.methodContextGenerator;
      break;
    }
    continue;
  }
  match = process.argv[i].match(/^--hashSalt=(.*)$/);
  if (match) {
    hashSalt = match[1];
    continue;
  }
  match = process.argv[i].match(/^--contextsJson=(.*)$/);
  if (match) {
    contextsJson = match[1];
    continue;
  }
  if (path.basename(process.argv[i]).match(/^hooked[.]/)) {
    continue;
  }
  let code = fs.readFileSync(process.argv[i], 'UTF-8');
  let gen = hook.preprocess(code, hookName, [ [ process.argv[i], contexts ] ], contextGenerator);
  let outPath = path.join(path.dirname(process.argv[i]), 'hooked.' + path.basename(process.argv[i]));
  console.log('Hooked: ', outPath);
  fs.writeFileSync(outPath, gen);
}

if (contextGenerator === generateHashContext) {
  console.log('Contexts: ' + contextsJson);
  fs.writeFileSync(contextsJson, JSON.stringify(contexts, null, 2));
}
