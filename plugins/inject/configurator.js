/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const shell = require('gulp-shell');
const stringify = require('json-stringify-safe');

const pluginName = 'inject';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;

  for (let command in this.commands || {}) {
    if (!this._tasks[command]) {
      console.log(`registering shell task ${command} for ${this.commands[command]}`);
      this.gulp.task(command,
        this.gulp.series(
          Object.assign(shell.task(this.commands[command]), { displayName: `shell task ${command}`}),
          Object.assign((done) => { if (!this[command]) { this[command] = {}; } this[command].done = true; done(); }, { displayName: `${command} done` })
        )
      );
    }
  }

  for (let plugin in this) {
    if (this[plugin] && typeof this[plugin] === 'object' && Array.isArray(this[plugin].series)) {
      console.log(`registering task ${plugin} with series(${this[plugin].series})`);
      this.gulp.task(plugin,
        this.gulp.series(
          ...this[plugin].series,
          Object.assign((done) => { this[plugin].done = true; done(); }, { displayName: `${plugin} done` })
        )
      );
    }
  }

  this.gulp.task('inject dependencies', function (done) {
    let currentPhase = this[pluginName].currentPhase;
    if (!(currentPhase && Array.isArray(this[pluginName].phases[currentPhase]))) {
      throw new Error(`current phase ${currentPhase} is invalid`);
    }
    console.log(`inject dependencies for ${currentPhase} phase`);
    let targets = this[pluginName].phases[currentPhase].map(target => {
      let type = this[target] ? this[target].type : null;
      if (type) {
        return {
          plugin: target,
          type: type,
          dependencies: [...this[pluginName][type].map(dep => {
            let attributes = this[dep].targetTypes[type].attributes || [];
            let searchParams = this[dep].targetTypes[type].searchParams || [];
            return {
              plugin: dep,
              dependencies: [...[
                ...attributes.map(attr => {
                  attr = attr.replace(/\'$/, '');
                  switch (attr) {
                  case 'integrity':
                    return ['no-hook-authorization'];
                  default:
                    return [];
                  }
                }),
                ...searchParams.map(param => {
                  let value = this[dep].searchParams[param];
                  if (typeof value === 'function') {
                    return value(null, type, this);
                  }
                  else {
                    return [];
                  }
                }),
                ...[(this[target] && this[target].dependencies ? this[target].dependencies : [])],
              ].reduce((acc, curr) => {
                curr.forEach(v => acc.add(v));
                return acc;
              }, new Set())],
            }
          }).reduce((acc, curr) => {
            curr.dependencies.forEach(v => acc.add(v));
            return acc;
          }, new Set())],
        }
      }
      else {
        return {
          plugin: target,
          type: null,
          dependencies: [...[
            ...[(this[target] && this[target].dependencies ? this[target].dependencies : [])],
          ].reduce((acc, curr) => {
            curr.forEach(v => acc.add(v));
            return acc;
          }, new Set())],
        }
      }
    });
    let dependencies = targets.map(({ plugin, dependencies }) => [[ pluginName, plugin ], [plugin, 'injector-helpers']].concat(dependencies.map(dep => [ plugin, dep ])))
      .reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
  
    for (let [a, b] of dependencies) {
      for (let c of this[b] && this[b].dependencies ? this[b].dependencies : []) {
        dependencies.push([b, c]);
      }
    }  

    let sequence = this.inject.components.toposort(dependencies.reverse()).reverse();
    //console.log('inject targets: ' + stringify(targets, null, 2));
    //console.log('inject dependencies: ', stringify(dependencies, null, 2));
    console.log('inject sequence: ', stringify(sequence, null, 2));
    let todo = sequence.filter(plugin => !(this[plugin] && this[plugin].done) && plugin !== pluginName);
    console.log('inject tasks to do: ', stringify(todo, null, 2));
    //console.log('inject task status: ', stringify(todo.map(plugin => [ plugin, !!this._tasks[plugin] ]), null, 2));
    todo.forEach(plugin => {
      if (!this._tasks[plugin]) {
        if (this[plugin] && this[plugin].dest) {
          switch (path.extname(this[plugin].dest)) {
          case '.html':
          case '.htm':
            console.log('inject generate task for ' + plugin);
            this.gulp.task(plugin, this.inject.injectors.html(plugin));
            break;
          case '.js':
          case '.mjs':
            console.log('inject generate task for ' + plugin);
            this.gulp.task(plugin, this.inject.injectors.js(plugin));
            break;
          default:
            throw new Error(`inject cannot handle plugin ${plugin}`);
          }
        }
      }
    });
    return this.gulp.series(...todo.filter(plugin => this._tasks[plugin]), (seriesDone) => {
      seriesDone();
      done();
    })();
  });

  for (let phase in this[pluginName].phases) {
    let _phase = phase;
    this.gulp.task(`${phase}-phase`, (done) => {
      this[pluginName].currentPhase = _phase;
      done();
    });
    this.gulp.task(phase, this.gulp.series(
      'injector-helpers',
      `${_phase}-phase`,
      'inject dependencies',
    ));
  }

  return this.gulp.series(...Object.getOwnPropertyNames(this[pluginName].phases));
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};