/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/*
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
  if (_global[name]) {
    let hooked = hook[name]('__hook__', [[name, {}]], 'method');
    _global._globalObjects.set(hooked, name);
    _global._globalMethods.set(hooked, [ (typeof window === 'object' ? 'window' : 'self'), name ]);
    Object.defineProperty(_global, name, { value: hooked, configurable: true, enumerable: false, writable: false });
    //hook.hook(hooked);
  }
});
//hook.global(__hook__, 'hook-native-api.js', 'Function', 'set')._pp_Function = hook.global(__hook__, 'hook-native-api.js', 'Function', 'get')._pp_Function;
{
  const whitelist = new Set();
  const origin = location.origin;
  const noHookAuthorization = hook.parameters.noHookAuthorizationParameter;
  [
    `at _iframeContentWindowAcl (${origin}/components/thin-hook/demo/hook-callback.js?no-hook=true:2117:54)`,
    `at write2 (${origin}/components/thin-hook/demo/:129:14355)`,
    `at write4 (${origin}/components/thin-hook/demo/:129:15472)`,
    `at writeln2 (${origin}/components/thin-hook/demo/:131:40)`,
    `at writeln4 (${origin}/components/thin-hook/demo/:133:45)`,
    `at ${origin}/components/thin-hook/demo/webpack-es6-module.js?no-hook=true:445:3`,
    `at https://www.gstatic.com/charts/loader.js:226:323`,
    `at https://www.local162.org/components/thin-hook/demo/webpack-es6-module.js?no-hook=true:66:10`,
    `at https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js?cors=true&no-hook=true:25:200`,
    `at https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js?cors=true&no-hook=true:41:2497`,
    `at https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js?cors=true&no-hook=true:42:4192`,
    `at HTMLCanvasElement.<anonymous> (https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js?cors=true&no-hook=true:42:8417)`,
  ].forEach(url => whitelist.add(url));
  const wildcardWhitelist = [
    new RegExp('^at ([^(]* [(])?' + 'https://cdnjs.cloudflare.com/ajax/libs/vis/4[.]18[.]1/vis[.]min[.]js'),
    new RegExp('^at ([^(]* [(])?' + origin + '/components/thin-hook/demo/hook-callback[.]js'),
    new RegExp('^at ([^(]* [(])?' + origin + '/components/thin-hook/hook[.]min[.]js'),
    new RegExp('^at ([^(]* [(])?' + origin + '/components/thin-hook/demo/view3:1:'),
  ];
  //console.error(whitelist);
  if (typeof window === 'object') {
    const _Object = Object;
    const _window = window;
    const _Error = Error;
    const _console = console;
    const _undefined = undefined;
    const isWhitelisted = function isWhitelisted(top, bottom) {
      if (whitelist.has(bottom) || whitelist.has(top)) {
        return true;
      }
      for (let i = 0; i < wildcardWhitelist.length; i++) {
        if (top.match(wildcardWhitelist[i]) || bottom.match(wildcardWhitelist)) {
          return true;
        }
      }
      return false;
    };
    const excludes = new Set();
    [
      'contextStack',
      'Math', // for vis.min.js to work in a decent speed
    ].forEach(name => excludes.add(name));
    _Object.getOwnPropertyNames(_window).forEach(name => {
      if (excludes.has(name)) {
        return;
      }
      let desc = _Object.getOwnPropertyDescriptor(_window, name);
      if (desc.configurable) {
        if (typeof desc.get === 'function') {
          _Object.defineProperty(_window, name, {
            configurable: desc.configurable,
            enumerable: desc.enumerable,
            get: function get() {
                if (contextStack.isEmpty()) {
                  _Error.stackTraceLimit = Infinity;
                  let error = new _Error();
                  let stackTrace = error.stack.split(/\n/);
                  let top = stackTrace[2].trim();
                  let bottom = stackTrace.pop().trim();
                  if (!isWhitelisted(top, bottom)) {
                    _console.error('access to window.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                  }
                  else {
                    //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                  }
                }
                return desc.get.call(this);
              },
            set: typeof desc.set === 'function'
              ? function set(value) {
                  if (contextStack.isEmpty()) {
                    _Error.stackTraceLimit = Infinity;
                    let error = new _Error();
                    let stackTrace = error.stack.split(/\n/);
                    let top = stackTrace[2].trim();
                    let bottom = stackTrace.pop().trim();
                    if (!isWhitelisted(top, bottom)) {
                      _console.error('access to window.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                    }
                    else {
                      //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                    }
                  }
                  desc.set.call(this, value);
                }
              : _undefined,
          });
        }
        else {
          // desc.value
          let hiddenValue = desc.value;
          _Object.defineProperty(_window, name, {
            configurable: desc.configurable,
            enumerable: desc.enumerable,
            get: function get() {
                if (contextStack.isEmpty()) {
                  _Error.stackTraceLimit = Infinity;
                  let error = new _Error();
                  let stackTrace = error.stack.split(/\n/);
                  let top = stackTrace[2].trim();
                  let bottom = stackTrace.pop().trim();
                  if (!isWhitelisted(top, bottom)) {
                    _console.error('access to window.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                  }
                  else {
                    //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                  }
                }
                return hiddenValue;
              },
            set: desc.writable
              ? function set(value) {
                  if (contextStack.isEmpty()) {
                    _Error.stackTraceLimit = Infinity;
                    let error = new _Error();
                    let stackTrace = error.stack.split(/\n/);
                    let top = stackTrace[2].trim();
                    let bottom = stackTrace.pop().trim();
                    if (!isWhitelisted(top, bottom)) {
                      _console.error('access to window.' + name + ' \n', 'this = ', this, '\n', error.stack, '\n', 'bottom = ', '"' + bottom + '"');
                    }
                    else {
                      //_console.error('whitelist access to window.' + name + ' \ntop = ' + top + '\nbottom = ', bottom);
                    }
                  }
                  hiddenValue = value;
                }
              : _undefined,
          });
        }
      }
      else {
        // window.name is not configurable
      }
    });
    
  }
}
*/