[![npm](https://img.shields.io/npm/v/thin-hook.svg)](https://www.npmjs.com/package/thin-hook)
[![Bower](https://img.shields.io/bower/v/thin-hook.svg)](https://github.com/t2ym/thin-hook)

# thin-hook

Thin Hook Preprocessor (experimental)

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
- Hooked Native APIs: Automatically applied in `hook()` preprocessing
  - `hook.Function(hookName, initialContext: Array = [['Function', {}]], contextGeneratorName)`: hooked Function constructor
    - Usage: `(new (hook.Function('__hook__', [['window,Function', {}]], 'method'))('return function f() {}'))()`
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
    - Note: Applied only at run time. Not applied in preprocessing. `HTMLScriptElement` class is the same object as the native one.
    - `set textContent`: Script in `textContent` is hooked if `type` is a JavaScript MIME type. `Node.textContent` is hooked as well.
      - Note: Scripts set by `innerHTML`/`outerHTML`/`text` properties are NOT executed, while `text` should be executed according to the standards.
    - `set type`: Script in `this.textContent` is hooked if `type` is a JavaScript MIME type.
    - `setAttribute('type', mimeType)`: Script in `this.textContent` is hooked if `mimeType` is a JavaScript MIME type. `Element.setAttribute` is hooked as well.
  - `hook.HTMLAnchorElement(hookName, initialContext: Array = [['HTMLAnchorElement', {}]]), contextGeneratorName)`: HTMLAnchorElement with hooked href property
    - `set href`: Script in URL `"javascript:{script in URL}"` is hooked
  - `hook.HTMLAreaElement(hookName, initialContext: Array = [['HTMLAreaElement', {}]]), contextGeneratorName)`: HTMLAreaElement with hooked href property
    - `set href`: Script in URL `"javascript:{script in URL}"` is hooked
- `hook.hook(target: Class, ...)`: hook platform global object with `target`
  - Usage: `['Function','setTimeout','setInterval',...].forEach(name => hook.hook(hook.Function('__hook__', [[name, {}]], 'method'))`
- `hook.serviceWorkerHandlers`: Service Worker event handlers
  - `install`: 'install' event handler. Set version from the `version` parameter
  - `activate`: 'activate' event handler. Clear caches of old versions.
  - `fetch`: 'fetch' event handler. Cache hooked JavaScripts and HTMLs except for the main page loading `hook.min.js`
    - `<script src="thin-hook/hook.min.js?version=1&sw-root=/&no-hook=true&hook-name=__hook__&discard-hook-errors=true&fallback-page=index-no-sw.html&service-worker-ready=true"></script>`: arguments from the page
      - `version`: default `1`. Service Worker cache version. Old caches are flushed when the version is changed in the main page and reloaded. Service Worker is updated when the controlled page is detached after the reloading.
      - `sw-root`: optional. Set Service Worker scope
      - `hook-name`: default `__hook__`. hook callback function name
      - `context-generator-name`: default `method`. context generator callback function name
      - `discard-hook-errors`: `true` if errors in hooking are ignored and the original contents are provided. Default: `true`
      - `fallback-page`: fallback page to land if Service Worker is not available in the browser
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
        - Register Custom Event Handler:
          - `if (typeof self === 'object' && self instanceof 'ServiceWorkerGlobalScope') { self.addEventListener('{event_type}', function handler(event) {...})}`
    - register as Service Worker
      - `Service-Worker-Allowed` HTTP response header must have an appropriate scope for the target application
    - `cors=true` parameter: CORS script, e.g., `<script src="https://cross.origin.host/path/script.js?cors=true"></script>`
- `hook.serviceWorkerTransformers`:
  - `encodeHtml(html: string)`: encode HTML for Service Worker
  - `decodeHtml(html: string)`: decode encoded HTML for Service Worker
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
  - Hook `eval()` to preprocess scripts
  - Hook `document.write('<script>')` to preprocess scripts
  - Hook `element.setAttribute('onXX', '{script}')` to preprocess scripts
  - Hook `a.setAttribute('href', 'javascript:{script}')` to preprocess scripts
  - Hook `a.href = 'javascript:{script}'` to preprocess scripts
  - Hook Native APIs
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
