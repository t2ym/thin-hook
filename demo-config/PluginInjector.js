/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const metadata = require('undertaker/lib/helpers/metadata');

const Injectable = (base) => class InjectableConfigBase extends base {
  init(gulpInst) {
    super.init(gulpInst);
    this.patchGulp(gulpInst);
  }
  patchGulp(gulpInst) {
    if (!gulpInst.task.__patched__) {
      const originalTask = gulpInst.task;
      const targetConfig = this;
      gulpInst.task = function task(name, fn) {
        if (targetConfig._in_TargetConfig_task || !fn) {
          return originalTask.call(this, name, fn);
        }
        else {
          const pluginName = name;
          let dependencies = this[name] && this[name].dependencies ? this[name].dependencies : [];
          let plugin = {
            name,
            dependencies,
            configurator: function (targetConfig) { return fn; },
          };
          return originalTask.call(this, pluginName,
            targetConfig.gulp.series(
              Object.assign((done) => {
                let result = targetConfig.pre(plugin);
                if (result instanceof Promise) {
                  result.then(() => done(), (err) => done(err));
                }
                else {
                  done();
                }
              }, { displayName: `${pluginName} check dependencies` }),
              Object.assign((fn => metadata.has(fn) ? fn : fn.bind(targetConfig))(plugin.configurator.call(targetConfig, targetConfig)),
                { displayName: `${pluginName} raw task` }),
              Object.assign((done) => {
                let result = targetConfig.post(plugin);
                if (result instanceof Promise) {
                  result.then(() => done(), (err) => done(err));
                }
                else {
                  done();
                }
              }, { displayName: `${pluginName} done` }),
            )
          );
        
        }
      };
      gulpInst.task.__patched__ = true;
    }
  }
  resolveConfiguratorPath(pluginName) {
    const configuratorPath = super.resolveConfiguratorPath(pluginName);
    let plugin = require(configuratorPath);
    if (!this[pluginName]) {
      this[pluginName] = {};
    }
    if (!this[pluginName].dependencies) {
      this[pluginName].dependencies = [];
    }
    if (plugin.dependencies) {
      for (let dependency of plugin.dependencies) {
        if (this[pluginName].dependencies.indexOf(dependency) < 0) {
          this[pluginName].dependencies.push(dependency);
        }
      }
    }
    return configuratorPath;
  }
  task(pluginName) {
    let result;
    this._in_TargetConfig_task = true;
    result = super.task(pluginName);
    this._in_TargetConfig_task = false;
    return result;
  }
  getSearchParams(plugin, type) {
    let params = this[plugin].targetTypes[type].searchParams.map(param => {
      return `${param}=${typeof this[plugin].searchParams[param] === 'function' ? this[plugin].searchParams[param](plugin, type, this) : this[plugin].searchParams[param]}`
    }).join('&');
    if (params.length > 0) {
      params = '?' + params;
    }
    return params;
  }
  getPluginUrl(plugin, targetPlugin, startsWithDot, includeComponentPath) {
    let type = this[targetPlugin].type;
    let url = path.relative(
      path.dirname(this.mapper(this.url.mappings, this[targetPlugin].dest)),
      this.mapper(this.url.mappings, this[plugin].dest)
    );
    if (includeComponentPath && path.dirname(url).split('/').filter(p => p !== '.' && p !== '..').length === 0) {
      url = path.join(path.relative(this.url.root, this.url.components), path.relative(this.url.components, this.mapper(this.url.mappings, this[plugin].dest)))
    }
    if (startsWithDot && !url.startsWith('.')) {
      url = './' + url;
    }
    url += this.getSearchParams(plugin, type);
    return url;
  }
  getIntegrity(plugin) {
    return 'sha256-' +
      this.inject.components.createHash('sha256')
        .update(this[plugin].inline ? this[plugin].inlineScript : fs.readFileSync(this[plugin].dest, 'utf-8'))
        .digest('base64')
  }
  getPluginScriptElement(plugin, targetPlugin) {
    let type = this[targetPlugin].type;
    let attributes = [];
    for (let attr of this[plugin].targetTypes[type].attributes || []) {
      let quote = attr.endsWith('\'') ? '\'' : '"';
      attr = attr.replace(/\'$/, '');
      let attributeValues = (this[plugin].attributes || {});
      switch (typeof attributeValues[attr]) {
      case 'function':
        attributes.push(`${attr}=${quote}${attributeValues[attr](plugin, targetPlugin, this)}${quote}`);
        break;
      case 'undefined':
        attributes.push(attr);
        break;
      case 'string':
      default:
        attributes.push(`${attr}=${quote}${attributeValues[attr]}${quote}`);
        break;
      }
    }
    return `<script${attributes.length > 0 ? ' ' : ''}${attributes.join(' ')}>${this[plugin].inline ? this[plugin].inlineScript : ''}</script>`;
  }
}

module.exports = {
  Injectable,
}