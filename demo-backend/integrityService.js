/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2018, 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const asn1 = require('asn1.js');
//const forge = require('node-forge'); // The standard 'crypto' library does not support RSA-OAEP-256, but is replaced by integrity-service-helpers
const helpers = require('./integrity-service-helpers/build/Release/native.node');
const { validationService } = require('./validationService.js'); 

const console = { log() {}, error() {}, warn() {} };
const integrityJSONName = 'integrity.json';

const demoBackEndDir = __dirname;
const integrityServiceScriptDir = demoBackEndDir;
const demoKeysDirName = 'demo-keys';
const demoDirName = 'demo';
const ParentDir = '..';
const demoDir = path.resolve(path.join(demoBackEndDir, ParentDir, demoDirName));
const keysJSONName = 'keys.json';
const keysJSONPath = path.resolve(path.join(integrityServiceScriptDir, ParentDir, demoKeysDirName, keysJSONName));
const keys = require(keysJSONPath);

const SHA256 = {};
SHA256.hashBits = 256;
SHA256.hashBytes = SHA256.hashBits / 8;
SHA256.hashNameForge = 'sha' + SHA256.hashBits;
SHA256.hashNameSmall = 'sha' + SHA256.hashBits;
SHA256.hashName = 'SHA' + SHA256.hashBits;
SHA256.prefix = SHA256.hashNameSmall + '-';

const HMAC = {};
HMAC.prefix = 'hmac-sha256-';
HMAC.saltLength = SHA256.hashBytes;

const RSA = {};
RSA.keyBits = 2048; // at least 2048 to encrypt keys of 2 * 256 bits (= 64 bytes) in RSA-OAEP
RSA.keyBytes = RSA.keyBits / 8;
RSA.keyPairE = 0x10001;
RSA.privateKeyName = 'rsa-private-key.pem';
RSA.publicKeyName = 'rsa-public-key.pem';

const ECDSA = {};
ECDSA.privateKeyName = 'ecdsa-private-key.pem';
ECDSA.publicKeyName = 'ecdsa-public-key.pem';

const ECDHE = {};
ECDHE.curveName = 'prime256v1';
ECDHE.publicKeyLength = 1 + SHA256.hashBytes * 2;

const AES_GCM = {};
AES_GCM.cipherName = 'aes-256-gcm';
AES_GCM.keyLength = 32; // bytes
AES_GCM.ivLength = 12; // bytes
AES_GCM.tagLength = 16; // 128 bits
AES_GCM.sessionIdKeyName = 'session-id-aes-key';
AES_GCM.sessionIdIvName = 'session-id-aes-iv';
AES_GCM.sessionIdKey = Buffer.from(keys[AES_GCM.sessionIdKeyName], 'base64');
AES_GCM.sessionIdIv = Buffer.from(keys[AES_GCM.sessionIdIvName], 'base64');

const scriptsHashHexName = 'scriptsHashHex';
const htmlHashHexName = 'htmlHashHex';

ECDSA.privateKeyPEM = keys[ECDSA.privateKeyName];
ECDSA.privateKey = crypto.createPrivateKey({ key: ECDSA.privateKeyPEM, format: 'pem' });
ECDSA.publicKeyPEM = keys[ECDSA.publicKeyName];
ECDSA.publicKey = crypto.createPublicKey({ key: ECDSA.publicKeyPEM, format: 'pem' });

RSA.privateKeyPEM = keys[RSA.privateKeyName];
//RSA.privateKey = forge.pki.privateKeyFromPem(RSA.privateKeyPEM);
RSA.publicKeyPEM = keys[RSA.publicKeyName];
//RSA.publicKey = forge.pki.publicKeyFromPem(RSA.publicKeyPEM);

const integrityJSONPath = path.join(demoDir, integrityJSONName);
const integrityJSON = fs.readFileSync(integrityJSONPath);

const ecdsaSign = crypto.createSign(SHA256.hashName);
ecdsaSign.update(integrityJSON);
ecdsaSign.end();
const ecdsaSignatureASN1 = ecdsaSign.sign(ECDSA.privateKey);
//console.log('ASN.1 ecdsaSignature.byteLength = ' + ecdsaSignatureASN1.byteLength);
//console.log('ASN.1 ecdsaSignature.toHex = ' + ecdsaSignatureASN1.toString('hex'));
ECDSA.integrityJSONSignature = ((asn1Signature) => {
  const signature = asn1.define('ECDSASignature', function () { return this.seq().obj(this.key('r').int(), this.key('s').int()); }).decode(asn1Signature, 'der');
  return Buffer.concat([signature.r.toArrayLike(Buffer, 'be', 32), signature.s.toArrayLike(Buffer, 'be', 32)]);
})(ecdsaSignatureASN1);
console.log('integrityJSONSignature.byteLength = ' + ECDSA.integrityJSONSignature.byteLength);
console.log('integrityJSONSignature.toHex = ' + ECDSA.integrityJSONSignature.toString('hex'));
//const ecdsaVerify = crypto.createVerify('SHA256');
//ecdsaVerify.update(integrityJSON);
//ecdsaVerify.end();
//console.log('ecdsaVerify.verify = ' + ecdsaVerify.verify(ECDSA.publicKey, ecdsaSignatureASN1));

/*
  HKDF implmentation on RFC5869 and RFC8446 with crypto module
*/
class HKDF {
  static concat(...data) {
    data = data.map(item => {
      if ((item instanceof Uint8Array) || (item instanceof Array) || typeof item === 'string') {
        return Buffer.from(item);
      }
      else {
        return item;
      }
    });
    return Buffer.concat(data);
  }
  /*
    RFC5869

    HKDF-Extract(salt, IKM) = HMAC-Hash(salt, IKM)

      Inputs:
        salt     optional salt value (a non-secret random value); if not provided, it is set to a string of HashLen zeros.
        IKM      input keying material
  */
  static Extract(salt, IKM) {
    // HMAC-SHA256(salt, IKM)
    return crypto.createHmac(HKDF.hashName, salt || HKDF.hashLengthZero).update(IKM).digest();
  }
  /*
    RFC5869

    HKDF-Expand(PRK, info, L) -> OKM

    Options:
      Hash     a hash function; HashLen denotes the length of the hash function output in octets

    Inputs:
      PRK      a pseudorandom key of at least HashLen octets (usually, the output from the extract step)
      info     optional context and application specific information (can be a zero-length string)
      L        length of output keying material in octets (<= 255*HashLen)

    Output:
      OKM      output keying material (of L octets)

    The output OKM is calculated as follows:

    N = ceil(L/HashLen)
    T = T(1) | T(2) | T(3) | ... | T(N)
    OKM = first L octets of T

    where:
    T(0) = empty string (zero length)
    T(1) = HMAC-Hash(PRK, T(0) | info | 0x01)
    T(2) = HMAC-Hash(PRK, T(1) | info | 0x02)
    T(3) = HMAC-Hash(PRK, T(2) | info | 0x03)
    ...
  */
  static Expand(PRK, info, L) {
    const N = Math.ceil(L / HKDF.hashLength);
    const T = [Buffer.alloc(0)]; // T(0)
    for (let i = 1; i <= N; i++) {
      T[i] = crypto.createHmac(HKDF.hashName, PRK).update(HKDF.concat(T[i - 1], info, [i])).digest();
    }
    return HKDF.concat(...T).slice(0, L);
  }
  /*
    RFC8446

    Transcript-Hash(M1, M2, ... Mn) = Hash(M1 || M2 || ... || Mn)
   */
  static Transcript_Hash(...M) {
    return crypto.createHash(HKDF.hashName).update(HKDF.concat(...M)).digest();
  }
  /*
    RFC8446

    Transcript-Hash(M1, M2, ... Mn) = Hash(M1 || M2 || ... || Mn)

    HKDF-Expand-Label(Secret, Label, Context, Length) =
      HKDF-Expand(Secret, HkdfLabel, Length)

    Where HkdfLabel is specified as:

    struct {
      uint16 length = Length;
      opaque label<7..255> = "tls13 " + Label;
      opaque context<0..255> = Context;
    } HkdfLabel;
  */
  static Expand_Label(Secret, Label, Context, Length) {
    const length = Buffer.alloc(2);
    length.writeUInt16BE(Length);
    const label = HKDF.concat('tls13 ', Label);
    const contextLen = HKDF.concat(Context).length;
    const HkdfLabel = HKDF.concat(length, Buffer.from([label.length]), label, Buffer.from([contextLen]), Context);
    return HKDF.Expand(Secret, HkdfLabel, Length);
  }
  /*
    RFC8446

    Derive-Secret(Secret, Label, Messages) =
      HKDF-Expand-Label(Secret, Label,
                        Transcript-Hash(Messages), Hash.length)
  */
  static Derive_Secret(Secret, Label, Messages) {
    return HKDF.Expand_Label(Secret, Label, HKDF.Transcript_Hash(Messages), HKDF.hashLength);
  }
}
/*
  static constant properties (workaround syntax for static class properties, which are not supported other than Chrome)
 */
Object.assign(HKDF, {
  hashName: 'sha256',
  hashLength: 32,
  hashLengthZero: Buffer.alloc(32),
});

const XContentEncoding = {
  AES_256_GCM: 'aes-256-gcm',
  GZIP_AES_256_GCM: 'gzip+aes-256-gcm'
};

const CacheControl = {
  proxiedRequest: 'no-cache',
  integrityResponse: 'no-cache, no-transform',
  //encryptedResponse: 'private, max-age=0, no-transform',
  encryptedResponse: 'no-cache, no-transform',
};

const RecordType = {
  size: 1, // byte
  Connect: 0x01, // client -> server
  Accept: 0x02, // server -> client
  Update: 0x03, // client -> server
};

const serverRandomBytes = 32;
const clientRandomBytes = 32;

// Clock of the client must be set between +-5 minites
const AcceptableTimestampRange = {
  min: -5 * 60 * 1000, // -5 minites
  max: +5 * 60 * 1000, // +5 minites
};

const isAcceptableRequestTimestamp = function isAcceptableRequestTimestamp(timestamp, now = Date.now()) {
  timestamp = parseInt(timestamp);
  return now + AcceptableTimestampRange.min <= timestamp &&
    timestamp <= now + AcceptableTimestampRange.max;
}

