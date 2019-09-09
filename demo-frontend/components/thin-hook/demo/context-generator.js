if (hook.parameters[Symbol.for('context-generator.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('context-generator.js')] = true;
  let hashSalt = '__hashSalt__';
  let contexts = {};

  hook.contextGenerators.hash = function generateHashContext(astPath) {
    const hash = hook.utils.createHash('sha256');
    let methodContext = hook.contextGenerators.method(astPath);
    hash.update(hashSalt + methodContext);
    let hashContext = hash.digest('hex');
    contexts[hashContext] = methodContext;
    return hashContext;
  }

  hook.contextGenerators.method2 = function generateMethodContext2(astPath) {
    return astPath.map(([ path, node ], index) => node && node.type
      ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name
        ? (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
      : index === 0 ? path : '').filter(p => p).join(',') +
        (astPath[astPath.length - 1][1].range ? ':' + astPath[astPath.length - 1][1].range[0] + '-' + astPath[astPath.length - 1][1].range[1] : '');
  }

  Object.freeze(hook.contextGenerators);
}
