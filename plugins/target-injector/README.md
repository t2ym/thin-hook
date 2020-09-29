[![npm version](https://badge.fury.io/js/target-injector.svg)](https://badge.fury.io/js/target-injector)

# target-injector

Handy wrapper to inject code into targets

```js
// Insert a script element
new Injector('target.html');
  .parse()
  .select('html head') // cssauron syntax
  .validate('prependChild') // valid iff the number of selected node is 1
  .inject('<script src="injected-script.js"></script>')
  .dest(injected => console.log(`${injected}`))
  .dest('injected-target.html');

// Modify a code fragment
new Injector('target.js' /* not read as data is specified */,
    { data: 'function f() { const flag = true; }' }
  )
  .parse()
  .select( // esquery syntax
    '[type="FunctionDeclaration"][id.name="f"] ' +
    '[type="VariableDeclaration"][kind="const"] ' +
    '[type="VariableDeclarator"][id.name="flag"] ' +
    '[type="Literal"]'
  )
  .validate('replace')
  .inject('false')
  .dest(injected => console.log(`${injected}`));
```

### Install
```sh
npm i target-injector
# dependent components for handlers
npm i htmlparser2 domhandler cssauron espree estraverse esquery
```

### Set up `Injector` class
```js
const { InjectorFactory, InjectionHandlerBase } = require('target-injector');
const { HtmlInjectionHandlerFactory } = require('target-injector/HtmlInjectionHandlerFactory.js');
const { JsInjectionHandlerFactory } = require('target-injector/JsInjectionHandlerFactory.js');

// Notes: 
//  - target-injector NPM package does NOT explicitly depend on any other packages
//  - These dependent components must be installed into the user project/package
const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const cssauron = require('cssauron');
const parser = require('espree'); // can be esprima or acorn
const estraverse = 'estraverse'; // hand the specifier to patch the component in InjectorFactory
const esquery = require('esquery');

const Injector = InjectorFactory({
  html: {
    factory: HtmlInjectionHandlerFactory,
    components: {
      Parser, DomHandler, cssauron,
    },
    extensions: [ '.html', '.htm' ],
  },
  js: {
    factory: JsInjectionHandlerFactory,
    components: {
      parser, estraverse, esquery, /*, parserOptions: parserOptions */
    },
    extensions: [ '.js', '.mjs' ],
  },
});
```

## Examples

### Injection with fallback
```js
new Injector('target.html');
  .parse()
  .select('html head script[src=/injected-script.js/]', 'html head') // fallback selectors
  // Suppored actions: 'replace', 'insertBefore', 'insertAfter', 'prependChild', 'appendChild'
  .validate('replace', 'prependChild') // replace the script element if found
  .inject(...[ 'replaced', 'prepended' ].map(attr => `<script ${attr} src="injected-script.js"></script>`))
  .dest(injected => console.log(`${injected}`))
  .dest('injected-target.html');
```

### Patch JavaScript code with chaining
```js
// JavaScript: Extracted from target-injector/Injector.js
// Patch estraverse.attachComments for trailingComments to work
let estraverse = 'estraverse';
new Injector(require.resolve(estraverse))
  .parse().select(
    '[type="FunctionDeclaration"][id.name="attachComments"] ' +
    '[type="ObjectExpression"] ' +
    '[type="Property"][key.name="leave"] ' +
    '[type="BinaryExpression"][operator="<"] ' +
    '[type="MemberExpression"][object.property.name="extendedRange"]'
  ).validate('insertAfter').inject(' - 1')
  .parse().select(
    '[type="FunctionDeclaration"][id.name="attachComments"] ' +
    '[type="ObjectExpression"] ' +
    '[type="Property"][key.name="leave"] ' +
    '[type="BinaryExpression"][operator="==="] ' +
    '[type="MemberExpression"][object.property.name="extendedRange"]'
  ).validate('insertAfter').inject(' - 1')
  .parse().select(
    '[type="FunctionDeclaration"][id.name="attachComments"] ' +
    '[type="ObjectExpression"] ' +
    '[type="Property"][key.name="leave"] ' +
    '[type="BinaryExpression"][operator=">"] ' +
    '[type="MemberExpression"][object.property.name="extendedRange"]'
  ).validate('insertAfter').inject(' - 1')
  .dest(injected => {
    estraverse = {};
    let _module = { exports: estraverse };
    new Function('module', 'exports', 'require', injected)(_module, estraverse, require);
    Injector.handlers.js = handlers.js.factory(Object.assign(handlers.js.components, { estraverse }));
  });
```

### Validator and Injection Strings as a callback function
```js
// 
let injector = new Injector('target.html');
injector
  .parse()
  .select('html head meta[charset]', 'html head')
  .validate(function (injector) {
    // this === injector
    if (this.selected && this.selected.length === 1) {
      switch (this.selector) {
      case 'html head':
        injector.action = Injector.PREPEND_CHILD;
        break;
      case 'html head meta[charset]':
        injector.action = Injector.INSERT_AFTER;
        break;
      default:
        injector.action = Injector.INSERT_AFTER;
        break;
      }
      return true;
    }
    else {
      this.error = `only 1 node must be selected ${this.selected}`;
      return false;
    }
  })
  .inject(function (injector) {
    switch (this.selector) {
    case 'html head':
      attr = 'first-head-child';
      break;
    case 'html head meta[charset]':
      attr = 'after-meta-charset';
      break;
    default:
      attr = 'unknown';
      break;
    }
    return `<script ${attr} "injected-script.js"></script>`;
  }
  .dest('injected-target.html')
```

### JavaScript injection with next and prev attributes
```js
new Injector('target.js' /* not read as data is specified */, 
    { data: `const arr = ['a', 'b', 'c', 'd', 'e']` }
  )
  .parse()
  .select( // esquery syntax with next and prev attributes
    '[type="VariableDeclaration"][kind="const"] ' +
    '[type="VariableDeclarator"][id.name="arr"] ' +
    '[type="Literal"][prev.value="b"]'
  )
  .validate('insertAfter')
  .inject(`, 'inserted after c'`)
  .parse()
  .select( // esquery syntax with next and prev attributes
    '[type="VariableDeclaration"][kind="const"] ' +
    '[type="VariableDeclarator"][id.name="arr"] ' +
    '[type="Literal"][next.value=null]'
  )
  .validate('replace')
  .inject(`'replaced last element value'`)
  .dest(injected => {
    // injected === 
    // `const arr = ['a', 'b', 'c', 'inserted after c', 'd', 'replaced last element value']`
    console.log(`${injected}`);
  })
```

### Select a node with `trailingComments`
```js
new Injector('target.js' /* not read as data is specified */, { data: `
  obj.prop = {
    item1: true, // comment for item1
    item2: true, // comment for item2
  };
` })
  .parse()
  .select( // leadingComments and trailingComments are supported
    '[type="AssignmentExpression"][left.object.name="obj"][left.property.name="prop"] ' +
    '[type="ObjectExpression"] ' +
    '[type="Property"][value.trailingComments.0.value=/comment for item2/] '
  )
  .validate('replace').inject('item2: "new item2 value"')
  .dest(injected => { console.log(`${injected}`); })
```

# License

[BSD-2-Clause](https://github.com/t2ym/thin-hook/blob/master/plugins/target-injector/LICENSE.md)