const validateRequestHeaders = function validateRequestHeaders(req, {
    salt = null,
    method = req.method,
    scheme = 'https',
    type = req.headers['content-type'],
    authority = null,
    path = req.url }) {
  const now = Date.now();
  let result;
  if (salt) {
    // verify x-integrity header
    const integrityHeader = req.headers['x-integrity'];
    //console.log('validating x-integrity header ' + integrityHeader + ' with salt ', salt.toString('hex'));
    if (integrityHeader) {
      const parts = integrityHeader.split(';');
      const headerNames = parts[0].split(',');
      if (parts[1] && parts[1].indexOf(HMAC.prefix) === 0) {
        const hmac = parts[1].substring(HMAC.prefix.length);
        const headers = headerNames.map((headerName) => headerName + ': ' + req.headers[headerName] + '\n').join('');
        result = hmac === crypto.createHmac(SHA256.hashName, salt).update(headers).digest('base64');
      }
      else {
        result = false;
      }
    }
    else {
      // no x-integrity header
      result = false;
    }
  }
  else {
    // verify headers other than x-integrity
    result =
      req.headers['content-type'] === type &&
      req.method === method &&
      req.headers['x-method'] === req.method &&
      req.headers['x-scheme'] === scheme &&
      (authority ? req.headers['x-authority'] === authority : true) &&
      (path
        ? req.url === path && req.headers['x-path'] === path
        : true) &&
      isAcceptableRequestTimestamp(req.headers['x-timestamp'], now) &&
      (req.method === 'POST' || req.method === 'PUT'
        ? req.headers['x-digest'] === SHA256.prefix +
            crypto.createHash(SHA256.hashName).update(req.body).digest('base64')
        : true);
  }
  return result;
}

const setResponseHeaders = function setResponseHeaders(req, res, {
    salt = null,
    statusCode = res.statusCode,
    now = Date.now(),
    scheme = req.headers['x-scheme'] || 'https',
    authority = req.headers['x-authority'],
    path = req.headers['x-path'] || res.locals.url,
    body = null,
    type = res.getHeader('content-type') || 'application/octet-stream',
    excludedHeaders = {
      'server': true,
      'accept-ranges': true,
      'content-length': true,
      'connection': true,
      'date': true,
      //'cache-control': true,
    },
  }) {
  res.removeHeader('content-length');
  if (body) {
    res.setHeader('content-length', '' + body.byteLength);
    res.setHeader('content-type', type);
    if (res.locals.doEncrypt) {
      if (res.getHeader('content-encoding') === 'gzip') {
        res.removeHeader('content-encoding');
        res.locals.gzip = true;
      }
      res.setHeader('x-content-encoding', res.locals.gzip ? XContentEncoding.GZIP_AES_256_GCM : XContentEncoding.AES_256_GCM);
    }
  }
  if (res.locals.doEncrypt || res.locals.noCache) {
    res.removeHeader('cache-control');
    res.setHeader('cache-control', CacheControl.encryptedResponse);
  }
  else if (res.locals.integrityResponse) {
    res.removeHeader('cache-control');
    res.setHeader('cache-control', CacheControl.integrityResponse);
  }
  res.setHeader('accept-ch', 'UA, UA-Arch, UA-Platform, UA-Model, UA-Full-Version, UA-Platform-Version');
  res.setHeader('x-status', '' + statusCode);
  res.setHeader('x-scheme', scheme);
  if (authority) {
    res.setHeader('x-authority', authority);
  } 
  res.setHeader('x-path', path);
  if (req.headers['x-timestamp']) {
    res.setHeader('x-request-timestamp', req.headers['x-timestamp']);
  }
  res.setHeader('x-timestamp', now);
  if (body) {
    res.setHeader('x-digest', SHA256.prefix +
      crypto.createHash(SHA256.hashName).update(body).digest('base64'));
    //console.log('setResponseHeaders: x-path ' + res.getHeader('x-path') + ' x-digest ' + res.getHeader('x-digest'), body.toString());
  }
  if (salt) {
    let headersRaw = res.getHeaders();
    let headerNames = [];
    let headers = '';
    for (let header in headersRaw) {
      header = header.toLowerCase();
      if (excludedHeaders[header]) {
        continue;
      }
      headerNames.push(header);
      headers += header + ': ' + headersRaw[header] + '\n';
    }
    //console.log('setResponseHeaders: x-integrity headers=', headers, 'salt = ', salt.toString('hex'));
    res.setHeader('x-integrity', headerNames.join(',') + ';' +
      HMAC.prefix + crypto.createHmac(SHA256.hashName, salt).update(headers).digest('base64'));
  }
  return res;
}

const parseConnectRecord = function parseConnectRecord(req, res, Connect, CurrentSession, NextSession) {
  if (Connect.type !== RecordType.Connect) {
    throw new Error('invalid RecordType ' + Connect.type);
  }
  if (!(Connect.encrypted instanceof Buffer)) {
    throw new Error('missing encrypted body');
  }
  if (Connect.encrypted.byteLength < RecordType.size + RSA.keyBytes + AES_GCM.tagLength) {
    throw new Error('malformatted encrypted body');
  }
  //const times = {}
  //times.start = process.hrtime();
  let offset = RecordType.size;
  let length;
  Connect.encryptedHeader = Connect.encrypted.subarray(offset, offset + (length = RSA.keyBytes));
  //times.encryptedHeader = process.hrtime(times.start);
  offset += length;
  Connect.decryptedHeader = helpers.rsa_oaep_decrypt(new Uint8Array(Connect.encryptedHeader).buffer, RSA.privateKeyPEM);
  //times.decryptedHeader = process.hrtime(times.start);
  Connect.AES_GCM = {
    clientOneTimeKey: Connect.decryptedHeader.slice(0, AES_GCM.keyLength),
    clientOneTimeIv: Connect.decryptedHeader.slice(AES_GCM.keyLength, AES_GCM.keyLength + AES_GCM.ivLength),
  };
  //times.AES_GCM = process.hrtime(times.start);
  length = Connect.encrypted.byteLength - AES_GCM.tagLength - offset;
  if (length !== clientRandomBytes + ECDHE.publicKeyLength + 4 * SHA256.hashBytes) {
    throw new Error('malformatted encrypted body');
  }
  Connect.encryptedBody = Connect.encrypted.subarray(offset, offset + length);
  //times.encryptedBody = process.hrtime(times.start);
  Connect.authTag = Connect.encrypted.subarray(offset + length);
  //times.authTag = process.hrtime(times.start);
  const decipher = crypto.createDecipheriv(AES_GCM.cipherName, Connect.AES_GCM.clientOneTimeKey, Connect.AES_GCM.clientOneTimeIv);
  //times.createDecipheriv = process.hrtime(times.start);
  decipher.setAuthTag(Connect.authTag);
  //times.setAuthTag = process.hrtime(times.start);
  Connect.decryptedBody = Buffer.concat([decipher.update(Connect.encryptedBody), decipher.final()]);
  //times.decryptedBody = process.hrtime(times.start);
  offset = 0;
  length = clientRandomBytes;
  NextSession.clientRandom = Connect.decryptedBody.subarray(offset, offset + length);
  //times.clientRandom = process.hrtime(times.start);
  offset += length;
  length = ECDHE.publicKeyLength;
  NextSession.ECDHE = {
    clientPublicKey: Connect.decryptedBody.subarray(offset, offset + length)
  };
  //times.clientPublicKey = process.hrtime(times.start);
  offset += length;
  length = SHA256.hashBytes;
  CurrentSession.ClientIntegrity = {
    userAgentHash: Connect.decryptedBody.subarray(offset, offset + length),
    browserHash: Connect.decryptedBody.subarray(offset + length * 1, offset + length * 2),
    scriptsHash: Connect.decryptedBody.subarray(offset + length * 2, offset + length * 3),
    htmlHash: Connect.decryptedBody.subarray(offset + length * 3, offset + length * 4),
  };
  //times.clientIntegrity = process.hrtime(times.start);
  //console.log('times: ', JSON.stringify(times, null, 2));
}

const parseSessionID = function parseSessionID(req, res, CurrentSession) {
  // Parse SessionID
  CurrentSession.SessionIDHeader = req.headers['x-session-id'];
  if (!CurrentSession.SessionIDHeader) {
    throw new Error('missing x-session-id');
  }
  CurrentSession.SessionID = Buffer.from(CurrentSession.SessionIDHeader, 'base64');
  let offset = 0;
  let cipherLength = CurrentSession.SessionID.byteLength - AES_GCM.tagLength;
  if (cipherLength !== 4 + SHA256.hashBytes * 2) {
    throw new Error('malformatted x-session-id ' + CurrentSession.SessionIDHeader);
  }
  CurrentSession.authTag = CurrentSession.SessionID.subarray(0 + cipherLength);
  const sessionIdDecipher =
    crypto.createDecipheriv(AES_GCM.cipherName, AES_GCM.sessionIdKey, AES_GCM.sessionIdIv);
  sessionIdDecipher.setAuthTag(CurrentSession.authTag);
  CurrentSession.SessionIDPayload = 
    Buffer.concat([sessionIdDecipher.update(CurrentSession.SessionID.subarray(offset, cipherLength)),
      sessionIdDecipher.final()]);
  CurrentSession.session_timestamp = CurrentSession.SessionIDPayload.readUInt32BE(0);
  offset = 4; // Uint32 length
  length = SHA256.hashBytes;
  CurrentSession.master_secret = CurrentSession.SessionIDPayload.subarray(offset, offset + length);
  offset += length;
  CurrentSession.transcript_hash = CurrentSession.SessionIDPayload.subarray(offset, offset + length);
}

const SessionTimestamp = {
  session_early_lifetime: 5 * 60 * 1000, // 5 min
  session_lifetime: 10 * 60 * 1000, // 10 min
};

const validateSessionTimestamp = function validateSessionTimestamp(CurrentSession, throws = true) {
  const now = Date.now();
  const session_timestamp = CurrentSession.session_timestamp * 1000; // convert to msec UNIX time
  const session_lifetime = session_timestamp + SessionTimestamp.session_lifetime;
  if (!(session_timestamp <= now && now <= session_lifetime)) {
    // session expired or invalid
    if (throws) {
      throw new Error('invalid session_timestamp');
    }
    else {
      return false;
    }
  }
  return true;
}

