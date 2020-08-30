/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
class Stack {
  constructor(stack) {
    // Note: O(1)
    if (stack instanceof Stack) {
      this._top = stack._top;
    }
    else {
      this._top = undefined;
    }
  }
  push(item) {
    // Note: O(1)
    this._top = {
      item: item,
      next: this._top
    };
  }
  pop() {
    // Note: O(1)
    let _top = this._top;
    if (_top) {
      this._top = _top.next;
      if (this._top && !this._top.item) {
        // Note: An empty item at the top empties the stack
        this._top = undefined;
      }
      return _top.item;
    }
    else {
      return undefined;
    }
  }
  top() {
    // Note: O(1)
    if (this._top) {
      return this._top.item;
    }
    else {
      return undefined;
    }
  }
  isEmpty() {
    // Note: O(1)
    return !this._top;
  }
  toString(indent = 0) {
    // Note: O(n)?
    let array = [];
    for (let _item = this._top; _item; _item = _item.next) {
      array.unshift(_item.item);
    }
    // [bottom, ..., top]
    return JSON.stringify(array, null, indent);
  }
  get length() {
    // Note: O(n)
    let _item = this._top, n;
    for (n = 0; _item; _item = _item.next) {
      n++;
    }
    return n;
  }
}
function logContextStack(n = 2) {
  console.error('contextStack', contextStack.toString(n));
}