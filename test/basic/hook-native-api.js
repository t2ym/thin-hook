/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  let _global = (new Function('return this'))();
  _global._nativeEval = _global.eval;
  [
    //'Function',
    'eval',
    //'setTimeout',
    //'setInterval',
    'Node',
    'Element',
    'HTMLScriptElement',
    'HTMLAnchorElement',
    'HTMLAreaElement',
    'Document'
  ].forEach((name) => {
    if (_global[name]) {
      hook.hook(hook[name]('__hook__', [[name, {}]], 'method'));
    }
  });
}