const deriveCurrentSessionKeys = function deriveCurrentSessionKeys(CurrentSession) {
  // Derive current secrets (not for the next updated ones)
  CurrentSession.client_traffic_secret = CurrentSession.client_traffic_secret ||
    HKDF.Expand_Label(CurrentSession.master_secret, 'c ap traffic', CurrentSession.transcript_hash, SHA256.hashBytes);
  CurrentSession.server_traffic_secret = CurrentSession.server_traffic_secret ||
    HKDF.Expand_Label(CurrentSession.master_secret, 's ap traffic', CurrentSession.transcript_hash, SHA256.hashBytes);
  CurrentSession.session_master_secret = CurrentSession.session_master_secret ||
    HKDF.Expand_Label(CurrentSession.master_secret, 'session', CurrentSession.transcript_hash, SHA256.hashBytes);
  CurrentSession.server_write_key = CurrentSession.server_write_key ||
    HKDF.Expand_Label(CurrentSession.server_traffic_secret, 'key', '', AES_GCM.keyLength);
  CurrentSession.server_write_iv = CurrentSession.server_write_iv ||
    HKDF.Expand_Label(CurrentSession.server_traffic_secret, 'iv', '', AES_GCM.ivLength);
  CurrentSession.server_write_salt = CurrentSession.server_write_salt ||
    HKDF.Expand_Label(CurrentSession.server_traffic_secret, 'salt', '', HMAC.saltLength);
  CurrentSession.client_write_key = CurrentSession.client_write_key ||
    HKDF.Expand_Label(CurrentSession.client_traffic_secret, 'key', '', AES_GCM.keyLength);
  CurrentSession.client_write_iv = CurrentSession.client_write_iv ||
    HKDF.Expand_Label(CurrentSession.client_traffic_secret, 'iv', '', AES_GCM.ivLength);
  CurrentSession.client_write_salt = CurrentSession.client_write_salt ||
    HKDF.Expand_Label(CurrentSession.client_traffic_secret, 'salt', '', HMAC.saltLength);
  CurrentSession.PSK = CurrentSession.PSK ||
    HKDF.Expand_Label(CurrentSession.session_master_secret, 'update', '', SHA256.hashBytes);
}

const SessionsCache = new Map();
const SessionsList = [];
const logSessions = function logSessions() {
  const now = Math.floor(Date.now() / 1000);
  console.log('Sessions = ', JSON.stringify(SessionsList.map(Session => 
    'life: ' + (Session.session_timestamp + Math.floor(SessionTimestamp.session_lifetime / 1000) - now) +
    ' ts: ' + Session.session_timestamp + ' id: ' + Session.SessionIDHeader), null, 2));
}
const addSession = function addSession(CurrentSession) {
  const session_timestamp = CurrentSession.session_timestamp;
  if (SessionsList.length > 0) {
    let i;
    for (i = SessionsList.length - 1; i >= 0; i--) {
      const _session_timestamp = SessionsList[i].session_timestamp;
      if (_session_timestamp <= session_timestamp) {
        break;
      }
    } 
    SessionsList.splice(i + 1, 0, CurrentSession);
  }
  else {
    SessionsList.push(CurrentSession);
  }
  SessionsCache.set(CurrentSession.SessionIDHeader, CurrentSession);
  console.log('addSession: x-session-id: ' + CurrentSession.SessionIDHeader);
  //logSessions();
}
const cleanupSessions = function cleanupSessions() {
  let Session;
  while (Session = SessionsList[0]) {
    if (validateSessionTimestamp(Session, false)) {
      break;
    }
    else {
      console.log('cleanupSessions: x-session-id: ' + Session.SessionIDHeader);
      SessionsCache.delete(Session.SessionIDHeader);
      SessionsList.shift();
      //logSessions();
    }
  }
}
const cleanupIntervalID = setInterval(cleanupSessions, 1000);
const getCurrentSession = function getCurrentSession(req, res, CurrentSession) {
  const SessionIDHeader = req.headers['x-session-id'];
  if (!SessionIDHeader) {
    throw new Error('missing x-session-id');
  }
  const cachedSession = SessionsCache.get(SessionIDHeader);
  if (cachedSession) {
    Object.assign(CurrentSession, cachedSession);
    validateSessionTimestamp(CurrentSession);
  }
  else {
    parseSessionID(req, res, CurrentSession);
    validateSessionTimestamp(CurrentSession);
    deriveCurrentSessionKeys(CurrentSession);
    addSession(CurrentSession);
  }
}

const parseUpdateRecord = function parseUpdateRecord(req, res, Update, CurrentSession, NextSession) {
  /*
    RecordType.Update [1] +
    AES_GCM.encrypt(aesKey = CurrentSession.client_write_key, iv = CurrentSession.client_write_iv,
      AES_GCM.clientOneTimeKey [32] +
      AES_GCM.clientOneTimeIv [12] +
      NextSession.clientRandom [32] +
      NextSession.ECDHE.clientPublicKey [65]
    )
  */
  if (Update.type !== RecordType.Update) {
    throw new Error('invalid RecordType ' + Update.type);
  }
  if (!(Update.encrypted instanceof Buffer)) {
    throw new Error('missing encrypted body');
  }
  getCurrentSession(req, res, CurrentSession);
  let offset = RecordType.size;
  let cipherLength = AES_GCM.keyLength + AES_GCM.ivLength + clientRandomBytes + ECDHE.publicKeyLength;
  if (Update.encrypted.byteLength !== offset + cipherLength + AES_GCM.tagLength) {
    throw new Error('malformatted encrypted body');
  }
  Update.encryptedBody = Update.encrypted.subarray(offset, offset + cipherLength);
  Update.authTag = Update.encrypted.subarray(offset + cipherLength);
  const decipher = crypto.createDecipheriv(AES_GCM.cipherName, CurrentSession.client_write_key, CurrentSession.client_write_iv);
  decipher.setAuthTag(Update.authTag);
  console.log('CurrentSession', CurrentSession);
  console.log('Update', Update);
  Update.decryptedBody = Buffer.concat([decipher.update(Update.encryptedBody), decipher.final()]);
  offset = 0;
  length = AES_GCM.keyLength;
  Update.AES_GCM = {};
  Update.AES_GCM.clientOneTimeKey = Update.decryptedBody.subarray(offset, offset + length);
  offset += length;
  length = AES_GCM.ivLength;
  Update.AES_GCM.clientOneTimeIv = Update.decryptedBody.subarray(offset, offset + length);
  offset += length;
  length = clientRandomBytes;
  NextSession.clientRandom = Update.decryptedBody.subarray(offset, offset + length);
  offset += length;
  length = ECDHE.publicKeyLength;
  NextSession.ECDHE = {
    clientPublicKey: Update.decryptedBody.subarray(offset, offset + length),
  };
}

let validate;
// Note: user-agent header from Chrome on Linux contains the running distribution name while navigator.userAgent does not
const linuxRawHeaderRegExp = /(\(X11; )([^; ]*; )(Linux [^ \)]*\))/;
const verifyConnectRecord = function verifyConnectRecord(req, res, Connect, CurrentSession, NextSession) {
  CurrentSession.userAgentFromHeader = req.headers['user-agent'];
  CurrentSession.userAgentFromHeaderNormalized = CurrentSession.userAgentFromHeader.replace(linuxRawHeaderRegExp, "$1$3");
  CurrentSession.userAgentHashFromHeader = crypto.createHash(SHA256.hashName).update(CurrentSession.userAgentFromHeader).digest();
  CurrentSession.userAgentHashFromHeaderNormalized = crypto.createHash(SHA256.hashName).update(CurrentSession.userAgentFromHeaderNormalized).digest();
  if (Buffer.compare(CurrentSession.userAgentHashFromHeader, CurrentSession.ClientIntegrity.userAgentHash) !== 0 &&
    Buffer.compare(CurrentSession.userAgentHashFromHeaderNormalized, CurrentSession.ClientIntegrity.userAgentHash) !== 0) {
    throw new Error('userAgentHash does not match with the header ' + CurrentSession.userAgentFromHeader);
  }
  switch (CurrentSession.mode) {
  case 'build':
    // store scriptsHash and htmlHash
    keys[scriptsHashHexName] = CurrentSession.ClientIntegrity.scriptsHash.toString('hex');
    keys[htmlHashHexName] = CurrentSession.ClientIntegrity.htmlHash.toString('hex');
    let keysJSON = JSON.stringify(keys, null, 2) + '\n';
    fs.writeFileSync(keysJSONPath, keysJSON, 'UTF-8');
    break;
  case 'debug':
  case 'server':
  default:
    // verify hashes
    // check scriptsHashHex
    if (keys[scriptsHashHexName] !== CurrentSession.ClientIntegrity.scriptsHash.toString('hex')) {
      throw new Error('integrityService: scriptsHashHex does not match. Expected: ' +
        keys[scriptsHashHexName] +
        ' Actual: ' + CurrentSession.ClientIntegrity.scriptsHash.toString('hex'));
    }
    // check htmlHashHex
    if (keys[htmlHashHexName] !== CurrentSession.ClientIntegrity.htmlHash.toString('hex')) {
      throw new Error('integrityService: htmlHashHex does not match. Expected: ' +
        keys[htmlHashHexName] +
        ' Actual: ' + CurrentSession.ClientIntegrity.htmlHash.toString('hex'));
    }
    // TODO: Validate browserHash at integrityService
    //browserHash === verifiedBrowserHash(req.header['user-agent']) // Note: This is the key to the authentication in the handshake
    switch (validate(req, Connect, CurrentSession)) {
    case 'validated':
      break;
    default:
      throw new Error('integrityService: browserHash validation failed');
      break;
    }
    break;
  }
}

const deriveConnectKeys = function deriveConnectKeys(req, res, Record, CurrentSession, NextSession) {
  // Derive connect_early_secret
  CurrentSession.connect_early_secret = HKDF.Extract(0, Buffer.concat([
    Record.AES_GCM.clientOneTimeKey,
    Record.AES_GCM.clientOneTimeIv,
    NextSession.clientRandom,
    NextSession.ECDHE.clientPublicKey,
    CurrentSession.ClientIntegrity.userAgentHash,
    CurrentSession.ClientIntegrity.browserHash,
    CurrentSession.ClientIntegrity.scriptsHash,
    CurrentSession.ClientIntegrity.htmlHash,
  ]));
  // Derive Pseudo-PSK for initial key derivation
  CurrentSession.PSK = HKDF.Expand_Label(CurrentSession.connect_early_secret, 'connect', '', SHA256.hashBytes); // pseudo-PSK
  // Derive connect_salt
  CurrentSession.connect_salt = HKDF.Expand_Label(CurrentSession.connect_early_secret, 'salt', '', HMAC.saltLength);
}

