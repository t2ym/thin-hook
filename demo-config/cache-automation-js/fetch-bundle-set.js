/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
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