/*
@license https://github.com/t2ym/reportage/blob/master/LICENSE.md
Copyright (c) 2023 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const Config = {
  configURL: import.meta.url,
  get testConfigPath() {
    return new URL(this.configURL).pathname;
  },
  _reporterWebRootRelativeToTestConfigPath: '../',
  get testConfigPathOnReporter() {
    if (new URL(this.configURL).protocol === 'file:') {
      const baseLength = (new URL(this._reporterWebRootRelativeToTestConfigPath, this.configURL).pathname).length;
      return (new URL(this.configURL)).pathname.substring(baseLength - 1);
    }
    else {
      return this.testConfigPath;
    }
  },
  _concurrency: 4,//typeof navigator === 'object' ? navigator.hardwareConcurrency : 1,
  get _targetAppHosts() {
    return [...function *() { for (let i = 1; i <= Config._concurrency; i++) yield `https://${i}.www.local162.org`; }()];
  },
  get _targetAppPorts() {
    return [ 8080 ];
  },
  get targetAppTestBasePath() {
    let pathname = new URL(this.configURL).pathname.split('/');
    pathname[pathname.length - 1] = '';
    return pathname.join('/'); // /test/
  },
  targetOrigin(host, port) {
    // TODO: handle port=443 and '' properly
    return `${host}:${port}`;
  },
  targetApp(origin, path) {
    return new URL(path, origin).href;
  },
  * originGenerator() {
    for (let host of this._targetAppHosts) {
      for (let port of this._targetAppPorts) {
        yield this.targetOrigin(host, port);
      }  
    }
  },
  driverInjectionMethod: [
    'BuildTime',
    'ServerMiddleware',
    'Extension',
  ][0],
  get reporterOrigin() {
    return `https://localhost:3000`;
  },
  async importedBy(importerURL) {
    const _url = new URL(importerURL);
    let pathElements = _url.pathname.split('/');
    let reportagePackagePath;
    if (pathElements.length >= 3 &&
        pathElements[pathElements.length - 1].endsWith('.js') &&
        pathElements[pathElements.length - 2] === 'reportage' &&
        pathElements[pathElements.length - 3] === 'node_modules') {
      // */node_modules/reportage/*.js
      reportagePackagePath = _url.pathname.substring(0, _url.pathname.length - pathElements[pathElements.length - 1].length)
    }
    else if (pathElements.length === 2 &&
      pathElements[0] === '' &&
      pathElements[1].endsWith('.js')) {
      // /*.js
      reportagePackagePath = _url.pathname.substring(0, 1); // '/'
    }
    else if (_url.protocol === 'file:' &&
      (pathElements[pathElements.length - 1].endsWith('cli.mjs') || pathElements[pathElements.length - 1].endsWith('cli.js'))) {
      reportagePackagePath = _url.pathname.substring(0, _url.pathname.length - pathElements[pathElements.length - 1].length)
    }
    if (reportagePackagePath) {
      switch (pathElements[pathElements.length - 1]) {
      case 'reporter.js': // must be called from reporter.js in reporter.html
        this._pageType = 'reporter';
        break;
      case 'driver.js': // must be called from driver.js in target app pages
        this._pageType = 'driver';
        break;
      case 'cli.mjs':
      case 'reportage':
        this._pageType = 'reportage';
        break;
      case 'cli.js':
        this._pageType = 'reportage:instrumented';
        break;
      case 'mediator-worker.js':
      case 'mediator-worker-client.js':
        break;
      default:
        break;
      }
      if (this._pageType) {
        this.reportagePackagePath = reportagePackagePath;
      }
    }
    if (this.reportagePackagePath) {
      const { default: resolvedPaths } = await import(new URL('resolved-paths.js', new URL(this.reportagePackagePath, this.configURL)).pathname);
      this.resolvedPaths = resolvedPaths;
    }
    else {
      throw new Error(`${import.meta.url}: Unexpected call to Config.importedBy("${importerURL}")`);
    }
  },
  resolve(bareSpecifier) { // primitive simulation of import maps
    if (!this.reportagePackagePathOnTargetApp) {
      throw new Error(`${import.meta.url}: reportagePackagePathOnTargetApp is missing in calling Config.resolve("${bareSpecifier}")`);
    }
    if (!this.resolvedPaths) {
      throw new Error(`${import.meta.url}: resolvedPath is missing in calling Config.resolve("${bareSpecifier}")`);
    }
    if (!this.resolvedPaths[bareSpecifier]) {
      throw new Error(`${import.meta.url}: resolvedPath["${bareSpecifier}"] is missing in calling Config.resolve("${bareSpecifier}")`);
    }
    return new URL(this.resolvedPaths[bareSpecifier], new URL(this.reportagePackagePathOnTargetApp, this.configURL).href).pathname;
  },
  get reportagePackagePathOnReporter() {
    if (new URL(this.configURL).protocol === 'file:') {
      const baseLength = (new URL(this._reporterWebRootRelativeToTestConfigPath, this.configURL).pathname).length;
      return this.reportagePackagePath.substring(baseLength - 1);
    }
    else {
      return this.reportagePackagePath;
    }
  },
  get reportagePackagePathOnTargetApp() {
    return this.reportagePackagePath;
  },
  mediatorWorkerPathRelativeToReportage: './mediator-worker.js',
  _mediatorHtmlPathRelativeToReportage: './mediator.html',
  get mediatorHtmlURL() {
    return new URL(this._mediatorHtmlPathRelativeToReportage, new URL(this.reportagePackagePathOnReporter, this.reporterOrigin).href).href;
  },
  _reporterHtmlPathRelativeToReportage: 'reporter.html',
  get reporterURL() {
    return `${this.reporterOrigin}${this.reportagePackagePathOnReporter}${this._reporterHtmlPathRelativeToReportage}#${this.testConfigPathOnReporter}`;
  },
  get cleanupOptions() {
    const commonOptions = {
      RemovalOptions: {
        since: 0,
        origins: [Config.reporterOrigin, ...Config.originGenerator()], // chrome-only
        //hostnames: [], // firefox-only
      },
      dataToRemove: {
        start: { // only once per run; unnecessary for puppeteer sessions if a dedicated user profile is created for each session
          // non-filterable by origins/hostnames - Be aware that other apps with the same user profile are affected as well
          appcache: false, // [DEPRECATED FEATURE] Websites' appcaches.
          downloads: false, // [BASICALLY IRRELEVANT TO WEB TESTS] The browser's download list.
          history: false, // [Session history is reset on navigating to the bottom of the history stack] The browser's history, which is different from window.history object
          formData: true, // [Autofill feature should be disabled in the browser settings] The browser's stored form data.
          passwords: true, // [Autofill feature should be disabled in the browser settings] Stored passwords.
          // filterable by origins/hostnames
          cache: true, // The browser's cache.
        },
        end: { // only once per run
          // non-filterable by origins/hostnames - Be aware that other apps with the same user profile are affected as well
          appcache: false, // [DEPRECATED FEATURE] Websites' appcaches.
          downloads: false, // [BASICALLY IRRELEVANT TO WEB TESTS] The browser's download list.
          history: false, // [Session history is reset on navigating to the bottom of the history stack] The browser's history, which is different from window.history object
          formData: true, // [Autofill feature should be disabled in the browser settings] The browser's stored form data.
          passwords: true, // [Autofill feature should be disabled in the browser settings] Stored passwords.
          // filterable by origins/hostnames
          cookies: true, // The browser's cookies.
          cache: true, // The browser's cache.
          fileSystems: true, // Websites' file systems.; not on Firefox
          indexedDB: true, // Websites' IndexedDB data.
          localStorage: true, // Websites' local storage data.
          cacheStorage: true, // Cache storage
          serviceWorkers: true, // Service Workers.
          webSQL: false, // [DEPRECATED FEATURE] Websites' WebSQL data.
        },
        window: { // on each window.open(targetAppOrigin)
          // filterable by origins/hostnames
          cookies: true, // [If the feature is not used, it can be false] The browser's cookies.
          cache: false, // The browser's cache.
          fileSystems: true, // Websites' file systems.; not on Firefox
          indexedDB: true, // Websites' IndexedDB data.
          localStorage: true, // Websites' local storage data.
          cacheStorage: true, // Cache storage
          serviceWorkers: true, // Service Workers.
          webSQL: false, // [DEPRECATED FEATURE] Websites' WebSQL data.
        },
        suite: { // on each test scenario
          // filterable by origins/hostnames
          cookies: true, // [If the feature is not used, it can be false] The browser's cookies.
          cache: false, // [TESTS MAY BECOME FLAKY IF CACHE IS CLEANED ON EACH SUITE AND CONCURRENCY IS HIGH] The browser's cache.
          fileSystems: false, // [If the feature is not used, it can be false] Websites' file systems.; not on Firefox
          indexedDB: false, // [If the feature is not used, it can be false] Websites' IndexedDB data.
          localStorage: false, // [If the feature is not used, it can be false] Websites' local storage data.
          cacheStorage: false, // [In most cases, Service Workers and Cache storage can persist over multiple test scenarios] Cache storage for Service Workers
          serviceWorkers: false, // [In most cases, Service Workers and Cache storage can persist over multiple test scenarios] Service Workers. 
          webSQL: false, // [DEPRECATED FEATURE] Websites' WebSQL data.
          // not supported in the browsingData.remove() API
          sessionStorage: true, // cleanup by sessionStorage API itself at driver.js
        },
      },
      timeout: 10000,
    };
    return commonOptions;
  },
  _suitesLoaderScriptRelativeToConfig: './suites-loader.js',
  _scenaristLoaderScriptRelativeToReportage: './scenarist-loader.js',
  get suitesLoaderPath() {
    return new URL(this._suitesLoaderScriptRelativeToConfig + '#' + new URL(this.configURL).pathname, this.configURL).pathname;
  },
  get scenaristLoaderPath() {
    return new URL(this._scenaristLoaderScriptRelativeToReportage, new URL(this.reportagePackagePath, this.configURL).href).pathname;
  },
  importOnlyTargetScope: true, // for performance
  timeout: 50 * 1000, // 5sec
  readyTimeout: 50 * 1000, // 5sec
  readyTimeoutRetries: 2, // 2 retries
  mediatorPortTimeout: 1 * 1000, // 1sec
  beaconTimeout: 50 * 1000, // 5sec
  setupInjectionTimeout: 1000, // 1sec
  dispatcherStartInterval: 50, // 50ms - insert a wait between dispatcher start events
  suitesLoaderRetries: 1, // 2 retries
  windowTarget: '_blank',
  windowFeatures: 'noopener,noreferrer',
  mochaOptions: {
    ui: 'bdd',
    timeout: 60000,
    checkLeaks: false,
    //globals: [],
    cleanReferencesAfterRun: false, // References must not be cleaned until the proxy reporter completes transferring all events
    retries: -1,
  },
  consoleReporter: 'list',
  consoleReporterOptions: {
    reportDir: './test/mochawesome-report/',
    //reportFilename: '[status]_[datetime]-[name]-report',
    autoOpen: false,
    html: true,
    json: true,
    timeout: 5000,
    consoleReporter: 'list',
  },
  /*
  screenshotOptions: {
    enabled: true,
    exposedFunction: 'takeScreenshot',
    timeout: 1000,
    max_retries: 3,
    options: {
      // https://pptr.dev/api/puppeteer.screenshotoptions
      format: 'png',
      fullPage: true,
    },
  },
  */
  coverageOptions: {
    enabled: false,
  },
  get links() {
    return {
      //mochawesome: new URL(this.consoleReporterOptions.reportDir + 'mochawesome.html', new URL(this._reporterWebRootRelativeToTestConfigPath, import.meta.url)).href,
      //coverage: new URL('coverage/index.html', new URL(this._reporterWebRootRelativeToTestConfigPath, import.meta.url)).href,
    };
  },
  get _pathToChromeExtension() {
    return this.reportagePackagePath +
      (this.coverageOptions && this.coverageOptions.enabled && this._pageType === 'reportage:instrumented' ? 'test/instrumented/' : '') +
      'extension/chrome';
  },
  get puppeteerLaunchOptions() {
    return {
      headless: 'new', // 'new' for headless; false for windowed
      dumpio: false,
      devtools: false,
      defaultViewport: { // null for resizable viewport in a windowed mode
        width: 1280,
        height: 720,
        //deviceScaleFactor: 1,
        //hasTouch: false,
        //isLandscape: false,
        //isMobile: false,
      },
      args: [
        '--disable-gpu',
        //'--enable-logging=stderr',
        //'--auto-open-devtools-for-tabs',
        '--disable-ipc-flooding-protection',
        '--disable-pushstate-throttle',
        '--disable-background-timer-throttling',
        '--disable-popup-blocking',
        `--disable-extensions-except=${Config._pathToChromeExtension}`,
        `--load-extension=${Config._pathToChromeExtension}`,
        '--host-resolver-rules=MAP *.www.local162.org www.local162.org',
        //'--user-data-dir=/home/t2ym/.config/google-chrome',
        //'--profile-directory=Profile 1', // Non-puppeteer windows must be closed when a profile is specified,
      ],
      executablePath: '/usr/bin/google-chrome',
    };
  },
}
export default Config;
