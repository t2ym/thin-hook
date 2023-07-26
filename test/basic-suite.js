/*
@license https://github.com/t2ym/reportage/blob/master/LICENSE.md
Copyright (c) 2023 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { default as Suite, Config, chai, assert } from "./common-suite.js";
// basic scope
let scope = 'basic';
let basic = new Suite(scope, 'Description of Basic Suite');
basic.htmlSuite = '/components/thin-hook/demo/';
let CommonSuite;
basic.test = CommonSuite = Suite.scopes.common.classes.CommonSuite;
// test class mixin in "basic" scope
basic.test = (base) => class BundleSetFetched extends base {
  static get reconnectable() { return false; }
  get description() { return 'Bundle set is fetched'; }
  async operation(_this) {
    this.skipPhase(_this);
    const timeoutForBundleSetFetched = 60000; // 60sec
    // wait for bundle-set-fetched event
    await new Promise((resolve, reject) => {
      const start = Date.now();
      let intervalId = setInterval(async () => {
        const now = Date.now();
        if (now - start > timeoutForBundleSetFetched) {
          clearInterval(intervalId);
          reject(new Error('timeout for bundle-set-fetched'));
        }
        try {
          let model = document.querySelector('live-localizer').shadowRoot
            .getElementById('main').shadowRoot
            .getElementById('dialog')
            .querySelector('live-localizer-panel').shadowRoot
            .getElementById('model');
          if (model) {
            clearInterval(intervalId);
            // Note: bundle-set-fetched is the load completion event for live-localizer widget and irrelevant to cache-bundle.json
            model.addEventListener('bundle-set-fetched', (event) => {
              resolve(event.type);
            });
          }
          else {
            // try again
          }
        }
        catch (e) {
          // try again
        }
      }, 1000);
    });
  }
  async checkpoint() {
    //chai.assert.isOk(document.querySelector('my-element').shadowRoot.querySelector('[part=button]').innerText.startsWith('count is '), 'Button text starts with "count is "');
  }
}
/*
basic.test = (base) => class InitialCountIs0 extends base {
  get description() { return 'Button text is "count is 0"'; }
  async operation(_this) {
    this.skipPhase(_this);
    this.element = document.querySelector('my-element');
  }
  async checkpoint() {
    chai.assert.equal(this.element.count, 0, 'count property is 0');
    chai.assert.equal(this.element.shadowRoot.querySelector('[part=button]').innerText, `count is ${0}`, 'Initial button text is "count is 0"');
  }
}
basic.test = (base) => class IncrementCount extends base {
  get description() { return 'Click the button to increment the count'; }
  async operation(_this) {
    this.skipPhase(_this);
    this.element = document.querySelector('my-element');
    this.count = this.element.count;
    await this.forMutation(
      this.element.shadowRoot,
      async (target) => target.querySelector('[part=button]').innerText,
      async (target) => target.querySelector('[part=button]').click()
    );
  }
  async checkpoint() {
    chai.assert.equal(this.element.count, this.count + 1, `count property was incremented from ${this.count} to ${this.count + 1}`);
    chai.assert.equal(this.element.shadowRoot.querySelector('[part=button]').innerText, `count is ${this.count + 1}`, `Button text is "count is ${this.count + 1}"`);
  }
}
*/
basic.test = (base) => class View1 extends base {
  get description() { return 'Navigate to View 1'; }
  async operation(_this) {
    await new Promise(async (resolve, reject) => {
      try {
        let menuItems = document.querySelector('my-app').shadowRoot
          .children[3] // app-drawer-layout
          .querySelector('app-drawer')
          .querySelector('iron-selector')
          .querySelectorAll('a');
          menuItems[0].click();
          await new Promise(_resolve => {
            setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
          });
        resolve();
      }
      catch (e) {
        reject(e.message);
      }
    });
  }
  async checkpoint(_this) {
    console.log('Checkpoint for View 1', location.href);
    assert.equal(location.hash, '#view1', 'view 1 hash');
  }
}
basic.test = (base) => class View2 extends base {
  get description() { return 'Navigate to View 2'; }
  async operation(_this) {
    await new Promise(async (resolve, reject) => {
      try {
        let menuItems = document.querySelector('my-app').shadowRoot
          .children[3] // app-drawer-layout
          .querySelector('app-drawer')
          .querySelector('iron-selector')
          .querySelectorAll('a');
          menuItems[1].click();
          await new Promise(_resolve => {
            setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
          });
        resolve();
      }
      catch (e) {
        reject(e.message);
      }
    });
  }
  async checkpoint(_this) {
    console.log('Checkpoint for View 2', location.href);
    assert.equal(location.hash, '#view2', 'view 1 hash');
  }
}
basic.test = (base) => class View3 extends base {
  get description() { return 'Navigate to View 3'; }
  async operation(_this) {
    await new Promise(async (resolve, reject) => {
      try {
        let menuItems = document.querySelector('my-app').shadowRoot
          .children[3] // app-drawer-layout
          .querySelector('app-drawer')
          .querySelector('iron-selector')
          .querySelectorAll('a');
          menuItems[2].click();
          await new Promise(_resolve => {
            setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
          });
        resolve();
      }
      catch (e) {
        reject(e.message);
      }
    });
  }
  async checkpoint(_this) {
    console.log('Checkpoint for View 3', location.href);
    assert.equal(location.hash, '#view3', 'view 3 hash');
  }
}
/*
await new Promise(async (resolve, reject) => {
  try {
    let menuItems = document.querySelector('my-app').shadowRoot
      .children[3] // app-drawer-layout
      .querySelector('app-drawer')
      .querySelector('iron-selector')
      .querySelectorAll('a');
    let result = [];
    for (let i = menuItems.length - 1; i >= 0; i--) {
      menuItems[i].click();
      result.push(menuItems[i].href);
      await new Promise(_resolve => {
        setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
      });
    }
    resolve(result);
  }
  catch (e) {
    reject(e.message);
  }
});
*/
/*
basic.test = (base) => class LitNavi extends base {
  get description() { return 'Navigate to Lit site'; }
  static get reconnectable() { return false; }
  async operation(_this) {
    this.stepPhase();
    if (this.currentPhase + 1 === this.phase) {
      console.log('LitNavi operation (deferred navigation)', this.phase, this.currentPhase);
      Object.assign(this.target, {
        phase: this.phase,
        deferredNavigation() {
          document.querySelector('my-element').shadowRoot.querySelector('a[id=lit-navi]').click();
        },
      });
    }
  }
  async checkpoint(_this) {
    this.skipPhase(_this);
    console.log('Checkpoint for LitNavi (deferred navigation)', this.phase, this.currentPhase, history.length, location.href);
    assert.equal(location.href, (new URL(`/external-navi-lit.html`, location.href)).href, 'Deferred navigation URL');
  }
}
basic.test = (base) => class HomeNavi extends base {
  get description() { return 'Navigate to Home'; }
  static get reconnectable() { return false; }
  async operation(_this) {
    this.stepPhase();
    if (this.currentPhase + 1 === this.phase) {
      console.log('HomeNavi operation (deferred navigation)', this.phase, this.currentPhase);
      Object.assign(this.target, {
        phase: this.phase,
        deferredNavigation() {
          document.querySelector('a[id=home]').click();
        },
      });
    }
  }
  async checkpoint(_this) {
    this.skipPhase(_this);
    console.log('Checkpoint for HomeNavi (deferred navigation)', this.phase, this.currentPhase, history.length, location.href);
    assert.equal(location.href, (new URL(`/`, location.href)).href, 'Deferred navigation URL');
  }
}
*/
// scenarios
basic.test = {
  // test class mixins
  '': [
  ],
  // test classes
  CommonSuite: {
    BundleSetFetched: {
      View1: 'ToView1',
      View2: 'ToView2',
      View3: 'ToView3',
    },
  }
};

export default Suite;
