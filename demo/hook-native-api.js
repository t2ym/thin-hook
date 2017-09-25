/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
[
  //'Function',
  'eval',
  'setTimeout',
  'setInterval',
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
//hook.global(__hook__, 'hook-native-api.js', 'Function', 'set')._pp_Function = hook.global(__hook__, 'hook-native-api.js', 'Function', 'get')._pp_Function;
