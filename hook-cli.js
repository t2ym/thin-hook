#!/usr/bin/env node
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
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
let importMaps = null;
let baseURL;
let dependencies = null;
let out = '';

if (process.argv.length <= 2) {
  let cmd = path.basename(process.argv[1]);
  console.log(
`Thin Hook Preprocessor

Usage: ${cmd} [--hook={hookName}] [--context={contextGenarator}] targets ...

Options:
  --hook={hookName} : Hook callback. Default: __hook__
  --context={contextGenerator} : Context generator. Valid values: method cachedMethod cachedMethodDebug null astPath hash hashAstPath. Default: method
  --metaHooking={metaHooking}: Enable meta hooking (run-time hooking for metaprogramming) if true. Default: true
  --hashSalt={hashSalt} : Salt for hash generator. Default: __hashSalt__
  --contextsJson={contexts.json} : Path to contexts.json. Default: contexts.json
  --importMaps={import-maps.importmap} : Path to import-maps.importmap Default: null
  --baseURL=/base/url/path.js : Base URL. Default: file pathname
  --dependencies(={dependencies.json|-}) : Dump module dependencies in JSON. Default: null
  --out={outPath} : Path for output
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
    case 'cachedMethod':
      contextGenerator = 'cachedMethod';
      break;
    case 'cachedMethodDebug':
      contextGenerator = 'cachedMethodDebug';
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
  match = process.argv[i].match(/^--importMaps=(.*)$/);
  if (match) {
    importMaps = match[1];
    continue;
  }
  match = process.argv[i].match(/^--baseURL=(.*)$/);
  if (match) {
    baseURL = match[1];
    continue;
  }
  match = process.argv[i].match(/^--dependencies(=.*)?$/);
  if (match) {
    if (match[1] && match[1][0] === '=' && match[1].length > 1) {
      dependencies = match[1].substring(1);
    }
    else {
      dependencies = '-'; // stdout
    }
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
    const origin = 'location.origin';
    baseURL = baseURL || process.argv[i];
    if (importMaps) {
      let json = fs.readFileSync(importMaps, 'UTF-8');
      let normalizedBaseURL = baseURL[0] === '/'
        ? 'https://' + origin + baseURL
        : baseURL;
      let resolvedURLCache = new Map();
      hook.parameters.parsedImportMap = hook.utils.importMaps.parseFromString(json, normalizedBaseURL);
      hook.parameters.importMapper =
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
          console.log(`importMapper(${specifier}, ${scriptURL}) = ${resolvedURL}`);
          return resolvedURL;
        }
      if (dependencies) {
        hook.parameters.moduleDependencies = {};
      }
    }
    let start = Date.now();
    let gen = hook(code, hookName, [ [ baseURL, contexts ] ], contextGenerator, metaHooking);
    let end = Date.now();
    let outPath = out || path.join(path.dirname(process.argv[i]), 'hooked.' + path.basename(process.argv[i]));
    console.log('Hooked: ', outPath, ' in ' + (end - start) + 'ms');
    fs.writeFileSync(outPath, gen);
    if (hook.parameters.moduleDependencies) {
      if (dependencies !== '-') {
        fs.writeFileSync(dependencies, JSON.stringify(hook.parameters.moduleDependencies, null, 2));
      }
      else {
        console.log(JSON.stringify(hook.parameters.moduleDependencies, null, 2));
      }
    }
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
