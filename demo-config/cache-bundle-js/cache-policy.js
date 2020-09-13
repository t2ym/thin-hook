/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
// optional significantHeaders to include certain headers in cache response headers
hook.parameters.significantHeaders = {
  //'Last-Modified': true,
};
hook.parameters.cacheableContentTypes = {
  // Note: text/html, text/javascript, image/svg+xml must not be included here
  'text/css': true,
  'image/png': true,
  'application/json': true, // for targeted URLs
};
hook.parameters.validateCacheableUrl = (url, contentType) => {
  let _url = new URL(url);
  if (_url.hostname === location.hostname) {
    // contentType has been normalized by eliminating the trailing '; charset=utf-8'
    if (contentType === 'application/json') {
      // targeted Content-Type URL pairs
      return _url.pathname.startsWith('/components/thin-hook/demo/locales/'); // with static JSON contents
    }
    else {
      // other contents
      return _url.pathname.startsWith('/components/');
    }
  }
  else {
    // from CDNs
    return _url.href.match(/^(https:[/][/]cdnjs[.]cloudflare[.]com[/]ajax[/]libs[/]|https:[/][/]fonts[.]googleapis[.]com[/]css)/);
  }
};