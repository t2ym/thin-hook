/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const GulpDefaultRegistry = require('undertaker-registry');

class TargetConfig extends GulpDefaultRegistry {
  constructor() {
    super();
  }
  init(gulpInst) {
    super.init(gulpInst);
    this.gulp = gulpInst;
    this._configure();
    this._resolveConfig();
  }
  get(name) {
    let task = super.get(name);
    if (!task) {
      task = this.task(name); // register plugin
    }
    return task;
  }
  set(name, fn) {
    let boundFn = fn.bind(this);
    boundFn.displayName = fn.displayName;
    boundFn.description = fn.description;
    boundFn.flags = fn.flags;
    return super.set(name, boundFn);
  }
  resolveConfiguratorPath(pluginName) {
    let configuratorJs = 'configurator.js';
    let pluginConfiguratorPath = path.resolve(targetConfig.path.hook, targetConfig.path.plugins, pluginName, configuratorJs); // local
    if (fs.existsSync(pluginConfiguratorPath)) {
      return pluginConfiguratorPath;
    }
    if (this['thin-hook'].pluginScope) {
      let packageName = pluginName.split('/')[0] === this['thin-hook'].pluginScope
        ? pluginName
        : path.join(this['thin-hook'].pluginScope, pluginName);
      try {
        pluginConfiguratorPath = require.resolve(path.join(packageName, configuratorJs)); // @thin-hook scope
        if (fs.existsSync(pluginConfiguratorPath)) {
          return pluginConfiguratorPath;
        }
      }
      catch (e) {}
    }
    if (pluginName.startsWith('@')) { // scoped
      let packageNameSplit = pluginName.split('/');
      let packageName;
      switch (packageNameSplit.length) {
      case 1: // "@plugin-scope"
        packageName = path.join(pluginName, 'default'); // "@plugin-scope/default"
        break;
      case 2: // "@plugin-scope/name"
        packageName = pluginName;
        break;
      default: // "@plugin-scope/name/..."
        if (packageNameSplit[packageNameSplit.length - 1] === configuratorJs) {
          // "@plugin-scope/name/configurator.js"
          packageNameSplit.pop();
          packageName = packageNameSplit.join('/');
        }
        else {
          // "@plugin-scope/name/subdir"
          packageName = pluginName;
        }
        break;
      }
      try {
        pluginConfiguratorPath = require.resolve(path.join(packageName, configuratorJs)); // scoped plugin
        if (fs.existsSync(pluginConfiguratorPath)) {
          return pluginConfiguratorPath;
        }
      }
      catch (e) {}
    }
    throw new Error(`targetConfig.resolveConfiguratorPath: failed to resolve pluginName "${pluginName}"`);
  }
  // register gulp task
  // Note: this function must be called via task() so that this is the targetConfig object
  task(pluginName) {
    const targetConfig = this;
    const configuratorPath = this.resolveConfiguratorPath(pluginName);
    const plugin = require(configuratorPath);
    if (plugin.name !== pluginName) {
      throw new Error(`task("${pluginName}"): plugin.name === ${plugin.name} does not match`);
    }
    if (typeof plugin.init === 'function') {
      plugin.init.call(targetConfig, targetConfig);
    }
    return this.gulp.task(pluginName,
      this.gulp.series(
        Object.assign((done) => {
          if (Array.isArray(plugin.dependencies)) {
            plugin.dependencies.forEach(dependency => {
              if(!(targetConfig[dependency] && targetConfig[dependency].done)) {
                throw new Error(`plugin task "${pluginName}": dependent task "${dependency}" has not completed`);
              }
            });
          }
          done();
        }, { displayName: `${pluginName} check dependencies` }),
        // Note: task function is bound to targetConfig since gulp.series() bypasses registry.set(name, fn)
        Object.assign(plugin.configurator.call(targetConfig, targetConfig).bind(targetConfig), { displayName: `${pluginName} configurator` }),
        Object.assign((done) => {
          targetConfig[pluginName] = targetConfig[pluginName] || {};
          targetConfig[pluginName].done = true;
          done();
        }, { displayName: `${pluginName} done` }),
      )
    );
  }
  // get thin-hook package path even from within thin-hook package
  static hookPath = (() => {
    try {
      let hookJs = require.resolve('thin-hook');
      if (hookJs) {
        return path.dirname(hookJs);
      }
    }
    catch (e) {}
    let dirname = __dirname;
    let packageName;
    while (!packageName) {
      let packagePath = path.resolve(dirname, 'package.json');
      if (fs.existsSync(packagePath)) {
        let _package = require(packagePath);
        packageName = _package.name;
        break;
      }
      dirname = path.resolve(dirname, '..');
      if (dirname === '/') {
        break;
      }  
    }
    if (packageName === 'thin-hook') {
      return dirname;
    }
    else {
      return path.resolve(__dirname, '..');
    }
  })();
  static needResolution = Symbol('need resolution');
  static basePath = module.parent.path;
  static configPath = __dirname;
  // delayed resolution of configurations 
  _resolveConfig() {
    for (let config in this) {
      if (this[config] && typeof this[config] === 'object' && this[config][TargetConfig.needResolution]) {
        for (let key in this[config]) {
          if (typeof this[config][key] === 'function') {
            this[config][key] = this[config][key].call(this);
          }
        }
      }
    }
  }
  // generate arguments for concurrently
  getConcurrentlyArguments(commands, ...names) {
    let args = names.map(command => `"${commands[command]}"`);
    return `--names "${names.join(',')}" ${args.join(' ')}`;
  }
  // reverse [ fullPath, urlPath ] mappings
  reverseMappings(mappings) {
    // [ urlPath, fullPath ] in directory path names
    let _mappings = JSON.parse(JSON.stringify(mappings)); // clone
    _mappings.sort((a, b) => {
      let _a = a[1] + (a[1].endsWith('/') ? '' : '/');
      let _b = b[1] + (b[1].endsWith('/') ? '' : '/');
      if (_a.length < _b.length) {
        if (_b.startsWith(_a)) {
          // a > b
          return 1;
        }
      }
      else if (_a.length > _b.length) {
        if (_a.startsWith(_b)) {
          // a < b
          return -1;
        }
      }
      return _a.localeCompare(_b);
    });
    return _mappings.map(([ fullPath, urlPath ]) => [ urlPath, fullPath ]);
  }
  // map a path with provided mappings
  mapper(mappings, _path) {
    let result;
    for (let [ original, mapped ] of mappings) {
      if (_path.startsWith(original + '/')) {
        result = path.join(mapped, _path.substring(original.length + '/'.length));
        break;
      }
    }
    if (!result) {
      throw new Error(`targetConfig.mapper(): "${_path}" cannot be mapped`);
    }
    return result;
  }
  // configure itself step by step
  _configure() {
    this.path = {
      base: TargetConfig.basePath,
      root: 'demo',
      config: path.relative(TargetConfig.basePath, TargetConfig.configPath),
      backend: 'demo-backend',
      frontend: 'demo-frontend',
      keys: 'demo-keys',
      components: 'bower_components',
      encodedIndexHtml: 'index.html',
      decodedIndexHtml: 'original-index.html',
      hook: TargetConfig.hookPath,
      plugins: 'plugins',
    };
    Object.assign(this, { // dependent on this.path
      'thin-hook': {
        hook: require(path.resolve(this.path.hook, 'hook.js')),
        pluginScope: '@thin-hook',
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
          return mappings;
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
