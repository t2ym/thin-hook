/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const { preprocess } = require('preprocess');
const through = require('through2');
const gulp = require('gulp');

const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');
const forge = require('node-forge');

const pluginName = 'keys';

// key pair for mitm detection, not for HTTPS
const SHA256 = {};
SHA256.hashBits = 256;
SHA256.hashBytes = SHA256.hashBits / 8;
SHA256.hashName = 'sha' + SHA256.hashBits;

const RSA = {};
RSA.keyBits = 2048; // at least 2048 to encrypt keys of 2 * 256 bits (= 64 bytes) in RSA-OAEP
RSA.keyBytes = RSA.keyBits / 8;
RSA.keyPairE = 0x10001;
RSA.privateKeyName = 'rsa-private-key.pem';
RSA.publicKeyName = 'rsa-public-key.pem';

const ECDSA = {};
ECDSA.privateKeyName = 'ecdsa-private-key.pem';
ECDSA.publicKeyName = 'ecdsa-public-key.pem';

const AES_GCM = {};
AES_GCM.keyLength =  32; // bytes
AES_GCM.ivLength = 12; // bytes
AES_GCM.tagLength = 16; // 128 bits
AES_GCM.sessionIdKeyName = 'session-id-aes-key';
AES_GCM.sessionIdIvName = 'session-id-aes-iv';

const scriptsHashHexName = 'scriptsHashHex';
const htmlHashHexName = 'htmlHashHex';

const configurator = (targetConfig) => {
  const configPath = path.resolve(targetConfig.path.base, targetConfig.path.config, pluginName);
  const keysPath = path.resolve(targetConfig.path.base, targetConfig.path.keys);
  const pluginDirname = __dirname;
  const keysJSONName = 'keys.json';
  const keysJSONPath = path.resolve(keysPath, keysJSONName);

  return async (done) => {
    // generate RSA key pair
    let keypair = forge.pki.rsa.generateKeyPair({ bits: RSA.keyBits, e: RSA.keyPairE });
    let rsaPrivateKeyPEM = forge.pki.privateKeyToPem(keypair.privateKey).replace(/\r/g, '');
    let rsaPublicKeyPEM = forge.pki.publicKeyToPem(keypair.publicKey).replace(/\r/g, '');
  
    // generate ECDSA key pair
    let ecdsaKeyPair = crypto.generateKeyPairSync('ec',
      {
        namedCurve: 'P-256',
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      });
  
    // generate session ID key and iv
    let sessionIdAesKeyBase64 = crypto.randomFillSync(Buffer.alloc(AES_GCM.keyLength)).toString('base64');
    let sessionIdAesIvBase64 = crypto.randomFillSync(Buffer.alloc(AES_GCM.ivLength)).toString('base64');
  
    try {
      fs.mkdirSync(keysPath);
    }
    catch (e) {
      // EEXIST
    }
  
    let keys = {
      version: targetConfig['get-version'].version,
      [RSA.privateKeyName]: rsaPrivateKeyPEM,
      [RSA.publicKeyName]: rsaPublicKeyPEM,
      [ECDSA.privateKeyName]: ecdsaKeyPair.privateKey,
      [ECDSA.publicKeyName]: ecdsaKeyPair.publicKey,
      [AES_GCM.sessionIdKeyName]: sessionIdAesKeyBase64,
      [AES_GCM.sessionIdIvName]: sessionIdAesIvBase64,
    };
    let keysJSON = JSON.stringify(keys, null, 2) + '\n';
  
    let doUpdate = true;
    if (targetConfig[pluginName] && targetConfig[pluginName].noUpdate) {
      if (fs.existsSync(keysJSONPath)) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        doUpdate = await new Promise((resolve, reject) => {
          rl.question(`

*****************************************************************************************************************************************

plugin: ${pluginName}

targetConfig["${pluginName}"].noUpdate is set as "${targetConfig[pluginName].noUpdate}"

The current configuration must be solely for debugging purposes and must never be applied for production.
If the fixed encryption keys should be known to attackers, the web application would have a severe vulnerability through mitm attacks.
The obligatory configuration for production is to update encryption keys per build.

*****************************************************************************************************************************************

Can you confirm this vulnerable configuration for encryption keys? (y/N) `, (answer) => {
            rl.close();
            if (['y', 'Y', 'yes', 'YES'].indexOf(answer) >= 0) {
              console.log('Current encryption keys are reused');
              resolve(false);
            }
            else {
              console.log('Encryption keys are updated');
              resolve(true);
            }
          });
        });
      }
    }
    if (doUpdate) {
      fs.writeFileSync(keysJSONPath, keysJSON, 'utf-8');
    }

    targetConfig[pluginName] = targetConfig[pluginName] || {};
    Object.assign(targetConfig[pluginName], {
      keysPath,
      keysJSONPath,
      SHA256,
      RSA,
      ECDSA,
      AES_GCM,
    });
    //console.log('targetConfig', targetConfig);
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'get-version' ],
};