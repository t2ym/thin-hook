{
  hook.parameters.noHookAuthorization = {
    '*': true
  };
  hook.parameters.noHook = [
    url => location.origin === url.origin &&
      [
        '/components/stacky/browser.js',
        '/browser.js',
        '/components/async/lib/async.js',
        '/components/lodash/lodash.js',
        '/components/mocha/mocha.js',
        '/components/chai/chai.js',
        '/components/sinonjs/sinon.js',
        '/components/sinon-chai/lib/sinon-chai.js',
        '/components/accessibility-developer-tools/dist/js/axs_testing.js',
        '/components/test-fixture/test-fixture.html',
        '/socket.io/socket.io.js'
      ].filter((path) => url.pathname.indexOf(path) === 0).length > 0
  ];
  hook.parameters.hookWorker = 'hook-worker.js?no-hook=true';
}
