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
const cluster = require('cluster');

const defaultWorkers = 4;
const defaultServerPort = 8081;
const defaultMode = 'debug';

const ArgumentParser = require('argparse').ArgumentParser;
var argParser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'errorReport.json service',
});
argParser.addArgument([ '-c', '--cluster' ], { help: 'Number of HTTP server workers. Default: ' + defaultWorkers });
argParser.addArgument([ '-p', '--port' ], { help: 'HTTP server port to listen. Default: ' + defaultServerPort });
argParser.addArgument([ '-m', '--mode' ], { help: 'Server mode "build" or "debug". Default: ' + defaultMode });
const args = argParser.parseArgs();

const workers = parseInt(args.cluster || defaultWorkers);
const port = parseInt(args.port || defaultServerPort);

if (workers > 1 && cluster.isMaster) {
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
}
else {
  app.use(bodyParser.json());
  app.listen(port);
  app.post('/errorReport.json', function(req, res) {
    console.log('/errorReport.json', JSON.stringify(req.body));
    // Fixed response for PoC
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify({
      "type": "errorReportResponse",
      "severity": "permissive"
    }, null, 2));
  });
  app.all('*', (req, res) => {
    res.redirect(307, 'about:blank');
  });
}