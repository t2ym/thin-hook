/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');

const contextGeneratorHelper = {
  pre: null,
  post: null, //(ast, astPath, context) => { const targetConfig = astPath[0].targetConfig; },
};
  
module.exports = {
  contextGeneratorHelper,
};