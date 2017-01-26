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
  let gen = hook.preprocess(code, '__hook__', [['src/target.js', {}]], hook.methodContextGenerator);
  fs.writeFileSync('hooked/target.js', gen);
```

### Hook Callback Function

```javascript
  window.__hook__ = function __hook__(f, thisArg, args, context) {
    console.log('hook:', context, args);
    return thisArg ? f.apply(thisArg, args) : f(...args);
  }
```

#### Note: `context` argument is not implemented yet

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
  <!-- browserified with espree and escodegen; ES5 transpiled; minified -->
  <script src="path/to/bower_components/thin-hook/hook.min.js"></script>
```

### NodeJS

```javascript
  const hook = require('thin-hook/hook.js');
```

## API (Tentative)

TBD

- `hook.hook` - default hook callback `function __hook__()`
- `hook.preprocess(code: string, hookName: string = '__hook__', initialContext: Array = [], contextGenerator: function = hook.methodContextGenerator)`
  - `code`: input JavaScript as string
  - `hookName`: name of hook callback function
  - `initialContext`: typically `[ ['script.js', {}] ]`
  - `contextGenerator(astPath)`: callback function with `astPath = [ ['script.js', {}], ['root', rootAst], ['body', bodyAst], ..., [0, FunctionExpressionAst] ]`
- Built-in Context Generator Functions:
  - `hook.nullContextGenerator()`: context as `''`
  - `hook.astPathContextGenerator(astPath: Array)`: context as `'script.js,[root]Program,body,astType,...'`
  - `hook.methodContextGenerator(astPath: Array)`: context as `'script.js,Class,Method'`
- `hook.escodegenOptions`: object passed to `escodegen.generate` options
- `hook.espreeOptions`: object passed to `espree.parse` options

## TODOs

- Build Script
- Refine API
- Add `context` argument to the `__hook__` callback function
- Hook `new Function()` to preprocess scripts
- Hook `eval()` to preprocess scripts
- Hook `document.write('<script>')` to preprocess scripts
- Hook `HTMLScriptElement.textContent` to preprocess scripts
- Run as run-time HTML and JavaScript contents filter in Service Worker
- Support Source Map
- Test Suites
- Demo
- Performance Optimization

## License

[BSD-2-Clause](https://github.com/t2ym/thin-hook/blob/master/LICENSE.md)
