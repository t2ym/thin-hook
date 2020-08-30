/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  function hookBenchmark(h = __hook__, r = 10000000) {
    const context = Symbol('context');
    if (typeof h === 'string') {
      switch (h) {
      case '__hook__min':
        h = __hook__min;
        break;
      case '__hook__acl':
        h = __hook__acl;
        break;
      default:
        h = __hook__;
        break;
      }
    }
    h[context] = 'context';
    contextStack.push('context');
    let f = function(a) { return a; }
    let o = {a:1,f:f};
    let results = [];
    let start = Date.now();
    for (let i = 0; i < r; i++) {
      h('.', o, ['a'], context);
    }
    let end = Date.now();
    results.push(['.', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h('=', o, ['a',i], context);
    }
    end = Date.now();
    results.push(['=', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h('()', o, ['f', [i]], context);
    }
    end = Date.now();
    results.push(['()', end - start]);
    start = Date.now();
    for (let i = 0; i < r; i++) {
      h(f, null, [i], context);
    }
    end = Date.now();
    results.push(['f', end - start]);
    contextStack.pop();
    navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, 'Chrome $1')
    console.log(navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, 'Chrome $1') + ' ' + results.map((result) => result[0] + ' in ' + result[1] + 'ms (' + (new Intl.NumberFormat()).format(parseInt(1000 * r / result[1])) +' op/s)').join(', ') + ' with ' + h.name + '\n' +
    navigator.userAgent.replace(/^.*Chrome\/([^ ]*) .*$/, '| $1 ') + '| 0.4.0-alpha.* | ' + results.map((result) => (new Intl.NumberFormat()).format(parseInt(1000 * r / result[1]))).join(' | ') + ' |');
  }
