'use strict';
var _global_A = 1;
chai.assert.throws(() => {
  ({ inaccessible: _global_A });
}, /^Permission Denied:/)
chai.assert.throws(() => {
  ({ inaccessible: _global_A = { accessible: _global_A }.accessible });
}, /^Permission Denied:/)
