export { localName };
let x = { prop: 'x' };
let { prop: localName = 'value' } = x;
// AssignmentPattern.left
({ prop: localName = x } = x);
({ prop: localName.p = x } = x);
({ prop: localName.p } = x);
