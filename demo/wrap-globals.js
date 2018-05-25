/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/*
  Note: All global no-hook APIs have to be defined at the point of executing this script. 
*/
{
  const _Object = Object;
  const _window = window;
  const _console = console;
  const excludes = new Set();
  [ 'Math' ].forEach(name => excludes.add(name));
  _Object.getOwnPropertyNames(_window).filter(name => {
    if (excludes.has(name)) {
      return;
    }
    let desc = _Object.getOwnPropertyDescriptor(_window, name);
    let hiddenValue;
    if (desc.configurable) {
      if (desc.hasOwnProperty('value') || 
          (desc.hasOwnProperty('get') && desc.get.toString().indexOf('onUnexpectedAccessToGlobalObject') < 0)) {
        _console.log('wrap-globals.js: wrapping window.' + name);
        _window[Symbol.for('wrapGlobalProperty')]([_window, name, 'window']);
      }
    }
  });
}
