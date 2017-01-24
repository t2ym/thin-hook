/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const hook = require('./hook.js');
const fs = require('fs');
const path = require('path');

for (let i = 2; i < process.argv.length; i++) {
  if (path.basename(process.argv[i]).match(/^hooked[.]/)) {
    continue;
  }
  let code = fs.readFileSync(process.argv[i], 'UTF-8');
  let gen = hook.preprocess(code);
  let outPath = path.join(path.dirname(process.argv[i]), 'hooked.' + path.basename(process.argv[i]));
  console.log(outPath);
  fs.writeFileSync(outPath, gen);
}
