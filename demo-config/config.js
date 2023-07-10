/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const { GulpDefaultRegistry, Configurable } = require('target-configurator');
const { Traceable } = require('./Tracer.js');
const { Injectable } = require('./PluginInjector.js');

class TargetConfig extends Injectable(Traceable(Configurable(GulpDefaultRegistry, 'thin-hook'))) {
  static basePath = module.parent.path; // module.parent is gulpfile.js in the base directory
  static configPath = module.path; // Overriding configPath is safe and robust
  // configure itself step by step
  _configure() {
    super._configure();
    this.assign('path')({
      raw: 'demo-raw', // optional; copied to root after removing root in 'clean-root' command
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
    .assign('integrityService')({
      whitelist: path.resolve(this.path.base, this.path.backend, 'whitelist.json'),
      blacklist: path.resolve(this.path.base, this.path.backend, 'blacklist.json'),
      additionalWhitelist: {},
      additionalBlacklist: {},
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
    .assign('empty-document')({
      [TargetConfig.needResolution]: true,
      type: 'emptyDocument',
      targetTypes: {
        bootstrap: {
          attributes: [],
          searchParams: [],
        },
      },
      sourceFile: 'empty-document.html',
      // this['bootstrap-js'].emptyDocument needs this value resolved in this early stage
      dest: () => path.resolve(this.path.base, this.path.root, this['empty-document'].sourceFile),
      dependencies: [],
    })
    .assign('hook-min-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin, false, true),
        integrity: (plugin, targetPlugin, targetConfig) => {
          let script = fs.readFileSync(this[plugin].dest, 'utf-8');
          let integrity = this.getIntegrity(plugin);
          const url = new URL(this.getPluginUrl(plugin, 'entry-page', false, true), 'https://localhost/');
          const params = url.searchParams;
          const getParam = (params, name, _default) => params.has(name) ? params.get(name) : _default;
          let mutatedScript = script.replace(
            /('{"hookNameForServiceWorker":")(__hook__)(","contextGeneratorName":")(method)(","discardHookErrors":)(true)(,"hookProperty":)(true)(,"hookGlobal":)(true)(,"hookPrefix":")(_p_)(","compact":)(false)(,"noHookAuthorizationPreValidated":\[\],"contextGeneratorScripts":\[\]}')/,
            '$1' + getParam(params, 'hook-name', '__hook__') +
            '$3' + getParam(params, 'context-generator-name', 'method') +
            '$5' + getParam(params, 'discard-hook-errors', 'true') +
            '$7' + getParam(params, 'hook-property', 'true') +
            '$9' + getParam(params, 'hook-global', 'true') +
            '$11' + getParam(params, 'hook-prefix', '_p_') +
            '$13' + getParam(params, 'compact', 'false') +
            '$15');
          integrity += ' ' + 'sha256-' + this.inject.components.createHash('sha256').update(mutatedScript).digest('base64');
          return integrity;
        },
      },
      searchParams: {
        'version': 668,
        'no-hook-authorization': (plugin, targetType, targetConfig) => {
          // plugin === null : returns the list of dependent plugins for targetType
          // plugin !== null : returns the parameter value for targetType
          let logNoHookAuthorization = ',log-no-hook-authorization';
          let value;
          switch (targetType) {
          case 'entryPage':
            value = plugin
              ? `${this['no-hook-authorization'].hash[this['no-hook-authorization'].dest]}` +
                `,${this['no-hook-authorization'].hash['/components/thin-hook/demo/ inline cors']}` +
                `${logNoHookAuthorization}`
              : [ 'no-hook-authorization' ];
            break;
          case 'emptyDocument':
          case 'iframe':
            value = plugin
              ? `${this['no-hook-authorization'].hash[this['no-hook-authorization'].dest]}` +
                `${logNoHookAuthorization}`
              : [ 'no-hook-authorization' ];
            break;
          case 'bootstrap':
            value = plugin ? '' : [];
            break;
          default:
            throw new Error(`this.hook-min-js.searchParams.no-hook-authorization: invalid targetType ${targetType} for target ${plugin}`);
          }
          return value;
        },
        'sw-root': '/',
        'no-hook': true,
        'hook-name': '__hook__',
        'context-generator-name': 'method',
        'discard-hook-errors': false,
        'fallback-page': 'index-fb.html',
        'hook-property': true,
        'hook-global': true,
        'hook-prefix': '_uNpREdiC4aB1e_',
        'compact': true,
        'service-worker-ready': (plugin, targetType, targetConfig) => {
          switch (targetType) {
          case 'entryPage':
            return plugin ? true : [];
          default:
            throw new Error(`this.hook-min-js.searchParams.service-worker-ready: invalid targetType ${targetType} for target ${plugin}`);
          }
        },
      },
      targetTypes: {
        entryPage: {
          attributes: [
            'integrity', 'src'
          ],
          searchParams: [
            'version', 'no-hook-authorization', 'sw-root', 'no-hook', 'hook-name', 'context-generator-name', 'discard-hook-errors', 'fallback-page',
            'hook-property', 'hook-global', 'hook-prefix', 'compact', 'service-worker-ready',
          ],
        },
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [
            'no-hook', 'hook-name', 'context-generator-name', 'discard-hook-errors', 'fallback-page',
            'hook-property', 'hook-global', 'hook-prefix', 'compact', 'no-hook-authorization',
          ],
        },
        iframe: {
          attributes: [ 'src' ],
          searchParams: [
            'no-hook', 'no-hook-authorization',
          ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [
            'no-hook', 'hook-name', 'context-generator-name', 'discard-hook-errors', 'fallback-page',
            'hook-property', 'hook-global', 'hook-prefix', 'compact', 'no-hook-authorization',
          ],
        },
        hookWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorkerModule: {
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
        '*': {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.hook, 'hook.min.js'),
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
      },
      hints: [ // optional hints to sort the entries
        "hook.min.js",
        "demo/disable-devtools.js",
        "demo/context-generator.js",
        "demo/bootstrap.js",
        "demo/hook-callback.js",
        "demo/hook-native-api.js",
        "demo/hook-worker.js",
        "demo/cache-bundle.js",
        "demo/browserify-commonjs.js",
        "demo/webpack-es6-module.js",
        "demo/webpack-commonjs.js",
        "demo/rollup-es6-module.js",
        "demo/rollup-module1.js",
        "demo/wrap-globals.js",
        "/components/thin-hook/demo/ inline cors",
        "/components/thin-hook/demo/ inline hooked eval results",
        "https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js",
        "(function write2() { console.log(\"no-hook script tag via document.write\"); })()",
        "(function write4() { console.log(\"no-hook script tag in div tag via document.write\"); })()",
        "(function writeln2() { console.log(\"no-hook script tag via document.writeln\"); })()",
        "(function writeln4() { console.log(\"no-hook script tag in div tag via document.writeln\"); })()",
        "location = \"about:blank\";",
        "demo/integrity.js",
        "demo/script-hashes.js",
        "demo/content-loader.js",
        "demo/mark-parsed.js",   
      ],
      passcode: 'XX02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a',
      sourceMap: `[\n` +
        `    url => location.origin === url.origin && url.pathname.match(/^${(this.url.root + '/').replace(/\//g, '\\/')}/)\n` +
        `  ]`,
      type: 'noHookAuthorization',
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
        emptyDocument: {
          attributes: [ 'context-generator', 'src' ],
          searchParams: [ 'no-hook' ],
        },
        iframe: {
          attributes: [ 'context-generator', 'src' ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorkerModule: {
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'no-hook-authorization.js'),
      dependencies: [
        'hook-min-js',
        'disable-devtools',
        'context-generator-js',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
        'hook-worker-js',
        'cache-bundle-js',
        'bundles',
        'wrap-globals-js',
        'url-parameters',
        'about-blank-redirector',
        'integrity-js',
        'script-hashes-js',
        'content-loader-js',
        'mark-parsed-js',
      ],
    })
    .assign('integrity-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'integrity.js'),
      dependencies: [
        'keys',
      ],
    })
    .assign('disable-devtools')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'disable-devtools.js'),
    })
    .assign('context-generator-js')({
      defineCustomContextGenerator: true,
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
        emptyDocument: {
          attributes: [ 'context-generator', 'src' ],
          searchParams: [ 'no-hook' ],
        },
        iframe: {
          attributes: [ 'context-generator', 'src' ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [ 'no-hook' ],
        },
        hookWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'context-generator.js'),
    })
    .assign('bootstrap-js')({
      [TargetConfig.needResolution]: true,
      type: 'bootstrap',
      basePath: () => this.url.root + (this.url.root.endsWith('/') ? '' : '/'),
      emptyDocument: () => this.getPluginUrl('empty-document', 'bootstrap-js', true /* startsWithDot */),
      markParsed: () => this.getPluginUrl('mark-parsed-js', 'bootstrap-js'),
      //onloadWrapper: `event.target.addEventListener('srcdoc-load', () => { $onload$ })`,
      virtualBlobComments: '//', // '' to eliminate prepending comments for virtual blob parameters
      //virtualBlobUrlTargetType: `new Map([['text/html', 'file.html'],['text/javascript', 'file.js'],['image/svg+xml', 'file.svg']])`,
      //virtualBlobBaseUrl: `new URL('blob/', baseURI).href`,
      hangUpOnEmbedAndObjectElement: false,
      /*
      emptySvg: 'hook.parameters.hangUpOnEmbedAndObjectElement\n' +
        '    ? `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script><![CDATA[ location = "about:blank"; ]]></script></svg>`\n' +
        '    : `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script><![CDATA[ location = new URL("$location$?referrer=hook.parameters.emptySvg", location.ancestorOrigins ? location.ancestorOrigins[0] : "$origin$").href; ]]></script></svg>`',
      */
      omitSuperfluousClosingHtmlTags: false,
      importMapsJson: true,
      //additionalParameters: true, // load additional parameters from demo-config/bootstrap-js/parameters.js
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
        emptyDocument: {
          attributes: [ 'context-generator', 'src' ],
          searchParams: [ 'no-hook' ],
        },
        iframe: {
          attributes: [ 'context-generator', 'src\'' /* trailing \' for meaningless single quote option just for byte-level compatibility in attribute values of injected HTML */ ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [ 'no-hook' ],
        },
        hookWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorkerModule: {
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'bootstrap.js'),
    })
    .assign('url-parameters')({
      [TargetConfig.needResolution]: true,
      inline: true, // comment out this line to disable inline script injection
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: () => this['url-parameters'].inline
        ? {
            entryPage: {
              attributes: [ 'context-generator', 'no-hook', 'integrity' ],
              searchParams: [],
            }
          }
        : {
            entryPage: {
              attributes: [ 'context-generator', 'src', 'integrity' ],
              searchParams: [ 'no-hook' ],
            }
          },
      dest: path.resolve(this.path.base, this.path.root, 'url-parameters.js'),
    })
    .assign('cache-bundle-js')({
      enableCacheBundle: true,
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
        'authorization':  (plugin, targetType, targetConfig) => {
          switch (targetType) {
          case 'entryPage':
            return plugin ? this['automation-secret'].authorization : [ 'automation-secret' ];
          default:
            throw new Error(`this.cache-bundle-js.searchParams.authorization: invalid targetType ${targetType} for target ${plugin}`);
          }
        },
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [
            'no-hook', 'authorization',
          ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'cache-bundle.js'),
    })
    .assign('cache-bundle-automation')({
      dependencies: [
        'clean-gzip-json',
        'dummy-integrity',
        'cache-bundle-automation-json',
      ],
    })
    .assign('content-loader-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'content-loader.js'),
    })
    .assign('import-maps')({
      [TargetConfig.needResolution]: true,
      importMapName: 'modules.importmap',
      privateImportMapName: 'modules-private.importmap',
      auxiliaryImportMap: {
        imports: {
          foo: "./bar.js", // dummy
          "module-on-cdn": "https://cdn.domain.com/path/cdn-module/index.js" // dummy
        },
      },
      targetTypes: {
        bootstrap: {
          attributes: [],
          searchParams: [],
        },
      },
      additionalGetImportMapParameters: {
        packagesManualOverrides: {},
        packagesExportsPreference: [ "import", "default" ],
      },
      dest: () => path.resolve(this.path.base, this.path.root, this['import-maps'].importMapName),
      series: [ // equivalent to gulp.task('import-maps', gulp.series('frontend-modules-locked', 'generate-import-maps'))
        'frontend-modules-locked',
        'generate-import-maps',    
      ],
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
      dependencies: [
        'import-maps',
      ],
      series: [
        'bundler-helpers',
        'bundle-browserify',
        'bundle-webpack',
        'bundle-rollup',
      ],
    })
    .assign('policy')({
      [TargetConfig.needResolution]: true,
      // @ifdef arguments to include/exclude hook callback functions in hook-callback.js
      __hook__: true, // undefined to skip including plugins/policy/__hook__.js
      __hook__acl: true, // undefined to skip including plugins/policy/__hook__acl.js
      __hook__min: true, // undefined to skip including plugins/policy/__hook__min.js
      // @ifdef argument to include/exclude hookBenchmark() in hook-callback.js
      hookBenchmark: true, // undefined to exclude hookBenchmark()
      // @ifdef argument to unchain ACL policy objects if they are chained directly to Object.prototype
      //unchainAcl: true, // uncomment this argument to enable vulnerability fix for #398 and #399
      // postfix to the hook callback function name __hook__
      __hook__callback: 'acl', // '': __hook__, 'acl': __hook__acl, 'min': __hook__min
      // TODO: modify plugin/policy/hook-callback.js to use hook.parameters.emptyDocumentUrl
      emptyDocument: () => {
        let url = path.relative(
          this.mapper(this.url.mappings, path.resolve(this.path.base, this.path.root)),
          this.mapper(this.url.mappings, this['empty-document'].dest)
        );
        if (!url.startsWith('.')) {
          url = './' + url;
        }
        return url;
      },
      // any custom parameters can be used for this.path.config/policy/policy.js and its dependencies as well
      // injection parameters
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'src', 'integrity' ],
          searchParams: [ 'no-hook' ],
        },
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
        iframe: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorkerModule: {
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'hook-callback.js'),
      dependencies: [
        'bundles',
      ],
    })
    .assign('hook-native-api-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
        iframe: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [ 'xlink:href' ],
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorker: {
          searchParams: [ 'no-hook' ],
        },
        dedicatedWorkerModule: {
          searchParams: [ 'no-hook' ],
        },
        sharedWorker: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'hook-native-api.js'),
    })
    .assign('script-hashes-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
        integrity: (plugin, targetPlugin, targetConfig) => this.getIntegrity(plugin),
      },
      searchParams: {
        'no-hook': true,
        'service-worker-ready': (target, targetType, targetConfig) => {
          switch (targetType) {
          case 'entryPage':
            return target ? false : [];
          case 'emptyDocument':
          case 'iframe':
          case 'hookWorker':
            return target ? true : []
          default:
            throw new Error(`this.script-hashes-js.searchParams.service-worker-ready: invalid targetType ${targetType} for target ${target}`);
          }
        },
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'context-generator', 'src', 'integrity' ],
          searchParams: [ 'no-hook', 'service-worker-ready' ],
        },
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook', 'service-worker-ready' ],
        },
        iframe: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook', 'service-worker-ready' ],
        },
        hookWorker: {
          searchParams: [ 'no-hook', 'service-worker-ready' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'script-hashes.js'),
    })
    .assign('script-hashes')({
      dependencies: [
        'cache-bundle-automation',
      ],
    })
    .assign('script-hashes-integrity')({
      dependencies: [
        'script-hashes',
      ],
    })
    .assign('update-html-hash')({
      dependencies: [
        'script-hashes-integrity',
      ],
    })
    .assign('integrity-json')({
      dependencies: [
        'get-version',
        'script-hashes',
      ],
    })
    .assign('gzip-json')({
      dependencies: [
        'integrity-json',
      ],
    })
    .assign('wrap-globals-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'wrap-globals.js'),
    })
    .assign('content-loader-js')({
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        emptyDocument: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'content-loader.js'),
    })
    .assign('mark-parsed-js')({
      attributes: {
        src: (plugin, targetPlugin, targetConfig) => this.getPluginUrl(plugin, targetPlugin),
      },
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        entryPage: {
          attributes: [ 'src' ],
          searchParams: [ 'no-hook' ],
        },
        bootstrap: {
          attributes: [],
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'mark-parsed.js'),
    })
    .assign('hook-worker-js')({
      type: 'hookWorker',
      //customHookWorkerHandler: true, // edit demo-config/hook-worker-js/hookWorkerHandler.js to customize
      searchParams: {
        'no-hook': true,
      },
      targetTypes: {
        noHookAuthorization: {
          searchParams: [ 'no-hook' ],
        },
      },
      dest: path.resolve(this.path.base, this.path.root, 'hook-worker.js'),
    })
    .assign('web-worker-js')({ // defining an injection target, not a plugin
      type: 'dedicatedWorker',
      dest: path.resolve(this.path.base, this.path.root, 'web-worker.js'),
    })
    .assign('web-worker-module-js')({ // defining an injection target, not a plugin
      type: 'dedicatedWorkerModule',
      dest: path.resolve(this.path.base, this.path.root, 'web-worker-module.js'),
    })
    .assign('shared-worker-js')({ // defining an injection target, not a plugin
      type: 'sharedWorker',
      dest: path.resolve(this.path.base, this.path.root, 'shared-worker.js'),
    })
    .assign('sub-document')({ // defining an injection target, not a plugin
      type: 'iframe',
      dest: path.resolve(this.path.base, this.path.root, 'sub-document.html'),
    })
    .assign('sub-sub-document')({ // defining an injection target, not a plugin
      type: 'iframe',
      dest: path.resolve(this.path.base, this.path.root, 'sub-sub-document.html'),
    })
    .assign('entry-page')({
      type: 'entryPage',
      dest: path.resolve(this.path.base, this.path.root, 'original-index.html'),
    })
    .assign('frontend-components')({
      dependencies: [
        'clean-frontend',
      ],
    })
    .assign('gzip-frontend')({
      dependencies: [
        'frontend-components',
      ],
    })
    .assign('inject')({
      currentPhase: null,
      phases: {
        // phases in the order of their processing
        clean: [
          'clean-root',
        ],
        backend: [
          'integrity-service-helpers',
          'validation-console',
          'generate-cert-sh',
          'certificates',
          '@thin-hook/demo-gulpfile-js',
        ],
        plugin: [
          'entry-page',
          'empty-document',
          'sub-document',
          'sub-sub-document',
          'bootstrap-js',
          'hook-worker-js',
          'web-worker-js',
          'web-worker-module-js',
          'shared-worker-js',
          'no-hook-authorization',
        ],
        cache: [
          'clean-gzip-json',
          'dummy-integrity',
          'cache-bundle-automation-json',
          'cache-bundle-automation',
          'script-hashes',
          'script-hashes-integrity',
          'update-html-hash',
          'integrity-json',
          'gzip-json',
        ],
        frontend: [
          'clean-frontend',
          'frontend-components',
          'gzip-frontend'
        ],
      },
      injectors: {
        html: targetPlugin => done => {
          let sourceDirname;
          try {
            sourceDirname = path.dirname(this.resolveConfiguratorPath(targetPlugin));
          }
          catch (e) {}
          const source = sourceDirname && this[targetPlugin].sourceFile
            ? path.resolve(sourceDirname, this[targetPlugin].sourceFile)
            : this[targetPlugin].dest;
          const dest = this[targetPlugin].dest;
          const type = this[targetPlugin].type;
          let injector = new this.inject.components.Injector(source);
          let prevPluginSelector;
          for (let plugin of this.inject[type]) {
            let scriptElement = this.getPluginScriptElement(plugin, targetPlugin);
            let selectors, actions, scripts;
            switch (plugin) {
            case 'hook-min-js':
              selectors = ['html head script[src*="hook.min.js"]', 'html head meta[charset]', 'html head'];
              actions = [ 'replace', 'insertAfter', 'prependChild' ];
              scripts = [ scriptElement, scriptElement, scriptElement ];
              break;
            case 'script-hashes-js':
              selectors = [
                this[plugin].inline
                  ? `${prevPluginSelector} + script[no-hook=""]`
                  : `html head script[src*="${path.basename(this[plugin].dest)}"]`,
                prevPluginSelector,
              ];
              actions = [ 'replace', 'insertAfter' ];
              scripts = [ scriptElement, scriptElement + (type === 'entryPage' ? '<!-- end of mandatory no-hook scripts -->' : '') ];
              break;
            default:
              selectors = [
                this[plugin].inline
                  ? `${prevPluginSelector} + script[no-hook=""]`
                  : `html head script[src*="${path.basename(this[plugin].dest)}"]`,
                prevPluginSelector,
              ];
              actions = [ 'replace', 'insertAfter' ];
              scripts = [ scriptElement, scriptElement ];
              break;
            case 'wrap-globals-js':
              selectors = [
                `html head script[src*="${path.basename(this[plugin].dest)}"]`,
                `html head script + link[type="text/css"]`, // Note: needs to be customized
                `html head`,
              ];
              actions = [ 'replace', 'insertAfter', 'appendChild' ];
              scripts = [ scriptElement, scriptElement, scriptElement ];
              break;
            case 'mark-parsed-js':
              selectors = [
                `html body script[src*="${path.basename(this[plugin].dest)}"]`,
                `html body`,
              ];
              actions = [ 'replace', 'appendChild' ];
              scripts = [ scriptElement, scriptElement ];
              break;
            }
            try {
              injector.parse().select(...selectors).validate(...actions).inject(...scripts);
            }
            catch (e) {
              injector.dest(output => console.error(`injected: selectors=${selectors}\nactions=${actions}\nscriptElement=${scriptElement}\noutput=${output}`));
              throw e;
            }
            prevPluginSelector = selectors[0];
          }
          injector.dest(dest);
          done();
        },
        js: targetPlugin => done => {
          let sourceDirname;
          try {
            sourceDirname = path.dirname(this.resolveConfiguratorPath(targetPlugin));
          }
          catch (e) {}
          const source = sourceDirname && this[targetPlugin].sourceFile
            ? path.resolve(sourceDirname, this[targetPlugin].sourceFile)
            : this[targetPlugin].dest;
          const dest = this[targetPlugin].dest;
          const type = this[targetPlugin].type;
          let injector = new this.inject.components.Injector(source);
          switch (type) {
          case 'dedicatedWorker':
          case 'sharedWorker':
            {
              let selectors, actions, scripts, importStatement;
              importStatement = `importScripts(${this.inject[type].map(plugin => `'${this.getPluginUrl(plugin, targetPlugin)}'`).join(', ')})`;
              selectors = [
                '[type="CallExpression"][callee.name="importScripts"][arguments.0.value=/hook[.]min[.]js/]',
                '[type="Program"] [type="ExpressionStatement"][directive="use strict"]',
                '[type="Program"]',
              ];
              actions = [ 'replace', 'insertAfter', 'insertBefore' ];
              scripts = [ `${importStatement}`, `\n${importStatement}`, `${importStatement};\n` ];
              try {
                injector.parse().select(...selectors).validate(...actions).inject(...scripts);
              }
              catch (e) {
                injector.dest(output => console.error(`injected: selectors=${selectors}\nactions=${actions}\nscript=${importStatement}\noutput=${output}`));
                throw e;
              }
            }
            break;
          case 'dedicatedWorkerModule':
          case 'sharedWorkerModule':
            {
              let prevPluginSelector;
              for (let plugin of this.inject[type]) {
                let importStatement = `import '${this.getPluginUrl(plugin, targetPlugin, true)}';`;
                let selectors, actions, scripts;
                switch (plugin) {
                case 'hook-min-js':
                  selectors = [
                    `ImportDeclaration[source.value=/${path.basename(this[plugin].dest).replace(/[.]/g, '[.]')}/]`,
                    `Program`,
                  ]
                  actions = [ 'replace', 'insertBefore' ];
                  scripts = [ importStatement, `${importStatement}\n` ];
                  break;
                default:
                  selectors = [
                    `ImportDeclaration[source.value=/${path.basename(this[plugin].dest).replace(/[.]/g, '[.]')}/]`,
                    prevPluginSelector,
                  ]
                  actions = [ 'replace', 'insertAfter' ];
                  scripts = [ importStatement, `\n${importStatement}` ];
                  break;
                }
                try {
                  injector.parse().select(...selectors).validate(...actions).inject(...scripts);
                }
                catch (e) {
                  injector.dest(output => console.error(`injected: selectors=${selectors}\nactions=${actions}\nscript=${importStatement}\noutput=${output}`));
                  throw e;
                }
                prevPluginSelector = selectors[0];
              }    
            }
            break;
          default:
            throw new Error(`this.inject.injectors.js: invalid target type ${targetType}`);
          }
          injector.dest(dest);
          done();
        },
      },
      entryPage: [
        'hook-min-js',
        'no-hook-authorization',
        'integrity-js',
        'disable-devtools',
        'context-generator-js',
        'bootstrap-js',
        'url-parameters',
        'cache-bundle-js',
        'policy',
        'script-hashes-js',
        'wrap-globals-js',
        'mark-parsed-js',
      ],
      emptyDocument: [
        'hook-min-js',
        'no-hook-authorization',
        'context-generator-js',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
        'script-hashes-js',
        'content-loader-js',
      ],
      iframe: [
        'hook-min-js',
        'no-hook-authorization',
        'context-generator-js',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
        'script-hashes-js',
      ],
      bootstrap: [
        'hook-min-js',
        'no-hook-authorization',
        'context-generator-js',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
      ],
      hookWorker: [
        'hook-min-js',
        'context-generator-js',
        'bootstrap-js',
        'script-hashes-js',
      ],
      dedicatedWorker: [
        'hook-min-js',
        'no-hook-authorization',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
      ],
      dedicatedWorkerModule: [
        'hook-min-js',
        'no-hook-authorization',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
      ],
      sharedWorker: [
        'hook-min-js',
        'no-hook-authorization',
        'disable-devtools',
        'bootstrap-js',
        'policy',
        'hook-native-api-js',
      ],
      noHookAuthorization: [
        'hook-worker-js',
      ],
    })
    .assign('mode')({
      enableDebugging: false,
      devtoolsDisabled: true,
    })
    .assign('commands')({ // these commands are registered as gulp.task('command', shell.task(this.commands[command])) in inject plugin initialization unless already registered with the name
      [TargetConfig.needResolution]: true,
      "http": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
        ${this.getConcurrentlyArguments(this.commands, 'httpServer', 'errorReportService', 'validationService')}`,
      "debug": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
        ${this.getConcurrentlyArguments(this.commands, 'debugServer', 'errorReportService', 'validationService')}`,
      "https": () => `concurrently -k -s all -c cyan,magentaBright,yellowBright \\
        ${this.getConcurrentlyArguments(this.commands, 'httpsServer', 'errorReportService', 'validationService')}`,
      "cache-bundle-automation": () => `concurrently -k --kill-others-on-fail -s first -c cyan,magentaBright,yellowBright \\
        ${this.getConcurrentlyArguments(this.commands, 'buildServer', 'cacheBundleUploadService', 'cacheBundleGeneration')}`,
      "update-html-hash": () => `concurrently -k --kill-others-on-fail -s first -c cyan,magentaBright,yellowBright \\
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
      "clean-root": this.path.raw && this.path.raw !== this.path.root // Note: no consideration on Windows environments; WSL2 or VM is preferable
        ? `rm -rf ${path.resolve(this.path.base, this.path.root)} && cp -rv ${path.resolve(this.path.base, this.path.raw)} ${path.resolve(this.path.base, this.path.root)}`
        : `echo do nothing as this.path.raw is not specified`,
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

const targetConfig = ((config) => process.argv.indexOf('--tracer') >= 0 ? config.setTracer() : config)(new TargetConfig());

module.exports = targetConfig;
