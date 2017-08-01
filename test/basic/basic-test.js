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
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(hook, 'hook is defined');
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
