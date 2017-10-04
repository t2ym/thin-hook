/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // basic scope
  let scope = 'basic';
  let basic = new Suite(scope, 'thin-hook basic tests');
  basic.htmlSuite = 'basic';
  basic.test = Suite.scopes.common.classes.ThinHookSuite;
  basic.test = Suite.scopes.common.classes.LoadPage;
  basic.test = Suite.scopes.common.mixins.Reload;
  basic.test = Suite.scopes.common.mixins.UnregisterServiceWorker;
  basic.test = (base) => class HookApiAvailable extends base {
    async operation() {
      if (this.hasToSkip) { return; }
    }
    checkApi(api, list, path) {
      switch (list) {
      case Function:
      case Object:
        assert.isOk(api, 'hook API ' + path + ' exists');
        assert.isOk(api instanceof list, 'hook API ' + path + ' is an instance of ' + list.name);
        break;
      default:
        if (list && typeof list === 'object') {
          for (let prop in list) {
            this.checkApi(api[prop], api[prop], path + '.' + prop);
          }
        }
        break;
      }
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      const hookApiList = {
        hook: {
          hookHtml: Function,
          contextGenerators: {
            'null': Function,
            'astPath': Function,
            'method': Function,
            'cachedMethod': Function,
            'cachedMethodDebug': Function,
          },
          __hook__: Function,
          __hook_except_properties__: Function,
          hookCallbackCompatibilityTest: Function,
          hook: Function,
          global: Function,
          Function: Function,
          FunctionArguments: Function,
          eval: Function,
          setTimeout: Function,
          setInterval: Function,
          Node: Function,
          Element: Function,
          HTMLAnchorElement: Function,
          HTMLAreaElement: Function,
          HTMLScriptElement: Function,
          Document: Function,
          with: Function,
          serviceWorkerHandlers: {
            install: Function,
            activate: Function,
            message: Function,
            fetch: Function,
          },
          serviceWorkerTransformers: {
            encodeHtml: Function,
            decodeHtml: Function,
          },
          hookWorkerHandler: Function,
          _collectHookWorkerCoverage: Function,
          registerServiceWorker: Function,
          utils: {
            createHash: Function,
          },
          parameters: Object,
        }
      };
      this.checkApi(window, hookApiList, 'hook');
    }
  }
  basic.test = {
    // test class mixins
    '': [],
    // test classes
    LoadPage: {
      HookApiAvailable: {
        UnregisterServiceWorker: 'HookApiAvailableTest; Hook API is available'
      }
    }
  };
} // basic scope
