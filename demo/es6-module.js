class Test {
  constructor(a) {
    this._a = a;
  }
  get a() {
    return this._a;
  }
}
export const constant = 1;
export function func() { return 1; }
let variable = 1;
let variable2 = 2;
let MutatableClass = Test;
function mutateClass(C) {
  MutatableClass = C;
}
function setVariable2(v) {
  console.log('setVariable2 this = ', this); // NOTE: *this* is undefined in setv2() while *this* is the exported namespace object in module.setv2()
  variable2 = v;
}
export { variable, variable2 as v2, setVariable2 as setv2, MutatableClass, mutateClass };
export default Test;