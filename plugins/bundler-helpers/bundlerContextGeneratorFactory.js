/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const enhancedResolve = require('enhanced-resolve');

function bundlerContextGeneratorFactory(nodeLibs = {}, contextGeneratorHelper = null) {
  const targetConfig = this.targetConfig; // this === this.bundles.components
  const hook = targetConfig['thin-hook'].hook;
  const resolveSync = enhancedResolve.create.sync(targetConfig.bundles['enhanced-resolve'].options || {});
  // Note: Not tested on Windows
  return function bundlerContextGenerator(astPath) {
    let ast = astPath[astPath.length - 1][1];
    let context = hook.contextGenerators.method(astPath);
    if (contextGeneratorHelper && typeof contextGeneratorHelper.pre === 'function') {
      contextGeneratorHelper.pre(ast, astPath, context);
    }
    if (ast.type === 'CallExpression' &&
        ast.callee.type === 'Identifier' &&
        ast.callee.name === 'require' &&
        ast.arguments.length === 1 &&
        ast.arguments[0].type === 'Literal' &&
        typeof ast.arguments[0].value === 'string') {
      let name = ast.arguments[0].value;
      let origin = context.split(/,/)[0];
      let originPhysicalDir = path.dirname(targetConfig.mapper(targetConfig.url.reverseMappings, origin));
      let base = targetConfig.bundles['enhanced-resolve'].context === '.' ? originPhysicalDir : targetConfig.bundles['enhanced-resolve'].context;
      let resolved;
      let componentName;
      if (name[0] === '.') {
        resolved = resolveSync({}, originPhysicalDir, name);
      }
      else {
        resolved = nodeLibs[name];
        if (!resolved) {
          resolved = resolveSync({}, base, name);
        }
      }
      componentName = targetConfig.mapper(targetConfig.url.mappings, resolved);
      console.log('requireContextGenerator: context = ' + context + ' name = ' + name + ' componentName = ' + componentName);
      context += '|' + componentName;
    }
    else if ((ast.type === 'ImportDeclaration' || ast.type === 'ExportNamedDeclaration' || ast.type === 'ExportAllDeclaration') && ast.source && ast.resolvedSource) {
      ast.resolvedSource = path.relative(path.dirname(astPath[0][0]), ast.resolvedSource);
      if (!ast.resolvedSource.startsWith('.')) {
        ast.resolvedSource = './' + ast.resolvedSource;
      }
    }
    else if (ast.type === 'Program' && ast.moduleDependencies) {
      for (let _module in ast.moduleDependencies) {
        let resolvedSource;
        if (ast.moduleDependencies[_module][0] === 'export') {
          resolvedSource = './' + path.relative(path.dirname(ast.moduleDependencies[_module].source), ast.moduleDependencies[_module].source);
        }
        else if (ast.moduleDependencies[_module].source.startsWith('.')) {
          resolvedSource = ast.moduleDependencies[_module].source; // relative path
        }
        else {
          resolvedSource = path.relative(path.dirname(astPath[0][0]), _module);
          if (!resolvedSource.startsWith('.')) {
            resolvedSource = './' + ast.resolvedSource;
          }
        }
        ast.moduleDependencies[_module].resolvedSource = resolvedSource; // for rollup
      }
    }
    if (contextGeneratorHelper && typeof contextGeneratorHelper.post === 'function') {
      contextGeneratorHelper.post(ast, astPath, context);
    }
    return context;
  };
}

module.exports = {
  bundlerContextGeneratorFactory,
};