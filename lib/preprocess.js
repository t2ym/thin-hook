/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

const espree = require('espree');
const escodegen = require('escodegen');
const htmlparser = require('htmlparser2');
const createHash = require('sha.js');

const espreeOptions = { range: true, tokens: true, comment: true, ecmaVersion: 8 };

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

function _preprocess(ast, isConstructor = false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking) {
  switch (ast.type) {
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
      let template = espree.parse(ast.generator
        ? 'function * f() { yield * ' + hookName + '(function * () {}, this, arguments, \'' + context + '\'); }'
        : isConstructor
          ? 'function f() { return ' + hookName + '(() => {}, null, arguments, \'' + context + '\'); }'
          : 'function f() { return ' + hookName + '(() => {}, this, arguments, \'' + context + '\'); }', espreeOptions).body[0];
      let f = ast.generator
        ? template.body.body[0].expression.argument.arguments[0]
        : template.body.body[0].argument.arguments[0];
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
        let template = espree.parse(ast.body.type === 'BlockStatement'
          ? '(...args) => ' + hookName + '(p => { return p; }, this, args, \'' + context + '\')'
          : ast.body.type === 'ObjectExpression'
            ? '(...args) => ' + hookName + '(p => ({ p: p }), this, args, \'' + context + '\')'
            : '(...args) => ' + hookName + '(p => p, this, args, \'' + context + '\')', espreeOptions).body[0].expression;
        let f = template.body.arguments[0];
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
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
        espreeOptions).body[0].expression;
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
      let template = espree.parse('new (hook.Function(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\'))(\'1\');',
        espreeOptions).body[0].expression;
      ast.arguments[0] = template.callee;
    }
    else if (metaHooking &&
      ast.callee && ast.callee.type === 'Identifier' && (ast.callee.name === 'setTimeout' || ast.callee.name === 'setInterval') &&
      ast.arguments && ast.arguments[0] && ast.arguments[0].type !== 'FunctionExpression' && ast.arguments[0].type !== 'ArrowFunctionExpression') {
      let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
      let template = espree.parse('hook.' + ast.callee.name + '(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\')',
          espreeOptions).body[0].expression;
      ast.callee = template;
    }
    else if (metaHooking && ast.callee && ast.callee.type === 'Identifier' && ast.callee.name === 'eval') {
      if (ast.__hooked__) {
        delete ast.__hooked__;
      }
      else {
        let context = contextGenerator(astPath).replace(/\'/g, '\\\'');
        let template = espree.parse('hook.' + ast.callee.name + '(\'' + hookName + '\', [[\'' + context + '\', {}]], \'' + contextGeneratorName + '\')',
            espreeOptions).body[0].expression;
        let wrapper = espree.parse('(script, eval) => eval(script)', espreeOptions).body[0].expression;
        ast.callee = template;
        if (ast.arguments.length === 1) {
          wrapper.__hooked__ = true;
          wrapper.body.__hooked__ = true;
          ast.arguments.push(wrapper);
        }
      }
    }
    break;
  case 'MetaProperty':
    // patch espree-generated AST to be compatible with that from esprima
    ast.meta = ast.meta.name;
    ast.property = ast.property.name;
    break;
  default:
    break;
  }
  for (let target in ast) {
    if (ast[target]) {
      astPath.push([target, ast[target]]);
      if (Array.isArray(ast[target])) {
        ast[target].forEach((item, index) => {
          if (item && typeof item === 'object' && typeof item.type === 'string') {
            astPath.push([index, item]);
            _preprocess(item, false, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking);
            astPath.pop();
          }
        });
      }
      else if (typeof ast[target] === 'object' && typeof ast[target].type === 'string') {
        _preprocess(ast[target], isConstructor, hookName, astPath, contextGeneratorName, contextGenerator, metaHooking);
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

function _preprocessHtml(html, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking = true, scriptOffset = 0) {
  let processed = '';
  let inScript = false;
  let noHook = false;
  let contextGeneratorAttr = false;
  let src = '';
  let inlineScript = '';
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
              + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
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
              + ',' + attr + '@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
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
              [[(cors ? url.href : url.pathname) + ',script@' + (scriptOffset + processed.length), {}]], contextGeneratorName, metaHooking);
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

const escodegenOptions = { format: { indent: { style: '  ' }, }, comment: true };

function hook(code, hookName = '__hook__', initialContext = [], contextGeneratorName = 'method', metaHooking = true) {
  let targetAst = espree.parse(code, espreeOptions);
  let astWithComments = escodegen.attachComments(targetAst, targetAst.comments, targetAst.tokens);
  contextGeneratorName = hook.contextGenerators[contextGeneratorName] ? contextGeneratorName : 'method';
  let contextGenerator = hook.contextGenerators[contextGeneratorName];
  initialContext.push(['root', targetAst]);
  _preprocess(targetAst, false, hookName, initialContext, contextGeneratorName, contextGenerator, metaHooking);
  return escodegen.generate(astWithComments, escodegenOptions);
}

module.exports = {
  hook: hook,
  _preprocessHtml: _preprocessHtml,
  _validateNoHookScript: _validateNoHookScript,
  getHookNameForServiceWorker: getHookNameForServiceWorker,
  getContextGeneratorName: getContextGeneratorName,
  getDiscardHookErrors: getDiscardHookErrors,
  createHash: createHash
};
