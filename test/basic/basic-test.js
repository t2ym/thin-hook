/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // basic scope
  let scope = 'basic';
  let basic = new Suite(scope, 'thin-hook basic tests');
  basic.htmlSuite = 'basic';
  basic.test = Suite.scopes.common.classes.ThinHookSuite;
  basic.test = Suite.scopes.common.classes.LoadPage;
  basic.test = Suite.scopes.common.mixins.Reload;
  basic.test = Suite.scopes.common.mixins.UnregisterServiceWorker;
  basic.test = (base) => class HookApiAvailable extends base {
    async operation() {
      if (this.hasToSkip) { return; }
    }
    checkApi(api, list, path) {
      switch (list) {
      case Function:
      case Object:
        assert.isOk(api, 'hook API ' + path + ' exists');
        assert.isOk(api instanceof list, 'hook API ' + path + ' is an instance of ' + list.name);
        break;
      default:
        if (list && typeof list === 'object') {
          for (let prop in list) {
            this.checkApi(api[prop], api[prop], path + '.' + prop);
          }
        }
        break;
      }
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(hook, 'hook is defined');
      assert.isOk(hook instanceof Function, 'hook is an instance of Function');
      const hookApiList = {
        hookHtml: Function,
        contextGenerators: {
          'null': Function,
          'astPath': Function,
          'method': Function,
          'cachedMethod': Function,
          'cachedMethodDebug': Function,
          'oldMethod': Function,
        },
        __hook__: Function,
        __hook_except_properties__: Function,
        hookCallbackCompatibilityTest: Function,
        hook: Function,
        global: Function,
        Function: Function,
        FunctionArguments: Function,
        eval: Function,
        setTimeout: Function,
        setInterval: Function,
        Node: Function,
        Element: Function,
        HTMLAnchorElement: Function,
        HTMLAreaElement: Function,
        HTMLScriptElement: Function,
        Document: Function,
        with: Function,
        serviceWorkerHandlers: {
          install: Function,
          activate: Function,
          message: Function,
          fetch: Function,
        },
        serviceWorkerTransformers: {
          encodeHtml: Function,
          decodeHtml: Function,
        },
        hookWorkerHandler: Function,
        _collectHookWorkerCoverage: Function,
        registerServiceWorker: Function,
        utils: {
          createHash: Function,
        },
        parameters: Object,
      };
      this.checkApi(hook, hookApiList.hook, 'hook');
    }
  }
  basic.test = (base) => class HookApiTest extends base {
    static get nativeEval() {
      return window._nativeEval;
    }
    get context() {
      return 'HookApiTest';
    }
    get defaultOptions() {
      return [
        Symbol.for('__hook__'), // [0] hookName
        [[this.context, { static: '_c_' }]], // [1] initialContext
        'method', // [2] contextGeneratorName
        true, // [3] metaHooking
        true, // [4] _hookProperty
        null, // [5] _sourceMap
        false, // [6] asynchronous
        true, // [7] _compact
        true, // [8] _hookGlobal
        '_pp_', // [9] _hookPrefix
        null, // [10] initialScope
      ];
    }
    customOptions(customOptionName, customOptionParams) {
      let options = this.defaultOptions;
      let customOptions = customOptionName.split(',');
      for (let customOption of customOptions) {
        switch (customOption) {
        case '_hookGlobal=false':
          options[8] = false;
          break;
        case 'initialScope':
          options[10] = customOptionParams.initialScope;
          break;
        case 'compact=false':
          options[7] = false;
          break;
        default:
          break;
        }
      }
      return options;
    }
    get codes() {
      return {
        "": [
          {
            "name": "empty ",
            "code": "",
            "hooked": ""
          },
          {
            "name": "space  ",
            "code": " ",
            "hooked": ""
          },
          {
            "name": "EmptyStatement ;",
            "code": ";",
            "hooked": "const _c_=$hook$.$(__hook__,[]);;"
          },
          {
            "name": "Comment /* comment */",
            "code": "/* comment */",
            "hooked": ""
          }
        ],
        "Literal": [
          {
            "name": "Literal decimal integer 1",
            "code": "1",
            "hooked": "const _c_=$hook$.$(__hook__,[]);1;"
          },
          {
            "name": "Literal decimal negative integer -1",
            "code": "-1",
            "hooked": "const _c_=$hook$.$(__hook__,[]);-1;"
          },
          {
            "name": "Literal hexadecimal integer 0xa5",
            "code": "0xa5",
            "hooked": "const _c_=$hook$.$(__hook__,[]);165;"
          },
          {
            "name": "Literal hexadecimal negative integer -0xa5",
            "code": "-0xa5",
            "hooked": "const _c_=$hook$.$(__hook__,[]);-165;"
          },
          {
            "name": "Literal octal integer 077",
            "code": "077",
            "hooked": "const _c_=$hook$.$(__hook__,[]);63;"
          },
          {
            "name": "Literal floating number 12.340",
            "code": "12.340",
            "hooked": "const _c_=$hook$.$(__hook__,[]);12.34;"
          },
          {
            "name": "Literal floating number 1.234e2",
            "code": "1.234e2",
            "hooked": "const _c_=$hook$.$(__hook__,[]);123.4;"
          },
          {
            "name": "Literal floating number 12.34e101",
            "code": "12.34e101",
            "hooked": "const _c_=$hook$.$(__hook__,[]);1.234e+102;"
          },
          {
            "name": "Literal negative floating number -12.340",
            "code": "-12.340",
            "hooked": "const _c_=$hook$.$(__hook__,[]);-12.34;"
          },
          {
            "name": "Literal negative floating number -1.234e2",
            "code": "-1.234e2",
            "hooked": "const _c_=$hook$.$(__hook__,[]);-123.4;"
          },
          {
            "name": "Literal negative floating number -12.34e101",
            "code": "-12.34e101",
            "hooked": "const _c_=$hook$.$(__hook__,[]);-1.234e+102;"
          },
          {
            "name": "Literal string 'a'",
            "code": "'a'",
            "hooked": "const _c_=$hook$.$(__hook__,[]);'a';"
          },
          {
            "name": "Literal double quoted string \"a\"",
            "code": "\"a\"",
            "hooked": "const _c_=$hook$.$(__hook__,[]);'a';"
          },
          {
            "name": "Literal boolean true",
            "code": "true",
            "hooked": "const _c_=$hook$.$(__hook__,[]);true;"
          },
          {
            "name": "Literal boolean false",
            "code": "false",
            "hooked": "const _c_=$hook$.$(__hook__,[]);false;"
          },
          {
            "name": "Literal null null",
            "code": "null",
            "hooked": "const _c_=$hook$.$(__hook__,[]);null;"
          },
          {
            "name": "Literal RegExp /^a$/",
            "code": "/^a$/",
            "hooked": "const _c_=$hook$.$(__hook__,[]);/^a$/;"
          }
        ],
        "TemplateLiteral": [
          {
            "code": "{ let a = 1; `a = ${a};`; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=1;`a = ${a};`;}",
            "name": "TemplateLiteral  { let a = 1; `a = ${a};`; }"
          },
          {
            "code": "{ with ({a:1}) { `a = ${a};`; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:1},{})){`a = ${__hook__('w.',__with__,['a',()=>a],_c_[0],false)};`;}}",
            "name": "TemplateLiteral  { with ({a:1}) { `a = ${a};`; } }"
          },
          {
            "code": "var a = 1; `a = ${a};`;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;`a = ${$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]};`;",
            "name": "TemplateLiteral  var a = 1; `a = ${a};`;"
          }
        ],
        "TaggedTemplateExpression": [
          {
            "code": "{ let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } tag`plus: ${a} + ${b} = ${c};`; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,tag']);{let a=1,b=2,c;function tag(str,p1,p2,p3){return __hook__((str,p1,p2,p3)=>{return __hook__('.',str,[0],_c_[0])+p1+__hook__('.',str,[1],_c_[0])+p2+__hook__('.',str,[2],_c_[0])+(p1+p2)+__hook__('.',str,[3],_c_[0]);},null,arguments,_c_[0]);}tag`plus: ${a} + ${b} = ${c};`;}",
            "name": "TaggedTemplateExpression  { let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } tag`plus: ${a} + ${b} = ${c};`; }"
          },
          {
            "code": "{ let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } with ({}) { tag`plus: ${a} + ${b} = ${c};`; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,tag','HookApiTest']);{let a=1,b=2,c;function tag(str,p1,p2,p3){return __hook__((str,p1,p2,p3)=>{return __hook__('.',str,[0],_c_[0])+p1+__hook__('.',str,[1],_c_[0])+p2+__hook__('.',str,[2],_c_[0])+(p1+p2)+__hook__('.',str,[3],_c_[0]);},null,arguments,_c_[0]);}with($hook$.with({},{a:true,b:true,c:true,tag:true})){__hook__('w.',__with__,['tag',()=>tag],_c_[1],false)`plus: ${__hook__('w.',__with__,['a',()=>a],_c_[1],false)} + ${__hook__('w.',__with__,['b',()=>b],_c_[1],false)} = ${__hook__('w.',__with__,['c',()=>c],_c_[1],false)};`;}}",
            "name": "TaggedTemplateExpression  { let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } with ({}) { tag`plus: ${a} + ${b} = ${c};`; } }"
          },
          {
            "code": "var a = 1, b = 2, c, tag = function (str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; }; tag`plus: ${a} + ${b} = ${c};`;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_tag;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2,$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]],$hook$.global(__hook__,_c_[0],'tag','var')[_c_[4]]=function(str,p1,p2,p3){return __hook__((str,p1,p2,p3)=>{return __hook__('.',str,[0],_c_[0])+p1+__hook__('.',str,[1],_c_[0])+p2+__hook__('.',str,[2],_c_[0])+(p1+p2)+__hook__('.',str,[3],_c_[0]);},null,arguments,_c_[0]);};$hook$.global(__hook__,_c_[0],'tag','get')[_c_[4]]`plus: ${$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]} + ${$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]} = ${$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]]};`;",
            "name": "TaggedTemplateExpression  var a = 1, b = 2, c, tag = function (str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; }; tag`plus: ${a} + ${b} = ${c};`;"
          }
        ],
        "Identifier": [
          {
            "code": "a",
            "hooked": "const _c_=$hook$.$(__hook__,[]);a;",
            "eval": (code) => {
                      let result;
                      let exception;
                      try {
                        result = HookApiTest.nativeEval(code);
                      }
                      catch (e) {
                        exception = e;
                      }
                      //console.log(exception);
                      return exception ? exception.name + ': ' + exception.message : result;
                    },
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "a": true
              }
            },
            "name": "Identifier  a // initialScope {\"initialScope\":{\"a\":true}}"
          },
          {
            "code": "{ let __hook__, __with__, $hook$; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let __unexpected_access_to_hook_callback_function__,__unexpected_access_to_hook_with_object__,__unexpected_access_to_hook_alias_object__;}",
            "eval": () => true,
            "name": "Identifier  { let __hook__, __with__, $hook$; }"
          }
        ],
        "FunctionDeclaration": [
          {
            "code": "function f() {return 1}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);}",
            "eval": (code) => { HookApiTest.nativeEval(code); let result = window.f(); window.f = undefined; return result; },
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "f": true
              }
            },
            "name": "FunctionDeclaration  function f() {return 1} // initialScope {\"initialScope\":{\"f\":true}}"
          },
          {
            "code": "function f() {return 1}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_f;HookApiTest,f']);$hook$.global(__hook__,_c_[0],'f','function')[_c_[1]]=function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);};",
            "eval": (code) => { HookApiTest.nativeEval(code); let result = window.f(); window.f = undefined; return result; },
            "name": "FunctionDeclaration  function f() {return 1}"
          },
          {
            "code": "function * f(v) {yield v;}; f().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[0]);};__hook__('()',__hook__(f,null,[],_c_[1],0),['next',[]],_c_[1]);",
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "f": true
              }
            },
            "name": "FunctionDeclaration  function * f(v) {yield v;}; f().next(); // initialScope {\"initialScope\":{\"f\":true}}"
          },
          {
            "code": "{ with ({}) { function * f(v) {yield v;}; f().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{with($hook$.with({},{})){function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[0]);};__hook__('()',f(),['next',[]],_c_[1]);}}",
            "name": "FunctionDeclaration  { let v = 1; with ({}) { function * f(x) {yield v;}; f().next(); } }"
          },
          {
            "code": "{ let v = 1; with ({}) { function * f(x) {yield v;}; f().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{let v=1;with($hook$.with({},{v:true})){function*f(x){yield*__hook__(function*(x){yield __hook__('w.',__with__,['v',()=>v],_c_[0],false);},this,arguments,_c_[0]);};__hook__('()',f(),['next',[]],_c_[1]);}}",
            "name": "FunctionDeclaration  { let v = 1; with ({}) { function * f(x) {yield v;}; f().next(); } }"
          },
          {
            "code": "{ with ({}) { let v = 1; function * f(x) {yield v;}; f().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{with($hook$.with({},{})){let v=1;function*f(x){yield*__hook__(function*(x){yield v;},this,arguments,_c_[0]);};__hook__('()',f(),['next',[]],_c_[1]);}}",
            "name": "FunctionDeclaration  { with ({}) { let v = 1; function * f(x) {yield v;}; f().next(); } }"
          },
          {
            "code": "function * f(v) {yield v;} f().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_f;HookApiTest,f','HookApiTest','_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'f','function')[_c_[1]]=function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[0]);};__hook__('()',__hook__($hook$.global(__hook__,_c_[2],'f','get')[_c_[3]],null,[],_c_[2],0),['next',[]],_c_[2]);",
            "name": "FunctionDeclaration  function * f(v) {yield v;} f().next();"
          },
          {
            "code": "{ async function f() {return 1} f(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);}__hook__(f,null,[],_c_[1],0);}",
            "asynchronous": true,
            "name": "FunctionDeclaration  { async function f() {return 1} f(); }"
          },
          {
            "code": "{ with({}) { async function f() {return 1} f(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);{with($hook$.with({},{})){async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);}f();}}",
            "asynchronous": true,
            "name": "FunctionDeclaration  { with({}) { async function f() {return 1} f(); } }"
          },
          {
            "code": "async function f() {return 1} f();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_f;HookApiTest,f','HookApiTest','_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'f','function')[_c_[1]]=async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);};__hook__($hook$.global(__hook__,_c_[2],'f','get')[_c_[3]],null,[],_c_[2],0);",
            "asynchronous": true,
            "name": "FunctionDeclaration  async function f() {return 1} f();"
          },
          {
            "code": "'use strict'; function f() { return 1; } f();",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest,f','S_pp_f;HookApiTest,f','HookApiTest','S_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'f','#function')[_c_[1]]=function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);};__hook__($hook$.global(__hook__,_c_[2],'f','#get')[_c_[3]],null,[],_c_[2],0);",
            "name": "FunctionDeclaration  'use strict'; function f() { return 1; } f();"
          },
          {
            "code": "{ function f() { 'use strict'; return Date; } f(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','S_pp_Date;HookApiTest,f','HookApiTest']);{function f(){'use strict';return __hook__(()=>{return $hook$.global(__hook__,_c_[0],'Date','#get')[_c_[1]];},null,arguments,_c_[0]);}__hook__(f,null,[],_c_[2],0);}",
            "name": "FunctionDeclaration  { function f() { 'use strict'; return Date; } f(); }"
          },
          {
            "code": "{ function undefined() {} function NaN() {} function Infinity() {} true;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,__unexpected_overridden_declaration_of_undefined__','HookApiTest,__unexpected_overridden_declaration_of_NaN__','HookApiTest,__unexpected_overridden_declaration_of_Infinity__']);{function __unexpected_overridden_declaration_of_undefined__(){return __hook__(()=>{},null,arguments,_c_[0]);}function __unexpected_overridden_declaration_of_NaN__(){return __hook__(()=>{},null,arguments,_c_[1]);}function __unexpected_overridden_declaration_of_Infinity__(){return __hook__(()=>{},null,arguments,_c_[2]);}true;}",
            "name": "FunctionDeclaration  { function undefined() {} function NaN() {} function Infinity() {} true;}"
          },
          {
            "code": "{ function f(undefined, NaN, Infinity) {} true; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);{function f(__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__){return __hook__((__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__)=>{},null,arguments,_c_[0]);}true;}",
            "name": "FunctionDeclaration  { function f(undefined, NaN, Infinity) {} true; }"
          }
        ],
        "FunctionExpression": [
          {
            "code": "(function f() {return 1})",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);(function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);});",
            "eval": (code) => HookApiTest.nativeEval(code)(),
            "name": "FunctionExpression  (function f() {return 1})"
          },
          {
            "code": "(function * f(v) {yield v})().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[1]);},null,[],_c_[0],0),['next',[]],_c_[0]);",
            "name": "FunctionExpression  (function * f(v) {yield v})().next();"
          },
          {
            "code": "{ with ({}) { (function * f(v) {yield v})().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{with($hook$.with({},{})){__hook__('()',function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[1]);}(),['next',[]],_c_[0]);}}",
            "name": "FunctionExpression  { with ({}) { (function * f(v) {yield v})().next(); } }"
          },
          {
            "code": "{ let v = 1; with ({}) { (function * f(x) {yield v})().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{let v=1;with($hook$.with({},{v:true})){__hook__('()',function*f(x){yield*__hook__(function*(x){yield __hook__('w.',__with__,['v',()=>v],_c_[1],false);},this,arguments,_c_[1]);}(),['next',[]],_c_[0]);}}",
            "name": "FunctionExpression  { let v = 1; with ({}) { (function * f(x) {yield v})().next(); } }"
          },
          {
            "code": "var f = function f() { 'use strict'; let o = {a:1}; o.a; Date; Date.now(); return o; }; f();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_f;HookApiTest','HookApiTest,f','S_pp_Date;HookApiTest,f']);$hook$.global(__hook__,_c_[0],'f','var')[_c_[1]]=function f(){'use strict';return __hook__(()=>{let o={a:1};__hook__('#.',o,['a'],_c_[2]);$hook$.global(__hook__,_c_[2],'Date','#get')[_c_[3]];__hook__('#()',$hook$.global(__hook__,_c_[2],'Date','#get')[_c_[3]],['now',[]],_c_[2]);return o;},null,arguments,_c_[2]);};__hook__($hook$.global(__hook__,_c_[0],'f','get')[_c_[1]],null,[],_c_[0],0);",
            "name": "FunctionExpression  var f = function f() { 'use strict'; let o = {a:1}; o.a; Date; Date.now(); return o; }; f();"
          },
          {
            "code": "{ (function undefined() {}); (function NaN() {}); (function Infinity() {}); true;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,__unexpected_overridden_declaration_of_undefined__','HookApiTest,__unexpected_overridden_declaration_of_NaN__','HookApiTest,__unexpected_overridden_declaration_of_Infinity__']);{(function __unexpected_overridden_declaration_of_undefined__(){return __hook__(()=>{},null,arguments,_c_[0]);});(function __unexpected_overridden_declaration_of_NaN__(){return __hook__(()=>{},null,arguments,_c_[1]);});(function __unexpected_overridden_declaration_of_Infinity__(){return __hook__(()=>{},null,arguments,_c_[2]);});true;}",
            "name": "FunctionExpression  { (function undefined() {}); (function NaN() {}); (function Infinity() {}); true;}"
          },
          {
            "code": "{ (function f(undefined, NaN, Infinity) {}); true; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);{(function f(__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__){return __hook__((__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__)=>{},null,arguments,_c_[0]);});true;}",
            "name": "FunctionExpression  { (function f(undefined, NaN, Infinity) {}); true; }"
          }
        ],
        "ArrowFunctionExpression": [
          {
            "code": "{ p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{(...args)=>__hook__(p=>p,null,args,_c_[0]);(...args)=>(__hook__(p=>{return p;},null,args,_c_[0]));(...args)=>__hook__((p1,p2)=>[p1,p2],null,args,_c_[0]);(...args)=>__hook__((p1,p2)=>({p1:p1,p2:p2}),null,args,_c_[0]);(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,_c_[0]));}",
            "name": "ArrowFunctionExpression  { p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; }"
          },
          {
            "code": "{ with({}) { p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){(...args)=>__hook__(p=>p,null,args,_c_[0]);(...args)=>(__hook__(p=>{return p;},null,args,_c_[0]));(...args)=>__hook__((p1,p2)=>[p1,p2],null,args,_c_[0]);(...args)=>__hook__((p1,p2)=>({p1:p1,p2:p2}),null,args,_c_[0]);(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,_c_[0]));}}",
            "name": "ArrowFunctionExpression  { with({}) { p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; } }"
          },
          {
            "code": "{ let _p,_p1,_p2;with({}) { p => _p; (p) => { return _p; }; (p1, p2) => [_p1, _p2]; (p1, p2) => ({ p1: _p1, p2: _p2 }); (p) => { var v1; let v2; const v3 = 1; }; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,p1','HookApiTest,p2']);{let _p,_p1,_p2;with($hook$.with({},{_p:true,_p1:true,_p2:true})){(...args)=>__hook__(p=>_p,null,args,_c_[0]);(...args)=>(__hook__(p=>{return __hook__('w.',__with__,['_p',()=>_p],_c_[0],false);},null,args,_c_[0]));(...args)=>__hook__((p1,p2)=>[__hook__('w.',__with__,['_p1',()=>_p1],_c_[0],false),__hook__('w.',__with__,['_p2',()=>_p2],_c_[0],false)],null,args,_c_[0]);(...args)=>__hook__((p1,p2)=>({p1:__hook__('w.',__with__,['_p1',()=>_p1],_c_[1],false),p2:__hook__('w.',__with__,['_p2',()=>_p2],_c_[2],false)}),null,args,_c_[0]);(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,_c_[0]));}}",
            "name": "ArrowFunctionExpression  { with({}) { p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; } }"
          },
          {
            "code": "p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; };",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);(...args)=>__hook__(p=>p,null,args,_c_[0]);(...args)=>(__hook__(p=>{return p;},null,args,_c_[0]));(...args)=>__hook__((p1,p2)=>[p1,p2],null,args,_c_[0]);(...args)=>__hook__((p1,p2)=>({p1:p1,p2:p2}),null,args,_c_[0]);(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,_c_[0]));",
            "name": "ArrowFunctionExpression  p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; };"
          }
        ],
        "ExpressionStatement": [
          {
            "code": "1;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);1;",
            "name": "ExpressionStatement  1;"
          },
          {
            "code": "a;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);a;",
            "eval": (code) => {
                      let result;
                      let exception;
                      try {
                        result = HookApiTest.nativeEval(code);
                      }
                      catch (e) {
                        exception = e;
                      }
                      //console.log(exception);
                      return exception ? exception.name + ': ' + exception.message : result;
                    },
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "a": true
              }
            },
            "name": "ExpressionStatement  a; // initialScope {\"initialScope\":{\"a\":true}}"
          }
        ],
        "BlockStatement": [
          {
            "name": "BlockStatement empty {}",
            "code": "{}",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{}"
          },
          {
            "name": "BlockStatement block scope { let a; }",
            "code": "{ let a; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a;}"
          },
          {
            "name": "BlockStatement FunctionBody (function f() {return 1})",
            "code": "(function f() {return 1})",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);(function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);});",
            "eval": (code) => HookApiTest.nativeEval(code)()
          }
        ],
        "DebuggerStatement": [
          {
            "code": "debugger;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);debugger;",
            "eval": () => true,
            "name": "DebuggerStatement  debugger;"
          }
        ],
        "WithStatement": [
          {
            "name": "WithStatement simple with ({a:1}) {a;}",
            "code": "with ({a:1}) {a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:1},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false);}"
          },
          {
            "name": "WithStatement global var declaration in a with clause",
            "code": "with ({}) {var a = 1;var {b,...c} = {b:2,c:3}, [d,...e] = [3,4]; let f = 1, {g,...h} = {}, [i,...j] = [5,6]; a;b;c;d;e; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_d;HookApiTest','_pp_e;HookApiTest','HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','var')[_c_[4]],$hook$.global(__hook__,_c_[0],'e','var')[_c_[5]];with($hook$.with({},{})){__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['=']=1;({b:__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],_c_[6],false)['='],...(__hook__('w.=',__with__,['c',{set ['='](v){c=v;},get ['='](){return c;}}],_c_[0],false))['=']}=__hook__('*',{b:2,c:3},[],_c_[0]),[__hook__('w.=',__with__,['d',{set ['='](v){d=v;},get ['='](){return d;}}],_c_[0],false)['='],...(__hook__('w.=',__with__,['e',{set ['='](v){e=v;},get ['='](){return e;}}],_c_[0],false))['=']]=__hook__('*',[3,4],[],_c_[0]));let f=1,{g,...h}=__hook__('*',{},[],_c_[0]),[i,...j]=__hook__('*',[5,6],[],_c_[0]);__hook__('w.',__with__,['a',()=>a],_c_[0],false);__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['c',()=>c],_c_[0],false);__hook__('w.',__with__,['d',()=>d],_c_[0],false);__hook__('w.',__with__,['e',()=>e],_c_[0],false);}"
          },
          {
            "name": "WithStatement nested var o0 = { z: 1 }; { with (o0) { let o1 = { a: 2 }; with (o1) { let o2 = { b: 3 }; with (o2) { a + b + z; } } } }",
            "code": "var o0 = { z: 1 }; { with (o0) { let o1 = { a: 2 }; with (o1) { let o2 = { b: 3 }; with (o2) { a + b + z; } } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o0;HookApiTest']);$hook$.global(__hook__,_c_[0],'o0','var')[_c_[1]]={z:1};{with($hook$.with($hook$.global(__hook__,_c_[0],'o0','get')[_c_[1]],{})){let o1={a:2};with($hook$.with(o1,{o1:true},...__with__)){let o2={b:3};with($hook$.with(o2,{o2:true},...__with__)){__hook__('w.',__with__,['a',()=>a],_c_[0],false)+__hook__('w.',__with__,['b',()=>b],_c_[0],false)+__hook__('w.',__with__,['z',()=>z],_c_[0],false);}}}}",
          },
          {
            "code": "{ let b = 1, o = { a: 1, b: 2, [Symbol.unscopables]: { b: true } }; with (o) { a + b; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,o','_pp_Symbol;HookApiTest,o','HookApiTest']);{let b=1,o={a:1,b:2,[__hook__('.',$hook$.global(__hook__,_c_[0],'Symbol','get')[_c_[1]],['unscopables'],_c_[0])]:{b:true}};with($hook$.with(o,{b:true,o:true})){__hook__('w.',__with__,['a',()=>a],_c_[2],false)+__hook__('w.',__with__,['b',()=>b],_c_[2],false);}}",
            "name": "WithStatement  { let b = 1, o = { a: 1, b: 2, [Symbol.unscopables]: { b: true } }; with (o) { a + b; } }"
          }
        ],
        "ReturnStatement": [
          {
            "code": "(function f() {return 1})",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f']);(function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);});",
            "eval": (code) => HookApiTest.nativeEval(code)(),
            "name": "ReturnStatement  (function f() {return 1})"
          }
        ],
        "YieldExpression": [
          {
            "code": "(function * f(v) {yield v;})().next(1);",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[1]);},null,[],_c_[0],0),['next',[1]],_c_[0]);",
            "name": "YieldExpression  (function * f(v) {yield v;})().next(1);"
          },
          {
            "code": "{ with ({}) { (function * f(v) {yield v;})(1).next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{with($hook$.with({},{})){__hook__('()',function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,_c_[1]);}(1),['next',[]],_c_[0]);}}",
            "name": "YieldExpression  { with ({}) { (function * f(v) {yield v;})(1).next(); } }"
          },
          {
            "code": "(function * f(v) {yield *v;})([1]).next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield*v;},this,arguments,_c_[1]);},null,[[1]],_c_[0],0),['next',[]],_c_[0]);",
            "name": "YieldExpression  (function * f(v) {yield *v;})([1]).next();"
          },
          {
            "code": "{ with ({}) { (function * f(v) {yield *v;})([1]).next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{with($hook$.with({},{})){__hook__('()',function*f(v){yield*__hook__(function*(v){yield*v;},this,arguments,_c_[1]);}([1]),['next',[]],_c_[0]);}}",
            "name": "YieldExpression  { with ({}) { (function * f(v) {yield *v;})([1]).next(); } }"
          },
          {
            "code": "var a = 1; (function * f() {yield a;})().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','HookApiTest,f','_pp_a;HookApiTest,f']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield $hook$.global(__hook__,_c_[2],'a','get')[_c_[3]];},this,arguments,_c_[2]);},null,[],_c_[0],0),['next',[]],_c_[0]);",
            "name": "YieldExpression  var a = 1; (function * f() {yield a;})().next();"
          },
          {
            "code": "var a = [1]; (function * f() {yield *a;})().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','HookApiTest,f','_pp_a;HookApiTest,f']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=[1];__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield*$hook$.global(__hook__,_c_[2],'a','get')[_c_[3]];},this,arguments,_c_[2]);},null,[],_c_[0],0),['next',[]],_c_[0]);",
            "name": "YieldExpression  var a = [1]; (function * f() {yield *a;})().next();"
          },
          {
            "code": "var a = 1; { with({}) { (function * f() {yield a;})().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','HookApiTest,f']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;{with($hook$.with({},{})){__hook__('()',function*f(){yield*__hook__(function*(){yield __hook__('w.',__with__,['a',()=>a],_c_[2],false);},this,arguments,_c_[2]);}(),['next',[]],_c_[0]);}}",
            "name": "YieldExpression  var a = 1; { with({}) { (function * f() {yield a;})().next(); } }"
          },
          {
            "code": "var a = [1]; { with({}) { (function * f() {yield *a;})().next(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','HookApiTest,f']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=[1];{with($hook$.with({},{})){__hook__('()',function*f(){yield*__hook__(function*(){yield*__hook__('w.',__with__,['a',()=>a],_c_[2],false);},this,arguments,_c_[2]);}(),['next',[]],_c_[0]);}}",
            "name": "YieldExpression  var a = [1]; { with({}) { (function * f() {yield *a;})().next(); } }"
          },
          {
            "code": "(function * f(v) {yield;})().next();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield;},this,arguments,_c_[1]);},null,[],_c_[0],0),['next',[]],_c_[0]);",
            "name": "YieldExpression  (function * f(v) {yield;})().next();"
          }
        ],
        "LabeledStatement": [
          {
            "code": "let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;break label1;}}k;",
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "i": true,
                "j": true,
                "k": true
              }
            },
            "name": "LabeledStatement  let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k; // initialScope {\"initialScope\":{\"i\":true,\"j\":true,\"k\":true}}"
          }
        ],
        "BreakStatement": [
          {
            "name": "BreakStatement no label for (let i = 0; i < 3; i++) { break; }",
            "code": "for (let i = 0; i < 3; i++) { break; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);for(let i=0;i<3;i++){break;}"
          },
          {
            "name": "BreakStatement labeled let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k; // initialScope {\"initialScope\":{\"i\":true,\"j\":true,\"k\":true}}",
            "code": "let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;break label1;}}k;",
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "i": true,
                "j": true,
                "k": true
              }
            }
          }
        ],
        "ContinueStatement": [
          {
            "name": "ContinueStatement no label for (let i = 0; i < 3; i++) { continue; }",
            "code": "for (let i = 0; i < 3; i++) { continue; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);for(let i=0;i<3;i++){continue;}"
          },
          {
            "name": "ContinueStatement labeled let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; continue label1; } } k; // initialScope {\"initialScope\":{\"i\":true,\"j\":true,\"k\":true}}",
            "code": "let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; continue label1; } } k;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;continue label1;}}k;",
            "options": "initialScope",
            "customOptionParams": {
              "initialScope": {
                "i": true,
                "j": true,
                "k": true
              }
            }
          }
        ],
        "IfStatement": [
          {
            "code": "var a = 1; if (a) { a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;if($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]){$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];}",
            "name": "IfStatement  var a = 1; if (a) { a; }"
          },
          {
            "code": "var a = 0, b = 1; if (a) { a; } else { b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=0,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=1;if($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]){$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];}else{$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];}",
            "name": "IfStatement  var a = 0, b = 1; if (a) { a; } else { b; }"
          },
          {
            "code": "{ let a = 1; with ({}) { if (a) { a; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=1;with($hook$.with({},{a:true})){if(__hook__('w.',__with__,['a',()=>a],_c_[0],false)){__hook__('w.',__with__,['a',()=>a],_c_[0],false);}}}",
            "name": "IfStatement  { let a = 1; with ({}) { if (a) { a; } } }"
          }
        ],
        "SwitchStatement": [
          {
            "code": "var a = 1; switch (a) { case 1: 1; break; default: 2; break; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;switch($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]){case 1:1;break;default:2;break;}",
            "name": "SwitchStatement  var a = 1; switch (a) { case 1: 1; break; default: 2; break; }"
          },
          {
            "code": "{ let a = 1; with({}) { switch (a) { case 1: 1; break; default: 2; break; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=1;with($hook$.with({},{a:true})){switch(__hook__('w.',__with__,['a',()=>a],_c_[0],false)){case 1:1;break;default:2;break;}}}",
            "name": "SwitchStatement  { let a = 1; with({}) { switch (a) { case 1: 1; break; default: 2; break; } } }"
          }
        ],
        "SwitchCase": [
          {
            "code": "var a = 1, b = 2; switch (a) { case b: 1; break; default: 2; break; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2;switch($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]){case $hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]:1;break;default:2;break;}",
            "name": "SwitchCase  var a = 1, b = 2; switch (a) { case b: 1; break; default: 2; break; }"
          },
          {
            "code": "{ let a = 1, b = 2; with ({}) { switch (a) { case b: 1; break; default: 2; break; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=1,b=2;with($hook$.with({},{a:true,b:true})){switch(__hook__('w.',__with__,['a',()=>a],_c_[0],false)){case __hook__('w.',__with__,['b',()=>b],_c_[0],false):1;break;default:2;break;}}}",
            "name": "SwitchCase  { let a = 1, b = 2; with ({}) { switch (a) { case b: 1; break; default: 2; break; } } }"
          }
        ],
        "ThrowStatement": [
          {
            "code": "var a = 1; throw a;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;throw $hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];",
            "eval": (code) => {
                      let result;
                      let exception;
                      try {
                        result = HookApiTest.nativeEval(code);
                      }
                      catch (e) {
                        exception = e;
                      }
                      //console.log(exception);
                      return exception ? exception.name + ': ' + exception.message : result;
                    },
            "name": "ThrowStatement  var a = 1; throw a;"
          }
        ],
        "TryStatement": [
          {
            "code": "try { x; } catch (e) { e.name; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_x;HookApiTest']);try{$hook$.global(__hook__,_c_[0],'x','get')[_c_[1]];}catch(e){__hook__('.',e,['name'],_c_[0]);}",
            "name": "TryStatement  try { x; } catch (e) { e.name; }"
          }
        ],
        "WhileStatement": [
          {
            "code": "with({a: 2}) { while (a--) {}; a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){while(__hook__('w--',__with__,['a',()=>a--],_c_[0],false)){};__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "WhileStatement  with({a: 2}) { while (a--) {}; a; }"
          },
          {
            "code": "with({a: 2}) { while (a) { a -= 2; break; }; a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){while(__hook__('w.',__with__,['a',()=>a],_c_[0],false)){__hook__('w-=',__with__,['a',2,v=>a-=v],_c_[0],false);break;};__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "WhileStatement  with({a: 2}) { while (a) { a -= 2; break; }; a; }"
          }
        ],
        "DoWhileStatement": [
          {
            "code": "with({a: 2}) { do { 1; } while (a--); a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){do{1;}while(__hook__('w--',__with__,['a',()=>a--],_c_[0],false));__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "DoWhileStatement  with({a: 2}) { do { 1; } while (a--); a; }"
          }
        ],
        "ForStatement": [
          {
            "code": "with({a: 0, b: 2, c: 0}) { for(a;b;c) { break; } b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:0,b:2,c:0},{})){for(__hook__('w.',__with__,['a',()=>a],_c_[0],false);__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['c',()=>c],_c_[0],false)){break;}__hook__('w.',__with__,['b',()=>b],_c_[0],false);}",
            "name": "ForStatement  with({a: 0, b: 2, c: 0}) { for(a;b;c) { break; } b; }"
          },
          {
            "code": "with({a: 0, b: 2, c: 0}) { for(a=1;b;c++) { break; } b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:0,b:2,c:0},{})){for(__hook__('w=',__with__,['a',1,v=>a=v],_c_[0],false);__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w++',__with__,['c',()=>c++],_c_[0],false)){break;}__hook__('w.',__with__,['b',()=>b],_c_[0],false);}",
            "name": "ForStatement  with({a: 0, b: 2, c: 0}) { for(a=1;b;c++) { break; } b; }"
          },
          {
            "code": "with({b: 2, c: 0}) { for(let a=1;b>c;c++) { break; } c; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({b:2,c:0},{})){for(let a=1;__hook__('w.',__with__,['b',()=>b],_c_[0],false)>__hook__('w.',__with__,['c',()=>c],_c_[0],false);__hook__('w++',__with__,['c',()=>c++],_c_[0],false)){break;}__hook__('w.',__with__,['c',()=>c],_c_[0],false);}",
            "name": "ForStatement  with({b: 2, c: 0}) { for(let a=1;b>c;c++) { break; } c; }"
          },
          {
            "code": "var [a,b,c] = [0,2,0]; for(a;b;c) { break; } b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest']);[$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]]=__hook__('*',[0,2,0],[],_c_[0]);for($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]]){break;}$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "ForStatement  var [a,b,c] = [0,2,0]; for(a;b;c) { break; } b;"
          },
          {
            "code": "for (var i = 1, j = 2; i < j; i++) {}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest']);for($hook$.global(__hook__,_c_[0],'i','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]]=2;$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]<$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'i','set')[_c_[1]]++){}",
            "name": "ForStatement  for (var i = 1, j = 2; i < j; i++) {}"
          }
        ],
        "ForInStatement": [
          {
            "code": "with({a: 0, b: {x:1,y:2}}) { let c = 0; for (a in b) { c += b[a]; } c; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:0,b:{x:1,y:2}},{})){let c=0;for(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['=']in __hook__('*',__hook__('w.',__with__,['b',()=>b],_c_[0],false),[],_c_[0])){c+=__hook__('.',__hook__('w.',__with__,['b',()=>b],_c_[0],false),[__hook__('w.',__with__,['a',()=>a],_c_[0],false)],_c_[0]);}c;}",
            "name": "ForInStatement  with({a: 0, b: {x:1,y:2}}) { let c = 0; for (a in b) { c += b[a]; } c; }"
          }
        ],
        "ForOfStatement": [
          {
            "code": "{ let a, b = [1, 2], c = 0; for (a of b) { c += a; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a,b=[1,2],c=0;for(a of __hook__('*',b,[],_c_[0])){c+=a;}}",
            "name": "ForOfStatement  { let a, b = [1, 2], c = 0; for (a of b) { c += a; } }"
          },
          {
            "code": "{ let b = [1, 2], c = 0; for (let a of b) { c += a; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let b=[1,2],c=0;for(let a of __hook__('*',b,[],_c_[0])){c+=a;}}",
            "name": "ForOfStatement  { let b = [1, 2], c = 0; for (let a of b) { c += a; } }"
          },
          {
            "code": "{ with ({a:0,b:[1, 2],c:0}) { for (a of b) { c += a; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:0,b:[1,2],c:0},{})){for(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['=']of __hook__('*',__hook__('w.',__with__,['b',()=>b],_c_[0],false),[],_c_[0])){__hook__('w+=',__with__,['c',__hook__('w.',__with__,['a',()=>a],_c_[0],false),v=>c+=v],_c_[0],false);}}}",
            "name": "ForOfStatement  { with ({a:0,b:[1, 2],c:0}) { for (a of b) { c += a; } } }"
          },
          {
            "code": "{ with ({b:[1, 2],c:0}) { for (let a of b) { c += a; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({b:[1,2],c:0},{})){for(let a of __hook__('*',__hook__('w.',__with__,['b',()=>b],_c_[0],false),[],_c_[0])){__hook__('w+=',__with__,['c',a,v=>c+=v],_c_[0],false);}}}",
            "name": "ForOfStatement  { with ({b:[1, 2],c:0}) { for (let a of b) { c += a; } } }"
          },
          {
            "code": "var a, b = [1, 2], c = 0; for (a of b) { c += a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=[1,2],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]=0;for($hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]of __hook__('*',$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],[],_c_[0])){$hook$.global(__hook__,_c_[0],'c','set')[_c_[3]]+=$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];}",
            "name": "ForOfStatement  var a, b = [1, 2], c = 0; for (a of b) { c += a; }"
          },
          {
            "code": "var b = [1, 2], c = 0; for (let a of b) { c += a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest']);$hook$.global(__hook__,_c_[0],'b','var')[_c_[1]]=[1,2],$hook$.global(__hook__,_c_[0],'c','var')[_c_[2]]=0;for(let a of __hook__('*',$hook$.global(__hook__,_c_[0],'b','get')[_c_[1]],[],_c_[0])){$hook$.global(__hook__,_c_[0],'c','set')[_c_[2]]+=a;}",
            "name": "ForOfStatement  var b = [1, 2], c = 0; for (let a of b) { c += a; }"
          },
          {
            "code": "var b = [1, 2], c = 0; for (var a of b) { c += a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'b','var')[_c_[1]]=[1,2],$hook$.global(__hook__,_c_[0],'c','var')[_c_[2]]=0;for($hook$.global(__hook__,_c_[0],'a','var')[_c_[3]]of __hook__('*',$hook$.global(__hook__,_c_[0],'b','get')[_c_[1]],[],_c_[0])){$hook$.global(__hook__,_c_[0],'c','set')[_c_[2]]+=$hook$.global(__hook__,_c_[0],'a','get')[_c_[3]];}",
            "name": "ForOfStatement  var b = [1, 2], c = 0; for (var a of b) { c += a; }"
          },
          {
            "code": "'use strict'; var b = [1, 2], c = 0; for (var a of b) { c += a; }",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_b;HookApiTest','S_pp_c;HookApiTest','S_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'b','#var')[_c_[1]]=[1,2],$hook$.global(__hook__,_c_[0],'c','#var')[_c_[2]]=0;for($hook$.global(__hook__,_c_[0],'a','#var')[_c_[3]]of __hook__('#*',$hook$.global(__hook__,_c_[0],'b','#get')[_c_[1]],[],_c_[0])){$hook$.global(__hook__,_c_[0],'c','#set')[_c_[2]]+=$hook$.global(__hook__,_c_[0],'a','#get')[_c_[3]];}",
            "name": "ForOfStatement  'use strict'; var b = [1, 2], c = 0; for (var a of b) { c += a; }"
          }
        ],
        "VariableDeclaration": [
          {
            "code": "var a = 2; a;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=2;$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];",
            "name": "VariableDeclaration  var a = 2; a;"
          },
          {
            "code": "{ let a = 3; a; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=3;a;}",
            "name": "VariableDeclaration  { let a = 3; a; }"
          },
          {
            "code": "{ const a = 4; a; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{const a=4;a;}",
            "name": "VariableDeclaration  { const a = 4; a; }"
          },
          {
            "code": "let a = 3;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','let')[_c_[1]]=3;",
            "eval": () => true,
            "name": "VariableDeclaration  let a = 3;"
          },
          {
            "code": "'use strict'; var g = 1; g = 2; g;",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_g;HookApiTest']);$hook$.global(__hook__,_c_[0],'g','#var')[_c_[1]]=1;$hook$.global(__hook__,_c_[0],'g','#set')[_c_[1]]=2;$hook$.global(__hook__,_c_[0],'g','#get')[_c_[1]];",
            "name": "VariableDeclaration  'use strict'; var g = 1; g = 2; g;"
          },
          {
            "code": "const constantVariable = 4; { let a = constantVariable; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_constantVariable;HookApiTest','HookApiTest,a','_pp_constantVariable;HookApiTest,a']);$hook$.global(__hook__,_c_[0],'constantVariable','const')[_c_[1]]=4;{let a=$hook$.global(__hook__,_c_[2],'constantVariable','get')[_c_[3]];}",
            "eval": (script) => { if (script.toString().indexOf('__hook__') >= 0) { HookApiTest.nativeEval(script); } return true; },
            "name": "VariableDeclaration  const constantVariable = 4; { let a = constantVariable; }"
          },
          {
            "code": "(function () { var a = 10; return a; })",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);(function(){return __hook__(()=>{var a=10;return a;},null,arguments,_c_[0]);});",
            "eval": (code) => HookApiTest.nativeEval(code)(),
            "name": "VariableDeclaration  (function () { var a = 10; return a; })"
          },
          {
            "name": "VariableDeclaration assuming globalVariable1 has been declared let globalVariable1 = 2; undefined;",
            "code": "let globalVariable1 = 2; undefined;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_globalVariable1;HookApiTest','_pp_undefined;HookApiTest']);$hook$.global(__hook__,_c_[0],'globalVariable1','let')[_c_[1]]=2;$hook$.global(__hook__,_c_[0],'undefined','get')[_c_[2]];",
            "eval": (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } }
          },
          {
            "name": "VariableDeclaration assuming globalVariable1 has been declared const globalVariable1 = 2; undefined;",
            "code": "const globalVariable1 = 2; undefined;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_globalVariable1;HookApiTest','_pp_undefined;HookApiTest']);$hook$.global(__hook__,_c_[0],'globalVariable1','const')[_c_[1]]=2;$hook$.global(__hook__,_c_[0],'undefined','get')[_c_[2]];",
            "eval": (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } }
          },
          {
            "name": "VariableDeclaration assuming globalVariable1 has been declared class globalVariable1 {}; undefined;",
            "code": "class globalVariable1 {}; undefined;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,globalVariable1','_pp_globalVariable1;HookApiTest,globalVariable1','HookApiTest','_pp_undefined;HookApiTest']);$hook$.global(__hook__,_c_[0],'globalVariable1','class')[_c_[1]]=class globalVariable1{};;$hook$.global(__hook__,_c_[2],'undefined','get')[_c_[3]];",
            "eval": (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } }
          },
          {
            "code": "{ let undefined, NaN, Infinity; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let __unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__;}",
            "name": "VariableDeclaration  { let undefined, NaN, Infinity; }"
          },
          {
            "code": "{ let undefined = 1, NaN = 2, Infinity = 3; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let __unexpected_overridden_declaration_of_undefined__=1,__unexpected_overridden_declaration_of_NaN__=2,__unexpected_overridden_declaration_of_Infinity__=3;}",
            "name": "VariableDeclaration  { let undefined = 1, NaN = 2, Infinity = 3; }"
          }
        ],
        "VariableDeclarator": [
          {
            "code": "{ let a = {p:1}, b = a, c = a.p; [a,b,c];}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c']);{let a={p:1},b=a,c=__hook__('.',a,['p'],_c_[0]);[a,b,c];}",
            "name": "VariableDeclarator  { let a = {p:1}, b = a, c = a.p; [a,b,c];}"
          },
          {
            "code": "{ with ({}) { let a = {p:1}, b = a, c = a.p; [a,b,c]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c']);{with($hook$.with({},{})){let a={p:1},b=a,c=__hook__('.',a,['p'],_c_[0]);[a,b,c];}}",
            "name": "VariableDeclarator  { with ({}) { let a = {p:1}, b = a, c = a.p; [a,b,c]; } }"
          },
          {
            "code": "{ with ({a:{p:1}}) { let b = a, c = a.p; [a,b,c]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,b','HookApiTest,c','HookApiTest']);{with($hook$.with({a:{p:1}},{})){let b=__hook__('w.',__with__,['a',()=>a],_c_[0],false),c=__hook__('.',__hook__('w.',__with__,['a',()=>a],_c_[1],false),['p'],_c_[1]);[__hook__('w.',__with__,['a',()=>a],_c_[2],false),b,c];}}",
            "name": "VariableDeclarator  { with ({a:{p:1}}) { let b = a, c = a.p; [a,b,c]; } }"
          },
          {
            "code": "var a = {p:1}, b = a, c = a.p; [a,b,c];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]={p:1},$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]=__hook__('.',$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],['p'],_c_[0]);[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]]];",
            "name": "VariableDeclarator  var a = {p:1}, b = a, c = a.p; [a,b,c];"
          }
        ],
        "ThisExpression": [
          {
            "code": "this === window",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_window;HookApiTest']);this===$hook$.global(__hook__,_c_[0],'window','get')[_c_[1]];",
            "name": "ThisExpression  this === window"
          }
        ],
        "ArrayExpression": [
          {
            "name": "ArrayExpression empty Array []",
            "code": "[]",
            "hooked": "const _c_=$hook$.$(__hook__,[]);[];"
          },
          {
            "name": "ArrayExpression Array [1,'a',true]",
            "code": "[1,'a',true]",
            "hooked": "const _c_=$hook$.$(__hook__,[]);[1,'a',true];"
          },
          {
            "name": "ArrayExpression Array [1,,true]",
            "code": "[1,,true]",
            "hooked": "const _c_=$hook$.$(__hook__,[]);[1,,true];"
          }
        ],
        "ArrayPattern": [
          {
            "code": "{ let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let [a,b=a,[c],{_d:d}]=__hook__('*',[1,2,[3],{_d:4}],[],_c_[0]);[a,b,c,d];}",
            "name": "ArrayPattern  { let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; }"
          },
          {
            "code": "{ with ({}) { let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let [a,b=a,[c],{_d:d}]=__hook__('*',[1,2,[3],{_d:4}],[],_c_[0]);[a,b,c,d];}}",
            "name": "ArrayPattern  { with ({}) { let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }"
          },
          {
            "code": "{ with ({a:1}) { let [_a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:1},{})){let [_a,b=__hook__('w.',__with__,['a',()=>a],_c_[0],false),[c],{_d:d}]=__hook__('*',[1,2,[3],{_d:4}],[],_c_[0]);[__hook__('w.',__with__,['a',()=>a],_c_[0],false),b,c,d];}}",
            "name": "ArrayPattern  { with ({a:1}) { let [_a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }"
          },
          {
            "code": "var [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','HookApiTest,_d','_pp_d;HookApiTest,_d','_pp_d;HookApiTest']);[$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],[$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]],{_d:$hook$.global(__hook__,_c_[4],'d','var')[_c_[5]]}]=__hook__('*',[1,2,[3],{_d:4}],[],_c_[0]);[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','get')[_c_[6]]];",
            "name": "ArrayPattern  var [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d];"
          },
          {
            "code": "{ let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a,b,c,d,e={};[a,b=a,[c],{_d:d},__hook__('.=',e,['p'],_c_[0])['=']]=__hook__('*',[1,2,[3],{_d:4},5],[],_c_[0]);[a,b,c,d,__hook__('.',e,['p'],_c_[0])];}",
            "name": "ArrayPattern  { let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; }"
          },
          {
            "code": "{ with ({}) { let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let a,b,c,d,e={};[a,b=a,[c],{_d:d},__hook__('.=',e,['p'],_c_[0])['=']]=__hook__('*',[1,2,[3],{_d:4},5],[],_c_[0]);[a,b,c,d,__hook__('.',e,['p'],_c_[0])];}}",
            "name": "ArrayPattern  { with ({}) { let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; } }"
          },
          {
            "code": "{ let a,b,c,d,e = {}; with ({}) { [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,_d']);{let a,b,c,d,e={};with($hook$.with({},{a:true,b:true,c:true,d:true,e:true})){[__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['='],__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],_c_[0],false)['=']=__hook__('w.',__with__,['a',()=>a],_c_[0],false),[__hook__('w.=',__with__,['c',{set ['='](v){c=v;},get ['='](){return c;}}],_c_[0],false)['=']],{_d:__hook__('w.=',__with__,['d',{set ['='](v){d=v;},get ['='](){return d;}}],_c_[1],false)['=']},__hook__('.=',__hook__('w.',__with__,['e',()=>e],_c_[0],false),['p'],_c_[0])['=']]=__hook__('*',[1,2,[3],{_d:4},5],[],_c_[0]);[__hook__('w.',__with__,['a',()=>a],_c_[0],false),__hook__('w.',__with__,['b',()=>b],_c_[0],false),__hook__('w.',__with__,['c',()=>c],_c_[0],false),__hook__('w.',__with__,['d',()=>d],_c_[0],false),__hook__('.',__hook__('w.',__with__,['e',()=>e],_c_[0],false),['p'],_c_[0])];}}",
            "name": "ArrayPattern  { let a,b,c,d,e = {}; with ({}) { [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; } }"
          },
          {
            "code": "var a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_d;HookApiTest','_pp_e;HookApiTest','HookApiTest,_d','_pp_d;HookApiTest,_d']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','var')[_c_[4]],$hook$.global(__hook__,_c_[0],'e','var')[_c_[5]]={};[$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','set')[_c_[2]]=$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],[$hook$.global(__hook__,_c_[0],'c','set')[_c_[3]]],{_d:$hook$.global(__hook__,_c_[6],'d','set')[_c_[7]]},__hook__('.=',$hook$.global(__hook__,_c_[0],'e','get')[_c_[5]],['p'],_c_[0])['=']]=__hook__('*',[1,2,[3],{_d:4},5],[],_c_[0]);[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','get')[_c_[4]],__hook__('.',$hook$.global(__hook__,_c_[0],'e','get')[_c_[5]],['p'],_c_[0])];",
            "name": "ArrayPattern  var a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p];"
          },
          {
            "code": "{ function * f([a,b,{c=3},[d=4],...[...e]]) { yield * [a,b,c,d,...e]; } let x = []; for (let v of f([1,2,{y:3},[],5,6])) { x.push(v); } x; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function*f(...args){for(let arg of arguments)__hook__('*',arg,[],_c_[0]);yield*__hook__(function*([a,b,{c=3},[d=4],...[...e]]){yield*[a,b,c,d,...e];},this,args,_c_[0]);}let x=[];for(let v of __hook__('*',__hook__(f,null,[[1,2,{y:3},[],5,6]],_c_[1],0),[],_c_[1])){__hook__('()',x,['push',[v]],_c_[1]);}x;}",
            "name": "ArrayPattern  { function * f([a,b,{c=3},[d=4],...[...e]]) { yield * [a,b,c,d,...e]; } let x = []; for (let v of f([1,2,{y:3},[],5,6])) { x.push(v); } x; }"
          },
          {
            "code": "{ function f(a,b,{y:{xy:yy=7,zy:zy=8,zz=2,uu},c=3},[d=4],...[...e]) { return [a,b,yy,zz,uu,c,d,...e]; } f(1,2,{y:{xy:9,uu:0}},[],5,6); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(a,b,{y:{xy:yy,zy:zy,zz,uu},c},[d],...[...e]){for(let arg of arguments)__hook__('*',arg,[],_c_[0]);return __hook__((a,b,{y:{xy:yy=7,zy:zy=8,zz=2,uu},c=3},[d=4],...[...e])=>{return[a,b,yy,zz,uu,c,d,...e];},null,arguments,_c_[0]);}__hook__(f,null,[1,2,{y:{xy:9,uu:0}},[],5,6],_c_[1],0);}",
            "name": "ArrayPattern  { function f(a,b,{y:{xy:yy=7,zy:zy=8,zz=2,uu},c=3},[d=4],...[...e]) { return [a,b,yy,zz,uu,c,d,...e]; } f(1,2,{y:{xy:9,uu:0}},[],5,6); }"
          },
          {
            "code": "{ function f([a,,[b]]) { let [c,,[d]] = [4,5,[6]]; let e, g; [e,,[g]] = [7,8,[9]]; return [a,b,c,d,e,g]; } f([1,2,[3]]); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(...args){for(let arg of arguments)__hook__('*',arg,[],_c_[0]);return __hook__(([a,,[b]])=>{let [c,,[d]]=__hook__('*',[4,5,[6]],[],_c_[0]);let e,g;[e,,[g]]=__hook__('*',[7,8,[9]],[],_c_[0]);return[a,b,c,d,e,g];},null,args,_c_[0]);}__hook__(f,null,[[1,2,[3]]],_c_[1],0);}",
            "name": "ArrayPattern  { function f([a,,[b]]) { let [c,,[d]] = [4,5,[6]]; let e, g; [e,,[g]] = [7,8,[9]]; return [a,b,c,d,e,g]; } f([1,2,[3]]); }"
          },
          {
            "code": "{ let result = 0; for (var [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest']);{let result=0;for([$hook$.global(__hook__,_c_[0],'i','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]]]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];}result;}",
            "name": "ArrayPattern  { let result = 0; for (var [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;for(let [i,j]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){result+=i+j;}result;}",
            "name": "ArrayPattern  { let result = 0; for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; var i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest']);{let result=0;$hook$.global(__hook__,_c_[0],'i','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]];for([$hook$.global(__hook__,_c_[0],'i','set')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','set')[_c_[2]]]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];}result;}",
            "name": "ArrayPattern  { let result = 0; var i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; let i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;let i,j;for([i,j]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){result+=i+j;}result;}",
            "name": "ArrayPattern  { let result = 0; let i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; for (var [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest']);{let result=0;for([$hook$.global(__hook__,_c_[0],'i','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]]]=__hook__('*',[3,4],[],_c_[0]);$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]&&$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'i','set')[_c_[1]]--,$hook$.global(__hook__,_c_[0],'j','set')[_c_[2]]--){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];}result;}",
            "name": "ArrayPattern  { let result = 0; for (var [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;for(let [i,j]=__hook__('*',[3,4],[],_c_[0]);i&&j;i--,j--){result+=i+j;}result;}",
            "name": "ArrayPattern  { let result = 0; for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; var i,j; for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest']);{let result=0;$hook$.global(__hook__,_c_[0],'i','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]];for([$hook$.global(__hook__,_c_[0],'i','set')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','set')[_c_[2]]]=__hook__('*',[3,4],[],_c_[0]);$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]&&$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'i','set')[_c_[1]]--,$hook$.global(__hook__,_c_[0],'j','set')[_c_[2]]--){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];}result;}",
            "name": "ArrayPattern  { let result = 0; var i,j; for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; with({}) { for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;with($hook$.with({},{result:true})){for(let [i,j]=__hook__('*',[3,4],[],_c_[0]);i&&j;i--,j--){__hook__('w+=',__with__,['result',i+j,v=>result+=v],_c_[0],false);}__hook__('w.',__with__,['result',()=>result],_c_[0],false);}}",
            "name": "ArrayPattern  { let result = 0; with({}) { for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }"
          },
          {
            "code": "{ let result = 0; let i, j; with({}) { for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;let i,j;with($hook$.with({},{result:true,i:true,j:true})){for([__hook__('w.=',__with__,['i',{set ['='](v){i=v;},get ['='](){return i;}}],_c_[0],false)['='],__hook__('w.=',__with__,['j',{set ['='](v){j=v;},get ['='](){return j;}}],_c_[0],false)['=']]=__hook__('*',[3,4],[],_c_[0]);__hook__('w.',__with__,['i',()=>i],_c_[0],false)&&__hook__('w.',__with__,['j',()=>j],_c_[0],false);__hook__('w--',__with__,['i',()=>i--],_c_[0],false),__hook__('w--',__with__,['j',()=>j--],_c_[0],false)){__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],_c_[0],false)+__hook__('w.',__with__,['j',()=>j],_c_[0],false),v=>result+=v],_c_[0],false);}__hook__('w.',__with__,['result',()=>result],_c_[0],false);}}",
            "name": "ArrayPattern  { let result = 0; let i, j; with({}) { for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }"
          },
          {
            "code": "{ let result = 0; with ({}) { for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;with($hook$.with({},{result:true})){for(let [i,j]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){__hook__('w+=',__with__,['result',i+j,v=>result+=v],_c_[0],false);}__hook__('w.',__with__,['result',()=>result],_c_[0],false);}}",
            "name": "ArrayPattern  { let result = 0; with ({}) { for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; } }"
          },
          {
            "code": "{ let result = 0; let i,j; with ({}) { for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; } } ",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;let i,j;with($hook$.with({},{result:true,i:true,j:true})){for([__hook__('w.=',__with__,['i',{set ['='](v){i=v;},get ['='](){return i;}}],_c_[0],false)['='],__hook__('w.=',__with__,['j',{set ['='](v){j=v;},get ['='](){return j;}}],_c_[0],false)['=']]of __hook__('*',[[1,2],[3,4]],[],_c_[0])){__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],_c_[0],false)+__hook__('w.',__with__,['j',()=>j],_c_[0],false),v=>result+=v],_c_[0],false);}__hook__('w.',__with__,['result',()=>result],_c_[0],false);}}",
            "name": "ArrayPattern  { let result = 0; let i,j; with ({}) { for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; } } "
          },
          {
            "code": "{ let [undefined,NaN,Infinity] = [1,2,3]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let [__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__]=__hook__('*',[1,2,3],[],_c_[0]);}",
            "name": "ArrayPattern  { let [undefined,NaN,Infinity] = [1,2,3]; }"
          }
        ],
        "RestElement": [
          {
            "code": "{ let [...a] = [1,2,3]; a; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let [...a]=__hook__('*',[1,2,3],[],_c_[0]);a;}",
            "name": "RestElement  { let [...a] = [1,2,3]; a; }"
          },
          {
            "code": "{ let a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a,b,c={},d={},e,f=[];[...a]=__hook__('*',[...[b]]=__hook__('*',[...(__hook__('.=',c,['p'],_c_[0]))['=']]=__hook__('*',[...[__hook__('.=',d,['p'],_c_[0])['=']]]=__hook__('*',[...[...e]]=__hook__('*',[...[__hook__('.=',f,[0],_c_[0])['='],__hook__('.=',f,[1],_c_[0])['='],__hook__('.=',f,[2],_c_[0])['=']]]=__hook__('*',[1,2,3],[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]);[a,b,c,d,e,f];}",
            "name": "RestElement  { let a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; }"
          },
          {
            "code": "{ with ({}) { let [...a] = [1,2,3]; a; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let [...a]=__hook__('*',[1,2,3],[],_c_[0]);a;}}",
            "name": "RestElement  { with ({}) { let [...a] = [1,2,3]; a; } }"
          },
          {
            "code": "{ with ({a:0,b:0,c:{},d:{},e:0,f:[]}) { [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:0,b:0,c:{},d:{},e:0,f:[]},{})){[...(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false))['=']]=__hook__('*',[...[__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],_c_[0],false)['=']]]=__hook__('*',[...(__hook__('.=',__hook__('w.',__with__,['c',()=>c],_c_[0],false),['p'],_c_[0]))['=']]=__hook__('*',[...[__hook__('.=',__hook__('w.',__with__,['d',()=>d],_c_[0],false),['p'],_c_[0])['=']]]=__hook__('*',[...[...(__hook__('w.=',__with__,['e',{set ['='](v){e=v;},get ['='](){return e;}}],_c_[0],false))['=']]]=__hook__('*',[...[__hook__('.=',__hook__('w.',__with__,['f',()=>f],_c_[0],false),[0],_c_[0])['='],__hook__('.=',__hook__('w.',__with__,['f',()=>f],_c_[0],false),[1],_c_[0])['='],__hook__('.=',__hook__('w.',__with__,['f',()=>f],_c_[0],false),[2],_c_[0])['=']]]=__hook__('*',[1,2,3],[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]);[__hook__('w.',__with__,['a',()=>a],_c_[0],false),__hook__('w.',__with__,['b',()=>b],_c_[0],false),__hook__('w.',__with__,['c',()=>c],_c_[0],false),__hook__('w.',__with__,['d',()=>d],_c_[0],false),__hook__('w.',__with__,['e',()=>e],_c_[0],false),__hook__('w.',__with__,['f',()=>f],_c_[0],false)];}}",
            "name": "RestElement  { with ({a:0,b:0,c:{},d:{},e:0,f:[]}) { [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; } }"
          },
          {
            "code": "var [...a] = [1,2,3]; a;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);[...($hook$.global(__hook__,_c_[0],'a','var'))[_c_[1]]]=__hook__('*',[1,2,3],[],_c_[0]);$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]];",
            "name": "RestElement  var [...a] = [1,2,3]; a;"
          },
          {
            "code": "var a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_d;HookApiTest','_pp_e;HookApiTest','_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]={},$hook$.global(__hook__,_c_[0],'d','var')[_c_[4]]={},$hook$.global(__hook__,_c_[0],'e','var')[_c_[5]],$hook$.global(__hook__,_c_[0],'f','var')[_c_[6]]=[];[...($hook$.global(__hook__,_c_[0],'a','set'))[_c_[1]]]=__hook__('*',[...[$hook$.global(__hook__,_c_[0],'b','set')[_c_[2]]]]=__hook__('*',[...(__hook__('.=',$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]],['p'],_c_[0]))['=']]=__hook__('*',[...[__hook__('.=',$hook$.global(__hook__,_c_[0],'d','get')[_c_[4]],['p'],_c_[0])['=']]]=__hook__('*',[...[...($hook$.global(__hook__,_c_[0],'e','set'))[_c_[5]]]]=__hook__('*',[...[__hook__('.=',$hook$.global(__hook__,_c_[0],'f','get')[_c_[6]],[0],_c_[0])['='],__hook__('.=',$hook$.global(__hook__,_c_[0],'f','get')[_c_[6]],[1],_c_[0])['='],__hook__('.=',$hook$.global(__hook__,_c_[0],'f','get')[_c_[6]],[2],_c_[0])['=']]]=__hook__('*',[1,2,3],[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]),[],_c_[0]);[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','get')[_c_[4]],$hook$.global(__hook__,_c_[0],'e','get')[_c_[5]],$hook$.global(__hook__,_c_[0],'f','get')[_c_[6]]];",
            "name": "RestElement  var a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f];"
          },
          {
            "code": "{ function f(...a) { return a; } f(1,2,3); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(...a){return __hook__((...a)=>{return a;},null,arguments,_c_[0]);}__hook__(f,null,[1,2,3],_c_[1],0);}",
            "name": "RestElement  { function f(...a) { return a; } f(1,2,3); }"
          },
          {
            "code": "{ (function f(...a) { return a; })(1,2,3); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{__hook__(function f(...a){return __hook__((...a)=>{return a;},null,arguments,_c_[1]);},null,[1,2,3],_c_[0],0);}",
            "name": "RestElement  { (function f(...a) { return a; })(1,2,3); }"
          },
          {
            "code": "{ ((...a) => a)(1,2,3); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{__hook__((...args)=>__hook__((...a)=>a,null,args,_c_[0]),null,[1,2,3],_c_[0],0);}",
            "name": "RestElement  { ((...a) => a)(1,2,3); }"
          },
          {
            "code": "{ function f([...a]) { return a; } f([1,2,3]); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(...args){for(let arg of arguments)__hook__('*',arg,[],_c_[0]);return __hook__(([...a])=>{return a;},null,args,_c_[0]);}__hook__(f,null,[[1,2,3]],_c_[1],0);}",
            "name": "RestElement  { function f([...a]) { return a; } f([1,2,3]); }"
          },
          {
            "code": "{ (function f([...a]) { return a; })([1,2,3]); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,f']);{__hook__(function f(...args){for(let arg of arguments)__hook__('*',arg,[],_c_[1]);return __hook__(([...a])=>{return a;},null,args,_c_[1]);},null,[[1,2,3]],_c_[0],0);}",
            "name": "RestElement  { (function f([...a]) { return a; })([1,2,3]); }"
          },
          {
            "code": "{ (([...a]) => a)([1,2,3]); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{__hook__((...args)=>__hook__(([...a])=>a,null,args.map(arg=>__hook__('*',arg,[],_c_[0])),_c_[0]),null,[[1,2,3]],_c_[0],0);}",
            "name": "RestElement  { (([...a]) => a)([1,2,3]); }"
          },
          {
            "code": "{ let [...undefined] = [], [...NaN] = [], [...Infinity] = []; true; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let [...__unexpected_overridden_declaration_of_undefined__]=__hook__('*',[],[],_c_[0]),[...__unexpected_overridden_declaration_of_NaN__]=__hook__('*',[],[],_c_[0]),[...__unexpected_overridden_declaration_of_Infinity__]=__hook__('*',[],[],_c_[0]);true;}",
            "name": "RestElement  { let [...undefined] = [], [...NaN] = [], [...Infinity] = []; true; }"
          }
        ],
        "ExperimentalRestProperty": [
          {
            "code": "{ let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let {p1,...b}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]);[p1,b];}",
            "name": "ExperimentalRestProperty  { let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; }"
          },
          {
            "code": "{ with ({}) { let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let {p1,...b}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]);[p1,b];}}",
            "name": "ExperimentalRestProperty  { with ({}) { let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; } }"
          },
          {
            "code": "var {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,p1','_pp_p1;HookApiTest,p1','HookApiTest','_pp_b;HookApiTest','_pp_p1;HookApiTest']);({p1:$hook$.global(__hook__,_c_[0],'p1','var')[_c_[1]],...($hook$.global(__hook__,_c_[2],'b','var'))[_c_[3]]}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[2]));[$hook$.global(__hook__,_c_[2],'p1','get')[_c_[4]],$hook$.global(__hook__,_c_[2],'b','get')[_c_[3]]];",
            "name": "ExperimentalRestProperty  var {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b];"
          },
          {
            "code": "{ let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let p1,b;({p1,...b}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]));[p1,b];}",
            "name": "ExperimentalRestProperty  { let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }"
          },
          {
            "code": "{ with ({}) { let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let p1,b;({p1:p1,...b}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]));[p1,b];}}",
            "name": "ExperimentalRestProperty  { with ({}) { let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }"
          },
          {
            "code": "var p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_p1;HookApiTest','_pp_b;HookApiTest','HookApiTest,p1','_pp_p1;HookApiTest,p1']);$hook$.global(__hook__,_c_[0],'p1','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]];({p1:$hook$.global(__hook__,_c_[3],'p1','set')[_c_[4]],...($hook$.global(__hook__,_c_[0],'b','set'))[_c_[2]]}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]));[$hook$.global(__hook__,_c_[0],'p1','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]];",
            "name": "ExperimentalRestProperty  var p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b];"
          },
          {
            "code": "{ let p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let p1,b={};({p1,...(__hook__('.=',b,['p'],_c_[0]))['=']}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]));[p1,b];}",
            "name": "ExperimentalRestProperty  { let p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }"
          },
          {
            "code": "{ with ({p1:0,b:{}}) { ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,p1','HookApiTest']);{with($hook$.with({p1:0,b:{}},{})){({p1:__hook__('w.=',__with__,['p1',{set ['='](v){p1=v;},get ['='](){return p1;}}],_c_[0],false)['='],...(__hook__('.=',__hook__('w.',__with__,['b',()=>b],_c_[1],false),['p'],_c_[1]))['=']}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[1]));[__hook__('w.',__with__,['p1',()=>p1],_c_[1],false),__hook__('w.',__with__,['b',()=>b],_c_[1],false)];}}",
            "name": "ExperimentalRestProperty  { with ({p1:0,b:{}}) { ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }"
          },
          {
            "code": "var p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_p1;HookApiTest','_pp_b;HookApiTest','HookApiTest,p1','_pp_p1;HookApiTest,p1']);$hook$.global(__hook__,_c_[0],'p1','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]={};({p1:$hook$.global(__hook__,_c_[3],'p1','set')[_c_[4]],...(__hook__('.=',$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],['p'],_c_[0]))['=']}=__hook__('*',{p1:1,p2:2,p3:3},[],_c_[0]));[$hook$.global(__hook__,_c_[0],'p1','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]];",
            "name": "ExperimentalRestProperty  var p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b];"
          },
          {
            "code": "{ function f() { let {...p} = { a: 1 }; return p; } f(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(){return __hook__(()=>{let {...p}=__hook__('*',{a:1},[],_c_[0]);return p;},null,arguments,_c_[0]);}__hook__(f,null,[],_c_[1],0);}",
            "name": "ExperimentalRestProperty  { function f() { let {...p} = { a: 1 }; return p; } f(); }"
          },
          {
            "code": "{ function f({...p}) { return p; } f({a:1}); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f({...p}){for(let arg of arguments)__hook__('*',arg,[],_c_[0]);return __hook__(({...p})=>{return p;},null,arguments,_c_[0]);}__hook__(f,null,[{a:1}],_c_[1],0);}",
            "name": "ExperimentalRestProperty  { function f({...p}) { return p; } f({a:1}); }"
          },
          {
            "code": "var {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp___unexpected_overridden_declaration_of_undefined__;HookApiTest','_pp___unexpected_overridden_declaration_of_NaN__;HookApiTest','_pp___unexpected_overridden_declaration_of_Infinity__;HookApiTest']);({...($hook$.global(__hook__,_c_[0],'__unexpected_overridden_declaration_of_undefined__','var'))[_c_[1]]}=__hook__('*',{},[],_c_[0]),{...($hook$.global(__hook__,_c_[0],'__unexpected_overridden_declaration_of_NaN__','var'))[_c_[2]]}=__hook__('*',{},[],_c_[0]),{...($hook$.global(__hook__,_c_[0],'__unexpected_overridden_declaration_of_Infinity__','var'))[_c_[3]]}=__hook__('*',{},[],_c_[0]));true;",
            "name": "ExperimentalRestProperty  var {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true;"
          },
          {
            "code": "{ let {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let {...__unexpected_overridden_declaration_of_undefined__}=__hook__('*',{},[],_c_[0]),{...__unexpected_overridden_declaration_of_NaN__}=__hook__('*',{},[],_c_[0]),{...__unexpected_overridden_declaration_of_Infinity__}=__hook__('*',{},[],_c_[0]);true;}",
            "name": "ExperimentalRestProperty  { let {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true; }"
          }
        ],
        "SpreadElement": [
          {
            "code": "{ let a = [3, 4]; [1, 2, ...a] }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=[3,4];[1,2,...a];}",
            "name": "SpreadElement  { let a = [3, 4]; [1, 2, ...a] }"
          },
          {
            "code": "{ with ({a:[3, 4]}) { [1, 2, ...a] } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:[3,4]},{})){[1,2,...__hook__('w.',__with__,['a',()=>a],_c_[0],false)];}}",
            "name": "SpreadElement  { with ({a:[3, 4]}) { [1, 2, ...a] } }"
          },
          {
            "code": "var a = [3, 4]; [1, 2, ...a]",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=[3,4];[1,2,...$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]];",
            "name": "SpreadElement  var a = [3, 4]; [1, 2, ...a]"
          },
          {
            "code": "{ let a = [3, 4], f = a => a; f(1, 2, ...a); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{let a=[3,4],f=(...args)=>__hook__(a=>a,null,args,_c_[0]);__hook__(f,null,[1,2,...a],_c_[1],0);}",
            "name": "SpreadElement  { let a = [3, 4], f = a => a; f(1, 2, ...a); }"
          },
          {
            "code": "{ let a = [3, 4], f = a => a; with ({}) { f(1, 2, ...a); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{let a=[3,4],f=(...args)=>__hook__(a=>a,null,args,_c_[0]);with($hook$.with({},{a:true,f:true})){__hook__('w()',__with__,['f',[1,2,...__hook__('w.',__with__,['a',()=>a],_c_[1],false)],(...args)=>f(...args)],_c_[1],false);}}",
            "name": "SpreadElement  { let a = [3, 4], f = a => a; with ({}) { f(1, 2, ...a); } }"
          },
          {
            "code": "var a = [3, 4], f = a => a; f(1, 2, ...a);",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=[3,4],$hook$.global(__hook__,_c_[0],'f','var')[_c_[2]]=(...args)=>__hook__(a=>a,null,args,_c_[0]);__hook__($hook$.global(__hook__,_c_[0],'f','get')[_c_[2]],null,[1,2,...$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]],_c_[0],0);",
            "name": "SpreadElement  var a = [3, 4], f = a => a; f(1, 2, ...a);"
          }
        ],
        "ExperimentalSpreadProperty": [
          {
            "code": "{ let o = {a:1,b:2}; o = {c:3,...o}; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let o={a:1,b:2};o={c:3,...__hook__('*',o,[],_c_[0])};}",
            "name": "ExperimentalSpreadProperty  { let o = {a:1,b:2}; o = {c:3,...o}; }"
          },
          {
            "code": "{ with ({o:{a:1,b:2}}) { o = {c:3,...o}; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({o:{a:1,b:2}},{})){__hook__('w=',__with__,['o',{c:3,...__hook__('*',__hook__('w.',__with__,['o',()=>o],_c_[0],false),[],_c_[0])},v=>o=v],_c_[0],false);}}",
            "name": "ExperimentalSpreadProperty  { with ({o:{a:1,b:2}}) { o = {c:3,...o}; } }"
          },
          {
            "code": "var o = {a:1,b:2}; o = {c:3,...o};",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o;HookApiTest']);$hook$.global(__hook__,_c_[0],'o','var')[_c_[1]]={a:1,b:2};$hook$.global(__hook__,_c_[0],'o','set')[_c_[1]]={c:3,...__hook__('*',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],[],_c_[0])};",
            "name": "ExperimentalSpreadProperty  var o = {a:1,b:2}; o = {c:3,...o};"
          },
          {
            "code": "{ let o = {a:1,b:{c:4}}; o = {c:3,...o.b}; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let o={a:1,b:{c:4}};o={c:3,...__hook__('*',__hook__('.',o,['b'],_c_[0]),[],_c_[0])};}",
            "name": "ExperimentalSpreadProperty  { let o = {a:1,b:{c:4}}; o = {c:3,...o.b}; }"
          },
          {
            "code": "{ with ({o:{a:1,b:{c:4}}}) { o = {c:3,...o.b}; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({o:{a:1,b:{c:4}}},{})){__hook__('w=',__with__,['o',{c:3,...__hook__('*',__hook__('.',__hook__('w.',__with__,['o',()=>o],_c_[0],false),['b'],_c_[0]),[],_c_[0])},v=>o=v],_c_[0],false);}}",
            "name": "ExperimentalSpreadProperty  { with ({o:{a:1,b:{c:4}}}) { o = {c:3,...o.b}; } }"
          },
          {
            "code": "var o = {a:1,b:{c:4}}; o = {c:3,...o.b};",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o;HookApiTest']);$hook$.global(__hook__,_c_[0],'o','var')[_c_[1]]={a:1,b:{c:4}};$hook$.global(__hook__,_c_[0],'o','set')[_c_[1]]={c:3,...__hook__('*',__hook__('.',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],['b'],_c_[0]),[],_c_[0])};",
            "name": "ExperimentalSpreadProperty  var o = {a:1,b:{c:4}}; o = {c:3,...o.b};"
          },
          {
            "code": "'use strict'; var o = {a:1}; ({b:2,...o});",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_o;HookApiTest']);$hook$.global(__hook__,_c_[0],'o','#var')[_c_[1]]={a:1};({b:2,...__hook__('#*',$hook$.global(__hook__,_c_[0],'o','#get')[_c_[1]],[],_c_[0])});",
            "name": "ExperimentalSpreadProperty  'use strict'; var o = {a:1}; ({b:2,...o});"
          }
        ],
        "ObjectExpression": [
          {
            "name": "ObjectExpression Object ({})",
            "code": "({})",
            "hooked": "const _c_=$hook$.$(__hook__,[]);({});"
          },
          {
            "name": "ObjectExpression Object ({a:1,b:2})",
            "code": "({a:1,b:2})",
            "hooked": "const _c_=$hook$.$(__hook__,[]);({a:1,b:2});"
          },
          {
            "name": "ObjectExpression accessors ({get a() { return 1; }, set a(v) { this._a = v; }}).a",
            "code": "({get a() { return 1; }, set a(v) { this._a = v; }}).a",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,get a','HookApiTest,set a']);__hook__('.',{get a(){return __hook__(()=>{return 1;},null,arguments,_c_[1]);},set a(v){return __hook__(v=>{__hook__('=',this,['_a',v],_c_[2]);},null,arguments,_c_[2]);}},['a'],_c_[0]);"
          }
        ],
        "ObjectPattern": [
          {
            "code": "{ let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let {_a:a,_b:b=a,c,_d:[d],_e:{_f:f},_g:o}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[0]);[a,b,c,d,f,o];}",
            "name": "ObjectPattern  { let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; }"
          },
          {
            "code": "{ with ({}) { let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let {_a:a,_b:b=a,c,_d:[d],_e:{_f:f},_g:o}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[0]);[a,b,c,d,f,o];}}",
            "name": "ObjectPattern  { with ({}) { let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; } }"
          },
          {
            "code": "var { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,_a','_pp_a;HookApiTest,_a','HookApiTest,_b','_pp_b;HookApiTest,_b','_pp_a;HookApiTest,_b','HookApiTest,c','_pp_c;HookApiTest,c','HookApiTest,_d','_pp_d;HookApiTest,_d','HookApiTest,_e,_f','_pp_f;HookApiTest,_e,_f','HookApiTest,_g','_pp_o;HookApiTest,_g','HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_d;HookApiTest','_pp_f;HookApiTest','_pp_o;HookApiTest']);({_a:$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],_b:$hook$.global(__hook__,_c_[2],'b','var')[_c_[3]]=$hook$.global(__hook__,_c_[2],'a','get')[_c_[4]],c:$hook$.global(__hook__,_c_[5],'c','var')[_c_[6]],_d:[$hook$.global(__hook__,_c_[7],'d','var')[_c_[8]]],_e:{_f:$hook$.global(__hook__,_c_[9],'f','var')[_c_[10]]},_g:$hook$.global(__hook__,_c_[11],'o','var')[_c_[12]]}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[13]));[$hook$.global(__hook__,_c_[13],'a','get')[_c_[14]],$hook$.global(__hook__,_c_[13],'b','get')[_c_[15]],$hook$.global(__hook__,_c_[13],'c','get')[_c_[16]],$hook$.global(__hook__,_c_[13],'d','get')[_c_[17]],$hook$.global(__hook__,_c_[13],'f','get')[_c_[18]],$hook$.global(__hook__,_c_[13],'o','get')[_c_[19]]];",
            "name": "ObjectPattern  var { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o];"
          },
          {
            "code": "{ let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a,b,c,d,f,o;({_a:a,_b:b=a,c,_d:[d],_e:{_f:f},_g:o}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[0]));[a,b,c,d,f,o];}",
            "name": "ObjectPattern  { let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; }"
          },
          {
            "code": "{ with ({}) { let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let a,b,c,d,f,o;({_a:a,_b:b=a,c:c,_d:[d],_e:{_f:f},_g:o}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[0]));[a,b,c,d,f,o];}}",
            "name": "ObjectPattern  { with ({}) { let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; } }"
          },
          {
            "code": "{ let a,b,c,d,f,o; with ({}) { ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,_a','HookApiTest,_b','HookApiTest,c','HookApiTest,_d','HookApiTest,_e,_f','HookApiTest,_g','HookApiTest']);{let a,b,c,d,f,o;with($hook$.with({},{a:true,b:true,c:true,d:true,f:true,o:true})){({_a:__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['='],_b:__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],_c_[1],false)['=']=__hook__('w.',__with__,['a',()=>a],_c_[1],false),c:__hook__('w.=',__with__,['c',{set ['='](v){c=v;},get ['='](){return c;}}],_c_[2],false)['='],_d:[__hook__('w.=',__with__,['d',{set ['='](v){d=v;},get ['='](){return d;}}],_c_[3],false)['=']],_e:{_f:__hook__('w.=',__with__,['f',{set ['='](v){f=v;},get ['='](){return f;}}],_c_[4],false)['=']},_g:__hook__('w.=',__with__,['o',{set ['='](v){o=v;},get ['='](){return o;}}],_c_[5],false)['=']}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[6]));[__hook__('w.',__with__,['a',()=>a],_c_[6],false),__hook__('w.',__with__,['b',()=>b],_c_[6],false),__hook__('w.',__with__,['c',()=>c],_c_[6],false),__hook__('w.',__with__,['d',()=>d],_c_[6],false),__hook__('w.',__with__,['f',()=>f],_c_[6],false),__hook__('w.',__with__,['o',()=>o],_c_[6],false)];}}",
            "name": "ObjectPattern  { let a,b,c,d,f,o; with ({}) { ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; } }"
          },
          {
            "code": "var a,b,c,d,f,o;({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest','_pp_d;HookApiTest','_pp_f;HookApiTest','_pp_o;HookApiTest','HookApiTest,_a','_pp_a;HookApiTest,_a','HookApiTest,_b','_pp_b;HookApiTest,_b','_pp_a;HookApiTest,_b','HookApiTest,c','_pp_c;HookApiTest,c','HookApiTest,_d','_pp_d;HookApiTest,_d','HookApiTest,_e,_f','_pp_f;HookApiTest,_e,_f','HookApiTest,_g','_pp_o;HookApiTest,_g']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','var')[_c_[4]],$hook$.global(__hook__,_c_[0],'f','var')[_c_[5]],$hook$.global(__hook__,_c_[0],'o','var')[_c_[6]];({_a:$hook$.global(__hook__,_c_[7],'a','set')[_c_[8]],_b:$hook$.global(__hook__,_c_[9],'b','set')[_c_[10]]=$hook$.global(__hook__,_c_[9],'a','get')[_c_[11]],c:$hook$.global(__hook__,_c_[12],'c','set')[_c_[13]],_d:[$hook$.global(__hook__,_c_[14],'d','set')[_c_[15]]],_e:{_f:$hook$.global(__hook__,_c_[16],'f','set')[_c_[17]]},_g:$hook$.global(__hook__,_c_[18],'o','set')[_c_[19]]}=__hook__('*',{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6},[],_c_[0]));[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]],$hook$.global(__hook__,_c_[0],'d','get')[_c_[4]],$hook$.global(__hook__,_c_[0],'f','get')[_c_[5]],$hook$.global(__hook__,_c_[0],'o','get')[_c_[6]]];",
            "name": "ObjectPattern  var a,b,c,d,f,o;({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o];"
          },
          {
            "code": "{ let result = 0; for (var {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','HookApiTest,i','_pp_i;HookApiTest,i','HookApiTest,j','_pp_j;HookApiTest,j','_pp_i;HookApiTest','_pp_j;HookApiTest']);{let result=0;for({i:$hook$.global(__hook__,_c_[1],'i','var')[_c_[2]],j:$hook$.global(__hook__,_c_[3],'j','var')[_c_[4]]}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[5]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[6]];}result;}",
            "name": "ObjectPattern  { let result = 0; for (var {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; for (let {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;for(let {i,j}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=i+j;}result;}",
            "name": "ObjectPattern  { let result = 0; for (let {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; var i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_i;HookApiTest','_pp_j;HookApiTest','HookApiTest,i','_pp_i;HookApiTest,i','HookApiTest,j','_pp_j;HookApiTest,j']);{let result=0;$hook$.global(__hook__,_c_[0],'i','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'j','var')[_c_[2]];for({i:$hook$.global(__hook__,_c_[3],'i','set')[_c_[4]],j:$hook$.global(__hook__,_c_[5],'j','set')[_c_[6]]}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=$hook$.global(__hook__,_c_[0],'i','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'j','get')[_c_[2]];}result;}",
            "name": "ObjectPattern  { let result = 0; var i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; let i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let result=0;let i,j;for({i,j}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=i+j;}result;}",
            "name": "ObjectPattern  { let result = 0; let i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }"
          },
          {
            "code": "{ let result = 0; for (var {...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o;HookApiTest']);{let result=0;for({...($hook$.global(__hook__,_c_[0],'o','var'))[_c_[1]]}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=__hook__('.',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],['i'],_c_[0])+__hook__('.',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],['j'],_c_[0]);}result;}",
            "name": "ObjectPattern  { let result = 0; for (var {...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }"
          },
          {
            "code": "{ let result = 0; var o; for ({...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o;HookApiTest']);{let result=0;$hook$.global(__hook__,_c_[0],'o','var')[_c_[1]];for({...($hook$.global(__hook__,_c_[0],'o','set'))[_c_[1]]}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],_c_[0])){result+=__hook__('.',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],['i'],_c_[0])+__hook__('.',$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]],['j'],_c_[0]);}result;}",
            "name": "ObjectPattern  { let result = 0; var o; for ({...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }"
          }
        ],
        "Property": [
          {
            "code": "{ let a = 1, b = 2; ({ m(p) { return p; }, [a]: b }); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,m']);{let a=1,b=2;({m(p){return __hook__(p=>{return p;},null,arguments,_c_[0]);},[a]:b});}",
            "name": "Property  { let a = 1, b = 2; ({ m(p) { return p; }, [a]: b }); }"
          },
          {
            "code": "{ with ({a:1,b:2}) { ({ m(p) { return p; }, [a]: b }); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,m','HookApiTest,a']);{with($hook$.with({a:1,b:2},{})){({m(p){return __hook__(p=>{return p;},null,arguments,_c_[0]);},[__hook__('w.',__with__,['a',()=>a],_c_[1],false)]:__hook__('w.',__with__,['b',()=>b],_c_[1],false)});}}",
            "name": "Property  { with ({a:1,b:2}) { ({ m(p) { return p; }, [a]: b }); } }"
          },
          {
            "code": "var a = 1, b = 2; ({ m(p) { return p; }, [a]: b });",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','HookApiTest,m','HookApiTest,a','_pp_a;HookApiTest,a','_pp_b;HookApiTest,a']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2;({m(p){return __hook__(p=>{return p;},null,arguments,_c_[3]);},[$hook$.global(__hook__,_c_[4],'a','get')[_c_[5]]]:$hook$.global(__hook__,_c_[4],'b','get')[_c_[6]]});",
            "name": "Property  var a = 1, b = 2; ({ m(p) { return p; }, [a]: b });"
          },
          {
            "code": "{ let a = 1; ({ a }); }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=1;({a});}",
            "name": "Property  { let a = 1; ({ a }); }"
          },
          {
            "code": "var a = 1; ({ a });",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','HookApiTest,a','_pp_a;HookApiTest,a']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1;({a:$hook$.global(__hook__,_c_[2],'a','get')[_c_[3]]});",
            "name": "Property  var a = 1; ({ a });"
          },
          {
            "code": "{ with ({a:1}) { ({ a }); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a']);{with($hook$.with({a:1},{})){({a:__hook__('w.',__with__,['a',()=>a],_c_[0],false)});}}",
            "name": "Property  { with ({a:1}) { ({ a }); } }"
          },
          {
            "code": "{ let a = 1, b = 2; ({a,b} = {a,b}); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=1,b=2;({a,b}=__hook__('*',{a,b},[],_c_[0]));}",
            "name": "Property  { let a = 1, b = 2; ({a,b} = {a,b}); }"
          },
          {
            "code": "{ with ({a:1,b:2}) { ({a,b} = {a,b}); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a','HookApiTest,b','HookApiTest']);{with($hook$.with({a:1,b:2},{})){({a:__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],_c_[0],false)['='],b:__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],_c_[1],false)['=']}=__hook__('*',{a:__hook__('w.',__with__,['a',()=>a],_c_[0],false),b:__hook__('w.',__with__,['b',()=>b],_c_[1],false)},[],_c_[2]));}}",
            "name": "Property  { with ({a:1,b:2}) { ({a,b} = {a,b}); } }"
          },
          {
            "code": "var a = 1, b = 2; ({a,b} = {a,b});",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','HookApiTest,a','_pp_a;HookApiTest,a','HookApiTest,b','_pp_b;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2;({a:$hook$.global(__hook__,_c_[3],'a','set')[_c_[4]],b:$hook$.global(__hook__,_c_[5],'b','set')[_c_[6]]}=__hook__('*',{a:$hook$.global(__hook__,_c_[3],'a','get')[_c_[4]],b:$hook$.global(__hook__,_c_[5],'b','get')[_c_[6]]},[],_c_[0]));",
            "name": "Property  var a = 1, b = 2; ({a,b} = {a,b});"
          },
          {
            "code": "{ let {a,b} = {a: 1, b: 2}; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let {a,b}=__hook__('*',{a:1,b:2},[],_c_[0]);}",
            "name": "Property  { let {a,b} = {a: 1, b: 2}; }"
          },
          {
            "code": "{ with ({}) { let {a,b} = {a: 1, b: 2}; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({},{})){let {a,b}=__hook__('*',{a:1,b:2},[],_c_[0]);}}",
            "name": "Property  { with ({}) { let {a,b} = {a: 1, b: 2}; } }"
          },
          {
            "code": "var {a,b} = {a: 1, b: 2}; [a,b];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a','_pp_a;HookApiTest,a','HookApiTest,b','_pp_b;HookApiTest,b','HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);({a:$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],b:$hook$.global(__hook__,_c_[2],'b','var')[_c_[3]]}=__hook__('*',{a:1,b:2},[],_c_[4]));[$hook$.global(__hook__,_c_[4],'a','get')[_c_[5]],$hook$.global(__hook__,_c_[4],'b','get')[_c_[6]]];",
            "name": "Property  var {a,b} = {a: 1, b: 2}; [a,b];"
          }
        ],
        "UnaryExpression": [
          {
            "code": "with({a:2}){-a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){-__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){-a;}"
          },
          {
            "code": "with({a:2}){+a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){+__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){+a;}"
          },
          {
            "code": "with({a:2}){!a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){!__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){!a;}"
          },
          {
            "code": "with({a:2}){~a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){~__hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){~a;}"
          },
          {
            "code": "with({a:2}){typeof a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('wtypeof',__with__,['a',()=>typeof a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){typeof a;}"
          },
          {
            "code": "with({a:2}){delete a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('wdelete',__with__,['a',()=>delete a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){delete a;}"
          },
          {
            "code": "with({a:2}){void a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){void __hook__('w.',__with__,['a',()=>a],_c_[0],false);}",
            "name": "UnaryExpression  with({a:2}){void a;}"
          },
          {
            "code": "{ let o = { p: 1, q: 2 }; delete o.p; delete o['q']; o; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let o={p:1,q:2};__hook__('delete',o,['p'],_c_[0]);__hook__('delete',o,['q'],_c_[0]);o;}",
            "name": "UnaryExpression  { let o = { p: 1, q: 2 }; delete o.p; delete o['q']; o; }"
          },
          {
            "code": "{ with ({o:{ p: 1, q: 2 }}) { delete o.p; o; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({o:{p:1,q:2}},{})){__hook__('delete',__hook__('w.',__with__,['o',()=>o],_c_[0],false),['p'],_c_[0]);__hook__('w.',__with__,['o',()=>o],_c_[0],false);}}",
            "name": "UnaryExpression  { with ({o:{ p: 1, q: 2 }}) { delete o.p; o; } }"
          },
          {
            "code": "var o = { p: 1, q: 2 }; delete o.p; o;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_o;HookApiTest']);$hook$.global(__hook__,_c_[0],'o','var')[_c_[1]]={p:1,q:2};__hook__('delete',o,['p'],_c_[0]);$hook$.global(__hook__,_c_[0],'o','get')[_c_[1]];",
            "name": "UnaryExpression  var o = { p: 1, q: 2 }; delete o.p; o;"
          },
          {
            "code": "var oo = 1; !oo; typeof oo; delete oo; true;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_oo;HookApiTest']);$hook$.global(__hook__,_c_[0],'oo','var')[_c_[1]]=1;!$hook$.global(__hook__,_c_[0],'oo','get')[_c_[1]];typeof $hook$.global(__hook__,_c_[0],'oo','typeof')[_c_[1]];$hook$.global(__hook__,_c_[0],'oo','delete');true;",
            "name": "UnaryExpression  var oo = 1; !oo; typeof oo; delete oo; true;"
          },
          {
            "code": "typeof inexistentGlobalVariable;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_inexistentGlobalVariable;HookApiTest']);typeof $hook$.global(__hook__,_c_[0],'inexistentGlobalVariable','typeof')[_c_[1]];",
            "name": "UnaryExpression  typeof inexistentGlobalVariable;"
          }
        ],
        "UpdateExpression": [
          {
            "code": "{ let a = 2, b = { p: 3 }; a++; b.p++; b['p']++; [a,b]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=2,b={p:3};a++;__hook__('p++',b,['p'],_c_[0]);__hook__('p++',b,['p'],_c_[0]);[a,b];}",
            "name": "UpdateExpression  { let a = 2, b = { p: 3 }; a++; b.p++; b['p']++; [a,b]; }"
          },
          {
            "code": "{ let a = 2, b = { p: 3 }; --a; --b.p; --b['p']; [a,b]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=2,b={p:3};--a;__hook__('--p',b,['p'],_c_[0]);__hook__('--p',b,['p'],_c_[0]);[a,b];}",
            "name": "UpdateExpression  { let a = 2, b = { p: 3 }; --a; --b.p; --b['p']; [a,b]; }"
          },
          {
            "code": "{ with ({a:2,b:{p:3}}) { a++; b.p++; [a,b]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:2,b:{p:3}},{})){__hook__('w++',__with__,['a',()=>a++],_c_[0],false);__hook__('p++',__hook__('w.',__with__,['b',()=>b],_c_[0],false),['p'],_c_[0]);[__hook__('w.',__with__,['a',()=>a],_c_[0],false),__hook__('w.',__with__,['b',()=>b],_c_[0],false)];}}",
            "name": "UpdateExpression  { with ({a:2,b:{p:3}}) { a++; b.p++; [a,b]; } }"
          },
          {
            "code": "{ with ({a:2,b:{p:3}}) { --a; --b.p; [a,b]; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:2,b:{p:3}},{})){__hook__('--w',__with__,['a',()=>--a],_c_[0],false);__hook__('--p',__hook__('w.',__with__,['b',()=>b],_c_[0],false),['p'],_c_[0]);[__hook__('w.',__with__,['a',()=>a],_c_[0],false),__hook__('w.',__with__,['b',()=>b],_c_[0],false)];}}",
            "name": "UpdateExpression  { with ({a:2,b:{p:3}}) { --a; --b.p; [a,b]; } }"
          },
          {
            "code": "var a = 2, b = { p: 3 }; a++; b.p++; [a,b];",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=2,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]={p:3};$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]++;__hook__('p++',b,['p'],_c_[0]);[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]];",
            "name": "UpdateExpression  var a = 2, b = { p: 3 }; a++; b.p++; [a,b];"
          },
          {
            "code": "with({a:2}){a++;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('w++',__with__,['a',()=>a++],_c_[0],false);}",
            "name": "UpdateExpression  with({a:2}){a++;}"
          },
          {
            "code": "with({a:2}){a--;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('w--',__with__,['a',()=>a--],_c_[0],false);}",
            "name": "UpdateExpression  with({a:2}){a--;}"
          },
          {
            "code": "with({a:2}){++a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('++w',__with__,['a',()=>++a],_c_[0],false);}",
            "name": "UpdateExpression  with({a:2}){++a;}"
          },
          {
            "code": "with({a:2}){--a;}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2},{})){__hook__('--w',__with__,['a',()=>--a],_c_[0],false);}",
            "name": "UpdateExpression  with({a:2}){--a;}"
          },
          {
            "code": "{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super['m']; } } c2.m = 2; c2.m2; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2,get m2','HookApiTest']);{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[0]);},null,arguments,_c_[0]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[1]);},null,arguments,_c_[1]);}}class c2 extends c{static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],_c_[2]);},null,arguments,_c_[2]);}}__hook__('=',c2,['m',2],_c_[3]);__hook__('.',c2,['m2'],_c_[3]);}",
            "name": "UpdateExpression  { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super['m']; } } c2.m = 2; c2.m2; }"
          },
          {
            "code": "{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return super['m']++; } } c2.m = 2; c2.m2; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2,get m2','HookApiTest']);{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[0]);},null,arguments,_c_[0]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[1]);},null,arguments,_c_[1]);}}class c2 extends c{static get m2(){return __hook__(()=>{return __hook__('s++',this,['m',p=>super[p]++],_c_[2]);},null,arguments,_c_[2]);}}__hook__('=',c2,['m',2],_c_[3]);__hook__('.',c2,['m2'],_c_[3]);}",
            "name": "UpdateExpression  { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return super['m']++; } } c2.m = 2; c2.m2; }"
          },
          {
            "code": "{ with ({}) { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2,get m2','HookApiTest']);{with($hook$.with({},{})){class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[0]);},null,arguments,_c_[0]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[1]);},null,arguments,_c_[1]);}}class c2 extends c{static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],_c_[2]);},null,arguments,_c_[2]);}}__hook__('=',c2,['m',2],_c_[3]);__hook__('.',c2,['m2'],_c_[3]);}}",
            "name": "UpdateExpression  { with ({}) { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2; } }"
          },
          {
            "code": "{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } with ({}) { class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2','HookApiTest,c2,get m2','HookApiTest']);{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[0]);},null,arguments,_c_[0]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[1]);},null,arguments,_c_[1]);}}with($hook$.with({},{c:true})){class c2 extends __hook__('w.',__with__,['c',()=>c],_c_[2],false){static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],_c_[3]);},null,arguments,_c_[3]);}}__hook__('=',c2,['m',2],_c_[4]);__hook__('.',c2,['m2'],_c_[4]);}}",
            "name": "UpdateExpression  { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } with ({}) { class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2; } }"
          },
          {
            "code": "class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c','_pp_c;HookApiTest,c','HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2','_pp_c2;HookApiTest,c2','_pp_c;HookApiTest,c2','HookApiTest,c2,get m2','HookApiTest','_pp_c2;HookApiTest']);$hook$.global(__hook__,_c_[0],'c','class')[_c_[1]]=class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[2]);},null,arguments,_c_[2]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[3]);},null,arguments,_c_[3]);}};$hook$.global(__hook__,_c_[4],'c2','class')[_c_[5]]=class c2 extends $hook$.global(__hook__,_c_[4],'c','get')[_c_[6]]{static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],_c_[7]);},null,arguments,_c_[7]);}};__hook__('=',c2,['m',2],_c_[8]);__hook__('.',$hook$.global(__hook__,_c_[8],'c2','get')[_c_[9]],['m2'],_c_[8]);",
            "eval": () => true,
            "name": "UpdateExpression  class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2;"
          },
          {
            "code": "{ function f() { 'use strict'; let o = {a:1,b:2}; o.a++; --o.a; delete o.b; return o; } f() }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(){'use strict';return __hook__(()=>{let o={a:1,b:2};__hook__('#p++',o,['a'],_c_[0]);__hook__('#--p',o,['a'],_c_[0]);__hook__('#delete',o,['b'],_c_[0]);return o;},null,arguments,_c_[0]);}__hook__(f,null,[],_c_[1],0);}",
            "name": "UpdateExpression  { function f() { 'use strict'; let o = {a:1,b:2}; o.a++; --o.a; delete o.b; return o; } f() }"
          }
        ],
        "BinaryExpression": [
          {
            "code": "{ let a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=1,b=2;a+b;a-b;a/b;a*b;a%b;a|b;a^b;a&b;a==b;a!=b;a===b;a!==b;a<b;a<=b;a>b;a>=b;a<<b;a>>b;a>>>b;}",
            "name": "BinaryExpression  { let a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }"
          },
          {
            "code": "with ({a:1,b:2}) { a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:1,b:2},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false)+__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)-__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)/__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)*__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)%__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)|__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)^__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)&__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)==__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)!=__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)===__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)!==__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)<__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)<=__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)>__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)>=__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)<<__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)>>__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)>>>__hook__('w.',__with__,['b',()=>b],_c_[0],false);}",
            "name": "BinaryExpression  with ({a:1,b:2}) { a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }"
          },
          {
            "code": "var a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2;$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]+$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]-$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]/$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]*$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]%$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]|$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]^$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]&$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]==$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]!=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]===$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]!==$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]<$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]<=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]>$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]>=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]<<$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]>>$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]>>>$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "BinaryExpression  var a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b;"
          },
          {
            "code": "{ let a = 2, b = 3; a ** b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=2,b=3;a**b;}",
            "name": "BinaryExpression  { let a = 2, b = 3; a ** b; }"
          },
          {
            "code": "{ with ({a:2,b:3}) { a ** b; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:2,b:3},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false)**__hook__('w.',__with__,['b',()=>b],_c_[0],false);}}",
            "name": "BinaryExpression  { with ({a:2,b:3}) { a ** b; } }"
          },
          {
            "code": "var a = 2, b = 3; a ** b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=2,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=3;$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]**$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "BinaryExpression  var a = 2, b = 3; a ** b;"
          },
          {
            "code": "{ let a = 'a', b = { a: 1 }; a in b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a='a',b={a:1};__hook__('in',b,[a],_c_[0]);}",
            "name": "BinaryExpression  { let a = 'a', b = { a: 1 }; a in b; }"
          },
          {
            "code": "with ({a:'a', b:{ a: 1 }}) { a in b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:'a',b:{a:1}},{})){__hook__('in',__hook__('w.',__with__,['b',()=>b],_c_[0],false),[__hook__('w.',__with__,['a',()=>a],_c_[0],false)],_c_[0]);}",
            "name": "BinaryExpression  with ({a:'a', b:{ a: 1 }}) { a in b; }"
          },
          {
            "code": "var a = 'a', b = { a: 1 }; a in b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]='a',$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]={a:1};__hook__('in',$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]],_c_[0]);",
            "name": "BinaryExpression  var a = 'a', b = { a: 1 }; a in b;"
          },
          {
            "code": "'use strict'; var a = 'a', b = { a: 1 }; a in b;",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_a;HookApiTest','S_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','#var')[_c_[1]]='a',$hook$.global(__hook__,_c_[0],'b','#var')[_c_[2]]={a:1};__hook__('#in',$hook$.global(__hook__,_c_[0],'b','#get')[_c_[2]],[$hook$.global(__hook__,_c_[0],'a','#get')[_c_[1]]],_c_[0]);",
            "name": "BinaryExpression  'use strict'; var a = 'a', b = { a: 1 }; a in b;"
          },
          {
            "code": "{ let a = {}; a instanceof Object; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_Object;HookApiTest']);{let a={};a instanceof $hook$.global(__hook__,_c_[0],'Object','get')[_c_[1]];}",
            "name": "BinaryExpression  { let a = {}; a instanceof Object; }"
          },
          {
            "code": "with ({a:{}}) { a instanceof Object; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:{}},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false)instanceof __hook__('w.',__with__,['Object',()=>Object],_c_[0],false);}",
            "name": "BinaryExpression  with ({a:{}}) { a instanceof Object; }"
          },
          {
            "code": "var a = {}; a instanceof Object;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_Object;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]={};$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]instanceof $hook$.global(__hook__,_c_[0],'Object','get')[_c_[2]];",
            "name": "BinaryExpression  var a = {}; a instanceof Object;"
          }
        ],
        "AssignmentExpression": [
          {
            "code": "{ let a, b = 1; a = b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a,b=1;a=b;}",
            "name": "AssignmentExpression  { let a, b = 1; a = b; }"
          },
          {
            "code": "with ({a:2,b:1}) { a = b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2,b:1},{})){__hook__('w=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a=v],_c_[0],false);}",
            "name": "AssignmentExpression  with ({a:2,b:1}) { a = b; }"
          },
          {
            "code": "var a, b = 1; a = b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=1;$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "AssignmentExpression  var a, b = 1; a = b;"
          },
          {
            "code": "{ let a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a,b=1;a+=b;a-=b;a*=b;a/=b;a%=b;a<<=b;a>>=b;a>>>=b;a|=b;a^=b;a&=b;}",
            "name": "AssignmentExpression  { let a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }"
          },
          {
            "code": "with ({a:2,b:1}) { a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:2,b:1},{})){__hook__('w+=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a+=v],_c_[0],false);__hook__('w-=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a-=v],_c_[0],false);__hook__('w*=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a*=v],_c_[0],false);__hook__('w/=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a/=v],_c_[0],false);__hook__('w%=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a%=v],_c_[0],false);__hook__('w<<=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a<<=v],_c_[0],false);__hook__('w>>=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a>>=v],_c_[0],false);__hook__('w>>>=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a>>>=v],_c_[0],false);__hook__('w|=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a|=v],_c_[0],false);__hook__('w^=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a^=v],_c_[0],false);__hook__('w&=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a&=v],_c_[0],false);}",
            "name": "AssignmentExpression  with ({a:2,b:1}) { a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }"
          },
          {
            "code": "var a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=1;$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]+=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]-=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]*=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]/=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]%=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]<<=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]>>=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]>>>=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]|=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]^=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]&=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "AssignmentExpression  var a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b;"
          },
          {
            "code": "{ let a = 2, b = 3; a **= b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=2,b=3;a**=b;}",
            "name": "AssignmentExpression  { let a = 2, b = 3; a **= b; }"
          },
          {
            "code": "{ with ({a:2,b:3}) { a **= b; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{with($hook$.with({a:2,b:3},{})){__hook__('w**=',__with__,['a',__hook__('w.',__with__,['b',()=>b],_c_[0],false),v=>a**=v],_c_[0],false);}}",
            "name": "AssignmentExpression  { with ({a:2,b:3}) { a **= b; } }"
          },
          {
            "code": "var a = 2, b = 3; a **= b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=2,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=3;$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]**=$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "AssignmentExpression  var a = 2, b = 3; a **= b;"
          },
          {
            "code": "{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { super['m'] = super.m; return super.m = super['m']; } } c2.m = 2; c2.m2; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,get m','HookApiTest,c,set m','HookApiTest,c2,get m2','HookApiTest']);{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],_c_[0]);},null,arguments,_c_[0]);}static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],_c_[1]);},null,arguments,_c_[1]);}}class c2 extends c{static get m2(){return __hook__(()=>{__hook__('s=',this,['m',__hook__('s.',this,['m',p=>super[p]],_c_[2]),(p,v)=>super[p]=v],_c_[2]);return __hook__('s=',this,['m',__hook__('s.',this,['m',p=>super[p]],_c_[2]),(p,v)=>super[p]=v],_c_[2]);},null,arguments,_c_[2]);}}__hook__('=',c2,['m',2],_c_[3]);__hook__('.',c2,['m2'],_c_[3]);}",
            "name": "AssignmentExpression  { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { super['m'] = super.m; return super.m = super['m']; } } c2.m = 2; c2.m2; }"
          },
          {
            "name": "AssignmentExpression implicit declaration delete aaa; aaa = 2; { let b = aaa; delete b; delete aaa; b; }",
            "code": "delete aaa; aaa = 2; { let b = aaa; delete b; delete aaa; b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_aaa;HookApiTest','HookApiTest,b','_pp_aaa;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'aaa','delete');$hook$.global(__hook__,_c_[0],'aaa','set')[_c_[1]]=2;{let b=$hook$.global(__hook__,_c_[2],'aaa','get')[_c_[3]];delete b;$hook$.global(__hook__,_c_[0],'aaa','delete');b;}"
          },
          {
            "code": "'use strict'; try { __inexistentGlobalVariable = 1; } catch (e) { e.name; }",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp___inexistentGlobalVariable;HookApiTest']);try{$hook$.global(__hook__,_c_[0],'__inexistentGlobalVariable','#set')[_c_[1]]=1;}catch(e){__hook__('#.',e,['name'],_c_[0]);}",
            "name": "AssignmentExpression  'use strict'; try { __inexistentGlobalVariable = 1; } catch (e) { e.name; }"
          }
        ],
        "LogicalExpression": [
          {
            "code": "{ let a = false, b = true; a && b; a || b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=false,b=true;a&&b;a||b;}",
            "name": "LogicalExpression  { let a = false, b = true; a && b; a || b; }"
          },
          {
            "code": "with ({a:false,b:true}) { a && b; a || b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:false,b:true},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false)&&__hook__('w.',__with__,['b',()=>b],_c_[0],false);__hook__('w.',__with__,['a',()=>a],_c_[0],false)||__hook__('w.',__with__,['b',()=>b],_c_[0],false);}",
            "name": "LogicalExpression  with ({a:false,b:true}) { a && b; a || b; }"
          },
          {
            "code": "var a = false, b = true; a && b; a || b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=false,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=true;$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]&&$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]||$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "LogicalExpression  var a = false, b = true; a && b; a || b;"
          }
        ],
        "MemberExpression": [
          {
            "code": "{ let a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a={b:1},b='b';__hook__('.',a,['b'],_c_[0]);__hook__('.',a,[b],_c_[0]);__hook__('=',a,['b',2],_c_[0]);__hook__('=',a,[b,2],_c_[0]);}",
            "name": "MemberExpression  { let a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2; }"
          },
          {
            "code": "with ({a:{b:1},b:'b'}) { a.b; a[b]; a.b = 2; a[b] = 2; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:{b:1},b:'b'},{})){__hook__('.',__hook__('w.',__with__,['a',()=>a],_c_[0],false),['b'],_c_[0]);__hook__('.',__hook__('w.',__with__,['a',()=>a],_c_[0],false),[__hook__('w.',__with__,['b',()=>b],_c_[0],false)],_c_[0]);__hook__('=',a,['b',2],_c_[0]);__hook__('=',a,[__hook__('w.',__with__,['b',()=>b],_c_[0],false),2],_c_[0]);}",
            "name": "MemberExpression  with ({a:{b:1},b:'b'}) { a.b; a[b]; a.b = 2; a[b] = 2; }"
          },
          {
            "code": "var a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]={b:1},$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]='b';__hook__('.',$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],['b'],_c_[0]);__hook__('.',$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],[$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]],_c_[0]);__hook__('=',a,['b',2],_c_[0]);__hook__('=',a,[$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]],2],_c_[0]);",
            "name": "MemberExpression  var a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2;"
          },
          {
            "code": "{ class b { constructor(p) { this._p = p; } get p() { return this._p; }} class c extends b { get p() { let _p = 'p'; return super[_p] + super['p'] + super.p; } } (new c(1)).p; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,b,constructor','HookApiTest,b,get p','HookApiTest,c,get p','HookApiTest']);{class b{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[0]);},null,arguments,_c_[0]);}get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[1]);},null,arguments,_c_[1]);}}class c extends b{get p(){return __hook__(()=>{let _p='p';return __hook__('s.',this,[_p,p=>super[p]],_c_[2])+__hook__('s.',this,['p',p=>super[p]],_c_[2])+__hook__('s.',this,['p',p=>super[p]],_c_[2]);},null,arguments,_c_[2]);}}__hook__('.',__hook__(c,null,[1],_c_[3],true),['p'],_c_[3]);}",
            "name": "MemberExpression  { class b { constructor(p) { this._p = p; } get p() { return this._p; }} class c extends b { get p() { let _p = 'p'; return super[_p] + super['p'] + super.p; } } (new c(1)).p; }"
          },
          {
            "code": "{ class a { static m() { [this._name] = [this.name]; return this._name; } } a.m(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,static m','HookApiTest']);{class a{static m(){return __hook__(()=>{[__hook__('#.=',this,['_name'],_c_[0])['=']]=__hook__('#*',[__hook__('#.',this,['name'],_c_[0])],[],_c_[0]);return __hook__('#.',this,['_name'],_c_[0]);},null,arguments,_c_[0]);}}__hook__('()',a,['m',[]],_c_[1]);}",
            "name": "MemberExpression  { class a { static m() { [this._name] = [this.name]; return this._name; } } a.m(); }"
          }
        ],
        "ConditionalExpression": [
          {
            "code": "{ let a = 1, b = 2, c = 3; a ? b : c; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=1,b=2,c=3;a?b:c;}",
            "name": "ConditionalExpression  { let a = 1, b = 2, c = 3; a ? b : c; }"
          },
          {
            "code": "with ({a:1,b:2,c:3}) { a ? b : c; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:1,b:2,c:3},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false)?__hook__('w.',__with__,['b',()=>b],_c_[0],false):__hook__('w.',__with__,['c',()=>c],_c_[0],false);}",
            "name": "ConditionalExpression  with ({a:1,b:2,c:3}) { a ? b : c; }"
          },
          {
            "code": "var a = 1, b = 2, c = 3; a ? b : c;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','_pp_c;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=2,$hook$.global(__hook__,_c_[0],'c','var')[_c_[3]]=3;$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]?$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]]:$hook$.global(__hook__,_c_[0],'c','get')[_c_[3]];",
            "name": "ConditionalExpression  var a = 1, b = 2, c = 3; a ? b : c;"
          }
        ],
        "CallExpression": [
          {
            "code": "{ let a = 1, f = function (a) { return a + 1; }; f(a); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{let a=1,f=function(a){return __hook__(a=>{return a+1;},null,arguments,_c_[0]);};__hook__(f,null,[a],_c_[1],0);}",
            "name": "CallExpression  { let a = 1, f = function (a) { return a + 1; }; f(a); }"
          },
          {
            "code": "{ function f(a) { return a + 1; } with ({a:1}) { f(a); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(a){return __hook__(a=>{return a+1;},null,arguments,_c_[0]);}with($hook$.with({a:1},{f:true})){__hook__('w()',__with__,['f',[__hook__('w.',__with__,['a',()=>a],_c_[1],false)],(...args)=>f(...args)],_c_[1],false);}}",
            "name": "CallExpression  { function f(a) { return a + 1; } with ({a:1}) { f(a); } }"
          },
          {
            "code": "var a = 1, f = function (a) { return a + 1; }; f(a);",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_f;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=1,$hook$.global(__hook__,_c_[0],'f','var')[_c_[2]]=function(a){return __hook__(a=>{return a+1;},null,arguments,_c_[0]);};__hook__($hook$.global(__hook__,_c_[0],'f','get')[_c_[2]],null,[$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]]],_c_[0],0);",
            "name": "CallExpression  var a = 1, f = function (a) { return a + 1; }; f(a);"
          },
          {
            "code": "{ with ({a:1,f:function f(a) { return a + 1; }}) { f(a); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f,f','HookApiTest']);{with($hook$.with({a:1,f:function f(a){return __hook__(a=>{return a+1;},null,arguments,_c_[0]);}},{})){__hook__('w()',__with__,['f',[__hook__('w.',__with__,['a',()=>a],_c_[1],false)],(...args)=>f(...args)],_c_[1],false);}}",
            "name": "CallExpression  { with ({a:1,f:function f(a) { return a + 1; }}) { f(a); } }"
          },
          {
            "code": "{ class b { constructor(p) { this.p = p; } } class c extends b { constructor(p) { super(p); } } (new c(1)).p; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,b,constructor','HookApiTest,c,constructor','HookApiTest']);{class b{constructor(p){return __hook__(p=>{__hook__('#=',this,['p',p],_c_[0]);},null,arguments,_c_[0]);}}class c extends b{constructor(p){return __hook__(p=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,p],_c_[1],'');},null,arguments,_c_[1]);}}__hook__('.',__hook__(c,null,[1],_c_[2],true),['p'],_c_[2]);}",
            "name": "CallExpression  { class b { constructor(p) { this.p = p; } } class c extends b { constructor(p) { super(p); } } (new c(1)).p; }"
          },
          {
            "code": "{ class b { m(p) { return p + 1; } } class c extends b { m(p) { return super.m(p) + super['m'](p); } } (new c()).m(1); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,b,m','HookApiTest,c,m','HookApiTest']);{class b{m(p){return __hook__(p=>{return p+1;},null,arguments,_c_[0]);}}class c extends b{m(p){return __hook__(p=>{return __hook__('s()',this,['m',[p],p=>super[p]],_c_[1])+__hook__('s()',this,['m',[p],p=>super[p]],_c_[1]);},null,arguments,_c_[1]);}}__hook__('()',__hook__(c,null,[],_c_[2],true),['m',[1]],_c_[2]);}",
            "name": "CallExpression  { class b { m(p) { return p + 1; } } class c extends b { m(p) { return super.m(p) + super['m'](p); } } (new c()).m(1); }"
          },
          {
            "code": "{ with ({}) { let o = { f: function f() { return 1; } }; o.f() + o['f'](); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,o,f,f','HookApiTest']);{with($hook$.with({},{})){let o={f:function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);}};__hook__('()',o,['f',[]],_c_[1])+__hook__('()',o,['f',[]],_c_[1]);}}",
            "name": "CallExpression  { with ({}) { let o = { f: function f() { return 1; } }; o.f() + o['f'](); } }"
          },
          {
            "code": "{ let o = { f: function f() { return 1; } }; with ({}) { o.f() + o['f'](); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,o,f,f','HookApiTest']);{let o={f:function f(){return __hook__(()=>{return 1;},null,arguments,_c_[0]);}};with($hook$.with({},{o:true})){__hook__('()',__hook__('w.',__with__,['o',()=>o],_c_[1],false),['f',[]],_c_[1])+__hook__('()',__hook__('w.',__with__,['o',()=>o],_c_[1],false),['f',[]],_c_[1]);}}",
            "name": "CallExpression  { let o = { f: function f() { return 1; } }; with ({}) { o.f() + o['f'](); } }"
          },
          {
            "code": "{ let a = 1; eval('1'); }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=1;$hook$.eval(Symbol.for('__hook__'),[['HookApiTest',{}]],'method',{a:true})('1',(script,eval)=>eval(script));}",
            "name": "CallExpression  { let a = 1; eval('1'); }"
          },
          {
            "code": "'use strict'; eval('1');",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,[]);$hook$.eval(Symbol.for('__hook__'),[['HookApiTest',{}]],'method',{$use_strict$:true})('1',(script,_eval)=>_eval(script));",
            "name": "CallExpression  'use strict'; eval('1');"
          },
          {
            "code": "var a; new Promise(resolve => { a = resolve; setTimeout('let resolve = a; a = null; resolve(1);', 100); });",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_Promise;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]];__hook__($hook$.global(__hook__,_c_[0],'Promise','get')[_c_[2]],null,[(...args)=>(__hook__(resolve=>{$hook$.global(__hook__,_c_[0],'a','set')[_c_[1]]=resolve;$hook$.setTimeout(Symbol.for('__hook__'),[['HookApiTest',{}]],'method')('let resolve = a; a = null; resolve(1);',100);},null,args,_c_[0]))],_c_[0],true);",
            "asynchronous": true,
            "name": "CallExpression  var a; new Promise(resolve => { a = resolve; setTimeout('let resolve = a; a = null; resolve(1);', 100); });"
          },
          {
            "code": "{ let f = Reflect.construct(Function, ['return (a,b) => a + b;'])(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Reflect;HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Reflect','get')[_c_[1]],['construct',[$hook$.global(__hook__,_c_[0],'Function','get')[_c_[2]],['return (a,b) => a + b;']]],_c_[0]),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[3],0);}",
            "name": "CallExpression  { let f = Reflect.construct(Function, ['return (a,b) => a + b;'])(); f(1,2); }"
          },
          {
            "code": "{ Reflect.construct(Function, [])(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_Reflect;HookApiTest','_pp_Function;HookApiTest']);{__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Reflect','get')[_c_[1]],['construct',[$hook$.global(__hook__,_c_[0],'Function','get')[_c_[2]],[]]],_c_[0]),null,[],_c_[0],0);}",
            "name": "CallExpression  { Reflect.construct(Function, [])(); }"
          },
          {
            "code": "{ class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'])(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F','_pp_Function;HookApiTest,F','HookApiTest,f','_pp_Reflect;HookApiTest,f','HookApiTest']);{class F extends $hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]]{}let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[2],'Reflect','get')[_c_[3]],['construct',[F,['return (a,b) => a + b;']]],_c_[2]),null,[],_c_[2],0);__hook__(f,null,[1,2],_c_[4],0);}",
            "name": "CallExpression  { class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'])(); f(1,2); }"
          },
          {
            "code": "{ function F() {} let f = Reflect.construct(Function, ['return (a,b) => a + b;'], F)(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F','HookApiTest,f','_pp_Reflect;HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{function F(){return __hook__(()=>{},null,arguments,_c_[0]);}let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[1],'Reflect','get')[_c_[2]],['construct',[$hook$.global(__hook__,_c_[1],'Function','get')[_c_[3]],['return (a,b) => a + b;'],F]],_c_[1]),null,[],_c_[1],0);__hook__(f,null,[1,2],_c_[4],0);}",
            "name": "CallExpression  { function F() {} let f = Reflect.construct(Function, ['return (a,b) => a + b;'], F)(); f(1,2); }"
          },
          {
            "code": "{ function F2() {} class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'], F2)(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F2','HookApiTest,F','_pp_Function;HookApiTest,F','HookApiTest,f','_pp_Reflect;HookApiTest,f','HookApiTest']);{function F2(){return __hook__(()=>{},null,arguments,_c_[0]);}class F extends $hook$.global(__hook__,_c_[1],'Function','get')[_c_[2]]{}let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[3],'Reflect','get')[_c_[4]],['construct',[F,['return (a,b) => a + b;'],F2]],_c_[3]),null,[],_c_[3],0);__hook__(f,null,[1,2],_c_[5],0);}",
            "name": "CallExpression  { function F2() {} class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'], F2)(); f(1,2); }"
          },
          {
            "code": "{ class F extends Function {} let f = new F('return (a,b) => a + b;')(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F','_pp_Function;HookApiTest,F','HookApiTest,f','HookApiTest']);{class F extends $hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]]{}let f=__hook__(__hook__(F,null,['return (a,b) => a + b;'],_c_[2],true),null,[],_c_[2],0);__hook__(f,null,[1,2],_c_[3],0);}",
            "name": "CallExpression  { class F extends Function {} let f = new F('return (a,b) => a + b;')(); f(1,2); }"
          },
          {
            "code": "{ class F extends Function { constructor(...args) { super(...args); } } let f = new F('return (a,b) => a + b;')(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F','_pp_Function;HookApiTest,F','HookApiTest,F,constructor','HookApiTest,f','HookApiTest']);{class F extends $hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]]{constructor(...args){return __hook__((...args)=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,...args],_c_[2],'');},null,arguments,_c_[2]);}}let f=__hook__(__hook__(F,null,['return (a,b) => a + b;'],_c_[3],true),null,[],_c_[3],0);__hook__(f,null,[1,2],_c_[4],0);}",
            "name": "CallExpression  { class F extends Function { constructor(...args) { super(...args); } } let f = new F('return (a,b) => a + b;')(); f(1,2); }"
          },
          {
            "code": "{ class F extends Function { constructor(p1,p2,script) { super(p1,script); } } let f = new F('p1', 'p2', 'return (a,b) => p1 + a + b;')(3, 4); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,F','_pp_Function;HookApiTest,F','HookApiTest,F,constructor','HookApiTest,f','HookApiTest']);{class F extends $hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]]{constructor(p1,p2,script){return __hook__((p1,p2,script)=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,p1,script],_c_[2],'');},null,arguments,_c_[2]);}}let f=__hook__(__hook__(F,null,['p1','p2','return (a,b) => p1 + a + b;'],_c_[3],true),null,[3,4],_c_[3],0);__hook__(f,null,[1,2],_c_[4],0);}",
            "name": "CallExpression  { class F extends Function { constructor(p1,p2,script) { super(p1,script); } } let f = new F('p1', 'p2', 'return (a,b) => p1 + a + b;')(3, 4); f(1,2); }"
          },
          {
            "code": "{ let f = Function('return (a,b) => a + b;')(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__($hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],null,['return (a,b) => a + b;'],_c_[0],0),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "CallExpression  { let f = Function('return (a,b) => a + b;')(); f(1,2); }"
          },
          {
            "code": "{ let f = Function('\"use strict\"; return (a,b) => a + b;')(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__($hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],null,['\"use strict\"; return (a,b) => a + b;'],_c_[0],0),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "CallExpression  { let f = Function('\"use strict\"; return (a,b) => a + b;')(); f(1,2); }"
          },
          {
            "code": "{ let f = Function.apply(null, ['return (a,b) => a + b;'])(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],['apply',[null,['return (a,b) => a + b;']]],_c_[0]),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "CallExpression  { let f = Function.apply(null, ['return (a,b) => a + b;'])(); f(1,2); }"
          },
          {
            "code": "{ let f = Function.call(null, 'return (a,b) => a + b;')(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],['call',[null,'return (a,b) => a + b;']],_c_[0]),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "CallExpression  { let f = Function.call(null, 'return (a,b) => a + b;')(); f(1,2); }"
          },
          {
            "code": "{ let f = Function.apply(null, ['\"use strict\"; return (a,b) => a + b;'])(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],['apply',[null,['\"use strict\"; return (a,b) => a + b;']]],_c_[0]),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "CallExpression  { let f = Function.apply(null, ['\"use strict\"; return (a,b) => a + b;'])(); f(1,2); }"
          },
          {
            "code": "{ let f = Reflect.apply(Function, null, ['return (a,b) => a + b;'])(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Reflect;HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__('()',$hook$.global(__hook__,_c_[0],'Reflect','get')[_c_[1]],['apply',[$hook$.global(__hook__,_c_[0],'Function','get')[_c_[2]],null,['return (a,b) => a + b;']]],_c_[0]),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[3],0);}",
            "name": "CallExpression  { let f = Reflect.apply(Function, null, ['return (a,b) => a + b;'])(); f(1,2); }"
          },
          {
            "code": "{ let GeneratorFunction = (function *(){}).constructor; let f = Reflect.apply(GeneratorFunction, null, ['Date.now(); yield 1; yield 2']); [...f()]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,GeneratorFunction','HookApiTest,f','_pp_Reflect;HookApiTest,f','HookApiTest']);{let GeneratorFunction=__hook__('.',function*(){yield*__hook__(function*(){},this,arguments,_c_[0]);},['constructor'],_c_[0]);let f=__hook__('()',$hook$.global(__hook__,_c_[1],'Reflect','get')[_c_[2]],['apply',[GeneratorFunction,null,['Date.now(); yield 1; yield 2']]],_c_[1]);[...__hook__(f,null,[],_c_[3],0)];}",
            "name": "CallExpression  { let GeneratorFunction = (function *(){}).constructor; let f = Reflect.apply(GeneratorFunction, null, ['Date.now(); yield 1; yield 2']); [...f()]; }"
          },
          {
            "code": "{ let GeneratorFunction = (function *(){}).constructor;let GeneratorFunctionSubclass = function (...args) { return GeneratorFunction(...args);};Object.setPrototypeOf(GeneratorFunctionSubclass, GeneratorFunction);Object.setPrototypeOf(GeneratorFunctionSubclass.prototype, GeneratorFunction.prototype);let f = Reflect.apply(GeneratorFunctionSubclass, null, ['Date.now(); yield 1; yield 2']); [...f()]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,GeneratorFunction','HookApiTest,GeneratorFunctionSubclass','HookApiTest','_pp_Object;HookApiTest','HookApiTest,f','_pp_Reflect;HookApiTest,f']);{let GeneratorFunction=__hook__('.',function*(){yield*__hook__(function*(){},this,arguments,_c_[0]);},['constructor'],_c_[0]);let GeneratorFunctionSubclass=function(...args){return __hook__((...args)=>{return __hook__(GeneratorFunction,null,[...args],_c_[1],0);},null,arguments,_c_[1]);};__hook__('()',$hook$.global(__hook__,_c_[2],'Object','get')[_c_[3]],['setPrototypeOf',[GeneratorFunctionSubclass,GeneratorFunction]],_c_[2]);__hook__('()',$hook$.global(__hook__,_c_[2],'Object','get')[_c_[3]],['setPrototypeOf',[__hook__('.',GeneratorFunctionSubclass,['prototype'],_c_[2]),__hook__('.',GeneratorFunction,['prototype'],_c_[2])]],_c_[2]);let f=__hook__('()',$hook$.global(__hook__,_c_[4],'Reflect','get')[_c_[5]],['apply',[GeneratorFunctionSubclass,null,['Date.now(); yield 1; yield 2']]],_c_[4]);[...__hook__(f,null,[],_c_[2],0)];}",
            "name": "CallExpression  { let GeneratorFunction = (function *(){}).constructor;let GeneratorFunctionSubclass = function (...args) { return GeneratorFunction(...args);};Object.setPrototypeOf(GeneratorFunctionSubclass, GeneratorFunction);Object.setPrototypeOf(GeneratorFunctionSubclass.prototype, GeneratorFunction.prototype);let f = Reflect.apply(GeneratorFunctionSubclass, null, ['Date.now(); yield 1; yield 2']); [...f()]; }"
          },
          {
            "code": "importScripts('../thin-hook/hook.min.js?no-hook=true');",
            "hooked": "importScripts('../thin-hook/hook.min.js?no-hook=true');const _c_=$hook$.$(__hook__,[]);",
            "eval": () => true,
            "name": "CallExpression  importScripts('../thin-hook/hook.min.js?no-hook=true');"
          }
        ],
        "AwaitExpression": [
          {
            "code": "{ async function f() { return 1; } async function f2() { return await f(); } f2(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest,f2','HookApiTest']);{async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);}async function f2(){return __hook__(async()=>{return await __hook__(f,null,[],_c_[1],0);},null,arguments,_c_[1]);}__hook__(f2,null,[],_c_[2],0);}",
            "asynchronous": true,
            "name": "AwaitExpression  { async function f() { return 1; } async function f2() { return await f(); } f2(); }"
          },
          {
            "code": "{ with ({}) { async function f() { return 1; } async function f2() { return await f(); } f2(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest,f2']);{with($hook$.with({},{})){async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);}async function f2(){return __hook__(async()=>{return await f();},null,arguments,_c_[1]);}f2();}}",
            "asynchronous": true,
            "name": "AwaitExpression  { with ({}) { async function f() { return 1; } async function f2() { return await f(); } f2(); } }"
          },
          {
            "code": "{ async function f() { return 1; } with ({}) { async function f2() { return await f(); } f2(); } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest,f2']);{async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);}with($hook$.with({},{f:true})){async function f2(){return __hook__(async()=>{return await __hook__('w()',__with__,['f',[],(...args)=>f(...args)],_c_[1],false);},null,arguments,_c_[1]);}f2();}}",
            "asynchronous": true,
            "name": "AwaitExpression  { async function f() { return 1; } with ({}) { async function f2() { return await f(); } f2(); } }"
          },
          {
            "code": "async function f() { return 1; } async function f2() { return await f(); } f2();",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_f;HookApiTest,f','HookApiTest,f2','_pp_f2;HookApiTest,f2','_pp_f;HookApiTest,f2','HookApiTest','_pp_f2;HookApiTest']);$hook$.global(__hook__,_c_[0],'f','function')[_c_[1]]=async function f(){return __hook__(async()=>{return 1;},null,arguments,_c_[0]);};$hook$.global(__hook__,_c_[2],'f2','function')[_c_[3]]=async function f2(){return __hook__(async()=>{return await __hook__($hook$.global(__hook__,_c_[2],'f','get')[_c_[4]],null,[],_c_[2],0);},null,arguments,_c_[2]);};__hook__($hook$.global(__hook__,_c_[5],'f2','get')[_c_[6]],null,[],_c_[5],0);",
            "asynchronous": true,
            "name": "AwaitExpression  async function f() { return 1; } async function f2() { return await f(); } f2();"
          }
        ],
        "NewExpression": [
          {
            "code": "{ let a = class {}; new a(1); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);{let a=class{};__hook__(a,null,[1],_c_[0],true);}",
            "name": "NewExpression  { let a = class {}; new a(1); }"
          },
          {
            "code": "with ({a:class {}}) { new a(1); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:class{}},{})){__hook__('wnew',__with__,['a',[1],(...args)=>new a(...args)],_c_[0],false);}",
            "name": "NewExpression  with ({a:class {}}) { new a(1); }"
          },
          {
            "code": "var a = class {}; new a(1);",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=class{};__hook__($hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],null,[1],_c_[0],true);",
            "name": "NewExpression  var a = class {}; new a(1);"
          },
          {
            "code": "{ let f = (new Function('return (a,b) => a + b;'))(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__($hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],null,['return (a,b) => a + b;'],_c_[0],true),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "NewExpression  { let f = (new Function('return (a,b) => a + b;'))(); f(1,2); }"
          },
          {
            "code": "{ let f = (new Function('\"use strict\"; return (a,b) => a + b;'))(); f(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','_pp_Function;HookApiTest,f','HookApiTest']);{let f=__hook__(__hook__($hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],null,['\"use strict\"; return (a,b) => a + b;'],_c_[0],true),null,[],_c_[0],0);__hook__(f,null,[1,2],_c_[2],0);}",
            "name": "NewExpression  { let f = (new Function('\"use strict\"; return (a,b) => a + b;'))(); f(1,2); }"
          },
          {
            "code": "{ new Function()(); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_Function;HookApiTest']);{__hook__(__hook__($hook$.global(__hook__,_c_[0],'Function','get')[_c_[1]],null,[],_c_[0],true),null,[],_c_[0],0);}",
            "name": "NewExpression  { new Function()(); }"
          },
          {
            "code": "{ function f() {} f.constructor('v1', 'v2', 'Date.now(); return (a,b) => v1 + v2 + a + b;')(3,4)(1,2); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,f','HookApiTest']);{function f(){return __hook__(()=>{},null,arguments,_c_[0]);}__hook__(__hook__(__hook__('()',f,['constructor',['v1','v2','Date.now(); return (a,b) => v1 + v2 + a + b;']],_c_[1]),null,[3,4],_c_[1],0),null,[1,2],_c_[1],0);}",
            "name": "NewExpression  { function f() {} f.constructor('v1', 'v2', 'Date.now(); return (a,b) => v1 + v2 + a + b;')(3,4)(1,2); }"
          },
          {
            "code": "{ function * generator() {} [...(new generator.constructor('v1', 'v2', 'yield v1; yield v2;')(1,2))]; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,generator','HookApiTest']);{function*generator(){yield*__hook__(function*(){},this,arguments,_c_[0]);}[...__hook__(__hook__(__hook__('.',generator,['constructor'],_c_[1]),null,['v1','v2','yield v1; yield v2;'],_c_[1],true),null,[1,2],_c_[1],0)];}",
            "name": "NewExpression  { function * generator() {} [...(new generator.constructor('v1', 'v2', 'yield v1; yield v2;')(1,2))]; }"
          },
          {
            "code": "{ function * generator() {} (new generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;')); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,generator','HookApiTest']);{function*generator(){yield*__hook__(function*(){},this,arguments,_c_[0]);}__hook__(__hook__('.',generator,['constructor'],_c_[1]),null,['v1','v2','Date.now(); yield v1; yield v2;'],_c_[1],true);}",
            "eval": (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
            "name": "NewExpression  { function * generator() {} (new generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;')); }"
          },
          {
            "code": "{ function * generator() {} generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,generator','HookApiTest']);{function*generator(){yield*__hook__(function*(){},this,arguments,_c_[0]);}__hook__('()',generator,['constructor',['v1','v2','Date.now(); yield v1; yield v2;']],_c_[1]);}",
            "eval": (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
            "name": "NewExpression  { function * generator() {} generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }"
          },
          {
            "code": "{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,GeneratorFunction','HookApiTest,GeneratorFunction,generator','HookApiTest']);{let GeneratorFunction=__hook__('.',function*generator(){yield*__hook__(function*(){},this,arguments,_c_[1]);},['constructor'],_c_[0]);__hook__(GeneratorFunction,null,['v1','v2','Date.now(); yield v1; yield v2;'],_c_[2],0);}",
            "eval": (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
            "name": "NewExpression  { let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }"
          },
          {
            "code": "{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.call(GeneratorFunction, 'v1', 'v2', 'Date.now(); yield v1; yield v2;'); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,GeneratorFunction','HookApiTest,GeneratorFunction,generator','HookApiTest']);{let GeneratorFunction=__hook__('.',function*generator(){yield*__hook__(function*(){},this,arguments,_c_[1]);},['constructor'],_c_[0]);__hook__('()',GeneratorFunction,['call',[GeneratorFunction,'v1','v2','Date.now(); yield v1; yield v2;']],_c_[2]);}",
            "eval": (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
            "name": "NewExpression  { let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.call(GeneratorFunction, 'v1', 'v2', 'Date.now(); yield v1; yield v2;'); }"
          },
          {
            "code": "{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.apply(GeneratorFunction, ['v1', 'v2', 'Date.now(); yield v1; yield v2;']); }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,GeneratorFunction','HookApiTest,GeneratorFunction,generator','HookApiTest']);{let GeneratorFunction=__hook__('.',function*generator(){yield*__hook__(function*(){},this,arguments,_c_[1]);},['constructor'],_c_[0]);__hook__('()',GeneratorFunction,['apply',[GeneratorFunction,['v1','v2','Date.now(); yield v1; yield v2;']]],_c_[2]);}",
            "eval": (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
            "name": "NewExpression  { let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.apply(GeneratorFunction, ['v1', 'v2', 'Date.now(); yield v1; yield v2;']); }"
          }
        ],
        "SequenceExpression": [
          {
            "code": "{ let a, b; a, b; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a,b;a,b;}",
            "name": "SequenceExpression  { let a, b; a, b; }"
          },
          {
            "code": "with ({a:1,b:2}) { a, b; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);with($hook$.with({a:1,b:2},{})){__hook__('w.',__with__,['a',()=>a],_c_[0],false),__hook__('w.',__with__,['b',()=>b],_c_[0],false);}",
            "name": "SequenceExpression  with ({a:1,b:2}) { a, b; }"
          },
          {
            "code": "var a, b; a, b;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]];$hook$.global(__hook__,_c_[0],'a','get')[_c_[1]],$hook$.global(__hook__,_c_[0],'b','get')[_c_[2]];",
            "name": "SequenceExpression  var a, b; a, b;"
          }
        ],
        "ClassDeclaration": [
          {
            "code": "{ class a {} class b extends a {} }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{class a{}class b extends a{}}",
            "name": "ClassDeclaration  { class a {} class b extends a {} }"
          },
          {
            "code": "{ with ({}) { class a {} class b extends a {} } }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{with($hook$.with({},{})){class a{}class b extends a{}}}",
            "name": "ClassDeclaration  { with ({}) { class a {} class b extends a {} } }"
          },
          {
            "code": "class a {} class b extends a {}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a','_pp_a;HookApiTest,a','HookApiTest,b','_pp_b;HookApiTest,b','_pp_a;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','class')[_c_[1]]=class a{};$hook$.global(__hook__,_c_[2],'b','class')[_c_[3]]=class b extends $hook$.global(__hook__,_c_[2],'a','get')[_c_[4]]{};",
            "eval": () => true,
            "name": "ClassDeclaration  class a {} class b extends a {}"
          },
          {
            "code": "'use strict'; class a {} class b extends a {}",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest,a','S_pp_a;HookApiTest,a','HookApiTest,b','S_pp_b;HookApiTest,b','S_pp_a;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','#class')[_c_[1]]=class a{};$hook$.global(__hook__,_c_[2],'b','#class')[_c_[3]]=class b extends $hook$.global(__hook__,_c_[2],'a','#get')[_c_[4]]{};",
            "eval": () => true,
            "name": "ClassDeclaration  'use strict'; class a {} class b extends a {}"
          },
          {
            "code": "{ class undefined {} class NaN {} class Infinity {} true; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{class __unexpected_overridden_declaration_of_undefined__{}class __unexpected_overridden_declaration_of_NaN__{}class __unexpected_overridden_declaration_of_Infinity__{}true;}",
            "name": "ClassDeclaration  { class undefined {} class NaN {} class Infinity {} true; }"
          }
        ],
        "ClassExpression": [
          {
            "code": "{ let a = class a {}; let b = class b extends a {}; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{let a=class a{};let b=class b extends a{};}",
            "name": "ClassExpression  { let a = class a {}; let b = class b extends a {}; }"
          },
          {
            "code": "{ with ({}) { let a = class a {}; let b = class b extends a {}; } }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{with($hook$.with({},{})){let a=class a{};let b=class b extends a{};}}",
            "name": "ClassExpression  { with ({}) { let a = class a {}; let b = class b extends a {}; } }"
          },
          {
            "code": "var a = class a {}; var b = class b extends a {};",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_a;HookApiTest','_pp_b;HookApiTest','HookApiTest,b','_pp_a;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','var')[_c_[1]]=class a{};$hook$.global(__hook__,_c_[0],'b','var')[_c_[2]]=class b extends $hook$.global(__hook__,_c_[3],'a','get')[_c_[4]]{};",
            "eval": () => true,
            "name": "ClassExpression  var a = class a {}; var b = class b extends a {};"
          },
          {
            "code": "'use strict'; var a = class a {}; var b = class b extends a {};",
            "hooked": "'use strict';const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_a;HookApiTest','S_pp_b;HookApiTest','HookApiTest,b','S_pp_a;HookApiTest,b']);$hook$.global(__hook__,_c_[0],'a','#var')[_c_[1]]=class a{};$hook$.global(__hook__,_c_[0],'b','#var')[_c_[2]]=class b extends $hook$.global(__hook__,_c_[3],'a','#get')[_c_[4]]{};",
            "eval": () => true,
            "name": "ClassExpression  'use strict'; var a = class a {}; var b = class b extends a {};"
          },
          {
            "code": "{ (class undefined {}); (class NaN {}); (class Infinity {}); true; }",
            "hooked": "const _c_=$hook$.$(__hook__,[]);{(class __unexpected_overridden_declaration_of_undefined__{});(class __unexpected_overridden_declaration_of_NaN__{});(class __unexpected_overridden_declaration_of_Infinity__{});true;}",
            "name": "ClassExpression  { (class undefined {}); (class NaN {}); (class Infinity {}); true; }"
          }
        ],
        "MethodDefinition": [
          {
            "code": "{ class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,constructor','HookApiTest,a,m','HookApiTest,a,get p','HookApiTest,a,set p']);{class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[0]);},null,arguments,_c_[0]);}m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[1]);},null,arguments,_c_[1]);}get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[2]);},null,arguments,_c_[2]);}set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[3]);},null,arguments,_c_[3]);}}}",
            "name": "MethodDefinition  { class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } }"
          },
          {
            "code": "{ class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,static m','HookApiTest,a,get p','HookApiTest,a,set p']);{class a{static m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[0]);},null,arguments,_c_[0]);}static get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[1]);},null,arguments,_c_[1]);}static set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[2]);},null,arguments,_c_[2]);}}}",
            "name": "MethodDefinition  { class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } }"
          },
          {
            "code": "{ let m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,constructor','HookApiTest,a,m','HookApiTest,a,get p','HookApiTest,a,set p']);{let m='m',p='p';class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[0]);},null,arguments,_c_[0]);}[m](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[1]);},null,arguments,_c_[1]);}get[p](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[2]);},null,arguments,_c_[2]);}set[p](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[3]);},null,arguments,_c_[3]);}}}",
            "name": "MethodDefinition  { let m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } }"
          },
          {
            "code": "{ let m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,static m','HookApiTest,a,get p','HookApiTest,a,set p']);{let m='m',p='p';class a{static[m](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[0]);},null,arguments,_c_[0]);}static get[p](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[1]);},null,arguments,_c_[1]);}static set[p](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[2]);},null,arguments,_c_[2]);}}}",
            "name": "MethodDefinition  { let m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } }"
          },
          {
            "code": "{ with ({}) { class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,constructor','HookApiTest,a,m','HookApiTest,a,get p','HookApiTest,a,set p']);{with($hook$.with({},{})){class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[0]);},null,arguments,_c_[0]);}m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[1]);},null,arguments,_c_[1]);}get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[2]);},null,arguments,_c_[2]);}set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[3]);},null,arguments,_c_[3]);}}}}",
            "name": "MethodDefinition  { with ({}) { class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } } }"
          },
          {
            "code": "{ with ({}) { class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,static m','HookApiTest,a,get p','HookApiTest,a,set p']);{with($hook$.with({},{})){class a{static m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[0]);},null,arguments,_c_[0]);}static get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[1]);},null,arguments,_c_[1]);}static set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[2]);},null,arguments,_c_[2]);}}}}",
            "name": "MethodDefinition  { with ({}) { class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } } }"
          },
          {
            "code": "{ with ({m:'m',p:'p'}) { class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,constructor','HookApiTest,a,m','HookApiTest,a,get p','HookApiTest,a,set p']);{with($hook$.with({m:'m',p:'p'},{})){class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[0]);},null,arguments,_c_[0]);}[__hook__('w.',__with__,['m',()=>m],_c_[1],false)](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[1]);},null,arguments,_c_[1]);}get[__hook__('w.',__with__,['p',()=>p],_c_[2],false)](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[2]);},null,arguments,_c_[2]);}set[__hook__('w.',__with__,['p',()=>p],_c_[3],false)](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[3]);},null,arguments,_c_[3]);}}}}",
            "name": "MethodDefinition  { with ({m:'m',p:'p'}) { class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } } }"
          },
          {
            "code": "{ with ({m:'m',p:'p'}) { class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,a,static m','HookApiTest,a,get p','HookApiTest,a,set p']);{with($hook$.with({m:'m',p:'p'},{})){class a{static[__hook__('w.',__with__,['m',()=>m],_c_[0],false)](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[0]);},null,arguments,_c_[0]);}static get[__hook__('w.',__with__,['p',()=>p],_c_[1],false)](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[1]);},null,arguments,_c_[1]);}static set[__hook__('w.',__with__,['p',()=>p],_c_[2],false)](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[2]);},null,arguments,_c_[2]);}}}}",
            "name": "MethodDefinition  { with ({m:'m',p:'p'}) { class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } } }"
          },
          {
            "code": "var m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_m;HookApiTest','_pp_p;HookApiTest','HookApiTest,a','_pp_a;HookApiTest,a','HookApiTest,a,constructor','HookApiTest,a,m','S_pp_m;HookApiTest,a,m','HookApiTest,a,get p','S_pp_p;HookApiTest,a,get p','HookApiTest,a,set p','S_pp_p;HookApiTest,a,set p']);$hook$.global(__hook__,_c_[0],'m','var')[_c_[1]]='m',$hook$.global(__hook__,_c_[0],'p','var')[_c_[2]]='p';$hook$.global(__hook__,_c_[3],'a','class')[_c_[4]]=class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],_c_[5]);},null,arguments,_c_[5]);}[$hook$.global(__hook__,_c_[6],'m','#get')[_c_[7]]](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[6]);},null,arguments,_c_[6]);}get[$hook$.global(__hook__,_c_[8],'p','#get')[_c_[9]]](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[8]);},null,arguments,_c_[8]);}set[$hook$.global(__hook__,_c_[10],'p','#get')[_c_[11]]](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[10]);},null,arguments,_c_[10]);}};",
            "eval": () => true,
            "name": "MethodDefinition  var m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } }"
          },
          {
            "code": "var m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','_pp_m;HookApiTest','_pp_p;HookApiTest','HookApiTest,a','_pp_a;HookApiTest,a','HookApiTest,a,static m','S_pp_m;HookApiTest,a,static m','HookApiTest,a,get p','S_pp_p;HookApiTest,a,get p','HookApiTest,a,set p','S_pp_p;HookApiTest,a,set p']);$hook$.global(__hook__,_c_[0],'m','var')[_c_[1]]='m',$hook$.global(__hook__,_c_[0],'p','var')[_c_[2]]='p';$hook$.global(__hook__,_c_[3],'a','class')[_c_[4]]=class a{static[$hook$.global(__hook__,_c_[5],'m','#get')[_c_[6]]](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],_c_[5]);},null,arguments,_c_[5]);}static get[$hook$.global(__hook__,_c_[7],'p','#get')[_c_[8]]](){return __hook__(()=>{return __hook__('#.',this,['_p'],_c_[7]);},null,arguments,_c_[7]);}static set[$hook$.global(__hook__,_c_[9],'p','#get')[_c_[10]]](v){return __hook__(v=>{__hook__('#=',this,['_p',v],_c_[9]);},null,arguments,_c_[9]);}};",
            "eval": () => true,
            "name": "MethodDefinition  var m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } }"
          }
        ],
        "MetaProperty": [
          {
            "code": "{ class c { constructor() { this.nt = new.target; } } (new c()).nt === c; }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,constructor','HookApiTest']);{class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],_c_[0]);},null,arguments,_c_[0]);}}__hook__('.',__hook__(c,null,[],_c_[1],true),['nt'],_c_[1])===c;}",
            "name": "MetaProperty  { class c { constructor() { this.nt = new.target; } } (new c()).nt === c; }"
          },
          {
            "code": "{ with ({}) { class c { constructor() { this.nt = new.target; } } (new c()).nt === c; } }",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c,constructor','HookApiTest']);{with($hook$.with({},{})){class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],_c_[0]);},null,arguments,_c_[0]);}}__hook__('.',new c(),['nt'],_c_[1])===c;}}",
            "name": "MetaProperty  { with ({}) { class c { constructor() { this.nt = new.target; } } (new c()).nt === c; } }"
          },
          {
            "code": "class c { constructor() { this.nt = new.target; } } (new c()).nt === c;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest,c','_pp_c;HookApiTest,c','HookApiTest,c,constructor','HookApiTest','_pp_c;HookApiTest']);$hook$.global(__hook__,_c_[0],'c','class')[_c_[1]]=class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],_c_[2]);},null,arguments,_c_[2]);}};__hook__('.',__hook__($hook$.global(__hook__,_c_[3],'c','get')[_c_[4]],null,[],_c_[3],true),['nt'],_c_[3])===$hook$.global(__hook__,_c_[3],'c','get')[_c_[4]];",
            "eval": () => true,
            "name": "MetaProperty  class c { constructor() { this.nt = new.target; } } (new c()).nt === c;"
          }
        ],
        "Import": [
          {
            "code": "import.meta.url",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);__hook__('.',__hook__(()=>import.meta,null,['import.meta'],_c_[0],NaN),['url'],_c_[0]);",
            "eval": () => true,
            "name": "Import  import.meta.url"
          }
        ],
        "ImportDeclaration": [
          {
            "code": "import defaultExport from \"module-name.js\";\nimport * as name1 from \"module-name.js\";\nimport { export0 } from \"module-name.js\";\nimport { export1 as alias1 } from \"module-name.js\";\nimport { export2 , export3 } from \"module-name.js\";\nimport { export4 , export5 as alias2 } from \"module-name.js\";\nimport defaultExport2, { export6, export7 as alias3 } from \"module-name.js\";\nimport defaultExport3, * as name2 from \"module-name.js\";\nimport \"module-name.js\";",
            "hooked": "const _c_ = $hook$.$(__hook__, []);\nimport defaultExport from 'module-name.js';\nimport * as name1 from 'module-name.js';\nimport { export0 } from 'module-name.js';\nimport { export1 as alias1 } from 'module-name.js';\nimport {\n  export2,\n  export3\n} from 'module-name.js';\nimport {\n  export4,\n  export5 as alias2\n} from 'module-name.js';\nimport defaultExport2, {\n  export6,\n  export7 as alias3\n} from 'module-name.js';\nimport defaultExport3, * as name2 from 'module-name.js';\nimport 'module-name.js';",
            "options": "compact=false",
            "eval": () => true,
            "name": "ImportDeclaration  import defaultExport from \"module-name.js\"; import * as name1 from \"module-name.js\"; import { export0 } from \"module-name.js\"; import { export1 as alias1 } from \"module-name.js\"; import { export2 , export3 } from \"module-name.js\"; import { export4 , export5 as alias2 } from \"module-name.js\"; import defaultExport2, { export6, export7 as alias3 } from \"module-name.js\"; import defaultExport3, * as name2 from \"module-name.js\"; import \"module-name.js\"; // compact=false"
          },
          {
            "code": "import defaultExport from \"module-name.mjs\";\nimport * as name1 from \"module-name.mjs\";\nimport { export0 } from \"module-name.mjs\";\nimport { export1 as alias1 } from \"module-name.mjs\";\nimport { export2 , export3 } from \"module-name.mjs\";\nimport { export4 , export5 as alias2 } from \"module-name.mjs\";\nimport defaultExport2, { export6, export7 as alias3 } from \"module-name.mjs\";\nimport defaultExport3, * as name2 from \"module-name.mjs\";\nimport \"module-name.mjs\";",
            "hooked": "const _c_ = $hook$.$(__hook__, []);\nimport defaultExport from 'module-name.mjs';\nimport * as name1 from 'module-name.mjs';\nimport { export0 } from 'module-name.mjs';\nimport { export1 as alias1 } from 'module-name.mjs';\nimport {\n  export2,\n  export3\n} from 'module-name.mjs';\nimport {\n  export4,\n  export5 as alias2\n} from 'module-name.mjs';\nimport defaultExport2, {\n  export6,\n  export7 as alias3\n} from 'module-name.mjs';\nimport defaultExport3, * as name2 from 'module-name.mjs';\nimport 'module-name.mjs';",
            "options": "compact=false",
            "eval": () => true,
            "name": "ImportDeclaration  import defaultExport from \"module-name.mjs\"; import * as name1 from \"module-name.mjs\"; import { export0 } from \"module-name.mjs\"; import { export1 as alias1 } from \"module-name.mjs\"; import { export2 , export3 } from \"module-name.mjs\"; import { export4 , export5 as alias2 } from \"module-name.mjs\"; import defaultExport2, { export6, export7 as alias3 } from \"module-name.mjs\"; import defaultExport3, * as name2 from \"module-name.mjs\"; import \"module-name.mjs\"; // compact=false"
          },
          {
            "code": "import defaultExport from \"invalid-module-name\";\nimport * as name1 from \"invalid-module-name\";\nimport { export0 } from \"invalid-module-name\";\nimport { export1 as alias1 } from \"invalid-module-name\";\nimport { export2 , export3 } from \"invalid-module-name\";\nimport { export4 , export5 as alias2 } from \"invalid-module-name\";\nimport defaultExport2, { export6, export7 as alias3 } from \"invalid-module-name\";\nimport defaultExport3, * as name2 from \"invalid-module-name\";\nimport \"invalid-module-name\";",
            "hooked": "const _c_ = $hook$.$(__hook__, []);\nimport defaultExport from '!!! invalid script url !!!';\nimport * as name1 from '!!! invalid script url !!!';\nimport { export0 } from '!!! invalid script url !!!';\nimport { export1 as alias1 } from '!!! invalid script url !!!';\nimport {\n  export2,\n  export3\n} from '!!! invalid script url !!!';\nimport {\n  export4,\n  export5 as alias2\n} from '!!! invalid script url !!!';\nimport defaultExport2, {\n  export6,\n  export7 as alias3\n} from '!!! invalid script url !!!';\nimport defaultExport3, * as name2 from '!!! invalid script url !!!';\nimport '!!! invalid script url !!!';",
            "options": "compact=false",
            "eval": () => true,
            "name": "ImportDeclaration  import defaultExport from \"invalid-module-name\"; import * as name1 from \"invalid-module-name\"; import { export0 } from \"invalid-module-name\"; import { export1 as alias1 } from \"invalid-module-name\"; import { export2 , export3 } from \"invalid-module-name\"; import { export4 , export5 as alias2 } from \"invalid-module-name\"; import defaultExport2, { export6, export7 as alias3 } from \"invalid-module-name\"; import defaultExport3, * as name2 from \"invalid-module-name\"; import \"invalid-module-name\"; // compact=false"
          },
          {
            "code": "import * as undefined from 'module.js';",
            "hooked": "const _c_ = $hook$.$(__hook__, []);\nimport * as __unexpected_overridden_declaration_of_undefined__ from 'module.js';",
            "options": "compact=false",
            "eval": () => true,
            "name": "ImportDeclaration  import * as undefined from 'module.js'; // compact=false"
          },
          {
            "code": "import { A as undefined, B as NaN, C as Infinity } from 'module.js';",
            "hooked": "const _c_ = $hook$.$(__hook__, []);\nimport {\n  A as __unexpected_overridden_declaration_of_undefined__,\n  B as __unexpected_overridden_declaration_of_NaN__,\n  C as __unexpected_overridden_declaration_of_Infinity__\n} from 'module.js';",
            "options": "compact=false",
            "eval": () => true,
            "name": "ImportDeclaration  import { A as undefined, B as NaN, C as Infinity } from 'module.js'; // compact=false"
          }
        ],
        "ExportNamedDeclaration": [
          {
            "code": "function name1() {}\nclass name2 {}\nlet name3 = 1;\nconst name4 = 2;\nexport { name1, name2, name3, name4 };\nexport { name1 as alias1, name2 as alias2, name3 as alias3, name4 as alias4 };\nexport let name5 = name1.name, name6 = name2.name;\nexport const name7 = 3, name8 = 4;",
            "hooked": "const _c_ = $hook$.$(__hook__, [\n  'HookApiTest,name1',\n  'HookApiTest,name5',\n  'HookApiTest,name6'\n]);\nfunction name1() {\n  return __hook__(() => {\n  }, null, arguments, _c_[0]);\n}\nclass name2 {\n}\nlet name3 = 1;\nconst name4 = 2;\nexport {\n  name1,\n  name2,\n  name3,\n  name4\n};\nexport {\n  name1 as alias1,\n  name2 as alias2,\n  name3 as alias3,\n  name4 as alias4\n};\nexport let name5 = __hook__('#.', name1, ['name'], _c_[1]), name6 = __hook__('#.', name2, ['name'], _c_[2]);\nexport const name7 = 3, name8 = 4;",
            "options": "compact=false",
            "eval": () => true,
            "name": "ExportNamedDeclaration  function name1() {} class name2 {} let name3 = 1; const name4 = 2; export { name1, name2, name3, name4 }; export { name1 as alias1, name2 as alias2, name3 as alias3, name4 as alias4 }; export let name5 = name1.name, name6 = name2.name; export const name7 = 3, name8 = 4; // compact=false"
          },
          {
            "code": "export { name1, name2 as alias2 };",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export{undefined,undefined as alias2};",
            "eval": () => true,
            "name": "ExportNamedDeclaration  export { name1, name2 as alias2 };"
          },
          {
            "code": "export { name1, name2 as alias2 } from 'module.js';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export{name1,name2 as alias2}from'module.js';",
            "eval": () => true,
            "name": "ExportNamedDeclaration  export { name1, name2 as alias2 } from 'module.js';"
          },
          {
            "code": "export { name1, name2 as alias2 } from 'module.mjs';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export{name1,name2 as alias2}from'module.mjs';",
            "eval": () => true,
            "name": "ExportNamedDeclaration  export { name1, name2 as alias2 } from 'module.mjs';"
          },
          {
            "code": "export { name1, name2 as alias2 } from 'invalid-module';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export{name1,name2 as alias2}from'!!! invalid script url !!!';",
            "eval": () => true,
            "name": "ExportNamedDeclaration  export { name1, name2 as alias2 } from 'invalid-module';"
          }
        ],
        "ExportDefaultDeclaration": [
          {
            "code": "export default function () {}",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);export default function (){return __hook__(()=>{},null,arguments,_c_[0]);}",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  export default function () {}"
          },
          {
            "code": "export default class C {}",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export default class C{}",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  export default class C {}"
          },
          {
            "code": "export default 'abc';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export default'abc';",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  export default 'abc';"
          },
          {
            "code": "class C {} export default C;",
            "hooked": "const _c_=$hook$.$(__hook__,[]);class C{}export default C;",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  class C {} export default C;"
          },
          {
            "code": "class C {} export { C as default };",
            "hooked": "const _c_=$hook$.$(__hook__,[]);class C{}export{C as default};",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  class C {} export { C as default };"
          },
          {
            "code": "class C {} export default C.name;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest']);class C{}export default __hook__('#.',C,['name'],_c_[0]);",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  class C {} export default C.name;"
          },
          {
            "code": "export default Date;",
            "hooked": "const _c_=$hook$.$(__hook__,['HookApiTest','S_pp_Date;HookApiTest']);export default $hook$.global(__hook__,_c_[0],'Date','#get')[_c_[1]];",
            "eval": () => true,
            "name": "ExportDefaultDeclaration  export default Date;"
          }
        ],
        "ExportAllDeclaration": [
          {
            "code": "export * from 'module.js';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export*from'module.js';",
            "eval": () => true,
            "name": "ExportAllDeclaration  export * from 'module.js';"
          },
          {
            "code": "export * from 'module.mjs';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export*from'module.mjs';",
            "eval": () => true,
            "name": "ExportAllDeclaration  export * from 'module.mjs';"
          },
          {
            "code": "export * from 'invalid-module';",
            "hooked": "const _c_=$hook$.$(__hook__,[]);export*from'!!! invalid script url !!!';",
            "eval": () => true,
            "name": "ExportAllDeclaration  export * from 'invalid-module';"
          }
        ]
      };
    }
    * iteration() {
      let codes = this.codes;
      for (let name in codes) {
        for (let code of codes[name]) {
          if (code.name) {
            code.name = (name ? name + ' ' : '') + code.name + ' ' + code.code.replace(/\n/g, ' ');
          }
          else {
            code.name = (name ? name + ' ' : '') + ' ' + code.code.replace(/\n/g, ' ');
          }
          if (!code.options) {
            code.options = this.defaultOptions;
          }
          else {
            if (typeof code.options === 'string') {
              code.name += ' // ' + code.options;
              if (code.customOptionParams) {
                code.name += ' ' + JSON.stringify(code.customOptionParams, null, 0);
              }
              code.options = this.customOptions(code.options, code.customOptionParams);
            }
            else {
              code.name += ' // ' + JSON.stringify(code.option, null, 0);
            }
          }
          if (typeof code.hooked === 'function') {
            code.hooked = code.hooked(code);
          }
          if (typeof code.eval === 'string') {
            switch (code.eval) {
            case 'throw':
              code.eval = (code) => {
                let result;
                let exception;
                try {
                  result = HookApiTest.nativeEval(code);
                }
                catch (e) {
                  exception = e;
                }
                //console.log(exception);
                return exception ? exception.name + ': ' + exception.message : result;
              };
              break;
            case 'call':
              code.eval = (code) => HookApiTest.nativeEval(code)();
              break;
            case 'call_global_f':
              code.eval = (code) => { HookApiTest.nativeEval(code); let result = window.f(); window.f = undefined; return result; };
              break;
            default:
              code.eval = undefined;
              break;
            }
          }
          yield code;
        }
      }
    }
    async operation(parameters) {
      let {
        name: name = '',
        code,
        hooked,
        eval: evaluator = HookApiTest.nativeEval,
        asynchronous: asynchronous = false
      } = parameters;
      if (!name) {
        name = code;
      }
      delete this.originalResult;
      delete this.result;
      delete this.hooked;
      this.name = name;
      this.hooked = hook(code, ...parameters.options);
      try {
        if (asynchronous) {
          this.originalResult = await evaluator(code);
          this.result = await evaluator(this.hooked);
        }
        else {
          this.originalResult = evaluator(code);
          this.result = evaluator(this.hooked);
        }
      }
      catch (e) {
        console.log(this.hooked);
        throw e;
      }
    }
    async checkpoint(parameters) {
      if (this.hooked !== parameters.hooked) {
        console.log(this.hooked);
      }
      assert.equal(this.hooked, parameters.hooked, 'hooked "' + parameters.code + '"');
      if (this.originalResult instanceof Object) {
        assert.equal(JSON.stringify(this.result, null, 0), JSON.stringify(this.originalResult, null, 0), 'hooked result from hooked "' + this.name + '"');
      }
      else {
        assert.equal(this.result, this.originalResult, 'hooked result from hooked "' + this.name + '"');
      }
    }
  }
  basic.test = {
    // test class mixins
    '': [],
    // test classes
    LoadPage: {
      HookApiAvailable: {
        HookApiTest: {
          UnregisterServiceWorker: 'HookApi; Raw calls of hook() API'
        }
      }
    }
  };
} // basic scope
