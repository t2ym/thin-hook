await (async () => {
  const baseURL = new URL(location.href);
  await fetch(new URL('about-blank-redirector.html', baseURL));
  await fetch(new URL('about-blank-redirector.js?no-hook=true', baseURL));
  await new Promise(_resolve => { setTimeout(_resolve, 2000); });
})();