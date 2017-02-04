[![npm](https://img.shields.io/npm/v/thin-hook.svg)](https://www.npmjs.com/package/thin-hook)
[![Bower](https://img.shields.io/bower/v/thin-hook.svg)](https://github.com/t2ym/thin-hook)

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
  const crypto = require('crypto');
  const hashSalt = '__hash_salt__';
  let contexts = {};

  hook.contextGenerators.hash = function generateHashContext(astPath) {
    const hash = crypto.createHash('sha256');
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
    <script src="../thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&fallback-page=index-no-sw.html&service-worker-ready=true"></script>
    <!-- Hook Callback Function -->
    <script no-hook>
      window.__hook__ = function __hook__(f, thisArg, args, context) {
        ...
        return thisArg ? f.apply(thisArg, args) : f(...args);
      }
    </script>
    ...
</html>
```

#### Encoded HTML (Service Worker converts it to Decoded HTML)

```html
<html>
  <head>
    <script src="../thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&fallback-page=index-no-sw.html&service-worker-ready=false"></script></head></html><!--
    <C!-- Hook Callback Function --C>
    <script no-hook>
      window.__hook__ = function __hook__(f, thisArg, args, context) {
        ...
        return thisArg ? f.apply(thisArg, args) : f(...args);
      }
    </script>
    ...
</html>-->
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

- `hook(code: string, hookName: string = '__hook__', initialContext: Array = [], contextGeneratorName: string = 'method', metaHooking: boolean = true)`
  - `code`: input JavaScript as string
  - `hookName`: name of hook callback function
  - `initialContext`: typically `[ ['script.js', {}] ]`
  - `contextGeneratorName`: function property name in `hook.contextGenerators`
    - argument `astPath = [ ['script.js', {}], ['root', rootAst], ['body', bodyAst], ..., [0, FunctionExpressionAst] ]`
  - `metaHooking`: Enable meta hooking (run-time hooking of metaprogramming) if true
- `hook.__hook__` - minimal hook callback `function __hook__()`
- `hook.contextGenerators`: object. Context Generator Functions
  - `null()`: context as `''`
  - `astPath(astPath: Array)`: context as `'script.js,[root]Program,body,astType,...'`
  - `method(astPath: Array)`: context as `'script.js,Class,Method'`
  - custom context generator function has to be added to this object with its unique contextGeneratorName
- `hook.Function(hookName, initialContext: Array = [['Function', {}]], contextGeneratorName)`: hooked Function constructor
  - Usage: `(new (hook.Function('__hook__', [['window,Function', {}]], 'method'))('return function f() {}'))()`
  - Automatically applied in `hook()` preprocessing
- `hook.hook(target: Class, ...)`: hook platform global object with `target`
  - Usage: `hook.hook(hook.Function('__hook__', [['window,Function', {}]], 'method'))`
- `hook.serviceWorkerHandlers`: Service Worker event handlers
  - `install`: 'install' event handler. Set version from the `version` parameter
  - `activate`: 'activate' event handler. Clear caches of old versions.
  - `fetch`: 'fetch' event handler. Cache hooked JavaScripts and HTMLs except for the main page loading `hook.min.js`
    - `<script src="thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&discard-hook-errors=true&fallback-page=index-no-sw.html&service-worker-ready=true"></script>`: arguments from the page
      - `version`: default `1`. Service Worker cache version. Old caches are flushed when the version is changed in the main page and reloaded. Service Worker is updated when the controlled page is detached after the reloading.
      - `hook-name`: default `__hook__`. hook callback function name
      - `context-generator-name`: default `method`. context generator callback function name
      - `discard-hook-errors`: `true` if errors in hooking are ignored and the original contents are provided. Default: `true`
      - `fallback-page`: fallback page to land if Service Worker is not available in the browser
      - `service-worker-ready`: `true` if the entry HTML page is decoded; `false` if encoded. This parameter must be at the end of the URL
    - `<script src="script.js?no-hook=true"></script>`: skip hooking for the source script
    - `<script no-hook>...</script>`: skip hooking for the embedded script
    - register as Service Worker
      - `Service-Worker-Allowed` HTTP response header must have an appropriate scope for the target application
- `hook.serviceWorkerTransformers`:
  - `encodeHtml(html: string)`: encode HTML for Service Worker
  - `decodeHtml(html: string)`: decode encoded HTML for Service Worker
- `hook.registerServiceWorker(fallbackUrl: string = './index-no-service-worker.html', reloadTimeout: number = 500, inactiveReloadTimeout: number = 1000)`:
  - Automatically called on loading `hook.min.js` on browsers
  - `fallbackUrl`: fallback URL for browsers without Service Worker
  - `reloadTimeout`: default: 500 (ms). Timeout to reload the page when no Service Worker is detected
  - `inactiveReloadTimeout`: default: 1000 (ms). Timeout to reload the page when inactive (waiting, installing) Service Worker is detected. When a state change of the Service Worker instance is detected, the page is reloaded immediately even before the timeout.

## TODOs

- Refine API
- Hook `eval()` to preprocess scripts
- Hook `document.write('<script>')` to preprocess scripts
- Hook `HTMLScriptElement.textContent` to preprocess scripts
- Run as run-time HTML and JavaScript contents filter in Service Worker
- Test Suites
- Demo
- Performance Optimization

## License

[BSD-2-Clause](https://github.com/t2ym/thin-hook/blob/master/LICENSE.md)
