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
        ],
        FunctionExpression: [
          {
            code: '(function f() {return 1})',
            hooked: `(function f(){return __hook__(()=>{return 1;},null,arguments,\'${this.context},f\');});`,
            eval: 'call'
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
          }
        ],
        ArrayExpression: [
          { name: 'empty Array', code: `[]`, hooked: `[];` },
          { name: 'Array', code: `[1,'a',true]`, hooked: `[1,'a',true];` },
          { name: 'Array', code: `[1,,true]`, hooked: `[1,,true];` },
        ],
        ObjectExpression: [
          { name: 'Object', code: `({})`, hooked: `({});` },
          { name: 'Object', code: `({a:1,b:2})`, hooked: `({a:1,b:2});` },
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
      if (asynchronous) {
        this.originalResult = await evaluator(code);
        this.result = await evaluator(this.hooked);
      }
      else {
        this.originalResult = evaluator(code);
        this.result = evaluator(this.hooked);
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
