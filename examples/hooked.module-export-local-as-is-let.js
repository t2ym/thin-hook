const __context_mapper__ = $hook$.$(__hook__, [
  '/components/examples/module-export-local-as-is-let.js',
  '/components/examples/module-export-local-as-is-let.js,localName',
  '/components/examples/module-export-local-as-is-let.js,f1',
  '/components/examples/module-export-local-as-is-let.js,f2',
  '/components/examples/module-export-local-as-is-let.js,f3',
  '/components/examples/module-export-local-as-is-let.js,f3,a',
  '/components/examples/module-export-local-as-is-let.js,prop',
  '/components/examples/module-export-local-as-is-let.js,f4',
  '/components/examples/module-export-local-as-is-let.js,f5',
  '/components/examples/module-export-local-as-is-let.js,C,method',
  '/components/examples/module-export-local-as-is-let.js,C,localName',
  'S_p_g;/components/examples/module-export-local-as-is-let.js',
  '/components/examples/module-export-local-as-is-let.js,generator',
  '/components/examples/module-export-local-as-is-let.js,v',
  '/components/examples/module-export-local-as-is-let.js,C',
  '/components/examples/module-export-local-as-is-let.js,C2,method',
  '/components/examples/module-export-local-as-is-let.js,C3,method',
  '/components/examples/module-export-local-as-is-let.js,C4,method',
  '/components/examples/module-export-local-as-is-let.js,p',
  '/components/examples/module-export-local-as-is-let.js,p3',
  'S_p_g;/components/examples/module-export-local-as-is-let.js,p3',
  '/components/examples/module-export-local-as-is-let.js,g',
  'S_p_g;/components/examples/module-export-local-as-is-let.js,g'
]);
import * as __context_mapper__module_namespace_0 from '/components/examples/module-export-local-as-is-let.js';
export {
  localName
};
let localName = 'value', x = 'x';
// ExpressionStatement.expression
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// AssignmentExpression.right
x = __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
x += __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// AssignmentExpression.left
__hook__('m=', localName, [
  __context_mapper__[1],
  x,
  v => localName = v
], __context_mapper__[0], null);
__hook__('m+=', localName, [
  __context_mapper__[1],
  x,
  v => localName += v
], __context_mapper__[0], null);
// AssignmentPattern.right
function f1(a) {
  return __hook__((a = __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[2], null)) => {
  }, null, arguments, __context_mapper__[2]);
}
function f2(...args) {
  for (let arg of arguments)
    __hook__('#*', arg, [], __context_mapper__[3]);
  return __hook__(([a = __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[3], null)]) => {
  }, null, args, __context_mapper__[3]);
}
function f3({a}) {
  for (let arg of arguments)
    __hook__('#*', arg, [], __context_mapper__[4]);
  return __hook__(({
    a = __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[5], null)
  }) => {
  }, null, arguments, __context_mapper__[4]);
}
// AssignmentPattern.left
({
  prop: __hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[6], null)['='] = x
} = __hook__('#*', x, [], __context_mapper__[0]));
({
  prop: __hook__('#.=', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[6], null), ['p'], __context_mapper__[6])['='] = x
} = __hook__('#*', x, [], __context_mapper__[0]));
({
  prop: __hook__('#.=', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[6], null), ['p'], __context_mapper__[6])['=']
} = __hook__('#*', x, [], __context_mapper__[0]));
({
  localName: __hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[1], null)['='] = x
} = __hook__('#*', x, [], __context_mapper__[0]));
// AssignmentPattern.left (arguments) - non-module
function f4(localName) {
  return __hook__(localName => {
    localName;
  }, null, arguments, __context_mapper__[7]);
}
function f5(localName) {
  return __hook__((localName = x) => {
    localName;
  }, null, arguments, __context_mapper__[8]);
}
// UpdateExpression.argument
__hook__('m++', localName, [
  __context_mapper__[1],
  () => localName++
], __context_mapper__[0], null);
__hook__('++m', localName, [
  __context_mapper__[1],
  () => ++localName
], __context_mapper__[0], null);
__hook__('m--', localName, [
  __context_mapper__[1],
  () => localName--
], __context_mapper__[0], null);
__hook__('--m', localName, [
  __context_mapper__[1],
  () => --localName
], __context_mapper__[0], null);
// UnaryExpression.argument (typeof)
__hook__('mtypeof', localName, [
  __context_mapper__[1],
  () => typeof localName
], __context_mapper__[0], null);
//delete localName; // Syntax error
// MemberExpression.object 
__hook__('#.', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]);
// MemberExpression.object (LHS)
[__hook__('#.=', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0])['=']] = __hook__('#*', [x], [], __context_mapper__[0]);
// MemberExpression.object (method call)
__hook__('#()', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [
  'p',
  [
    'a',
    'b'
  ]
], __context_mapper__[0]);
// MemberExpression.object as UpdateExpression.argument
__hook__('#p++', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]);
__hook__('#--p', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]);
// MemberExpression.property
__hook__('#.', x, [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)], __context_mapper__[0]);
// MemberExpression.property (method call)
__hook__('#()', x, [
  __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null),
  [
    'a',
    'b'
  ]
], __context_mapper__[0]);
// MemberExpression.property (LHS)
[__hook__('#.=', x, [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)], __context_mapper__[0])['=']] = __hook__('#*', [x], [], __context_mapper__[0]);
// MemberExpression.property (Super)
class C {
  method() {
    return __hook__(() => {
      __hook__('s.', this, [
        __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[9], null),
        p => super[p]
      ], __context_mapper__[9]);
      __hook__('s()', this, [
        __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[9], null),
        [
          'a',
          'b'
        ],
        p => super[p]
      ], __context_mapper__[9]);
    }, null, arguments, __context_mapper__[9]);
  }
}
// UnaryExpression.argument(=MemberExpression).object typeof
typeof __hook__('#.', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]);
// UnaryExpression.argument(=MemberExpression).object delete
__hook__('#delete', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]);
// MethodDefinition.key (computed)
class C {
  [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[10], null)]() {
    return __hook__(() => {
    }, null, arguments, __context_mapper__[10]);
  }
}
// CallExpression.callee
__hook__('m()', localName, [
  __context_mapper__[1],
  [
    'a',
    'b'
  ],
  (...args) => localName(...args)
], __context_mapper__[0], null);
// NewExpression
__hook__('mnew', localName, [
  __context_mapper__[1],
  [
    'a',
    'b'
  ],
  (...args) => new localName(...args)
], __context_mapper__[0], null);
// BinaryExpression.left
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) + 1;
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) instanceof x;
// BinaryExpression.right
1 + __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
x instanceof __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// LogicalExpression.left
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) && true;
// LogicalExpression.right
true && __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// ConditionalExpression.test
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) ? true : false;
// ConditionalExpression.consequent
x ? __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) : false;
// ConditionalExpression.alternate
x ? true : __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// IfStatement.test
if (__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)) {
}
// WhileStatement.test
while (__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)) {
}
// DoWhileStatement.test
do {
} while (__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null));
// ExportDefaultDeclaration.declaration
export default __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// ForStatement.init
for (__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null); true; x++) {
}
// ForStatement.test
for (; __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null); x++) {
}
// ForStatement.update
for (; x < 1; __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)) {
}
// ArrayExpression.elements (Identifier)
[__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)];
[x];
[$hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]]];
// ArrayPattern.elements (Identifier)
[__hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[0], null)['=']] = __hook__('#*', [], [], __context_mapper__[0]);
[x] = __hook__('#*', [], [], __context_mapper__[0]);
[$hook$.global(__hook__, __context_mapper__[0], 'g', '#set')[__context_mapper__[11]]] = __hook__('#*', [], [], __context_mapper__[0]);
for ([__hook__('m.=', localName, [
      __context_mapper__[1],
      cb => ({
        set ['='](v) {
          localName = v;
          cb(v);
        },
        get ['=']() {
          return localName;
        }
      })
    ], __context_mapper__[0], null)['=']] in __hook__('#*', x, [], __context_mapper__[0])) {
}
for ([__hook__('m.=', localName, [
      __context_mapper__[1],
      cb => ({
        set ['='](v) {
          localName = v;
          cb(v);
        },
        get ['=']() {
          return localName;
        }
      })
    ], __context_mapper__[0], null)['=']] of __hook__('#*', x, [], __context_mapper__[0])) {
}
// SpreadElement.argument
[...__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)];
[...x];
[...$hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]]];
// RestElement.argument
[...(__hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[0], null))['=']] = __hook__('#*', [], [], __context_mapper__[0]);
[...x] = __hook__('#*', [], [], __context_mapper__[0]);
[...($hook$.global(__hook__, __context_mapper__[0], 'g', '#set'))[__context_mapper__[11]]] = __hook__('#*', [], [], __context_mapper__[0]);
for ([...(__hook__('m.=', localName, [
      __context_mapper__[1],
      cb => ({
        set ['='](v) {
          localName = v;
          cb(v);
        },
        get ['=']() {
          return localName;
        }
      })
    ], __context_mapper__[0], null))['=']] in __hook__('#*', x, [], __context_mapper__[0])) {
}
for ([...(__hook__('m.=', localName, [
      __context_mapper__[1],
      cb => ({
        set ['='](v) {
          localName = v;
          cb(v);
        },
        get ['=']() {
          return localName;
        }
      })
    ], __context_mapper__[0], null))['=']] of __hook__('#*', x, [], __context_mapper__[0])) {
}
// ForInStatement.left (Identifier)
for (__hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[0], null)['='] in __hook__('#*', x, [], __context_mapper__[0])) {
}
// ForOfStatement.left (Identifier)
for (__hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[0], null)['='] of __hook__('#*', x, [], __context_mapper__[0])) {
}
// ForInStatement.right (Identifier)
for (x in __hook__('#*', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [], __context_mapper__[0])) {
}
// ForOfStatement.right (Identifier)
for (x of __hook__('#*', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [], __context_mapper__[0])) {
}
// BinaryExpression.right (in operator)
__hook__('#in', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [x], __context_mapper__[0]);
// TaggedTemplateExpression.tag
__hook__(__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), null, [((s, r) => {
    s.raw = r;
    return s;
  })(['template'], ['template'])], __context_mapper__[0], 0);
