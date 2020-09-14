/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { GulpDefaultRegistry, Configurable } = require('target-configurator');

class TargetConfig extends Configurable(GulpDefaultRegistry, 'thin-hook') {
  static basePath = module.parent.path; // module.parent is gulpfile.js in the base directory
  static configPath = module.path; // Overriding configPath is safe and robust
  // configure itself step by step
  _configure() {
    super._configure();
    Object.assign(this.path, {
      root: 'demo',
      backend: 'demo-backend',
      frontend: 'demo-frontend',
      keys: 'demo-keys',
      components: 'bower_components',
      encodedIndexHtml: 'index.html',
      decodedIndexHtml: 'original-index.html',
      hook: TargetConfig.packagePath,
      test: 'test',
    });
    Object.assign(this, { // dependent on this.path
      'thin-hook': {
        hook: require(path.resolve(this.path.hook, 'hook.js')),
      },
      url: {
        [TargetConfig.needResolution]: true,
        root: '/components/thin-hook/demo', // usually root path should be in an upper directory like '/'; this root is in a deep directory since it is a demo in a component
        components: '/components',
        mappings: () => {
          let mappings = [
            // [ fullPath, urlPath ] in directory path names
            [path.resolve(this.path.base, this.path.components), this.url.components], // highest priority in mapping
            [path.resolve(this.path.base, this.path.root), this.url.root],
            [this.path.hook, path.resolve(this.url.components, this.path.hook.split('/').pop())], // for hook.min.js
          ];
          this.url.reverseMappings = this.reverseMappings(mappings); // [ urlPath, fullPath ] in directory path names
          return this.reverseMappings(this.url.reverseMappings);
        },
      },
      server: {
        serverJs: 'demoServer.js',
        host: process.env['SERVER_HOST'] || 'localhost',
        port: 8080,
        devToolsHostPort: '0.0.0.0:9229',
        concurrency: 4,
      },
      errorReportService: {
        port: 8081,
      },
      validationService: {
        host: process.env['VALIDATION_HOST'] || 'localhost',
        port: 8082,
      },
      certificates: {
        generateCertSh: 'generate_cert.sh',
        CA: 'demoCA', // default value for openssl
        DN: {
          C: 'JP',
          ST: 'Tokyo',
          O: 'thin-hook',
          OU: 'demo',
          CN: 'thin-hook demo CA',
        },
      },
      'cache-bundle-js': {
        enableCacheBundle: true,
      },
      'context-generator-js': {
        defineCustomContextGenerator: true,
      },
      'no-hook-authorization': {
        hash: {
          "https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js": "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f", // TODO: generate from URL response
          "/components/thin-hook/demo/ inline cors": "a578e741369d927f693fedc88c75b1a90f1a79465e2bb9774a3f68ffc6e011e6", // TODO: generate from the inline script
          "/components/thin-hook/demo/ inline hooked eval results": "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd",
          "(function write2() { console.log(\"no-hook script tag via document.write\"); })()": "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615",
          "(function write4() { console.log(\"no-hook script tag in div tag via document.write\"); })()": "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed",
          "(function writeln2() { console.log(\"no-hook script tag via document.writeln\"); })()": "c135fd6ba3cad41e63985ecca191995bf311abc756c5f574ef5b641e7db56914",
          "(function writeln4() { console.log(\"no-hook script tag in div tag via document.writeln\"); })()": "e233738578fd7e8f2e961fb11885e2c187146314a8e3fc65692633ff89c5d34a",
          "location = \"about:blank\";": "4f0395d52a8c1c7edaacacade9c31fe18555b79ce963dfb1abaaa34990993374", // TODO: deprecate and generate from "demo/about-blank-redirector.js"
          /* TODO:
          "c739e860b7427393bdda7eec6442969c440bad792ed9bc78e3ff54212645215a": true, // hook.min.js
          "6282ed809090895f8477143bc3ab8d8af4dbcd2960c724943f499c0f2913a159": true, // demo/bootstrap.js
          "5b615aa885a0518466153be6ecb2cfeef1300f181ff60ca91cad964659c92052": true, // demo/hook-worker.js
          "13517425e13d008da30e5638a6f91b3bcb913210191ada9e5b1be85df73ebaa9": true, // demo/browserify-commonjs.js
          "e992640bf3759389183b8cb9f06e289f97d6390ebd10515eef7f670366db9291": true, // demo/webpack-es6-module.js
          "97f2022963c310fadb096c328d849fdb6658c1cd509cad030f71cb426c7841a4": true, // demo/webpack-commonjs.js
          "be62ecde142b4cdf07dfa764b264215b0d52ab6209d666fe0f3bc1832f021cd0": true, // demo/rollup-es6-module.js
          "dfb424d10dd73ee1bb1028ac0073e941d024d3b9a5f9e5a2fd6c9ce99a9ba8f1": true, // demo/rollup-module1.js
          */
        },
      },
      mode: {
        enableDebugging: false,
        devtoolsDisabled: true,
      },
    });
    Object.assign(this, {
      commands: { // dependent on this.path, this.server, this.certificates, and this.commands itself
        [TargetConfig.needResolution]: true,
        "http": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'httpServer', 'errorReportService', 'validationService')}`,
        "debug": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'debugServer', 'errorReportService', 'validationService')}`,
        "https": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'httpsServer', 'errorReportService', 'validationService')}`,
        "cache-bundle": () => `concurrently -k --kill-others-on-fail -s first -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'buildServer', 'cacheBundleUploadService', 'cacheBundleGeneration')}`,
        "updateHtmlHash": () => `concurrently -k --kill-others-on-fail -s first -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'buildServer', 'cacheBundleUploadService', 'loadOnly')}`,
        "buildServer": `node ${path.resolve(this.path.base, this.path.backend, this.server.serverJs)} -p ${this.server.port} \\
          -m build -P https -H localhost:${this.server.port}`,
        "httpServer": `node ${path.resolve(this.path.base, this.path.backend, this.server.serverJs)} -p ${this.server.port} \\
          -m server -c ${this.server.concurrency} -H ${process.env['SERVER_HOST'] || 'localhost'}`,
        "httpsServer": `node ${path.resolve(this.path.base, this.path.backend, this.server.serverJs)} -p ${this.server.port} \\
          -m server -c ${this.server.concurrency} -P https -H ${process.env['SERVER_HOST'] || 'localhost'}:${this.server.port}`,
        "debugServer": `node --inspect-brk=${this.server.devToolsHostPort} ${path.resolve(this.path.base, this.path.backend, this.server.serverJs)} -p ${this.server.port} \\
          -m debug -c 1 -H ${process.env['SERVER_HOST'] || 'localhost'}`,
        "postHtml": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'postHtmlServer', 'errorReportService', 'validationService')}`,
        "postHtmlServer": `node ${path.resolve(this.path.base, this.path.backend, this.server.serverJs)} -p ${this.server.port} \\
          -m server -c ${this.server.concurrency} -H ${process.env['SERVER_HOST'] || 'localhost'} --middleware ${path.resolve(this.path.base, this.path.backend, 'postHtml.js')}`,
        "errorReportService": `node ${path.resolve(this.path.base, this.path.backend, 'errorReportService.js')} -p ${this.errorReportService.port}`,
        "validationService": `node ${path.resolve(this.path.base, this.path.backend, 'validationService.js')} -p ${this.validationService.port} \\
          -m server -H ${process.env['VALIDATION_HOST'] || 'localhost'}`,
        "integrity-service-helpers": `cd ${path.resolve(this.path.base, this.path.backend, 'integrity-service-helpers')} && npm install`,
        "validation-console": `cd ${path.resolve(this.path.base, this.path.backend, 'validation-console')} && npm ci && npm run build`,
        "certificates": `cd ${path.resolve(this.path.base, this.path.keys)} && ./${this.certificates.generateCertSh} `,
        "clean-demo-certificates": `cd ${path.resolve(this.path.base, this.path.keys)} && rm -riv ${this.certificates.CA}`,
        "cacheBundleUploadService": `node ${path.resolve(this.path.base, this.path.backend, 'cacheBundleUploadService.js')}`,
        "cacheBundleGeneration": `node ${path.resolve(this.path.base, this.path.backend, 'cacheBundleGeneration.js')}`,
        "loadOnly": `node ${path.resolve(this.path.base, this.path.backend, 'cacheBundleGeneration.js')} loadOnly`,
        "test:attack": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
          ${this.getConcurrentlyArguments(this.commands, 'buildServer', 'cacheBundleUploadService', 'puppeteerAttackTest')}`,
        "puppeteerAttackTest": `node ${path.resolve(this.path.base, 'test/puppeteerAttackTest.js')}`,
        "frontend-modules": `cd ${path.resolve(this.path.base, this.path.root)} && npm install`,
        "frontend-modules-locked": `cd ${path.resolve(this.path.base, this.path.root)} && npm ci`,
      },
    });
    Object.assign(this, { // scoped plugins
      '@thin-hook/examples': {
        base: path.resolve(this.path.hook, 'examples'),
      },
      '@thin-hook/module-examples': {
        [TargetConfig.needResolution]: true,
        importMapsPath: () => path.resolve(this['@thin-hook/examples'].base, 'examples.importmap'),
        baseURL: '/components/'
      },
      '@thin-hook/module-examples-dependencies': {
        [TargetConfig.needResolution]: true,
        moduleDependenciesPath: () => path.resolve(this['@thin-hook/examples'].base, 'moduleDependencies.json'),
      },
    });
  }
}

const targetConfig = new TargetConfig();

module.exports = targetConfig;
