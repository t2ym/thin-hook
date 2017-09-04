__hook__('.', o, ['pid'], 'examples/properties.js') + 1;
__hook__('.', o, ['pid'], 'examples/properties.js') + __hook__('.', o2, [hook.global(__hook__, 'examples/properties.js', 'pvar2', 'get')._p_pvar2], 'examples/properties.js');
__hook__('.', o, [hook.global(__hook__, 'examples/properties.js', 'pvar', 'get')._p_pvar], 'examples/properties.js');
__hook__('=', __hook__('.', o, ['pid'], 'examples/properties.js'), [
  hook.global(__hook__, 'examples/properties.js', 'pid2', 'get')._p_pid2,
  __hook__('p++', __hook__('.', x, ['pid3'], 'examples/properties.js'), [hook.global(__hook__, 'examples/properties.js', 'pid4', 'get')._p_pid4], 'examples/properties.js')
], 'examples/properties.js');
__hook__('p++', o, ['pid'], 'examples/properties.js');
__hook__('++p', o, ['pid'], 'examples/properties.js');
__hook__('p--', o, [hook.global(__hook__, 'examples/properties.js', 'pvar', 'get')._p_pvar], 'examples/properties.js');
__hook__('--p', o, [hook.global(__hook__, 'examples/properties.js', 'pvar', 'get')._p_pvar], 'examples/properties.js');
__hook__('delete', x, ['pid'], 'examples/properties.js');
__hook__('delete', __hook__('.', o, ['x'], 'examples/properties.js'), ['pid'], 'examples/properties.js');
__hook__('delete', __hook__('.', o, ['x'], 'examples/properties.js'), [hook.global(__hook__, 'examples/properties.js', 'pvar', 'get')._p_pvar], 'examples/properties.js');
__hook__('()', document, [
  'createElement',
  ['script']
], 'examples/properties.js');