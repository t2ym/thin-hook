/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook, preprocess) {

  // without property hooking
  function __hook_except_properties__(f, thisArg, args, context, newTarget) {
    return newTarget
      ? Reflect.construct(f, args)
      : thisArg
        ? f.apply(thisArg, args)
        : f(...args);
  }

  // the global object
  const _global = (new Function('return this'))();

  // with property hooking
  function __hook__(f, thisArg, args, context, newTarget) {
    let normalizedThisArg = thisArg;
    if (newTarget === false) { // resolve the scope in 'with' statement body
      let varName = args[0];
      let __with__ = thisArg;
      let scope = _global;
      let _scope;
      let i;
      for (i = 0; i < __with__.length; i++) {
        _scope = __with__[i];
        if (Reflect.has(_scope, varName)) {
          if (_scope[Symbol.unscopables] && _scope[Symbol.unscopables][varName]) {
            continue;
          }
          else {
            scope = _scope;
            break;
          }
        }
      }
      thisArg = normalizedThisArg = scope;
    }
    let result;
    let args1 = args[1]; // for '()'
    function * gen() {}
    switch (f) {
    case Function:
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
      break;
    case '()':
      switch (thisArg) {
      case Reflect:
        switch (args[0]) {
        case 'construct':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype.constructor === gen.constructor)];
                if (args[1][2]) {
                  args1.push(args[1][2]);
                }
              }
              break;
            }
          }
          break;
        case 'apply':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2])];
              break;
            default:
              break;
            }
          }
          break;
        default:
          break;
        }
        break;
      case Function:
        thisArg = hook.Function('__hook__', [[context, {}]]);
        break;
      default:
        break;
      }
      break;
    default:
      if (typeof f === 'function') {
        if (f.prototype instanceof Function && newTarget) {
          args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype.constructor === gen.constructor);
        }
        else if (newTarget === '') {
          if (args[0] && Object.getPrototypeOf(args[0]) === Function) {
            args = [ args[0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args.slice(1)) ];
          }
        }
      }
      break;
    }
    if (typeof f !== 'string') {
      result = newTarget
        ? Reflect.construct(f, args)
        : thisArg
          ? f.apply(thisArg, args)
          : f(...args);
    }
    else {
      // property access
      switch (f) {
      // getter
      case '.':
      case '[]':
        result = thisArg[args[0]];
        break;
      // enumeration
      case '*':
        result = thisArg;
        break;
      // property existence
      case 'in':
        result = args[0] in thisArg;
        break;
      // funcation call
      case '()':
        result = thisArg[args[0]].apply(thisArg, args1);
        break;
      // unary operators
      case 'p++':
        result = thisArg[args[0]]++;
        break;
      case '++p':
        result = ++thisArg[args[0]];
        break;
      case 'p--':
        result = thisArg[args[0]]--;
        break;
      case '--p':
        result = --thisArg[args[0]];
        break;
      case 'delete':
        result = delete thisArg[args[0]];
        break;
      // assignment operators
      case '=':
        result = thisArg[args[0]] = args[1];
        break;
      case '+=':
        result = thisArg[args[0]] += args[1];
        break;
      case '-=':
        result = thisArg[args[0]] -= args[1];
        break;
      case '*=':
        result = thisArg[args[0]] *= args[1];
        break;
      case '/=':
        result = thisArg[args[0]] /= args[1];
        break;
      case '%=':
        result = thisArg[args[0]] %= args[1];
        break;
      case '**=':
        result = thisArg[args[0]] **= args[1];
        break;
      case '<<=':
        result = thisArg[args[0]] <<= args[1];
        break;
      case '>>=':
        result = thisArg[args[0]] >>= args[1];
        break;
      case '>>>=':
        result = thisArg[args[0]] >>>= args[1];
        break;
      case '&=':
        result = thisArg[args[0]] &= args[1];
        break;
      case '^=':
        result = thisArg[args[0]] ^= args[1];
        break;
      case '|=':
        result = thisArg[args[0]] |= args[1];
        break;
      // LHS property access
      case '.=':
        result = { set ['='](v) { thisArg[args[0]] = v; }, get ['=']() { return thisArg[args[0]]; } };
        break;
      // getter for super
      case 's.':
      case 's[]':
        result = args[1](args[0]);
        break;
      // super method call
      case 's()':
        result = args[2](args[0]).apply(thisArg, args[1]);
        break;
      // unary operators for super
      case 's++':
      case '++s':
      case 's--':
      case '--s':
        result = args[1].apply(thisArg, args);
        break;
      // assignment operators for super
      case 's=':
      case 's+=':
      case 's-=':
      case 's*=':
      case 's/=':
      case 's%=':
      case 's**=':
      case 's<<=':
      case 's>>=':
      case 's>>>=':
      case 's&=':
      case 's^=':
      case 's|=':
        result = args[2].apply(thisArg, args);
        break;
      // getter in 'with' statement body
      case 'w.':
      case 'w[]':
        result = args[1]();
        break;
      // function call in 'with' statement body
      case 'w()':
        result = args[2](...args[1]);
        break;
      // constructor call in 'with' statement body
      case 'wnew':
        result = args[2](...args[1]);
        break;
      // unary operators in 'with' statement body
      case 'w++':
      case '++w':
      case 'w--':
      case '--w':
        result = args[1]();
        break;
      // unary operators in 'with' statement body
      case 'wtypeof':
      case 'wdelete':
        result = args[1]();
        break;
      // LHS value in 'with' statement body (__hook__('w.=', __with__, ['p', { set ['='](v) { p = v } } ], 'context', false)['='])
      case 'w.=':
        result = args[1];
        break;
      // assignment operators in 'with' statement body
      case 'w=':
      case 'w+=':
      case 'w-=':
      case 'w*=':
      case 'w/=':
      case 'w%=':
      case 'w**=':
      case 'w<<=':
      case 'w>>=':
      case 'w>>>=':
      case 'w&=':
      case 'w^=':
      case 'w|=':
        result = args[2](args[1]);
        break;
      // default (invalid operator)
      default:
        f(); // throw TypeError: f is not a function
        result = null;
        break;
      }
    }
    return result;
  }

  // Check compatibility of hook callback function
  // Use Case: Call just after a hook callback function is registered for an upgraded version of thin-hook
  //   window.__hook__ = function __hook__ () { ... }
  //   hook.hookCallbackCompatibilityTest(__hook__);

  function hookCallbackCompatibilityTest(hookCallback = _global[preprocess.getHookNameForServiceWorker()], throwError = true, checkTypeError = true) {
    let result = true;
    let reason = 'Unknown';
    let value;
    let error;

    do {
      if (!hookCallback) {
        result = false;
        reason = 'hook: hook callback is undefined';
        break;
      }
      if (typeof hookCallback !== 'function') {
        result = false;
        reason = 'hook: hook callback is not a function';
        break;
      }

      const c = 'hook.hookCallbackCompatibilityTest';
      let tests = [
        [ () => [ (a,b) => a + b ], (p) => [p[0], null, [1, 2], c], (v,p) => v === 3 ],
        [ () => [ (function f1 (a, b) { return this.a + a + b }), { a: 2 } ], (p) => [p[0], p[1], [2, 3], c], (v,p) => v === 7 ],
        [ () => [ class c1 { constructor(a, b) { this.r = a + b } } ], (p) => [p[0], null, [2, 3], c, true], (v,p) => v instanceof p[0] && v.r === 5 ],
        [ () => [ { a: 2 } ], (p) => ['.', p[0], ['a'], c], (v,p) => v.a === p.a ],
        [ () => [ { a: 2 } ], (p) => ['*', p[0], [], c], (v,p) => v === p[0] ],
        [ () => [ { a: 2 } ], (p) => ['in', p[0], ['a'], c], (v,p) => v === true ],
        [ () => [ class c2 { static m(a, b) { return a + b } } ], (p) => ['()', p[0], ['m', [1, 3]], c], (v,p) => v === 4 ],
        [ () => [ { a: 2 } ], (p) => ['p++', p[0], ['a'], c], (v,p) => v === 2 && p[0].a === 3 ],
        [ () => [ { a: 2 } ], (p) => ['++p', p[0], ['a'], c], (v,p) => v === 3 && p[0].a === 3 ],
        [ () => [ { a: 2 } ], (p) => ['p--', p[0], ['a'], c], (v,p) => v === 2 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['--p', p[0], ['a'], c], (v,p) => v === 1 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['delete', p[0], ['a'], c], (v,p) => v === true && !Reflect.has(p[0], 'a') ],
        [ () => [ { a: 2 } ], (p) => ['=', p[0], ['a', 5], c], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 2 } ], (p) => ['+=', p[0], ['a', 5], c], (v,p) => v === 7 && p[0].a === 7 ],
        [ () => [ { a: 2 } ], (p) => ['-=', p[0], ['a', 5], c], (v,p) => v === -3 && p[0].a === -3 ],
        [ () => [ { a: 2 } ], (p) => ['*=', p[0], ['a', 5], c], (v,p) => v === 10 && p[0].a === 10 ],
        [ () => [ { a: 10 } ], (p) => ['/=', p[0], ['a', 2], c], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 10 } ], (p) => ['%=', p[0], ['a', 3], c], (v,p) => v === 1 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['**=', p[0], ['a', 3], c], (v,p) => v === 8 && p[0].a === 8 ],
        [ () => [ { a: 2 } ], (p) => ['<<=', p[0], ['a', 3], c], (v,p) => v === 16 && p[0].a === 16 ],
        [ () => [ { a: 16 } ], (p) => ['>>=', p[0], ['a', 2], c], (v,p) => v === 4 && p[0].a === 4 ],
        [ () => [ { a: -1 } ], (p) => ['>>>=', p[0], ['a', 1], c], (v,p) => v === 2147483647 && p[0].a === 2147483647 ],
        [ () => [ { a: 10 } ], (p) => ['&=', p[0], ['a', 7], c], (v,p) => v === 2 && p[0].a === 2 ],
        [ () => [ { a: 10 } ], (p) => ['^=', p[0], ['a', 15], c], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 10 } ], (p) => ['|=', p[0], ['a', 7], c], (v,p) => v === 15 && p[0].a === 15 ],
        [ () => [ { a: 2 } ], (p) => ['s.', p[0], ['a', (prop) => p[0][prop] ], c], (v,p) => v === 2 ],
        [ () => [ { a: 2, m(a, b) { return this.a + a + b; } } ], (p) => ['s()', p[0], ['m', [2, 3], (prop) => p[0][prop] ], c], (v,p) => v === 7 ],
        [ () => [ { a: 2 } ], (p) => ['s++', p[0], ['a', (prop) => p[0][prop]++ ], c], (v,p) => v === 2 && p[0].a === 3 ],
        [ () => [ { a: 2 } ], (p) => ['++s', p[0], ['a', (prop) => ++p[0][prop] ], c], (v,p) => v === 3 && p[0].a === 3 ],
        [ () => [ { a: 2 } ], (p) => ['s--', p[0], ['a', (prop) => p[0][prop]-- ], c], (v,p) => v === 2 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['--s', p[0], ['a', (prop) => --p[0][prop] ], c], (v,p) => v === 1 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['s=', p[0], ['a', 5, (prop, value) => p[0][prop] = value], c], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 2 } ], (p) => ['+=', p[0], ['a', 5, (prop, value) => p[0][prop] += value], c], (v,p) => v === 7 && p[0].a === 7 ],
        [ () => [ { a: 2 } ], (p) => ['-=', p[0], ['a', 5, (prop, value) => p[0][prop] -= value], c], (v,p) => v === -3 && p[0].a === -3 ],
        [ () => [ { a: 2 } ], (p) => ['*=', p[0], ['a', 5, (prop, value) => p[0][prop] *= value], c], (v,p) => v === 10 && p[0].a === 10 ],
        [ () => [ { a: 10 } ], (p) => ['/=', p[0], ['a', 2], c, (prop, value) => p[0][prop] /= value], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 10 } ], (p) => ['%=', p[0], ['a', 3], c, (prop, value) => p[0][prop] %= value], (v,p) => v === 1 && p[0].a === 1 ],
        [ () => [ { a: 2 } ], (p) => ['**=', p[0], ['a', 3], c, (prop, value) => p[0][prop] **= value], (v,p) => v === 8 && p[0].a === 8 ],
        [ () => [ { a: 2 } ], (p) => ['<<=', p[0], ['a', 3], c, (prop, value) => p[0][prop] <<= value], (v,p) => v === 16 && p[0].a === 16 ],
        [ () => [ { a: 16 } ], (p) => ['>>=', p[0], ['a', 2], c, (prop, value) => p[0][prop] >>= value], (v,p) => v === 4 && p[0].a === 4 ],
        [ () => [ { a: -1 } ], (p) => ['>>>=', p[0], ['a', 1], c, (prop, value) => p[0][prop] >>>= value], (v,p) => v === 2147483647 && p[0].a === 2147483647 ],
        [ () => [ { a: 10 } ], (p) => ['&=', p[0], ['a', 7, (prop, value) => p[0][prop] &= value], c], (v,p) => v === 2 && p[0].a === 2 ],
        [ () => [ { a: 10 } ], (p) => ['^=', p[0], ['a', 15, (prop, value) => p[0][prop] ^= value], c], (v,p) => v === 5 && p[0].a === 5 ],
        [ () => [ { a: 10 } ], (p) => ['|=', p[0], ['a', 7, (prop, value) => p[0][prop] |= value], c], (v,p) => v === 15 && p[0].a === 15 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w.', p[0], ['b', () => p[1].b ], c, false], (v,p) => v === 3 ],
        [ () => [ [{ a: true }, { m: true }], { a: 2, m(a, b) { return a + b; } } ], (p) => ['w()', p[0], ['m', [2, 3], (...args) => p[1].m(...args) ], c, false], (v,p) => v === 5 ],
        [ () => [ [{ a: true }, { m: true }], class c2 { constructor(a, b) { this.r = a + b; } } ], (p) => ['wnew', p[0], ['m', [2, 3], (...args) => new p[1](...args) ], c, false], (v,p) => v.r === 5 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w++', p[0], ['b', () => p[1].b++ ], c, false], (v,p) => v === 3 && p[1].b === 4 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['++w', p[0], ['b', () => ++p[1].b ], c, false], (v,p) => v === 4 && p[1].b === 4 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w--', p[0], ['b', () => p[1].b-- ], c, false], (v,p) => v === 3 && p[1].b === 2 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['--w', p[0], ['b', () => --p[1].b ], c, false], (v,p) => v === 2 && p[1].b === 2 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: true } ], (p) => ['wtypeof', p[0], ['b', () => typeof p[1].b ], c, false], (v,p) => v === 'boolean' ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: true } ], (p) => ['wdelete', p[0], ['b', () => delete p[1].b ], c, false], (v,p) => v === true && !Reflect.has(p[1], 'b') ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w.=', p[0], ['b', { set ['='](v) { p[1].b = v }, get ['=']() { return p[1].b; } } ], c, false], (v,p) => (v['='] = 4) === 4 && (v['='] === 4) && p[1].b === 4],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w=', p[0], ['b', 5, (v) => p[1].b = v ], c, false], (v,p) => v === 5 && p[1].b === 5 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w+=', p[0], ['b', 5, (v) => p[1].b += v ], c, false], (v,p) => v === 8 && p[1].b === 8 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 3 } ], (p) => ['w-=', p[0], ['b', 5, (v) => p[1].b -= v ], c, false], (v,p) => v === -2 && p[1].b === -2 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 10 } ], (p) => ['w/=', p[0], ['b', 2, (v) => p[1].b /= v ], c, false], (v,p) => v === 5 && p[1].b === 5 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 10 } ], (p) => ['w%=', p[0], ['b', 3, (v) => p[1].b %= v ], c, false], (v,p) => v === 1 && p[1].b === 1 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 2 } ], (p) => ['w%=', p[0], ['b', 3, (v) => p[1].b **= v ], c, false], (v,p) => v === 8 && p[1].b === 8 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 2 } ], (p) => ['w<<=', p[0], ['b', 3, (v) => p[1].b <<= v ], c, false], (v,p) => v === 16 && p[1].b === 16 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 16 } ], (p) => ['w>>=', p[0], ['b', 2, (v) => p[1].b >>= v ], c, false], (v,p) => v === 4 && p[1].b === 4 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: -1 } ], (p) => ['w>>>=', p[0], ['b', 1, (v) => p[1].b >>>= v ], c, false], (v,p) => v === 2147483647 && p[1].b === 2147483647 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 10 } ], (p) => ['w&=', p[0], ['b', 7, (v) => p[1].b &= v ], c, false], (v,p) => v === 2 && p[1].b === 2 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 10 } ], (p) => ['w^=', p[0], ['b', 15, (v) => p[1].b ^= v ], c, false], (v,p) => v === 5 && p[1].b === 5 ],
        [ () => [ [{ a: true }, { b: true }], { a: 2, b: 10 } ], (p) => ['w|=', p[0], ['b', 7, (v) => p[1].b |= v ], c, false], (v,p) => v === 15 && p[1].b === 15 ],
        [ () => [ { a: 2, b: 3 } ], (p) => ['.=', p[0], ['b'], c], (v,p) => (v['='] = 4) === 4 && (v['='] === 4) && p[0].b === 4],
      ];

      for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        let params = test[0]();
        let args = test[1](params);
        try {
          value = error = undefined;
          value = hookCallback(...args);
        }
        catch (e) {
          error = e;
        }
        finally {
          if (error || !test[2](value, params)) {
            result = false;
            reason = 'hook: hook callback cannot handle (' + JSON.stringify(args, null, 0) + ')';
            if (error) {
              reason += ': ' + error.message;
            }
            else {
              reason += ': returned value = ' + (typeof value !== 'symbol' ? value : 'Symbol');
            }
            break;
          }
        }
      }
      if (!result) {
        break;
      }

      if (checkTypeError) {
        try {
          hookCallback({}, null, [], c);
        }
        catch (e) {
          if (e.name !== 'TypeError') {
            result = false;
            reason = 'hook: hook callback does not throw TypeError on calling a non-callable object';
            break;
          }
        }

        try {
          hookCallback('invalid operator', null, [], c);
        }
        catch (e) {
          if (e.name !== 'TypeError') {
            result = false;
            reason = 'hook: hook callback does not throw TypeError on calling a non-callable object';
            break;
          }
        }
      }
    }
    while (false);

    if (!result) {
      if (throwError) {
        throw new Error(reason);
      }
      else {
        console.error(reason);
        return false;
      }
    }
    else {
      return true;
    }
  }

  return {
    __hook__: __hook__,
    __hook_except_properties__: __hook_except_properties__,
    hookCallbackCompatibilityTest: hookCallbackCompatibilityTest,
  };
}
