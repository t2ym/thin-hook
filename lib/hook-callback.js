/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

module.exports = function (hook) {

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
        result = args[2](args[1]);
        break;
      // constructor call in 'with' statement body
      case 'wnew':
        result = args[2](args[1]);
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

  return {
    __hook__: __hook__,
    __hook_except_properties__: __hook_except_properties__
  };
}
