/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const isCLI = require.main === module;
const defaultMode = 'debug';
const defaultHost = 'localhost';
const defaultPort = 8082;
const defaultKeysDir = 'demo-keys/'; // from the current directory, i.e., the package root
const demoCAPathName = 'demoCA';
const demoCACertPathName = 'demoCA.crt';
const clientCertName = 'client'; // at demo-keys/demoCA/client.crt
const updateAPIPath = '/update'; // POST browser list, get updated browser list
if (isCLI) {
  // Server
  const package = require('../package.json');
  const path = require('path');
  const https = require('https');
  const forge = require('node-forge');
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const fs = require('fs');

  const scriptDir = __dirname;

  const ArgumentParser = require('argparse').ArgumentParser;
  var argParser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'browser validation service',
  });
  argParser.addArgument([ '-p', '--port' ], { help: 'HTTP server port to listen. Default: ' + defaultPort });
  argParser.addArgument([ '-m', '--mode' ], { help: 'Server mode "build" or "debug". Default: ' + defaultMode });
  argParser.addArgument([ '-H', '--host'], { help: 'Server host name. Default: ' + defaultHost });
  argParser.addArgument([ '-K', '--keys'], { help: 'Directory path containing keys.json and demoCA/. Default: ' + defaultKeysDir });
  const args = argParser.parseArgs();

  const serverPort = args.port || defaultPort;
  const mode = args.mode || defaultMode;
  const protocol = 'https';
  let hostname = args.host || defaultHost;
  if (!hostname.split(':')[0]) {
    hostname = [defaultHost, hostname.split(':')[1]].join(':');
  }
  console.log('validation hostname:', hostname);
  const keysDir = args.keys || defaultKeysDir;
  const keysJSON = fs.readFileSync(path.join(keysDir, 'keys.json'));
  const keys = JSON.parse(keysJSON);
  const demoCAPath = path.join(keysDir, demoCAPathName);
  const httpsOptions = protocol === 'https'
    ? {
      key: fs.readFileSync(path.join(demoCAPath, (hostname.split(':')[0] || defaultHost) + '.key')),
      cert: fs.readFileSync(path.join(demoCAPath, (hostname.split(':')[0] || defaultHost) + '.crt')),
      requestCert: true,
      ca: [fs.readFileSync(path.join(demoCAPath, demoCACertPathName))],
    }
    : null;
  const clientCertPEM = fs.readFileSync(path.join(demoCAPath, clientCertName + '.crt'));
  const clientCert = forge.pki.certificateFromPem(clientCertPEM);
  const clientCertDER = forge.asn1.toDer(forge.pki.certificateToAsn1(clientCert)).getBytes();
  const fingerprint256 = forge.md.sha256.create().update(clientCertDER).digest().toHex().match(/.{2}/g).join(':').toUpperCase();

  let browsers;
  const updateBrowsers = function updateBrowsers(req, body) {
    if (body) {
      if (body.browsers && typeof body.browsers === 'object' && !Array.isArray(body.browsers)) {
        if (!browsers) {
          browsers = {};
        }
        for (let key in body.browsers) {
        }
      }
    }
  }

  app
    .use(bodyParser.json())
    .use((req, res, next) => {
      if (req.client.authorized) {
        const peerCert = req.socket.getPeerCertificate();
        if (peerCert.fingerprint256 === fingerprint256) { // only a single client certificate is authenticated
          //console.log('client certificate authentication passed for ' + req.url);
          next();
        }
        else {
          console.error('fingerprints not matched', peerCert.fingerprint256, fingerprint256);
          res.sendStatus(403);
        }
      }
      else {
        console.error('client certificate is not authenticated', req.socket);
        res.sendStatus(403);
      }
    })
    .all(updateAPIPath, (req, res, next) => {
      let body = req.method === 'POST' ? req.body : null;
      //console.log('request body: ', JSON.stringify(body, null, 2));
      updateBrowsers(req, body);
      let result = {
        browsers: browsers || {},
      };
      res.setHeader('content-type', 'application/json');
      res.status(200).send(JSON.stringify(result, null, 2));
    })
    .get('*', express.static(path.resolve(path.join(__dirname, 'validation-console', 'dist')), {}));

  switch (mode) {
  case 'debug':
  case 'build':
  default:
    break;
  }

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
    console.log('Listening on port: ' + serverPort + '.')
    break;
  }
}
else {
  // Client API
  const path = require('path');
  const fs = require('fs');
  const https = require('https');

  let browsers = null;

  let workerStarted;
  const WORKER_INTERVAL = 1000;

  const startWorker = function startWorker({ host, port, keys }) {
    if (workerStarted) {
      return;
    }
    workerStarted = true;
    https.globalAgent.options.ca = https.globalAgent.options.ca || [];
    https.globalAgent.options.ca.push(fs.readFileSync(path.join(defaultKeysDir, demoCAPathName, demoCACertPathName)));

    const clientKey = fs.readFileSync(path.join(defaultKeysDir, demoCAPathName, clientCertName + '.key'));
    const clientCert = fs.readFileSync(path.join(defaultKeysDir, demoCAPathName, clientCertName + '.crt'));

    const worker = async function worker() {
      const options = {
        hostname: host,
        port: port,
        path: updateAPIPath,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        key: clientKey,
        cert: clientCert,
      };

      let responseBody = [];
      let requestBody = {};
      const req = https.request(options, (res) => {
        //console.log('\nstatusCode:', res.statusCode);
        //console.log('headers:', res.headers);

        res.on('data', (data) => {
          responseBody.push(data);
          //console.log('data: ' + data.byteLength + ' bytes');
        });

        res.on('end', () => {
          responseBody = Buffer.concat(responseBody);
          //process.stdout.write(responseBody);
          let updated;
          try {
            updated = JSON.parse(responseBody);
            if (updated.browsers) {
              browsers = updated.browsers; // TODO: This unexpectedly overwrites the current data
            }
          }
          catch (e) {
            console.error(e);
          }
        });
      });

      req.on('error', (e) => {
        console.error(e);
      });

      requestBody = { browsers: browsers || {} };
      req.write(JSON.stringify(requestBody, null, 2));

      req.end();
    }
    setInterval(worker, WORKER_INTERVAL);
  }

  const validationService = function validationService({ mode = defaultMode, host = defaultHost, port = defaultPort, keys = null }) {
    switch (mode) {
    case 'build':
      break;
    default:
      startWorker({ mode, host, port, keys });
      break;
    }
    const validate = function validate(req, Connect, CurrentSession) {
      let result;
      console.log('validate: ', req.headers['user-agent'], CurrentSession.ClientIntegrity.browserHash.toString('hex'));
      switch (mode) {
      case 'build':
        result = 'validated';
        break;
      default:
        result = 'validated';
        break;
      }
      return result;
    }
    return validate;
  }
  module.exports = {
    validationService: validationService,
  };
}

