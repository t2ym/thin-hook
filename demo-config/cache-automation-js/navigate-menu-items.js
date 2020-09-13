/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
await new Promise(async (resolve, reject) => {
  try {
    let menuItems = document.querySelector('my-app').shadowRoot
      .children[3] // app-drawer-layout
      .querySelector('app-drawer')
      .querySelector('iron-selector')
      .querySelectorAll('a');
    let result = [];
    for (let i = menuItems.length - 1; i >= 0; i--) {
      menuItems[i].click();
      result.push(menuItems[i].href);
      await new Promise(_resolve => {
        setTimeout(_resolve, 20000); // Note: It is better to wait for specific events or conditions than just for a fixed period
      });
    }
    resolve(result);
  }
  catch (e) {
    reject(e.message);
  }
});