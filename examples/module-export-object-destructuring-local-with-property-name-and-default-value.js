export let { prop: localName = 'value' } = { prop: 'value2' };
localName;
({ prop: localName = 'value3' } = { prop: 'value4' });