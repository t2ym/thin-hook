(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonjs_module = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
const add = __hook__(() => require('./commonjs2'), null, [
  'require',
  './commonjs2',
  '/components/thin-hook/demo/commonjs2.js'
], '/components/thin-hook/demo/commonjs.js,add', NaN);
const XliffConv = __hook__(() => require('xliff-conv'), null, [
  'require',
  'xliff-conv',
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'
], '/components/thin-hook/demo/commonjs.js,XliffConv', NaN);
__hook__('()', __hook__('.', chai, ['assert'], '/components/thin-hook/demo/commonjs.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__(add, null, [
          1,
          2
        ], '/components/thin-hook/demo/commonjs.js', 0);
      }, null, args, '/components/thin-hook/demo/commonjs.js')),
    /^Permission Denied:/
  ]
], '/components/thin-hook/demo/commonjs.js');
__hook__('()', __hook__('.', chai, ['assert'], '/components/thin-hook/demo/commonjs.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        __hook__('.', XliffConv, ['xliffStates'], '/components/thin-hook/demo/commonjs.js');
      }, null, args, '/components/thin-hook/demo/commonjs.js')),
    /^Permission Denied:/
  ]
], '/components/thin-hook/demo/commonjs.js');
},{"./commonjs2":2,"xliff-conv":6}],2:[function(require,module,exports){
const path = __hook__(() => require('path'), null, [
  'require',
  'path',
  '/components/thin-hook/node_modules/path-browserify/index.js'
], '/components/thin-hook/demo/commonjs2.js,path', NaN);
__hook__('()', __hook__('.', chai, ['assert'], '/components/thin-hook/demo/commonjs2.js'), [
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
        ], '/components/thin-hook/demo/commonjs2.js');
      }, null, args, '/components/thin-hook/demo/commonjs2.js')),
    /^Permission Denied:/
  ]
], '/components/thin-hook/demo/commonjs2.js');
__hook__('()', __hook__('.', chai, ['assert'], '/components/thin-hook/demo/commonjs2.js'), [
  'throws',
  [
    (...args) =>
      (__hook__(() => {
        const tty = __hook__(() => require('tty'), null, [
          'require',
          'tty',
          '/components/thin-hook/node_modules/tty-browserify/index.js'
        ], '/components/thin-hook/demo/commonjs2.js,tty', NaN);
      }, null, args, '/components/thin-hook/demo/commonjs2.js')),
    /^Permission Denied:/
  ]
], '/components/thin-hook/demo/commonjs2.js');
__hook__('=', module, [
  'exports',
  function add(a, b) {
    return __hook__((a, b) => {
      return a + b;
    }, null, arguments, '/components/thin-hook/demo/commonjs2.js,add');
  }
], '/components/thin-hook/demo/commonjs2.js');
},{"path":3,"tty":5}],3:[function(require,module,exports){
(function (process){
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
function normalizeArray(parts, allowAboveRoot) {
  return __hook__((parts, allowAboveRoot) => {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = __hook__('.', parts, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray,i') - 1; i >= 0; i--) {
      var last = __hook__('.', parts, [i], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray,last');
      if (last === '.') {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray');
      } else if (last === '..') {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray');
        up++;
      } else if (up) {
        __hook__('()', parts, [
          'splice',
          [
            i,
            1
          ]
        ], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray');
        up--;
      }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        __hook__('()', parts, [
          'unshift',
          ['..']
        ], '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray');
      }
    }
    return parts;
  }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,normalizeArray');
}
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function (filename) {
  return __hook__(filename => {
    return __hook__('()', __hook__('()', splitPathRe, [
      'exec',
      [filename]
    ], '/components/thin-hook/node_modules/path-browserify/index.js,splitPath'), [
      'slice',
      [1]
    ], '/components/thin-hook/node_modules/path-browserify/index.js,splitPath');
  }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,splitPath');
};
// path.resolve([from ...], to)
// posix version
__hook__('=', exports, [
  'resolve',
  function () {
    return __hook__(() => {
      var resolvedPath = '', resolvedAbsolute = false;
      for (var i = __hook__('.', arguments, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,i') - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? __hook__('.', arguments, [i], '/components/thin-hook/node_modules/path-browserify/index.js,path') : __hook__('()', process, [
          'cwd',
          []
        ], '/components/thin-hook/node_modules/path-browserify/index.js,path');
        // Skip empty and invalid entries
        if (typeof path !== 'string') {
          throw __hook__(TypeError, null, ['Arguments to path.resolve must be strings'], '/components/thin-hook/node_modules/path-browserify/index.js', true);
        } else if (!path) {
          continue;
        }
        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = __hook__('()', path, [
          'charAt',
          [0]
        ], '/components/thin-hook/node_modules/path-browserify/index.js') === '/';
      }
      // At this point the path should be resolved to a full absolute path, but
      // handle relative paths to be safe (might happen when process.cwd() fails)
      // Normalize the path
      resolvedPath = __hook__('()', __hook__(normalizeArray, null, [
        __hook__(filter, null, [
          __hook__('()', resolvedPath, [
            'split',
            ['/']
          ], '/components/thin-hook/node_modules/path-browserify/index.js'),
          function (p) {
            return __hook__(p => {
              return !!p;
            }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
          }
        ], '/components/thin-hook/node_modules/path-browserify/index.js', 0),
        !resolvedAbsolute
      ], '/components/thin-hook/node_modules/path-browserify/index.js', 0), [
        'join',
        ['/']
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
      return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
// path.normalize(path)
// posix version
__hook__('=', exports, [
  'normalize',
  function (path) {
    return __hook__(path => {
      var isAbsolute = __hook__('()', exports, [
          'isAbsolute',
          [path]
        ], '/components/thin-hook/node_modules/path-browserify/index.js,isAbsolute'), trailingSlash = __hook__(substr, null, [
          path,
          -1
        ], '/components/thin-hook/node_modules/path-browserify/index.js,trailingSlash', 0) === '/';
      // Normalize the path
      path = __hook__('()', __hook__(normalizeArray, null, [
        __hook__(filter, null, [
          __hook__('()', path, [
            'split',
            ['/']
          ], '/components/thin-hook/node_modules/path-browserify/index.js'),
          function (p) {
            return __hook__(p => {
              return !!p;
            }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
          }
        ], '/components/thin-hook/node_modules/path-browserify/index.js', 0),
        !isAbsolute
      ], '/components/thin-hook/node_modules/path-browserify/index.js', 0), [
        'join',
        ['/']
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
      if (!path && !isAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }
      return (isAbsolute ? '/' : '') + path;
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
// posix version
__hook__('=', exports, [
  'isAbsolute',
  function (path) {
    return __hook__(path => {
      return __hook__('()', path, [
        'charAt',
        [0]
      ], '/components/thin-hook/node_modules/path-browserify/index.js') === '/';
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
// posix version
__hook__('=', exports, [
  'join',
  function () {
    return __hook__(() => {
      var paths = __hook__('()', __hook__('.', __hook__('.', Array, ['prototype'], '/components/thin-hook/node_modules/path-browserify/index.js,paths'), ['slice'], '/components/thin-hook/node_modules/path-browserify/index.js,paths'), [
        'call',
        [
          arguments,
          0
        ]
      ], '/components/thin-hook/node_modules/path-browserify/index.js,paths');
      return __hook__('()', exports, [
        'normalize',
        [__hook__('()', __hook__(filter, null, [
            paths,
            function (p, index) {
              return __hook__((p, index) => {
                if (typeof p !== 'string') {
                  throw __hook__(TypeError, null, ['Arguments to path.join must be strings'], '/components/thin-hook/node_modules/path-browserify/index.js', true);
                }
                return p;
              }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
            }
          ], '/components/thin-hook/node_modules/path-browserify/index.js', 0), [
            'join',
            ['/']
          ], '/components/thin-hook/node_modules/path-browserify/index.js')]
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
// path.relative(from, to)
// posix version
__hook__('=', exports, [
  'relative',
  function (from, to) {
    return __hook__((from, to) => {
      from = __hook__('()', __hook__('()', exports, [
        'resolve',
        [from]
      ], '/components/thin-hook/node_modules/path-browserify/index.js'), [
        'substr',
        [1]
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
      to = __hook__('()', __hook__('()', exports, [
        'resolve',
        [to]
      ], '/components/thin-hook/node_modules/path-browserify/index.js'), [
        'substr',
        [1]
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
      function trim(arr) {
        return __hook__(arr => {
          var start = 0;
          for (; start < __hook__('.', arr, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,trim'); start++) {
            if (__hook__('.', arr, [start], '/components/thin-hook/node_modules/path-browserify/index.js,trim') !== '')
              break;
          }
          var end = __hook__('.', arr, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,trim,end') - 1;
          for (; end >= 0; end--) {
            if (__hook__('.', arr, [end], '/components/thin-hook/node_modules/path-browserify/index.js,trim') !== '')
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
          ], '/components/thin-hook/node_modules/path-browserify/index.js,trim');
        }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,trim');
      }
      var fromParts = __hook__(trim, null, [__hook__('()', from, [
          'split',
          ['/']
        ], '/components/thin-hook/node_modules/path-browserify/index.js,fromParts')], '/components/thin-hook/node_modules/path-browserify/index.js,fromParts', 0);
      var toParts = __hook__(trim, null, [__hook__('()', to, [
          'split',
          ['/']
        ], '/components/thin-hook/node_modules/path-browserify/index.js,toParts')], '/components/thin-hook/node_modules/path-browserify/index.js,toParts', 0);
      var length = __hook__('()', Math, [
        'min',
        [
          __hook__('.', fromParts, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,length'),
          __hook__('.', toParts, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,length')
        ]
      ], '/components/thin-hook/node_modules/path-browserify/index.js,length');
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (__hook__('.', fromParts, [i], '/components/thin-hook/node_modules/path-browserify/index.js') !== __hook__('.', toParts, [i], '/components/thin-hook/node_modules/path-browserify/index.js')) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < __hook__('.', fromParts, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js'); i++) {
        __hook__('()', outputParts, [
          'push',
          ['..']
        ], '/components/thin-hook/node_modules/path-browserify/index.js');
      }
      outputParts = __hook__('()', outputParts, [
        'concat',
        [__hook__('()', toParts, [
            'slice',
            [samePartsLength]
          ], '/components/thin-hook/node_modules/path-browserify/index.js')]
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
      return __hook__('()', outputParts, [
        'join',
        ['/']
      ], '/components/thin-hook/node_modules/path-browserify/index.js');
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
__hook__('=', exports, [
  'sep',
  '/'
], '/components/thin-hook/node_modules/path-browserify/index.js');
__hook__('=', exports, [
  'delimiter',
  ':'
], '/components/thin-hook/node_modules/path-browserify/index.js');
__hook__('=', exports, [
  'dirname',
  function (path) {
    return __hook__(path => {
      var result = __hook__(splitPath, null, [path], '/components/thin-hook/node_modules/path-browserify/index.js,result', 0), root = __hook__('.', result, [0], '/components/thin-hook/node_modules/path-browserify/index.js,root'), dir = __hook__('.', result, [1], '/components/thin-hook/node_modules/path-browserify/index.js,dir');
      if (!root && !dir) {
        // No dirname whatsoever
        return '.';
      }
      if (dir) {
        // It has a dirname, strip trailing slash
        dir = __hook__('()', dir, [
          'substr',
          [
            0,
            __hook__('.', dir, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js') - 1
          ]
        ], '/components/thin-hook/node_modules/path-browserify/index.js');
      }
      return root + dir;
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
__hook__('=', exports, [
  'basename',
  function (path, ext) {
    return __hook__((path, ext) => {
      var f = __hook__('.', __hook__(splitPath, null, [path], '/components/thin-hook/node_modules/path-browserify/index.js,f', 0), [2], '/components/thin-hook/node_modules/path-browserify/index.js,f');
      // TODO: make this comparison case-insensitive on windows?
      if (ext && __hook__('()', f, [
          'substr',
          [-1 * __hook__('.', ext, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js')]
        ], '/components/thin-hook/node_modules/path-browserify/index.js') === ext) {
        f = __hook__('()', f, [
          'substr',
          [
            0,
            __hook__('.', f, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js') - __hook__('.', ext, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js')
          ]
        ], '/components/thin-hook/node_modules/path-browserify/index.js');
      }
      return f;
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
__hook__('=', exports, [
  'extname',
  function (path) {
    return __hook__(path => {
      return __hook__('.', __hook__(splitPath, null, [path], '/components/thin-hook/node_modules/path-browserify/index.js', 0), [3], '/components/thin-hook/node_modules/path-browserify/index.js');
    }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js');
  }
], '/components/thin-hook/node_modules/path-browserify/index.js');
function filter(xs, f) {
  return __hook__((xs, f) => {
    if (__hook__('.', xs, ['filter'], '/components/thin-hook/node_modules/path-browserify/index.js,filter'))
      return __hook__('()', xs, [
        'filter',
        [f]
      ], '/components/thin-hook/node_modules/path-browserify/index.js,filter');
    var res = [];
    for (var i = 0; i < __hook__('.', xs, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,filter'); i++) {
      if (__hook__(f, null, [
          __hook__('.', xs, [i], '/components/thin-hook/node_modules/path-browserify/index.js,filter'),
          i,
          xs
        ], '/components/thin-hook/node_modules/path-browserify/index.js,filter', 0))
        __hook__('()', res, [
          'push',
          [__hook__('.', xs, [i], '/components/thin-hook/node_modules/path-browserify/index.js,filter')]
        ], '/components/thin-hook/node_modules/path-browserify/index.js,filter');
    }
    return res;
  }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,filter');
}
// String.prototype.substr - negative index don't work in IE8
var substr = __hook__('()', 'ab', [
  'substr',
  [-1]
], '/components/thin-hook/node_modules/path-browserify/index.js,substr') === 'b' ? function (str, start, len) {
  return __hook__((str, start, len) => {
    return __hook__('()', str, [
      'substr',
      [
        start,
        len
      ]
    ], '/components/thin-hook/node_modules/path-browserify/index.js,substr');
  }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,substr');
} : function (str, start, len) {
  return __hook__((str, start, len) => {
    if (start < 0)
      start = __hook__('.', str, ['length'], '/components/thin-hook/node_modules/path-browserify/index.js,substr') + start;
    return __hook__('()', str, [
      'substr',
      [
        start,
        len
      ]
    ], '/components/thin-hook/node_modules/path-browserify/index.js,substr');
  }, null, arguments, '/components/thin-hook/node_modules/path-browserify/index.js,substr');
};
}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = __hook__('=', module, [
  'exports',
  {}
], '/components/thin-hook/node_modules/process/browser.js,process');
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  return __hook__(() => {
    throw __hook__(Error, null, ['setTimeout has not been defined'], '/components/thin-hook/node_modules/process/browser.js,defaultSetTimout', true);
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,defaultSetTimout');
}
function defaultClearTimeout() {
  return __hook__(() => {
    throw __hook__(Error, null, ['clearTimeout has not been defined'], '/components/thin-hook/node_modules/process/browser.js,defaultClearTimeout', true);
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,defaultClearTimeout');
}
__hook__(function () {
  return __hook__(() => {
    try {
      if (typeof $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js', 'setTimeout', 'typeof')['_pp_setTimeout;/components/thin-hook/node_modules/process/browser.js'] === 'function') {
        cachedSetTimeout = $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js', 'setTimeout', 'get')['_pp_setTimeout;/components/thin-hook/node_modules/process/browser.js'];
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js', 'clearTimeout', 'typeof')['_pp_clearTimeout;/components/thin-hook/node_modules/process/browser.js'] === 'function') {
        cachedClearTimeout = $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js', 'clearTimeout', 'get')['_pp_clearTimeout;/components/thin-hook/node_modules/process/browser.js'];
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
}, null, [], '/components/thin-hook/node_modules/process/browser.js', 0);
function runTimeout(fun) {
  return __hook__(fun => {
    if (cachedSetTimeout === $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runTimeout', 'setTimeout', 'get')['_pp_setTimeout;/components/thin-hook/node_modules/process/browser.js,runTimeout']) {
      //normal enviroments in sane situations
      return $hook$.setTimeout('__hook__', [[
          '/components/thin-hook/node_modules/process/browser.js,runTimeout',
          {}
        ]], 'browserify')(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runTimeout', 'setTimeout', 'get')['_pp_setTimeout;/components/thin-hook/node_modules/process/browser.js,runTimeout']) {
      cachedSetTimeout = $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runTimeout', 'setTimeout', 'get')['_pp_setTimeout;/components/thin-hook/node_modules/process/browser.js,runTimeout'];
      return $hook$.setTimeout('__hook__', [[
          '/components/thin-hook/node_modules/process/browser.js,runTimeout',
          {}
        ]], 'browserify')(fun, 0);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return __hook__(cachedSetTimeout, null, [
        fun,
        0
      ], '/components/thin-hook/node_modules/process/browser.js,runTimeout', 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return __hook__('()', cachedSetTimeout, [
          'call',
          [
            null,
            fun,
            0
          ]
        ], '/components/thin-hook/node_modules/process/browser.js,runTimeout');
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return __hook__('()', cachedSetTimeout, [
          'call',
          [
            this,
            fun,
            0
          ]
        ], '/components/thin-hook/node_modules/process/browser.js,runTimeout');
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,runTimeout');
}
function runClearTimeout(marker) {
  return __hook__(marker => {
    if (cachedClearTimeout === $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 'clearTimeout', 'get')['_pp_clearTimeout;/components/thin-hook/node_modules/process/browser.js,runClearTimeout']) {
      //normal enviroments in sane situations
      return __hook__(clearTimeout, null, [marker], '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 0);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 'clearTimeout', 'get')['_pp_clearTimeout;/components/thin-hook/node_modules/process/browser.js,runClearTimeout']) {
      cachedClearTimeout = $hook$.global(__hook__, '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 'clearTimeout', 'get')['_pp_clearTimeout;/components/thin-hook/node_modules/process/browser.js,runClearTimeout'];
      return __hook__(clearTimeout, null, [marker], '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 0);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return __hook__(cachedClearTimeout, null, [marker], '/components/thin-hook/node_modules/process/browser.js,runClearTimeout', 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return __hook__('()', cachedClearTimeout, [
          'call',
          [
            null,
            marker
          ]
        ], '/components/thin-hook/node_modules/process/browser.js,runClearTimeout');
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return __hook__('()', cachedClearTimeout, [
          'call',
          [
            this,
            marker
          ]
        ], '/components/thin-hook/node_modules/process/browser.js,runClearTimeout');
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,runClearTimeout');
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  return __hook__(() => {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (__hook__('.', currentQueue, ['length'], '/components/thin-hook/node_modules/process/browser.js,cleanUpNextTick')) {
      queue = __hook__('()', currentQueue, [
        'concat',
        [queue]
      ], '/components/thin-hook/node_modules/process/browser.js,cleanUpNextTick');
    } else {
      queueIndex = -1;
    }
    if (__hook__('.', queue, ['length'], '/components/thin-hook/node_modules/process/browser.js,cleanUpNextTick')) {
      __hook__(drainQueue, null, [], '/components/thin-hook/node_modules/process/browser.js,cleanUpNextTick', 0);
    }
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,cleanUpNextTick');
}
function drainQueue() {
  return __hook__(() => {
    if (draining) {
      return;
    }
    var timeout = __hook__(runTimeout, null, [cleanUpNextTick], '/components/thin-hook/node_modules/process/browser.js,drainQueue,timeout', 0);
    draining = true;
    var len = __hook__('.', queue, ['length'], '/components/thin-hook/node_modules/process/browser.js,drainQueue,len');
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          __hook__('()', __hook__('.', currentQueue, [queueIndex], '/components/thin-hook/node_modules/process/browser.js,drainQueue'), [
            'run',
            []
          ], '/components/thin-hook/node_modules/process/browser.js,drainQueue');
        }
      }
      queueIndex = -1;
      len = __hook__('.', queue, ['length'], '/components/thin-hook/node_modules/process/browser.js,drainQueue');
    }
    currentQueue = null;
    draining = false;
    __hook__(runClearTimeout, null, [timeout], '/components/thin-hook/node_modules/process/browser.js,drainQueue', 0);
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,drainQueue');
}
__hook__('=', process, [
  'nextTick',
  function (fun) {
    return __hook__(fun => {
      var args = __hook__(Array, null, [__hook__('.', arguments, ['length'], '/components/thin-hook/node_modules/process/browser.js,args') - 1], '/components/thin-hook/node_modules/process/browser.js,args', true);
      if (__hook__('.', arguments, ['length'], '/components/thin-hook/node_modules/process/browser.js') > 1) {
        for (var i = 1; i < __hook__('.', arguments, ['length'], '/components/thin-hook/node_modules/process/browser.js'); i++) {
          __hook__('=', args, [
            i - 1,
            __hook__('.', arguments, [i], '/components/thin-hook/node_modules/process/browser.js')
          ], '/components/thin-hook/node_modules/process/browser.js');
        }
      }
      __hook__('()', queue, [
        'push',
        [__hook__(Item, null, [
            fun,
            args
          ], '/components/thin-hook/node_modules/process/browser.js', true)]
      ], '/components/thin-hook/node_modules/process/browser.js');
      if (__hook__('.', queue, ['length'], '/components/thin-hook/node_modules/process/browser.js') === 1 && !draining) {
        __hook__(runTimeout, null, [drainQueue], '/components/thin-hook/node_modules/process/browser.js', 0);
      }
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
// v8 likes predictible objects
function Item(fun, array) {
  return __hook__((fun, array) => {
    __hook__('=', this, [
      'fun',
      fun
    ], '/components/thin-hook/node_modules/process/browser.js,Item');
    __hook__('=', this, [
      'array',
      array
    ], '/components/thin-hook/node_modules/process/browser.js,Item');
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,Item');
}
__hook__('=', __hook__('.', Item, ['prototype'], '/components/thin-hook/node_modules/process/browser.js'), [
  'run',
  function () {
    return __hook__(() => {
      __hook__('()', __hook__('.', this, ['fun'], '/components/thin-hook/node_modules/process/browser.js'), [
        'apply',
        [
          null,
          __hook__('.', this, ['array'], '/components/thin-hook/node_modules/process/browser.js')
        ]
      ], '/components/thin-hook/node_modules/process/browser.js');
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'title',
  'browser'
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'browser',
  true
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'env',
  {}
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'argv',
  []
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'version',
  ''
], '/components/thin-hook/node_modules/process/browser.js');
// empty string to avoid regexp issues
__hook__('=', process, [
  'versions',
  {}
], '/components/thin-hook/node_modules/process/browser.js');
function noop() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/process/browser.js,noop');
}
__hook__('=', process, [
  'on',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'addListener',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'once',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'off',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'removeListener',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'removeAllListeners',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'emit',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'prependListener',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'prependOnceListener',
  noop
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'listeners',
  function (name) {
    return __hook__(name => {
      return [];
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'binding',
  function (name) {
    return __hook__(name => {
      throw __hook__(Error, null, ['process.binding is not supported'], '/components/thin-hook/node_modules/process/browser.js', true);
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'cwd',
  function () {
    return __hook__(() => {
      return '/';
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'chdir',
  function (dir) {
    return __hook__(dir => {
      throw __hook__(Error, null, ['process.chdir is not supported'], '/components/thin-hook/node_modules/process/browser.js', true);
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
__hook__('=', process, [
  'umask',
  function () {
    return __hook__(() => {
      return 0;
    }, null, arguments, '/components/thin-hook/node_modules/process/browser.js');
  }
], '/components/thin-hook/node_modules/process/browser.js');
},{}],5:[function(require,module,exports){
__hook__('=', exports, [
  'isatty',
  function () {
    return __hook__(() => {
      return false;
    }, null, arguments, '/components/thin-hook/node_modules/tty-browserify/index.js');
  }
], '/components/thin-hook/node_modules/tty-browserify/index.js');
function ReadStream() {
  return __hook__(() => {
    throw __hook__(Error, null, ['tty.ReadStream is not implemented'], '/components/thin-hook/node_modules/tty-browserify/index.js,ReadStream', true);
  }, null, arguments, '/components/thin-hook/node_modules/tty-browserify/index.js,ReadStream');
}
__hook__('=', exports, [
  'ReadStream',
  ReadStream
], '/components/thin-hook/node_modules/tty-browserify/index.js');
function WriteStream() {
  return __hook__(() => {
    throw __hook__(Error, null, ['tty.ReadStream is not implemented'], '/components/thin-hook/node_modules/tty-browserify/index.js,WriteStream', true);
  }, null, arguments, '/components/thin-hook/node_modules/tty-browserify/index.js,WriteStream');
}
__hook__('=', exports, [
  'WriteStream',
  WriteStream
], '/components/thin-hook/node_modules/tty-browserify/index.js');
},{}],6:[function(require,module,exports){
/*
@license https://github.com/t2ym/xliff-conv/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
__hook__(function (root, factory) {
  'use strict';
  return __hook__((root, factory) => {
    /* istanbul ignore if: AMD is not tested */
    if (typeof $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 'define', '#typeof')['S_pp_define;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'] === 'function' && __hook__('#.', define, ['amd'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
      // AMD. Register as an anonymous module.
      __hook__(define, null, [
        [],
        function () {
          return __hook__(() => {
            return __hook__('#=', root, [
              'XliffConv',
              __hook__(factory, null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0)
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
    } else if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like enviroments that support module.exports,
      // like Node.
      __hook__('#=', module, [
        'exports',
        __hook__(factory, null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0)
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
    } else {
      // Browser globals
      __hook__('#=', root, [
        'XliffConv',
        __hook__(factory, null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0)
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
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
            __hook__('#.', options, ['useSources'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || false
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'date',
            __hook__('#.', options, ['date'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || __hook__(Date, null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', true)
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'xmldom',
            typeof $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', 'window', '#typeof')['S_pp_window;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'] === 'object' ? $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', 'window', '#get')['S_pp_window;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'] : __hook__(() => require('xmldom'), null, [
              'require',
              'xmldom',
              '/components/thin-hook/node_modules/xmldom/dom-parser.js'
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', NaN)
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'DOMParser',
            __hook__('#.', __hook__('#.', this, ['xmldom'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), ['DOMParser'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'XMLSerializer',
            __hook__('#.', __hook__('#.', this, ['xmldom'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), ['XMLSerializer'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'xliffStates',
            __hook__('#.', options, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || __hook__('#.', __hook__('#.', XliffConv, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), ['default'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'patterns',
            __hook__('#.', options, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || __hook__('#.', XliffConv, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'todoOps',
            __hook__('#()', this, [
              '_todoOps',
              [__hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv')
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'logger',
            __hook__('#.', options, ['logger'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', console, ['log'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), [
                  'apply',
                  [
                    $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', 'console', '#get')['S_pp_console;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'],
                    arguments
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
              }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
            }
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'warnLogger',
            __hook__('#.', options, ['warnLogger'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', console, ['warn'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), [
                  'apply',
                  [
                    $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', 'console', '#get')['S_pp_console;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'],
                    arguments
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
              }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
            }
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'errorLogger',
            __hook__('#.', options, ['errorLogger'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv') || function () {
              return __hook__(() => {
                __hook__('#()', __hook__('#.', console, ['error'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'), [
                  'apply',
                  [
                    $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv', 'console', '#get')['S_pp_console;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv'],
                    arguments
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
              }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
            }
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
          __hook__('#=', this, [
            'toolVersion',
            '1.0.10'
          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
        }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,XliffConv,XliffConv');
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
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', XliffConv, [
        'patterns',
        {
          'annotationsAndTags': /^({{[^{} ]*}}|\[\[[^\[\] ]*\]\]|<[-a-zA-Z]{1,}>)$/,
          'annotations': /^({{[^{} ]*}}|\[\[[^\[\] ]*\]\])$/,
          'numbers': /^[0-9.]{1,}$/,
          'tags': /^<[-a-zA-Z]{1,}>$/
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
        '_todoOps',
        function (xliffStates) {
          return __hook__(xliffStates => {
            var output = { expressions: {} };
            var match;
            for (var op in __hook__('#*', xliffStates, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
              for (var i = 0; i < __hook__('#.', __hook__('#.', xliffStates, [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'); i++) {
                match = __hook__('#()', __hook__('#.', __hook__('#.', xliffStates, [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'match',
                  [/^\[(.*)\]$/]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                if (match) {
                  __hook__('#=', __hook__('#.', output, ['expressions'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                    __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#.', __hook__('#.', output, ['expressions'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || []
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                  __hook__('#()', __hook__('#.', __hook__('#.', output, ['expressions'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                    'push',
                    [op]
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                } else {
                  __hook__('#=', output, [
                    __hook__('#.', __hook__('#.', xliffStates, [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#.', output, [__hook__('#.', __hook__('#.', xliffStates, [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || []
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                  __hook__('#()', __hook__('#.', output, [__hook__('#.', __hook__('#.', xliffStates, [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                    'push',
                    [op]
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }
              }
            }
            return output;
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
        '_resolveTodoOps',
        function (parameters) {
          return __hook__(parameters => {
            var result;
            var match;
            var effects;
            var effect;
            for (var prop in __hook__('#*', __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['expressions'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
              effects = [];
              if (__hook__('#()', __hook__('#()', __hook__('#()', prop, [
                  'split',
                  [/&&/]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'map',
                  [
                    function (expression) {
                      return __hook__(expression => {
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // non-null
                          return !!__hook__('#.', parameters, [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^!([\-\w]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // negation
                          return !__hook__('#.', parameters, [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)==([\-\w]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // equality
                          return (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', parameters, [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) === (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', parameters, [__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'));
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)!=([\-\w]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // unequality
                          return (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', parameters, [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) !== (__hook__('#()', parameters, [
                            'hasOwnProperty',
                            [__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', parameters, [__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'));
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)([.][\-\w]*)?~=([\-\w]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // pattern matching
                          if (!__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                            return !!__hook__('#()', __hook__('#()', parameters, [
                              'hasOwnProperty',
                              [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', parameters, [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'match',
                              [__hook__('#()', __hook__('#.', parameters, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'hasOwnProperty',
                                  [__hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', __hook__('#.', parameters, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          } else {
                            return !!__hook__('#()', typeof __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'object' ? __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'getAttribute',
                              [__hook__('#()', __hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'substr',
                                  [1]
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'match',
                              [__hook__('#()', __hook__('#.', parameters, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'hasOwnProperty',
                                  [__hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', __hook__('#.', parameters, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : __hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          }
                        }
                        match = __hook__('#()', expression, [
                          'match',
                          [/^([\-\w]*)([.][\-\w]*)?:=([^&]*)$/]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (match) {
                          // assignment effect
                          if (!__hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                            if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'string') {
                              // alias
                              effect = __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                'split',
                                [/[.]/]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#()', effect, [
                                'push',
                                [__hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#()', effects, [
                                'push',
                                [effect]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            } else if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'object') {
                              // tag
                              __hook__('#()', effects, [
                                'push',
                                [[
                                    __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                                    'textContent',
                                    __hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                                  ]]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            } else {
                              __hook__('#()', this, [
                                'warnLogger',
                                ['XliffConv: id = ' + __hook__('#.', parameters, ['id'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') + ' effect ' + expression + ' is ignored due to inexistent tag ' + __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            }
                          } else {
                            if (typeof __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'object') {
                              // attribute
                              __hook__('#()', effects, [
                                'push',
                                [[
                                    __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                                    __hook__('#()', __hook__('#.', match, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                      'substr',
                                      [1]
                                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                                    __hook__('#.', match, [3], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                                  ]]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            } else {
                              __hook__('#()', this, [
                                'warnLogger',
                                ['XliffConv: id = ' + __hook__('#.', parameters, ['id'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') + ' effect ' + expression + ' is ignored due to inexistent tag ' + __hook__('#.', match, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            }
                          }
                          return true;
                        }
                        return false;
                      }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    },
                    this
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'reduce',
                  [
                    function (previous, current) {
                      return __hook__((previous, current) => {
                        return previous && current;
                      }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    },
                    true
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                // Expression matched
                result = __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['expressions'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [prop], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                __hook__('#()', effects, [
                  'forEach',
                  [function (effect) {
                      return __hook__(effect => {
                        if (__hook__('#.', effect, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'textContent') {
                          __hook__('#=', __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', effect, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'textContent',
                            __hook__('#.', effect, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        } else {
                          if (__hook__('#.', effect, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && __hook__('#.', effect, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== '""') {
                            __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', effect, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'setAttribute',
                              [
                                __hook__('#.', effect, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                                __hook__('#.', effect, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                              ]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          } else {
                            __hook__('#()', __hook__('#.', __hook__('#.', parameters, ['tags'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', effect, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'removeAttribute',
                              [__hook__('#.', effect, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          }
                        }
                      }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    }]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                break;
              }
            }
            if (!result) {
              if (__hook__('#.', parameters, ['state'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', parameters, ['state'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', parameters, ['state'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                result = __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', parameters, ['state'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
              } else {
                result = __hook__('#.', __hook__('#.', __hook__('#.', this, ['todoOps'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [''], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
              }
            }
            return result;
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
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
                    if (!__hook__('#.', args, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || typeof __hook__('#.', args, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== type) {
                      throw __hook__(Error, null, ['invalid argument'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', true);
                    }
                  }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            if (typeof __hook__('#.', options, ['bundle'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== 'object') {
              throw __hook__(Error, null, ['invalid options.bundle'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', true);
            }
            var parser = __hook__(__hook__('#.', this, ['DOMParser'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,parser'), null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,parser', true);
            var dom = __hook__('#()', parser, [
              'parseFromString',
              [
                xliff,
                'application/xml'
              ]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,dom');
            var fileTag = __hook__('#.', __hook__('#()', dom, [
              'getElementsByTagName',
              ['file']
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,fileTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,fileTag');
            var transUnits = __hook__('#()', dom, [
              'getElementsByTagName',
              ['trans-unit']
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnits');
            var output = __hook__('#.', options, ['bundle'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,output');
            var stats = {
              xliff: {},
              json: {}
            };
            var todoMap = {};
            var component;
            var i;
            for (component in __hook__('#*', output, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
              if (__hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                for (i in __hook__('#*', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                  __hook__('#=', todoMap, [
                    component + __hook__('#()', __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['path'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'replace',
                      [
                        /[.]/g,
                        '_$DOT$_'
                      ]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'replace',
                      [
                        /\//g,
                        '.'
                      ]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }
              }
            }
            //console.log('todoMap = ', todoMap);
            __hook__('#=', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
              'total',
              __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            __hook__('#=', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
              'total',
              __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            __hook__('#=', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
              'file',
              {}
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            __hook__('#()', __hook__('#.', __hook__('#.', Array, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['forEach'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
              'call',
              [
                __hook__('#.', fileTag, ['attributes'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                function (attribute) {
                  return __hook__(attribute => {
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['file'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      __hook__('#.', attribute, ['name'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                      __hook__('#.', attribute, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                  }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }
              ]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            __hook__('#()', __hook__('#.', __hook__('#.', Array, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['forEach'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
              'call',
              [
                transUnits,
                __hook__('#()', function (transUnit) {
                  return __hook__(transUnit => {
                    var sourceTag = __hook__('#.', __hook__('#()', transUnit, [
                      'getElementsByTagName',
                      ['source']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceTag');
                    var targetTag = __hook__('#.', __hook__('#()', transUnit, [
                      'getElementsByTagName',
                      ['target']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetTag');
                    var id = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['id']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,id');
                    var restype = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['restype']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,restype') || 'x-json-string';
                    var source = __hook__('#.', sourceTag, ['textContent'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,source');
                    var target = __hook__('#.', targetTag, ['textContent'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,target');
                    var approved = __hook__('#()', transUnit, [
                      'getAttribute',
                      ['approved']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,approved') === 'yes';
                    var state = __hook__('#()', targetTag, [
                      'getAttribute',
                      ['state']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state');
                    var cursor = output;
                    var paths = __hook__('#()', __hook__('#()', id, [
                      'split',
                      ['.']
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,paths'), [
                      'map',
                      [function (p) {
                          return __hook__(p => {
                            return __hook__('#()', p, [
                              'replace',
                              [
                                /_\$DOT\$_/g,
                                '.'
                              ]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,paths');
                          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,paths');
                        }]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,paths');
                    var component = __hook__('#.', paths, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,component');
                    var parsed;
                    var value;
                    var sourceValue;
                    var todo;
                    var op;
                    //console.log({ id: id, restype: restype, source: source, target: target, state: state, approved: approved });
                    parsed = __hook__('#()', source, [
                      'match',
                      [/^_\$([a-zA-Z]*)\$_(.*)$/]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    if (parsed) {
                      // process _$type$_value format for compatibility with xliff2bundlejson
                      source = __hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    }
                    // update stats
                    __hook__('#=', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'units',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'states',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      state,
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [state], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [state], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'approved',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['approved'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'approved',
                      approved ? 1 : 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'units',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'states',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      state,
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [state], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [state], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'approved',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['approved'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'approved',
                      approved ? 1 : 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    while (__hook__('#.', paths, ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') > 0) {
                      if (__hook__('#.', paths, ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 1) {
                        if (__hook__('#()', cursor, [
                            'hasOwnProperty',
                            [__hook__('#.', paths, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                          parsed = __hook__('#()', target, [
                            'match',
                            [/^_\$([a-zA-Z]*)\$_(.*)$/]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          if (parsed) {
                            // process _$type$_value format for compatibility with xliff2bundlejson 
                            target = __hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            switch (__hook__('#.', parsed, [1], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                            case 'number':
                              sourceValue = __hook__(Number, null, [source], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              value = __hook__(Number, null, [__hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              break;
                            case 'boolean':
                              sourceValue = __hook__(Boolean, null, [source === 'true'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              value = __hook__(Boolean, null, [__hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'true'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              break;
                            case 'object':
                              sourceValue = __hook__('#()', JSON, [
                                'parse',
                                [source]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              value = __hook__('#()', JSON, [
                                'parse',
                                [__hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              break;
                            case 'undefined':
                              sourceValue = $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 'undefined', '#get')['S_pp_undefined;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'];
                              value = $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 'undefined', '#get')['S_pp_undefined;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'];
                              break;
                            case 'string':
                            default:
                              sourceValue = source;
                              value = __hook__('#.', parsed, [2], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              break;
                            }
                          } else {
                            // process <trans-unit restype="x-json-*">
                            switch (restype) {
                            case 'x-json-number':
                              sourceValue = __hook__(Number, null, [source], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              value = __hook__(Number, null, [target], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              break;
                            case 'x-json-boolean':
                              sourceValue = __hook__(Boolean, null, [source === 'true'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              value = __hook__(Boolean, null, [target === 'true'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
                              break;
                            case 'x-json-object':
                              sourceValue = __hook__('#()', JSON, [
                                'parse',
                                [source]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              value = __hook__('#()', JSON, [
                                'parse',
                                [target]
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              break;
                            case 'x-json-undefined':
                              sourceValue = $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 'undefined', '#get')['S_pp_undefined;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'];
                              value = $hook$.global(__hook__, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 'undefined', '#get')['S_pp_undefined;/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'];
                              break;
                            case 'x-json-string':
                            default:
                              sourceValue = source;
                              value = target;
                              break;
                            }
                          }
                          todo = __hook__('#.', todoMap, [id], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          if (!todo || typeof __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'string' && __hook__('#()', __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'replace',
                              [
                                /\s\s*/g,
                                ' '
                              ]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === __hook__('#()', source, [
                              'replace',
                              [
                                /\s\s*/g,
                                ' '
                              ]
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || typeof __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'number' && __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === sourceValue || typeof __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'boolean' && __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === sourceValue) {
                            // no todo or source is matching with todo.value
                            // update value
                            if (__hook__('#.', cursor, [__hook__('#.', paths, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== value) {
                              __hook__('#=', cursor, [
                                __hook__('#.', paths, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                                value
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                'valueUpdated',
                                __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['valueUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['valueUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                'valueUpdated',
                                __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['valueUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['valueUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            }
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'updated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['updated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['updated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'updated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['updated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['updated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
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
                                  'patterns': __hook__('#.', this, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,patterns'),
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
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'todoUpdated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'todoUpdated',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            if (op === 'default') {
                              // no todo for approved item
                              if (todo) {
                                // mark the todo for removal
                                __hook__('#=', todo, [
                                  'op',
                                  'noop'
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              }
                            } else {
                              if (todo) {
                                if (__hook__('#.', todo, ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== op) {
                                  __hook__('#=', todo, [
                                    'op',
                                    op
                                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                  __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                  __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                }
                              } else {
                                // Fix #1. Populate missing todo item.
                                todo = {
                                  'op': op,
                                  'path': '/' + __hook__('#()', __hook__('#()', __hook__('#()', __hook__('#()', id, [
                                    'split',
                                    ['.']
                                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,path'), [
                                    'splice',
                                    [1]
                                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,path'), [
                                    'join',
                                    ['/']
                                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,path'), [
                                    'replace',
                                    [
                                      /_\$DOT\$_/g,
                                      '.'
                                    ]
                                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,path'),
                                  'value': sourceValue
                                };
                                __hook__('#=', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'meta',
                                  __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#=', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'todo',
                                  __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || []
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                                  'push',
                                  [todo]
                                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                                __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todoUpdated'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                              }
                            }
                          } else {
                            // discard value
                            __hook__('#()', this, [
                              'warnLogger',
                              ['XliffConv: id = ' + id + ' discarding value "' + value + '"' + ' as source "' + sourceValue + '" does not match with todo.value "' + __hook__('#.', todo, ['value'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') + '"']
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'discarded',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'source_mismatching',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['source_mismatching'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['source_mismatching'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'discarded',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                              'source_mismatching',
                              __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['source_mismatching'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                            __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['source_mismatching'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          }
                          __hook__('#()', paths, [
                            'shift',
                            []
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        } else {
                          // missing resource
                          __hook__('#()', this, [
                            'warnLogger',
                            ['XliffConv: id = ' + id + ' is missing']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        break;
                      } else {
                        if (!__hook__('#.', cursor, [__hook__('#.', paths, [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                          // missing resource
                          __hook__('#()', this, [
                            'warnLogger',
                            ['XliffConv: id = ' + id + ' is missing']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'discarded',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['discarded'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                            'id_missing',
                            __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['id_missing'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                          break;
                        }
                        cursor = __hook__('#.', cursor, [__hook__('#()', paths, [
                            'shift',
                            []
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                      }
                    }
                  }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }, [
                  'bind',
                  [this]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
              ]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            for (component in __hook__('#*', output, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
              if (__hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                for (i = __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') - 1; i >= 0; i--) {
                  if (__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'noop') {
                    // remove the noop todo item
                    __hook__('#()', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'splice',
                      [
                        i,
                        1
                      ]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                  } else {
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'todo',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      component,
                      __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'todo',
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#=', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                      __hook__('#.', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['json'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', output, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [i], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                  }
                }
              }
            }
            __hook__(callback, null, [
              output,
              stats
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
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
                    if (!__hook__('#.', args, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || typeof __hook__('#.', args, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') !== type) {
                      throw __hook__(Error, null, ['invalid argument'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', true);
                    }
                  }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            var parser = __hook__(__hook__('#.', this, ['DOMParser'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,parser'), null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,parser', true);
            var serializer = __hook__(__hook__('#.', this, ['XMLSerializer'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,serializer'), null, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,serializer', true);
            var xmlHeader = __hook__('#.', options, ['xmlHeader'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xmlHeader') || '<?xml version="1.0" encoding="UTF-8"?>\n' + '<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\n';
            var xliffTemplate = __hook__('#.', options, ['xliffTemplate'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || '<xliff version="1.0">\n' + '  <file xml:space="' + (__hook__('#.', options, ['xmlSpace'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'default') + '" ' + 'source-language="' + (__hook__('#.', options, ['srcLanguage'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'en') + '" ' + 'target-language="' + (__hook__('#.', options, ['destLanguage'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'fr') + '" ' + 'datatype="' + (__hook__('#.', options, ['dataType'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'plaintext') + '" ' + 'original="' + (__hook__('#.', options, ['original'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'messages') + '" ' + 'date="' + __hook__('#()', __hook__('#()', __hook__('#.', this, ['date'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate'), [
              'toISOString',
              []
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate'), [
              'replace',
              [
                /[.][0-9]*Z$/,
                'Z'
              ]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') + '" ' + 'product-name="' + (__hook__('#.', options, ['productName'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') || 'messages') + '">\n' + '    <header>\n' + '      <tool tool-id="xliff-conv" tool-name="xliff-conv" tool-version="' + __hook__('#.', this, ['toolVersion'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliffTemplate') + '"/>\n' + '    </header>\n' + '    <body>\n' + '</body>\n' + '  </file>\n' + '</xliff>';
            var transUnitTemplate = '<wrapper>' + (__hook__('#.', options, ['transUnitTemplate'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnitTemplate') || '      <trans-unit>\n' + '        <source></source>\n' + '        <target></target>\n' + '      </trans-unit>') + '\n</wrapper>';
            var spacer = '<wrapper>    </wrapper>';
            var xliff = __hook__('#()', parser, [
              'parseFromString',
              [
                xliffTemplate,
                'application/xml'
              ]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,xliff');
            var fileTag = __hook__('#.', __hook__('#()', xliff, [
              'getElementsByTagName',
              ['file']
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,fileTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,fileTag');
            var bodyTag = __hook__('#.', __hook__('#()', xliff, [
              'getElementsByTagName',
              ['body']
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,bodyTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,bodyTag');
            var sourceBundle = __hook__('#.', bundles, [''], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceBundle');
            var targetBundle = __hook__('#.', bundles, [__hook__('#.', options, ['destLanguage'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetBundle')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetBundle');
            var component;
            var todos;
            var todoMap;
            var index;
            var stats = {
              xliff: {},
              json: {}
            };
            for (component in __hook__('#*', targetBundle, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
              if (component !== 'bundle') {
                __hook__('#=', __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'meta',
                  __hook__('#.', __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                __hook__('#=', __hook__('#.', __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'todo',
                  __hook__('#.', __hook__('#.', __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || []
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                todos = __hook__('#.', __hook__('#.', __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['meta'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['todo'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                todoMap = {};
                for (index = 0; index < __hook__('#.', todos, ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'); index++) {
                  __hook__('#=', todoMap, [
                    __hook__('#()', __hook__('#()', __hook__('#()', __hook__('#.', __hook__('#.', todos, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['path'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'replace',
                      [
                        /[.]/g,
                        '_$DOT$_'
                      ]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'replace',
                      [
                        /\//g,
                        '.'
                      ]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                      'substring',
                      [1]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#.', todos, [index], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                  ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                }
                __hook__('#()', this, [
                  '_traverseBundle',
                  [
                    '',
                    __hook__('#.', sourceBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#.', targetBundle, [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    __hook__('#()', function (id, source, target) {
                      return __hook__((id, source, target) => {
                        //console.log('_traverseBundle callback id = ' + component + '.' + id + ' source = ' + source + ' target = ' + target);
                        var transUnitWrapper = __hook__('#()', parser, [
                          'parseFromString',
                          [
                            transUnitTemplate,
                            'application/xml'
                          ]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnitWrapper');
                        var transUnit = __hook__('#.', __hook__('#()', transUnitWrapper, [
                          'getElementsByTagName',
                          ['trans-unit']
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnit'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,transUnit');
                        var sourceTag = __hook__('#.', __hook__('#()', transUnit, [
                          'getElementsByTagName',
                          ['source']
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,sourceTag');
                        var targetTag = __hook__('#.', __hook__('#()', transUnit, [
                          'getElementsByTagName',
                          ['target']
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetTag'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,targetTag');
                        var todo = __hook__('#.', todoMap, [id], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,todo');
                        var op;
                        var state = todo && __hook__('#.', __hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state'), [__hook__('#.', todo, ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state') ? __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state'), [__hook__('#.', todo, ['op'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state') : __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state'), ['default'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,state');
                        var restype = 'x-json-' + typeof source;
                        __hook__('#()', transUnit, [
                          'setAttribute',
                          [
                            'id',
                            component + '.' + id
                          ]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (restype !== 'x-json-string') {
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              'restype',
                              restype
                            ]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        __hook__('#=', sourceTag, [
                          'textContent',
                          __hook__('#()', this, [
                            '_stringify',
                            [source]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', targetTag, [
                          'textContent',
                          __hook__('#()', this, [
                            '_stringify',
                            [target]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        // apply expressions
                        op = __hook__('#()', this, [
                          '_resolveTodoOps',
                          [{
                              'state': state,
                              'id': component + '.' + id,
                              'component': component,
                              'restype': restype,
                              'source': __hook__('#.', sourceTag, ['textContent'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,source'),
                              'target': __hook__('#.', targetTag, ['textContent'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,target'),
                              'approved': state === __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,approved'), ['default'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,approved'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,approved'),
                              // Boolean
                              'patterns': __hook__('#.', this, ['patterns'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,patterns'),
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
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        // update state
                        state = __hook__('#.', __hook__('#.', __hook__('#.', this, ['xliffStates'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [op], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        if (op === 'default' && !__hook__('#()', transUnit, [
                            'hasAttribute',
                            ['approved']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
                          __hook__('#()', transUnit, [
                            'setAttribute',
                            [
                              'approved',
                              'yes'
                            ]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        // Fix #24: don't force the 'state' attribute if no state
                        if (!__hook__('#()', targetTag, [
                            'hasAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') && state && state !== '""') {
                          __hook__('#()', targetTag, [
                            'setAttribute',
                            [
                              'state',
                              state
                            ]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        // Fix #28: "" to remove the state attribute
                        if (!state || state === '""') {
                          __hook__('#()', targetTag, [
                            'removeAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                        // update stats
                        __hook__('#=', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'total',
                          __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'units',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'states',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          __hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                          __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#()', targetTag, [
                              'getAttribute',
                              ['state']
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'approved',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['approved'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['total'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'approved',
                          __hook__('#()', transUnit, [
                            'getAttribute',
                            ['approved']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'yes' ? 1 : 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          component,
                          __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'units',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#p++', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['units'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'states',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || {}
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          __hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                          __hook__('#.', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#()', targetTag, [
                              'getAttribute',
                              ['state']
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#p++', __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['states'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [__hook__('#()', targetTag, [
                            'getAttribute',
                            ['state']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'approved',
                          __hook__('#.', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['approved'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') || 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        __hook__('#+=', __hook__('#.', __hook__('#.', stats, ['xliff'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [component], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                          'approved',
                          __hook__('#()', transUnit, [
                            'getAttribute',
                            ['approved']
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') === 'yes' ? 1 : 0
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        var nodes = __hook__('#()', __hook__('#.', __hook__('#.', Array, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'), ['map'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'), [
                          'call',
                          [
                            __hook__('#.', __hook__('#.', __hook__('#()', transUnitWrapper, [
                              'getElementsByTagName',
                              ['wrapper']
                            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'), ['childNodes'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes'),
                            function (node) {
                              return __hook__(node => {
                                return node;
                              }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes');
                            }
                          ]
                        ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js,nodes');
                        while (__hook__('#.', nodes, ['length'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') > 0) {
                          __hook__('#()', bodyTag, [
                            'appendChild',
                            [__hook__('#()', nodes, [
                                'shift',
                                []
                              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
                          ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                        }
                      }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
                    }, [
                      'bind',
                      [this]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
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
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
                  'getElementsByTagName',
                  ['wrapper']
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [0], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), ['firstChild'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')]
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            __hook__(callback, null, [
              xmlHeader + __hook__('#()', serializer, [
                'serializeToString',
                [xliff]
              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
              stats
            ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
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
              return __hook__('#()', JSON, [
                'stringify',
                [value]
              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
            case 'undefined':
            default:
              return '';
            }
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      __hook__('#=', __hook__('#.', XliffConv, ['prototype'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'), [
        '_traverseBundle',
        function (id, source, target, callback) {
          return __hook__((id, source, target, callback) => {
            if (typeof target === 'object') {
              for (var prop in __hook__('#*', target, [], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js')) {
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
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    source && __hook__('#()', source, [
                      'hasOwnProperty',
                      [prop]
                    ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', source, [prop], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : typeof source === 'object' && __hook__('#.', source, ['other'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') ? __hook__('#.', source, ['other'], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js') : '',
                    __hook__('#.', target, [prop], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js'),
                    callback
                  ]
                ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
              }
            } else {
              __hook__(callback, null, [
                id,
                source,
                target
              ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
            }
          }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
        }
      ], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
      return XliffConv;
    }, null, arguments, '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js');
  }
], '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js', 0);
},{"xmldom":7}],7:[function(require,module,exports){
function DOMParser(options) {
  return __hook__(options => {
    __hook__('=', this, [
      'options',
      options || { locator: {} }
    ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMParser');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMParser');
}
__hook__('=', __hook__('.', DOMParser, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom-parser.js'), [
  'parseFromString',
  function (source, mimeType) {
    return __hook__((source, mimeType) => {
      var options = __hook__('.', this, ['options'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,options');
      var sax = __hook__(XMLReader, null, [], '/components/thin-hook/node_modules/xmldom/dom-parser.js,sax', true);
      var domBuilder = __hook__('.', options, ['domBuilder'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,domBuilder') || __hook__(DOMHandler, null, [], '/components/thin-hook/node_modules/xmldom/dom-parser.js,domBuilder', true);
      //contentHandler and LexicalHandler
      var errorHandler = __hook__('.', options, ['errorHandler'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,errorHandler');
      var locator = __hook__('.', options, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,locator');
      var defaultNSMap = __hook__('.', options, ['xmlns'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,defaultNSMap') || {};
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
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      }
      __hook__('=', sax, [
        'errorHandler',
        __hook__(buildErrorHandler, null, [
          errorHandler,
          domBuilder,
          locator
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js', 0)
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      __hook__('=', sax, [
        'domBuilder',
        __hook__('.', options, ['domBuilder'], '/components/thin-hook/node_modules/xmldom/dom-parser.js') || domBuilder
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      if (__hook__('()', /\/x?html?$/, [
          'test',
          [mimeType]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js')) {
        __hook__('=', entityMap, [
          'nbsp',
          '\xA0'
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
        __hook__('=', entityMap, [
          'copy',
          '\xA9'
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
        __hook__('=', defaultNSMap, [
          '',
          'http://www.w3.org/1999/xhtml'
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      }
      __hook__('=', defaultNSMap, [
        'xml',
        __hook__('.', defaultNSMap, ['xml'], '/components/thin-hook/node_modules/xmldom/dom-parser.js') || 'http://www.w3.org/XML/1998/namespace'
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      if (source) {
        __hook__('()', sax, [
          'parse',
          [
            source,
            defaultNSMap,
            entityMap
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      } else {
        __hook__('()', __hook__('.', sax, ['errorHandler'], '/components/thin-hook/node_modules/xmldom/dom-parser.js'), [
          'error',
          ['invalid doc source']
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      }
      return __hook__('.', domBuilder, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
    }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js');
  }
], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
function buildErrorHandler(errorImpl, domBuilder, locator) {
  return __hook__((errorImpl, domBuilder, locator) => {
    if (!errorImpl) {
      if (domBuilder instanceof DOMHandler) {
        return domBuilder;
      }
      errorImpl = domBuilder;
    }
    var errorHandler = {};
    var isCallback = errorImpl instanceof $hook$.global(__hook__, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,isCallback', 'Function', 'get')['_pp_Function;/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,isCallback'];
    locator = locator || {};
    function build(key) {
      return __hook__(key => {
        var fn = __hook__('.', errorImpl, [key], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build,fn');
        if (!fn && isCallback) {
          fn = __hook__('.', errorImpl, ['length'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build') == 2 ? function (msg) {
            return __hook__(msg => {
              __hook__(errorImpl, null, [
                key,
                msg
              ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build', 0);
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build');
          } : errorImpl;
        }
        __hook__('=', errorHandler, [
          key,
          fn && function (msg) {
            return __hook__(msg => {
              __hook__(fn, null, ['[xmldom ' + key + ']\t' + msg + __hook__(_locator, null, [locator], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build', 0)], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build', 0);
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build');
          } || function () {
            return __hook__(() => {
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build');
          }
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler,build');
    }
    __hook__(build, null, ['warning'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler', 0);
    __hook__(build, null, ['error'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler', 0);
    __hook__(build, null, ['fatalError'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler', 0);
    return errorHandler;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,buildErrorHandler');
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
    ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMHandler');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMHandler');
}
function position(locator, node) {
  return __hook__((locator, node) => {
    __hook__('=', node, [
      'lineNumber',
      __hook__('.', locator, ['lineNumber'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,position')
    ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,position');
    __hook__('=', node, [
      'columnNumber',
      __hook__('.', locator, ['columnNumber'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,position')
    ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,position');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,position');
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
          __hook__('()', __hook__(DOMImplementation, null, [], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument', true), [
            'createDocument',
            [
              null,
              null,
              null
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument')
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument');
        if (__hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument')) {
          __hook__('=', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument'), [
            'documentURI',
            __hook__('.', __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument'), ['systemId'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument')
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDocument');
    },
    startElement: function (namespaceURI, localName, qName, attrs) {
      return __hook__((namespaceURI, localName, qName, attrs) => {
        var doc = __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,doc');
        var el = __hook__('()', doc, [
          'createElementNS',
          [
            namespaceURI,
            qName || localName
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,el');
        var len = __hook__('.', attrs, ['length'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,len');
        __hook__(appendElement, null, [
          this,
          el
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement', 0);
        __hook__('=', this, [
          'currentElement',
          el
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement');
        __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement') && __hook__(position, null, [
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement'),
          el
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement', 0);
        for (var i = 0; i < len; i++) {
          var namespaceURI = __hook__('()', attrs, [
            'getURI',
            [i]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,namespaceURI');
          var value = __hook__('()', attrs, [
            'getValue',
            [i]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,value');
          var qName = __hook__('()', attrs, [
            'getQName',
            [i]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,qName');
          var attr = __hook__('()', doc, [
            'createAttributeNS',
            [
              namespaceURI,
              qName
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement,attr');
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement') && __hook__(position, null, [
            __hook__('()', attrs, [
              'getLocator',
              [i]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement'),
            attr
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement', 0);
          __hook__('=', attr, [
            'value',
            __hook__('=', attr, [
              'nodeValue',
              value
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement')
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement');
          __hook__('()', el, [
            'setAttributeNode',
            [attr]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,startElement');
    },
    endElement: function (namespaceURI, localName, qName) {
      return __hook__((namespaceURI, localName, qName) => {
        var current = __hook__('.', this, ['currentElement'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement,current');
        var tagName = __hook__('.', current, ['tagName'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement,tagName');
        __hook__('=', this, [
          'currentElement',
          __hook__('.', current, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement')
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,endElement');
    },
    startPrefixMapping: function (prefix, uri) {
      return __hook__((prefix, uri) => {
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,startPrefixMapping');
    },
    endPrefixMapping: function (prefix) {
      return __hook__(prefix => {
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,endPrefixMapping');
    },
    processingInstruction: function (target, data) {
      return __hook__((target, data) => {
        var ins = __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction,ins'), [
          'createProcessingInstruction',
          [
            target,
            data
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction,ins');
        __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction') && __hook__(position, null, [
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction'),
          ins
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction', 0);
        __hook__(appendElement, null, [
          this,
          ins
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,processingInstruction');
    },
    ignorableWhitespace: function (ch, start, length) {
      return __hook__((ch, start, length) => {
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,ignorableWhitespace');
    },
    characters: function (chars, start, length) {
      return __hook__((chars, start, length) => {
        chars = __hook__('()', _toString, [
          'apply',
          [
            this,
            arguments
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters');
        //console.log(chars)
        if (chars) {
          if (__hook__('.', this, ['cdata'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters')) {
            var charNode = __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters,charNode'), [
              'createCDATASection',
              [chars]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters,charNode');
          } else {
            var charNode = __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters,charNode'), [
              'createTextNode',
              [chars]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters,charNode');
          }
          if (__hook__('.', this, ['currentElement'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters')) {
            __hook__('()', __hook__('.', this, ['currentElement'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters'), [
              'appendChild',
              [charNode]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters');
          } else if (__hook__('()', /^\s*$/, [
              'test',
              [chars]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters')) {
            __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters'), [
              'appendChild',
              [charNode]
            ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters');  //process xml
          }
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters') && __hook__(position, null, [
            __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters'),
            charNode
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters', 0);
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,characters');
    },
    skippedEntity: function (name) {
      return __hook__(name => {
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,skippedEntity');
    },
    endDocument: function () {
      return __hook__(() => {
        __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endDocument'), [
          'normalize',
          []
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endDocument');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,endDocument');
    },
    setDocumentLocator: function (locator) {
      return __hook__(locator => {
        if (__hook__('=', this, [
            'locator',
            locator
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,setDocumentLocator')) {
          // && !('lineNumber' in locator)){
          __hook__('=', locator, [
            'lineNumber',
            0
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,setDocumentLocator');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,setDocumentLocator');
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
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment');
        var comm = __hook__('()', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment,comm'), [
          'createComment',
          [chars]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment,comm');
        __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment') && __hook__(position, null, [
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment'),
          comm
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment', 0);
        __hook__(appendElement, null, [
          this,
          comm
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,comment');
    },
    startCDATA: function () {
      return __hook__(() => {
        //used in characters() methods
        __hook__('=', this, [
          'cdata',
          true
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startCDATA');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,startCDATA');
    },
    endCDATA: function () {
      return __hook__(() => {
        __hook__('=', this, [
          'cdata',
          false
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,endCDATA');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,endCDATA');
    },
    startDTD: function (name, publicId, systemId) {
      return __hook__((name, publicId, systemId) => {
        var impl = __hook__('.', __hook__('.', this, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD,impl'), ['implementation'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD,impl');
        if (impl && __hook__('.', impl, ['createDocumentType'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD')) {
          var dt = __hook__('()', impl, [
            'createDocumentType',
            [
              name,
              publicId,
              systemId
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD,dt');
          __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD') && __hook__(position, null, [
            __hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD'),
            dt
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD', 0);
          __hook__(appendElement, null, [
            this,
            dt
          ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD', 0);
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,startDTD');
    },
    /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
    warning: function (error) {
      return __hook__(error => {
        __hook__('()', console, [
          'warn',
          [
            '[xmldom warning]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,warning')], '/components/thin-hook/node_modules/xmldom/dom-parser.js,warning', 0)
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,warning');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,warning');
    },
    error: function (error) {
      return __hook__(error => {
        __hook__('()', console, [
          'error',
          [
            '[xmldom error]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,error')], '/components/thin-hook/node_modules/xmldom/dom-parser.js,error', 0)
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,error');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,error');
    },
    fatalError: function (error) {
      return __hook__(error => {
        __hook__('()', console, [
          'error',
          [
            '[xmldom fatalError]\t' + error,
            __hook__(_locator, null, [__hook__('.', this, ['locator'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError')], '/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError', 0)
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError');
        throw error;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,fatalError');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
function _locator(l) {
  return __hook__(l => {
    if (l) {
      return '\n@' + (__hook__('.', l, ['systemId'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_locator') || '') + '#[line:' + __hook__('.', l, ['lineNumber'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_locator') + ',col:' + __hook__('.', l, ['columnNumber'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_locator') + ']';
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,_locator');
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
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString');
    } else {
      //java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
      if (__hook__('.', chars, ['length'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString') >= start + length || start) {
        return __hook__(__hook__('.', __hook__('.', java, ['lang'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString'), ['String'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString'), null, [
          chars,
          start,
          length
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString', true) + '';
      }
      return chars;
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,_toString');
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
        __hook__('=', __hook__('.', DOMHandler, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom-parser.js'), [
          key,
          function () {
            return __hook__(() => {
              return null;
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js');
          }
        ], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js');
    }
  ]
], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
  return __hook__((hander, node) => {
    if (!__hook__('.', hander, ['currentElement'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement')) {
      __hook__('()', __hook__('.', hander, ['doc'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement'), [
        'appendChild',
        [node]
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement');
    } else {
      __hook__('()', __hook__('.', hander, ['currentElement'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement'), [
        'appendChild',
        [node]
      ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom-parser.js,appendElement');
}
//appendChild and setAttributeNS are preformance key
//if(typeof require == 'function'){
var XMLReader = __hook__('.', __hook__(() => require('./sax'), null, [
  'require',
  './sax',
  '/components/thin-hook/node_modules/xmldom/sax.js'
], '/components/thin-hook/node_modules/xmldom/dom-parser.js,XMLReader', NaN), ['XMLReader'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,XMLReader');
var DOMImplementation = __hook__('=', exports, [
  'DOMImplementation',
  __hook__('.', __hook__(() => require('./dom'), null, [
    'require',
    './dom',
    '/components/thin-hook/node_modules/xmldom/dom.js'
  ], '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMImplementation', NaN), ['DOMImplementation'], '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMImplementation')
], '/components/thin-hook/node_modules/xmldom/dom-parser.js,DOMImplementation');
__hook__('=', exports, [
  'XMLSerializer',
  __hook__('.', __hook__(() => require('./dom'), null, [
    'require',
    './dom',
    '/components/thin-hook/node_modules/xmldom/dom.js'
  ], '/components/thin-hook/node_modules/xmldom/dom-parser.js', NaN), ['XMLSerializer'], '/components/thin-hook/node_modules/xmldom/dom-parser.js')
], '/components/thin-hook/node_modules/xmldom/dom-parser.js');
__hook__('=', exports, [
  'DOMParser',
  DOMParser
], '/components/thin-hook/node_modules/xmldom/dom-parser.js');  //}

},{"./dom":8,"./sax":9}],8:[function(require,module,exports){
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
function copy(src, dest) {
  return __hook__((src, dest) => {
    for (var p in __hook__('*', src, [], '/components/thin-hook/node_modules/xmldom/dom.js,copy')) {
      __hook__('=', dest, [
        p,
        __hook__('.', src, [p], '/components/thin-hook/node_modules/xmldom/dom.js,copy')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,copy');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,copy');
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
  return __hook__((Class, Super) => {
    var pt = __hook__('.', Class, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js,_extends,pt');
    if (__hook__('.', Object, ['create'], '/components/thin-hook/node_modules/xmldom/dom.js,_extends')) {
      var ppt = __hook__('()', Object, [
        'create',
        [__hook__('.', Super, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js,_extends,ppt')]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends,ppt');
      __hook__('=', pt, [
        '__proto__',
        ppt
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
    }
    if (!(pt instanceof Super)) {
      function t() {
        return __hook__(() => {
        }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_extends,t');
      }
      ;
      __hook__('=', t, [
        'prototype',
        __hook__('.', Super, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js,_extends')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
      t = __hook__(t, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,_extends', true);
      __hook__(copy, null, [
        pt,
        t
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends', 0);
      __hook__('=', Class, [
        'prototype',
        pt = t
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
    }
    if (__hook__('.', pt, ['constructor'], '/components/thin-hook/node_modules/xmldom/dom.js,_extends') != Class) {
      if (typeof Class != 'function') {
        __hook__('()', console, [
          'error',
          ['unknow Class:' + Class]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
      }
      __hook__('=', pt, [
        'constructor',
        Class
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_extends');
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = __hook__('=', NodeType, [
  'ELEMENT_NODE',
  1
], '/components/thin-hook/node_modules/xmldom/dom.js,ELEMENT_NODE');
var ATTRIBUTE_NODE = __hook__('=', NodeType, [
  'ATTRIBUTE_NODE',
  2
], '/components/thin-hook/node_modules/xmldom/dom.js,ATTRIBUTE_NODE');
var TEXT_NODE = __hook__('=', NodeType, [
  'TEXT_NODE',
  3
], '/components/thin-hook/node_modules/xmldom/dom.js,TEXT_NODE');
var CDATA_SECTION_NODE = __hook__('=', NodeType, [
  'CDATA_SECTION_NODE',
  4
], '/components/thin-hook/node_modules/xmldom/dom.js,CDATA_SECTION_NODE');
var ENTITY_REFERENCE_NODE = __hook__('=', NodeType, [
  'ENTITY_REFERENCE_NODE',
  5
], '/components/thin-hook/node_modules/xmldom/dom.js,ENTITY_REFERENCE_NODE');
var ENTITY_NODE = __hook__('=', NodeType, [
  'ENTITY_NODE',
  6
], '/components/thin-hook/node_modules/xmldom/dom.js,ENTITY_NODE');
var PROCESSING_INSTRUCTION_NODE = __hook__('=', NodeType, [
  'PROCESSING_INSTRUCTION_NODE',
  7
], '/components/thin-hook/node_modules/xmldom/dom.js,PROCESSING_INSTRUCTION_NODE');
var COMMENT_NODE = __hook__('=', NodeType, [
  'COMMENT_NODE',
  8
], '/components/thin-hook/node_modules/xmldom/dom.js,COMMENT_NODE');
var DOCUMENT_NODE = __hook__('=', NodeType, [
  'DOCUMENT_NODE',
  9
], '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_NODE');
var DOCUMENT_TYPE_NODE = __hook__('=', NodeType, [
  'DOCUMENT_TYPE_NODE',
  10
], '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_TYPE_NODE');
var DOCUMENT_FRAGMENT_NODE = __hook__('=', NodeType, [
  'DOCUMENT_FRAGMENT_NODE',
  11
], '/components/thin-hook/node_modules/xmldom/dom.js,DOCUMENT_FRAGMENT_NODE');
var NOTATION_NODE = __hook__('=', NodeType, [
  'NOTATION_NODE',
  12
], '/components/thin-hook/node_modules/xmldom/dom.js,NOTATION_NODE');
// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = __hook__('=', ExceptionCode, [
  'INDEX_SIZE_ERR',
  (__hook__('=', ExceptionMessage, [
    1,
    'Index size error'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INDEX_SIZE_ERR'), 1)
], '/components/thin-hook/node_modules/xmldom/dom.js,INDEX_SIZE_ERR');
var DOMSTRING_SIZE_ERR = __hook__('=', ExceptionCode, [
  'DOMSTRING_SIZE_ERR',
  (__hook__('=', ExceptionMessage, [
    2,
    'DOMString size error'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMSTRING_SIZE_ERR'), 2)
], '/components/thin-hook/node_modules/xmldom/dom.js,DOMSTRING_SIZE_ERR');
var HIERARCHY_REQUEST_ERR = __hook__('=', ExceptionCode, [
  'HIERARCHY_REQUEST_ERR',
  (__hook__('=', ExceptionMessage, [
    3,
    'Hierarchy request error'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,HIERARCHY_REQUEST_ERR'), 3)
], '/components/thin-hook/node_modules/xmldom/dom.js,HIERARCHY_REQUEST_ERR');
var WRONG_DOCUMENT_ERR = __hook__('=', ExceptionCode, [
  'WRONG_DOCUMENT_ERR',
  (__hook__('=', ExceptionMessage, [
    4,
    'Wrong document'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,WRONG_DOCUMENT_ERR'), 4)
], '/components/thin-hook/node_modules/xmldom/dom.js,WRONG_DOCUMENT_ERR');
var INVALID_CHARACTER_ERR = __hook__('=', ExceptionCode, [
  'INVALID_CHARACTER_ERR',
  (__hook__('=', ExceptionMessage, [
    5,
    'Invalid character'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_CHARACTER_ERR'), 5)
], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_CHARACTER_ERR');
var NO_DATA_ALLOWED_ERR = __hook__('=', ExceptionCode, [
  'NO_DATA_ALLOWED_ERR',
  (__hook__('=', ExceptionMessage, [
    6,
    'No data allowed'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,NO_DATA_ALLOWED_ERR'), 6)
], '/components/thin-hook/node_modules/xmldom/dom.js,NO_DATA_ALLOWED_ERR');
var NO_MODIFICATION_ALLOWED_ERR = __hook__('=', ExceptionCode, [
  'NO_MODIFICATION_ALLOWED_ERR',
  (__hook__('=', ExceptionMessage, [
    7,
    'No modification allowed'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,NO_MODIFICATION_ALLOWED_ERR'), 7)
], '/components/thin-hook/node_modules/xmldom/dom.js,NO_MODIFICATION_ALLOWED_ERR');
var NOT_FOUND_ERR = __hook__('=', ExceptionCode, [
  'NOT_FOUND_ERR',
  (__hook__('=', ExceptionMessage, [
    8,
    'Not found'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,NOT_FOUND_ERR'), 8)
], '/components/thin-hook/node_modules/xmldom/dom.js,NOT_FOUND_ERR');
var NOT_SUPPORTED_ERR = __hook__('=', ExceptionCode, [
  'NOT_SUPPORTED_ERR',
  (__hook__('=', ExceptionMessage, [
    9,
    'Not supported'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,NOT_SUPPORTED_ERR'), 9)
], '/components/thin-hook/node_modules/xmldom/dom.js,NOT_SUPPORTED_ERR');
var INUSE_ATTRIBUTE_ERR = __hook__('=', ExceptionCode, [
  'INUSE_ATTRIBUTE_ERR',
  (__hook__('=', ExceptionMessage, [
    10,
    'Attribute in use'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INUSE_ATTRIBUTE_ERR'), 10)
], '/components/thin-hook/node_modules/xmldom/dom.js,INUSE_ATTRIBUTE_ERR');
//level2
var INVALID_STATE_ERR = __hook__('=', ExceptionCode, [
  'INVALID_STATE_ERR',
  (__hook__('=', ExceptionMessage, [
    11,
    'Invalid state'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_STATE_ERR'), 11)
], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_STATE_ERR');
var SYNTAX_ERR = __hook__('=', ExceptionCode, [
  'SYNTAX_ERR',
  (__hook__('=', ExceptionMessage, [
    12,
    'Syntax error'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,SYNTAX_ERR'), 12)
], '/components/thin-hook/node_modules/xmldom/dom.js,SYNTAX_ERR');
var INVALID_MODIFICATION_ERR = __hook__('=', ExceptionCode, [
  'INVALID_MODIFICATION_ERR',
  (__hook__('=', ExceptionMessage, [
    13,
    'Invalid modification'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_MODIFICATION_ERR'), 13)
], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_MODIFICATION_ERR');
var NAMESPACE_ERR = __hook__('=', ExceptionCode, [
  'NAMESPACE_ERR',
  (__hook__('=', ExceptionMessage, [
    14,
    'Invalid namespace'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,NAMESPACE_ERR'), 14)
], '/components/thin-hook/node_modules/xmldom/dom.js,NAMESPACE_ERR');
var INVALID_ACCESS_ERR = __hook__('=', ExceptionCode, [
  'INVALID_ACCESS_ERR',
  (__hook__('=', ExceptionMessage, [
    15,
    'Invalid access'
  ], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_ACCESS_ERR'), 15)
], '/components/thin-hook/node_modules/xmldom/dom.js,INVALID_ACCESS_ERR');
function DOMException(code, message) {
  return __hook__((code, message) => {
    if (message instanceof $hook$.global(__hook__, '/components/thin-hook/node_modules/xmldom/dom.js,DOMException', 'Error', 'get')['_pp_Error;/components/thin-hook/node_modules/xmldom/dom.js,DOMException']) {
      var error = message;
    } else {
      error = this;
      __hook__('()', Error, [
        'call',
        [
          this,
          __hook__('.', ExceptionMessage, [code], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException')
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
      __hook__('=', this, [
        'message',
        __hook__('.', ExceptionMessage, [code], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
      if (__hook__('.', Error, ['captureStackTrace'], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException'))
        __hook__('()', Error, [
          'captureStackTrace',
          [
            this,
            DOMException
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
    }
    __hook__('=', error, [
      'code',
      code
    ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
    if (message)
      __hook__('=', this, [
        'message',
        __hook__('.', this, ['message'], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException') + ': ' + message
      ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
    return error;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,DOMException');
}
;
__hook__('=', DOMException, [
  'prototype',
  __hook__('.', Error, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js')
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(copy, null, [
  ExceptionCode,
  DOMException
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,NodeList');
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
        return __hook__('.', this, [index], '/components/thin-hook/node_modules/xmldom/dom.js,item') || null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,item');
    },
    toString: function (isHTML, nodeFilter) {
      return __hook__((isHTML, nodeFilter) => {
        for (var buf = [], i = 0; i < __hook__('.', this, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,toString'); i++) {
          __hook__(serializeToString, null, [
            __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/dom.js,toString'),
            buf,
            isHTML,
            nodeFilter
          ], '/components/thin-hook/node_modules/xmldom/dom.js,toString', 0);
        }
        return __hook__('()', buf, [
          'join',
          ['']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,toString');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,toString');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
function LiveNodeList(node, refresh) {
  return __hook__((node, refresh) => {
    __hook__('=', this, [
      '_node',
      node
    ], '/components/thin-hook/node_modules/xmldom/dom.js,LiveNodeList');
    __hook__('=', this, [
      '_refresh',
      refresh
    ], '/components/thin-hook/node_modules/xmldom/dom.js,LiveNodeList');
    __hook__(_updateLiveList, null, [this], '/components/thin-hook/node_modules/xmldom/dom.js,LiveNodeList', 0);
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,LiveNodeList');
}
function _updateLiveList(list) {
  return __hook__(list => {
    var inc = __hook__('.', __hook__('.', list, ['_node'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc'), ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc') || __hook__('.', __hook__('.', __hook__('.', list, ['_node'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc'), ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc'), ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,inc');
    if (__hook__('.', list, ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList') != inc) {
      var ls = __hook__('()', list, [
        '_refresh',
        [__hook__('.', list, ['_node'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,ls')]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList,ls');
      //console.log(ls.length)
      __hook__(__set__, null, [
        list,
        'length',
        __hook__('.', ls, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList', 0);
      __hook__(copy, null, [
        ls,
        list
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList', 0);
      __hook__('=', list, [
        '_inc',
        inc
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_updateLiveList');
}
__hook__('=', __hook__('.', LiveNodeList, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'item',
  function (i) {
    return __hook__(i => {
      __hook__(_updateLiveList, null, [this], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
      return __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/dom.js');
    }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js');
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  LiveNodeList,
  NodeList
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,NamedNodeMap');
}
;
function _findNodeIndex(list, node) {
  return __hook__((list, node) => {
    var i = __hook__('.', list, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,_findNodeIndex,i');
    while (i--) {
      if (__hook__('.', list, [i], '/components/thin-hook/node_modules/xmldom/dom.js,_findNodeIndex') === node) {
        return i;
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_findNodeIndex');
}
function _addNamedNode(el, list, newAttr, oldAttr) {
  return __hook__((el, list, newAttr, oldAttr) => {
    if (oldAttr) {
      __hook__('=', list, [
        __hook__(_findNodeIndex, null, [
          list,
          oldAttr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode', 0),
        newAttr
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode');
    } else {
      __hook__('=', list, [
        __hook__('p++', list, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode'),
        newAttr
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode');
    }
    if (el) {
      __hook__('=', newAttr, [
        'ownerElement',
        el
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode');
      var doc = __hook__('.', el, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode,doc');
      if (doc) {
        oldAttr && __hook__(_onRemoveAttribute, null, [
          doc,
          el,
          oldAttr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode', 0);
        __hook__(_onAddAttribute, null, [
          doc,
          el,
          newAttr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode', 0);
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_addNamedNode');
}
function _removeNamedNode(el, list, attr) {
  return __hook__((el, list, attr) => {
    //console.log('remove attr:'+attr)
    var i = __hook__(_findNodeIndex, null, [
      list,
      attr
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,i', 0);
    if (i >= 0) {
      var lastIndex = __hook__('.', list, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,lastIndex') - 1;
      while (i < lastIndex) {
        __hook__('=', list, [
          i,
          __hook__('.', list, [++i], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode');
      }
      __hook__('=', list, [
        'length',
        lastIndex
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode');
      if (el) {
        var doc = __hook__('.', el, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode,doc');
        if (doc) {
          __hook__(_onRemoveAttribute, null, [
            doc,
            el,
            attr
          ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode', 0);
          __hook__('=', attr, [
            'ownerElement',
            null
          ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode');
        }
      }
    } else {
      throw __hook__(DOMException, null, [
        NOT_FOUND_ERR,
        __hook__(Error, null, [__hook__('.', el, ['tagName'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode') + '@' + attr], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode', true)
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode', 0);
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_removeNamedNode');
}
__hook__('=', NamedNodeMap, [
  'prototype',
  {
    length: 0,
    item: __hook__('.', __hook__('.', NodeList, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js,item'), ['item'], '/components/thin-hook/node_modules/xmldom/dom.js,item'),
    getNamedItem: function (key) {
      return __hook__(key => {
        //		if(key.indexOf(':')>0 || key == 'xmlns'){
        //			return null;
        //		}
        //console.log()
        var i = __hook__('.', this, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem,i');
        while (i--) {
          var attr = __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem,attr');
          //console.log(attr.nodeName,key)
          if (__hook__('.', attr, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem') == key) {
            return attr;
          }
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItem');
    },
    setNamedItem: function (attr) {
      return __hook__(attr => {
        var el = __hook__('.', attr, ['ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem,el');
        if (el && el != __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem')) {
          throw __hook__(DOMException, null, [INUSE_ATTRIBUTE_ERR], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem', true);
        }
        var oldAttr = __hook__('()', this, [
          'getNamedItem',
          [__hook__('.', attr, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem,oldAttr')]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem,oldAttr');
        __hook__(_addNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem'),
          this,
          attr,
          oldAttr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem', 0);
        return oldAttr;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItem');
    },
    /* returns Node */
    setNamedItemNS: function (attr) {
      return __hook__(attr => {
        // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
        var el = __hook__('.', attr, ['ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS,el'), oldAttr;
        if (el && el != __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS')) {
          throw __hook__(DOMException, null, [INUSE_ATTRIBUTE_ERR], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS', true);
        }
        oldAttr = __hook__('()', this, [
          'getNamedItemNS',
          [
            __hook__('.', attr, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS'),
            __hook__('.', attr, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS')
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS');
        __hook__(_addNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS'),
          this,
          attr,
          oldAttr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS', 0);
        return oldAttr;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setNamedItemNS');
    },
    /* returns Node */
    removeNamedItem: function (key) {
      return __hook__(key => {
        var attr = __hook__('()', this, [
          'getNamedItem',
          [key]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem,attr');
        __hook__(_removeNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem'),
          this,
          attr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem', 0);
        return attr;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItem');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS,attr');
        __hook__(_removeNamedNode, null, [
          __hook__('.', this, ['_ownerElement'], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS'),
          this,
          attr
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS', 0);
        return attr;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeNamedItemNS');
    },
    getNamedItemNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var i = __hook__('.', this, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS,i');
        while (i--) {
          var node = __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS,node');
          if (__hook__('.', node, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS') == localName && __hook__('.', node, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS') == namespaceURI) {
            return node;
          }
        }
        return null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getNamedItemNS');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(features) {
  return __hook__(features => {
    __hook__('=', this, [
      '_features',
      {}
    ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation');
    if (features) {
      for (var feature in __hook__('*', features, [], '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation')) {
        __hook__('=', this, [
          '_features',
          __hook__('.', features, [feature], '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation');
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,DOMImplementation');
}
;
__hook__('=', DOMImplementation, [
  'prototype',
  {
    hasFeature: function (feature, version) {
      return __hook__((feature, version) => {
        var versions = __hook__('.', __hook__('.', this, ['_features'], '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature,versions'), [__hook__('()', feature, [
            'toLowerCase',
            []
          ], '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature,versions')], '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature,versions');
        if (versions && (!version || __hook__('in', versions, [version], '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature'))) {
          return true;
        } else {
          return false;
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,hasFeature');
    },
    // Introduced in DOM Level 2:
    createDocument: function (namespaceURI, qualifiedName, doctype) {
      return __hook__((namespaceURI, qualifiedName, doctype) => {
        // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
        var doc = __hook__(Document, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument,doc', true);
        __hook__('=', doc, [
          'implementation',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
        __hook__('=', doc, [
          'childNodes',
          __hook__(NodeList, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
        __hook__('=', doc, [
          'doctype',
          doctype
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
        if (doctype) {
          __hook__('()', doc, [
            'appendChild',
            [doctype]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
        }
        if (qualifiedName) {
          var root = __hook__('()', doc, [
            'createElementNS',
            [
              namespaceURI,
              qualifiedName
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument,root');
          __hook__('()', doc, [
            'appendChild',
            [root]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
        }
        return doc;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createDocument');
    },
    // Introduced in DOM Level 2:
    createDocumentType: function (qualifiedName, publicId, systemId) {
      return __hook__((qualifiedName, publicId, systemId) => {
        // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
        var node = __hook__(DocumentType, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType,node', true);
        __hook__('=', node, [
          'name',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType');
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType');
        __hook__('=', node, [
          'publicId',
          publicId
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType');
        __hook__('=', node, [
          'systemId',
          systemId
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType');
        // Introduced in DOM Level 2:
        //readonly attribute DOMString        internalSubset;
        //TODO:..
        //  readonly attribute NamedNodeMap     entities;
        //  readonly attribute NamedNodeMap     notations;
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentType');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */
function Node() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Node');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceChild');
        if (oldChild) {
          __hook__('()', this, [
            'removeChild',
            [oldChild]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceChild');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,replaceChild');
    },
    removeChild: function (oldChild) {
      return __hook__(oldChild => {
        return __hook__(_removeChild, null, [
          this,
          oldChild
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeChild', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeChild');
    },
    appendChild: function (newChild) {
      return __hook__(newChild => {
        return __hook__('()', this, [
          'insertBefore',
          [
            newChild,
            null
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,appendChild');
    },
    hasChildNodes: function () {
      return __hook__(() => {
        return __hook__('.', this, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,hasChildNodes') != null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,hasChildNodes');
    },
    cloneNode: function (deep) {
      return __hook__(deep => {
        return __hook__(cloneNode, null, [
          __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode') || this,
          this,
          deep
        ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
    },
    // Modified in DOM Level 2:
    normalize: function () {
      return __hook__(() => {
        var child = __hook__('.', this, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,normalize,child');
        while (child) {
          var next = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,normalize,next');
          if (next && __hook__('.', next, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,normalize') == TEXT_NODE && __hook__('.', child, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,normalize') == TEXT_NODE) {
            __hook__('()', this, [
              'removeChild',
              [next]
            ], '/components/thin-hook/node_modules/xmldom/dom.js,normalize');
            __hook__('()', child, [
              'appendData',
              [__hook__('.', next, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,normalize')]
            ], '/components/thin-hook/node_modules/xmldom/dom.js,normalize');
          } else {
            __hook__('()', child, [
              'normalize',
              []
            ], '/components/thin-hook/node_modules/xmldom/dom.js,normalize');
            child = next;
          }
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,normalize');
    },
    // Introduced in DOM Level 2:
    isSupported: function (feature, version) {
      return __hook__((feature, version) => {
        return __hook__('()', __hook__('.', __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,isSupported'), ['implementation'], '/components/thin-hook/node_modules/xmldom/dom.js,isSupported'), [
          'hasFeature',
          [
            feature,
            version
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,isSupported');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,isSupported');
    },
    // Introduced in DOM Level 2:
    hasAttributes: function () {
      return __hook__(() => {
        return __hook__('.', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributes'), ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributes') > 0;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributes');
    },
    lookupPrefix: function (namespaceURI) {
      return __hook__(namespaceURI => {
        var el = this;
        while (el) {
          var map = __hook__('.', el, ['_nsMap'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix,map');
          //console.dir(map)
          if (map) {
            for (var n in __hook__('*', map, [], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix')) {
              if (__hook__('.', map, [n], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix') == namespaceURI) {
                return n;
              }
            }
          }
          el = __hook__('.', el, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix') == ATTRIBUTE_NODE ? __hook__('.', el, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix') : __hook__('.', el, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix');
        }
        return null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,lookupPrefix');
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function (prefix) {
      return __hook__(prefix => {
        var el = this;
        while (el) {
          var map = __hook__('.', el, ['_nsMap'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI,map');
          //console.dir(map)
          if (map) {
            if (__hook__('in', map, [prefix], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI')) {
              return __hook__('.', map, [prefix], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI');
            }
          }
          el = __hook__('.', el, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI') == ATTRIBUTE_NODE ? __hook__('.', el, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI') : __hook__('.', el, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI');
        }
        return null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,lookupNamespaceURI');
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function (namespaceURI) {
      return __hook__(namespaceURI => {
        var prefix = __hook__('()', this, [
          'lookupPrefix',
          [namespaceURI]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,isDefaultNamespace,prefix');
        return prefix == null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,isDefaultNamespace');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
function _xmlEncoder(c) {
  return __hook__(c => {
    return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + __hook__('()', c, [
      'charCodeAt',
      []
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_xmlEncoder') + ';';
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_xmlEncoder');
}
__hook__(copy, null, [
  NodeType,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
__hook__(copy, null, [
  NodeType,
  __hook__('.', Node, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js')
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
  return __hook__((node, callback) => {
    if (__hook__(callback, null, [node], '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode', 0)) {
      return true;
    }
    if (node = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode')) {
      do {
        if (__hook__(_visitNode, null, [
            node,
            callback
          ], '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode', 0)) {
          return true;
        }
      } while (node = __hook__('.', node, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode'));
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_visitNode');
}
function Document() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Document');
}
function _onAddAttribute(doc, el, newAttr) {
  return __hook__((doc, el, newAttr) => {
    doc && __hook__('p++', doc, ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute');
    var ns = __hook__('.', newAttr, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute,ns');
    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      __hook__('=', __hook__('.', el, ['_nsMap'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute'), [
        __hook__('.', newAttr, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute') ? __hook__('.', newAttr, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute') : '',
        __hook__('.', newAttr, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_onAddAttribute');
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  return __hook__((doc, el, newAttr, remove) => {
    doc && __hook__('p++', doc, ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute');
    var ns = __hook__('.', newAttr, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute,ns');
    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      __hook__('delete', __hook__('.', el, ['_nsMap'], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute'), [__hook__('.', newAttr, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute') ? __hook__('.', newAttr, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute') : ''], '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_onRemoveAttribute');
}
function _onUpdateChild(doc, el, newChild) {
  return __hook__((doc, el, newChild) => {
    if (doc && __hook__('.', doc, ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild')) {
      __hook__('p++', doc, ['_inc'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
      //update childNodes
      var cs = __hook__('.', el, ['childNodes'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild,cs');
      if (newChild) {
        __hook__('=', cs, [
          __hook__('p++', cs, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild'),
          newChild
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
      } else {
        //console.log(1)
        var child = __hook__('.', el, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild,child');
        var i = 0;
        while (child) {
          __hook__('=', cs, [
            i++,
            child
          ], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
          child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
        }
        __hook__('=', cs, [
          'length',
          i
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_onUpdateChild');
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
    var previous = __hook__('.', child, ['previousSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild,previous');
    var next = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild,next');
    if (previous) {
      __hook__('=', previous, [
        'nextSibling',
        next
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild');
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        next
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild');
    }
    if (next) {
      __hook__('=', next, [
        'previousSibling',
        previous
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild');
    } else {
      __hook__('=', parentNode, [
        'lastChild',
        previous
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild');
    }
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild'),
      parentNode
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild', 0);
    return child;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_removeChild');
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
  return __hook__((parentNode, newChild, nextChild) => {
    var cp = __hook__('.', newChild, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,cp');
    if (cp) {
      __hook__('()', cp, [
        'removeChild',
        [newChild]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');  //remove and update
    }
    if (__hook__('.', newChild, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore') === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = __hook__('.', newChild, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,newFirst');
      if (newFirst == null) {
        return newChild;
      }
      var newLast = __hook__('.', newChild, ['lastChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,newLast');
    } else {
      newFirst = newLast = newChild;
    }
    var pre = nextChild ? __hook__('.', nextChild, ['previousSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,pre') : __hook__('.', parentNode, ['lastChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore,pre');
    __hook__('=', newFirst, [
      'previousSibling',
      pre
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    __hook__('=', newLast, [
      'nextSibling',
      nextChild
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    if (pre) {
      __hook__('=', pre, [
        'nextSibling',
        newFirst
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        newFirst
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    }
    if (nextChild == null) {
      __hook__('=', parentNode, [
        'lastChild',
        newLast
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    } else {
      __hook__('=', nextChild, [
        'previousSibling',
        newLast
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    }
    do {
      __hook__('=', newFirst, [
        'parentNode',
        parentNode
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    } while (newFirst !== newLast && (newFirst = __hook__('.', newFirst, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore')));
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore') || parentNode,
      parentNode
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore', 0);
    //console.log(parentNode.lastChild.nextSibling == null)
    if (__hook__('.', newChild, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore') == DOCUMENT_FRAGMENT_NODE) {
      __hook__('=', newChild, [
        'firstChild',
        __hook__('=', newChild, [
          'lastChild',
          null
        ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore')
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
    }
    return newChild;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_insertBefore');
}
function _appendSingleChild(parentNode, newChild) {
  return __hook__((parentNode, newChild) => {
    var cp = __hook__('.', newChild, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,cp');
    if (cp) {
      var pre = __hook__('.', parentNode, ['lastChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,pre');
      __hook__('()', cp, [
        'removeChild',
        [newChild]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
      //remove and update
      var pre = __hook__('.', parentNode, ['lastChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,pre');
    }
    var pre = __hook__('.', parentNode, ['lastChild'], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild,pre');
    __hook__('=', newChild, [
      'parentNode',
      parentNode
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    __hook__('=', newChild, [
      'previousSibling',
      pre
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    __hook__('=', newChild, [
      'nextSibling',
      null
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    if (pre) {
      __hook__('=', pre, [
        'nextSibling',
        newChild
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    } else {
      __hook__('=', parentNode, [
        'firstChild',
        newChild
      ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    }
    __hook__('=', parentNode, [
      'lastChild',
      newChild
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
    __hook__(_onUpdateChild, null, [
      __hook__('.', parentNode, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild'),
      parentNode,
      newChild
    ], '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild', 0);
    return newChild;  //console.log("__aa",parentNode.lastChild.nextSibling == null)
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,_appendSingleChild');
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
        if (__hook__('.', newChild, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore') == DOCUMENT_FRAGMENT_NODE) {
          var child = __hook__('.', newChild, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore,child');
          while (child) {
            var next = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore,next');
            __hook__('()', this, [
              'insertBefore',
              [
                child,
                refChild
              ]
            ], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore');
            child = next;
          }
          return newChild;
        }
        if (__hook__('.', this, ['documentElement'], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore') == null && __hook__('.', newChild, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore') == ELEMENT_NODE) {
          __hook__('=', this, [
            'documentElement',
            newChild
          ], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore');
        }
        return __hook__(_insertBefore, null, [
          this,
          newChild,
          refChild
        ], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore', 0), __hook__('=', newChild, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore'), newChild;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,insertBefore');
    },
    removeChild: function (oldChild) {
      return __hook__(oldChild => {
        if (__hook__('.', this, ['documentElement'], '/components/thin-hook/node_modules/xmldom/dom.js,removeChild') == oldChild) {
          __hook__('=', this, [
            'documentElement',
            null
          ], '/components/thin-hook/node_modules/xmldom/dom.js,removeChild');
        }
        return __hook__(_removeChild, null, [
          this,
          oldChild
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeChild', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeChild');
    },
    // Introduced in DOM Level 2:
    importNode: function (importedNode, deep) {
      return __hook__((importedNode, deep) => {
        return __hook__(importNode, null, [
          this,
          importedNode,
          deep
        ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode', 0);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
    },
    // Introduced in DOM Level 2:
    getElementById: function (id) {
      return __hook__(id => {
        var rtv = null;
        __hook__(_visitNode, null, [
          __hook__('.', this, ['documentElement'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementById'),
          function (node) {
            return __hook__(node => {
              if (__hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementById') == ELEMENT_NODE) {
                if (__hook__('()', node, [
                    'getAttribute',
                    ['id']
                  ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementById') == id) {
                  rtv = node;
                  return true;
                }
              }
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementById');
          }
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementById', 0);
        return rtv;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementById');
    },
    //document factory method:
    createElement: function (tagName) {
      return __hook__(tagName => {
        var node = __hook__(Element, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElement,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
        __hook__('=', node, [
          'nodeName',
          tagName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
        __hook__('=', node, [
          'tagName',
          tagName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElement', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
        var attrs = __hook__('=', node, [
          'attributes',
          __hook__(NamedNodeMap, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElement,attrs', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement,attrs');
        __hook__('=', attrs, [
          '_ownerElement',
          node
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createElement');
    },
    createDocumentFragment: function () {
      return __hook__(() => {
        var node = __hook__(DocumentFragment, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment');
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createDocumentFragment');
    },
    createTextNode: function (data) {
      return __hook__(data => {
        var node = __hook__(Text, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode');
        __hook__('()', node, [
          'appendData',
          [data]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createTextNode');
    },
    createComment: function (data) {
      return __hook__(data => {
        var node = __hook__(Comment, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createComment,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createComment');
        __hook__('()', node, [
          'appendData',
          [data]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createComment');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createComment');
    },
    createCDATASection: function (data) {
      return __hook__(data => {
        var node = __hook__(CDATASection, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection');
        __hook__('()', node, [
          'appendData',
          [data]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createCDATASection');
    },
    createProcessingInstruction: function (target, data) {
      return __hook__((target, data) => {
        var node = __hook__(ProcessingInstruction, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction');
        __hook__('=', node, [
          'tagName',
          __hook__('=', node, [
            'target',
            target
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction');
        __hook__('=', node, [
          'nodeValue',
          __hook__('=', node, [
            'data',
            data
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createProcessingInstruction');
    },
    createAttribute: function (name) {
      return __hook__(name => {
        var node = __hook__(Attr, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
        __hook__('=', node, [
          'name',
          name
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
        __hook__('=', node, [
          'nodeName',
          name
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
        __hook__('=', node, [
          'localName',
          name
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
        __hook__('=', node, [
          'specified',
          true
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createAttribute');
    },
    createEntityReference: function (name) {
      return __hook__(name => {
        var node = __hook__(EntityReference, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference,node', true);
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference');
        __hook__('=', node, [
          'nodeName',
          name
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createEntityReference');
    },
    // Introduced in DOM Level 2:
    createElementNS: function (namespaceURI, qualifiedName) {
      return __hook__((namespaceURI, qualifiedName) => {
        var node = __hook__(Element, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,node', true);
        var pl = __hook__('()', qualifiedName, [
          'split',
          [':']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,pl');
        var attrs = __hook__('=', node, [
          'attributes',
          __hook__(NamedNodeMap, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,attrs', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS,attrs');
        __hook__('=', node, [
          'childNodes',
          __hook__(NodeList, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS', true)
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        __hook__('=', node, [
          'tagName',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        __hook__('=', node, [
          'namespaceURI',
          namespaceURI
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        if (__hook__('.', pl, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS') == 2) {
          __hook__('=', node, [
            'prefix',
            __hook__('.', pl, [0], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS')
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
          __hook__('=', node, [
            'localName',
            __hook__('.', pl, [1], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS')
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        } else {
          //el.prefix = null;
          __hook__('=', node, [
            'localName',
            qualifiedName
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        }
        __hook__('=', attrs, [
          '_ownerElement',
          node
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createElementNS');
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function (namespaceURI, qualifiedName) {
      return __hook__((namespaceURI, qualifiedName) => {
        var node = __hook__(Attr, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS,node', true);
        var pl = __hook__('()', qualifiedName, [
          'split',
          [':']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS,pl');
        __hook__('=', node, [
          'ownerDocument',
          this
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        __hook__('=', node, [
          'nodeName',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        __hook__('=', node, [
          'name',
          qualifiedName
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        __hook__('=', node, [
          'namespaceURI',
          namespaceURI
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        __hook__('=', node, [
          'specified',
          true
        ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        if (__hook__('.', pl, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS') == 2) {
          __hook__('=', node, [
            'prefix',
            __hook__('.', pl, [0], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS')
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
          __hook__('=', node, [
            'localName',
            __hook__('.', pl, [1], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS')
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        } else {
          //el.prefix = null;
          __hook__('=', node, [
            'localName',
            qualifiedName
          ], '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
        }
        return node;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,createAttributeNS');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Document,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Element() {
  return __hook__(() => {
    __hook__('=', this, [
      '_nsMap',
      {}
    ], '/components/thin-hook/node_modules/xmldom/dom.js,Element');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Element');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,hasAttribute') != null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,hasAttribute');
    },
    getAttribute: function (name) {
      return __hook__(name => {
        var attr = __hook__('()', this, [
          'getAttributeNode',
          [name]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getAttribute,attr');
        return attr && __hook__('.', attr, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,getAttribute') || '';
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getAttribute');
    },
    getAttributeNode: function (name) {
      return __hook__(name => {
        return __hook__('()', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNode'), [
          'getNamedItem',
          [name]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNode');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNode');
    },
    setAttribute: function (name, value) {
      return __hook__((name, value) => {
        var attr = __hook__('()', __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute,attr'), [
          'createAttribute',
          [name]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute,attr');
        __hook__('=', attr, [
          'value',
          __hook__('=', attr, [
            'nodeValue',
            '' + value
          ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute');
        __hook__('()', this, [
          'setAttributeNode',
          [attr]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setAttribute');
    },
    removeAttribute: function (name) {
      return __hook__(name => {
        var attr = __hook__('()', this, [
          'getAttributeNode',
          [name]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttribute,attr');
        attr && __hook__('()', this, [
          'removeAttributeNode',
          [attr]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttribute');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeAttribute');
    },
    //four real opeartion method
    appendChild: function (newChild) {
      return __hook__(newChild => {
        if (__hook__('.', newChild, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild') === DOCUMENT_FRAGMENT_NODE) {
          return __hook__('()', this, [
            'insertBefore',
            [
              newChild,
              null
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild');
        } else {
          return __hook__(_appendSingleChild, null, [
            this,
            newChild
          ], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild', 0);
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,appendChild');
    },
    setAttributeNode: function (newAttr) {
      return __hook__(newAttr => {
        return __hook__('()', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNode'), [
          'setNamedItem',
          [newAttr]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNode');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNode');
    },
    setAttributeNodeNS: function (newAttr) {
      return __hook__(newAttr => {
        return __hook__('()', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNodeNS'), [
          'setNamedItemNS',
          [newAttr]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNodeNS');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNodeNS');
    },
    removeAttributeNode: function (oldAttr) {
      return __hook__(oldAttr => {
        //console.log(this == oldAttr.ownerElement)
        return __hook__('()', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNode'), [
          'removeNamedItem',
          [__hook__('.', oldAttr, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNode')]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNode');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNode');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNS,old');
        old && __hook__('()', this, [
          'removeAttributeNode',
          [old]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNS');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,removeAttributeNS');
    },
    hasAttributeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        return __hook__('()', this, [
          'getAttributeNodeNS',
          [
            namespaceURI,
            localName
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributeNS') != null;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,hasAttributeNS');
    },
    getAttributeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        var attr = __hook__('()', this, [
          'getAttributeNodeNS',
          [
            namespaceURI,
            localName
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNS,attr');
        return attr && __hook__('.', attr, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNS') || '';
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNS');
    },
    setAttributeNS: function (namespaceURI, qualifiedName, value) {
      return __hook__((namespaceURI, qualifiedName, value) => {
        var attr = __hook__('()', __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS,attr'), [
          'createAttributeNS',
          [
            namespaceURI,
            qualifiedName
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS,attr');
        __hook__('=', attr, [
          'value',
          __hook__('=', attr, [
            'nodeValue',
            '' + value
          ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS');
        __hook__('()', this, [
          'setAttributeNode',
          [attr]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,setAttributeNS');
    },
    getAttributeNodeNS: function (namespaceURI, localName) {
      return __hook__((namespaceURI, localName) => {
        return __hook__('()', __hook__('.', this, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNodeNS'), [
          'getNamedItemNS',
          [
            namespaceURI,
            localName
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNodeNS');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getAttributeNodeNS');
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
                    if (node !== base && __hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName') == ELEMENT_NODE && (tagName === '*' || __hook__('.', node, ['tagName'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName') == tagName)) {
                      __hook__('()', ls, [
                        'push',
                        [node]
                      ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName');
                    }
                  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName');
                }
              ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName', 0);
              return ls;
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName');
          }
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName', true);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagName');
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
                    if (node !== base && __hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS') === ELEMENT_NODE && (namespaceURI === '*' || __hook__('.', node, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS') === namespaceURI) && (localName === '*' || __hook__('.', node, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS') == localName)) {
                      __hook__('()', ls, [
                        'push',
                        [node]
                      ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS');
                    }
                  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS');
                }
              ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS', 0);
              return ls;
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS');
          }
        ], '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS', true);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getElementsByTagNameNS');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__('=', __hook__('.', Document, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'getElementsByTagName',
  __hook__('.', __hook__('.', Element, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), ['getElementsByTagName'], '/components/thin-hook/node_modules/xmldom/dom.js')
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__('=', __hook__('.', Document, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'getElementsByTagNameNS',
  __hook__('.', __hook__('.', Element, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), ['getElementsByTagNameNS'], '/components/thin-hook/node_modules/xmldom/dom.js')
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Element,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Attr() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Attr');
}
;
__hook__('=', __hook__('.', Attr, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  ATTRIBUTE_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Attr,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function CharacterData() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,CharacterData');
}
;
__hook__('=', CharacterData, [
  'prototype',
  {
    data: '',
    substringData: function (offset, count) {
      return __hook__((offset, count) => {
        return __hook__('()', __hook__('.', this, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,substringData'), [
          'substring',
          [
            offset,
            offset + count
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,substringData');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,substringData');
    },
    appendData: function (text) {
      return __hook__(text => {
        text = __hook__('.', this, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,appendData') + text;
        __hook__('=', this, [
          'nodeValue',
          __hook__('=', this, [
            'data',
            text
          ], '/components/thin-hook/node_modules/xmldom/dom.js,appendData')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,appendData');
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,appendData')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,appendData');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,appendData');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,insertData');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,insertData');
    },
    appendChild: function (newChild) {
      return __hook__(newChild => {
        throw __hook__(Error, null, [__hook__('.', ExceptionMessage, [HIERARCHY_REQUEST_ERR], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild')], '/components/thin-hook/node_modules/xmldom/dom.js,appendChild', true);
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,appendChild');
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
        ], '/components/thin-hook/node_modules/xmldom/dom.js,deleteData');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,deleteData');
    },
    replaceData: function (offset, count, text) {
      return __hook__((offset, count, text) => {
        var start = __hook__('()', __hook__('.', this, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,start'), [
          'substring',
          [
            0,
            offset
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,start');
        var end = __hook__('()', __hook__('.', this, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,end'), [
          'substring',
          [offset + count]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData,end');
        text = start + text + end;
        __hook__('=', this, [
          'nodeValue',
          __hook__('=', this, [
            'data',
            text
          ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData');
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,replaceData');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,replaceData');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  CharacterData,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Text() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Text');
}
;
__hook__('=', Text, [
  'prototype',
  {
    nodeName: '#text',
    nodeType: TEXT_NODE,
    splitText: function (offset) {
      return __hook__(offset => {
        var text = __hook__('.', this, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText,text');
        var newText = __hook__('()', text, [
          'substring',
          [offset]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText,newText');
        text = __hook__('()', text, [
          'substring',
          [
            0,
            offset
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText');
        __hook__('=', this, [
          'data',
          __hook__('=', this, [
            'nodeValue',
            text
          ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText');
        __hook__('=', this, [
          'length',
          __hook__('.', text, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText')
        ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText');
        var newNode = __hook__('()', __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText,newNode'), [
          'createTextNode',
          [newText]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText,newNode');
        if (__hook__('.', this, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText')) {
          __hook__('()', __hook__('.', this, ['parentNode'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText'), [
            'insertBefore',
            [
              newNode,
              __hook__('.', this, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,splitText')
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,splitText');
        }
        return newNode;
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,splitText');
    }
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Text,
  CharacterData
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Comment() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Comment');
}
;
__hook__('=', Comment, [
  'prototype',
  {
    nodeName: '#comment',
    nodeType: COMMENT_NODE
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Comment,
  CharacterData
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function CDATASection() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,CDATASection');
}
;
__hook__('=', CDATASection, [
  'prototype',
  {
    nodeName: '#cdata-section',
    nodeType: CDATA_SECTION_NODE
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  CDATASection,
  CharacterData
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function DocumentType() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,DocumentType');
}
;
__hook__('=', __hook__('.', DocumentType, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  DOCUMENT_TYPE_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  DocumentType,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Notation() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Notation');
}
;
__hook__('=', __hook__('.', Notation, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  NOTATION_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Notation,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function Entity() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,Entity');
}
;
__hook__('=', __hook__('.', Entity, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  ENTITY_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  Entity,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function EntityReference() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,EntityReference');
}
;
__hook__('=', __hook__('.', EntityReference, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  ENTITY_REFERENCE_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  EntityReference,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function DocumentFragment() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,DocumentFragment');
}
;
__hook__('=', __hook__('.', DocumentFragment, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeName',
  '#document-fragment'
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__('=', __hook__('.', DocumentFragment, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  DOCUMENT_FRAGMENT_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  DocumentFragment,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function ProcessingInstruction() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,ProcessingInstruction');
}
__hook__('=', __hook__('.', ProcessingInstruction, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'nodeType',
  PROCESSING_INSTRUCTION_NODE
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__(_extends, null, [
  ProcessingInstruction,
  Node
], '/components/thin-hook/node_modules/xmldom/dom.js', 0);
function XMLSerializer() {
  return __hook__(() => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,XMLSerializer');
}
__hook__('=', __hook__('.', XMLSerializer, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
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
      ], '/components/thin-hook/node_modules/xmldom/dom.js');
    }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js');
  }
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__('=', __hook__('.', Node, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'), [
  'toString',
  nodeSerializeToString
], '/components/thin-hook/node_modules/xmldom/dom.js');
function nodeSerializeToString(isHtml, nodeFilter) {
  return __hook__((isHtml, nodeFilter) => {
    var buf = [];
    var refNode = __hook__('.', this, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,refNode') == 9 ? __hook__('.', this, ['documentElement'], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,refNode') : this;
    var prefix = __hook__('.', refNode, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,prefix');
    var uri = __hook__('.', refNode, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,uri');
    if (uri && prefix == null) {
      //console.log(prefix)
      var prefix = __hook__('()', refNode, [
        'lookupPrefix',
        [uri]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString,prefix');
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
    ], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString', 0);
    //console.log('###',this.nodeType,uri,prefix,buf.join(''))
    return __hook__('()', buf, [
      'join',
      ['']
    ], '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,nodeSerializeToString');
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  return __hook__((node, isHTML, visibleNamespaces) => {
    var prefix = __hook__('.', node, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,prefix') || '';
    var uri = __hook__('.', node, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,uri');
    if (!prefix && !uri) {
      return false;
    }
    if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace' || uri == 'http://www.w3.org/2000/xmlns/') {
      return false;
    }
    var i = __hook__('.', visibleNamespaces, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,i');
    //console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
    while (i--) {
      var ns = __hook__('.', visibleNamespaces, [i], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine,ns');
      // get namespace prefix
      //console.log(node.nodeType,node.tagName,ns.prefix,prefix)
      if (__hook__('.', ns, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine') == prefix) {
        return __hook__('.', ns, ['namespace'], '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine') != uri;
      }
    }
    //console.log(isHTML,uri,prefix=='')
    //if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
    //	return false;
    //}
    //node.flag = '11111'
    //console.error(3,true,node.flag,node.prefix,node.namespaceURI)
    return true;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,needNamespaceDefine');
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  return __hook__((node, buf, isHTML, nodeFilter, visibleNamespaces) => {
    if (nodeFilter) {
      node = __hook__(nodeFilter, null, [node], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0);
      if (node) {
        if (typeof node == 'string') {
          __hook__('()', buf, [
            'push',
            [node]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
          return;
        }
      } else {
        return;
      }  //buf.sort.apply(attrs, attributeSorter);
    }
    switch (__hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')) {
    case ELEMENT_NODE:
      if (!visibleNamespaces)
        visibleNamespaces = [];
      var startVisibleNamespaces = __hook__('.', visibleNamespaces, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,startVisibleNamespaces');
      var attrs = __hook__('.', node, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,attrs');
      var len = __hook__('.', attrs, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,len');
      var child = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,child');
      var nodeName = __hook__('.', node, ['tagName'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,nodeName');
      isHTML = htmlns === __hook__('.', node, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString') || isHTML;
      __hook__('()', buf, [
        'push',
        [
          '<',
          nodeName
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      for (var i = 0; i < len; i++) {
        // add namespaces for attributes
        var attr = __hook__('()', attrs, [
          'item',
          [i]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,attr');
        if (__hook__('.', attr, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString') == 'xmlns') {
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: __hook__('.', attr, ['localName'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,prefix'),
                namespace: __hook__('.', attr, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,namespace')
              }]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        } else if (__hook__('.', attr, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString') == 'xmlns') {
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: '',
                namespace: __hook__('.', attr, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,namespace')
              }]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = __hook__('()', attrs, [
          'item',
          [i]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,attr');
        if (__hook__(needNamespaceDefine, null, [
            attr,
            isHTML,
            visibleNamespaces
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0)) {
          var prefix = __hook__('.', attr, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,prefix') || '';
          var uri = __hook__('.', attr, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,uri');
          var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
          __hook__('()', buf, [
            'push',
            [
              ns,
              '="',
              uri,
              '"'
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
          __hook__('()', visibleNamespaces, [
            'push',
            [{
                prefix: prefix,
                namespace: uri
              }]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        }
        __hook__(serializeToString, null, [
          attr,
          buf,
          isHTML,
          nodeFilter,
          visibleNamespaces
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0);
      }
      // add namespace for current node		
      if (__hook__(needNamespaceDefine, null, [
          node,
          isHTML,
          visibleNamespaces
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0)) {
        var prefix = __hook__('.', node, ['prefix'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,prefix') || '';
        var uri = __hook__('.', node, ['namespaceURI'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,uri');
        var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
        __hook__('()', buf, [
          'push',
          [
            ns,
            '="',
            uri,
            '"'
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        __hook__('()', visibleNamespaces, [
          'push',
          [{
              prefix: prefix,
              namespace: uri
            }]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      }
      if (child || isHTML && !__hook__('()', /^(?:meta|link|img|br|hr|input)$/i, [
          'test',
          [nodeName]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')) {
        __hook__('()', buf, [
          'push',
          ['>']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        //if is cdata child node
        if (isHTML && __hook__('()', /^script$/i, [
            'test',
            [nodeName]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')) {
          while (child) {
            if (__hook__('.', child, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')) {
              __hook__('()', buf, [
                'push',
                [__hook__('.', child, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')]
              ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
            } else {
              __hook__(serializeToString, null, [
                child,
                buf,
                isHTML,
                nodeFilter,
                visibleNamespaces
              ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0);
            }
            child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
          }
        } else {
          while (child) {
            __hook__(serializeToString, null, [
              child,
              buf,
              isHTML,
              nodeFilter,
              visibleNamespaces
            ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0);
            child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
          }
        }
        __hook__('()', buf, [
          'push',
          [
            '</',
            nodeName,
            '>'
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      } else {
        __hook__('()', buf, [
          'push',
          ['/>']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      }
      // remove added visible namespaces
      //visibleNamespaces.length = startVisibleNamespaces;
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,child');
      while (child) {
        __hook__(serializeToString, null, [
          child,
          buf,
          isHTML,
          nodeFilter,
          visibleNamespaces
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString', 0);
        child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      }
      return;
    case ATTRIBUTE_NODE:
      return __hook__('()', buf, [
        'push',
        [
          ' ',
          __hook__('.', node, ['name'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          '="',
          __hook__('()', __hook__('.', node, ['value'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'), [
            'replace',
            [
              /[<&"]/g,
              _xmlEncoder
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          '"'
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    case TEXT_NODE:
      return __hook__('()', buf, [
        'push',
        [__hook__('()', __hook__('.', node, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'), [
            'replace',
            [
              /[<&]/g,
              _xmlEncoder
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    case CDATA_SECTION_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<![CDATA[',
          __hook__('.', node, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          ']]>'
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    case COMMENT_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<!--',
          __hook__('.', node, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          '-->'
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    case DOCUMENT_TYPE_NODE:
      var pubid = __hook__('.', node, ['publicId'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,pubid');
      var sysid = __hook__('.', node, ['systemId'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,sysid');
      __hook__('()', buf, [
        'push',
        [
          '<!DOCTYPE ',
          __hook__('.', node, ['name'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      if (pubid) {
        __hook__('()', buf, [
          'push',
          [
            ' PUBLIC "',
            pubid
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        if (sysid && sysid != '.') {
          __hook__('()', buf, [
            'push',
            [
              '" "',
              sysid
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        }
        __hook__('()', buf, [
          'push',
          ['">']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      } else if (sysid && sysid != '.') {
        __hook__('()', buf, [
          'push',
          [
            ' SYSTEM "',
            sysid,
            '">'
          ]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      } else {
        var sub = __hook__('.', node, ['internalSubset'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString,sub');
        if (sub) {
          __hook__('()', buf, [
            'push',
            [
              ' [',
              sub,
              ']'
            ]
          ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
        }
        __hook__('()', buf, [
          'push',
          ['>']
        ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '<?',
          __hook__('.', node, ['target'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          ' ',
          __hook__('.', node, ['data'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          '?>'
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    case ENTITY_REFERENCE_NODE:
      return __hook__('()', buf, [
        'push',
        [
          '&',
          __hook__('.', node, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString'),
          ';'
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    //case ENTITY_NODE:
    //case NOTATION_NODE:
    default:
      __hook__('()', buf, [
        'push',
        [
          '??',
          __hook__('.', node, ['nodeName'], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString')
        ]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,serializeToString');
}
function importNode(doc, node, deep) {
  return __hook__((doc, node, deep) => {
    var node2;
    switch (__hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,importNode')) {
    case ELEMENT_NODE:
      node2 = __hook__('()', node, [
        'cloneNode',
        [false]
      ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
      __hook__('=', node2, [
        'ownerDocument',
        doc
      ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
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
      ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');  //false
    }
    __hook__('=', node2, [
      'ownerDocument',
      doc
    ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
    __hook__('=', node2, [
      'parentNode',
      null
    ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
    if (deep) {
      var child = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,importNode,child');
      while (child) {
        __hook__('()', node2, [
          'appendChild',
          [__hook__(importNode, null, [
              doc,
              child,
              deep
            ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode', 0)]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
        child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
      }
    }
    return node2;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,importNode');
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc, node, deep) {
  return __hook__((doc, node, deep) => {
    var node2 = __hook__(__hook__('.', node, ['constructor'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,node2'), null, [], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,node2', true);
    for (var n in __hook__('*', node, [], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode')) {
      var v = __hook__('.', node, [n], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,v');
      if (typeof v != 'object') {
        if (v != __hook__('.', node2, [n], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode')) {
          __hook__('=', node2, [
            n,
            v
          ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
        }
      }
    }
    if (__hook__('.', node, ['childNodes'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode')) {
      __hook__('=', node2, [
        'childNodes',
        __hook__(NodeList, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode', true)
      ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
    }
    __hook__('=', node2, [
      'ownerDocument',
      doc
    ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
    switch (__hook__('.', node2, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode')) {
    case ELEMENT_NODE:
      var attrs = __hook__('.', node, ['attributes'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,attrs');
      var attrs2 = __hook__('=', node2, [
        'attributes',
        __hook__(NamedNodeMap, null, [], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,attrs2', true)
      ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,attrs2');
      var len = __hook__('.', attrs, ['length'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,len');
      __hook__('=', attrs2, [
        '_ownerElement',
        node2
      ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
      for (var i = 0; i < len; i++) {
        __hook__('()', node2, [
          'setAttributeNode',
          [__hook__(cloneNode, null, [
              doc,
              __hook__('()', attrs, [
                'item',
                [i]
              ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode'),
              true
            ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode', 0)]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
      }
      break;
      ;
    case ATTRIBUTE_NODE:
      deep = true;
    }
    if (deep) {
      var child = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode,child');
      while (child) {
        __hook__('()', node2, [
          'appendChild',
          [__hook__(cloneNode, null, [
              doc,
              child,
              deep
            ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode', 0)]
        ], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
        child = __hook__('.', child, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
      }
    }
    return node2;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,cloneNode');
}
function __set__(object, key, value) {
  return __hook__((object, key, value) => {
    __hook__('=', object, [
      key,
      value
    ], '/components/thin-hook/node_modules/xmldom/dom.js,__set__');
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,__set__');
}
//do dynamic
try {
  if (__hook__('.', Object, ['defineProperty'], '/components/thin-hook/node_modules/xmldom/dom.js')) {
    __hook__('()', Object, [
      'defineProperty',
      [
        __hook__('.', LiveNodeList, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'),
        'length',
        {
          get: function () {
            return __hook__(() => {
              __hook__(_updateLiveList, null, [this], '/components/thin-hook/node_modules/xmldom/dom.js,get', 0);
              return __hook__('.', this, ['$$length'], '/components/thin-hook/node_modules/xmldom/dom.js,get');
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,get');
          }
        }
      ]
    ], '/components/thin-hook/node_modules/xmldom/dom.js');
    __hook__('()', Object, [
      'defineProperty',
      [
        __hook__('.', Node, ['prototype'], '/components/thin-hook/node_modules/xmldom/dom.js'),
        'textContent',
        {
          get: function () {
            return __hook__(() => {
              return __hook__(getTextContent, null, [this], '/components/thin-hook/node_modules/xmldom/dom.js,get', 0);
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,get');
          },
          set: function (data) {
            return __hook__(data => {
              switch (__hook__('.', this, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,set')) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (__hook__('.', this, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,set')) {
                  __hook__('()', this, [
                    'removeChild',
                    [__hook__('.', this, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,set')]
                  ], '/components/thin-hook/node_modules/xmldom/dom.js,set');
                }
                if (data || __hook__(String, null, [data], '/components/thin-hook/node_modules/xmldom/dom.js,set', 0)) {
                  __hook__('()', this, [
                    'appendChild',
                    [__hook__('()', __hook__('.', this, ['ownerDocument'], '/components/thin-hook/node_modules/xmldom/dom.js,set'), [
                        'createTextNode',
                        [data]
                      ], '/components/thin-hook/node_modules/xmldom/dom.js,set')]
                  ], '/components/thin-hook/node_modules/xmldom/dom.js,set');
                }
                break;
              default:
                //TODO:
                __hook__('=', this, [
                  'data',
                  data
                ], '/components/thin-hook/node_modules/xmldom/dom.js,set');
                __hook__('=', this, [
                  'value',
                  data
                ], '/components/thin-hook/node_modules/xmldom/dom.js,set');
                __hook__('=', this, [
                  'nodeValue',
                  data
                ], '/components/thin-hook/node_modules/xmldom/dom.js,set');
              }
            }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,set');
          }
        }
      ]
    ], '/components/thin-hook/node_modules/xmldom/dom.js');
    function getTextContent(node) {
      return __hook__(node => {
        switch (__hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent')) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = __hook__('.', node, ['firstChild'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
          while (node) {
            if (__hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent') !== 7 && __hook__('.', node, ['nodeType'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent') !== 8) {
              __hook__('()', buf, [
                'push',
                [__hook__(getTextContent, null, [node], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent', 0)]
              ], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
            }
            node = __hook__('.', node, ['nextSibling'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
          }
          return __hook__('()', buf, [
            'join',
            ['']
          ], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
        default:
          return __hook__('.', node, ['nodeValue'], '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js,getTextContent');
    }
    __set__ = function (object, key, value) {
      return __hook__((object, key, value) => {
        //console.log(value)
        __hook__('=', object, [
          '$$' + key,
          value
        ], '/components/thin-hook/node_modules/xmldom/dom.js');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/dom.js');
    };
  }
} catch (e) {
}
//if(typeof require == 'function'){
__hook__('=', exports, [
  'DOMImplementation',
  DOMImplementation
], '/components/thin-hook/node_modules/xmldom/dom.js');
__hook__('=', exports, [
  'XMLSerializer',
  XMLSerializer
], '/components/thin-hook/node_modules/xmldom/dom.js');  //}

},{}],9:[function(require,module,exports){
//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
//\u10000-\uEFFFF
var nameChar = __hook__(RegExp, null, ['[\\-\\.0-9' + __hook__('()', __hook__('.', nameStartChar, ['source'], '/components/thin-hook/node_modules/xmldom/sax.js,nameChar'), [
    'slice',
    [
      1,
      -1
    ]
  ], '/components/thin-hook/node_modules/xmldom/sax.js,nameChar') + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]'], '/components/thin-hook/node_modules/xmldom/sax.js,nameChar', true);
var tagNamePattern = __hook__(RegExp, null, ['^' + __hook__('.', nameStartChar, ['source'], '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern') + __hook__('.', nameChar, ['source'], '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern') + '*(?::' + __hook__('.', nameStartChar, ['source'], '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern') + __hook__('.', nameChar, ['source'], '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern') + '*)?$'], '/components/thin-hook/node_modules/xmldom/sax.js,tagNamePattern', true);
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
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,XMLReader');
}
__hook__('=', XMLReader, [
  'prototype',
  {
    parse: function (source, defaultNSMap, entityMap) {
      return __hook__((source, defaultNSMap, entityMap) => {
        var domBuilder = __hook__('.', this, ['domBuilder'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,domBuilder');
        __hook__('()', domBuilder, [
          'startDocument',
          []
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
        __hook__(_copy, null, [
          defaultNSMap,
          defaultNSMap = {}
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
        __hook__(parse, null, [
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          __hook__('.', this, ['errorHandler'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
        __hook__('()', domBuilder, [
          'endDocument',
          []
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse');
    }
  }
], '/components/thin-hook/node_modules/xmldom/sax.js');
function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  return __hook__((source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) => {
    function fixedFromCharCode(code) {
      return __hook__(code => {
        // String.prototype.fromCharCode does not supports
        // > 2 bytes unicode chars directly
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return __hook__('()', String, [
            'fromCharCode',
            [
              surrogate1,
              surrogate2
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,fixedFromCharCode');
        } else {
          return __hook__('()', String, [
            'fromCharCode',
            [code]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,fixedFromCharCode');
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse,fixedFromCharCode');
    }
    function entityReplacer(a) {
      return __hook__(a => {
        var k = __hook__('()', a, [
          'slice',
          [
            1,
            -1
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer,k');
        if (__hook__('in', entityMap, [k], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer')) {
          return __hook__('.', entityMap, [k], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer');
        } else if (__hook__('()', k, [
            'charAt',
            [0]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer') === '#') {
          return __hook__(fixedFromCharCode, null, [__hook__(parseInt, null, [__hook__('()', __hook__('()', k, [
                'substr',
                [1]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer'), [
                'replace',
                [
                  'x',
                  '0x'
                ]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer')], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer', 0)], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer', 0);
        } else {
          __hook__('()', errorHandler, [
            'error',
            ['entity not found:' + a]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer');
          return a;
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse,entityReplacer');
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
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText,xt'), [
            'replace',
            [
              /&#?\w+;/g,
              entityReplacer
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText,xt');
          locator && __hook__(position, null, [start], '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText', 0);
          __hook__('()', domBuilder, [
            'characters',
            [
              xt,
              0,
              end - start
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText');
          start = end;
        }
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse,appendText');
    }
    function position(p, m) {
      return __hook__((p, m) => {
        while (p >= lineEnd && (m = __hook__('()', linePattern, [
            'exec',
            [source]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position'))) {
          lineStart = __hook__('.', m, ['index'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position');
          lineEnd = lineStart + __hook__('.', __hook__('.', m, [0], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position'), ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position');
          __hook__('p++', locator, ['lineNumber'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position');  //console.log('line++:',locator,startPos,endPos)
        }
        __hook__('=', locator, [
          'columnNumber',
          p - lineStart + 1
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,position');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse,position');
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /.*(?:\r\n?|\n)|.*$/g;
    var locator = __hook__('.', domBuilder, ['locator'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,locator');
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
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,tagStart');
        if (tagStart < 0) {
          if (!__hook__('()', __hook__('()', source, [
              'substr',
              [start]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse'), [
              'match',
              [/^\s*$/]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
            var doc = __hook__('.', domBuilder, ['doc'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,doc');
            var text = __hook__('()', doc, [
              'createTextNode',
              [__hook__('()', source, [
                  'substr',
                  [start]
                ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,text')]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,text');
            __hook__('()', doc, [
              'appendChild',
              [text]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            __hook__('=', domBuilder, [
              'currentElement',
              text
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
          }
          return;
        }
        if (tagStart > start) {
          __hook__(appendText, null, [tagStart], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
        }
        switch (__hook__('()', source, [
            'charAt',
            [tagStart + 1]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
        case '/':
          var end = __hook__('()', source, [
            'indexOf',
            [
              '>',
              tagStart + 3
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,end');
          var tagName = __hook__('()', source, [
            'substring',
            [
              tagStart + 2,
              end
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,tagName');
          var config = __hook__('()', parseStack, [
            'pop',
            []
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,config');
          if (end < 0) {
            tagName = __hook__('()', __hook__('()', source, [
              'substring',
              [tagStart + 2]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse'), [
              'replace',
              [
                /[\s<].*/,
                ''
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            //console.error('#@@@@@@'+tagName)
            __hook__('()', errorHandler, [
              'error',
              ['end tag name: ' + tagName + ' is not complete:' + __hook__('.', config, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            end = tagStart + 1 + __hook__('.', tagName, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
          } else if (__hook__('()', tagName, [
              'match',
              [/\s</]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
            tagName = __hook__('()', tagName, [
              'replace',
              [
                /[\s<].*/,
                ''
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            __hook__('()', errorHandler, [
              'error',
              ['end tag name: ' + tagName + ' maybe not complete']
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            end = tagStart + 1 + __hook__('.', tagName, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
          }
          //console.error(parseStack.length,parseStack)
          //console.error(config);
          var localNSMap = __hook__('.', config, ['localNSMap'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,localNSMap');
          var endMatch = __hook__('.', config, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,endMatch') == tagName;
          var endIgnoreCaseMach = endMatch || __hook__('.', config, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,endIgnoreCaseMach') && __hook__('()', __hook__('.', config, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,endIgnoreCaseMach'), [
            'toLowerCase',
            []
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,endIgnoreCaseMach') == __hook__('()', tagName, [
            'toLowerCase',
            []
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,endIgnoreCaseMach');
          if (endIgnoreCaseMach) {
            __hook__('()', domBuilder, [
              'endElement',
              [
                __hook__('.', config, ['uri'], '/components/thin-hook/node_modules/xmldom/sax.js,parse'),
                __hook__('.', config, ['localName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse'),
                tagName
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            if (localNSMap) {
              for (var prefix in __hook__('*', localNSMap, [], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
                __hook__('()', domBuilder, [
                  'endPrefixMapping',
                  [prefix]
                ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
              }
            }
            if (!endMatch) {
              __hook__('()', errorHandler, [
                'fatalError',
                ['end tag name: ' + tagName + ' is not match the current start tagName:' + __hook__('.', config, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            }
          } else {
            __hook__('()', parseStack, [
              'push',
              [config]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
          }
          end++;
          break;
        // end elment
        case '?':
          // <?...?>
          locator && __hook__(position, null, [tagStart], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          end = __hook__(parseInstruction, null, [
            source,
            tagStart,
            domBuilder
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          break;
        case '!':
          // <!doctype,<![CDATA,<!--
          locator && __hook__(position, null, [tagStart], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          end = __hook__(parseDCC, null, [
            source,
            tagStart,
            domBuilder,
            errorHandler
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          break;
        default:
          locator && __hook__(position, null, [tagStart], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          var el = __hook__(ElementAttributes, null, [], '/components/thin-hook/node_modules/xmldom/sax.js,parse,el', true);
          var currentNSMap = __hook__('.', __hook__('.', parseStack, [__hook__('.', parseStack, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,currentNSMap') - 1], '/components/thin-hook/node_modules/xmldom/sax.js,parse,currentNSMap'), ['currentNSMap'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,currentNSMap');
          //elStartEnd
          var end = __hook__(parseElementStartPart, null, [
            source,
            tagStart,
            el,
            currentNSMap,
            entityReplacer,
            errorHandler
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,end', 0);
          var len = __hook__('.', el, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parse,len');
          if (!__hook__('.', el, ['closed'], '/components/thin-hook/node_modules/xmldom/sax.js,parse') && __hook__(fixSelfClosed, null, [
              source,
              end,
              __hook__('.', el, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse'),
              closeMap
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0)) {
            __hook__('=', el, [
              'closed',
              true
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            if (!__hook__('.', entityMap, ['nbsp'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
              __hook__('()', errorHandler, [
                'warning',
                ['unclosed xml attribute']
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            }
          }
          if (locator && len) {
            var locator2 = __hook__(copyLocator, null, [
              locator,
              {}
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse,locator2', 0);
            //try{//attribute position fixed
            for (var i = 0; i < len; i++) {
              var a = __hook__('.', el, [i], '/components/thin-hook/node_modules/xmldom/sax.js,parse,a');
              __hook__(position, null, [__hook__('.', a, ['offset'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
              __hook__('=', a, [
                'locator',
                __hook__(copyLocator, null, [
                  locator,
                  {}
                ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0)
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            }
            //}catch(e){console.error('@@@@@'+e)}
            __hook__('=', domBuilder, [
              'locator',
              locator2
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            if (__hook__(appendElement, null, [
                el,
                domBuilder,
                currentNSMap
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0)) {
              __hook__('()', parseStack, [
                'push',
                [el]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            }
            __hook__('=', domBuilder, [
              'locator',
              locator
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
          } else {
            if (__hook__(appendElement, null, [
                el,
                domBuilder,
                currentNSMap
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0)) {
              __hook__('()', parseStack, [
                'push',
                [el]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
            }
          }
          if (__hook__('.', el, ['uri'], '/components/thin-hook/node_modules/xmldom/sax.js,parse') === 'http://www.w3.org/1999/xhtml' && !__hook__('.', el, ['closed'], '/components/thin-hook/node_modules/xmldom/sax.js,parse')) {
            end = __hook__(parseHtmlSpecialContent, null, [
              source,
              end,
              __hook__('.', el, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parse'),
              entityReplacer,
              domBuilder
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
          } else {
            end++;
          }
        }
      } catch (e) {
        __hook__('()', errorHandler, [
          'error',
          ['element parse error: ' + e]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parse');
        //errorHandler.error('element parse error: '+e);
        end = -1;  //throw e;
      }
      if (end > start) {
        start = end;
      } else {
        //TODO: 这里有可能sax回退，有位置错误风险
        __hook__(appendText, null, [__hook__('()', Math, [
            'max',
            [
              tagStart,
              start
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parse') + 1], '/components/thin-hook/node_modules/xmldom/sax.js,parse', 0);
      }
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parse');
}
function copyLocator(f, t) {
  return __hook__((f, t) => {
    __hook__('=', t, [
      'lineNumber',
      __hook__('.', f, ['lineNumber'], '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator')
    ], '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator');
    __hook__('=', t, [
      'columnNumber',
      __hook__('.', f, ['columnNumber'], '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator')
    ], '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator');
    return t;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,copyLocator');
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
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,c');
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
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          //fatalError: equal must after attrName or space after attrName
          throw __hook__(Error, null, ['attribute equal must after attrName'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
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
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            attrName = __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          }
          start = p + 1;
          p = __hook__('()', source, [
            'indexOf',
            [
              c,
              start
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          if (p > 0) {
            value = __hook__('()', __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart'), [
              'replace',
              [
                /&#?\w+;/g,
                entityReplacer
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            __hook__('()', el, [
              'add',
              [
                attrName,
                value,
                start - 1
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            s = S_ATTR_END;
          } else {
            //fatalError: no end quot match
            throw __hook__(Error, null, ['attribute value no end \'' + c + '\' match'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = __hook__('()', __hook__('()', source, [
            'slice',
            [
              start,
              p
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart'), [
            'replace',
            [
              /&#?\w+;/g,
              entityReplacer
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          //console.log(attrName,value,start,p)
          __hook__('()', el, [
            'add',
            [
              attrName,
              value,
              start
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          //console.dir(el)
          __hook__('()', errorHandler, [
            'warning',
            ['attribute "' + attrName + '" missed start quot(' + c + ')!!']
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          start = p + 1;
          s = S_ATTR_END;
        } else {
          //fatalError: no equal before
          throw __hook__(Error, null, ['attribute value must after "="'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
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
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
        case S_ATTR_END:
        case S_TAG_SPACE:
        case S_TAG_CLOSE:
          s = S_TAG_CLOSE;
          __hook__('=', el, [
            'closed',
            true
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
        case S_ATTR_NOQUOT_VALUE:
        case S_ATTR:
        case S_ATTR_SPACE:
          break;
        //case S_EQ:
        default:
          throw __hook__(Error, null, ['attribute invalid close char(\'/\')'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
        }
        break;
      case '':
        //end document
        //throw new Error('unexpected end of input')
        __hook__('()', errorHandler, [
          'error',
          ['unexpected end of input']
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
        if (s == S_TAG) {
          __hook__('()', el, [
            'setTagName',
            [__hook__('()', source, [
                'slice',
                [
                  start,
                  p
                ]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
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
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
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
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          if (__hook__('()', value, [
              'slice',
              [-1]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart') === '/') {
            __hook__('=', el, [
              'closed',
              true
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            value = __hook__('()', value, [
              'slice',
              [
                0,
                -1
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          }
        case S_ATTR_SPACE:
          if (s === S_ATTR_SPACE) {
            value = attrName;
          }
          if (s == S_ATTR_NOQUOT_VALUE) {
            __hook__('()', errorHandler, [
              'warning',
              ['attribute "' + value + '" missed quot(")!!']
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
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
                ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart'),
                start
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          } else {
            if (__hook__('.', currentNSMap, [''], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart') !== 'http://www.w3.org/1999/xhtml' || !__hook__('()', value, [
                'match',
                [/^(?:disabled|checked|selected)$/i]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')) {
              __hook__('()', errorHandler, [
                'warning',
                ['attribute "' + value + '" missed value!! "' + value + '" instead!!']
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            }
            __hook__('()', el, [
              'add',
              [
                value,
                value,
                start
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          }
          break;
        case S_EQ:
          throw __hook__(Error, null, ['attribute value missed!!'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
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
                ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
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
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            s = S_ATTR_SPACE;
            break;
          case S_ATTR_NOQUOT_VALUE:
            var value = __hook__('()', __hook__('()', source, [
              'slice',
              [
                start,
                p
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,value'), [
              'replace',
              [
                /&#?\w+;/g,
                entityReplacer
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,value');
            __hook__('()', errorHandler, [
              'warning',
              ['attribute "' + value + '" missed quot(")!!']
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            __hook__('()', el, [
              'add',
              [
                attrName,
                value,
                start
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
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
            var tagName = __hook__('.', el, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart,tagName');
            if (__hook__('.', currentNSMap, [''], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart') !== 'http://www.w3.org/1999/xhtml' || !__hook__('()', attrName, [
                'match',
                [/^(?:disabled|checked|selected)$/i]
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart')) {
              __hook__('()', errorHandler, [
                'warning',
                ['attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!']
              ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            }
            __hook__('()', el, [
              'add',
              [
                attrName,
                attrName,
                start
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
            start = p;
            s = S_ATTR;
            break;
          case S_ATTR_END:
            __hook__('()', errorHandler, [
              'warning',
              ['attribute space is required"' + attrName + '"!!']
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
          case S_TAG_SPACE:
            s = S_ATTR;
            start = p;
            break;
          case S_EQ:
            s = S_ATTR_NOQUOT_VALUE;
            start = p;
            break;
          case S_TAG_CLOSE:
            throw __hook__(Error, null, ['elements closed character \'/\' and \'>\' must be connected to'], '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart', true);
          }
        }
      }
      //end outer switch
      //console.log('p++',p)
      p++;
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parseElementStartPart');
}
/**
 * @return true if has new namespace define
 */
function appendElement(el, domBuilder, currentNSMap) {
  return __hook__((el, domBuilder, currentNSMap) => {
    var tagName = __hook__('.', el, ['tagName'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,tagName');
    var localNSMap = null;
    //var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
    var i = __hook__('.', el, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,i');
    while (i--) {
      var a = __hook__('.', el, [i], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,a');
      var qName = __hook__('.', a, ['qName'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,qName');
      var value = __hook__('.', a, ['value'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,value');
      var nsp = __hook__('()', qName, [
        'indexOf',
        [':']
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,nsp');
      if (nsp > 0) {
        var prefix = __hook__('=', a, [
          'prefix',
          __hook__('()', qName, [
            'slice',
            [
              0,
              nsp
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,prefix')
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,prefix');
        var localName = __hook__('()', qName, [
          'slice',
          [nsp + 1]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,localName');
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
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      //prefix == null for no ns prefix attribute 
      if (nsPrefix !== false) {
        //hack!!
        if (localNSMap == null) {
          localNSMap = {};
          //console.log(currentNSMap,0)
          __hook__(_copy, null, [
            currentNSMap,
            currentNSMap = {}
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement', 0)  //console.log(currentNSMap,1)
;
        }
        __hook__('=', currentNSMap, [
          nsPrefix,
          __hook__('=', localNSMap, [
            nsPrefix,
            value
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
        __hook__('=', a, [
          'uri',
          'http://www.w3.org/2000/xmlns/'
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
        __hook__('()', domBuilder, [
          'startPrefixMapping',
          [
            nsPrefix,
            value
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      }
    }
    var i = __hook__('.', el, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,i');
    while (i--) {
      a = __hook__('.', el, [i], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      var prefix = __hook__('.', a, ['prefix'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,prefix');
      if (prefix) {
        //no prefix attribute has no namespace
        if (prefix === 'xml') {
          __hook__('=', a, [
            'uri',
            'http://www.w3.org/XML/1998/namespace'
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
        }
        if (prefix !== 'xmlns') {
          __hook__('=', a, [
            'uri',
            __hook__('.', currentNSMap, [prefix || ''], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')  //{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
        }
      }
    }
    var nsp = __hook__('()', tagName, [
      'indexOf',
      [':']
    ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,nsp');
    if (nsp > 0) {
      prefix = __hook__('=', el, [
        'prefix',
        __hook__('()', tagName, [
          'slice',
          [
            0,
            nsp
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      localName = __hook__('=', el, [
        'localName',
        __hook__('()', tagName, [
          'slice',
          [nsp + 1]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
    } else {
      prefix = null;
      //important!!
      localName = __hook__('=', el, [
        'localName',
        tagName
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
    }
    //no prefix element has default namespace
    var ns = __hook__('=', el, [
      'uri',
      __hook__('.', currentNSMap, [prefix || ''], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,ns')
    ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement,ns');
    __hook__('()', domBuilder, [
      'startElement',
      [
        ns,
        localName,
        tagName,
        el
      ]
    ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
    //endPrefixMapping and startPrefixMapping have not any help for dom builder
    //localNSMap = null
    if (__hook__('.', el, ['closed'], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')) {
      __hook__('()', domBuilder, [
        'endElement',
        [
          ns,
          localName,
          tagName
        ]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      if (localNSMap) {
        for (prefix in __hook__('*', localNSMap, [], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement')) {
          __hook__('()', domBuilder, [
            'endPrefixMapping',
            [prefix]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
        }
      }
    } else {
      __hook__('=', el, [
        'currentNSMap',
        currentNSMap
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      __hook__('=', el, [
        'localNSMap',
        localNSMap
      ], '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
      //parseStack.push(el);
      return true;
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,appendElement');
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  return __hook__((source, elStartEnd, tagName, entityReplacer, domBuilder) => {
    if (__hook__('()', /^(?:script|textarea)$/i, [
        'test',
        [tagName]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent')) {
      var elEndStart = __hook__('()', source, [
        'indexOf',
        [
          '</' + tagName + '>',
          elStartEnd
        ]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent,elEndStart');
      var text = __hook__('()', source, [
        'substring',
        [
          elStartEnd + 1,
          elEndStart
        ]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent,text');
      if (__hook__('()', /[&<]/, [
          'test',
          [text]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent')) {
        if (__hook__('()', /^script$/i, [
            'test',
            [tagName]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent')) {
          //if(!/\]\]>/.test(text)){
          //lexHandler.startCDATA();
          __hook__('()', domBuilder, [
            'characters',
            [
              text,
              0,
              __hook__('.', text, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent')
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent');
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
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent');
        __hook__('()', domBuilder, [
          'characters',
          [
            text,
            0,
            __hook__('.', text, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent')
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent');
        return elEndStart;  //}
      }
    }
    return elStartEnd + 1;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parseHtmlSpecialContent');
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  return __hook__((source, elStartEnd, tagName, closeMap) => {
    //if(tagName in closeMap){
    var pos = __hook__('.', closeMap, [tagName], '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed,pos');
    if (pos == null) {
      //console.log(tagName)
      pos = __hook__('()', source, [
        'lastIndexOf',
        ['</' + tagName + '>']
      ], '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed');
      if (pos < elStartEnd) {
        //忘记闭合
        pos = __hook__('()', source, [
          'lastIndexOf',
          ['</' + tagName]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed');
      }
      __hook__('=', closeMap, [
        tagName,
        pos
      ], '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed');
    }
    return pos < elStartEnd;  //} 
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,fixSelfClosed');
}
function _copy(source, target) {
  return __hook__((source, target) => {
    for (var n in __hook__('*', source, [], '/components/thin-hook/node_modules/xmldom/sax.js,_copy')) {
      __hook__('=', target, [
        n,
        __hook__('.', source, [n], '/components/thin-hook/node_modules/xmldom/sax.js,_copy')
      ], '/components/thin-hook/node_modules/xmldom/sax.js,_copy');
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,_copy');
}
function parseDCC(source, start, domBuilder, errorHandler) {
  return __hook__((source, start, domBuilder, errorHandler) => {
    //sure start with '<!'
    var next = __hook__('()', source, [
      'charAt',
      [start + 2]
    ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,next');
    switch (next) {
    case '-':
      if (__hook__('()', source, [
          'charAt',
          [start + 3]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC') === '-') {
        var end = __hook__('()', source, [
          'indexOf',
          [
            '-->',
            start + 4
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,end');
        //append comment source.substring(4,end)//<!--
        if (end > start) {
          __hook__('()', domBuilder, [
            'comment',
            [
              source,
              start + 4,
              end - start - 4
            ]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
          return end + 3;
        } else {
          __hook__('()', errorHandler, [
            'error',
            ['Unclosed comment']
          ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
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
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC') == 'CDATA[') {
        var end = __hook__('()', source, [
          'indexOf',
          [
            ']]>',
            start + 9
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,end');
        __hook__('()', domBuilder, [
          'startCDATA',
          []
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
        __hook__('()', domBuilder, [
          'characters',
          [
            source,
            start + 9,
            end - start - 9
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
        __hook__('()', domBuilder, [
          'endCDATA',
          []
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
        return end + 3;
      }
      //<!DOCTYPE
      //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
      var matchs = __hook__(split, null, [
        source,
        start
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,matchs', 0);
      var len = __hook__('.', matchs, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,len');
      if (len > 1 && __hook__('()', /!doctype/i, [
          'test',
          [__hook__('.', __hook__('.', matchs, [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC'), [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC')]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC')) {
        var name = __hook__('.', __hook__('.', matchs, [1], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,name'), [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,name');
        var pubid = len > 3 && __hook__('()', /^public$/i, [
          'test',
          [__hook__('.', __hook__('.', matchs, [2], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid'), [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid')]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid') && __hook__('.', __hook__('.', matchs, [3], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid'), [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,pubid');
        var sysid = len > 4 && __hook__('.', __hook__('.', matchs, [4], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,sysid'), [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,sysid');
        var lastMatch = __hook__('.', matchs, [len - 1], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC,lastMatch');
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
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC'),
            sysid && __hook__('()', sysid, [
              'replace',
              [
                /^(['"])(.*?)\1$/,
                '$2'
              ]
            ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC')
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
        __hook__('()', domBuilder, [
          'endDTD',
          []
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
        return __hook__('.', lastMatch, ['index'], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC') + __hook__('.', __hook__('.', lastMatch, [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC'), ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
      }
    }
    return -1;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parseDCC');
}
function parseInstruction(source, start, domBuilder) {
  return __hook__((source, start, domBuilder) => {
    var end = __hook__('()', source, [
      'indexOf',
      [
        '?>',
        start
      ]
    ], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,end');
    if (end) {
      var match = __hook__('()', __hook__('()', source, [
        'substring',
        [
          start,
          end
        ]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,match'), [
        'match',
        [/^<\?(\S*)\s*([\s\S]*?)\s*$/]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,match');
      if (match) {
        var len = __hook__('.', __hook__('.', match, [0], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,len'), ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction,len');
        __hook__('()', domBuilder, [
          'processingInstruction',
          [
            __hook__('.', match, [1], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction'),
            __hook__('.', match, [2], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction')
          ]
        ], '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction');
        return end + 2;
      } else {
        //error
        return -1;
      }
    }
    return -1;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,parseInstruction');
}
/**
 * @param source
 */
function ElementAttributes(source) {
  return __hook__(source => {
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,ElementAttributes');
}
__hook__('=', ElementAttributes, [
  'prototype',
  {
    setTagName: function (tagName) {
      return __hook__(tagName => {
        if (!__hook__('()', tagNamePattern, [
            'test',
            [tagName]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,setTagName')) {
          throw __hook__(Error, null, ['invalid tagName:' + tagName], '/components/thin-hook/node_modules/xmldom/sax.js,setTagName', true);
        }
        __hook__('=', this, [
          'tagName',
          tagName
        ], '/components/thin-hook/node_modules/xmldom/sax.js,setTagName');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,setTagName');
    },
    add: function (qName, value, offset) {
      return __hook__((qName, value, offset) => {
        if (!__hook__('()', tagNamePattern, [
            'test',
            [qName]
          ], '/components/thin-hook/node_modules/xmldom/sax.js,add')) {
          throw __hook__(Error, null, ['invalid attribute:' + qName], '/components/thin-hook/node_modules/xmldom/sax.js,add', true);
        }
        __hook__('=', this, [
          __hook__('p++', this, ['length'], '/components/thin-hook/node_modules/xmldom/sax.js,add'),
          {
            qName: qName,
            value: value,
            offset: offset
          }
        ], '/components/thin-hook/node_modules/xmldom/sax.js,add');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,add');
    },
    length: 0,
    getLocalName: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/sax.js,getLocalName'), ['localName'], '/components/thin-hook/node_modules/xmldom/sax.js,getLocalName');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,getLocalName');
    },
    getLocator: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/sax.js,getLocator'), ['locator'], '/components/thin-hook/node_modules/xmldom/sax.js,getLocator');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,getLocator');
    },
    getQName: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/sax.js,getQName'), ['qName'], '/components/thin-hook/node_modules/xmldom/sax.js,getQName');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,getQName');
    },
    getURI: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/sax.js,getURI'), ['uri'], '/components/thin-hook/node_modules/xmldom/sax.js,getURI');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,getURI');
    },
    getValue: function (i) {
      return __hook__(i => {
        return __hook__('.', __hook__('.', this, [i], '/components/thin-hook/node_modules/xmldom/sax.js,getValue'), ['value'], '/components/thin-hook/node_modules/xmldom/sax.js,getValue');
      }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,getValue');
    }
  }
], '/components/thin-hook/node_modules/xmldom/sax.js');
function _set_proto_(thiz, parent) {
  return __hook__((thiz, parent) => {
    __hook__('=', thiz, [
      '__proto__',
      parent
    ], '/components/thin-hook/node_modules/xmldom/sax.js,_set_proto_');
    return thiz;
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,_set_proto_');
}
if (!(__hook__(_set_proto_, null, [
    {},
    __hook__('.', _set_proto_, ['prototype'], '/components/thin-hook/node_modules/xmldom/sax.js')
  ], '/components/thin-hook/node_modules/xmldom/sax.js', 0) instanceof _set_proto_)) {
  _set_proto_ = function (thiz, parent) {
    return __hook__((thiz, parent) => {
      function p() {
        return __hook__(() => {
        }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,p');
      }
      ;
      __hook__('=', p, [
        'prototype',
        parent
      ], '/components/thin-hook/node_modules/xmldom/sax.js');
      p = __hook__(p, null, [], '/components/thin-hook/node_modules/xmldom/sax.js', true);
      for (parent in __hook__('*', thiz, [], '/components/thin-hook/node_modules/xmldom/sax.js')) {
        __hook__('=', p, [
          parent,
          __hook__('.', thiz, [parent], '/components/thin-hook/node_modules/xmldom/sax.js')
        ], '/components/thin-hook/node_modules/xmldom/sax.js');
      }
      return p;
    }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js');
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
    ], '/components/thin-hook/node_modules/xmldom/sax.js,split');
    __hook__('()', reg, [
      'exec',
      [source]
    ], '/components/thin-hook/node_modules/xmldom/sax.js,split');
    //skip <
    while (match = __hook__('()', reg, [
        'exec',
        [source]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,split')) {
      __hook__('()', buf, [
        'push',
        [match]
      ], '/components/thin-hook/node_modules/xmldom/sax.js,split');
      if (__hook__('.', match, [1], '/components/thin-hook/node_modules/xmldom/sax.js,split'))
        return buf;
    }
  }, null, arguments, '/components/thin-hook/node_modules/xmldom/sax.js,split');
}
__hook__('=', exports, [
  'XMLReader',
  XMLReader
], '/components/thin-hook/node_modules/xmldom/sax.js');
},{}]},{},[1])(1)
});