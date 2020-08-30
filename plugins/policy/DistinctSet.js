/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
// DistinctSet treats values are redundant if typeof this.target[value2] === 'object' && this.target[value1] === this.target[value2]
class DistinctSet extends Set {
  constructor(target = Object.create(null)) {
    super();
    this.distinctObjects = new Set();
    this.allValues = new Set();
    this.target = target;
  }
  add(value) {
    if (this.allValues.has(value)) {
      return this;
    }
    let object = this.target[value];
    if (typeof object === 'object') {
      if (!this.distinctObjects.has(object)) {
        this.distinctObjects.add(object);
        super.add(value);
      }
    }
    else {
      super.add(value);
    }
    this.allValues.add(value);
    return this;
  }
  has(value) {
    return this.allValues.has(value); // behaves as all values are in the set
  }
  rawHas(value) {
    return super.has(value);
  }
  // Unsupported: clear(), delete()
}