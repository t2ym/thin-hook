/*
@license https://github.com/t2ym/reportage/blob/master/LICENSE.md
Copyright (c) 2023 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Config from './reportage.config.js'; // test suites know its config path
export { Config };
const { default: chai, assert } = await import(Config.resolve('@esm-bundle/chai/esm/chai.js'));
export { chai, assert };
const { default: Suite } = await import(Config.scenaristLoaderPath);
let scope = 'common';
let common = new Suite(scope, 'Description of Common Suite');
common.htmlSuite = '*';
// common-test.js global test classes
common.test = class CommonSuite extends Suite {
  async setup(_this) {
    await super.setup(_this);
    // hack until beforeEach() and afterEach() are implemented in scenarist
    const This = this;
    if (_this.test.parent._beforeEach.length == 0) {
      _this.test.parent._beforeEach.push(
        _this.test.parent._createHook(
          'beforeEach hook',
          async function () {
            await This.beforeEach(_this);
          }
        )
      );
    }
    if (_this.test.parent._afterEach.length == 0) {
      _this.test.parent._afterEach.push(
        _this.test.parent._createHook(
          'afterEach hook',
          async function () {
            await This.afterEach(_this);
          }
        )
      );
    }
    this.currentPhase = this._currentPhase;
    this.step = null;
  }
  async teardown(_this) {
    await super.teardown(_this);
  }
  async beforeEach(_this) {
    if (this.step === null) {
      this.step = 0;
    }
    else if (_this.currentTest.currentRetry() === 0) {
      this.step++;
    }
    const testURL = this.testURL(_this);
    _this.currentTest.context = [
      {
        title: 'testURL',
        value: testURL,
      },
    ];
    if (Config.screenshotOptions &&
        Config.screenshotOptions.enabled &&
        typeof window[Config.screenshotOptions.exposedFunction] === 'function') {
      const screenshotURL = this.screenshotURL(_this);
      _this.currentTest.context.push(
        {
          title: 'screenshot',
          value: screenshotURL,
        },
      );
    }
  }
  async afterEach(_this) {
    // _this.currentTest.state == 'passed', 'failed', 'pending'
    switch (_this.currentTest.state) {
    case 'passed':
    case 'failed':
      if (Config.screenshotOptions &&
          Config.screenshotOptions.enabled &&
          typeof window[Config.screenshotOptions.exposedFunction] === 'function') {
        const screenshotURL = this.screenshotURL(_this);
        let result = await window[Config.screenshotOptions.exposedFunction]({
          type: 'screenshot',
          screenshotURL: screenshotURL,
        });
        if (result !== 'done') {
          throw new Error(`afterEach: onScreenshot result is not 'done' for ${screenshotURL}`);
        }
      }
      break;
    case 'pending':
    default:
      break;
    }
  }
  nextPhase() {
    if (typeof this.phase !== 'number') {
      this.phase = 0;
    }
    return this.phase + 1;
  }
  stepPhase() {
    if (typeof this.phase === 'number') {
      this.phase++;
    }
    else {
      this.phase = 1;
    }
    return this.phase;
  }
  get _currentPhase() {
    if (this.target && typeof this.target.phase === 'number') {
      return this.target.phase;
    }
    else {
      return 0;
    }
  }
  hasToSkip() {
    if (typeof this.phase !== 'number') {
      this.phase = 0;
    }
    return this.phase !== this.currentPhase;
  }
  skipPhase(_this) {
    if (this.hasToSkip()) {
      // __failed is set as false as a workaround to avoid skipping subsequent tests in the current suite when skipAfterFailure is true
      this.__failed = false;
      _this.skip();
    }
  }
  testURL(_this) {
    const reporterURL = new URL(Config.reporterURL);
    const configPath = (reporterURL.hash.substring(1) || '/test/reportage.config.js').split('?')[0];
    return `${reporterURL.origin}${reporterURL.pathname}${reporterURL.search}` +
      `#${configPath}` +
      `?scope=${encodeURIComponent(this.target.suite.scope)}` +
      `&testIndex=${encodeURIComponent(this.target.suite.testIndex)}` +
      `&testClass=${encodeURIComponent(this.constructor.name)}` +
      `&testStep=${this.step}`;
  }
  screenshotURL(_this) {
    return new URL(`assets/` +
      `${encodeURIComponent(this.target.suite.scope)}` +
      `@${encodeURIComponent(this.target.suite.testIndex)}` +
      `@${encodeURIComponent(this.constructor.name)}` +
      `@${this.step}` +
      `.png`,
      new URL(Config.consoleReporterOptions.reportDir, Config.reporterOrigin)).href;
  }
  addContext(testObj, context) {
    if (!testObj.test.context) {
      testObj.test.context = [];
    }
    testObj.test.context.push(context);
  }
  async forMutation(target, getValue, trigger, timeout = 0, diff = (oldValue, newValue) => oldValue != newValue) {
    let observer;
    let value;
    try {
      const config = { attributes: true, childList: true, subtree: true, characterData: true, };
      const originalValue = await getValue(target);
      console.log(`forMutation: originalValue`, originalValue);
      let promise;
      let resolve;
      let reject;
      const mutationCallback = async function mutationCallback (mutationsList, observer) {
        let newValue = await getValue(target);
        console.log(`forMutation: newValue`, newValue);
        if (diff(originalValue, newValue)) {
          console.log(`forMutation: resolving`);
          resolve(newValue); // 2nd call is no-op
        }
      };
      observer = new MutationObserver(mutationCallback);
      promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      observer.observe(target, config);
      if (typeof timeout === 'number' && timeout > 0) {
        setTimeout(reject, timeout);
      }
      await trigger(target);
      console.log(`forMutation: triggered`);
      value = await promise;
      console.log(`forMutation: resolved`);
      observer.disconnect();
      console.log(`forMutation: disconnected`);
      return value;
    }
    catch (e) {
      if (observer) {
        observer.disconnect();
        console.log(`forMutation: disconnected`);
      }
      throw e;
    }
  }
}
export default Suite;