__hook__(x, null, [((s, r) => {
    s.raw = r;
    return s;
  })(['template'], ['template'])], __context_mapper__[0], 0);
__hook__($hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]], null, [((s, r) => {
    s.raw = r;
    return s;
  })(['template'], ['template'])], __context_mapper__[0], 0);
// SequenceExpression.expressions
__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), x, $hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]];
// TemplateLiteral.expressions
`${ __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null) },${ x },${ $hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]] }`;
// AwaitExpression.argument
async (...args) => __hook__(async () => await __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), null, args, __context_mapper__[0]);
// ReturnStatement.argument
(...args) =>
  (__hook__(() => {
    return __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
  }, null, args, __context_mapper__[0]));
// ThrowStatement.argument
throw __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// YieldExpression.argument
function* generator() {
  yield* __hook__(function* () {
    yield __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[12], null);
  }, this, arguments, __context_mapper__[12]);
}
// VariableDeclarator.init
let v = __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[13], null);
// ClassExpression.superClass
(class C extends __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[14], null) {
});
// ClassDeclaration.superClass;
class C extends __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[14], null) {
}
// MemberExpression.property (Super)
class C2 {
  method() {
    return __hook__(() => {
      __hook__('s.', this, [
        __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[15], null),
        p => super[p]
      ], __context_mapper__[15]);
    }, null, arguments, __context_mapper__[15]);
  }
}
// MemberExpression.property (Super UpdateExpression)
class C3 {
  method() {
    return __hook__(() => {
      __hook__('s++', this, [
        __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[16], null),
        p => super[p]++
      ], __context_mapper__[16]);
    }, null, arguments, __context_mapper__[16]);
  }
}
// MemberExpression.object (UnaryExpression)
-__hook__('#.', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [x], __context_mapper__[0]);
// MemberExpression.property (UnaryExpression)
-__hook__('#.', x, [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)], __context_mapper__[0]);
// UnaryExpression.argument (-)
-__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null);
// AssignmentExpression.left.property (Super)
class C4 {
  method() {
    return __hook__(() => {
      __hook__('s=', this, [
        __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[17], null),
        x,
        (p, v) => super[p] = v
      ], __context_mapper__[17]);
    }, null, arguments, __context_mapper__[17]);
  }
}
// AssignmentExpression.left.object
__hook__('#=', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [
  x,
  1
], __context_mapper__[0]);
// AssignmentExpression.left.property
__hook__('#=', x, [
  __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null),
  1
], __context_mapper__[0]);
// ObjectPattern.properties[n].value (Identifier)
({
  p: __hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[18], null)['='],
  p2: x,
  p3: $hook$.global(__hook__, __context_mapper__[19], 'g', '#set')[__context_mapper__[20]]
} = __hook__('#*', x, [], __context_mapper__[0]));
// ObjectExpression.properties[n].value (Identifier)
({
  p: __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[18], null),
  p2: x,
  p3: $hook$.global(__hook__, __context_mapper__[19], 'g', '#get')[__context_mapper__[20]]
});
// ObjectPattern.properties[n] (shorthand)
({
  localName: __hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[1], null)['='],
  x,
  g: $hook$.global(__hook__, __context_mapper__[21], 'g', '#set')[__context_mapper__[22]]
} = __hook__('#*', x, [], __context_mapper__[0]));
// ObjectExpression.properties[n] (shorthand)
({
  localName: __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[1], null),
  x,
  g: $hook$.global(__hook__, __context_mapper__[21], 'g', '#get')[__context_mapper__[22]]
});
// ObjectPattern.properties[n].key (computed)
({
  [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[1], null)]: x,
  [x]: x,
  [$hook$.global(__hook__, __context_mapper__[21], 'g', '#get')[__context_mapper__[22]]]: x
} = __hook__('#*', x, [], __context_mapper__[0]));
// ObjectExpression.properties[n] (computed)
({
  [__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[1], null)]: x,
  [x]: x,
  [$hook$.global(__hook__, __context_mapper__[21], 'g', '#get')[__context_mapper__[22]]]: x
});
// ExperimentalSpreadProperty.argument
({ ...__hook__('#*', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), [], __context_mapper__[0]) });
({ ...__hook__('#*', x, [], __context_mapper__[0]) });
({ ...__hook__('#*', $hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]], [], __context_mapper__[0]) });
// ExperimentalRestProperty.argument
({...(__hook__('m.=', localName, [
    __context_mapper__[1],
    cb => ({
      set ['='](v) {
        localName = v;
        cb(v);
      },
      get ['=']() {
        return localName;
      }
    })
  ], __context_mapper__[0], null))['=']} = __hook__('#*', x, [], __context_mapper__[0]));
({...x} = __hook__('#*', x, [], __context_mapper__[0]));
({...($hook$.global(__hook__, __context_mapper__[0], 'g', '#set'))[__context_mapper__[11]]} = __hook__('#*', x, [], __context_mapper__[0]));
({...(__hook__('#.=', __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null), ['p'], __context_mapper__[0]))['=']} = __hook__('#*', x, [], __context_mapper__[0]));
({...(__hook__('#.=', x, ['p'], __context_mapper__[0]))['=']} = __hook__('#*', x, [], __context_mapper__[0]));
({...(__hook__('#.=', $hook$.global(__hook__, __context_mapper__[0], 'g', '#get')[__context_mapper__[11]], ['p'], __context_mapper__[0]))['=']} = __hook__('#*', x, [], __context_mapper__[0]));
// SwitchStatement.discriminant
switch (__hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null)) {
// SwitchCase.test
case __hook__('m', localName, [__context_mapper__[1]], __context_mapper__[0], null):
  break;
}
__hook__(() => {
}, null, [
  'export',
  __context_mapper__[0],
  __context_mapper__module_namespace_0
], __context_mapper__[0], NaN);