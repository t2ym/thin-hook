{
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
}
