/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["func"] = func;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variable", function() { return variable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v2", function() { return variable2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setv2", function() { return setVariable2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MutatableClass", function() { return MutatableClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateClass", function() { return mutateClass; });
class Test {
  constructor(a) {
    return __hook__(a => {
      __hook__('#=', this, [
        '_a',
        a
      ], '/components/thin-hook/demo/es6-module.js,Test,constructor');
    }, null, arguments, '/components/thin-hook/demo/es6-module.js,Test,constructor');
  }
  get a() {
    return __hook__(() => {
      return __hook__('#.', this, ['_a'], '/components/thin-hook/demo/es6-module.js,Test,get a');
    }, null, arguments, '/components/thin-hook/demo/es6-module.js,Test,get a');
  }
}
const constant = 1;
/* harmony export (immutable) */ __webpack_exports__["constant"] = constant;

function func() {
  return __hook__(() => {
    return 1;
  }, null, arguments, '/components/thin-hook/demo/es6-module.js,func');
}
let variable = 1;
let variable2 = 2;
let MutatableClass = Test;
function mutateClass(C) {
  return __hook__(C => {
    MutatableClass = C;
  }, null, arguments, '/components/thin-hook/demo/es6-module.js,mutateClass');
}
function setVariable2(v) {
  return __hook__(v => {
    __hook__('#()', console, [
      'log',
      [
        'setVariable2 this = ',
        this
      ]
    ], '/components/thin-hook/demo/es6-module.js,setVariable2');
    // NOTE: *this* is undefined in setv2() while *this* is the exported namespace object in module.setv2()
    variable2 = v;
  }, null, arguments, '/components/thin-hook/demo/es6-module.js,setVariable2');
}

/* harmony default export */ __webpack_exports__["default"] = (Test);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__es6_module_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__es6_module_js__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"]; });




__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    1,
    'constant is 1'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    1,
    'variable is 1'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    2,
    'v2 is 2'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"], null, [], '/components/thin-hook/demo/es6-module2.js', 0),
    1,
    'func() returns 1'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['constant'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    'mod.constant === constant'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['variable'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    'mod.variable === variable'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    'mod.v2 === v2'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['func'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"],
    'mod.func === func'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['default'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.default === Test'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], '/components/thin-hook/demo/es6-module2.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.MutatableClass === Test'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'mod === mod2'
  ]
], '/components/thin-hook/demo/es6-module2.js');


class C2 extends __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"] {
}
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'mutateClass',
  [C2]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C3 extends C2 {
        };
      }, null, args, '/components/thin-hook/demo/es6-module2.js')),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["MutatableClass"],
    C2,
    'MutatableClass === C2'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], '/components/thin-hook/demo/es6-module2.js'),
    C2,
    'mod.MutatableClass === C2'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["setv2"], null, [3], '/components/thin-hook/demo/es6-module2.js', 0);
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
          'v2',
          4
        ], '/components/thin-hook/demo/es6-module2.js');
      }, null, args, '/components/thin-hook/demo/es6-module2.js')),
    /Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    3,
    'v2 is 3'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module2.js'),
    3,
    'mod.v2 is 3'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'setv2',
  [5]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    5,
    'v2 is 5'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module2.js'),
    5,
    'mod.v2 is 5'
  ]
], '/components/thin-hook/demo/es6-module2.js');
__hook__('#()', console, [
  'log',
  [__hook__('#()', Object, [
      'getOwnPropertyDescriptors',
      [__WEBPACK_IMPORTED_MODULE_0__es6_module_js__]
    ], '/components/thin-hook/demo/es6-module2.js')]
], '/components/thin-hook/demo/es6-module2.js');
function f(a) {
  return __hook__(a => {
    let t = __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"], null, [a], '/components/thin-hook/demo/es6-module2.js,f,t', true);
    __hook__('#()', console, [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js,f')
      ]
    ], '/components/thin-hook/demo/es6-module2.js,f');
    __hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js,f'), [
      'equal',
      [
        __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js,f'),
        a,
        't.a is ' + a
      ]
    ], '/components/thin-hook/demo/es6-module2.js,f');
  }, null, arguments, '/components/thin-hook/demo/es6-module2.js,f');
}
__hook__(f, null, [2], '/components/thin-hook/demo/es6-module2.js', 0);
async function f2(a) {
  return __hook__(async a => {
    try {
      let module = await __hook__((Import, ImportSpecifier) => __webpack_require__(2)(ImportSpecifier), null, [
        'import()',
        './es6-module.js'
      ], '/components/thin-hook/demo/es6-module2.js,f2,module', NaN);
      // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
      let Test2 = __hook__('#.', module, ['default'], '/components/thin-hook/demo/es6-module2.js,f2,Test2');
      let t = __hook__(Test2, null, [a], '/components/thin-hook/demo/es6-module2.js,f2,t', true);
      __hook__('#()', console, [
        'log',
        [
          'new Test2(' + a + ').a = ',
          __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js,f2')
        ]
      ], '/components/thin-hook/demo/es6-module2.js,f2');
      __hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js,f2'), [
        'equal',
        [
          __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js,f2'),
          a,
          't.a is ' + a
        ]
      ], '/components/thin-hook/demo/es6-module2.js,f2');
    } catch (e) {
      if (__hook__('#()', __hook__('#.', e, ['stack'], '/components/thin-hook/demo/es6-module2.js,f2'), [
          'indexOf',
          ['webpack-']
        ], '/components/thin-hook/demo/es6-module2.js,f2')) {
        __hook__('#()', console, [
          'log',
          ['Dynamic import is not yet supported in webpack']
        ], '/components/thin-hook/demo/es6-module2.js,f2');
        __hook__('#()', console, [
          'log',
          [e]
        ], '/components/thin-hook/demo/es6-module2.js,f2');
      } else {
        throw e;
      }
    }
  }, null, arguments, '/components/thin-hook/demo/es6-module2.js,f2');
}
__hook__('#()', __hook__(f2, null, [3], '/components/thin-hook/demo/es6-module2.js', 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__('#()', __hook__((Import, ImportSpecifier) => __webpack_require__(2)(ImportSpecifier), null, [
          'import()',
          './es6-module.js'
        ], '/components/thin-hook/demo/es6-module2.js', NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], '/components/thin-hook/demo/es6-module2.js,Test3');
                let a = 4;
                let t = __hook__(Test3, null, [a], '/components/thin-hook/demo/es6-module2.js,t', true);
                __hook__('#()', console, [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js')
                  ]
                ], '/components/thin-hook/demo/es6-module2.js');
                __hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module2.js'), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], '/components/thin-hook/demo/es6-module2.js'),
                    a,
                    't.a is ' + a
                  ]
                ], '/components/thin-hook/demo/es6-module2.js');
              }, null, args, '/components/thin-hook/demo/es6-module2.js'))]
        ], '/components/thin-hook/demo/es6-module2.js'), [
          'catch',
          [(...args) =>
              (__hook__(e => {
                if (__hook__('#()', __hook__('#.', e, ['stack'], '/components/thin-hook/demo/es6-module2.js'), [
                    'indexOf',
                    ['webpack-']
                  ], '/components/thin-hook/demo/es6-module2.js')) {
                  __hook__('#()', console, [
                    'log',
                    ['Dynamic import is not yet supported in webpack']
                  ], '/components/thin-hook/demo/es6-module2.js');
                  __hook__('#()', console, [
                    'log',
                    [e]
                  ], '/components/thin-hook/demo/es6-module2.js');
                } else {
                  throw e;
                }
              }, null, args, '/components/thin-hook/demo/es6-module2.js'))]
        ], '/components/thin-hook/demo/es6-module2.js');
      }, null, args, '/components/thin-hook/demo/es6-module2.js'))]
], '/components/thin-hook/demo/es6-module2.js');

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 2;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__es6_module_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__ = __webpack_require__(1);







