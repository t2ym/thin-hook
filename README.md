[![npm version](https://badge.fury.io/js/thin-hook.svg)](https://badge.fury.io/js/thin-hook)
[![Bower version](https://badge.fury.io/bo/thin-hook.svg)](https://badge.fury.io/bo/thin-hook)

# thin-hook

Thin Hook Preprocessor (experimental)

## Notes
- **[Context Generator Compatibility]** Since [0.0.148](https://github.com/t2ym/thin-hook/releases/tag/0.0.148) with [#144](https://github.com/t2ym/thin-hook/issues/144), the old context generator `"method"` is renamed as `"oldMethod"` and the `"cachedMethod"` is renamed as `"method"` and become the new default context generator. The `"cachedMethod"` remains as an alias for the new `"method"` context generator. There are slight changes in the new `"method"` context generator. A warning message is shown on the debug console to notify the change.

| old name | new name | feature |
|:-----:|:-----:|:-----|
| `method` | `oldMethod` | `script.js,Class,method` |
| `cachedMethod` | `method` | `script.js,Class,method` including computed property names |

### Native API Access Graph generated via hook callback function (view2 of thin-hook/demo/)

<img src="https://raw.githubusercontent.com/wiki/t2ym/thin-hook/native_api_access_graph.png" width="768px">

[Demo](https://t2ym.github.io/thin-hook/components/thin-hook/demo/index.html) on GitHub Pages

### Input
```javascript
  class C {
    add(a = 1, b = 2) {
      let plus = (x, y) => x + y;
      return plus(a, b);
    }
  } 
```

### Hooked Output
```javascript
  class C {
    add(a, b) {
      return __hook__((a = 1, b = 2) => {
        let plus = (...args) => __hook__((x, y) => x + y, this, args, 'examples/example2.js,C,add,plus');
        return plus(a, b);
      }, this, arguments, 'examples/example2.js,C,add');
    }
  }
```

### Preprocess

```javascript
  const hook = require('thin-hook/hook.js');
  let code = fs.readFileSync('src/target.js', 'UTF-8');
  let initialContext = [['src/target.js', {}]];
  let gen = hook(code, '__hook__', initialContext, 'hash');
  fs.writeFileSync('hooked/target.js', gen);
  fs.writeFileSync('hooked/target.js.contexts.json', JSON.stringify(contexts, null, 2));
```

### Context Generator Function (customizable)

```javascript
  // Built-in Context Generator Function
  hook.contextGenerators.method = function generateMethodContext(astPath) {
    return astPath.map(([ path, node ], index) => node && node.type
      ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name
        ? (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
      : index === 0 ? path : '').filter(p => p).join(',');
  }
```

```javascript
  // Example Custom Context Generator Function with Hashing
  const hashSalt = '__hash_salt__';
  let contexts = {};

  hook.contextGenerators.hash = function generateHashContext(astPath) {
    const hash = hook.utils.createHash('sha256');
    let hashedInitialContext = astPath[0][0];
    astPath[0][0] = contexts[hashedInitialContext] || astPath[0][0];
    let methodContext = hook.contextGenerators.method(astPath);
    astPath[0][0] = hashedInitialContext;
    hash.update(hashSalt + methodContext);
    let hashContext = hash.digest('hex');
    contexts[hashContext] = methodContext;
    return hashContext;
  }
```

```javascript
{
  // Authorization Tickets for no-hook scripts
  // Ticket for this script itself is specified in URL of script tag as
  // hook.min.js?no-hook-authorization={ticket}
  // Note: no-hook-authorization must not exist in learning mode
  let noHookAuthorization = {
    // '*' is for learning mode to detect authorization tickets in 
    //   hook.parameters.noHookAuthorizationPassed,
    //   hook.parameters.noHookAuthorizationFailed
    // JSONs are output to console in the learning mode
    //'*': true,
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true,
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true,
    "ae11a06c0ddec9f5b75de82a40745d6d1f92aea1459e8680171c405a5497d1c8": true,
    "5b7ebf7b0b2977d44f47ffa4b19907abbc443feb31c343a6cbbbb033c8deb01a": true,
    "c714633723320be54f106de0c50933c0aeda8ac3fba7c41c97a815ed0e71594c": true,
    "2f43d927664bdfcbcb2cc4e3743652c7eb070057efe7eaf43910426c6eae7e45": true,
    "b397e7c81cca74075d2934070cbbe58f345d3c00ff0bc04dc30b5c67715a572f": true,
    "02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a": true,
    "aebb23ce36eb6f7d597d37727b4e6ee5a57aafc564af2d65309a9597bfd86625": true
  };
  let hidden;
  const passcode = 'XX02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a';
  if (typeof self === 'object' && self.constructor.name === 'ServiceWorkerGlobalScope') {
    // Service Worker
    let reconfigure = false;
    if (hook.parameters.noHookAuthorization) {
      if (Object.getOwnPropertyDescriptor(hook.parameters, 'noHookAuthorization').configurable) {
        reconfigure = true;
      }
    }
    else {
      reconfigure = true;
    }
    if (reconfigure) {
      Object.defineProperty(hook.parameters, 'noHookAuthorization', {
        configurable: false,
        enumerable: true,
        get() {
          return hidden;
        },
        set(value) {
          if (value && value.passcode === passcode) {
            delete value.passcode;
            Object.freeze(value);
            hidden = value;
          }
        }
      });
    }
    noHookAuthorization.passcode = passcode;
    hook.parameters.noHookAuthorization = noHookAuthorization;
  }
  else {
    // Browser Document
    Object.defineProperty(hook.parameters, 'noHookAuthorization', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Object.freeze(noHookAuthorization)
    });
  }
  if (!noHookAuthorization['*']) {
    Object.seal(hook.parameters.noHookAuthorizationPassed);
  }
}
{
  // source map target filters
  hook.parameters.sourceMap = [
    url => location.origin === url.origin && url.pathname.match(/^\/components\/thin-hook\/demo\//)
  ];
  // hook worker script URL
  hook.parameters.hookWorker = `hook-worker.js?no-hook=true`;
}
```

```javascript
// Hook worker script (demo/hook-worker.js)
//
// Configuration:
//   hook.parameters.hookWorker = `hook-worker.js?no-hook=true`;
importScripts('../hook.min.js?no-hook=true', 'context-generator.js?no-hook=true');
onmessage = hook.hookWorkerHandler;
```

```html
  <!-- Example Custom Context Generator for Service Worker and Browser Document -->
  <script src="bower_components/thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&context-generator-name=method2&fallback-page=index-fb.html&service-worker-ready=true"></script>
  <script context-generator src="custom-context-generator.js?no-hook=true"></script>
  <script context-generator no-hook>
  {
    hook.contextGenerators.method2 = function generateMethodContext2(astPath) {
      return astPath.map(([ path, node ], index) => node && node.type
        ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name
          ? (node.kind === 'get' || node.kind === 'set' ? node.kind + ' ' : node.static ? 'static ' : '') + node.key.name : ''))
        : index === 0 ? path : '').filter(p => p).join(',') +
          (astPath[astPath.length - 1][1].range ? ':' + astPath[astPath.length - 1][1].range[0] + '-' + astPath[astPath.length - 1][1].range[1] : '');
    }
    Object.freeze(hook.contextGenerators);
    // CORS script list
    hook.parameters.cors = [
      'https://raw.githubusercontent.com/t2ym/thin-hook/master/examples/example1.js',
      (url) => { let _url = new URL(url); return _url.hostname !== location.hostname && ['www.gstatic.com'].indexOf(_url.hostname) < 0; }
    ];
  }
  </script>
```

### Hook Callback Function (customizable)

```javascript
  // Built-in Minimal Hook Callback Function without hooking properties (hook-property=false)
  hook.__hook_except_properties__ = function __hook_except_properties__(f, thisArg, args, context, newTarget) {
    return newTarget
      ? Reflect.construct(f, args)
      : thisArg
        ? f.apply(thisArg, args)
        : f(...args);
  }
```

```javascript
  // the global object
  const _global = (new Function('return this'))();

  // Built-in Minimal Hook Callback Function with hooking properties (hook-property=true) - default
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
```

```javascript
  // Example Hook Callback Function with Primitive Access Control
  hashContext = { 'hash': 'context', ... }; // Generated from hook.preprocess initialContext[0][1]
  trustedContext = { 'context': /trustedModules/, ... }; // Access Policies

  window.__hook__ = function __hook__(f, thisArg, args, context, newTarget) {
    console.log('hook:', context, args);
    if (!hashContext[context] ||
        !trustedContext[hashContext[context]] ||
        !(new Error('').stack.match(trustedContext[hashContext[context]]))) {
      // plus check thisArg, args, etc.
      throw new Error('Permission Denied');
    }
    return newTarget
      ? Reflect.construct(f, args)
      : thisArg
        ? f.apply(thisArg, args)
        : f(...args);
  }
```

### Entry HTML with Service Worker

If hooking is performed run-time in Service Worker, the entry HTML page must be loaded via Service Worker
so that no hook-targeted scripts are evaluated without hooking.

To achieve this, the static entry HTML has to be __Encoded__ at build time by `hook.serviceWorkerTransformers.encodeHTML(html)`.

#### Hook CLI to encode the entry HTML

```sh
  # encode src/index.html to dist/index.html
  hook --out dist/index.html src/index.html
```

#### Decoded/Original HTML (source code)

```html
<html>
  <head>
    <script src="../thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&fallback-page=index-no-sw.html&hook-property=false&service-worker-ready=true"></script>
    <!-- Hook Callback Function witout hooking properties -->
    <script no-hook>
      window.__hook__ = function __hook__(f, thisArg, args, context, newTarget) {
        ...
        return newTarget
          ? Reflect.construct(f, args)
          : thisArg
            ? f.apply(thisArg, args)
            : f(...args);
      }
    </script>
    ...
</html>
```

#### Encoded HTML (Service Worker converts it to Decoded HTML)

```html
<html>
  <head>
    <script src="../thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&fallback-page=index-no-sw.html&hook-property=false&service-worker-ready=false"></script></head></html><!--
    <C!-- Hook Callback Function without hooking properties --C>
    <script no-hook>
      window.__hook__ = function __hook__(f, thisArg, args, context, newTarget) {
        ...
        return newTarget
          ? Reflect.construct(f, args)
          : thisArg
            ? f.apply(thisArg, args)
            : f(...args);
      }
    </script>
    ...
</html>-->
```

## Supported Syntax

- Functions
- Object Shorthand Methods (`{ m() {} }`)
- ES6 Classes (`constructor`, `super`, `this`, `new`)
- ES6 Modules (`import`, `export`);
- Expressions in Template Literals(`` `${(v => v * v)(x)}` ``)
- Generator Functions (`function *g() { yield X }`)
- Arrow Functions (`a => a`, `a => { return a; }`, `a => ({ p: a })`)
- Async Functions (`async function f() {}`, `async method() {}`, `async () => {}`)
- Default Parameters for Functions/Methods/Arrow Functions
- Default Parameters with Destructuring (`function f([ a = 1 ], { b = 2, x: c = 3 }) {}`)
- Property Accessors (`o.p`, `o['p']`, `o.p()`)

## Install

### Browsers

```sh
  bower install --save thin-hook
```

### NodeJS

```sh
  npm install --save thin-hook
```

## Import

### Browsers

```html
  <!-- browserified along with espree and escodegen; minified -->
  <script src="path/to/bower_components/thin-hook/hook.min.js"></script>
```

### NodeJS

```javascript
  const hook = require('thin-hook/hook.js');
```

## API (Tentative)

- `hook(code: string, hookName: string = '__hook__', initialContext: Array = [], contextGeneratorName: string = 'method', metaHooking: boolean = true, hookProperty: boolean = true, sourceMap: object = null, asynchronous: boolean = false, compact: boolean = false, hookGlobal: boolean = true, hookPrefix: string = '_p_', initialScope: object = null)`
  - `code`: input JavaScript as string
  - `hookName`: name of hook callback function
  - `initialContext`: typically `[ ['script.js', {}] ]`
  - `contextGeneratorName`: function property name in `hook.contextGenerators`
    - argument `astPath = [ ['script.js', {}], ['root', rootAst], ['body', bodyAst], ..., [0, FunctionExpressionAst] ]`
  - `metaHooking`: Enable meta hooking (run-time hooking of metaprogramming) if true
  - `hookProperty`: Enable hooking of object property accessors and new operators if true
  - `sourceMap`: Source map parameter in an object. `{ pathname: 'path/to/script_source.js'}` Default: null
  - `asynchronous`: Return a Promise if true. Default: false
  - `compact`: Generate compact code if true. Default: false
    - Note: `sourceMap` is disabled when `compact` is true
  - `hookGlobal`: Hook global variable access. Must be enabled with `hookProperty`. Default: true
  - `hookPrefix`: Prefix for `hook.global()._p_GlobalVariable` proxy accessors. Default: `_p_`
    - Note: `hook.global()` return the global object with `get/set` accessors for the prefixed name
  - `initialScope`: Initial scope object (`{ vname: true, ... }`) for hooked eval scripts. Default: null
- `hook.hookHtml(html: string, hookName, url, cors, contextGenerator, contextGeneratorScripts, isDecoded, metaHooking = true, scriptOffset = 0, _hookProperty = true, asynchronous = false)`
- `hook.__hook__(f: function or string, thisArg: object, args: Array, context: string, newTarget: new.target meta property)`
  - minimal hook callback function with property hooking
  - `f`:
    - `function`: target function to hook
    - `string`: property operation to hook
      - `.`: get property (`o.prop`)
      - `*`: iterate over (`for (p in o)`, `for (p of o)`)
      - `in`: property existence (`'p' in o`)
      - `()`: function call (`o.func()`)
      - `=`, `+=`, ...: assignment operation (`o.prop = value`)
      - `p++`, `++p`, `p--`, `--p`: postfixed/prefixed increment/decrement operation (`o.prop++`)
      - `delete`: delete operation (`delete o.prop`)
      - `s.`: get property of super (`super.prop`)
      - `s()`: call super method (`super.method()`)
      - `s=`, `s+=`, ...: assignment operation for super (`super.prop = value`)
      - `s++`, `++s`, `s--`, `--s`: postfixed/prefixed increment/decrement operation for super (`super.prop++`)
      - `w.`, `w=`, `w()`, `w++`, ...: operations on variables in within `with` statements
  - `thisArg`: `this` object for the function or the operation
  - `args`:
    - arguments for the function
    - `[ property ]` for property access operations
    - `[ property, value ]` for property assignment operations
    - `[ property, [...args] ]` for function call operations
  - `context`: context in the script
  - `newTarget`: `new.target` meta property for constructor calls;
    - `true` for new calls
    - Falsy values for non-`new` operations for faster detection of the operations
      - `false` for `with` statement calls
      - `0` for function calls
      - `undefined` for other calls
- `hook.__hook_except_properties__(f, thisArg, args, context, newTarget)`
  - minimal hook callback function without property hooking
- `hook.hookCallbackCompatibilityTest(__hook__ = window[hookName], throwError = true, checkTypeError = true)`
  - run-time test suite for hook callback function
  - Usage: `window.__hook__ = function __hook__ (...) {}; hook.hookCallbackCompatibilityTest();`
  - An error is thrown on compatibility test failure.
  - `false` is returned on a test failure if `throwError = false`
  - tests on non-callable object's function call are skipped if `checkTypeError = false`
- `hook.contextGenerators`: object. Context Generator Functions
  - `null()`: context as `''`
  - `astPath(astPath: Array)`: context as `'script.js,[root]Program,body,astType,...'`
  - `method(astPath: Array)`: context as `'script.js,Class,Method'` with caching, including computed method variable name
  - `cachedMethod(astPath: Array)`: alias for `method`
  - `cachedMethodDebug(astPath: Array)`: context as `'script.js,Class,Method'`, comparing contexts with those by "oldMethod" in console.warn() messages
  - `oldMethod(astPath: Array)`: context as `'script.js,Class,Method'` for compatibility
  - custom context generator function has to be added to this object with its unique contextGeneratorName
- Hooked Native APIs: Automatically applied in `hook()` preprocessing
  - `hook.global(hookCallback: function = hookName, context: string, name: string, type: string)._p_name`: hooked global variable accessor when `hookGlobal` is true
    - `type`: one of `'var', 'function', 'let', 'const', 'class', 'get', 'set', 'delete', 'typeof'`
  - `hook.Function(hookName, initialContext: Array = [['Function', {}]], contextGeneratorName)`: hooked Function constructor for use in hook callback function `__hook__`
    - Usage: `(new (hook.Function('__hook__', [['window,Function', {}]], 'method'))('return function f() {}'))()`
    - Notes:
      - Avoid replacing the native API `window.Function` for better transparency (now commented out in the `demo/hook-native-api.js`)
      - **NOT automatically applied in the hooking**
      - Applied in the hook callback function (`__hook__`) instead
  - `hook.FunctionArguments(hookName, initialContext: Array = [['Function', {}]], contextGeneratorName = 'method', args, isGenerator = false)`: generate hooked Function arguments to hand to Function constructor for use in hook callback function `__hook__`
    - Usage: `hook.FunctionArguments('__hook__', [['window,Function', {}]], 'method', ['return function f() {}'])`
    - Returns hooked `args` in a cloned `Array`
  - `hook.eval(hookName, initialContext: Array = [['eval', {}]], contextGeneratorName)`: hooked eval function
    - Usage: `hook.eval('__hook__', [['eval', {}]], 'method'))('1 + 2', (script, eval) => eval(script))`
    - Note: In no-hook scripts with the hooked global `eval` function via `hook.hook(hook.eval(...))`, the evaluation is bound to the global scope unless the wrapper arrow function `(script, eval) => eval(script)` is defined in the local scope and specifed as the second argument of each `eval()` call
  - `hook.setTimeout(hookName, initialContext: Array = [['setTimeout', {}]], contextGeneratorName)`: hooked setTimeout function
    - Note: Not automatically applied if the first argument is an (arrow) function expression
  - `hook.setInterval(hookName, initialContext: Array = [['setInterval', {}]], contextGeneratorName)`: hooked setInterval function
    - Note: Not automatically applied if the first argument is an (arrow) function expression
  - `hook.Node(hookName, initialContext: Array = [['Node', {}]], contextGeneratorName)`: hook `textContent` property
    - `set textContent`: hooked with context 'ClassName,set textContent'
  - `hook.Element(hookName, initialContext: Array = [['Element', {}]], contextGeneratorName)`: hook `setAttribute` function
    - `setAttribute('onXX', '{script in attribute}')`: Script in onXX handler attribute is hooked
    - `setAttribute('href', 'javascript:{script in URL}')`: Script in URL `"javascript:{script in URL}"` is hooked
  - `hook.HTMLScriptElement(hookName, initialContext: Array = [['HTMLScriptElement', {}]], contextGeneratorName)`: HTMLScriptElement with hooked properties
    - Note: Applied only at run time. Not applied in preprocessing. `HTMLScriptElement` class is the same object as the native one. `hook.Node` and `hook.Element` are called internally.
    - `set textContent`: Script in `textContent` is hooked if `type` is a JavaScript MIME type. `Node.textContent` is hooked as well.
      - Note: Scripts set by `innerHTML`/`outerHTML`/`text` properties are NOT executed, while `text` should be executed according to the standards.
    - `set type`: Script in `this.textContent` is hooked if `type` is a JavaScript MIME type.
    - `setAttribute('type', mimeType)`: Script in `this.textContent` is hooked if `mimeType` is a JavaScript MIME type. `Element.setAttribute` is hooked as well.
  - `hook.HTMLAnchorElement(hookName, initialContext: Array = [['HTMLAnchorElement', {}]]), contextGeneratorName)`: HTMLAnchorElement with hooked href property
    - `set href`: Script in URL `"javascript:{script in URL}"` is hooked
  - `hook.HTMLAreaElement(hookName, initialContext: Array = [['HTMLAreaElement', {}]]), contextGeneratorName)`: HTMLAreaElement with hooked href property
    - `set href`: Script in URL `"javascript:{script in URL}"` is hooked
  - `hook.Document(hookName, initialContext: Array = [['Document', {}]], contextGeneratorName)`: hook `write` function
    - `write('<sc' + 'ript>{script in string}</sc' + 'ript>')`: Script in HTML fragment is hooked
  - `hook.with(scope: Object, ...scopes: Array of Object)`: Hook `with` statement scope object
    - `with (hook.with(obj, { v1: true, v2: true, ...})) {}`
- `hook.hook(target: Class, ...)`: hook platform global object with `target`
  - Usage: `['Function','setTimeout','setInterval',...].forEach(name => hook.hook(hook.Function('__hook__', [[name, {}]], 'method'))`
- `hook.serviceWorkerHandlers`: Service Worker event handlers
  - `install`: 'install' event handler. Set version from the `version` parameter
  - `activate`: 'activate' event handler. Clear caches of old versions.
  - `fetch`: 'fetch' event handler. Cache hooked JavaScripts and HTMLs except for the main page loading `hook.min.js`
    - `<script src="thin-hook/hook.min.js?version=1&sw-root=/&no-hook=true&hook-name=__hook__&discard-hook-errors=true&fallback-page=index-no-sw.html&hook-property=true&service-worker-ready=true"></script>`: arguments from the page
      - `version`: default `1`. Service Worker cache version. Old caches are flushed when the version is changed in the main page and reloaded. Service Worker is updated when the controlled page is detached after the reloading.
      - `sw-root`: optional. Set Service Worker scope
      - `hook-name`: default `__hook__`. hook callback function name
      - `context-generator-name`: default `method`. context generator callback function name
      - `discard-hook-errors`: `true` if errors in hooking are ignored and the original contents are provided. Default: `true`
      - `fallback-page`: fallback page to land if Service Worker is not available in the browser
      - `no-hook-authorization`: Optional. CSV of no-hook authorization tickets for no-hook scripts. Typically for ticket of no-hook authorization script itself.
        - The values are stored in `hook.parameters.noHookAuthorizationPreValidated` object in Service Worker
        - Add the value `log-no-hook-authorization` to log authorization in console
        - Note: `no-hook-authorization` must not exist in learning mode with `hook.parameters.noHookAuthorization['*'] === true`
          - Steps to update authorized no-hook scripts:
            - 1. Let no-hook be "learning mode" by truthy `hook.parameters.noHookAuthorization['*']`
            - 2. Remove (or temporarily rename) `no-hook-authorization` parameter from hook.min.js
            - 3. Update no-hook script(s)
            - 4. Clear Service Worker(s)
            - 5. Update `version` parameter for hook.min.js
            - 6. Check "Preserve Logs" option in debugger console
            - 7. Reload the page(s) with no-hook script(s)
            - 8. Copy and Paste values of hook.parameters.noHookAuthorizationPassed from both browser document and Service Worker to no-hook authorization script
            - 9. Disable "learning mode"
            - 10. Enable (or revive) `no-hook-authorization` parameter for hook.min.js with a dummy value
            - 11. Clear Service Worker(s)
            - 12. Update `version` parameter for hook.min.js
            - 13. Reload the page(s) with no-hook scripts(s)
            - 14. Copy and Paste the ticket for the no-hook authorization script into the `no-hook-authorization` parameter
            - 15. Update `version` parameter for hook.min.js
            - 16. Clear Service Worker(s)
            - 17. Reload the page(s) with no-hook script(s)
            - 18. Check if there are no unauthorized no-hook scripts
      - `hook-property`: `hookProperty` parameter. `true` if property accessors are hooked. The value affects the default value of the `hookProperty` parameter for `hook()`
      - `hook-global`: `hookGlobal` parameter. `true` if global variables are hooked. The value affects the default value of the `hookGlobal` parameter for `hook()`
      - `hook-prefix`: `hookPrefix` parameter. Prefix accessor names of `hook.global()._p_GlobalVariableName` with the value. Default: `_p_`
      - `compact`: `compact` parameter. Generate compact code if `true`. The value affects the default value of the `compact` parameter for `hook()`
      - `service-worker-ready`: `true` if the entry HTML page is decoded; `false` if encoded. This parameter must be at the end of the URL
    - `<script src="script.js?no-hook=true"></script>`: skip hooking for the source script
    - `<script no-hook>...</script>`: skip hooking for the embedded script
    - `<script context-generator>`: register a custom context generator for both Service Worker and browser document
      - `<script context-generator no-hook>hook.contextGenerators.custom = function (astPath) {...}</script>`: embedded script
      - `<script context-generator src="custom-context-generator.js?no-hook=true"></script>`: with src URL
      - Valid only in the main entry document with `hook.min.js` for Service Worker
      - Must be runnable in both Service Worker and browser document
      - Extensions other than context generators:
        - Set Service Worker parameters:
          - `hook.parameters.cors = [ 'cors_url_1', 'cors_url_2', ... ]`: specify CORS script URLs
          - `hook.parameters.cors = [ (url) => url.match(/cors_url_pattern/), ... ]`: specify CORS script URL detector function(s)
        - Set `no-hook` Authorization Tickets:
          - `hook.parameters.noHookAuthorization = { '{sha-256 hex hash for authorized no-hook script}': true, ... }`: Set keys from `hook.parameters.noHookAuthorizationPassed` in __both Document and Service Worker threads__
          - `hook.parameters.noHookAuthorization = { '*': true }`: learning mode to detect authorization tickets
        - Specify URL patterns for `no-hook` scripts:
          - `hook.parameters.noHook = [ 'no_hook_url_1', 'no_hook_url_2', ... ]`: specify `no-hook` script URLs
          - `hook.parameters.noHook = [ (url: URL) => !!url.href.match(/{no-hook URL pattern}/), ... ]`: specify `no-hook` script URL detector function(s)
        - Specify URL patterns for source map target scripts:
          - `hook.parameters.sourceMap = [ 'source_map_target_url_1', 'source_map_target_url_2', ... ]`: specify source map target script URLs
          - `hook.parameters.sourceMap = [ (url: URL) => !!url.href.match(/{source map target URL pattern}/), ... ]`: specify source map target script URL detector function(s)
        - Specify URL for hook worker script:
          - `hook.parameters.hookWorker = 'hook-worker.js?no-hook=true'`: specify hook worker script URL
        - Register Custom Event Handler:
          - `if (typeof self === 'object' && self instanceof 'ServiceWorkerGlobalScope') { self.addEventListener('{event_type}', function handler(event) {...})}`
    - register as Service Worker
      - `Service-Worker-Allowed` HTTP response header must have an appropriate scope for the target application
    - `cors=true` parameter: CORS script, e.g., `<script src="https://cross.origin.host/path/script.js?cors=true"></script>`
- `hook.serviceWorkerTransformers`:
  - `encodeHtml(html: string)`: encode HTML for Service Worker
  - `decodeHtml(html: string)`: decode encoded HTML for Service Worker
- `hook.hookWorkerHandler(event)`: onmessage handler for Hook Workers
  - Usage: `onmessage = hook.hookWorkerHandler` in Hook Worker script
- `hook.registerServiceWorker(fallbackUrl: string = './index-no-service-worker.html', reloadTimeout: number = 500, inactiveReloadTimeout: number = 1000)`:
  - Automatically called on loading `hook.min.js` on browsers
  - `fallbackUrl`: fallback URL for browsers without Service Worker
  - `reloadTimeout`: default: 500 (ms). Timeout to reload the page when no Service Worker is detected
  - `inactiveReloadTimeout`: default: 1000 (ms). Timeout to reload the page when inactive (waiting, installing) Service Worker is detected. When a state change of the Service Worker instance is detected, the page is reloaded immediately even before the timeout.
- `utils`: Utilities
  - `createHash`: Synchronous SHA hash generator collections from [sha.js](https://github.com/crypto-browserify/sha.js)

## TODOs

- Refine API
- Hook Coverage
  - Hook Web Worker Scripts
  - Hook Native APIs
- Consistent Contexts
- Track Asynchronous Calls
- Security Policies
  - Framework for Access Control Policies
  - Framework for Context Transition Policies
  - Modularization of Policies
- Test Suites
- Demo
- Performance Optimization

## License

[BSD-2-Clause](https://github.com/t2ym/thin-hook/blob/master/LICENSE.md)