const prepareNextSession = function prepareNextSession(req, res, Record, Accept, CurrentSession, NextSession) {
  // generate serverRandom
  NextSession.serverRandom = crypto.randomFillSync(Buffer.alloc(serverRandomBytes));

  // generate ECDHE key pair
  const ecdhServer = crypto.createECDH(ECDHE.curveName);
  NextSession.ECDHE.serverPublicKey = ecdhServer.generateKeys();

  // generate ECDHE shared secret
  NextSession.ECDHE.sharedKey = ecdhServer.computeSecret(NextSession.ECDHE.clientPublicKey);

  // construct Accept.header
  Accept.headerPayload = Buffer.concat([NextSession.serverRandom, NextSession.ECDHE.serverPublicKey]);
  const cipher = crypto.createCipheriv(AES_GCM.cipherName, Record.AES_GCM.clientOneTimeKey, Record.AES_GCM.clientOneTimeIv);
  Accept.header = Buffer.concat([
    Buffer.from([RecordType.Accept]),
    cipher.update(Accept.headerPayload), cipher.final(), cipher.getAuthTag()]);

  // derive next secrets
  NextSession.early_secret = HKDF.Extract(0, CurrentSession.PSK);
  NextSession.handshake_secret =
    HKDF.Extract(HKDF.Derive_Secret(NextSession.early_secret, 'derived', ''), NextSession.ECDHE.sharedKey);
  NextSession.master_secret =
    HKDF.Extract(HKDF.Derive_Secret(NextSession.handshake_secret, 'derived', ''), HKDF.hashLengthZero);

  NextSession.transcript_hash = HKDF.Transcript_Hash(Record.encrypted, Accept.header);

  NextSession.server_traffic_secret =
    HKDF.Expand_Label(NextSession.master_secret, 's ap traffic', NextSession.transcript_hash, SHA256.hashBytes);

  NextSession.server_write_key =
    HKDF.Expand_Label(NextSession.server_traffic_secret, 'key', '', AES_GCM.keyLength);
  NextSession.server_write_iv =
    HKDF.Expand_Label(NextSession.server_traffic_secret, 'iv', '', AES_GCM.ivLength);
  NextSession.server_write_salt =
    HKDF.Expand_Label(NextSession.server_traffic_secret, 'salt', '', HMAC.saltLength);

  // generate next session_timestamp
  NextSession.session_timestamp_raw = Date.now();
  NextSession.session_timestamp = Math.floor(NextSession.session_timestamp_raw / 1000);
  NextSession.session_timestamp_buf = Buffer.alloc(4);
  NextSession.session_timestamp_buf.writeUInt32BE(NextSession.session_timestamp, 0);

  // generate next SessionID
  NextSession.SessionIDPayload = Buffer.concat([
    NextSession.session_timestamp_buf,
    NextSession.master_secret,
    NextSession.transcript_hash
  ]);
  const sessionIdCipher = crypto.createCipheriv(AES_GCM.cipherName, AES_GCM.sessionIdKey, AES_GCM.sessionIdIv);
  NextSession.SessionID = Buffer.concat([
    sessionIdCipher.update(NextSession.SessionIDPayload), sessionIdCipher.final(), sessionIdCipher.getAuthTag()]);
  NextSession.SessionIDHeader = NextSession.SessionID.toString('base64');

  // encrypt Accept.body
  const bodyCipher = crypto.createCipheriv(AES_GCM.cipherName, NextSession.server_write_key, NextSession.server_write_iv);
  Accept.body = Buffer.concat([
    bodyCipher.update(NextSession.SessionID),
    bodyCipher.update(ECDSA.integrityJSONSignature),
    bodyCipher.final(), bodyCipher.getAuthTag()]);

  // construct Accept
  Accept.encrypted = Buffer.concat([Accept.header, Accept.body]);
}

const aboutBlankRedirectorHTML = `<script no-hook>location = 'about:blank';</script>`;
const integrityService = function integrityService({ mode = 'debug', entryPageURLPath = '/', authority = 'localhost', whitelist = null, blacklist = null }) {
  const integrityServiceURLPath = path.join(entryPageURLPath, 'integrity');
  validate = validationService({ mode, host: process.env['VALIDATION_HOST'] || 'localhost', keys });
  //const aboutBlankURL = mode !== 'debug' ? 'about:blank' : 'about:blank?from=integrityService.js';
  return async (req, res, next) => {
    console.log('integrityService.js: req.url = ' + req.url, req.headers);
    if (req.url === integrityServiceURLPath) {
      // integrity service
      if (req.is('application/octet-stream')) {
        let CurrentSession = {};
        let NextSession = {};
        let Record = {};
        let Accept = {};
        CurrentSession.mode = mode;
        Record.encrypted = req.body;
        let responseBody;
        try {
          if (!validateRequestHeaders(req, {
                method: 'POST',
                type: 'application/octet-stream',
                path: integrityServiceURLPath,
                authority: authority,
              })) {
            throw new Error('validateRequestHeaders failed');
          }
          Record.type = Record.encrypted.readUInt8(0);
          switch (Record.type) {
          case RecordType.Connect:
            parseConnectRecord(req, res, Record, CurrentSession, NextSession);
            verifyConnectRecord(req, res, Record, CurrentSession, NextSession);
            deriveConnectKeys(req, res, Record, CurrentSession, NextSession);
            if (!validateRequestHeaders(req, { salt: CurrentSession.connect_salt })) {
              throw new Error('invalid x-integrity for Connect');
            }
            break;
          case RecordType.Update:
            parseUpdateRecord(req, res, Record, CurrentSession, NextSession);
            if (!validateRequestHeaders(req, { salt: CurrentSession.client_write_salt })) {
              throw new Error('invalid x-integrity for Update');
            }
            break;
          default:
            // Invalid RecordType
            throw new Error('invalid RecordType ' + recordType);
            break;
          }
          // Request has been validated
          // Prepare the next session
          prepareNextSession(req, res, Record, Accept, CurrentSession, NextSession);
          deriveCurrentSessionKeys(NextSession);
          addSession(NextSession);
          console.log('NextSession', NextSession);
          responseBody = Accept.encrypted;
        }
        catch (e) {
          const dummyResponseLength = 278; // bytes
          NextSession.server_write_salt = crypto.randomFillSync(Buffer.alloc(SHA256.hashBytes));
          responseBody = crypto.randomFillSync(Buffer.alloc(dummyResponseLength));
          responseBody.writeUInt8(RecordType.Accept, 0); // pretend to be an Accept response
          console.log(e);
        }
        res.locals.integrityResponse = true;
        res.status(200);
        setResponseHeaders(req, res, {
          salt: NextSession.server_write_salt,
          body: responseBody,
          type: 'application/octet-stream',
        });
        res.send(responseBody);
      }
      else {
        const dummyResponseLength = 278; // bytes
        const responseBody = crypto.randomFillSync(Buffer.alloc(dummyResponseLength));
        responseBody.writeUInt8(RecordType.Accept, 0); // pretend to be an Accept response
        res.status(200).send(responseBody);
      }
    }
    else {
      try {
        // middleware for encryption
        res.locals.start = Date.now();
        const CurrentSession = {};
        CurrentSession.mode = mode;
        res.locals.req = req;
        res.locals.CurrentSession = CurrentSession;

        let pathname = new URL(req.url, 'https://localhost').pathname;
        if (blacklist) {
          if (blacklist[pathname]) {
            throw new Error('blacklisted URL ' + req.url);
          }
        }
        if (whitelist) {
          if (whitelist[pathname]) {
            res.locals.whitelisted = true;
          }
        }
        if (pathname === entryPageURLPath) {
          res.locals.pathname = pathname;
          res.locals.noCache = true;
          res.locals.entryPage = true;
        }
        if (req.get('x-session-id')) {
          try {
            if (!validateRequestHeaders(req, { authority: authority })) {
              throw new Error('validateRequestHeaders failed');
            }
            getCurrentSession(req, res, CurrentSession);
            if (!validateRequestHeaders(req, { salt: CurrentSession.client_write_salt })) {
              throw new Error('invalid x-integrity for request url ' + req.url);
            }
            //console.log('CurrentSession from SessionID', CurrentSession);
          }
          catch (e) {
            if (res.locals.entryPage) {
              // only the entry page is allowed with an invalid SessionID
              delete req.headers['x-integrity'];
            }
            else {
              //console.error('integrityService.js: error in calling validateRequestHeaders', req.url, e, req.headers);
              res.locals.error = e;
              throw e;
            }
          }

          res.locals.doEncrypt = true; // TODO: conditional encryption
          //console.log('integrityService.js: encrypting req.method = ' + req.method + ' req.url = ' + req.url, req.headers);
          if (req.get('x-content-encoding') === XContentEncoding.AES_256_GCM) {
            try {
              //console.log('integrityService.js: decrypting req.method = ' + req.method + ' req.url = ' + req.url);
              // decrypt request body
              const key = res.locals.CurrentSession.client_write_key;
              const iv = res.locals.CurrentSession.client_write_iv;
              const cipherLength = req.body.byteLength - AES_GCM.tagLength;
              const decipher = crypto.createDecipheriv(AES_GCM.cipherName, key, iv);
              const authTag = req.body.subarray(cipherLength);
              decipher.setAuthTag(authTag);
              req.body = Buffer.concat([decipher.update(req.body.subarray(0, cipherLength)), decipher.final()]);
              //console.log('req.body', req.body.toString('utf8'));
            }
            catch (e) {
              //console.error('integrityService.js: error in decrypting request body', req.url, e, req.headers);
              res.locals.error = e;
              throw e;
            }
          }
        }
        else {
          // no x-session-id
          if (whitelist && !res.locals.whitelisted) {
            throw new Error('non-encrypted request for non-whitelisted URL ' + req.url);
          }
        }
        res.locals.url = req.url;
        res.locals.data = [];
        if (res.locals.noCache || res.locals.doEncrypt || res.locals.whitelisted) {
          req.headers['cache-control'] = CacheControl.proxiedRequest;
          delete req.headers['if-modified-since'];
          delete req.headers['if-none-match'];
          res.removeHeader('cache-control');
          res.setHeader('cache-control', CacheControl.encryptedResponse);
        }
        res.write = function write(data, encoding, callback) {
          //console.log('integrityService.js: calling res.write', data, encoding, callback);
          if (this.locals.done) {
            Object.getPrototypeOf(this).write.call(this, data, encoding, callback);
            return false;
          }
          else {
            this.locals.data.push(typeof data === 'string' ? Buffer.from(data, encoding) : data);
            return true;
          }
        };
        res.end = function end(data, encoding, callback) {
          if (data) {
            //console.log('end: this.locals.data', this.locals.data, data, req.method);
            if (Array.isArray(this.locals.data)) {
              this.locals.data.push(typeof data === 'string' ? Buffer.from(data, encoding) : data);
            }
            else if (this.locals.data instanceof Buffer) {
              this.locals.data = [this.locals.data, typeof data === 'string' ? Buffer.from(data, encoding) : data];
            }
          }
          this.locals.done = true;
          this.locals.data = data = Buffer.concat(this.locals.data);
          if (this.locals.entryPage && !this.locals.doEncrypt) {
            // cut off the last comment from the entry page
            let entryHtmlString = data.toString();
            let lastCommentIndex = entryHtmlString.lastIndexOf('<!--');
            if (lastCommentIndex > 0) {
              entryHtmlString = entryHtmlString.substring(0, lastCommentIndex) + '<!--<C!-- cut off --C>-->';
            }
            this.locals.data = data = Buffer.from(entryHtmlString, 'utf-8');
            //console.log('integrityService.js: cutting off the entry page ' + this.locals.pathname, entryHtmlString);
          }
          if (this.locals.doEncrypt) {
            try {
              const key = this.locals.CurrentSession.server_write_key;
              const iv = this.locals.CurrentSession.server_write_iv;
              const cipher = crypto.createCipheriv(AES_GCM.cipherName, key, iv);
              this.locals.data = data = Buffer.concat([cipher.update(this.locals.data), cipher.final(), cipher.getAuthTag()]);
              this.locals.encrypted = Date.now();
              //console.log('integrityService.js: calling res.end with encryption ', this.locals.url, data.byteLength, encoding, callback, this.getHeaders());
            }
            catch (e) {
              //console.error('integrityService.js: error in calling res.end with encryption ', this.locals.url, e, data.byteLength, encoding, callback, this.getHeaders());
              this.locals.error = e;
              this.locals.data = null;
            }
          }
          //console.log('integrityService.js: calling res.end', data, encoding, callback, this.getHeaders());
          if (typeof this.locals.callback === 'function') {
            this.locals.callback();
          }
          return Object.getPrototypeOf(this).end.call(this, data, encoding, callback);
        };
        res.writeHead = function writeHead(statusCode, reason, obj) {
          //console.log('writeHead statusCode', statusCode, this.locals.data);
          if (!this.locals.done) {
            this.locals.callback = () => {
              this.writeHead(statusCode, reason, obj);
            };
            return;
          }
          if (this.locals.data instanceof Buffer &&
              !(statusCode === 204 || statusCode === 304 || (statusCode >= 100 && statusCode <= 199))) {
            //console.log('integrityService.js: writeHead' + this.locals.url, 'CurrentSession', this.locals.CurrentSession);
            setResponseHeaders(this.locals.req, this, {
              salt: this.locals.CurrentSession.server_write_salt,
              statusCode: statusCode,
              body: this.locals.data,
            });
            this.locals.headergenerated = Date.now();
            /*
            if (this.locals.encrypted) {
              console.log('integrityService.js: ' + this.locals.url + ' encryption in ' + (this.locals.encrypted - this.locals.start) + ' headers in ' + (this.locals.headergenerated - this.locals.start));
            }
            */
          }
          else {
            setResponseHeaders(this.locals.req, this, {
              salt: this.locals.CurrentSession.server_write_salt,
              statusCode: statusCode,
              body: null,
            });
          }
          //console.log('integrityService.js: calling res.writeHead', statusCode, reason, obj, this.getHeaders(), this.locals.url);
          return Object.getPrototypeOf(this).writeHead.call(this, statusCode, reason, obj);
        };
        next();
      }
      catch (e) {
        console.error('integrityService.js: error in request handling', req.url, e, req.headers);
        res.setHeader('content-type', 'text/html');
        res.status(403).send(aboutBlankRedirectorHTML);
        //res.redirect(307, aboutBlankURL + ((mode === 'debug' || mode === 'build') ? '&error=' + encodeURIComponent(e.toString()) : ''));
      }
    };
  }
}

