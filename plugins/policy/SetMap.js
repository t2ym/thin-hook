/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
class SetMap extends Map {
  constructor(target = null) {
    super(); // no init values are supported
    this.aliasMap = new Map();
    // aliasMap groups keys and aliases which have their own value set yet
    //   aliasMap.get(key1) === aliasMap.get(key1_alias1) === aliasMap.get(key1_alias2) === Set({ key1, key1_alias1, key1_alias2 }),
    //   aliasMap.get(key2) === aliasMap.get(key2_alias1) === Set({ key2, key2_alias1 }), ...
    this.target = target;
  }
  set(key, value) {
    let set;
    if (super.has(key)) {
      set = super.get(key);
    }
    else {
      set = new DistinctSet(this.target);
      if (this.aliasMap.has(key)) {
        for (let alias of this.aliasMap.get(key)) {
          super.set(alias, set); // all aliases including the original key are mapped to the same set as the key
        }
      }
      else {
        super.set(key, set);
      }
    }
    set.add(value);
    return set;
  }
  setAlias(key, alias) {
    let set = super.get(key);
    if (set) {
      super.set(alias, set); // alias is mapped to the same set as key
    }
    else {
      let aliasSet = this.aliasMap.get(key);
      if (!aliasSet) {
        aliasSet = new Set([key]); // initial aliasSet contains the original key
        this.aliasMap.set(key, aliasSet);
      }
      aliasSet.add(alias); // alias joins the aliasSet
      this.aliasMap.set(alias, aliasSet); // alias is mapped to the same aliasSet as the original key
    }
    return this;
  }
  static getStringValues(set, delim = ' ') {
    let values = [];
    if (set instanceof Set) {
      for (let v of set.values()) {
        values.push(v);
      }
    }
    else if (typeof set === 'string') {
      values.push(set);
    }
    return values.join(delim);
  }
};