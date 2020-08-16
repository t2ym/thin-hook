// Syntax Error: let { ...{...localName } } = { localName: 'value' };
let { prop: { ...localName } } = { prop: { localName: 'value' } };
localName;
({ prop: { ...localName } } = { prop: { localName: 'value2' }});
export { localName };