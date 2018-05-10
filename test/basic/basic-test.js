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
        '__hook__', // [0] hookName
        [[this.context, {}]], // [1] initialContext
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
        '': [
          { name: 'empty', code: ``, hooked: `` },
          { name: 'space', code: ` `, hooked: `` },
          { name: 'EmptyStatement', code: `;`, hooked: `;` },
          { name: 'Comment', code: `/* comment */`, hooked: `` },
        ],
        Literal: [
          { name: 'decimal integer', code: `1`, hooked: `1;` },
          { name: 'decimal negative integer', code: `-1`, hooked: `-1;` },
          { name: 'hexadecimal integer', code: `0xa5`, hooked: `165;` },
          { name: 'hexadecimal negative integer', code: `-0xa5`, hooked: `-165;` },
          { name: 'octal integer', code: `077`, hooked: `63;` },
          { name: 'floating number', code: `12.340`, hooked: `12.34;` },
          { name: 'floating number', code: `1.234e2`, hooked: `123.4;` },
          { name: 'floating number', code: `12.34e101`, hooked: `1.234e+102;` },
          { name: 'negative floating number', code: `-12.340`, hooked: `-12.34;` },
          { name: 'negative floating number', code: `-1.234e2`, hooked: `-123.4;` },
          { name: 'negative floating number', code: `-12.34e101`, hooked: `-1.234e+102;` },
          { name: 'string', code: `'a'`, hooked: `'a';` },
          { name: 'double quoted string', code: `"a"`, hooked: `'a';` },
          { name: 'boolean', code: `true`, hooked: `true;` },
          { name: 'boolean', code: `false`, hooked: `false;` },
          { name: 'null', code: `null`, hooked: `null;` },
          { name: 'RegExp', code: `/^a$/`, hooked: `/^a$/;` },
        ],
        TemplateLiteral: [
          {
            code: '{ let a = 1; `a = ${a};`; }',
            hooked: '{let a=1;`a = ${a};`;}',
          },
          {
            code: '{ with ({a:1}) { `a = ${a};`; } }',
            hooked: "{with($hook$.with({a:1},{})){`a = ${__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)};`;}}",
          },
          {
            code: 'var a = 1; `a = ${a};`;',
            hooked: "$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;`a = ${$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']};`;",
          },
        ],
        TaggedTemplateExpression: [
          {
            code: "{ let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } tag`plus: ${a} + ${b} = ${c};`; }",
            hooked: "{let a=1,b=2,c;function tag(str,p1,p2,p3){return " +
              "__hook__((str,p1,p2,p3)=>{return " +
              "__hook__('.',str,[0],'HookApiTest,tag')+p1+" +
              "__hook__('.',str,[1],'HookApiTest,tag')+p2+" +
              "__hook__('.',str,[2],'HookApiTest,tag')+(p1+p2)+" +
              "__hook__('.',str,[3],'HookApiTest,tag');},null,arguments,'HookApiTest,tag');}" +
              "tag`plus: ${a} + ${b} = ${c};`;}",
          },
          {
            code: "{ let a = 1, b = 2, c; function tag(str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; } with ({}) { tag`plus: ${a} + ${b} = ${c};`; } }",
            hooked: "{let a=1,b=2,c;" +
              "function tag(str,p1,p2,p3){return " +
              "__hook__((str,p1,p2,p3)=>{return __hook__('.',str,[0],'HookApiTest,tag')+p1+" +
              "__hook__('.',str,[1],'HookApiTest,tag')+p2+" +
              "__hook__('.',str,[2],'HookApiTest,tag')+(p1+p2)+" +
              "__hook__('.',str,[3],'HookApiTest,tag');},null,arguments,'HookApiTest,tag');}" +
              "with($hook$.with({},{a:true,b:true,c:true,tag:true})){" +
              "__hook__('w.',__with__,['tag',()=>tag],'HookApiTest',false)" +
              "`plus: ${__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)} + " +
              "${__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)} = " +
              "${__hook__('w.',__with__,['c',()=>c],'HookApiTest',false)};`;}}",
          },
          {
            code: "var a = 1, b = 2, c, tag = function (str, p1, p2, p3) { return str[0] + p1 + str[1] + p2 + str[2] + (p1 + p2) + str[3]; }; tag`plus: ${a} + ${b} = ${c};`;",
            hooked: "$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1," +
              "$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2," +
              "$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']," +
              "$hook$.global(__hook__,'HookApiTest','tag','var')['_pp_tag;HookApiTest']=" +
              "function(str,p1,p2,p3){return __hook__((str,p1,p2,p3)=>{return " +
              "__hook__('.',str,[0],'HookApiTest')+p1+" +
              "__hook__('.',str,[1],'HookApiTest')+p2+" +
              "__hook__('.',str,[2],'HookApiTest')+(p1+p2)+" +
              "__hook__('.',str,[3],'HookApiTest');},null,arguments,'HookApiTest');};" +
              "$hook$.global(__hook__,'HookApiTest','tag','get')['_pp_tag;HookApiTest']" +
              "`plus: ${$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']} + " +
              "${$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']} = " +
              "${$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest']};`;",
          },
        ],
        Identifier: [
          { code: 'a', hooked: 'a;', eval: 'throw', options: 'initialScope', customOptionParams: { initialScope: { a: true } } },
          {
            code: `{ let __hook__, __with__, $hook$; }`,
            hooked: `{let __unexpected_access_to_hook_callback_function__,__unexpected_access_to_hook_with_object__,__unexpected_access_to_hook_alias_object__;}`,
            eval: () => true,
          },
        ],
        // Function
        FunctionDeclaration: [
          {
            code: 'function f() {return 1}',
            hooked: `function f(){return __hook__(()=>{return 1;},null,arguments,\'${this.context},f\');}`,
            eval: 'call_global_f',
            options: 'initialScope', customOptionParams: { initialScope: { f: true } }
          },
          {
            code: 'function f() {return 1}',
            hooked: '$hook$.global(__hook__,\'HookApiTest,f\',\'f\',\'function\')[\'_pp_f;HookApiTest,f\']=function f(){return __hook__(()=>{return 1;},null,arguments,\'HookApiTest,f\');};',
            eval: 'call_global_f',
          },
          {
            code: 'function * f(v) {yield v;}; f().next();',
            hooked: `function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,'HookApiTest,f');};__hook__('()',__hook__(f,null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
            options: 'initialScope', customOptionParams: { initialScope: { f: true } }
          },
          {
            code: '{ with ({}) { function * f(v) {yield v;}; f().next(); } }',
            hooked: `{with($hook$.with({},{})){` +
              `function*f(v){yield*__hook__(function*(v){yield __hook__('w.',__with__,['v',()=>v],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');};` +
              `__hook__('()',__hook__('w()',__with__,['f',[],(...args)=>f(...args)],'HookApiTest',false),['next',[]],'HookApiTest');}}`,
          },
          {
            code: 'function * f(v) {yield v;} f().next();',
            hooked: `$hook$.global(__hook__,'HookApiTest,f','f','function')['_pp_f;HookApiTest,f']=function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,'HookApiTest,f');};` +
              `__hook__('()',__hook__(f,null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: '{ async function f() {return 1} f(); }',
            hooked: `{async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');}__hook__(f,null,[],'HookApiTest',0);}`,
            asynchronous: true,
          },
          {
            code: '{ with({}) { async function f() {return 1} f(); } }',
            hooked: `{with($hook$.with({},{})){async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');}` +
              `__hook__('w()',__with__,['f',[],(...args)=>f(...args)],'HookApiTest',false);}}`,
            asynchronous: true,
          },
          {
            code: 'async function f() {return 1} f();',
            hooked: `$hook$.global(__hook__,'HookApiTest,f','f','function')['_pp_f;HookApiTest,f']=async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');};` +
              `__hook__(f,null,[],'HookApiTest',0);`,
            asynchronous: true,
          },
          {
            code: `'use strict'; function f() { return 1; } f();`,
            hooked: `'use strict';$hook$.global(__hook__,'HookApiTest,f','f','#function')['S_pp_f;HookApiTest,f']=function f(){return __hook__(()=>{return 1;},null,arguments,'HookApiTest,f');};` +
              `__hook__(f,null,[],'HookApiTest',0);`,
          },
          {
            code: `{ function f() { 'use strict'; return Date; } f(); }`,
            hooked: `{function f(){'use strict';return __hook__(()=>{return $hook$.global(__hook__,'HookApiTest,f','Date','#get')['S_pp_Date;HookApiTest,f'];},null,arguments,'HookApiTest,f');}` +
              `__hook__(f,null,[],'HookApiTest',0);}`,
          },
          {
            code: `{ function undefined() {} function NaN() {} function Infinity() {} true;}`,
            hooked: `{function __unexpected_overridden_declaration_of_undefined__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_undefined__');}` +
              `function __unexpected_overridden_declaration_of_NaN__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_NaN__');}` +
              `function __unexpected_overridden_declaration_of_Infinity__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_Infinity__');}true;}`,
          },
          {
            code: `{ function f(undefined, NaN, Infinity) {} true; }`,
            hooked: `{function f(__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__){return __hook__((__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__)=>{},null,arguments,'HookApiTest,f');}true;}`,
          },
        ],
        FunctionExpression: [
          {
            code: '(function f() {return 1})',
            hooked: `(function f(){return __hook__(()=>{return 1;},null,arguments,\'${this.context},f\');});`,
            eval: 'call'
          },
          {
            code: '(function * f(v) {yield v})().next();',
            hooked: `__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: '{ with ({}) { (function * f(v) {yield v})().next(); } }',
            hooked: `{with($hook$.with({},{})){__hook__('()',` +
              `function*f(v){yield*__hook__(function*(v){yield __hook__('w.',__with__,['v',()=>v],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}(),['next',[]],'HookApiTest');}}`,
          },
          {
            code: `var f = function f() { 'use strict'; let o = {a:1}; o.a; Date; Date.now(); return o; }; f();`,
            hooked: `$hook$.global(__hook__,'HookApiTest','f','var')['_pp_f;HookApiTest']=` +
              `function f(){'use strict';return __hook__(()=>{let o={a:1};__hook__('#.',o,['a'],'HookApiTest,f');` +
              `$hook$.global(__hook__,'HookApiTest,f','Date','#get')['S_pp_Date;HookApiTest,f'];` +
              `__hook__('#()',Date,['now',[]],'HookApiTest,f');return o;},null,arguments,'HookApiTest,f');};` +
              `__hook__(f,null,[],'HookApiTest',0);`,
          },
          {
            code: `{ (function undefined() {}); (function NaN() {}); (function Infinity() {}); true;}`,
            hooked: `{(function __unexpected_overridden_declaration_of_undefined__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_undefined__');});` +
              `(function __unexpected_overridden_declaration_of_NaN__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_NaN__');});` +
              `(function __unexpected_overridden_declaration_of_Infinity__(){return __hook__(()=>{},null,arguments,'HookApiTest,__unexpected_overridden_declaration_of_Infinity__');});true;}`,
          },
          {
            code: `{ (function f(undefined, NaN, Infinity) {}); true; }`,
            hooked: `{(function f(__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__){return __hook__((__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__)=>{},null,arguments,'HookApiTest,f');});true;}`,
          },
        ],
        ArrowFunctionExpression: [
          {
            code: `{ p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; }`,
            hooked: `{(...args)=>__hook__(p=>p,null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{return p;},null,args,'HookApiTest'));` +
              `(...args)=>__hook__((p1,p2)=>[p1,p2],null,args,'HookApiTest');` +
              `(...args)=>__hook__((p1,p2)=>({p1:p1,p2:p2}),null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,'HookApiTest'));}`,
          },
          {
            code: `{ with({}) { p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; }; } }`,
            hooked: `{with($hook$.with({},{})){(...args)=>__hook__(p=>p,null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{return __hook__('w.',__with__,['p',()=>p],'HookApiTest',false);},null,args,'HookApiTest'));` +
              `(...args)=>__hook__((p1,p2)=>[__hook__('w.',__with__,['p1',()=>p1],'HookApiTest',false),__hook__('w.',__with__,['p2',()=>p2],'HookApiTest',false)],null,args,'HookApiTest');` +
              `(...args)=>__hook__((p1,p2)=>({p1:__hook__('w.',__with__,['p1',()=>p1],'HookApiTest,p1',false),p2:__hook__('w.',__with__,['p2',()=>p2],'HookApiTest,p2',false)}),null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,'HookApiTest'));}}`,
          },
          {
            code: `p => p; (p) => { return p; }; (p1, p2) => [p1, p2]; (p1, p2) => ({ p1: p1, p2: p2 }); (p) => { var v1; let v2; const v3 = 1; };`,
            hooked: `(...args)=>__hook__(p=>p,null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{return p;},null,args,'HookApiTest'));` +
              `(...args)=>__hook__((p1,p2)=>[p1,p2],null,args,'HookApiTest');` +
              `(...args)=>__hook__((p1,p2)=>({p1:p1,p2:p2}),null,args,'HookApiTest');` +
              `(...args)=>(__hook__(p=>{var v1;let v2;const v3=1;},null,args,'HookApiTest'));`,
          },
        ],
        ExpressionStatement: [
          { code: '1;', hooked: '1;' },
          { code: 'a;', hooked: 'a;', eval: 'throw', options: 'initialScope', customOptionParams: { initialScope: { a: true } } },
        ],
        BlockStatement: [
          // block scope
          { name: 'empty', code: '{}', hooked: '{}' },
          { name: 'block scope', code: '{ let a; }', hooked: '{let a;}' },
          // FunctionBody
          {
            name: 'FunctionBody',
            code: '(function f() {return 1})',
            hooked: `(function f(){return __hook__(()=>{return 1;},null,arguments,\'${this.context},f\');});`,
            eval: 'call'
          },
        ],
        DebuggerStatement: [
          { code: 'debugger;', hooked: 'debugger;', eval: () => true },
        ],
        WithStatement: [
          { name: 'simple', code: 'with ({a:1}) {a;}', hooked: `with($hook$.with({a:1},{})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}` },
          {
            name: 'nested',
            code: `var o0 = { z: 1 }; { with (o0) { let o1 = { a: 2 }; with (o1) { let o2 = { b: 3 }; with (o2) { a + b + z; } } } }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','o0','var')['_pp_o0;HookApiTest']={z:1};{` +
              `with($hook$.with($hook$.global(__hook__,'HookApiTest','o0','get')['_pp_o0;HookApiTest'],{})){let o1={a:2};` +
              `with($hook$.with(__hook__('w.',__with__,['o1',()=>o1],'HookApiTest',false),{o1:true},...__with__)){let o2={b:3};` +
              `with($hook$.with(__hook__('w.',__with__,['o2',()=>o2],'HookApiTest',false),{o2:true},...__with__)){` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)+` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)+` +
              `__hook__('w.',__with__,['z',()=>z],'HookApiTest',false);}}}}`,
          },
          {
            code: `{ let b = 1, o = { a: 1, b: 2, [Symbol.unscopables]: { b: true } }; with (o) { a + b; } }`,
            hooked: `{let b=1,o={a:1,b:2,[__hook__('.',Symbol,['unscopables'],'HookApiTest,o')]:{b:true}};` +
              `with($hook$.with(o,{b:true,o:true})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)+__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}}`,
          },
        ],
        ReturnStatement: [
          {
            code: '(function f() {return 1})',
            hooked: `(function f(){return __hook__(()=>{return 1;},null,arguments,\'${this.context},f\');});`,
            eval: 'call'
          },
        ],
        YieldExpression: [
          {
            code: '(function * f(v) {yield v;})().next(1);',
            hooked: `__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[1]],'HookApiTest');`,
          },
          {
            code: '{ with ({}) { (function * f(v) {yield v;})(1).next(); } }',
            hooked: `{with($hook$.with({},{})){__hook__('()',` +
              `function*f(v){yield*__hook__(function*(v){yield __hook__('w.',__with__,['v',()=>v],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}(1),['next',[]],'HookApiTest');}}`,
          },
          {
            code: '(function * f(v) {yield *v;})([1]).next();',
            hooked: `__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield*v;},this,arguments,'HookApiTest,f');},null,[[1]],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: '{ with ({}) { (function * f(v) {yield *v;})([1]).next(); } }',
            hooked: `{with($hook$.with({},{})){__hook__('()',` +
              `function*f(v){yield*__hook__(function*(v){yield*__hook__('w.',__with__,['v',()=>v],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}([1]),['next',[]],'HookApiTest');}}`,
          },
          {
            code: 'var a = 1; (function * f() {yield a;})().next();',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;` +
              `__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield $hook$.global(__hook__,'HookApiTest,f','a','get')['_pp_a;HookApiTest,f'];},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: 'var a = [1]; (function * f() {yield *a;})().next();',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=[1];` +
              `__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield*$hook$.global(__hook__,'HookApiTest,f','a','get')['_pp_a;HookApiTest,f'];},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: 'var a = 1; { with({}) { (function * f() {yield a;})().next(); } }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;` +
              `{with($hook$.with({},{})){__hook__('()',function*f(){yield*__hook__(function*(){yield __hook__('w.',__with__,['a',()=>a],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}(),['next',[]],'HookApiTest');}}`,
          },
          {
            code: 'var a = [1]; { with({}) { (function * f() {yield *a;})().next(); } }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=[1];` +
              `{with($hook$.with({},{})){__hook__('()',function*f(){yield*__hook__(function*(){yield*__hook__('w.',__with__,['a',()=>a],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}(),['next',[]],'HookApiTest');}}`,
          },
          {
            code: '(function * f(v) {yield;})().next();',
            hooked: `__hook__('()',__hook__(function*f(v){yield*__hook__(function*(v){yield;},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
        ],
        LabeledStatement: [
          {
            code: 'let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k;',
            hooked: 'let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;break label1;}}k;',
            options: 'initialScope', customOptionParams: { initialScope: { i: true, j: true, k: true } },
          },
        ],
        BreakStatement: [
          { name: 'no label', code: 'for (let i = 0; i < 3; i++) { break; }', hooked: 'for(let i=0;i<3;i++){break;}' },
          {
            name: 'labeled',
            code: 'let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; break label1; } } k;',
            hooked: 'let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;break label1;}}k;',
            options: 'initialScope', customOptionParams: { initialScope: { i: true, j: true, k: true } },
          },
        ],
        ContinueStatement: [
          { name: 'no label', code: 'for (let i = 0; i < 3; i++) { continue; }', hooked: 'for(let i=0;i<3;i++){continue;}' },
          {
            name: 'labeled',
            code: 'let i = 0, j = 0, k = 0; label1: while (i++ < 3) { k += i; label2: while (j++ < 3) { k += j; continue label1; } } k;',
            hooked: 'let i=0,j=0,k=0;label1:while(i++<3){k+=i;label2:while(j++<3){k+=j;continue label1;}}k;',
            options: 'initialScope', customOptionParams: { initialScope: { i: true, j: true, k: true } },
          },
        ],
        IfStatement: [
          {
            code: 'var a = 1; if (a) { a; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;if($hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']){$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];}`,
          },
          {
            code: 'var a = 0, b = 1; if (a) { a; } else { b; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=0,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=1;if($hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']){$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];}else{$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];}`,
          },
          {
            code: `{ let a = 1; with ({}) { if (a) { a; } } }`,
            hooked: `{let a=1;with($hook$.with({},{a:true})){if(__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}}}`,
          },
        ],
        SwitchStatement: [
          {
            code: 'var a = 1; switch (a) { case 1: 1; break; default: 2; break; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;switch($hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']){case 1:1;break;default:2;break;}`,
          },
          {
            code: '{ let a = 1; with({}) { switch (a) { case 1: 1; break; default: 2; break; } } }',
            hooked: `{let a=1;with($hook$.with({},{a:true})){switch(__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)){case 1:1;break;default:2;break;}}}`,
          },
        ],
        SwitchCase: [
          {
            code: 'var a = 1, b = 2; switch (a) { case b: 1; break; default: 2; break; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2;switch($hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']){case $hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']:1;break;default:2;break;}`,
          },
          {
            code: '{ let a = 1, b = 2; with ({}) { switch (a) { case b: 1; break; default: 2; break; } } }',
            hooked: `{let a=1,b=2;with($hook$.with({},{a:true,b:true})){` +
              `switch(__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)){case __hook__('w.',__with__,['b',()=>b],'HookApiTest',false):1;break;default:2;break;}}}`,
          },
        ],
        ThrowStatement: [
          {
            code: 'var a = 1; throw a;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;throw $hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];`,
            eval: 'throw',
          },
        ],
        TryStatement: [
          {
            code: 'try { x; } catch (e) { e.name; }',
            hooked: `try{$hook$.global(__hook__,'HookApiTest','x','get')['_pp_x;HookApiTest'];}catch(e){__hook__('.',e,['name'],'HookApiTest');}`,
          },
        ],
        WhileStatement: [
          {
            code: 'with({a: 2}) { while (a--) {}; a; }',
            hooked: `with($hook$.with({a:2},{})){while(__hook__('w--',__with__,['a',()=>a--],'HookApiTest',false)){};__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a: 2}) { while (a) { a -= 2; break; }; a; }',
            hooked: `with($hook$.with({a:2},{})){while(__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)){` +
              `__hook__('w-=',__with__,['a',2,v=>a-=v],'HookApiTest',false);break;};__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
        ],
        DoWhileStatement: [
          {
            code: 'with({a: 2}) { do { 1; } while (a--); a; }',
            hooked: `with($hook$.with({a:2},{})){do{1;}while(__hook__('w--',__with__,['a',()=>a--],'HookApiTest',false));__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
        ],
        ForStatement: [
          {
            code: 'with({a: 0, b: 2, c: 0}) { for(a;b;c) { break; } b; }',
            hooked: `with($hook$.with({a:0,b:2,c:0},{})){for(__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);__hook__('w.',__with__,['c',()=>c],'HookApiTest',false)){break;}__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}`,
          },
          {
            code: 'with({a: 0, b: 2, c: 0}) { for(a=1;b;c++) { break; } b; }',
            hooked: `with($hook$.with({a:0,b:2,c:0},{})){for(__hook__('w=',__with__,['a',1,v=>a=v],'HookApiTest',false);__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);__hook__('w++',__with__,['c',()=>c++],'HookApiTest',false)){break;}__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}`,
          },
          {
            code: 'with({b: 2, c: 0}) { for(let a=1;b>c;c++) { break; } c; }',
            hooked: `with($hook$.with({b:2,c:0},{})){for(let a=1;__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)>__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);__hook__('w++',__with__,['c',()=>c++],'HookApiTest',false)){break;}__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);}`,
          },
          {
            code: 'var [a,b,c] = [0,2,0]; for(a;b;c) { break; } b;',
            hooked: `[$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'],$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']]=[0,2,0];for($hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest']){break;}$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `for (var i = 1, j = 2; i < j; i++) {}`,
            hooked: `for($hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest']=2;` +
              `$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']<$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];$hook$.global(__hook__,'HookApiTest','i','set')['_pp_i;HookApiTest']++){}`,
          }
        ],
        ForInStatement: [
          {
            code: 'with({a: 0, b: {x:1,y:2}}) { let c = 0; for (a in b) { c += b[a]; } c; }',
            hooked: `with($hook$.with({a:0,b:{x:1,y:2}},{})){let c=0;for(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest',false)['=']in __hook__('*',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),[],'HookApiTest')){__hook__('w+=',__with__,['c',__hook__('.',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)],'HookApiTest'),v=>c+=v],'HookApiTest',false);}__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);}`,
          },
        ],
        ForOfStatement: [
          {
            code: `{ let a, b = [1, 2], c = 0; for (a of b) { c += a; } }`,
            hooked: `{let a,b=[1,2],c=0;for(a of __hook__('*',b,[],'HookApiTest')){c+=a;}}`,
          },
          {
            code: `{ let b = [1, 2], c = 0; for (let a of b) { c += a; } }`,
            hooked: `{let b=[1,2],c=0;for(let a of __hook__('*',b,[],'HookApiTest')){c+=a;}}`,
          },
          {
            code: `{ with ({a:0,b:[1, 2],c:0}) { for (a of b) { c += a; } } }`,
            hooked: `{with($hook$.with({a:0,b:[1,2],c:0},{})){for(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest',false)['=']of __hook__('*',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),[],'HookApiTest')){__hook__('w+=',__with__,['c',__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),v=>c+=v],'HookApiTest',false);}}}`,
          },
          {
            code: `{ with ({b:[1, 2],c:0}) { for (let a of b) { c += a; } } }`,
            hooked: `{with($hook$.with({b:[1,2],c:0},{})){for(let a of __hook__('*',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),[],'HookApiTest')){__hook__('w+=',__with__,['c',__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),v=>c+=v],'HookApiTest',false);}}}`,
          },
          {
            code: `var a, b = [1, 2], c = 0; for (a of b) { c += a; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']=0;for($hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],[],'HookApiTest')){$hook$.global(__hook__,'HookApiTest','c','set')['_pp_c;HookApiTest']+=$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];}`,
          },
          {
            code: `var b = [1, 2], c = 0; for (let a of b) { c += a; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']=0;for(let a of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],[],'HookApiTest')){$hook$.global(__hook__,'HookApiTest','c','set')['_pp_c;HookApiTest']+=a;}`,
          },
          {
            code: `var b = [1, 2], c = 0; for (var a of b) { c += a; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']=0;` +
              `for($hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],[],'HookApiTest')){` +
              `$hook$.global(__hook__,'HookApiTest','c','set')['_pp_c;HookApiTest']+=$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];}`,
          },
          {
            code: `'use strict'; var b = [1, 2], c = 0; for (var a of b) { c += a; }`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest','b','#var')['S_pp_b;HookApiTest']=[1,2],` +
              `$hook$.global(__hook__,'HookApiTest','c','#var')['S_pp_c;HookApiTest']=0;` +
              `for($hook$.global(__hook__,'HookApiTest','a','#var')['S_pp_a;HookApiTest']of __hook__('#*',$hook$.global(__hook__,'HookApiTest','b','#get')['S_pp_b;HookApiTest'],[],'HookApiTest')){` +
              `$hook$.global(__hook__,'HookApiTest','c','#set')['S_pp_c;HookApiTest']+=$hook$.global(__hook__,'HookApiTest','a','#get')['S_pp_a;HookApiTest'];}`,
          },
        ],
        VariableDeclaration: [
          {
            code: 'var a = 2; a;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=2;$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];`,
          },
          {
            code: '{ let a = 3; a; }',
            hooked: `{let a=3;a;}`,
          },
          {
            code: '{ const a = 4; a; }',
            hooked: `{const a=4;a;}`,
          },
          {
            code: 'let a = 3;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','let')['_pp_a;HookApiTest']=3;`,
            eval: () => true,
          },
          {
            code: `'use strict'; var g = 1; g = 2; g;`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest','g','#var')['S_pp_g;HookApiTest']=1;` +
              `$hook$.global(__hook__,'HookApiTest','g','#set')['S_pp_g;HookApiTest']=2;` +
              `$hook$.global(__hook__,'HookApiTest','g','#get')['S_pp_g;HookApiTest'];`,
          },
          {
            code: 'const constantVariable = 4; { let a = constantVariable; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','constantVariable','const')['_pp_constantVariable;HookApiTest']=4;` +
              `{let a=$hook$.global(__hook__,'HookApiTest,a','constantVariable','get')['_pp_constantVariable;HookApiTest,a'];}`,
            eval: (script) => { if (script.toString().indexOf('__hook__') >= 0) { HookApiTest.nativeEval(script); } return true; },
          },
          {
            code: '(function () { var a = 10; return a; })',
            hooked: `(function(){return __hook__(()=>{var a=10;return a;},null,arguments,'HookApiTest');});`,
            eval: 'call',
          },
          {
            name: 'assuming globalVariable1 has been declared',
            code: `let globalVariable1 = 2; undefined;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','globalVariable1','let')['_pp_globalVariable1;HookApiTest']=2;$hook$.global(__hook__,'HookApiTest','undefined','get')['_pp_undefined;HookApiTest'];`,
            eval: (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } },
          },
          {
            name: 'assuming globalVariable1 has been declared',
            code: `const globalVariable1 = 2; undefined;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','globalVariable1','const')['_pp_globalVariable1;HookApiTest']=2;$hook$.global(__hook__,'HookApiTest','undefined','get')['_pp_undefined;HookApiTest'];`,
            eval: (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } },
          },
          {
            name: 'assuming globalVariable1 has been declared',
            code: `class globalVariable1 {}; undefined;`,
            hooked: `$hook$.global(__hook__,'HookApiTest,globalVariable1','globalVariable1','class')['_pp_globalVariable1;HookApiTest,globalVariable1']=class globalVariable1{};;$hook$.global(__hook__,'HookApiTest','undefined','get')['_pp_undefined;HookApiTest'];`,
            eval: (script) => { try { HookApiTest.nativeEval('var globalVariable1 = 1;' + script) } catch (e) { return e.name; } },
          },
          {
            code: `{ let undefined, NaN, Infinity; }`,
            hooked: `{let __unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__;}`,
          },
          {
            code: `{ let undefined = 1, NaN = 2, Infinity = 3; }`,
            hooked: `{let __unexpected_overridden_declaration_of_undefined__=1,__unexpected_overridden_declaration_of_NaN__=2,__unexpected_overridden_declaration_of_Infinity__=3;}`,
          },
        ],
        VariableDeclarator: [
          {
            code: `{ let a = {p:1}, b = a, c = a.p; [a,b,c];}`,
            hooked: `{let a={p:1},b=a,c=__hook__('.',a,['p'],'HookApiTest,c');[a,b,c];}`,
          },
          {
            code: `{ with ({}) { let a = {p:1}, b = a, c = a.p; [a,b,c]; } }`,
            hooked: `{with($hook$.with({},{})){let a={p:1},b=__hook__('w.',__with__,['a',()=>a],'HookApiTest,b',false),` +
              `c=__hook__('.',__hook__('w.',__with__,['a',()=>a],'HookApiTest,c',false),['p'],'HookApiTest,c');` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false)];}}`,
          },
          {
            code: `var a = {p:1}, b = a, c = a.p; [a,b,c];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']={p:1},` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']=__hook__('.',a,['p'],'HookApiTest');` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest']];`,
          },
        ],
        ThisExpression: [
          { code: 'this === window', hooked: `this===$hook$.global(__hook__,'HookApiTest','window','get')['_pp_window;HookApiTest'];` },
        ],
        ArrayExpression: [
          { name: 'empty Array', code: `[]`, hooked: `[];` },
          { name: 'Array', code: `[1,'a',true]`, hooked: `[1,'a',true];` },
          { name: 'Array', code: `[1,,true]`, hooked: `[1,,true];` },
        ],
        ArrayPattern: [
          {
            code: `{ let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; }`,
            hooked: `{let [a,b=a,[c],{_d:d}]=[1,2,[3],{_d:4}];[a,b,c,d];}`,
          },
          {
            code: `{ with ({}) { let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }`,
            hooked: `{with($hook$.with({},{})){` +
              `let [a,b=__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),[c],{_d:d}]=[1,2,[3],{_d:4}];` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),` +
              `__hook__('w.',__with__,['d',()=>d],'HookApiTest',false)];}}`,
          },
          {
            code: `var [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d];`,
            hooked: `[$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `[$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']],` +
              `{_d:$hook$.global(__hook__,'HookApiTest,_d','d','var')['_pp_d;HookApiTest,_d']}]=[1,2,[3],{_d:4}];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','get')['_pp_d;HookApiTest']];`,
          },
          {
            code: `{ let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; }`,
            hooked: `{let a,b,c,d,e={};[a,b=a,[c],{_d:d},__hook__('.=',e,['p'],'HookApiTest')['=']]=[1,2,[3],{_d:4},5];[a,b,c,d,__hook__('.',e,['p'],'HookApiTest')];}`,
          },
          {
            code: `{ with ({}) { let a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p]; } }`,
            hooked: `{with($hook$.with({},{})){let a,b,c,d,e={};` +
              `[__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest',false)['='],` +
              `__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],'HookApiTest',false)['=']=__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `[__hook__('w.=',__with__,['c',{set ['='](v){c=v;},get ['='](){return c;}}],'HookApiTest',false)['=']],` +
              `{_d:__hook__('w.=',__with__,['d',{set ['='](v){d=v;},get ['='](){return d;}}],'HookApiTest,_d',false)['=']},` +
              `__hook__('.=',__hook__('w.',__with__,['e',()=>e],'HookApiTest',false),['p'],'HookApiTest')['=']]=[1,2,[3],{_d:4},5];` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),` +
              `__hook__('w.',__with__,['d',()=>d],'HookApiTest',false),` +
              `__hook__('.',__hook__('w.',__with__,['e',()=>e],'HookApiTest',false),['p'],'HookApiTest')];}}`,
          },
          {
            code: `var a,b,c,d,e = {}; [a, b = a, [c], {_d: d}, e.p] = [1, 2, [3], {_d:4}, 5]; [a,b,c,d,e.p];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','var')['_pp_d;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','e','var')['_pp_e;HookApiTest']={};` +
              `[$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','set')['_pp_b;HookApiTest']=$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `[$hook$.global(__hook__,'HookApiTest','c','set')['_pp_c;HookApiTest']],` +
              `{_d:$hook$.global(__hook__,'HookApiTest,_d','d','set')['_pp_d;HookApiTest,_d']},` +
              `__hook__('.=',e,['p'],'HookApiTest')['=']]=[1,2,[3],{_d:4},5];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','get')['_pp_d;HookApiTest'],` +
              `__hook__('.',e,['p'],'HookApiTest')];`,
          },
          {
            code: `{ function * f([a,b,{c=3},[d=4],...[...e]]) { yield * [a,b,c,d,...e]; } let x = []; for (let v of f([1,2,{y:3},[],5,6])) { x.push(v); } x; }`,
            hooked: `{function*f(...args){yield*__hook__(function*([a,b,{c=3},[d=4],...[...e]]){yield*[a,b,c,d,...e];},this,args,'HookApiTest,f');}` +
              `let x=[];for(let v of __hook__('*',__hook__(f,null,[[1,2,{y:3},[],5,6]],'HookApiTest',0),[],'HookApiTest')){__hook__('()',x,['push',[v]],'HookApiTest');}x;}`,
          },
          {
            code: `{ function f(a,b,{y:{xy:yy=7,zy:zy=8,zz=2,uu},c=3},[d=4],...[...e]) { return [a,b,yy,zz,uu,c,d,...e]; } f(1,2,{y:{xy:9,uu:0}},[],5,6); }`,
            hooked: `{function f(a,b,{y:{xy:yy,zy:zy,zz,uu},c},[d],...[...e]){` +
              `return __hook__((a,b,{y:{xy:yy=7,zy:zy=8,zz=2,uu},c=3},[d=4],...[...e])=>{return[a,b,yy,zz,uu,c,d,...e];},null,arguments,'HookApiTest,f');}` +
              `__hook__(f,null,[1,2,{y:{xy:9,uu:0}},[],5,6],'HookApiTest',0);}`,
          },
          {
            code: `{ function f([a,,[b]]) { let [c,,[d]] = [4,5,[6]]; let e, g; [e,,[g]] = [7,8,[9]]; return [a,b,c,d,e,g]; } f([1,2,[3]]); }`,
            hooked: `{function f(...args){return __hook__(([a,,[b]])=>{let [c,,[d]]=[4,5,[6]];let e,g;[e,,[g]]=[7,8,[9]];return[a,b,c,d,e,g];},null,args,'HookApiTest,f');}` +
              `__hook__(f,null,[[1,2,[3]]],'HookApiTest',0);}`,
          },
          {
            code: `{ let result = 0; for (var [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }`,
            hooked: `{let result=0;for(` +
              `[$hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest']]of ` +
              `__hook__('*',[[1,2],[3,4]],[],'HookApiTest')){result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; }`,
            hooked: `{let result=0;for(let [i,j]of __hook__('*',[[1,2],[3,4]],[],'HookApiTest')){result+=i+j;}result;}`,
          },
          {
            code: `{ let result = 0; var i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }`,
            hooked: `{let result=0;$hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest'];` +
              `for([$hook$.global(__hook__,'HookApiTest','i','set')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','set')['_pp_j;HookApiTest']]` +
              `of __hook__('*',[[1,2],[3,4]],[],'HookApiTest')){result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; let i,j; for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; }`,
            hooked: `{let result=0;let i,j;for([i,j]of __hook__('*',[[1,2],[3,4]],[],'HookApiTest')){result+=i+j;}result;}`,
          },
          {
            code: `{ let result = 0; for (var [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }`,
            hooked: `{let result=0;for(` +
              `[$hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest']]=[3,4];` +
              `$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']&&$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','i','set')['_pp_i;HookApiTest']--,$hook$.global(__hook__,'HookApiTest','j','set')['_pp_j;HookApiTest']--)` +
              `{result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }`,
            hooked: `{let result=0;for(let [i,j]=[3,4];i&&j;i--,j--){result+=i+j;}result;}`,
          },
          {
            code: `{ let result = 0; var i,j; for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; }`,
            hooked: `{let result=0;$hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest'];` +
              `for([$hook$.global(__hook__,'HookApiTest','i','set')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','set')['_pp_j;HookApiTest']]=[3,4];` +
              `$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']&&$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','i','set')['_pp_i;HookApiTest']--,$hook$.global(__hook__,'HookApiTest','j','set')['_pp_j;HookApiTest']--)` +
              `{result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; with({}) { for (let [i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }`,
            hooked: `{let result=0;with($hook$.with({},{result:true})){for(let [i,j]=[3,4];` +
              `__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)&&__hook__('w.',__with__,['j',()=>j],'HookApiTest',false);` +
              `__hook__('w--',__with__,['i',()=>i--],'HookApiTest',false),__hook__('w--',__with__,['j',()=>j--],'HookApiTest',false))` +
              `{__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)+__hook__('w.',__with__,['j',()=>j],'HookApiTest',false),v=>result+=v],'HookApiTest',false);}__hook__('w.',__with__,['result',()=>result],'HookApiTest',false);}}`,
          },
          {
            code: `{ let result = 0; let i, j; with({}) { for ([i,j] = [3,4]; i && j; i--, j--) { result += i + j; } result; } }`,
            hooked: `{let result=0;let i,j;with($hook$.with({},{result:true,i:true,j:true})){` +
              `for([__hook__('w.=',__with__,['i',{set ['='](v){i=v;},get ['='](){return i;}}],'HookApiTest',false)['='],__hook__('w.=',__with__,['j',{set ['='](v){j=v;},get ['='](){return j;}}],'HookApiTest',false)['=']]=[3,4];` +
              `__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)&&__hook__('w.',__with__,['j',()=>j],'HookApiTest',false);` +
              `__hook__('w--',__with__,['i',()=>i--],'HookApiTest',false),__hook__('w--',__with__,['j',()=>j--],'HookApiTest',false))` +
              `{__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)+` +
              `__hook__('w.',__with__,['j',()=>j],'HookApiTest',false),v=>result+=v],'HookApiTest',false);}` +
              `__hook__('w.',__with__,['result',()=>result],'HookApiTest',false);}}`,
          },
          {
            code: `{ let result = 0; with ({}) { for (let [i,j] of [[1,2],[3,4]]) { result += i + j; } result; } }`,
            hooked: `{let result=0;with($hook$.with({},{result:true})){for(let [i,j]of __hook__('*',[[1,2],[3,4]],[],'HookApiTest')){` +
              `__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)+` +
              `__hook__('w.',__with__,['j',()=>j],'HookApiTest',false),v=>result+=v],'HookApiTest',false);}__hook__('w.',__with__,['result',()=>result],'HookApiTest',false);}}`,
          },
          {
            code: `{ let result = 0; let i,j; with ({}) { for ([i,j] of [[1,2],[3,4]]) { result += i + j; } result; } } `,
            hooked: `{let result=0;let i,j;with($hook$.with({},{result:true,i:true,j:true})){` +
              `for([__hook__('w.=',__with__,['i',{set ['='](v){i=v;},get ['='](){return i;}}],'HookApiTest',false)['='],` +
              `__hook__('w.=',__with__,['j',{set ['='](v){j=v;},get ['='](){return j;}}],'HookApiTest',false)['=']]` +
              `of __hook__('*',[[1,2],[3,4]],[],'HookApiTest')){` +
              `__hook__('w+=',__with__,['result',__hook__('w.',__with__,['i',()=>i],'HookApiTest',false)+` +
              `__hook__('w.',__with__,['j',()=>j],'HookApiTest',false),v=>result+=v],'HookApiTest',false);}` +
              `__hook__('w.',__with__,['result',()=>result],'HookApiTest',false);}}`,
          },
          {
            code: `{ let [undefined,NaN,Infinity] = [1,2,3]; }`,
            hooked: `{let [__unexpected_overridden_declaration_of_undefined__,__unexpected_overridden_declaration_of_NaN__,__unexpected_overridden_declaration_of_Infinity__]=[1,2,3];}`,
          },
        ],
        RestElement: [
          {
            code: `{ let [...a] = [1,2,3]; a; }`,
            hooked: `{let [...a]=[1,2,3];a;}`,
          },
          {
            code: `{ let a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; }`,
            hooked: `{let a,b,c={},d={},e,f=[];[...a]=[...[b]]=[...(__hook__('.=',c,['p'],'HookApiTest'))['=']]=[...[__hook__('.=',d,['p'],'HookApiTest')['=']]]=[...[...e]]=[...[__hook__('.=',f,[0],'HookApiTest')['='],__hook__('.=',f,[1],'HookApiTest')['='],__hook__('.=',f,[2],'HookApiTest')['=']]]=[1,2,3];[a,b,c,d,e,f];}`,
          },
          {
            code: `{ with ({}) { let [...a] = [1,2,3]; a; } }`,
            hooked: `{with($hook$.with({},{})){let [...a]=[1,2,3];__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}}`,
          },
          {
            code: `{ with ({a:0,b:0,c:{},d:{},e:0,f:[]}) { [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f]; } }`,
            hooked: `{with($hook$.with({a:0,b:0,c:{},d:{},e:0,f:[]},{})){` +
              `[...(__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest',false))['=']]=` +
              `[...[__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],'HookApiTest',false)['=']]]=` +
              `[...(__hook__('.=',__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),['p'],'HookApiTest'))['=']]=` +
              `[...[__hook__('.=',__hook__('w.',__with__,['d',()=>d],'HookApiTest',false),['p'],'HookApiTest')['=']]]=` +
              `[...[...(__hook__('w.=',__with__,['e',{set ['='](v){e=v;},get ['='](){return e;}}],'HookApiTest',false))['=']]]=` +
              `[...[__hook__('.=',__hook__('w.',__with__,['f',()=>f],'HookApiTest',false),[0],'HookApiTest')['='],` +
              `__hook__('.=',__hook__('w.',__with__,['f',()=>f],'HookApiTest',false),[1],'HookApiTest')['='],` +
              `__hook__('.=',__hook__('w.',__with__,['f',()=>f],'HookApiTest',false),[2],'HookApiTest')['=']]]=[1,2,3];` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),` +
              `__hook__('w.',__with__,['d',()=>d],'HookApiTest',false),` +
              `__hook__('w.',__with__,['e',()=>e],'HookApiTest',false),` +
              `__hook__('w.',__with__,['f',()=>f],'HookApiTest',false)];}}`,
          },
          {
            code: `var [...a] = [1,2,3]; a;`,
            hooked: `[...($hook$.global(__hook__,'HookApiTest','a','var'))['_pp_a;HookApiTest']]=[1,2,3];$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'];`,
          },
          {
            code: `var a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']={},` +
              `$hook$.global(__hook__,'HookApiTest','d','var')['_pp_d;HookApiTest']={},` +
              `$hook$.global(__hook__,'HookApiTest','e','var')['_pp_e;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','f','var')['_pp_f;HookApiTest']=[];` +
              `[...($hook$.global(__hook__,'HookApiTest','a','set'))['_pp_a;HookApiTest']]=` +
              `[...[$hook$.global(__hook__,'HookApiTest','b','set')['_pp_b;HookApiTest']]]=` +
              `[...(__hook__('.=',c,['p'],'HookApiTest'))['=']]=` +
              `[...[__hook__('.=',d,['p'],'HookApiTest')['=']]]=` +
              `[...[...($hook$.global(__hook__,'HookApiTest','e','set'))['_pp_e;HookApiTest']]]=` +
              `[...[__hook__('.=',f,[0],'HookApiTest')['='],` +
              `__hook__('.=',f,[1],'HookApiTest')['='],` +
              `__hook__('.=',f,[2],'HookApiTest')['=']]]=[1,2,3];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','get')['_pp_d;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','e','get')['_pp_e;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','f','get')['_pp_f;HookApiTest']];`,
          },
          {
            code: `{ function f(...a) { return a; } f(1,2,3); }`,
            hooked: `{function f(...a){return __hook__((...a)=>{return a;},null,arguments,'HookApiTest,f');}__hook__(f,null,[1,2,3],'HookApiTest',0);}`,
          },
          {
            code: `{ (function f(...a) { return a; })(1,2,3); }`,
            hooked: `{__hook__(function f(...a){return __hook__((...a)=>{return a;},null,arguments,'HookApiTest,f');},null,[1,2,3],'HookApiTest',0);}`,
          },
          {
            code: `{ ((...a) => a)(1,2,3); }`,
            hooked: `{__hook__((...args)=>__hook__((...a)=>a,null,args,'HookApiTest'),null,[1,2,3],'HookApiTest',0);}`,
          },
          {
            code: `{ function f([...a]) { return a; } f([1,2,3]); }`,
            hooked: `{function f(...args){return __hook__(([...a])=>{return a;},null,args,'HookApiTest,f');}__hook__(f,null,[[1,2,3]],'HookApiTest',0);}`,
          },
          {
            code: `{ (function f([...a]) { return a; })([1,2,3]); }`,
            hooked: `{__hook__(function f(...args){return __hook__(([...a])=>{return a;},null,args,'HookApiTest,f');},null,[[1,2,3]],'HookApiTest',0);}`,
          },
          {
            code: `{ (([...a]) => a)([1,2,3]); }`,
            hooked: `{__hook__((...args)=>__hook__(([...a])=>a,null,args,'HookApiTest'),null,[[1,2,3]],'HookApiTest',0);}`,
          },
          {
            code: `{ let [...undefined] = [], [...NaN] = [], [...Infinity] = []; true; }`,
            hooked: `{let [...__unexpected_overridden_declaration_of_undefined__]=[],[...__unexpected_overridden_declaration_of_NaN__]=[],[...__unexpected_overridden_declaration_of_Infinity__]=[];true;}`,
          },
        ],
        ExperimentalRestProperty: [
          {
            code: `{ let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; }`,
            hooked: `{let {p1,...b}={p1:1,p2:2,p3:3};[p1,b];}`,
          },
          {
            code: `{ with ({}) { let {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b]; } }`,
            hooked: `{with($hook$.with({},{})){let {p1,...b}={p1:1,p2:2,p3:3};` +
              `[__hook__('w.',__with__,['p1',()=>p1],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)];}}`,
          },
          {
            code: `var {p1, ...b} = {p1: 1, p2: 2, p3: 3}; [p1, b];`,
            hooked: `({p1:$hook$.global(__hook__,'HookApiTest,p1','p1','var')['_pp_p1;HookApiTest,p1'],...($hook$.global(__hook__,'HookApiTest','b','var'))['_pp_b;HookApiTest']}=` +
              `{p1:1,p2:2,p3:3});` +
              `[$hook$.global(__hook__,'HookApiTest','p1','get')['_pp_p1;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']];`,
          },
          {
            code: `{ let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }`,
            hooked: `{let p1,b;({p1,...b}={p1:1,p2:2,p3:3});[p1,b];}`,
          },
          {
            code: `{ with ({}) { let p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }`,
            hooked: `{with($hook$.with({},{})){let p1,b;` +
              `({p1:__hook__('w.=',__with__,['p1',{set ['='](v){p1=v;},get ['='](){return p1;}}],'HookApiTest,p1',false)['='],` +
              `...(__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],'HookApiTest',false))['=']}={p1:1,p2:2,p3:3});` +
              `[__hook__('w.',__with__,['p1',()=>p1],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)];}}`,
          },
          {
            code: `var p1, b; ({p1, ...b} = {p1: 1, p2: 2, p3: 3}); [p1, b];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','p1','var')['_pp_p1;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'];` +
              `({p1:$hook$.global(__hook__,'HookApiTest,p1','p1','set')['_pp_p1;HookApiTest,p1'],` +
              `...($hook$.global(__hook__,'HookApiTest','b','set'))['_pp_b;HookApiTest']}={p1:1,p2:2,p3:3});` +
              `[$hook$.global(__hook__,'HookApiTest','p1','get')['_pp_p1;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']];`,
          },
          {
            code: `{ let p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; }`,
            hooked: `{let p1,b={};({p1,...(__hook__('.=',b,['p'],'HookApiTest'))['=']}={p1:1,p2:2,p3:3});[p1,b];}`,
          },
          {
            code: `{ with ({p1:0,b:{}}) { ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b]; } }`,
            hooked: `{with($hook$.with({p1:0,b:{}},{})){` +
              `({p1:__hook__('w.=',__with__,['p1',{set ['='](v){p1=v;},get ['='](){return p1;}}],'HookApiTest,p1',false)['='],` +
              `...(__hook__('.=',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),['p'],'HookApiTest'))['=']}={p1:1,p2:2,p3:3});` +
              `[__hook__('w.',__with__,['p1',()=>p1],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)];}}`,
          },
          {
            code: `var p1, b = {}; ({p1, ...b.p} = {p1: 1, p2: 2, p3: 3}); [p1, b];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','p1','var')['_pp_p1;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']={};` +
              `({p1:$hook$.global(__hook__,'HookApiTest,p1','p1','set')['_pp_p1;HookApiTest,p1'],` +
              `...(__hook__('.=',b,['p'],'HookApiTest'))['=']}={p1:1,p2:2,p3:3});` +
              `[$hook$.global(__hook__,'HookApiTest','p1','get')['_pp_p1;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']];`,
          },
          {
            code: `{ function f() { let {...p} = { a: 1 }; return p; } f(); }`,
            hooked: `{function f(){return __hook__(()=>{let {...p}={a:1};return p;},null,arguments,'HookApiTest,f');}__hook__(f,null,[],'HookApiTest',0);}`,
          },
          {
            code: `{ function f({...p}) { return p; } f({a:1}); }`,
            hooked: `{function f({...p}){return __hook__(({...p})=>{return p;},null,arguments,'HookApiTest,f');}__hook__(f,null,[{a:1}],'HookApiTest',0);}`,
          },
          {
            code: `var {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true;`,
            hooked: `({...($hook$.global(__hook__,'HookApiTest','__unexpected_overridden_declaration_of_undefined__','var'))['_pp___unexpected_overridden_declaration_of_undefined__;HookApiTest']}={},{...($hook$.global(__hook__,'HookApiTest','__unexpected_overridden_declaration_of_NaN__','var'))['_pp___unexpected_overridden_declaration_of_NaN__;HookApiTest']}={},{...($hook$.global(__hook__,'HookApiTest','__unexpected_overridden_declaration_of_Infinity__','var'))['_pp___unexpected_overridden_declaration_of_Infinity__;HookApiTest']}={});true;`,
          },
          {
            code: `{ let {...undefined} = {}, {...NaN} = {}, {...Infinity} = {}; true; }`,
            hooked: `{let {...__unexpected_overridden_declaration_of_undefined__}={},{...__unexpected_overridden_declaration_of_NaN__}={},{...__unexpected_overridden_declaration_of_Infinity__}={};true;}`,
          },
        ],
        SpreadElement: [
          {
            code: `{ let a = [3, 4]; [1, 2, ...a] }`,
            hooked: `{let a=[3,4];[1,2,...a];}`,
          },
          {
            code: `{ with ({a:[3, 4]}) { [1, 2, ...a] } }`,
            hooked: `{with($hook$.with({a:[3,4]},{})){[1,2,...__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)];}}`,
          },
          {
            code: `var a = [3, 4]; [1, 2, ...a]`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=[3,4];[1,2,...$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']];`,
          },
          {
            code: `{ let a = [3, 4], f = a => a; f(1, 2, ...a); }`,
            hooked: `{let a=[3,4],f=(...args)=>__hook__(a=>a,null,args,'HookApiTest,f');__hook__(f,null,[1,2,...a],'HookApiTest',0);}`,
          },
          {
            code: `{ let a = [3, 4], f = a => a; with ({}) { f(1, 2, ...a); } }`,
            hooked: `{let a=[3,4],f=(...args)=>__hook__(a=>a,null,args,'HookApiTest,f');with($hook$.with({},{a:true,f:true})){` +
              `__hook__('w()',__with__,['f',[1,2,...__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)],(...args)=>f(...args)],'HookApiTest',false);}}`,
          },
          {
            code: `var a = [3, 4], f = a => a; f(1, 2, ...a);`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=[3,4],` +
              `$hook$.global(__hook__,'HookApiTest','f','var')['_pp_f;HookApiTest']=(...args)=>__hook__(a=>a,null,args,'HookApiTest');` +
              `__hook__(f,null,[1,2,...$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']],'HookApiTest',0);`,
          },
        ],
        ExperimentalSpreadProperty: [
          {
            code: `{ let o = {a:1,b:2}; o = {c:3,...o}; }`,
            hooked: `{let o={a:1,b:2};o={c:3,...__hook__('*',o,[],'HookApiTest')};}`,
          },
          {
            code: `{ with ({o:{a:1,b:2}}) { o = {c:3,...o}; } }`,
            hooked: `{with($hook$.with({o:{a:1,b:2}},{})){` +
              `__hook__('w=',__with__,['o',{c:3,...__hook__('*',__hook__('w.',__with__,['o',()=>o],'HookApiTest',false),[],'HookApiTest')},v=>o=v],'HookApiTest',false);}}`,
          },
          {
            code: `var o = {a:1,b:2}; o = {c:3,...o};`,
            hooked: `$hook$.global(__hook__,'HookApiTest','o','var')['_pp_o;HookApiTest']={a:1,b:2};` +
              `$hook$.global(__hook__,'HookApiTest','o','set')['_pp_o;HookApiTest']={c:3,...__hook__('*',$hook$.global(__hook__,'HookApiTest','o','get')['_pp_o;HookApiTest'],[],'HookApiTest')};`,
          },
          {
            code: `{ let o = {a:1,b:{c:4}}; o = {c:3,...o.b}; }`,
            hooked: `{let o={a:1,b:{c:4}};o={c:3,...__hook__('*',__hook__('.',o,['b'],'HookApiTest'),[],'HookApiTest')};}`,
          },
          {
            code: `{ with ({o:{a:1,b:{c:4}}}) { o = {c:3,...o.b}; } }`,
            hooked: `{with($hook$.with({o:{a:1,b:{c:4}}},{})){` +
              `__hook__('w=',__with__,['o',{c:3,` +
              `...__hook__('*',__hook__('.',__hook__('w.',__with__,['o',()=>o],'HookApiTest',false),['b'],'HookApiTest'),[],'HookApiTest')},v=>o=v],'HookApiTest',false);}}`,
          },
          {
            code: `var o = {a:1,b:{c:4}}; o = {c:3,...o.b};`,
            hooked: `$hook$.global(__hook__,'HookApiTest','o','var')['_pp_o;HookApiTest']={a:1,b:{c:4}};` +
              `$hook$.global(__hook__,'HookApiTest','o','set')['_pp_o;HookApiTest']={c:3,...__hook__('*',__hook__('.',o,['b'],'HookApiTest'),[],'HookApiTest')};`,
          },
          {
            code: `'use strict'; var o = {a:1}; ({b:2,...o});`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest','o','#var')['S_pp_o;HookApiTest']={a:1};({b:2,...__hook__('#*',$hook$.global(__hook__,'HookApiTest','o','#get')['S_pp_o;HookApiTest'],[],'HookApiTest')});`,
          },
        ],
        ObjectExpression: [
          { name: 'Object', code: `({})`, hooked: `({});` },
          { name: 'Object', code: `({a:1,b:2})`, hooked: `({a:1,b:2});` },
          {
            name: 'accessors',
            code: `({get a() { return 1; }, set a(v) { this._a = v; }}).a`,
            hooked: `__hook__('.',{get a(){return __hook__(()=>{return 1;},null,arguments,'HookApiTest,get a');},set a(v){return __hook__(v=>{__hook__('=',this,['_a',v],'HookApiTest,set a');},null,arguments,'HookApiTest,set a');}},['a'],'HookApiTest');`,
          },
        ],
        ObjectPattern: [
          {
            code: `{ let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; }`,
            hooked: `{let {_a:a,_b:b=a,c,_d:[d],_e:{_f:f},_g:o}={_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6};[a,b,c,d,f,o];}`,
          },
          {
            code: `{ with ({}) { let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; } }`,
            hooked: `{with($hook$.with({},{})){` +
              `let {_a:a,_b:b=__hook__('w.',__with__,['a',()=>a],'HookApiTest,_b',false),c,_d:[d],_e:{_f:f},_g:o}=` +
              `{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6};` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),` +
              `__hook__('w.',__with__,['d',()=>d],'HookApiTest',false),` +
              `__hook__('w.',__with__,['f',()=>f],'HookApiTest',false),` +
              `__hook__('w.',__with__,['o',()=>o],'HookApiTest',false)];}}`,
          },
          {
            code: `var { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o];`,
            hooked: `({_a:$hook$.global(__hook__,'HookApiTest,_a','a','var')['_pp_a;HookApiTest,_a'],` +
              `_b:$hook$.global(__hook__,'HookApiTest,_b','b','var')['_pp_b;HookApiTest,_b']=$hook$.global(__hook__,'HookApiTest,_b','a','get')['_pp_a;HookApiTest,_b'],` +
              `c:$hook$.global(__hook__,'HookApiTest,c','c','var')['_pp_c;HookApiTest,c'],` +
              `_d:[$hook$.global(__hook__,'HookApiTest,_d','d','var')['_pp_d;HookApiTest,_d']],` +
              `_e:{_f:$hook$.global(__hook__,'HookApiTest,_e,_f','f','var')['_pp_f;HookApiTest,_e,_f']},` +
              `_g:$hook$.global(__hook__,'HookApiTest,_g','o','var')['_pp_o;HookApiTest,_g']}=` +
              `{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','get')['_pp_d;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','f','get')['_pp_f;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','o','get')['_pp_o;HookApiTest']];`,
          },
          {
            code: `{ let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; }`,
            hooked: `{let a,b,c,d,f,o;({_a:a,_b:b=a,c,_d:[d],_e:{_f:f},_g:o}={_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});[a,b,c,d,f,o];}`,
          },
          {
            code: `{ with ({}) { let a,b,c,d,f,o; ({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o]; } }`,
            hooked: `{with($hook$.with({},{})){let a,b,c,d,f,o;` +
              `({_a:__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest,_a',false)['='],` +
              `_b:__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],'HookApiTest,_b',false)['=']=__hook__('w.',__with__,['a',()=>a],'HookApiTest,_b',false),` +
              `c:__hook__('w.=',__with__,['c',{set ['='](v){c=v;},get ['='](){return c;}}],'HookApiTest,c',false)['='],` +
              `_d:[__hook__('w.=',__with__,['d',{set ['='](v){d=v;},get ['='](){return d;}}],'HookApiTest,_d',false)['=']],` +
              `_e:{_f:__hook__('w.=',__with__,['f',{set ['='](v){f=v;},get ['='](){return f;}}],'HookApiTest,_e,_f',false)['=']},` +
              `_g:__hook__('w.=',__with__,['o',{set ['='](v){o=v;},get ['='](){return o;}}],'HookApiTest,_g',false)['=']}={_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),` +
              `__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),` +
              `__hook__('w.',__with__,['c',()=>c],'HookApiTest',false),` +
              `__hook__('w.',__with__,['d',()=>d],'HookApiTest',false),` +
              `__hook__('w.',__with__,['f',()=>f],'HookApiTest',false),` +
              `__hook__('w.',__with__,['o',()=>o],'HookApiTest',false)];}}`,
          },
          {
            code: `var a,b,c,d,f,o;({ _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }); [a,b,c,d,f,o];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','var')['_pp_d;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','f','var')['_pp_f;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','o','var')['_pp_o;HookApiTest'];` +
              `({_a:$hook$.global(__hook__,'HookApiTest,_a','a','set')['_pp_a;HookApiTest,_a'],` +
              `_b:$hook$.global(__hook__,'HookApiTest,_b','b','set')['_pp_b;HookApiTest,_b']=$hook$.global(__hook__,'HookApiTest,_b','a','get')['_pp_a;HookApiTest,_b'],` +
              `c:$hook$.global(__hook__,'HookApiTest,c','c','set')['_pp_c;HookApiTest,c'],` +
              `_d:[$hook$.global(__hook__,'HookApiTest,_d','d','set')['_pp_d;HookApiTest,_d']],` +
              `_e:{_f:$hook$.global(__hook__,'HookApiTest,_e,_f','f','set')['_pp_f;HookApiTest,_e,_f']},` +
              `_g:$hook$.global(__hook__,'HookApiTest,_g','o','set')['_pp_o;HookApiTest,_g']}={_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','d','get')['_pp_d;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','f','get')['_pp_f;HookApiTest'],` +
              `$hook$.global(__hook__,'HookApiTest','o','get')['_pp_o;HookApiTest']];`,
          },
          {
            code: `{ let result = 0; for (var {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }`,
            hooked: `{let result=0;for({i:$hook$.global(__hook__,'HookApiTest,i','i','var')['_pp_i;HookApiTest,i'],j:$hook$.global(__hook__,'HookApiTest,j','j','var')['_pp_j;HookApiTest,j']}` +
              `of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest'))` +
              `{result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; for (let {i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }`,
            hooked: `{let result=0;for(let {i,j}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest')){result+=i+j;}result;}`,
          },
          {
            code: `{ let result = 0; var i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }`,
            hooked: `{let result=0;$hook$.global(__hook__,'HookApiTest','i','var')['_pp_i;HookApiTest'],$hook$.global(__hook__,'HookApiTest','j','var')['_pp_j;HookApiTest'];` +
              `for({i:$hook$.global(__hook__,'HookApiTest,i','i','set')['_pp_i;HookApiTest,i'],j:$hook$.global(__hook__,'HookApiTest,j','j','set')['_pp_j;HookApiTest,j']}` +
              `of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest'))` +
              `{result+=$hook$.global(__hook__,'HookApiTest','i','get')['_pp_i;HookApiTest']+$hook$.global(__hook__,'HookApiTest','j','get')['_pp_j;HookApiTest'];}result;}`,
          },
          {
            code: `{ let result = 0; let i,j; for ({i,j} of [{i:1,j:2},{i:3,j:4}]) { result += i + j; } result; }`,
            hooked: `{let result=0;let i,j;for({i,j}of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest')){result+=i+j;}result;}`,
          },
          {
            code: `{ let result = 0; for (var {...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }`,
            hooked: `{let result=0;for({...($hook$.global(__hook__,'HookApiTest','o','var'))['_pp_o;HookApiTest']}` +
              `of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest')){result+=__hook__('.',o,['i'],'HookApiTest')+__hook__('.',o,['j'],'HookApiTest');}result;}`,
          },
          {
            code: `{ let result = 0; var o; for ({...o} of [{i:1,j:2},{i:3,j:4}]) { result += o.i + o.j; } result; }`,
            hooked: `{let result=0;$hook$.global(__hook__,'HookApiTest','o','var')['_pp_o;HookApiTest'];` +
              `for({...($hook$.global(__hook__,'HookApiTest','o','set'))['_pp_o;HookApiTest']}` +
              `of __hook__('*',[{i:1,j:2},{i:3,j:4}],[],'HookApiTest')){result+=__hook__('.',o,['i'],'HookApiTest')+__hook__('.',o,['j'],'HookApiTest');}result;}`,
          },
        ],
        Property: [
          {
            code: `{ let a = 1, b = 2; ({ m(p) { return p; }, [a]: b }); }`,
            hooked: `{let a=1,b=2;({m(p){return __hook__(p=>{return p;},null,arguments,'HookApiTest,m');},[a]:b});}`,
          },
          {
            code: `{ with ({a:1,b:2}) { ({ m(p) { return p; }, [a]: b }); } }`,
            hooked: `{with($hook$.with({a:1,b:2},{})){` +
              `({m(p){return __hook__(p=>{return __hook__('w.',__with__,['p',()=>p],'HookApiTest,m',false);},null,arguments,'HookApiTest,m');},` +
              `[__hook__('w.',__with__,['a',()=>a],'HookApiTest,a',false)]:__hook__('w.',__with__,['b',()=>b],'HookApiTest,a',false)});}}`,
          },
          {
            code: `var a = 1, b = 2; ({ m(p) { return p; }, [a]: b });`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2;` +
              `({m(p){return __hook__(p=>{return p;},null,arguments,'HookApiTest,m');},` +
              `[$hook$.global(__hook__,'HookApiTest,a','a','get')['_pp_a;HookApiTest,a']]:$hook$.global(__hook__,'HookApiTest,a','b','get')['_pp_b;HookApiTest,a']});`,
          },
          {
            code: `{ let a = 1; ({ a }); }`,
            hooked: `{let a=1;({a});}`,
          },
          {
            code: `var a = 1; ({ a });`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1;({a:$hook$.global(__hook__,'HookApiTest,a','a','get')['_pp_a;HookApiTest,a']});`,
          },
          {
            code: `{ with ({a:1}) { ({ a }); } }`,
            hooked: `{with($hook$.with({a:1},{})){({a:__hook__('w.',__with__,['a',()=>a],'HookApiTest,a',false)});}}`,
          },
          {
            code: `{ let a = 1, b = 2; ({a,b} = {a,b}); }`,
            hooked: `{let a=1,b=2;({a,b}={a,b});}`,
          },
          {
            code: `{ with ({a:1,b:2}) { ({a,b} = {a,b}); } }`,
            hooked: `{with($hook$.with({a:1,b:2},{})){` +
              `({a:__hook__('w.=',__with__,['a',{set ['='](v){a=v;},get ['='](){return a;}}],'HookApiTest,a',false)['='],` +
              `b:__hook__('w.=',__with__,['b',{set ['='](v){b=v;},get ['='](){return b;}}],'HookApiTest,b',false)['=']}=` +
              `{a:__hook__('w.',__with__,['a',()=>a],'HookApiTest,a',false),` +
              `b:__hook__('w.',__with__,['b',()=>b],'HookApiTest,b',false)});}}`,
          },
          {
            code: `var a = 1, b = 2; ({a,b} = {a,b});`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2;` +
              `({a:$hook$.global(__hook__,'HookApiTest,a','a','set')['_pp_a;HookApiTest,a'],b:$hook$.global(__hook__,'HookApiTest,b','b','set')['_pp_b;HookApiTest,b']}=` +
              `{a:$hook$.global(__hook__,'HookApiTest,a','a','get')['_pp_a;HookApiTest,a'],b:$hook$.global(__hook__,'HookApiTest,b','b','get')['_pp_b;HookApiTest,b']});`,
          },
          {
            code: `{ let {a,b} = {a: 1, b: 2}; }`,
            hooked: `{let {a,b}={a:1,b:2};}`,
          },
          {
            code: `{ with ({}) { let {a,b} = {a: 1, b: 2}; } }`,
            hooked: `{with($hook$.with({},{})){let {a,b}={a:1,b:2};}}`,
          },
          {
            code: `var {a,b} = {a: 1, b: 2}; [a,b];`,
            hooked: `({a:$hook$.global(__hook__,'HookApiTest,a','a','var')['_pp_a;HookApiTest,a'],b:$hook$.global(__hook__,'HookApiTest,b','b','var')['_pp_b;HookApiTest,b']}={a:1,b:2});` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']];`,
          },
        ],
        UnaryExpression: [
          {
            code: 'with({a:2}){-a;}',
            hooked: `with($hook$.with({a:2},{})){-__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){+a;}',
            hooked: `with($hook$.with({a:2},{})){+__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){!a;}',
            hooked: `with($hook$.with({a:2},{})){!__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){~a;}',
            hooked: `with($hook$.with({a:2},{})){~__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){typeof a;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('wtypeof',__with__,['a',()=>typeof a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){delete a;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('wdelete',__with__,['a',()=>delete a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){void a;}',
            hooked: `with($hook$.with({a:2},{})){void __hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
          },
          {
            code: `{ let o = { p: 1, q: 2 }; delete o.p; delete o['q']; o; }`,
            hooked: `{let o={p:1,q:2};__hook__('delete',o,['p'],'HookApiTest');__hook__('delete',o,['q'],'HookApiTest');o;}`,
          },
          {
            code: `{ with ({o:{ p: 1, q: 2 }}) { delete o.p; o; } }`,
            hooked: `{with($hook$.with({o:{p:1,q:2}},{})){__hook__('delete',__hook__('w.',__with__,['o',()=>o],'HookApiTest',false),['p'],'HookApiTest');` +
              `__hook__('w.',__with__,['o',()=>o],'HookApiTest',false);}}`,
          },
          {
            code: `var o = { p: 1, q: 2 }; delete o.p; o;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','o','var')['_pp_o;HookApiTest']={p:1,q:2};` +
              `__hook__('delete',o,['p'],'HookApiTest');$hook$.global(__hook__,'HookApiTest','o','get')['_pp_o;HookApiTest'];`,
          },
          {
            code: `var oo = 1; !oo; typeof oo; delete oo; true;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','oo','var')['_pp_oo;HookApiTest']=1;` +
              `!$hook$.global(__hook__,'HookApiTest','oo','get')['_pp_oo;HookApiTest'];` +
              `typeof $hook$.global(__hook__,'HookApiTest','oo','typeof')['_pp_oo;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','oo','delete');true;`,
          },
          {
            code: `typeof inexistentGlobalVariable;`,
            hooked: `typeof $hook$.global(__hook__,'HookApiTest','inexistentGlobalVariable','typeof')['_pp_inexistentGlobalVariable;HookApiTest'];`,
          },
        ],
        UpdateExpression: [
          {
            code: `{ let a = 2, b = { p: 3 }; a++; b.p++; b['p']++; [a,b]; }`,
            hooked: `{let a=2,b={p:3};a++;__hook__('p++',b,['p'],'HookApiTest');__hook__('p++',b,['p'],'HookApiTest');[a,b];}`,
          },
          {
            code: `{ let a = 2, b = { p: 3 }; --a; --b.p; --b['p']; [a,b]; }`,
            hooked: `{let a=2,b={p:3};--a;__hook__('--p',b,['p'],'HookApiTest');__hook__('--p',b,['p'],'HookApiTest');[a,b];}`,
          },
          {
            code: `{ with ({a:2,b:{p:3}}) { a++; b.p++; [a,b]; } }`,
            hooked: `{with($hook$.with({a:2,b:{p:3}},{})){__hook__('w++',__with__,['a',()=>a++],'HookApiTest',false);__hook__('p++',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),['p'],'HookApiTest');[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)];}}`,
          },
          {
            code: `{ with ({a:2,b:{p:3}}) { --a; --b.p; [a,b]; } }`,
            hooked: `{with($hook$.with({a:2,b:{p:3}},{})){__hook__('--w',__with__,['a',()=>--a],'HookApiTest',false);__hook__('--p',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),['p'],'HookApiTest');[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)];}}`,
          },
          {
            code: `var a = 2, b = { p: 3 }; a++; b.p++; [a,b];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=2,` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']={p:3};` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']++;` +
              `__hook__('p++',b,['p'],'HookApiTest');` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']];`,
          },
          {
            code: 'with({a:2}){a++;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('w++',__with__,['a',()=>a++],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){a--;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('w--',__with__,['a',()=>a--],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){++a;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('++w',__with__,['a',()=>++a],'HookApiTest',false);}`,
          },
          {
            code: 'with({a:2}){--a;}',
            hooked: `with($hook$.with({a:2},{})){__hook__('--w',__with__,['a',()=>--a],'HookApiTest',false);}`,
          },
          {
            code: `{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super['m']; } } c2.m = 2; c2.m2; }`,
            hooked: `{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],'HookApiTest,c,get m');},null,arguments,'HookApiTest,c,get m');}` +
              `static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],'HookApiTest,c,set m');},null,arguments,'HookApiTest,c,set m');}}` +
              `class c2 extends c{static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],'HookApiTest,c2,get m2');},null,arguments,'HookApiTest,c2,get m2');}}` +
              `__hook__('=',c2,['m',2],'HookApiTest');__hook__('.',c2,['m2'],'HookApiTest');}`,
          },
          {
            code: `{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return super['m']++; } } c2.m = 2; c2.m2; }`,
            hooked: `{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],'HookApiTest,c,get m');},null,arguments,'HookApiTest,c,get m');}` +
              `static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],'HookApiTest,c,set m');},null,arguments,'HookApiTest,c,set m');}}` +
              `class c2 extends c{static get m2(){return __hook__(()=>{return __hook__('s++',this,['m',p=>super[p]++],'HookApiTest,c2,get m2');},null,arguments,'HookApiTest,c2,get m2');}}` +
              `__hook__('=',c2,['m',2],'HookApiTest');__hook__('.',c2,['m2'],'HookApiTest');}`,
          },
          {
            code: `{ with ({}) { class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2; } }`,
            hooked: `{with($hook$.with({},{})){class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],'HookApiTest,c,get m');},null,arguments,'HookApiTest,c,get m');}` +
              `static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',__hook__('w.',__with__,['v',()=>v],'HookApiTest,c,set m',false)],'HookApiTest,c,set m');},null,arguments,'HookApiTest,c,set m');}}` +
              `class c2 extends __hook__('w.',__with__,['c',()=>c],'HookApiTest,c2',false){` +
              `static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],'HookApiTest,c2,get m2');},null,arguments,'HookApiTest,c2,get m2');}}` +
              `__hook__('=',c2,['m',2],'HookApiTest');__hook__('.',__hook__('w.',__with__,['c2',()=>c2],'HookApiTest',false),['m2'],'HookApiTest');}}`,
          },
          {
            code: `class c { static get m() { return this._m; } static set m(v) { this._m = v; } } class c2 extends c { static get m2() { return ++super.m; } } c2.m = 2; c2.m2;`,
            hooked: `$hook$.global(__hook__,'HookApiTest,c','c','class')['_pp_c;HookApiTest,c']=` +
              `class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],'HookApiTest,c,get m');},null,arguments,'HookApiTest,c,get m');}` +
              `static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],'HookApiTest,c,set m');},null,arguments,'HookApiTest,c,set m');}};` +
              `$hook$.global(__hook__,'HookApiTest,c2','c2','class')['_pp_c2;HookApiTest,c2']=class c2 extends $hook$.global(__hook__,'HookApiTest,c2','c','get')['_pp_c;HookApiTest,c2']{` +
              `static get m2(){return __hook__(()=>{return __hook__('++s',this,['m',p=>++super[p]],'HookApiTest,c2,get m2');},null,arguments,'HookApiTest,c2,get m2');}};` +
              `__hook__('=',c2,['m',2],'HookApiTest');__hook__('.',c2,['m2'],'HookApiTest');`,
            eval: () => true,
          },
          {
            code: `{ function f() { 'use strict'; let o = {a:1,b:2}; o.a++; --o.a; delete o.b; return o; } f() }`,
            hooked: `{function f(){'use strict';return __hook__(()=>{let o={a:1,b:2};` +
              `__hook__('#p++',o,['a'],'HookApiTest,f');` +
              `__hook__('#--p',o,['a'],'HookApiTest,f');` +
              `__hook__('#delete',o,['b'],'HookApiTest,f');return o;},null,arguments,'HookApiTest,f');}` +
              `__hook__(f,null,[],'HookApiTest',0);}`,
          },
        ],
        BinaryExpression: [
          {
            code: '{ let a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }',
            hooked: `{let a=1,b=2;a+b;a-b;a/b;a*b;a%b;a|b;a^b;a&b;a==b;a!=b;a===b;a!==b;a<b;a<=b;a>b;a>=b;a<<b;a>>b;a>>>b;}`,
          },
          {
            code: 'with ({a:1,b:2}) { a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b; }',
            hooked: `with($hook$.with({a:1,b:2},{})){` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)+__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)-__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)/__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)*__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)%__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)|__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)^__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)&__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)==__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)!=__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)===__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)!==__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)<__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)<=__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)>__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)>=__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)<<__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)>>__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)>>>__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}`,
          },
          {
            code: 'var a = 1, b = 2; a + b; a - b; a / b; a * b; a % b; a | b; a ^ b; a & b; a == b; a != b; a === b; a !== b; a < b; a <= b; a > b; a >= b; a << b; a >> b; a >>> b;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']+$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']-$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']/$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']*$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']%$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']|$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']^$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']&$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']==$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']!=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']===$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']!==$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']<$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']<=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']>$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']>=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']<<$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']>>$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']>>>$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `{ let a = 2, b = 3; a ** b; }`,
            hooked: `{let a=2,b=3;a**b;}`,
          },
          {
            code: `{ with ({a:2,b:3}) { a ** b; } }`,
            hooked: `{with($hook$.with({a:2,b:3},{})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)**__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}}`,
          },
          {
            code: `var a = 2, b = 3; a ** b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=2,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=3;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']**$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `{ let a = 'a', b = { a: 1 }; a in b; }`,
            hooked: `{let a='a',b={a:1};__hook__('in',b,[a],'HookApiTest');}`,
          },
          {
            code: `with ({a:'a', b:{ a: 1 }}) { a in b; }`,
            hooked: `with($hook$.with({a:'a',b:{a:1}},{})){__hook__('in',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)],'HookApiTest');}`,
          },
          {
            code: `var a = 'a', b = { a: 1 }; a in b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']='a',$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']={a:1};__hook__('in',$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']],'HookApiTest');`,
          },
          {
            code: `'use strict'; var a = 'a', b = { a: 1 }; a in b;`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest','a','#var')['S_pp_a;HookApiTest']='a',` +
              `$hook$.global(__hook__,'HookApiTest','b','#var')['S_pp_b;HookApiTest']={a:1};` +
              `__hook__('#in',$hook$.global(__hook__,'HookApiTest','b','#get')['S_pp_b;HookApiTest'],[$hook$.global(__hook__,'HookApiTest','a','#get')['S_pp_a;HookApiTest']],'HookApiTest');`,
          },
          {
            code: `{ let a = {}; a instanceof Object; }`,
            hooked: `{let a={};a instanceof $hook$.global(__hook__,'HookApiTest','Object','get')['_pp_Object;HookApiTest'];}`,
          },
          {
            code: `with ({a:{}}) { a instanceof Object; }`,
            hooked: `with($hook$.with({a:{}},{})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)instanceof __hook__('w.',__with__,['Object',()=>Object],'HookApiTest',false);}`,
          },
          {
            code: `var a = {}; a instanceof Object;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']={};$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']instanceof $hook$.global(__hook__,'HookApiTest','Object','get')['_pp_Object;HookApiTest'];`,
          },
        ],
        AssignmentExpression: [
          {
            code: `{ let a, b = 1; a = b; }`,
            hooked: `{let a,b=1;a=b;}`,
          },
          {
            code: `with ({a:2,b:1}) { a = b; }`,
            hooked: `with($hook$.with({a:2,b:1},{})){__hook__('w=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a=v],'HookApiTest',false);}`,
          },
          {
            code: `var a, b = 1; a = b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=1;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `{ let a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }`,
            hooked: `{let a,b=1;a+=b;a-=b;a*=b;a/=b;a%=b;a<<=b;a>>=b;a>>>=b;a|=b;a^=b;a&=b;}`,
          },
          {
            code: `with ({a:2,b:1}) { a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b; }`,
            hooked: `with($hook$.with({a:2,b:1},{})){` +
              `__hook__('w+=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a+=v],'HookApiTest',false);` +
              `__hook__('w-=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a-=v],'HookApiTest',false);` +
              `__hook__('w*=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a*=v],'HookApiTest',false);` +
              `__hook__('w/=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a/=v],'HookApiTest',false);` +
              `__hook__('w%=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a%=v],'HookApiTest',false);` +
              `__hook__('w<<=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a<<=v],'HookApiTest',false);` +
              `__hook__('w>>=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a>>=v],'HookApiTest',false);` +
              `__hook__('w>>>=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a>>>=v],'HookApiTest',false);` +
              `__hook__('w|=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a|=v],'HookApiTest',false);` +
              `__hook__('w^=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a^=v],'HookApiTest',false);` +
              `__hook__('w&=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a&=v],'HookApiTest',false);}`,
          },
          {
            code: `var a, b = 1; a += b; a -= b; a *= b; a /= b; a %= b; a <<= b; a >>= b; a >>>= b; a |= b; a ^= b; a &= b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=1;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']+=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']-=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']*=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']/=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']%=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']<<=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']>>=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']>>>=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']|=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']^=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']&=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `{ let a = 2, b = 3; a **= b; }`,
            hooked: `{let a=2,b=3;a**=b;}`,
          },
          {
            code: `{ with ({a:2,b:3}) { a **= b; } }`,
            hooked: `{with($hook$.with({a:2,b:3},{})){__hook__('w**=',__with__,['a',__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),v=>a**=v],'HookApiTest',false);}}`,
          },
          {
            code: `var a = 2, b = 3; a **= b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=2,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=3;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']**=$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
          {
            code: `{ class c { static get m() { return this._m; } static set m(v) { this._m = v; } } ` +
              `class c2 extends c { static get m2() { super['m'] = super.m; return super.m = super['m']; } } c2.m = 2; c2.m2; }`,
            hooked: `{class c{static get m(){return __hook__(()=>{return __hook__('#.',this,['_m'],'HookApiTest,c,get m');},null,arguments,'HookApiTest,c,get m');}` +
              `static set m(v){return __hook__(v=>{__hook__('#=',this,['_m',v],'HookApiTest,c,set m');},null,arguments,'HookApiTest,c,set m');}}` +
              `class c2 extends c{static get m2(){return __hook__(()=>{__hook__('s=',this,['m',` +
              `__hook__('s.',this,['m',p=>super[p]],'HookApiTest,c2,get m2'),(p,v)=>super[p]=v],'HookApiTest,c2,get m2');` +
              `return __hook__('s=',this,['m',__hook__('s.',this,['m',p=>super[p]],'HookApiTest,c2,get m2'),(p,v)=>super[p]=v],'HookApiTest,c2,get m2');},null,arguments,'HookApiTest,c2,get m2');}}` +
              `__hook__('=',c2,['m',2],'HookApiTest');__hook__('.',c2,['m2'],'HookApiTest');}`,
          },
          {
            name: 'implicit declaration',
            code: `delete aaa; aaa = 2; { let b = aaa; delete b; delete aaa; b; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','aaa','delete');$hook$.global(__hook__,'HookApiTest','aaa','set')['_pp_aaa;HookApiTest']=2;` +
              `{let b=$hook$.global(__hook__,'HookApiTest,b','aaa','get')['_pp_aaa;HookApiTest,b'];delete b;$hook$.global(__hook__,'HookApiTest','aaa','delete');b;}`,
          },
          {
            code: `'use strict'; try { __inexistentGlobalVariable = 1; } catch (e) { e.name; }`,
            hooked: `'use strict';try{$hook$.global(__hook__,'HookApiTest','__inexistentGlobalVariable','#set')['S_pp___inexistentGlobalVariable;HookApiTest']=1;}` +
              `catch(e){__hook__('#.',e,['name'],'HookApiTest');}`,
          },
        ],
        LogicalExpression: [
          {
            code: `{ let a = false, b = true; a && b; a || b; }`,
            hooked: `{let a=false,b=true;a&&b;a||b;}`,
          },
          {
            code: `with ({a:false,b:true}) { a && b; a || b; }`,
            hooked: `with($hook$.with({a:false,b:true},{})){` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)&&__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)||__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}`,
          },
          {
            code: `var a = false, b = true; a && b; a || b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=false,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=true;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']&&$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']||$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
        ],
        MemberExpression: [
          {
            code: `{ let a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2; }`,
            hooked: `{let a={b:1},b='b';__hook__('.',a,['b'],'HookApiTest');__hook__('.',a,[b],'HookApiTest');__hook__('=',a,['b',2],'HookApiTest');__hook__('=',a,[b,2],'HookApiTest');}`,
          },
          {
            code: `with ({a:{b:1},b:'b'}) { a.b; a[b]; a.b = 2; a[b] = 2; }`,
            hooked: `with($hook$.with({a:{b:1},b:'b'},{})){` +
              `__hook__('.',__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),['b'],'HookApiTest');` +
              `__hook__('.',__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),[__hook__('w.',__with__,['b',()=>b],'HookApiTest',false)],'HookApiTest');` +
              `__hook__('=',a,['b',2],'HookApiTest');` +
              `__hook__('=',a,[__hook__('w.',__with__,['b',()=>b],'HookApiTest',false),2],'HookApiTest');}`,
          },
          {
            code: `var a = { b: 1 }, b = 'b'; a.b; a[b]; a.b = 2; a[b] = 2;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']={b:1},$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']='b';` +
              `__hook__('.',a,['b'],'HookApiTest');` +
              `__hook__('.',a,[$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']],'HookApiTest');` +
              `__hook__('=',a,['b',2],'HookApiTest');` +
              `__hook__('=',a,[$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'],2],'HookApiTest');`,
          },
          {
            code: `{ class b { constructor(p) { this._p = p; } get p() { return this._p; }} class c extends b { get p() { let _p = 'p'; return super[_p] + super['p'] + super.p; } } (new c(1)).p; }`,
            hooked: `{class b{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],'HookApiTest,b,constructor');},null,arguments,'HookApiTest,b,constructor');}` +
              `get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,b,get p');},null,arguments,'HookApiTest,b,get p');}}` +
              `class c extends b{get p(){return __hook__(()=>{let _p='p';return ` +
              `__hook__('s.',this,[_p,p=>super[p]],'HookApiTest,c,get p')+` +
              `__hook__('s.',this,['p',p=>super[p]],'HookApiTest,c,get p')+` +
              `__hook__('s.',this,['p',p=>super[p]],'HookApiTest,c,get p');},null,arguments,'HookApiTest,c,get p');}}` +
              `__hook__('.',__hook__(c,null,[1],'HookApiTest',true),['p'],'HookApiTest');}`,
            //options: 'compact=false',
          },
          {
            code: `{ class a { static m() { [this._name] = [this.name]; return this._name; } } a.m(); }`,
            hooked: `{class a{static m(){return __hook__(()=>{[__hook__('#.=',this,['_name'],'HookApiTest,a,static m')['=']]=` +
              `[__hook__('#.',this,['name'],'HookApiTest,a,static m')];` +
              `return __hook__('#.',this,['_name'],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}}` +
              `__hook__('()',a,['m',[]],'HookApiTest');}`,
          },
        ],
        ConditionalExpression: [
          {
            code: `{ let a = 1, b = 2, c = 3; a ? b : c; }`,
            hooked: `{let a=1,b=2,c=3;a?b:c;}`,
          },
          {
            code: `with ({a:1,b:2,c:3}) { a ? b : c; }`,
            hooked: `with($hook$.with({a:1,b:2,c:3},{})){` +
              `__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)?__hook__('w.',__with__,['b',()=>b],'HookApiTest',false):__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);}`,
          },
          {
            code: `var a = 1, b = 2, c = 3; a ? b : c;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=2,$hook$.global(__hook__,'HookApiTest','c','var')['_pp_c;HookApiTest']=3;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']?$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest']:$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'];`,
          },
        ],
        CallExpression: [
          {
            code: `{ let a = 1, f = function (a) { return a + 1; }; f(a); }`,
            hooked: `{let a=1,f=function(a){return __hook__(a=>{return a+1;},null,arguments,'HookApiTest,f');};__hook__(f,null,[a],'HookApiTest',0);}`,
          },
          {
            code: `{ function f(a) { return a + 1; } with ({a:1}) { f(a); } }`,
            hooked: `{function f(a){return __hook__(a=>{return a+1;},null,arguments,'HookApiTest,f');}` +
              `with($hook$.with({a:1},{f:true})){__hook__('w()',__with__,['f',[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)],(...args)=>f(...args)],'HookApiTest',false);}}`,
          },
          {
            code: `var a = 1, f = function (a) { return a + 1; }; f(a);`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=1,` +
              `$hook$.global(__hook__,'HookApiTest','f','var')['_pp_f;HookApiTest']=function(a){return __hook__(a=>{return a+1;},null,arguments,'HookApiTest');};` +
              `__hook__(f,null,[$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest']],'HookApiTest',0);`,
          },
          {
            code: `{ with ({a:1,f:function f(a) { return a + 1; }}) { f(a); } }`,
            hooked: `{with($hook$.with({a:1,f:function f(a){return __hook__(a=>{return a+1;},null,arguments,'HookApiTest,f,f');}},{}))` +
              `{__hook__('w()',__with__,['f',[__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)],(...args)=>f(...args)],'HookApiTest',false);}}`,
          },
          {
            code: `{ class b { constructor(p) { this.p = p; } } class c extends b { constructor(p) { super(p); } } (new c(1)).p; }`,
            hooked: `{class b{constructor(p){return __hook__(p=>{__hook__('#=',this,['p',p],'HookApiTest,b,constructor');},null,arguments,'HookApiTest,b,constructor');}}` +
              `class c extends b{constructor(p){return __hook__(p=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,p],'HookApiTest,c,constructor','');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__(c,null,[1],'HookApiTest',true),['p'],'HookApiTest');}`,
          },
          {
            code: `{ class b { m(p) { return p + 1; } } class c extends b { m(p) { return super.m(p) + super['m'](p); } } (new c()).m(1); }`,
            hooked: `{class b{m(p){return __hook__(p=>{return p+1;},null,arguments,'HookApiTest,b,m');}}` +
              `class c extends b{m(p){return __hook__(p=>{return __hook__('s()',this,['m',[p],p=>super[p]],'HookApiTest,c,m')+` +
              `__hook__('s()',this,['m',[p],p=>super[p]],'HookApiTest,c,m');},null,arguments,'HookApiTest,c,m');}}` +
              `__hook__('()',__hook__(c,null,[],'HookApiTest',true),['m',[1]],'HookApiTest');}`,
          },
          {
            code: `{ with ({}) { let o = { f: function f() { return 1; } }; o.f() + o['f'](); } }`,
            hooked: `{with($hook$.with({},{})){let o={f:function f(){return __hook__(()=>{return 1;},null,arguments,'HookApiTest,o,f,f');}};` +
              `__hook__('()',__hook__('w.',__with__,['o',()=>o],'HookApiTest',false),['f',[]],'HookApiTest')+` +
              `__hook__('()',__hook__('w.',__with__,['o',()=>o],'HookApiTest',false),['f',[]],'HookApiTest');}}`,
          },
          {
            code: `{ let a = 1; eval('1'); }`,
            hooked: `{let a=1;$hook$.eval('__hook__',[['HookApiTest',{}]],'method',{a:true})('1',(script,eval)=>eval(script));}`,
          },
          {
            code: `'use strict'; eval('1');`,
            hooked: `'use strict';$hook$.eval('__hook__',[['HookApiTest',{}]],'method',{$use_strict$:true})('1',(script,_eval)=>_eval(script));`,
          },
          {
            code: `var a; new Promise(resolve => { a = resolve; setTimeout('let resolve = a; a = null; resolve(1);', 100); });`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'];` +
              `__hook__(Promise,null,[(...args)=>(__hook__(resolve=>{$hook$.global(__hook__,'HookApiTest','a','set')['_pp_a;HookApiTest']=resolve;` +
              `$hook$.setTimeout('__hook__',[['HookApiTest',{}]],'method')('let resolve = a; a = null; resolve(1);',100);},null,args,'HookApiTest'))],'HookApiTest',true);`,
            asynchronous: true,
          },
          {
            code: `{ let f = Reflect.construct(Function, ['return (a,b) => a + b;'])(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__('()',Reflect,['construct',[$hook$.global(__hook__,'HookApiTest,f','Function','get')['_pp_Function;HookApiTest,f'],['return (a,b) => a + b;']]],'HookApiTest,f'),null,[],'HookApiTest,f',0);` +
              `__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ Reflect.construct(Function, [])(); }`,
            hooked: `{__hook__(__hook__('()',Reflect,['construct',[$hook$.global(__hook__,'HookApiTest','Function','get')['_pp_Function;HookApiTest'],[]]],'HookApiTest'),null,[],'HookApiTest',0);}`,
          },
          {
            code: `{ class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'])(); f(1,2); }`,
            hooked: `{class F extends $hook$.global(__hook__,'HookApiTest,F','Function','get')['_pp_Function;HookApiTest,F']{}` +
              `let f=__hook__(__hook__('()',Reflect,['construct',[F,['return (a,b) => a + b;']]],'HookApiTest,f'),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ function F() {} let f = Reflect.construct(Function, ['return (a,b) => a + b;'], F)(); f(1,2); }`,
            hooked: `{function F(){return __hook__(()=>{},null,arguments,'HookApiTest,F');}` +
              `let f=__hook__(__hook__('()',Reflect,['construct',[$hook$.global(__hook__,'HookApiTest,f','Function','get')['_pp_Function;HookApiTest,f'],['return (a,b) => a + b;'],F]],'HookApiTest,f'),null,[],'HookApiTest,f',0);` +
              `__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ function F2() {} class F extends Function {} let f = Reflect.construct(F, ['return (a,b) => a + b;'], F2)(); f(1,2); }`,
            hooked: `{function F2(){return __hook__(()=>{},null,arguments,'HookApiTest,F2');}` +
              `class F extends $hook$.global(__hook__,'HookApiTest,F','Function','get')['_pp_Function;HookApiTest,F']{}` +
              `let f=__hook__(__hook__('()',Reflect,['construct',[F,['return (a,b) => a + b;'],F2]],'HookApiTest,f'),null,[],'HookApiTest,f',0);` +
              `__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ class F extends Function {} let f = new F('return (a,b) => a + b;')(); f(1,2); }`,
            hooked: `{class F extends $hook$.global(__hook__,'HookApiTest,F','Function','get')['_pp_Function;HookApiTest,F']{}` +
              `let f=__hook__(__hook__(F,null,['return (a,b) => a + b;'],'HookApiTest,f',true),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ class F extends Function { constructor(...args) { super(...args); } } let f = new F('return (a,b) => a + b;')(); f(1,2); }`,
            hooked: `{class F extends $hook$.global(__hook__,'HookApiTest,F','Function','get')['_pp_Function;HookApiTest,F']{` +
              `constructor(...args){return __hook__((...args)=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,...args],'HookApiTest,F,constructor','');},null,arguments,'HookApiTest,F,constructor');}}` +
              `let f=__hook__(__hook__(F,null,['return (a,b) => a + b;'],'HookApiTest,f',true),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ class F extends Function { constructor(p1,p2,script) { super(p1,script); } } let f = new F('p1', 'p2', 'return (a,b) => p1 + a + b;')(3, 4); f(1,2); }`,
            hooked: `{class F extends $hook$.global(__hook__,'HookApiTest,F','Function','get')['_pp_Function;HookApiTest,F']{constructor(p1,p2,script){return ` +
              `__hook__((p1,p2,script)=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,p1,script],'HookApiTest,F,constructor','');},null,arguments,'HookApiTest,F,constructor');}}` +
              `let f=__hook__(__hook__(F,null,['p1','p2','return (a,b) => p1 + a + b;'],'HookApiTest,f',true),null,[3,4],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Function('return (a,b) => a + b;')(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__(Function,null,['return (a,b) => a + b;'],'HookApiTest,f',0),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Function('"use strict"; return (a,b) => a + b;')(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__(Function,null,['"use strict"; return (a,b) => a + b;'],'HookApiTest,f',0),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Function.apply(null, ['return (a,b) => a + b;'])(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__('()',Function,['apply',[null,['return (a,b) => a + b;']]],'HookApiTest,f'),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Function.call(null, 'return (a,b) => a + b;')(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__('()',Function,['call',[null,'return (a,b) => a + b;']],'HookApiTest,f'),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Function.apply(null, ['"use strict"; return (a,b) => a + b;'])(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__('()',Function,['apply',[null,['"use strict"; return (a,b) => a + b;']]],'HookApiTest,f'),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = Reflect.apply(Function, null, ['return (a,b) => a + b;'])(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__('()',Reflect,['apply',[$hook$.global(__hook__,'HookApiTest,f','Function','get')['_pp_Function;HookApiTest,f'],null,['return (a,b) => a + b;']]],'HookApiTest,f'),null,[],'HookApiTest,f',0);` +
              `__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let GeneratorFunction = (function *(){}).constructor; let f = Reflect.apply(GeneratorFunction, null, ['Date.now(); yield 1; yield 2']); [...f()]; }`,
            hooked: `{let GeneratorFunction=__hook__('.',` +
              `function*(){yield*__hook__(function*(){},this,arguments,'HookApiTest,GeneratorFunction');},['constructor'],'HookApiTest,GeneratorFunction');` +
              `let f=__hook__('()',Reflect,['apply',[GeneratorFunction,null,['Date.now(); yield 1; yield 2']]],'HookApiTest,f');[...__hook__(f,null,[],'HookApiTest',0)];}`,
          },
          {
            code: `{ let GeneratorFunction = (function *(){}).constructor;` +
              `let GeneratorFunctionSubclass = function (...args) { return GeneratorFunction(...args);};` +
              `Object.setPrototypeOf(GeneratorFunctionSubclass, GeneratorFunction);` +
              `Object.setPrototypeOf(GeneratorFunctionSubclass.prototype, GeneratorFunction.prototype);` +
              `let f = Reflect.apply(GeneratorFunctionSubclass, null, ['Date.now(); yield 1; yield 2']); [...f()]; }`,
            hooked: `{let GeneratorFunction=__hook__('.',` +
              `function*(){yield*__hook__(function*(){},this,arguments,'HookApiTest,GeneratorFunction');},['constructor'],'HookApiTest,GeneratorFunction');` +
              `let GeneratorFunctionSubclass=` +
              `function(...args){return __hook__((...args)=>{return __hook__(GeneratorFunction,null,[...args],'HookApiTest,GeneratorFunctionSubclass',0);},null,arguments,'HookApiTest,GeneratorFunctionSubclass');};` +
              `__hook__('()',Object,['setPrototypeOf',[GeneratorFunctionSubclass,GeneratorFunction]],'HookApiTest');` +
              `__hook__('()',Object,['setPrototypeOf',[__hook__('.',GeneratorFunctionSubclass,['prototype'],'HookApiTest'),` +
              `__hook__('.',GeneratorFunction,['prototype'],'HookApiTest')]],'HookApiTest');` +
              `let f=__hook__('()',Reflect,['apply',[GeneratorFunctionSubclass,null,['Date.now(); yield 1; yield 2']]],'HookApiTest,f');[...__hook__(f,null,[],'HookApiTest',0)];}`,
          },
          {
            code: `importScripts('../thin-hook/hook.min.js?no-hook=true');`,
            hooked: `importScripts('../thin-hook/hook.min.js?no-hook=true');`,
            eval: () => true,
          },
        ],
        AwaitExpression: [
          {
            code: `{ async function f() { return 1; } async function f2() { return await f(); } f2(); }`,
            hooked: `{async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');}` +
              `async function f2(){return __hook__(async()=>{return await __hook__(f,null,[],'HookApiTest,f2',0);},null,arguments,'HookApiTest,f2');}` +
              `__hook__(f2,null,[],'HookApiTest',0);}`,
            asynchronous: true,
          },
          {
            code: `{ with ({}) { async function f() { return 1; } async function f2() { return await f(); } f2(); } }`,
            hooked: `{with($hook$.with({},{})){` +
              `async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');}` +
              `async function f2(){return __hook__(async()=>{return await __hook__('w()',__with__,['f',[],(...args)=>f(...args)],'HookApiTest,f2',false);},null,arguments,'HookApiTest,f2');}` +
              `__hook__('w()',__with__,['f2',[],(...args)=>f2(...args)],'HookApiTest',false);}}`,
            asynchronous: true,
          },
          {
            code: `async function f() { return 1; } async function f2() { return await f(); } f2();`,
            hooked: `$hook$.global(__hook__,'HookApiTest,f','f','function')['_pp_f;HookApiTest,f']=async function f(){return __hook__(async()=>{return 1;},null,arguments,'HookApiTest,f');};` +
              `$hook$.global(__hook__,'HookApiTest,f2','f2','function')['_pp_f2;HookApiTest,f2']=async function f2(){return __hook__(async()=>{return await __hook__(f,null,[],'HookApiTest,f2',0);},null,arguments,'HookApiTest,f2');};` +
              `__hook__(f2,null,[],'HookApiTest',0);`,
            asynchronous: true,
          },
        ],
        NewExpression: [
          {
            code: `{ let a = class {}; new a(1); }`,
            hooked: `{let a=class{};__hook__(a,null,[1],'HookApiTest',true);}`,
          },
          {
            code: `with ({a:class {}}) { new a(1); }`,
            hooked: `with($hook$.with({a:class{}},{})){__hook__('wnew',__with__,['a',[1],(...args)=>new a(...args)],'HookApiTest',false);}`,
          },
          {
            code: `var a = class {}; new a(1);`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=class{};__hook__(a,null,[1],'HookApiTest',true);`,
          },
          {
            code: `{ let f = (new Function('return (a,b) => a + b;'))(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__(Function,null,['return (a,b) => a + b;'],'HookApiTest,f',true),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ let f = (new Function('"use strict"; return (a,b) => a + b;'))(); f(1,2); }`,
            hooked: `{let f=__hook__(__hook__(Function,null,['"use strict"; return (a,b) => a + b;'],'HookApiTest,f',true),null,[],'HookApiTest,f',0);__hook__(f,null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ new Function()(); }`,
            hooked: `{__hook__(__hook__(Function,null,[],'HookApiTest',true),null,[],'HookApiTest',0);}`,
          },
          {
            code: `{ function f() {} f.constructor('v1', 'v2', 'Date.now(); return (a,b) => v1 + v2 + a + b;')(3,4)(1,2); }`,
            hooked: `{function f(){return __hook__(()=>{},null,arguments,'HookApiTest,f');}` +
              `__hook__(__hook__(__hook__('()',f,['constructor',['v1','v2','Date.now(); return (a,b) => v1 + v2 + a + b;']],'HookApiTest'),null,[3,4],'HookApiTest',0),null,[1,2],'HookApiTest',0);}`,
          },
          {
            code: `{ function * generator() {} [...(new generator.constructor('v1', 'v2', 'yield v1; yield v2;')(1,2))]; }`,
            hooked: `{function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,generator');}` +
              `[...__hook__(__hook__(__hook__('.',generator,['constructor'],'HookApiTest'),null,['v1','v2','yield v1; yield v2;'],'HookApiTest',true),null,[1,2],'HookApiTest',0)];}`,
          },
          {
            code: `{ function * generator() {} (new generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;')); }`,
            hooked: `{function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,generator');}` +
              `__hook__(__hook__('.',generator,['constructor'],'HookApiTest'),null,['v1','v2','Date.now(); yield v1; yield v2;'],'HookApiTest',true);}`,
            eval: (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
          },
          {
            code: `{ function * generator() {} generator.constructor('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }`,
            hooked: `{function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,generator');}` +
              `__hook__('()',generator,['constructor',['v1','v2','Date.now(); yield v1; yield v2;']],'HookApiTest');}`,
            eval: (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
          },
          {
            code: `{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction('v1', 'v2', 'Date.now(); yield v1; yield v2;'); }`,
            hooked: `{let GeneratorFunction=__hook__('.',` +
              `function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,GeneratorFunction,generator');},['constructor'],'HookApiTest,GeneratorFunction');` +
              `__hook__(GeneratorFunction,null,['v1','v2','Date.now(); yield v1; yield v2;'],'HookApiTest',0);}`,
            eval: (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
          },
          {
            code: `{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.call(GeneratorFunction, 'v1', 'v2', 'Date.now(); yield v1; yield v2;'); }`,
            hooked: `{let GeneratorFunction=__hook__('.',` +
              `function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,GeneratorFunction,generator');},['constructor'],'HookApiTest,GeneratorFunction');` +
              `__hook__('()',GeneratorFunction,['call',[GeneratorFunction,'v1','v2','Date.now(); yield v1; yield v2;']],'HookApiTest');}`,
            eval: (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
          },
          {
            code: `{ let GeneratorFunction = (function * generator() {}).constructor; GeneratorFunction.apply(GeneratorFunction, ['v1', 'v2', 'Date.now(); yield v1; yield v2;']); }`,
            hooked: `{let GeneratorFunction=__hook__('.',` +
              `function*generator(){yield*__hook__(function*(){},this,arguments,'HookApiTest,GeneratorFunction,generator');},['constructor'],'HookApiTest,GeneratorFunction');` +
              `__hook__('()',GeneratorFunction,['apply',[GeneratorFunction,['v1','v2','Date.now(); yield v1; yield v2;']]],'HookApiTest');}`,
            eval: (script) => { let result = _nativeEval(script); console.log(result.toString()); return [...result(1,2)]; },
          },
        ],
        SequenceExpression: [
          {
            code: `{ let a, b; a, b; }`,
            hooked: `{let a,b;a,b;}`,
          },
          {
            code: `with ({a:1,b:2}) { a, b; }`,
            hooked: `with($hook$.with({a:1,b:2},{})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false),__hook__('w.',__with__,['b',()=>b],'HookApiTest',false);}`,
          },
          {
            code: `var a, b; a, b;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest'];` +
              `$hook$.global(__hook__,'HookApiTest','a','get')['_pp_a;HookApiTest'],$hook$.global(__hook__,'HookApiTest','b','get')['_pp_b;HookApiTest'];`,
          },
        ],
        ClassDeclaration: [
          {
            code: `{ class a {} class b extends a {} }`,
            hooked: `{class a{}class b extends a{}}`,
          },
          {
            code: `{ with ({}) { class a {} class b extends a {} } }`,
            hooked: `{with($hook$.with({},{})){class a{}class b extends __hook__('w.',__with__,['a',()=>a],'HookApiTest,b',false){}}}`,
          },
          {
            code: `class a {} class b extends a {}`,
            hooked: `$hook$.global(__hook__,'HookApiTest,a','a','class')['_pp_a;HookApiTest,a']=class a{};` +
              `$hook$.global(__hook__,'HookApiTest,b','b','class')['_pp_b;HookApiTest,b']=class b extends $hook$.global(__hook__,'HookApiTest,b','a','get')['_pp_a;HookApiTest,b']{};`,
            eval: () => true,
          },
          {
            code: `'use strict'; class a {} class b extends a {}`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest,a','a','#class')['S_pp_a;HookApiTest,a']=class a{};` +
              `$hook$.global(__hook__,'HookApiTest,b','b','#class')['S_pp_b;HookApiTest,b']=class b extends $hook$.global(__hook__,'HookApiTest,b','a','#get')['S_pp_a;HookApiTest,b']{};`,
            eval: () => true,
          },
          {
            code: `{ class undefined {} class NaN {} class Infinity {} true; }`,
            hooked: `{class __unexpected_overridden_declaration_of_undefined__{}class __unexpected_overridden_declaration_of_NaN__{}class __unexpected_overridden_declaration_of_Infinity__{}true;}`,
          },
        ],
        ClassExpression: [
          {
            code: `{ let a = class a {}; let b = class b extends a {}; }`,
            hooked: `{let a=class a{};let b=class b extends a{};}`,
          },
          {
            code: `{ with ({}) { let a = class a {}; let b = class b extends a {}; } }`,
            hooked: `{with($hook$.with({},{})){let a=class a{};let b=class b extends __hook__('w.',__with__,['a',()=>a],'HookApiTest,b,b',false){};}}`,
          },
          {
            code: `var a = class a {}; var b = class b extends a {};`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')['_pp_a;HookApiTest']=class a{};` +
              `$hook$.global(__hook__,'HookApiTest','b','var')['_pp_b;HookApiTest']=class b extends $hook$.global(__hook__,'HookApiTest,b','a','get')['_pp_a;HookApiTest,b']{};`,
            eval: () => true,
          },
          {
            code: `'use strict'; var a = class a {}; var b = class b extends a {};`,
            hooked: `'use strict';` +
              `$hook$.global(__hook__,'HookApiTest','a','#var')['S_pp_a;HookApiTest']=class a{};` +
              `$hook$.global(__hook__,'HookApiTest','b','#var')['S_pp_b;HookApiTest']=class b extends $hook$.global(__hook__,'HookApiTest,b','a','#get')['S_pp_a;HookApiTest,b']{};`,
            eval: () => true,
          },
          {
            code: `{ (class undefined {}); (class NaN {}); (class Infinity {}); true; }`,
            hooked: `{(class __unexpected_overridden_declaration_of_undefined__{});(class __unexpected_overridden_declaration_of_NaN__{});(class __unexpected_overridden_declaration_of_Infinity__{});true;}`,
          },
        ],
        MethodDefinition: [
          {
            code: `{ class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } }`,
            hooked: `{class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } }`,
            hooked: `{class a{static m(a){return __hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set p(v){return __hook__(v=>{__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ let m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } }`,
            hooked: `{let m='m',p='p';class a{` +
              `constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[m](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[p](){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[p](v){return __hook__(v=>{__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ let m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } }`,
            hooked: `{let m='m',p='p';class a{` +
              `static[m](a){return __hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[p](){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[p](v){return __hook__(v=>{__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ with ({}) { class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({},{})){class a{` +
              `constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,constructor',false)],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `m(a){return __hook__(a=>{__hook__('#+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,m',false)],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set p(v){return __hook__(v=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({}) { class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({},{})){class a{` +
              `static m(a){return __hook__(a=>{__hook__('#+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,static m',false)],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get p(){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set p(v){return __hook__(v=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({m:'m',p:'p'}) { class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({m:'m',p:'p'},{})){class a{` +
              `constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,constructor',false)],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[__hook__('w.',__with__,['m',()=>m],'HookApiTest,a,m',false)](a){return __hook__(a=>{__hook__('#+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,m',false)],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,get p',false)](){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,set p',false)](v){return __hook__(v=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({m:'m',p:'p'}) { class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({m:'m',p:'p'},{})){class a{` +
              `static[__hook__('w.',__with__,['m',()=>m],'HookApiTest,a,static m',false)](a){return __hook__(a=>{__hook__('#+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,static m',false)],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,get p',false)](){return __hook__(()=>{return __hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,set p',false)](v){return __hook__(v=>{__hook__('#=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `var m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','m','var')['_pp_m;HookApiTest']='m',` +
              `$hook$.global(__hook__,'HookApiTest','p','var')['_pp_p;HookApiTest']='p';` +
              `$hook$.global(__hook__,'HookApiTest,a','a','class')['_pp_a;HookApiTest,a']=` +
              `class a{constructor(p){return __hook__(p=>{__hook__('#=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[$hook$.global(__hook__,'HookApiTest,a,m','m','#get')['S_pp_m;HookApiTest,a,m']](a){return ` +
              `__hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[$hook$.global(__hook__,'HookApiTest,a,get p','p','#get')['S_pp_p;HookApiTest,a,get p']](){return __hook__(()=>{return ` +
              `__hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[$hook$.global(__hook__,'HookApiTest,a,set p','p','#get')['S_pp_p;HookApiTest,a,set p']](v){return __hook__(v=>{` +
              `__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}};`,
            eval: () => true,
          },
          {
            code: `var m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','m','var')['_pp_m;HookApiTest']='m',` +
              `$hook$.global(__hook__,'HookApiTest','p','var')['_pp_p;HookApiTest']='p';` +
              `$hook$.global(__hook__,'HookApiTest,a','a','class')['_pp_a;HookApiTest,a']=` +
              `class a{static[$hook$.global(__hook__,'HookApiTest,a,static m','m','#get')['S_pp_m;HookApiTest,a,static m']](a){return ` +
              `__hook__(a=>{__hook__('#+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[$hook$.global(__hook__,'HookApiTest,a,get p','p','#get')['S_pp_p;HookApiTest,a,get p']](){return __hook__(()=>{return ` +
              `__hook__('#.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[$hook$.global(__hook__,'HookApiTest,a,set p','p','#get')['S_pp_p;HookApiTest,a,set p']](v){return __hook__(v=>{` +
              `__hook__('#=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}};`,
            eval: () => true,
          },
        ],
        MetaProperty: [
          {
            code: `{ class c { constructor() { this.nt = new.target; } } (new c()).nt === c; }`,
            hooked: `{class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__(c,null,[],'HookApiTest',true),['nt'],'HookApiTest')===c;}`,
          },
          {
            code: `{ with ({}) { class c { constructor() { this.nt = new.target; } } (new c()).nt === c; } }`,
            hooked: `{with($hook$.with({},{})){class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__('wnew',__with__,['c',[],(...args)=>new c(...args)],'HookApiTest',false),['nt'],'HookApiTest')===__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);}}`,
          },
          {
            code: `class c { constructor() { this.nt = new.target; } } (new c()).nt === c;`,
            hooked: `$hook$.global(__hook__,'HookApiTest,c','c','class')['_pp_c;HookApiTest,c']=` +
              `class c{constructor(){return __hook__(()=>{__hook__('#=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}};` +
              `__hook__('.',__hook__(c,null,[],'HookApiTest',true),['nt'],'HookApiTest')===$hook$.global(__hook__,'HookApiTest','c','get')['_pp_c;HookApiTest'];`,
            eval: () => true,
          },
        ],
        Import: [
          {
            code: `import('module.js').then()`,
            hooked: `__hook__(\'()\',__hook__((Import,ImportSpecifier)=>import(ImportSpecifier),null,[\'import()\',\'module.js\'],\'HookApiTest\',NaN),[\'then\',[]],\'HookApiTest\');`,
            eval: () => true,
          },
        ],
        Import: [
          {
            code: `import.meta.url`,
            hooked: `__hook__('.',__hook__(()=>import.meta,null,[\'import.meta\'],\'HookApiTest\',NaN),['url'],'HookApiTest');`,
            eval: () => true,
          },
        ],
        ImportDeclaration: [
          {
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
            code: `import defaultExport from "module-name.js";
import * as name1 from "module-name.js";
import { export0 } from "module-name.js";
import { export1 as alias1 } from "module-name.js";
import { export2 , export3 } from "module-name.js";
import { export4 , export5 as alias2 } from "module-name.js";
import defaultExport2, { export6, export7 as alias3 } from "module-name.js";
import defaultExport3, * as name2 from "module-name.js";
import "module-name.js";`,
            hooked: `import defaultExport from 'module-name.js';
import * as name1 from 'module-name.js';
import { export0 } from 'module-name.js';
import { export1 as alias1 } from 'module-name.js';
import {
  export2,
  export3
} from 'module-name.js';
import {
  export4,
  export5 as alias2
} from 'module-name.js';
import defaultExport2, {
  export6,
  export7 as alias3
} from 'module-name.js';
import defaultExport3, * as name2 from 'module-name.js';
import 'module-name.js';`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
            code: `import defaultExport from "module-name.mjs";
import * as name1 from "module-name.mjs";
import { export0 } from "module-name.mjs";
import { export1 as alias1 } from "module-name.mjs";
import { export2 , export3 } from "module-name.mjs";
import { export4 , export5 as alias2 } from "module-name.mjs";
import defaultExport2, { export6, export7 as alias3 } from "module-name.mjs";
import defaultExport3, * as name2 from "module-name.mjs";
import "module-name.mjs";`,
            hooked: `import defaultExport from 'module-name.mjs';
import * as name1 from 'module-name.mjs';
import { export0 } from 'module-name.mjs';
import { export1 as alias1 } from 'module-name.mjs';
import {
  export2,
  export3
} from 'module-name.mjs';
import {
  export4,
  export5 as alias2
} from 'module-name.mjs';
import defaultExport2, {
  export6,
  export7 as alias3
} from 'module-name.mjs';
import defaultExport3, * as name2 from 'module-name.mjs';
import 'module-name.mjs';`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
            code: `import defaultExport from "invalid-module-name";
import * as name1 from "invalid-module-name";
import { export0 } from "invalid-module-name";
import { export1 as alias1 } from "invalid-module-name";
import { export2 , export3 } from "invalid-module-name";
import { export4 , export5 as alias2 } from "invalid-module-name";
import defaultExport2, { export6, export7 as alias3 } from "invalid-module-name";
import defaultExport3, * as name2 from "invalid-module-name";
import "invalid-module-name";`,
            hooked: `import defaultExport from '!!! invalid script url !!!';
import * as name1 from '!!! invalid script url !!!';
import { export0 } from '!!! invalid script url !!!';
import { export1 as alias1 } from '!!! invalid script url !!!';
import {
  export2,
  export3
} from '!!! invalid script url !!!';
import {
  export4,
  export5 as alias2
} from '!!! invalid script url !!!';
import defaultExport2, {
  export6,
  export7 as alias3
} from '!!! invalid script url !!!';
import defaultExport3, * as name2 from '!!! invalid script url !!!';
import '!!! invalid script url !!!';`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            code: `import * as undefined from 'module.js';`,
            hooked: `import * as __unexpected_overridden_declaration_of_undefined__ from 'module.js';`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            code: `import { A as undefined, B as NaN, C as Infinity } from 'module.js';`,
            hooked: `import {
  A as __unexpected_overridden_declaration_of_undefined__,
  B as __unexpected_overridden_declaration_of_NaN__,
  C as __unexpected_overridden_declaration_of_Infinity__
} from 'module.js';`,
            options: 'compact=false',
            eval: () => true,
          },
        ],
        ExportNamedDeclaration: [
          {
            code: `function name1() {}
class name2 {}
let name3 = 1;
const name4 = 2;
export { name1, name2, name3, name4 };
export { name1 as alias1, name2 as alias2, name3 as alias3, name4 as alias4 };
export let name5 = name1.name, name6 = name2.name;
export const name7 = 3, name8 = 4;`,
            hooked: `function name1() {
  return __hook__(() => {
  }, null, arguments, 'HookApiTest,name1');
}
class name2 {
}
let name3 = 1;
const name4 = 2;
export {
  name1,
  name2,
  name3,
  name4
};
export {
  name1 as alias1,
  name2 as alias2,
  name3 as alias3,
  name4 as alias4
};
export let name5 = __hook__('#.', name1, ['name'], 'HookApiTest,name5'), name6 = __hook__('#.', name2, ['name'], 'HookApiTest,name6');
export const name7 = 3, name8 = 4;`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            code: `export { name1, name2 as alias2 };`,
            hooked: `export{undefined,undefined as alias2};`,
            eval: () => true,
          },
          {
            code: `export { name1, name2 as alias2 } from 'module.js';`,
            hooked: `export{name1,name2 as alias2}from'module.js';`,
            eval: () => true,
          },
          {
            code: `export { name1, name2 as alias2 } from 'module.mjs';`,
            hooked: `export{name1,name2 as alias2}from'module.mjs';`,
            eval: () => true,
          },
          {
            code: `export { name1, name2 as alias2 } from 'invalid-module';`,
            hooked: `export{name1,name2 as alias2}from'!!! invalid script url !!!';`,
            eval: () => true,
          },
        ],
        ExportDefaultDeclaration: [
          {
            code: `export default function () {}`,
            hooked: `export default function (){return __hook__(()=>{},null,arguments,'HookApiTest');}`,
            eval: () => true,
          },
          {
            code: `export default class C {}`,
            hooked: `export default class C{}`,
            eval: () => true,
          },
          {
            code: `export default 'abc';`,
            hooked: `export default'abc';`,
            eval: () => true,
          },
          {
            code: `class C {} export default C;`,
            hooked: `class C{}export default C;`,
            eval: () => true,
          },
          {
            code: `class C {} export { C as default };`,
            hooked: `class C{}export{C as default};`,
            eval: () => true,
          },
          {
            code: `class C {} export default C.name;`,
            hooked: `class C{}export default __hook__('#.',C,['name'],'HookApiTest');`,
            eval: () => true,
          },
          {
            code: `export default Date;`,
            hooked: `export default $hook$.global(__hook__,'HookApiTest','Date','#get')['S_pp_Date;HookApiTest'];`,
            eval: () => true,
          },
        ],
        ExportAllDeclaration: [
          {
            code: `export * from 'module.js';`,
            hooked: `export*from'module.js';`,
            eval: () => true,
          },
          {
            code: `export * from 'module.mjs';`,
            hooked: `export*from'module.mjs';`,
            eval: () => true,
          },
          {
            code: `export * from 'invalid-module';`,
            hooked: `export*from'!!! invalid script url !!!';`,
            eval: () => true,
          },
        ],
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
