{
  setTimeout(function X() {
    return __hook__(() => {
      console.log('setTimeout function');
    }, this, arguments, 'examples/example4.js,X');
  }, 1000);
  setTimeout((...args) =>
    (__hook__(() => {
      console.log('setTimeout arrow function');
    }, this, args, 'examples/example4.js')), 1000);
  hook.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')('console.log("setTimeout string")', 1000);
  let f1 = (...args) =>
    (__hook__(() => {
      console.log('setTimeout f1');
    }, this, args, 'examples/example4.js,f1'));
  hook.setTimeout('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')(f1, 1000);
  setInterval(function X() {
    return __hook__(() => {
      console.log('setInterval function');
    }, this, arguments, 'examples/example4.js,X');
  }, 1000);
  setInterval((...args) =>
    (__hook__(() => {
      console.log('setInterval arrow function');
    }, this, args, 'examples/example4.js')), 1000);
  hook.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')('console.log("setInterval string")', 1000);
  let f2 = (...args) =>
    (__hook__(() => {
      console.log('setInterval f2');
    }, this, args, 'examples/example4.js,f2'));
  hook.setInterval('__hook__', [[
      'examples/example4.js',
      {}
    ]], 'method')(f2, 1000);
}