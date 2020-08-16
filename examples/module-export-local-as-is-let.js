export { localName };
let localName = 'value', x = 'x';
// ExpressionStatement.expression
localName; 
// AssignmentExpression.right
x = localName;
x += localName;
// AssignmentExpression.left
localName = x;
localName += x;
// AssignmentPattern.right
function f1(a = localName) {}
function f2([ a = localName ]) {}
function f3({ a = localName }) {}
// AssignmentPattern.left
({ prop: localName = x } = x);
({ prop: localName.p = x } = x);
({ prop: localName.p } = x);
({ localName = x } = x);
// AssignmentPattern.left (arguments) - non-module
function f4(localName) { localName; }
function f5(localName = x) { localName; }
// UpdateExpression.argument
localName++;
++localName;
localName--;
--localName;
// UnaryExpression.argument (typeof)
typeof localName;
//delete localName; // Syntax error
// MemberExpression.object 
localName.p;
// MemberExpression.object (LHS)
[localName.p] = [x];
// MemberExpression.object (method call)
localName.p('a', 'b');
// MemberExpression.object as UpdateExpression.argument
localName.p++;
--(localName.p);
// MemberExpression.property
x[localName];
// MemberExpression.property (method call)
x[localName]('a', 'b');
// MemberExpression.property (LHS)
[x[localName]] = [x];
// MemberExpression.property (Super)
class C {
  method() {
    super[localName];
    super[localName]('a', 'b');
  }
}
// UnaryExpression.argument(=MemberExpression).object typeof
typeof localName.p;
// UnaryExpression.argument(=MemberExpression).object delete
delete localName.p;
// MethodDefinition.key (computed)
class C { [localName]() {} }
// CallExpression.callee
localName('a','b');
// NewExpression
new localName('a', 'b');
// BinaryExpression.left
localName + 1;
localName instanceof x;
// BinaryExpression.right
1 + localName;
x instanceof localName;
// LogicalExpression.left
localName && true;
// LogicalExpression.right
true && localName;
// ConditionalExpression.test
localName ? true : false;
// ConditionalExpression.consequent
x ? localName : false;
// ConditionalExpression.alternate
x ? true : localName;
// IfStatement.test
if (localName) {}
// WhileStatement.test
while (localName) {}
// DoWhileStatement.test
do {} while (localName);
// ExportDefaultDeclaration.declaration
export default localName;
// ForStatement.init
for (localName; true; x++) {}
// ForStatement.test
for (; localName; x++) {}
// ForStatement.update
for (; x < 1; localName) {}
// ArrayExpression.elements (Identifier)
[localName];
[x];
[g];
// ArrayPattern.elements (Identifier)
[localName] = [];
[x] = [];
[g] = [];
for ([localName] in x) {}
for ([localName] of x) {}
// SpreadElement.argument
[...localName];
[...x];
[...g];
// RestElement.argument
[...localName] = [];
[...x] = [];
[...g] = [];
for ([...localName] in x) {}
for ([...localName] of x) {}
// ForInStatement.left (Identifier)
for (localName in x) {}
// ForOfStatement.left (Identifier)
for (localName of x) {}
// ForInStatement.right (Identifier)
for (x in localName) {}
// ForOfStatement.right (Identifier)
for (x of localName) {}
// BinaryExpression.right (in operator)
x in localName
// TaggedTemplateExpression.tag
localName`template`;
x`template`;
g`template`;
// SequenceExpression.expressions
localName, x, g;
// TemplateLiteral.expressions
`${localName},${x},${g}`;
// AwaitExpression.argument
async () => await localName;
// ReturnStatement.argument
() => { return localName; }
// ThrowStatement.argument
throw localName;
// YieldExpression.argument
function * generator() { yield localName; }
// VariableDeclarator.init
let v = localName;
// ClassExpression.superClass
(class C extends localName {});
// ClassDeclaration.superClass;
class C extends localName {}
// MemberExpression.property (Super)
class C2 { method() { super[localName]; }}
// MemberExpression.property (Super UpdateExpression)
class C3 { method() { super[localName]++; } }
// MemberExpression.object (UnaryExpression)
-localName[x];
// MemberExpression.property (UnaryExpression)
-x[localName];
// UnaryExpression.argument (-)
-localName;
// AssignmentExpression.left.property (Super)
class C4 { method() { super[localName] = x; } }
// AssignmentExpression.left.object
localName[x] = 1;
// AssignmentExpression.left.property
x[localName] = 1;
// ObjectPattern.properties[n].value (Identifier)
({ p: localName, p2: x, p3: g } = x);
// ObjectExpression.properties[n].value (Identifier)
({ p: localName, p2: x, p3: g });
// ObjectPattern.properties[n] (shorthand)
({ localName, x, g } = x);
// ObjectExpression.properties[n] (shorthand)
({ localName, x, g });
// ObjectPattern.properties[n].key (computed)
({ [localName]: x, [x]: x, [g]: x } = x);
// ObjectExpression.properties[n] (computed)
({ [localName]: x, [x]: x, [g]: x });
// ExperimentalSpreadProperty.argument
({ ...localName });
({ ...x });
({ ...g });
// ExperimentalRestProperty.argument
({ ...localName } = x);
({ ...x } = x);
({ ...g } = x);
({ ...localName.p } = x);
({ ...x.p } = x);
({ ...g.p } = x);
// SwitchStatement.discriminant
switch (localName) {
// SwitchCase.test
case localName: break;
}