let proxy;
{
  // patch http-proxy-middleware
  const proxyMiddlewareRaw = require('http-proxy-middleware/lib/index.js');
  const _ = require('lodash');
  const httpProxy = require('http-proxy');
  const configFactory = require('http-proxy-middleware/lib/config-factory');
  const handlers = require('http-proxy-middleware/lib/handlers');
  const contextMatcher = require('http-proxy-middleware/lib/context-matcher');
  const PathRewriter = require('http-proxy-middleware/lib/path-rewriter');
  const Router = require('http-proxy-middleware/lib/router');
  const logger = require('http-proxy-middleware/lib/logger').getInstance();
  const getArrow = require('http-proxy-middleware/lib/logger').getArrow;

  proxy = new Function(
    'crypto', '_', 'httpProxy', 'configFactory', 'handlers', 'contextMatcher', 'PathRewriter', 'Router', 'logger', 'getArrow', 
    'return ' + proxyMiddlewareRaw.toString().replace(
     `proxy.on('error', logError)`,
     `proxy.on('error', logError)

      proxy.on('proxyReq', function (proxyReq, req, res, options) {
        const body = req.body;
        if (body) {
          if (typeof body === 'string' || body instanceof Buffer || body instanceof ArrayBuffer) {
            proxyReq.setHeader('content-length', Buffer.byteLength(body));
            proxyReq.write(req.body);
          }
          else if (typeof body === 'object' && req.is('application/json')) {
            const body = Buffer.from(JSON.stringify(req.body));
            proxyReq.setHeader('content-length', Buffer.byteLength(body));
            proxyReq.write(body);
          }
        }
      });
      `
    ))(crypto, _, httpProxy, configFactory, handlers, contextMatcher, PathRewriter, Router, logger, getArrow);
}

const bodyParserRawOptions = {
  limit: '100mb',
  type: (req) => req.is('application/octet-stream') || req.get('x-content-encoding') === XContentEncoding.AES_256_GCM,
  inflate: true,
  verify: (req, res, buf, encoding) => true,
};

module.exports = {
  integrityService: integrityService,
  proxy: proxy,
  bodyParserRawOptions: bodyParserRawOptions,
};

