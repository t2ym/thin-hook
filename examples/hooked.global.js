hook.global(__hook__, 'examples/global.js', 'gvv', 'get').gvv;
hook.global(__hook__, 'examples/global.js', 'gvv1', 'get').gvv1, hook.global(__hook__, 'examples/global.js', 'gvv2', 'get').gvv2;
hook.global(__hook__, 'examples/global.js', 'gv0', 'var').gv0, [hook.global(__hook__, 'examples/global.js', 'gv00', 'var').gv00] = ['gv00'];
[hook.global(__hook__, 'examples/global.js', 'ga', 'var').ga, ...gb] = [
  3,
  4,
  5
];
hook.global(__hook__, 'examples/global.js', 'gv0', 'get').gv0;
hook.global(__hook__, 'examples/global.js', 'gv', 'var').gv = 1;
[hook.global(__hook__, 'examples/global.js', 'gv2', 'var').gv2, hook.global(__hook__, 'examples/global.js', 'gv3', 'var').gv3] = [
  'gv2value',
  'gv3value'
];
hook.global(__hook__, 'examples/global.js', 'gv4', 'set').gv4 = hook.global(__hook__, 'examples/global.js', 'gv', 'get').gv;
hook.global(__hook__, 'examples/global.js', 'gv2', 'set').gv2++;
({
  x: hook.global(__hook__, 'examples/global.js,x', 'xx', 'var').xx,
  z: {
    u: hook.global(__hook__, 'examples/global.js,z,u', 'uu', 'var').uu,
    v: hook.global(__hook__, 'examples/global.js,z,v', 'vv', 'var').vv
  }
} = {
  x: 11,
  z: {
    u: 12,
    v: 13
  }
});
hook.global(__hook__, 'examples/global.js,gf', 'gf', 'function').gf = function gf() {
  return __hook__(() => {
    var local1 = 1;
    let local2 = 2;
  }, this, arguments, 'examples/global.js,gf');
};
hook.global(__hook__, 'examples/global.js', 'gl', 'let').gl = 2;
hook.global(__hook__, 'examples/global.js', 'gc', 'const').gc = 3;
hook.global(__hook__, 'examples/global.js,gC', 'gC', 'class').gC = class gC extends hook.global(__hook__, 'examples/global.js,gC', 'gC2', 'get').gC2 {
};
hook.global(__hook__, 'examples/global.js', 'gC3', 'var').gC3 = class gC3 extends hook.global(__hook__, 'examples/global.js,gC3', 'gC4', 'get').gC4 {
};
__hook__(gC, null, [
  hook.global(__hook__, 'examples/global.js', 'gl', 'get').gl,
  hook.global(__hook__, 'examples/global.js', 'gv', 'get').gv
], 'examples/global.js', true);
hook.global(__hook__, 'examples/global.js', 'importScripts', 'get').importScripts('a.js');
hook.global(__hook__, 'examples/global.js', 'addEventListener', 'get').addEventListener('load', function onloadHandler(event) {
  return __hook__(event => {
  }, this, arguments, 'examples/global.js,onloadHandler');
});
hook.global(__hook__, 'examples/global.js', 'onload', 'set').onload = function onloadHandler() {
  return __hook__(() => {
  }, this, arguments, 'examples/global.js,onloadHandler');
};
hook.global(__hook__, 'examples/global.js', 'lf', 'let').lf = (...args) =>
  (__hook__((arg1, arg2 = hook.global(__hook__, 'examples/global.js', 'gv2', 'get').gv2, [arg3, arg4 = hook.global(__hook__, 'examples/global.js', 'gv4', 'get').gv4], {
    p1: arg5,
    p2: arg6 = hook.global(__hook__, 'examples/global.js,p2', 'gv2', 'get').gv2,
    p3: {
      p4: arg7 = hook.global(__hook__, 'examples/global.js,p3,p4', 'gl', 'get').gl
    }
  }) => {
    hook.global(__hook__, 'examples/global.js', 'gc', 'get').gc;
  }, this, args, 'examples/global.js'));
hook.global(__hook__, 'examples/global.js,gfunc', 'gfunc', 'function').gfunc = async function gfunc(a1, a2) {
  return __hook__(async (a1, a2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get').gv2) => {
    let l1, l2 = 1, [l3, [l4]] = [
        3,
        [4]
      ];
    [hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set').gv2, l1, [hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3, l2]] = [
      2,
      1,
      [
        3,
        2
      ]
    ];
    ({
      v1: hook.global(__hook__, 'examples/global.js,gfunc,v1', 'gv2', 'set').gv2,
      v2: l3,
      p: {
        v3: hook.global(__hook__, 'examples/global.js,gfunc,p,v3', 'gv3', 'set').gv3,
        v4: l4
      }
    } = {
      v1: hook.global(__hook__, 'examples/global.js,gfunc,v1', 'gv2', 'get').gv2,
      [hook.global(__hook__, 'examples/global.js,gfunc,v2', 'v2', 'get').v2]: l3,
      p: {
        v3: hook.global(__hook__, 'examples/global.js,gfunc,p,v3', 'gv3', 'get').gv3,
        [hook.global(__hook__, 'examples/global.js,gfunc,p,v4', 'v4', 'get').v4]: l4
      }
    });
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3++;
    ++hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3--;
    --hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3;
    l2++;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set').gv3 = l2;
    l2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3;
    [l1 = l2, hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set').gv = l2, hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set').gv2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3, l3 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3] = [
      hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get').gv,
      l1,
      hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get').gv2,
      l2
    ];
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get').gv0;
    l1;
    await l1;
    await hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get').gv0;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set').gv = l1 + l2;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set').gv2 = l2 + hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get').gv2 + l3 - hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3;
    let lC1 = class lC1 extends hook.global(__hook__, 'examples/global.js,gfunc,lC1,lC1', 'gC3', 'get').gC3 {
    };
    class lC2 extends hook.global(__hook__, 'examples/global.js,gfunc,lC2', 'gC3', 'get').gC3 {
    }
    class lC3 {
    }
    ;
    let lC4 = class lC4 {
    };
    class lC5 extends lC4 {
    }
    let lC6 = class lC6 extends lC5 {
    };
    l1 = l2 ? l3 : l4;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set').gv = hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get').gv0 ? hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get').gv2 : hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3;
    l1 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get').gv0 ? l2 : hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get').gv3;
    do {
      let ll1;
    } while (hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get').gv);
    do {
      let ll2;
      hook.global(__hook__, 'examples/global.js,gfunc', 'll1', 'set').ll1 = 1;  // global assignment
    } while (l1 === hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get').gv);
  }, this, arguments, 'examples/global.js,gfunc');
};