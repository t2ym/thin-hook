/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* 
  Example nginx configuration for HTTPS server:

  location / {
    proxy_pass http://localhost:8080/;
  }
*/
const package = require('../package.json');
const path = require('path');
const https = require('https');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cluster = require('cluster');
const { integrityService, proxy, bodyParserRawOptions } = require('./integrityService.js');

const defaultWorkers = 1;
const defaultServerPort = 8080;
const defaultMode = 'debug';
const defaultProtocol = 'http';
const defaultHostName = 'localhost';
const demoCAPath = 'demo-keys/demoCA/';
const whitelistPath = path.join(__dirname, 'whitelist.json');
const blacklistPath = path.join(__dirname, 'blacklist.json');

const ArgumentParser = require('argparse').ArgumentParser;
var argParser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Serve component demo',
});
argParser.addArgument([ '-c', '--cluster' ], { help: 'Number of HTTP server workers. Default: ' + defaultWorkers });
argParser.addArgument([ '-p', '--port' ], { help: 'HTTP server port to listen. Default: ' + defaultServerPort });
argParser.addArgument([ '-m', '--mode' ], { help: 'Server mode "build" or "debug". Default: ' + defaultMode });
argParser.addArgument([ '-P', '--protocol'], { help: 'Server protocol. Default: ' + defaultProtocol });
argParser.addArgument([ '-H', '--host'], { help: 'Server host name. Default: ' + defaultHostName });
argParser.addArgument([ '--middleware'], { help: 'middleware to import. Default: null' });
const args = argParser.parseArgs();

const workers = parseInt(args.cluster || defaultWorkers);

if (workers > 1 && cluster.isMaster) {
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
}
else {
  const pid = workers > 1 ? `[PID:${process.pid}] ` : '';
  const serverPort = args.port || defaultServerPort;
  const middleware = args.middleware ? require(args.middleware) : null;
  const mode = args.mode || defaultMode;
  const protocol = args.protocol || defaultProtocol;
  let hostname = args.host || defaultHostName;
  if (!hostname.split(':')[0]) {
    hostname = [defaultHostName, hostname.split(':')[1]].join(':');
  }
  console.log('hostname:', hostname);
  const httpsOptions = protocol === 'https'
    ? {
      key: fs.readFileSync(path.join(demoCAPath, (hostname.split(':')[0] || defaultHostName) + '.key')),
      cert: fs.readFileSync(path.join(demoCAPath, (hostname.split(':')[0] || defaultHostName) + '.crt')),
    }
    : null;

  const demoServerScriptPhysicalPath = __dirname;
  const componentsURLPath = '/components';
  const componentsPhysicalPath = '../bower_components';
  const frontendPath = 'demo-frontend';
  const errorReportServiceOriginURL = 'http://localhost:8081/';
  const errorReportServiceURLPathRelative = 'errorReport.json';
  const demoPathRelative = 'demo';

  let whitelist;
  let blacklist;
  if (mode !== 'build') {
    whitelist = JSON.parse(fs.readFileSync(whitelistPath));
    blacklist = JSON.parse(fs.readFileSync(blacklistPath));
  }

  const rootPhysicalPath = path.join(demoServerScriptPhysicalPath, '..');
  const errorReportServiceURLPath = path.join(componentsURLPath, package.name, demoPathRelative, errorReportServiceURLPathRelative);
  const entryPageURLPath = path.join(componentsURLPath, package.name, demoPathRelative, '/');
  const expressStaticOptions = {
    setHeaders: function (res, path, stat) {
      if (protocol !== 'http') {
        res.setHeader('service-worker-allowed', '/');
      }
      //res.set('link', '</components/thin-hook/demo/cache-bundle.json>; rel=preload, </components/thin-hook/demo/integrity.json>; rel=preload, </components/thin-hook/demo/my-view3.html>; rel=preload');
    }
  };

  let hacked = false;

  app
    .use(bodyParser.raw(bodyParserRawOptions)) // this must come first
    .use(bodyParser.json())
    /*
    .get('/components/thin-hook/hook.min.js', (req, res) => {
      // mitm attacker for hook.min.js
      let keys = Object.keys(req.headers);
      if (false) {
        console.log(pid + 'req.url = ' + req.url + '\n' + JSON.stringify(req.headers, null, 2) + '\n');
      }
      if (keys.indexOf('user-agent') < keys.indexOf('service-worker')) {
        console.log(pid + 'hook.min.js: real Service Worker request')
        res.sendFile(path.join(rootPhysicalPath, hacked ? 'hacked-hook.min.js' : 'hook.min.js'), {
          headers: {
            //'cache-control': 'max-age=60',
          }
        });
      }
      else {
        console.log(pid + 'hook.min.js: non-Service Worker request')
        res.sendFile(path.join(rootPhysicalPath, 'hook.min.js'), {
          headers: {
            //'cache-control': 'max-age=60',
            //'content-security-policy': 'require-sri-for script; script-src \'sha256-aaaa\'',
            //'content-security-policy': 'require-sri-for script; worker-src \'sha256-jG8jnbsyHT6GzdaWaf93W02ykkaRjZA5ttOaR+tpP0Q=\' \'self\'',
            //'content-security-policy': 'require-sri-for script; script-src \'sha256-jG8jnbsyHT6GzdaWaf93W02ykkaRjZA5ttOaR+tpP0Q=\' \'unsafe-eval\'',
          }
        });
      }
    })
    */
    .all('/*', integrityService({ mode, entryPageURLPath, authority: hostname, whitelist, blacklist }))
    .use(errorReportServiceURLPath, proxy({
      target: errorReportServiceOriginURL, 
      changeOrigin: true,
      pathRewrite: {
        [errorReportServiceURLPath] : path.join('/', errorReportServiceURLPathRelative),
      }
    }));

  if (typeof middleware === 'function') {
    middleware(app);
  }

  switch (mode) {
  case 'server':
    app
      .use('/', expressStaticGzip(path.join(rootPhysicalPath, frontendPath), expressStaticOptions))
    break;
  case 'debug':
  case 'build':
  default:
    app
      .use(path.join(componentsURLPath, package.name, demoPathRelative), (mode !== 'build' ? expressStaticGzip : express.static)(path.resolve(rootPhysicalPath, demoPathRelative), expressStaticOptions))
      .use(path.join(componentsURLPath, package.name), express.static(path.resolve(rootPhysicalPath), expressStaticOptions))
      .use(componentsURLPath, express.static(path.resolve(path.join(demoServerScriptPhysicalPath, componentsPhysicalPath)), expressStaticOptions))
    break;
  }

  app
    .all('*', (req, res) => {
      const aboutBlankRedirectorHTML = `<script no-hook>location = 'about:blank';</script>`;
      res.setHeader('content-type', 'text/html');
      res.status(404).send(aboutBlankRedirectorHTML);
      //res.redirect(307, aboutBlankURL);
    });
  switch (protocol) {
  case 'https':
    https.createServer(httpsOptions, app)
      .listen(serverPort, (error) => {
        if (error) {
          console.error(error)
          return process.exit(1)
        } else {
          console.log('Listening on port: ' + serverPort + '.')
        }
      });
    break;
  case 'http':
  default:
    app.listen(serverPort);
    break;
  }
}
