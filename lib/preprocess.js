/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function(espree, escodegen, htmlparser, createHash, convert) {

  const espreeOptionsForTarget = { loc: true, range: true, tokens: true, comment: true, ecmaVersion: 8 };
  const espreeOptions = { loc: false, range: false, tokens: false, comment: false, ecmaVersion: 8 };
  const espreeModuleOptions = { loc: true, range: true, tokens: true, comment: true, ecmaVersion: 8, sourceType: 'module' };

  let hookNameForServiceWorker = '__hook__';

  function getHookNameForServiceWorker() {
    return hookNameForServiceWorker;
  }

  let contextGeneratorName = 'method';

  function getContextGeneratorName() {
    return contextGeneratorName;
  }

  let discardHookErrors = true;

  function getDiscardHookErrors() {
    return discardHookErrors;
  }

  let hookProperty = true;

  function getHookProperty() {
    return hookProperty;
  }

  function setHookProperty(_hookProperty) {
    return hookProperty = _hookProperty;
  }

  let hookWorkers = []; // [ { worker: worker, channel: channel (document), port: port (Service Worker), taskQueueSize: n }, ... ]
  let hookWorkerCount = 4;

  function getHookId(seed) {
    let hash = hook.utils.createHash('sha256');
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
      let serviceWorkerChannel = new MessageChannel();
      let transferChannels = [ serviceWorkerChannel.port2 ];
      // Transfer a dedicated channel to each Hook Worker
      for (let i = 0; i < hookWorkerCount; i++) {
        let worker = {
          worker: new Worker(hook.parameters.hookWorker),
          channel: new MessageChannel()
        };
        worker.worker.addEventListener('message', function onMessage(event) {
          if (event.data === 'channel') {
            console.log('Transferred a channel to a Hook Worker[' + i + ']');
          }
          else {
            console.error('Error in transferring channel to a Hook Worker');
          }
          worker.worker.removeEventListener('message', onMessage);
        });
        worker.worker.postMessage('channel', [ worker.channel.port2 ]);
        hookWorkers.push(worker);
        transferChannels.push(worker.channel.port1);
      }

      // Transfer Hook Worker channels to the Service Worker
      serviceWorkerChannel.port1.onmessage = function (event) {
        if (event.data === 'channel') {
          console.log('Transferred Hook Worker channels to the Service Worker');
        }
        else {
          console.error('Error in transferring Hook Worker channels to the Service Worker');
        }
      };
      navigator.serviceWorker.controller.postMessage('channel', transferChannels);

      addEventListener('unload', function (event) {
        navigator.serviceWorker.controller.postMessage('unload');
      });
    }
  }

  function getBestHookWorker() {
    let worker = null;
    if (Array.isArray(hookWorkers) && hookWorkers.length > 0) {
      console.log('getBestHookWorker' + JSON.stringify(hookWorkers.map(w => w.taskQueueSize), null, 2));
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

  // mutate this script itself to hand the current hookProperty value to Document and Web Workers
  function setScriptHookProperty(script, url) {
    if (url.href.match(/\/hook[.]min[.]js/)) {
      let match = script.match(/let[ ]hookProperty[ ]?=[ ]?([^;]*);/);
      let value = 'true';
      if (match) {
        switch (match[1]) {
        default:
        case 'true':
          value = getHookProperty() ? 'true' : '!!!1';
          break;
        case '!0':
          value = getHookProperty() ? '!0' : '!1';
          break;
        }
      }
      script = script.replace(/let([ ])hookProperty([ ]?)=([ ]?)([^;]*);/g, 'let' + '$1hookProperty$2=$3' + value + ';')
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
    if (!context) {
      return espree.parse(code, espreeOptions);
    }
    let normalizedCode = code.replace(hookName, baseHookName).replace(context, baseContext);
    let cachedJSON = _espreeCache[normalizedCode];
    let ast;
    if (!cachedJSON) {
      if (code === normalizedCode.replace(baseHookName, hookName).replace(baseContext, context)) {
        cachedJSON = _espreeCache[normalizedCode] = JSON.stringify(espree.parse(normalizedCode, espreeOptions), null, 0);
      }
      else {
        cachedJSON = 1;
      }
    }
    if (cachedJSON === 1) {
      return espree.parse(code, espreeOptions);
    }
    else {
      return JSON.parse(cachedJSON.replace(baseHookName, hookName).replace(baseContext, context));
    }
  }

  function _preprocess(ast, isConstructor = false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap) {
    switch (ast.type) {
    case 'MemberExpression':
      if (_hookProperty &&
        typeof ast.object === 'object' &&
        ast.object.type !== 'Super' &&
        typeof ast.property === 'object') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(
          hookName + '(\'.\', o, [\'p\'], \'' + context + '\')',
          hookName, context).body[0];
        let f = template.expression;
        let params = f.arguments[2].elements;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.arguments[1] = ast.object;
        if (ast.computed) {
          params[0] = ast.property;
        }
        else { // ast.property.type === 'Identifier'
          params[0].value = ast.property.name;
          params[0].start = ast.property.start;
          params[0].end = ast.property.end;
          delete params[0].raw;
        }
        delete ast.object;
        delete ast.property;
        delete ast.computed;
        Object.assign(ast, f);
      }
      break;
    case 'UpdateExpression':
      if (_hookProperty &&
        typeof ast.operator === 'string' &&
        typeof ast.prefix === 'boolean' &&
        typeof ast.argument === 'object' &&
        ast.argument.type === 'MemberExpression') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(
          hookName + '(\'op\', o, [\'p\'], \'' + context + '\')',
          hookName, context).body[0];
        let f = template.expression;
        let params = f.arguments[2].elements;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.arguments[0].value = ast.prefix ? ast.operator + 'p' : 'p' + ast.operator;
        f.arguments[1] = ast.argument.object;
        if (ast.argument.computed) {
          params[0] = ast.argument.property;
        }
        else { // ast.argument.property.type === 'Identifier'
          params[0].value = ast.argument.property.name;
          delete params[0].raw;
        }
        delete ast.operator;
        delete ast.prefix;
        delete ast.argument;
        Object.assign(ast, f);
      }
      break;
    case 'UnaryExpression':
      if (_hookProperty &&
        ast.operator === 'delete' &&
        ast.prefix === true &&
        typeof ast.argument === 'object' &&
        ast.argument.type === 'MemberExpression') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(
          hookName + '(\'op\', o, [\'p\'], \'' + context + '\')',
          hookName, context).body[0];
        let f = template.expression;
        let params = f.arguments[2].elements;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.arguments[0].value = ast.operator;
        f.arguments[1] = ast.argument.object;
        if (ast.argument.computed) {
          params[0] = ast.argument.property;
        }
        else { // ast.argument.property.type === 'Identifier'
          params[0].value = ast.argument.property.name;
          delete params[0].raw;
        }
        delete ast.operator;
        delete ast.prefix;
        delete ast.argument;
        Object.assign(ast, f);
      }
      break;
    case 'AssignmentExpression':
      if (_hookProperty &&
        typeof ast.operator === 'string' &&
        typeof ast.left === 'object' &&
        typeof ast.right === 'object' &&
        ast.left.type === 'MemberExpression') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(
          hookName + '(\'op\', o, [\'p\', v], \'' + context + '\')',
          hookName, context).body[0];
        let f = template.expression;
        let params = f.arguments[2].elements;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.arguments[0].value = ast.operator;
        delete f.arguments[0].raw;
        f.arguments[1] = ast.left.object;
        if (ast.left.computed) {
          params[0] = ast.left.property;
        }
        else { // ast.left.property.type === 'Identifier'
          params[0].value = ast.left.property.name;
          params[0].start = ast.left.property.start;
          params[0].end = ast.left.property.end;
          delete params[0].raw;
        }
        params[1] = ast.right;
        f.callee.start = ast.left.start;
        f.callee.end = ast.left.end;
        f.callee.loc = ast.left.loc;
        f.callee.range = ast.left.range;
        delete ast.operator;
        delete ast.left;
        delete ast.right;
        Object.assign(ast, f);
      }
      break;
    case 'MethodDefinition':
      if (ast.kind === 'constructor') {
        isConstructor = true;
      }
      break;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      if (ast.__hooked__) {
        delete ast.__hooked__;
      }
      else if (typeof ast.body === 'object' &&
          !Array.isArray(ast.body) &&
          ast.body.type === 'BlockStatement' &&
          ast.body.body &&
          Array.isArray(ast.body.body)) {
        let params = ast.params;
        let body = ast.body.body;
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(ast.generator
          ? 'function * f() { yield * ' + hookName + '(function * () {}, this, arguments, \'' + context + '\'); }'
          : isConstructor
            ? 'function f() { return ' + hookName + '(() => {}, null, arguments, \'' + context + '\'); }'
            : 'function f() { return ' + hookName + '(() => {}, this, arguments, \'' + context + '\'); }', hookName, context).body[0];
        let f = ast.generator
          ? template.body.body[0].expression.argument.arguments[0]
          : template.body.body[0].argument.arguments[0];
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.async = ast.async;
        f.params = ast.params;
        f.body.body = body;
        f.__hooked__ = true;
        ast.params = params.map(function _trim(param) {
          return param && (param.type === 'ArrayPattern'
            ? { type: param.type, elements: param.elements.map(element => _trim(element)) }
            : param.type === 'AssignmentPattern'
              ? param.left
              : param.type === 'ObjectPattern'
                ? { type: 'ObjectPattern', properties: param.properties.map(prop => prop.value.type === 'AssignmentPattern'
                  ? ((p, v) => (p.value = v, p))(Object.assign({}, prop), prop.value.left)
                  : prop) }
                : param);
        });
        template.body.start = ast.body.start;
        template.body.end = ast.body.end;
        template.body.loc = ast.body.loc;
        template.body.range = ast.body.range;
        ast.body = template.body;
      }
      break;
    case 'ArrowFunctionExpression':
      if (ast.__hooked__) {
        delete ast.__hooked__;
      }
      else {
        if (typeof ast.body === 'object' &&
            !Array.isArray(ast.body)) {
          let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          let template = _espreeParse(ast.body.type === 'BlockStatement'
            ? '(...args) => ' + hookName + '(p => { return p; }, this, args, \'' + context + '\')'
            : ast.body.type === 'ObjectExpression'
              ? '(...args) => ' + hookName + '(p => ({ p: p }), this, args, \'' + context + '\')'
              : '(...args) => ' + hookName + '(p => p, this, args, \'' + context + '\')', hookName, context).body[0].expression;
          let f = template.body.arguments[0];
          if (_sourceMap) {
            _trimStartEndRaw(template);
          }
          f.async = ast.async;
          f.params = ast.params;
          f.body = ast.body;
          f.__hooked__ = true;
          ast.params = template.params;
          ast.body = template.body;
        }
      }
      break;
    case 'NewExpression':
      if (metaHooking && ast.callee && ast.callee.name === 'Function') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
          hookName, context).body[0].expression;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        ast.callee = template.callee;
      }
      break;
    case 'CallExpression':
      if (metaHooking &&
          ast.callee &&
          ast.callee.type === 'MemberExpression' &&
          ast.callee.object.type === 'Identifier' && ast.callee.object.name === 'Reflect' &&
          ((ast.callee.property.type === 'Identifier' && ast.callee.property.name === 'construct') || 
           (ast.callee.property.type === 'Literal' && ast.callee.property.value === 'construct')) &&
          ast.arguments && ast.arguments[0] && ast.arguments[0].type === 'Identifier' && ast.arguments[0].name === 'Function') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
          hookName, context).body[0].expression;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        ast.arguments[0] = template.callee;
      }
      else if (metaHooking &&
        ast.callee && ast.callee.type === 'Identifier' && (ast.callee.name === 'setTimeout' || ast.callee.name === 'setInterval') &&
        ast.arguments && ast.arguments[0] && ast.arguments[0].type !== 'FunctionExpression' && ast.arguments[0].type !== 'ArrowFunctionExpression') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse('hook.' + ast.callee.name + '(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\')',
            hookName, context).body[0].expression;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        ast.callee = template;
      }
      else if (metaHooking && ast.callee && ast.callee.type === 'Identifier' && ast.callee.name === 'eval') {
        if (ast.__hooked__) {
          delete ast.__hooked__;
        }
        else {
          let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
          let template = _espreeParse('hook.' + ast.callee.name + '(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\')',
              hookName, context).body[0].expression;
          let wrapper = _espreeParse('(script, eval) => eval(script)', hookName, context).body[0].expression;
          if (_sourceMap) {
            _trimStartEndRaw(template);
          }
          ast.callee = template;
          if (ast.arguments.length === 1) {
            wrapper.__hooked__ = true;
            wrapper.body.__hooked__ = true;
            ast.arguments.push(wrapper);
          }
        }
      }
      else if (_hookProperty && ast.callee && ast.callee.type === 'MemberExpression' && ast.callee.object.type !== 'Super') {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = _espreeParse(
          hookName + '(\'()\', o, [\'p\', args], \'' + context + '\')',
          hookName, context).body[0];
        let f = template.expression;
        let params = f.arguments[2].elements;
        if (_sourceMap) {
          _trimStartEndRaw(template);
        }
        f.arguments[1] = ast.callee.object;
        if (ast.callee.computed) {
          params[0] = ast.callee.property;
        }
        else { // ast.callee.property.type === 'Identifier'
          params[0].value = ast.callee.property.name;
          delete params[0].raw;
        }
        params[1] = { 'type': 'ArrayExpression', 'elements': ast.arguments };
        f.callee.start = ast.callee.start;
        f.callee.end = ast.callee.end;
        f.callee.loc = ast.callee.loc;
        f.callee.range = ast.callee.range;
        delete ast.callee;
        delete ast.arguments;
        Object.assign(ast, f);
      }
      break;
    case 'MetaProperty':
      // patch espree-generated AST to be compatible with that from esprima
      ast.meta = ast.meta.name;
      ast.property = ast.property.name;
      break;
    case 'BlockStatement':
    case 'SwitchCase':
      delete ast.start;
      delete ast.end;
      delete ast.loc;
      delete ast.range;
      break;
    default:
      break;
    }
    for (let target in ast) {
      if (ast[target]) {
        astPath.push([target, ast[target]]);
        if (Array.isArray(ast[target])) {
          for (let t = ast[target], index = 0, l = t.length; index < l; index++) {
            let item = t[index];
            if (item && typeof item === 'object' && typeof item.type === 'string') {
              astPath.push([index, item]);
              _preprocess(item, false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap);
              astPath.pop();
            }
          }
        }
        else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
          _preprocess(ast[target], isConstructor, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap);
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

  function _preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking = true, scriptOffset = 0, _hookProperty = true, asynchronous = false) {
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
          let message = [ id, 'text/html', html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking, scriptOffset, _hookProperty, false ];
          worker.port.postMessage(JSON.stringify(message, null, 0));
        });
      }
      else {
        return new Promise(function (resolve, reject) {
          try {
            resolve(_preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking, scriptOffset, _hookProperty, false));
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
          for (let attr in attributes) {
            if (attr.match(/^on[a-z]{1,}$/) && attributes[attr]) {
              let _attrNoHook = attrNoHook;
              if (_attrNoHook) {
                let originalScript = attributes[attr];
                attributes[attr] = _validateNoHookScript(originalScript, url);
                _attrNoHook = originalScript === attributes[attr];
              }
              if (!_attrNoHook) {
                attributes[attr] = 'return ' + hook('(() => { ' + attributes[attr] + '})()',
                  hookNameForServiceWorker,
                  [[(cors ? url.href : url.pathname) + ',' + name
                  + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                  + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking, _hookProperty);
              }
            }
            else if (attributes[attr] && attributes[attr].indexOf('javascript:') === 0) {
              let _attrNoHook = attrNoHook;
              if (_attrNoHook) {
                let originalScript = attributes[attr].substr(11);
                attributes[attr] = 'javascript:' + _validateNoHookScript(originalScript, url);
                _attrNoHook = originalScript === attributes[attr];
              }
              if (!_attrNoHook) {
                attributes[attr] = 'javascript:' + hook('(() => { ' + attributes[attr].substr(11) + '})()',
                  hookNameForServiceWorker,
                  [[(cors ? url.href : url.pathname) + ',' + name
                  + (attributes.id ? '#' + attributes.id : attributes.class ? '.' + attributes.class : '')
                  + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking, _hookProperty);
              }
            }
            attrs += ' ' + attr + (attributes[attr]
              ? attributes[attr].indexOf('"') >= 0
                ? '=\'' + attributes[attr] + '\''
                : '="' + attributes[attr] + '"' : '');
          }
          processed += '<' + name + attrs + '>';
          if (name === 'script') {
            inScript = true;
            noHook = attrNoHook;
            src = attributes.src;
            inlineScript = '';
            contextGeneratorAttr = attributes['context-generator'];
            if (src && src.match(/\/hook[.]min[.]js\?/)) {
              let srcUrl = new URL(src, 'https://host/');
              if (srcUrl.searchParams.has('hook-name')) {
                hookNameForServiceWorker = srcUrl.searchParams.get('hook-name');
              }
              if (srcUrl.searchParams.has('context-generator-name')) {
                contextGeneratorName = srcUrl.searchParams.get('context-generator-name') || 'method';
              }
              if (srcUrl.searchParams.has('discard-hook-errors')) {
                discardHookErrors = srcUrl.searchParams.get('discard-hook-errors') === 'true';
              }
              if (srcUrl.searchParams.has('hook-property')) {
                setHookProperty(srcUrl.searchParams.get('hook-property') === 'true');
              }
              if (srcUrl.searchParams.has('no-hook-authorization')) {
                let noHookAuthorization = srcUrl.searchParams.get('no-hook-authorization').split(/,/);
                hook.parameters.noHookAuthorizationPreValidated = hook.parameters.noHookAuthorizationPreValidated || {};
                noHookAuthorization.forEach(ticket => {
                  hook.parameters.noHookAuthorizationPreValidated[ticket] = true;
                });
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
                inlineScript = hook(inlineScript, hookNameForServiceWorker,
                  [[(cors ? url.href : url.pathname) + ',script@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking, _hookProperty);
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
      processed = processed.replace(/\n/g, '\0').replace(/(<\/[\s]{1,})-closing-script-in-process-([\s]*>)/g, '$1script$2').replace(/\0/g, '\n');
      return processed;
    }
  }

  const escodegenOptions = { format: { indent: { style: '  ' }, }, comment: true };
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

  function hook(code, hookName = '__hook__', initialContext = [], contextGeneratorName = 'method', metaHooking = true, _hookProperty = getHookProperty(), _sourceMap = null, asynchronous = false) {
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
          let message = [ id, 'text/javascript', code, hookName, initialContext, contextGeneratorName, metaHooking, _hookProperty, _sourceMap, false ];
          worker.port.postMessage(JSON.stringify(message, null, 0));
          //console.log('posting messsage to Hook Worker', id);
        });
      }
      else {
        console.log('no Hook Worker found');
        return new Promise(function (resolve, reject) {
          try {
            resolve(hook(code, hookName, initialContext, contextGeneratorName, metaHooking, _hookProperty, _sourceMap, false));
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
        targetAst = espree.parse(code, espreeOptionsForTarget);
      }
      catch (e) {
        // TODO: Is this fallback strategy feasible?
        if (e.name === 'SyntaxError' &&
            e.message.match(/'import' and 'export' may appear only with 'sourceType: module'/)) {
          targetAst = espree.parse(code, espreeModuleOptions);
        }
        else {
          throw e;
        }
      }
      let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
      contextGeneratorName = hook.contextGenerators[contextGeneratorName] ? contextGeneratorName : 'method';
      let contextGenerator = hook.contextGenerators[contextGeneratorName];
      initialContext.push(['root', targetAst]);
      _preprocess(targetAst, false, hookName, initialContext, contextGeneratorName, contextGenerator, metaHooking, _hookProperty, _sourceMap);
      if (_sourceMap && typeof _sourceMap === 'object' && _sourceMap.pathname) {
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
        return escodegen.generate(astWithComments, escodegenOptions);
      }
    }
  }

  return {
    hook: hook,
    _preprocessHtml: _preprocessHtml,
    _validateNoHookScript: _validateNoHookScript,
    getHookNameForServiceWorker: getHookNameForServiceWorker,
    getContextGeneratorName: getContextGeneratorName,
    getDiscardHookErrors: getDiscardHookErrors,
    getHookProperty: getHookProperty,
    setHookProperty: setHookProperty,
    setScriptHookProperty: setScriptHookProperty,
    getHookWorkers: getHookWorkers,
    setHookWorkers: setHookWorkers,
    setupHookWorkers: setupHookWorkers,
    public: {
      hookHtml: _preprocessHtml
    }
  };
}