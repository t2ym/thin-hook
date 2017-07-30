/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // reset scope
  let scope = 'reset';
  let reset = new Suite(scope, 'thin-hook reset service worker test');
  reset.htmlSuite = 'reset';
  reset.test = Suite.scopes.common.classes.ThinHookSuite;
  reset.test = Suite.scopes.common.classes.LoadPage;
  reset.test = Suite.scopes.common.mixins.UnregisterServiceWorker;
  reset.test = (base) => class ResetServiceWorker extends base {
    static get reconnectable() { return false; }
  }
  reset.test = {
    // test class mixins
    '': [],
    // test classes
    LoadPage: {
      ResetServiceWorker: {
        UnregisterServiceWorker: 'Reset'
      }
    }
  };
} // reset scope
