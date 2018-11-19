/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* 
  Example nginx configuration for HTTPS server:

  location / {
    proxy_pass http://localhost:8080/;
  }
*/
const package = require('../package.json');
const path = require('path');
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const defaultServerPort = 8080;

const ArgumentParser = require('argparse').ArgumentParser;
var argParser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Serve component demo',
});
argParser.addArgument([ '-p', '--port' ], { help: 'HTTP server port to listen. Default: ' + defaultServerPort });
const args = argParser.parseArgs();

const serverPort = args.port || defaultServerPort;
const demoServerScriptPhysicalPath = __dirname;
const componentsURLPath = '/components';
const componentsPhysicalPath = '../bower_components';
const errorReportServiceOriginURL = 'http://localhost:8081/';
const errorReportServiceURLPathRelative = 'errorReport.json';
const demoPathRelative = 'demo';
const forbiddenPaths = [ 'lib/*', 'test/*', 'examples/*', 'gulpfile.js', 'package.json', 'package-lock.json', 'bower.json', 'wct.conf.json' ]
  .concat([ 'cacheBundleGeneration.js', 'cacheBundleUploadService.js', 'demoServer.js', 'errorReportService.js', 'original-index.html', 'index.html' ]
    .map(p => path.join(demoPathRelative, p)));

const rootPhysicalPath = path.join(demoServerScriptPhysicalPath, '..');
const errorReportServiceURLPath = path.join(componentsURLPath, package.name, demoPathRelative, errorReportServiceURLPathRelative);

let counter = -1;
let hacked = false;

app
  .all(forbiddenPaths.map(p => path.join(componentsURLPath, package.name, p)), (req, res, next) => { res.redirect(307, 'about:blank'); })
  .use(errorReportServiceURLPath,
    proxy({
      target: errorReportServiceOriginURL, 
      changeOrigin: true,
      pathRewrite: {
        [errorReportServiceURLPath] : path.join('/', errorReportServiceURLPathRelative),
      },
    }))
  .use(path.join(componentsURLPath, package.name), express.static(path.resolve(rootPhysicalPath)))
  .use(componentsURLPath, express.static(path.resolve(path.join(demoServerScriptPhysicalPath, componentsPhysicalPath))))
  .all('*', (req, res) => {
    res.redirect(307, 'about:blank');
  })
//.use('/', express.static(path.resolve(rootPhysicalPath)));
  .listen(serverPort);
