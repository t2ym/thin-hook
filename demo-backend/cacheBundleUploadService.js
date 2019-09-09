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
app.use(bodyParser.raw());
app.listen(8081);
app.post('/errorReport.json', async function(req, res) {
  if (req.body.type === 'cache-bundle.json') { 
    let rawData = JSON.parse(req.body.data);
    let cacheBundle = { version: rawData.version };
    let keys = Object.keys(rawData).sort();
    let bodyData = new Map();
    for (let key of keys) {
      if (key === 'version') {
        continue;
      }
      let content = rawData[key];
      if (typeof content === 'object') {
        if (content['Location']) {
          if (content['Location'].startsWith('data:')) {
            if (bodyData.has(content['Location'])) {
              let link = bodyData.get(content['Location']);
              cacheBundle[key] = {
                "Location": link
              };
            }
            else {
              bodyData.set(content['Location'], key);
              cacheBundle[key] = content;
            }
          }
          else {
            // unexpected
            // discarding the entry
            console.error('Discarding the entry ' + key + ' ' + JSON.stringify(content, null, 2));
          }
        }
        else if (typeof content['body'] === 'string') {
          let bodyKey = content['Content-Type'] + '\n' + content['body'];
          if (bodyData.has(bodyKey)) {
            let link = bodyData.get(bodyKey);
            cacheBundle[key] = {
              "Location": link
            };
          }
          else {
            bodyData.set(bodyKey, key);
            cacheBundle[key] = content;
          }
        }
      }
      else {
        if (bodyData.has(content)) {
          let link = bodyData.get(content);
          cacheBundle[key] = {
            "Location": link
          };
        }
        else {
          bodyData.set(content, key);
          cacheBundle[key] = content;
        }
      }
    }
    let dataJSON = JSON.stringify(cacheBundle, null, 2);
    fs.writeFileSync(path.join(__dirname, 'cache-bundle.json'), dataJSON);
    console.log('/errorReport.json', 'type = ', req.body.type, ' data.version = ', cacheBundle.version, ' data.length = ', dataJSON.length, 'written to ', path.join(__dirname, 'cache-bundle.json'));
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify({
      "status": "ok",
      "message": "uploaded cache-bundle.json in " + req.body.data.length + " bytes",
    }, null, 2));
  }
  else {
    //console.log('/errorReport.json', req.body);
    // Fixed response for PoC
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify({
      "type": "errorReportResponse",
      "severity": "permissive"
    }, null, 2));
  }
});
