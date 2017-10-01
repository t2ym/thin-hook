// global
var _GV1 = {}, _GV2 = [9];
_GV2.p2 = [4,1,2,3];
var [_GV3, _GV4 = 2] = [_GV1, _GV2];
var [_GV5, ..._GV6] = [_GV1, ..._GV2];
let _GV7 = { p3: 1 }, _GV8 = [6,1,2];
let [_GV9, _GV10 = 2] = [_GV7, _GV8];
let [_GV11, ..._GV12] = [_GV7, ..._GV8];
[_GV5, ..._GV6] = [_GV5, ..._GV2];
[_GV5 = _GV1, ..._GV6] = [_GV1 = 1, ..._GV2];
[_GV5.p1, ..._GV6.p2] = [_GV1.p1 = 1, ..._GV2.p2];
[_GV5['p1'], ..._GV6['p2']] = [_GV1['p1'] = 1, ..._GV2['p2']];
[_GV7.p3, ...[_GV8.p4, _GV1]] = [_GV1.p1 = {}, ...[_GV2.p2, _GV3]];
[_GV7['p3']['pp3'], ...[_GV8['p4'], _GV1[_GV2]]] = [_GV1.p1 = 1, ...[_GV2['p2'], _GV3[_GV2]]];
chai.assert.equal(JSON.stringify([ _GV1, _GV2, _GV3, _GV4, _GV5, _GV6, _GV7, _GV8, _GV9, _GV10, _GV11, _GV12 ], null, 0),
  '[{"p1":1},[9],{"p1":1},[9],1,[9],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2]]', 'global LHS values');
let _GO1 = {}, _GO2 = {};
({p1: _GO1.p1, ..._GO2} = {p1: 1, p2: 2, p3: 3})
chai.assert.equal(JSON.stringify([_GO1, _GO2], null, 0), '[{"p1":1},{"p2":2,"p3":3}]', 'global LHS object values');
function lhsvalues() {
  // local
  var lv1 = {}, lv2 = [9];
  lv2.p2 = [4,1,2,3];
  var [lv3, lv4 = 2] = [lv1, lv2];
  var [lv5, ...lv6] = [lv1, ...lv2];
  let lv7 = { p3: 1 }, lv8 = [6,1,2];
  let [lv9, lv10 = 2] = [lv7, lv8];
  let [lv11, ...lv12] = [lv7, ...lv8];
  [lv5, ...lv6] = [lv5, ...lv2];
  [lv5 = lv1, ...lv6] = [lv1 = 1, ...lv2];
  [lv5.p1, ...lv6.p2] = [lv1.p1 = 1, ...lv2.p2];
  [lv5['p1'], ...lv6['p2']] = [lv1['p1'] = 1, ...lv2['p2']];
  [lv7.p3, ...[lv8.p4, lv1]] = [lv1.p1 = {}, ...[lv2.p2, lv3]];
  [lv7['p3']['pp3'], ...[lv8['p4'], lv1[lv2]]] = [lv1.p1 = 1, ...[lv2['p2'], lv3[lv2]]];
  chai.assert.equal(JSON.stringify([ lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10, lv11, lv12 ], null, 0),
    '[{"p1":1},[9],{"p1":1},[9],1,[9],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2]]', 'global LHS values');
  let lO1 = {}, lO2 = {};
  ({p1: lO1.p1, ...lO2} = {p1: 1, p2: 2, p3: 3})
  chai.assert.equal(JSON.stringify([lO1, lO2], null, 0), '[{"p1":1},{"p2":2,"p3":3}]', 'global LHS object values');

  with ({}) {
    // with scope
    var wv1 = {}, wv2 = [9];
    wv2.p2 = [4,1,2,3];
    var [wv3, wv4 = 2] = [wv1, wv2];
    var [wv5, ...wv6] = [wv1, ...wv2];
    let wv7 = { p3: 1 }, wv8 = [6,1,2];
    let [wv9, wv10 = 2] = [wv7, wv8];
    let [wv11, ...wv12] = [wv7, ...wv8];
    [wv5, ...wv6] = [wv5, ...wv2];
    [wv5 = wv1, ...wv6] = [wv1 = 1, ...wv2];
    [wv5.p1, ...wv6.p2] = [wv1.p1 = 1, ...wv2.p2];
    [wv5['p1'], ...wv6['p2']] = [wv1['p1'] = 1, ...wv2['p2']];
    [wv7.p3, ...[wv8.p4, wv1]] = [wv1.p1 = {}, ...[wv2.p2, wv3]];
    [wv7['p3']['pp3'], ...[wv8['p4'], wv1[wv2]]] = [wv1.p1 = 1, ...[wv2['p2'], wv3[wv2]]];
    chai.assert.equal(JSON.stringify([ wv1, wv2, wv3, wv4, wv5, wv6, wv7, wv8, wv9, wv10, wv11, wv12 ], null, 0),
      '[{"p1":1},[9],{"p1":1},[9],1,[9],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2],{"p3":{"pp3":1}},[6,1,2]]', 'global LHS values');
    let wO1 = {}, wO2 = {};
    ({p1: wO1.p1, ...wO2} = {p1: 1, p2: 2, p3: 3})
    chai.assert.equal(JSON.stringify([wO1, wO2], null, 0), '[{"p1":1},{"p2":2,"p3":3}]', 'global LHS object values');
  }
}
lhsvalues();