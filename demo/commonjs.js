const add = require('./commonjs2');
const XliffConv = require('xliff-conv');
chai.assert.throws(() => {
  add(1, 2);
}, /^Permission Denied:/);
chai.assert.throws(() => {
  XliffConv.xliffStates;
}, /^Permission Denied:/);