/* 
  Pseudo-Code

  2019-08-27: Remove #hash from x-path header according to HTTP/1.1, HTTP/2 RFCs
  2019-09-04: Skip fetching and loading cache-bundle.json when it has already been loaded

  const RecordType = {
    Connect: 1, // client -> server
    Accept: 2, // server -> client
    Update: 3, // client -> server
  };

  const key_length = 32; // bytes
  const iv_length = 12; // bytes
  const salt_length = 32; // bytes
  Hash.length = 32; // bytes
  Hash = SHA256;

  const entryPageURL = "https://host.name/entry/page/"; // must be a directory path
  const integrityServiceURL = new URL("integrity", entryPageURL).href; // https://host.name/entry/page/integrity

  // at server
  keys = {
    "version": "version_638",
    "rsa-private-key.pem": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAk4Rm72FO94F4KWny7JRE8YUgAzy0hrjsg3XTnieteK0VGDID\nJUyndaCA7HvmLbMRLLkTLg4hcQxAet8SAIM/iSbo51JtNu3qkDXADON2KnZf5P1Y\n5THL3jkwFQQjucbytF92C5yqrKL5wBSH2VFnnv/WR2Mk/GE8B3dPD6X1TdQWRQpD\n0wuWzx/R4DCg1zXcwjD2KK65VDZ4BB9dk3HX0SrtAiFhgP+kydfwgkhQDhBO3rIb\n+qAzRXLB2a3KkYKO5DVFaNWt0J0qRkR+ShTsYfhHCqRemO4ZXfd2aV0lIEtJwmdO\nIl19ijVv+XjDeXEpDDHMwcp5pbnNb6YKTnRu9wIDAQABAoIBAAqY5Fwl/WpCXsN6\n3Pyp2hoPmjEhV0amWjdHa6Bc8VVN+cn3LcqsKwuEMD7M18hIqN8xnHMeiMB6RNeO\n1tg6lYHgzbJwdXAQv10Ev3sti/uY7WKh4JT2ctLQAOhBl99sr1rN0MkcxBYKzy5B\nS1ENTAhcEKSoNqv6wDk5FPDm1yx0B3qZhrws6EkRt29yOO7bhqjF4c5GfeuAkuDB\n44OJ6B+klxT4YsUbfSkUfnlTw3IBfM37dlBEbLH7f3dMeK0UVq2L1MRBjlmOzk8c\nriuhAxeBNGGcTNdQo2fzTMGesg/Ixqoc0Odh1BB9HVVkoCiNFTnACY2oXh3rotxs\nL2ZRMaECgYEA7VFczuTVxtpzPUmAKrNGk9WRLuW+eb08W4DYOf5yYLhxLMHishnR\nBO+t4pkuoJ8SgH4jvb/mxEBdV2wjlJs2QGYvX9EYTwdezHzcpwK03XFHLwpKpRD1\nsTw6UnucWb+63ZB0r5NyVkHtaxhtpPU6hAlTKZXHocPKahEypnsSKQsCgYEAnyFM\nYNPpcat8DM3YPmau0l6Q2RaNRjlQw+rEZ8zRlzPf4hiwPENjklYM7u0ceIbdrjc3\nWeThLyktsnyNCijrv7VZgmgyrgFL29VsVrfeR3ZwgHeBLUNgcTwggBmANrA7rmBN\nzmXhLa5xdn8PmjYQDNK7qEy/3WnHU0VFuWKvfUUCgYBVqytfnIf3cuBq3V+hCnqN\n32i7j0AFXmSte4OS2+GaPLrON2eId31W1Nbml/mXDhV1wRNR6jZ53epUJrtpZ+Zb\ntQehBTBLRxPXqbNVrspvrfbOal6r28V1p5I+OFUmqOniFcWppAaAUOhN4tGh3My0\n4VDeEC2ynaUySOcJ5h+WJQKBgA3lX4EZIEqf2f5YP2j7mIqgXW/Hq2CVgrsJFkum\nNCtLCWL6GvG4RMqznv+CTzkrNdKP2dKMzSlMJERw4fQgLK4aDQ35QWu2i0RQN9y+\nw7dj3WEqjmpAdvyMbp4hG/QqoZuRp1m9xdMyZ5AcemVSEUa9ZEvHH/4azaA07WjJ\n+F8tAoGBAJUQs3F9GTm+TU6Ggeq1t03vkma76Mi2SPpFdmi56SIjGUEsz/SgxvE9\n/CeWuBPxj+viJ9Yinx3wLXEYGFUfDz8/XTUsu+h8q6HLNtR9O2WNadme4AEiSli7\njiQ21H6pWu0NM5e1rNoPTOCh7RFmignOchDFFpl0vXSNUPLn6zA7\n-----END RSA PRIVATE KEY-----\n",
    "rsa-public-key.pem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk4Rm72FO94F4KWny7JRE\n8YUgAzy0hrjsg3XTnieteK0VGDIDJUyndaCA7HvmLbMRLLkTLg4hcQxAet8SAIM/\niSbo51JtNu3qkDXADON2KnZf5P1Y5THL3jkwFQQjucbytF92C5yqrKL5wBSH2VFn\nnv/WR2Mk/GE8B3dPD6X1TdQWRQpD0wuWzx/R4DCg1zXcwjD2KK65VDZ4BB9dk3HX\n0SrtAiFhgP+kydfwgkhQDhBO3rIb+qAzRXLB2a3KkYKO5DVFaNWt0J0qRkR+ShTs\nYfhHCqRemO4ZXfd2aV0lIEtJwmdOIl19ijVv+XjDeXEpDDHMwcp5pbnNb6YKTnRu\n9wIDAQAB\n-----END PUBLIC KEY-----\n",
    "ecdsa-private-key.pem": "...",
    "ecdsa-public-key.pem": "...",
    "session-id-aes-key": "1b8c0dde7832e78bf9097421179d004af5ed83e34ea0c5c067cafa469a3d2b49", // no forward secrecy
    "session-id-aes-iv": "79706eec5a6c9bf41bf02d1b", // no forward secrecy
  };
  ECDSA.integrityJSONSignature = ECDSA.sign(ECDSA.serverPrivateKey, SHA_256.digest(integrityJSON));

  // at client (main document; encoded)
  RSA.serverPublicKey = spki("rsa-public-key.pem");
  ECDSA.serverPublicKey = spki("ecdsa-public-key.pem");
  Sessions = [];

  // on Connect
  CurrentSession = { isConnect: true, session_timestamp: Date.now() };
  Sessions.push(CurrentSession); // store Connect Session

  //requestId = 0; // TODO: revisit later
  AES_GCM.{ clientOneTimeKey, clientOneTimeIv } = { Random(hashSize), Random(ivSize) };
  NextSession.clientRandom = Random(hashSize);
  NextSession.ECDHE.{ clientPublicKey, clientPrivateKey } = ECDH.generateKeys('prime256v1');
  CurrentSession.ClientIntegrity =
    userAgentHash (= SHA256.digest(navigator.userAgent)) +
    browserHash (= SHA256.digest(JSON.stringify(_traverse(wrapper, window)))) + // TODO: Forward secrecy. timestamp, rotation, etc.
    scriptsHash (= SHA256.digest(document.querySelectorAll('script').join('\0'))) +
    htmlHash (= SHA256.digest(document.querySelector('html').outerHTML))
  }
  CurrentSession.connect_early_secret =
    HKDF-Expand(0, AES_GCM.clientOneTimeKey + AES_GCM.clientOneTimeIv + NextSession.clientRandom + NextSession.ECDHE.clientPublicKey + CurrentSession.ClientIntegrity);
  CurrentSession.connect_salt = HKDF-Expand-Label(connect_early_secret, "salt", "", salt_length)

  // request
  // initial connection
  req.headers = {
    "x-method": "POST",
    "x-scheme": integrityServiceURL.protocol.replace(/:$/, ''),
    "x-authority": integrityServiceURL.host,
    "x-path": integrityServiceURL.pathname + integrityServiceURL.search, // Note: integrityServiceURL.hash is removed
    "content-type": "application/octet-stream",
    //"x-request-id": requestId, // TODO: revisit later
    "x-timestamp": Date.now(),
    "x-digest": "sha256-" + base64(SHA256.digest(req.body)),
    "x-integrity": "x-method,x-scheme,x-authority,x-path,header-list,x-timestamp,x-digest;" +
      "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.connect_salt, headers.join("\n") + "\n")) // TODO: browserHash is inappropriate as it is shared among client browsers with the same version
  }
  req.body =
    RecordType.Connect [1] +
    RSA_OAEP.encrypt(RSA.serverPublicKey,
      AES_GCM.clientOneTimeKey [32] +
      AES_GCM.clientOneTimeIv [12]) [256] +
    AES_GCM.encrypt(aesKey = AES_GCM.clientOneTimeKey, iv = AES_GCM.clientOneTimeIv,
      NextSession.clientRandom [32] +
      NextSession.ECDHE.clientPublicKey [65] +
      CurrentSession.ClientIntegrity (= userAgentHash + browserHash + scriptsHash + htmlHash) [128] +
    )
  // session update (Service Worker)
  req.headers = {
    "x-method": "POST",
    "x-scheme": integrityServiceURL.protocol.replace(/:$/, ''),
    "x-authority": integrityServiceURL.host,
    "x-path": integrityServiceURL.pathname + integrityServiceURL.search, // Note: integrityServiceURL.hash is removed
    "content-type": "application/octet-stream",
    "x-session-id": base64(CurrentSession.SessionID),
    //"x-request-id": requestId, // TODO: revisit later
    "x-timestamp": Date.now(),
    "x-digest": "sha256-" + base64(SHA256.digest(req.body)),
    "x-integrity": "x-method,x-scheme,x-authority,x-path,header-list,x-session-id,x-timestamp,x-digest;" +
      "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.client_write_salt, headers.join("\n") + "\n"))
  }
  req.body =
    RecordType.Update [1] +
    AES_GCM.encrypt(aesKey = CurrentSession.client_write_key, iv = CurrentSession.client_write_iv,
      AES_GCM.clientOneTimeKey [32] +
      AES_GCM.clientOneTimeIv [12] +
      NextSession.clientRandom [32] +
      NextSession.ECDHE.clientPublicKey [65]
    )
  // proxied request (Service Worker)
  req.headers = {
    "x-method": req.method,
    "x-scheme": req.url.protocol.replace(/:$/, ''),
    "x-authority": req.url.host,
    "x-path": req.url.pathname + req.url.search, // Note: req.url.hash is removed
    "x-session-id": base64(CurrentSession.SessionID),
    //"x-request-id": requestId, // TODO: revisit later
    "x-timestamp": Date.now(),
    "x-digest": "sha256-" + base64(SHA256.digest(req.body)), // on POST/PUT
    "x-content-encoding": "aes-256-gcm", // on POST/PUT; no gzip support for request body encryption
    "x-integrity": "x-method,x-scheme,x-authority,x-path,header-list,x-session-id,x-timestamp,x-digest,x-content-encoding;" +
      "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.client_write_salt, headers.join("\n") + "\n"))
  }
  req.body =
    AES_GCM.encrypt(aesKey = CurrentSession.client_write_key, iv = CurrentSession.client_write_iv,
      Body = event.request.body // Note: Body is authenticated by x-digest and x-integrity headers
    )
  // response
  res.headers = {
    "x-scheme": req.url.protocol.replace(/:$/, ''),
    "x-authority": req.url.host,
    "x-path": req.url.pathname + req.url.search, // Note: req.url.hash is removed
    //"x-request-id": requestId, // TODO: revisit later
    "x-request-timestamp": req.headers["x-timestamp"],
    "x-timestamp": Date.now(),
    "x-digest": "sha256-" + base64(SHA256.digest(res.body)),
    "x-content-encoding": "aes-256-gcm"/"gzip+aes-256-gcm"
    "x-integrity": "x-scheme,x-authority,x-path,header-list,x-request-timestamp,x-timestamp,x-digest;" +
      "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.server_write_salt, headers.join("\n") + "\n"))
  }
  res.body =
    AES_GCM.encrypt(CurrentSession.server_write_key, CurrentSession.server_write_iv,
      // no explicit field for body length
      Body = identity/gzip(response.body)
    )

  // at server
  encrypted = req.body;
  CurrentSession = {};

  // Validate headers
  req.headers['content-type'] === 'application/octet-stream';
  req.headers['x-method'] === req.method === 'POST';
  req.headers['x-scheme'] === req.url.protocol.replace(/:$/, ''); // TODO: validate req.url
  req.headers['x-authority'] === req.url.host;
  req.headers['x-path'] === req.url.pathname + req.url.search; // Note: req.url.hash is removed
  req.headers['x-timestamp'] within acceptable_timestamp_range // validate clock of the client
  req.headers['x-digest'] === 'sha256-' + base64(SHA256.digest(req.body));

  if (RecordType.type === RecordType.Connect) {
    // Validate Connect

    // decrypt Connect
    RecordType.type = encrypted.subarray(0, 1) === RecordType.Connect
    [ AES_GCM.clientOneTimeKey, AES_GCM.clientOneTimeIv ] = RSA_OAEP.decrypt(RSA.serverPrivateKey, encrypted.subarray(1, 1 + keySize));
    [ NextSession.clientRandom, NextSession.ECDHE.clientPublicKey, CurrentSession.ClientIntegrity ] =
      AES_GCM.decrypt(AES_GCM.clientOneTimeKey, AES_GCM.clientOneTimeIv, encrypted.subarray(1 + keySize, encrypted.byteLength));

    // save at build time; verify at runtime
    SHA_256.digest(req.header['user-agent']) === userAgentHash;
    keys["scriptsHashHex", "htmlHashHex"] (=:build, ===:runtime) [toHex(scriptsHash), toHex(htmlHash)];
    // Validate browserHash at integrityService
    browserHash === verifiedBrowserHash(req.header['user-agent']) // Note: This is the key to the authentication in the handshake
    // Derive connect_early_secret
    CurrentSession.connect_early_secret =
      HKDF-Extract(0, AES_GCM.clientOneTimeKey + AES_GCM.clientOneTimeIv + NextSession.clientRandom + NextSession.ECDHE.clientPublicKey + CurrentSession.ClientIntegrity);
    // Derive Pseudo-PSK for initial key derivation
    CurrentSession.PSK = HKDF-Expand-Label(CurrentSession.connect_early_secret, "connect", "", Hash.length) // pseudo-PSK
  }
  else if (RecordType.type === RecordType.Update && req.header['x-session-id']) {

    // decrypt SessionID
    CurrentSession.SessionID = Buffer.from(req.header['x-session-id'], 'base64');
    CurrentSession.SessionIDPayload = AES_GCM.decrypt(sessionIdAESKey, sessionIdAESIv, SessionID);
    CurrentSession.[ session_timestamp [4], master_secret [32], transcript_hash = Transcript-Hash(Connect/Update + Accept.header) [32] ] = CurrentSession.SessionIDPayload;

    // Validate session_timestamp
    CurrentSession.session_timestamp within expected lifetime

    // Derive current secrets (not for the next updated ones)
    CurrentSession.client_traffic_secret = HKDF-Expand-Label(CurrentSession.master_secret, "c ap traffic", CurrentSession.transcript_hash, Hash.length)
    //CurrentSession.server_traffic_secret = HKDF-Expand-Label(CurrentSession.master_secret, "s ap traffic", CurrentSession.transcript_hash, Hash.length)
    CurrentSession.session_master_secret = HKDF-Expand-Label(CurrentSession.master_secret, "session", CurrentSession.transcript_hash, Hash.length)

    //CurrentSession.server_write_key = HKDF-Expand-Label(CurrentSession.server_traffic_secret, "key", "", key_length);
    //CurrentSession.server_write_iv = HKDF-Expand-Label(CurrentSession.server_traffic_secret, "iv", "", iv_length);
    //CurrentSession.server_write_salt = HKDF-Expand-Label(CurrentSession.server_traffic_secret, "salt", "", salt_length);

    CurrentSession.client_write_key = HKDF-Expand-Label(CurrentSession.client_traffic_secret, "key", "", key_length);
    CurrentSession.client_write_iv = HKDF-Expand-Label(CurrentSession.client_traffic_secret, "iv", "", iv_length);
    CurrentSession.client_write_salt = HKDF-Expand-Label(CurrentSession.client_traffic_secret, "salt", "", salt_length);

    CurrentSession.PSK = HKDF-Expand-Label(CurrentSession.session_master_secret, "update", "", Hash.length)

    // decrypt Update
    RecordType.type = encrypted.subarray(0, 1) === RecordType.Update
    [ AES_GCM.clientOneTimeKey, AES_GCM.clientOneTimeIv, NextSession.clientRandom, NextSession.ECDHE.clientPublicKey ] =
      AES_GCM.decrypt(CurrentSession.client_write_key, CurrentSession.client_write_iv, encrypted.subarray(1, encrypted.byteLength));

  }

  // Validate x-integrity (delayed)
  // parse headers
  [ headerNamesCSV, 'hmac-sha256-' + headerSignatureBase64 ] = req.headers['x-integrity'].split(';')
  headerNames = headersCSV.split(',');
  headerSignature = atob(headerSignatureBase64);
  headers = headerNames.map((headerName) => headerName + ': ' + req.headers[headerName] + '\n').join('');
  // for Connect
  connect_salt = HKDF-Expand-Label(CurrentSession.connect_early_secret, "salt", "", salt_length)
  salt = connect_salt;
  // for Update
  salt = CurrentSession.client_write_salt;
  // verify hmac
  HMAC_SHA256(salt, headers) === headerSignature;

  // Request has been validated

  // prepare the next session
  NextSession = {};
  NextSession.serverRandom = Random(hashSize);
  NextSession.ECDHE.{ serverPublicKey, serverPrivateKey } = ECDH.generateKeys('prime256v1');
  NextSession.ECDHE.sharedKey = ECDH.deriveKey(NextSession.ECDHE.serverPrivateKey, NextSession.ECDHE.clientPublicKey);

  RFC5869

    HKDF-Extract(salt, IKM) = HMAC-Hash(salt, IKM)

      Inputs:
        salt     optional salt value (a non-secret random value); if not provided, it is set to a string of HashLen zeros.
        IKM      input keying material

    HKDF-Expand(PRK, info, L) -> OKM

      Options:
        Hash     a hash function; HashLen denotes the length of the hash function output in octets

      Inputs:
        PRK      a pseudorandom key of at least HashLen octets (usually, the output from the extract step)
        info     optional context and application specific information (can be a zero-length string)
        L        length of output keying material in octets (<= 255*HashLen)

      Output:
        OKM      output keying material (of L octets)

      The output OKM is calculated as follows:

      N = ceil(L/HashLen)
      T = T(1) | T(2) | T(3) | ... | T(N)
      OKM = first L octets of T

      where:
      T(0) = empty string (zero length)
      T(1) = HMAC-Hash(PRK, T(0) | info | 0x01)
      T(2) = HMAC-Hash(PRK, T(1) | info | 0x02)
      T(3) = HMAC-Hash(PRK, T(2) | info | 0x03)
      ...

  RFC8446

    Transcript-Hash(M1, M2, ... Mn) = Hash(M1 || M2 || ... || Mn)

    HKDF-Expand-Label(Secret, Label, Context, Length) =
      HKDF-Expand(Secret, HkdfLabel, Length)

    Where HkdfLabel is specified as:

    struct {
      uint16 length = Length;
      opaque label<7..255> = "tls13 " + Label;
      opaque context<0..255> = Context;
    } HkdfLabel;

    Derive-Secret(Secret, Label, Messages) =
      HKDF-Expand-Label(Secret, Label,
                        Transcript-Hash(Messages), Hash.length)

    Customized Key Schedule:

               0
               |
               v
     PSK ->   HKDF-Extract = Early Secret
               |
               v
         Derive-Secret(., "derived", "")
               |
               v
     ECDHE -> HKDF-Extract = Handshake Secret
               |
               v
         Derive-Secret(., "derived", "")
               |
               v
     0 ->     HKDF-Extract = Master Secret
               |
               +-----> Derive-Secret(., "c ap traffic",
               |                     Connect/Update + Accept.header)
               |                     = client_traffic_secret
               |
               +-----> Derive-Secret(., "s ap traffic",
               |                     Connect/Update + Accept.header)
               |                     = server_traffic_secret
               |
               +-----> Derive-Secret(., "session",
                                     Connect/Update + Accept.header)
                                     = session_master_secret

    [sender]_write_key = HKDF-Expand-Label(Secret, "key", "", key_length)
    [sender]_write_iv  = HKDF-Expand-Label(Secret, "iv", "", iv_length)
    [sender]_write_salt = HKDF-Expand-Label(Secret, "salt", "", salt_length)

  Accept.header =
    RecordType.Accept [1] +
    AES_GCM.encrypt(AES_GCM.clientOneTimeKey, AES_GCM.clientOneTimeIv,
      NextSession.serverRandom [32] +
      NextSession.ECDHE.serverPublicKey [32]) [80]

  // Derive next secrets
  NextSession.early_secret = HKDF-Extract(0, CurrentSession.PSK);
  NextSession.handshake_secret = HKDF-Extract(Derive-Secret(NextSession.early_secret, "derived", ""), NextSession.ECDHE.sharedKey);
  NextSession.master_secret = HKDF-Extract(Derive-Secret(NextSession.handshake_secret, "derived", ""), 0);

  NextSession.transcript_hash = Transcript-Hash(Connect/Update + Accept.header);

  //NextSession.client_traffic_secret = HKDF-Expand-Label(NextSession.master_secret, "c ap traffic", NextSession.transcript_hash, Hash.length)
  NextSession.server_traffic_secret = HKDF-Expand-Label(NextSession.master_secret, "s ap traffic", NextSession.transcript_hash, Hash.length)
  //NextSession.session_master_secret = HKDF-Expand-Label(NextSession.master_secret, "session", NextSession.transcript_hash, Hash.length)

  NextSession.server_write_key = HKDF-Expand-Label(NextSession.server_traffic_secret, "key", "", key_length);
  NextSession.server_write_iv = HKDF-Expand-Label(NextSession.server_traffic_secret, "iv", "", iv_length);
  NextSession.server_write_salt = HKDF-Expand-Label(NextSession.server_traffic_secret, "salt", "", salt_length);

  //NextSession.client_write_key = HKDF-Expand-Label(NextSession.client_traffic_secret, "key", "", key_length);
  //NextSession.client_write_iv = HKDF-Expand-Label(NextSession.client_traffic_secret, "iv", "", iv_length);
  //NextSession.client_write_salt = HKDF-Expand-Label(NextSession.client_traffic_secret, "salt", "", salt_length);

  NextSession.session_timestamp_raw = Date.now();
  NextSession.session_timestamp = htonl(Uint32Array.of(Math.floor(NextSession.session_timestamp_raw / 1000)));

  SessionIDPayload =
    NextSession.session_timestamp [4] +
    NextSession.master_secret [32] +
    NextSession.transcript_hash [32];

  NextSession.SessionID = AES_GCM.encrypt(sessionIdAESKey, sessionIdAesIv,
    SessionIDPayload) [84];

  Accept.body =
    AES_GCM.encrypt(NextSession.server_write_key, NextSession.server_write_iv,
      NextSession.SessionID [84] +
      ECDSA.integrityJSONSignature [64]
    ) [160]

  Accept [241] = Accept.header [81] + Accept.body [160]

  // response
  res.headers = {
    "x-status": res.status,
    "x-scheme": req.url.protocol.replace(/:$/, ''),
    "x-authority": req.url.host,
    "x-path": req.url.pathname + req.url.search, // Note: req.url.hash is removed
    "content-type": "application/octet-stream",
    //"x-request-id": requestId, // TODO: revisit later
    "x-request-timestamp": req.headers["x-timestamp"],
    "x-timestamp": Date.now(),
    "x-digest": "sha256-" + base64(SHA256.digest(res.body)),
    "x-integrity": "x-status,x-scheme,x-authority,x-path,header-list,x-request-timestamp,x-timestamp,x-digest;" +
      "hmac-sha256-" + base64(HMAC_SHA256(NextSession.server_write_salt, headers.join("\n") + "\n"))
  }
  res.body = Accept

  // at client (main document; encoded)
  session_early_lifetime = 300 * 1000 (msec)
  session_lifetime = 600 * 1000 (msec)
  NextSession = { session_timestamp_raw: Date.now() }; // TODO: number or htonl(Date.now()/1000)?

  // Validate headers
  res.headers['x-status'] === res.status;
  res.headers['content-type'] === 'application/octet-stream';
  res.headers['x-scheme'] === req.url.protocol.replace(/:$/, ''); // TODO: validate req.url
  res.headers['x-authority'] === req.url.host;
  res.headers['x-path'] === req.url.pathname + req.url.search; // Note: req.url.hash is removed
  res.headers['x-request-timestamp'] === req.headers['x-timestamp'];
  res.headers['x-timestamp'] within acceptable_timestamp_range // check timestamp with estimated clock difference
  res.headers['x-digest'] === 'sha256-' + base64(SHA256.digest(res.body));

  // decrypt res.body
  // decrypt Accept.header
  [ NextSession.serverRandom, NextSession.ECDHE.serverPublicKey ] =
    AES_GCM.decrypt(aesKey = AES_GCM.clientOneTimeKey, iv = AES_GCM.clientOneTimeIv, res.body.subarray(1, Accept.header.byteLength));

  // Derive Secrets
  NextSession.ECDHE.sharedKey = ECDH.deriveKey(NextSession.ECDHE.clientPrivateKey, NextSession.ECDHE.serverPublicKey);
  // For Connect
  CurrentSession.PSK = HKDF-Expand-Label(CurrentSession.connect_early_secret, "connect", "", Hash.length) // pseudo-PSK
  // For Update
  CurrentSession.PSK = HKDF-Expand-Label(CurrentSession.session_master_secret, "update", "", Hash.length)

  NextSession.early_secret = HKDF-Extract(0, CurrentSession.PSK);
  NextSession.handshake_secret = HKDF-Extract(Derive-Secret(NextSession.early_secret, "derived", ""), NextSession.ECDHE.sharedKey);
  NextSession.master_secret = HKDF-Extract(Derive-Secret(NextSession.handshake_secret, "derived", ""), 0);

  NextSession.transcript_hash = Transcript-Hash(Connect/Update + Accept.header);

  NextSession.client_traffic_secret = HKDF-Expand-Label(NextSession.master_secret, "c ap traffic", NextSession.transcript_hash, Hash.length)
  NextSession.server_traffic_secret = HKDF-Expand-Label(NextSession.master_secret, "s ap traffic", NextSession.transcript_hash, Hash.length)
  NextSession.session_master_secret = HKDF-Expand-Label(NextSession.master_secret, "session", NextSession.transcript_hash, Hash.length)

  NextSession.server_write_key = HKDF-Expand-Label(NextSession.server_traffic_secret, "key", "", key_length);
  NextSession.server_write_iv = HKDF-Expand-Label(NextSession.server_traffic_secret, "iv", "", iv_length);
  NextSession.server_write_salt = HKDF-Expand-Label(NextSession.server_traffic_secret, "salt", "", salt_length);

  NextSession.client_write_key = HKDF-Expand-Label(NextSession.client_traffic_secret, "key", "", key_length);
  NextSession.client_write_iv = HKDF-Expand-Label(NextSession.client_traffic_secret, "iv", "", iv_length);
  NextSession.client_write_salt = HKDF-Expand-Label(NextSession.client_traffic_secret, "salt", "", salt_length);

  // decrypt Accept.body
  [ NextSession.SessionID, ECDSA.integrityJSONSignature ] =
    AES_GCM.decrypt(aesKey = NextSession.server_write_key, iv = NextSession.server_write_iv, res.body.subarray(Accept.header.byteLength));

  // Validate x-integrity (delayed)
  // parse headers
  [ headerNamesCSV, 'hmac-sha256-' + headerSignatureBase64 ] = res.headers['x-integrity'].split(';')
  headerNames = headerNamesCSV.split(',');
  headerSignature = atob(headerSignatureBase64);
  headers = headerNames.map((headerName) => headerName + ': ' + req.headers[headerName] + '\n').join('') + '\n';
  // verify hmac
  HMAC_SHA256(NextSession.server_write_salt, headers) === headerSignature;

  // Register NextSession (TODO: at this timing?)
  Sessions.push(NextSession);
  CurrentSession = NextSession; // update current session with the next session

  // On Connect
    // verify integrityJSON signature
    integrityJSON = decrypt(fetch('integrity.json', {
      headers: {
        "x-method": "GET",
        "x-scheme": "https",
        "x-authority": req.url.host,
        "x-path": entryPageURL.pathname + "integrity.json",
        "x-session-id": base64(CurrentSession.SessionID),
        //"x-request-id": requestId, // TODO: revisit later
        "x-timestamp": Date.now(),
        "x-integrity": "x-method,x-scheme,x-authority,x-path,header-list,x-session-id,x-timestamp;" +
          "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.client_write_salt, headers.join("\n") + "\n"))
      }
    }));
    ECDSA.verify(ECDSA.serverPublicKey, ECDSA.integrityJSONSignature, integrityJSON) === true;

    // register Service Worker
    navigator.serviceWorker.register('hook.min.js');
    // verify Service Worker script
    fetch('hook.min.js', { integrity: hookMinJsScript.integrity }).ok

    // store integrityJSON
    caches.open(version).put(INTEGRITY_PSEUDO_URL, integrityJSON);

    if (caches.open(version).match(CACHE_STATUS_PSEUDO_URL)) {
      // skip fetching and loading cache-bundle.json
    }
    else {
      // load cache bundle
      cacheBundle = decrypt(fetch('cache-bundle.json', {
        headers: {
          "x-method": "GET",
          "x-scheme": "https",
          "x-authority": req.url.host,
          "x-path": entryPageURL.pathname + "cache-bundle.json",
          "x-session-id": base64(CurrentSession.SessionID),
          //"x-request-id": requestId, // TODO: revisit later
          "x-timestamp": Date.now(),
          "x-integrity": "x-method,x-scheme,x-authority,x-path,header-list,x-session-id,x-timestamp;" +
            "hmac-sha256-" + base64(HMAC_SHA256(CurrentSession.client_write_salt, headers.join("\n") + "\n"))
        }
      }));
      'sha256-' + Base64(SHA_256.digest(cacheBundle)) === integrityJSON['cache-bundle.json']; // verify
      caches.open(version).put(cacheBundle.entries);
    }

    // store Sessions
    postMessage(['plugin', 'Integrity:enqueue', Sessions]); // transfer session information to the Service Worker

    // at Service Worker before loading plugins
    hook.parameters.messageQueues['Integrity:enqueue'] = [ event ]; // enqueue the message event with Sessions

    // at client
    // reload the entry page

    // at Service Worker in processing the entry page
    data = hook.parameters.messageQueues['Integrity:enqueue'][0].data;
    Sessions = data[2];

    // at client (main document; decoded)
    postMessage(['plugin', 'Integrity:enqueue'], [port]); // request Sessions object from the Service Worker
    Sessions = data[2];

    // At Service Worker
    setTimeout(() => {
      for (let session of Sessions) {
        if (session.session_timestamp + session_lifetime < Date.now()) {
          // Discard invalidated Sessions;
        }
      }
      if (Sessions[Sessions.length - 1].session_timestamp + session_early_lifetime < Date.now()) {
        Update Sessions;
      }
    }, sessionCheckInterval)
*/

