const path = require('path');
chai.assert.throws(() => {
  path.join('a', 'b');
}, /^Permission Denied:/);
chai.assert.throws(() => {
  const tty = require('tty');
}, /^Permission Denied:/);
module.exports = function add(a,b) {
  return a + b;
}
