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
const __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module.js,Test,constructor',
  '/components/thin-hook/demo/es6-module.js,Test,get a',
  '/components/thin-hook/demo/es6-module.js,func',
  '/components/thin-hook/demo/es6-module.js,mutateClass',
  '/components/thin-hook/demo/es6-module.js,setVariable2',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module.js,setVariable2'
]);
class Test {
  constructor(a) {
    return __hook__(a => {
      __hook__('#=', this, [
        '_a',
        a
      ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[0]);
    }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[0]);
  }
  get a() {
    return __hook__(() => {
      return __hook__('#.', this, ['_a'], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[1]);
    }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[1]);
  }
}
const constant = 1;
/* harmony export (immutable) */ __webpack_exports__["constant"] = constant;

function func() {
  return __hook__(() => {
    return 1;
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[2]);
}
let variable = 1;
let variable2 = 2;
let MutatableClass = Test;
function mutateClass(C) {
  return __hook__(C => {
    MutatableClass = C;
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[3]);
}
function setVariable2(v) {
  return __hook__(v => {
    __hook__('#()', $hook$.global(__hook__, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[4], 'console', '#get')[__ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[5]], [
      'log',
      [
        'setVariable2 this = ',
        this
      ]
    ], __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[4]);
    // NOTE: *this* is undefined in setv2() while *this* is the exported namespace object in module.setv2()
    variable2 = v;
  }, null, arguments, __ea3980fddc4d3e24f0c6370028c85cfad6262c0c066b9e107f2c3ed067aff477__[4]);
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
const __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module2.js',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js',
  'S_uNpREdiC4aB1e_Object;/components/thin-hook/demo/es6-module2.js',
  '/components/thin-hook/demo/es6-module2.js,f',
  '/components/thin-hook/demo/es6-module2.js,f,t',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js,f',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js,f',
  '/components/thin-hook/demo/es6-module2.js,f2',
  '/components/thin-hook/demo/es6-module2.js,f2,module',
  '/components/thin-hook/demo/es6-module2.js,f2,Test2',
  '/components/thin-hook/demo/es6-module2.js,f2,t',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module2.js,f2',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module2.js,f2',
  '/components/thin-hook/demo/es6-module2.js,Test3',
  '/components/thin-hook/demo/es6-module2.js,t'
]);




__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    1,
    'constant is 1'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    1,
    'variable is 1'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    2,
    'v2 is 2'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"], null, [], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 0),
    1,
    'func() returns 1'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['constant'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    'mod.constant === constant'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['variable'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    'mod.variable === variable'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    'mod.v2 === v2'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['func'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"],
    'mod.func === func'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['default'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.default === Test'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.MutatableClass === Test'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'mod === mod2'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);


class C2 extends __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"] {
}
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'mutateClass',
  [C2]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C3 extends C2 {
        };
      }, null, args, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0])),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["MutatableClass"],
    C2,
    'MutatableClass === C2'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    C2,
    'mod.MutatableClass === C2'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["setv2"], null, [3], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 0);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
          'v2',
          4
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
      }, null, args, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0])),
    /Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    3,
    'v2 is 3'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    3,
    'mod.v2 is 3'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'setv2',
  [5]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    5,
    'v2 is 5'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
    5,
    'mod.v2 is 5'
  ]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
__hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[2]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'Object', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[3]], [
      'getOwnPropertyDescriptors',
      [__WEBPACK_IMPORTED_MODULE_0__es6_module_js__]
    ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0])]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
