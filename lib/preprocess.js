/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function(espree, escodegen, htmlparser, createHash, convert, he) {
  const _Map = Map;
  let _crypto;

  const espreeOptionsForTarget = { loc: true, range: true, tokens: true, comment: true, ecmaVersion: 9, ecmaFeatures: { experimentalObjectRestSpread: true } };
  const espreeOptionsForTargetCompact = { loc: false, range: false, tokens: false, comment: false, ecmaVersion: 9, ecmaFeatures: { experimentalObjectRestSpread: true } };
  const espreeOptions = { loc: false, range: false, tokens: false, comment: false, ecmaVersion: 9, ecmaFeatures: { experimentalObjectRestSpread: true } };
  const espreeModuleOptions = { loc: true, range: true, tokens: true, comment: true, ecmaVersion: 9, sourceType: 'module', ecmaFeatures: { experimentalObjectRestSpread: true } };
  const espreeModuleOptionsCompact = { loc: false, range: false, tokens: false, comment: false, ecmaVersion: 9, sourceType: 'module', ecmaFeatures: { experimentalObjectRestSpread: true } };

  let configurationsJSON = '{"hookNameForServiceWorker":"__hook__","contextGeneratorName":"method","discardHookErrors":true,"hookProperty":true,"hookGlobal":true,"hookPrefix":"_p_","compact":false,"noHookAuthorizationPreValidated":[],"contextGeneratorScripts":[]}';
  let configurations = JSON.parse(configurationsJSON);

  function getConfigurations() {
    return configurations;
  }

  function setConfigurations(_configurations) {
    if (typeof URL === 'function' && _configurations instanceof URL) {
      let srcUrl = _configurations;
      if (srcUrl.searchParams.has('hook-name')) {
        setHookNameForServiceWorker(srcUrl.searchParams.get('hook-name') || '__hook__');
      }
      if (srcUrl.searchParams.has('context-generator-name')) {
        setContextGeneratorName(srcUrl.searchParams.get('context-generator-name') || 'method');
      }
      if (srcUrl.searchParams.has('discard-hook-errors')) {
        setDiscardHookErrors(srcUrl.searchParams.get('discard-hook-errors') === 'true');
      }
      if (srcUrl.searchParams.has('hook-property')) {
        setHookProperty(srcUrl.searchParams.get('hook-property') === 'true');
      }
      if (srcUrl.searchParams.has('hook-global')) {
        setHookGlobal(srcUrl.searchParams.get('hook-global') === 'true');
      }
      if (srcUrl.searchParams.has('hook-prefix')) {
        setHookPrefix(srcUrl.searchParams.get('hook-prefix'));
      }
      if (srcUrl.searchParams.has('compact')) {
        setCompact(srcUrl.searchParams.get('compact') === 'true');
      }
      if (srcUrl.searchParams.has('no-hook-authorization')) {
        let noHookAuthorization = srcUrl.searchParams.get('no-hook-authorization').split(/,/);
        hook.parameters.noHookAuthorizationPreValidated = hook.parameters.noHookAuthorizationPreValidated || {};
        noHookAuthorization.forEach(ticket => {
          hook.parameters.noHookAuthorizationPreValidated[ticket] = true;
        });
        noHookAuthorization = [];
        for (let ticket in hook.parameters.noHookAuthorizationPreValidated) {
          noHookAuthorization.push(ticket);
        }
        setNoHookAuthorizationPreValidated(noHookAuthorization);
      }
      return configurations;
    }
    else {
      return configurations = _configurations;
    }
  }

  function getHookNameForServiceWorker() {
    return configurations.hookNameForServiceWorker;
  }

  function setHookNameForServiceWorker(_hookName) {
    return configurations.hookNameForServiceWorker = _hookName;
  }

  function getHookWith() {
    return '__with__';
  }

  function setHookWith(_hookWith) {
    return '__with__';
  }

  function getContextGeneratorName() {
    return configurations.contextGeneratorName;
  }

  function setContextGeneratorName(_contextGeneratorName) {
    return configurations.contextGeneratorName = _contextGeneratorName;
  }

  function getDiscardHookErrors() {
    return configurations.discardHookErrors;
  }

  function setDiscardHookErrors(_discardHookErrors) {
    return configurations.discardHookErrors = _discardHookErrors;
  }

  function getHookProperty() {
    return configurations.hookProperty;
  }

  function setHookProperty(_hookProperty) {
    return configurations.hookProperty = _hookProperty;
  }

  function getHookGlobal() {
    return configurations.hookGlobal;
  }

  function setHookGlobal(_hookGlobal) {
    return configurations.hookGlobal = _hookGlobal;
  }

  function getHookPrefix() {
    return configurations.hookPrefix;
  }

  function setHookPrefix(_hookPrefix) {
    return configurations.hookPrefix = _hookPrefix;
  }

  function getCompact() {
    return configurations.compact;
  }

  function setCompact(_compact) {
    return configurations.compact = _compact;
  }

  function getNoHookAuthorizationPreValidated() {
    return configurations.noHookAuthorizationPreValidated;
  }

  function setNoHookAuthorizationPreValidated(_noHookAuthorizationPreValidated) {
    return configurations.noHookAuthorizationPreValidated = _noHookAuthorizationPreValidated;
  }

  function getContextGeneratorScripts() {
    return configurations.contextGeneratorScripts;
  }

  let hookWorkers = []; // [ { worker: worker, channel: channel (document), port: port (Service Worker), taskQueueSize: n }, ... ]
  let hookWorkerCount = 4;

  function getHookId(seed) {
    let hash = createHash('sha256');
    hash.update(Math.random() + seed);
    return hash.digest('hex');
  }

  function getHookWorkers() {
    return hookWorkers;
  }

  function setHookWorkers(_hookWorkers) {
    hookWorkers = _hookWorkers;
    console.log('setHookWorkers', hookWorkers);
    hookWorkers.forEach(function (worker) {
      worker.tasks = {};
      worker.port.onmessage = function (event) {
        let message = JSON.parse(event.data);
        let id = message[0];
        let status = message[1];
        if (typeof worker.tasks[id] === 'object') {
          if (status === 'success') {
            let result = message[2];
            worker.tasks[id].status = status;
            worker.tasks[id].result = result;
            //console.log('response from Hook Worker for ' + id + ':' + status);
            worker.tasks[id].callback(worker.tasks[id]);
          }
          else {
            let error = message[2];
            worker.tasks[id].status = status;
            worker.tasks[id].error = error;
            console.error('response from Hook Worker for ' + id + ':' + status + ':' + error);
            worker.tasks[id].callback(worker.tasks[id]);
          }
        }
        else {
          console.error('response with unknown id ' + id + ' from Hook Worker');
        }
      }
    });
  }

  function setupHookWorkers() {
    if (hookWorkers.length === 0 && hook.parameters.hookWorker) {
      let transferChannels = [];
      let serviceWorkerInitiator = new URL(location.href).pathname;
      let noHookAuthorization = new URL(top.document.querySelector('script').src, top.location).searchParams.has('no-hook-authorization') 
        ? new URL(top.document.querySelector('script').src, top.location).searchParams.get('no-hook-authorization')
        : null;
      // Transfer a dedicated channel to each Hook Worker
      for (let i = 0; i < hookWorkerCount; i++) {
        let worker = {
          worker: new Worker(hook.parameters.hookWorker + '&service-worker-initiator=' + serviceWorkerInitiator + (noHookAuthorization ? '&no-hook-authorization=' + noHookAuthorization : '')),
          channel: new MessageChannel()
        };
        worker.worker.postMessage('channel', [ worker.channel.port2 ]);
        hookWorkers.push(worker);
        transferChannels.push(worker.channel.port1);
      }

      // Transfer Hook Worker channels to the Service Worker
      navigator.serviceWorker.controller.postMessage('channel', transferChannels);

      addEventListener('unload', function (event) {
        navigator.serviceWorker.controller.postMessage('unload');
      });
    }
  }

  function getBestHookWorker() {
    let worker = null;
    if (Array.isArray(hookWorkers) && hookWorkers.length > 0) {
      //console.log('getBestHookWorker' + JSON.stringify(hookWorkers.map(w => w.taskQueueSize), null, 2));
      let minIndex = 0;
      let minTaskQueueSize = hookWorkers[minIndex].taskQueueSize;
      for (let i = minIndex; i < hookWorkers.length; i++) {
        if (hookWorkers[i].taskQueueSize < minTaskQueueSize) {
          minIndex = i;
          minTaskQueueSize = hookWorkers[i].taskQueueSize;
        }
      }
      worker = hookWorkers[minIndex];
    }
    return worker;
  }

  // mutate this script itself to hand the current configurations to Document and Web Workers
  function mutateScriptConfigurationsJSON(script, url) {
    if (url.href.match(/\/hook[.]min[.]js/) && // this is the hook.min.js script and
      !url.searchParams.has('service-worker-initiator') && // is not a Service Worker script and
      url.searchParams.get('service-worker-ready') !== 'false') { // is not in pre-ServiceWorker process during version upgrading
      let mutatedScript = script.replace(
        /('{"hookNameForServiceWorker":")(__hook__)(","contextGeneratorName":")(method)(","discardHookErrors":)(true)(,"hookProperty":)(true)(,"hookGlobal":)(true)(,"hookPrefix":")(_p_)(","compact":)(false)(,"noHookAuthorizationPreValidated":\[\],"contextGeneratorScripts":\[\]}')/,
        '$1' + getHookNameForServiceWorker() +
        '$3' + getContextGeneratorName() +
        '$5' + getDiscardHookErrors() +
        '$7' + getHookProperty() +
        '$9' + getHookGlobal() +
        '$11' + getHookPrefix() +
        '$13' + getCompact() +
        '$15');
      script = mutatedScript;
    }
    return script;
  }

  function _trimStartEndRaw(ast) {
    if (ast && typeof ast === 'object') {
      delete ast.start;
      delete ast.end;
      delete ast.raw;
    }
    for (let target in ast) {
      if (ast[target]) {
        if (Array.isArray(ast[target])) {
          for (let i = 0; i < ast[target].length; i++) {
            let item = ast[target][i];
            if (item && typeof item === 'object') {
              _trimStartEndRaw(ast[target][i]);
            }
          }
        }
        else if (typeof ast[target] === 'object') {
          _trimStartEndRaw(ast[target]);
        }
      }
    }
    return ast;
  }

  let _espreeCache = {};
  const baseHookName = '_X_hookName_X_';
  const baseContext = 'X_X_XcontextX_X_X';

  function _espreeParse(code, hookName, context) {
    if (!_espreeCache[code]) {
      _espreeCache[code] = _trimStartEndRaw(espree.parse(code, espreeOptions).body[0]);
    }
    let result = {};
    let stack = [ result, _espreeCache[code] ];
    let cursor = stack.length;
    let ast, _ast;
    let prop, value;
    while (cursor > 0) {
      ast = stack[--cursor];
      _ast = stack[--cursor];
      for (prop in ast) {
        value = ast[prop];
        if (Array.isArray(value)) {
          stack[cursor++] = _ast[prop] = [];
          stack[cursor++] = value;
        }
        else if (value && typeof value === 'object') {
          stack[cursor++] = _ast[prop] = {};
          stack[cursor++] = value;
        }
        else if (value === baseHookName) {
          _ast[prop] = hookName;
        }
        else if (value === baseContext) {
          _ast[prop] = context;
        }
        else {
          _ast[prop] = value;
        }
      }
    }
    return result;
  }

  function _clone(sourceAst) {
    let result = {};
    let stack = [ result, sourceAst ];
    let cursor = stack.length;
    let ast, _ast;
    let prop, value;
    while (cursor > 0) {
      ast = stack[--cursor];
      _ast = stack[--cursor];
      for (prop in ast) {
        value = ast[prop];
        if (Array.isArray(value)) {
          stack[cursor++] = _ast[prop] = [];
          stack[cursor++] = value;
        }
        else if (value && typeof value === 'object') {
          stack[cursor++] = _ast[prop] = {};
          stack[cursor++] = value;
        }
        else {
          _ast[prop] = value;
        }
      }
    }
    return result;
  }

  const functionScopeTypes = {
    FunctionDeclaration: true,
    FunctionExpression: true,
    ArrowFunctionExpression: true,
    ClassDeclaration: true,
    VariableDeclaration_var: true,
    ImportDeclaration: true
  };
  const scopes = {
    $block$: true,
    $function$: true
  };
  const S_STRICT = Symbol('use strict');
  const parameterTypes = {
    Identifier: true,
    AssignmentPattern: true,
    ArrayPattern: true,
    ObjectPattern: true,
    RestElement: true,
  };
  const arrayPatternElementTypes = {
    Identifier: true,
    AssignmentPattern: true,
    ArrayPattern: true,
    ObjectPattern: true,
    RestElement: true,
    MemberExpression: true,
  };
  const objectPatternValueTypes = {
    Identifier: true,
    AssignmentPattern: true,
    ArrayPattern: true,
    ObjectPattern: true,
    MemberExpression: true,
  };
  const variableDeclaratorIdTypes = {
    Identifier: true,
    ArrayPattern: true,
    ObjectPattern: true,
  };
  const nonOverridableIdentifiers = new Map();
  [ 'undefined', 'NaN', 'Infinity' ].forEach(v => {
    nonOverridableIdentifiers.set(v, '__unexpected_overridden_declaration_of_' + v + '__');
  });

  function _analyzeScope(ast, blockScope, functionScope, moduleScope, hookName, hookWith) {
    let target, child, t, index, i, l, item, type, scope, params;
    type = ast.type;
    switch (type) {
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
    case 'CatchClause':
      switch (type) {
      case 'FunctionDeclaration':
        if (ast.id && ast.id.name) {
          if (nonOverridableIdentifiers.has(ast.id.name)) {
            ast.id.name = nonOverridableIdentifiers.get(ast.id.name);
          }
          // TODO: In strict mode, the function is defined in the block scope instread of the function scope
          blockScope[ast.id.name] = type;
        }
        blockScope = Object.create(blockScope);
        functionScope = blockScope;
        blockScope.arguments = 'VariableDeclaration_var';
        params = ast.params;
        if (ast.body && Array.isArray(ast.body.body) &&
            ast.body.body.length > 0 &&
            (item = ast.body.body[0]) &&
            Reflect.has(item, 'type') &&
            item.type === 'ExpressionStatement' &&
            item.expression && item.expression.type === 'Literal' &&
            item.expression.value === 'use strict') {
          functionScope[S_STRICT] = 'Literal';
        }
        break;
      case 'FunctionExpression':
        blockScope = Object.create(blockScope);
        functionScope = blockScope;
        if (ast.id && ast.id.name) {
          if (nonOverridableIdentifiers.has(ast.id.name)) {
            ast.id.name = nonOverridableIdentifiers.get(ast.id.name);
          }
          functionScope[ast.id.name] = type;
        }
        blockScope.arguments = 'VariableDeclaration_var';
        params = ast.params;
        if (ast.body && Array.isArray(ast.body.body) &&
            ast.body.body.length > 0 &&
            (item = ast.body.body[0]) &&
            Reflect.has(item, 'type') &&
            item.type === 'ExpressionStatement' &&
            item.expression && item.expression.type === 'Literal' &&
            item.expression.value === 'use strict') {
          functionScope[S_STRICT] = 'Literal';
        }
        break;
      case 'ArrowFunctionExpression':
        blockScope = Object.create(blockScope);
        functionScope = blockScope;
        if (ast.id && ast.id.name) {
          if (nonOverridableIdentifiers.has(ast.id.name)) {
            ast.id.name = nonOverridableIdentifiers.get(ast.id.name);
          }
          functionScope[ast.id.name] = type;
        }
        blockScope.arguments = 'VariableDeclaration_var';
        params = ast.params;
        break;
      case 'CatchClause':
        blockScope = Object.create(blockScope);
        functionScope = blockScope;
        if (ast.param) {
          params = [ast.param];
        }
        else {
          params = [];
        }
        break;
      default:
        break;
      }
      for (index = 0; index < params.length; index++) {
        if (parameterTypes[params[index].type]) {
          params[index].__scope__ = type;
        }
        else {
          console.error(type + ': Unknown Param Type ' + params[index].type);
        }
      }
      break;
    case 'Identifier':
      switch (ast.name) {
      case hookName:
        ast.name = '__unexpected_access_to_hook_callback_function__';
        break;
      case hookWith:
        ast.name = '__unexpected_access_to_hook_with_object__';
        break;
      case '$hook$':
        ast.name = '__unexpected_access_to_hook_alias_object__';
        break;
      default:
        break;
      }
      scope = ast.__scope__;
      if (scope) {
        if (ast.name) {
          if (nonOverridableIdentifiers.has(ast.name)) {
            ast.name = nonOverridableIdentifiers.get(ast.name);
          }
          (functionScopeTypes[scope] ? functionScope : blockScope)[ast.name] = scope;
        }
      }
      break;
    case 'AssignmentPattern':
      scope = ast.__scope__;
      if (scope) {
        if (ast.left.name) {
          if (nonOverridableIdentifiers.has(ast.left.name)) {
            ast.left.name = nonOverridableIdentifiers.get(ast.left.name);
          }
          (functionScopeTypes[scope] ? functionScope : blockScope)[ast.left.name] = scope;
        }
      }
      break;
    case 'ArrayPattern':
      scope = ast.__scope__;
      if (scope) {
        for (i = 0; i < ast.elements.length; i++) {
          if (ast.elements[i]) {
            if (arrayPatternElementTypes[ast.elements[i].type]) {
              ast.elements[i].__scope__ = scope;
            }
            else {
              console.error(type + ': Unknown Element Type ' + ast.elements[i].type);
            }
          }
        }
      }
      break;
    case 'ObjectPattern':
      scope = ast.__scope__;
      if (scope) {
        for (i = 0; i < ast.properties.length; i++) {
          if (ast.properties[i]) {
            if (ast.properties[i].value) {
              if (ast.properties[i].shorthand && ast.properties[i].key === ast.properties[i].value && ast.properties[i].value.type === 'Identifier') {
                ast.properties[i].key = _clone(ast.properties[i].key);
              }
              if (objectPatternValueTypes[ast.properties[i].value.type]) {
                ast.properties[i].value.__scope__ = scope;
              }
              else {
                console.error(type + ': Unknown Property Type ' + ast.properties[i].type);
              }
            }
            else if (ast.properties[i].argument && ast.properties[i].type === 'ExperimentalRestProperty') {
              ast.properties[i].__scope__ = scope;
            }
          }
        }
      }
      break;
    case 'RestElement':
      scope = ast.__scope__;
      if (scope) {
        if (ast.argument) {
          switch (ast.argument.type) {
          case 'Identifier':
            if (ast.argument.name) {
              if (nonOverridableIdentifiers.has(ast.argument.name)) {
                ast.argument.name = nonOverridableIdentifiers.get(ast.argument.name);
              }
              (functionScopeTypes[scope] ? functionScope : blockScope)[ast.argument.name] = scope;
            }
            break;
          case 'ArrayPattern':
            ast.argument.__scope__ = scope;
            break;
          default:
            console.error(type + ': Unknown argument type ' + ast.argument.type);
            break;
          }
        }
        else {
          console.error(type + ': Missing Argument');
        }
      }
      break;
    case 'ExperimentalRestProperty':
      scope = ast.__scope__;
      if (scope) {
        if (ast.argument) {
          switch (ast.argument.type) {
          case 'Identifier':
            if (ast.argument.name) {
              if (nonOverridableIdentifiers.has(ast.argument.name)) {
                ast.argument.name = nonOverridableIdentifiers.get(ast.argument.name);
              }
              (functionScopeTypes[scope] ? functionScope : blockScope)[ast.argument.name] = scope;
            }
            break;
          default:
            ast.argument.__scope__ = scope;
            break;
          }
        }
        else {
          console.error(type + ': Missing Argument');
        }
      }
      break;
    case 'SpreadElement':
      scope = ast.__scope__;
      if (scope) {
        if (ast.argument) {
          ast.argument.__scope__ = scope;
        }
        else {
          console.error(type + ': Missing Argument');
        }
      }
      break;
    case 'ClassDeclaration':
      if (nonOverridableIdentifiers.has(ast.id.name)) {
        ast.id.name = nonOverridableIdentifiers.get(ast.id.name);
      }
      blockScope[ast.id.name] = type;
      blockScope = Object.create(blockScope);
      functionScope = blockScope;
      break;
    case 'ClassExpression':
      blockScope = Object.create(blockScope);
      functionScope = blockScope;
      if (ast.id && ast.id.name) {
        if (nonOverridableIdentifiers.has(ast.id.name)) {
          ast.id.name = nonOverridableIdentifiers.get(ast.id.name);
        }
        functionScope[ast.id.name] = type;
      }
      break;
    case 'ClassBody':
      blockScope = Object.create(blockScope);
      functionScope = blockScope;
      functionScope[S_STRICT] = 'Literal';
      break;
    case 'VariableDeclaration':
      scope = type + '_' + ast.kind;
      for (index = 0; index < ast.declarations.length; index++) {
        if (ast.declarations[index] && ast.declarations[index].type === 'VariableDeclarator') {
          ast.declarations[index].__scope__ = scope;
        }
      }
      break;
    case 'VariableDeclarator':
      scope = ast.__scope__;
      if (scope) {
        if (ast.id && ast.id.type) {
          if (variableDeclaratorIdTypes[ast.id.type]) {
            ast.id.__scope__ = scope;
          }
          else {
            console.error(type + ': Unknown Id Type ' + ast.id.type);
          }
        }
      }
      break;
    case 'ImportDeclaration':
      for (index = 0; index < ast.specifiers.length; index++) {
        if (ast.specifiers[index]) {
          switch (ast.specifiers[index].type) {
          case 'ImportDefaultSpecifier':
          case 'ImportNamespaceSpecifier':
          case 'ImportSpecifier':
            if (ast.specifiers[index].local && ast.specifiers[index].local.type === 'Identifier' && ast.specifiers[index].local.name) {
              let local = ast.specifiers[index].local;
              if (nonOverridableIdentifiers.has(local.name)) {
                local.name = nonOverridableIdentifiers.get(local.name);
              }
              functionScope[local.name] = type;
            }
            break;
          default:
            break;
          }
        }
      }
      break;
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'BlockStatement':
      blockScope = Object.create(blockScope);
      if (ast.__with_body__) {
        ast.__with_body__ = undefined;
        blockScope[hookWith] = true;
        blockScope = Object.create(blockScope);
      }
      break;
    case 'WithStatement':
      if (hookWith && ast.body) {
        ast.body.__with_body__ = true;
      }
      break;
    case 'Program':
      if (ast.sourceType === 'module') {
        blockScope = Object.create(blockScope);
        functionScope = blockScope;
        moduleScope = blockScope;
        functionScope[S_STRICT] = 'Literal';
      }
      else if (Array.isArray(ast.body) &&
        ast.body.length > 0 &&
        (item = ast.body[0]) &&
        typeof item === 'object' && Reflect.has(item, 'type') &&
        item.type === 'ExpressionStatement' &&
        item.expression && item.expression.type === 'Literal' &&
        item.expression.value === 'use strict') {
        functionScope[S_STRICT] = 'Literal';
      }
      break;
    default:
      break;
    }
    ast.$block$ = blockScope;
    ast.$function$ = functionScope;
    for (target in ast) {
      if (scopes[target]) {
        continue;
      }
      child = ast[target];
      if (child) {
        if (Array.isArray(child)) {
          for (t = child, index = 0, l = t.length; index < l; index++) {
            item = t[index];
            if (item instanceof Object && typeof item.type === 'string') {
              _analyzeScope(item, blockScope, functionScope, moduleScope, hookName, hookWith);
            }
          }
        }
        else if (child instanceof Object && typeof child.type === 'string') {
          _analyzeScope(child, blockScope, functionScope, moduleScope, hookName, hookWith);
        }
      }
    }
  }

  function _logAst(ast) {
    let o = ast.$block$;
    let scope = '';
    while (o && o !== Object.prototype) {
      scope += (o === ast.$function$ ? '*' : '') + '[' + Object.entries(o).map(([k, v]) => k + '(' + v + ')').join(',') + ']';
      o = Object.getPrototypeOf(o);
    }
    console.log(ast.type, ast.name || '', scope);
  }

  function _nonGlobalScope(blockScope, globalScope) {
    let o = blockScope;
    let list = {};
    while (o && o !== globalScope) {
      Object.assign(list, o);
      o = Object.getPrototypeOf(o);
    }
    return list;
  }

  function _nonGlobalWithScope(blockScope, globalScope, hookWith) {
    let o = blockScope;
    let list = {};
    while (o && o !== globalScope) {
      Object.assign(list, o);
      if (o.hasOwnProperty(hookWith)) {
        break;
      }
      o = Object.getPrototypeOf(o);
    }
    return list;
  }

  function _isWithScoped(blockScope, name, hookWith) {
    if (blockScope[hookWith]) {
      if (blockScope[name]) {
        for(let o = blockScope; !o.hasOwnProperty(hookWith); o = Object.getPrototypeOf(o)) {
          if (o.hasOwnProperty(name)) {
            return false; // name found inside the innermost with scope as a local variable
          }
        }
      }
      return true; // name not found inside the innermost with scope as a local varibale
    }
    else {
      return false; // no with scope in the scope chain
    }
  }

  function _logScope(ast) {
    let target, child, t, index, i, l, item, type, scope;
    _logAst(ast);
    for (target in ast) {
      if (scopes[target]) {
        continue;
      }
      child = ast[target];
      if (child) {
        if (Array.isArray(child)) {
          for (t = child, index = 0, l = t.length; index < l; index++) {
            item = t[index];
            if (item instanceof Object && typeof item.type === 'string') {
              _logScope(item);
            }
          }
        }
        else if (child instanceof Object && typeof child.type === 'string') {
          _logScope(child);
        }
      }
    }
  }

  function objectAssign(target, src) {
    let p;
    for (p in src) {
      if (typeof src[p] !== 'undefined') {
        target[p] = src[p];
      }
    }
    return target;
  }

  function _preprocess(ast, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap, _hookGlobal, _hookPrefix, hookWith, blockScope, functionScope, globalScope, globalObjectScope, globalClassScope){
    let context, template, f, params, body, useStrict, wrapper, target, child, t, index, l, item, __hooked__;
    blockScope = ast.$block$ || blockScope;
    functionScope = ast.$function$ || functionScope;
    ast.$block$ = blockScope;
    ast.$function$ = functionScope;
    __hooked__ = ast.__hooked__;
    switch (ast.type) {
    case 'VariableDeclaration':
      if (ast.__hooked__) {
        break;
      }
      else if (_hookProperty && _hookGlobal &&
        Array.isArray(ast.declarations) &&
        ast.declarations.length > 0 &&
        globalScope === (ast.kind === 'var' ? functionScope : blockScope)) {
        if (ast.__for__ &&
          ast.declarations.length === 1 &&
          (ast.declarations[0].id.type === 'Identifier' || ast.declarations[0].id.type === 'ArrayPattern' || ast.declarations[0].id.type === 'ObjectPattern') &&
          !ast.declarations[0].init) {
          switch (ast.declarations[0].id.type) {
          case 'Identifier':
            if (!blockScope[ast.declarations[0].id.name]) {
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              body = ast.declarations[0].id;
              t = functionScope[S_STRICT];
              template = _espreeParse(t
                ? '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'#var\')[X_X_XcontextX_X_X[0]]'
                : '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'var\')[X_X_XcontextX_X_X[0]]',
                hookName, astPath[0][4]).expression;
              template.object.arguments[1].property.value = astPath[0][5](context);
              template.object.arguments[1].__hooked__ = true;
              template.object.arguments[2].value = body.name;
              template.object.__hooked__ = true;
              template.object.callee.__hooked__ = true;
              template.object.callee.object.__hooked__ = true;
              template.object.callee.property.__hooked__ = true;
              if (t) {
                template.property.property.value = astPath[0][5]('S' + _hookPrefix + body.name + ';' + context);
              }
              else {
                template.property.property.value = astPath[0][5](_hookPrefix + body.name + ';' + context);
              }
              template.property.__hooked__ = true;
              template.__hooked__ = true;
              ast.declarations = undefined;
              ast.kind = undefined;
              objectAssign(ast, template);
            }
            break;
          case 'ArrayPattern':
            template = ast.declarations[0].id;
            template.__global__ = ast.kind;
            template.__LHS__ = true;
            ast.declarations = undefined;
            ast.kind = undefined;
            objectAssign(ast, template);
            for (index = 0, l = ast.elements.length; index < l; index++) {
              if (ast.elements[index]) {
                switch (ast.elements[index].type) {
                case 'Identifier':
                case 'AssignmentPattern':
                case 'ArrayPattern':
                case 'ObjectPattern':
                case 'RestElement':
                case 'MemberExpression':
                  ast.elements[index].__LHS__ = ast.__LHS__;
                  ast.elements[index].__global__ = ast.__global__;
                  break;
                default:
                  console.error(ast.type + ': Unknown Element Type ' + ast.elements[index].type);
                  break;
                }
              }
            }
            ast.__LHS__ = undefined;
            ast.__global__ = undefined;
            break;
          case 'ObjectPattern':
            template = ast.declarations[0].id;
            template.__global__ = ast.kind;
            template.__LHS__ = true;
            ast.declarations = undefined;
            ast.kind = undefined;
            objectAssign(ast, template);
            for (index = 0, l = ast.properties.length; index < ast.properties.length; index++) {
              if (ast.properties[index]) {
                if (ast.properties[index].value) {
                  switch (ast.properties[index].value.type) {
                  case 'Identifier':
                  case 'AssignmentPattern':
                  case 'ArrayPattern':
                  case 'ObjectPattern':
                  case 'MemberExpression':
                    if (ast.properties[index].shorthand && ast.properties[index].value.type === 'Identifier') {
                      if (!blockScope[ast.properties[index].value.name]) {
                        ast.properties[index].shorthand = false;
                        ast.properties[index].key = _clone(ast.properties[index].key);
                      }
                    }
                    ast.properties[index].value.__LHS__ = ast.__LHS__;
                    ast.properties[index].value.__global__ = ast.__global__;
                    break;
                  default:
                    console.error(type + ': Unknown Property Type ' + ast.properties[index].type);
                    break;
                  }
                }
                else if (ast.properties[index].argument && ast.properties[index].type === 'ExperimentalRestProperty') {
                  ast.properties[index].__LHS__ = ast.__LHS__;
                  ast.properties[index].__global__ = ast.__global__;
                }
              }
            }
            ast.__LHS__ = undefined;
            ast.__global__ = undefined;
            break;
          default:
            break;
          }
        }
        else {
          template = _espreeParse('1,2', '', '');
          template.expression.expressions = ast.declarations;
          for (index = 0, l = template.expression.expressions.length; index < l; index++) {
            if (template.expression.expressions[index].id.type === 'Identifier' && !template.expression.expressions[index].init) {
              template.expression.expressions[index] = template.expression.expressions[index].id;
            }
            template.expression.expressions[index].__global__ = ast.kind;
            template.expression.expressions[index].__LHS__ = true;
          }
          ast.declarations = undefined;
          ast.kind = undefined;
          objectAssign(ast, ast.__for__ ? template.expression : template);
        }
      }
      break;
    case 'VariableDeclarator':
      if (_hookProperty && ast.id && typeof ast.id === 'object') {
        ast.id.__LHS__ = true;
        if (ast.init) {
          switch (ast.id.type) {
          case 'ObjectPattern':
          case 'ArrayPattern':
            ast.init.__iteration__ = true; // let { any } = init; iterate over init
            break;
          default:
            break;
          }
          if (ast.init.type === 'Identifier' && ast.init.name) {
            if (hookWith && blockScope[hookWith]) {
              ast.init.__with__ = 'get';
            }
            else if (_hookGlobal && !blockScope[ast.init.name]) {
              ast.init.__global__ = 'get';
            }
          }
          if (_hookGlobal) {
            if (ast.__global__) {
              template = _espreeParse('id = init', '', '').expression;
              template.left = ast.id;
              template.left.__global__ = ast.__global__;
              template.right = ast.init;
              ast.id = undefined;
              ast.init = undefined;
              ast.__global__ = undefined;
              objectAssign(ast, template);
            }
          }
        }
      }
      break;
    case 'ClassExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty) {
        if (ast.superClass && ast.superClass.type === 'Identifier' && ast.superClass.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.superClass.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.superClass.name]) {
            ast.superClass.__global__ = 'get';
          }
        }
      }
      break;
    case 'ClassDeclaration':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else {
        if (_hookProperty) {
          if (ast.superClass && ast.superClass.type === 'Identifier' && ast.superClass.name) {
            if (hookWith && blockScope[hookWith]) {
              ast.superClass.__with__ = 'get';
            }
            else if (_hookGlobal && !blockScope[ast.superClass.name]) {
              ast.superClass.__global__ = 'get';
            }
          }
          if (_hookGlobal && Object.getPrototypeOf(functionScope) === globalScope) {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            t = functionScope[S_STRICT];
            template = _espreeParse(t
              ? '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'cname\', \'#class\')[X_X_XcontextX_X_X[0]] = class cname {}'
              : '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'cname\', \'class\')[X_X_XcontextX_X_X[0]] = class cname {}',
              hookName, astPath[0][4]);
            template.expression.left.object.arguments[1].property.value = astPath[0][5](context);
            template.expression.left.object.arguments[1].__hooked__ = true;
            template.expression.left.object.arguments[2].value = ast.id.name;
            template.expression.left.object.__hooked__ = true;
            template.expression.left.object.callee.__hooked__ = true;
            if (t) {
              template.expression.left.property.property.value = astPath[0][5]('S' + _hookPrefix + ast.id.name + ';' + context);
            }
            else {
              template.expression.left.property.property.value = astPath[0][5](_hookPrefix + ast.id.name + ';' + context);
            }
            template.expression.left.property.__hooked__ = true;
            template.expression.left.__hooked__ = true;
            objectAssign(template.expression.right, ast);
            template.expression.right.type = 'ClassExpression';
            template.expression.right.__hooked__ = true;
            template.expression.right.__moved__ = true;
            template.expression.__hooked__ = true;
            ast.id = undefined;
            ast.superClass = undefined;
            ast.body = undefined;
            objectAssign(ast, template);
          }
        }
      }
      break;
    case 'MemberExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty &&
        typeof ast.object === 'object' &&
        typeof ast.property === 'object') {
        if (ast.object.type === 'Super') {
          // TODO: __LHS__
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(
            '_X_hookName_X_(\'s.\', this, [\'p\', p => super[p]], X_X_XcontextX_X_X[0])',
            hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          params = f.arguments[2].elements;
          if (ast.computed) {
            params[0] = ast.property;
          }
          else { // ast.property.type === 'Identifier'
            params[0].value = ast.property.name;
            if (_sourceMap) {
              params[0].start = ast.property.start;
              params[0].end = ast.property.end;
            }
            params[0].raw = undefined;
          }
          params[1].__hooked__ = true;
          params[1].body.__hooked__ = true;
          params[1].$block$ = params[1].$function$ = Object.create(blockScope);
          params[1].$block$.p = true;
          ast.object = undefined;
          ast.property = undefined;
          ast.computed = undefined;
          objectAssign(ast, f);
        }
        else {
          if (hookWith && blockScope[hookWith]) {
            if (ast.object.type === 'Identifier') {
              ast.object.__with__ = 'get';
            }
          }
          if (ast.__LHS__) {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            t = functionScope[S_STRICT];
            template = _espreeParse(t
              ? '_X_hookName_X_(\'#.=\', o, [\'p\'], X_X_XcontextX_X_X[0])[\'=\']'
              : '_X_hookName_X_(\'.=\', o, [\'p\'], X_X_XcontextX_X_X[0])[\'=\']',
              hookName, astPath[0][4]);
            f = template.expression.object;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[1] = ast.object;
            if (_hookGlobal && f.arguments[1].type === 'Identifier' && !blockScope[f.arguments[1].name]) {
              f.arguments[1].__global__ = 'get';
            }
            if (ast.computed) {
              params[0] = ast.property;
            }
            else { // ast.property.type === 'Identifier'
              params[0].value = ast.property.name;
              if (_sourceMap) {
                params[0].start = ast.property.start;
                params[0].end = ast.property.end;
              }
              params[0].raw = undefined;
            }
            template.expression.__hooked__ = true;
            f.callee.__hooked__ = true;
            f.__hooked__ = true;
            ast.object = undefined;
            ast.property = undefined;
            ast.computed = undefined;
            ast.__LHS__ = undefined;
            objectAssign(ast, template.expression);
          }
          else {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(functionScope[S_STRICT]
              ? '_X_hookName_X_(\'#.\', o, [\'p\'], X_X_XcontextX_X_X[0])'
              : '_X_hookName_X_(\'.\', o, [\'p\'], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[1] = ast.object;
            if (_hookGlobal && f.arguments[1].type === 'Identifier' && !blockScope[f.arguments[1].name]) {
              f.arguments[1].__global__ = 'get';
            }
            if (ast.computed) {
              params[0] = ast.property;
            }
            else { // ast.property.type === 'Identifier'
              params[0].value = ast.property.name;
              if (_sourceMap) {
                params[0].start = ast.property.start;
                params[0].end = ast.property.end;
              }
              params[0].raw = undefined;
            }
            ast.object = undefined;
            ast.property = undefined;
            ast.computed = undefined;
            objectAssign(ast, f);
          }
        }
      }
      break;
    case 'UpdateExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty &&
        typeof ast.operator === 'string' &&
        typeof ast.prefix === 'boolean' &&
        typeof ast.argument === 'object') {
        switch (ast.argument.type) {
        case 'MemberExpression':
          if (ast.argument.object.type === 'Super') {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', this, [\'p\', p => super[p]++], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[0].value = ast.prefix ? ast.operator + 's' : 's' + ast.operator;
            if (ast.argument.computed) {
              params[0] = ast.argument.property;
            }
            else { // ast.argument.property.type === 'Identifier'
              params[0].value = ast.argument.property.name;
              params[0].raw = undefined;
            }
            params[1].body.operator = ast.operator;
            params[1].body.prefix = ast.prefix;
            params[1].body.argument.__hooked__ = true;
            params[1].body.__hooked__ = true;
            params[1].__hooked__ = true;
            params[1].$block$ = params[1].$function$ = Object.create(blockScope);
            params[1].$block$.p = true;
            ast.operator = undefined;
            ast.prefix = undefined;
            ast.argument = undefined;
            objectAssign(ast, f);
          }
          else {
            if (hookWith && blockScope[hookWith]) {
              if (ast.argument.object.type === 'Identifier') {
                ast.argument.object.__with__ = 'get';
              }
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', o, [\'p\'], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            if (functionScope[S_STRICT]) {
              f.arguments[0].value = ast.prefix ? '#' + ast.operator + 'p' : '#p' + ast.operator;
            }
            else {
              f.arguments[0].value = ast.prefix ? ast.operator + 'p' : 'p' + ast.operator;
            }
            f.arguments[1] = ast.argument.object;
            if (ast.argument.computed) {
              params[0] = ast.argument.property;
            }
            else { // ast.argument.property.type === 'Identifier'
              params[0].value = ast.argument.property.name;
              params[0].raw = undefined;
            }
            ast.operator = undefined;
            ast.prefix = undefined;
            ast.argument = undefined;
            objectAssign(ast, f);
          }
          break;
        case 'Identifier':
          if (hookWith && blockScope[hookWith]) {
            if (!_isWithScoped(blockScope, ast.argument.name, hookWith)) {
              break;
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', ' + hookWith + ', [\'p\', () => foo++], X_X_XcontextX_X_X[0], false)',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[0].value = ast.prefix ? ast.operator + 'w' : 'w' + ast.operator;
            f.arguments[1].__hooked__ = true;
            params[0].value = ast.argument.name;
            params[1].body.argument.name = ast.argument.name;
            params[1].body.operator = ast.operator;
            params[1].body.prefix = ast.prefix;
            params[1].body.__hooked__ = true;
            params[1].__hooked__ = true;
            ast.operator = undefined;
            ast.prefix = undefined;
            ast.argument = undefined;
            objectAssign(ast, f);
          }
          else if (_hookGlobal && ast.argument.name && !blockScope[ast.argument.name]) {
            ast.argument.__global__ = 'set';
          }
          break;
        default:
          break;
        }
      }
      break;
    case 'UnaryExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty &&
        typeof ast.argument === 'object') {
        switch (ast.argument.type) {
        case 'MemberExpression':
          if (ast.operator === 'delete') {
            if (hookWith && blockScope[hookWith]) {
              if (ast.argument.object.type === 'Identifier') {
                ast.argument.object.__with__ = 'get';
              }
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', o, [\'p\'], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            if (functionScope[S_STRICT]) {
              f.arguments[0].value = '#' + ast.operator;
            }
            else {
              f.arguments[0].value = ast.operator;
            }
            f.arguments[1] = ast.argument.object;
            if (ast.argument.computed) {
              params[0] = ast.argument.property;
            }
            else { // ast.argument.property.type === 'Identifier'
              params[0].value = ast.argument.property.name;
              params[0].raw = undefined;
            }
            ast.operator = undefined;
            ast.prefix = undefined;
            ast.argument = undefined;
            objectAssign(ast, f);
          }
          break;
        case 'Identifier':
          switch (ast.operator) {
          case 'delete':
            if (hookWith && blockScope[hookWith]) {
              if (!_isWithScoped(blockScope, ast.argument.name, hookWith)) {
                break;
              }
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              template = _espreeParse(
                '_X_hookName_X_(\'wdelete\', ' + hookWith + ', [\'p\', () => delete p], X_X_XcontextX_X_X[0], false)',
                hookName, astPath[0][4]);
              f = template.expression;
              f.arguments[3].property.value = astPath[0][5](context);
              f.arguments[3].__hooked__ = true;
              params = f.arguments[2].elements;
              f.arguments[1].__hooked__ = true;
              params[0].value = ast.argument.name;
              params[1].body.argument.name = ast.argument.name;
              params[1].body.argument.__hooked__ = true;
              params[1].body.__hooked__ = true;
              params[1].__hooked__ = true;
              ast.argument = undefined;
              ast.operator = undefined;
              ast.prefix = undefined;
              objectAssign(ast, f);
            }
            else if (_hookGlobal && ast.argument.name && !blockScope[ast.argument.name]) {
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              template = _espreeParse(functionScope[S_STRICT]
                ? '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'#delete\')'
                : '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'delete\')',
                hookName, astPath[0][4]);
              template.expression.arguments[1].property.value = astPath[0][5](context);
              template.expression.arguments[1].__hooked__ = true;
              template.expression.arguments[2].value = ast.argument.name;
              template.expression.__hooked__ = true;
              template.expression.callee.__hooked__ = true;
              ast.argument = undefined;
              objectAssign(ast, template.expression);
            }
            break;
          case 'typeof':
            if (hookWith && blockScope[hookWith]) {
              if (!_isWithScoped(blockScope, ast.argument.name, hookWith)) {
                break;
              }
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              template = _espreeParse(
                '_X_hookName_X_(\'wtypeof\', ' + hookWith + ', [\'p\', () => typeof p], X_X_XcontextX_X_X[0], false)',
                hookName, astPath[0][4]);
              f = template.expression;
              f.arguments[3].property.value = astPath[0][5](context);
              f.arguments[3].__hooked__ = true;
              params = f.arguments[2].elements;
              f.arguments[1].__hooked__ = true;
              params[0].value = ast.argument.name;
              params[1].body.argument.name = ast.argument.name;
              params[1].body.argument.__hooked__ = true;
              params[1].body.__hooked__ = true;
              params[1].__hooked__ = true;
              ast.argument = undefined;
              ast.operator = undefined;
              ast.prefix = undefined;
              objectAssign(ast, f);
            }
            else if (_hookGlobal && ast.argument.name && !blockScope[ast.argument.name]) {
              ast.argument.__global__ = 'typeof';
            }
            break;
          default:
            if (hookWith && blockScope[hookWith]) {
              ast.argument.__with__ = 'get';
            }
            else if (_hookGlobal && ast.argument.name && !blockScope[ast.argument.name]) {
              ast.argument.__global__ = 'get';
            }
            break;
          }
          break;
        default:
          break;
        }
      }
      break;
    case 'AssignmentExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty &&
        typeof ast.operator === 'string' &&
        typeof ast.left === 'object' &&
        typeof ast.right === 'object') {
        if (ast.right.type === 'Identifier') {
          if (hookWith && blockScope[hookWith]) {
            ast.right.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.right.name]) {
            ast.right.__global__ = 'get';
          }
        }
        switch (ast.left.type) {
        case 'MemberExpression':
          if (ast.left.object.type === 'Super') {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', this, [\'p\', v, (p, v) => super[p] = v], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[0].value = 's' + ast.operator;
            f.arguments[0].raw = undefined;
            if (ast.left.computed) {
              params[0] = ast.left.property;
            }
            else { // ast.left.property.type === 'Identifier'
              params[0].value = ast.left.property.name;
              if (_sourceMap) {
                params[0].start = ast.left.property.start;
                params[0].end = ast.left.property.end;
              }
              params[0].raw = undefined;
            }
            params[1] = ast.right;
            params[2].body.operator = ast.operator;
            params[2].body.left.__hooked__ = true;
            params[2].body.__hooked__ = true;
            params[2].__hooked__ = true;
            params[2].$block$ = params[2].$function$ = Object.create(blockScope);
            params[2].$block$.p = true;
            params[2].$block$.v = true;
            if (_sourceMap) {
              f.callee.start = ast.left.start;
              f.callee.end = ast.left.end;
              f.callee.loc = ast.left.loc;
              f.callee.range = ast.left.range;
            }
            ast.operator = undefined;
            ast.left = undefined;
            ast.right = undefined;
            objectAssign(ast, f);
          }
          else {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', o, [\'p\', v], X_X_XcontextX_X_X[0])',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[0].value = functionScope[S_STRICT] ? '#' + ast.operator : ast.operator;
            f.arguments[0].raw = undefined;
            f.arguments[1] = ast.left.object;
            if (ast.left.computed) {
              params[0] = ast.left.property;
            }
            else { // ast.left.property.type === 'Identifier'
              params[0].value = ast.left.property.name;
              if (_sourceMap) {
                params[0].start = ast.left.property.start;
                params[0].end = ast.left.property.end;
              }
              params[0].raw = undefined;
            }
            params[1] = ast.right;
            if (_sourceMap) {
              f.callee.start = ast.left.start;
              f.callee.end = ast.left.end;
              f.callee.loc = ast.left.loc;
              f.callee.range = ast.left.range;
            }
            ast.operator = undefined;
            ast.left = undefined;
            ast.right = undefined;
            objectAssign(ast, f);
          }
          break;
        case 'Identifier':
          if (hookWith && blockScope[hookWith]) {
            if (!_isWithScoped(blockScope, ast.left.name, hookWith)) {
              break;
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'op\', ' + hookWith + ', [\'p\', v, (v) => p = v], X_X_XcontextX_X_X[0], false)',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            f.arguments[0].value = 'w' + ast.operator;
            f.arguments[0].raw = undefined;
            params[0].value = ast.left.name;
            params[0].raw = undefined;
            params[1] = ast.right;
            params[2].body.left.name = ast.left.name;
            params[2].body.left.__hooked__ = true;
            params[2].body.operator = ast.operator;
            params[2].body.__hooked__ = true;
            params[2].__hooked__ = true;
            params[2].$block$ = params[2].$function$ = Object.create(blockScope);
            params[2].$block$.v = true;
            if (_sourceMap) {
              params[0].start = ast.start;
              params[0].end = ast.end;
              f.callee.start = ast.left.start;
              f.callee.end = ast.left.end;
              f.callee.loc = ast.left.loc;
              f.callee.range = ast.left.range;
            }
            ast.operator = undefined;
            ast.left = undefined;
            ast.right = undefined;
            objectAssign(ast, f);
          }
          else if (_hookGlobal && !blockScope[ast.left.name]) {
            ast.left.__global__ = 'set';
          }
          break;
        case 'ArrayPattern':
        case 'ObjectPattern':
          ast.left.__LHS__ = true;
          if (hookWith && blockScope[hookWith]) {
            ast.left.__with__ = 'set';
          }
          else if (_hookGlobal) {
            ast.left.__global__ = 'set';
          }
          ast.right.__iteration__ = true; // ({ any } = right); iterate over right
          break;
        default:
          break;
        }
      }
      break;
    case 'MethodDefinition':
      if (_hookProperty) {
        if (ast.computed && ast.key && ast.key.type === 'Identifier' && ast.key.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.key.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.key.name]) {
            ast.key.__global__ = 'get';
          }
        }
      }
      break;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (typeof ast.body === 'object' &&
          !Array.isArray(ast.body) &&
          ast.body.type === 'BlockStatement' &&
          ast.body.body &&
          Array.isArray(ast.body.body)) {
        params = ast.params;
        body = ast.body.body;
        if (body[0] &&
            body[0].type === 'ExpressionStatement' &&
            body[0].expression &&
            body[0].expression.type === 'Literal' &&
            body[0].expression.value === 'use strict') {
          useStrict = body.shift();
        }
        else {
          useStrict = null;
        }
        context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        t = ast.params[0] && ast.params[0].type === 'ArrayPattern';
        template = _espreeParse(t
          ? ast.generator
            ? 'function * f(...args) { yield * _X_hookName_X_(function * () {}, this, args, X_X_XcontextX_X_X[0]); }'
            : 'function f(...args) { return _X_hookName_X_(() => {}, null, args, X_X_XcontextX_X_X[0]); }'
          : ast.generator
            ? 'function * f() { yield * _X_hookName_X_(function * () {}, this, arguments, X_X_XcontextX_X_X[0]); }'
            : 'function f() { return _X_hookName_X_(() => {}, null, arguments, X_X_XcontextX_X_X[0]); }',
          hookName, astPath[0][4]);
        if (ast.generator) {
          template.body.body[0].expression.argument.arguments[3].property.value = astPath[0][5](context);
          template.body.body[0].expression.argument.arguments[3].__hooked__ = true;
        }
        else {
          template.body.body[0].argument.arguments[3].property.value = astPath[0][5](context);
          template.body.body[0].argument.arguments[3].__hooked__ = true;
        }
        f = ast.generator
          ? template.body.body[0].expression.argument.arguments[0]
          : template.body.body[0].argument.arguments[0];
        f.async = ast.async;
        f.params = ast.params;
        f.body.body = body;
        f.__hooked__ = true;
        if (ast.generator) {
          template.body.body[0].expression.argument.callee.__hooked__ = true;
          template.body.body[0].expression.argument.__hooked__ = true;
        }
        else {
          template.body.body[0].argument.callee.__hooked__ = true;
          template.body.body[0].argument.__hooked__ = true;
        }
        let __iteration__ = false;
        FUNCTION_PARAMS_FOR_LOOP:
        for (let i = 0; i < ast.params.length; i++) {
          switch (ast.params[i].type) {
            case 'ObjectPattern':
            case 'ArrayPattern':
              __iteration__ = true;
              break FUNCTION_PARAMS_FOR_LOOP;
            default:
              break;
          }
        }
        if (__iteration__) {
          // prepend for (let arg of arguments) _X_hookName_X_('#*', arg, [], X_X_XcontextX_X_X[0]);
          template.body.body.unshift({
            "type": "ForOfStatement",
            "left": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "arg",
                    "__hooked__": true
                  },
                  "init": null,
                  "__hooked__": true
                }
              ],
              "kind": "let",
              "__hooked__": true
            },
            "right": {
              "type": "Identifier",
              "name": "arguments",
              "__hooked__": true
            },
            "body": {
              "type": "ExpressionStatement",
              "expression": {
                "type": "CallExpression",
                "callee": {
                  "type": "Identifier",
                  "name": hookName,
                  "__hooked__": true
                },
                "arguments": [
                  {
                    "type": "Literal",
                    "value": functionScope[S_STRICT] ? "#*" : "*",
                    "__hooked__": true
                  },
                  {
                    "type": "Identifier",
                    "name": "arg",
                    "__hooked__": true
                  },
                  {
                    "type": "ArrayExpression",
                    "elements": [],
                    "__hooked__": true
                  },
                  {
                    "type": "MemberExpression",
                    "object": {
                      "type": "Identifier",
                      "name": astPath[0][4],
                      "__hooked__": true
                    },
                    "property": {
                      "type": "Literal",
                      "value": astPath[0][5](context),
                      "__hooked__": true
                    },
                    "computed": true,
                    "__hooked__": true
                  }
                ],
                "__hooked__": true
              },
              "__hooked__": true
            },
            "__hooked__": true
          });
        }
        if (useStrict) {
          template.body.body.unshift(useStrict);
        }
        ast.params = t
          ? template.params
          : params.map(function _trim(param) {
              return param && (param.type === 'ArrayPattern'
                ? { type: param.type, elements: param.elements.map(element => _trim(element)) }
                : param.type === 'AssignmentPattern'
                  ? param.left
                  : param.type === 'ObjectPattern'
                    ? { type: 'ObjectPattern', properties: param.properties.map(prop => prop.value && prop.value.type === 'AssignmentPattern'
                      ? ((p, v) => (p.value = v, p))(objectAssign({}, prop), prop.value.left)
                      : prop.value && prop.value.type === 'ObjectPattern'
                        ? ((p, v) => (p.value = v, p))(objectAssign({}, prop), _trim(prop.value))
                        : prop) }
                    : param);
            });
        if (_sourceMap) {
          template.body.start = ast.body.start;
          template.body.end = ast.body.end;
          template.body.loc = ast.body.loc;
          template.body.range = ast.body.range;
        }
        ast.body = template.body;
        if (_hookProperty && _hookGlobal && ast.type === 'FunctionDeclaration' && Object.getPrototypeOf(functionScope) === globalScope) {
          t = functionScope[S_STRICT];
          template = _espreeParse(t
            ? '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'fname\', \'#function\')[X_X_XcontextX_X_X[0]] = function fname() {}'
            : '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'fname\', \'function\')[X_X_XcontextX_X_X[0]] = function fname() {}',
            hookName, astPath[0][4]);
          template.expression.left.object.arguments[1].property.value = astPath[0][5](context);
          template.expression.left.object.arguments[1].__hooked__ = true;
          template.expression.left.object.arguments[2].value = ast.id.name;
          template.expression.left.object.__hooked__ = true;
          template.expression.left.object.callee.__hooked__ = true;
          if (t) {
            template.expression.left.property.property.value = astPath[0][5]('S' + _hookPrefix + ast.id.name + ';' + context);
          }
          else {
            template.expression.left.property.property.value = astPath[0][5](_hookPrefix + ast.id.name + ';' + context);
          }
          template.expression.left.property.__hooked__ = true;
          template.expression.left.__hooked__ = true;
          objectAssign(template.expression.right, ast);
          template.expression.right.type = 'FunctionExpression';
          template.expression.right.__hooked__ = true;
          template.expression.right.__moved__ = true;
          template.expression.__hooked__ = true;
          ast.id = undefined;
          ast.generator = undefined;
          ast.expression = undefined;
          ast.async = undefined;
          ast.params = undefined;
          ast.body = undefined;
          objectAssign(ast, template);
        }
      }
      break;
    case 'ArrowFunctionExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else {
        if (typeof ast.body === 'object' &&
            !Array.isArray(ast.body)) {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(ast.body.type === 'BlockStatement'
            ? '(...args) => _X_hookName_X_(p => { return p; }, null, args, X_X_XcontextX_X_X[0])'
            : ast.body.type === 'ObjectExpression'
              ? '(...args) => _X_hookName_X_(p => ({ p: p }), null, args, X_X_XcontextX_X_X[0])'
              : '(...args) => _X_hookName_X_(p => p, null, args, X_X_XcontextX_X_X[0])', hookName, astPath[0][4]).expression;
          f = template.body.arguments[0];
          template.body.arguments[3].property.value = astPath[0][5](context);
          template.body.arguments[3].__hooked__ = true;
          f.async = ast.async;
          f.params = ast.params;
          f.body = ast.body;
          f.__hooked__ = true;
          template.body.__hooked__ = true;
          template.body.callee.__hooked__ = true;
          let __iteration__ = false;
          PARAMS_FOR_LOOP:
          for (let i = 0; i < ast.params.length; i++) {
            switch (ast.params[i].type) {
            case 'ObjectPattern':
            case 'ArrayPattern':
              __iteration__ = true;
              break PARAMS_FOR_LOOP;
            default:
              break;
            }
          }
          if (__iteration__) {
            // replace args with args.map(arg => _X_hookName_X_('#*', arg, [], X_X_XcontextX_X_X[0]))
            template.body.arguments[2] = {
              "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "object": {
                  "type": "Identifier",
                  "name": "args",
                  "__hooked__": true
                },
                "property": {
                  "type": "Identifier",
                  "name": "map",
                  "__hooked__": true
                },
                "computed": false,
                "__hooked__": true
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "name": "arg",
                      "__hooked__": true
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Identifier",
                      "name": hookName,
                      "__hooked__": true
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "value": functionScope[S_STRICT] ? "#*" : "*",
                        "__hooked__": true
                      },
                      {
                        "type": "Identifier",
                        "name": "arg",
                        "__hooked__": true
                      },
                      {
                        "type": "ArrayExpression",
                        "elements": [],
                        "__hooked__": true
                      },
                      {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": template.body.arguments[3].object.name,
                          "__hooked__": true
                        },
                        "property": {
                          "type": "Literal",
                          "value": template.body.arguments[3].property.value,
                          "__hooked__": true
                        },
                        "computed": true,
                        "__hooked__": true
                      }
                    ],
                    "__hooked__": true
                  },
                  "__hooked__": true
                }
              ],
              "__hooked__": true
            };
          }
          ast.params = template.params;
          ast.body = template.body;
        }
      }
      break;
    case 'NewExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty) {
        if (hookWith && blockScope[hookWith]) {
          if (ast.callee.type === 'Identifier' && _isWithScoped(blockScope, ast.callee.name, hookWith)) {
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'wnew\', ' + hookWith + ', [\'p\', [], (...args) => new p(...args)], X_X_XcontextX_X_X[0], false)',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            params[0].value = ast.callee.name;
            params[1].elements = ast.arguments;
            params[2].body.callee.name = ast.callee.name;
            f.arguments[1].__hooked__ = true;
            params[2].params[0].__hooked__ = true;
            params[2].params[0].argument.__hooked__ = true;
            params[2].body.callee.__hooked__ = true;
            params[2].body.arguments[0].__hooked__ = true;
            params[2].body.arguments[0].argument.__hooked__ = true;
            params[2].body.__hooked__ = true;
            params[2].__hooked__ = true;
            params[2].$block$ = params[2].$function$ = Object.create(blockScope);
            params[2].$block$.args = true;
            if (_sourceMap) {
              f.callee.start = ast.callee.start;
              f.callee.end = ast.callee.end;
              f.callee.loc = ast.callee.loc;
              f.callee.range = ast.callee.range;
            }
            ast.callee = undefined;
            ast.arguments = undefined;
            objectAssign(ast, f);
          }
        }
        else {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse('_X_hookName_X_(ctor, null, [], X_X_XcontextX_X_X[0], true)', hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          f.arguments[0] = ast.callee;
          if (_hookGlobal && f.arguments[0].type === 'Identifier' && !blockScope[f.arguments[0].name]) {
            f.arguments[0].__global__ = 'get';
          }
          f.arguments[2].elements = ast.arguments;
          if (_sourceMap) {
            f.callee.start = ast.callee.start;
            f.callee.end = ast.callee.end;
            f.callee.loc = ast.callee.loc;
            f.callee.range = ast.callee.range;
          }
          ast.callee = undefined;
          ast.arguments = undefined;
          objectAssign(ast, f);
        }
      }
      break;
    case 'CallExpression':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (metaHooking &&
        ast.callee && ast.callee.type === 'Identifier' && (ast.callee.name === 'setTimeout' || ast.callee.name === 'setInterval') &&
        ast.arguments && ast.arguments[0] && ast.arguments[0].type !== 'FunctionExpression' && ast.arguments[0].type !== 'ArrowFunctionExpression') {
        context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        template = _espreeParse('$hook$.' + ast.callee.name + '(Symbol.for(\'_X_hookName_X_\'), [[\'X_X_XcontextX_X_X\', {}]], \'' + contextGeneratorName + '\')',
            hookName, context).expression;
        template.arguments[0].__hooked__ = true;
        template.arguments[0].callee.__hooked__ = true;
        template.callee.__hooked__ = true;
        template.__hooked__ = true;
        ast.callee = template;
      }
      else if (metaHooking && ast.callee && ast.callee.type === 'Identifier' && ast.callee.name === 'eval') {
        context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        template = _espreeParse('$hook$.' + ast.callee.name + '(Symbol.for(\'_X_hookName_X_\'), [[\'X_X_XcontextX_X_X\', {}]], \'' + contextGeneratorName + '\', {v:true})',
            hookName, context).expression;
        template.arguments[0].__hooked__ = true;
        template.arguments[0].callee.__hooked__ = true;
        wrapper = functionScope[S_STRICT]
          ? _espreeParse('(script, _eval) => _eval(script)', hookName, context).expression
          : _espreeParse('(script, eval) => eval(script)', hookName, context).expression;
        t = template.arguments[3].properties.pop();
        let nonGlobalScope = _nonGlobalScope(blockScope, globalScope);
        for (let v in nonGlobalScope) {
          item = _clone(t);
          item.key.name = v;
          template.arguments[3].properties.push(item);
        }
        if (functionScope[S_STRICT]) {
          item = _clone(t);
          item.key.name = '$use_strict$';
          template.arguments[3].properties.push(item);
        }
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        template.callee.__hooked__ = true;
        template.__hooked__ = true;
        ast.callee = template;
        if (ast.arguments.length === 1) {
          wrapper.__hooked__ = true;
          wrapper.body.__hooked__ = true;
          ast.arguments.push(wrapper);
        }
      }
      else if (_hookProperty && ast.callee && ast.callee.type === 'MemberExpression') {
        if (ast.callee.object.type === 'Super') {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(
            '_X_hookName_X_(\'s()\', this, [\'p\', [], p => super[p]], X_X_XcontextX_X_X[0])',
            hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          params = f.arguments[2].elements;
          if (ast.callee.computed) {
            params[0] = ast.callee.property;
          }
          else { // ast.callee.property.type === 'Identifier'
            params[0].value = ast.callee.property.name;
            params[0].raw = undefined;
          }
          params[1] = { 'type': 'ArrayExpression', 'elements': ast.arguments };
          params[2].__hooked__ = true;
          params[2].body.__hooked__ = true;
          params[2].$block$ = params[1].$function$ = Object.create(blockScope);
          params[2].$block$.p = true;
          if (_sourceMap) {
            f.callee.start = ast.callee.start;
            f.callee.end = ast.callee.end;
            f.callee.loc = ast.callee.loc;
            f.callee.range = ast.callee.range;
          }
          ast.callee = undefined;
          ast.arguments = undefined;
          objectAssign(ast, f);
        }
        else {
          if (hookWith && blockScope[hookWith]) {
            if (ast.callee.object.type === 'Identifier') {
              ast.callee.object.__with__ = 'get';
            }
          }
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(functionScope[S_STRICT]
            ? '_X_hookName_X_(\'#()\', o, [\'p\', args], X_X_XcontextX_X_X[0])'
            : '_X_hookName_X_(\'()\', o, [\'p\', args], X_X_XcontextX_X_X[0])',
            hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          params = f.arguments[2].elements;
          f.arguments[1] = ast.callee.object;
          if (_hookGlobal && f.arguments[1].type === 'Identifier' && !blockScope[f.arguments[1].name]) {
            f.arguments[1].__global__ = 'get';
          }
          if (ast.callee.computed) {
            params[0] = ast.callee.property;
          }
          else { // ast.callee.property.type === 'Identifier'
            params[0].value = ast.callee.property.name;
            params[0].raw = undefined;
          }
          params[1] = { 'type': 'ArrayExpression', 'elements': ast.arguments };
          if (_sourceMap) {
            f.callee.start = ast.callee.start;
            f.callee.end = ast.callee.end;
            f.callee.loc = ast.callee.loc;
            f.callee.range = ast.callee.range;
          }
          ast.callee = undefined;
          ast.arguments = undefined;
          objectAssign(ast, f);
        }
      }
      else if (_hookProperty) {
        if (ast.callee.type === 'Super') {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse('_X_hookName_X_((newTarget,...args) => super(...args), null, [], X_X_XcontextX_X_X[0], \'\')', hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          ast.arguments.unshift({ type: 'MetaProperty', meta: { type: 'Identifier', name: 'new'}, property: { type: 'Identifier', name: 'target' } });
          f.arguments[2].elements = ast.arguments;
          f.__hooked__ = true;
          f.callee.__hooked__ = true;
          f.arguments[0].__hooked__ = true;
          f.arguments[0].body.__hooked__ = true;
          f.arguments[0].body.callee.__hooked__ = true;
          if (_sourceMap) {
            f.callee.start = ast.callee.start;
            f.callee.end = ast.callee.end;
            f.callee.loc = ast.callee.loc;
            f.callee.range = ast.callee.range;
          }
          ast.callee = undefined;
          ast.arguments = undefined;
          objectAssign(ast, f);
        }
        else if (ast.callee.type === 'Import') {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse('_X_hookName_X_((Import,ImportSpecifier) => import(ImportSpecifier), null, [], X_X_XcontextX_X_X[0], NaN)', hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          ast.arguments.unshift({ type: 'Literal', value: 'import()' });
          f.arguments[2].elements = ast.arguments;
          f.__hooked__ = true;
          f.callee.__hooked__ = true;
          f.arguments[0].__hooked__ = true;
          f.arguments[0].body.__hooked__ = true;
          f.arguments[0].body.callee.__hooked__ = true;
          if (_sourceMap) {
            f.callee.start = ast.callee.start;
            f.callee.end = ast.callee.end;
            f.callee.loc = ast.callee.loc;
            f.callee.range = ast.callee.range;
          }
          ast.callee = undefined;
          ast.arguments = undefined;
          objectAssign(ast, f);
        }
        else {
          let isInitialImportScripts = ast.callee.name === 'importScripts' &&
            ast.arguments[0] && ast.arguments[0].type === 'Literal' &&
            typeof ast.arguments[0].value === 'string' && ast.arguments[0].value.indexOf('/hook.min.js?') >= 0;
          if (isInitialImportScripts) {
            for (let i = 0; i < ast.arguments.length; i++) {
              if (ast.arguments[i].type === 'Literal' && typeof ast.arguments[i].value === 'string' &&
                ast.arguments[i].value.trim().match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?$/)) {
                // valid script URL
              }
              else {
                // invalid script URL
                ast.arguments[i].type = 'Literal';
                ast.arguments[i].value = '!!! invalid url !!!';
              }
            }
          }
          else {
            if (hookWith && blockScope[hookWith]) {
              if (ast.callee.type === 'Identifier' && _isWithScoped(blockScope, ast.callee.name, hookWith)) {
                context = contextGenerator(astPath).replace(/\'/g, '\\\'');
                template = _espreeParse(
                  '_X_hookName_X_(\'w()\', ' + hookWith + ', [\'p\', [], (...args) => p(...args)], X_X_XcontextX_X_X[0], false)',
                  hookName, astPath[0][4]);
                f = template.expression;
                f.arguments[3].property.value = astPath[0][5](context);
                f.arguments[3].__hooked__ = true;
                params = f.arguments[2].elements;
                params[0].value = ast.callee.name;
                params[1].elements = ast.arguments;
                f.arguments[1].__hooked__ = true;
                params[2].body.callee.name = ast.callee.name;
                params[2].body.callee.__hooked__ = true;
                params[2].params[0].__hooked__ = true;
                params[2].params[0].argument.__hooked__ = true;
                params[2].body.arguments[0].__hooked__ = true;
                params[2].body.arguments[0].argument.__hooked__ = true;
                params[2].body.__hooked__ = true;
                params[2].__hooked__ = true;
                params[2].$block$ = params[2].$function$ = Object.create(blockScope);
                params[2].$block$.args = true;
                if (_sourceMap) {
                  f.callee.start = ast.callee.start;
                  f.callee.end = ast.callee.end;
                  f.callee.loc = ast.callee.loc;
                  f.callee.range = ast.callee.range;
                }
                ast.callee = undefined;
                ast.arguments = undefined;
                objectAssign(ast, f);
              }
            }
            else if (ast.callee.name === 'require' && Reflect.has(blockScope, 'require') && ast.arguments[0] && ast.arguments[0].type === 'Literal') {
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              let targetContext = ast.arguments[0].value;
              let targetContextIndex = context.indexOf('|');
              if (targetContextIndex > 0) {
                targetContext = context.substring(targetContextIndex + 1);
                context = context.substring(0, targetContextIndex);
              }
              template = _espreeParse('_X_hookName_X_(() => require(\'module.js\'), null, [], X_X_XcontextX_X_X[0], NaN)', hookName, astPath[0][4]);
              f = template.expression;
              f.arguments[3].property.value = astPath[0][5](context);
              f.arguments[3].__hooked__ = true;
              f.arguments[0].body.arguments[0].value = ast.arguments[0].value;
              ast.arguments.unshift({ type: 'Literal', value: 'require' });
              ast.arguments[2] = { type: 'Literal', value: targetContext };
              f.arguments[2].elements = ast.arguments;
              f.__hooked__ = true;
              f.callee.__hooked__ = true;
              f.arguments[0].__hooked__ = true;
              f.arguments[0].body.__hooked__ = true;
              f.arguments[0].body.callee.__hooked__ = true;
              if (_sourceMap) {
                f.callee.start = ast.callee.start;
                f.callee.end = ast.callee.end;
                f.callee.loc = ast.callee.loc;
                f.callee.range = ast.callee.range;
              }
              ast.callee = undefined;
              ast.arguments = undefined;
              objectAssign(ast, f);
            }
            else {
              context = contextGenerator(astPath).replace(/\'/g, '\\\'');
              template = _espreeParse('_X_hookName_X_(f, null, [], X_X_XcontextX_X_X[0], 0)', hookName, astPath[0][4]);
              f = template.expression;
              f.arguments[3].property.value = astPath[0][5](context);
              f.arguments[3].__hooked__ = true;
              f.arguments[0] = ast.callee;
              if (_hookGlobal && f.arguments[0].type === 'Identifier' && !blockScope[f.arguments[0].name]) {
                f.arguments[0].__global__ = 'get';
              }
              f.arguments[2].elements = ast.arguments;
              f.__hooked__ = true;
              f.callee.__hooked__ = true;
              if (_sourceMap) {
                f.callee.start = ast.callee.start;
                f.callee.end = ast.callee.end;
                f.callee.loc = ast.callee.loc;
                f.callee.range = ast.callee.range;
              }
              ast.callee = undefined;
              ast.arguments = undefined;
              objectAssign(ast, f);
            }
          }
        }
      }
      break;
    case 'MetaProperty':
      // patch espree-generated AST to be compatible with that from esprima
      ast.meta = ast.meta.name;
      ast.property = ast.property.name;
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else {
        if (ast.meta === 'import' && ast.property === 'meta') {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse('_X_hookName_X_(() => import.meta, null, [\'import.meta\'], X_X_XcontextX_X_X[0], NaN)', hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          f.__hooked__ = true;
          f.callee.__hooked__ = true;
          f.arguments[0].__hooked__ = true;
          f.arguments[0].body.__hooked__ = true;
          if (_sourceMap) {
            f.callee.start = ast.start;
            f.callee.end = ast.end;
            f.callee.loc = ast.loc;
            f.callee.range = ast.range;
          }
          ast.meta = undefined;
          ast.property = undefined;
          objectAssign(ast, f);
        }
      }
      break;
    case 'Identifier':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty) {
        if (ast.__with__) {
          switch (ast.__with__) {
          case 'get':
            if (!_isWithScoped(blockScope, ast.name, hookWith)) {
              break;
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'w.\', ' + hookWith + ', [\'p\', () => p], X_X_XcontextX_X_X[0], false)',
              hookName, astPath[0][4]);
            f = template.expression;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            params[0].value = ast.name;
            params[0].raw = undefined;
            params[1].body.name = ast.name;
            params[1].body.__hooked__ = true;
            params[1].__hooked__ = true;
            params[1].$block$ = params[1].$function$ = Object.create(blockScope);
            f.arguments[1].__hooked__ = true;
            f.__hooked__ = true;
            if (_sourceMap) {
              params[0].start = ast.start;
              params[0].end = ast.end;
              f.callee.start = ast.start;
              f.callee.end = ast.end;
              f.callee.loc = ast.loc;
              f.callee.range = ast.range;
            }
            ast.name = undefined;
            ast.__with__ = undefined;
            objectAssign(ast, f);
            break;
          case 'set':
            if (!_isWithScoped(blockScope, ast.name, hookWith)) {
              break;
            }
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(
              '_X_hookName_X_(\'w.=\', ' + hookWith + ', [\'p\', { set [\'=\'](v) { p = v; }, get [\'=\']() { return p; } }], X_X_XcontextX_X_X[0], false)[\'=\']',
              hookName, astPath[0][4]);
            f = template.expression.object;
            f.arguments[3].property.value = astPath[0][5](context);
            f.arguments[3].__hooked__ = true;
            params = f.arguments[2].elements;
            params[0].value = ast.name;
            params[0].raw = undefined;
            params[1].properties[0].value.body.body[0].expression.left.name = ast.name;
            params[1].properties[0].value.body.body[0].expression.left.__hooked__ = true;
            params[1].properties[0].value.body.body[0].expression.right.__hooked__ = true;
            params[1].properties[0].value.body.body[0].expression.__hooked__ = true;
            params[1].properties[0].value.params[0].__hooked__ = true;
            params[1].properties[0].value.__hooked__ = true;
            params[1].properties[0].value.$block$ = params[1].properties[0].value.$function$ = Object.create(blockScope);
            params[1].properties[0].value.$block$.v = true;
            params[1].properties[1].value.body.body[0].argument.name = ast.name;
            params[1].properties[1].value.body.body[0].argument.__hooked__ = true;
            params[1].properties[1].value.__hooked__ = true;
            params[1].properties[1].value.$block$ = params[1].properties[1].value.$function$ = Object.create(blockScope);
            params[1].__hooked__ = true;
            template.expression.__hooked__ = true;
            template.expression.object.__hooked__ = true;
            if (_sourceMap) {
              params[0].start = ast.start;
              params[0].end = ast.end;
              f.callee.start = ast.start;
              f.callee.end = ast.end;
              f.callee.loc = ast.loc;
              f.callee.range = ast.range;
            }
            ast.name = undefined;
            ast.__with__ = undefined;
            objectAssign(ast, template.expression);
            break;
          default:
            ast.__with__ = undefined;
            break;
          }
        }
        else if (_hookGlobal && ast.__global__ && ast.name && !blockScope[ast.name]) {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          t = functionScope[S_STRICT];
          template = _espreeParse(t
            ? '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'#var\')[X_X_XcontextX_X_X[0]]'
            : '$hook$.global(_X_hookName_X_, X_X_XcontextX_X_X[0], \'name\', \'var\')[X_X_XcontextX_X_X[0]]',
            hookName, astPath[0][4]);
          template.expression.object.arguments[1].property.value = astPath[0][5](context);
          template.expression.object.arguments[1].__hooked__ = true;
          template.expression.object.arguments[2].value = ast.name;
          template.expression.object.arguments[3].value = t ? '#' + ast.__global__ : ast.__global__;
          template.expression.object.__hooked__ = true;
          template.expression.object.callee.__hooked__ = true;
          template.expression.object.callee.object.__hooked__ = true;
          template.expression.object.callee.property.__hooked__ = true;
          template.expression.property.property.value = astPath[0][5](t ? 'S' + _hookPrefix + ast.name + ';' + context : _hookPrefix + ast.name + ';' + context);
          template.expression.property.__hooked__ = true;
          template.expression.__hooked__ = true;
          ast.name = undefined;
          ast.__global__ = undefined;
          objectAssign(ast, template.expression);
        }
      }
      break;
    case 'ArrayPattern':
      if (_hookProperty) {
        for (index = 0, l = ast.elements.length; index < l; index++) {
          if (ast.elements[index]) {
            switch (ast.elements[index].type) {
            case 'Identifier':
            case 'AssignmentPattern':
            case 'ArrayPattern':
            case 'ObjectPattern':
            case 'RestElement':
            case 'MemberExpression':
              if (ast.__LHS__) {
                ast.elements[index].__LHS__ = ast.__LHS__;
              }
              if (hookWith && ast.__with__) {
                ast.elements[index].__with__ = ast.__with__;
              }
              if (_hookGlobal && ast.__global__) {
                ast.elements[index].__global__ = ast.__global__;
              }
              break;
            default:
              console.error(ast.type + ': Unknown Element Type ' + ast.elements[index].type);
              break;
            }
          }
        }
        ast.__LHS__ = undefined;
        ast.__with__ = undefined;
        ast.__global__ = undefined;
      }
      break;
    case 'ArrayExpression':
      if (_hookProperty) {
        if (hookWith && blockScope[hookWith]) {
          for (index = 0, l = ast.elements.length; index < l; index++) {
            if (ast.elements[index] && ast.elements[index].type === 'Identifier') {
              ast.elements[index].__with__ = 'get';
            }
            else if (ast.elements[index] && ast.elements[index].type === 'SpreadElement') {
              ast.elements[index].__with__ = 'get';
            }
          }
        }
        else if (_hookGlobal) {
          for (index = 0, l = ast.elements.length; index < l; index++) {
            if (ast.elements[index] && ast.elements[index].type === 'Identifier' && !blockScope[ast.elements[index].name]) {
              ast.elements[index].__global__ = 'get';
            }
            else if (ast.elements[index] && ast.elements[index].type === 'SpreadElement') {
              ast.elements[index].__global__ = 'get';
            }
          }
        }
      }
      break;
    case 'RestElement':
      if (_hookProperty) {
        if (ast.__LHS__) {
          ast.argument.__LHS__ = ast.__LHS__;
          ast.__LHS__ = undefined;
        }
        if (hookWith && ast.__with__) {
          if (ast.argument) {
            ast.argument.__with__ = ast.__with__;
          }
        }
        else if (_hookGlobal && ast.__global__) {
          if (ast.argument) {
            ast.argument.__global__ = ast.__global__;
          }
        }
        ast.__with__ = undefined;
        ast.__global__ = undefined;
      }
      break;
    case 'SpreadElement':
      if (_hookProperty) {
        if (hookWith && ast.__with__) {
          if (ast.argument) {
            ast.argument.__with__ = ast.__with__;
          }
        }
        else if (_hookGlobal && ast.__global__) {
          if (ast.argument) {
            ast.argument.__global__ = ast.__global__;
          }
        }
        ast.__with__ = undefined;
        ast.__global__ = undefined;
      }
      break;
    case 'ObjectPattern':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty) {
        for (index = 0, l = ast.properties.length; index < ast.properties.length; index++) {
          if (ast.properties[index]) {
            if (ast.properties[index].value) {
              switch (ast.properties[index].value.type) {
              case 'Identifier':
              case 'AssignmentPattern':
              case 'ArrayPattern':
              case 'ObjectPattern':
              case 'MemberExpression':
                if (ast.properties[index].shorthand && ast.properties[index].value.type === 'Identifier') {
                  if ((hookWith && ast.__with__) ||
                      (_hookGlobal && ast.__global__ && !blockScope[ast.properties[index].value.name])) {
                    ast.properties[index].shorthand = false;
                    ast.properties[index].key = _clone(ast.properties[index].key);
                  }
                }
                if (ast.__LHS__) {
                  ast.properties[index].value.__LHS__ = ast.__LHS__;
                }
                if (hookWith && ast.__with__) {
                  ast.properties[index].value.__with__ = ast.__with__;
                }
                if (_hookGlobal && ast.__global__) {
                  ast.properties[index].value.__global__ = ast.__global__;
                }
                break;
              default:
                console.error(type + ': Unknown Property Type ' + ast.properties[index].type);
                break;
              }
            }
            else if (ast.properties[index].argument && ast.properties[index].type === 'ExperimentalRestProperty') {
              ast.properties[index].__LHS__ = ast.__LHS__;
              ast.properties[index].__with__ = ast.__with__;
              ast.properties[index].__global__ = ast.__global__;
            }
          }
        }
        ast.__LHS__ = undefined;
        ast.__with__ = undefined;
        ast.__global__ = undefined;
      }
      break;
    case 'Property':
      if (_hookProperty) {
        if (ast.computed && ast.key && ast.key.type === 'Identifier' && ast.key.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.key.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.key.name]) {
            ast.key.__global__ = 'get';
          }
        }
        if (ast.value && ast.value.type === 'Identifier' && ast.value.name) {
          if (!ast.value.__with__ && !ast.value.__global__ && !ast.value.__LHS__) {
            if (hookWith && blockScope[hookWith]) {
              if (ast.shorthand) {
                ast.key = _clone(ast.key);
                ast.shorthand = false;
              }
              ast.value.__with__ = 'get';
            }
            else if (_hookGlobal && !blockScope[ast.key.name]) {
              if (ast.shorthand) {
                ast.key = _clone(ast.key);
                ast.shorthand = false;
              }
              ast.value.__global__ = 'get';
            }
          }
        }
      }
      break;
    case 'ExperimentalSpreadProperty':
      if (_hookProperty) {
        if (ast.argument && ast.argument.type === 'Identifier' && ast.argument.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.argument.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.argument.name]) {
            ast.argument.__global__ = 'get';
          }
        }
        context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        template = _espreeParse(functionScope[S_STRICT]
          ? '_X_hookName_X_(\'#*\', o, [], X_X_XcontextX_X_X[0])'
          : '_X_hookName_X_(\'*\', o, [], X_X_XcontextX_X_X[0])',
          hookName, astPath[0][4]);
        f = template.expression;
        f.arguments[3].property.value = astPath[0][5](context);
        f.arguments[3].__hooked__ = true;
        f.arguments[1] = ast.argument;
        f.callee.__hooked__ = true;
        f.__hooked__ = true;
        ast.argument = f;
      }
      break;
    case 'ExperimentalRestProperty':
      if (_hookProperty) {
        if (ast.__LHS__) {
          ast.argument.__LHS__ = ast.__LHS__;
          ast.__LHS__ = undefined;
        }
        if (hookWith && ast.__with__) {
          if (ast.argument) {
            ast.argument.__with__ = ast.__with__;
          }
        }
        else if (_hookGlobal && ast.__global__) {
          if (ast.argument) {
            ast.argument.__global__ = ast.__global__;
          }
        }
        ast.__with__ = undefined;
        ast.__global__ = undefined;
      }
      break;
    case 'AssignmentPattern':
      if (_hookProperty) {
        if (ast.__LHS__) {
          ast.left.__LHS__ = ast.__LHS__;
          ast.__LHS__ = undefined;
        }
        if (hookName && ast.__with__) {
          ast.left.__with__ = ast.__with__;
        }
        else if (_hookGlobal && ast.__global__) {
          ast.left.__global__ = ast.__global__;
        }
        ast.__with__ = undefined;
        ast.__global__ = undefined;
        if (ast.right && ast.right.type === 'Identifier' && ast.right.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.right.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.right.name]) {
            ast.right.__global__ = 'get';
          }
        }
      }
      break;
    case 'ExpressionStatement':
      if (_hookProperty) {
        if (ast.expression && ast.expression.type === 'Identifier' && ast.expression.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.expression.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.expression.name]) {
            ast.expression.__global__ = 'get';
          }
        }
      }
      break;
    case 'BinaryExpression':
      if (_hookProperty) {
        if (ast.left && ast.left.type === 'Identifier' && ast.left.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.left.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.left.name]) {
            ast.left.__global__ = 'get';
          }
        }
        if (ast.right && ast.right.type === 'Identifier' && ast.right.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.right.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.right.name]) {
            ast.right.__global__ = 'get';
          }
        }
        if (ast.operator === 'in') {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(functionScope[S_STRICT]
            ? '_X_hookName_X_(\'#in\', o, [\'p\'], X_X_XcontextX_X_X[0])'
            : '_X_hookName_X_(\'in\', o, [\'p\'], X_X_XcontextX_X_X[0])',
            hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          params = f.arguments[2].elements;
          f.arguments[1] = ast.right;
          params[0] = ast.left;
          f.callee.__hooked__ = true;
          f.__hooked__ = true;
          ast.left = undefined;
          ast.right = undefined;
          ast.op = undefined;
          objectAssign(ast, f);
        }
      }
      break;
    case 'LogicalExpression':
      if (_hookProperty) {
        if (ast.left && ast.left.type === 'Identifier' && ast.left.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.left.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.left.name]) {
            ast.left.__global__ = 'get';
          }
        }
        if (ast.right && ast.right.type === 'Identifier' && ast.right.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.right.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.right.name]) {
            ast.right.__global__ = 'get';
          }
        }
      }
      break;
    case 'ConditionalExpression':
      if (_hookProperty) {
        if (ast.test && ast.test.type === 'Identifier' && ast.test.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.test.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.test.name]) {
            ast.test.__global__ = 'get';
          }
        }
        if (ast.consequent && ast.consequent.type === 'Identifier' && ast.consequent.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.consequent.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.consequent.name]) {
            ast.consequent.__global__ = 'get';
          }
        }
        if (ast.alternate && ast.alternate.type === 'Identifier' && ast.alternate.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.alternate.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.alternate.name]) {
            ast.alternate.__global__ = 'get';
          }
        }
      }
      break;
    case 'IfStatement':
    case 'DoWhileStatement':
    case 'WhileStatement':
      if (_hookProperty) {
        if (ast.test && ast.test.type === 'Identifier' && ast.test.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.test.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.test.name]) {
            ast.test.__global__ = 'get';
          }
        }
      }
      break;
    case 'ImportDeclaration':
    case 'ExportAllDeclaration':
      if (ast.source &&
        (ast.source.type !== 'Literal' || typeof ast.source.value !== 'string' ||
        !ast.source.value.match(/^\s*(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?\s*$/))) {
        ast.source.type = 'Literal';
        ast.source.value = '!!! invalid script url !!!';
      }
      break;
    case 'ExportNamedDeclaration':
      if (ast.source) {
        for (index = 0; index < ast.specifiers.length; index++) {
          if (ast.specifiers[index]) {
            ast.specifiers[index].__hooked__ = true;
          }
        }
        if (ast.source.type !== 'Literal' || typeof ast.source.value !== 'string' ||
          !ast.source.value.match(/^\s*(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*[.]m?js)(\?([^#]*))?(#(.*))?\s*$/)) {
          ast.source.type = 'Literal';
          ast.source.value = '!!! invalid script url !!!';
        }
      }
      break;
    case 'ExportDefaultDeclaration':
      if (_hookProperty) {
        if (ast.declaration && ast.declaration.type === 'Identifier' && ast.declaration.name) {
          if (_hookGlobal && !blockScope[ast.declaration.name]) {
            ast.declaration.__global__ = 'get';
          }
        }
      }
      break;
    case 'ExportSpecifier':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty && _hookGlobal) {
        if (ast.local && ast.local.type === 'Identifier' && ast.local.name && !blockScope[ast.local.name]) {
          console.warn('hook: unexpected export of global variable ' + ast.local.name + ' is replaced with undefined');
          ast.local.name = 'undefined'; // this is a totally unexpected export of a global variable
        }
      }
      break;
    case 'ForStatement':
      if (_hookProperty) {
        if (ast.init) {
          switch (ast.init.type) {
          case 'Identifier':
            if (ast.init.name) {
              if (hookWith && blockScope[hookWith]) {
                ast.init.__with__ = 'get';
              }
              else if (_hookGlobal && !blockScope[ast.init.name]) {
                ast.init.__global__ = 'get';
              }
            }
            break;
          case 'VariableDeclaration':
            if (_hookGlobal) {
              ast.init.__for__ = true;
            }
            break;
          default:
            break;
          }
        }
        if (ast.test && ast.test.type === 'Identifier' && ast.test.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.test.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.test.name]) {
            ast.test.__global__ = 'get';
          }
        }
        if (ast.update && ast.update.type === 'Identifier' && ast.update.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.update.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.update.name]) {
            ast.update.__global__ = 'get';
          }
        }
      }
      break;
    case 'ForInStatement':
    case 'ForOfStatement':
      if (ast.__hooked__) {
        ast.__hooked__ = undefined;
      }
      else if (_hookProperty) {
        if (ast.left) {
          switch (ast.left.type) {
          case 'Identifier':
            if (ast.left.name) {
              if (hookWith && blockScope[hookWith]) {
                ast.left.__with__ = 'set';
              }
              else if (_hookGlobal && !blockScope[ast.left.name]) {
                ast.left.__global__ = 'set';
              }
            }
            break;
          case 'ArrayPattern':
          case 'ObjectPattern':
            if (hookWith && blockScope[hookWith]) {
              ast.left.__with__ = 'set';
            }
            else if (_hookGlobal && globalScope === functionScope) {
              ast.left.__global__ = 'set';
              ast.left.__for__ = true;
            }
            ast.left.__LHS__ = true;
            break;
          case 'VariableDeclaration':
            if (_hookGlobal) {
              ast.left.__for__ = true;
            }
            break;
          default:
            break;
          }
        }
        if (ast.right && ast.right.type === 'Identifier' && ast.right.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.right.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.right.name]) {
            ast.right.__global__ = 'get';
          }
        }
        if (ast.right) {
          context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          template = _espreeParse(functionScope[S_STRICT]
            ? '_X_hookName_X_(\'#*\', o, [], X_X_XcontextX_X_X[0])'
            : '_X_hookName_X_(\'*\', o, [], X_X_XcontextX_X_X[0])',
            hookName, astPath[0][4]);
          f = template.expression;
          f.arguments[3].property.value = astPath[0][5](context);
          f.arguments[3].__hooked__ = true;
          f.arguments[1] = ast.right;
          f.callee.__hooked__ = true;
          f.__hooked__ = true;
          ast.right = f;
        }
      }
      break;
    case 'SwitchStatement':
      if (_hookProperty) {
        if (ast.discriminant && ast.discriminant.type === 'Identifier' && ast.discriminant.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.discriminant.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.discriminant.name]) {
            ast.discriminant.__global__ = 'get';
          }
        }
      }
      break;
    case 'SwitchCase':
      if (_hookProperty) {
        if (ast.test && ast.test.type === 'Identifier' && ast.test.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.test.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.test.name]) {
            ast.test.__global__ = 'get';
          }
        }
      }
      if (_sourceMap) {
        ast.start = undefined;
        ast.end = undefined;
        ast.loc = undefined;
        ast.range = undefined;
      }
      break;
    case 'TaggedTemplateExpression':
      if (_hookProperty) {
        if (ast.tag && ast.tag.type === 'Identifier' && ast.tag.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.tag.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.tag.name]) {
            ast.tag.__global__ = 'get';
          }
        }
      }
      break;
    case 'SequenceExpression':
    case 'TemplateLiteral':
      if (_hookProperty) {
        for (index = 0, l = ast.expressions.length; index < l; index++) {
          if (ast.expressions[index] && !ast.expressions[index].__global__ && ast.expressions[index].type === 'Identifier') {
            if (hookWith && blockScope[hookWith]) {
              ast.expressions[index].__with__ = 'get';
            }
            else if (_hookGlobal && !blockScope[ast.expressions[index].name]) {
              ast.expressions[index].__global__ = 'get';
            }
          }
        }
      }
      break;
    case 'AwaitExpression':
    case 'ReturnStatement':
    case 'ThrowStatement':
    case 'YieldExpression':
      if (_hookProperty) {
        if (ast.argument && ast.argument.type === 'Identifier' && ast.argument.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.argument.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.argument.name]) {
            ast.argument.__global__ = 'get';
          }
        }
      }
      break;
    case 'WithStatement':
      if (_hookProperty) {
        if (ast.object && ast.object.type === 'Identifier' && ast.object.name) {
          if (hookWith && blockScope[hookWith]) {
            ast.object.__with__ = 'get';
          }
          else if (_hookGlobal && !blockScope[ast.object.name]) {
            ast.object.__global__ = 'get';
          }
        }
        if (hookWith) {
          if (ast.object) {
            let outerScope = _nonGlobalWithScope(blockScope, globalScope, hookWith);
            //console.log(JSON.stringify(outerScope, null, 2));
            context = contextGenerator(astPath).replace(/\'/g, '\\\'');
            template = _espreeParse(outerScope[hookWith]
              ? '$hook$.with(obj, { v: true }, ...' + hookWith + ')'
              : '$hook$.with(obj, { v: true })',
              hookName, context);
            f = template.expression;
            f.arguments[0] = ast.object;
            delete outerScope[hookWith];
            t = f.arguments[1].properties.shift();
            for (let v in outerScope) {
              item = _clone(t);
              item.key.name = v;
              f.arguments[1].properties.push(item);
            }
            f.callee.__hooked__ = true;
            f.__hooked__ = true;
            ast.object = f;
          }
        }
      }
      break;
    case 'BlockStatement':
      if (_sourceMap) {
        ast.start = undefined;
        ast.end = undefined;
        ast.loc = undefined;
        ast.range = undefined;
      }
      break;
    case 'Program':
      context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let mapName;
      if (astPath[0][1].random) {
        let random = new Uint32Array(8);
        _crypto = _crypto || crypto;
        _crypto.getRandomValues(random);
        mapName = '__';
        for (var i = 0; i < random.length; i++) {
          mapName += random[i].toString(16).padStart(8, '0')
        }
        mapName += '__';
      }
      else if (astPath[0][1].static && typeof astPath[0][1].static === 'string') {
        mapName = astPath[0][1].static;
      }
      else {
        const hash = createHash('sha256');
        hash.update(context + ast.__code__);
        mapName = '__' + hash.digest('hex') + '__';
      }
      let spliceIndex = 0;
      blockScope[mapName] = true;
      f = _espreeParse('const X_X_XcontextX_X_X = $hook$.$(_X_hookName_X_, []);', hookName, mapName);
      {
        astPath[0][4] = mapName;
        const map = new _Map(); // context -> index
        const contexts = f.declarations[0].init.arguments[1].elements; // index -> context
        astPath[0][5] = function getContextIndex(context) {
          let idx;
          if (map.has(context)) {
            idx = map.get(context);
          }
          else {
            idx = contexts.length;
            contexts[idx] = { type: 'Literal', value: context };
            map.set(context, idx);
          }
          return idx;
        };
      }
      f.__hooked__ = true;
      f.declarations[0].__hooked__ = true;
      f.declarations[0].init.__hooked__ = true;
      f.declarations[0].init.callee.__hooked__ = true;
      f.declarations[0].init.arguments[0].__hooked__ = true;
      if (Array.isArray(ast.body) &&
        ast.body.length > 0 &&
        (item = ast.body[0]) &&
        typeof item === 'object' && Reflect.has(item, 'type') &&
        item.type === 'ExpressionStatement' &&
        item.expression && item.expression.type === 'Literal' &&
        item.expression.value === 'use strict') {
        spliceIndex = 1;
      }
      else {
        spliceIndex = 0;
      }
      if ((item = ast.body[spliceIndex]) &&
        typeof item === 'object' && Reflect.has(item, 'type') &&
        item.type === 'ExpressionStatement' &&
        item.expression && item.expression.type === 'CallExpression' && 
        item.expression.callee.type === 'Identifier' && item.expression.callee.name === 'importScripts') {
        spliceIndex++;
      }
      if (ast.body.length > 0) {
        ast.body.splice(spliceIndex, 0, f);
      }
      break;
    default:
      break;
    }
    if (!__hooked__) {
      if (ast.__iteration__) {
        //console.log('__iteration__ over ', ast.type);
        ast.__iteration__ = undefined;
        context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        template = _espreeParse(functionScope[S_STRICT]
          ? '_X_hookName_X_(\'#*\', o, [], X_X_XcontextX_X_X[0])'
          : '_X_hookName_X_(\'*\', o, [], X_X_XcontextX_X_X[0])',
          hookName, astPath[0][4]);
        f = template.expression;
        f.arguments[3].property.value = astPath[0][5](context);
        f.arguments[3].__hooked__ = true;
        f.arguments[1] = objectAssign({}, ast);
        f.arguments[1].__hooked__ = true;
        f.callee.__hooked__ = true;
        f.__hooked__ = true;
        for (let p in ast) {
          ast[p] = undefined;
        }
        objectAssign(ast, f);
      }
    }
    for (target in ast) {
      if (scopes[target]) {
        continue;
      }
      child = ast[target];
      if (child) {
        astPath.push([target, child]);
        if (Array.isArray(child)) {
          for (t = child, index = 0, l = t.length; index < l; index++) {
            item = t[index];
            if (item && typeof item === 'object' && typeof item.type === 'string') {
              astPath.push([index, item]);
              _preprocess(item, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap, _hookGlobal, _hookPrefix, hookWith, blockScope, functionScope, globalScope, globalObjectScope, globalClassScope);
              astPath.pop();
            }
          }
        }
        else if (typeof child === 'object' && typeof child.type === 'string') {
          _preprocess(child, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap, _hookGlobal, _hookPrefix, hookWith, blockScope, functionScope, globalScope, globalObjectScope, globalClassScope);
        }
        astPath.pop();
      }
    }
  }

  function _validateNoHookScript(script, url, isContextGeneratorValidation = false) {
    let hash = createHash('sha256');
    hash.update(script);
    let ticket = hash.digest('hex');
    hook.parameters.noHookAuthorizationPassed = hook.parameters.noHookAuthorizationPassed || {};
    if (hook.parameters.noHookAuthorizationPreValidated ||
        (hook.parameters.noHookAuthorization &&
        !hook.parameters.noHookAuthorization['*'])) {
      if ((!hook.parameters.noHookAuthorization || (hook.parameters.noHookAuthorization && !hook.parameters.noHookAuthorization[ticket])) &&
          ((hook.parameters.noHookAuthorization && !hook.parameters.noHookAuthorizationPreValidated) ||
           (hook.parameters.noHookAuthorizationPreValidated && !hook.parameters.noHookAuthorizationPreValidated[ticket]))) {
        if (hook.parameters.noHookAuthorization || isContextGeneratorValidation) {
          console.error('invalidate no-hook for ' + url.href + ' ticket = ' + ticket, script);
          hook.parameters.noHookAuthorizationFailed = hook.parameters.noHookAuthorizationFailed || {};
          hook.parameters.noHookAuthorizationFailed[ticket] = true;
          console.error('hook.parameters.noHookAuthorizationFailed = ', JSON.stringify(hook.parameters.noHookAuthorizationFailed, null, 2));
        }
        script = '/* invalidated unauthorized no-hook script */';
      }
      else if (hook.parameters.noHookAuthorizationPreValidated && hook.parameters.noHookAuthorizationPreValidated['log-no-hook-authorization']) {
        console.log('validate no-hook for ' + url.href + ' ticket = ' + ticket, script.substr(0, 100));
      }
    }
    else {
      hook.parameters.noHookAuthorizationPassed[ticket] = true;
      if (hook.parameters.noHookAuthorization &&
          hook.parameters.noHookAuthorization['*']) {
        console.warn('no hooking ticket for ' + url.href + ' = ' + ticket, script.substr(0, 100));
        console.warn('hook.parameters.noHookAuthorizationPassed = ', JSON.stringify(hook.parameters.noHookAuthorizationPassed, null, 2));
      }
    }
    return script;
  }


  /*
    inlineScript:
      when hooked: String: "/* ctx:"XXX" raw:"atob(a.b = 1)" ASTERISK/__hook__('.=', a, ['b', 1], ctx)"
      when raw: String: "a.b = 1"
    return: { isHooked: Boolean, raw: String, hooked: String, embeddedRaw: String }
      { isHooked: true, isValidated: true, raw: "a.b = 1", hooked: "__hook__('.=', a, ['b', 1], ctx)", ctx: "XXX", embeddedRaw: '/* ctx:"XXX" raw:"atob(a.b = 1)" ASTERISK/' }
      { isHooked: false, isValidated: false, raw: "a.b = 1", hooked: null, ctx: null, embeddedRaw: null }

    Note:
      - isHooked is false if hook.parameters.scriptHashes is not defined
   */
  function _getScriptHashes() {
    return hook.parameters.scriptHashes;
  }
  function _parseHookedInlineScript(inlineScript) {
    let scriptHashes = _getScriptHashes();
    if (!scriptHashes) {
      return {
        isHooked: false,
        isValidated: false,
        raw: inlineScript,
        hooked: null,
        ctx: null,
        embeddedRaw: null
      };
    }
    let match = inlineScript.match(/^\/\* ctx:(["'])([a-zA-Z0-9+/=]*)["'] raw:["']([a-zA-Z0-9+/=]*)["'] \*\/((.*\n?)*)$/);
    if (match) {
      let isValidated = false;
      let ctx = decodeURIComponent(atob(match[2]));
      const hash = hook.utils.createHash('sha256');
      hash.update(inlineScript);
      let digest = hash.digest('hex');
      if (scriptHashes[digest] === ctx) {
        isValidated = true;
      }
      return {
        isHooked: true,
        isValidated: isValidated,
        raw: decodeURIComponent(atob(match[3])),
        hooked: match[4],
        ctx: ctx,
        embeddedRaw: `/* ctx:${match[1]}${match[2]}${match[1]} raw:${match[1]}${match[3]}${match[1]} */`
      };
    }
    else {
      return {
        isHooked: false,
        isValidated: false,
        raw: inlineScript,
        hooked: null,
        ctx: null,
        embeddedRaw: null
      };
    }
  }

  function _preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking = true, scriptOffset = 0, _hookProperty = true, asynchronous = false, isSrcdoc = false) {
    if (asynchronous) {
      let worker = getBestHookWorker();
      if (worker) {
        return new Promise(function (resolve, reject) {
          let id = getHookId(html);
          let size = html.length;
          if (url instanceof URL) {
            url = url.href;
          }
          worker.tasks[id] = { status: 'requesting' };
          worker.taskQueueSize += size;
          worker.tasks[id].callback = function callback(task) {
            delete worker.tasks[id];
            worker.taskQueueSize -= size;
            if (task.status === 'success') {
              //console.log('callback task ' + id + ' success', task);
              resolve(task.result);
            }
            else {
              reject(task.error);
            }
          };
          let message = [ id, 'text/html', html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking, scriptOffset, _hookProperty, false, false ];
          worker.port.postMessage(JSON.stringify(message, null, 0));
        });
      }
      else {
        return new Promise(function (resolve, reject) {
          try {
            resolve(_preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking, scriptOffset, _hookProperty, false, false));
          }
          catch (e) {
            reject(e);
          }
        });
      }
    }
    else {
      let processed = '';
      let inScript = false;
      let noHook = false;
      let contextGeneratorAttr = false;
      let src = '';
      let inlineScript = '';
      let isBootstrapProcessed = false;
      let isSVG = false;
      let scriptHashes = _getScriptHashes();
      let firstTag;
      let xlinkNS = 'xlink';
      if (typeof url === 'string') {
        url = new URL(url);
      }
      let stream = new htmlparser.WritableStream({
        onprocessinginstruction(name, data) {
          processed += '<' + data + '>';
        },
        onopentag(name, attributes) {
          let attrs = '';
          let attrNoHook = typeof attributes['no-hook'] === 'string';
          let _attr, _value;
          if (!firstTag) {
            firstTag = name;
            if (firstTag === 'svg') {
              isSVG = true;
            }
          }
          for (let attr in attributes) {
            _attr = undefined;
            _value = undefined;
            if (isSVG && name === 'svg') {
              if (attr.startsWith('xmlns:')) {
                if (attributes[attr] === 'http://www.w3.org/1999/xlink') {
                  xlinkNS = attr.substring(6);
                }
              }
            }
            if (attr.match(/^on[a-z]{1,}$/) && attributes[attr]) {
              if (name === 'iframe' && attr === 'onload') {
                if (scriptHashes) {
                  if (typeof attributes['src'] === 'string') {
                    let _src = attributes['src'].trim().toLowerCase();
                    if (_src.startsWith('blob:') || _src.startsWith('data:')) {
                      continue; // skip processing onload to merge it with src data
                    }
                  }
                }
                else {
                  if (typeof attributes['srcdoc'] === 'string') {
                    continue; // skip processing onload to merge it with srcdoc
                  }
                  else if (typeof attributes['src'] === 'string') {
                    let _src = attributes['src'].trim().toLowerCase();
                    if (_src.startsWith('blob:') || _src.startsWith('data:')) {
                      continue; // skip processing onload to merge it with src data
                    }
                  }
                }
              }
              let _attrNoHook = attrNoHook;
              if (_attrNoHook) {
                let originalScript = attributes[attr];
                _value = _validateNoHookScript(originalScript, url);
                _attrNoHook = originalScript === attributes[attr];
              }
              if (!_attrNoHook) {
                let initialContext = (cors ? url.href : url.pathname) + ',' + name
                  + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                  + ',' + attr + '@' + (scriptOffset + processed.length);
                let { isHooked, isValidated, raw, hooked, ctx, embeddedRaw } = _parseHookedInlineScript(attributes[attr]);
                if (isHooked) {
                  if (!isValidated) {
                    // verify the hooked script
                    let hookedForVerification = hook(raw, hookName, [[ctx, {}]], contextGenerator, metaHooking, _hookProperty,
                      null, false, getCompact(), getHookGlobal(), getHookPrefix(), { event: true });
                    let insertReturnAt = getCompact() ? hookedForVerification.indexOf('\']);') + 4 : hookedForVerification.indexOf('\'\n]);\n') + 6;
                    hookedForVerification = hookedForVerification.substring(0, insertReturnAt) + 'return ' + hookedForVerification.substring(insertReturnAt);
                    if (hooked !== hookedForVerification) {
                      // not matched
                      console.error('preprocess.js: _preprocessHtml: hooked !== hookedForVerification ctx = ' + ctx, '\nhooked = ', hooked, '\nhookedForVerification = ', hookedForVerification, '\nraw =', raw);
                      isHooked = false;
                    }
                  }
                }
                if (isHooked) {
                  //console.log('preprocess.js: _preprocessHtml: skipping redundant hooking for event handler attribute ', attributes[attr]);
                  _value = attributes[attr];
                }
                else {
                  let inlineScript = '(() => { ' + attributes[attr] + '})()';
                  _value = hook(inlineScript,
                    hookName,
                    [[initialContext, {}]], contextGenerator, metaHooking, _hookProperty,
                    null, false, getCompact(), getHookGlobal(), getHookPrefix(), { event: true });
                  let insertReturnAt = getCompact() ? _value.indexOf('\']);') + 4 : _value.indexOf('\'\n]);\n') + 6;
                  _value = (_getScriptHashes()
                      ? `/* ctx:'${btoa(encodeURIComponent(initialContext))}' raw:'${btoa(encodeURIComponent(inlineScript))}' */`
                      : '') +
                    _value.substring(0, insertReturnAt) + 'return ' + _value.substring(insertReturnAt);
                }
              }
            }
            else if (attr === 'src' && name === 'script' && attributes[attr]) {
              let _srcUrl = new URL(attributes[attr], url);
              switch (_srcUrl.protocol) {
              case 'https:':
              case 'http:':
                if (_srcUrl.pathname.match(/[.]m?js$/)) {
                  let serviceWorkerReady = _srcUrl.searchParams.get('service-worker-ready');
                  switch (serviceWorkerReady) {
                  case 'false':
                    _value = attributes[attr].replace(/([?&])service-worker-ready=false/, '$1service-worker-ready=true');
                    break;
                  case 'true':
                  default:
                    _value = attributes[attr];
                    break;
                  }
                }
                break;
              case 'data:': // TODO: handle data URL
              case 'blob:': // TODO: handle blob
              case 'javascript:':
              default:
                break;
              }
              if (!_value) {
                // drop invalid script src URL attribute
                continue;
              }
            }
            else if (attr === 'src' && name === 'iframe' && attributes[attr]) {
              if (typeof attributes['srcdoc'] === 'string') {
                continue; // skip iframe src since srcdoc exists
              }
              let _srcUrl = new URL(attributes[attr], url);
              switch (_srcUrl.protocol) {
              default:
              case 'https:':
              case 'http:':
                _value = attributes[attr];
                break;
              case 'javascript:':
                break;
              case 'data:':
                {
                  let dataURL = _srcUrl.pathname.match(/^([a-zA-Z\/+]*)(;[^, ]*)?,(.*)$/);
                  if (dataURL && dataURL[1].toLowerCase() === 'text/html') {
                    let body;
                    if (dataURL[2] === ';base64') {
                      body = decodeURIComponent(escape(atob(dataURL[3])));
                    }
                    else {
                      body = dataURL[3];
                    }
                    if (scriptHashes) {
                      if (hook.parameters.emptyDocumentUrl) {
                        let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                          '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                        let srcDecoded = he.decode(body + (hook.parameters.bootstrap || ''), { isAttributeValue: true });
                        _emptySrc += '&content=' + btoa(encodeURIComponent(srcDecoded)).replace(/[+]/g, '-').replace(/[/]/g, '_');
                        _attr = 'src';
                        _value = _emptySrc;
                      }
                    }
                    else {
                      if (hook.parameters.emptyDocumentUrl) {
                        let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                          '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                        attrs += ' src="' + _emptySrc + '"';
                      }
                      let srcDecoded = he.decode(body + (hook.parameters.bootstrap || ''), { isAttributeValue: true });
                      let srcEncoded = he.encode(srcDecoded, { isAttributeValue: true });
                      _attr = 'onload';
                      _value = 'event.target.contentDocument.write(`' + srcEncoded.replace(/&#x60;/g, '&#x5C;&#x60;') + '`);';
                      if (hook.parameters.onloadWrapper && attributes['onload']) {
                        let onload = 'return ' + hook('(() => { ' + attributes['onload'] + '})()',
                          hookName,
                          [[(cors ? url.href : url.pathname) + ',' + 'iframe'
                          + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                          + ',' + 'onload' + '@' + (scriptOffset + processed.length), {}]], contextGenerator, metaHooking, _hookProperty,
                          null, false, getCompact(), getHookGlobal(), getHookPrefix(), { event: true });
                        _value += hook.parameters.onloadWrapper.replace('$onload$', onload);
                      }
                    }
                  }
                  else if (dataURL && dataURL[1].toLowerCase() === 'image/svg+xml') {
                    // block data:image/svg+xml URL
                    break;
                  }
                  else {
                    // pass non html data untouched
                    _attr = attr;
                    _value = attributes[attr];
                  }
                }
                break;
              case 'blob:':
                {
                  if (scriptHashes) {
                    if (hook.parameters.emptyDocumentUrl) {
                      let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                        '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                      _emptySrc += '&blob=' + encodeURIComponent(_srcUrl.href);
                      _attr = 'src';
                      _value = _emptySrc;
                    }
                  }
                  else {
                    if (hook.parameters.emptyDocumentUrl) {
                      let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                        '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                      attrs += ' src="' + _emptySrc + '"';
                    }
                    _attr = 'onload';
                    _value = 'let iframe = this; ' +
                      'fetch(new Request("' + _srcUrl.href + '")).then(response => response.blob())' +
                      '.then(blob => { let reader = new FileReader(); if (blob.type === "text/html") {' + 
                      'reader.addEventListener("loadend", () => { ' +
                        'iframe.contentDocument.write(reader.result + \`' + hook.parameters.bootstrap.replace(/'/g, '&#39;') + '\`); }); ' +
                      'reader.readAsText(blob); } else if (blob.type !== "image/svg+xml") { ' + 
                      'reader.addEventListener("loadend", () => { iframe.src = reader.result; iframe.removeAttribute("onload"); }); ' +
                      'reader.readAsDataURL(blob); }});';
                    if (hook.parameters.onloadWrapper && attributes['onload']) {
                      let onload = 'return ' + hook('(() => { ' + attributes['onload'] + '})()',
                        hookName,
                        [[(cors ? url.href : url.pathname) + ',' + 'iframe'
                        + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                        + ',' + 'onload' + '@' + (scriptOffset + processed.length), {}]], contextGenerator, metaHooking, _hookProperty,
                        null, false, getCompact(), getHookGlobal(), getHookPrefix(), { event: true });
                      _value += hook.parameters.onloadWrapper.replace('$onload$', onload);
                    }
                  }
                }
                break;
              }
              if (!_value) {
                continue; // drop invalid iframe src URL value
              }
            }
            else if (attr === 'srcdoc' && name === 'iframe') {
              if (scriptHashes) {
                if (hook.parameters.emptyDocumentUrl) {
                  let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                    '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                  let srcdocDecoded = he.decode(attributes[attr] + (hook.parameters.bootstrap || ''), { isAttributeValue: true });
                  _emptySrc += '&content=' + btoa(encodeURIComponent(srcdocDecoded)).replace(/[+]/g, '-').replace(/[/]/g, '_');
                  _attr = 'src';
                  _value = _emptySrc;
                }
              }
              else {
                if (hook.parameters.emptyDocumentUrl) {
                  let _emptySrc = hook.parameters.emptyDocumentUrl.pathname +
                    '?url=' + encodeURIComponent((url.origin === hook.parameters.emptyDocumentUrl.origin ? '' : url.origin) + url.pathname + ',iframe' + (attributes['id'] ? '@' + attributes['id'] : ''));
                  attrs += ' src="' + _emptySrc + '"';
                }
                let srcdocDecoded = he.decode(attributes[attr] + (hook.parameters.bootstrap || ''), { isAttributeValue: true });
                let srcdocEncoded = he.encode(srcdocDecoded, { isAttributeValue: true });
                _attr = 'onload';
                _value = 'event.target.contentDocument.write(`' + srcdocEncoded.replace(/&#x60;/g, '&#x5C;&#x60;') + '`);';
                if (hook.parameters.onloadWrapper && attributes['onload']) {
                  let onload = hook('(() => { ' + attributes['onload'] + '})()',
                    hookName,
                    [[(cors ? url.href : url.pathname) + ',' + 'iframe'
                    + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                    + ',' + 'onload' + '@' + (scriptOffset + processed.length), {}]], contextGenerator, metaHooking, _hookProperty,
                    null, false, getCompact(), getHookGlobal(), getHookPrefix(), { event: true });
                  _value += hook.parameters.onloadWrapper.replace('$onload$', onload);
                }
              }
            }
            else if (name === 'object' && attr === 'data' && attributes[attr] && hook.parameters.emptySvg) {
              let _dataUrl = new URL(attributes[attr], url);
              switch (_dataUrl.protocol) {
              case 'https:':
              case 'http:':
                // Note: object data https URL bypasses Service Worker in the first request
                // convert <object type="image/svg+xml" data="image.svg"> regardless of type
                _value = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode.apply(null, new TextEncoder().encode(hook.parameters.emptySvg.replace('$location$',
                  (_dataUrl.origin === url.origin ? _dataUrl.href.substring(url.origin.length) : _dataUrl.href)))));
                break;
              case 'data:': // block data:
                if (attributes[attr] && attributes[attr].startsWith('data:image/svg+xml;base64,') && typeof hook.parameters.emptySvg === 'string') {
                  let svgLoader = decodeURIComponent(escape(atob(attributes[attr].substring('data:image/svg+xml;base64,'.length))));
                  let emptySvgLocationIndex = hook.parameters.emptySvg.indexOf('$location$');
                  let emptySvgStartsWith = hook.parameters.emptySvg.substring(0, emptySvgLocationIndex);
                  let emptySvgEndsWith = hook.parameters.emptySvg.substring(emptySvgLocationIndex + '$location$'.length);
                  if (svgLoader.startsWith(emptySvgStartsWith) && svgLoader.endsWith(emptySvgEndsWith)) {
                    //console.log('preprocess.js: _preprocessHtml: converting $origin$ for object data="data:image/svg+xml;base64,..."', svgLoader);
                    svgLoader = svgLoader.replace('$origin$', url.origin);
                    _value = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode.apply(null, new TextEncoder().encode(svgLoader)));
                  }
                  else {
                    console.error('preprocess.js: _preprocessHtml: invalid object data="data:image/svg+xml;base64,..."', svgLoader);
                    _value = 'about:blank';
                  }
                }
                else {
                  _value = 'about:blank';
                }
                break;
              case 'blob:': // block blob:
              case 'javascript:': // block javascript:
              default:
                _value = 'about:blank';
                break;
              }
            }
            else if (attr === 'src' && name === 'embed' && attributes[attr] && hook.parameters.emptySvg) {
              let _srcUrl = new URL(attributes[attr], url);
              switch (_srcUrl.protocol) {
              case 'https:':
              case 'http:':
                // Note: embed src https URL bypasses Service Worker in the first request
                // convert <embed type="image/svg+xml" src="image.svg"> regardless of type
                _value = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode.apply(null, new TextEncoder().encode(hook.parameters.emptySvg.replace('$location$',
                  (_srcUrl.origin === url.origin ? _srcUrl.href.substring(url.origin.length) : _srcUrl.href)))));
                break;
              case 'data:': // block data:
                if (attributes[attr] && attributes[attr].startsWith('data:image/svg+xml;base64,') && typeof hook.parameters.emptySvg === 'string') {
                  let svgLoader = decodeURIComponent(escape(atob(attributes[attr].substring('data:image/svg+xml;base64,'.length))));
                  let emptySvgLocationIndex = hook.parameters.emptySvg.indexOf('$location$');
                  let emptySvgStartsWith = hook.parameters.emptySvg.substring(0, emptySvgLocationIndex);
                  let emptySvgEndsWith = hook.parameters.emptySvg.substring(emptySvgLocationIndex + '$location$'.length);
                  if (svgLoader.startsWith(emptySvgStartsWith) && svgLoader.endsWith(emptySvgEndsWith)) {
                    //console.log('preprocess.js: _preprocessHtml: converting $origin$ for embed src="data:image/svg+xml;base64,..."', svgLoader);
                    svgLoader = svgLoader.replace('$origin$', url.origin);
                    _value = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode.apply(null, new TextEncoder().encode(svgLoader)));
                  }
                  else {
                    console.error('preprocess.js: _preprocessHtml: invalid embed src="data:image/svg+xml;base64,..."', svgLoader);
                    _value = 'about:blank';
                  }
                }
                else {
                  _value = 'about:blank';
                }
                break;
              case 'blob:': // block blob:
              case 'javascript:': // block javascript:
              default:
                _value = 'about:blank';
                break;
              }
            }
            else if (attributes[attr] && attributes[attr].trim().toLowerCase().indexOf('javascript:') === 0) {
              let _attrNoHook = attrNoHook;
              if (_attrNoHook) {
                let originalScript = attributes[attr].substr(11);
                _value = 'javascript:' + _validateNoHookScript(originalScript, url);
                _attrNoHook = originalScript === attributes[attr];
              }
              if (!_attrNoHook) {
                _value = 'javascript:' + hook('(() => { ' + attributes[attr].substr(11) + '})()',
                  hookName,
                  [[(cors ? url.href : url.pathname) + ',' + name
                  + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                  + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGenerator, metaHooking, _hookProperty);
              }
            }
            _attr = typeof _attr === 'undefined' ? attr : _attr;
            _value = typeof _value === 'undefined' ? attributes[attr] : _value; 
            attrs += ' ' + _attr + (_value
              ? _value.indexOf('"') >= 0
                ? '=\'' + _value + '\''
                : '="' + _value + '"' : '');
          }
          processed += '<' + name + attrs + '>';
          if (isSVG && name === 'svg' && hook.parameters.bootstrapSvgScripts) {
            processed += hook.parameters.bootstrapSvgScripts.replace(/xlink:href=/g, xlinkNS + ':href=');
          }
          if (name === 'script') {
            inScript = true;
            noHook = attrNoHook;
            src = attributes.src;
            inlineScript = '';
            contextGeneratorAttr = attributes['context-generator'];
            if (src && src.match(/\/hook[.]min[.]js\?/)) {
              let srcUrl = new URL(he.decode(src, { isAttributeValue: true }), 'https://host/');
              if (srcUrl.searchParams.has('hook-name')) {
                setHookNameForServiceWorker(srcUrl.searchParams.get('hook-name') || '__hook__');
              }
              if (srcUrl.searchParams.has('context-generator-name')) {
                setContextGeneratorName(srcUrl.searchParams.get('context-generator-name') || 'method');
              }
              if (srcUrl.searchParams.has('discard-hook-errors')) {
                setDiscardHookErrors(srcUrl.searchParams.get('discard-hook-errors') === 'true');
              }
              if (srcUrl.searchParams.has('hook-property')) {
                setHookProperty(srcUrl.searchParams.get('hook-property') === 'true');
              }
              if (srcUrl.searchParams.has('hook-global')) {
                setHookGlobal(srcUrl.searchParams.get('hook-global') === 'true');
              }
              if (srcUrl.searchParams.has('hook-prefix')) {
                setHookPrefix(srcUrl.searchParams.get('hook-prefix'));
              }
              if (srcUrl.searchParams.has('compact')) {
                setCompact(srcUrl.searchParams.get('compact') === 'true');
              }
              if (srcUrl.searchParams.has('no-hook-authorization')) {
                let noHookAuthorization = srcUrl.searchParams.get('no-hook-authorization').split(/,/);
                hook.parameters.noHookAuthorizationPreValidated = hook.parameters.noHookAuthorizationPreValidated || {};
                noHookAuthorization.forEach(ticket => {
                  hook.parameters.noHookAuthorizationPreValidated[ticket] = true;
                });
                noHookAuthorization = [];
                for (let ticket in hook.parameters.noHookAuthorizationPreValidated) {
                  noHookAuthorization.push(ticket);
                }
                setNoHookAuthorizationPreValidated(noHookAuthorization);
              }
            }
            if (isDecoded && typeof contextGeneratorAttr === 'string' && src) {
              contextGeneratorScripts.push(new URL(src, url));
            }
          }
        },
        ontext(text) {
          if (inScript) {
            inlineScript += text;
          }
          else {
            processed += text;
          }
        },
        onclosetag(name) {
          if (name === 'script' && inScript) {
            if (isDecoded && typeof contextGeneratorAttr === 'string' && inlineScript) {
              contextGeneratorScripts.push(inlineScript);
            }
            if (inlineScript) {
              if (noHook) {
                let originalScript = inlineScript;
                inlineScript = _validateNoHookScript(originalScript, url);
                noHook = originalScript === inlineScript;
              }
              if (!noHook) {
                if (isSVG) {
                  if (inlineScript.startsWith('<![CDATA[') && inlineScript.endsWith(']]>')) {
                    inlineScript = inlineScript.substring(9, inlineScript.length - 3);
                  }
                }
                let isHooked = false;
                let initialContext = (cors ? url.href : url.pathname) + ',script@' + (scriptOffset + processed.length);
                if (!isSVG) {
                  let raw, hooked, ctx, embeddedRaw;
                  ({ isHooked, raw, hooked, ctx, embeddedRaw } = _parseHookedInlineScript(inlineScript));
                  if (isHooked) {
                    // verify the hooked script
                    let hookedForVerification = hook(raw, hookName, [[ctx, {}]], contextGenerator, metaHooking, _hookProperty);
                    if (hooked !== hookedForVerification) {
                      // not matched
                      console.error('preprocess.js: _preprocessHtml: hooked !== hookedForVerification ctx = ' + ctx);
                      isHooked = false;
                    }
                  }
                }
                if (!isHooked && inlineScript) {
                  let hooked = hook(inlineScript, hookName, [[initialContext, {}]], contextGenerator, metaHooking, _hookProperty);
                  inlineScript = hooked
                    ? (_getScriptHashes()
                        ? `/* ctx:"${btoa(encodeURIComponent(initialContext))}" raw:"${btoa(encodeURIComponent(inlineScript))}" */`
                        : '') +
                      hooked
                    : '';
                }
              }
              if (isSVG) {
                inlineScript = '<![CDATA[' + inlineScript + ']]>';
              }
            }
            processed += inlineScript;
            inScript = false;
            noHook = false;
            src = '';
          }
          processed += '</' + name + '>';
        },
        oncomment(data) {
          processed += '<!--' + data + '-->';
        },
        onerror(error) {
          throw error;
        }
      });
      stream.write(html.replace(/\n/g, '\0').replace(/(<\/[\s]{1,})script([\s]*>)/g, '$1-closing-script-in-process-$2').replace(/\0/g, '\n'));
      stream.end();
      if (isSrcdoc && !isBootstrapProcessed) {
        processed += hook.parameters.bootstrap || '';
        isBootstrapProcessed = true;
      }
      processed = processed.replace(/\n/g, '\0').replace(/(<\/[\s]{1,})-closing-script-in-process-([\s]*>)/g, '$1script$2').replace(/\0/g, '\n');
      return processed;
    }
  }

  const escodegenOptions = { format: { indent: { style: '  ' }, }, comment: true };
  const escodegenOptionsCompact = { format: { compact: true }, comment: false };
  const escodegenOptionsWithSourceMap = {
    format: {
      indent: {
        style: '  ',
        base: 0,
        adjustMultilineComment: false
      },
      newline: '\n',
      space: ' ',
      json: false,
      renumber: false,
      hexadecimal: false,
      quotes: 'single',
      escapeless: false,
      compact: false,
      parentheses: true,
      semicolons: true,
      safeConcatenation: false
    },
    moz: {
      starlessGenerator: false,
      parenthesizedComprehensionBlock: false,
      comprehensionExpressionStartsWithAssignment: false
    },
    parse: null,
    comment: true,
    sourceMap: 'source.js',
    sourceMapRoot: 'src',
    sourceMapWithCode: true,
    file: 'source.js.map',
    sourceContent: '',
    directive: false,
    verbatim: undefined
  };

  const selfConstructorName = typeof self === 'object' ? self.constructor.name : '';
  function normalizeHookName(hookName) {
    if (selfConstructorName === 'Window') {
      if (typeof hookName === 'symbol') {
        return Symbol.keyFor(hookName);
      }
      else {
        throw new Error('unknown error');
      }
    }
    else {
      if (typeof hookName === 'symbol') {
        return Symbol.keyFor(hookName);
      }
      else {
        return hookName;
      }
    }
  }

  function hook(code, hookName, initialContext = [], contextGeneratorName = 'method', metaHooking = true, _hookProperty = getHookProperty(), _sourceMap = null, asynchronous = false, _compact = getCompact(), _hookGlobal = getHookGlobal(), _hookPrefix = getHookPrefix(), initialScope = null) {
    let hookWith = getHookWith();
    if (asynchronous) {
      let worker = getBestHookWorker();
      if (worker) {
        return new Promise(function (resolve, reject) {
          let id = getHookId(code);
          let size = code.length;
          worker.tasks[id] = { status: 'requesting' };
          worker.taskQueueSize += size;
          worker.tasks[id].callback = function callback(task) {
            delete worker.tasks[id];
            worker.taskQueueSize -= size;
            if (task.status === 'success') {
              resolve(task.result);
            }
            else {
              reject(task.error);
            }
          };
          let message = [ id, 'text/javascript', code, normalizeHookName(hookName), initialContext, contextGeneratorName, metaHooking, _hookProperty, _sourceMap, false, _compact, _hookGlobal, _hookPrefix, initialScope ];
          worker.port.postMessage(JSON.stringify(message, null, 0));
          //console.log('posting messsage to Hook Worker', id);
        });
      }
      else {
        //console.log('no Hook Worker found');
        return new Promise(function (resolve, reject) {
          try {
            resolve(hook(code, hookName, initialContext, contextGeneratorName, metaHooking, _hookProperty, _sourceMap, false, _compact, _hookGlobal, _hookPrefix, initialScope));
          }
          catch (e) {
            reject(e);
          }
        });
      }
    }
    else {
      let targetAst;
      try {
        targetAst = espree.parse(code, _compact ? espreeOptionsForTargetCompact : espreeOptionsForTarget);
      }
      catch (e) {
        // TODO: Is this fallback strategy feasible?
        if (e.name === 'SyntaxError' &&
            e.message.match(/'import' and 'export' may appear only with 'sourceType: module'/)) {
          targetAst = espree.parse(code, _compact ? espreeModuleOptionsCompact : espreeModuleOptions);
        }
        else {
          throw e;
        }
      }
      let astWithComments = _compact ? targetAst : escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
      targetAst = { type: astWithComments.type, sourceType: astWithComments.sourceType, body: astWithComments.body };
      contextGeneratorName = hook.contextGenerators[contextGeneratorName] ? contextGeneratorName : 'method';
      let contextGenerator = hook.contextGenerators[contextGeneratorName];
      initialContext.push(['root', targetAst]);
      let globalScope = {};
      let globalObjectScope = {};
      let globalClassScope = {};
      let blockScope = globalScope;
      let functionScope = globalScope;
      hookName = normalizeHookName(hookName);
      if (initialScope instanceof Object) {
        blockScope = Object.create(globalScope);
        functionScope = blockScope;
        Object.assign(blockScope, initialScope);
      }
      _analyzeScope(targetAst, blockScope, functionScope, globalScope, hookName, hookWith);
      for (let globalProperty in globalScope) {
        switch (globalScope[globalProperty]) {
        case 'FunctionDeclaration':
        case 'VariableDeclaration_var':
          globalObjectScope[globalProperty] = globalScope[globalProperty];
          break;
        default: // class, let, const
          globalClassScope[globalProperty] = globalScope[globalProperty];
          break;
        }
        globalScope[globalProperty] = false;
      }
      globalScope[hookName] = true;
      targetAst.__code__ = code;
      _preprocess(targetAst, hookName, initialContext, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap, _hookGlobal, _hookPrefix, hookWith, blockScope, functionScope, globalScope, globalObjectScope, globalClassScope);
      //_logScope(targetAst);
      if (!_compact && _sourceMap && typeof _sourceMap === 'object' && _sourceMap.pathname) {
        let sourcePath = _sourceMap.pathname.split(/\//).pop();
        escodegenOptionsWithSourceMap.code = code;
        escodegenOptionsWithSourceMap.sourceMap = sourcePath;
        escodegenOptionsWithSourceMap.file = sourcePath + '.map';
        let output = escodegen.generate(astWithComments, escodegenOptionsWithSourceMap);
        output.map.setSourceContent(sourcePath, code);
        let mapComment = convert.fromJSON(output.map.toString()).toComment();
        return output.code + '\n' + mapComment;
      }
      else {
        return escodegen.generate(astWithComments, _compact ? escodegenOptionsCompact : escodegenOptions);
      }
    }
  }

  return Object.freeze({
    hook: hook,
    _preprocessHtml: _preprocessHtml,
    _validateNoHookScript: _validateNoHookScript,
    _getScriptHashes: _getScriptHashes,
    _parseHookedInlineScript: _parseHookedInlineScript,
    getConfigurations: getConfigurations,
    setConfigurations: setConfigurations,
    getHookNameForServiceWorker: getHookNameForServiceWorker,
    setHookNameForServiceWorker: setHookNameForServiceWorker,
    getHookWith: getHookWith,
    setHookWith: setHookWith,
    getContextGeneratorName: getContextGeneratorName,
    setContextGeneratorName: setContextGeneratorName,
    getDiscardHookErrors: getDiscardHookErrors,
    setDiscardHookErrors: setDiscardHookErrors,
    getHookProperty: getHookProperty,
    setHookProperty: setHookProperty,
    getHookGlobal: getHookGlobal,
    setHookGlobal: setHookGlobal,
    getHookPrefix: getHookPrefix,
    setHookPrefix: setHookPrefix,
    mutateScriptConfigurationsJSON: mutateScriptConfigurationsJSON,
    getCompact: getCompact,
    setCompact: setCompact,
    getNoHookAuthorizationPreValidated: getNoHookAuthorizationPreValidated,
    setNoHookAuthorizationPreValidated: setNoHookAuthorizationPreValidated,
    getContextGeneratorScripts: getContextGeneratorScripts,
    getHookWorkers: getHookWorkers,
    setHookWorkers: setHookWorkers,
    setupHookWorkers: setupHookWorkers,
    public: {
      hookHtml: _preprocessHtml
    }
  });
}