/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
class StrictModeWrapper {
  static ['#.'](o, p) { return o[p]; }
  static ['#[]'](o, p) { return o[p]; }
  static ['#*'](o) { return o; }
  static ['#in'](o, p) { return p in o; }
  static ['#()'](o, p, a) { return o[p](...a); }
  static ['#p++'](o, p) { return o[p]++; }
  static ['#++p'](o, p) { return ++o[p]; }
  static ['#p--'](o, p) { return o[p]--; }
  static ['#--p'](o, p) { return --o[p]; }
  static ['#delete'](o, p) { return delete o[p]; }
  static ['#='](o, p, v) { return o[p] = v; }
  static ['#+='](o, p, v) { return o[p] += v; }
  static ['#-='](o, p, v) { return o[p] -= v; }
  static ['#*='](o, p, v) { return o[p] *= v; }
  static ['#/='](o, p, v) { return o[p] /= v; }
  static ['#%='](o, p, v) { return o[p] %= v; }
  static ['#**='](o, p, v) { return o[p] **= v; }
  static ['#<<='](o, p, v) { return o[p] <<= v; }
  static ['#>>='](o, p, v) { return o[p] >>= v; }
  static ['#>>>='](o, p, v) { return o[p] >>>= v; }
  static ['#&='](o, p, v) { return o[p] &= v; }
  static ['#^='](o, p, v) { return o[p] ^= v; }
  static ['#|='](o, p, v) { return o[p] |= v; }
  static ['#.='](o, p) { return { set ['='](v) { o[p] = v; }, get ['=']() { return o[p]; } }; }
}