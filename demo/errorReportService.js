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
  node errorReportService.js
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8081);
app.post('/errorReport.json', function(req, res) {
  console.log('/errorReport.json', req.body);
  // Fixed response for PoC
  res.send(`{
  "type": "errorReportResponse",
  "severity": "permissive"
}`);
});
