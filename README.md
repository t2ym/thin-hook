[![npm](https://img.shields.io/npm/v/thin-hook.svg)](https://www.npmjs.com/package/thin-hook)
[![Bower](https://img.shields.io/bower/v/thin-hook.svg)](https://customelements.io/t2ym/thin-hook/)

# thin-hook

Thin Hook Preprocessor (experimental)

### Input
```javascript
  class C {
    add(a = 1, b = 2) {
      let plus = (x, y) => x + y;
      return plus(x, y);
    }
  } 
```

### Hooked Output
```javascript
  class C {
    add(a, b) {
      return __hook__((a = 1, b = 2) => {
        let plus = (...args) => __hook__((x, y) => x + y, this, args, 'examples/example2.js,C,add,plus');
        return plus(x, y);
      }, this, arguments, 'examples/example2.js,C,add');
    }
  }
```

### Preprocess

```javascript
  const hook = require('thin-hook/hook.js');
  let code = fs.readFileSync('src/target.js', 'UTF-8');
  let initialContext = [['src/target.js', {}]];
  let gen = hook(code, '__hook__', initialContext, generateHashContext);
  fs.writeFileSync('hooked/target.js', gen);
  fs.writeFileSync('hooked/target.js.contexts.json', JSON.stringify(initialContext[0][1], null, 2));
```

### Context Generator Function (customizable)

```javascript
  // Built-in Context Generator Function
  hook.methodContextGenerator = function generateMethodContext(astPath) {
    return astPath.map(([ path, node ], index) => node && node.type
      ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name ? node.key.name : ''))
      : index === 0 ? path : '').filter(p => p).join(',');
  }
```

```javascript
  // Example Custom Context Generator Function with Hashing
  const crypto = require('crypto');

  function generateHashContext(astPath) {
    const hash = crypto.createHash('sha256');
    let methodContext = astPath.map(([ path, node ], index) => node && node.type
      ? (node.id && node.id.name ? node.id.name : (node.key && node.key.name ? node.key.name : ''))
      : index === 0 ? path : '').filter(p => p).join(',');
    hash.update(methodContext);
    let hashContext = hash.digest('hex');
    astPath[0][1][hashContext] = methodContext;
    return hashContext;
  }
```

### Hook Callback Function (customizable)

```javascript
  // Built-in Minimal Hook Callback Function
  hook.__hook__ = function __hook__(f, thisArg, args, context) {
    return thisArg ? f.apply(thisArg, args) : f(...args);
  }
```

```javascript
  // Example Hook Callback Function with Primitive Access Control
  hashContext = { 'hash': 'context', ... }; // Generated from hook.preprocess initialContext[0][1]
  trustedContext = { 'context': /trustedModules/, ... }; // Access Policies

  window.__hook__ = function __hook__(f, thisArg, args, context) {
    console.log('hook:', context, args);
    if (!hashContext[context] ||
        !trustedContext[hashContext[context]] ||
        !(new Error('').stack.match(trustedContext[hashContext[context]]))) {
      // plus check thisArg, args, etc.
      throw new Error('Permission Denied');
    }
    return thisArg ? f.apply(thisArg, args) : f(...args);
  }
```

## Supported Syntax

- Functions
- Object Shorthand Methods (`{ m() {} }`)
- ES6 Classes (`constructor`, `super`, `this`)
- Generator Functions (`function *g() { yield X }`)
- Arrow Functions (`a => a`, `a => { return a; }`, `a => ({ p: a })`)
- Async Functions (`async function f() {}`, `async method() {}`, `async () => {}`)
- Default Parameters for Functions/Methods/Arrow Functions
- Default Parameters with Destructuring (`function f([ a = 1 ], { b = 2, x: c = 3 }) {}`)

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

TBD

- `hook(code: string, hookName: string = '__hook__', initialContext: Array = [], contextGenerator: function = hook.methodContextGenerator)`
  - `code`: input JavaScript as string
  - `hookName`: name of hook callback function
  - `initialContext`: typically `[ ['script.js', {}] ]`
  - `contextGenerator(astPath)`: callback function with `astPath = [ ['script.js', {}], ['root', rootAst], ['body', bodyAst], ..., [0, FunctionExpressionAst] ]`
- `hook.__hook__` - minimal hook callback `function __hook__()`
- Built-in Context Generator Functions:
  - `hook.nullContextGenerator()`: context as `''`
  - `hook.astPathContextGenerator(astPath: Array)`: context as `'script.js,[root]Program,body,astType,...'`
  - `hook.methodContextGenerator(astPath: Array)`: context as `'script.js,Class,Method'`

## TODOs

- Refine API
- Hook `new Function()` to preprocess scripts
- Hook `eval()` to preprocess scripts
- Hook `document.write('<script>')` to preprocess scripts
- Hook `HTMLScriptElement.textContent` to preprocess scripts
- Run as run-time HTML and JavaScript contents filter in Service Worker
- Test Suites
- Demo
- Performance Optimization

## License

[BSD-2-Clause](https://github.com/t2ym/thin-hook/blob/master/LICENSE.md)
