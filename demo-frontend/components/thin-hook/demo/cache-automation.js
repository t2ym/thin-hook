async function automationFunction() {
  /*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
  */
/*__BEGIN__*/
  const timeoutForBundleSetFetched = 60000; // 60sec
  // wait for bundle-set-fetched event
  await new Promise((resolve, reject) => {
    const start = Date.now();
    let intervalId = setInterval(async () => {
      const now = Date.now();
      if (now - start > timeoutForBundleSetFetched) {
        clearInterval(intervalId);
        reject(new Error('timeout for bundle-set-fetched'));
      }
      try {
        let model = document.querySelector('live-localizer').shadowRoot
          .getElementById('main').shadowRoot
          .getElementById('dialog')
          .querySelector('live-localizer-panel').shadowRoot
          .getElementById('model');
        if (model) {
          clearInterval(intervalId);
          // Note: bundle-set-fetched is the load completion event for live-localizer widget and irrelevant to cache-bundle.json
          model.addEventListener('bundle-set-fetched', (event) => {
            resolve(event.type);
          });
        }
        else {
          // try again
        }
      }
      catch (e) {
        // try again
      }
    }, 1000);
  });

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
/*__END__*/

  await (async () => {
    const baseURL = new URL(location.href);
    await fetch(new URL('about-blank-redirector.html', baseURL));
    await fetch(new URL('about-blank-redirector.js?no-hook=true', baseURL));
    await new Promise(_resolve => { setTimeout(_resolve, 2000); });
  })();
}
