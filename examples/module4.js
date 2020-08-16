import { BaseClass } from "./module1.js";

let Args = [1, 2, 3];

class ExtendedClass extends BaseClass {
  constructor(...Args) {
    super(...Args);
  }
}

new ExtendedClass(...Args);