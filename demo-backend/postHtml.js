/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
//const bodyParser = require('body-parser');
const postHtmlServiceURLPath = '/components/thin-hook/demo/postHtml';

//const urlencoded = bodyParser.urlencoded({ limit: '100kb', extended: true, verify: (req, res, buf, encoding) => req.url === postHtmlServiceURLPath });

module.exports = function (app) {
  app
    .post(postHtmlServiceURLPath, (req, res, next) => {
      let type = decodeURIComponent(new URL('https://localhost/?' + req.body.toString()).searchParams.get('type')) || 'text/html';
      if (typeof type === 'string') {
        res.setHeader('content-type', type);
        type = type.split(';')[0];
        console.log('postHtml.js: type = ' + type);
        res.status(200);
        switch (type) {
        case 'text/html':
        default:
          res.send(`<html><head><!-- $hook$ is undefined error if these hook infrastructure scripts are not loaded -->
              <script src="../../thin-hook/hook.min.js?no-hook=true&no-hook-authorization=68c0e441f19977882fb2de5720afc5dcd72ccc76f513cab9717947f03843b2b9,log-no-hook-authorization"></script>
              <script context-generator src="no-hook-authorization.js?no-hook=true"></script>
              <script context-generator src="context-generator.js?no-hook=true"></script>
              <script context-generator src='bootstrap.js?no-hook=true'></script>
              <script src="hook-callback.js?no-hook=true"></script>
              <script src="hook-native-api.js?no-hook=true"></script>
              <script src="script-hashes.js?no-hook=true&service-worker-ready=true"></script>
              <script src="../../chai/chai.js"></script>
            </head><body><script>
              chai.assert.throws(() => {
                window.caches;
              }, /^Permission Denied:/);
            </script></body></html>`
          );
          break;
        case 'image/svg+xml':
          res.send(`<?xml version="1.0"?>
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1" width="200px" height="200px">
              <script xl:href="../../chai/chai.js"></script>
              <script><![CDATA[
                chai.assert.throws(() => {
                  navigator.serviceWorker;
                }, /^Permission Denied:/);
              ]]></script>
              <rect id="rect" x="0px" y="0px" width="200px" height="200px" stroke="blue" fill="white"/>
              <line id="line" x1="0px" y1="0px" x2="200px" y2="200px" style="stroke:rgb(255,0,0);stroke-width:1"/>
              <text id="text" x="0px" y="15px" fill="black">😄 SVG with scripts (initial value)</text>
            </svg>`
          );
          break;
        }
      }
      else {
        next();
      }
    });
};