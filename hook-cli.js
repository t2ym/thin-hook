#!/usr/bin/env node
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const hook = require('./hook.js');
const fs = require('fs');
const path = require('path');

let hookName = '__hook__';
let contextGenerator = 'method';
let hashContextGenerator;
let metaHooking = true;
let hashSalt = '__hashSalt__';
let contexts = {};
let contextsJson = './contexts.json';
let out = '';

if (process.argv.length <= 2) {
  let cmd = path.basename(process.argv[1]);
  console.log(
`Thin Hook Preprocessor

Usage: ${cmd} [--hook={hookName}] [--context={contextGenarator}] targets ...

Options:
  --hook={hookName} : Hook callback. Default: __hook__
  --context={contextGenerator} : Context generator. Valid values: method null astPath hash hashAstPath. Default: method
  --metaHooking={metaHooking}: Enable meta hooking (run-time hooking for metaprogramming) if true. Default: true
  --hashSalt={hashSalt} : Salt for hash generator. Default: __hashSalt__
  --contextsJson={contexts.json} : Path to contexts.json. Default: contexts.json
  --out={outPath} : Path for output HTML
`);
}

function generateHashContext(astPath) {
  const hash = hook.utils.createHash('sha256');
  let methodContext = hook.contextGenerators[hashContextGenerator](astPath);
  hash.update(hashSalt + methodContext);
  let hashContext = hash.digest('hex');
  astPath[0][1][hashContext] = methodContext;
  return hashContext;
}
hook.contextGenerators.hash = generateHashContext;

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
      contextGenerator = 'null';
      break;
    case 'astPath':
      contextGenerator = 'astPath';
      break;
    case 'hash':
      contextGenerator = 'hash';
      hashContextGenerator = 'method';
      break;
    case 'hashAstPath':
      contextGenerator = 'hash';
      hashContextGenerator = 'astPath';
      break;
    case 'method':
    default:
      contextGenerator = 'method';
      break;
    }
    continue;
  }
  match = process.argv[i].match(/^--hashSalt=(.*)$/);
  if (match) {
    hashSalt = match[1];
    continue;
  }
  match = process.argv[i].match(/^--metaHooking=(.*)$/);
  if (match) {
    metaHooking = match[1] === 'true';
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
  match = process.argv[i].match(/^--out=(.*)$/);
  if (match) {
    out = match[1];
    continue;
  }
  if (process.argv[i].match(/[.]js$/)) {
    let code = fs.readFileSync(process.argv[i], 'UTF-8');
    let gen = hook(code, hookName, [ [ process.argv[i], contexts ] ], contextGenerator, metaHooking);
    let outPath = path.join(path.dirname(process.argv[i]), 'hooked.' + path.basename(process.argv[i]));
    console.log('Hooked: ', outPath);
    fs.writeFileSync(outPath, gen);
  }
  else if (process.argv[i].match(/[.]html?$/)) {
    let html = fs.readFileSync(process.argv[i], 'UTF-8');
    let transformed = hook.serviceWorkerTransformers.encodeHtml(html);
    let outPath = out ? out : path.join(path.dirname(process.argv[i]), 'encoded.' + path.basename(process.argv[i]));
    if (html === transformed) {
      transformed = hook.serviceWorkerTransformers.decodeHtml(html);
      outPath = out ? out : path.join(path.dirname(process.argv[i]), 'decoded.' + path.basename(process.argv[i]));
      console.log('Decoded: ' + process.argv[i] + ' to ' + outPath);
    }
    else {
      console.log('Encoded: ' + process.argv[i] + ' to ' + outPath);
    }
    fs.writeFileSync(outPath, transformed);
  }
}

if (contextGenerator === 'hash') {
  console.log('Contexts: ' + contextsJson);
  fs.writeFileSync(contextsJson, JSON.stringify(contexts, null, 2));
}
