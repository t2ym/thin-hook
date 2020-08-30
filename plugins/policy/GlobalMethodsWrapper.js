/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  /*
    These forEach functions are the same function object
      "Array.prototype.forEach",
      "CSSNumericArray.prototype.forEach",
      "CSSTransformValue.prototype.forEach",
      "CSSUnparsedValue.prototype.forEach",
      "DOMTokenList.prototype.forEach",
      "NodeList.prototype.forEach",
      "XRInputSourceArray.prototype.forEach"

    Array.prototype.forEach to represent them in ACL to avoid applying all 7 ACLs for a single call
  */
  const forEachFunction = Array.prototype.forEach;
  const forEachName = 'Array,prototype,forEach';

  // _globalMethods as wrapped _globalObjects
  class GlobalMethodsWrapper {
    constructor(gObjects) {
      this.gObjects = gObjects; // _globalObjects: SetMap
      this.splitCache = new Map(); // cache for obj,prototype,method => [obj,prototype,method]
      this.pattern = new RegExp('(.*,)([^,]{1,},)?([^,]{1,})$');
    }
    // class,prototype,method => [ class, prototype, method ]
    // class,staticMethod => [ class, staticMethod ]
    // /module/name.js,class,prototype,method => [ "/module/name.js,class", prototype, method ]
    // /module/name.js,class,staticMethod => [ "/module/name.js,class", staticMethod ]
    // /module/name.js,class => [ "/module/name.js", class ]
    split(name) {
      let value = this.splitCache.get(name);
      if (!value) {
        let splitValue = name.split(',');
        let length = splitValue.length;
        let method;
        switch (length) {
        case 1:
        case 2:
          value = splitValue;
          break;
        case 3:
          if (splitValue[1] === 'prototype') {
            value = splitValue;
          }
          else {
            value = [ splitValue[0] + ',' + splitValue[1], splitValue[2] ];
          }
          break;
        default:
          if (splitValue[length - 2] === 'prototype') {
            method = splitValue.pop();
            splitValue.pop(); // 'prototype'
            value = [ splitValue.join(','), 'prototype', method ];
          }
          else {
            method = splitValue.pop();
            value = [ splitValue.join(','), method ];
          }
          break;
        }
        this.splitCache.set(name, value);
      }
      return value;
    }
    get(key) {
      let names = this.gObjects.get(key); // DistinctSet or undefined
      let value;
      if (names) {
        for (let name of names) {
          value = this.split(name);
          break; // TODO: multiple names
        }
        return value;
      }
      else {
        return undefined;
      }
    }
    // key: function, value: [ class, (prototype,) method ]
    set(key, value) {
      let name = value.join(',');
      this.splitCache.set(name, value);
      let names = this.gObjects.get(key);
      if (names) {
        let isGlobal = false;
        for (let _name of names) {
          if (_name.indexOf(',') < 0) {
            isGlobal = true;
            break;
          }
        }
        if (isGlobal) {
          // avoid enlisting a global object so that this property ACL cannot pollute ACL for the global object
          return this;
        }
      }
      if (name.endsWith(',prototype')) { // skip Class.prototype objects
        return this;
      }
      if (name.endsWith(',prototype,constructor')) {
        name = name.substring(0, name.length - 22);
      }
      if (key === forEachFunction) { // key === Array.prototype.forEach
        if (name !== forEachName) {
          // skip registering forEach function other than Array.prototype.forEach
          return this;
        }
      }
      this.gObjects.set(key, name);
      return this;
    }
  };