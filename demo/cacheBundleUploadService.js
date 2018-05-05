/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* 
  Example nginx configuration:

  location /components/thin-hook/demo/errorReport.json {
    proxy_pass http://localhost:8081/errorReport.json;
  }

  Invocation:
  cd demo
  node cacheBundleUploadService.js
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({limit: "100mb"}));
app.listen(8081);
app.post('/errorReport.json', function(req, res) {
  if (req.body.type === 'cache-bundle.json') { 
    fs.writeFileSync(path.join(__dirname, 'cache-bundle.json'), req.body.data);
    let data = JSON.parse(req.body.data);
    console.log('/errorReport.json', 'type = ', req.body.type, ' data.version = ', data.version, ' data.length = ', req.body.data.length, 'written to ', path.join(__dirname, 'cache-bundle.json'));
    res.send(JSON.stringify({
      "status": "ok",
      "message": "uploaded cache-bundle.json in " + req.body.data.length + " bytes",
    }, null, 2));
  }
  else {
    console.log('/errorReport.json', req.body);
    // Fixed response for PoC
    res.send(JSON.stringify({
      "type": "errorReportResponse",
      "severity": "permissive"
    }, null, 2));
  }
});
