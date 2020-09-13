/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  const S_PARSED = Symbol.for('parsed');
  [ document.head, document.body ].forEach(node => {
    if (node) {
      for (let child of node.children) {
        child[S_PARSED] = true;
      }
    }
  });
  if (self.frameElement) {
    frameElement.dispatchEvent(new Event('srcdoc-load'))
  }
}
