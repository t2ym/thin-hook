export { localName };
let x = { prop: 'x' };
let { localName = 'value' } = x;
// AssignmentPattern.left (shorthand)
({ localName = x } = x);
