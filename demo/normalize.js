{
  Object.getOwnPropertyDescriptor(Math, 'PI');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Math.PI['/components/thin-hook/demo/normalize.js'] : true, 'Object.getOwnPropertyDescriptor() is normalized');

  Object.getPrototypeOf(HTMLElement);
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.HTMLElement.$__proto__$['/components/thin-hook/demo/normalize.js'] : true, 'Object.getPrototypeOf() is normalized');

  Object.getPrototypeOf(navigator);
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.navigator.$__proto__$['/components/thin-hook/demo/normalize.js'] : true, 'Object.getPrototypeOf() is normalized');

  window.hasOwnProperty('document');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.document['/components/thin-hook/demo/normalize.js'] : true, 'Object.hasOwnProperty() is normalized');

  window.__lookupGetter__('navigator');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.navigator['/components/thin-hook/demo/normalize.js'] : true, 'Object.__lookupGetter__() is normalized');

  navigator.propertyIsEnumerable('userAgent');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.navigator.userAgent['/components/thin-hook/demo/normalize.js'] : true, 'Object.propertyIsEnumerable() is normalized');

  Reflect.get(navigator, 'language');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.navigator.language['/components/thin-hook/demo/normalize.js'] : true, 'Reflect.get() is normalized');

  Reflect.isExtensible(location);
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.location['/components/thin-hook/demo/normalize.js'] : true, 'Reflect.isExtensible() is normalized');

  Array.prototype.map.apply([1,2,3], [i => i * 2]);
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Array.map['/components/thin-hook/demo/normalize.js'] : true, 'Array.prototype.map.apply() is normalized');

  class ArraySubclass extends Array {
    static isArray(...args) {
      return super.isArray.apply(this, args);
    }
    map(...args) {
      return super.map.apply(this, args);
    }
    superHasOwnProperty(property) {
      return super.hasOwnProperty(property);
    }
  }
  ArraySubclass.isArray([]);
  (new ArraySubclass(1, 2, 3)).map(i => i + 1);
  (new ArraySubclass(1, 2, 3)).superHasOwnProperty('forEach');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Array.isArray['/components/thin-hook/demo/normalize.js,ArraySubclass,static isArray'] : true, 'Array.isArray.apply() via super.isArray is normalized');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Array.map['/components/thin-hook/demo/normalize.js,ArraySubclass,map'] : true, 'Array.map.apply() via super.map is normalized');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.Array.forEach['/components/thin-hook/demo/normalize.js,ArraySubclass,superHasOwnProperty'] : true, 'Array.hasOwnProperty() via super.hasOwnProperty is normalized');

  chai.assert.throws(() => {
    class ArraySubclass2 extends Array {
      constructor(...args) {
        super(...args);
      }
    }
    window.ArraySubclass2 = ArraySubclass2;
    new ArraySubclass2(1,2,3);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class ArraySubclass3 extends Array {
    }
    class ArraySubclass4 extends ArraySubclass3 {
      constructor(...args) {
        super(...args);
      }
    }
    window.ArraySubclass4 = ArraySubclass4;
    new ArraySubclass4(1,2,3);
  }, /^Permission Denied:/);

  // window.caches is in the blacklist

  chai.assert.throws(() => {
    caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(window, 'caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptors(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.hasOwnProperty('caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.__lookupGetter__('caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.__lookupSetter__('caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.__defineGetter__('caches', function () {});
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.__defineSetter__('caches', function () {});
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.propertyIsEnumerable('caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(window, 'caches');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.defineProperty(window, 'caches', { configurable: true, enumerable: true, value: null });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let o = {};
    Object.defineProperty(o, 'caches', {
      get: Object.getOwnPropertyDescriptor.apply(Object, [ window, 'caches' ]).get.bind(window)
    });
    o.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let o = {};
    Object.defineProperty(o, 'caches', {
      get: Object.getOwnPropertyDescriptor.call(Object, window, 'caches').get.bind(window)
    });
    o.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get.apply(Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.call(Reflect, window, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    let caches = Reflect.apply.apply(Reflect, [ Reflect.get.apply.bind(Reflect.get), Reflect.get, [ Reflect, [ window, 'caches' ] ] ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    let caches = Reflect.get.bind(Reflect, window).apply(Object, ['caches']);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    let caches = Object.defineProperty({}, 'caches', {
      get: Reflect.apply(Object.getOwnPropertyDescriptor.bind(Object,window), Object.getOwnPropertyDescriptor, ['caches']).get.bind(window) })
      .caches;
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).apply(Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).call(Reflect, window, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get, Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get.bind(Reflect), Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get.bind(Reflect), null, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get.bind(Reflect), undefined, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get.bind(Reflect), Object, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.apply(Reflect.get.bind(Reflect, window), Object, [ 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).bind(Reflect, window).apply(Reflect, ['caches']);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).bind(Reflect, window).call(Reflect, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).bind(Reflect, window).bind(Reflect, 'caches').apply(Reflect, []);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Reflect.get.bind(Reflect).bind(Reflect, window).bind(Reflect, 'caches').call(Reflect);
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    let o = {};
    Object.defineProperty(o, 'caches', {
      get: Object.getOwnPropertyDescriptor.apply(Object, [ window, 'caches' ]).get.bind(window)
    });
    o.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    'use strict';
    let o = {};
    Object.defineProperty(o, 'caches', {
      get: Object.getOwnPropertyDescriptor.call(Object, window, 'caches').get.bind(window)
    });
    o.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.apply(Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.call(Reflect, window, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).apply(Reflect, [ window, 'caches' ]);
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).call(Reflect, window, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).bind(Reflect, window).apply(Reflect, ['caches']);
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).bind(Reflect, window).call(Reflect, 'caches');
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).bind(Reflect, window).bind(Reflect, 'caches').apply(Reflect, []);
  }, /^Permission Denied:/)

  chai.assert.throws(function () {
    'use strict';
    Reflect.get.bind(Reflect).bind(Reflect, window).bind(Reflect, 'caches').call(Reflect);
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Object.keys(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.entries(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.values(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign(window, { 'caches': null });
  }, /^Permission Denied:/);
  Object.assign(window, { 'a_new_global_variable': 1 });
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.window.a_new_global_variable['/components/thin-hook/demo/normalize.js'] : true, 'Object.assign() is normalized');

  // navigator.serviceWorker is in the blacklist

  chai.assert.throws(() => {
    navigator.serviceWorker;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(navigator, 'serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptors(navigator);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.hasOwnProperty('serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.__lookupGetter__('serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.__lookupSetter__('serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.__defineGetter__('serviceWorker', function () {});
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.__defineSetter__('serviceWorker', function () {});
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.propertyIsEnumerable('serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(navigator, 'serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.defineProperty(navigator, 'serviceWorker', { configurable: true, enumerable: true, value: null });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.defineProperties(navigator, { 'serviceWorker': { configurable: true, enumerable: true, value: null } });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.keys(navigator);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.entries(navigator);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.values(navigator);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign(navigator, { 'serviceWorker': null });
  }, /^Permission Denied:/);
  Object.assign(navigator, { 'a_new_navigator_property': 1 });
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.navigator.a_new_navigator_property['/components/thin-hook/demo/normalize.js'] : true, 'Object.assign() is normalized');

  // location.reload is in the blacklist

  chai.assert.throws(() => {
    location.reload();
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    location.reload.apply(location, []);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(location, 'reload', location);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.has(location, 'reload');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.getOwnPropertyDescriptor(location, 'reload');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.ownKeys(location);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.defineProperty(location, 'reload', { value: null });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.deleteProperty(location, 'reload');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.set(location, 'reload', null, location);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.preventExtensions(location);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.getPrototypeOf(location);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.setPrototypeOf(location, null);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.setPrototypeOf(location, null);
  }, /^Permission Denied:/);

  // DClass is not in the blacklist

  window.DClass = class DClass {
    constructor(n) { this._n = n; }
    static get isDummy() { return true }
    get dummyProperty() { return this._n; }
  };
  DClass.isDummy;
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.DClass.isDummy['/components/thin-hook/demo/normalize.js'] : true, 'Access to DClass.isDummy is traced');
  (new DClass(1)).dummyProperty;
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.DClass['/components/thin-hook/demo/normalize.js'] : true, 'Access to new DClass() is traced');
  chai.assert.isOk(Object.keys(globalObjectAccess).length ? globalObjectAccess.DClass.dummyProperty['/components/thin-hook/demo/normalize.js'] : true, 'Access to (new DClass()).dummyProperty is traced');

  // DummyClass is in the blacklist

  window.DummyClass = class DummyClass {
    constructor(n) { this._n = n; }
    static get isDummy() { return true }
    get dummyProperty() { return this._n; }
  };

  chai.assert.throws(() => {
    new DummyClass(1);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.construct(DummyClass, [1]);
  }, /^Permission Denied:/);

  // DummyClass2.isDummy DummyClass2.dummyProperty is in the blacklist

  window.DummyClass2 = class DummyClass2 {
    constructor(n) { /*this._n = n;*/ }
    static get isDummy() { return true }
    dummyMethod() { return 1; /*this._n;*/ }
    dummyMethod2() { return 2; /*this._n;*/ }
  };

  chai.assert.throws(() => {
    DummyClass2.isDummy;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.apply(DummyClass2.dummyMethod, new DummyClass2(1), []);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    try {
      let obj = new DummyClass2(1);
      let _get = Reflect.get;
      let _prototype = DummyClass2.prototype;
      console.error('_prototype', _prototype);
      let _dummyMethod = _get(_prototype, 'dummyMethod');
      console.error('_dummyMethod', _dummyMethod);
      let obj2 = new (class C2 extends DummyClass2 {})();
      _dummyMethod.apply(obj2);
    }
    catch (e) {
      throw e;
    }
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let obj = new DummyClass2(1);
    let f = obj.dummyMethod2; // Note: In general, uncallable methods should not be readable.
    function indirectCall() {
      console.error('DummyClass2.dummyMethod2 can be indirectly called, returing ', f());
    }
    indirectCall();
  }, /^Permission Denied:/);

  function bindCheck() {

    // DummyClass2.dummyMethod2 is readable but not callable
    // DummyClass2.dummyMethod2.bind(obj) is treated as a calling operation and prohibited by 'r--' policy

    chai.assert.throws(() => {
      let obj = new DummyClass2(1);
      let b = obj.dummyMethod2.bind;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let obj = new DummyClass2(1);
      let f = obj.dummyMethod2.bind(obj); // Note: In general, uncallable methods should not be readable.
      console.error('Bound DummyClass2.dummyMethod2 can be called, returing ', f());
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Object.defineProperty.bind(Object, navigator);
      boundF('prop1', { value: 'x' });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Object.defineProperty.bind(Object).bind(Object, navigator).bind(Object, 'prop1').bind(Object, { value: 'x' });
      boundF();
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Object.assign.bind(Object).bind(Object, navigator).bind(Object, { 'prop1': 'x' }).bind(Object, { 'prop2': 'y' });
      function fromDifferentContext() {
        boundF();
      }
      fromDifferentContext();
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Array.prototype.map.bind(['a']);
      console.error('Bound Array.prototype.map returns ', boundF(item => item + ' '));
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Array.prototype.map.bind(document.querySelectorAll('div')); // ACL for Array, not NodeList
      console.error('Bound Array.prototype.map returns ', boundF(item => item + ' ')); // ACL for Array, not NodeList
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = Array.prototype.concat.bind(
        Array.prototype.map.bind(document.querySelectorAll('script')).bind([], item => item.src)())
        .bind(['ignored'], ['appended1', 'appended2'])
        .bind(['ignored2'], ['appended3', 'appended4']); // ACL for Array, not NodeList
      console.error('Bound Array.prototype.concat returns ', boundF()); // ACL for Array, not NodeList
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let boundF = btoa.bind(window, 'hello, world');
      console.error('Bound btoa returns ', boundF());
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      btoa.bind = function () {};
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      btoa.constructor.prototype.bind = function () {};
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let d = { now: Date.now.bind(Date) };
      d.now();
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.now = Date.now.bind(Date);
      class B extends A {
        static now() {
          return super.now();
        }
      }
      B.now();
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect);
      class B extends A {
        static get(o, p) {
          return super.get(o, p);
        }
      }
      B.get(window, 'caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window);
      class B extends A {
        static get(p) {
          return super.get(p);
        }
      }
      B.get('caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window, 'caches');
      class B extends A {
        static get() {
          return super.get();
        }
      }
      B.get('');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get;
      class B extends A {
        static get(o, p) {
          return super.get.apply(Reflect, [o, p]);
        }
      }
      B.get(window, 'caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get;
      class B extends A {
        static get(o, p) {
          return super.get.call(Reflect, o, p);
        }
      }
      B.get(window, 'caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect);
      class B extends A {
        static get(o, p) {
          return super.get.apply(null, [o, p]);
        }
      }
      B.get(window, 'caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect);
      class B extends A {
        static get(o, p) {
          return super.get.call(null, o, p);
        }
      }
      B.get(window, 'caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window);
      class B extends A {
        static get(p) {
          return super.get.apply(null, [p]);
        }
      }
      B.get('caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window);
      class B extends A {
        static get(p) {
          return super.get.call(null, p);
        }
      }
      B.get('caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window, 'caches');
      class B extends A {
        static get() {
          return super.get.apply(null, []);
        }
      }
      B.get('caches');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      class A {}
      A.get = Reflect.get.bind(Reflect, window, 'caches');
      class B extends A {
        static get() {
          return super.get.call(null);
        }
      }
      B.get();
    }, /^Permission Denied:/);

/*
    chai.assert.throw(() => {
      let d = {now:Date.now};
      d.now();
    }, /^Permission Denied:/);

    chai.assert.throw(() => {
      with ({now:Date.now}) {
        now();
      }
    }, /^Permission Denied:/);

    chai.assert.throw(() => {
      with ({now:Date.now.bind(Date)}) {
        now();
      }
    }, /^Permission Denied:/);
*/

  }
  bindCheck();

  // Global function btoa is blocked in this context
  chai.assert.throws(() => {
    btoa('abc');
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    let f = btoa;
  }, /^Permission Denied:/);

  // Jailbreak trials

  // __hook__ is in the blacklist

  chai.assert.throws(() => {
    let h = window.__hook__;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.__hook__ = null;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    typeof __hook__;
  }, /^Permission Denied:/);

  // Access to hook is prohibited

  chai.assert.throws(() => { window.hook; }, /^Permission Denied:/);
  chai.assert.throws(() => { window.hook = null; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.hookHtml; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.__hook__; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.__hook_except_properties__; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.contextGenerators; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.serviceWorkerHandlers; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.serviceWorkerTransformers; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.hookWorkerHandler; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.registerServiceWorker; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.hook; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.global; }, /^Permission Denied:/);
  chai.assert.throws(() => {
    let __unexpected_access_to_hook_callback_function__;
    hook.global(__hook__, '/components/thin-hook/demo/normalize.js', 'a', 'get')._pp_a;
  }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.Function; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.eval; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.setTimeout; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.setInterval; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.Node; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.Element; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.HTMLAnchorElement; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.HTMLAreaElement; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.HTMLScriptElement; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.Document; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.utils; }, /^Permission Denied:/);
  chai.assert.throws(() => { hook.parameters; }, /^Permission Denied:/);
  chai.assert.throws(() => {
    new hook.Function('__hook__', [['Function', {}]], 'method')
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    hook.setTimeout('__hook__', [['setTimeout', {}]], 'method');
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    hook.setInterval('__hook__', [['setInterval', {}]], 'method');
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    hook.eval('__hook__', [['eval', {}]], 'method');
  }, /^Permission Denied:/);

  chai.assert.equal(function () {
    let hook = 1;
    return hook;
  }(), 1, 'local hook variable is allowed');

  // Access to hook alias $hook$ is prohibited

  chai.assert.throws(() => {
    $hook$.setTimeout('__hook__', [['setTimeout', {}]], 'method');
  }, /__unexpected_access_to_hook_alias_object__/);

  chai.assert.equal(function () {
    let $hook$ = null;
    return eval('2');
  }(), 2, 'local $hook$ variable does not affect hooked eval');

  // global variables in hook-callback.js is in the blacklist
  chai.assert.throws(() => { contexts; }, /^Permission Denied:/);
  chai.assert.throws(() => { window.contexts; }, /^Permission Denied:/);

  // Object.getOwnPropertyDescriptor is not readable

  chai.assert.throws(() => {
    let getDesc = Object.getOwnPropertyDescriptor;
    let desc = getDesc.apply(Object, [window, 'caches']);
    let _caches = desc.get.apply(window);
    _caches.open().then(() => console.error('caches.open()'));
  }, /^Permission Denied:/);

  // Reflect.get is not readable

  chai.assert.throws(() => {
    let _get = Reflect.get;
    let _constructor = _get.apply(Reflect, [navigator, 'constructor']);
    let _prototype = _get.apply(Reflect, [_constructor, 'prototype']);
    let _getDesc = Object.getOwnPropertyDescriptor;
    let desc = _getDesc.apply(Object, [_prototype, 'serviceWorker']);
    let _serviceWorker = desc.get.apply(navigator);
    _serviceWorker.register().then(() => console.error('navigator.serviceWorker.register()'));
  }, /^Permission Denied:/);  

  // Object methods are detected even via subclasses

  chai.assert.throws(() => {
    (class O extends Object {}).getOwnPropertyDescriptor(navigator, 'serviceWorker');
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    (class O extends Object {}).defineProperty(navigator, 'a_new_property', { configurable: true, enumerable: true, value: 1 });
  }, /^Permission Denied:/);


  // Nested 'with' statements
  {
    let a = { foo: 1, bar: 2, [Symbol.unscopables]: { bar: true } };
    with (a) {
      let x = 3;
      let b = { y: 4, z: 5, u: 7, [Symbol.unscopables]: { z: true } };
      with (b) {
        let v1 = foo;
        let v2 = typeof bar;
        let v3 = y;
        let v4 = typeof z;
        let u = 11;
        let v5 = u;
        foo = 3;
        y = 6;
        chai.assert.equal(v1, 1, 'foo is 1');
        chai.assert.equal(v2, 'undefined', 'typeof bar is undefined');
        chai.assert.equal(v3, 4, 'y is 4');
        chai.assert.equal(v5, 11, 'u is 11');
        chai.assert.equal(v4, 'undefined', 'typeof z is undefined');
        with ({ z:1, u: 2, [Symbol.unscopables]: { u: true } }) {
          let v6 = z;
          let v7 = u;
          chai.assert.equal(v6, 1, 'z is 1');
          chai.assert.equal(v7, 11, 'u is 11');
          x = y;
          let f = function f(a, b) { return a + b; };
          let v8 = f(v6, v7);
          chai.assert.equal(v8, 12, 'v8 is 12');
        }
      }
      chai.assert.equal(b.y, 6, 'b.y is 6');
    }
    chai.assert.equal(a.foo, 3, 'a.foo is 3');
  }

  // ACL works even for scoped variables via 'with' statement

  chai.assert.throws(() => {
    let sw;
    with (navigator) {
      sw = serviceWorker;
    }
  }, /^Permission Denied:/)
}
() => {
  let target, property, value, attributes, proto, prototype, receiver, args, arg1, arg2, p, v;
//Read

  Object.getOwnPropertyDescriptor(target, 'property') //(target.property)
  Object.getOwnPropertyDescriptors(target).property //(target.property)
  Object.getPrototypeOf(target) //(target.__proto__)
  target.__proto__ //(target.__proto__)
  target.prototype //(target.prototype)
  target.prototype.property //(target.prototype.property)
  target.__lookupGetter__('property') //(target.property)
  Object.prototype.__lookupGetter__.apply(target, 'property') //(target.property)
  target.property.toString() //(for polyfills and non-native APIs) (target.property)
  target.prototype.property.toString() //(for polyfills and non-native APIs) (target.prototype.property)
  target.hasOwnProperty('property') //(target.property)
  Object.create(target) //(target)
  Object.getOwnPropertyDescriptors(target) // (target.*)
  Object.getOwnPropertyNames(target) //(target.*)
  Object.keys(target) //(target.*)
  Object.entries(target) //(target.*)
  Object.values(target) //(target.*)

//Call

  property.apply(target, args) //(target.property(args))
  property.call(target, arg1, arg2) //(target.property(arg1, arg2, ...))

//Write

  Object.defineProperty(target, 'property', {}) //(target.property =)
  Object.defineProperties(target, { 'property': {} }) //(target.property =)
  Object.defineProperty(target.prototype, 'property', {}) //(target.prototype.property =)
  Object.defineProperties(target.prototype, { 'property': {} }) //(target.prototype.property =)
  Object.setPrototypeOf(target, proto) //(target.__proto__ =)
  target.__proto__ = //(target.__proto__ =)
  target.property = //(target.property =)
  target.prototype = //(target.prototype =)
  target.prototype.method = //(target.prototype.property =)
  Object.freeze(target) //(target.* =)
  Object.seal(target) //(target.* =)
  Object.assign(target, { 'property': value }) //(target.property =)
  Object.assign(target.prototype, { 'property': value }) //(target.prototype.property =)
  target.__lookupSetter__('property') //(target.property =)
  target.__defineGetter__('property', value) //(target.property =)
  target.__defineSetter__('property', value) //(target.property =)
  target.prototype.__lookupSetter__('property') //(target.prototype.property =)
  target.prototype.__defineGetter__('property', value) //(target.prototype.property =)
  target.prototype.__defineSetter__('property', value) //(target.prototype.property =)

//Reflect

//Read

  Reflect.get(target, 'property', receiver) //(target.property)
  Reflect.getPrototypeOf(target) //(target.__proto__)
  Reflect.has(target, 'property') //(target.property)
  Reflect.getOwnPropertyDescriptor(target, 'property') //(target.property)
  Reflect.isExtensible(target) //(target.*)
  Reflect.ownKeys(target) //(target.*)
  Reflect.enumerate() //(deprecated)

//Call

  Reflect.construct(target, args) //(new target)
  Reflect.apply(property, target, args) //(target.property())

//Write

  Reflect.defineProperty(target, 'property', attributes) //(target.property =)
  Reflect.deleteProperty(target, 'property') //(target.property =)
  Reflect.set(target, 'property', value, receiver) //(target.property =)
  Reflect.setPrototypeOf(target, prototype) //(target.__proto__ =)
  Reflect.preventExtensions(target) //(target.* =)

//Identity fraud

  target.property.bind(target)(...args) //(target.property())
//Note: In the call to 
  __hook__('()', property, ['bind', [target]], 'callerContext');//, the return value property.bind(target) can be cached in a WeakMap object like _boundFunctions which maps the bound function to the original function property. So, _boundFunctions.get(boundF) returns the original F.
//Note: Additionally, the return value can be hooked as 
  (..._args) => __hook__(thisArg[args[0]](... args[1]), args[1][0], _args, context)// so that subsequent calls to the bound function can be hooked.
  target.property.bind(target).apply(target, args) //(target.property())
  target.prototype.method.bind(target).apply(new target(), args) //(target.prototype.method())
  target[Symbol.hasInstance] = //(obj instanceof target)
  target[Symbol.species] = //(new target() instanceof Class)
  (class O extends Object {}).defineProperty(target, 'property', {}) //(target.property =)
//Note: Theoretically, any properties of any classes can be accessed via subclassing
  let f = Object.defineProperty; f(target, property, {}) //(target.property =)
//Note: Theoretically, any methods of any classes can be accessed via function variables
//Note: Indirect function calls such as f() in this pattern are NOT currently hooked.
//Note: Access to sensitive properties like Object.defineProperty without direct function calls can be totally blocked to forbid suspicious operations as this indirect method call pattern. This may cause incompatibility issues in a low probability.
//Note: Another approach is to return function defineProperty(...args) { return __hook__(Object.defineProperty, Object, args, 'context'); } on Object.defineProperty access. 
//In a real implementation, the return value of 
  __hook__('.', Object, ['defineProperty'], 'callerContext');// would be 
  (..._args) => __hook__(thisArg[args[0]], thisArg, _args, context);
//Note: Yet another approach is to hook targeted sensitive properties such as Object.defineProperty with 
  (...args) => __hook__(__hook__('.', Object, ['defineProperty'], 'context'), Object, args, 'context')

//Out of current property hook coverage (More research required including hook necessity)

//Read

  'property' in target //(target.property)
//Note: target is hooked if it is global
  for (p in target) //(target.*)
//Note: target is hooked if it is global
  for (v of target) //(target.*)
//Note: target is hooked if it is global
  Object.create(target) //(target.*)
//Note: target is hooked if it is global

//Identity fraud

  class target2 { static get [Symbol.hasInstance] () {} } //(obj instanceof target)
//Note: The getter function is hooked but instanceof operation is not
  class target3 { static get [Symbol.species]() {} } //(new target() instanceof Class)
//Note: The getter function is hooked but instanceof operation is not

}