() => {
  // Repository and Protocol Design

  let repo = {
    "version": "version_123", // app version
    "timestamp": 1565498714481, // database timestamp
    "entryURL": "https://www.local162.org/components/thin-hook/demo/", // app entry page URL
    "browsers": {
      // browserHashHex|user-agent -> (aggregated) browser info
      "fcaac6cb820efb4e0072a94a4b8da5245340a71ff2cc04f3d67c165a4a6f1773|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3887.5 Safari/537.36": {
        "raw": true,
        "aggregate": "fcaac6cb820efb4e0072a94a4b8da5245340a71ff2cc04f3d67c165a4a6f1773|Mozilla/5.0 (Macintosh; Intel Mac OS X *) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3887.5 Safari/537.36",
      },
      "fcaac6cb820efb4e0072a94a4b8da5245340a71ff2cc04f3d67c165a4a6f1773|Mozilla/5.0 (Macintosh; Intel Mac OS X *) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.5 Safari/537.36": {
        "raw": false,
        "accepted": 12,
        "rejected": 0,
        "status": "validated",
        "name": "Google Chrome",
        "version": "76.0.3887.5",
        "platform": "macOS",
        "architecture": "x86_64",
      },
    },
    "browserHash": {
      // browserHash -> { user-agent }
      "fcaac6cb820efb4e0072a94a4b8da5245340a71ff2cc04f3d67c165a4a6f1773": {
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3887.5 Safari/537.36": true,
      },
    }
  }
  /*
  "user-agent": {
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.5 Safari/537.36": "",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36": "",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.19 Safari/537.36 Edg/77.0.235.9": "3c207f4a48250e20baab4cc355ebb77b9f2511604f7e5b4f21b4a1ddedc49ab5",
        },
  */
  // /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('2016-03-11')
  /*
  validate: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36 bac3727578880ec465c10f33edf4400d86531d556b88908241b8f62b5238af19
  validate: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.56 Safari/537.36 fbcb1d801e2e89c927b5a0fe0a43afeb6e902ad87655b229aa06a2683ccc222d
  validate: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3899.0 Safari/537.36 c3faddae96ad4f5800222f8c4261c0def7db82faced0fc72fd65938e5ef991b0
  validate: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv: 66.0) Gecko/20100101 Firefox/66.0 7c46b0a2066b18193de9f7b53e68ee113d41ebe73708d0072984e509d5ea7d60
  validate: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv: 66.0) Gecko/20100101 Firefox/66.0 b83bd5aba95c4328077751dde21e77e1a8289954c016581f9649a3b396622573

  Note: TODO: Firefox should have more volatile properties
  */
  // on WSL
  {
  const spawn = require('child_process').spawn;
  const chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  const cmdExePath = "/mnt/c/windows/system32/cmd.exe";
  const taskkillExePath = "/mnt/c/windows/system32/taskkill.exe";
  const targetURL = "https://www.local162.org/components/thin-hook/demo/";
  const cp = spawn(cmdExePath, ['/c', chromePath, "--incognito", "--window-size=1280,800", targetURL]);
  const ps = require('win-ps');

  cp.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  cp.stderr.on("data", function (data) {
    console.error(data.toString());
  });

  cp.on('close', (code, signal) => {
    console.log(`child process terminated due to receipt of signal ${signal}`);
  });

  let processList;
  setTimeout(() => {
    ps.snapshot().then((list) => {
      processList = list;
      //console.log(list);
      const cmdPids = processList.filter(p => p.Name === 'cmd.exe' /*&& p.ParentProcessId === process.pidi*/).map(p => p.ProcessId);
      console.log('cmdPids = ', cmdPids);
      setTimeout(() => {
        processList.filter(p => p.Path === chromePath && cmdPids.indexOf(p.ParentProcessId) >= 0).forEach(p => {
          try {
            console.log('taskkill.exe', p.ProcessId, p.ParentProcessId, p.Name, p.Path);
            spawn(taskkillExePath, ['/PID', p.ProcessId]);
            //process.kill(p.ProcessId, 'SIGKILL');
          }
          catch (e) {
            console.log(e);
          }
        });
      }, 5000);
    });
  }, 10000);
}
{
  // on native Node.js
  const spawn = require('child_process').spawn;
  const chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  const targetURL = "https://www.local162.org/components/thin-hook/demo/";
  const cp = spawn(process.env.comspec, ['/c', chromePath, "--incognito", "--window-size=1280,800", targetURL]);
  const ps = require('win-ps');

  cp.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  cp.stderr.on("data", function (data) {
    console.error(data.toString());
  });

  cp.on('close', (code, signal) => {
    console.log(`child process terminated due to receipt of signal ${signal}`);
  });

  let processList;
  setTimeout(() => {
    ps.snapshot().then((list) => {
      processList = list;
      cmdPid = processList.filter(p => p.Name === 'cmd.exe' && p.ParentProcessId === process.pid).map(p => p.ProcessId)[0];
      setTimeout(() => {
        processList.filter(p => p.Path === chromePath && p.ParentProcessId === cmdPid).forEach(p => {
          try {
            process.kill(p.ProcessId, 'SIGKILL');
            console.log('SIGKILL', p.ProcessId, p.Name, p.Path);
          }
          catch (e) {
            console.log(e);
          }
        });
      }, 5000);
    });
  }, 10000);
}
  //"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --incognito https://www.local162.org/components/thin-hook/demo/
  //"C:\Program Files (x86)\Google\Chrome Beta\Application\chrome.exe" --incognito https://www.local162.org/components/thin-hook/demo/
  //"C:\Users\Tetsuya\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --incognito https://www.local162.org/components/thin-hook/demo/
}