/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook) {

  function __hook__(f, thisArg, args, context) {
    return thisArg ? f.apply(thisArg, args) : f(...args);
  }

  return {
    __hook__: __hook__
  };
}