__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    1,
    'constant is 1'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    1,
    'variable is 1'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    5,
    'v2 is 5'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"], null, [], '/components/thin-hook/demo/es6-module3.js', 0),
    1,
    'func() returns 1'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['constant'], '/components/thin-hook/demo/es6-module3.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    'mod.constant === constant'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['variable'], '/components/thin-hook/demo/es6-module3.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    'mod.variable === variable'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module3.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    'mod.v2 === v2'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['func'], '/components/thin-hook/demo/es6-module3.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"],
    'mod.func === func'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['default'], '/components/thin-hook/demo/es6-module3.js'),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.default === Test'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], '/components/thin-hook/demo/es6-module3.js'), ['name'], '/components/thin-hook/demo/es6-module3.js'),
    'C2',
    'mod.MutatableClass.name === "C2"'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'mod === mod2'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["c" /* es6Module */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'es6Module === mod'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["b" /* default */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'T2 === Test'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["a" /* T3 */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'T3 === Test'
  ]
], '/components/thin-hook/demo/es6-module3.js');
class C4 extends __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"] {
}
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'mutateClass',
  [C4]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C5 extends C4 {
        };
      }, null, args, '/components/thin-hook/demo/es6-module3.js')),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["MutatableClass"],
    C4,
    'MutatableClass === C4'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], '/components/thin-hook/demo/es6-module3.js'),
    C4,
    'mod.MutatableClass === C4'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["setv2"], null, [6], '/components/thin-hook/demo/es6-module3.js', 0);
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
          'v2',
          4
        ], '/components/thin-hook/demo/es6-module3.js');
      }, null, args, '/components/thin-hook/demo/es6-module3.js')),
    /Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    6,
    'v2 is 6'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module3.js'),
    6,
    'mod.v2 is 6'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'setv2',
  [7]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    7,
    'v2 is 7'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', __hook__('#.', chai, ['assert'], '/components/thin-hook/demo/es6-module3.js'), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], '/components/thin-hook/demo/es6-module3.js'),
    7,
    'mod.v2 is 7'
  ]
], '/components/thin-hook/demo/es6-module3.js');
__hook__('#()', console, [
  'log',
  [__hook__('#()', Object, [
      'getOwnPropertyDescriptors',
      [__WEBPACK_IMPORTED_MODULE_0__es6_module_js__]
    ], '/components/thin-hook/demo/es6-module3.js')]
], '/components/thin-hook/demo/es6-module3.js');

/***/ })
/******/ ]);