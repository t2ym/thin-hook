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
        port: 8080,
        devToolsHostPort: '0.0.0.0:9229',
        concurrency: 4,
      },
      errorReportService: {
        port: 8081,
      },
      validationService: {
        port: 8082,
      },
      certificates: {
        generateCertSh: 'generate_cert.sh',
        CA: 'demoCA', // default value for openssl
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
