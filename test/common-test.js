/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  WCT.share.__coverage__ = window.__coverage__;
  let childRunner = WCT._ChildRunner.get(window);
  if (childRunner) {
    childRunner.loaded();
  }
}
{
  // common scope
  let scope = 'common';
  let common = new Suite(scope, 'thin hook common scope');
  common.htmlSuite = '*'; // Only inherited scopes are executed
  // common test classes
  common.test = class ThinHookSuite extends Suite {
    static get reconnectable() { return true; }
    get currentPhase() {
      this.href = this.href || window.location.href;
      let match = this.href.match(/^[^#]*#TestSuites=[^&]*&Scope=[a-zA-Z0-9_-]*&Phase=([0-9]*).*$/);
      return match ? Number.parseInt(match[1]) : 0;
    }
    get operationPhase() {
      return typeof this.phase === 'number' ? this.phase : 0;
    }
    get hasToSkip() {
      return this.currentPhase !== this.operationPhase;
    }
    stepPhase() {
      this.phase = typeof this.phase === 'number' ? this.phase + 1 : 1;
    }
    async setup() {
      await super.setup();
    }
    async teardown() {
      await super.teardown();
    }
    /* async */ checkInterval(condition, interval, maxCount) {
      return new Promise((resolve, reject) => {
        if (condition()) {
          resolve();
        }
        else {
          let count = 0;
          let intervalId = setInterval(() => {
            if (condition()) {
              clearInterval(intervalId);
              resolve();
            }
            else if (++count >= maxCount) {
              clearInterval(intervalId);
              reject(new Error('condition = ' + condition.toString() + ' count = ' + count + ' maxCount = ' + maxCount));
            }
          }, interval);
        }
      });
    }
  }
  common.test = (base) => class LoadPage extends base {
    async operation() {
    }
    async checkpoint() {
    }
  }
  common.test = (base) => class UnregisterServiceWorker extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      this.swRegistration = await navigator.serviceWorker.getRegistration('./');
      if (window.__coverage__) {
        this.swInstance = this.swRegistration.active;
        this.swCoverage = await new Promise((resolve, reject) => {
          var channel = new MessageChannel();
          channel.port1.onmessage = (event) => {
            if (event.data.error) {
              reject(event.data.error);
            }
            else {
              resolve(event.data);
            }
          };
          navigator.serviceWorker.controller.postMessage('coverage', [ channel.port2 ]);
        });
        if (this.swCoverage) {
          WCT.share.__coverage__ = this.swCoverage;
          console.log('WCT.share = ', WCT.share);
        }
      }
      this.swStatus = this.swRegistration ? await this.swRegistration.unregister() : false;
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.swRegistration, 'Service Worker was running');      
      assert.isOk(this.swStatus, 'Service Worker is unregistered successfully');
    }
  }
  common.test = (base) => class Reload extends base {
    static get reconnectable() { return false; }
    async operation() {
      this.stepPhase();
    }
  }
  common.test = {
    ThinHookSuite: {
      LoadPage: ''
    }
  };
} // common scope