// module
export var _mv1 = {}, _mv2 = [9];
_mv2.p2 = [4,1,2,3];
export var [_mv3, _mv4 = 2] = [_mv1, _mv2];
export var [_mv5, ..._mv6] = [_mv1, ..._mv2];
export let _mv7 = { p3: 1 }, _mv8 = [6,1,2];
export let [_mv9, _mv10 = 2] = [_mv7, _mv8];
export let [_mv11, ..._mv12] = [_mv7, ..._mv8];
[_mv5, ..._mv6] = [_mv5, ..._mv2];
[_mv5 = _mv1, ..._mv6] = [_mv1 = 1, ..._mv2];
[_mv5.p1, ..._mv6.p2] = [_mv1.p1 = 1, ..._mv2.p2];
[_mv5['p1'], ..._mv6['p2']] = [_mv1['p1'] = 1, ..._mv2['p2']];
[_mv7.p3, ...[_mv8.p4, _mv1]] = [_mv1.p1 = {}, ...[_mv2.p2, _mv3]];
[_mv7['p3']['pp3'], ...[_mv8['p4'], _mv1[_mv2]]] = [_mv1.p1 = 1, ...[_mv2['p2'], _mv3[_mv2]]];
for (_mv2 in _mv1) {}
for (_mv1 of _mv2) {}
export let _mo1 = {}, _mo2 = {};
({p1: _mo1.p1, ..._mo2} = {p1: 1, p2: 2, p3: 3})
