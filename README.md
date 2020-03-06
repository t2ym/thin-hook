[![npm version](https://badge.fury.io/js/thin-hook.svg)](https://badge.fury.io/js/thin-hook)
[![Bower version](https://badge.fury.io/bo/thin-hook.svg)](https://badge.fury.io/bo/thin-hook)

# thin-hook

Thin Hook Preprocessor (experimental)

## Notes
- **[Vulnerability Fix]** Since [0.4.0-alpha.19](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.19) with [Fix #347 Apply ACL for properties of primitive values](https://github.com/t2ym/thin-hook/issues/347), `acl.type[S_PROTOTYPE][S_INSTANCE]` ACLs for primitive type classes `String`, `Number`, `Boolean`, `Symbol`, and `BigInt` are applied to properties of primitive values. Prior to this version, ACL is not applied to properties of primitive values.
- **[Vulnerability Fix]** Since [0.4.0-alpha.17](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.17) with [Fix #344 Normalize `with` namespace objects before bound function detection](https://github.com/t2ym/thin-hook/issues/344), bound function calls in a `with` clause is properly detected. Prior to this version, ACL for unbound original function is not applied for bound function calls in a `with` clause.
- **[Vulnerability Fix]** Since [0.4.0-alpha.16](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.16) with [Fix #342 Chain `acl[S_DEFAULT][S_PROTOTYPE][S_INSTANCE]` to `acl.Object[S_PROTOTYPE][S_INSTANCE]`](https://github.com/t2ym/thin-hook/issues/342), `acl.Object[S_PROTOTYPE][S_INSTANCE]` is applied for anonymous object properties. Prior to this version, `acl.Object[S_PROTOTYPE][S_INSTANCE]` is not applied anonymous object properties.
- **[Vulnerability Fix]** Since [0.4.0-alpha.15](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.15) with [Fix #341 Apply ACL to all sources of Object.assign()](https://github.com/t2ym/thin-hook/issues/341), ACL is applied for all sources of `Object.assign()` even they contain falsy values. Prior to this version, ACL is not applied for sources of `Object.assign()` if the first source is not an object like `undefined`.
- **[Vulnerability Fix]** Since [0.4.0-alpha.13](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.13) with [Fix #336 Apply ACL for super classes/objects of global classes/objects with no dedicated ACLs](https://github.com/t2ym/thin-hook/issues/336), ACL is applied for super classes/objects of global classes/objects and instances of global classes even without dedicated ACLs. Prior to this version, ACL is not applied for super classes/objects of global classes/objects and instances of global classes without dedicated ACLs.
- **[Vulnerability Fix]** Since [0.4.0-alpha.9](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.9) with [Fix #336 Apply ACL for super classes/objects](https://github.com/t2ym/thin-hook/issues/336), ACL is applied for super classes/objects of non-global classes/objects and instances of non-global classes. Prior to this version, ACL is not applied for super classes/objects of non-global classes/objects and instances of non-global classes.
- **[Vulnerability Fix]** Since [0.4.0-alpha.8](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.8) with [Fix #334 Apply ACL for reading the target property of `receiver` in `Reflect.get()`](https://github.com/t2ym/thin-hook/issues/334), ACL is applied for `receiver` in `Reflect.get()` to read the target property. Prior to this version, ACL is not applied for `receiver` in `Reflect.get()`.
- **[Vulnerability Fix]** Since [0.4.0-alpha.7](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.7) with [Fix #333 Check constructors of Object.assign() source objects](https://github.com/t2ym/thin-hook/issues/333), ACL is applied for class instances as source objects in `Object.assign()` by checking their constructors. Prior to this version, ACL  for class instances as source objects in `Object.assign()` is not applied while ACL for global objects is applied properly. This fix is to supplement the fix for [Fix #324 Apply ACL for S_TARGETED normalized properties with S_ALL normalized property](https://github.com/t2ym/thin-hook/issues/324).
- **[Vulnerability Fix]** Since [0.4.0-alpha.6](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.6) with [Fix #331 Check for all property access of destructured argument objects](https://github.com/t2ym/thin-hook/issues/331), destructured argument objects of functions are checked against all property access when called. Prior to this version, all properties of destructured argument objects of functions can be read without S_ALL access.
- **[Vulnerability Fix]** Since [0.4.0-alpha.5](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.5) with [Fix #327 Hook RHS values of ObjectPattern and ArrayPattern for checking all property access](https://github.com/t2ym/thin-hook/issues/327), RHS values of ObjectPattern and ArrayPattern are hooked for checking all property access of the target values. Prior to this version, all properties of RHS values in ObjectPattern and ArrayPattern can be iterated without S_ALL access.
- **[Vulnerability Fix]** Since [0.4.0-alpha.4](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.4) with [Fix #325 Track global objects set via defineProperty(), etc.](https://github.com/t2ym/thin-hook/issues/325), global objects set via `Object.defineProperty()`, etc. are properly tracked for ACL. Prior to this version, ACL is skipped for global objects set via `Object.defineProperty()`, etc.
- **[Vulnerability Fix]** Since [0.4.0-alpha.3](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.3) with [Fix #324 Apply ACL for S_TARGETED normalized properties with S_ALL normalized property](https://github.com/t2ym/thin-hook/issues/324), source objects in `Object.assign()` are checked against ACL for reading all properties. Prior to this version, ACL is skipped for source objects in `Object.assign()` and any enumerable properties in the source objects can be assigned to the target object.
- **[Vulnerability Fix]** Since [0.4.0-alpha.2](https://github.com/t2ym/thin-hook/releases/tag/0.4.0-alpha.2) with [Fix #310 Hang up with an infinite loop if a hacked Service Worker tries to replace the entry page](https://github.com/t2ym/thin-hook/issues/310), the entry page hangs up if a hacked Service Worker tries to navigate the entry page. Prior to this version, a hacked Service Worker from an MITM attacker can replace the entry page with an arbitrary URL.
- **[Vulnerability Fix]** Since [0.3.7](https://github.com/t2ym/thin-hook/releases/tag/0.3.7) with [Fix #319 Check HTML/SVG extensions and content-type case-insensitively](https://github.com/t2ym/thin-hook/issues/319), extensions and content-type for HTML and SVG are checked case-insensitively. Prior to this version, extensions and content-type for HTML and SVG are check case-sensitively and some contents with capital letters such as *.HTML with content-type TEXT/HTML are not detected as HTML and can bypass hooking.
- **[Vulnerability Fix]** Since [0.3.6](https://github.com/t2ym/thin-hook/releases/tag/0.3.6) with [Fix #318 Check Worker extensions](https://github.com/t2ym/thin-hook/issues/318), extensions for Worker URLs are checked against .m?js. Prior to this version, extensions for Worker URLs are not checked and workers with irregular extensions can bypass hooking.
- **[Vulnerability Fix]** Since [0.3.5](https://github.com/t2ym/thin-hook/releases/tag/0.3.5) with [Fix #316 Redirect top SVG to about:blank](https://github.com/t2ym/thin-hook/issues/316), top SVG document is redirected to about:blank. Prior to this version, top SVG document can invalidate disable-devtools.js and DevTools is unexpectedly enabled.
- **[Vulnerability Fix]** Since [0.3.4](https://github.com/t2ym/thin-hook/releases/tag/0.3.4) with [Fix #314 Check content-type for HTML and SVG as well as extensions](https://github.com/t2ym/thin-hook/issues/314), content-type is checked for HTML/SVG detection as well as extensions. Prior to this version, HTML/SVG responses with irregular extensions are not detected as HTML/SVG and thus not hooked.
- **[Vulnerability Fix]** Since [0.3.3](https://github.com/t2ym/thin-hook/releases/tag/0.3.3) with [Fix #313 GET errorReport.json with 307 about:blank response](https://github.com/t2ym/thin-hook/issues/313), 307 redirect to `about:blank` is responded for GET errorReport.json request. Prior to this version, 404 Not Found is responded for GET errorReport.json, whose HTML contents in iframe can be accessed bypassing access policies.
- **[Feature Enhancements]** Since [0.3.0](https://github.com/t2ym/thin-hook/releases/tag/0.3.0) with [Fix #284 Additional Content-Types in cache-bundle.json](https://github.com/t2ym/thin-hook/issues/284), extended metadata are supported in `cache-bundle.json` to add additional cacheable content types. This README document is updated to describe the new features and their configurations.
- **[Feature Enhancements]** Since [0.2.0](https://github.com/t2ym/thin-hook/releases/tag/0.2.0) with [Fix #266 Block access via automation like puppeteer](https://github.com/t2ym/thin-hook/issues/266), there are many significant changes on global object access and hooking. ACL is basically compatible with prior versions but extra configurations for new features are required. This README document is updated to describe the new features and their configurations.
- **[Vulnerability Fix]** Since [0.1.11](https://github.com/t2ym/thin-hook/releases/tag/0.1.11) with [Fix #265 Attach context to wrapper property name for global object access](https://github.com/t2ym/thin-hook/issues/265), the correct contexts are used for global object access in self-assignment. Prior to this version, the context for the RHS value in self-assignment is incorrectly used for the access to the object.
- **[Vulnerability Fix]** Since [0.1.9](https://github.com/t2ym/thin-hook/releases/tag/0.1.9) with [Fix #263 Use the current context for global object access](https://github.com/t2ym/thin-hook/issues/263), the correct contexts are used for global object read/write/call access. Prior to this version, the context for the first access to the target global object is incorrectly used for the following access to the object.
- **[Configuration]** Since [0.0.250](https://github.com/t2ym/thin-hook/releases/tag/0.0.250) with [Fix #252 Block direct access to source codes](https://github.com/t2ym/thin-hook/issues/252) and [Fix #254 Block direct access to source codes even after the app shutdown](https://github.com/t2ym/thin-hook/issues/254), direct access to source codes are blocked. `hook.parameters.appPathRoot = '/';` in `demo/disable-devtools.js` can be configured to set the root of the application assets.  Prior to this version, direct access to source codes are allowed.
- **[Vulnerability Fix]** Since [0.0.243](https://github.com/t2ym/thin-hook/releases/tag/0.0.243) with [Fix #250 Hook scripts in SVG and block data:/blob: URLs for SVG](https://github.com/t2ym/thin-hook/issues/250), scripts in SVG are hooked and `blob:` and `data:` URLs are blocked for SVG. Prior to this version, scripts in SVG are not hoooked and `blob:` and `data:` URLs are allowed for SVG. `<object data="inline-script.svg"></object>`, `<embed src="inline-script.svg">`, `<iframe src="inline-script.svg"></iframe>`
- **[Vulnerability Fix]** Since [0.0.239](https://github.com/t2ym/thin-hook/releases/tag/0.0.239) with [Fix #249 Block blob: URLs for Worker](https://github.com/t2ym/thin-hook/issues/249), `blob:` and `data:` URLs are blocked for `Worker` and `SharedWorker`. Prior to this version, `blob:` and `data:` URLs are allowed for `Worker` and `SharedWorker`.
- **[Vulnerability Fix]** Since [0.0.236](https://github.com/t2ym/thin-hook/releases/tag/0.0.236) with [Fix #247 Hook script.text property](https://github.com/t2ym/thin-hook/issues/247), script.text property is properly hooked. Prior to this version, script.text property is not hooked.
- **[Vulnerability Fix]** Since [0.0.236](https://github.com/t2ym/thin-hook/releases/tag/0.0.236) with [Fix #246 Handle non-http protocols in iframe.src, script.src properly](https://github.com/t2ym/thin-hook/issues/246), non-http protocols in iframe src and script src are handled properly. Prior to this version, non-http protocols in iframe src and script src are not handled properly.
- **[Vulnerability Fix]** Since [0.0.235](https://github.com/t2ym/thin-hook/releases/tag/0.0.235) with [Fix #245 no-hook-authorization parameter is missing in sub documents](https://github.com/t2ym/thin-hook/issues/245), unauthorized no hook scripts are blocked in sub documents. Prior to this version, unauthorized no hook scripts in sub documents are not blocked.
- **[Vulnerability Fix]** Since [0.0.233](https://github.com/t2ym/thin-hook/releases/tag/0.0.233) with [Fix #242 Hook iframe.srcdoc](https://github.com/t2ym/thin-hook/issues/242), `iframe.srcdoc` is hooked as `onload` attribute. Prior to this version, `iframe.srcdoc` is not hooked.
- **[Vulnerability Fix]** Since [0.0.232](https://github.com/t2ym/thin-hook/releases/tag/0.0.232) with [Fix #241 AsyncFunction() is not hooked](https://github.com/t2ym/thin-hook/issues/241), `AsyncFunction('script')` is properly hooked. Prior to this version, `AsyncFunction('script')` is not hooked. `AsyncFunction = (async function() {}).constructor`
- **[Vulnerability Fix]** Since [0.0.231](https://github.com/t2ym/thin-hook/releases/tag/0.0.231) with [Fix #240 object.Function() is not hooked](https://github.com/t2ym/thin-hook/issues/240), `object.Function('script')` is properly hooked. Prior to this version, `object.Function('script')` is not hooked.
- **[Vulnerability Fix]** Since [0.0.230](https://github.com/t2ym/thin-hook/releases/tag/0.0.230) with [Fix #239 Full ACLs for iframe.contentWindow](https://github.com/t2ym/thin-hook/issues/239), full ACLs for iframe.contentWindow are properly applied. Prior to this version, only partial ACLs for iframe.contentWindow are applied.
- **[Vulnerability Fix]** Since [0.0.229](https://github.com/t2ym/thin-hook/releases/tag/0.0.229) with [Fix #238 No ACLs for iframe.contentWindow](https://github.com/t2ym/thin-hook/issues/238), global object ACLs for iframe.contentWindow are properly applied. Prior to this version, global object ACLs for iframe.contentWindow are not applied.
- **[Vulnerability Fix]** Since [0.0.228](https://github.com/t2ym/thin-hook/releases/tag/0.0.228) with [Fix #234 Global ACLs are not applied in web workers](https://github.com/t2ym/thin-hook/issues/234), ACLs for global objects in web workers are properly applied. Prior to this version, ACLs for global objects in web workers are not applied.
- **[Performance Optimization]** `__hook__acl` in `demo/hook-callback.js` should be used as it is much faster than `__hook__` as described in [Fix #230](https://github.com/t2ym/thin-hook/issues/230). Modification: `Object.defineProperty(_global, '__hook__', { configurable: false, enumerable: false, writable: false, value: hookCallbacks.__hook__acl });`
- **[ACL Compatibility]** Since [0.0.225](https://github.com/t2ym/thin-hook/releases/tag/0.0.225) with [Fix #229 Exclude Multiple ACLs for global object properties](https://github.com/t2ym/thin-hook/issues/229), ACLs for the global object properties (`top`, `parent`, `frames`, `global`, `_global`, etc.) other than the main global object property (`window` in the main document, `self` in workers) are applied only for access like `window.top`. In 0.0.224, all the ACLs for the global object properties are applied for every global object access, which is redundant.
- **[Vulnerability Fix]** Since [0.0.225](https://github.com/t2ym/thin-hook/releases/tag/0.0.224) with [Fix #227 Private API registered in strict mode](https://github.com/t2ym/thin-hook/issues/227), ACLs for private APIs registered to the global object in strict mode are properly applied. Prior to this version, ACLs for private APIs registered to the global object in strict mode are not applied.
- **[ACL Compatibility]** Since [0.0.225](https://github.com/t2ym/thin-hook/releases/tag/0.0.225) with [Fix #226 Multiple ACLs](https://github.com/t2ym/thin-hook/issues/226), `_globalObjects` is a `SetMap` object defined in `hook-callback.js` and `_globalObjects.get(obj)` return a `Set` object containing `string`s. All the ACLs for the set of `string`s are applied for the object. Prior to this version, `_globalObjects` is a `Map` object and `_globalObjects.get(obj)` returns a `string`.
- **[ACL Compatibility]** Since [0.0.225](https://github.com/t2ym/thin-hook/releases/tag/0.0.225) with [Fix #226 Multiple ACLs](https://github.com/t2ym/thin-hook/issues/226), `_blacklistObjects` is deprecated.
- **[ACL Compatibility]** Since [0.0.216](https://github.com/t2ym/thin-hook/releases/tag/0.0.216) with [Fix #217](https://github.com/t2ym/thin-hook/issues/217), `delete` operations require `'W'` permission as they can delete properties with customized descriptors. Prior to this version, `delete` operations require `'w'` permission.
- **[ACL Compatibility]** Since [0.0.214](https://github.com/t2ym/thin-hook/releases/tag/0.0.214) with [Fix #215](https://github.com/t2ym/thin-hook/issues/215), `'R'` and `'W'` opTypes are introduced for getting/setting property descriptors, i.e., contexts to access descriptors must have explicit `'R'` and/or `'W'` permissions for the target properties.  Prior to [0.0.213](https://github.com/t2ym/thin-hook/releases/tag/0.0.213), property descriptors can be accessed by mere `'r'` and/or `'w'` permissions.
- **[Vulnerability Fix]** Since [0.0.211](https://github.com/t2ym/thin-hook/releases/tag/0.0.211) with [Fix #211](https://github.com/t2ym/thin-hook/issues/211), bypassing of ACL for global objects by dummy custom element definition is avoided. Prior to this version, ACL can be skipped by defining dummy custom elements by standard elements as constructor classes.
- **[Vulnerability Fix]** Since [0.0.209](https://github.com/t2ym/thin-hook/releases/tag/0.0.209) with [Fix #210](https://github.com/t2ym/thin-hook/issues/210), bypassing of ACL for global objects by cloing them to other global objects is avoided. Prior to this version, ACL can be skipped by cloing global objects.
- **[Vulnerability Fix]** Since [0.0.205](https://github.com/t2ym/thin-hook/releases/tag/0.0.205) with [Fix #208](https://github.com/t2ym/thin-hook/issues/208), scripts via `document.writeln()` are hooked as in `document.write()`. Prior to this version, scripts via `document.writeln()` are not hooked.
- **[Vulnerability Fix]** Since [0.0.203](https://github.com/t2ym/thin-hook/releases/tag/0.0.203) with [Fix #207](https://github.com/t2ym/thin-hook/issues/207), `textContent` of `script` elements are always treated as JavaScript scripts regardless of their configured MIME types (`type` property/attribute).  Prior to this version, `textContent` of `script` elements containing `__hook__` as strings can be mistaken as **HOOKED** scripts and run without hooking.
- **[Context Generator Compatibility]** Since [0.0.148](https://github.com/t2ym/thin-hook/releases/tag/0.0.148) with [#144](https://github.com/t2ym/thin-hook/issues/144), the old context generator `"method"` is renamed as `"oldMethod"` and the `"cachedMethod"` is renamed as `"method"` and become the new default context generator. The `"cachedMethod"` remains as an alias for the new `"method"` context generator. There are slight changes in the new `"method"` context generator. A warning message is shown on the debug console to notify the change.

| old name | new name | feature |
|:-----:|:-----:|:-----|
| `method` | `oldMethod` | `script.js,Class,method` |
| `cachedMethod` | `method` | `script.js,Class,method` including computed property names |
- **[Hook Callback Compatibility]** Since [0.0.149](https://github.com/t2ym/thin-hook/releases/tag/0.0.149) with [#123](https://github.com/t2ym/thin-hook/issues/123), the hook callback function has to support new operators for hooking in strict mode. See below for the updated hook callback function `hook.__hook__`. `hook.hookCallbackCompatibilityTest()` can detect if the target hook callback function is compatible or not. 
- **[Opaque URL Authorization]** Since [0.0.178](https://github.com/t2ym/thin-hook/releases/tag/0.0.178) with [#178](https://github.com/t2ym/thin-hook/issues/178), all opaque content URLs must be authorized via `hook.parameters.opaque = [ 'opaque_url', ..., (url) => url.match(/opaque_url_pattern/), ... ]` configuration.

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
  const __context_mapper__ = $hook$.$(__hook__, [
    'examples/example2.js,C',
    '_p_C;examples/example2.js,C',
    'examples/example2.js,C,add',
    'examples/example2.js,C,add,plus'
  ]);
  $hook$.global(__hook__, __context_mapper__[0], 'C', 'class')[__context_mapper__[1]] = class C {
    add(a, b) {
      return __hook__((a = 1, b = 2) => {
        let plus = (...args) => __hook__((x, y) => x + y, null, args, __context_mapper__[3]);
        return __hook__(plus, null, [
          a,
          b
        ], __context_mapper__[2], 0);
      }, null, arguments, __context_mapper__[2]);
    }
  };
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
importScripts('../hook.min.js?no-hook=true', 'context-generator.js?no-hook=true', 'bootstrap.js?no-hook=true');
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
    // Authorized opaque URL list
    hook.parameters.opaque = [
      'https://www.gstatic.com/charts/loader.js',
      (url) => {
        let _url = new URL(url);
        return _url.hostname !== location.hostname &&
          _url.href.match(/^(https:\/\/www.gstatic.com|https:\/\/apis.google.com\/js\/api.js|https:\/\/apis.google.com\/_\/)/);
      }
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

  // helper for strict mode
  class StrictModeWrapper {
    static ['#.'](o, p) { return o[p]; }
    static ['#[]'](o, p) { return o[p]; }
    static ['#*'](o) { return o; }
    static ['#in'](o, p) { return p in o; }
    static ['#()'](o, p, a) { return o[p](...a); }
    static ['#p++'](o, p) { return o[p]++; }
    static ['#++p'](o, p) { return ++o[p]; }
    static ['#p--'](o, p) { return o[p]--; }
    static ['#--p'](o, p) { return --o[p]; }
    static ['#delete'](o, p) { return delete o[p]; }
    static ['#='](o, p, v) { return o[p] = v; }
    static ['#+='](o, p, v) { return o[p] += v; }
    static ['#-='](o, p, v) { return o[p] -= v; }
    static ['#*='](o, p, v) { return o[p] *= v; }
    static ['#/='](o, p, v) { return o[p] /= v; }
    static ['#%='](o, p, v) { return o[p] %= v; }
    static ['#**='](o, p, v) { return o[p] **= v; }
    static ['#<<='](o, p, v) { return o[p] <<= v; }
    static ['#>>='](o, p, v) { return o[p] >>= v; }
    static ['#>>>='](o, p, v) { return o[p] >>>= v; }
    static ['#&='](o, p, v) { return o[p] &= v; }
    static ['#^='](o, p, v) { return o[p] ^= v; }
    static ['#|='](o, p, v) { return o[p] |= v; }
    static ['#.='](o, p) { return { set ['='](v) { o[p] = v; }, get ['=']() { return o[p]; } }; }
  }

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
    let GeneratorFunction = gen.constructor;
    switch (f) {
    case Function:
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args);
      break;
    case GeneratorFunction:
      args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, true);
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
              args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
              if (args[1][2]) {
                args1.push(args[1][2]);
              }
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], args[1][0].prototype instanceof GeneratorFunction)];
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
            case GeneratorFunction:
              args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], true)];
              break;
            default:
              if (args[1][0].prototype instanceof Function) {
                args1 = [args[1][0], args[1][1], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][2], args[1][0].prototype instanceof GeneratorFunction)];
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
          args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1])];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1))];
          break;
        default:
          break;
        }
        break;
      case GeneratorFunction:
        switch (args[0]) {
        case 'apply':
          args1 = [args[1][0], hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1][1], true)];
          break;
        case 'call':
          args1 = [args[1][0], ...hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1].slice(1), true)];
          break;
        default:
          break;
        }
        break;
      default:
        if (thisArg instanceof GeneratorFunction && args[0] === 'constructor') {
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1], true);
        }
        else if (thisArg instanceof Function && args[0] === 'constructor') {
          args1 = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args[1]);
        }
        break;
      }
      break;
    default:
      if (typeof f === 'function') {
        if (f.prototype instanceof Function && newTarget) {
          args = hook.FunctionArguments('__hook__', [[context, {}]], 'method', args, f.prototype instanceof GeneratorFunction);
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
    </script><!-- end of mandatory no-hook scripts -->
    <!-- comment --->
    <script src="..."></script>
    ...
</html>
```

#### Encoded HTML (Service Worker converts it to Decoded HTML)

```html
<html>
  <head>
    <script src="../thin-hook/hook.min.js?version=1&no-hook=true&hook-name=__hook__&fallback-page=index-no-sw.html&hook-property=false&service-worker-ready=false"></script></head></html>
    <!-- Hook Callback Function without hooking properties -->
    <script no-hook>
      window.__hook__ = function __hook__(f, thisArg, args, context, newTarget) {
        ...
        return newTarget
          ? Reflect.construct(f, args)
          : thisArg
            ? f.apply(thisArg, args)
            : f(...args);
      }
    </script><!--<C!-- end of mandatory no-hook scripts --C>
    <C!-- comment --C>
    <script src="..."></script>
    ...
</html>-->
```

- `</head></html>` is inserted between the first `hook.min.js` script and the second no-hook script, which looks strange but is required for correct execution of no-hook scripts.
  - If `</head></html>` is inserted at the end of mandatory no-hook scripts according to the normal HTML format, the page encounters the unexpected "hook is not defined" error, whose root cause is under investigation.

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
- `$hook$`: `$hook$ === hook`. Alias of `hook` in hooked scripts
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
- `hook.$(symbolToContext = __hook__, contexts)`: context symbol generator function used in hooked scripts to generate symbols corresponding to given contexts
  - Example call inserted at the beginning of a hooked script: `const __context_mapper__ = $hook$.$(__hook__, [ 'examples/example2.js,C', ... ]);`
  - `__context_mapper__`: `Array` of symbol contexts
    - In a hooked script, `__context_mapper__` is actually `__ + hex(sha256(topContextOfScript + code)) + __`
      - Note: Due to this specification, **the same script in the same URL cannot be loaded to a single document multiple times**
    - `__context_mapper__[N]`: the symbol context corresponding to the string context `contexts[N]`
    - `__hook__[__context_mapper__[N]]` is set as `contexts[N]` so that `__hook__` can convert symbol contexts to their corresponding string contexts
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
  - `hook.importScripts()`: return hooked `importScripts` function for Workers, invalidating extensions other than `.js` and `.mjs`
    - Note: No arguments to pass
- `hook.hook(target: Class, ...)`: hook platform global object with `target`
  - Usage: `['Function','setTimeout','setInterval',...].forEach(name => hook.hook(hook.Function('__hook__', [[name, {}]], 'method'))`
- `hook.serviceWorkerHandlers`: Service Worker event handlers
  - `install`: 'install' event handler. Set version from the `version` parameter
  - `activate`: 'activate' event handler. Clear caches of old versions.
  - `message`: 'message' event handler.
    - **INTERNAL** `'channel'` message: Transfer MessageChannel port objects for hook workers from the main document to the Service Worker at initialization
    - **INTERNAL** `'unload'` message: Trigger unloading of hook workers
    - **INTERNAL** `'coverage'` message: Transfer `__coverage__` instanbul coverage object for the Service Worker to the main document to collect code coverage in `test/hook.min.js`
    - `['plugin', 'pluginId', ...params ]` message: Transfer a message to the target plugin identified by `'pluginId'`. The target plugin must add its own event listener to handle the message.
      - `['plugin', 'pluginId:enqueue', ...params ]`: When the `pluginId` ends with `:enqueue`, events with posted messages are enqueued to `hook.parameters.messageQueues['pluginId:enqueue'] = []` even before plugins are loaded into the Service Worker
        - Each enqueued message is immediately responded via `event.ports[0].postMessage()` with a dummy response message generated by cloning the posted message and appending `':enqueued'` such as `['plugin', 'pluginId:enqueue', ...params, ':enqueued' ]`
        - The target plugin must dequeue the enqueued events and append `':dequeued'` to the queue to stop further enqueueing. For example, the queue `[]` changes as follows:
          - An event is enqueued: `[ event1 ]`
          - The plugin append `':dequeued'`: `[ event1, ':dequeued' ]`
          - The plugin dequeues and processes the event(s): `[ ':dequeued' ]`
        - Enqueued messages are likely to be one-way messages as the main document is about to reload itself
        - `hook.parameters.messageQueues['pluginId:enqueue']` may NOT exist when the plugin is loaded. So the plugin must create its own queue if it has not been created.
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
      - Defined variables for context generator scripts in Service Worker
        - `version` variable: cache name as a string `version_{version number}`
          - Note: In Service Worker, `'version_' + new URL(location.href).searchParams.get('version')` might be incorrect since Service Worker for the old version before version upgrading might still be running for the new version. In contrast, `'version_' + new URL(document.querySelector('script').src).searchParams.get('version')` in the main document is always up-to-date.
      - Extensions other than context generators:
        - Set Service Worker parameters:
          - `hook.parameters.cors = [ 'cors_url_1', 'cors_url_2', ... ]`: specify CORS script URLs
          - `hook.parameters.cors = [ (url) => url.match(/cors_url_pattern/), ... ]`: specify CORS script URL detector function(s)
          - `hook.parameters.opaque = [ 'opaque_url_1', 'opaque_url_2', ... ]`: specify authorized opaque URLs
          - `hook.parameters.opaque = [ (url) => url.match(/opaque_url_pattern/), ... ]`: specify authorized opaque URL detector function(s)
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
        - URL for the entry page
          - `hook.parameters.baseURI`: Set in `demo/bootstrap.js`
        - Empty Document URL
          - `hook.parameters.emptyDocumentUrl = new URL('./empty-document.html', baseURI);`: Set in `demo/bootstrap.js`. 
          - `<iframe src="empty-document.html?url=https://host/path.html,iframe">` to specify context in iframe document
        - Bootstrap Script Tag
          - `hook.parameters.bootstrap = "<script>frameElement.dispatchEvent(new Event('srcdoc-load'))</script>";`: Set in `demo/bootstrap.js`
          - Append to the hooked `srcdoc` to dispatch `srcdoc-load` event to `onload` handler
        - Onload Wrapper Script
          - `hook.parameters.onloadWrapper = "event.target.addEventListener('srcdoc-load', () => { $onload$ })";`: Set in `demo/bootstrap.js`
          - Receive `srcdoc-load` event and trigger the original `onload` script
            - Note: `addEventListener('load', handler)` is currently called BEFORE the document from `srcdoc` is loaded and `srcdoc-load` event is fired.
        - Empty SVG to load the target URL
          - `hook.parameters.emptySvg = '<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1px" height="1px"><script>location = "$location$";</script></svg>';`
        - Bootstrap Scripts for SVG
          - `hook.parameters.bootstrapSvgScripts = '<script xlink:href="URL?params"></script>...'`
        - Check Request callback on Fetch at Service Worker
          - `hook.parameters.checkRequest = async function (event, response, cache) { /* check request */ return response ; }`: `response` - cached response if exists; See `demo/disable-devtools.js`
        - Check Response callback on Fetch at Service Worker
          - `hook.parameters.checkResponse = async function (event, request, response, cache) { /* check response */ return response ; }`: `response` - just fetched response; Not called if a cache response exists
        - List of Asynchronous Tasks before Service Worker registration
          - `hook.parameters.preServiceWorkerTasks`: The first task is checked after `DOMContentLoaded` event; Therefore, the first task `Promise` must be pushed before `DOMContentLoaded` event 
            - If the last task resolves to a constant string `"skipServiceWorkerRegistration"`, the default Service Worker registration processes are skipped and the last task takes the responsiblity of the Service Worker registration and reloading the entry page. Even after the Service Worker registration completed and the page is reloaded, this `"skipServiceWorkerRegistration"` value is effective for the task so that `hook.min.js` can complete remaining tasks such as starting the ping service and the hook workers.
            - 3 Acceptable Data Types
              - `Promise`: A single `Promise` object; Equivalent to `[ Promise ]`;
              - `[ Promise, Promise, ...]`: `Array` of `Promise` objects
              - `Async Iterable`: `Async Iterator` implementing `tasks[Symbol.asyncIterator]` protocol
        - Callback on Errors from `hook.parameters.preServiceWorkerTasks`
          - `hook.parameters.onPreServiceWorkerTasksError = async function onError(exception) {}`: Asynchronous function to handle the exception
            - Default: `window.location = 'about:blank';`
        - Callback to Decode Entry HTML in a plugin
          - `hook.parameters.decodeEntryHtml = async function decodeEntryHtml(event, request, response, cache, original, decoded)`
            - `event: FetchEvent`: Event for the fetch request
            - `request: Request`: Request object that fetched the content
            - `response: Response`: Response object of the fetch
            - `cache: Cache`: Cache object for the current version
            - `original: String` : original entry page HTML
            - `decoded: String` : `= hook.serviceWorkerTransformers.decodeHtml(original)`
            - return value: `String` decoded entry page HTML to respond to the document
              - The function can just return `original` or `decoded` while it can also modify the content depending on the situation.
        - Optional headers to include in cache response headers
          - `hook.parameters.significantHeaders = { "Header-Name": true }`
        - Additional Cacheable Content-Types
          - `hook.parameters.cacheableContentTypes = { "text/css": true, "image/png": true, ... }`
            - Note: `text/html`, `text/javascript`, `image/svg+xml` must not be included here
        - Callback to Validate Cacheable URL
          - `hook.parameters.validateCacheableUrl = function (url, contentType)`
            - `url: String`: target URL to validate
            - `contentType: String`: normalized Content-Type without charset
            - return a truthy value if `url` with `contentType` is cacheable
            - If the callback function is undefined, any `contentType` values within `hook.parameters.cacheableContentTypes` are cacheable
        - Root of Application Path
          - `hook.parameters.appPathRoot = '/';` - The app assets are under `location.origin + hook.parameters.appPathRoot`
        - Script Hashes
          - `hook.parameters.scriptHashes = { "SHA256(authorized inline script)": "context", ... }` - List of hashes for authorized inline scripts
        - Integrity
          - `hook.paremeters.integrity = { "URL path": "base64(SHA256(response data))", ... }` - List of integrity for static contents
    - register as Service Worker
      - `Service-Worker-Allowed` HTTP response header must have an appropriate scope for the target application
    - `cors=true` parameter: CORS script, e.g., `<script src="https://cross.origin.host/path/script.js?cors=true"></script>`
- `hook.serviceWorkerTransformers`:
  - `encodeHtml(html: string)`: encode HTML for Service Worker
    - `<!-- end of mandatory no-hook scripts -->`: insert this exact marker as a comment so that all mandatory no-hook scripts before the marker in the HTML of the entry document can be executed even at the first load without Service Worker
      - Note: `no-hook-authorization` hashes are NOT effective at the first load
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
  - `HTMLParser`: HTML parser from [htmlparser2](https://www.npmjs.com/package/htmlparser2)

## Plugins

- Plugins are no-hook scripts for enhancements
  - Currently, they are configured for the demo application under `demo/`, but fully customizable for any target applications

### `<script context-generator src="no-hook-authorization.js?no-hook=true"></script>`

- Configurations
  - `hook.parameters.noHookAuthorization = { "hex sha256 digest for no-hook script": true, ... }`
    - Hex sha256 digests have to be updated in the build process
      - See `update-no-hook-authorization` gulp task
    - Hex sha256 digest of the `no-hook-authorization.js` script itself has to be set as a parameter for `hook.min.js`
      - `<script src="../../thin-hook/hook.min.js?version=496&no-hook-authorization=6a83335a7630118516213f52715a24520efc7030b3562291e92a06482894b95e&service-worker-ready=false"></script>`
      - See `update-no-hook-authorization-in-html` gulp task
  - `hook.parameters.sourceMap = [...]`
  - `hook.parameters.hookWorker = 'hook-worker.js?no-hook=true';`

### `<script context-generator src="integrity.js?no-hook=true"></script>`

- Features
  - Check integrity of the browser agent
  - Check integrity of the loaded scripts
  - Establish and update secure connection to `integrityService.js`
  - Check integrity of requests and responses
  - Encrypt request body data
  - Decrypt response body data
  - TBD
- Configurations
  - TBD

### `<script context-generator src="disable-devtools.js?no-hook=true"></script>`

- Features
  - Force redirection to `about:blank` when the user tries to open Developer Tools
  - Force redirection to `about:blank` when the user tries to inspect a source code of the pages
- Configurations
  - `const devtoolsDisabled = true`: Use `false` and rebuild with `gulp demo` to enable Dev Tools

### `<script context-generator src="context-generator.js?no-hook=true"></script>`

- Configurations
  - `hook.contextGenerators.hash`: an example custom context generator (not used for demo)
  - `hook.contextGenerators.method2`: an example custom context generator (not used for demo)
  - `Object.freeze(hook.contextGenerators)`

### `<script context-generator src='bootstrap.js?no-hook=true'></script>`

- Configurations
  - `hook.parameters.emptyDocumentUrl`
  - `hook.parameters.bootstrap`
  - `hook.parameters.onloadWrapper`
  - `hook.parameters.emptySvg`
  - `hook.parameters.bootstrapSvgScripts`
  - `hook.parameters.noHookAuthorizationParameter`: Value of `hook.min.js?no-hook-authorization` parameter used in `hook-callback.js`
  - `hook.parameters.noHookAuthorizationFailed = {}`
  - `hook.parameters.noHookAuthorizationPassed = {}`

### `<script context-generator no-hook>hook.parameters.* ...</script>`

- Configurations
  - `hook.parameters.cors`
  - `hook.parameters.opaque`
  - `hook.parameters.worker` (Ineffective and unused for now)

### `<script context-generator src="cache-bundle.js?no-hook=true&authorization=..."></script>`

- Features
  - Fetch `cache-bundle.json` and store the contents into `caches`
    - Format: `{ "version": "version_XXX", "same origin URL path (absolute)": "text data", ..., "absolute URL": "text data", ... }`
    - Basic MIME types:
      - `.js`: `application/json`
      - `.html`: `text/html`
      - `.json`: `application/json`
      - `.svg`: `image/svg+xml`
    - Extended Metadata Format: See `demo/cache-bundle.json`
      - key: `"url?param=2": Object`
        - property: `"Location": "url?param=1"` - link to the other content to eliminate redundant identical body data for multiple URLs
          - Note: If Non-dataURI `"Location"` exists, other metadata entries are ignored
        - property: `"Location": "data:image/jpeg;base64,..."` - encoded body data for non-textual contents
          - Note: `"Location"` appears only once in a metadata object, of course
        - property: `"Content-Type": "text/xml"` - MIME type
        - property: `"body": "body in string"` - content body
        - property: `"Other-Headers": "header value"` - additional significant HTTP headers specified in `hook.parameters.significantHeaders`
  - Generate `cache-bundle.json` from `caches` and upload the data to saveURL (`errorReport.json`) if the entry page is invoked with `?cache-bundle=save` parameter
    - The server must be `npm run upload` with `cacheBundleUploadService.js` to receive and save `cache-bundle.json`
    - Parameters: `{ "type": "cache-bundle.json", "data": "stringified cache-bundle.json" }`
  - Automate generation of `cache-bundle.json`
    - Trigger automation by `cacheBundleGeneration.js` via `puppeteer`
      - Invoked via `cache-bundle` gulp task
    - Fetch a special `cache-bundle.json` at build time
      - Generated by `cache-bundle-automation-json` gulp task
      - Format:
        - `"version": "version_123"`: version obtained via `get-version` gulp task
        - `"https://thin-hook.localhost.localdomain/automation.json":`: `JSON.stringify()` with the object with the following properties
          - `"state": "init"`: update state in the script to perform operations including reloading
          - `"serverSecret": serverSecret`: one-time build-time-only secret for validating `cache-automation.js` script
          - `"script": cacheAutomationScript`: contents of `cache-automation.js` script
    - `cache-automation.js`: script for collecting caches by automatically navigating the target application
      - `cache-automation.js` script is hooked with the context `https://thin-hook.localhost.localdomain/automation.json,*`
        - ACL has to be defined for `cache-automation.js`
      - Cache cleanup and page reload are done before `cache-automation.js` execution
      - Cache bundle generation is performed after `cache-automation.js` execution
        - Metadata are processed and redundant body data are converted to links to other contents with the same body data within `cache-bundle.json`

- Configurations
  - `const enableCacheBundle = true`: Use `false` and rebuild with `gulp demo` to disable `cache-bundle`
  - For extended metadata for `cache-bundle.json`
    - `hook.parameters.significantHeaders = { "Header-Name": true }`: optional
    - `hook.parameters.cacheableContentTypes = { "text/css": true, "image/png": true, ... }`: optional
    - `hook.parameters.validateCacheableUrl = function (url, contentType)`: optional
  - For Service Worker
    - `const cacheBundleURL = new URL('cache-bundle.json', hook.parameters.baseURI);`
    - `const saveURL = new URL('errorReport.json', hook.parameters.baseURI);`
  - `?authorization=`: `hex(sha256(serverSecret + cache-automation.js script))`
    - Set via `encode-demo-html` gulp task
  - For automated generation of `cache-bundle.json`
    - `cache-automation.js` must be fully customized for the target application
    - ACL for `cache-automation.js` with the context `https://thin-hook.localhost.localdomain/automation.json,*`

### `<script src="hook-callback.js?no-hook=true"></script>`

- Features
  - ACL for objects in HTML documents, SVG, Worker, SharedWorker
  - Maintain `contextStack` with `Stack` class object
    - `Stack` class object is a brancheable linked list with `push/pop` operations
      - The branching feature of `Stack` is not utilized for now
  - Call `hook.hookCallbackCompatibilityTest()`
  - Hook global objects
    - Via
      - `hooked = hook[name](Symbol.for('__hook__'), [[name, { random: name === 'Node' }]], 'method')`
      - `Object.defineProperty(_global, name, { value: hooked, configurable: true, enumerable: false, writable: false });`
    - Target global object names
      - `eval`
      - `setTimeout`
      - `setInterval`
      - `Node`
      - `Element`
      - `HTMLScriptElement`
      - `HTMLIFrameElement`
      - `HTMLObjectElement`
      - `HTMLEmbedElement`
      - `HTMLAnchorElement`
      - `HTMLAreaElement`
      - `Document`
      - `importScripts`
  - Prohibit global object access via automation like puppeteer
    - Return `undefined` on prohibited global object access
    - Forced redirection to `about:blank` on prohibited global object access
- Configurations
  - For ACL
    - `__hook__`: hook callback function
      - `Object.defineProperty(_global, '__hook__', { configurable: false, enumerable: false, writable: false, value: hookCallbacks.__hook__ });`
        - `hookCallbacks.__hook__`: full features (acl + contextStack + object access graph)
        - `hookCallbacks.__hook__acl`: acl only (acl + contextStack)
        - `hookCallbacks.__hook__min`: minimal (no acl)
    - `const acl`: ACL
  - For global object access
    - `const enableDebugging = false`: Use `true` to enable debugging by disabling forced redirection to `about:blank` on prohibited global object access
    - `const wildcardWhitelist`: `Array` of `RegExp` for Chrome browser's `new Error().stack` format
      - Example configurations for demo
        - `new RegExp('^at (.* [(])?' + origin + '/components/'), // trust the site contents including other components`
        - `new RegExp('^at ([^(]* [(])?' + 'https://cdnjs.cloudflare.com/ajax/libs/vis/4[.]18[.]1/vis[.]min[.]js'),`
        - `new RegExp('^at ([^(]* [(])?' + 'https://www.gstatic.com/charts/loader[.]js'),`
    - `const excludes = new Set() : { 'window.Math' }`: exclude `Math` object
      - Note: `Math` object properties must be wrapped with `wrapGlobalProperty` function

### `<script context-generator src="script-hashes.js?no-hook=true&service-worker-ready=false"></script>`

- Features
  - Provide list of authorized hashes for inline scripts in HTML to accelerate preprocessing in **HTML Imports polyfill**
    - See [Issue #275 Support HTML Imports polyfill after the native support is removed](https://github.com/t2ym/thin-hook/issues/275)
  - Required in the entry page and HTML subdocuments
  - The list of authorized hashes is generated in `gulp script-hashes` task and inserted into `cache-bundle.json` with the key SCRIPT_HASHES_PSEUDO_URL `https://thin-hook.localhost.localdomain/script-hashes.json`
  - The list is empty if `service-worker-ready=false` while it is copied from `cache-bundle.json` if `service-worker-ready=true`
    - The list is stored at `hook.parameters.scriptHashes`
  - SRI `integrity` attribute requires **2** integrity values for both `service-worker-ready=false` and `service-worker-ready=true`
    - They are generated in `gulp script-hashes-integrity` task and inserted into the entry page, i.e., `original-index.html` and `index.html`
  - Unnecessary if HTML Imports feature is natively implemented in the browser or unused in the app
    - It is recommended to append this plugin as the behaviors without the plugin are not well verified
- Configurations
  - Mandatory parameter `service-worker-ready=false` for the entry page, which is automatically converted to `service-worker-ready=true` after preprocessed
  - Mandatory parameter `service-worker-ready=true` for other HTML pages including `empty-document.html`
  - Required gulp tasks: `script-hashes`, `script-hashes-integrity`

### `<script src="content-loader.js?no-hook=true"></script>`

- Features
  - Load the target HTML without the hook infrastructure scripts after the hook infrastructure scripts are loaded in `empty-document.html` for `iframe` documents
- Configurations
  - The container `iframe` element is automatically configured in preprocessing HTML contents
    - Parameter `content=base64URL(encodeURIComponent(HTML))`
      - HTML is written into the `iframe` document via `document.write(HTML)` after preprocessing
    - Parameter `blob=encodeURIComponent(BlobURL)`
      - Blob is written into the `iframe` document as HTML via `document.write(fetch(Blob))` after preprocessing if the blob type is `text/html`
      - Blob is written into the `iframe` document as a plain text via data URL if the blob type is `text/plain`
      - Blob is blocked if the blob type is `image/svg+xml`
      - Blob with other blob types is written into the `iframe` document as data URL

### `<script src="wrap-globals.js?no-hook=true"></script>`

- Features
  - Wrap the remaining global objects which have not been wrapped in `hook-callback.js`
  - Put this script at the end of global API definitions after `hook-callback.js`
  - Use `window[Symbol.for('wrapGlobalProperty')]()` to wrap global objects
    - Defined in `hook-callback.js`
- Configurations
  - For global object access
    - `const excludes = new Set();  [ 'Math' ].forEach(name => excludes.add(name));`
      - Set of excluded objects in wrapping `window.*`

#### Notes on Performance Overheads on Global Object Access

- There are significant access performance overheads on global objects due to wrapped property getter/setter functions
- To mitigate the overheads, define local alias objects for frequently used global objects
  - For example, `const URL = window.URL, RegExp = window.RegExp, ...`
- Internal Details on the overheads:
  - If `contextStack` is empty, the global object is accessed outside of hooked scripts and thus `new Error().stack` has to be analyzed, which is an extremely heavy operation
  - If `contextStack` is not empty, the global object is accessed within a hooked script, whose access can be controlled via ACL
    - `contextStack` operations are relatively lightweight without performance degradation on deep call stack
  - If local alias objects are defined, the corresponding global object access is performed only once per object, whose overheads are insignificant

## Server-side Components

Server-side scripts and components configured for the demo but fully customizable for the target application

### `demo-backend/demoServer.js`

Back-end server for the demo. TBD

### `demo-backend/errorReportService.js`

Handler for `demo/errorReport.json` POST requests

### `demo-backend/cacheBundleGeneration.js`

Used at build time to automate generation of `cache-bundle.json` via puppeteer

### `demo-backend/cacheBundleUploadService.js`

Formerly used at build time to automate uploading of `cache-bundle.json` via a POST request

### `demo-backend/postHtml.js`

Express middleware for `demoServer.js` to handle `demo/postHtml`. This should be unnecessary and should not be used except for verification of HTML via a POST request.

### `demo-backend/integrityService.js`

Express middleware for `demoServer.js` to provide integrity and double encryption of body data
- `demo-backend/whitelist.json` - list of URL paths which are allowed to access without encryption
- `demo-backend/blacklist.json` - list of URL paths which are not allowed to access; namely `demo/index.html`
  - Generated in `gulp encode-demo-html` task by parsing the entry page HTML

### `demo-backend/integrity-service-helpers/build/release/native.node`

Node addon package compiled from the C++ source `binding.cpp` to provide the following functions
- `rsa_oaep_decrypt(ArrayBuffer encrypted, String private_key_pem)` - Decrypt ArrayBuffer data by RSA-OAEP-SHA256 with a String private key in PEM format via `openssl`

### `demo-backend/validationService.js`

When invoked as a CLI script, it provides the validation server for `ClientIntegrity.browserHash`. TBD
- API: TBD
- `demo-backend/validation-console/dist/` is served at its HTTPS root
- `demo-keys/demoCA/${process.env["VALIDATION_HOST"]}.{key|crt}` is used for HTTPS server. Defaults to `localhost:8082`
- `demo-keys/demoCA/client.{key|crt}` are used for client certificate authentication

When imported as a package, it provides the client API for the validation server. TBD
- `demo-keys/demoCA/client.{key|crt}` are used for client certificate authentication

### `demo-backend/validation-console/dist/`

Validation Console GUI served by `demo-backend/validationService.js`. TBD

### `demo-keys/generate_cert.sh`

Script to generate certificates in `demo-keys/demoCA/`

### `demo-keys/keys.json`

Key pairs and secret keys are stored for the application version.

```javascript
{
  "version": "version_668", // application version
  "rsa-private-key.pem": "RSA PRIVATE KEY in PEM",
  "rsa-public-key.pem": "RSA PUBLIC KEY in PEM",
  "ecdsa-private-key.pem": "ECDSA PRIVATE KEY in PEM",
  "ecdsa-public-key.pem": "ECDSA PUBLIC KEY in PEM",
  "session-id-aes-key": "base64(random(32 bytes))",
  "session-id-aes-iv": "base64(random(12 bytes))",
  "scriptsHashHex": "hex(ClientIntegrity.scriptsHash)",
  "htmlHashHex": "hex(ClientIntegrity.htmlHash)"
}
```

TBD

## NPM scripts

```json
{
  "scripts": {
    "test": "wct",
    "build": "gulp",
    "demo": "run-p -l demoServer errorReportService validationService",
    "debug": "run-p -l debugServer errorReportService validationService",
    "https": "run-p -l httpsServer errorReportService validationService",
    "upload": "run-p -l buildServer cacheBundleUploadService",
    "cache-bundle": "run-p -r -l buildServer cacheBundleUploadService cacheBundleGeneration",
    "updateHtmlHash": "run-p -r -l buildServer cacheBundleUploadService loadOnly",
    "buildServer": "node demo-backend/demoServer.js -p 8080 -m build -P https -H \"localhost:8080\"",
    "demoServer": "node demo-backend/demoServer.js -p 8080 -m server -c 4 -H \"${SERVER_HOST}\"",
    "httpsServer": "node demo-backend/demoServer.js -p 8080 -m server -c 4 -P https -H \"${SERVER_HOST}:8080\"",
    "debugServer": "node --inspect-brk=0.0.0.0:9229 demo-backend/demoServer.js -p 8080 -m debug -c 1 -H \"${SERVER_HOST}\"",
    "postHtml": "run-p -l postHtmlServer errorReportService",
    "postHtmlServer": "node demo-backend/demoServer.js -p 8080 -m server -c 4 -H \"${SERVER_HOST}\" --middleware ./postHtml.js",
    "errorReportService": "node demo-backend/errorReportService.js -p 8081",
    "validationService": "node demo-backend/validationService.js -p 8082 -m server -H \"${VALIDATION_HOST}\"",
    "integrity-service-helpers": "cd demo-backend/integrity-service-helpers && npm install",
    "validation-console": "cd demo-backend/validation-console && npm ci && npm run build",
    "demo-certificates": "cd demo-keys && ./generate_cert.sh ",
    "clean-demo-certificates": "cd demo-keys && rm -riv demoCA",
    "cacheBundleUploadService": "node demo-backend/cacheBundleUploadService.js",
    "cacheBundleGeneration": "node demo-backend/cacheBundleGeneration.js",
    "loadOnly": "node demo-backend/cacheBundleGeneration.js loadOnly",
    "test:attack": "run-p -r -l buildServer cacheBundleUploadService puppeteerAttackTest",
    "puppeteerAttackTest": "node test/puppeteerAttackTest.js"
  }
}
```

### `${SERVER_HOST}` environment variable
HTTPS server host name for the application. Defaults to `localhost`

### `${VALIDATION_HOST}` environment variable
HTTPS server host name at port 8082 for Validation Console and Validation Service API. Defaults to `localhost`

### `npm test`
Run hook tests

### `npm run build`
Build `hook.min.js` and the demo via `gulp`

### `npm run demo`
Serve the demo from `demo-frontend/` at `https://${SERVER_HOST}/components/thin-hook/demo/` via nginx proxing to `http://localhost:8080`

### `npm run debug`
Serve the demo from `demo/` at `https://${SERVER_HOST}/components/thin-hook/demo/` via nginx proxying to `http://localhost:8080`

### `npm run https`
Serve the demo from `demo-frontend/` at `https://${SERVER_HOST}:8080/components/thin-hook/demo/` with the key pair `demo-keys/demoCA/${SERVER_HOST}.{key|crt}`

### `npm run upload`
Formerly used to upload `cache-bundle.json` via `demo-backend/cacheBundleUploadService.js` at build time

### `npm run cache-bundle`
Called from `gulp cache-bundle-automation` task to automate building of `cache-bundle.json` at build time

### `npm run updateHtmlHash`
Called from `gulp update-html-hash` task to update `demo-keys/keys.json` for `"htmlHashHex"` of the entry page HTML after the `integrity` attribute of `<script src="script-hashes.js">` is updated in `gulp script-hashes-integrity` task

### `npm run buildServer`
Called from `npm run cache-bundle` to tonvoke `demoServer.js` in `build` mode at build time

### `npm run demoServer`
Called from `npm run demo` to invoke `demoServer.js` in `server` mode without TLS

### `npm run httpsServer`
Called from `npm run https` to invoke `demoServer.js` in `server` mode with TLS

### `npm run debugServer`
Called from `npm run debug` to invoke `demoServer.js` in `debug` mode attached by Node.js debugger

### `npm run errorReportService`
Called from `npm run {demo|https|debug}` to invoke `errorReportService.js` at port 8081

### `npm run validationService`
Called from `npm run {demo|https|debug}` to invoke `validationService.js` at port 8082

### `npm run integrity-service-helpers`
Build `demo-backend/integrity-service-helpers/` as Node addon API

### `npm run validation-console`
Build `demo-backend/validation-console/` Validation Console GUI, which is served via `validationService.js`

### `npm run demo-certificates`
Generate certificates for the demo
- `npm run demo-certificates -- ${hostname}` - Server certificate at `demo-keys/demoCA/localhost.{crt|key}` ; `demo-keys/demoCA/demoCA.{crt|key}` if missing
- `npm run demo-certificates -- client client` - Client certificate at `demo-keys/demoCA/client.{crt|key|pfx}`; `demo-keys/demoCA/demoCA.{crt|key}` if missing
  - A password has to be specified for the client certificate. The password must not be empty on some platforms.
- Automatically called from `gulp demo-certificates` task
  - Notes:
    - `demo-keys/demoCA/demoCA.crt` must be trusted as a root CA by the local Chrome browser at build time
      - Installation on Linux: `cd demo-keys; certutil -d sql:$HOME/.pki/nssdb -A -n 'thin-hook demo CA' -i ./demoCA/demoCA.crt -t TCP,TCP,TCP`
    - `demo-keys/demoCA/client.pfx` must be imported as a user certificate by the browser to open Validation Console
      - Installation on Linux: `cd demo-keys; pk12util -d sql:$HOME/.pki/nssdb -i ./demoCA/client.pfx`

### `npm run clean-demo-certificates`
Clean up certificates in `demo-keys/demoCA/`. Each removal must be confirmed via `rm -rvi`

### `npm run cacheBundleUploadService`
Called from `npm run cache-bundle` to invoke `cacheBundleUploadService.js`

### `npm run cacheBundleGeneration`
Called from `npm run cache-bundle` to invoke `cacheBundleGeneration.js`

### `npm run loadOnly`
Called from `npm run updateHtmlHash` to invoke `cacheBundleGeneration.js` in `loadOnly` mode

## Gulp Tasks

```javascript
gulp.task('default',
  gulp.series(
    'build',        // build hook.min.js
    'build:test',   // build test/hook.min.js
    'examples',     // hook examples/*
    'demo'          // build demo
  )
);

gulp.task('demo',
  gulp.series(
    'integrity-service-helpers',            // build demo-backend/integrity-service-helpers/
    'validation-console',                   // build demo-backend/validation-console/
    'clean-gzip',                           // clean demo/*.gz
    'get-version',                          // get version from the entry page demo/original-index.html
    'demo-certificates',                    // generate certificates in demo-keys/demoCA/ if they are missing
    'demo-keys',                            // generate key pairs and secret keys in demo-keys/keys.json
    'browserify-commonjs',                  // build demo/browserify-commonjs.js
    'webpack-es6-module',                   // build demo/webpack-es6-module.js
    'webpack-commonjs',                     // build demo/webpack-commonjs.js
    'update-integrity-js',                  // update demo/integrity.js for the generated public keys in base64
    'update-no-hook-authorization',         // update demo/no-hook-authorization.js
    'update-no-hook-authorization-in-html', // update hook.min.js?no-hook-authorization=* in HTMLs
    'encode-demo-html',                     // generate demo/index.html from demo/original-index.html
    'cache-bundle',                         // generate demo/cache-bundle.json via puppeteer
    'integrity-json',                       // generate demo/integrity.json
    'gzip',                                 // gzip demo/cache-bundle.json and demo/integrity.json
    'demo-frontend',                        // refresh and generate `demo-frontend/`
  )
);

gulp.task('cache-bundle',
  gulp.series(
    'get-version',                   // get version
    'dummy-integrity',               // generate dummy demo/integrity.json for build
    'cache-bundle-automation-json',  // generate dummy demo/cache-bundle.json for build
    'cache-bundle-automation',       // generate demo/cache-bundle.json via npm run cache-bundle
    'script-hashes',                 // add script hashes to demo/cache-bundle.json
    'script-hashes-integrity',       // update integrity attributes of script-hashes.js script element in the entry page
    'update-html-hash'               // update "htmlHashHex" in demo-keys/keys.json via npm run updateHtmlHash
  )
);

```

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
