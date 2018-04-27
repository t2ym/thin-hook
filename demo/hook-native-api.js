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
  'HTMLObjectElement',
  'HTMLEmbedElement',
  'HTMLAnchorElement',
  'HTMLAreaElement',
  'Document',
  'importScripts',
].forEach((name) => {
  if (name === 'Document') {
    // TODO: Simplify handling
    let _Document = typeof document === 'object'
      ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor.prototype, 'write')
        ? Object.getPrototypeOf(Object.getPrototypeOf(document)).constructor
        : Object.getPrototypeOf(document).constructor
      : null;
    if (_Document) {
      switch (_Document.name) {
      default:
      case 'HTMLDocument':
        break;
      case 'XMLDocument':
        if (typeof document.write !== 'function') {
          _Document = null;
        }
        break;
      }
    }
    if (_Document) {
      let hooked = hook[name]('__hook__', [[name, {}]], 'method');
      _global._globalObjects.set(hooked, name);
      _global._globalMethods.set(hooked, [ (typeof window === 'object' ? 'window' : 'self'), name ]);
      hook.hook(hooked);
    }
  }
  else if (_global[name]) {
    let hooked = hook[name]('__hook__', [[name, {}]], 'method');
    _global._globalObjects.set(hooked, name);
    _global._globalMethods.set(hooked, [ (typeof window === 'object' ? 'window' : 'self'), name ]);
    hook.hook(hooked);
  }
});
if (typeof window === 'object' && typeof document.write === 'function') {
  if (typeof _global.customElements === 'object' && !_global._globalObjects.get('customElements')) {
    _global._globalObjects.set(_global.customElements, 'customElements');
    _global._globalMethods.set(_global.customElements, [ (typeof window === 'object' ? 'window' : 'self'), 'customElements' ]);
  }
}
//hook.global(__hook__, 'hook-native-api.js', 'Function', 'set')._pp_Function = hook.global(__hook__, 'hook-native-api.js', 'Function', 'get')._pp_Function;
