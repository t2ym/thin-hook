/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  const __hook__min = function __hook__min(f, thisArg, args, context, newTarget) {
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
    switch (f) {
    case Function:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args);
      break;
    case AsyncFunction:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, false, true);
      break;
    case GeneratorFunction:
      args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, true, false);
      break;
    case '()':
    case '#()':
      switch (thisArg) {
      case Reflect:
        switch (args[0]) {
        case 'construct':
          if (args[1]) {
            switch (args[1][0]) {
            case Function:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            case AsyncFunction:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            case GeneratorFunction:
              args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            default:
              if (Function.isPrototypeOf(args[1][0])) {
                args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
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
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2])];
              break;
            case AsyncFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], false, true)];
              break;
            case GeneratorFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], true, false)];
              break;
            default:
              if (Function.isPrototypeOf(args[1][0])) {
                args1 = [args[1][0], args[1][1], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][2], GeneratorFunction.isPrototypeOf(args[1][0]), AsyncFunction.isPrototypeOf(args[1][0]))];
              }
              break;
            }
          }
          break;
        default:
          break;
        }
        break;
      case Function:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1])];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1))];
          break;
        default:
          break;
        }
        break;
      case AsyncFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], false, true)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), false, true)];
          break;
        default:
          break;
        }
        break;
      case GeneratorFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1][1], true, false)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1].slice(1), true, false)];
          break;
        default:
          break;
        }
        break;
      case undefined:
        break;
      default:
        if (args[0] === 'constructor') {
          if (thisArg instanceof GeneratorFunction) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
          }
          else if (thisArg instanceof AsyncFunction) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
          }
          else if (thisArg instanceof Function) {
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
          }
        }
        else {
          switch (thisArg[args[0]]) {
          case Function:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
            break;
          case AsyncFunction:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
            break;
          case GeneratorFunction:
            args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
            break;
          default:
            break;
          }
        }
        break;
      }
      break;
    case 's()':
      switch (args[2](args[0])) {
      case Function:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1]);
        break;
      case AsyncFunction:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], false, true);
        break;
      case GeneratorFunction:
        args1 = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args[1], true, false);
        break;
      default:
        break;
      }
      break;
    case 'bind':
      switch (thisArg) {
      case Function:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method');
        break;
      case AsyncFunction:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', false, true);
        break;
      case GeneratorFunction:
        thisArg = hook.Function(Symbol.for('__hook__'), [[context, {}]], 'method', true, false);
        break;
      default:
        break;
      }
      break;
    default:
      if (typeof f === 'function') {
        if (Function.isPrototypeOf(f) && newTarget) {
          args = hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args, GeneratorFunction.isPrototypeOf(f), AsyncFunction.isPrototypeOf(f));
        }
        else if (newTarget === '') {
          if (Function.isPrototypeOf(args[0])) {
            args = [ args[0], ...hook.FunctionArguments(Symbol.for('__hook__'), [[context, {}]], 'method', args.slice(1), GeneratorFunction.isPrototypeOf(args[0]), AsyncFunction.isPrototypeOf(args[0])) ];
          }
        }
      }
      break;
    }
    if (typeof f !== 'string') {
      if (newTarget) {
        result = Reflect.construct(f, args);
      }
      else if (thisArg) {
        result = f.apply(thisArg, args);
      }
      else {
        result = f(...args);
      }
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
        result = thisArg[args[0]](...args1);
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
      // strict mode operators prefixed with '#'
      // getter
      case '#.':
      case '#[]':
        result = StrictModeWrapper['#.'](thisArg, args[0]);
        break;
      // enumeration
      case '#*':
        result = StrictModeWrapper['#*'](thisArg);
        break;
      // property existence
      case '#in':
        result = StrictModeWrapper['#in'](thisArg, args[0]);
        break;
      // funcation call
      case '#()':
        result = StrictModeWrapper['#()'](thisArg, args[0], args1);
        break;
      // unary operators
      case '#p++':
        result = StrictModeWrapper['#p++'](thisArg, args[0]);
        break;
      case '#++p':
        result = StrictModeWrapper['#++p'](thisArg, args[0]);
        break;
      case '#p--':
        result = StrictModeWrapper['#p--'](thisArg, args[0]);
        break;
      case '#--p':
        result = StrictModeWrapper['#--p'](thisArg, args[0]);
        break;
      case '#delete':
        result = StrictModeWrapper['#delete'](thisArg, args[0]);
        break;
      // assignment operators
      case '#=':
        result = StrictModeWrapper['#='](thisArg, args[0], args[1]);
        break;
      case '#+=':
        result = StrictModeWrapper['#+='](thisArg, args[0], args[1]);
        break;
      case '#-=':
        result = StrictModeWrapper['#-='](thisArg, args[0], args[1]);
        break;
      case '#*=':
        result = StrictModeWrapper['#*='](thisArg, args[0], args[1]);
        break;
      case '#/=':
        result = StrictModeWrapper['#/='](thisArg, args[0], args[1]);
        break;
      case '#%=':
        result = StrictModeWrapper['#%='](thisArg, args[0], args[1]);
        break;
      case '#**=':
        result = StrictModeWrapper['#**='](thisArg, args[0], args[1]);
        break;
      case '#<<=':
        result = StrictModeWrapper['#<<='](thisArg, args[0], args[1]);
        break;
      case '#>>=':
        result = StrictModeWrapper['#>>='](thisArg, args[0], args[1]);
        break;
      case '#>>>=':
        result = StrictModeWrapper['#>>>='](thisArg, args[0], args[1]);
        break;
      case '#&=':
        result = StrictModeWrapper['#&='](thisArg, args[0], args[1]);
        break;
      case '#^=':
        result = StrictModeWrapper['#^='](thisArg, args[0], args[1]);
        break;
      case '#|=':
        result = StrictModeWrapper['#|='](thisArg, args[0], args[1]);
        break;
      // LHS property access
      case '#.=':
        result = StrictModeWrapper['#.='](thisArg, args[0]);
        break;
      // getter for super
      case 's.':
      case 's[]':
        result = args[1](args[0]);
        break;
      // super method call
      case 's()':
        result = args[2](args[0]).apply(thisArg, args1);
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
      // read ES module
      case 'm':
        result = thisArg;
        break;
      // function call to ES module
      case 'm()':
        result = args[2](...args[1]);
        break;
      // constructor call to ES module
      case 'mnew':
        result = args[2](...args[1]);
        break;
      // update operators
      case 'm++':
      case '++m':
      case 'm--':
      case '--m':
      // unary operator
      case 'mtypeof':
        result = args[1]();
        break;
      // LHS value assignment on ES module with args[1] = (cb) => ({set ['='](v){a=v;cb(v);}, get ['='](){return a;}}) 
      case 'm.=':
        result = args[1](v => Policy.trackClass(args[0] /* moduleContext */, v));
        break;
      // assignment operators on ES module
      case 'm=': // trackResultAsGlobal === args[0] === moduleContext
      case 'm+=':
      case 'm-=':
      case 'm*=':
      case 'm/=':
      case 'm%=':
      case 'm**=':
      case 'm<<=':
      case 'm>>=':
      case 'm>>>=':
      case 'm&=':
      case 'm^=':
      case 'm|=':
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