/* 
  Informational Reference: TLS 1.3 handshake

  // client -> server
  Record.Handshake
    Handshake.ClientHello
      Version.TLS12 [2] - Fixed
      Random [32]
      SessionID [32] - Omittable
      Cipher Suites [17 * 2] - Fixed
        CipherSuite.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
        ...
      Compression Methods null - Fixed
      Extensions
        Extension.GREASE [0] - Fixed
        Extension.server_name [21]
          Server Name Indication extension
            "www.local162.org"
        Extension.extended_master_secret [0] - Unused
        Extension.renegotiation_info [1] - Fixed
        Extension.supported_groups [10] - Fixed
          SupportedGroups
        Extension.ex_point_formats [2] - Fixed
        Extension.SessionTicketTLS [0] - Unused
        Extension.application_layer_protocol_negotiation [14] - Fixed
          ALPNProtocol.h2
          ALPNProtocol.http/1.1
        Extension.status_request [5] - Fixed
          CertificateStatusType.OCSP
        Extension.signature_algorithms [20] - Fixed
          SignatureAlgorithm.ecdsa_secp256r1_sha256
        Extension.signed_certificate_timestamp [0] - Unused
        Extension.key_share [43]
          KeyShareExtension.GREASE - Fixed/Unused
          KeyShareExtension.x25519 - Fixed
            KeyExchangeLength = 32
            KeyExchange [32] ECDHEPublicKey
        Extension.psk_key_exchange_modes [2] - Fixed
          PSKKeyExchangeMode.PSK_with_(EC)DHE_key_establishment(psk_dhe_ke)
        Extension.supported_versions [11] - Fixed
          SupportedVersions.TLS13
        Extension.GREASE - Fixed/Unused
        Extension.pre_shared_key [283] - On session resumption only
          PSK.Identity [224]
          PSK.ObfuscatedTicketAge [4]
          PSK.Binders [49]
        Extension.padding [200] - Unused

  // server -> client
  Record.Handshake
    Handshake.ServerHello
      Version.TLS12 - Fixed
      Random [32]
      SessionID [32] - Just mirrored
      CipherSuite.TLS_AES_256_GCM_SHA384 - Fixed
      CompressionMethod.null - Fixed
      Extensions
        Entension.supported_versions
          SupportedVersion.TLS13 - Fixed
        Extension.key_share
          KeyShareExtension.x25519 - Fixed
            KeyExchangeLength = 32 - Fixed
            KeyExchange [32] ECDHEPublicKey
  Record.ChangeCipherSpec
    ChangeCipherSpec - Fixed
  Record.Handshake.EncryptedExtensions
    ApplicationData
    HandshakeProtocol.EncryptedExtensions (encrypted)
      Extension.application_layer_protocol_negotiation
        ALPNProtocol.h2 - Omittable
  Record.Handshake
    Handshake.Certificate [752] (encrypted)
      Certificates [748]
  Record.CertificateVerify
    Handshake.CertificateVerify (encrypted)
      SignatureAlgorithm.ecdsa_secp256r1_sha256
      Signature [71]
  Record.Handshake
    ApplicationData
    HandshakeProtocol.Finished
      VerifyData [48]

  Record.Handshake
    ApplicationData
    Version.TLS12
    Handshake.NewSessionTicket (encrypted)
      TLSSessionTicket
        Lifetime Hint = 300 sec
        Age Add = number
        Nonce Length = 8
        Nonce = 0000000000000000
        Length = 224
        Ticket [224]

  // client -> server (summary)
  Handshake.ClientHello
    ClientRandom [32]
    //ServerName [21]
    ECDHE.ClientPublicKey [32]
    //ClientCertificate.Certificate (encrypted) - on initial connection only
    //  ClientCertificate.Verify
    ClientIntegrity.hashes (encrypted) - on initial connection only
    ClientIntegrity.verify = ECDSA.sign(ecdhClientKey.privateKey, ClientRandom + ServerName + ECDHE.ClientPublicKey + ClientIntegrity.hashesEncrypted)

    PSK. - on session resumption only
      Identity [224]
      ObfuscatedTicketAge [4]
      Binders [49] = Transcript_Hash(ClientHello)

  // server -> client (summary)
  Handshake.ServerHello
    ServerRandom [32]
    ECDHE.ServerPublicKey [32]
    Certificate [748] (encrypted)
    CertificateVerify.Signature [71] (encrypted)
    Finished.VerifyData [48]
    PSK. (encrypted)
      LifetimeHint = 300 sec [4]
      AgeAdd = number [4]
      Nonce = 0000000000000000 [8]
      Ticket [224]
*/