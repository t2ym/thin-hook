/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  /*
    As the instrumented test/hook.min.js stores its coverage data into window.__coverage__,
    WCT.share.__coverage__ has to be explicitly initialized by window.__coverage__.
    This cannot be done in the instrumented code in test/hook.min.js since WCT.share object is reset
    to an empty object {} on loading web-component-tester/browser.js and initializing WCT after test/hook.min.js is loaded.
  */
  WCT.share.__coverage__ = window.__coverage__;
  /*
    Since hook.registerServiceWorker() in hook.min.js reloads the entry HTML page
    to replace itself with its "decoded HTML" version with hook.min.js?service-worker-ready=true,
    WCT's childRunner.share object, which has the value of WCT.share BEFORE the reloading of the page,
    has to be updated with that from the "decoded HTML" page.
    To achieve this, childRunner.loaded() handler for DOMContentLoaded event has to be
    explicitly called again on loading the "decoded HTML" version.
    No waiting for the "load" event is required as the coverage target is only hook.min.js, which has
    already been loaded at the beginning of the page.
  */
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
          /*
            wct-istanbul 0.12.3 supports collection of multiple coverage data sets
            in a single sub suite by setting WCT.share.__coverage__* as other coverage data
          */
          WCT.share.__coverage__service_worker__ = this.swCoverage;
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