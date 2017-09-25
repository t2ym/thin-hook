hook.global(__hook__, 'examples/global.js', 'gvv', 'get')._p_gvv;
hook.global(__hook__, 'examples/global.js', 'gvv1', 'get')._p_gvv1, hook.global(__hook__, 'examples/global.js', 'gvv2', 'get')._p_gvv2;
hook.global(__hook__, 'examples/global.js', 'gv0', 'var')._p_gv0, [hook.global(__hook__, 'examples/global.js', 'gv00', 'var')._p_gv00] = ['gv00'];
[hook.global(__hook__, 'examples/global.js', 'ga', 'var')._p_ga, ...(hook.global(__hook__, 'examples/global.js', 'gb', 'var'))._p_gb] = [
  3,
  4,
  5
];
hook.global(__hook__, 'examples/global.js', 'gv0', 'get')._p_gv0;
hook.global(__hook__, 'examples/global.js', 'gv', 'var')._p_gv = 1;
[hook.global(__hook__, 'examples/global.js', 'gv2', 'var')._p_gv2, hook.global(__hook__, 'examples/global.js', 'gv3', 'var')._p_gv3] = [
  'gv2value',
  'gv3value'
];
hook.global(__hook__, 'examples/global.js', 'gv4', 'set')._p_gv4 = hook.global(__hook__, 'examples/global.js', 'gv', 'get')._p_gv;
hook.global(__hook__, 'examples/global.js', 'gv2', 'set')._p_gv2++;
({
  x: hook.global(__hook__, 'examples/global.js,x', 'xx', 'var')._p_xx,
  z: {
    u: hook.global(__hook__, 'examples/global.js,z,u', 'uu', 'var')._p_uu,
    v: hook.global(__hook__, 'examples/global.js,z,v', 'vv', 'var')._p_vv
  }
} = {
  x: 11,
  z: {
    u: 12,
    v: 13
  }
});
hook.global(__hook__, 'examples/global.js,gf', 'gf', 'function')._p_gf = function gf() {
  return __hook__(() => {
    var local1 = 1;
    let local2 = 2;
  }, null, arguments, 'examples/global.js,gf');
};
hook.global(__hook__, 'examples/global.js', 'gl', 'let')._p_gl = 2;
hook.global(__hook__, 'examples/global.js', 'gc', 'const')._p_gc = 3;
hook.global(__hook__, 'examples/global.js,gC', 'gC', 'class')._p_gC = class gC extends hook.global(__hook__, 'examples/global.js,gC', 'gC2', 'get')._p_gC2 {
};
hook.global(__hook__, 'examples/global.js', 'gC3', 'var')._p_gC3 = class gC3 extends hook.global(__hook__, 'examples/global.js,gC3', 'gC4', 'get')._p_gC4 {
};
__hook__(gC, null, [
  hook.global(__hook__, 'examples/global.js', 'gl', 'get')._p_gl,
  hook.global(__hook__, 'examples/global.js', 'gv', 'get')._p_gv
], 'examples/global.js', true);
__hook__(importScripts, null, ['a.js'], 'examples/global.js', 0);
__hook__(addEventListener, null, [
  'load',
  function onloadHandler(event) {
    return __hook__(event => {
    }, null, arguments, 'examples/global.js,onloadHandler');
  }
], 'examples/global.js', 0);
hook.global(__hook__, 'examples/global.js', 'onload', 'set')._p_onload = function onloadHandler() {
  return __hook__(() => {
  }, null, arguments, 'examples/global.js,onloadHandler');
};
hook.global(__hook__, 'examples/global.js', 'lf', 'let')._p_lf = (...args) =>
  (__hook__((arg1, arg2 = hook.global(__hook__, 'examples/global.js', 'gv2', 'get')._p_gv2, [arg3, arg4 = hook.global(__hook__, 'examples/global.js', 'gv4', 'get')._p_gv4], {
    p1: arg5,
    p2: arg6 = hook.global(__hook__, 'examples/global.js,p2', 'gv2', 'get')._p_gv2,
    p3: {
      p4: arg7 = hook.global(__hook__, 'examples/global.js,p3,p4', 'gl', 'get')._p_gl
    }
  }) => {
    hook.global(__hook__, 'examples/global.js', 'gc', 'get')._p_gc;
  }, null, args, 'examples/global.js'));
hook.global(__hook__, 'examples/global.js,gfunc', 'gfunc', 'function')._p_gfunc = async function gfunc(a1, a2) {
  return __hook__(async (a1, a2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get')._p_gv2) => {
    let l1, l2 = 1, [l3, [l4]] = [
        3,
        [4]
      ];
    [hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set')._p_gv2, l1, [hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3, l2]] = [
      2,
      1,
      [
        3,
        2
      ]
    ];
    ({
      v1: hook.global(__hook__, 'examples/global.js,gfunc,v1', 'gv2', 'set')._p_gv2,
      v2: l3,
      p: {
        v3: hook.global(__hook__, 'examples/global.js,gfunc,p,v3', 'gv3', 'set')._p_gv3,
        v4: l4
      }
    } = {
      v1: hook.global(__hook__, 'examples/global.js,gfunc,v1', 'gv2', 'get')._p_gv2,
      [hook.global(__hook__, 'examples/global.js,gfunc,v2', 'v2', 'get')._p_v2]: l3,
      p: {
        v3: hook.global(__hook__, 'examples/global.js,gfunc,p,v3', 'gv3', 'get')._p_gv3,
        [hook.global(__hook__, 'examples/global.js,gfunc,p,v4', 'v4', 'get')._p_v4]: l4
      }
    });
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3++;
    ++hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3--;
    --hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3;
    l2++;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'set')._p_gv3 = l2;
    l2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3;
    [l1 = l2, hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set')._p_gv = l2, hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set')._p_gv2 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3, l3 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3] = [
      hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get')._p_gv,
      l1,
      hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get')._p_gv2,
      l2
    ];
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get')._p_gv0;
    l1;
    await l1;
    await hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get')._p_gv0;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set')._p_gv = l1 + l2;
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'set')._p_gv2 = l2 + hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get')._p_gv2 + l3 - hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3;
    let lC1 = class lC1 extends hook.global(__hook__, 'examples/global.js,gfunc,lC1,lC1', 'gC3', 'get')._p_gC3 {
    };
    class lC2 extends hook.global(__hook__, 'examples/global.js,gfunc,lC2', 'gC3', 'get')._p_gC3 {
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
    hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'set')._p_gv = hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get')._p_gv0 ? hook.global(__hook__, 'examples/global.js,gfunc', 'gv2', 'get')._p_gv2 : hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3;
    l1 = hook.global(__hook__, 'examples/global.js,gfunc', 'gv0', 'get')._p_gv0 ? l2 : hook.global(__hook__, 'examples/global.js,gfunc', 'gv3', 'get')._p_gv3;
    do {
      let ll1;
    } while (hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get')._p_gv);
    do {
      let ll2;
      hook.global(__hook__, 'examples/global.js,gfunc', 'll1', 'set')._p_ll1 = 1;  // global assignment
    } while (l1 === hook.global(__hook__, 'examples/global.js,gfunc', 'gv', 'get')._p_gv);
  }, null, arguments, 'examples/global.js,gfunc');
};