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
    Reflect.get(Object.setPrototypeOf({ get c() { return this.caches; /* this === window */ } }, window), 'c', window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(Object.create(window), 'caches', window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(Object.create(navigator), 'serviceWorker', navigator);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let { caches: c } = window;
    //c.open();
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    function f({ caches: c }, { serviceWorker: sw }) { return [c, sw]; }
    f(window, navigator);
  }, /^Permission Denied:/);

  (async () => {
    let exception;
    try {
      async function f({ caches: c }, { serviceWorker: sw }) { return [c, sw]; }
      await f(window, navigator);
    }
    catch (e) {
      exception = e;
    }
    finally {
      chai.assert.throws(() => { if (exception) throw exception; }, /^Permission Denied:/)
    }
  })();

  chai.assert.throws(() => {
    function* f({ caches: c }, { serviceWorker: sw }) { yield c; yield sw; }
    for (let o of f(window, navigator)) {}
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    (function ({ caches: c }, { serviceWorker: sw }) { return [c, sw]; })(window, navigator);
  }, /^Permission Denied:/);

  (async () => {
    let exception;
    try {
      await (async function ({ caches: c }, { serviceWorker: sw }) { return [c, sw]; })(window, navigator);
    }
    catch (e) {
      exception = e;
    }
    finally {
      chai.assert.throws(() => { if (exception) throw exception; }, /^Permission Denied:/)
    }
  })();

  chai.assert.throws(() => {
    for (let o of (function* ({ caches: c }, { serviceWorker: sw }) { yield c; yield sw; })(window, navigator)) {}
  }, /^Permission Denied:/);
  
  chai.assert.throws(() => {
    (({ caches: c }) => c)(window);
  }, /^Permission Denied:/);

  (async () => {
    let exception;
    try {
      await (async ({ caches: c }) => c)(window);
    }
    catch (e) {
      exception = e;
    }
    finally {
      chai.assert.throws(() => { if (exception) throw exception; }, /^Permission Denied:/)
    }
  })();

  chai.assert.throws(() => {
    class C {
      constructor({ caches: c }) {
        this.caches = c;
      }
    }
    new C(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class C {
      static smethod({ caches: c }) {
        return c;
      }
    }
    C.smethod(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class C {
      method({ caches: c }) {
        return c;
      }
    }
    (new C()).method(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class C {
      * gen({ caches: c }) {
        yield c;
      }
    }
    for (let o of (new C()).gen(window)) {}
  }, /^Permission Denied:/);

  (async () => {
    let exception;
    try {
      class C {
        static async smethod({ caches: c }) {
          return c;
        }
      }
      await C.smethod(window);
    }
    catch (e) {
      exception = e;
    }
    finally {
      chai.assert.throws(() => { if (exception) throw exception; }, /^Permission Denied:/)
    }
  })();

  (async () => {
    let exception;
    try {
      class C {
        async method({ caches: c }) {
          return c;
        }
      }
      await (new C()).method(window);
    }
    catch (e) {
      exception = e;
    }
    finally {
      chai.assert.throws(() => { if (exception) throw exception; }, /^Permission Denied:/)
    }
  })();

  chai.assert.throws(() => {
    ({ m({ caches: c }) { return c } }).m(window);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let { serviceWorker: sw } = navigator;
    //sw.register();
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

  chai.assert.throws(() => {
    Function.bind(null)('return window.caches')();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    const GeneratorFunction = (function*(){}).constructor;
    GeneratorFunction.bind(null)('yield window.caches;')().next().value;
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    let F = { Function: Function };
    let O = { Function(...args) { return super.Function(...args); } };
    Object.setPrototypeOf(O, F);
    O.Function('return window.caches')();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    const GeneratorFunction = (function*(){}).constructor;
    let F = { GeneratorFunction: GeneratorFunction };
    let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
    Object.setPrototypeOf(O, F);
    O.GeneratorFunction('return window.caches')().next().value;
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    Function.bind(null).apply(null, ['return window.caches'])();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    const GeneratorFunction = (function*(){}).constructor;
    GeneratorFunction.bind(null).call(null, 'yield window.caches;')().next().value;
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    let F = { Function: Function };
    let O = { Function(...args) { return super.Function.bind(this, ...args).apply(this); } };
    Object.setPrototypeOf(O, F);
    O.Function('return window.caches')();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    const GeneratorFunction = (function*(){}).constructor;
    let F = { GeneratorFunction: GeneratorFunction };
    let O = { GeneratorFunction(...args) { return super.GeneratorFunction.bind(this).call(this, ...args); } };
    Object.setPrototypeOf(O, F);
    O.GeneratorFunction('return window.caches')().next().value;
  }, /^Permission Denied:/)

  with ({}) {
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

    chai.assert.throws(() => {
      Function.bind(null)('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function*(){}).constructor;
      GeneratorFunction.bind(null)('yield window.caches;')().next().value;
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let F = { Function: Function };
      let O = { Function(...args) { return super.Function(...args); } };
      Object.setPrototypeOf(O, F);
      O.Function('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function*(){}).constructor;
      let F = { GeneratorFunction: GeneratorFunction };
      let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
      Object.setPrototypeOf(O, F);
      O.GeneratorFunction('return window.caches')().next().value;
    }, /^Permission Denied:/)

  }

  with (window) {
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
      window.__defineGetter__('caches', function () { });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      window.__defineSetter__('caches', function () { });
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
        get: Object.getOwnPropertyDescriptor.apply(Object, [window, 'caches']).get.bind(window)
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
      Reflect.get.apply(Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.call(Reflect, window, 'caches');
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Reflect.apply.apply(Reflect, [Reflect.get.apply.bind(Reflect.get), Reflect.get, [Reflect, [window, 'caches']]]);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Reflect.get.bind(Reflect, window).apply(Object, ['caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Object.defineProperty({}, 'caches', {
        get: Reflect.apply(Object.getOwnPropertyDescriptor.bind(Object, window), Object.getOwnPropertyDescriptor, ['caches']).get.bind(window)
      })
        .caches;
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.bind(Reflect).apply(Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.bind(Reflect).call(Reflect, window, 'caches');
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get, Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), null, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), undefined, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), Object, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect, window), Object, ['caches']);
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

    chai.assert.throws(() => {
      Function.bind(null)('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function* () { }).constructor;
      GeneratorFunction.bind(null)('yield window.caches;')().next().value;
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let F = { Function: Function };
      let O = { Function(...args) { return super.Function(...args); } };
      Object.setPrototypeOf(O, F);
      O.Function('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function* () { }).constructor;
      let F = { GeneratorFunction: GeneratorFunction };
      let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
      Object.setPrototypeOf(O, F);
      O.GeneratorFunction('return window.caches')().next().value;
    }, /^Permission Denied:/)

  }

  with (Object.create(window)) {
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
      window.__defineGetter__('caches', function () { });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      window.__defineSetter__('caches', function () { });
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
        get: Object.getOwnPropertyDescriptor.apply(Object, [window, 'caches']).get.bind(window)
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
      Reflect.get.apply(Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.call(Reflect, window, 'caches');
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Reflect.apply.apply(Reflect, [Reflect.get.apply.bind(Reflect.get), Reflect.get, [Reflect, [window, 'caches']]]);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Reflect.get.bind(Reflect, window).apply(Object, ['caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let caches = Object.defineProperty({}, 'caches', {
        get: Reflect.apply(Object.getOwnPropertyDescriptor.bind(Object, window), Object.getOwnPropertyDescriptor, ['caches']).get.bind(window)
      })
        .caches;
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.bind(Reflect).apply(Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.get.bind(Reflect).call(Reflect, window, 'caches');
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get, Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), Reflect, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), null, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), undefined, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect), Object, [window, 'caches']);
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      Reflect.apply(Reflect.get.bind(Reflect, window), Object, ['caches']);
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

    chai.assert.throws(() => {
      Function.bind(null)('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function* () { }).constructor;
      GeneratorFunction.bind(null)('yield window.caches;')().next().value;
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      let F = { Function: Function };
      let O = { Function(...args) { return super.Function(...args); } };
      Object.setPrototypeOf(O, F);
      O.Function('return window.caches')();
    }, /^Permission Denied:/)

    chai.assert.throws(() => {
      const GeneratorFunction = (function* () { }).constructor;
      let F = { GeneratorFunction: GeneratorFunction };
      let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
      Object.setPrototypeOf(O, F);
      O.GeneratorFunction('return window.caches')().next().value;
    }, /^Permission Denied:/)

  }

  with (navigator) {
    with ({ navigator: navigator }) {
      chai.assert.throws(() => {
        serviceWorker;
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
        navigator.__defineGetter__('serviceWorker', function () { });
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        navigator.__defineSetter__('serviceWorker', function () { });
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
        let o = {};
        Object.defineProperty(o, 'serviceWorker', {
          get: Object.getOwnPropertyDescriptor.apply(Object, [navigator, 'serviceWorker']).get.bind(navigator)
        });
        o.serviceWorker;
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        let o = {};
        Object.defineProperty(o, 'serviceWorker', {
          get: Object.getOwnPropertyDescriptor.call(Object, navigator, 'serviceWorker').get.bind(navigator)
        });
        o.serviceWorker;
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        Reflect.get.apply(Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.call(Reflect, navigator, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Reflect.apply.apply(Reflect, [Reflect.get.apply.bind(Reflect.get), Reflect.get, [Reflect, [navigator, 'serviceWorker']]]);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Reflect.get.bind(Reflect, navigator).apply(Object, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Object.defineProperty({}, 'serviceWorker', {
          get: Reflect.apply(Object.getOwnPropertyDescriptor.bind(Object, navigator), Object.getOwnPropertyDescriptor, ['serviceWorker']).get.bind(navigator)
        })
          .serviceWorker;
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).apply(Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).call(Reflect, navigator, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get, Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), null, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), undefined, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), Object, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect, navigator), Object, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).apply(Reflect, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).call(Reflect, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).bind(Reflect, 'serviceWorker').apply(Reflect, []);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).bind(Reflect, 'serviceWorker').call(Reflect);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Function.bind(null)('return navigator.serviceWorker')();
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        const GeneratorFunction = (function* () { }).constructor;
        GeneratorFunction.bind(null)('yield navigator.serviceWorker;')().next().value;
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let F = { Function: Function };
        let O = { Function(...args) { return super.Function(...args); } };
        Object.setPrototypeOf(O, F);
        O.Function('return navigator.serviceWorker')();
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        const GeneratorFunction = (function* () { }).constructor;
        let F = { GeneratorFunction: GeneratorFunction };
        let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
        Object.setPrototypeOf(O, F);
        O.GeneratorFunction('return navigator.serviceWorker')().next().value;
      }, /^Permission Denied:/)

    }
  }

  with (Object.create(navigator)) {
    with (Object.create({ navigator: Object.create(navigator) })) {
      chai.assert.throws(() => {
        serviceWorker;
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        if (!Object.getOwnPropertyDescriptor(navigator, 'serviceWorker')) {
          Object.getOwnPropertyDescriptor(Object.getPrototypeOf(navigator), 'serviceWorker');
        }
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        Object.getOwnPropertyDescriptors(navigator);
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        if (!navigator.hasOwnProperty('serviceWorker')) {
          Object.getPrototypeOf(navigator).hasOwnProperty('serviceWorker')
        }
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        if (!navigator.__lookupGetter__('serviceWorker')) {
          Object.getPrototypeOf(navigator).__lookupGetter__('serviceWorker')
        }
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        if (!navigator.__lookupSetter__('serviceWorker')) {
          Object.getPrototypeOf(navigator).__lookupSetter__('serviceWorker')
        }
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        navigator.__defineGetter__('serviceWorker', function () { });
        Object.getPrototypeOf(navigator).__defineGetter__('serviceWorker', function () { });
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        navigator.__defineSetter__('serviceWorker', function () { });
        Object.getPrototypeOf(navigator).__defineSetter__('serviceWorker', function () { });
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        navigator.propertyIsEnumerable('serviceWorker');
        Object.getPrototypeOf(navigator).propertyIsEnumerable('serviceWorker');
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        Reflect.get(navigator, 'serviceWorker');
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        Object.defineProperty(navigator, 'serviceWorker', { configurable: true, enumerable: true, value: null });
        Object.defineProperty(Object.getPrototypeOf(navigator), 'serviceWorker', { configurable: true, enumerable: true, value: null });
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        let o = {};
        Object.defineProperty(o, 'serviceWorker', {
          get: Object.getOwnPropertyDescriptor.apply(Object, [navigator, 'serviceWorker']).get.bind(navigator)
        });
        o.serviceWorker;
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        let o = {};
        Object.defineProperty(o, 'serviceWorker', {
          get: Object.getOwnPropertyDescriptor.call(Object, navigator, 'serviceWorker').get.bind(navigator)
        });
        o.serviceWorker;
      }, /^Permission Denied:/);

      chai.assert.throws(() => {
        Reflect.get.apply(Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.call(Reflect, navigator, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Reflect.apply.apply(Reflect, [Reflect.get.apply.bind(Reflect.get), Reflect.get, [Reflect, [navigator, 'serviceWorker']]]);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Reflect.get.bind(Reflect, navigator).apply(Object, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let serviceWorker = Object.defineProperty({}, 'serviceWorker', {
          get: Reflect.apply(Object.getOwnPropertyDescriptor.bind(Object, navigator), Object.getOwnPropertyDescriptor, ['serviceWorker']).get.bind(navigator)
        })
          .serviceWorker;
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).apply(Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).call(Reflect, navigator, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get, Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), Reflect, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), null, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), undefined, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect), Object, [navigator, 'serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.apply(Reflect.get.bind(Reflect, navigator), Object, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).apply(Reflect, ['serviceWorker']);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).call(Reflect, 'serviceWorker');
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).bind(Reflect, 'serviceWorker').apply(Reflect, []);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Reflect.get.bind(Reflect).bind(Reflect, navigator).bind(Reflect, 'serviceWorker').call(Reflect);
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        Function.bind(null)('return navigator.serviceWorker')();
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        const GeneratorFunction = (function* () { }).constructor;
        GeneratorFunction.bind(null)('yield navigator.serviceWorker;')().next().value;
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        let F = { Function: Function };
        let O = { Function(...args) { return super.Function(...args); } };
        Object.setPrototypeOf(O, F);
        O.Function('return navigator.serviceWorker')();
      }, /^Permission Denied:/)

      chai.assert.throws(() => {
        const GeneratorFunction = (function* () { }).constructor;
        let F = { GeneratorFunction: GeneratorFunction };
        let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
        Object.setPrototypeOf(O, F);
        O.GeneratorFunction('return navigator.serviceWorker')().next().value;
      }, /^Permission Denied:/)

    }
  }

  chai.assert.throws(() => {
    'use strict';
    Function.bind(null)('return window.caches')();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    'use strict';
    const GeneratorFunction = (function*(){}).constructor;
    GeneratorFunction.bind(null)('yield window.caches;')().next().value;
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    'use strict';
    let F = { Function: Function };
    let O = { Function(...args) { return super.Function(...args); } };
    Object.setPrototypeOf(O, F);
    O.Function('return window.caches')();
  }, /^Permission Denied:/)

  chai.assert.throws(() => {
    'use strict';
    const GeneratorFunction = (function*(){}).constructor;
    let F = { GeneratorFunction: GeneratorFunction };
    let O = { GeneratorFunction(...args) { return super.GeneratorFunction(...args); } };
    Object.setPrototypeOf(O, F);
    O.GeneratorFunction('return window.caches')().next().value;
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

  // location is not writable
  chai.assert.throws(() => {
    location = 'about:blank';
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
      function f () {};
      f.bind;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Function.bind;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      function ff() {}
      ff.hasOwnProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      function ff() {}
      ff.dummyObjectMethod;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      let div = document.createElement('div');
      div.dummyObjectMethod;
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

    chai.assert.throws(() => {
      HTMLElement.prototype.click = null;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      window.HTMLElement2 = HTMLElement;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(window, 'HTMLElement3', { value: HTMLElement });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(window, 'HTMLElement4', { get: function () { return HTMLElement; } });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      window.__defineGetter__('HTMLElement5', function () { return HTMLElement; });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.assign(window, { 'HTMLElement6': HTMLElement });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperties(window, { 'HTMLElement7': { get: function () { return HTMLElement; } } });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperties(window, { 'HTMLElement8': { value: HTMLElement } });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      customElements.define('html-element9', HTMLElement);
    }, /^Permission Denied:/);

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
      let d = function () {};
      d.now = Date.now;
      d.now();
    }, /^Permission Denied:/);

    chai.assert.throw(() => {
      let d = function () {};
      d.now = Date.now;
      with (d) {
        now();
      }
    }, /^Permission Denied:/);

    chai.assert.throw(() => {
      with ({now:Date.now.bind(Date)}) {
        now();
      }
    }, /^Permission Denied:/);

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

  window.DummyClass3 = class DummyClass3 {
    static staticMethod() {}
    static get staticProperty() {}
    instanceMethod() {}
    get instanceProperty() {}
    set instanceProperty(value) {}
  };
  DummyClass3.staticMethod();
  DummyClass3.staticProperty;
  DummyClass3.staticProperty2 = 1;
  let dummyClass3Instance = new DummyClass3();
  dummyClass3Instance.instanceMethod();
  dummyClass3Instance.instanceProperty;
  dummyClass3Instance.instanceProperty2 = 1;
  dummyClass3Instance.hasOwnProperty('instanceProperty2');
  dummyClass3Instance.toString();
  dummyClass3Instance.__proto__.prototypeProperty = 1;
  dummyClass3Instance.__proto__.prototypeProperty2;
  chai.assert.throws(() => {
    DummyClass3.prototype.instanceProperty2 = 1;
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    DummyClass3.prototype.instanceMethod();
  }, /^Permission Denied:/);

  // Getter/Setter

  class GetterSetterClass {
    static get staticProperty() {
      return this._staticProperty;
    }
    static set staticProperty(value) {
      this._staticProperty = value;
    }
    get prototypeProperty() {
      return this._prototypeProperty;
    }
    set prototypeProperty(value) {
      this._prototypeProperty = value;
    }
    getInstanceProperty() {
      return this._instanceProperty;
    }
    setInstanceProperty(value) {
      this._instanceProperty = value;
    }
  };

  window.GetterSetterClass = GetterSetterClass;
  let getterSetterObject;
  let cloneObject;

  (function createProperty() {
    let staticPropertyDescriptor;
    staticPropertyDescriptor = Object.getOwnPropertyDescriptor(GetterSetterClass, 'staticProperty');
    Object.defineProperty(GetterSetterClass, 'clonedStaticProperty', staticPropertyDescriptor);

    let prototypePropertyDescriptor;
    prototypePropertyDescriptor = Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'prototypeProperty');
    Object.defineProperty(GetterSetterClass.prototype, 'clonedPrototypeProperty', prototypePropertyDescriptor);

    getterSetterObject = new GetterSetterClass();
    Object.defineProperty(getterSetterObject, 'instanceProperty', {
      configurable: true,
      enumerable: true,
      get: getterSetterObject.getInstanceProperty,
      set: getterSetterObject.setInstanceProperty,
    });
    let instancePropertyDescriptor;
    instancePropertyDescriptor = Object.getOwnPropertyDescriptor(getterSetterObject, 'instanceProperty');
    Object.defineProperty(getterSetterObject, 'clonedInstanceProperty', instancePropertyDescriptor);

    cloneObject = {};
    Object.defineProperty(cloneObject, 'instanceProperty', {
      configurable: true,
      enumerable: true,
      get: instancePropertyDescriptor.get.bind(getterSetterObject),
      set: instancePropertyDescriptor.set.bind(getterSetterObject),
    });

  })();

  (function writeProperty() {
    GetterSetterClass.staticProperty = 'staticPropertyValue';
    chai.assert.equal(GetterSetterClass.staticProperty, 'staticPropertyValue', 'check staticProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'staticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'staticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(GetterSetterClass, 'staticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete GetterSetterClass.staticProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      with (GetterSetterClass) {
        delete staticProperty;
      }
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      with ({}) {
        delete GetterSetterClass.staticProperty;
      }
    }, /^Permission Denied:/);

    chai.assert.throws(function () {
      'use strict';
      delete GetterSetterClass.staticProperty;
    }, /^Permission Denied:/);

    chai.assert.equal(GetterSetterClass.clonedStaticProperty, 'staticPropertyValue', 'check clonedStaticProperty');
    GetterSetterClass.clonedStaticProperty = 'clonedStaticPropertyValue';
    chai.assert.equal(GetterSetterClass.clonedStaticProperty, 'clonedStaticPropertyValue', 'check clonedStaticProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'clonedStaticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'clonedStaticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(GetterSetterClass, 'clonedStaticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete GetterSetterClass.clonedStaticProperty;
    }, /^Permission Denied:/);

    GetterSetterClass.staticProperty = 'staticPropertyValue'; // reset

    getterSetterObject.prototypeProperty = 'prototypePropertyValue';
    chai.assert.equal(getterSetterObject.prototypeProperty, 'prototypePropertyValue', 'check prototypeProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'prototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'prototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(GetterSetterClass.prototype, 'prototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete GetterSetterClass.prototype.prototypeProperty;
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedPrototypeProperty, 'prototypePropertyValue', 'check clonedPrototypeProperty');
    getterSetterObject.clonedPrototypeProperty = 'clonedPrototypePropertyValue';
    chai.assert.equal(getterSetterObject.clonedPrototypeProperty, 'clonedPrototypePropertyValue', 'check clonedPrototypeProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'clonedPrototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'clonedPrototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(GetterSetterClass.prototype, 'clonedPrototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete GetterSetterClass.prototype.clonedPrototypeProperty;
    }, /^Permission Denied:/);

    getterSetterObject.prototypeProperty = 'prototypePropertyValue'; // reset

    getterSetterObject.instanceProperty = 'instancePropertyValue';
    chai.assert.equal(getterSetterObject.instanceProperty, 'instancePropertyValue', 'check instanceProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'instanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'instanceProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(getterSetterObject, 'instanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete getterSetterObject.instanceProperty;
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedInstanceProperty, 'instancePropertyValue', 'check clonedInstanceProperty');
    getterSetterObject.clonedInstanceProperty = 'clonedInstancePropertyValue';
    chai.assert.equal(getterSetterObject.clonedInstanceProperty, 'clonedInstancePropertyValue', 'check clonedInstanceProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'clonedInstanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'clonedInstanceProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Reflect.deleteProperty(getterSetterObject, 'clonedInstanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      delete getterSetterObject.clonedInstanceProperty;
    }, /^Permission Denied:/);

    getterSetterObject.instanceProperty = 'instancePropertyValue'; // reset

  })();

  (function readProperty() {

    chai.assert.equal(GetterSetterClass.staticProperty, 'staticPropertyValue', 'check staticProperty');

    chai.assert.throws(() => {
      GetterSetterClass.staticProperty = 'staticPropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(GetterSetterClass.staticProperty, 'staticPropertyValue', 'check staticProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'staticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'staticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.equal(GetterSetterClass.clonedStaticProperty, 'staticPropertyValue', 'check clonedStaticProperty');

    chai.assert.throws(() => {
      GetterSetterClass.clonedStaticProperty = 'clonedStaticPropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(GetterSetterClass.clonedStaticProperty, 'staticPropertyValue', 'check clonedStaticProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'clonedStaticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'clonedStaticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.prototypeProperty, 'prototypePropertyValue', 'check prototypeProperty');

    chai.assert.throws(() => {
      getterSetterObject.prototypeProperty = 'prototypePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.prototypeProperty, 'prototypePropertyValue', 'check prototypeProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'prototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'prototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedPrototypeProperty, 'prototypePropertyValue', 'check clonedPrototypeProperty');

    chai.assert.throws(() => {
      getterSetterObject.clonedPrototypeProperty = 'clonedPrototypePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedPrototypeProperty, 'prototypePropertyValue', 'check clonedPrototypeProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'clonedPrototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'clonedPrototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.instanceProperty, 'instancePropertyValue', 'check instanceProperty');

    chai.assert.throws(() => {
      getterSetterObject.instanceProperty = 'instancePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.instanceProperty, 'instancePropertyValue', 'check instanceProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'instanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'instanceProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedInstanceProperty, 'instancePropertyValue', 'check clonedInstanceProperty');

    chai.assert.throws(() => {
      getterSetterObject.clonedInstanceProperty = 'clonedInstancePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.equal(getterSetterObject.clonedInstanceProperty, 'instancePropertyValue', 'check clonedInstanceProperty');

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'clonedInstanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'clonedInstanceProperty', { value: 1 });
    }, /^Permission Denied:/);

  })();

  (function noAccess() {

    chai.assert.throws(() => {
      GetterSetterClass.staticProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      GetterSetterClass.staticProperty = 'staticPropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'staticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'staticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      GetterSetterClass.clonedStaticProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      GetterSetterClass.clonedStaticProperty = 'clonedStaticPropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass, 'clonedStaticProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass, 'clonedStaticProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.prototypeProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.prototypeProperty = 'prototypePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'prototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'prototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.clonedPrototypeProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.clonedPrototypeProperty = 'clonedPrototypePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(GetterSetterClass.prototype, 'clonedPrototypeProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(GetterSetterClass.prototype, 'clonedPrototypeProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.instanceProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.instanceProperty = 'instancePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'instanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'instanceProperty', { value: 1 });
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.clonedInstanceProperty;
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      getterSetterObject.clonedInstanceProperty = 'clonedInstancePropertyValue2';
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.getOwnPropertyDescriptor(getterSetterObject, 'clonedInstanceProperty');
    }, /^Permission Denied:/);

    chai.assert.throws(() => {
      Object.defineProperty(getterSetterObject, 'clonedInstanceProperty', { value: 1 });
    }, /^Permission Denied:/);

  })();

  chai.assert.throws(() => {
    Object.defineProperty(window, 'globalObject', { value: { a: 1 } });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.defineProperty(window, 'globalObject', { value: { a: 1 } });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    __defineGetter__('globalObject', function () { return { a: 1 } });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let _v;
    __defineSetter__('globalObject', function (value) { _v = value; });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    delete globalObject;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    delete window.globalObject;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    with (window) {
      delete globalObject;
    }
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    with ({}) {
      delete window.globalObject;
    }
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    'use strict';
    delete window.globalObject;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.defineProperty(window, 'onerror', { get: function () { return null; }, set: function (value) {} });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.defineProperty(window, 'onerror', { get: function () { return null; }, set: function (value) {} });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    __defineGetter__('onerror', function () { return function () { return null; } });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    __defineSetter__('onerror', function (value) { });
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    delete onerror;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    delete window.onerror;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    with (window) {
      delete onerror;
    }
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    with ({}) {
      delete window.onerror;
    }
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    'use strict';
    delete window.onerror;
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    screen = {};
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    event = new Event('dummy');
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    screenTop = 1;
  }, /^Permission Denied:/);

  chai.assert.throws(function () {
    screen2 = screen;
  }, /^Permission Denied:/);

  // Chain ACL

  window.BaseClass1 = class BaseClass1 {
    constructor() {
      this.instanceProperty = 'BaseClass1.instanceProperty';
    }
    static staticMethod() {
      return 'BaseClass1.staticMethod';
    }
    static get staticProperty() {
      return 'BaseClass1.staticProperty';
    }
    instanceMethod() {
      return 'BaseClass1.prototype.instanceMethod';
    }
  };
  window.SubClass1 = class SubClass1 extends BaseClass1 {
    constructor() {
      super();
      this.instanceProperty = 'SubClass1.instanceProperty';
    }
    static staticMethod() {
      return 'SubClass1.staticMethod';
    }
    static get staticProperty() {
      return 'SubClass1.staticProperty';
    }
    instanceMethod() {
      return 'SubClass1.prototype.instanceMethod';
    }
  };
  window.SubClass2 = class SubClass2 extends SubClass1 {
    constructor() {
      super();
      this.instanceProperty = 'SubClass2.instanceProperty';
    }
    static staticMethod() {
      return 'SubClass2.staticMethod';
    }
    static get staticProperty() {
      return 'SubClass2.staticProperty';
    }
    instanceMethod() {
      return 'SubClass2.prototype.instanceMethod';
    }
  };
  chai.assert.equal(BaseClass1.staticMethod(), 'BaseClass1.staticMethod', 'BaseClass1.staticMethod');
  chai.assert.equal(BaseClass1.staticProperty, 'BaseClass1.staticProperty', 'BaseClass1.staticProperty');
  chai.assert.equal((new BaseClass1()).instanceMethod(), 'BaseClass1.prototype.instanceMethod', 'BaseClass1.prototype.instanceMethod');
  chai.assert.equal((new BaseClass1()).instanceProperty, 'BaseClass1.instanceProperty', 'BaseClass1.instanceProperty');
  chai.assert.equal(SubClass1.staticMethod(), 'SubClass1.staticMethod', 'SubClass1.staticMethod');
  chai.assert.equal(SubClass1.staticProperty, 'SubClass1.staticProperty', 'SubClass1.staticProperty');
  chai.assert.throws(() => {
    SubClass1.staticProperty = 1;
  }, /^Permission Denied:/);
  chai.assert.equal((new SubClass1()).instanceMethod(), 'SubClass1.prototype.instanceMethod', 'SubClass1.prototype.instanceMethod');
  chai.assert.equal((new SubClass1()).instanceProperty, 'SubClass1.instanceProperty', 'SubClass1.instanceProperty');
  chai.assert.throws(() => {
    SubClass2.staticMethod();
  }, /^Permission Denied:/);
  SubClass2.staticProperty = 2;

  window.SubClass3 = class SubClass3 extends SubClass2 {
    constructor() {
      super();
      this.instanceProperty = 'SubClass3.instanceProperty';
    }
    static staticMethod(a, b) {
      return a + b;
    }
    static get staticProperty() {
      return 'SubClass3.staticProperty';
    }
    instanceMethod() {
      return 'SubClass3.prototype.instanceMethod';
    }
  };
  chai.assert.throws(() => {
    SubClass3.staticProperty = 1;
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticProperty2 = 1;
  }, /^Permission Denied:/);
  chai.assert.equal(SubClass3.staticMethod(1,2), 3, '3');
  chai.assert.throws(() => {
    SubClass3.staticMethod; // not readable
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod(1, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod(1, -1); // -1 is not a positive number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod.call(SubClass3, 1, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod.apply(SubClass3, [1, -1]); // -1 is not a positive number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod.bind(SubClass3, 1).call(SubClass3, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass3.staticMethod.bind(SubClass3, [1])(-1); // -1 is not a positive number
  }, /^Permission Denied:/);

  Object.assign(window, { SubClass4: class SubClass4 extends SubClass2 {
    constructor() {
      super();
      this.instanceProperty = 'SubClass3.instanceProperty';
    }
    static staticMethod(a, b) {
      return a + b;
    }
    static get staticProperty() {
      return 'SubClass4.staticProperty';
    }
    instanceMethod() {
      return 'SubClass4.prototype.instanceMethod';
    }
  }});
  chai.assert.throws(() => {
    SubClass4.staticProperty = 1;
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticProperty2 = 1;
  }, /^Permission Denied:/);
  chai.assert.equal(SubClass4.staticMethod(1, 2), 3, '3');
  chai.assert.throws(() => {
    SubClass4.staticMethod; // not readable
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod(1, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod(1, -1); // -1 is not a positive number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod.call(SubClass4, 1, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod.apply(SubClass4, [1, -1]); // -1 is not a positive number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod.bind(SubClass4, 1).call(SubClass4, 'a'); // 'a' is not a number
  }, /^Permission Denied:/);
  chai.assert.throws(() => {
    SubClass4.staticMethod.bind(SubClass4, [1])(-1); // -1 is not a positive number
  }, /^Permission Denied:/);

  Object.defineProperty(window, 'DefinePropertyGlobalClass', { value: class DefinePropertyGlobalClass {}, enumerable: true, writable: true, configurable: true });
  chai.assert.throws(() => {
    new DefinePropertyGlobalClass();
  }, /^Permission Denied:/);

  let C = class DefinePropertyGetterGlobalClass {};
  Object.defineProperty(window, 'DefinePropertyGetterGlobalClass', { get: function () { return C; }, enumerable: true, configurable: true });
  chai.assert.throws(() => {
    new DefinePropertyGetterGlobalClass();
  }, /^Permission Denied:/);

  Object.defineProperty(window, 'DefinePropertyGetterVolatileGlobalClass', { get: function () { return class DefinePropertyGetterVolatileGlobalClass { }; }, enumerable: true, configurable: true });
  chai.assert.throws(() => {
    new DefinePropertyGetterVolatileGlobalClass();
  }, /^Permission Denied:/);

  Object.defineProperty(window, 'DefinePropertyGetterReflectGetGlobalClass', { get: function () { return class DefinePropertyGetterReflectGetGlobalClass { }; }, enumerable: true, configurable: true });
  chai.assert.throws(() => {
    new (Reflect.get(window, 'DefinePropertyGetterReflectGetGlobalClass'))();
  }, /^Permission Denied:/);

  Object.defineProperty(window, 'DefinePropertyGetterReflectGetExtendedGlobalClass', { get: function () { return class DefinePropertyGetterReflectGetExtendedGlobalClass { }; }, enumerable: true, configurable: true });
  chai.assert.throws(() => {
    new (Reflect.get(Object.create(window), 'DefinePropertyGetterReflectGetExtendedGlobalClass'))();
  }, /^Permission Denied:/);

  Object.defineProperty(window, 'DefinePropertyGetterReflectGetExtendedGlobalClassWithReceiver', { get: function () { return class DefinePropertyGetterReflectGetExtendedGlobalClassWithReceiver { }; }, enumerable: true, configurable: true });
  chai.assert.throws(() => {
    new (Reflect.get(Object.create(window), 'DefinePropertyGetterReflectGetExtendedGlobalClassWithReceiver', window))();
  }, /^Permission Denied:/);

  Object.defineProperties(window, { 'DefinePropertiesGlobalClass': { value: class DefinePropertiesGlobalClass {}, enumerable: true, writable: true, configurable: true } });
  chai.assert.throws(() => {
    new DefinePropertiesGlobalClass();
  }, /^Permission Denied:/);

  let C2 = class DefinePropertiesGetterGlobalClass { };
  Object.defineProperties(window, { 'DefinePropertiesGetterGlobalClass': { get: function () { return C2; }, enumerable: true, configurable: true } });
  chai.assert.throws(() => {
    new DefinePropertiesGetterGlobalClass();
  }, /^Permission Denied:/);

  Object.defineProperties(window, { 'DefinePropertiesGetterVolatileGlobalClass': { get: function () { return class DefinePropertiesGetterVolatileGlobalClass { }; }, enumerable: true, configurable: true } });
  chai.assert.throws(() => {
    new DefinePropertiesGetterVolatileGlobalClass();
  }, /^Permission Denied:/);

  Reflect.set(window, 'ReflectSetGlobalClass', class ReflectSetGlobalClass {});
  chai.assert.throws(() => {
    new ReflectSetGlobalClass();
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Reflect.get(Object.setPrototypeOf({ constructor: null }, window), 'caches');
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    Reflect.get(Object.setPrototypeOf({ constructor: null }, window), 'caches', window);
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), window); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'caches');
  }, /^Permission Denied: Cannot access window/);
  
  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), window); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(Object.getPrototypeOf(fakeObject), 'caches');
  }, /^Permission Denied: Cannot access window/);
  
  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), window); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'caches', window);
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), window); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(Object.getPrototypeOf(fakeObject), 'caches', window);
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    Reflect.get(Object.setPrototypeOf({ constructor: null }, navigator), 'serviceWorker');
  }, /^Permission Denied: Cannot access clientInformation/); // clientInformation is an alias global object for navigator; acl.clientInformation is chained to acl.navigator

  chai.assert.throws(() => {
    Reflect.get(Object.setPrototypeOf({ constructor: null }, navigator), 'serviceWorker', navigator);
  }, /^Permission Denied: Cannot access clientInformation/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), navigator); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'serviceWorker');
  }, /^Permission Denied: Cannot access clientInformation/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), navigator); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'serviceWorker', navigator);
  }, /^Permission Denied: Cannot access clientInformation/);

  chai.assert.throws(() => {
    Object.create(BaseClass1).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Object.create(Object.create(BaseClass1)).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    SubClass5.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    new SubClass5().instanceMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    let { staticMethod } = SubClass5; // '*' for SubClass5
  }, /^Permission Denied:/);
  
  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    let { staticMethod } = Object.create(SubClass5);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    let { instanceMethod } = new SubClass5();
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    let { instanceMethod } = Object.create(new SubClass5());
  }, /^Permission Denied:/);
  
  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'staticMethod');
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(Object.getPrototypeOf(fakeObject), 'staticMethod');
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(fakeObject, 'staticMethod', BaseClass1);
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    Reflect.get(Object.getPrototypeOf(fakeObject), 'staticMethod', BaseClass1);
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    let { statidMethod } = fakeObject;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), BaseClass1); // still (fakeObject instanceof FakeClass) === true
    let { statidMethod } = Object.getPrototypeOf(fakeObject);
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), new BaseClass1()); // still (fakeObject instanceof FakeClass) === true
    let { instanceMethod } = fakeObject;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), new BaseClass1()); // still (fakeObject instanceof FakeClass) === true
    let { instanceMethod } = Object.getPrototypeOf(fakeObject);
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), new SubClass5()); // still (fakeObject instanceof FakeClass) === true
    let { instanceMethod } = fakeObject;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    class SubClass5 extends BaseClass1 { };
    class FakeClass { };
    let fakeObject = new FakeClass();
    Object.setPrototypeOf(Object.getPrototypeOf(fakeObject), new SubClass5()); // still (fakeObject instanceof FakeClass) === true
    let { instanceMethod } = Object.getPrototypeOf(fakeObject);
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Object.create(Object.getPrototypeOf(new BaseClass1())).instanceMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  let OrphanedGlobalObject = Object.assign(Object.create(null), {
    property: 1,
    method() { return this.property },
    get accessor() { return this.property },
    set accessor(value) { this.property = value; },
  });
  window.OrphanedGlobalObject = OrphanedGlobalObject;

  chai.assert.throws(() => {
    OrphanedGlobalObject.property;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    OrphanedGlobalObject.property = 2;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    OrphanedGlobalObject.method();
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    OrphanedGlobalObject.accessor;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    OrphanedGlobalObject.accessor = 3;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(OrphanedGlobalObject, 'property');
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    Object.defineProperty(OrphanedGlobalObject, 'property', { value: 2, configurable: true, enumerable: true, writable: true });
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    Object.create(OrphanedGlobalObject).property;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    Object.create(OrphanedGlobalObject).method();
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  chai.assert.throws(() => {
    Object.create(OrphanedGlobalObject).accessor;
  }, /^Permission Denied: Cannot access OrphanedGlobalObject/);

  Object.create(OrphanedGlobalObject).property = 2; // write this own property
  Object.defineProperty(Object.create(OrphanedGlobalObject), 'property', { value: 3 }); // define this own property
  Object.getOwnPropertyDescriptor(Object.create(OrphanedGlobalObject), 'property'); // get this own property descriptor
  Object.getOwnPropertyDescriptor(Object.create(OrphanedGlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
  }), 'property'); // get this own property descriptor
  Object.create(OrphanedGlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
  }).property; // get this own property
  Object.create(OrphanedGlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
  }).method(); // call this own method()
  Object.create(OrphanedGlobalObject).accessor = 4; // write super accessor
  Object.create(OrphanedGlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
    accessor: { get: function () { return this.property2; }, set: function (value) { this.property2 = value; }, configurable: true, enumerable: true },
  }).accessor; // read this own accessor
  Object.create(OrphanedGlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
    accessor: { get: function () { return this.property2; }, set: function (value) { this.property2 = value; }, configurable: true, enumerable: true },
  }).accessor = 2; // write this own accessor

  let GlobalObject = {
    property: 1,
    method() { return this.property },
    get accessor() { return this.property },
    set accessor(value) { this.property = value; },
  };
  window.GlobalObject = GlobalObject;

  chai.assert.throws(() => {
    GlobalObject.property;
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    GlobalObject.property = 2;
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    GlobalObject.method();
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    GlobalObject.accessor;
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    GlobalObject.accessor = 3;
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(GlobalObject, 'property');
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    Object.defineProperty(GlobalObject, 'property', { value: 2, configurable: true, enumerable: true, writable: true });
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    Object.create(GlobalObject).property;
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    Object.create(GlobalObject).method();
  }, /^Permission Denied: Cannot access GlobalObject/);

  chai.assert.throws(() => {
    Object.create(GlobalObject).accessor;
  }, /^Permission Denied: Cannot access GlobalObject/);

  Object.create(GlobalObject).property = 2; // write this own property
  Object.defineProperty(Object.create(GlobalObject), 'property', { value: 3 }); // define this own property
  Object.getOwnPropertyDescriptor(Object.create(GlobalObject), 'property'); // get this own property descriptor
  Object.getOwnPropertyDescriptor(Object.create(GlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
  }), 'property'); // get this own property descriptor
  Object.create(GlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
  }).property; // get this own property
  Object.create(GlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
  }).method(); // call this own method()
  Object.create(GlobalObject).accessor = 4; // write super accessor
  Object.create(GlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
    accessor: { get: function () { return this.property2; }, set: function (value) { this.property2 = value; }, configurable: true, enumerable: true },
  }).accessor; // read this own accessor
  Object.create(GlobalObject, {
    property: { value: 2, configurable: true, enumerable: true, writable: true },
    method: { value: function () { return this.property2; }, configurable: true, enumerable: true, writable: true },
    accessor: { get: function () { return this.property2; }, set: function (value) { this.property2 = value; }, configurable: true, enumerable: true },
  }).accessor = 2; // write this own accessor

  chai.assert.throws(() => {
    Object.assign({}, undefined, window);
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    let o = {};
    o.hasOwnProperty;
  }, /^Permission Denied: Cannot access Object/);

  chai.assert.throws(() => {
    let s = new String('a');
    s.hasOwnProperty;
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'.hasOwnProperty;
  }, /^Permission Denied: Cannot access String/);
  'a'.hasOwnProperty('0');

  chai.assert.throws(() => {
    'a'.small;
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'.small();
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'.__lookupGetter__;
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'.__lookupGetter__('length'); // Object.getOwnPropertyDescriptor('a', 'length') is prohibited. Note: length is not a getter
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor('a', 'length');
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'[Symbol.iterator];
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    'a'[Symbol.iterator]();
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    Object.setPrototypeOf(String, Number);
  }, /^Permission Denied: Cannot access String/);

  chai.assert.throws(() => {
    let n = new Number(1);
    n.hasOwnProperty;
  }, /^Permission Denied: Cannot access Number/);

  chai.assert.throws(() => {
    (1).hasOwnProperty;
  }, /^Permission Denied: Cannot access Number/);
  (1).hasOwnProperty('0');
  
  chai.assert.throws(() => {
    (1).toExponential;
  }, /^Permission Denied: Cannot access Number/);
  
  chai.assert.throws(() => {
    (1).toExponential();
  }, /^Permission Denied: Cannot access Number/);
  
  chai.assert.throws(() => {
    (1).__lookupGetter__;
  }, /^Permission Denied: Cannot access Number/);
  
  chai.assert.throws(() => {
    (1).__lookupGetter__('0'); // Note: A number has no property of its own
  }, /^Permission Denied: Cannot access Number/);
  
  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(1, '0');
  }, /^Permission Denied: Cannot access Number/);
  
  chai.assert.throws(() => {
    Object.setPrototypeOf(Number, String);
  }, /^Permission Denied: Cannot access Number/);

  chai.assert.throws(() => {
    let b = new Boolean(true);
    b.hasOwnProperty;
  }, /^Permission Denied: Cannot access Boolean/);

  chai.assert.throws(() => {
    (true).hasOwnProperty;
  }, /^Permission Denied: Cannot access Boolean/);
  (true).hasOwnProperty('0');
  
  chai.assert.throws(() => {
    (true).valueOf;
  }, /^Permission Denied: Cannot access Boolean/);
  
  chai.assert.throws(() => {
    (true).valueOf();
  }, /^Permission Denied: Cannot access Boolean/);
  
  chai.assert.throws(() => {
    (true).__lookupGetter__;
  }, /^Permission Denied: Cannot access Boolean/);
  
  chai.assert.throws(() => {
    (true).__lookupGetter__('valueOf');
  }, /^Permission Denied: Cannot access Boolean/);
  
  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(true, 'valueOf');
  }, /^Permission Denied: Cannot access Boolean/);
  
  chai.assert.throws(() => {
    Object.setPrototypeOf(Boolean, Number);
  }, /^Permission Denied: Cannot access Boolean/);

  chai.assert.throws(() => {
    let s = Symbol('s');
    s.hasOwnProperty;
  }, /^Permission Denied: Cannot access Symbol/);

  chai.assert.throws(() => {
    Symbol('s').hasOwnProperty;
  }, /^Permission Denied: Cannot access Symbol/);
  Symbol('s').hasOwnProperty('0');
  
  chai.assert.throws(() => {
    Symbol('s').description;
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Symbol('s')[Symbol.toPrimitive];
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Symbol('s')[Symbol.toPrimitive]();
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Symbol('s').__lookupGetter__;
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Symbol('s').__lookupGetter__('any');
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(Symbol('s'), 'any');
  }, /^Permission Denied: Cannot access Symbol/);
  
  chai.assert.throws(() => {
    Object.setPrototypeOf(Symbol, Number);
  }, /^Permission Denied: Cannot access Symbol/);

  chai.assert.throws(() => {
    let n = BigInt('1');
    n.hasOwnProperty;
  }, /^Permission Denied: Cannot access BigInt/);

  chai.assert.throws(() => {
    BigInt(1).valueOf;
  }, /^Permission Denied: Cannot access BigInt/);
  
  chai.assert.throws(() => {
    BigInt(1).valueOf();
  }, /^Permission Denied: Cannot access BigInt/);

  chai.assert.throws(() => {
    BigInt(1).__lookupGetter__;
  }, /^Permission Denied: Cannot access BigInt/);
  
  chai.assert.throws(() => {
    BigInt(1).__lookupGetter__('any'); // Note: A bigint has no property of its own
  }, /^Permission Denied: Cannot access BigInt/);
  
  chai.assert.throws(() => {
    Object.getOwnPropertyDescriptor(BigInt(1), 'any');
  }, /^Permission Denied: Cannot access BigInt/);
  
  chai.assert.throws(() => {
    Object.setPrototypeOf(BigInt, String);
  }, /^Permission Denied: Cannot access BigInt/);

  chai.assert.equal(String.raw`\abc${1}\def`, '\\abc1\\def', 'String.raw');

  chai.assert.equal(((strings, ...values) => strings.join(';') + ';' + values.join(';'))`a${1}b${2}c`, 'a;b;c;1;2', 'tag function');

  let localTagFunction;
  window.tagFunction = localTagFunction = function tagFunction(strings, ...values) { return strings.join(';') + ';' + values.join(';') };

  chai.assert.throws(() => {
    window.tagFunction;
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    tagFunction;
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    tagFunction();
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    new tagFunction();
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    tagFunction`access${'denied'}tagFunction`;
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    localTagFunction();
  }, /^Permission Denied: Cannot access tagFunction/);

  chai.assert.throws(() => {
    new localTagFunction();
  }, /^Permission Denied: Cannot access tagFunction/);

  chai.assert.throws(() => {
    localTagFunction`access${'denied'}tagFunction`;
  }, /^Permission Denied: Cannot access tagFunction/);

  with ({}) {
    chai.assert.equal(String.raw`\abc${1}\def`, '\\abc1\\def', 'String.raw');

    let tag = (strings, ...values) => strings.join(';') + ';' + values.join(';');
    chai.assert.equal(tag`a${1}b${2}c`, 'a;b;c;1;2', 'tag function in with clause');

    chai.assert.throws(() => {
      window.tagFunction;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction();
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      new tagFunction();
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      localTagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      new localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);
  }

  with ({ tagFunction: function tagFunction(strings, ...values) { let result = strings.join(';') + ';' + values.join(';'); if (new.target) { this.result = result; } else { return result; } } }) {
    chai.assert.equal(String.raw`\abc${1}\def`, '\\abc1\\def', 'String.raw');

    let tag = (strings, ...values) => strings.join(';') + ';' + values.join(';');
    chai.assert.equal(tag`a${1}b${2}c`, 'a;b;c;1;2', 'tag function in with clause');

    chai.assert.throws(() => {
      window.tagFunction;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.equal(typeof tagFunction, 'function', 'tag function in with clause'); // read

    chai.assert.equal(tagFunction`a${1}b${2}c`, 'a;b;c;1;2', 'tag function in with clause'); // execute

    chai.assert.equal(tagFunction`access${'allowed'}tagFunction`, 'access;tagFunction;allowed', 'with-scoped tag function');

    chai.assert.equal(tagFunction(['access', 'tagFunction'], 'allowed'), 'access;tagFunction;allowed', 'with-scoped tag function call');

    chai.assert.equal(new tagFunction(['access', 'tagFunction'], 'allowed').result, 'access;tagFunction;allowed', 'with-scoped constructor call');

    chai.assert.throws(() => {
      localTagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      new localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);
  }

  with ({ tagFunction: function tagFunction(strings, ...values) { let result = strings.join(';') + ';' + values.join(';'); if (new.target) { this.result = result; } else { return result; } } }) {
    let tagFunction = localTagFunction; // local variable; not with-scoped
    chai.assert.equal(String.raw`\abc${1}\def`, '\\abc1\\def', 'String.raw');

    let tag = (strings, ...values) => strings.join(';') + ';' + values.join(';');
    chai.assert.equal(tag`a${1}b${2}c`, 'a;b;c;1;2', 'tag function in with clause');

    chai.assert.throws(() => {
      window.tagFunction;
    }, /^Permission Denied: Cannot access window/);

    tagFunction; // local variable can be read

    chai.assert.throws(() => {
      tagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      tagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      new tagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      localTagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      new localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);
  }

  with ({}) {
    var tagFunction = localTagFunction; // global variable
    chai.assert.equal(String.raw`\abc${1}\def`, '\\abc1\\def', 'String.raw');

    let tag = (strings, ...values) => strings.join(';') + ';' + values.join(';');
    chai.assert.equal(tag`a${1}b${2}c`, 'a;b;c;1;2', 'tag function in with clause');

    chai.assert.throws(() => {
      window.tagFunction;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      tagFunction();
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      new tagFunction();
    }, /^Permission Denied: Cannot access window/);

    chai.assert.throws(() => {
      localTagFunction`access${'denied'}tagFunction`;
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);

    chai.assert.throws(() => {
      new localTagFunction();
    }, /^Permission Denied: Cannot access tagFunction/);
  }

  chai.assert.throws(() => {
    new Proxy(window, {})['__hook__'];
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    new Proxy(window, {})['caches'];
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    new Proxy(new BaseClass1(), {}).instanceMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    new Proxy(BaseClass1, {}).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct(Proxy, [BaseClass1, {}]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.apply(Reflect, [Proxy, [BaseClass1, {}]]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.call(Reflect, Proxy, [BaseClass1, {}]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.bind(Reflect, Proxy)([BaseClass1, {}]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.bind(Reflect, Proxy).apply(Reflect, [[BaseClass1, {}]]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.bind(Reflect, Proxy).call(Reflect, [BaseClass1, {}]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.construct.bind.call(Reflect.construct, Reflect, Proxy).call(Reflect, [BaseClass1, {}]).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Proxy.revocable(window, {}).proxy['__hook__'];
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    Proxy.revocable(window, {}).proxy['caches'];
  }, /^Permission Denied: Cannot access window/);

  chai.assert.throws(() => {
    Proxy.revocable(new BaseClass1(), {}).proxy.instanceMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Proxy.revocable(BaseClass1, {}).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Proxy.revocable.apply(Proxy, [BaseClass1, {}]).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Proxy.revocable.call(Proxy, BaseClass1, {}).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.apply(Proxy.revocable, Proxy, [BaseClass1, {}]).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.apply.bind(Reflect, Proxy.revocable, Proxy)([BaseClass1, {}]).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.apply.bind(Reflect, Proxy.revocable, Proxy).apply(Reflect, [[BaseClass1, {}]]).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    Reflect.apply.bind(Reflect, Proxy.revocable, Proxy).call(Reflect, [BaseClass1, {}]).proxy.staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    new Proxy(new Proxy(BaseClass1, {}), {}).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    new Proxy(BaseClass1, { get(target, prop, receiver) { return target[prop]; }}).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    let BC1;
    BC1 = BaseClass1;
    class SubClass6 extends BC1 {}
    new Proxy(SubClass6, {}).staticMethod;
  }, /^Permission Denied: Cannot access BaseClass1/);

  chai.assert.throws(() => {
    let DummyObject1Local = { property: 1 };
    let proxyObject;
    proxyObject = new Proxy(DummyObject1Local, {}); // DummyObject1Local is not a global object at this phase but proxyObject is set as an alias for DummyObject1Local
    proxyObject.property; // accessible
    window.DummyObject1 = DummyObject1Local; // DummyObject1Local is now tracked as the global object DummyObject1
    proxyObject.property; // forbidden
  }, /^Permission Denied: Cannot access DummyObject1/);

  chai.assert.throws(() => {
    let DummyObject1Local = { property: 1 };
    let proxyObject;
    proxyObject = new Proxy(DummyObject1Local, {}); // DummyObject1Local is not a global object at this phase but proxyObject is set as an alias for DummyObject1Local
    proxyObject = new Proxy(proxyObject, {}); // proxy of proxy object
    proxyObject.property; // accessible
    window.DummyObject1 = DummyObject1Local; // DummyObject1Local is now tracked as the global object DummyObject1
    proxyObject.property; // forbidden
  }, /^Permission Denied: Cannot access DummyObject1/);

  /*
  let NoAclGlobalObject = {
    property: 1,
    method() { return this.property },
    get accessor() { return this.property },
    set accessor(value) { this.property = value; },
  };
  Object.setPrototypeOf(NoAclGlobalObject, window);
  debugger;
  window.NoAclGlobalObject = NoAclGlobalObject;

  chai.assert.throws(() => {
    NoAclGlobalObject.caches;
  }, /^Permission Denied: Cannot access window/);
  */

  // multipath
  (function () {
    'use strict';
    window.DummyContainer = { navigator: navigator, '': 1 };
  })();

  DummyContainer[''];
  chai.assert.throws(() => {
    DummyContainer[''] = 2;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    DummyContainer.navigator.serviceWorker; // acl.navigator.serviceWorker is applied to DummyContainer.navigator
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    DummyContainer.navigator.language; // acl.DummyContainer.navigator.language is applied to DummyContainer.navigator
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    navigator.language; // acl.DummyContainer.navigator.language is applied to global navigator
  }, /^Permission Denied:/);

  // global objects
  chai.assert.throws(() => {
    _global = undefined;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    frames = undefined;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    top = undefined;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    self = undefined;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window = undefined;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    _global.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    frames.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    top.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    self.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    let cannotAccessNavigator = navigator;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign({}, window).caches;
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign({}, BaseClass1);
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign({}, new BaseClass1());
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    Object.assign({}, (new BaseClass1()).__proto__);
  }, /^Permission Denied:/);

  Object.assign({}, { p: 1 }); // acl.Object[S_PROTOTYPE][S_INSTANCE][S_DEFAULT]: 'rwx'; [S_ALL] not defined
  chai.assert.throws(() => {
    let p = Object.getPrototypeOf({});
    Object.assign({}, p); // acl.Object[S_PROTOTYPE][S_DEFAULT]: '---'; [S_ALL] not defined
  }, /^Permission Denied:/);

  chai.assert.throws(() => {
    window.DummyObject1 = Object.assign(Object.create(null), { p: 1 });
    Object.assign({}, DummyObject1); // acl.DummyObject1[S_ALL]: '---'
  }, /^Permission Denied:/);
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