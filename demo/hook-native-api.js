/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
[
  //'Function',
  'eval',
  'setTimeout',
  'setInterval',
  'Node',
  'Element',
  'HTMLScriptElement',
  'HTMLIFrameElement',
  'HTMLAnchorElement',
  'HTMLAreaElement',
  'Document',
  'importScripts',
].forEach((name) => {
  if (_global[name]) {
    let hooked = hook[name]('__hook__', [[name, {}]], 'method');
    _global._globalObjects.set(hooked, name);
    _global._globalMethods.set(hooked, [ (typeof window === 'object' ? 'window' : 'self'), name ]);
    hook.hook(hooked);
  }
});
//hook.global(__hook__, 'hook-native-api.js', 'Function', 'set')._pp_Function = hook.global(__hook__, 'hook-native-api.js', 'Function', 'get')._pp_Function;
