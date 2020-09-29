/*
@license https://github.com/t2ym/thin-hook/blob/master/plugins/target-injector/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
class InjectionHandlerBase {
  constructor(injector) {
    this.injector = injector;
  }
  parse() {
    throw new Error(`${this.constructor.name}: parse() is not implemented`);
  }
  select() {
    throw new Error(`${this.constructor.name}: select() is not implemented`);
  }
  inject() {
    throw new Error(`${this.constructor.name}: inject() is not implemented`);
  }
}

module.exports = {
  InjectionHandlerBase,
}