function f(a) {
  return __hook__(a => {
    let t = __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"], null, [a], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[5], true);
    __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[6]], [
      'log',
      [
        'new Test(' + a + ').a = ',
        __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4])
      ]
    ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4]);
    __hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[7]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4]), [
      'equal',
      [
        __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4]),
        a,
        't.a is ' + a
      ]
    ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4]);
  }, null, arguments, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[4]);
}
__hook__(f, null, [2], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 0);
async function f2(a) {
  return __hook__(async a => {
    try {
      let module = await __hook__((Import, ImportSpecifier) => __webpack_require__(2)(ImportSpecifier), null, [
        'import()',
        './es6-module.js'
      ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[9], NaN);
      // Note: Spit out SyntaxError on browsers before Chrome 63, which supports Dynamic Imports
      let Test2 = __hook__('#.', module, ['default'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[10]);
      let t = __hook__(Test2, null, [a], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[11], true);
      __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[12]], [
        'log',
        [
          'new Test2(' + a + ').a = ',
          __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8])
        ]
      ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]);
      __hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[13]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]), [
        'equal',
        [
          __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]),
          a,
          't.a is ' + a
        ]
      ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]);
    } catch (e) {
      if (__hook__('#()', __hook__('#.', e, ['stack'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]), [
          'indexOf',
          ['webpack-']
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8])) {
        __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[12]], [
          'log',
          ['Dynamic import is not yet supported in webpack']
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]);
        __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[12]], [
          'log',
          [e]
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]);
      } else {
        throw e;
      }
    }
  }, null, arguments, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[8]);
}
__hook__('#()', __hook__(f2, null, [3], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 0), [
  'then',
  [(...args) =>
      (__hook__(() => {
        __hook__('#()', __hook__('#()', __hook__((Import, ImportSpecifier) => __webpack_require__(2)(ImportSpecifier), null, [
          'import()',
          './es6-module.js'
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], NaN), [
          'then',
          [(...args) =>
              (__hook__(module => {
                let Test3 = __hook__('#.', module, ['default'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[14]);
                let a = 4;
                let t = __hook__(Test3, null, [a], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[15], true);
                __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[2]], [
                  'log',
                  [
                    'new Test3(' + a + ').a = ',
                    __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0])
                  ]
                ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'chai', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[1]], ['assert'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
                  'equal',
                  [
                    __hook__('#.', t, ['a'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]),
                    a,
                    't.a is ' + a
                  ]
                ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
              }, null, args, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]))]
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
          'catch',
          [(...args) =>
              (__hook__(e => {
                if (__hook__('#()', __hook__('#.', e, ['stack'], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]), [
                    'indexOf',
                    ['webpack-']
                  ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0])) {
                  __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[2]], [
                    'log',
                    ['Dynamic import is not yet supported in webpack']
                  ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
                  __hook__('#()', $hook$.global(__hook__, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0], 'console', '#get')[__5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[2]], [
                    'log',
                    [e]
                  ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
                } else {
                  throw e;
                }
              }, null, args, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]))]
        ], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);
      }, null, args, __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]))]
], __5911f147ac0aefc449f07b5ec1475e1a82a9e9cf74387557f6eac061604abbf9__[0]);

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
const __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/es6-module3.js',
  'S_uNpREdiC4aB1e_chai;/components/thin-hook/demo/es6-module3.js',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/demo/es6-module3.js',
  'S_uNpREdiC4aB1e_Object;/components/thin-hook/demo/es6-module3.js'
]);







__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    1,
    'constant is 1'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    1,
    'variable is 1'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    5,
    'v2 is 5'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"], null, [], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 0),
    1,
    'func() returns 1'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['constant'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["constant"],
    'mod.constant === constant'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['variable'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["variable"],
    'mod.variable === variable'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    'mod.v2 === v2'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['func'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["func"],
    'mod.func === func'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['default'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'mod.default === Test'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), ['name'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    'C2',
    'mod.MutatableClass.name === "C2"'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'mod === mod2'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["c" /* es6Module */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__,
    'es6Module === mod'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["b" /* default */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'T2 === Test'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_1__es6_module2_js__["a" /* T3 */],
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"],
    'T3 === Test'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
class C4 extends __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["default"] {
}
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'mutateClass',
  [C4]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        MutatableClass = class C5 extends C4 {
        };
      }, null, args, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0])),
    /Assignment to constant variable|MutatableClass is not defined|assignment to undeclared variable MutatableClass|Can\'t find variable: MutatableClass/
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["MutatableClass"],
    C4,
    'MutatableClass === C4'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['MutatableClass'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    C4,
    'mod.MutatableClass === C4'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__(__WEBPACK_IMPORTED_MODULE_0__es6_module_js__["setv2"], null, [6], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 0);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('#=', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
          'v2',
          4
        ], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
      }, null, args, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0])),
    /Cannot assign to read only property|Cannot set property|setting getter-only property|Attempted to assign to readonly property/
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    6,
    'v2 is 6'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    6,
    'mod.v2 is 6'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, [
  'setv2',
  [7]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __WEBPACK_IMPORTED_MODULE_0__es6_module_js__["v2"],
    7,
    'v2 is 7'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', __hook__('#.', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'chai', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[1]], ['assert'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]), [
  'equal',
  [
    __hook__('#.', __WEBPACK_IMPORTED_MODULE_0__es6_module_js__, ['v2'], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]),
    7,
    'mod.v2 is 7'
  ]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);
__hook__('#()', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'console', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[2]], [
  'log',
  [__hook__('#()', $hook$.global(__hook__, __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0], 'Object', '#get')[__db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[3]], [
      'getOwnPropertyDescriptors',
      [__WEBPACK_IMPORTED_MODULE_0__es6_module_js__]
    ], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0])]
], __db7b082c0cba5896b6196e60e65a5755bb1665b8bec38e5504249a93ef7ec5d7__[0]);

/***/ })
/******/ ]);