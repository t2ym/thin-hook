/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook) {

  function generateAstPathContext(astPath) {
    return astPath.map(([ path, node ]) => node && node.type
      ? '[' + path + ']' + node.type + (node.id && node.id.name ? ':' + node.id.name : (node.key && node.key.name
        ? ':' + (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
      : path).join(',');
  }

  function generateOldMethodContext(astPath) {
    return astPath.map(([ path, node ], index) => node && node.type
      ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name
        ? (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
      : index === 0 ? path : '').filter(p => p).join(',');
  }

  function generateMethodContext(astPath) {
    let result;
    let i;
    let p, n, l = astPath.length;
    for (i = l - 1; i >= 0; i--) {
      p = astPath[i];
      n = p[1];
      result = p[3];
      if (result) {
        break;
      }
      else {
        p[2] = i > 0
          ? (n.id && n.id.name
            ? (n.__moved__
              ? ''
              : n.id.name)
            : (n.key && (n.key.name || n.key.value) && (!n.computed || (n.computed && (n.key.type === 'Identifier' || n.key.type === 'Literal')))
              ? (n.kind === 'get' || n.kind === 'set'
                ? n.kind + ' '
                : n.static
                  ? 'static '
                  : '') 
                + (n.key.name || n.key.value)
              : ''))
          : p[0];
      }
    }
    if (!result) {
      i = 0;
      result = astPath[0][3] = astPath[0][2];
    }
    for (i++; i < l; i++) {
      p = astPath[i];
      if (p[2]) {
        result += ',' + p[2];
      }
      p[3] = result;
    }

    return result;
  }

  function generateCachedMethodDebugContext(astPath) {
    let oldMethod = generateOldMethodContext(astPath);
    let result = generateMethodContext(astPath);
    if (result !== method) {
      console.warn('generateCachedMethodDebugContext: \noldMethod    = ' + method + '\ncachedMethod = ' + result);
      /*
      for (i = 0; i < l; i++) {
        p = astPath[i];
        console.warn('astPath[' + i + '] ' + p[0] + ', ' + p[1].type + ', ' + p[2] + ', ' + p[3]);
      }
      */
    }
    return result; 
  }

  return {
    contextGenerators: {
      'null': () => '',
      'astPath': generateAstPathContext,
      'method': generateMethodContext,
      'cachedMethod': generateMethodContext,
      'cachedMethodDebug': generateCachedMethodDebugContext,
      'oldMethod': generateOldMethodContext,
    }
  };
}
