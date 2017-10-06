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
        'cachedMethod', // [2] contextGeneratorName
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
            hooked: "$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;`a = ${$hook$.global(__hook__,'HookApiTest','a','get')._pp_a};`;",
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
            hooked: "$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1," +
              "$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=2," +
              "$hook$.global(__hook__,'HookApiTest','c','var')._pp_c," +
              "$hook$.global(__hook__,'HookApiTest','tag','var')._pp_tag=" +
              "function(str,p1,p2,p3){return __hook__((str,p1,p2,p3)=>{return " +
              "__hook__('.',str,[0],'HookApiTest')+p1+" +
              "__hook__('.',str,[1],'HookApiTest')+p2+" +
              "__hook__('.',str,[2],'HookApiTest')+(p1+p2)+" +
              "__hook__('.',str,[3],'HookApiTest');},null,arguments,'HookApiTest');};" +
              "$hook$.global(__hook__,'HookApiTest','tag','get')._pp_tag" +
              "`plus: ${$hook$.global(__hook__,'HookApiTest','a','get')._pp_a} + " +
              "${$hook$.global(__hook__,'HookApiTest','b','get')._pp_b} = " +
              "${$hook$.global(__hook__,'HookApiTest','c','get')._pp_c};`;",
          },
        ],
        Identifier: [
          { code: 'a', hooked: 'a;', eval: 'throw', options: 'initialScope', customOptionParams: { initialScope: { a: true } } },
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
            hooked: '$hook$.global(__hook__,\'HookApiTest,f\',\'f\',\'function\')._pp_f=function f(){return __hook__(()=>{return 1;},null,arguments,\'HookApiTest,f\');};',
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
            hooked: `$hook$.global(__hook__,'HookApiTest,f','f','function')._pp_f=function*f(v){yield*__hook__(function*(v){yield v;},this,arguments,'HookApiTest,f');};` +
              `__hook__('()',__hook__(f,null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;` +
              `__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield $hook$.global(__hook__,'HookApiTest,f','a','get')._pp_a;},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: 'var a = [1]; (function * f() {yield *a;})().next();',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=[1];` +
              `__hook__('()',__hook__(function*f(){yield*__hook__(function*(){yield*$hook$.global(__hook__,'HookApiTest,f','a','get')._pp_a;},this,arguments,'HookApiTest,f');},null,[],'HookApiTest',0),['next',[]],'HookApiTest');`,
          },
          {
            code: 'var a = 1; { with({}) { (function * f() {yield a;})().next(); } }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;` +
              `{with($hook$.with({},{})){__hook__('()',function*f(){yield*__hook__(function*(){yield __hook__('w.',__with__,['a',()=>a],'HookApiTest,f',false);},this,arguments,'HookApiTest,f');}(),['next',[]],'HookApiTest');}}`,
          },
          {
            code: 'var a = [1]; { with({}) { (function * f() {yield *a;})().next(); } }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=[1];` +
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;if($hook$.global(__hook__,'HookApiTest','a','get')._pp_a){$hook$.global(__hook__,'HookApiTest','a','get')._pp_a;}`,
          },
          {
            code: 'var a = 0, b = 1; if (a) { a; } else { b; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=0,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=1;if($hook$.global(__hook__,'HookApiTest','a','get')._pp_a){$hook$.global(__hook__,'HookApiTest','a','get')._pp_a;}else{$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;}`,
          },
        ],
        SwitchStatement: [
          {
            code: 'var a = 1; switch (a) { case 1: 1; break; default: 2; break; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;switch($hook$.global(__hook__,'HookApiTest','a','get')._pp_a){case 1:1;break;default:2;break;}`,
          },
        ],
        SwitchCase: [
          {
            code: 'var a = 1, b = 2; switch (a) { case b: 1; break; default: 2; break; }',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=2;switch($hook$.global(__hook__,'HookApiTest','a','get')._pp_a){case $hook$.global(__hook__,'HookApiTest','b','get')._pp_b:1;break;default:2;break;}`,
          },
        ],
        ThrowStatement: [
          {
            code: 'var a = 1; throw a;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1;throw $hook$.global(__hook__,'HookApiTest','a','get')._pp_a;`,
            eval: 'throw',
          },
        ],
        TryStatement: [
          {
            code: 'try { x; } catch (e) { e.name; }',
            hooked: `try{$hook$.global(__hook__,'HookApiTest','x','get')._pp_x;}catch(e){__hook__('.',e,['name'],'HookApiTest');}`,
          },
        ],
        WhileStatement: [
          {
            code: 'with({a: 2}) { while (a--) {}; a; }',
            hooked: `with($hook$.with({a:2},{})){while(__hook__('w--',__with__,['a',()=>a--],'HookApiTest',false)){};__hook__('w.',__with__,['a',()=>a],'HookApiTest',false);}`,
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
            hooked: `[$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b,$hook$.global(__hook__,'HookApiTest','c','var')._pp_c]=[0,2,0];for($hook$.global(__hook__,'HookApiTest','a','get')._pp_a;$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;$hook$.global(__hook__,'HookApiTest','c','get')._pp_c){break;}$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
          },
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')._pp_c=0;for($hook$.global(__hook__,'HookApiTest','a','set')._pp_a of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,[],'HookApiTest')){$hook$.global(__hook__,'HookApiTest','c','set')._pp_c+=$hook$.global(__hook__,'HookApiTest','a','get')._pp_a;}`,
          },
          {
            code: `var b = [1, 2], c = 0; for (let a of b) { c += a; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')._pp_c=0;for(let a of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,[],'HookApiTest')){$hook$.global(__hook__,'HookApiTest','c','set')._pp_c+=a;}`,
          },
          /* Issue #134
          {
            code: `var b = [1, 2], c = 0; for (var a of b) { c += a; }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=[1,2],$hook$.global(__hook__,'HookApiTest','c','var')._pp_c=0;for($hook$.global(__hook__,'HookApiTest','a','var')._pp_a of __hook__('*',$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,[],'HookApiTest')){$hook$.global(__hook__,'HookApiTest','c','set')._pp_c+=a;}`,
          },
          */
        ],
        VariableDeclaration: [
          {
            code: 'var a = 2; a;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=2;$hook$.global(__hook__,'HookApiTest','a','get')._pp_a;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','let')._pp_a=3;`,
            eval: () => true,
          },
          {
            code: 'const a = 4;',
            hooked: `$hook$.global(__hook__,'HookApiTest','a','const')._pp_a=4;`,
            eval: () => true,
          },
          {
            code: '(function () { var a = 10; return a; })',
            hooked: `(function(){return __hook__(()=>{var a=10;return a;},null,arguments,'HookApiTest');});`,
            eval: 'call',
          },
        ],
        ThisExpression: [
          { code: 'this === window', hooked: `this===$hook$.global(__hook__,'HookApiTest','window','get')._pp_window;` },
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
          /* Issue #137
          {
            code: `{ with ({}) { let [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d]; } }`,
            hooked: ``,
          },
          */
          {
            code: `var [a, b = a, [c], {_d: d}] = [1, 2, [3], {_d:4}]; [a,b,c,d];`,
            hooked: `[$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `[$hook$.global(__hook__,'HookApiTest','c','var')._pp_c],` +
              `{_d:$hook$.global(__hook__,'HookApiTest,_d','d','var')._pp_d}]=[1,2,[3],{_d:4}];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','get')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','get')._pp_d];`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','var')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','var')._pp_d,` +
              `$hook$.global(__hook__,'HookApiTest','e','var')._pp_e={};` +
              `[$hook$.global(__hook__,'HookApiTest','a','set')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','set')._pp_b=$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `[$hook$.global(__hook__,'HookApiTest','c','set')._pp_c],` +
              `{_d:$hook$.global(__hook__,'HookApiTest,_d','d','set')._pp_d},` +
              `__hook__('.=',e,['p'],'HookApiTest')['=']]=[1,2,[3],{_d:4},5];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','get')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','get')._pp_d,` +
              `__hook__('.',e,['p'],'HookApiTest')];`,
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
            hooked: `[...($hook$.global(__hook__,'HookApiTest','a','var'))._pp_a]=[1,2,3];$hook$.global(__hook__,'HookApiTest','a','get')._pp_a;`,
          },
          {
            code: `var a,b,c = {},d = {},e,f = []; [...a] = [...[b]] = [...c.p] = [...[d.p]] = [...[...e]] = [...[f[0], f[1], f[2]]] = [1,2,3]; [a,b,c,d,e,f];`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','var')._pp_c={},` +
              `$hook$.global(__hook__,'HookApiTest','d','var')._pp_d={},` +
              `$hook$.global(__hook__,'HookApiTest','e','var')._pp_e,` +
              `$hook$.global(__hook__,'HookApiTest','f','var')._pp_f=[];` +
              `[...($hook$.global(__hook__,'HookApiTest','a','set'))._pp_a]=` +
              `[...[$hook$.global(__hook__,'HookApiTest','b','set')._pp_b]]=` +
              `[...(__hook__('.=',c,['p'],'HookApiTest'))['=']]=` +
              `[...[__hook__('.=',d,['p'],'HookApiTest')['=']]]=` +
              `[...[...($hook$.global(__hook__,'HookApiTest','e','set'))._pp_e]]=` +
              `[...[__hook__('.=',f,[0],'HookApiTest')['='],` +
              `__hook__('.=',f,[1],'HookApiTest')['='],` +
              `__hook__('.=',f,[2],'HookApiTest')['=']]]=[1,2,3];` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','get')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','get')._pp_d,` +
              `$hook$.global(__hook__,'HookApiTest','e','get')._pp_e,` +
              `$hook$.global(__hook__,'HookApiTest','f','get')._pp_f];`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=[3,4];[1,2,...$hook$.global(__hook__,'HookApiTest','a','get')._pp_a];`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=[3,4],` +
              `$hook$.global(__hook__,'HookApiTest','f','var')._pp_f=(...args)=>__hook__(a=>a,null,args,'HookApiTest');` +
              `__hook__(f,null,[1,2,...$hook$.global(__hook__,'HookApiTest','a','get')._pp_a],'HookApiTest',0);`,
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
          /* Issue #136
          {
            code: `{ with ({}) { let { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o]; } }`,
            hooked: ``,
            //options: 'compact=false',
          },
          */
          {
            code: `var { _a: a, _b: b = a, c, _d: [d], _e: { _f: f }, _g: o } = { _a: 1, _b: 2, c: 3, _d: [4], _e: {_f: 5}, _g: 6 }; [a,b,c,d,f,o];`,
            hooked: `({_a:$hook$.global(__hook__,'HookApiTest,_a','a','var')._pp_a,` +
              `_b:$hook$.global(__hook__,'HookApiTest,_b','b','var')._pp_b=$hook$.global(__hook__,'HookApiTest,_b','a','get')._pp_a,` +
              `c:$hook$.global(__hook__,'HookApiTest,c','c','var')._pp_c,` +
              `_d:[$hook$.global(__hook__,'HookApiTest,_d','d','var')._pp_d],` +
              `_e:{_f:$hook$.global(__hook__,'HookApiTest,_e,_f','f','var')._pp_f},` +
              `_g:$hook$.global(__hook__,'HookApiTest,_g','o','var')._pp_o}=` +
              `{_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','get')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','get')._pp_d,` +
              `$hook$.global(__hook__,'HookApiTest','f','get')._pp_f,` +
              `$hook$.global(__hook__,'HookApiTest','o','get')._pp_o];`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','var')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','var')._pp_d,` +
              `$hook$.global(__hook__,'HookApiTest','f','var')._pp_f,` +
              `$hook$.global(__hook__,'HookApiTest','o','var')._pp_o;` +
              `({_a:$hook$.global(__hook__,'HookApiTest,_a','a','set')._pp_a,` +
              `_b:$hook$.global(__hook__,'HookApiTest,_b','b','set')._pp_b=$hook$.global(__hook__,'HookApiTest,_b','a','get')._pp_a,` +
              `c:$hook$.global(__hook__,'HookApiTest,c','c','set')._pp_c,` +
              `_d:[$hook$.global(__hook__,'HookApiTest,_d','d','set')._pp_d],` +
              `_e:{_f:$hook$.global(__hook__,'HookApiTest,_e,_f','f','set')._pp_f},` +
              `_g:$hook$.global(__hook__,'HookApiTest,_g','o','set')._pp_o}={_a:1,_b:2,c:3,_d:[4],_e:{_f:5},_g:6});` +
              `[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,` +
              `$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,` +
              `$hook$.global(__hook__,'HookApiTest','c','get')._pp_c,` +
              `$hook$.global(__hook__,'HookApiTest','d','get')._pp_d,` +
              `$hook$.global(__hook__,'HookApiTest','f','get')._pp_f,` +
              `$hook$.global(__hook__,'HookApiTest','o','get')._pp_o];`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=2;` +
              `({m(p){return __hook__(p=>{return p;},null,arguments,'HookApiTest,m');},` +
              `[$hook$.global(__hook__,'HookApiTest,a','a','get')._pp_a]:$hook$.global(__hook__,'HookApiTest,a','b','get')._pp_b});`,
          },
          /* Issue #135
          {
            code: `var a = 1; ({ a });`,
            hooked: `$hook$.global(__hook__, 'HookApiTest', 'a', 'var')._pp_a = 1;({a:$hook$.global(__hook__, 'HookApiTest', 'a', 'get')._pp_a});`,
          },
          */
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
        ],
        UpdateExpression: [
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=2;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a+$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a-$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a/$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a*$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a%$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a|$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a^$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a&$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a==$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a!=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a===$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a!==$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a<$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a<=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a>$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a>=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a<<$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a>>$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a>>>$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a='a',$hook$.global(__hook__,'HookApiTest','b','var')._pp_b={a:1};__hook__('in',$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a],'HookApiTest');`,
          },
          {
            code: `{ let a = {}; a instanceof Object; }`,
            hooked: `{let a={};a instanceof $hook$.global(__hook__,'HookApiTest','Object','get')._pp_Object;}`,
          },
          {
            code: `with ({a:{}}) { a instanceof Object; }`,
            hooked: `with($hook$.with({a:{}},{})){__hook__('w.',__with__,['a',()=>a],'HookApiTest',false)instanceof __hook__('w.',__with__,['Object',()=>Object],'HookApiTest',false);}`,
          },
          {
            code: `var a = {}; a instanceof Object;`,
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a={};$hook$.global(__hook__,'HookApiTest','a','get')._pp_a instanceof $hook$.global(__hook__,'HookApiTest','Object','get')._pp_Object;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=1;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=1;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a+=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a-=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a*=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a/=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a%=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a<<=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a>>=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a>>>=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a|=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a^=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','set')._pp_a&=$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=false,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=true;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a&&$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a||$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a={b:1},$hook$.global(__hook__,'HookApiTest','b','var')._pp_b='b';` +
              `__hook__('.',a,['b'],'HookApiTest');` +
              `__hook__('.',a,[$hook$.global(__hook__,'HookApiTest','b','get')._pp_b],'HookApiTest');` +
              `__hook__('=',a,['b',2],'HookApiTest');` +
              `__hook__('=',a,[$hook$.global(__hook__,'HookApiTest','b','get')._pp_b,2],'HookApiTest');`,
          },
          {
            code: `{ class b { constructor(p) { this._p = p; } get p() { return this._p; }} class c extends b { get p() { let _p = 'p'; return super[_p] + super['p'] + super.p; } } (new c(1)).p; }`,
            hooked: `{class b{constructor(p){return __hook__(p=>{__hook__('=',this,['_p',p],'HookApiTest,b,constructor');},null,arguments,'HookApiTest,b,constructor');}` +
              `get p(){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,b,get p');},null,arguments,'HookApiTest,b,get p');}}` +
              `class c extends b{get p(){return __hook__(()=>{let _p='p';return ` +
                `__hook__('s.',this,[_p,p=>super[p]],'HookApiTest,c,get p')+` +
                `__hook__('s.',this,['p',p=>super[p]],'HookApiTest,c,get p')+` +
                `__hook__('s.',this,['p',p=>super[p]],'HookApiTest,c,get p');},null,arguments,'HookApiTest,c,get p');}}` +
                `__hook__('.',__hook__(c,null,[1],'HookApiTest',true),['p'],'HookApiTest');}`,
            //options: 'compact=false',
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=2,$hook$.global(__hook__,'HookApiTest','c','var')._pp_c=3;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a?$hook$.global(__hook__,'HookApiTest','b','get')._pp_b:$hook$.global(__hook__,'HookApiTest','c','get')._pp_c;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=1,` +
              `$hook$.global(__hook__,'HookApiTest','f','var')._pp_f=function(a){return __hook__(a=>{return a+1;},null,arguments,'HookApiTest');};` +
              `__hook__(f,null,[$hook$.global(__hook__,'HookApiTest','a','get')._pp_a],'HookApiTest',0);`,
          },
          /* Issue #133
          {
            code: `{ with ({a:1,f:function f(a) { return a + 1; }}) { f(a); } }`,
            hooked: ``,
          },
          */
          {
            code: `{ class b { constructor(p) { this.p = p; } } class c extends b { constructor(p) { super(p); } } (new c(1)).p; }`,
            hooked: `{class b{constructor(p){return __hook__(p=>{__hook__('=',this,['p',p],'HookApiTest,b,constructor');},null,arguments,'HookApiTest,b,constructor');}}` +
              `class c extends b{constructor(p){return __hook__(` +
                `p=>{__hook__((newTarget,...args)=>super(...args),null,[new.target,p],'HookApiTest,c,constructor','');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__(c,null,[1],'HookApiTest',true),['p'],'HookApiTest');}`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=class{};__hook__(a,null,[1],'HookApiTest',true);`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a,$hook$.global(__hook__,'HookApiTest','b','var')._pp_b;` +
              `$hook$.global(__hook__,'HookApiTest','a','get')._pp_a,$hook$.global(__hook__,'HookApiTest','b','get')._pp_b;`,
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
            hooked: `$hook$.global(__hook__,'HookApiTest,a','a','class')._pp_a=class a{};` +
              `$hook$.global(__hook__,'HookApiTest,b','b','class')._pp_b=class b extends $hook$.global(__hook__,'HookApiTest,b','a','get')._pp_a{};`,
            eval: () => true,
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
            hooked: `$hook$.global(__hook__,'HookApiTest','a','var')._pp_a=class a{};` +
              `$hook$.global(__hook__,'HookApiTest','b','var')._pp_b=class b extends $hook$.global(__hook__,'HookApiTest,b','a','get')._pp_a{};`,
            eval: () => true,
          },
        ],
        MethodDefinition: [
          {
            code: `{ class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } }`,
            hooked: `{class a{constructor(p){return __hook__(p=>{__hook__('=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `m(a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get p(){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set p(v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } }`,
            hooked: `{class a{static m(a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get p(){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set p(v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ let m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } }`,
            hooked: `{let m='m',p='p';class a{` +
              `constructor(p){return __hook__(p=>{__hook__('=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[m](a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[p](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[p](v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ let m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } }`,
            hooked: `{let m='m',p='p';class a{` +
              `static[m](a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[p](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[p](v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}`,
          },
          {
            code: `{ with ({}) { class a { constructor(p) { this._p = p; } m(a) { this._p += a; } get p() { return this._p; } set p(v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({},{})){class a{` +
              `constructor(p){return __hook__(p=>{__hook__('=',this,['_p',__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,constructor',false)],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `m(a){return __hook__(a=>{__hook__('+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,m',false)],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get p(){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set p(v){return __hook__(v=>{__hook__('=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({}) { class a { static m(a) { this._p += a; } static get p() { return this._p; } static set p(v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({},{})){class a{` +
              `static m(a){return __hook__(a=>{__hook__('+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,static m',false)],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get p(){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set p(v){return __hook__(v=>{__hook__('=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({m:'m',p:'p'}) { class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({m:'m',p:'p'},{})){class a{` +
              `constructor(p){return __hook__(p=>{__hook__('=',this,['_p',__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,constructor',false)],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[__hook__('w.',__with__,['m',()=>m],'HookApiTest,a,m',false)](a){return __hook__(a=>{__hook__('+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,m',false)],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,get p',false)](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,set p',false)](v){return __hook__(v=>{__hook__('=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `{ with ({m:'m',p:'p'}) { class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } } } }`,
            hooked: `{with($hook$.with({m:'m',p:'p'},{})){class a{` +
              `static[__hook__('w.',__with__,['m',()=>m],'HookApiTest,a,static m',false)](a){return __hook__(a=>{__hook__('+=',this,['_p',__hook__('w.',__with__,['a',()=>a],'HookApiTest,a,static m',false)],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,get p',false)](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[__hook__('w.',__with__,['p',()=>p],'HookApiTest,a,set p',false)](v){return __hook__(v=>{__hook__('=',this,['_p',__hook__('w.',__with__,['v',()=>v],'HookApiTest,a,set p',false)],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}}}}`,
          },
          {
            code: `var m = 'm', p = 'p'; class a { constructor(p) { this._p = p; } [m](a) { this._p += a; } get [p]() { return this._p; } set [p](v) { this._p = v; } }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','m','var')._pp_m='m',$hook$.global(__hook__,'HookApiTest','p','var')._pp_p='p';` +
              `$hook$.global(__hook__,'HookApiTest,a','a','class')._pp_a=class a{` +
              `constructor(p){return __hook__(p=>{__hook__('=',this,['_p',p],'HookApiTest,a,constructor');},null,arguments,'HookApiTest,a,constructor');}` +
              `[$hook$.global(__hook__,'HookApiTest,a,m','m','get')._pp_m](a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,m');},null,arguments,'HookApiTest,a,m');}` +
              `get[$hook$.global(__hook__,'HookApiTest,a,get p','p','get')._pp_p](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `set[$hook$.global(__hook__,'HookApiTest,a,set p','p','get')._pp_p](v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}};`,
            eval: () => true,
          },
          {
            code: `var m = 'm', p = 'p'; class a { static [m](a) { this._p += a; } static get [p]() { return this._p; } static set [p](v) { this._p = v; } }`,
            hooked: `$hook$.global(__hook__,'HookApiTest','m','var')._pp_m='m',$hook$.global(__hook__,'HookApiTest','p','var')._pp_p='p';` +
              `$hook$.global(__hook__,'HookApiTest,a','a','class')._pp_a=class a{` +
              `static[$hook$.global(__hook__,'HookApiTest,a,static m','m','get')._pp_m](a){return __hook__(a=>{__hook__('+=',this,['_p',a],'HookApiTest,a,static m');},null,arguments,'HookApiTest,a,static m');}` +
              `static get[$hook$.global(__hook__,'HookApiTest,a,get p','p','get')._pp_p](){return __hook__(()=>{return __hook__('.',this,['_p'],'HookApiTest,a,get p');},null,arguments,'HookApiTest,a,get p');}` +
              `static set[$hook$.global(__hook__,'HookApiTest,a,set p','p','get')._pp_p](v){return __hook__(v=>{__hook__('=',this,['_p',v],'HookApiTest,a,set p');},null,arguments,'HookApiTest,a,set p');}};`,
            eval: () => true,
          },
        ],
        MetaProperty: [
          {
            code: `{ class c { constructor() { this.nt = new.target; } } (new c()).nt === c; }`,
            hooked: `{class c{constructor(){return __hook__(()=>{__hook__('=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__(c,null,[],'HookApiTest',true),['nt'],'HookApiTest')===c;}`,
          },
          {
            code: `{ with ({}) { class c { constructor() { this.nt = new.target; } } (new c()).nt === c; } }`,
            hooked: `{with($hook$.with({},{})){class c{constructor(){return __hook__(()=>{__hook__('=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}}` +
              `__hook__('.',__hook__('wnew',__with__,['c',[],(...args)=>new c(...args)],'HookApiTest',false),['nt'],'HookApiTest')===__hook__('w.',__with__,['c',()=>c],'HookApiTest',false);}}`,
          },
          {
            code: `class c { constructor() { this.nt = new.target; } } (new c()).nt === c;`,
            hooked: `$hook$.global(__hook__,'HookApiTest,c','c','class')._pp_c=` +
              `class c{constructor(){return __hook__(()=>{__hook__('=',this,['nt',new.target],'HookApiTest,c,constructor');},null,arguments,'HookApiTest,c,constructor');}};` +
              `__hook__('.',__hook__(c,null,[],'HookApiTest',true),['nt'],'HookApiTest')===$hook$.global(__hook__,'HookApiTest','c','get')._pp_c;`,
            eval: () => true,
          },
        ],
        ImportDeclaration: [
          {
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
            code: `import defaultExport from "module-name";
import * as name1 from "module-name";
import { export0 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export2 , export3 } from "module-name";
import { export4 , export5 as alias2 } from "module-name";
import defaultExport2, { export6, export7 as alias3 } from "module-name";
import defaultExport3, * as name2 from "module-name";
import "module-name";`,
            hooked: `import defaultExport from 'module-name';
import * as name1 from 'module-name';
import { export0 } from 'module-name';
import { export1 as alias1 } from 'module-name';
import {
  export2,
  export3
} from 'module-name';
import {
  export4,
  export5 as alias2
} from 'module-name';
import defaultExport2, {
  export6,
  export7 as alias3
} from 'module-name';
import defaultExport3, * as name2 from 'module-name';
import 'module-name';`,
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
export let name5 = __hook__('.', name1, ['name'], 'HookApiTest,name5'), name6 = __hook__('.', name2, ['name'], 'HookApiTest,name6');
export const name7 = 3, name8 = 4;`,
            options: 'compact=false',
            eval: () => true,
          },
          {
            code: `export { name1, name2 as alias2 } from 'module.js';`,
            hooked: `export{undefined,undefined as alias2}from'module.js';`,
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
            hooked: `class C{}export default __hook__('.',C,['name'],'HookApiTest');`,
            eval: () => true,
          },
        ],
        ExportAllDeclaration: [
          {
            code: `export * from 'module.js';`,
            hooked: `export*from'module.js';`,
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
        assert.equal(JSON.stringify(this.result, null, 0), JSON.stringify(this.originalResult, null, 0), 'hooked result from hooked "' + name + '"');
      }
      else {
        assert.equal(this.result, this.originalResult, 'hooked result from hooked "' + name + '"');
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
