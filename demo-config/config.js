/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { GulpDefaultRegistry, Configurable } = require('target-configurator');
const { Traceable } = require('./Tracer.js');

class TargetConfig extends Traceable(Configurable(GulpDefaultRegistry, 'thin-hook')) {
  static basePath = module.parent.path; // module.parent is gulpfile.js in the base directory
  static configPath = module.path; // Overriding configPath is safe and robust
  // configure itself step by step
  _configure() {
    super._configure();
    this.assign('path')({
      root: 'demo',
      backend: 'demo-backend',
      frontend: 'demo-frontend',
      keys: 'demo-keys',
      components: 'bower_components',
      encodedIndexHtml: 'index.html',
      decodedIndexHtml: 'original-index.html',
      hook: TargetConfig.packagePath,
      test: 'test',
    })
    .assign('trace')({
      aggregations: [
        'this.bundles.node-builtins-wrapper.webpack.',
        'this.bundles.node-builtins-wrapper.browserify.',
        path.resolve(this.path.base, this.path.components) + '/',
        path.resolve(this.path.base, this.path.frontend) + '/',
        path.resolve(this.path.base, this.path.root, 'node_modules') + '/',
        path.resolve(this.path.base, 'node_modules') + '/',
      ],
      excludes: [
        'this._tasks',
      ],
      thisReference: '.components.targetConfig',
      propertyName: (object, property) => `${object}${typeof property === 'string' && property.match(/^[a-zA-Z_][a-zA-Z0-9_-]*$/) ? '.' + property : '[' + property + ']'}`,
      dot: {
        path: path.resolve(targetConfig.path.base, targetConfig.path.config, 'dependency-graph.dot'),
        svg: path.resolve(targetConfig.path.base, targetConfig.path.config, 'dependency-graph.svg'),
        header: 'digraph dependencies {\n' +
                '  ratio = fill;\n' +
                '  rankdir="LR"\n' +
                '  node [fontsize=10, style=filled, shape=box, height=0.25]\n' +
                '  edge [fontsize=10]\n' +
                '  \n',
        footer: '\n}\n',
        reverseArrowDirection: true, // true to show dataflow; false to show dependency
        tooltip: (type, name) => {
          let tooltip = '';
          switch (type) {
          case 'plugin':
            tooltip = name + '\\n' + [...this.trace.log[name]].map(log => {
                log = log.replace(/"/g, '\\"');
                let match;
                if (match = log.match(/^(.*) r$/)) {
                  return `${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${match[1]}`;
                }
                else if (match = log.match(/^(.*) w$/)) {
                  return `${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${match[1]}`;
                }
                else if (match = log.match(/^(.*) set$/)) {
                  return `${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${match[1]}`;
                }
                else {
                  return `${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${log}`;
                }
              })
              .sort((a, b) => {
                if (a.startsWith('<-') && b.startsWith('->')) {
                  return this.trace.dot.reverseArrowDirection ? 1 : -1;
                }
                else if (a.startsWith('->') && b.startsWith('<-')) {
                  return this.trace.dot.reverseArrowDirection ? -1 : 1;
                }
                else {
                  return a.localeCompare(b);
                }
              })
              .join('\\n')
            break;
          case 'file':
            {
              tooltip = name + '\\n';
              let plugins = [];
              for (let plugin in this.trace.log) {
                let traceLog = this.trace.log[plugin];
                for (let log of traceLog) {
                  //console.log(plugin, log, name)
                  let match = log.match(/^(.*)( r| w| set)$/);
                  let key = log;
                  let type = '';
                  if (match) {
                    key = match[1];
                    type = match[2];
                  }
                  key = key.replace(/"/g, '\\"');
                  if (name === key) {
                    switch (type) {
                    default:
                    case '':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${plugin}`);
                      break;
                    case ' set':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${plugin}`);
                      break;
                    case ' r':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${plugin}`);
                      break;
                    case ' w':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${plugin}`);
                      break;
                    }
                  }
                }
              }
              tooltip += plugins
                .sort((a, b) => {
                  if (a.startsWith('<-') && b.startsWith('->')) {
                    return this.trace.dot.reverseArrowDirection ? 1 : -1;
                  }
                  else if (a.startsWith('->') && b.startsWith('<-')) {
                    return this.trace.dot.reverseArrowDirection ? -1 : 1;
                  }
                  else {
                    return a.localeCompare(b);
                  }
                })
                .join('\\n')
            }
            break;
          case 'property':
            {
              tooltip = name + '\\n';
              let plugins = [];
              for (let plugin in this.trace.log) {
                let traceLog = this.trace.log[plugin];
                for (let log of traceLog) {
                  //console.log(plugin, log, name)
                  let match = log.match(/^(.*)( r| w| set)$/);
                  let key = log;
                  let type = '';
                  if (match) {
                    key = match[1];
                    type = match[2];
                  }
                  key = key.replace(/"/g, '\\"');
                  if (name === key) {
                    switch (type) {
                    default:
                    case '':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${plugin}`);
                      break;
                    case ' set':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${plugin}`);
                      break;
                    case ' r':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '->' : '<-'} ${plugin}`);
                      break;
                    case ' w':
                      plugins.push(`${this.trace.dot.reverseArrowDirection ? '<-' : '->'} ${plugin}`);
                      break;
                    }
                  }
                }
              }
              tooltip += plugins
                .sort((a, b) => {
                  if (a.startsWith('<-') && b.startsWith('->')) {
                    return this.trace.dot.reverseArrowDirection ? 1 : -1;
                  }
                  else if (a.startsWith('->') && b.startsWith('<-')) {
                    return this.trace.dot.reverseArrowDirection ? -1 : 1;
                  }
                  else {
                    return a.localeCompare(b);
                  }
                })
                .join('\\n')
            }
            break;
          }
          return tooltip;
        },
        focus: (pluginName, propertyName, fileName) =>
          !(pluginName === 'dependency-graph' ||
            (fileName && fileName.indexOf("dependency-graph") >= 0) ||
            (propertyName && propertyName.indexOf("dependency-graph") >= 0)),
        plugin: (pluginName) => this.trace.dot.focus(pluginName, null, null)
          ? `\n  "${pluginName}"[color="0.590 0.273 1.000",tooltip="${this.trace.dot.tooltip('plugin', pluginName)}"]\n`
          : '',
        file: (fileName) => this.trace.dot.focus(null, null, fileName)
          ? `  "${fileName}"[color="0.408 0.498 1.000",tooltip="${this.trace.dot.tooltip('file', fileName)}"]\n`
          : '',
        property: (propertyName) => this.trace.dot.focus(null, propertyName, null)
          ? `  "${propertyName}"[tooltip="${this.trace.dot.tooltip('property', propertyName)}"]\n`
          : '',
        writeProperty: (propertyName, pluginName) => this.trace.dot.focus(pluginName, propertyName, null)
          ? `  "${this.trace.dot.reverseArrowDirection ? pluginName : propertyName}" -> "${this.trace.dot.reverseArrowDirection ? propertyName : pluginName}"[color="0.002 0.999 0.999"]\n`
          : '',
        readProperty: (propertyName, pluginName) => this.trace.dot.focus(pluginName, propertyName, null)
          ? `  "${this.trace.dot.reverseArrowDirection ? propertyName : pluginName}" -> "${this.trace.dot.reverseArrowDirection ? pluginName : propertyName}"\n`
          : '',
        writeFile: (fileName, pluginName) => this.trace.dot.focus(pluginName, null, fileName)
          ? `  "${this.trace.dot.reverseArrowDirection ? pluginName : fileName}" -> "${this.trace.dot.reverseArrowDirection ? fileName : pluginName}"[color="0.002 0.999 0.999"]\n`
          : '',
        readFile: (fileName, pluginName) => this.trace.dot.focus(pluginName, null, fileName)
          ? `  "${this.trace.dot.reverseArrowDirection ? fileName : pluginName}" -> "${this.trace.dot.reverseArrowDirection ? pluginName : fileName}"\n`
          : '',
      },
    })
    .assign('thin-hook')({ // dependent on this.path
      hook: require(path.resolve(this.path.hook, 'hook.js')),
    })
    .assign('url')({
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
    })
    .assign('server')({
      serverJs: 'demoServer.js',
      host: process.env['SERVER_HOST'] || 'localhost',
      port: 8080,
      devToolsHostPort: '0.0.0.0:9229',
      concurrency: 4,
    })
    .assign('errorReportService')({
      port: 8081,
    })
    .assign('validationService')({
      host: process.env['VALIDATION_HOST'] || 'localhost',
      port: 8082,
    })
    .assign('certificates')({
      generateCertSh: 'generate_cert.sh',
      CA: 'demoCA', // default value for openssl
      DN: {
        C: 'JP',
        ST: 'Tokyo',
        O: 'thin-hook',
        OU: 'demo',
        CN: 'thin-hook demo CA',
      },
    })
    .assign('cache-bundle-js')({
      enableCacheBundle: true,
    })
    .assign('context-generator-js')({
      defineCustomContextGenerator: true,
    })
    .assign('import-maps')({
      importMapName: 'modules.importmap',
      privateImportMapName: 'modules-private.importmap',
      auxiliaryImportMap: {
        imports: {
          foo: "./bar.js", // dummy
          "module-on-cdn": "https://cdn.domain.com/path/cdn-module/index.js" // dummy
        },
      },
    })
    .assign('bundles')({
      targets: [
        [ 'commonjs.js',        'browserify-commonjs.js', 'browserify', { browserify: { standalone: 'commonjs_module' } } ],
        [ 'commonjs.js',        'webpack-commonjs.js',    'webpack'   ],
        [ 'es6-module3.js',     'webpack-es6-module.js',  'webpack'   ],
        [ 'es6-module3.js',     'rollup-es6-module.js',   'rollup'    ],
        [ 'modules/module1.js', 'rollup-module1.js',      'rollup'    ],
      ].map(([entry, output, bundler, options]) => ({
        entryBase: path.resolve(this.path.base, this.path.root),
        outputBase: path.resolve(this.path.base, this.path.root),
        entry,
        output,
        bundler,
        options,
      })),
      'thin-hook': {
        sourceMap: (file, targetConfig) => null,
        compact: false,
        hookPrefix: '_uNpREdiC4aB1e_',
        initialScope: (file, target, targetConfig) => ({ require: true, module: true, exports: true }),
      },
      'enhanced-resolve': {
        options: { // same as resolve in webpack config
          extensions: [ '.js', '.json' ],
        },
        // context: base path for resolving non-relative module names with enhanced-resolve in context generators; not affecting import maps
        //   this.path.base: search from package/node_modules/
        //   path.resolve(this.path.base, this.path.root): search from this.path.root/node_modules/
        //   ".": search from the node_modules directory of the current importer module
        context: this.path.base,
      },
      browserify: {
        configurator: 'bundle-browserify', // TODO: '@thin-hook/bundle-browserify'
        browserify: (target, targetConfig) => ({
          standalone: target.options.browserify.standalone,
          insertGlobals: false,
          insertGlobalVars: {
            __hook__: undefined
          },
        }),
        transform: (target, targetConfig) => [ // returns [tr, opts] or [[tr1, opts1], [tr2, opts2], ...]
          this.bundles.components.hookTransformFactory('browserify', target),
          {
            global: true
          },
        ],
      },
      webpack: {
        configurator: 'bundle-webpack', // TODO: '@thin-hook/bundle-webpack'
        options: (target, targetConfig) => ({
          entry: path.resolve(target.entryBase, target.entry),
          output: {
            filename: target.output,
          },
          plugins: [
            new this.bundles.components.webpack.LoaderOptionsPlugin({
              options: {
                transforms: [
                  this.bundles.components.hookTransformFactory('webpack', target)
                ],
              },
            }),
          ],
          module: {
            loaders: [{
              test: /\.js$/,
              loader: 'transform-loader?0',
            }],
          },
        }),
      },
      rollup: {
        configurator: 'bundle-rollup', // TODO: '@thin-hook/bundle-rollup'
        inputOptions: (target, targetConfig) => ({
          input: path.resolve(target.entryBase, target.entry),
          treeshake: false,
          plugins: [
            this.bundles.components.rollupPluginBrowserifyTransform(
              this.bundles.components.hookTransformFactory('rollup', target, this.bundles.components.importMapperFactory, this.bundles.components.contextGeneratorHelper)
            ),
          ],
        }),
        outputOptions: (target, targetConfig) => ({
          file: path.resolve(target.outputBase, target.output),
          format: 'esm',
        }),
      },
    })
    .assign('policy')({
      // @ifdef arguments to include/exclude hook callback functions in hook-callback.js
      __hook__: true, // undefined to skip including plugins/policy/__hook__.js
      __hook__acl: true, // undefined to skip including plugins/policy/__hook__acl.js
      __hook__min: true, // undefined to skip including plugins/policy/__hook__min.js
      // @ifdef argument to include/exclude hookBenchmark() in hook-callback.js
      hookBenchmark: true, // undefined to exclude hookBenchmark()
      // postfix to the hook callback function name __hook__
      __hook__callback: 'acl', // '': __hook__, 'acl': __hook__acl, 'min': __hook__min
      // any custom parameters can be used for this.path.config/policy/policy.js and its dependencies as well
    })
    .assign('no-hook-authorization')({
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
        */
      },
    })
    .assign('mode')({
      enableDebugging: false,
      devtoolsDisabled: true,
    })
    .assign('commands')({ // dependent on this.path, this.server, this.certificates, and this.commands itself
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
      "dot": `dot -Tsvg ${this.trace.dot.path} -o ${this.trace.dot.svg}`,
    })
    .assign('@thin-hook/examples')({ // scoped plugins
      base: path.resolve(this.path.hook, 'examples'),
    })
    .assign('@thin-hook/module-examples')({
      [TargetConfig.needResolution]: true,
      importMapsPath: () => path.resolve(this['@thin-hook/examples'].base, 'examples.importmap'),
      baseURL: '/components/'
    })
    .assign('@thin-hook/module-examples-dependencies')({
      [TargetConfig.needResolution]: true,
      moduleDependenciesPath: () => path.resolve(this['@thin-hook/examples'].base, 'moduleDependencies.json'),
    })
  }
}

const targetConfig = new TargetConfig().setTracer();

module.exports = targetConfig;
