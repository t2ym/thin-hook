(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonjs_module = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/commonjs.js,add',
  '/components/thin-hook/demo/commonjs.js,XliffConv',
  '/components/thin-hook/demo/commonjs.js',
  '_uNpREdiC4aB1e_chai;/components/thin-hook/demo/commonjs.js'
]);
const add = __hook__(() => require('./commonjs2'), null, [
  'require',
  './commonjs2',
  '/components/thin-hook/demo/commonjs2.js'
], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[0], NaN);
const XliffConv = __hook__(() => require('xliff-conv'), null, [
  'require',
  'xliff-conv',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'
], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[1], NaN);
__hook__('()', __hook__('.', $hook$.global(__hook__, __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2], 'chai', 'get')[__cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[3]], ['assert'], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__(add, null, [
          1,
          2
        ], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2], 0);
      }, null, args, __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2])),
    /^Permission Denied:/
  ]
], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2]);
__hook__('()', __hook__('.', $hook$.global(__hook__, __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2], 'chai', 'get')[__cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[3]], ['assert'], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('.', XliffConv, ['xliffStates'], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2]);
      }, null, args, __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2])),
    /^Permission Denied:/
  ]
], __cc74399e1c1d2140899d39152418f1528f38b74c64259bca5272f0825272cb83__[2]);
},{"./commonjs2":2,"xliff-conv":5}],2:[function(require,module,exports){
const __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__ = $hook$.$(__hook__, [
  '/components/thin-hook/demo/commonjs2.js,path',
  '/components/thin-hook/demo/commonjs2.js',
  '_uNpREdiC4aB1e_chai;/components/thin-hook/demo/commonjs2.js',
  '/components/thin-hook/demo/commonjs2.js,tty',
  '/components/thin-hook/demo/commonjs2.js,add'
]);
const path = __hook__(() => require('path'), null, [
  'require',
  'path',
  '/components/thin-hook/node_modules/path-browserify/index.js'
], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[0], NaN);
__hook__('()', __hook__('.', $hook$.global(__hook__, __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1], 'chai', 'get')[__65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[2]], ['assert'], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('()', path, [
          'join',
          [
            'a',
            'b'
          ]
        ], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]);
      }, null, args, __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1])),
    /^Permission Denied:/
  ]
], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]);
__hook__('()', __hook__('.', $hook$.global(__hook__, __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1], 'chai', 'get')[__65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[2]], ['assert'], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        const tty = __hook__(() => require('tty'), null, [
          'require',
          'tty',
          '/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js'
        ], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[3], NaN);
      }, null, args, __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1])),
    /^Permission Denied:/
  ]
], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]);
__hook__('=', module, [
  'exports',
  function add(a, b) {
    return __hook__((a, b) => {
      return a + b;
    }, null, arguments, __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[4]);
  }
], __65c113ba194d10494e2bba7f5066029de3ada0d924cf072d5420ceca39aaa28b__[1]);
},{"path":4,"tty":3}],3:[function(require,module,exports){
const __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js',
  '/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js,ReadStream',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js,ReadStream',
  '/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js,WriteStream',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/browserify/node_modules/tty-browserify/index.js,WriteStream'
]);
__hook__('=', exports, [
  'isatty',
  function () {
    return __hook__(() => {
      return false;
    }, null, arguments, __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[0]);
  }
], __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[0]);
function ReadStream() {
  return __hook__(() => {
    throw __hook__($hook$.global(__hook__, __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[1], 'Error', 'get')[__013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[2]], null, ['tty.ReadStream is not implemented'], __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[1], true);
  }, null, arguments, __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[1]);
}
__hook__('=', exports, [
  'ReadStream',
  ReadStream
], __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[0]);
function WriteStream() {
  return __hook__(() => {
    throw __hook__($hook$.global(__hook__, __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[3], 'Error', 'get')[__013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[4]], null, ['tty.WriteStream is not implemented'], __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[3], true);
  }, null, arguments, __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[3]);
}
__hook__('=', exports, [
  'WriteStream',
  WriteStream
], __013ed0e3489b106c6939f198c41e913854df46705057c4ac04ab47559d3bc585__[0]);
},{}],4:[function(require,module,exports){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
const __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray',
  '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray,i',
  '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray,last',
  '/components/thin-hook/node_modules/path-browserify/index.js',
  '/components/thin-hook/node_modules/path-browserify/index.js,i',
  '/components/thin-hook/node_modules/path-browserify/index.js,path',
  '_uNpREdiC4aB1e_process;/components/thin-hook/node_modules/path-browserify/index.js,path',
  '_uNpREdiC4aB1e_TypeError;/components/thin-hook/node_modules/path-browserify/index.js',
  '/components/thin-hook/node_modules/path-browserify/index.js,isAbsolute',
  '/components/thin-hook/node_modules/path-browserify/index.js,trailingSlash',
  '/components/thin-hook/node_modules/path-browserify/index.js,paths',
  '_uNpREdiC4aB1e_Array;/components/thin-hook/node_modules/path-browserify/index.js,paths',
  '/components/thin-hook/node_modules/path-browserify/index.js,trim',
  '/components/thin-hook/node_modules/path-browserify/index.js,trim,end',
  '/components/thin-hook/node_modules/path-browserify/index.js,fromParts',
  '/components/thin-hook/node_modules/path-browserify/index.js,toParts',
  '/components/thin-hook/node_modules/path-browserify/index.js,length',
  '_uNpREdiC4aB1e_Math;/components/thin-hook/node_modules/path-browserify/index.js,length',
  '/components/thin-hook/node_modules/path-browserify/index.js,code',
  '/components/thin-hook/node_modules/path-browserify/index.js,basename',
  '/components/thin-hook/node_modules/path-browserify/index.js,f',
  '/components/thin-hook/node_modules/path-browserify/index.js,filter',
  '/components/thin-hook/node_modules/path-browserify/index.js,substr'
]);
function normalizeArray(parts, allowAboveRoot) {
  return __hook__((parts, allowAboveRoot) => {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = __hook__('.', parts, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[1]) - 1; i >= 0; i--) {
      var last = __hook__('.', parts, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[2]);
      if (last === '.') {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[0]);
      } else if (last === '..') {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[0]);
        up++;
      } else if (up) {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[0]);
        up--;
      }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        __hook__('()', parts, [
          'unshift',
          ['..']
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[0]);
      }
    }
    return parts;
  }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[0]);
}
// path.resolve([from ...], to)
// posix version
__hook__('=', exports, [
  'resolve',
  function () {
    return __hook__(() => {
      var resolvedPath = '', resolvedAbsolute = false;
      for (var i = __hook__('.', arguments, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[4]) - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? __hook__('.', arguments, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[5]) : __hook__('()', $hook$.global(__hook__, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[5], 'process', 'get')[__868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[6]], [
          'cwd',
          []
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[5]);
        // Skip empty and invalid entries
        if (typeof path !== 'string') {
          throw __hook__($hook$.global(__hook__, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 'TypeError', 'get')[__868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[7]], null, ['Arguments to path.resolve must be strings'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], true);
        } else if (!path) {
          continue;
        }
        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = __hook__('()', path, [
          'charAt',
          [0]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) === '/';
      }
      // At this point the path should be resolved to a full absolute path, but
      // handle relative paths to be safe (might happen when process.cwd() fails)
      // Normalize the path
      resolvedPath = __hook__('()', __hook__(normalizeArray, null, [
        __hook__(filter, null, [
          __hook__('()', resolvedPath, [
            'split',
            ['/']
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]),
          function (p) {
            return __hook__(p => {
              return !!p;
            }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
          }
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 0),
        !resolvedAbsolute
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 0), [
        'join',
        ['/']
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
// path.normalize(path)
// posix version
__hook__('=', exports, [
  'normalize',
  function (path) {
    return __hook__(path => {
      var isAbsolute = __hook__('()', exports, [
          'isAbsolute',
          [path]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[8]), trailingSlash = __hook__(substr, null, [
          path,
          -1
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[9], 0) === '/';
      // Normalize the path
      path = __hook__('()', __hook__(normalizeArray, null, [
        __hook__(filter, null, [
          __hook__('()', path, [
            'split',
            ['/']
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]),
          function (p) {
            return __hook__(p => {
              return !!p;
            }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
          }
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 0),
        !isAbsolute
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 0), [
        'join',
        ['/']
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      if (!path && !isAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }
      return (isAbsolute ? '/' : '') + path;
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
// posix version
__hook__('=', exports, [
  'isAbsolute',
  function (path) {
    return __hook__(path => {
      return __hook__('()', path, [
        'charAt',
        [0]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) === '/';
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
// posix version
__hook__('=', exports, [
  'join',
  function () {
    return __hook__(() => {
      var paths = __hook__('()', __hook__('.', __hook__('.', $hook$.global(__hook__, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[10], 'Array', 'get')[__868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[11]], ['prototype'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[10]), ['slice'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[10]), [
        'call',
        [
          arguments,
          0
        ]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[10]);
      return __hook__('()', exports, [
        'normalize',
        [__hook__('()', __hook__(filter, null, [
            paths,
            function (p, index) {
              return __hook__((p, index) => {
                if (typeof p !== 'string') {
                  throw __hook__($hook$.global(__hook__, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 'TypeError', 'get')[__868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[7]], null, ['Arguments to path.join must be strings'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], true);
                }
                return p;
              }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
            }
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3], 0), [
            'join',
            ['/']
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3])]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
// path.relative(from, to)
// posix version
__hook__('=', exports, [
  'relative',
  function (from, to) {
    return __hook__((from, to) => {
      from = __hook__('()', __hook__('()', exports, [
        'resolve',
        [from]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]), [
        'substr',
        [1]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      to = __hook__('()', __hook__('()', exports, [
        'resolve',
        [to]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]), [
        'substr',
        [1]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      function trim(arr) {
        return __hook__(arr => {
          var start = 0;
          for (; start < __hook__('.', arr, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[12]); start++) {
            if (__hook__('.', arr, [start], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[12]) !== '')
              break;
          }
          var end = __hook__('.', arr, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[13]) - 1;
          for (; end >= 0; end--) {
            if (__hook__('.', arr, [end], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[12]) !== '')
              break;
          }
          if (start > end)
            return [];
          return __hook__('()', arr, [
            'slice',
            [
              start,
              end - start + 1
            ]
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[12]);
        }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[12]);
      }
      var fromParts = __hook__(trim, null, [__hook__('()', from, [
          'split',
          ['/']
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[14])], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[14], 0);
      var toParts = __hook__(trim, null, [__hook__('()', to, [
          'split',
          ['/']
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[15])], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[15], 0);
      var length = __hook__('()', $hook$.global(__hook__, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[16], 'Math', 'get')[__868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[17]], [
        'min',
        [
          __hook__('.', fromParts, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[16]),
          __hook__('.', toParts, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[16])
        ]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[16]);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (__hook__('.', fromParts, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) !== __hook__('.', toParts, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3])) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < __hook__('.', fromParts, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]); i++) {
        __hook__('()', outputParts, [
          'push',
          ['..']
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      }
      outputParts = __hook__('()', outputParts, [
        'concat',
        [__hook__('()', toParts, [
            'slice',
            [samePartsLength]
          ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3])]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      return __hook__('()', outputParts, [
        'join',
        ['/']
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
__hook__('=', exports, [
  'sep',
  '/'
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
__hook__('=', exports, [
  'delimiter',
  ':'
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
__hook__('=', exports, [
  'dirname',
  function (path) {
    return __hook__(path => {
      if (typeof path !== 'string')
        path = path + '';
      if (__hook__('.', path, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) === 0)
        return '.';
      var code = __hook__('()', path, [
        'charCodeAt',
        [0]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[18]);
      var hasRoot = code === 47  /*/*/;
      var end = -1;
      var matchedSlash = true;
      for (var i = __hook__('.', path, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[4]) - 1; i >= 1; --i) {
        code = __hook__('()', path, [
          'charCodeAt',
          [i]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
        if (code === 47  /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          // We saw the first non-path separator
          matchedSlash = false;
        }
      }
      if (end === -1)
        return hasRoot ? '/' : '.';
      if (hasRoot && end === 1) {
        // return '//';
        // Backwards-compat fix:
        return '/';
      }
      return __hook__('()', path, [
        'slice',
        [
          0,
          end
        ]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
function basename(path) {
  return __hook__(path => {
    if (typeof path !== 'string')
      path = path + '';
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    for (i = __hook__('.', path, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[19]) - 1; i >= 0; --i) {
      if (__hook__('()', path, [
          'charCodeAt',
          [i]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[19]) === 47  /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // path component
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return '';
    return __hook__('()', path, [
      'slice',
      [
        start,
        end
      ]
    ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[19]);
  }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[19]);
}
// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
__hook__('=', exports, [
  'basename',
  function (path, ext) {
    return __hook__((path, ext) => {
      var f = __hook__(basename, null, [path], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[20], 0);
      if (ext && __hook__('()', f, [
          'substr',
          [-1 * __hook__('.', ext, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3])]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) === ext) {
        f = __hook__('()', f, [
          'substr',
          [
            0,
            __hook__('.', f, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]) - __hook__('.', ext, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3])
          ]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
      }
      return f;
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
__hook__('=', exports, [
  'extname',
  function (path) {
    return __hook__(path => {
      if (typeof path !== 'string')
        path = path + '';
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find
      var preDotState = 0;
      for (var i = __hook__('.', path, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[4]) - 1; i >= 0; --i) {
        var code = __hook__('()', path, [
          'charCodeAt',
          [i]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[18]);
        if (code === 47  /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // extension
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46  /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return '';
      }
      return __hook__('()', path, [
        'slice',
        [
          startDot,
          end
        ]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
    }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
  }
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[3]);
function filter(xs, f) {
  return __hook__((xs, f) => {
    if (__hook__('.', xs, ['filter'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]))
      return __hook__('()', xs, [
        'filter',
        [f]
      ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]);
    var res = [];
    for (var i = 0; i < __hook__('.', xs, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]); i++) {
      if (__hook__(f, null, [
          __hook__('.', xs, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]),
          i,
          xs
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21], 0))
        __hook__('()', res, [
          'push',
          [__hook__('.', xs, [i], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21])]
        ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]);
    }
    return res;
  }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[21]);
}
// String.prototype.substr - negative index don't work in IE8
var substr = __hook__('()', 'ab', [
  'substr',
  [-1]
], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]) === 'b' ? function (str, start, len) {
  return __hook__((str, start, len) => {
    return __hook__('()', str, [
      'substr',
      [
        start,
        len
      ]
    ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]);
  }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]);
} : function (str, start, len) {
  return __hook__((str, start, len) => {
    if (start < 0)
      start = __hook__('.', str, ['length'], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]) + start;
    return __hook__('()', str, [
      'substr',
      [
        start,
        len
      ]
    ], __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]);
  }, null, arguments, __868f5c6500226b94a0a18b9c519f95bf6e61036425cec5caa42d5b0b961c800a__[22]);
};
},{}],5:[function(require,module,exports){
/*
@license https://github.com/t2ym/xliff-conv/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  'S_uNpREdiC4aB1e_define;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv',
  'S_uNpREdiC4aB1e_Date;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv',
  'S_uNpREdiC4aB1e_window;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv',
  'S_uNpREdiC4aB1e_console;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv',
  'S_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,parser',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,dom',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,fileTag',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnits',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,output',
  'S_uNpREdiC4aB1e_Array;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceTag',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetTag',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,id',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,restype',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,source',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,target',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,approved',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,paths',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,component',
  'S_uNpREdiC4aB1e_Number;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  'S_uNpREdiC4aB1e_Boolean;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  'S_uNpREdiC4aB1e_JSON;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  'S_uNpREdiC4aB1e_undefined;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,patterns',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,path',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,serializer',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xmlHeader',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnitTemplate',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliff',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,bodyTag',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceBundle',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetBundle',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnitWrapper',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnit',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,todo',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,newAttrName',
  'S_uNpREdiC4aB1e_Object;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,newAttrName',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes',
  'S_uNpREdiC4aB1e_Array;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'
]);
__hook__(function (root, factory) {
  'use strict';
  return __hook__((root, factory) => {
    /* istanbul ignore if: AMD is not tested */
    if (typeof $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'define', '#typeof')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[1]] === 'function' && __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'define', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[1]], ['amd'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
      // AMD. Register as an anonymous module.
      __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'define', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[1]], null, [
        [],
        function () {
          return __hook__(() => {
            return __hook__('#=', root, [
              'XliffConv',
              __hook__(factory, null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0)
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
    } else if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like enviroments that support module.exports,
      // like Node.
      __hook__('#=', module, [
        'exports',
        __hook__(factory, null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0)
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
    } else {
      // Browser globals
      __hook__('#=', root, [
        'XliffConv',
        __hook__(factory, null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0)
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
    }
  }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
}, null, [
  this,
  function () {
    // UMD Definition above, do not remove this line
    'use strict';
    return __hook__(() => {
      var XliffConv = function XliffConv(options) {
        return __hook__(options => {
          options = options || {};
          __hook__('#=', this, [
            'useSources',
            __hook__('#.', options, ['useSources'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || false
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'date',
            __hook__('#.', options, ['date'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'Date', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[3]], null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], true)
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'xmldom',
            typeof $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'window', '#typeof')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[4]] === 'object' ? $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'window', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[4]] : __hook__(() => require('xmldom'), null, [
              'require',
              'xmldom',
              '/components/thin-hook/node_modules/xmldom/dom-parser.js'
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], NaN)
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'DOMParser',
            __hook__('#.', __hook__('#.', this, ['xmldom'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), ['DOMParser'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'XMLSerializer',
            __hook__('#.', __hook__('#.', this, ['xmldom'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), ['XMLSerializer'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'xliffStates',
            __hook__('#.', options, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || __hook__('#.', __hook__('#.', XliffConv, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), ['default'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'patterns',
            __hook__('#.', options, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || __hook__('#.', XliffConv, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'todoOps',
            __hook__('#()', this, [
              '_todoOps',
              [__hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2])
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'logger',
            __hook__('#.', options, ['logger'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]], ['log'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), [
                  'apply',
                  [
                    $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]],
                    arguments
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
              }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
            }
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'warnLogger',
            __hook__('#.', options, ['warnLogger'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]], ['warn'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), [
                  'apply',
                  [
                    $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]],
                    arguments
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
              }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
            }
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'errorLogger',
            __hook__('#.', options, ['errorLogger'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]) || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]], ['error'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]), [
                  'apply',
                  [
                    $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2], 'console', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[5]],
                    arguments
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
              }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
            }
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
          __hook__('#=', this, [
            'toolVersion',
            '1.0.12'
          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
        }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[2]);
      };
      __hook__('#=', XliffConv, [
        'xliffStates',
        {
          // All state-less unapproved strings are regarded as needs-translation
          'default': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[approved]'
            ]
          },
          // Aannotations {{name}} and tags <tag-name> are regarded as translated
          'annotationsAsTranslated': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[approved]',
              '[source~=annotationsAndTags]'
            ]
          },
          // Newly added annotations {{name}} and tags <tag-name> are regarded as translated
          'newAnnotationsAsTranslated': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[approved]',
              '[state==new&&source~=annotationsAndTags]'
            ]
          },
          // Newly added annotations {{name}} and tags <tag-name> are regarded as translated only at export
          'newAnnotationsAsTranslatedAtExport': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[approved]',
              '[export&&state==new&&source~=annotationsAndTags]'
            ]
          },
          // Annotations {{name}} and tags <tag-name> are skipped in translation by translate=no
          'annotationsAsNoTranslate': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[source~=annotationsAndTags&&translate:=no&&state:=final]',
              '[approved]'
            ]
          },
          /* === State Mapping Tables for migration from xliff2bundlejson === */
          // All state-less strings are regarded as approved=yes
          'approveAll': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n'
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              ''
            ]
          },
          // State-less translated strings need review
          'reviewTranslated': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              '[!state&&!approved&&source==target]',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n',
              '[!state&&!approved&&source!=target]'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[approved]'
            ]
          },
          // State-less translated strings are regarded as approved=yes
          'approveTranslated': {
            'add': ['new'],
            'replace': [
              'needs-translation',
              'needs-adaptation',
              'needs-l10n',
              '[!state&&!approved&&source==target]',
              ''
            ],
            'review': [
              'needs-review-translation',
              'needs-review-adaptation',
              'needs-review-l10n'
            ],
            'default': [
              'translated',
              'signed-off',
              'final',
              '[!state&&!approved&&source!=target]',
              '[approved]'
            ]
          }  /*
      Expression format:
        [condition1&&condition2&&...&&effect1&&effect2&&...]
          - expression is true when all the conditions are true
          - optional effects are processed if the expression is true

      Operators for conditions:
        parameter
          - true if parameter is non-null
        !parameter
          - true if parameter is undefined, null, or ''
        parameter1==parameter2
          - true if parameter1 is equal to parameter2
        parameter1!=parameter2
          - true if parameter1 is not equal to parameter2
        parameter~=pattern
          - true if parameter matches the regular expression options.patterns.pattern
          - if options.patterns.pattern is undefined, pattern is treated as the matching string
        tag.attribute~=pattern
          - true if attribute value of tag matched the regular expression options.patterns.pattern
          - if options.patterns.pattern is undefined, pattern is treated as the matching string

      Operators for effects:
        tag.attribute:=value
          - assign attribute of tag with the string value
        attribute:=value
          - assign predefined alias attribute with the string value
        tag:=value
          - assign textContent of tag with the string value

      Predefined parameters: Undefined parameters are treated as strings for matching
        state
          - state attribute of target
        id
          - id attribute of trans-unit
        component
          - component name in id
        restype
          - restype attribute of trans-unit. 'x-json-string' for strings
        source
          - text content of source tag
        target
          - text content of target tag
        approved
          - true if approved attribute of trans-unit is 'yes'
        import
          - true on XLIFF import (parseXliff); false on XLIFF export (parseJSON)
        export
          - true on XLIFF export (parseJSON); false on XLIFF import (parseXliff)

      Predefined tags:
        file
          - file tag
        trans-unit
          - trans-unit tag
        source
          - source tag
        target
          - target tag

      Predefined alias attributes:
        translate
          - alias for trans-unit.translate
        approved
          - alias for trans-unit.approved
        state
          - alias for target.state
     */
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', XliffConv, [
        'patterns',
        {
          'annotationsAndTags': /^({{[^{} ]*}}|\[\[[^\[\] ]*\]\]|<[-a-zA-Z]{1,}>)$/,
          'annotations': /^({{[^{} ]*}}|\[\[[^\[\] ]*\]\])$/,
          'numbers': /^[0-9.]{1,}$/,
          'tags': /^<[-a-zA-Z]{1,}>$/
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        '_todoOps',
        function (xliffStates) {
          return __hook__(xliffStates => {
            var output = { expressions: {} };
            var match;
            for (var op in __hook__('#*', xliffStates, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
              for (var i = 0; i < __hook__('#.', __hook__('#.', xliffStates, [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]); i++) {
                match = __hook__('#()', __hook__('#.', __hook__('#.', xliffStates, [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'match',
                  [/^\[(.*)\]$/]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                if (match) {
                  __hook__('#=', __hook__('#.', output, ['expressions'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                    __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#.', __hook__('#.', output, ['expressions'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || []
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                  __hook__('#()', __hook__('#.', __hook__('#.', output, ['expressions'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                    'push',
                    [op]
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                } else {
                  __hook__('#=', output, [
                    __hook__('#.', __hook__('#.', xliffStates, [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#.', output, [__hook__('#.', __hook__('#.', xliffStates, [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || []
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                  __hook__('#()', __hook__('#.', output, [__hook__('#.', __hook__('#.', xliffStates, [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                    'push',
                    [op]
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }
              }
            }
            return output;
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        '_resolveTodoOps',
        function (parameters) {
          return __hook__(parameters => {
            var result;
            var match;
            var effects;
            var effect;
            for (var prop in __hook__('#*', __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['expressions'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
              effects = [];
              if (__hook__('#()', __hook__('#()', __hook__('#()', prop, [
                  'split',
                  [/&&/]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'map',
                  [
                    function (expression) {
                      return __hook__(expression => {
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // non-null
                          return !!__hook__('#.', parameters, [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^!([\-\w]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // negation
                          return !__hook__('#.', parameters, [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)==([\-\w]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // equality
                          return (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', parameters, [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) === (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', parameters, [__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]));
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)!=([\-\w]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // unequality
                          return (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', parameters, [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) !== (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', parameters, [__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]));
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)([.][\-\w]*)?~=([\-\w]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // pattern matching
                          if (!__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                            return !!__hook__('#()', __hook__('#()', parameters, [
                              'hasOwnProperty',
                              [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', parameters, [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'match',
                              [__hook__('#()', __hook__('#.', parameters, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'hasOwnProperty',
                                  [__hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', __hook__('#.', parameters, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          } else {
                            return !!__hook__('#()', typeof __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'object' ? __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'getAttribute',
                              [__hook__('#()', __hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'substr',
                                  [1]
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'match',
                              [__hook__('#()', __hook__('#.', parameters, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'hasOwnProperty',
                                  [__hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', __hook__('#.', parameters, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : __hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          }
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)([.][\-\w]*)?:=([^&]*)$/]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (match) {
                          // assignment effect
                          if (!__hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                            if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'string') {
                              // alias
                              effect = __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                'split',
                                [/[.]/]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#()', effect, [
                                'push',
                                [__hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#()', effects, [
                                'push',
                                [effect]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            } else if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'object') {
                              // tag
                              __hook__('#()', effects, [
                                'push',
                                [[
                                    __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                                    'textContent',
                                    __hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                                  ]]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            } else {
                              __hook__('#()', this, [
                                'warnLogger',
                                ['XliffConv: id = ' + __hook__('#.', parameters, ['id'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) + ' effect ' + expression + ' is ignored due to inexistent tag ' + __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            }
                          } else {
                            if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'object') {
                              // attribute
                              __hook__('#()', effects, [
                                'push',
                                [[
                                    __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                                    __hook__('#()', __hook__('#.', match, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                      'substr',
                                      [1]
                                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                                    __hook__('#.', match, [3], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                                  ]]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            } else {
                              __hook__('#()', this, [
                                'warnLogger',
                                ['XliffConv: id = ' + __hook__('#.', parameters, ['id'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) + ' effect ' + expression + ' is ignored due to inexistent tag ' + __hook__('#.', match, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            }
                          }
                          return true;
                        }
                        return false;
                      }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    },
                    this
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'reduce',
                  [
                    function (previous, current) {
                      return __hook__((previous, current) => {
                        return previous && current;
                      }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    },
                    true
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                // Expression matched
                result = __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['expressions'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [prop], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                __hook__('#()', effects, [
                  'forEach',
                  [function (effect) {
                      return __hook__(effect => {
                        if (__hook__('#.', effect, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'textContent') {
                          __hook__('#=', __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', effect, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'textContent',
                            __hook__('#.', effect, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        } else {
                          if (__hook__('#.', effect, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && __hook__('#.', effect, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== '""') {
                            __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', effect, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'setAttribute',
                              [
                                __hook__('#.', effect, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                                __hook__('#.', effect, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                              ]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          } else {
                            __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', effect, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'removeAttribute',
                              [__hook__('#.', effect, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          }
                        }
                      }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    }]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                break;
              }
            }
            if (!result) {
              if (__hook__('#.', parameters, ['state'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', parameters, ['state'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', parameters, ['state'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                result = __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', parameters, ['state'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
              } else {
                result = __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [''], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
              }
            }
            return result;
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        'parseXliff',
        function (xliff, options, callback) {
          return __hook__((xliff, options, callback) => {
            var args = arguments;
            __hook__('#()', [
              'string',
              'object',
              'function'
            ], [
              'forEach',
              [function (type, index) {
                  return __hook__((type, index) => {
                    if (!__hook__('#.', args, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || typeof __hook__('#.', args, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== type) {
                      throw __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Error', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[6]], null, ['invalid argument'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], true);
                    }
                  }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            if (typeof __hook__('#.', options, ['bundle'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== 'object') {
              throw __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Error', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[6]], null, ['invalid options.bundle'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], true);
            }
            var parser = __hook__(__hook__('#.', this, ['DOMParser'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[7]), null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[7], true);
            var dom = __hook__('#()', parser, [
              'parseFromString',
              [
                xliff,
                'application/xml'
              ]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[8]);
            var fileTag = __hook__('#.', __hook__('#()', dom, [
              'getElementsByTagName',
              ['file']
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[9]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[9]);
            var transUnits = __hook__('#()', dom, [
              'getElementsByTagName',
              ['trans-unit']
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[10]);
            var output = __hook__('#.', options, ['bundle'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[11]);
            var stats = {
              xliff: {},
              json: {}
            };
            var todoMap = {};
            var component;
            var i;
            for (component in __hook__('#*', output, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
              if (__hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                for (i in __hook__('#*', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                  __hook__('#=', todoMap, [
                    component + __hook__('#()', __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['path'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'replace',
                      [
                        /[.]/g,
                        '_$DOT$_'
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'replace',
                      [
                        /\//g,
                        '.'
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }
              }
            }
            //console.log('todoMap = ', todoMap);
            __hook__('#=', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
              'total',
              __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            __hook__('#=', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
              'total',
              __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            __hook__('#=', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
              'file',
              {}
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            __hook__('#()', __hook__('#.', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Array', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[12]], ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['forEach'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
              'call',
              [
                __hook__('#.', fileTag, ['attributes'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                function (attribute) {
                  return __hook__(attribute => {
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['file'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      __hook__('#.', attribute, ['name'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                      __hook__('#.', attribute, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                  }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }
              ]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            __hook__('#()', __hook__('#.', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Array', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[12]], ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['forEach'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
              'call',
              [
                transUnits,
                __hook__('#()', function (transUnit) {
                  return __hook__(transUnit => {
                    var sourceTag = __hook__('#.', __hook__('#()', transUnit, [
                      'getElementsByTagName',
                      ['source']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[13]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[13]);
                    var targetTag = __hook__('#.', __hook__('#()', transUnit, [
                      'getElementsByTagName',
                      ['target']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[14]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[14]);
                    var id = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['id']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[15]);
                    var restype = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['restype']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[16]) || 'x-json-string';
                    var source = __hook__('#.', sourceTag, ['textContent'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[17]);
                    var target = __hook__('#.', targetTag, ['textContent'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[18]);
                    var approved = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['approved']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[19]) === 'yes';
                    var state = __hook__('#()', targetTag, [
                      'getAttribute',
                      ['state']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]);
                    var cursor = output;
                    var paths = __hook__('#()', __hook__('#()', id, [
                      'split',
                      ['.']
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[21]), [
                      'map',
                      [function (p) {
                          return __hook__(p => {
                            return __hook__('#()', p, [
                              'replace',
                              [
                                /_\$DOT\$_/g,
                                '.'
                              ]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[21]);
                          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[21]);
                        }]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[21]);
                    var component = __hook__('#.', paths, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[22]);
                    var parsed;
                    var value;
                    var sourceValue;
                    var todo;
                    var op;
                    //console.log({ id: id, restype: restype, source: source, target: target, state: state, approved: approved });
                    parsed = __hook__('#()', source, [
                      'match',
                      [/^_\$([a-zA-Z]*)\$_(.*)$/]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    if (parsed) {
                      // process _$type$_value format for compatibility with xliff2bundlejson
                      source = __hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    }
                    // update stats
                    __hook__('#=', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'units',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'states',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      state,
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [state], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [state], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'approved',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['approved'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'approved',
                      approved ? 1 : 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'units',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'states',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      state,
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [state], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [state], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'approved',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['approved'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'approved',
                      approved ? 1 : 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    while (__hook__('#.', paths, ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) > 0) {
                      if (__hook__('#.', paths, ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 1) {
                        if (__hook__('#()', cursor, [
                            'hasOwnProperty',
                            [__hook__('#.', paths, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                          parsed = __hook__('#()', target, [
                            'match',
                            [/^_\$([a-zA-Z]*)\$_(.*)$/]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          if (parsed) {
                            // process _$type$_value format for compatibility with xliff2bundlejson 
                            target = __hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            switch (__hook__('#.', parsed, [1], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                            case 'number':
                              sourceValue = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Number', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[23]], null, [source], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              value = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Number', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[23]], null, [__hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              break;
                            case 'boolean':
                              sourceValue = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Boolean', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[24]], null, [source === 'true'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              value = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Boolean', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[24]], null, [__hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'true'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              break;
                            case 'object':
                              sourceValue = __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'JSON', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[25]], [
                                'parse',
                                [source]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              value = __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'JSON', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[25]], [
                                'parse',
                                [__hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              break;
                            case 'undefined':
                              sourceValue = $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'undefined', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[26]];
                              value = $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'undefined', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[26]];
                              break;
                            case 'string':
                            default:
                              sourceValue = source;
                              value = __hook__('#.', parsed, [2], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              break;
                            }
                          } else {
                            // process <trans-unit restype="x-json-*">
                            switch (restype) {
                            case 'x-json-number':
                              sourceValue = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Number', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[23]], null, [source], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              value = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Number', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[23]], null, [target], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              break;
                            case 'x-json-boolean':
                              sourceValue = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Boolean', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[24]], null, [source === 'true'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              value = __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Boolean', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[24]], null, [target === 'true'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
                              break;
                            case 'x-json-object':
                              sourceValue = __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'JSON', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[25]], [
                                'parse',
                                [source]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              value = __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'JSON', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[25]], [
                                'parse',
                                [target]
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              break;
                            case 'x-json-undefined':
                              sourceValue = $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'undefined', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[26]];
                              value = $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'undefined', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[26]];
                              break;
                            case 'x-json-string':
                            default:
                              sourceValue = source;
                              value = target;
                              break;
                            }
                          }
                          todo = __hook__('#.', todoMap, [id], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          if (!todo || typeof __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'string' && __hook__('#()', __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'replace',
                              [
                                /\s\s*/g,
                                ' '
                              ]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === __hook__('#()', source, [
                              'replace',
                              [
                                /\s\s*/g,
                                ' '
                              ]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || typeof __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'number' && __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === sourceValue || typeof __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'boolean' && __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === sourceValue) {
                            // no todo or source is matching with todo.value
                            // update value
                            if (__hook__('#.', cursor, [__hook__('#.', paths, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== value) {
                              __hook__('#=', cursor, [
                                __hook__('#.', paths, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                                value
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                'valueUpdated',
                                __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['valueUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['valueUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                'valueUpdated',
                                __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['valueUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['valueUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            }
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'updated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['updated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['updated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'updated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['updated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['updated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            // map to todo.op
                            op = __hook__('#()', this, [
                              '_resolveTodoOps',
                              [{
                                  'state': state,
                                  'id': id,
                                  'component': component,
                                  'restype': restype,
                                  'source': source,
                                  'target': target,
                                  'approved': approved,
                                  // Boolean
                                  'patterns': __hook__('#.', this, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[27]),
                                  'tags': {
                                    'file': fileTag,
                                    'trans-unit': transUnit,
                                    'source': sourceTag,
                                    'target': targetTag,
                                    'state': 'target.state',
                                    'translate': 'trans-unit.translate',
                                    'approved': 'trans-unit.approved'
                                  },
                                  'import': true,
                                  'export': false
                                }]
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'todoUpdated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'todoUpdated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            if (op === 'default') {
                              // no todo for approved item
                              if (todo) {
                                // mark the todo for removal
                                __hook__('#=', todo, [
                                  'op',
                                  'noop'
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              }
                            } else {
                              if (todo) {
                                if (__hook__('#.', todo, ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== op) {
                                  __hook__('#=', todo, [
                                    'op',
                                    op
                                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                  __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                  __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                }
                              } else {
                                // Fix #1. Populate missing todo item.
                                todo = {
                                  'op': op,
                                  'path': '/' + __hook__('#()', __hook__('#()', __hook__('#()', __hook__('#()', id, [
                                    'split',
                                    ['.']
                                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[28]), [
                                    'splice',
                                    [1]
                                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[28]), [
                                    'join',
                                    ['/']
                                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[28]), [
                                    'replace',
                                    [
                                      /_\$DOT\$_/g,
                                      '.'
                                    ]
                                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[28]),
                                  'value': sourceValue
                                };
                                __hook__('#=', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'meta',
                                  __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#=', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'todo',
                                  __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || []
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                                  'push',
                                  [todo]
                                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todoUpdated'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                              }
                            }
                          } else {
                            // discard value
                            __hook__('#()', this, [
                              'warnLogger',
                              ['XliffConv: id = ' + id + ' discarding value "' + value + '"' + ' as source "' + sourceValue + '" does not match with todo.value "' + __hook__('#.', todo, ['value'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) + '"']
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'discarded',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'source_mismatching',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['source_mismatching'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['source_mismatching'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'discarded',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                              'source_mismatching',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['source_mismatching'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['source_mismatching'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          }
                          __hook__('#()', paths, [
                            'shift',
                            []
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        } else {
                          // missing resource
                          __hook__('#()', this, [
                            'warnLogger',
                            ['XliffConv: id = ' + id + ' is missing']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        break;
                      } else {
                        if (!__hook__('#.', cursor, [__hook__('#.', paths, [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                          // missing resource
                          __hook__('#()', this, [
                            'warnLogger',
                            ['XliffConv: id = ' + id + ' is missing']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['discarded'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['id_missing'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          break;
                        }
                        cursor = __hook__('#.', cursor, [__hook__('#()', paths, [
                            'shift',
                            []
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                      }
                    }
                  }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }, [
                  'bind',
                  [this]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
              ]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            for (component in __hook__('#*', output, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
              if (__hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                for (i = __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) - 1; i >= 0; i--) {
                  if (__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'noop') {
                    // remove the noop todo item
                    __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'splice',
                      [
                        i,
                        1
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                  } else {
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'todo',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'todo',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [i], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                  }
                }
              }
            }
            __hook__(callback, null, [
              output,
              stats
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        'parseJSON',
        function (bundles, options, callback) {
          return __hook__((bundles, options, callback) => {
            var args = arguments;
            __hook__('#()', [
              'object',
              'object',
              'function'
            ], [
              'forEach',
              [function (type, index) {
                  return __hook__((type, index) => {
                    if (!__hook__('#.', args, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || typeof __hook__('#.', args, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) !== type) {
                      throw __hook__($hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'Error', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[6]], null, ['invalid argument'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], true);
                    }
                  }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            var parser = __hook__(__hook__('#.', this, ['DOMParser'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[7]), null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[7], true);
            var serializer = __hook__(__hook__('#.', this, ['XMLSerializer'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[29]), null, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[29], true);
            var xmlHeader = __hook__('#.', options, ['xmlHeader'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[30]) || '<?xml version="1.0" encoding="UTF-8"?>\n' + '<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\n';
            var xliffTemplate = __hook__('#.', options, ['xliffTemplate'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || '<xliff version="1.0">\n' + '  <file xml:space="' + (__hook__('#.', options, ['xmlSpace'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'default') + '" ' + 'source-language="' + (__hook__('#.', options, ['srcLanguage'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'en') + '" ' + 'target-language="' + (__hook__('#.', options, ['destLanguage'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'fr') + '" ' + 'datatype="' + (__hook__('#.', options, ['dataType'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'plaintext') + '" ' + 'original="' + (__hook__('#.', options, ['original'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'messages') + '" ' + 'date="' + __hook__('#()', __hook__('#()', __hook__('#.', this, ['date'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]), [
              'toISOString',
              []
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]), [
              'replace',
              [
                /[.][0-9]*Z$/,
                'Z'
              ]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) + '" ' + 'product-name="' + (__hook__('#.', options, ['productName'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) || 'messages') + '">\n' + '    <header>\n' + '      <tool tool-id="xliff-conv" tool-name="xliff-conv" tool-version="' + __hook__('#.', this, ['toolVersion'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[31]) + '"/>\n' + '    </header>\n' + '    <body>\n' + '</body>\n' + '  </file>\n' + '</xliff>';
            var transUnitTemplate = '<wrapper>' + (__hook__('#.', options, ['transUnitTemplate'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[32]) || '      <trans-unit>\n' + '        <source></source>\n' + '        <target></target>\n' + '      </trans-unit>') + '\n</wrapper>';
            var spacer = '<wrapper>    </wrapper>';
            var xliff = __hook__('#()', parser, [
              'parseFromString',
              [
                xliffTemplate,
                'application/xml'
              ]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[33]);
            var fileTag = __hook__('#.', __hook__('#()', xliff, [
              'getElementsByTagName',
              ['file']
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[9]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[9]);
            var bodyTag = __hook__('#.', __hook__('#()', xliff, [
              'getElementsByTagName',
              ['body']
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[34]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[34]);
            var sourceBundle = __hook__('#.', bundles, [''], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[35]);
            var targetBundle = __hook__('#.', bundles, [__hook__('#.', options, ['destLanguage'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[36])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[36]);
            var component;
            var todos;
            var todoMap;
            var index;
            var stats = {
              xliff: {},
              json: {}
            };
            for (component in __hook__('#*', targetBundle, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
              if (component !== 'bundle') {
                __hook__('#=', __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'meta',
                  __hook__('#.', __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                __hook__('#=', __hook__('#.', __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'todo',
                  __hook__('#.', __hook__('#.', __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || []
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                todos = __hook__('#.', __hook__('#.', __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['meta'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['todo'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                todoMap = {};
                for (index = 0; index < __hook__('#.', todos, ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]); index++) {
                  __hook__('#=', todoMap, [
                    __hook__('#()', __hook__('#()', __hook__('#()', __hook__('#.', __hook__('#.', todos, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['path'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'replace',
                      [
                        /[.]/g,
                        '_$DOT$_'
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'replace',
                      [
                        /\//g,
                        '.'
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                      'substring',
                      [1]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#.', todos, [index], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                  ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                }
                __hook__('#()', this, [
                  '_traverseBundle',
                  [
                    '',
                    __hook__('#.', sourceBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#.', targetBundle, [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    __hook__('#()', function (id, source, target) {
                      return __hook__((id, source, target) => {
                        //console.log('_traverseBundle callback id = ' + component + '.' + id + ' source = ' + source + ' target = ' + target);
                        var transUnitWrapper = __hook__('#()', parser, [
                          'parseFromString',
                          [
                            transUnitTemplate,
                            'application/xml'
                          ]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[37]);
                        var transUnit = __hook__('#.', __hook__('#()', transUnitWrapper, [
                          'getElementsByTagName',
                          ['trans-unit']
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[38]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[38]);
                        var sourceTag = __hook__('#.', __hook__('#()', transUnit, [
                          'getElementsByTagName',
                          ['source']
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[13]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[13]);
                        var targetTag = __hook__('#.', __hook__('#()', transUnit, [
                          'getElementsByTagName',
                          ['target']
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[14]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[14]);
                        var todo = __hook__('#.', todoMap, [id], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[39]);
                        var op;
                        var state = todo && __hook__('#.', __hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]), [__hook__('#.', todo, ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]) ? __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]), [__hook__('#.', todo, ['op'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]) : __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]), ['default'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[20]);
                        var restype = 'x-json-' + typeof source;
                        __hook__('#()', transUnit, [
                          'setAttribute',
                          [
                            'id',
                            component + '.' + id
                          ]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (restype !== 'x-json-string') {
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              'restype',
                              restype
                            ]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        __hook__('#=', sourceTag, [
                          'textContent',
                          __hook__('#()', this, [
                            '_stringify',
                            [source]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', targetTag, [
                          'textContent',
                          __hook__('#()', this, [
                            '_stringify',
                            [target]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        // apply expressions
                        op = __hook__('#()', this, [
                          '_resolveTodoOps',
                          [{
                              'state': state,
                              'id': component + '.' + id,
                              'component': component,
                              'restype': restype,
                              'source': __hook__('#.', sourceTag, ['textContent'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[17]),
                              'target': __hook__('#.', targetTag, ['textContent'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[18]),
                              'approved': state === __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[19]), ['default'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[19]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[19]),
                              // Boolean
                              'patterns': __hook__('#.', this, ['patterns'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[27]),
                              'tags': {
                                'file': fileTag,
                                'trans-unit': transUnit,
                                'source': sourceTag,
                                'target': targetTag,
                                'state': 'target.state',
                                'translate': 'trans-unit.translate',
                                'approved': 'trans-unit.approved'
                              },
                              'import': false,
                              'export': true
                            }]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        // update state
                        // --Customise id and add new attribute --
                        if (__hook__('#.', options, ['addNewAttr'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                          var newAttrName = __hook__('#.', __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[40], 'Object', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[41]], [
                            'getOwnPropertyNames',
                            [__hook__('#.', options, ['addNewAttr'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[40])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[40]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[40]);
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              'id',
                              __hook__('#.', __hook__('#.', __hook__('#.', options, ['addNewAttr'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [newAttrName], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [id], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                            ]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              newAttrName,
                              id
                            ]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        // ---End---
                        state = __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [op], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        if (op === 'default' && !__hook__('#()', transUnit, [
                            'hasAttribute',
                            ['approved']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              'approved',
                              'yes'
                            ]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        // Fix #24: don't force the 'state' attribute if no state
                        if (!__hook__('#()', targetTag, [
                            'hasAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) && state && state !== '""') {
                          __hook__('#()', targetTag, [
                            'setAttribute',
                            [
                              'state',
                              state
                            ]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        // Fix #28: "" to remove the state attribute
                        if (!state || state === '""') {
                          __hook__('#()', targetTag, [
                            'removeAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                        // update stats
                        __hook__('#=', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'total',
                          __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'units',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'states',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          __hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                          __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#()', targetTag, [
                              'getAttribute',
                              ['state']
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'approved',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['approved'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['total'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'approved',
                          __hook__('#()', transUnit, [
                            'getAttribute',
                            ['approved']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'yes' ? 1 : 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          component,
                          __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'units',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['units'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'states',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || {}
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          __hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                          __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#()', targetTag, [
                              'getAttribute',
                              ['state']
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['states'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [__hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'approved',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['approved'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) || 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [component], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                          'approved',
                          __hook__('#()', transUnit, [
                            'getAttribute',
                            ['approved']
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) === 'yes' ? 1 : 0
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        var nodes = __hook__('#()', __hook__('#.', __hook__('#.', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42], 'Array', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[43]], ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]), ['map'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]), [
                          'call',
                          [
                            __hook__('#.', __hook__('#.', __hook__('#()', transUnitWrapper, [
                              'getElementsByTagName',
                              ['wrapper']
                            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]), ['childNodes'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]),
                            function (node) {
                              return __hook__(node => {
                                return node;
                              }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]);
                            }
                          ]
                        ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[42]);
                        while (__hook__('#.', nodes, ['length'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) > 0) {
                          __hook__('#()', bodyTag, [
                            'appendChild',
                            [__hook__('#()', nodes, [
                                'shift',
                                []
                              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
                          ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                        }
                      }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
                    }, [
                      'bind',
                      [this]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
              }
            }
            __hook__('#()', bodyTag, [
              'appendChild',
              [__hook__('#.', __hook__('#.', __hook__('#()', __hook__('#()', parser, [
                  'parseFromString',
                  [
                    spacer,
                    'application/xml'
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
                  'getElementsByTagName',
                  ['wrapper']
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [0], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), ['firstChild'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])]
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            __hook__(callback, null, [
              xmlHeader + __hook__('#()', serializer, [
                'serializeToString',
                [xliff]
              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
              stats
            ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        '_stringify',
        function (value) {
          return __hook__(value => {
            switch (typeof value) {
            case 'string':
              return value;
            case 'boolean':
              return value ? 'true' : 'false';
            case 'number':
              return '' + value;
            case 'object':
              return __hook__('#()', $hook$.global(__hook__, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 'JSON', '#get')[__a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[25]], [
                'stringify',
                [value]
              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
            case 'undefined':
            default:
              return '';
            }
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]), [
        '_traverseBundle',
        function (id, source, target, callback) {
          return __hook__((id, source, target, callback) => {
            if (typeof target === 'object') {
              for (var prop in __hook__('#*', target, [], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0])) {
                if (id === '' && prop === 'meta') {
                  continue;
                }
                __hook__('#()', this, [
                  '_traverseBundle',
                  [
                    id + (id ? '.' : '') + __hook__('#()', prop, [
                      'replace',
                      [
                        /[.]/g,
                        '_$DOT$_'
                      ]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    source && __hook__('#()', source, [
                      'hasOwnProperty',
                      [prop]
                    ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', source, [prop], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : typeof source === 'object' && __hook__('#.', source, ['other'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) ? __hook__('#.', source, ['other'], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]) : '',
                    __hook__('#.', target, [prop], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]),
                    callback
                  ]
                ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
              }
            } else {
              __hook__(callback, null, [
                id,
                source,
                target
              ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
            }
          }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
        }
      ], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
      return XliffConv;
    }, null, arguments, __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0]);
  }
], __a1ccc944f205c2d9b08bc74905b9f1c1769dd249ede53311aef457893d91e758__[0], 0);
},{"xmldom":6}],6:[function(require,module,exports){
const __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMParser',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,options',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,sax',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,domBuilder',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,errorHandler',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,locator',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,defaultNSMap',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,isCallback',
  '_uNpREdiC4aB1e_Function;/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,isCallback',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build,fn',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMHandler',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,position',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,doc',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,el',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,len',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,namespaceURI',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,value',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,qName',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,attr',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement,current',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement,tagName',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startPrefixMapping',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endPrefixMapping',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction,ins',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,ignorableWhitespace',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters,charNode',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,skippedEntity',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endDocument',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,setDocumentLocator',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment,comm',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startCDATA',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,endCDATA',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD,impl',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD,dt',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,warning',
  '_uNpREdiC4aB1e_console;/components/thin-hook/node_modules/xmldom/dom-parser.js,warning',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,error',
  '_uNpREdiC4aB1e_console;/components/thin-hook/node_modules/xmldom/dom-parser.js,error',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError',
  '_uNpREdiC4aB1e_console;/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,_locator',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString',
  '_uNpREdiC4aB1e_java;/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,XMLReader',
  '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMImplementation'
]);
function DOMParser(options) {
  return __hook__(options => {
    __hook__('=', this, [
      'options',
      options || { locator: {} }
    ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[0]);
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[0]);
}
__hook__('=', __hook__('.', DOMParser, ['prototype'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]), [
  'parseFromString',
  function (source, mimeType) {
    return __hook__((source, mimeType) => {
      var options = __hook__('.', this, ['options'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[2]);
      var sax = __hook__(XMLReader, null, [], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[3], true);
      var domBuilder = __hook__('.', options, ['domBuilder'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[4]) || __hook__(DOMHandler, null, [], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[4], true);
      //contentHandler and LexicalHandler
      var errorHandler = __hook__('.', options, ['errorHandler'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[5]);
      var locator = __hook__('.', options, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[6]);
      var defaultNSMap = __hook__('.', options, ['xmlns'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[7]) || {};
      var entityMap = {
        'lt': '<',
        'gt': '>',
        'amp': '&',
        'quot': '"',
        'apos': '\''
      };
      if (locator) {
        __hook__('()', domBuilder, [
          'setDocumentLocator',
          [locator]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      }
      __hook__('=', sax, [
        'errorHandler',
        __hook__(buildErrorHandler, null, [
          errorHandler,
          domBuilder,
          locator
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1], 0)
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      __hook__('=', sax, [
        'domBuilder',
        __hook__('.', options, ['domBuilder'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]) || domBuilder
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      if (__hook__('()', /\/x?html?$/, [
          'test',
          [mimeType]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1])) {
        __hook__('=', entityMap, [
          'nbsp',
          '\xA0'
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
        __hook__('=', entityMap, [
          'copy',
          '\xA9'
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
        __hook__('=', defaultNSMap, [
          '',
          'http://www.w3.org/1999/xhtml'
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      }
      __hook__('=', defaultNSMap, [
        'xml',
        __hook__('.', defaultNSMap, ['xml'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]) || 'http://www.w3.org/XML/1998/namespace'
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      if (source) {
        __hook__('()', sax, [
          'parse',
          [
            source,
            defaultNSMap,
            entityMap
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      } else {
        __hook__('()', __hook__('.', sax, ['errorHandler'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]), [
          'error',
          ['invalid doc source']
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      }
      return __hook__('.', domBuilder, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
    }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
  }
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
function buildErrorHandler(errorImpl, domBuilder, locator) {
  return __hook__((errorImpl, domBuilder, locator) => {
    if (!errorImpl) {
      if (domBuilder instanceof DOMHandler) {
        return domBuilder;
      }
      errorImpl = domBuilder;
    }
    var errorHandler = {};
    var isCallback = errorImpl instanceof $hook$.global(__hook__, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[9], 'Function', 'get')[__f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[10]];
    locator = locator || {};
    function build(key) {
      return __hook__(key => {
        var fn = __hook__('.', errorImpl, [key], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[12]);
        if (!fn && isCallback) {
          fn = __hook__('.', errorImpl, ['length'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]) == 2 ? function (msg) {
            return __hook__(msg => {
              __hook__(errorImpl, null, [
                key,
                msg
              ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11], 0);
            }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]);
          } : errorImpl;
        }
        __hook__('=', errorHandler, [
          key,
          fn && function (msg) {
            return __hook__(msg => {
              __hook__(fn, null, ['[xmldom ' + key + ']\t' + msg + __hook__(_locator, null, [locator], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11], 0)], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11], 0);
            }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]);
          } || function () {
            return __hook__(() => {
            }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]);
          }
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[11]);
    }
    __hook__(build, null, ['warning'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[8], 0);
    __hook__(build, null, ['error'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[8], 0);
    __hook__(build, null, ['fatalError'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[8], 0);
    return errorHandler;
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[8]);
}
//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  return __hook__(() => {
    __hook__('=', this, [
      'cdata',
      false
    ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[13]);
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[13]);
}
function position(locator, node) {
  return __hook__((locator, node) => {
    __hook__('=', node, [
      'lineNumber',
      __hook__('.', locator, ['lineNumber'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[14])
    ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[14]);
    __hook__('=', node, [
      'columnNumber',
      __hook__('.', locator, ['columnNumber'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[14])
    ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[14]);
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[14]);
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
__hook__('=', DOMHandler, [
  'prototype',
  {
    startDocument: function () {
      return __hook__(() => {
        __hook__('=', this, [
          'doc',
          __hook__('()', __hook__(DOMImplementation, null, [], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15], true), [
            'createDocument',
            [
              null,
              null,
              null
            ]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15])
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15]);
        if (__hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15])) {
          __hook__('=', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15]), [
            'documentURI',
            __hook__('.', __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15]), ['systemId'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15])
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15]);
        }
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[15]);
    },
    startElement: function (namespaceURI, localName, qName, attrs) {
      return __hook__((namespaceURI, localName, qName, attrs) => {
        var doc = __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[17]);
        var el = __hook__('()', doc, [
          'createElementNS',
          [
            namespaceURI,
            qName || localName
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[18]);
        var len = __hook__('.', attrs, ['length'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[19]);
        __hook__(appendElement, null, [
          this,
          el
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16], 0);
        __hook__('=', this, [
          'currentElement',
          el
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]);
        __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]) && __hook__(position, null, [
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]),
          el
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16], 0);
        for (var i = 0; i < len; i++) {
          var namespaceURI = __hook__('()', attrs, [
            'getURI',
            [i]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[20]);
          var value = __hook__('()', attrs, [
            'getValue',
            [i]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[21]);
          var qName = __hook__('()', attrs, [
            'getQName',
            [i]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[22]);
          var attr = __hook__('()', doc, [
            'createAttributeNS',
            [
              namespaceURI,
              qName
            ]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[23]);
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]) && __hook__(position, null, [
            __hook__('()', attrs, [
              'getLocator',
              [i]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]),
            attr
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16], 0);
          __hook__('=', attr, [
            'value',
            __hook__('=', attr, [
              'nodeValue',
              value
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16])
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]);
          __hook__('()', el, [
            'setAttributeNode',
            [attr]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]);
        }
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[16]);
    },
    endElement: function (namespaceURI, localName, qName) {
      return __hook__((namespaceURI, localName, qName) => {
        var current = __hook__('.', this, ['currentElement'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[25]);
        var tagName = __hook__('.', current, ['tagName'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[26]);
        __hook__('=', this, [
          'currentElement',
          __hook__('.', current, ['parentNode'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[24])
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[24]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[24]);
    },
    startPrefixMapping: function (prefix, uri) {
      return __hook__((prefix, uri) => {
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[27]);
    },
    endPrefixMapping: function (prefix) {
      return __hook__(prefix => {
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[28]);
    },
    processingInstruction: function (target, data) {
      return __hook__((target, data) => {
        var ins = __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[30]), [
          'createProcessingInstruction',
          [
            target,
            data
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[30]);
        __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[29]) && __hook__(position, null, [
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[29]),
          ins
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[29], 0);
        __hook__(appendElement, null, [
          this,
          ins
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[29], 0);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[29]);
    },
    ignorableWhitespace: function (ch, start, length) {
      return __hook__((ch, start, length) => {
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[31]);
    },
    characters: function (chars, start, length) {
      return __hook__((chars, start, length) => {
        chars = __hook__('()', _toString, [
          'apply',
          [
            this,
            arguments
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]);
        //console.log(chars)
        if (chars) {
          if (__hook__('.', this, ['cdata'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32])) {
            var charNode = __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[33]), [
              'createCDATASection',
              [chars]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[33]);
          } else {
            var charNode = __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[33]), [
              'createTextNode',
              [chars]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[33]);
          }
          if (__hook__('.', this, ['currentElement'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32])) {
            __hook__('()', __hook__('.', this, ['currentElement'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]), [
              'appendChild',
              [charNode]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]);
          } else if (__hook__('()', /^\s*$/, [
              'test',
              [chars]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32])) {
            __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]), [
              'appendChild',
              [charNode]
            ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]);  //process xml
          }
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]) && __hook__(position, null, [
            __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]),
            charNode
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32], 0);
        }
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[32]);
    },
    skippedEntity: function (name) {
      return __hook__(name => {
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[34]);
    },
    endDocument: function () {
      return __hook__(() => {
        __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[35]), [
          'normalize',
          []
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[35]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[35]);
    },
    setDocumentLocator: function (locator) {
      return __hook__(locator => {
        if (__hook__('=', this, [
            'locator',
            locator
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[36])) {
          // && !('lineNumber' in locator)){
          __hook__('=', locator, [
            'lineNumber',
            0
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[36]);
        }
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[36]);
    },
    //LexicalHandler
    comment: function (chars, start, length) {
      return __hook__((chars, start, length) => {
        chars = __hook__('()', _toString, [
          'apply',
          [
            this,
            arguments
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37]);
        var comm = __hook__('()', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[38]), [
          'createComment',
          [chars]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[38]);
        __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37]) && __hook__(position, null, [
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37]),
          comm
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37], 0);
        __hook__(appendElement, null, [
          this,
          comm
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37], 0);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[37]);
    },
    startCDATA: function () {
      return __hook__(() => {
        //used in characters() methods
        __hook__('=', this, [
          'cdata',
          true
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[39]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[39]);
    },
    endCDATA: function () {
      return __hook__(() => {
        __hook__('=', this, [
          'cdata',
          false
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[40]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[40]);
    },
    startDTD: function (name, publicId, systemId) {
      return __hook__((name, publicId, systemId) => {
        var impl = __hook__('.', __hook__('.', this, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[42]), ['implementation'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[42]);
        if (impl && __hook__('.', impl, ['createDocumentType'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41])) {
          var dt = __hook__('()', impl, [
            'createDocumentType',
            [
              name,
              publicId,
              systemId
            ]
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[43]);
          __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41]) && __hook__(position, null, [
            __hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41]),
            dt
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41], 0);
          __hook__(appendElement, null, [
            this,
            dt
          ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41], 0);
        }
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[41]);
    },
    /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
    warning: function (error) {
      return __hook__(error => {
        __hook__('()', $hook$.global(__hook__, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[44], 'console', 'get')[__f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[45]], [
          'warn',
          [
            '[xmldom warning]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[44])], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[44], 0)
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[44]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[44]);
    },
    error: function (error) {
      return __hook__(error => {
        __hook__('()', $hook$.global(__hook__, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[46], 'console', 'get')[__f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[47]], [
          'error',
          [
            '[xmldom error]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[46])], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[46], 0)
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[46]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[46]);
    },
    fatalError: function (error) {
      return __hook__(error => {
        __hook__('()', $hook$.global(__hook__, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[48], 'console', 'get')[__f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[49]], [
          'error',
          [
            '[xmldom fatalError]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[48])], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[48], 0)
          ]
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[48]);
        throw error;
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[48]);
    }
  }
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
function _locator(l) {
  return __hook__(l => {
    if (l) {
      return '\n@' + (__hook__('.', l, ['systemId'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[50]) || '') + '#[line:' + __hook__('.', l, ['lineNumber'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[50]) + ',col:' + __hook__('.', l, ['columnNumber'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[50]) + ']';
    }
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[50]);
}
function _toString(chars, start, length) {
  return __hook__((chars, start, length) => {
    if (typeof chars == 'string') {
      return __hook__('()', chars, [
        'substr',
        [
          start,
          length
        ]
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51]);
    } else {
      //java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
      if (__hook__('.', chars, ['length'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51]) >= start + length || start) {
        return __hook__(__hook__('.', __hook__('.', $hook$.global(__hook__, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51], 'java', 'get')[__f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[52]], ['lang'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51]), ['String'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51]), null, [
          chars,
          start,
          length
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51], true) + '';
      }
      return chars;
    }
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[51]);
}
/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
__hook__('()', 'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl', [
  'replace',
  [
    /\w+/g,
    function (key) {
      return __hook__(key => {
        __hook__('=', __hook__('.', DOMHandler, ['prototype'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]), [
          key,
          function () {
            return __hook__(() => {
              return null;
            }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
          }
        ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
      }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
    }
  ]
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
  return __hook__((hander, node) => {
    if (!__hook__('.', hander, ['currentElement'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53])) {
      __hook__('()', __hook__('.', hander, ['doc'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53]), [
        'appendChild',
        [node]
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53]);
    } else {
      __hook__('()', __hook__('.', hander, ['currentElement'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53]), [
        'appendChild',
        [node]
      ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53]);
    }
  }, null, arguments, __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[53]);
}
//appendChild and setAttributeNS are preformance key
//if(typeof require == 'function'){
var XMLReader = __hook__('.', __hook__(() => require('./sax'), null, [
  'require',
  './sax',
  '/components/thin-hook/node_modules/xmldom/sax.js'
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[54], NaN), ['XMLReader'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[54]);
var DOMImplementation = __hook__('=', exports, [
  'DOMImplementation',
  __hook__('.', __hook__(() => require('./dom'), null, [
    'require',
    './dom',
    '/components/thin-hook/node_modules/xmldom/dom.js'
  ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[55], NaN), ['DOMImplementation'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[55])
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[55]);
__hook__('=', exports, [
  'XMLSerializer',
  __hook__('.', __hook__(() => require('./dom'), null, [
    'require',
    './dom',
    '/components/thin-hook/node_modules/xmldom/dom.js'
  ], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1], NaN), ['XMLSerializer'], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1])
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);
__hook__('=', exports, [
  'DOMParser',
  DOMParser
], __f3812dc4d79b1e30f7d60bd3bf9890142b89a692a8695842f31e1aca8c8078c6__[1]);  //}

},{"./dom":7,"./sax":8}],7:[function(require,module,exports){
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
const __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/xmldom/dom.js,copy',
  '/components/thin-hook/node_modules/xmldom/dom.js,_extends',
  '/components/thin-hook/node_modules/xmldom/dom.js,_extends,pt',
  '_uNpREdiC4aB1e_Object;/components/thin-hook/node_modules/xmldom/dom.js,_extends',
  '/components/thin-hook/node_modules/xmldom/dom.js,_extends,ppt',
  '_uNpREdiC4aB1e_Object;/components/thin-hook/node_modules/xmldom/dom.js,_extends,ppt',
  '/components/thin-hook/node_modules/xmldom/dom.js,_extends,t',
  '_uNpREdiC4aB1e_console;/components/thin-hook/node_modules/xmldom/dom.js,_extends',
  '/components/thin-hook/node_modules/xmldom/dom.js,ELEMENT_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,ATTRIBUTE_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,TEXT_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,CDATA_SECTION_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,ENTITY_REFERENCE_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,ENTITY_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,PROCESSING_INSTRUCTION_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,COMMENT_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_TYPE_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_FRAGMENT_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,NOTATION_NODE',
  '/components/thin-hook/node_modules/xmldom/dom.js,INDEX_SIZE_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOMSTRING_SIZE_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,HIERARCHY_REQUEST_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,WRONG_DOCUMENT_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_CHARACTER_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,NO_DATA_ALLOWED_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,NO_MODIFICATION_ALLOWED_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,NOT_FOUND_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,NOT_SUPPORTED_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,INUSE_ATTRIBUTE_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_STATE_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,SYNTAX_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_MODIFICATION_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,NAMESPACE_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_ACCESS_ERR',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOMException',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/dom.js,DOMException',
  '/components/thin-hook/node_modules/xmldom/dom.js',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/dom.js',
  '/components/thin-hook/node_modules/xmldom/dom.js,NodeList',
  '/components/thin-hook/node_modules/xmldom/dom.js,item',
  '/components/thin-hook/node_modules/xmldom/dom.js,toString',
  '/components/thin-hook/node_modules/xmldom/dom.js,LiveNodeList',
  '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList',
  '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc',
  '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,ls',
  '/components/thin-hook/node_modules/xmldom/dom.js,NamedNodeMap',
  '/components/thin-hook/node_modules/xmldom/dom.js,_findNodeIndex',
  '/components/thin-hook/node_modules/xmldom/dom.js,_findNodeIndex,i',
  '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode,doc',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,i',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,lastIndex',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,doc',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem,i',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem',
  '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem,el',
  '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem,oldAttr',
  '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS,el',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS,i',
  '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature,versions',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocument',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocument,doc',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocument,root',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,Node',
  '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore',
  '/components/thin-hook/node_modules/xmldom/dom.js,replaceChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,appendChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasChildNodes',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,normalize',
  '/components/thin-hook/node_modules/xmldom/dom.js,normalize,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,normalize,next',
  '/components/thin-hook/node_modules/xmldom/dom.js,isSupported',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributes',
  '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix',
  '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix,map',
  '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI',
  '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI,map',
  '/components/thin-hook/node_modules/xmldom/dom.js,isDefaultNamespace',
  '/components/thin-hook/node_modules/xmldom/dom.js,isDefaultNamespace,prefix',
  '/components/thin-hook/node_modules/xmldom/dom.js,_xmlEncoder',
  '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,Document',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute,ns',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute,ns',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild,cs',
  '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild,previous',
  '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild,next',
  '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore',
  '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,cp',
  '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,newFirst',
  '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,newLast',
  '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,pre',
  '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,cp',
  '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,pre',
  '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore,next',
  '/components/thin-hook/node_modules/xmldom/dom.js,importNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,getElementById',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElement',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElement,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElement,attrs',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment',
  '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createComment',
  '/components/thin-hook/node_modules/xmldom/dom.js,createComment,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection',
  '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction',
  '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference',
  '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,pl',
  '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,attrs',
  '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS,node',
  '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS,pl',
  '/components/thin-hook/node_modules/xmldom/dom.js,Element',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttribute,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeAttribute',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeAttribute,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNodeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNS,old',
  '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNS,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNodeNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName',
  '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS',
  '/components/thin-hook/node_modules/xmldom/dom.js,Attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,CharacterData',
  '/components/thin-hook/node_modules/xmldom/dom.js,substringData',
  '/components/thin-hook/node_modules/xmldom/dom.js,appendData',
  '/components/thin-hook/node_modules/xmldom/dom.js,insertData',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/dom.js,appendChild',
  '/components/thin-hook/node_modules/xmldom/dom.js,deleteData',
  '/components/thin-hook/node_modules/xmldom/dom.js,replaceData',
  '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,start',
  '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,end',
  '/components/thin-hook/node_modules/xmldom/dom.js,Text',
  '/components/thin-hook/node_modules/xmldom/dom.js,splitText',
  '/components/thin-hook/node_modules/xmldom/dom.js,splitText,text',
  '/components/thin-hook/node_modules/xmldom/dom.js,splitText,newText',
  '/components/thin-hook/node_modules/xmldom/dom.js,splitText,newNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,Comment',
  '/components/thin-hook/node_modules/xmldom/dom.js,CDATASection',
  '/components/thin-hook/node_modules/xmldom/dom.js,DocumentType',
  '/components/thin-hook/node_modules/xmldom/dom.js,Notation',
  '/components/thin-hook/node_modules/xmldom/dom.js,Entity',
  '/components/thin-hook/node_modules/xmldom/dom.js,EntityReference',
  '/components/thin-hook/node_modules/xmldom/dom.js,DocumentFragment',
  '/components/thin-hook/node_modules/xmldom/dom.js,ProcessingInstruction',
  '/components/thin-hook/node_modules/xmldom/dom.js,XMLSerializer',
  '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString',
  '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,refNode',
  '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,prefix',
  '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,uri',
  '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine',
  '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,prefix',
  '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,uri',
  '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,i',
  '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,ns',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,startVisibleNamespaces',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,attrs',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,len',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,nodeName',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,attr',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,prefix',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,namespace',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,uri',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,pubid',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,sysid',
  '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,sub',
  '/components/thin-hook/node_modules/xmldom/dom.js,importNode,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,node2',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,v',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,attrs',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,attrs2',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,len',
  '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,child',
  '/components/thin-hook/node_modules/xmldom/dom.js,__set__',
  '_uNpREdiC4aB1e_Object;/components/thin-hook/node_modules/xmldom/dom.js',
  '/components/thin-hook/node_modules/xmldom/dom.js,get',
  '/components/thin-hook/node_modules/xmldom/dom.js,set',
  '_uNpREdiC4aB1e_String;/components/thin-hook/node_modules/xmldom/dom.js,set',
  '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent'
]);
function copy(src, dest) {
  return __hook__((src, dest) => {
    for (var p in __hook__('*', src, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[0])) {
      __hook__('=', dest, [
        p,
        __hook__('.', src, [p], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[0])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[0]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[0]);
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
  return __hook__((Class, Super) => {
    var pt = __hook__('.', Class, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[2]);
    if (__hook__('.', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1], 'Object', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[3]], ['create'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1])) {
      var ppt = __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[4], 'Object', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[5]], [
        'create',
        [__hook__('.', Super, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[4])]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[4]);
      __hook__('=', pt, [
        '__proto__',
        ppt
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
    }
    if (!(pt instanceof Super)) {
      function t() {
        return __hook__(() => {
        }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[6]);
      }
      ;
      __hook__('=', t, [
        'prototype',
        __hook__('.', Super, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
      t = __hook__(t, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1], true);
      __hook__(copy, null, [
        pt,
        t
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1], 0);
      __hook__('=', Class, [
        'prototype',
        pt = t
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
    }
    if (__hook__('.', pt, ['constructor'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]) != Class) {
      if (typeof Class != 'function') {
        __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1], 'console', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[7]], [
          'error',
          ['unknow Class:' + Class]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
      }
      __hook__('=', pt, [
        'constructor',
        Class
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[1]);
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = __hook__('=', NodeType, [
  'ELEMENT_NODE',
  1
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[8]);
var ATTRIBUTE_NODE = __hook__('=', NodeType, [
  'ATTRIBUTE_NODE',
  2
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[9]);
var TEXT_NODE = __hook__('=', NodeType, [
  'TEXT_NODE',
  3
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[10]);
var CDATA_SECTION_NODE = __hook__('=', NodeType, [
  'CDATA_SECTION_NODE',
  4
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[11]);
var ENTITY_REFERENCE_NODE = __hook__('=', NodeType, [
  'ENTITY_REFERENCE_NODE',
  5
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[12]);
var ENTITY_NODE = __hook__('=', NodeType, [
  'ENTITY_NODE',
  6
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[13]);
var PROCESSING_INSTRUCTION_NODE = __hook__('=', NodeType, [
  'PROCESSING_INSTRUCTION_NODE',
  7
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[14]);
var COMMENT_NODE = __hook__('=', NodeType, [
  'COMMENT_NODE',
  8
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[15]);
var DOCUMENT_NODE = __hook__('=', NodeType, [
  'DOCUMENT_NODE',
  9
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[16]);
var DOCUMENT_TYPE_NODE = __hook__('=', NodeType, [
  'DOCUMENT_TYPE_NODE',
  10
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[17]);
var DOCUMENT_FRAGMENT_NODE = __hook__('=', NodeType, [
  'DOCUMENT_FRAGMENT_NODE',
  11
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[18]);
var NOTATION_NODE = __hook__('=', NodeType, [
  'NOTATION_NODE',
  12
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[19]);
// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = __hook__('=', ExceptionCode, [
  'INDEX_SIZE_ERR',
  (__hook__('=', ExceptionMessage, [
    1,
    'Index size error'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[20]), 1)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[20]);
var DOMSTRING_SIZE_ERR = __hook__('=', ExceptionCode, [
  'DOMSTRING_SIZE_ERR',
  (__hook__('=', ExceptionMessage, [
    2,
    'DOMString size error'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[21]), 2)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[21]);
var HIERARCHY_REQUEST_ERR = __hook__('=', ExceptionCode, [
  'HIERARCHY_REQUEST_ERR',
  (__hook__('=', ExceptionMessage, [
    3,
    'Hierarchy request error'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[22]), 3)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[22]);
var WRONG_DOCUMENT_ERR = __hook__('=', ExceptionCode, [
  'WRONG_DOCUMENT_ERR',
  (__hook__('=', ExceptionMessage, [
    4,
    'Wrong document'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[23]), 4)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[23]);
var INVALID_CHARACTER_ERR = __hook__('=', ExceptionCode, [
  'INVALID_CHARACTER_ERR',
  (__hook__('=', ExceptionMessage, [
    5,
    'Invalid character'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[24]), 5)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[24]);
var NO_DATA_ALLOWED_ERR = __hook__('=', ExceptionCode, [
  'NO_DATA_ALLOWED_ERR',
  (__hook__('=', ExceptionMessage, [
    6,
    'No data allowed'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[25]), 6)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[25]);
var NO_MODIFICATION_ALLOWED_ERR = __hook__('=', ExceptionCode, [
  'NO_MODIFICATION_ALLOWED_ERR',
  (__hook__('=', ExceptionMessage, [
    7,
    'No modification allowed'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[26]), 7)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[26]);
var NOT_FOUND_ERR = __hook__('=', ExceptionCode, [
  'NOT_FOUND_ERR',
  (__hook__('=', ExceptionMessage, [
    8,
    'Not found'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[27]), 8)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[27]);
var NOT_SUPPORTED_ERR = __hook__('=', ExceptionCode, [
  'NOT_SUPPORTED_ERR',
  (__hook__('=', ExceptionMessage, [
    9,
    'Not supported'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[28]), 9)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[28]);
var INUSE_ATTRIBUTE_ERR = __hook__('=', ExceptionCode, [
  'INUSE_ATTRIBUTE_ERR',
  (__hook__('=', ExceptionMessage, [
    10,
    'Attribute in use'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[29]), 10)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[29]);
//level2
var INVALID_STATE_ERR = __hook__('=', ExceptionCode, [
  'INVALID_STATE_ERR',
  (__hook__('=', ExceptionMessage, [
    11,
    'Invalid state'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[30]), 11)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[30]);
var SYNTAX_ERR = __hook__('=', ExceptionCode, [
  'SYNTAX_ERR',
  (__hook__('=', ExceptionMessage, [
    12,
    'Syntax error'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[31]), 12)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[31]);
var INVALID_MODIFICATION_ERR = __hook__('=', ExceptionCode, [
  'INVALID_MODIFICATION_ERR',
  (__hook__('=', ExceptionMessage, [
    13,
    'Invalid modification'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[32]), 13)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[32]);
var NAMESPACE_ERR = __hook__('=', ExceptionCode, [
  'NAMESPACE_ERR',
  (__hook__('=', ExceptionMessage, [
    14,
    'Invalid namespace'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[33]), 14)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[33]);
var INVALID_ACCESS_ERR = __hook__('=', ExceptionCode, [
  'INVALID_ACCESS_ERR',
  (__hook__('=', ExceptionMessage, [
    15,
    'Invalid access'
  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[34]), 15)
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[34]);
function DOMException(code, message) {
  return __hook__((code, message) => {
    if (message instanceof $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[36]]) {
      var error = message;
    } else {
      error = this;
      __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[36]], [
        'call',
        [
          this,
          __hook__('.', ExceptionMessage, [code], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35])
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
      __hook__('=', this, [
        'message',
        __hook__('.', ExceptionMessage, [code], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
      if (__hook__('.', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[36]], ['captureStackTrace'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]))
        __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[36]], [
          'captureStackTrace',
          [
            this,
            DOMException
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
    }
    __hook__('=', error, [
      'code',
      code
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
    if (message)
      __hook__('=', this, [
        'message',
        __hook__('.', this, ['message'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]) + ': ' + message
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
    return error;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[35]);
}
;
__hook__('=', DOMException, [
  'prototype',
  __hook__('.', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[38]], ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37])
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(copy, null, [
  ExceptionCode,
  DOMException
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[39]);
}
;
__hook__('=', NodeList, [
  'prototype',
  {
    /**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
    length: 0,
    /**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
    item: function (index) {
      return __hook__(index => {
        return __hook__('.', this, [index], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[40]) || null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[40]);
    },
    toString: function (isHTML, nodeFilter) {
      return __hook__((isHTML, nodeFilter) => {
        for (var buf = [], i = 0; i < __hook__('.', this, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[41]); i++) {
          __hook__(serializeToString, null, [
            __hook__('.', this, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[41]),
            buf,
            isHTML,
            nodeFilter
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[41], 0);
        }
        return __hook__('()', buf, [
          'join',
          ['']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[41]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[41]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
function LiveNodeList(node, refresh) {
  return __hook__((node, refresh) => {
    __hook__('=', this, [
      '_node',
      node
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[42]);
    __hook__('=', this, [
      '_refresh',
      refresh
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[42]);
    __hook__(_updateLiveList, null, [this], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[42], 0);
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[42]);
}
function _updateLiveList(list) {
  return __hook__(list => {
    var inc = __hook__('.', __hook__('.', list, ['_node'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[44]), ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[44]) || __hook__('.', __hook__('.', __hook__('.', list, ['_node'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[44]), ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[44]), ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[44]);
    if (__hook__('.', list, ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43]) != inc) {
      var ls = __hook__('()', list, [
        '_refresh',
        [__hook__('.', list, ['_node'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[45])]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[45]);
      //console.log(ls.length)
      __hook__(__set__, null, [
        list,
        'length',
        __hook__('.', ls, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43], 0);
      __hook__(copy, null, [
        ls,
        list
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43], 0);
      __hook__('=', list, [
        '_inc',
        inc
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[43]);
}
__hook__('=', __hook__('.', LiveNodeList, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'item',
  function (i) {
    return __hook__(i => {
      __hook__(_updateLiveList, null, [this], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
      return __hook__('.', this, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
    }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  LiveNodeList,
  NodeList
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[46]);
}
;
function _findNodeIndex(list, node) {
  return __hook__((list, node) => {
    var i = __hook__('.', list, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[48]);
    while (i--) {
      if (__hook__('.', list, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[47]) === node) {
        return i;
      }
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[47]);
}
function _addNamedNode(el, list, newAttr, oldAttr) {
  return __hook__((el, list, newAttr, oldAttr) => {
    if (oldAttr) {
      __hook__('=', list, [
        __hook__(_findNodeIndex, null, [
          list,
          oldAttr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49], 0),
        newAttr
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49]);
    } else {
      __hook__('=', list, [
        __hook__('p++', list, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49]),
        newAttr
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49]);
    }
    if (el) {
      __hook__('=', newAttr, [
        'ownerElement',
        el
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49]);
      var doc = __hook__('.', el, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[50]);
      if (doc) {
        oldAttr && __hook__(_onRemoveAttribute, null, [
          doc,
          el,
          oldAttr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49], 0);
        __hook__(_onAddAttribute, null, [
          doc,
          el,
          newAttr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49], 0);
      }
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[49]);
}
function _removeNamedNode(el, list, attr) {
  return __hook__((el, list, attr) => {
    //console.log('remove attr:'+attr)
    var i = __hook__(_findNodeIndex, null, [
      list,
      attr
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[52], 0);
    if (i >= 0) {
      var lastIndex = __hook__('.', list, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[53]) - 1;
      while (i < lastIndex) {
        __hook__('=', list, [
          i,
          __hook__('.', list, [++i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51]);
      }
      __hook__('=', list, [
        'length',
        lastIndex
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51]);
      if (el) {
        var doc = __hook__('.', el, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[54]);
        if (doc) {
          __hook__(_onRemoveAttribute, null, [
            doc,
            el,
            attr
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51], 0);
          __hook__('=', attr, [
            'ownerElement',
            null
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51]);
        }
      }
    } else {
      throw __hook__(DOMException, null, [
        NOT_FOUND_ERR,
        __hook__($hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[55]], null, [__hook__('.', el, ['tagName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51]) + '@' + attr], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51], true)
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51], 0);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[51]);
}
__hook__('=', NamedNodeMap, [
  'prototype',
  {
    length: 0,
    item: __hook__('.', __hook__('.', NodeList, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[40]), ['item'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[40]),
    getNamedItem: function (key) {
      return __hook__(key => {
        //		if(key.indexOf(':')>0 || key == 'xmlns'){
        //			return null;
        //		}
        //console.log()
        var i = __hook__('.', this, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[57]);
        while (i--) {
          var attr = __hook__('.', this, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[58]);
          //console.log(attr.nodeName,key)
          if (__hook__('.', attr, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[56]) == key) {
            return attr;
          }
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[56]);
    },
    setNamedItem: function (attr) {
      return __hook__(attr => {
        var el = __hook__('.', attr, ['ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[60]);
        if (el && el != __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[59])) {
          throw __hook__(DOMException, null, [INUSE_ATTRIBUTE_ERR], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[59], true);
        }
        var oldAttr = __hook__('()', this, [
          'getNamedItem',
          [__hook__('.', attr, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[61])]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[61]);
        __hook__(_addNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[59]),
          this,
          attr,
          oldAttr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[59], 0);
        return oldAttr;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[59]);
    },
    /* returns Node */
    setNamedItemNS: function (attr) {
      return __hook__(attr => {
        // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
        var el = __hook__('.', attr, ['ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[63]), oldAttr;
        if (el && el != __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62])) {
          throw __hook__(DOMException, null, [INUSE_ATTRIBUTE_ERR], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62], true);
        }
        oldAttr = __hook__('()', this, [
          'getNamedItemNS',
          [
            __hook__('.', attr, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62]),
            __hook__('.', attr, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62])
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62]);
        __hook__(_addNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62]),
          this,
          attr,
          oldAttr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62], 0);
        return oldAttr;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[62]);
    },
    /* returns Node */
    removeNamedItem: function (key) {
      return __hook__(key => {
        var attr = __hook__('()', this, [
          'getNamedItem',
          [key]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[65]);
        __hook__(_removeNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[64]),
          this,
          attr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[64], 0);
        return attr;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[64]);
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var attr = __hook__('()', this, [
          'getNamedItemNS',
          [
            namespaceURI,
            localName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[67]);
        __hook__(_removeNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[66]),
          this,
          attr
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[66], 0);
        return attr;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[66]);
    },
    getNamedItemNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var i = __hook__('.', this, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[69]);
        while (i--) {
          var node = __hook__('.', this, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[70]);
          if (__hook__('.', node, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[68]) == localName && __hook__('.', node, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[68]) == namespaceURI) {
            return node;
          }
        }
        return null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[68]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(features) {
  return __hook__(features => {
    __hook__('=', this, [
      '_features',
      {}
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[71]);
    if (features) {
      for (var feature in __hook__('*', features, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[71])) {
        __hook__('=', this, [
          '_features',
          __hook__('.', features, [feature], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[71])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[71]);
      }
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[71]);
}
;
__hook__('=', DOMImplementation, [
  'prototype',
  {
    hasFeature: function (feature, version) {
      return __hook__((feature, version) => {
        var versions = __hook__('.', __hook__('.', this, ['_features'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[73]), [__hook__('()', feature, [
            'toLowerCase',
            []
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[73])], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[73]);
        if (versions && (!version || __hook__('in', versions, [version], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[72]))) {
          return true;
        } else {
          return false;
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[72]);
    },
    // Introduced in DOM Level 2:
    createDocument: function (namespaceURI, qualifiedName, doctype) {
      return __hook__((namespaceURI, qualifiedName, doctype) => {
        // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
        var doc = __hook__(Document, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[75], true);
        __hook__('=', doc, [
          'implementation',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
        __hook__('=', doc, [
          'childNodes',
          __hook__(NodeList, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
        __hook__('=', doc, [
          'doctype',
          doctype
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
        if (doctype) {
          __hook__('()', doc, [
            'appendChild',
            [doctype]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
        }
        if (qualifiedName) {
          var root = __hook__('()', doc, [
            'createElementNS',
            [
              namespaceURI,
              qualifiedName
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[76]);
          __hook__('()', doc, [
            'appendChild',
            [root]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
        }
        return doc;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[74]);
    },
    // Introduced in DOM Level 2:
    createDocumentType: function (qualifiedName, publicId, systemId) {
      return __hook__((qualifiedName, publicId, systemId) => {
        // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
        var node = __hook__(DocumentType, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[78], true);
        __hook__('=', node, [
          'name',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[77]);
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[77]);
        __hook__('=', node, [
          'publicId',
          publicId
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[77]);
        __hook__('=', node, [
          'systemId',
          systemId
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[77]);
        // Introduced in DOM Level 2:
        //readonly attribute DOMString        internalSubset;
        //TODO:..
        //  readonly attribute NamedNodeMap     entities;
        //  readonly attribute NamedNodeMap     notations;
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[77]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */
function Node() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[79]);
}
;
__hook__('=', Node, [
  'prototype',
  {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    // Modified in DOM Level 2:
    insertBefore: function (newChild, refChild) {
      return __hook__((newChild, refChild) => {
        //raises 
        return __hook__(_insertBefore, null, [
          this,
          newChild,
          refChild
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80], 0);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]);
    },
    replaceChild: function (newChild, oldChild) {
      return __hook__((newChild, oldChild) => {
        //raises 
        __hook__('()', this, [
          'insertBefore',
          [
            newChild,
            oldChild
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[81]);
        if (oldChild) {
          __hook__('()', this, [
            'removeChild',
            [oldChild]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[81]);
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[81]);
    },
    removeChild: function (oldChild) {
      return __hook__(oldChild => {
        return __hook__(_removeChild, null, [
          this,
          oldChild
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82], 0);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82]);
    },
    appendChild: function (newChild) {
      return __hook__(newChild => {
        return __hook__('()', this, [
          'insertBefore',
          [
            newChild,
            null
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]);
    },
    hasChildNodes: function () {
      return __hook__(() => {
        return __hook__('.', this, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[84]) != null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[84]);
    },
    cloneNode: function (deep) {
      return __hook__(deep => {
        return __hook__(cloneNode, null, [
          __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]) || this,
          this,
          deep
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85], 0);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
    },
    // Modified in DOM Level 2:
    normalize: function () {
      return __hook__(() => {
        var child = __hook__('.', this, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[87]);
        while (child) {
          var next = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[88]);
          if (next && __hook__('.', next, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]) == TEXT_NODE && __hook__('.', child, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]) == TEXT_NODE) {
            __hook__('()', this, [
              'removeChild',
              [next]
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]);
            __hook__('()', child, [
              'appendData',
              [__hook__('.', next, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86])]
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]);
          } else {
            __hook__('()', child, [
              'normalize',
              []
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]);
            child = next;
          }
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[86]);
    },
    // Introduced in DOM Level 2:
    isSupported: function (feature, version) {
      return __hook__((feature, version) => {
        return __hook__('()', __hook__('.', __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[89]), ['implementation'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[89]), [
          'hasFeature',
          [
            feature,
            version
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[89]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[89]);
    },
    // Introduced in DOM Level 2:
    hasAttributes: function () {
      return __hook__(() => {
        return __hook__('.', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[90]), ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[90]) > 0;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[90]);
    },
    lookupPrefix: function (namespaceURI) {
      return __hook__(namespaceURI => {
        var el = this;
        while (el) {
          var map = __hook__('.', el, ['_nsMap'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[92]);
          //console.dir(map)
          if (map) {
            for (var n in __hook__('*', map, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91])) {
              if (__hook__('.', map, [n], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91]) == namespaceURI) {
                return n;
              }
            }
          }
          el = __hook__('.', el, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91]) == ATTRIBUTE_NODE ? __hook__('.', el, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91]) : __hook__('.', el, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91]);
        }
        return null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[91]);
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function (prefix) {
      return __hook__(prefix => {
        var el = this;
        while (el) {
          var map = __hook__('.', el, ['_nsMap'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[94]);
          //console.dir(map)
          if (map) {
            if (__hook__('in', map, [prefix], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93])) {
              return __hook__('.', map, [prefix], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93]);
            }
          }
          el = __hook__('.', el, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93]) == ATTRIBUTE_NODE ? __hook__('.', el, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93]) : __hook__('.', el, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93]);
        }
        return null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[93]);
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function (namespaceURI) {
      return __hook__(namespaceURI => {
        var prefix = __hook__('()', this, [
          'lookupPrefix',
          [namespaceURI]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[96]);
        return prefix == null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[95]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
function _xmlEncoder(c) {
  return __hook__(c => {
    return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + __hook__('()', c, [
      'charCodeAt',
      []
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[97]) + ';';
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[97]);
}
__hook__(copy, null, [
  NodeType,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
__hook__(copy, null, [
  NodeType,
  __hook__('.', Node, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37])
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
  return __hook__((node, callback) => {
    if (__hook__(callback, null, [node], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[98], 0)) {
      return true;
    }
    if (node = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[98])) {
      do {
        if (__hook__(_visitNode, null, [
            node,
            callback
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[98], 0)) {
          return true;
        }
      } while (node = __hook__('.', node, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[98]));
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[98]);
}
function Document() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[99]);
}
function _onAddAttribute(doc, el, newAttr) {
  return __hook__((doc, el, newAttr) => {
    doc && __hook__('p++', doc, ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]);
    var ns = __hook__('.', newAttr, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[101]);
    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      __hook__('=', __hook__('.', el, ['_nsMap'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]), [
        __hook__('.', newAttr, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]) ? __hook__('.', newAttr, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]) : '',
        __hook__('.', newAttr, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[100]);
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  return __hook__((doc, el, newAttr, remove) => {
    doc && __hook__('p++', doc, ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]);
    var ns = __hook__('.', newAttr, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[103]);
    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      __hook__('delete', __hook__('.', el, ['_nsMap'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]), [__hook__('.', newAttr, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]) ? __hook__('.', newAttr, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]) : ''], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[102]);
}
function _onUpdateChild(doc, el, newChild) {
  return __hook__((doc, el, newChild) => {
    if (doc && __hook__('.', doc, ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104])) {
      __hook__('p++', doc, ['_inc'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
      //update childNodes
      var cs = __hook__('.', el, ['childNodes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[105]);
      if (newChild) {
        __hook__('=', cs, [
          __hook__('p++', cs, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]),
          newChild
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
      } else {
        //console.log(1)
        var child = __hook__('.', el, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[106]);
        var i = 0;
        while (child) {
          __hook__('=', cs, [
            i++,
            child
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
          child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
        }
        __hook__('=', cs, [
          'length',
          i
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
      }
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[104]);
}
/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode, child) {
  return __hook__((parentNode, child) => {
    var previous = __hook__('.', child, ['previousSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[108]);
    var next = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[109]);
    if (previous) {
      __hook__('=', previous, [
        'nextSibling',
        next
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]);
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        next
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]);
    }
    if (next) {
      __hook__('=', next, [
        'previousSibling',
        previous
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]);
    } else {
      __hook__('=', parentNode, [
        'lastChild',
        previous
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]);
    }
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]),
      parentNode
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107], 0);
    return child;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[107]);
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
  return __hook__((parentNode, newChild, nextChild) => {
    var cp = __hook__('.', newChild, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[111]);
    if (cp) {
      __hook__('()', cp, [
        'removeChild',
        [newChild]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);  //remove and update
    }
    if (__hook__('.', newChild, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]) === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = __hook__('.', newChild, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[112]);
      if (newFirst == null) {
        return newChild;
      }
      var newLast = __hook__('.', newChild, ['lastChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[113]);
    } else {
      newFirst = newLast = newChild;
    }
    var pre = nextChild ? __hook__('.', nextChild, ['previousSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[114]) : __hook__('.', parentNode, ['lastChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[114]);
    __hook__('=', newFirst, [
      'previousSibling',
      pre
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    __hook__('=', newLast, [
      'nextSibling',
      nextChild
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    if (pre) {
      __hook__('=', pre, [
        'nextSibling',
        newFirst
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        newFirst
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    }
    if (nextChild == null) {
      __hook__('=', parentNode, [
        'lastChild',
        newLast
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    } else {
      __hook__('=', nextChild, [
        'previousSibling',
        newLast
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    }
    do {
      __hook__('=', newFirst, [
        'parentNode',
        parentNode
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    } while (newFirst !== newLast && (newFirst = __hook__('.', newFirst, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110])));
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]) || parentNode,
      parentNode
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110], 0);
    //console.log(parentNode.lastChild.nextSibling == null)
    if (__hook__('.', newChild, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]) == DOCUMENT_FRAGMENT_NODE) {
      __hook__('=', newChild, [
        'firstChild',
        __hook__('=', newChild, [
          'lastChild',
          null
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110])
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
    }
    return newChild;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[110]);
}
function _appendSingleChild(parentNode, newChild) {
  return __hook__((parentNode, newChild) => {
    var cp = __hook__('.', newChild, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[116]);
    if (cp) {
      var pre = __hook__('.', parentNode, ['lastChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[117]);
      __hook__('()', cp, [
        'removeChild',
        [newChild]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
      //remove and update
      var pre = __hook__('.', parentNode, ['lastChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[117]);
    }
    var pre = __hook__('.', parentNode, ['lastChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[117]);
    __hook__('=', newChild, [
      'parentNode',
      parentNode
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    __hook__('=', newChild, [
      'previousSibling',
      pre
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    __hook__('=', newChild, [
      'nextSibling',
      null
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    if (pre) {
      __hook__('=', pre, [
        'nextSibling',
        newChild
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        newChild
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    }
    __hook__('=', parentNode, [
      'lastChild',
      newChild
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]),
      parentNode,
      newChild
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115], 0);
    return newChild;  //console.log("__aa",parentNode.lastChild.nextSibling == null)
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[115]);
}
__hook__('=', Document, [
  'prototype',
  {
    //implementation : null,
    nodeName: '#document',
    nodeType: DOCUMENT_NODE,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function (newChild, refChild) {
      return __hook__((newChild, refChild) => {
        //raises 
        if (__hook__('.', newChild, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]) == DOCUMENT_FRAGMENT_NODE) {
          var child = __hook__('.', newChild, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[118]);
          while (child) {
            var next = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[119]);
            __hook__('()', this, [
              'insertBefore',
              [
                child,
                refChild
              ]
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]);
            child = next;
          }
          return newChild;
        }
        if (__hook__('.', this, ['documentElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]) == null && __hook__('.', newChild, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]) == ELEMENT_NODE) {
          __hook__('=', this, [
            'documentElement',
            newChild
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]);
        }
        return __hook__(_insertBefore, null, [
          this,
          newChild,
          refChild
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80], 0), __hook__('=', newChild, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]), newChild;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[80]);
    },
    removeChild: function (oldChild) {
      return __hook__(oldChild => {
        if (__hook__('.', this, ['documentElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82]) == oldChild) {
          __hook__('=', this, [
            'documentElement',
            null
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82]);
        }
        return __hook__(_removeChild, null, [
          this,
          oldChild
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82], 0);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[82]);
    },
    // Introduced in DOM Level 2:
    importNode: function (importedNode, deep) {
      return __hook__((importedNode, deep) => {
        return __hook__(importNode, null, [
          this,
          importedNode,
          deep
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120], 0);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
    },
    // Introduced in DOM Level 2:
    getElementById: function (id) {
      return __hook__(id => {
        var rtv = null;
        __hook__(_visitNode, null, [
          __hook__('.', this, ['documentElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121]),
          function (node) {
            return __hook__(node => {
              if (__hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121]) == ELEMENT_NODE) {
                if (__hook__('()', node, [
                    'getAttribute',
                    ['id']
                  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121]) == id) {
                  rtv = node;
                  return true;
                }
              }
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121]);
          }
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121], 0);
        return rtv;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[121]);
    },
    //document factory method:
    createElement: function (tagName) {
      return __hook__(tagName => {
        var node = __hook__(Element, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[123], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
        __hook__('=', node, [
          'nodeName',
          tagName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
        __hook__('=', node, [
          'tagName',
          tagName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
        var attrs = __hook__('=', node, [
          'attributes',
          __hook__(NamedNodeMap, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[124], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[124]);
        __hook__('=', attrs, [
          '_ownerElement',
          node
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[122]);
    },
    createDocumentFragment: function () {
      return __hook__(() => {
        var node = __hook__(DocumentFragment, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[126], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[125]);
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[125], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[125]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[125]);
    },
    createTextNode: function (data) {
      return __hook__(data => {
        var node = __hook__(Text, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[128], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[127]);
        __hook__('()', node, [
          'appendData',
          [data]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[127]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[127]);
    },
    createComment: function (data) {
      return __hook__(data => {
        var node = __hook__(Comment, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[130], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[129]);
        __hook__('()', node, [
          'appendData',
          [data]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[129]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[129]);
    },
    createCDATASection: function (data) {
      return __hook__(data => {
        var node = __hook__(CDATASection, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[132], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[131]);
        __hook__('()', node, [
          'appendData',
          [data]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[131]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[131]);
    },
    createProcessingInstruction: function (target, data) {
      return __hook__((target, data) => {
        var node = __hook__(ProcessingInstruction, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[134], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133]);
        __hook__('=', node, [
          'tagName',
          __hook__('=', node, [
            'target',
            target
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133]);
        __hook__('=', node, [
          'nodeValue',
          __hook__('=', node, [
            'data',
            data
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[133]);
    },
    createAttribute: function (name) {
      return __hook__(name => {
        var node = __hook__(Attr, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[136], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
        __hook__('=', node, [
          'name',
          name
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
        __hook__('=', node, [
          'nodeName',
          name
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
        __hook__('=', node, [
          'localName',
          name
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
        __hook__('=', node, [
          'specified',
          true
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[135]);
    },
    createEntityReference: function (name) {
      return __hook__(name => {
        var node = __hook__(EntityReference, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[138], true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[137]);
        __hook__('=', node, [
          'nodeName',
          name
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[137]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[137]);
    },
    // Introduced in DOM Level 2:
    createElementNS: function (namespaceURI, qualifiedName) {
      return __hook__((namespaceURI, qualifiedName) => {
        var node = __hook__(Element, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[140], true);
        var pl = __hook__('()', qualifiedName, [
          'split',
          [':']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[141]);
        var attrs = __hook__('=', node, [
          'attributes',
          __hook__(NamedNodeMap, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[142], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[142]);
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139], true)
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        __hook__('=', node, [
          'tagName',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        __hook__('=', node, [
          'namespaceURI',
          namespaceURI
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        if (__hook__('.', pl, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]) == 2) {
          __hook__('=', node, [
            'prefix',
            __hook__('.', pl, [0], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139])
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
          __hook__('=', node, [
            'localName',
            __hook__('.', pl, [1], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139])
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        } else {
          //el.prefix = null;
          __hook__('=', node, [
            'localName',
            qualifiedName
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        }
        __hook__('=', attrs, [
          '_ownerElement',
          node
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[139]);
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function (namespaceURI, qualifiedName) {
      return __hook__((namespaceURI, qualifiedName) => {
        var node = __hook__(Attr, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[144], true);
        var pl = __hook__('()', qualifiedName, [
          'split',
          [':']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[145]);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        __hook__('=', node, [
          'name',
          qualifiedName
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        __hook__('=', node, [
          'namespaceURI',
          namespaceURI
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        __hook__('=', node, [
          'specified',
          true
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        if (__hook__('.', pl, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]) == 2) {
          __hook__('=', node, [
            'prefix',
            __hook__('.', pl, [0], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143])
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
          __hook__('=', node, [
            'localName',
            __hook__('.', pl, [1], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143])
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        } else {
          //el.prefix = null;
          __hook__('=', node, [
            'localName',
            qualifiedName
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
        }
        return node;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[143]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Document,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Element() {
  return __hook__(() => {
    __hook__('=', this, [
      '_nsMap',
      {}
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[146]);
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[146]);
}
;
__hook__('=', Element, [
  'prototype',
  {
    nodeType: ELEMENT_NODE,
    hasAttribute: function (name) {
      return __hook__(name => {
        return __hook__('()', this, [
          'getAttributeNode',
          [name]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[147]) != null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[147]);
    },
    getAttribute: function (name) {
      return __hook__(name => {
        var attr = __hook__('()', this, [
          'getAttributeNode',
          [name]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[149]);
        return attr && __hook__('.', attr, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[148]) || '';
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[148]);
    },
    getAttributeNode: function (name) {
      return __hook__(name => {
        return __hook__('()', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[150]), [
          'getNamedItem',
          [name]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[150]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[150]);
    },
    setAttribute: function (name, value) {
      return __hook__((name, value) => {
        var attr = __hook__('()', __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[152]), [
          'createAttribute',
          [name]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[152]);
        __hook__('=', attr, [
          'value',
          __hook__('=', attr, [
            'nodeValue',
            '' + value
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[151])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[151]);
        __hook__('()', this, [
          'setAttributeNode',
          [attr]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[151]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[151]);
    },
    removeAttribute: function (name) {
      return __hook__(name => {
        var attr = __hook__('()', this, [
          'getAttributeNode',
          [name]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[154]);
        attr && __hook__('()', this, [
          'removeAttributeNode',
          [attr]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[153]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[153]);
    },
    //four real opeartion method
    appendChild: function (newChild) {
      return __hook__(newChild => {
        if (__hook__('.', newChild, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]) === DOCUMENT_FRAGMENT_NODE) {
          return __hook__('()', this, [
            'insertBefore',
            [
              newChild,
              null
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]);
        } else {
          return __hook__(_appendSingleChild, null, [
            this,
            newChild
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83], 0);
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]);
    },
    setAttributeNode: function (newAttr) {
      return __hook__(newAttr => {
        return __hook__('()', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[155]), [
          'setNamedItem',
          [newAttr]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[155]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[155]);
    },
    setAttributeNodeNS: function (newAttr) {
      return __hook__(newAttr => {
        return __hook__('()', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[156]), [
          'setNamedItemNS',
          [newAttr]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[156]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[156]);
    },
    removeAttributeNode: function (oldAttr) {
      return __hook__(oldAttr => {
        //console.log(this == oldAttr.ownerElement)
        return __hook__('()', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[157]), [
          'removeNamedItem',
          [__hook__('.', oldAttr, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[157])]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[157]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[157]);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var old = __hook__('()', this, [
          'getAttributeNodeNS',
          [
            namespaceURI,
            localName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[159]);
        old && __hook__('()', this, [
          'removeAttributeNode',
          [old]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[158]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[158]);
    },
    hasAttributeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        return __hook__('()', this, [
          'getAttributeNodeNS',
          [
            namespaceURI,
            localName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[160]) != null;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[160]);
    },
    getAttributeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var attr = __hook__('()', this, [
          'getAttributeNodeNS',
          [
            namespaceURI,
            localName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[162]);
        return attr && __hook__('.', attr, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[161]) || '';
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[161]);
    },
    setAttributeNS: function (namespaceURI, qualifiedName, value) {
      return __hook__((namespaceURI, qualifiedName, value) => {
        var attr = __hook__('()', __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[164]), [
          'createAttributeNS',
          [
            namespaceURI,
            qualifiedName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[164]);
        __hook__('=', attr, [
          'value',
          __hook__('=', attr, [
            'nodeValue',
            '' + value
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[163])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[163]);
        __hook__('()', this, [
          'setAttributeNode',
          [attr]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[163]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[163]);
    },
    getAttributeNodeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        return __hook__('()', __hook__('.', this, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[165]), [
          'getNamedItemNS',
          [
            namespaceURI,
            localName
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[165]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[165]);
    },
    getElementsByTagName: function (tagName) {
      return __hook__(tagName => {
        return __hook__(LiveNodeList, null, [
          this,
          function (base) {
            return __hook__(base => {
              var ls = [];
              __hook__(_visitNode, null, [
                base,
                function (node) {
                  return __hook__(node => {
                    if (node !== base && __hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]) == ELEMENT_NODE && (tagName === '*' || __hook__('.', node, ['tagName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]) == tagName)) {
                      __hook__('()', ls, [
                        'push',
                        [node]
                      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]);
                    }
                  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]);
                }
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166], 0);
              return ls;
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]);
          }
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166], true);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[166]);
    },
    getElementsByTagNameNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        return __hook__(LiveNodeList, null, [
          this,
          function (base) {
            return __hook__(base => {
              var ls = [];
              __hook__(_visitNode, null, [
                base,
                function (node) {
                  return __hook__(node => {
                    if (node !== base && __hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]) === ELEMENT_NODE && (namespaceURI === '*' || __hook__('.', node, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]) === namespaceURI) && (localName === '*' || __hook__('.', node, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]) == localName)) {
                      __hook__('()', ls, [
                        'push',
                        [node]
                      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]);
                    }
                  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]);
                }
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167], 0);
              return ls;
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]);
          }
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167], true);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[167]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__('=', __hook__('.', Document, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'getElementsByTagName',
  __hook__('.', __hook__('.', Element, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), ['getElementsByTagName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37])
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__('=', __hook__('.', Document, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'getElementsByTagNameNS',
  __hook__('.', __hook__('.', Element, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), ['getElementsByTagNameNS'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37])
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Element,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Attr() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[168]);
}
;
__hook__('=', __hook__('.', Attr, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  ATTRIBUTE_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Attr,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function CharacterData() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[169]);
}
;
__hook__('=', CharacterData, [
  'prototype',
  {
    data: '',
    substringData: function (offset, count) {
      return __hook__((offset, count) => {
        return __hook__('()', __hook__('.', this, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[170]), [
          'substring',
          [
            offset,
            offset + count
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[170]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[170]);
    },
    appendData: function (text) {
      return __hook__(text => {
        text = __hook__('.', this, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171]) + text;
        __hook__('=', this, [
          'nodeValue',
          __hook__('=', this, [
            'data',
            text
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171]);
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[171]);
    },
    insertData: function (offset, text) {
      return __hook__((offset, text) => {
        __hook__('()', this, [
          'replaceData',
          [
            offset,
            0,
            text
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[172]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[172]);
    },
    appendChild: function (newChild) {
      return __hook__(newChild => {
        throw __hook__($hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83], 'Error', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[173]], null, [__hook__('.', ExceptionMessage, [HIERARCHY_REQUEST_ERR], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83])], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83], true);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[83]);
    },
    deleteData: function (offset, count) {
      return __hook__((offset, count) => {
        __hook__('()', this, [
          'replaceData',
          [
            offset,
            count,
            ''
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[174]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[174]);
    },
    replaceData: function (offset, count, text) {
      return __hook__((offset, count, text) => {
        var start = __hook__('()', __hook__('.', this, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[176]), [
          'substring',
          [
            0,
            offset
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[176]);
        var end = __hook__('()', __hook__('.', this, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[177]), [
          'substring',
          [offset + count]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[177]);
        text = start + text + end;
        __hook__('=', this, [
          'nodeValue',
          __hook__('=', this, [
            'data',
            text
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[175])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[175]);
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[175])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[175]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[175]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  CharacterData,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Text() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[178]);
}
;
__hook__('=', Text, [
  'prototype',
  {
    nodeName: '#text',
    nodeType: TEXT_NODE,
    splitText: function (offset) {
      return __hook__(offset => {
        var text = __hook__('.', this, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[180]);
        var newText = __hook__('()', text, [
          'substring',
          [offset]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[181]);
        text = __hook__('()', text, [
          'substring',
          [
            0,
            offset
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]);
        __hook__('=', this, [
          'data',
          __hook__('=', this, [
            'nodeValue',
            text
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]);
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179])
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]);
        var newNode = __hook__('()', __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[182]), [
          'createTextNode',
          [newText]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[182]);
        if (__hook__('.', this, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179])) {
          __hook__('()', __hook__('.', this, ['parentNode'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]), [
            'insertBefore',
            [
              newNode,
              __hook__('.', this, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179])
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]);
        }
        return newNode;
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[179]);
    }
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Text,
  CharacterData
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Comment() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[183]);
}
;
__hook__('=', Comment, [
  'prototype',
  {
    nodeName: '#comment',
    nodeType: COMMENT_NODE
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Comment,
  CharacterData
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function CDATASection() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[184]);
}
;
__hook__('=', CDATASection, [
  'prototype',
  {
    nodeName: '#cdata-section',
    nodeType: CDATA_SECTION_NODE
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  CDATASection,
  CharacterData
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function DocumentType() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[185]);
}
;
__hook__('=', __hook__('.', DocumentType, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  DOCUMENT_TYPE_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  DocumentType,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Notation() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[186]);
}
;
__hook__('=', __hook__('.', Notation, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  NOTATION_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Notation,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function Entity() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[187]);
}
;
__hook__('=', __hook__('.', Entity, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  ENTITY_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  Entity,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function EntityReference() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[188]);
}
;
__hook__('=', __hook__('.', EntityReference, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  ENTITY_REFERENCE_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  EntityReference,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function DocumentFragment() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[189]);
}
;
__hook__('=', __hook__('.', DocumentFragment, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeName',
  '#document-fragment'
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__('=', __hook__('.', DocumentFragment, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  DOCUMENT_FRAGMENT_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  DocumentFragment,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function ProcessingInstruction() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[190]);
}
__hook__('=', __hook__('.', ProcessingInstruction, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'nodeType',
  PROCESSING_INSTRUCTION_NODE
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__(_extends, null, [
  ProcessingInstruction,
  Node
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 0);
function XMLSerializer() {
  return __hook__(() => {
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[191]);
}
__hook__('=', __hook__('.', XMLSerializer, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'serializeToString',
  function (node, isHtml, nodeFilter) {
    return __hook__((node, isHtml, nodeFilter) => {
      return __hook__('()', nodeSerializeToString, [
        'call',
        [
          node,
          isHtml,
          nodeFilter
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
    }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
  }
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__('=', __hook__('.', Node, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]), [
  'toString',
  nodeSerializeToString
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
function nodeSerializeToString(isHtml, nodeFilter) {
  return __hook__((isHtml, nodeFilter) => {
    var buf = [];
    var refNode = __hook__('.', this, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[193]) == 9 ? __hook__('.', this, ['documentElement'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[193]) : this;
    var prefix = __hook__('.', refNode, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[194]);
    var uri = __hook__('.', refNode, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[195]);
    if (uri && prefix == null) {
      //console.log(prefix)
      var prefix = __hook__('()', refNode, [
        'lookupPrefix',
        [uri]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[194]);
      if (prefix == null) {
        //isHTML = true;
        var visibleNamespaces = [{
            namespace: uri,
            prefix: null
          }  //{namespace:uri,prefix:''}
];
      }
    }
    __hook__(serializeToString, null, [
      this,
      buf,
      isHtml,
      nodeFilter,
      visibleNamespaces
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[192], 0);
    //console.log('###',this.nodeType,uri,prefix,buf.join(''))
    return __hook__('()', buf, [
      'join',
      ['']
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[192]);
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[192]);
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  return __hook__((node, isHTML, visibleNamespaces) => {
    var prefix = __hook__('.', node, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[197]) || '';
    var uri = __hook__('.', node, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[198]);
    if (!prefix && !uri) {
      return false;
    }
    if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace' || uri == 'http://www.w3.org/2000/xmlns/') {
      return false;
    }
    var i = __hook__('.', visibleNamespaces, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[199]);
    //console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
    while (i--) {
      var ns = __hook__('.', visibleNamespaces, [i], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[200]);
      // get namespace prefix
      //console.log(node.nodeType,node.tagName,ns.prefix,prefix)
      if (__hook__('.', ns, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[196]) == prefix) {
        return __hook__('.', ns, ['namespace'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[196]) != uri;
      }
    }
    //console.log(isHTML,uri,prefix=='')
    //if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
    //	return false;
    //}
    //node.flag = '11111'
    //console.error(3,true,node.flag,node.prefix,node.namespaceURI)
    return true;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[196]);
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  return __hook__((node, buf, isHTML, nodeFilter, visibleNamespaces) => {
    if (nodeFilter) {
      node = __hook__(nodeFilter, null, [node], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0);
      if (node) {
        if (typeof node == 'string') {
          __hook__('()', buf, [
            'push',
            [node]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
          return;
        }
      } else {
        return;
      }  //buf.sort.apply(attrs, attributeSorter);
    }
    switch (__hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])) {
    case ELEMENT_NODE:
      if (!visibleNamespaces)
        visibleNamespaces = [];
      var startVisibleNamespaces = __hook__('.', visibleNamespaces, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[202]);
      var attrs = __hook__('.', node, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[203]);
      var len = __hook__('.', attrs, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[204]);
      var child = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[205]);
      var nodeName = __hook__('.', node, ['tagName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[206]);
      isHTML = htmlns === __hook__('.', node, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]) || isHTML;
      __hook__('()', buf, [
        'push',
        [
          '<',
          nodeName
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      for (var i = 0; i < len; i++) {
        // add namespaces for attributes
        var attr = __hook__('()', attrs, [
          'item',
          [i]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[207]);
        if (__hook__('.', attr, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]) == 'xmlns') {
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: __hook__('.', attr, ['localName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[208]),
                namespace: __hook__('.', attr, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[209])
              }]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        } else if (__hook__('.', attr, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]) == 'xmlns') {
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: '',
                namespace: __hook__('.', attr, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[209])
              }]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = __hook__('()', attrs, [
          'item',
          [i]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[207]);
        if (__hook__(needNamespaceDefine, null, [
            attr,
            isHTML,
            visibleNamespaces
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0)) {
          var prefix = __hook__('.', attr, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[208]) || '';
          var uri = __hook__('.', attr, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[210]);
          var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
          __hook__('()', buf, [
            'push',
            [
              ns,
              '="',
              uri,
              '"'
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: prefix,
                namespace: uri
              }]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        }
        __hook__(serializeToString, null, [
          attr,
          buf,
          isHTML,
          nodeFilter,
          visibleNamespaces
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0);
      }
      // add namespace for current node		
      if (__hook__(needNamespaceDefine, null, [
          node,
          isHTML,
          visibleNamespaces
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0)) {
        var prefix = __hook__('.', node, ['prefix'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[208]) || '';
        var uri = __hook__('.', node, ['namespaceURI'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[210]);
        var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
        __hook__('()', buf, [
          'push',
          [
            ns,
            '="',
            uri,
            '"'
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        __hook__('()', visibleNamespaces, [
          'push',
          [{
              prefix: prefix,
              namespace: uri
            }]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      }
      if (child || isHTML && !__hook__('()', /^(?:meta|link|img|br|hr|input)$/i, [
          'test',
          [nodeName]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])) {
        __hook__('()', buf, [
          'push',
          ['>']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        //if is cdata child node
        if (isHTML && __hook__('()', /^script$/i, [
            'test',
            [nodeName]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])) {
          while (child) {
            if (__hook__('.', child, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])) {
              __hook__('()', buf, [
                'push',
                [__hook__('.', child, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])]
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
            } else {
              __hook__(serializeToString, null, [
                child,
                buf,
                isHTML,
                nodeFilter,
                visibleNamespaces
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0);
            }
            child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
          }
        } else {
          while (child) {
            __hook__(serializeToString, null, [
              child,
              buf,
              isHTML,
              nodeFilter,
              visibleNamespaces
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0);
            child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
          }
        }
        __hook__('()', buf, [
          'push',
          [
            '</',
            nodeName,
            '>'
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      } else {
        __hook__('()', buf, [
          'push',
          ['/>']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      }
      // remove added visible namespaces
      //visibleNamespaces.length = startVisibleNamespaces;
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[205]);
      while (child) {
        __hook__(serializeToString, null, [
          child,
          buf,
          isHTML,
          nodeFilter,
          visibleNamespaces
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201], 0);
        child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      }
      return;
    case ATTRIBUTE_NODE:
      return __hook__('()', buf, [
        'push',
        [
          ' ',
          __hook__('.', node, ['name'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          '="',
          __hook__('()', __hook__('.', node, ['value'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]), [
            'replace',
            [
              /[<&"]/g,
              _xmlEncoder
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          '"'
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    case TEXT_NODE:
      return __hook__('()', buf, [
        'push',
        [__hook__('()', __hook__('.', node, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]), [
            'replace',
            [
              /[<&]/g,
              _xmlEncoder
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    case CDATA_SECTION_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<![CDATA[',
          __hook__('.', node, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          ']]>'
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    case COMMENT_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<!--',
          __hook__('.', node, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          '-->'
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    case DOCUMENT_TYPE_NODE:
      var pubid = __hook__('.', node, ['publicId'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[211]);
      var sysid = __hook__('.', node, ['systemId'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[212]);
      __hook__('()', buf, [
        'push',
        [
          '<!DOCTYPE ',
          __hook__('.', node, ['name'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      if (pubid) {
        __hook__('()', buf, [
          'push',
          [
            ' PUBLIC "',
            pubid
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        if (sysid && sysid != '.') {
          __hook__('()', buf, [
            'push',
            [
              '" "',
              sysid
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        }
        __hook__('()', buf, [
          'push',
          ['">']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      } else if (sysid && sysid != '.') {
        __hook__('()', buf, [
          'push',
          [
            ' SYSTEM "',
            sysid,
            '">'
          ]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      } else {
        var sub = __hook__('.', node, ['internalSubset'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[213]);
        if (sub) {
          __hook__('()', buf, [
            'push',
            [
              ' [',
              sub,
              ']'
            ]
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
        }
        __hook__('()', buf, [
          'push',
          ['>']
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<?',
          __hook__('.', node, ['target'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          ' ',
          __hook__('.', node, ['data'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          '?>'
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    case ENTITY_REFERENCE_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '&',
          __hook__('.', node, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]),
          ';'
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    //case ENTITY_NODE:
    //case NOTATION_NODE:
    default:
      __hook__('()', buf, [
        'push',
        [
          '??',
          __hook__('.', node, ['nodeName'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201])
        ]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
    }
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[201]);
}
function importNode(doc, node, deep) {
  return __hook__((doc, node, deep) => {
    var node2;
    switch (__hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120])) {
    case ELEMENT_NODE:
      node2 = __hook__('()', node, [
        'cloneNode',
        [false]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
      __hook__('=', node2, [
        'ownerDocument',
        doc
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}
    case DOCUMENT_FRAGMENT_NODE:
      break;
    case ATTRIBUTE_NODE:
      deep = true;
      break;  //case ENTITY_REFERENCE_NODE:
              //case PROCESSING_INSTRUCTION_NODE:
              ////case TEXT_NODE:
              //case CDATA_SECTION_NODE:
              //case COMMENT_NODE:
              //	deep = false;
              //	break;
              //case DOCUMENT_NODE:
              //case DOCUMENT_TYPE_NODE:
              //cannot be imported.
              //case ENTITY_NODE:
              //case NOTATION_NODE：
              //can not hit in level3
              //default:throw e;
    }
    if (!node2) {
      node2 = __hook__('()', node, [
        'cloneNode',
        [false]
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);  //false
    }
    __hook__('=', node2, [
      'ownerDocument',
      doc
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
    __hook__('=', node2, [
      'parentNode',
      null
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
    if (deep) {
      var child = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[214]);
      while (child) {
        __hook__('()', node2, [
          'appendChild',
          [__hook__(importNode, null, [
              doc,
              child,
              deep
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120], 0)]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
        child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
      }
    }
    return node2;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[120]);
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc, node, deep) {
  return __hook__((doc, node, deep) => {
    var node2 = __hook__(__hook__('.', node, ['constructor'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[215]), null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[215], true);
    for (var n in __hook__('*', node, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85])) {
      var v = __hook__('.', node, [n], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[216]);
      if (typeof v != 'object') {
        if (v != __hook__('.', node2, [n], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85])) {
          __hook__('=', node2, [
            n,
            v
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
        }
      }
    }
    if (__hook__('.', node, ['childNodes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85])) {
      __hook__('=', node2, [
        'childNodes',
        __hook__(NodeList, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85], true)
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
    }
    __hook__('=', node2, [
      'ownerDocument',
      doc
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
    switch (__hook__('.', node2, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85])) {
    case ELEMENT_NODE:
      var attrs = __hook__('.', node, ['attributes'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[217]);
      var attrs2 = __hook__('=', node2, [
        'attributes',
        __hook__(NamedNodeMap, null, [], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[218], true)
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[218]);
      var len = __hook__('.', attrs, ['length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[219]);
      __hook__('=', attrs2, [
        '_ownerElement',
        node2
      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
      for (var i = 0; i < len; i++) {
        __hook__('()', node2, [
          'setAttributeNode',
          [__hook__(cloneNode, null, [
              doc,
              __hook__('()', attrs, [
                'item',
                [i]
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]),
              true
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85], 0)]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
      }
      break;
      ;
    case ATTRIBUTE_NODE:
      deep = true;
    }
    if (deep) {
      var child = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[220]);
      while (child) {
        __hook__('()', node2, [
          'appendChild',
          [__hook__(cloneNode, null, [
              doc,
              child,
              deep
            ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85], 0)]
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
        child = __hook__('.', child, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
      }
    }
    return node2;
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[85]);
}
function __set__(object, key, value) {
  return __hook__((object, key, value) => {
    __hook__('=', object, [
      key,
      value
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[221]);
  }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[221]);
}
//do dynamic
try {
  if (__hook__('.', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 'Object', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[222]], ['defineProperty'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37])) {
    __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 'Object', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[222]], [
      'defineProperty',
      [
        __hook__('.', LiveNodeList, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]),
        'length',
        {
          get: function () {
            return __hook__(() => {
              __hook__(_updateLiveList, null, [this], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[223], 0);
              return __hook__('.', this, ['$$length'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[223]);
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[223]);
          }
        }
      ]
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
    __hook__('()', $hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37], 'Object', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[222]], [
      'defineProperty',
      [
        __hook__('.', Node, ['prototype'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]),
        'textContent',
        {
          get: function () {
            return __hook__(() => {
              return __hook__(getTextContent, null, [this], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[223], 0);
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[223]);
          },
          set: function (data) {
            return __hook__(data => {
              switch (__hook__('.', this, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224])) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (__hook__('.', this, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224])) {
                  __hook__('()', this, [
                    'removeChild',
                    [__hook__('.', this, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224])]
                  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
                }
                if (data || __hook__($hook$.global(__hook__, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224], 'String', 'get')[__dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[225]], null, [data], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224], 0)) {
                  __hook__('()', this, [
                    'appendChild',
                    [__hook__('()', __hook__('.', this, ['ownerDocument'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]), [
                        'createTextNode',
                        [data]
                      ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224])]
                  ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
                }
                break;
              default:
                //TODO:
                __hook__('=', this, [
                  'data',
                  data
                ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
                __hook__('=', this, [
                  'value',
                  data
                ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
                __hook__('=', this, [
                  'nodeValue',
                  data
                ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
              }
            }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[224]);
          }
        }
      ]
    ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
    function getTextContent(node) {
      return __hook__(node => {
        switch (__hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226])) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = __hook__('.', node, ['firstChild'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
          while (node) {
            if (__hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]) !== 7 && __hook__('.', node, ['nodeType'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]) !== 8) {
              __hook__('()', buf, [
                'push',
                [__hook__(getTextContent, null, [node], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226], 0)]
              ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
            }
            node = __hook__('.', node, ['nextSibling'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
          }
          return __hook__('()', buf, [
            'join',
            ['']
          ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
        default:
          return __hook__('.', node, ['nodeValue'], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
        }
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[226]);
    }
    __set__ = function (object, key, value) {
      return __hook__((object, key, value) => {
        //console.log(value)
        __hook__('=', object, [
          '$$' + key,
          value
        ], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
      }, null, arguments, __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
    };
  }
} catch (e) {
}
//if(typeof require == 'function'){
__hook__('=', exports, [
  'DOMImplementation',
  DOMImplementation
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);
__hook__('=', exports, [
  'XMLSerializer',
  XMLSerializer
], __dc5db26c0fbf5be66b093a379416795d2b22fa7708991cb8afa47defc8e19598__[37]);  //}

},{}],8:[function(require,module,exports){
//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
const __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__ = $hook$.$(__hook__, [
  '/components/thin-hook/node_modules/xmldom/sax.js,nameChar',
  '_uNpREdiC4aB1e_RegExp;/components/thin-hook/node_modules/xmldom/sax.js,nameChar',
  '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern',
  '_uNpREdiC4aB1e_RegExp;/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern',
  '/components/thin-hook/node_modules/xmldom/sax.js,XMLReader',
  '/components/thin-hook/node_modules/xmldom/sax.js',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,domBuilder',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,fixedFromCharCode',
  '_uNpREdiC4aB1e_String;/components/thin-hook/node_modules/xmldom/sax.js,parse,fixedFromCharCode',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer,k',
  '_uNpREdiC4aB1e_parseInt;/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText,xt',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,position',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,locator',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,tagStart',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,doc',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,text',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,end',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,tagName',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,config',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,localNSMap',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,endMatch',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,endIgnoreCaseMach',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,el',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,currentNSMap',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,len',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,locator2',
  '/components/thin-hook/node_modules/xmldom/sax.js,parse,a',
  '_uNpREdiC4aB1e_Math;/components/thin-hook/node_modules/xmldom/sax.js,parse',
  '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,c',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,value',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,tagName',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,tagName',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,i',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,a',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,qName',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,value',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,nsp',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,prefix',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,localName',
  '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,ns',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent,elEndStart',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent,text',
  '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed',
  '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed,pos',
  '/components/thin-hook/node_modules/xmldom/sax.js,_copy',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,next',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,end',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,matchs',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,len',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,name',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,sysid',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,lastMatch',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,end',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,match',
  '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,len',
  '/components/thin-hook/node_modules/xmldom/sax.js,ElementAttributes',
  '/components/thin-hook/node_modules/xmldom/sax.js,setTagName',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/sax.js,setTagName',
  '/components/thin-hook/node_modules/xmldom/sax.js,add',
  '_uNpREdiC4aB1e_Error;/components/thin-hook/node_modules/xmldom/sax.js,add',
  '/components/thin-hook/node_modules/xmldom/sax.js,getLocalName',
  '/components/thin-hook/node_modules/xmldom/sax.js,getLocator',
  '/components/thin-hook/node_modules/xmldom/sax.js,getQName',
  '/components/thin-hook/node_modules/xmldom/sax.js,getURI',
  '/components/thin-hook/node_modules/xmldom/sax.js,getValue',
  '/components/thin-hook/node_modules/xmldom/sax.js,_set_proto_',
  '/components/thin-hook/node_modules/xmldom/sax.js,p',
  '/components/thin-hook/node_modules/xmldom/sax.js,split'
]);
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
//\u10000-\uEFFFF
var nameChar = __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[0], 'RegExp', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[1]], null, ['[\\-\\.0-9' + __hook__('()', __hook__('.', nameStartChar, ['source'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[0]), [
    'slice',
    [
      1,
      -1
    ]
  ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[0]) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[0], true);
var tagNamePattern = __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2], 'RegExp', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[3]], null, ['^' + __hook__('.', nameStartChar, ['source'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2]) + __hook__('.', nameChar, ['source'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2]) + '*(?::' + __hook__('.', nameStartChar, ['source'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2]) + __hook__('.', nameChar, ['source'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2]) + '*)?$'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[2], true);
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;
//tag name offerring
var S_ATTR = 1;
//attr name offerring 
var S_ATTR_SPACE = 2;
//attr name end and space offer
var S_EQ = 3;
//=space?
var S_ATTR_NOQUOT_VALUE = 4;
//attr value(no quot value only)
var S_ATTR_END = 5;
//attr value end and no space(quot end)
var S_TAG_SPACE = 6;
//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;
//closed el<el />
function XMLReader() {
  return __hook__(() => {
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[4]);
}
__hook__('=', XMLReader, [
  'prototype',
  {
    parse: function (source, defaultNSMap, entityMap) {
      return __hook__((source, defaultNSMap, entityMap) => {
        var domBuilder = __hook__('.', this, ['domBuilder'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[7]);
        __hook__('()', domBuilder, [
          'startDocument',
          []
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
        __hook__(_copy, null, [
          defaultNSMap,
          defaultNSMap = {}
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
        __hook__(parse, null, [
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          __hook__('.', this, ['errorHandler'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
        __hook__('()', domBuilder, [
          'endDocument',
          []
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
    }
  }
], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  return __hook__((source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) => {
    function fixedFromCharCode(code) {
      return __hook__(code => {
        // String.prototype.fromCharCode does not supports
        // > 2 bytes unicode chars directly
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return __hook__('()', $hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[8], 'String', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[9]], [
            'fromCharCode',
            [
              surrogate1,
              surrogate2
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[8]);
        } else {
          return __hook__('()', $hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[8], 'String', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[9]], [
            'fromCharCode',
            [code]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[8]);
        }
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[8]);
    }
    function entityReplacer(a) {
      return __hook__(a => {
        var k = __hook__('()', a, [
          'slice',
          [
            1,
            -1
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[11]);
        if (__hook__('in', entityMap, [k], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10])) {
          return __hook__('.', entityMap, [k], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10]);
        } else if (__hook__('()', k, [
            'charAt',
            [0]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10]) === '#') {
          return __hook__(fixedFromCharCode, null, [__hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10], 'parseInt', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[12]], null, [__hook__('()', __hook__('()', k, [
                'substr',
                [1]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10]), [
                'replace',
                [
                  'x',
                  '0x'
                ]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10])], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10], 0)], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10], 0);
        } else {
          __hook__('()', errorHandler, [
            'error',
            ['entity not found:' + a]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10]);
          return a;
        }
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[10]);
    }
    function appendText(end) {
      return __hook__(end => {
        //has some bugs
        if (end > start) {
          var xt = __hook__('()', __hook__('()', source, [
            'substring',
            [
              start,
              end
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[14]), [
            'replace',
            [
              /&#?\w+;/g,
              entityReplacer
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[14]);
          locator && __hook__(position, null, [start], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[13], 0);
          __hook__('()', domBuilder, [
            'characters',
            [
              xt,
              0,
              end - start
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[13]);
          start = end;
        }
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[13]);
    }
    function position(p, m) {
      return __hook__((p, m) => {
        while (p >= lineEnd && (m = __hook__('()', linePattern, [
            'exec',
            [source]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]))) {
          lineStart = __hook__('.', m, ['index'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]);
          lineEnd = lineStart + __hook__('.', __hook__('.', m, [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]), ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]);
          __hook__('p++', locator, ['lineNumber'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]);  //console.log('line++:',locator,startPos,endPos)
        }
        __hook__('=', locator, [
          'columnNumber',
          p - lineStart + 1
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[15]);
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /.*(?:\r\n?|\n)|.*$/g;
    var locator = __hook__('.', domBuilder, ['locator'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[16]);
    var parseStack = [{ currentNSMap: defaultNSMapCopy }];
    var closeMap = {};
    var start = 0;
    while (true) {
      try {
        var tagStart = __hook__('()', source, [
          'indexOf',
          [
            '<',
            start
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[17]);
        if (tagStart < 0) {
          if (!__hook__('()', __hook__('()', source, [
              'substr',
              [start]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]), [
              'match',
              [/^\s*$/]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
            var doc = __hook__('.', domBuilder, ['doc'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[18]);
            var text = __hook__('()', doc, [
              'createTextNode',
              [__hook__('()', source, [
                  'substr',
                  [start]
                ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[19])]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[19]);
            __hook__('()', doc, [
              'appendChild',
              [text]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            __hook__('=', domBuilder, [
              'currentElement',
              text
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
          }
          return;
        }
        if (tagStart > start) {
          __hook__(appendText, null, [tagStart], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
        }
        switch (__hook__('()', source, [
            'charAt',
            [tagStart + 1]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
        case '/':
          var end = __hook__('()', source, [
            'indexOf',
            [
              '>',
              tagStart + 3
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[20]);
          var tagName = __hook__('()', source, [
            'substring',
            [
              tagStart + 2,
              end
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[21]);
          var config = __hook__('()', parseStack, [
            'pop',
            []
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[22]);
          if (end < 0) {
            tagName = __hook__('()', __hook__('()', source, [
              'substring',
              [tagStart + 2]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]), [
              'replace',
              [
                /[\s<].*/,
                ''
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            //console.error('#@@@@@@'+tagName)
            __hook__('()', errorHandler, [
              'error',
              ['end tag name: ' + tagName + ' is not complete:' + __hook__('.', config, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            end = tagStart + 1 + __hook__('.', tagName, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
          } else if (__hook__('()', tagName, [
              'match',
              [/\s</]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
            tagName = __hook__('()', tagName, [
              'replace',
              [
                /[\s<].*/,
                ''
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            __hook__('()', errorHandler, [
              'error',
              ['end tag name: ' + tagName + ' maybe not complete']
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            end = tagStart + 1 + __hook__('.', tagName, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
          }
          //console.error(parseStack.length,parseStack)
          //console.error(config);
          var localNSMap = __hook__('.', config, ['localNSMap'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[23]);
          var endMatch = __hook__('.', config, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[24]) == tagName;
          var endIgnoreCaseMach = endMatch || __hook__('.', config, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[25]) && __hook__('()', __hook__('.', config, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[25]), [
            'toLowerCase',
            []
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[25]) == __hook__('()', tagName, [
            'toLowerCase',
            []
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[25]);
          if (endIgnoreCaseMach) {
            __hook__('()', domBuilder, [
              'endElement',
              [
                __hook__('.', config, ['uri'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]),
                __hook__('.', config, ['localName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]),
                tagName
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            if (localNSMap) {
              for (var prefix in __hook__('*', localNSMap, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
                __hook__('()', domBuilder, [
                  'endPrefixMapping',
                  [prefix]
                ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
              }
            }
            if (!endMatch) {
              __hook__('()', errorHandler, [
                'fatalError',
                ['end tag name: ' + tagName + ' is not match the current start tagName:' + __hook__('.', config, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            }
          } else {
            __hook__('()', parseStack, [
              'push',
              [config]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
          }
          end++;
          break;
        // end elment
        case '?':
          // <?...?>
          locator && __hook__(position, null, [tagStart], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          end = __hook__(parseInstruction, null, [
            source,
            tagStart,
            domBuilder
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          break;
        case '!':
          // <!doctype,<![CDATA,<!--
          locator && __hook__(position, null, [tagStart], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          end = __hook__(parseDCC, null, [
            source,
            tagStart,
            domBuilder,
            errorHandler
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          break;
        default:
          locator && __hook__(position, null, [tagStart], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          var el = __hook__(ElementAttributes, null, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[26], true);
          var currentNSMap = __hook__('.', __hook__('.', parseStack, [__hook__('.', parseStack, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[27]) - 1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[27]), ['currentNSMap'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[27]);
          //elStartEnd
          var end = __hook__(parseElementStartPart, null, [
            source,
            tagStart,
            el,
            currentNSMap,
            entityReplacer,
            errorHandler
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[20], 0);
          var len = __hook__('.', el, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[28]);
          if (!__hook__('.', el, ['closed'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]) && __hook__(fixSelfClosed, null, [
              source,
              end,
              __hook__('.', el, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]),
              closeMap
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0)) {
            __hook__('=', el, [
              'closed',
              true
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            if (!__hook__('.', entityMap, ['nbsp'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
              __hook__('()', errorHandler, [
                'warning',
                ['unclosed xml attribute']
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            }
          }
          if (locator && len) {
            var locator2 = __hook__(copyLocator, null, [
              locator,
              {}
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[29], 0);
            //try{//attribute position fixed
            for (var i = 0; i < len; i++) {
              var a = __hook__('.', el, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[30]);
              __hook__(position, null, [__hook__('.', a, ['offset'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
              __hook__('=', a, [
                'locator',
                __hook__(copyLocator, null, [
                  locator,
                  {}
                ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0)
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            }
            //}catch(e){console.error('@@@@@'+e)}
            __hook__('=', domBuilder, [
              'locator',
              locator2
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            if (__hook__(appendElement, null, [
                el,
                domBuilder,
                currentNSMap
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0)) {
              __hook__('()', parseStack, [
                'push',
                [el]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            }
            __hook__('=', domBuilder, [
              'locator',
              locator
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
          } else {
            if (__hook__(appendElement, null, [
                el,
                domBuilder,
                currentNSMap
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0)) {
              __hook__('()', parseStack, [
                'push',
                [el]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
            }
          }
          if (__hook__('.', el, ['uri'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]) === 'http://www.w3.org/1999/xhtml' && !__hook__('.', el, ['closed'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6])) {
            end = __hook__(parseHtmlSpecialContent, null, [
              source,
              end,
              __hook__('.', el, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]),
              entityReplacer,
              domBuilder
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
          } else {
            end++;
          }
        }
      } catch (e) {
        __hook__('()', errorHandler, [
          'error',
          ['element parse error: ' + e]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
        //errorHandler.error('element parse error: '+e);
        end = -1;  //throw e;
      }
      if (end > start) {
        start = end;
      } else {
        //TODO: 这里有可能sax回退，有位置错误风险
        __hook__(appendText, null, [__hook__('()', $hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 'Math', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[31]], [
            'max',
            [
              tagStart,
              start
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]) + 1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6], 0);
      }
    }
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[6]);
}
function copyLocator(f, t) {
  return __hook__((f, t) => {
    __hook__('=', t, [
      'lineNumber',
      __hook__('.', f, ['lineNumber'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[32])
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[32]);
    __hook__('=', t, [
      'columnNumber',
      __hook__('.', f, ['columnNumber'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[32])
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[32]);
    return t;
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[32]);
}
/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
  return __hook__((source, start, el, currentNSMap, entityReplacer, errorHandler) => {
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG;
    //status
    while (true) {
      var c = __hook__('()', source, [
        'charAt',
        [p]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[34]);
      switch (c) {
      case '=':
        if (s === S_ATTR) {
          //attrName
          attrName = __hook__('()', source, [
            'slice',
            [
              start,
              p
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          //fatalError: equal must after attrName or space after attrName
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['attribute equal must after attrName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
        }
        break;
      case '\'':
      case '"':
        if (s === S_EQ || s === S_ATTR  //|| s == S_ATTR_SPACE
) {
          //equal
          if (s === S_ATTR) {
            __hook__('()', errorHandler, [
              'warning',
              ['attribute value must after "="']
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            attrName = __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          }
          start = p + 1;
          p = __hook__('()', source, [
            'indexOf',
            [
              c,
              start
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          if (p > 0) {
            value = __hook__('()', __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]), [
              'replace',
              [
                /&#?\w+;/g,
                entityReplacer
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            __hook__('()', el, [
              'add',
              [
                attrName,
                value,
                start - 1
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            s = S_ATTR_END;
          } else {
            //fatalError: no end quot match
            throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['attribute value no end \'' + c + '\' match'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = __hook__('()', __hook__('()', source, [
            'slice',
            [
              start,
              p
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]), [
            'replace',
            [
              /&#?\w+;/g,
              entityReplacer
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          //console.log(attrName,value,start,p)
          __hook__('()', el, [
            'add',
            [
              attrName,
              value,
              start
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          //console.dir(el)
          __hook__('()', errorHandler, [
            'warning',
            ['attribute "' + attrName + '" missed start quot(' + c + ')!!']
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          start = p + 1;
          s = S_ATTR_END;
        } else {
          //fatalError: no equal before
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['attribute value must after "="'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
        }
        break;
      case '/':
        switch (s) {
        case S_TAG:
          __hook__('()', el, [
            'setTagName',
            [__hook__('()', source, [
                'slice',
                [
                  start,
                  p
                ]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
        case S_ATTR_END:
        case S_TAG_SPACE:
        case S_TAG_CLOSE:
          s = S_TAG_CLOSE;
          __hook__('=', el, [
            'closed',
            true
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
        case S_ATTR_NOQUOT_VALUE:
        case S_ATTR:
        case S_ATTR_SPACE:
          break;
        //case S_EQ:
        default:
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['attribute invalid close char(\'/\')'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
        }
        break;
      case '':
        //end document
        //throw new Error('unexpected end of input')
        __hook__('()', errorHandler, [
          'error',
          ['unexpected end of input']
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
        if (s == S_TAG) {
          __hook__('()', el, [
            'setTagName',
            [__hook__('()', source, [
                'slice',
                [
                  start,
                  p
                ]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
        }
        return p;
      case '>':
        switch (s) {
        case S_TAG:
          __hook__('()', el, [
            'setTagName',
            [__hook__('()', source, [
                'slice',
                [
                  start,
                  p
                ]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
        case S_ATTR_END:
        case S_TAG_SPACE:
        case S_TAG_CLOSE:
          break;
        //normal
        case S_ATTR_NOQUOT_VALUE:
        //Compatible state
        case S_ATTR:
          value = __hook__('()', source, [
            'slice',
            [
              start,
              p
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          if (__hook__('()', value, [
              'slice',
              [-1]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]) === '/') {
            __hook__('=', el, [
              'closed',
              true
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            value = __hook__('()', value, [
              'slice',
              [
                0,
                -1
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          }
        case S_ATTR_SPACE:
          if (s === S_ATTR_SPACE) {
            value = attrName;
          }
          if (s == S_ATTR_NOQUOT_VALUE) {
            __hook__('()', errorHandler, [
              'warning',
              ['attribute "' + value + '" missed quot(")!!']
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            __hook__('()', el, [
              'add',
              [
                attrName,
                __hook__('()', value, [
                  'replace',
                  [
                    /&#?\w+;/g,
                    entityReplacer
                  ]
                ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]),
                start
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          } else {
            if (__hook__('.', currentNSMap, [''], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]) !== 'http://www.w3.org/1999/xhtml' || !__hook__('()', value, [
                'match',
                [/^(?:disabled|checked|selected)$/i]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])) {
              __hook__('()', errorHandler, [
                'warning',
                ['attribute "' + value + '" missed value!! "' + value + '" instead!!']
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            }
            __hook__('()', el, [
              'add',
              [
                value,
                value,
                start
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          }
          break;
        case S_EQ:
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['attribute value missed!!'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
        }
        //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p;
      /*xml space '\x20' | #x9 | #xD | #xA; */
      case '\x80':
        c = ' ';
      default:
        if (c <= ' ') {
          //space
          switch (s) {
          case S_TAG:
            __hook__('()', el, [
              'setTagName',
              [__hook__('()', source, [
                  'slice',
                  [
                    start,
                    p
                  ]
                ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            //tagName
            s = S_TAG_SPACE;
            break;
          case S_ATTR:
            attrName = __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            s = S_ATTR_SPACE;
            break;
          case S_ATTR_NOQUOT_VALUE:
            var value = __hook__('()', __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[36]), [
              'replace',
              [
                /&#?\w+;/g,
                entityReplacer
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[36]);
            __hook__('()', errorHandler, [
              'warning',
              ['attribute "' + value + '" missed quot(")!!']
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            __hook__('()', el, [
              'add',
              [
                attrName,
                value,
                start
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          case S_ATTR_END:
            s = S_TAG_SPACE;
            break;  //case S_TAG_SPACE:
                    //case S_EQ:
                    //case S_ATTR_SPACE:
                    //	void();break;
                    //case S_TAG_CLOSE:
                    //ignore warning
          }
        } else {
          //not space
          //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
          //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
          switch (s) {
          //case S_TAG:void();break;
          //case S_ATTR:void();break;
          //case S_ATTR_NOQUOT_VALUE:void();break;
          case S_ATTR_SPACE:
            var tagName = __hook__('.', el, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[37]);
            if (__hook__('.', currentNSMap, [''], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]) !== 'http://www.w3.org/1999/xhtml' || !__hook__('()', attrName, [
                'match',
                [/^(?:disabled|checked|selected)$/i]
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33])) {
              __hook__('()', errorHandler, [
                'warning',
                ['attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!']
              ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            }
            __hook__('()', el, [
              'add',
              [
                attrName,
                attrName,
                start
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
            start = p;
            s = S_ATTR;
            break;
          case S_ATTR_END:
            __hook__('()', errorHandler, [
              'warning',
              ['attribute space is required"' + attrName + '"!!']
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
          case S_TAG_SPACE:
            s = S_ATTR;
            start = p;
            break;
          case S_EQ:
            s = S_ATTR_NOQUOT_VALUE;
            start = p;
            break;
          case S_TAG_CLOSE:
            throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[35]], null, ['elements closed character \'/\' and \'>\' must be connected to'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33], true);
          }
        }
      }
      //end outer switch
      //console.log('p++',p)
      p++;
    }
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[33]);
}
/**
 * @return true if has new namespace define
 */
function appendElement(el, domBuilder, currentNSMap) {
  return __hook__((el, domBuilder, currentNSMap) => {
    var tagName = __hook__('.', el, ['tagName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[39]);
    var localNSMap = null;
    //var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
    var i = __hook__('.', el, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[40]);
    while (i--) {
      var a = __hook__('.', el, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[41]);
      var qName = __hook__('.', a, ['qName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[42]);
      var value = __hook__('.', a, ['value'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[43]);
      var nsp = __hook__('()', qName, [
        'indexOf',
        [':']
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[44]);
      if (nsp > 0) {
        var prefix = __hook__('=', a, [
          'prefix',
          __hook__('()', qName, [
            'slice',
            [
              0,
              nsp
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[45])
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[45]);
        var localName = __hook__('()', qName, [
          'slice',
          [nsp + 1]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[46]);
        var nsPrefix = prefix === 'xmlns' && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === 'xmlns' && '';
      }
      //can not set prefix,because prefix !== ''
      __hook__('=', a, [
        'localName',
        localName
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      //prefix == null for no ns prefix attribute 
      if (nsPrefix !== false) {
        //hack!!
        if (localNSMap == null) {
          localNSMap = {};
          //console.log(currentNSMap,0)
          __hook__(_copy, null, [
            currentNSMap,
            currentNSMap = {}
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38], 0)  //console.log(currentNSMap,1)
;
        }
        __hook__('=', currentNSMap, [
          nsPrefix,
          __hook__('=', localNSMap, [
            nsPrefix,
            value
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
        __hook__('=', a, [
          'uri',
          'http://www.w3.org/2000/xmlns/'
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
        __hook__('()', domBuilder, [
          'startPrefixMapping',
          [
            nsPrefix,
            value
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      }
    }
    var i = __hook__('.', el, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[40]);
    while (i--) {
      a = __hook__('.', el, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      var prefix = __hook__('.', a, ['prefix'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[45]);
      if (prefix) {
        //no prefix attribute has no namespace
        if (prefix === 'xml') {
          __hook__('=', a, [
            'uri',
            'http://www.w3.org/XML/1998/namespace'
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
        }
        if (prefix !== 'xmlns') {
          __hook__('=', a, [
            'uri',
            __hook__('.', currentNSMap, [prefix || ''], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])  //{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
        }
      }
    }
    var nsp = __hook__('()', tagName, [
      'indexOf',
      [':']
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[44]);
    if (nsp > 0) {
      prefix = __hook__('=', el, [
        'prefix',
        __hook__('()', tagName, [
          'slice',
          [
            0,
            nsp
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      localName = __hook__('=', el, [
        'localName',
        __hook__('()', tagName, [
          'slice',
          [nsp + 1]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
    } else {
      prefix = null;
      //important!!
      localName = __hook__('=', el, [
        'localName',
        tagName
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
    }
    //no prefix element has default namespace
    var ns = __hook__('=', el, [
      'uri',
      __hook__('.', currentNSMap, [prefix || ''], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[47])
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[47]);
    __hook__('()', domBuilder, [
      'startElement',
      [
        ns,
        localName,
        tagName,
        el
      ]
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
    //endPrefixMapping and startPrefixMapping have not any help for dom builder
    //localNSMap = null
    if (__hook__('.', el, ['closed'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])) {
      __hook__('()', domBuilder, [
        'endElement',
        [
          ns,
          localName,
          tagName
        ]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      if (localNSMap) {
        for (prefix in __hook__('*', localNSMap, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38])) {
          __hook__('()', domBuilder, [
            'endPrefixMapping',
            [prefix]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
        }
      }
    } else {
      __hook__('=', el, [
        'currentNSMap',
        currentNSMap
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      __hook__('=', el, [
        'localNSMap',
        localNSMap
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
      //parseStack.push(el);
      return true;
    }
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[38]);
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  return __hook__((source, elStartEnd, tagName, entityReplacer, domBuilder) => {
    if (__hook__('()', /^(?:script|textarea)$/i, [
        'test',
        [tagName]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48])) {
      var elEndStart = __hook__('()', source, [
        'indexOf',
        [
          '</' + tagName + '>',
          elStartEnd
        ]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[49]);
      var text = __hook__('()', source, [
        'substring',
        [
          elStartEnd + 1,
          elEndStart
        ]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[50]);
      if (__hook__('()', /[&<]/, [
          'test',
          [text]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48])) {
        if (__hook__('()', /^script$/i, [
            'test',
            [tagName]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48])) {
          //if(!/\]\]>/.test(text)){
          //lexHandler.startCDATA();
          __hook__('()', domBuilder, [
            'characters',
            [
              text,
              0,
              __hook__('.', text, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48])
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48]);
          //lexHandler.endCDATA();
          return elEndStart;  //}
        }
        //}else{//text area
        text = __hook__('()', text, [
          'replace',
          [
            /&#?\w+;/g,
            entityReplacer
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48]);
        __hook__('()', domBuilder, [
          'characters',
          [
            text,
            0,
            __hook__('.', text, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48])
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48]);
        return elEndStart;  //}
      }
    }
    return elStartEnd + 1;
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[48]);
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  return __hook__((source, elStartEnd, tagName, closeMap) => {
    //if(tagName in closeMap){
    var pos = __hook__('.', closeMap, [tagName], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[52]);
    if (pos == null) {
      //console.log(tagName)
      pos = __hook__('()', source, [
        'lastIndexOf',
        ['</' + tagName + '>']
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[51]);
      if (pos < elStartEnd) {
        //忘记闭合
        pos = __hook__('()', source, [
          'lastIndexOf',
          ['</' + tagName]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[51]);
      }
      __hook__('=', closeMap, [
        tagName,
        pos
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[51]);
    }
    return pos < elStartEnd;  //} 
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[51]);
}
function _copy(source, target) {
  return __hook__((source, target) => {
    for (var n in __hook__('*', source, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[53])) {
      __hook__('=', target, [
        n,
        __hook__('.', source, [n], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[53])
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[53]);
    }
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[53]);
}
function parseDCC(source, start, domBuilder, errorHandler) {
  return __hook__((source, start, domBuilder, errorHandler) => {
    //sure start with '<!'
    var next = __hook__('()', source, [
      'charAt',
      [start + 2]
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[55]);
    switch (next) {
    case '-':
      if (__hook__('()', source, [
          'charAt',
          [start + 3]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]) === '-') {
        var end = __hook__('()', source, [
          'indexOf',
          [
            '-->',
            start + 4
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[56]);
        //append comment source.substring(4,end)//<!--
        if (end > start) {
          __hook__('()', domBuilder, [
            'comment',
            [
              source,
              start + 4,
              end - start - 4
            ]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
          return end + 3;
        } else {
          __hook__('()', errorHandler, [
            'error',
            ['Unclosed comment']
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
          return -1;
        }
      } else {
        //error
        return -1;
      }
    default:
      if (__hook__('()', source, [
          'substr',
          [
            start + 3,
            6
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]) == 'CDATA[') {
        var end = __hook__('()', source, [
          'indexOf',
          [
            ']]>',
            start + 9
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[56]);
        __hook__('()', domBuilder, [
          'startCDATA',
          []
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
        __hook__('()', domBuilder, [
          'characters',
          [
            source,
            start + 9,
            end - start - 9
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
        __hook__('()', domBuilder, [
          'endCDATA',
          []
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
        return end + 3;
      }
      //<!DOCTYPE
      //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
      var matchs = __hook__(split, null, [
        source,
        start
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[57], 0);
      var len = __hook__('.', matchs, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[58]);
      if (len > 1 && __hook__('()', /!doctype/i, [
          'test',
          [__hook__('.', __hook__('.', matchs, [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]), [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54])]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54])) {
        var name = __hook__('.', __hook__('.', matchs, [1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[59]), [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[59]);
        var pubid = len > 3 && __hook__('()', /^public$/i, [
          'test',
          [__hook__('.', __hook__('.', matchs, [2], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[60]), [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[60])]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[60]) && __hook__('.', __hook__('.', matchs, [3], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[60]), [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[60]);
        var sysid = len > 4 && __hook__('.', __hook__('.', matchs, [4], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[61]), [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[61]);
        var lastMatch = __hook__('.', matchs, [len - 1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[62]);
        __hook__('()', domBuilder, [
          'startDTD',
          [
            name,
            pubid && __hook__('()', pubid, [
              'replace',
              [
                /^(['"])(.*?)\1$/,
                '$2'
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]),
            sysid && __hook__('()', sysid, [
              'replace',
              [
                /^(['"])(.*?)\1$/,
                '$2'
              ]
            ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54])
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
        __hook__('()', domBuilder, [
          'endDTD',
          []
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
        return __hook__('.', lastMatch, ['index'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]) + __hook__('.', __hook__('.', lastMatch, [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]), ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
      }
    }
    return -1;
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[54]);
}
function parseInstruction(source, start, domBuilder) {
  return __hook__((source, start, domBuilder) => {
    var end = __hook__('()', source, [
      'indexOf',
      [
        '?>',
        start
      ]
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[64]);
    if (end) {
      var match = __hook__('()', __hook__('()', source, [
        'substring',
        [
          start,
          end
        ]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[65]), [
        'match',
        [/^<\?(\S*)\s*([\s\S]*?)\s*$/]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[65]);
      if (match) {
        var len = __hook__('.', __hook__('.', match, [0], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[66]), ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[66]);
        __hook__('()', domBuilder, [
          'processingInstruction',
          [
            __hook__('.', match, [1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[63]),
            __hook__('.', match, [2], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[63])
          ]
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[63]);
        return end + 2;
      } else {
        //error
        return -1;
      }
    }
    return -1;
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[63]);
}
/**
 * @param source
 */
function ElementAttributes(source) {
  return __hook__(source => {
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[67]);
}
__hook__('=', ElementAttributes, [
  'prototype',
  {
    setTagName: function (tagName) {
      return __hook__(tagName => {
        if (!__hook__('()', tagNamePattern, [
            'test',
            [tagName]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[68])) {
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[68], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[69]], null, ['invalid tagName:' + tagName], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[68], true);
        }
        __hook__('=', this, [
          'tagName',
          tagName
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[68]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[68]);
    },
    add: function (qName, value, offset) {
      return __hook__((qName, value, offset) => {
        if (!__hook__('()', tagNamePattern, [
            'test',
            [qName]
          ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70])) {
          throw __hook__($hook$.global(__hook__, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70], 'Error', 'get')[__457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[71]], null, ['invalid attribute:' + qName], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70], true);
        }
        __hook__('=', this, [
          __hook__('p++', this, ['length'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70]),
          {
            qName: qName,
            value: value,
            offset: offset
          }
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[70]);
    },
    length: 0,
    getLocalName: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[72]), ['localName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[72]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[72]);
    },
    getLocator: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[73]), ['locator'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[73]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[73]);
    },
    getQName: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[74]), ['qName'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[74]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[74]);
    },
    getURI: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[75]), ['uri'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[75]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[75]);
    },
    getValue: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[76]), ['value'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[76]);
      }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[76]);
    }
  }
], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
function _set_proto_(thiz, parent) {
  return __hook__((thiz, parent) => {
    __hook__('=', thiz, [
      '__proto__',
      parent
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[77]);
    return thiz;
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[77]);
}
if (!(__hook__(_set_proto_, null, [
    {},
    __hook__('.', _set_proto_, ['prototype'], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5])
  ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5], 0) instanceof _set_proto_)) {
  _set_proto_ = function (thiz, parent) {
    return __hook__((thiz, parent) => {
      function p() {
        return __hook__(() => {
        }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[78]);
      }
      ;
      __hook__('=', p, [
        'prototype',
        parent
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
      p = __hook__(p, null, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5], true);
      for (parent in __hook__('*', thiz, [], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5])) {
        __hook__('=', p, [
          parent,
          __hook__('.', thiz, [parent], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5])
        ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
      }
      return p;
    }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
  };
}
function split(source, start) {
  return __hook__((source, start) => {
    var match;
    var buf = [];
    var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    __hook__('=', reg, [
      'lastIndex',
      start
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79]);
    __hook__('()', reg, [
      'exec',
      [source]
    ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79]);
    //skip <
    while (match = __hook__('()', reg, [
        'exec',
        [source]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79])) {
      __hook__('()', buf, [
        'push',
        [match]
      ], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79]);
      if (__hook__('.', match, [1], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79]))
        return buf;
    }
  }, null, arguments, __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[79]);
}
__hook__('=', exports, [
  'XMLReader',
  XMLReader
], __457f097136058f2102e48f9b519338082c98e51d078a41fd313079fac5f5e8e2__[5]);
},{}]},{},[1])(1)
});
