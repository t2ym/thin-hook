/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const Traceable = (base) => class TraceableConfigBase extends base {
  // this.assign('name')({ property: value, ... }).assign('name2')({ property: value, ... })...
  assign(name) {
    if (this.trace && this.trace.proxy) {
      this.trace.currentPlugin = { name: `init:${name}` };
    }
    return (properties) => {
      if (!this[name]) {
        this[name] = properties;
      }
      else {
        Object.assign(this[name], properties);
      }
      if (this.trace && this.trace.proxy) {
        this.trace.currentPlugin = null;
        if (name === 'trace') {
          this.setProxyHandlers();
        }
      }
      return this;
    };
  }
  init(gulpInst) {
    super.init(gulpInst);
    this.setFsTracer();
  }
  task(pluginName) {
    this.trace.currentPlugin = { name: pluginName };
    super.task(pluginName);
    this.trace.currentPlugin = null;
  }
  // delayed resolution of configurations 
  _resolveConfig() {
    for (let config in this) {
      if (this[config] && typeof this[config] === 'object' && this[config][this.constructor.needResolution]) {
        for (let key in this[config]) {
          if (typeof this[config][key] === 'function') {
            this.trace.currentPlugin = { name: `init_resolve:${config}${typeof key === 'string' && key.match(/^[a-zA-Z_][a-zA-Z0-9_-]*$/) ? '.' + key : '[' + key + ']'}` };
            this[config][key] = this[config][key].call(this);
            this.trace.currentPlugin = null;
          }
        }
      }
    }
  }
  setTracer() {
    const configHandler = {};
    const targetConfig = new Proxy(this, configHandler);
    this.trace = {
      proxy: {
        this: {
          target: this,
          handler: configHandler,
          proxy: targetConfig,
        },
      },
      currentPlugin: {
        name: 'init',
      },
      log: {}
    };
    return this.trace.proxy.this.proxy;
  }
  setProxyHandlers() {
    let targetConfig = this;
    let trace = this.trace;
    if (!(trace && trace.proxy)) {
      return;
    }
    let traceMap = new Map();
    let traceLog = trace.log;
    let aggregations = trace.aggregations;
    const isExcluded = (path) => {
      for (let excluded of trace.excludes) {
        if (path.startsWith(excluded)) {
          return true;
        }
      }
      return false;
    }
    const aggregate = (path) => {
      for (let aggregatePath of aggregations) {
        if (path.startsWith(aggregatePath)) {
          path = aggregatePath + '*';
          return path;
        }
      }
      return path;
    }
    Object.assign(trace.proxy.this.handler, {
      get: function(target, property, receiver) {
        if (property === Symbol.for('isProxy')) {
          return true;
        }
        if (((target === trace.proxy.this.target && ['trace', 'pre', 'post'].indexOf(property) < 0) || target !== trace.proxy.this.target) && target.hasOwnProperty(property)) {
          if (trace.currentPlugin) {
            let isProxy = false;
            let name = target === targetConfig || target === trace.proxy.this.proxy ? 'this' : traceMap.get(target);
            if (target === trace.proxy.this.proxy) {
              isProxy = true;
            }
            name = name.replace(new RegExp(`^.*${trace.thisReference.replace(/\./g, '[.]')}(.*)$`), 'this$1');
            if (trace.proxy[name]) {
              if (target === trace.proxy[name].proxy) {
                isProxy = true;
              }
            }
            if (target[Symbol.for('isProxy')]) {
              isProxy = true;
            }
            let propertyName = trace.propertyName(name, property);
            //console.log(`${proxy.currentPlugin.name} get ${propertyName}`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            if (!isExcluded(propertyName)) {
              traceLog[trace.currentPlugin.name].add(`${aggregate(propertyName)}`);
            }
            let _trace;
            let desc = Object.getOwnPropertyDescriptor(target, property);
            if (desc && desc.configurable && desc.writable) {
              let _target = (isProxy ? trace.proxy[name].target : target)[property];
              if (_target instanceof Object && !_target[Symbol.for('isProxy')]) {
                if (trace.proxy[propertyName]) {
                  if (trace.proxy[propertyName].target === _target) {
                    _trace = trace.proxy[propertyName].proxy;
                  }
                  else {
                    if (traceMap.has(_target)) {
                      _trace = _target;
                    }
                    else {
                      trace.proxy[propertyName].target = _target;
                      trace.proxy[propertyName].proxy = new Proxy(_target, trace.proxy.this.handler);
                      _trace = trace.proxy[propertyName].proxy;
                      traceMap.set(_target, propertyName);
                    }
                  }
                }
                else {
                  _trace = new Proxy(_target, trace.proxy.this.handler);
                  trace.proxy[propertyName] = {
                    target: _target,
                    handler: trace.proxy.this.handler,
                    proxy: _trace,
                  };
                  traceMap.set(_target, propertyName);
                }
                return _trace;
              }
            }
          }
        }
        return target[property];
      },
      set: function(target, property, value, receiver) {
        if (['proxy', 'pre', 'post'].indexOf(property) < 0) {
          if (trace.currentPlugin) {
            let name = target === targetConfig || target === trace.proxy.this.proxy ? 'this' : traceMap.get(target);
            let propertyName = trace.propertyName(name, property);
            if (!propertyName.endsWith(trace.thisReference)) {
              //console.log(`${trace.currentPlugin.name} set ${propertyName}`);
              traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
              if (!isExcluded(propertyName)) {
                traceLog[trace.currentPlugin.name].add(`${aggregate(propertyName)} set`);
              }
              if (value && typeof value === 'object') {
                let traceName = traceMap.get(target[property]);
                if (traceName && trace.proxy[traceName] && trace.proxy[traceName].proxy === value) {

                }
                else {
                  name = propertyName;
                  for (let _property in value) {
                    if (target[property] && value[_property] === target[property][_property]) {
                      continue;
                    }
                    propertyName = trace.propertyName(name, _property);
                    if (!isExcluded(propertyName)) {
                      traceLog[trace.currentPlugin.name].add(`${aggregate(propertyName)} set`);
                    }
                  }
                }
              }
            }
          }
        }
        return Reflect.set(...arguments);
      },
    });
    traceMap.set(trace.proxy.this.target, 'this');
    return this;
  }
  setFsTracer() {
    let trace = this.trace;
    if (!(trace && trace.proxy)) {
      return;
    }
    let traceLog = trace.log;
    const aggregate = (path) => {
      let base = this.path.base;
      for (let aggregatePath of trace.aggregations) {
        if (path.startsWith(aggregatePath)) {
          path = aggregatePath + '*';
          path = path.replace(new RegExp(base + '/', 'g'), '');
          return path;
        }
      }
      path = path.replace(new RegExp(base + '/', 'g'), '');
      return path;
    }
    for (let fs of [require('fs'), require('graceful-fs')]) {
      const { open, openSync, createReadStream, createWriteStream, readFile } = fs;
      Object.assign(fs, {
        open: function _open(path, flags, mode, callback) {
          if (trace.currentPlugin) {
            //console.log(`fs.open(${path}, ${flags}, ${mode})`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            if ((flags.indexOf('r') >= 0 && fs.existsSync(path)) || flags.indexOf('r') < 0) {
              traceLog[trace.currentPlugin.name].add(`${aggregate(path)} ${flags}`);
            }
          }
          return open.call(this, path, flags, mode, callback);
        },
        openSync: function _openSync(path, flags, mode) {
          if (trace.currentPlugin) {
            //console.log(`fs.openSync(${path}, ${flags}, ${mode})`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            if ((flags.indexOf('r') >= 0 && fs.existsSync(path)) || flags.indexOf('r') < 0) {
              traceLog[trace.currentPlugin.name].add(`${aggregate(path)} ${flags}`);
            }
          }
          return openSync.call(this, path, flags, mode);
        },
        readFile: function _readFile (path, options, cb) {
          if (trace.currentPlugin) {
            //console.log(`fs.readFile(${path}, ${options})`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            if (fs.existsSync(path)) {
              traceLog[trace.currentPlugin.name].add(`${aggregate(path)} r`);
            }
          }
          return readFile.call(this, path, options, cb);
        },
        createReadStream: function _createReadString(path, options) {
          if (trace.currentPlugin) {
            //console.log(`fs.createReadStream(${path}, ${options})`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            if (fs.existsSync(path)) {
              traceLog[trace.currentPlugin.name].add(`${aggregate(path)} r`);
            }
          }
          return createReadStream.call(this, path, options);
        },
        createWriteStream: function _createWriteString(path, options) {
          if (trace.currentPlugin) {
            //console.log(`fs.createWriteStream(${path}, ${options})`);
            traceLog[trace.currentPlugin.name] = traceLog[trace.currentPlugin.name] || new Set();
            traceLog[trace.currentPlugin.name].add(`${aggregate(path)} w`);
          }
          return createWriteStream.call(this, path, options);
        },
      });
    }
  }
  pre(plugin) {
    super.pre(plugin);
    if (this.trace && this.trace.proxy) {
      this.trace.currentPlugin = plugin;
    }
  }
  post(plugin) {
    super.post(plugin);
    if (!(this.trace && this.trace.proxy)) {
      return;
    }
    let traceLog = this.trace.log[plugin.name];
    if (!traceLog) {
      this.trace.log[plugin.name] = traceLog = new Set();
    }
    let logList = [...traceLog];
    let toBeDeleted = new Set();    
    for (let log of logList) {
      let key = log;
      let postfix = '';
      if (log.endsWith(' set')) {
        postfix = ' set';
        key = log.substring(0, log.length - postfix.length);
      }
      for (let _log of traceLog) {
        if (_log.startsWith(key)) {
          let _key = _log;
          let _postfix = '';
          if (_log.endsWith(' set')) {
            _postfix = ' set';
            _key = _log.substring(0, _log.length - postfix.length);
          }
          if (postfix === ' set' && _postfix === '' && _key === key) {
            toBeDeleted.add(_log);
            continue;
          }
          if (postfix === ' set' && _postfix === ' set' && _key !== key) {
            toBeDeleted.add(log);
            continue;
          }
          if (postfix === '' && _log !== log) {
            toBeDeleted.add(log);
            continue;
          }
        }
      }
    }
    for (let log of toBeDeleted) {
      traceLog.delete(log);
    }
    this.trace.currentPlugin = null;
    let base = this.path.base;
    logList = [...traceLog].map(log => log
      .replace(new RegExp(base + '/', 'g'), '')
      .replace(new RegExp(`^.*${this.trace.thisReference.replace(/\./g, '[.]')}`), 'this'))
      .filter(log => log !== 'this' && log !== 'this set')
      .sort();
    //console.log(`${plugin.name}: logList ${JSON.stringify(logList, null, 2)}`);
    traceLog.clear();
    for (let log of logList) {
      traceLog.add(log);
    }
  }
}

module.exports = {
  Traceable,
}