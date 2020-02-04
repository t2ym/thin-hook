/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2018, 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
(function wrapper() {
  if (hook.parameters[Symbol.for('integrity.js')]) {
    return; // skip reinstalling the plugin
  }
  hook.parameters[Symbol.for('integrity.js')] = true;
  /*
    IMPORTANT NOTES:

      * The browser hash

        The browser hash is a SHA256 hash for the JSON object generated via traversing the window
      object of the main document in order to validate the browser.

      * Not for user tracking

        The browser hash is NOT for user tracking, but for validating genuine non-compromised
      browsers released officially by their vendors.
        Therefore, device/user-specific data of the browser are unnecessary NOISES to be eliminated
      from the hash in contrast to browser fingerprints for user tracking.
      
      * But for "duck tests"

        The core concept of the browser hash is to perform "duck tests" on the browser
      so that it can prove itself as one of the officially released versions of the browser
      since compromized browsers are not expected to have the same hash as official versions.

      * Validation of the RSA public key

        When the browser passes the duck tests, i.e., the browser hash encrypted by the RSA
      public key embedded in this script is properly decrypted and validated by the browser 
      validation service (/integrity) at the server, it should also be proven that the
      embedded RSA public key should be the genuine one that the server has sent.

      * Detection of "fake ducks" and MITM attacks

        The browser hash is so designed that any modifications to the scripts for the encrypted
      entry page as well as any crafted window objects of compromized browsers would cause
      significant changes in the hash.
        This means that the entry page without Service Worker and the scripts loaded to the page
      are intact and immune to the MITM attacks.

      * Unique identity for each version of evergreen browsers

        Open-sourced evergreen browsers are evolving so fast that each official version has its
      unique browser hash.  Moreover, official releases of Chrome have some proprietary
      components and features that cannot be included in compromised private Chromium builds.
        As a result, it should be very difficult for crackers to build a compromised browser
      with the very same browser hash as up-to-date official releases.

      * Validation of User-Agent

        Once the browser hash is validated, the user agent (navigator.userAgent) string should be
      reliable, which means the web applications running on the browser should behave as expected.

  */
  // shortcuts to some APIs
  const createHash = hook.utils.createHash;
  const crypto = self.crypto;
  const console = self.console;
  const has = Reflect.has;

  /* utility functions */
  const toBase64 = function toBase64(data) {
    return btoa(String.fromCodePoint(...new Uint8Array(data)));
  }
  const toHex = function toHex(data) {
    let result = '';
    let view = new DataView(data);
    for (let i = 0; i < data.byteLength; i++) {
      result += view.getUint8(i).toString(16).padStart(2, '0');
    }
    return result;
  }
  const parseHex = function parseHex(hex) {
    let result = new Uint8Array(hex.length / 2);
    let view = new DataView(result.buffer);
    for (let i = 0; i < result.length; i++) {
      view.setUint8(i, parseInt(hex.substring(i * 2, i * 2 + 2), 16));
    }
    return result;
  }
  /*
    HKDF implmentation on RFC5869 and RFC8446 with Web Crypto API
  */
  class HKDF {
    static concat(...data) {
      data = data.map(item => {
        if (typeof item === 'string') {
          return HKDF.encoder.encode(item);
        }
        else if ((item instanceof ArrayBuffer) || (item instanceof Array)) {
          return new Uint8Array(item);
        }
        else {
          return item;
        }
      });
      //console.log('concat data', it, JSON.stringify(data.map(item => toHex(item)), null, 2));
      if (data.length === 1) {
        return data[0];
      }
      let bytes = 0;
      for (let i = 0; i < data.length; i++) {
        bytes += data[i].byteLength;
      }
      let uint8Array = new Uint8Array(bytes);
      bytes = 0;
      for (let i = 0; i < data.length; i++) {
        uint8Array.set(data[i], bytes);
        bytes += data[i].byteLength;
      }
      return uint8Array;
    }
    /*
      RFC5869

      HKDF-Extract(salt, IKM) = HMAC-Hash(salt, IKM)

        Inputs:
          salt     optional salt value (a non-secret random value); if not provided, it is set to a string of HashLen zeros.
          IKM      input keying material
    */
    static async Extract(salt, IKM) {
      // HMAC-SHA256(salt, IKM)
      const secret = await crypto.subtle.importKey(
        'raw',
        salt || HKDF.hashLengthZero,
        {
          name: 'HMAC',
          hash: {
            name: HKDF.hashName
          },
        },
        false,
        ['sign']
      );
      return await crypto.subtle.sign(
        'HMAC',
        secret,
        IKM
      );
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
    static async Expand(PRK, info, L) {
      const N = Math.ceil(L / HKDF.hashLength);
      const T = [new Uint8Array(0)]; // T(0)
      const secret = await crypto.subtle.importKey(
        'raw',
        PRK,
        {
          name: 'HMAC',
          hash: {
            name: HKDF.hashName
          },
        },
        false,
        ['sign']
      );
      for (let i = 1; i <= N; i++) {
        T[i] = await crypto.subtle.sign(
          'HMAC',
          secret,
          HKDF.concat(T[i - 1], info, [i])
        );
      }
      return HKDF.concat(...T).buffer.slice(0, L);
    }
    /*
      RFC8446

      Transcript-Hash(M1, M2, ... Mn) = Hash(M1 || M2 || ... || Mn)
    */
    static async Transcript_Hash(...M) {
      return await crypto.subtle.digest(
        {
          name: HKDF.hashName,
        },
        HKDF.concat(...M)
      );
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
    static async Expand_Label(Secret, Label, Context, Length) {
      const length = new Uint8Array(2);
      new DataView(length.buffer).setUint16(0, Length);
      const label = HKDF.concat('tls13 ', Label);
      const contextLen = HKDF.concat(Context).length;
      const HkdfLabel = HKDF.concat(length, Uint8Array.of(label.length), label, Uint8Array.of(contextLen), Context);
      return await HKDF.Expand(Secret, HkdfLabel, Length);
    }
    /*
      RFC8446

      Derive-Secret(Secret, Label, Messages) =
        HKDF-Expand-Label(Secret, Label,
                          Transcript-Hash(Messages), Hash.length)
    */
    static async Derive_Secret(Secret, Label, Messages) {
      return await HKDF.Expand_Label(Secret, Label, await HKDF.Transcript_Hash(Messages), HKDF.hashLength);
    }
  }
  /*
    static constant properties (workaround syntax for static class properties, which are not supported other than Chrome)
  */
  Object.assign(HKDF, {
    hashName: 'SHA-256',
    hashLength: 32,
    hashLengthZero: new Uint8Array(32).buffer,
    encoder: new TextEncoder(),
  });

  const INTEGRITY_PSEUDO_URL = 'https://thin-hook.localhost.localdomain/integrity.json';

  let Sessions = [];
  let CurrentSession;
  let NextSession;
  const SessionTimestamp = {
    session_early_lifetime: 5 * 60 * 1000, // 5 min
    session_lifetime: 10 * 60 * 1000, // 10 min
    session_check_interval: 1 * 60 * 1000, // 1 min
  };
  const TimestampRange = {
    server_diff_min: -5 * 60 * 1000, // -5 min
    server_diff_max:  5 * 60 * 1000, //  5 min
  };
  const getCurrentSession = function getCurrentSession(halt) {
    let _CurrentSession;
    if (Sessions && Array.isArray(Sessions) && Sessions.length > 1) {
      _CurrentSession = Sessions[Sessions.length - 1];
    }
    else {
      if (halt !== false) {
        console.warn('getCurrentSession: no CurrentSession');
      }
      if (halt) {
        halt();
      }
      return null;
    }
    const now = Date.now();
    if (_CurrentSession.session_timestamp + SessionTimestamp.session_lifetime < now) {
      // _CurrentSession expired
      console.error('getCurrentSession: CurrentSession expired');
      if (halt) {
        halt();
      }
      return null;
    }
    return _CurrentSession;
  }

  const SHA256 = {};
  const HMAC = {};
  const RSA = {};
  const ECDSA = {};
  const ECDHE = {};
  const AES_GCM = {};

  let baseURL;
  if (self.constructor.name === 'Window') {
    baseURL = location.href;
  }
  else if (self.constructor.name === 'ServiceWorkerGlobalScope') {
    baseURL = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
  }

  const integrityURL = new URL('integrity', baseURL); // URL for integrity service
  const integrityJSONURL = new URL('integrity.json', baseURL); // URL for integrity.json

  const origin = location.origin;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  SHA256.hashBits = 256; // number of bits in SHA256
  SHA256.hashBytes = SHA256.hashBits / 8; // number of bytes in SHA256
  SHA256.hashName = 'SHA-' + SHA256.hashBits;
  SHA256.prefix = 'sha256-';

  HMAC.prefix = 'hmac-sha256-';
  HMAC.saltLength = SHA256.hashBytes;

  AES_GCM.keyLength = SHA256.hashBytes; // bytes
  AES_GCM.ivLength = 12; // bytes
  AES_GCM.tagLength = 16; // 128 bits
  AES_GCM.tagLengthBits = AES_GCM.tagLength * 8; // 128 bits

  RSA.publicKeyBits = 2048; // number of bits in RSA public key, which must be at least 2048
  RSA.publicKeySize = RSA.publicKeyBits / 8; // number of bytes for RSA-OAEP encrypted data size
  RSA.publicKeyBase64 = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtc+WIxkJPUzjjipEbA1vLe9oZJI1uGifbMC3X4ThNpDWTJIkNIJejOze+5CZ+ehfRMSCvXeGzf85IRRQni1cEpESueJ0ABqOz70WEK8/BbqZKkHGDl9beUoe18nklaHn3xt2/VpxR3H3ze6AL8+f3YhQclALAmZ7moxq7ewlYy9rt+zZjMo2ZgUsTO/vMIeYqpuGRK4oxXUMN5BSctkR4jAOivGgb3MYoUaL9jnDIf0CU80iqqcYTVOkuClMTbq1sB84wGj06YxRAKqM6Q7YDuEUglJAXLqgVpc5VRhxF3ufiLwzoaXBeR3cXJ4FP+vEdsIPEZkqsDeS6u27Vdgl8wIDAQAB';
  ECDSA.publicKeyBase64 = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEr7Ku6X0jwVNqRQLqgy2b8eLswf8je8JdGNp80/0fY03VA/KRGQubPDrypg7rc8kgdrAOHbcxibkDlCMq+f2W2Q==';
  ECDSA.signatureLength = SHA256.hashBytes * 2;
  ECDHE.publicKeyLength = 1 + SHA256.hashBytes * 2;

  const XContentEncoding = {
    AES_256_GCM: 'aes-256-gcm',
    GZIP_AES_256_GCM: 'gzip+aes-256-gcm'
  };

  const RecordType = {
    size: 1, // byte
    Connect: 0x01, // client -> server
    Accept: 0x02, // server -> client
    Update: 0x03, // client -> server
  };

  const serverRandomBytes = 32;
  const clientRandomBytes = 32;
  const SessionIDLength = 84;

  const keys = {};

  const getPublicKeys = async function getPublicKeys(rsaPublicKeyBase64, ecdsaPublicKeyBase64) {
    const rsaPublicKeyBinaryString = atob(rsaPublicKeyBase64);
    const rsaPublicKeyUint8Array = Uint8Array.from(rsaPublicKeyBinaryString, c => c.charCodeAt(0));
    const ecdsaPublicKeyBinaryString = atob(ecdsaPublicKeyBase64);
    const ecdsaPublicKeyUint8Array = Uint8Array.from(ecdsaPublicKeyBinaryString, c => c.charCodeAt(0));
    return [
      await crypto.subtle.importKey(
        'spki',
        rsaPublicKeyUint8Array,
        {
          name: 'RSA-OAEP',
          hash: {
            name: SHA256.hashName
          }
        },
        false,
        ['encrypt']
      ),

      await crypto.subtle.importKey(
        'spki',
        ecdsaPublicKeyUint8Array,
        {
          name: 'ECDSA',
          namedCurve: 'P-256',
        },
        false,
        ['verify']
      ),
    ];
  }

  const constructRequest = async function constructRequest(url, Record, CurrentSession, NextSession) {
    let hmacKey;
    const timestamp = '' + Date.now();
    let isCloning;
    let request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/octet-stream'
      }),
      body: Record.encrypted,
      cache: 'no-cache',
      mode: 'same-origin'
    });
    switch (request.method) {
    case 'POST':
    case 'PUT':
      isCloning = false;
      break;
    default:
      isCloning = true;
      break;
    }
    let init = {};
    let headers = new Headers();
    let headerText = '';
    let headerNames = [];
    for (let header of request.headers.entries()) {
      if (!isCloning) {
        headers.append(header[0], header[1]);
      }
      let name = header[0].toLowerCase();
      headerNames.push(name);
      headerText += name + ': ' + header[1] + '\n';
    }
    if (request.referrer) {
      let referrer = request.referrer;
      switch (referrer) {
        case 'client':
        case 'about:client':
          switch (self.constructor.name) {
            case 'Window':
            case 'ServiceWorkerGlobalScope':
              let rURL = new URL(location.href);
              referrer = rURL.origin + rURL.pathname + rURL.search;
              break;
            default:
              referrer = '';
              break;
          }
          break;
        case 'no-referrer':
          referrer = '';
          break;
        default:
          break;
      }
      if (referrer) {
        headerNames.push('referer');
        headerText += 'referer: ' + referrer + '\n';
        //console.log('integrity.js: request.referrer ' + referrer + ' for URL ' + request.url);
        // append via request.referrer
      }
    }
    headerNames.push('x-method');
    headerText += 'x-method: ' + request.method + '\n';
    headers.append('x-method', request.method);
    const scheme = url.protocol.replace(/:$/, '');
    headerNames.push('x-scheme');
    headerText += 'x-scheme: ' + scheme + '\n';
    headers.append('x-scheme', scheme);
    const authority = url.host;
    headerNames.push('x-authority');
    headerText += 'x-authority: ' + authority + '\n';
    headers.append('x-authority', authority);
    const path = url.pathname + url.search; // Note: url.hash is removed according to HTTP/1.1 and HTTP/2 RFCs
    headerNames.push('x-path');
    headerText += 'x-path: ' + path + '\n';
    headers.append('x-path', path);
    if (CurrentSession.SessionIDBase64) {
      headerNames.push('x-session-id');
      headerText += 'x-session-id: ' + CurrentSession.SessionIDBase64 + '\n';
      headers.append('x-session-id', CurrentSession.SessionIDBase64);
    }
    headerNames.push('x-timestamp');
    headerText += 'x-timestamp: ' + timestamp + '\n';
    headers.append('x-timestamp', timestamp);

    switch (request.method) {
    case 'POST':
    case 'PUT':
      init.body = Record.encrypted;
      //console.log('init.body.byteLength = ' + init.body.byteLength, init.body);
      let digest = SHA256.prefix + toBase64(await crypto.subtle.digest({ name: SHA256.hashName }, init.body));
      headerNames.push('x-digest');
      headerText += 'x-digest: ' + digest + '\n';
      headers.append('x-digest', digest);
      break;
    default:
      break;
    }
    if (!hmacKey) {
      hmacKey = CurrentSession.isConnect ? CurrentSession.connect_salt_key : CurrentSession.client_write_salt_key;
    }
    if (hmacKey) {
      let hmac = HMAC.prefix + toBase64(await crypto.subtle.sign({ name: 'HMAC' }, hmacKey, encoder.encode(headerText)));
      headers.append('x-integrity', headerNames.join(',') + ';' + hmac);
    }
    if (!isCloning) {
      init.method = request.method;
      init.mode = request.mode === 'navigate' ? 'same-origin' : request.mode; // new Request() spits out an error with mode: navigate
      if (request.credentials) {
        init.credentials = request.credentials;
      }
      init.cache = request.cache;
      init.redirect = request.redirect;
      if (request.integrity) {
        init.integrity = request.integrity;
      }
    }
    init.headers = headers;
    init.referrer = request.referrer;
    Record.request = request = new Request(isCloning ? request : request.url, init);
    return request;
  }

  const targetHeaders = [ 'user-agent', 'content-type' ];
  const encryptRequest = async function encryptRequest(request, CurrentSession, event = null) {
    let url = new URL(request.url);
    if (url.origin === origin) {
      const timestamp = '' + Date.now();
      let isCloning;
      switch (request.method) {
      case 'POST':
      case 'PUT':
        isCloning = false;
        break;
      default:
        isCloning = true; // TODO: why headers disappear?
        break;
      }
      let init = {};
      let headers = new Headers();
      let headerText = '';
      let headerNames = [];
      for (let header of request.headers.entries()) {
        if (!isCloning) {
          headers.append(header[0], header[1]);
        }
        let name = header[0].toLowerCase();
        if (targetHeaders.indexOf(name) < 0) {
          continue;
        }
        headerNames.push(name);
        headerText += name + ': ' + header[1] + '\n';
      }
      if (request.referrer) {
        let referrer = request.referrer;
        switch (referrer) {
        case 'client':
        case 'about:client':
          switch (self.constructor.name) {
          case 'Window':
            let rURL = new URL(location.href);
            referrer = rURL.origin + rURL.pathname + rURL.search;
            break;
          case 'ServiceWorkerGlobalScope':
            if (event) {
              const client = await self.clients.get(event.clientId);
              if (client && client.url) {
                let rURL = new URL(client.url);
                referrer = rURL.origin + rURL.pathname + rURL.search;
              }
              else {
                referrer = '';
              }
            }
            else {
              referrer = '';
            }
            break;
          default:
            referrer = '';
            break;
          }
          break;
        case 'no-referrer':
          referrer = '';
          break;
        default:
          break;
        }
        if (referrer) {
          headerNames.push('referer');
          headerText += 'referer: ' + referrer + '\n';
          //console.log('integrity.js: request.referrer ' + referrer + ' for URL ' + request.url);
          // append via request.referrer
        }
      }
      headerNames.push('x-method');
      headerText += 'x-method: ' + request.method + '\n';
      headers.append('x-method', request.method);
      const scheme = url.protocol.replace(/:$/, '');
      headerNames.push('x-scheme');
      headerText += 'x-scheme: ' + scheme + '\n';
      headers.append('x-scheme', scheme);
      const authority = url.host;
      headerNames.push('x-authority');
      headerText += 'x-authority: ' + authority + '\n';
      headers.append('x-authority', authority);
      const path = url.pathname + url.search; // Note: url.hash is removed according to HTTP/1.1 and HTTP/2 RFCs
      headerNames.push('x-path');
      headerText += 'x-path: ' + path + '\n';
      headers.append('x-path', path);
      let key, iv, salt;
      if (CurrentSession &&
        CurrentSession.client_write_key &&
        CurrentSession.client_write_iv &&
        CurrentSession.client_write_salt_key &&
        CurrentSession.SessionIDBase64) {
        key = CurrentSession.client_write_key;
        iv = CurrentSession.client_write_iv;
        salt = CurrentSession.client_write_salt_key;
        headerNames.push('x-session-id');
        headerText += 'x-session-id: ' + CurrentSession.SessionIDBase64 + '\n';
        headers.append('x-session-id', CurrentSession.SessionIDBase64);
      }
      else {
        const base = new URL(baseURL);
        if (url.origin === base.origin && url.pathname === base.pathname) {
          // entry page
          console.log('integrity.js: omitting x-session-id for reloading the entry page ' + request.url);
        }
        else {
          throw new Error('encryptRequest: keys are missing in CurrentSession');
        }
      }
      headerNames.push('x-timestamp');
      headerText += 'x-timestamp: ' + timestamp + '\n';
      headers.append('x-timestamp', timestamp);

      switch (request.method) {
      case 'POST':
      case 'PUT':
        init.body = await request.arrayBuffer();
        if (key && iv) {
          const aesAlg = { name: 'AES-GCM', iv: iv, length: 256, tagLength: 128 };
          const aesKey = await crypto.subtle.importKey('raw', key, aesAlg, false, ['encrypt']);
          init.body = await crypto.subtle.encrypt(aesAlg, aesKey, init.body);
          headerNames.push('x-content-encoding');
          headerText += `x-content-encoding: ${XContentEncoding.AES_256_GCM}\n`;
          headers.append('x-content-encoding', XContentEncoding.AES_256_GCM);
        }
        //console.log('init.body.byteLength = ' + init.body.byteLength, init.body);
        let digest = SHA256.prefix + toBase64(await crypto.subtle.digest({ name: SHA256.hashName }, init.body));
        headerNames.push('x-digest');
        headerText += 'x-digest: ' + digest + '\n';
        headers.append('x-digest', digest);
        break;
      default:
        break;
      }
      if (salt) {
        let hmac = HMAC.prefix + toBase64(await crypto.subtle.sign({ name: 'HMAC' }, salt, encoder.encode(headerText)));
        headers.append('x-integrity', headerNames.join(',') + ';' + hmac);
        //console.log('encryptRequest: request.url ' + request.url + ' x-integrity headers = ', headerText);
      }
      if (!isCloning) {
        init.method = request.method;
        if (request.credentials) {
          init.credentials = request.credentials;
        }
      }
      init.mode = 'same-origin'; // new Request() spits out an error with mode: navigate; non-simple headers disapper on no-cors
      init.headers = headers;
      init.referrer = request.referrer;
      init.redirect = request.redirect;
      init.cache = 'no-cache'; // disk-cached responses are invalid
      request = new Request(isCloning ? request : request.url, init);
    }
    return request;
  }

  const validateAcceptResponseHeaders = async function validateAcceptResponseHeaders(Record, Accept, CurrentSession, NextSession) {
    const request = Record.request;
    const url = new URL(request.url);
    const response = Accept.response;
    const headers = response.headers;
    if (NextSession.server_write_salt_key) {
      // NextSession secrets available
      // verify x-integrity header
      const integrityHeader = headers.get('x-integrity');
      let result = false;
      if (integrityHeader) {
        const parts = integrityHeader.split(';');
        const headerNames = parts[0].split(',');
        if (parts[1] && parts[1].indexOf(HMAC.prefix) === 0) {
          const headerHmac = parts[1].substring(HMAC.prefix.length);
          const headerText = headerNames.map((headerName) => headerName + ': ' + headers.get(headerName) + '\n').join('');
          const headerArrayBuffer = encoder.encode(headerText);
          const signatureBinaryString = atob(headerHmac);
          const signature = Uint8Array.from(signatureBinaryString, c => c.charCodeAt(0)).buffer;
          return await crypto.subtle.verify(
              {
                name: 'HMAC',
              },
              NextSession.server_write_salt_key,
              signature,
              headerArrayBuffer
            );
        }
      }
      return false;
    }
    else {
      // NextSession secrets not available yet
      let digest = SHA256.prefix + toBase64(await crypto.subtle.digest({ name: SHA256.hashName }, Accept.encrypted));
      return response.ok &&
        headers.get('x-status') === '' + response.status &&
        headers.get('content-type') === 'application/octet-stream' &&
        headers.get('x-scheme') === url.protocol.replace(/:$/, '') &&
        headers.get('x-authority') === url.host &&
        headers.get('x-path') === url.pathname + url.search && // Note: url.hash is removed according to HTTP/1.1 and HTTP/2 RFCs
        headers.get('x-request-timestamp') === request.headers.get('x-timestamp') &&
        headers.get('x-digest') === digest;
    }
  }

  const parseAcceptResponse = async function parseAcceptResponse(Record, Accept, CurrentSession, NextSession) {
    const encrypted = Accept.encrypted;
    const headerBytes = RecordType.size + serverRandomBytes + ECDHE.publicKeyLength + AES_GCM.tagLength;
    const bodyBytes = SessionIDLength + ECDSA.signatureLength + AES_GCM.tagLength;
    if (encrypted.byteLength !== headerBytes + bodyBytes) {
      throw new Error('parseAcceptResponse: illegal Accept length ' + encrypted.byteLength + ' expected ' + (headerBytes + bodyBytes));
    }
    Accept.type = (new Uint8Array(encrypted, 0, 1))[0];
    if (Accept.type !== RecordType.Accept) {
      throw new Error('parseAcceptResponse: RecordType.Accept !== Accept.type(' + Accept.type + ')');
    }
    Accept.header = encrypted.slice(0, headerBytes);
    Accept.encryptedHeader = Accept.header.slice(1);
    const aesAlg = { name: 'AES-GCM', iv: Record.AES_GCM.clientOneTimeIv, length: 256, tagLength: 128 };
    const aesKey = await crypto.subtle.importKey('raw', Record.AES_GCM.clientOneTimeKey, aesAlg, false, ['decrypt']);
    Accept.headerPayload = await crypto.subtle.decrypt(aesAlg, aesKey, Accept.encryptedHeader);

    NextSession.serverRandom = Accept.headerPayload.slice(0, serverRandomBytes);
    NextSession.ECDHE.serverPublicKeyRaw =
      Accept.headerPayload.slice(serverRandomBytes, serverRandomBytes + ECDHE.publicKeyLength);

    NextSession.ECDHE.serverPublicKey =
      await crypto.subtle.importKey(
        'raw',
        NextSession.ECDHE.serverPublicKeyRaw,
        {
          name: 'ECDH',
          namedCurve: 'P-256',
        },
        false,
        []
      );
    NextSession.ECDHE.sharedKey =
      await crypto.subtle.deriveBits(
        {
          name: 'ECDH',
          public: NextSession.ECDHE.serverPublicKey,
        },
        NextSession.ECDHE.clientPrivateKey,
        SHA256.hashBits
      );

    CurrentSession.PSK = await HKDF.Expand_Label(
      CurrentSession.isConnect ? CurrentSession.connect_early_secret : CurrentSession.session_master_secret,
      CurrentSession.isConnect ? 'connect' : 'update',
      '',
      SHA256.hashBytes
    );

    NextSession.early_secret = await HKDF.Extract(0, CurrentSession.PSK);
    NextSession.handshake_secret =
      await HKDF.Extract(await HKDF.Derive_Secret(NextSession.early_secret, 'derived', ''), NextSession.ECDHE.sharedKey);
    NextSession.master_secret =
      await HKDF.Extract(await HKDF.Derive_Secret(NextSession.handshake_secret, 'derived', ''), HKDF.hashLengthZero);

    NextSession.transcript_hash = await HKDF.Transcript_Hash(Record.encrypted, Accept.header);

    NextSession.client_traffic_secret =
      await HKDF.Expand_Label(NextSession.master_secret, 'c ap traffic', NextSession.transcript_hash, SHA256.hashBytes);
    NextSession.server_traffic_secret =
      await HKDF.Expand_Label(NextSession.master_secret, 's ap traffic', NextSession.transcript_hash, SHA256.hashBytes);
    NextSession.session_master_secret =
      await HKDF.Expand_Label(NextSession.master_secret, 'session', NextSession.transcript_hash, SHA256.hashBytes);

    NextSession.server_write_key =
      await HKDF.Expand_Label(NextSession.server_traffic_secret, 'key', '', AES_GCM.keyLength);
    NextSession.server_write_iv =
      await HKDF.Expand_Label(NextSession.server_traffic_secret, 'iv', '', AES_GCM.ivLength);
    NextSession.server_write_salt =
      await HKDF.Expand_Label(NextSession.server_traffic_secret, 'salt', '', HMAC.saltLength);
    NextSession.server_write_salt_key =
      await crypto.subtle.importKey(
        'raw',
        NextSession.server_write_salt,
        {
          name: 'HMAC',
          hash: {
            name: SHA256.hashName,
          },
        },
        false,
        ['verify']
      );

    NextSession.client_write_key =
      await HKDF.Expand_Label(NextSession.client_traffic_secret, 'key', '', AES_GCM.keyLength);
    NextSession.client_write_iv =
      await HKDF.Expand_Label(NextSession.client_traffic_secret, 'iv', '', AES_GCM.ivLength);
    NextSession.client_write_salt =
      await HKDF.Expand_Label(NextSession.client_traffic_secret, 'salt', '', HMAC.saltLength);
    NextSession.client_write_salt_key =
      await crypto.subtle.importKey(
        'raw',
        NextSession.client_write_salt,
        {
          name: 'HMAC',
          hash: {
            name: SHA256.hashName,
          },
        },
        false,
        ['sign']
      );

    // decrypt Accept.body
    Accept.encryptedBody = encrypted.slice(headerBytes);
    const bodyAesAlg = { name: 'AES-GCM', iv: NextSession.server_write_iv, length: 256, tagLength: 128 };
    const bodyAesKey = await crypto.subtle.importKey('raw', NextSession.server_write_key, bodyAesAlg, false, ['decrypt']);
    Accept.bodyPayload = await crypto.subtle.decrypt(bodyAesAlg, bodyAesKey, Accept.encryptedBody);

    NextSession.SessionID = Accept.bodyPayload.slice(0, SessionIDLength);
    NextSession.SessionIDBase64 = toBase64(NextSession.SessionID);

    ECDSA.integrityJSONSignature = Accept.bodyPayload.slice(SessionIDLength, SessionIDLength + ECDSA.signatureLength);
  }

  const validateTimestamp = function validateTimestamp(timestamp, requestTimestamp) {
    const t = parseInt(timestamp);
    const rt = parseInt(requestTimestamp);
    return rt + TimestampRange.server_diff_min <= t && t <= rt + TimestampRange.server_diff_max;
  }

  const validateResponseHeaders = async function validateResponseHeaders(request, response, CurrentSession) {
    if (new URL(request.url).origin !== origin) {
      return true; // no validation for cors responses
    }

    const reqHeaders = request.headers;
    const resHeaders = response.headers;
    const url = new URL(request.url);

    let digest;
    if (resHeaders.get('x-digest')) {
      let body = await response.clone().arrayBuffer();
      digest = SHA256.prefix + toBase64(await crypto.subtle.digest({ name: SHA256.hashName }, body));
    }

    /*
    console.log('x-status', resHeaders.get('x-status'), '' + response.status);
    console.log('content-type', resHeaders.get('content-type'), 'application/octet-stream');
    console.log('x-scheme', resHeaders.get('x-scheme'), url.protocol.replace(/:$/, ''));
    console.log('x-authority', resHeaders.get('x-authority'), url.host);
    console.log('x-path', resHeaders.get('x-path'), url.pathname + url.search);
    console.log('x-request-timestamp', resHeaders.get('x-request-timestamp'), resHeaders.get('x-timestamp'));
    console.log('x-digest', resHeaders.get('x-digest'), digest);
    */
    const integrityHeader = resHeaders.get('x-integrity');
    let result;
    if (integrityHeader) {
      result =
        resHeaders.get('x-status') === '' + response.status &&
        resHeaders.get('x-scheme') + ':' === url.protocol &&
        (resHeaders.get('x-authority')
          ? resHeaders.get('x-authority') === url.host && resHeaders.get('x-authority') === reqHeaders.get('x-authority')
          : true) &&
        resHeaders.get('x-path') === url.pathname + url.search && // Note: url.hash is removed according to HTTP/1.1 and HTTP/2 RFCs
        (reqHeaders.get('x-path')
          ? resHeaders.get('x-path') === reqHeaders.get('x-path')
          : true) &&
        (resHeaders.get('x-request-timestamp')
          ? resHeaders.get('x-request-timestamp') === reqHeaders.get('x-timestamp')
          : true) &&
        (reqHeaders.get('x-timestamp') && resHeaders.get('x-timestamp')
          ? validateTimestamp(resHeaders.get('x-timestamp'), reqHeaders.get('x-timestamp'))
          : false) &&
        (digest && resHeaders.get('x-digest') === digest);
    }
    else {
      result = true;
    }
    if (result) {
      result = false;
      if (integrityHeader) {
        if (!(CurrentSession && CurrentSession.server_write_salt_key)) {
          console.error('validateResponseHeaders: CurrentSession.server_write_salt_key is missing');
          return false;
        }
        const parts = integrityHeader.split(';');
        const headerNames = parts[0].split(',');
        if (parts[1] && parts[1].indexOf(HMAC.prefix) === 0) {
          const headerHmac = parts[1].substring(HMAC.prefix.length);
          const headerText = headerNames.map((headerName) => headerName + ': ' + resHeaders.get(headerName) + '\n').join('');
          const headerArrayBuffer = encoder.encode(headerText);
          const signatureBinaryString = atob(headerHmac);
          const signature = Uint8Array.from(signatureBinaryString, c => c.charCodeAt(0)).buffer;
          const salt = CurrentSession.server_write_salt_key;
          result = await crypto.subtle.verify(
              {
                name: 'HMAC',
              },
              salt,
              signature,
              headerArrayBuffer
            );
        }
      }
      else {
        if (request.headers.get('x-session-id')) {
          // no x-integrity response header even when x-session-id is attached in request header
          const base = new URL(baseURL);
          if (url.origin === base.origin && url.pathname === base.pathname) {
            // only the entry page is allowed with an invalid x-session-id and an unencrypted response
            result = true;
            console.warn('integrity.js: unregistering the Service Worker and load the entry page cleanly due to an invalid SessionID for the entry page');
            await Promise.all(((await caches.keys()).map(key => caches.delete(key))));
            await registration.unregister();
            CurrentSession.unregisteringServiceWorker = true;
          }
          else {
            result = false;
          }
        }
        else {
          // no x-session-id request header, thus no x-integrity response header
          result = true;
        }
      }
    }
    return result;
  }

  const decryptResponse = async function decryptResponse(request, response, CurrentSession) {
    const start = Date.now();
    let body;
    if (!await validateResponseHeaders(request, response, CurrentSession)) {
      throw new Error('decryptResponse: validateResponseHeaders failed');
    }
    const xContentEncoding = response.headers.get('x-content-encoding');
    if (xContentEncoding === XContentEncoding.AES_256_GCM || xContentEncoding === XContentEncoding.GZIP_AES_256_GCM) {
      let key, iv;
      if (CurrentSession && CurrentSession.server_write_key && CurrentSession.server_write_iv) {
        key = CurrentSession.server_write_key;
        iv = CurrentSession.server_write_iv;
      }
      else {
        throw new Error('decryptResponse: CurrentSession keys are missing');
      }
      const aesAlg = { name: 'AES-GCM', iv: iv, length: 256, tagLength: 128 };
      const aesKey = await crypto.subtle.importKey('raw', key, aesAlg, false, ['decrypt']);
      //console.log('integrity.js: decryptResponse key imported ' + response.url + ' in ' + (Date.now() - start) + 'ms');
      body = await crypto.subtle.decrypt(aesAlg, aesKey, response._body || await response.arrayBuffer());
      //console.log('integrity.js: decryptResponse decrypted ' + response.url + ' in ' + (Date.now() - start) + 'ms');
      if (xContentEncoding === XContentEncoding.GZIP_AES_256_GCM) {
        body = hook.utils.zlib.inflate(body);
        //console.log('integrity.js: decryptResponse inflated ' + response.url + ' in ' + (Date.now() - start) + 'ms');
      }
      const url = response.url;
      response = new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
      Object.defineProperty(response, 'url', { value: url, writable: false, enumerable: false });
      //console.log('integrity.js: decryptResponse decrypted Response created ' + response.url + ' in ' + (Date.now() - start) + 'ms');
    }
    response._body = body ? body : await response.clone().arrayBuffer();
    return response;
  }

  const secureFetch = async function secureFetch(request, options) {
    let CurrentSession = getCurrentSession();

    if (CurrentSession) {
      if (typeof request === 'string') {
        request = new Request(request, options);
      }
      else if (request instanceof URL) {
        request = new Request(request, options);
      }
      request = await encryptRequest(request, CurrentSession);
      let response = await fetch(request);
      response = await decryptResponse(request, response, CurrentSession);
      return response;
    }
    else {
      console.error('secureFetch: CurrentSession is missing');
      return fetch(request, options);
    }
  }

  if (self.constructor.name === 'Window' && top === window) {
    // main document
    const version = 'version_' + new URL(document.querySelector('script').src).searchParams.get('version');
    const serviceWorkerReady = new URL(document.querySelector('script').src).searchParams.get('service-worker-ready');

    const halt = async function halt() {
      let registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        let result = await registration.unregister();
        console.error('integrity.js: halting: unregistering Service Worker: result = ' + result);
      }
      else {
        console.error('integrity.js: halt');
      }
      await caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))));
      location = halt.location = 'about:blank';
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (typeof hook !== 'function') {
      console.error('integrity.js: hook not defined');
      halt();
    }

    if (typeof hook.parameters !== 'object' || typeof hook.parameters.noHookAuthorization !== 'object') {
      console.error('integrity.js: hook.parameters.noHookAuthorization not defined');
      halt();
    }

    const tasks = hook.parameters.preServiceWorkerTasks = hook.parameters.preServiceWorkerTasks || [];

    navigator.serviceWorker.addEventListener('controllerchange', function (event) {
      console.log('integrity.js: ' + event.type, event);
    });

    let upgrading = false;
    navigator.serviceWorker.ready.then((registration) => {
      //console.log('integrity.js: ' + version + ' registering onupdatefound handler');
      registration.onupdatefound = function (event) {
        let states = [ 'active', 'installing', 'waiting' ].map(state => {
          if (registration[state]) {
            let params = new URL(registration[state].scriptURL).searchParams;
            if (params.has('version')) {
              return 'version_' + params.get('version');
            }
            else {
              return 'inexistent';
            }
          }
          else {
            return undefined;
          }
        }).filter(version => version);
        console.log('integrity.js: ' + version + ' ' + event.type +
          (registration.active ? ' active=' + (new URL(registration.active.scriptURL).searchParams.get('version')) : '') +
          (registration.installing ? ' installing=' + (new URL(registration.installing.scriptURL).searchParams.get('version')) : '') +
          (registration.waiting ? ' waiting=' + (new URL(registration.waiting.scriptURL).searchParams.get('version')) : ''), registration.event);
        let isSuspiciousUpdate = false;
        if (states.includes('inexistent')) {
          console.error('integrity.js: ' + version + ' updatefound for an inexistent version ' + JSON.stringify(states));
          isSuspiciousUpdate = true;
        }
        if (states.length > 1) {
          if (states.length === 2) {
            if (states[0] === states[1]) {
              console.error('integrity.js: ' + version + ' updatefound for the same version ' + states[0]);
              isSuspiciousUpdate = true;
            }
            else {
              if (version === states[1]) {
                console.log('integrity.js: ' + version + ' updatefound for the new version ' + JSON.stringify(states));
              }
              else {
                if (upgrading) {
                  console.log('integrity.js: ' + version + ' updatefound for the new version ' + JSON.stringify(states) + ' during upgrading');
                }
                else {
                  console.error('integrity.js: ' + version + ' updatefound for an unknown version ' + JSON.stringify(states));
                  isSuspiciousUpdate = true;
                }
              }
            }
          }
          else if (states.length === 3) {
            if (states[0] === states[1] || states[0] === states[2]) {
              if (states[0] === states[2] && version === states[1] && serviceWorkerReady === 'false') {
                console.log('integrity.js: ' + version + ' updatefound for the new version ' + JSON.stringify(states));
              }
              else {
                console.error('integrity.js: ' + version + ' updatefound for the same version ' + states[0]);
                isSuspiciousUpdate = true;
              }
            }
          }
        }
        if (isSuspiciousUpdate) {
          halt();
        }
      }
      registration.onstatechange = function (event) {
        console.log('integrity.js: ' + event.type, registration, event.target);
      }
    });

    window.addEventListener('beforeunload', async function (event) {
      let registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        //console.log('integrity.js: ' + version + ' beforeunload: onupdatefound set as null');
        registration.onupdatefound = null;
      }
      return false;
    });

    const SKIP_SERVICE_WORKER_REGISTRATION = 'skipServiceWorkerRegistration';
    const pluginId = 'integrity:enqueue';
    const storeSessionsTimeout = 5000;
    const storeSessions = async function storeSessions(version, scripts) {
      let response = [];
      try {
        let resolved = false;
        response = await Promise.race([
          new Promise(async (resolve, reject) => {
            const message = ['plugin', pluginId, version, 'Sessions'];
            const channel = new MessageChannel();
            if (getCurrentSession(false)) {
              //console.log('integrity.js: store Sessions to the Service Worker for version ' + version);
              message.push(scripts);
              message.push(Sessions);
            }
            channel.port1.addEventListener('message', (event) => {
              if (Array.isArray(event.data) && event.data[0] === 'plugin' && event.data[1] === pluginId) {
                // event.data = [ 'plugin', 'Integrity', 'version_*', 'Sessions', scripts, Sessions ];
                //console.log('integrity.js: storeSessions event.data=', event.data);
                if (event.data[event.data.length - 1] === ':enqueued') {
                  // received an ad-hoc echo + alpha response
                  const CurrentSession = getCurrentSession(false);
                  if (CurrentSession &&
                    event.data.length === 7 && event.data[2] === version &&
                    JSON.stringify(scripts) === JSON.stringify(event.data[4]) &&
                    Array.isArray(event.data[5]) &&
                    event.data[6] === ':enqueued') {
                    if (resolved) {
                      //console.log('integrity.js: store Sessions dropping response from Service Worker for version ' + version);
                    }
                    else {
                      //console.log('integrity.js: store Sessions received ad-hoc message from Service Worker for version ' + version);
                      resolved = true;
                      resolve([version, scripts, ':enqueued']);
                    }
                  }
                  else if (!CurrentSession &&
                    event.data.length === 5 && event.data[2] === version && event.data[3] === 'Sessions' && event.data[4] === ':enqueued') {
                    //console.log('integrity.js: store Sessions dropping response from Service Worker for version ' + version);
                  }
                  else {
                    console.error('integrity.js: store Sessions illegal ad-hoc echo response message from Service Worker for version ' + version);
                    resolved = true;
                    reject();
                  }
                }
                else if (event.data[2] === version) {
                  // version matched
                  //console.log('integrity.js: store Sessions received message from Service Worker for version ' + version);
                  const _scripts = event.data[4];
                  const _Sessions = event.data[5];
                  //console.log('storeSessions: _Sessions = ', _Sessions);
                  resolved = true;
                  resolve([version, _scripts, _Sessions]);
                }
                else {
                  // version not matched
                  resolved = true;
                  resolve([event.data[2]]);
                }
              }
            });
            channel.port1.start();
            let registration = await navigator.serviceWorker.ready;
            if (registration.active) {
              //console.log('integrity.js: posting message to Service Worker', message);
              registration.active.postMessage(message, [ channel.port2 ]);
            }
            else {
              console.error('integrity.js: no active Service Worker');
              reject();
            }
          }),
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (!resolved) {
                console.log('integrity.js: store Sessions message timed out');
              }
              resolved = true;
              resolve([]);
            }, storeSessionsTimeout);
          })
        ]);

      }
      catch (e) {
        console.log('integrity.js: storeSessions() halting', e);
        await halt();
        return [];
      }

      //console.log('integrity.js: storeSessions() done');
      return response;
    }

    const onUpgradeNotifiedTimeout = 1000; // 1000ms
    const onUpgradeReadyTimeout = 60000; // 1min

    const onUpgrade = async function onUpgrade(suspend = false) {
      upgrading = true; // avoid 'updatefound' event handler from halting
      let message = ['plugin', pluginId, version, suspend ? 'SuspendNotified' : 'UpgradeNotified'];
      let registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        //console.log('integrity.js: onUpgrade: posting message to Service Worker', message);
        registration.active.postMessage(message, []);
      }
      else {
        console.log('integrity.js: onUpgrade: no active Service Worker');
        halt();
      }

      let upgradeReadyResolve;
      let upgradeReadyPromise = new Promise((resolve) => {
        upgradeReadyResolve = resolve;
      });
      window.addEventListener(suspend ? 'suspend-ready' : 'upgrade-ready', function onUpgradeReady(event) {
        window.removeEventListener('upgrade-ready', onUpgradeReady);
        upgradeReadyResolve(event.detail ? (event.detail.upgradeURL || event.detail.resumeURL) : '');
        return false;
      });
      const upgradeNotified = await Promise.race([
        new Promise((resolve) => {
          window.addEventListener(suspend ? 'suspend-notified' : 'upgrade-notified', function onUpgradeNotified(event) {
            window.removeEventListener(suspend ? 'suspend-notified' : 'upgrade-notified', onUpgradeNotified);
            resolve(suspend ? 'suspend-notified' : 'upgrade-notified');
            return false;
          });
          window.dispatchEvent(new CustomEvent(suspend ? 'suspend' : 'upgrade', {}));
        }),
        new Promise((resolve) => {
          setTimeout(() => resolve(suspend ? 'suspend-notified-timeout' : 'upgrade-notified-timeout'), onUpgradeNotifiedTimeout);
        })
      ]);
      //console.log('integrity.js: onUpgrade: ' + upgradeNotified);
      let upgradeURL;
      if (upgradeNotified === (suspend ? 'suspend-notified' : 'upgrade-notified')) {
        const upgradeReady = await Promise.race([
          upgradeReadyPromise,
          new Promise((resolve) => {
            setTimeout(() => resolve(suspend ? 'suspend-ready-timeout' : 'upgrade-ready-timeout'), onUpgradeReadyTimeout);
          })
        ]);
        //console.log('integrity.js: onUpgrade: upgradeReady = ' + upgradeReady);
        if (upgradeReady === (suspend ? 'suspend-ready-timeout' : 'upgrade-ready-timeout')) {
          upgradeURL = location.href; // no response from upgrade
        }
        else {
          upgradeURL = upgradeReady || location.href;
        }
      }
      else {
        upgradeURL = location.href; // no upgrade-notified; reload
      }
      message = ['plugin', pluginId, version, (suspend ? 'SuspendReady' : 'UpgradeReady'), upgradeURL ];
      //console.log('integrity.js: onUpgrade: posting message to Service Worker', message);
      registration.active.postMessage(message, []);
    }

    navigator.serviceWorker.addEventListener('message', async function (event) {
      let data = event.data;
      if (Array.isArray(data) && data[0] === 'plugin' && data[1] === pluginId && data[2] === version) {
        switch (data[3]) {
        case 'Sessions':
          const CurrentSession = getCurrentSession();
          if (CurrentSession && keys.scripts) {
            //console.log('integrity.js: integrity:enqueue message from Service Worker to initiate storeSessions for version ' + version);
            await storeSessions(version, keys.scripts);
          }
          else {
            console.warn('integrity.js: integrity:enqueue message from Service Worker but no CurrentSession available for version ' + version);
          }
          break;
        case 'Upgrade':
          //console.log('integrity.js: received Upgrade message from Service Worker');
          await onUpgrade(false);
          break;
        case 'Suspend':
          //console.log('integrity.js: received Suspend message from Service Worker');
          await onUpgrade(true);
          break;
        default:
          break;
        }
      }
      else {
        if (Array.isArray(data)) {
          switch (data[0]) {
          case 'plugin':
          case 'ping':
            break;
          default:
            console.log('integrity.js: Discarding message from Service Worker', data);
            break;
          }
        }
      }
    });

    if (new URL(document.querySelector('script').src).searchParams.get('service-worker-ready') === 'true') {
      // Service Worker is ready
      const getSessions = async function () {
        let result = await storeSessions(version, null);
        if (Array.isArray(result) && result[0] === version && result[1] && typeof result[1] === 'object' && Array.isArray(result[2])) {
          const scripts = result[1];
          const _Sessions = result[2];
          keys.scripts = scripts;
          Sessions = _Sessions;
          //console.log('integrity.js: getSessions received Sessions from Service Worker', Sessions);
        }
        else {
          console.error('integrity.js: getSessions failed to obtain keys from Service Worker');
          halt();
        }
        return SKIP_SERVICE_WORKER_REGISTRATION;
      };
      tasks.push(getSessions());
    }
    else {
      // Service Worker is not ready
      // Initialize the list of asynchronous tasks to be completed before reloading with Service Worker

      let visited = new Map(); // Map objects to their corresponding string position like '.document:object.timeline:object.currentTime:number'
      let startObject = new Function('return this')(); // window object of the main document
      let promises = [];

      /* volatileXXX patterns for excluding device/user-specific data as noises for the browser hash */
      // device/user-specific number data to be excluded as noises
      const volatileNumbers = [
        '.document:object.timeline:object.currentTime:number', // current time
        '.innerWidth:number', // window size
        '.innerHeight:number', // window size
        '.screenX:number', // screen size
        '.screenY:number', // screen size
        '.outerWidth:number', // window size
        '.outerHeight:number', // window size
        '.screenLeft:number', // screen size
        '.screenTop:number', // screen size
        '.performance:object.timeOrigin:number', // current time
        '.visualViewport:object.width:number', // window size
        '.visualViewport:object.height:number', // window size
        '.devicePixelRatio:number', // screen device
        '.navigator:object.connection:object.downlink:number', // network connection
        '.navigator:object.connection:object.downlinkMax:number', // network connection
        '.navigator:object.connection:object.rtt:number', // network connection
        '.navigator:object.maxTouchPoints:number', // touch screen device feature
        '.navigator:object.hardwareConcurrency:number', // CPU device information
        '.navigator:object.deviceMemory:number', // Memory device information
        '.history:object.length:number', // history
      ];
      const volatileNumbersSet = new Set();
      volatileNumbers.forEach(pos => volatileNumbersSet.add(pos));
      // patterns for device/user-specific number data to be excluded as noises
      const volatileNumbersRegExp = new RegExp(
        '^((\.performance:object\.timing:object|' + // current time in performance object
        '\.performance:object\.memory:object|' + // memory information in performance object
        '\.console:object\.memory:object|' + // memory information in console API
        '\.navigator:object\.connection:object|' + // network connection information in navigator object
        '\.screen:object).*|' + // screen device information
        '.*(:object\.offsetWidth:number|' + // window/frame size
        ':object\.scrollWidth:number|' + // window/frame size
        ':object\.scrollHeight:number|' + // window/frame size
        ':object\.clientWidth:number|' + // window/frame size
        ':object\.clientHeight:number))$'); // window/frame size
      // device/user-specific string data to be excluded as noises
      const volatileStrings = [
        '.navigator:object.connection:object.type:string', // network connection type
        '.navigator:object.connection:object.effectiveType:string', // network connection type
        '.navigator:object.language:string', // language preference
        '.navigator:object.userAgent:string', // user agent, which is sent separately as userAgentHash
        '.navigator:object.appVersion:string', // app version, which can be detectable from user agent
        '.navigator:object.platform:string', // platform OS, which can be detectable from user agent
        '.document:object.referrer:string', // navigation history
        '.document:object.lastModified:string', // navigation timing
        '.document:object.URL:string', // document URL
        '.document:object.documentURI:string', // document URI
        '.document:object.visibilityState:string', // document visiblitity state
        '.document:object.webkitVisibilityState:string', // document visiblitity state
      ];
      const volatileStringsSet = new Set();
      volatileStrings.forEach(pos => volatileStringsSet.add(pos));
      const volatileStringsRegExp = new RegExp(
        '^.*(\.baseURI:string)$'); // baseURI
      // device/user-specific object data to be excluded as noises
      const volatileObjectsRegExp = new RegExp(
        '^(\.navigator:object\.languages:object|' + // language preferences
        '\.navigator:object\.serviceWorker:object\.controller:object|' + // Service Worker status
        '\.performance:object\.navigation:object|' + // navigation history
        '\.screen:object\.orientation:object|' + // screen device
        '\.location:object|' + // location object
        '\.localStorage:object|' + // browser storage
        '\.sessionStorage:object).*$'); // browser storage
      const volatileBooleans = [
        '.navigator:object.connection:object.saveData:boolean', // a reduced data usage option
        '.document:object.hidden:boolean', // hidden status of the document
        '.document:object.webkitHidden:boolean', // hidden status of the document
      ];
      const volatileBooleansSet = new Set();
      volatileBooleans.forEach(pos => volatileBooleansSet.add(pos));
      /* End of volatileXXX patterns */

      const prototypeRegExp = /\.prototype:object(\.__proto__:object)*$/;

      const entropy = encoder.encode(wrapper.toString());
      const entropyLength = entropy.byteLength;
      let entropyIndex = 0;
      const getEntropy = (modulo) => entropy[entropyIndex++ % entropyLength] % modulo;
      const ownPropertyDescriptorsMap = new Map(); // Cache Object.getOwnPropertyDescriptors(object), which is a heavy operation
      const getCachedOwnPropertyDescriptors = function getCachedOwnPropertyDescriptors(obj) {
        let descriptors = ownPropertyDescriptorsMap.get(obj);
        if (!descriptors) {
          descriptors = { descriptors: Object.getOwnPropertyDescriptors(obj) };
          descriptors.names = Object.keys(descriptors.descriptors);
          ownPropertyDescriptorsMap.set(obj, descriptors);
        }
        if (descriptors.names.length > 2) {
          descriptors.names.push(descriptors.names.splice(getEntropy(descriptors.names.length), 1)[0]);
          if (getEntropy(2) === 1) {
            descriptors.names.reverse();
          }
        }
        return descriptors;
      }
      const ownPropertySymbolsMap = new Map(); // Cache Object.getOwnPropertySymbols(object), which is a heavy operation
      const getCachedOwnPropertySymbols = function getCachedOwnPropertySymbols(obj) {
        let symbols = ownPropertySymbolsMap.get(obj);
        if (!symbols) {
          symbols = Object.getOwnPropertySymbols(obj);
          ownPropertySymbolsMap.set(obj, symbols);
        }
        return symbols;
      }

      const toStringMap = new Map(); // Cache object.toString(), which can be a heavy operation
      const getCachedToString = function getCachedToString(obj) {
        let toString = toStringMap.get(obj);
        if (!toString) {
          toString = obj.toString();
          toStringMap.set(obj, toString);
        }
        return toString;
      }

      const hashThreshold = 128; // minimal number of characters for string objects to use their hashes as their integrity instead of the strings themselves
      let hashObject;
      let currentHash = wrapper.toString();
      // get a SHA256 hash of a string
      //   The hash is deterministically affected by
      //     - the string itself
      //     - the previous value of getStringHash(string)
      //     - the stack trace
      const getStringHash = function getStringHash(str) {
        currentHash += str + (new Error()).stack;
        hashObject = createHash('sha256');
        hashObject.update(currentHash);
        currentHash = hashObject.digest('hex');
        return currentHash;
      }

      let traverseDone = false; // set as true after the synchronous traversal of the window object is completed
      // recursively traverse the window object to generate the integrity object of the browser
      const _traverse = function _traverse(obj, pos, _descriptor) {
        if (visited.has(obj)) {
          return visited.get(obj);
        }
        let type = typeof obj;
        if (pos) {
          pos += ':' + type;
        }
        switch (obj) {
        case null:
          return obj;
        case undefined:
          return '[undefined]';
        case Function.prototype:
          if (pos !== '.Function:function.prototype:function') {
            return '.Function:function.prototype:function';
          }
        default:
          let ownPropertyDescriptors;
          let ownPropertyNames;
          let ownPropertySymbols;
          let _obj;
          switch (type) {
          case 'object':
            if (obj instanceof Promise) {
              visited.set(obj, pos);
              _obj = Object.create(null);
              let promise = obj.then(resolved => {
                if (!traverseDone) {
                  _obj['<resolved>'] = _traverse(resolved, pos + '.<resolved>');
                  _obj['__proto__'] = _traverse(obj.__proto__, pos + '.__proto__');
                }
              }).catch(rejected => {
                if (!traverseDone) {
                  if (rejected.name === 'TypeError') {
                    Object.setPrototypeOf(_descriptor, null);
                    Object.assign(_obj, _traverse(_descriptor, pos.substring(0, pos.lastIndexOf('.'))));
                  }
                  else {
                    _obj['<rejected>'] = `[${pos + '.<rejected>'}:${rejected.name}:${rejected.message}]`;
                    _obj['__proto__'] = _traverse(obj.__proto__, pos + '.__proto__');
                  }
                }
              });
              if (pos !== '.navigator:object.serviceWorker:object.ready:object') {
                promises.push(promise);
              }
              return _obj;
            }
            visited.set(obj, pos);
            if (volatileObjectsRegExp.test(pos)) {
              return null;
            }
            ({ descriptors: ownPropertyDescriptors, names: ownPropertyNames } = getCachedOwnPropertyDescriptors(obj));
            ownPropertySymbols = getCachedOwnPropertySymbols(obj);
            _obj = Object.create(null);
            for (let property in ownPropertyDescriptors) {
              let descriptor = ownPropertyDescriptors[property];
              try {
                if (descriptor.get && prototypeRegExp.test(pos)) {
                  if (descriptor.__proto__) {
                    descriptor.__proto__ = null;
                  }
                  _obj[property] = _traverse(descriptor, pos + '.' + property);
                }
                else {
                  _obj[property] = _traverse(obj[property], pos + '.' + property, descriptor);
                }
              }
              catch (e) {
                if (e.name === 'TypeError') {
                  if (descriptor.__proto__) {
                    descriptor.__proto__ = null;
                  }
                  _obj[property] = _traverse(descriptor, pos + '.' + property);
                }
                else {
                  _obj[property] = `[${pos + '.' + property}:${e.name}:${e.message}]`;
                }
              }
            }
            if (ownPropertySymbols.length) {
              for (let property of ownPropertySymbols) {
                let descriptor = ownPropertyDescriptors[property];
                let propertyToString = property.toString();
                try {
                  if (descriptor.get && prototypeRegExp.test(pos)) {
                    if (descriptor.__proto__) {
                      descriptor.__proto__ = null;
                    }
                    _obj[propertyToString] = _traverse(descriptor, pos + '.' + propertyToString);
                  }
                  else {
                    _obj[propertyToString] = _traverse(obj[property], pos + '.' + propertyToString, descriptor);
                  }
                }
                catch (e) {
                  if (e.name === 'TypeError') {
                    _obj[propertyToString] = _traverse(descriptor, pos + '.' + propertyToString);
                  }
                  else {
                    _obj[propertyToString] = `[${pos + '.' + propertyToString}:${e.name}:${e.message}]`;
                  }
                }
              }
            }
            let chained = obj.__proto__;
            if (chained) {
              _obj['__proto__'] = _traverse(chained, pos + '.__proto__');
              while (chained && chained !== Object.prototype) {
                let { descriptors: prototypePropertyDescriptors, names: prototypePropertyNames } = getCachedOwnPropertyDescriptors(chained);
                for (let prototypeProperty of prototypePropertyNames) {
                  if (prototypePropertyDescriptors[prototypeProperty].get) {
                    try {
                      if (has(_obj, prototypeProperty)) {
                        continue;
                      }
                      _obj[prototypeProperty] = _traverse(obj[prototypeProperty], pos + '.' + prototypeProperty);
                    }
                    catch (e) {
                      if (e.name === 'TypeError') {
                        let descriptor = prototypePropertyDescriptors[prototypeProperty];
                        if (descriptor.__proto__) {
                          descriptor.__proto__ = null;
                        }
                        _obj[prototypeProperty] = _traverse(descriptor, pos + '.' + prototypeProperty);
                      }
                      else {
                        _obj[prototypeProperty] = `[${pos + '.' + prototypeProperty}:${e.name}:${e.message}]`;
                      }
                    }
                  }
                }
                chained = chained.__proto__;
              }
            }
            return _obj;
          case 'function':
            visited.set(obj, pos);
            ({ descriptors: ownPropertyDescriptors, names: ownPropertyNames } = getCachedOwnPropertyDescriptors(obj));
            ownPropertySymbols = getCachedOwnPropertySymbols(obj);
            _obj = Object.create(null);
            let toString = getCachedToString(obj);
            _obj['toString()'] = toString.length >= hashThreshold ? getStringHash(toString) : toString;
            for (let property of ownPropertyNames) {
              try {
                let descriptor = ownPropertyDescriptors[property];
                if (descriptor.get && (pos.endsWith('.prototype:object') || pos.endsWith(':object.__proto__'))) {
                  if (descriptor.__proto__) {
                    descriptor.__proto__ = null;
                  }
                  _obj[property] = _traverse(descriptor, pos + '.' + property);
                }
                else {
                  _obj[property] = _traverse(obj[property], pos + '.' + property);
                }
              }
              catch (e) {
                _obj[property] = `[${e.name}:${e.message}]`;
              }
            }
            if (ownPropertySymbols.length) {
              for (let property of ownPropertySymbols) {
                let descriptor = ownPropertyDescriptors[property];
                let propertyToString = property.toString();
                try {
                  if (descriptor.get && prototypeRegExp.test(pos)) {
                    if (descriptor.__proto__) {
                      descriptor.__proto__ = null;
                    }
                    _obj[propertyToString] = _traverse(descriptor, pos + '.' + propertyToString);
                  }
                  else {
                    _obj[propertyToString] = _traverse(obj[property], pos + '.' + propertyToString, descriptor);
                  }
                }
                catch (e) {
                  if (e.name === 'TypeError') {
                    _obj[propertyToString] = _traverse(descriptor, pos + '.' + propertyToString);
                  }
                  else {
                    _obj[propertyToString] = `[${pos + '.' + propertyToString}:${e.name}:${e.message}]`;
                  }
                }
              }
            }
            if (obj.__proto__) {
              _obj['__proto__'] = _traverse(obj.__proto__, pos + '.__proto__'); 
            }
            return _obj;
          case 'number':
            switch (obj) {
            case Infinity:
              return '[Infinity]';
            case -Infinity:
              return '[-Infinity]';
            default:
              if (volatileNumbersSet.has(pos)) {
                return 0;
              }
              if (volatileNumbersRegExp.test(pos)) {
                return 0;
              }
              if (Number.isNaN(obj)) {
                return '[NaN]';
              }
              return obj;
            }
          case 'string':
            if (volatileStringsSet.has(pos)) {
              return '';
            }
            if (volatileStringsRegExp.test(pos)) {
              return '';
            }
            if (obj.length >= hashThreshold) {
              return getStringHash(obj);
            }
            return obj;
          case 'boolean':
            if (volatileBooleansSet.has(pos)) {
              return false;
            }
            return obj;
          case 'symbol':
            return obj.toString();
          default:
            return obj.toString();
          }
        }
      }

      // wrapper for _traverse()
      const traverse = function traverse() {
        return _traverse(startObject, '');
      }
      //console.time();
      let browserHashObject = traverse(); // synchronous generation of browser hash object
      //console.timeEnd();
      traverseDone = true;

      let scripts;
      let outerHTML;

      const getBrowserHash = async function getBrowserHash() {
        //await Promise.all(promises);
        //traverseDone = true;
        let browserHashJSON = JSON.stringify(browserHashObject, null, 0);
        //console.log(JSON.stringify(browserHashObject, null, 2));
        browserHashObject = null;
        const browserHashUtf8 = new TextEncoder('utf-8').encode(browserHashJSON);
        browserHashJSON = null;
        const browserHash = await crypto.subtle.digest(SHA256.hashName, browserHashUtf8);
        browserHashUtf8.fill(0);
        return browserHash;
      }

      const generateConnectBody = async function generateConnectBody(Connect, CurrentSession, NextSession) {
        scripts = await Promise.all(Array.prototype.map.call(document.querySelectorAll('script'),
          async (scriptElement) => scriptElement.src 
            ? await (await fetch(scriptElement.src, { mode: 'same-origin', cache: 'only-if-cached' })).text()
            : scriptElement.textContent
        ));
        const userAgentUtf8 = new TextEncoder('utf-8').encode(navigator.userAgent);
        const userAgentHash = await crypto.subtle.digest(SHA256.hashName, userAgentUtf8);
        crypto.getRandomValues(userAgentUtf8);
        const browserHash = await getBrowserHash();
        const scriptsUtf8 = new TextEncoder('utf-8').encode(scripts.join('\0'));
        const scriptsHash = await crypto.subtle.digest(SHA256.hashName, scriptsUtf8); 
        scriptsUtf8.fill(0);
        outerHTML = document.querySelector('html').outerHTML;
        //console.log('outerHTML', outerHTML);
        const htmlUtf8 = new TextEncoder('utf-8').encode(outerHTML);
        const htmlHash = await crypto.subtle.digest(SHA256.hashName, htmlUtf8);
        crypto.getRandomValues(new Uint8Array(htmlUtf8));

        CurrentSession.ClientIntegrity = {
          userAgentHash: userAgentHash,
          browserHash: browserHash,
          scriptsHash: scriptsHash,
          htmlHash: htmlHash,
        };

        Connect.type = Uint8Array.from([RecordType.Connect]);

        const decryptedHeader = HKDF.concat(
          Connect.AES_GCM.clientOneTimeKey,
          Connect.AES_GCM.clientOneTimeIv
        );

        Connect.encryptedHeader =
          await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, RSA.serverPublicKey, decryptedHeader);
        crypto.getRandomValues(new Uint8Array(decryptedHeader));

        const decryptedBody = HKDF.concat(
          NextSession.clientRandom,
          NextSession.ECDHE.clientPublicKey,
          CurrentSession.ClientIntegrity.userAgentHash,
          CurrentSession.ClientIntegrity.browserHash,
          CurrentSession.ClientIntegrity.scriptsHash,
          CurrentSession.ClientIntegrity.htmlHash
        );

        const aesAlg = {
            name: 'AES-GCM',
            iv: Connect.AES_GCM.clientOneTimeIv,
            length: AES_GCM.keyLength,
            tagLength: AES_GCM.tagLengthBits,
          };
        const aesKey =
          await crypto.subtle.importKey(
            'raw',
            Connect.AES_GCM.clientOneTimeKey,
            aesAlg,
            false,
            ['encrypt', 'decrypt']
          );
        Connect.encryptedBody =
          await crypto.subtle.encrypt(aesAlg, aesKey, decryptedBody);
        crypto.getRandomValues(new Uint8Array(decryptedBody));

        Connect.encrypted = HKDF.concat(
          Connect.type,
          Connect.encryptedHeader,
          Connect.encryptedBody
        );
      }

      const sendConnectRequest = async function sendConnectRequest(Connect, Accept, CurrentSession, NextSession) {
        try {
          let request = await constructRequest(integrityURL, Connect, CurrentSession, NextSession);
          let response = Accept.response = await fetch(request, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
          });
          //console.log('integrity.js: Connect.encrypted = ', toBase64(Connect.encrypted));
          if (!response.ok) {
            throw new Error('failed to send Connect: ' + integrityURL.href + ' status: ' + response.status);
          }
          Accept.encrypted = await response.arrayBuffer();
        }
        catch (e) {
          console.error(e);
          return false;
        }
        return true;
      }

      const parseInt = window.parseInt;
      const tagLengthBits = 128;
      const tagLengthBytes = tagLengthBits / 8;
      const verifyIntegrityJSON = async function verifyIntegrityJSON() {
        let integrityJSON;
        try {
          let integrityJSONResponse = await secureFetch(integrityJSONURL, {
            method: 'GET',
            mode: 'same-origin',
            cache: 'no-cache',
          });
          if (!integrityJSONResponse.ok) {
            throw new Error('failed to get integrity.json at ' + integrityJSONURL);
          }
          const integrityJSONArray = await integrityJSONResponse.arrayBuffer();
          integrityJSON = new TextDecoder('utf-8').decode(integrityJSONArray);
          let verified = await crypto.subtle.verify(
            {
              name: 'ECDSA',
              hash: {
                name: SHA256.hashName
              },
            },
            ECDSA.serverPublicKey,
            ECDSA.integrityJSONSignature,
            integrityJSONArray
          );
          //console.log('verify integrityJSON with ECDSA', verified);
          return verified ? integrityJSON : false;
        }
        catch (e) {
          console.error(e);
          return false;
        }
      }

      const waitForDOMContentLoaded = function waitForDOMContentLoaded() {
        return new Promise(resolve => {
          addEventListener('DOMContentLoaded', async function onDOMContentLoaded(event) {
            removeEventListener('DOMContentLoaded', onDOMContentLoaded);
            resolve(event);
          });
        });
      }

      let integrityResolve;
      let integrityReject;
      const integrityReady = hook.parameters.integrityReady = new Promise(function (resolve, reject) {
        integrityResolve = resolve;
        integrityReject = reject;
      });
      const cacheBundleReady = new Promise(function (resolve, reject) {
        hook.parameters.cacheBundleResolve = resolve;
        hook.parameters.cacheBundleReject = reject;
      });

      const storeIntegrityJSON = async function storeIntegrityJSON(version, integrityJSON) {
        const cache = await caches.open(version);
        hook.parameters.integrity = JSON.parse(integrityJSON);
        await cache.put(new Request(INTEGRITY_PSEUDO_URL), new Response(integrityJSON, { headers: { 'Content-Type': 'application/json' } }));
        //console.log('integrity.js: storeIntegrityJSON() done');
      }

      {
        let targetNode = document.querySelector('html');
        let observerOptions = {
          childList: true,
          attributes: false,
          subtree: true,
        };

        const onScriptError = function onScriptError(event) {
          console.error('integrity.js: onScriptError', event);
          halt();
        }

        const observerCallback = function observerCallback(mutationList, observer) {
          mutationList.forEach((mutation) => {
            switch(mutation.type) {
            case 'childList':
              mutation.addedNodes.forEach(node => {
                if (node instanceof HTMLScriptElement) {
                  //console.log('integrity.js: mutation.addedNodes', node);
                  node.addEventListener('error', onScriptError);
                }
              });
              break;
            }
          });
        }
        let observer = new MutationObserver(observerCallback);
        observer.observe(targetNode, observerOptions);
      }

      const verifyServiceWorkerScript = async function verifyServiceWorkerScript(serviceWorkerPath, integrity) {
        if (!integrity) {
          console.error('integrity.js: verifyServiceWorkerScript: integrity is missing ' + integrity);
          halt();
          return false;
        }
        else {
          //console.log('integrity.js: verifyServiceWorkerScript: integrity = ' + integrity + ' path = ' + serviceWorkerPath);
        }
        try {
          let headers = new Headers();
          headers.append('service-worker', 'script');
          let request = new Request(serviceWorkerPath, { headers: headers, mode: 'same-origin', cache: 'only-if-cached', integrity: integrity });
          let serviceWorkerJsResponse = await fetch(request);
          if (serviceWorkerJsResponse && serviceWorkerJsResponse.ok) {
            //console.log('integrity.js: verifyServiceWorkerScript: Service Worker integrity checked via fetch ' + serviceWorkerPath);
          }
          else {
            console.error('integrity.js: verifyServiceWorkerScript: failed to fetch Service Worker via ' + serviceWorkerPath);
            halt();
            return false;
          }
        }
        catch (e) {
          console.error('integrity.js: verifyServiceWorkerScript: error ' + e.name + ' ' + e.message + ' ' + e.stack);
          halt();
          return false;
        }
        return true;
      }

      const registerServiceWorker = async function registerServiceWorker(nextTask) {
        try {
          if ('serviceWorker' in navigator) {
            let hookMinJsScript = Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook[.]min[.]js/))[0];
            let src = new URL(hookMinJsScript.src, window.location.href);
            let serviceWorkerReady = src.searchParams.get('service-worker-ready');
            if (serviceWorkerReady && serviceWorkerReady !== 'true') {
              let serviceWorkerPath = hookMinJsScript.src.replace(/\&service-worker-ready=.*$/, '&service-worker-initiator=' + location.pathname)
              //console.log('integrity.js: calling navigator.serviceWorker.register ' + (Date.now() - performance.timing.navigationStart) + ' ' + serviceWorkerPath);
              let onBeforeUnload = function (event) {
                window.removeEventListener('beforeunload', onBeforeUnload);
                console.error('Service Worker verification failed. Hanging up.');
                if (halt.location !== 'about:blank') {
                  while (true) {} // Hang up as the Service Worker is hacked and can forcefully navigate the page to any URL after unloading
                }
              };
              window.addEventListener('beforeunload', onBeforeUnload);
              let registration = await navigator.serviceWorker.register(
                serviceWorkerPath,
                { scope: src.searchParams.get('sw-root') || window.location.pathname.replace(/\/[^\/]*$/, '/'), updateViaCache: 'all' }
              );
              //console.log('integrity.js: before ready; registration.installing', registration.installing, 'registration.active', registration.active, 'registration.waiting', registration.waiting);
              if (await verifyServiceWorkerScript(serviceWorkerPath, hookMinJsScript.integrity)) {
                window.removeEventListener('beforeunload', onBeforeUnload); // onBeforeUnload is no longer on duty
                registration = await navigator.serviceWorker.ready;
                //console.log('integrity.js: after ready; registration.installing', registration.installing, 'registration.active', registration.active, 'registration.waiting', registration.waiting);
                let serviceWorker = registration ? registration.active : undefined;
                //console.log('integrity.js: registration', registration, Date.now() - performance.timing.navigationStart);
                if (serviceWorker) {
                  if (typeof nextTask === 'function') {
                    tasks.push(nextTask());
                  }
                }
                else {
                  await halt();
                }
              }
            }
          }
          else {
            let fallbackUrl = './index-no-service-worker.html';
            let src = new URL(Array.prototype.filter.call(document.querySelectorAll('script'), s => s.src.match(/\/hook[.]min[.]js/))[0].src, "https://host/");
            let match = src.search.match(/[&\?]fallback-page=([^&\?]*)/);
            if (match) {
              fallbackUrl = match[1];
            }
            window.location = fallbackUrl;
          }
        }
        catch (e) {
          await halt();
        }
        return 'registerServiceWorker()';
      }

      const collectMandatoryNoHookScriptIntegrityFromDOM = function collectMandatoryNoHookScriptIntegrityFromDOM() {
        let scripts = {};
        for (let script of document.querySelectorAll('script')) { // In service-worker-ready=false, all the scripts are mandatory no-hook scripts
          if (script.src && script.integrity) {
            scripts[script.src] = script.integrity;
          }
        }
        return scripts;
      }

      const doConnect = async function doConnect() {
        // Connect
        let tasksBeforeReload;
        try {
          await waitForDOMContentLoaded();
          //await unregisterActiveServiceWorker();

          const Connect = {};
          const Accept = {};

          [ RSA.serverPublicKey, ECDSA.serverPublicKey ] =
            await getPublicKeys(RSA.publicKeyBase64, ECDSA.publicKeyBase64);

          CurrentSession = {
            isConnect: true,
            session_timestamp: Date.now(),
          };
          Sessions.push(CurrentSession); // Sessions = [CurrentSession]

          Connect.AES_GCM = {
            clientOneTimeKey: crypto.getRandomValues(new Uint8Array(AES_GCM.keyLength)),
            clientOneTimeIv: crypto.getRandomValues(new Uint8Array(AES_GCM.ivLength)),
          };

          NextSession = {};
          NextSession.clientRandom = crypto.getRandomValues(new Uint8Array(clientRandomBytes));
          NextSession.ECDHE = {};
          NextSession.ECDHE.clientKeyPair =
            await crypto.subtle.generateKey(
              {
                name: 'ECDH',
                namedCurve: 'P-256'
              },
              false,
              ['deriveBits']
            );
          NextSession.ECDHE.clientPublicKey =
            await crypto.subtle.exportKey('raw', NextSession.ECDHE.clientKeyPair.publicKey);
          NextSession.ECDHE.clientPrivateKey = NextSession.ECDHE.clientKeyPair.privateKey;

          await generateConnectBody(Connect, CurrentSession, NextSession);

          CurrentSession.connect_early_secret = await HKDF.Extract(0, HKDF.concat(
            Connect.AES_GCM.clientOneTimeKey,
            Connect.AES_GCM.clientOneTimeIv,
            NextSession.clientRandom,
            NextSession.ECDHE.clientPublicKey,
            CurrentSession.ClientIntegrity.userAgentHash,
            CurrentSession.ClientIntegrity.browserHash,
            CurrentSession.ClientIntegrity.scriptsHash,
            CurrentSession.ClientIntegrity.htmlHash,
          ));

          // Discard ClientIntegrity
          [ 'userAgentHash', 'browserHash', 'scriptsHash', 'htmlHash' ].forEach((name) => {
            crypto.getRandomValues(new Uint8Array(CurrentSession.ClientIntegrity[name]));
            delete CurrentSession.ClientIntegrity[name];
          });
          delete CurrentSession.ClientIntegrity;

          // Derive Pseudo-PSK for initial key derivation
          CurrentSession.PSK =
            await HKDF.Expand_Label(CurrentSession.connect_early_secret, 'connect', '', SHA256.hashBytes); // pseudo-PSK
          // Derive connect_salt
          CurrentSession.connect_salt =
            await HKDF.Expand_Label(CurrentSession.connect_early_secret, 'salt', '', HMAC.saltLength);
          CurrentSession.connect_salt_key =
            await crypto.subtle.importKey(
              'raw',
              CurrentSession.connect_salt,
              {
                name: 'HMAC',
                hash: {
                  name: SHA256.hashName,
                },
              },
              false,
              ['sign']
            );
          // Discard connect_salt
          crypto.getRandomValues(new Uint8Array(CurrentSession.connect_salt));
          delete CurrentSession.connect_salt;

          if (!await sendConnectRequest(Connect, Accept, CurrentSession, NextSession)) {
            throw new Error('doConnect: sendConnectRequest failed');
          }
          if (!await validateAcceptResponseHeaders(Connect, Accept, CurrentSession, NextSession)) {
            throw new Error('doConnect: validateAcceptResponseHeaders without NextSession.server_write_salt failed');
          }
          await parseAcceptResponse(Connect, Accept, CurrentSession, NextSession);
          if (!await validateAcceptResponseHeaders(Connect, Accept, CurrentSession, NextSession)) {
            throw new Error('doConnect: validateAcceptResponseHeaders with NextSession.server_write_salt failed');
          }

          // proceed to NextSession
          NextSession.session_timestamp = Date.now();
          Sessions.push(NextSession);
          CurrentSession = NextSession;
          NextSession = null;

          let integrityJSON = await verifyIntegrityJSON();
          if (!integrityJSON) {
            throw new Error('integrityJSON verification failed');
          }
          else {
            //console.log('integrityJSON', integrityJSON);
            tasksBeforeReload = async () => {
              await storeIntegrityJSON(version, integrityJSON);
              keys.scripts = collectMandatoryNoHookScriptIntegrityFromDOM();
              await storeSessions(version, keys.scripts);
              integrityResolve({ integrity: hook.parameters.integrity, secureFetch: secureFetch });
              await cacheBundleReady;
              //console.log('integrity.js: cacheBundleReady');
              tasks.push((async () => {
                //console.log('integrity.js: reloading');
                window.location.reload();
                return SKIP_SERVICE_WORKER_REGISTRATION;
              })());
              return 'storeIntegrityJSON();storeSessions();cacheBundleReady()';
            };
          }
        }
        catch (e) {
          integrityReject(e);
          console.error(e);
          // halt
          await halt();
        }
        tasks.push(registerServiceWorker(tasksBeforeReload));
        return 'doConnect()';
      }

      tasks.push(doConnect());
    }
  }
  else if (self.constructor.name === 'ServiceWorkerGlobalScope') {
    let baseURI = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
    let aboutBlankRedirectorUrl = new URL('about-blank-redirector.html', baseURI).href;

    if (typeof version === 'string') {
      // Invoked as a context-generator script
      const halt = async function halt() {
        let allWindowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        for (let client of allWindowClients) {
          client.navigate(aboutBlankRedirectorUrl);
        }
      }

      const pluginId = 'integrity:enqueue';
      let clientVersion;
      let scripts; // integrity values for mandatory no-hook scripts of the entry page
      let waitingForSessions = [];
      let waitingForUpgradeNotified = [];
      let waitingForUpgradeReady = [];
      let notifiedUpgradeReady = [];

      const notifySessionsAvailability = function () {
        let resolve;
        while (resolve = waitingForSessions.shift()) {
          resolve();
        }
      }

      const notifyUpgradeNotified = function (id) {
        for (let i = 0; i < waitingForUpgradeNotified.length; i++) {
          let resolveId = waitingForUpgradeNotified[i];
          if (resolveId.id === id) {
            waitingForUpgradeNotified.splice(i, 1);
            resolveId(id);
            break;
          }
        }
      }

      const notifyUpgradeReady = function (upgradeURL, event) {
        //console.log('integrity.js: notifyUpgradeReady clientID ' + event.source.id + ' upgradeURL ' + upgradeURL);
        notifiedUpgradeReady.push({ upgradeURL, event });
        //console.log('integrity.js: notifyUpgradeReady notifiedUpgradeReady ', notifiedUpgradeReady.map(({upgradeURL, event}) => [event.source.id, upgradeURL]));
      }

      const UPGRADE_READY_CHECK_INTERVAL = 1000;
      setInterval(() => {
        for (let j = 0; j < notifiedUpgradeReady.length; j++) {
          let value = notifiedUpgradeReady[j];
          if (value.done) {
            continue;
          }
          for (let i = 0; i < waitingForUpgradeReady.length; i++) {
            let resolveId = waitingForUpgradeReady[i];
            if (resolveId.id === value.event.source.id) {
              value.done = true;
              waitingForUpgradeReady.splice(i, 1);
              //console.log('integrity.js: resolved ready id = ' + resolveId.id + ' upgradeURL ' + value.upgradeURL);
              //console.log('integrity.js: notifyUpgradeReady notifiedUpgradeReady ', notifiedUpgradeReady.map(({ upgradeURL, event }) => JSON.stringify([event.source.id, upgradeURL])));
              //console.log('integrity.js: waitingForUpgradeReady ', waitingForUpgradeReady.map((resolveId) => resolveId.id));
              resolveId(value);
              break;
            }
          }
        }
        notifiedUpgradeReady = notifiedUpgradeReady.filter((value) => !value.done);
        if (notifiedUpgradeReady.length > 0) {
          //console.log('integrity.js: notifyUpgradeReady notifiedUpgradeReady ', notifiedUpgradeReady.map(({ upgradeURL, event }) => JSON.stringify([event.source.id, upgradeURL])));
          //console.log('integrity.js: waitingForUpgradeReady ', waitingForUpgradeReady.map((resolveId) => resolveId.id));
        }
      }, UPGRADE_READY_CHECK_INTERVAL);

      const integrityMessageHandlerForServiceWorker = function integrityMessageHandlerForServiceWorker (event, isEnqueued = false) {
        if (Array.isArray(event.data) && event.data[0] === 'plugin' && event.data[1] === pluginId) {
          const port = event.ports[0];
          //console.log('integrityMessageHandlerForServiceWorker: message received', event.data);
          clientVersion = event.data[2];
          const type = event.data[3];
          const workerResult = [ 'plugin', pluginId, version ];
          if (clientVersion && clientVersion === version) {
            // version matched
            switch (type) {
            // event.data = [ 'plugin', 'Integrity', 'version_*', 'Sessions', scripts, Sessions ];
            case 'Sessions':
              workerResult.push(type);
              const _scripts = event.data[4];
              const _Sessions = event.data[5];
              if (_scripts && typeof _scripts === 'object' && Array.isArray(_Sessions)) {
                // Transferring Sessions from the main document to the Service Worker
                if (!Sessions || Sessions.length < 2 ||
                  (_Sessions.length > 1 &&
                    Sessions[Sessions.length - 1].session_timestamp < _Sessions[_Sessions.length - 1].session_timestamp)) {
                  //console.log('integrity.js: integrityMessageHandlerForServiceWorker transferring Sessions for version ' + version + ' from the main document to the Service Worker');
                  keys.scripts = scripts = _scripts;
                  Sessions = _Sessions;
                  //console.log('integrityMessageHandlerForServiceWorker: _Sessions = ', _Sessions);
                }
                else {
                  /*
                  console.log('integrity.js: integrityMessageHandlerForServiceWorker discarding Sessions from the main document for version ' + version,
                    'Sessions', Sessions, '_Sessions', _Sessions);
                  */
                }
              }
              else if (Sessions && Sessions.length >= 2 && scripts && typeof scripts === 'object') {
                // Transferring Sessions from the Service Worker to the main document
                //onsole.log('integrity.js: integrityMessageHandlerForServiceWorker transferring Sessions for version ' + version + ' from the Service Worker to the main document');
                workerResult.push(scripts);
                workerResult.push(Sessions);
              }
              else {
                // Neither the main document nor the Service Worker have Sessions
                console.log('integrity.js: integrityMessageHandlerForServiceWorker Neither the main document nor the Service Worker have Sessions for version ' + version);
              }
              if (port) {
                if (isEnqueued) {
                  //console.log('integrityMessageHandlerForServiceWorker: skip postMessage for version ' + version + ' as the message was enqueued');
                }
                else {
                  //console.log('integrityMessageHandlerForServiceWorker: postMessage for version ' + version, workerResult);
                  port.postMessage(workerResult);
                }
              }
              else {
                console.error('integrityMessageHandlerForServiceWorker: no port for version ' + version);
              }
              if (getCurrentSession()) {
                notifySessionsAvailability();
              }
              break;
            // event.data = [ 'plugin', 'Integrity', 'version_*', 'UpgradeNotified' ];
            case 'UpgradeNotified':
              notifyUpgradeNotified(event.source.id);
              break;
            // event.data = [ 'plugin', 'Integrity', 'version_*', 'UpgradeReady', upgradeURL ];
            case 'UpgradeReady':
              notifyUpgradeReady(event.data[4], event);
              break;
            // event.data = [ 'plugin', 'Integrity', 'version_*', 'SuspendNotified' ];
            case 'SuspendNotified':
              notifyUpgradeNotified(event.source.id);
              break;
            // event.data = [ 'plugin', 'Integrity', 'version_*', 'SuspendReady', upgradeURL ];
            case 'SuspendReady':
              notifyUpgradeReady(event.data[4], event);
              break;
            default:
              break;
            }
          }
          else {
            // version not matched
            console.error('integrity.js: integrityMessageHandlerForServiceWorker different versions; Service Worker: ' + version + ' client: ' + clientVersion);
          }
        }
      }

      //console.log('integrity.js: installing integrity message handler to Service Worker');
      self.addEventListener('message', integrityMessageHandlerForServiceWorker);        
      if (hook.parameters && hook.parameters.messageQueues && hook.parameters.messageQueues[pluginId]) {
        const queue = hook.parameters.messageQueues[pluginId];
        if (!(queue.length > 0 && queue[queue.length - 1] === ':dequeued')) {
          if (queue.length > 0) {
            queue.push(':dequeued'); // stop enqueueing
          }
        }
        //console.log('integrity.js: integrity plugin queue', queue);
        // process enqueued messages
        while (queue.length && queue[0] !== ':dequeued') {
          //console.log('integrity.js: integrity plugin dequeueing a message');
          integrityMessageHandlerForServiceWorker(queue.shift(), true);
        }
        // queue === [':dequeued'] at the end
      }
      else {
        //console.log('integrity.js: integrity plugin no queued messages');
        if (!hook.parameters) {
          hook.parameters = {};
        }
        if (!hook.parameters.messageQueues) {
          hook.parameters.messageQueues = {};
        }
        if (!hook.parameters.messageQueues[pluginId]) {
          hook.parameters.messageQueues[pluginId] = [];
          if (getCurrentSession()) {
            hook.parameters.messageQueues[pluginId].push(':dequeued'); // stop further enqueueing
          }
        }
      }

      const verifyMandatoryNoHookScripts = async function () {
        if (scripts) {
          let verified = true;
          let promises = [];
          for (let url in scripts) {
            promises.push((async (url) => {
              let response;
              // check cache existence
              try {
                response = await fetch(new Request(url), { mode: 'same-origin', cache: 'only-if-cached' });
                if (!response.ok) {
                  response = null;
                }
              }
              catch (e) {
                response = null;
              }
              if (!response) {
                //console.log('integrity.js: verifyMandatoryNoHookScripts Skipping non-cached script ' + url);
              }
              // check integrity
              try {
                response = await fetch(new Request(url), { mode: 'same-origin', cache: 'only-if-cached', integrity: scripts[url] });
                if (!response.ok) {
                  response = null;
                }
              }
              catch (e) {
                response = null;
              }
              if (!response) {
                console.error('integrity.js: verifyMandatoryNoHookScripts Integrity check failed for ', url);
                verified = false;
              }
            })(url));
          }
          await Promise.all(promises);
          if (verified) {
            //console.log('integrity.js: verifyMandatoryNoHookScripts Integrity check succeeded for version ' + version, scripts);
          }
          else {
            halt();
          }
        }
        else {
          console.error('integrity.js: verifyMandatoryNoHookScripts No integrity list of mandatory ho-hook scripts');
          halt();
        }
      }

      const cleanupExpiredSessions = function cleanupExpiredSessions() {
        const now = Date.now();
        for (let i = Sessions.length - 1; i >= 0; i--) {
          const Session = Sessions[i];
          if (Session.isConnect) {
            continue; // The initial "Connect" session remains as Sessions[0]
          }
          if (Session.session_timestamp + SessionTimestamp.session_lifetime < now) {
            // Session expired
            Sessions.splice(i, 1); // remove it from Sessions
          }
        }
      }

      const generateUpdateBody = async function generateUpdateBody(Update, CurrentSession, NextSession) {
        Update.type = Uint8Array.from([RecordType.Update]);

        const decryptedBody = HKDF.concat(
          Update.AES_GCM.clientOneTimeKey,
          Update.AES_GCM.clientOneTimeIv,
          NextSession.clientRandom,
          NextSession.ECDHE.clientPublicKey
        );

        const aesAlg = {
            name: 'AES-GCM',
            iv: CurrentSession.client_write_iv,
            length: AES_GCM.keyLength,
            tagLength: AES_GCM.tagLengthBits,
          };
        const aesKey =
          await crypto.subtle.importKey(
            'raw',
            CurrentSession.client_write_key,
            aesAlg,
            false,
            ['encrypt', 'decrypt']
          );

        Update.encryptedBody =
          await crypto.subtle.encrypt(aesAlg, aesKey, decryptedBody);

        Update.encrypted = HKDF.concat(
          Update.type,
          Update.encryptedBody
        );
      }

      const sendUpdateRequest = async function sendUpdateRequest(Update, Accept, CurrentSession, NextSession) {
        try {
          let request = await constructRequest(integrityURL, Update, CurrentSession, NextSession);
          let response = Accept.response = await fetch(request, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
          });
          //console.log('integrity.js: Update.encrypted = ', toBase64(Update.encrypted));
          if (!response.ok) {
            throw new Error('failed to send Update: ' + integrityURL.href + ' status: ' + response.status);
          }
          Accept.encrypted = await response.arrayBuffer();
        }
        catch (e) {
          return e;
        }
        return null;
      }

      const notifyUpgrade = async function (suspend = false) {
        try {
          const CLIENT_INTERVAL = 1000; // ms
          const CLIENT_MAXCOUNT = 10; // times
          const type = suspend ? 'Suspend' : 'Upgrade';
          const initiatorUrl = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator'));
          let iteration = 0;
          let resolved = false;
          let notifyResponses;
          while (!resolved && iteration < CLIENT_MAXCOUNT) {
            clientWindows = (await self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
              .filter(client => {
                let clientUrl = new URL(client.url);
                return clientUrl.origin === initiatorUrl.origin && clientUrl.pathname.startsWith(initiatorUrl.pathname);
              });
            //console.log('integrity.js: notifyUpgrade: clientWindows ' + JSON.stringify(clientWindows.map(c => c.url)));
            const notifiedClients = [];
            if (clientWindows.length > 0) {
              for (let client of clientWindows) {
                let clientUrl = new URL(client.url);
                if (clientUrl.origin === initiatorUrl.origin && clientUrl.pathname.startsWith(initiatorUrl.pathname)) {
                  // entry window
                  notifiedClients.push([client.id, client.url]);
                  client.postMessage(['plugin', pluginId, version, type]);
                  //console.log('integrity.js: notifyUpgrade: sending request id = ', client.id, client.url);
                }
              }
            }
            notifyResponses = await Promise.all(notifiedClients.map(([id, url]) => {
                return Promise.race([
                  new Promise(resolveTimeout => setTimeout(() => {
                    resolveTimeout(null);
                  }, CLIENT_INTERVAL)),
                  new Promise(resolve => {
                    const resolveId = (_id) => resolve(id);
                    resolveId.id = id;
                    waitingForUpgradeNotified.push(resolveId);
                  })
                ])
              })
            );
            notifyResponses = notifyResponses.filter(id => id);
            resolved = notifyResponses.length > 0;
            iteration++;
          }
          return notifyResponses;
        }
        catch (e) {
          console.error(e);
          return false;
        }
      }

      const CHECK_SITE_INTERVAL = 60000; // 1min
      const waitForSiteAvailability = async function waitForSiteAvailability() {
        //console.log('integrity.js: waitForSiteAvailabililty');
        return new Promise(resolve => {
          let intervalId = setInterval(async () => {
            try {
              let response = await fetch(baseURL, { cache: 'no-cache' });
              if (response.ok && response.status === 200) {
                clearInterval(intervalId);
                resolve(true);
              }
            }
            catch (e) {
            }
          }, CHECK_SITE_INTERVAL);
        });
      }

      const UPGRADE_READY_TIMEOUT = 60000; // 1min
      const tryUpgrade = async function tryUpgrade(suspend = false) {
        let notifiedResponses = await notifyUpgrade(suspend);
        //console.log('integrity.js: tryUpgrade: notified = ', notifiedResponses);
        if (!notifiedResponses) {
          await halt();
          return;
        }
        let ready = Promise.all(notifiedResponses.map(id => {
            return Promise.race([
              new Promise(resolveTimeout => setTimeout(() => {
                resolveTimeout([id, null]);
              }, UPGRADE_READY_TIMEOUT)),
              new Promise(resolve => {
                let resolveId = (value) => resolve([id, value]);
                resolveId.id = id;
                waitingForUpgradeReady.push(resolveId);
              }),
            ]);
          }
        ));
        let readyStatusList = await ready;
        //console.log('integrity.js: tryUpgrade: readyStatusList = ', readyStatusList.map(([id, status]) => 'id: ' + id + ' upgradeURL: ' + (status ? status.upgradeURL : 'null')));
        if (suspend) {
          await waitForSiteAvailability();
          await registration.unregister();
          self.removeEventListener('fetch', hook.serviceWorkerHandlers.fetch);
        }
        for (let readyStatus of readyStatusList) {
          if (Array.isArray(readyStatus) && readyStatus[1] && typeof readyStatus[1] === 'object' && typeof readyStatus[1].upgradeURL === 'string' && readyStatus[1].event) {
            let client = readyStatus[1].event.source;
            let upgradeURL = readyStatus[1].upgradeURL;
            client.navigate(upgradeURL);
            //console.log('integrity.js: tryUpgrade: navigating client ' + readyStatus[0] + ' to upgradeURL = ', upgradeURL);
          }
        }
      }

      let suspending = false;
      const doSuspend = async function doSuspend() {
        suspending = true;
        await tryUpgrade(true);
      }

      const doUpdate = async function doUpdate() {
        //console.log('doUpdate');
        // Update
        try {
          const Update = {};
          const Accept = {};

          Update.AES_GCM = {
            clientOneTimeKey: crypto.getRandomValues(new Uint8Array(AES_GCM.keyLength)),
            clientOneTimeIv: crypto.getRandomValues(new Uint8Array(AES_GCM.ivLength)),
          };

          NextSession = {};
          NextSession.clientRandom = crypto.getRandomValues(new Uint8Array(SHA256.hashBytes));
          NextSession.ECDHE = {};
          NextSession.ECDHE.clientKeyPair =
            await crypto.subtle.generateKey(
              {
                name: 'ECDH',
                namedCurve: 'P-256'
              },
              false,
              ['deriveBits']
            );
          NextSession.ECDHE.clientPublicKey =
            await crypto.subtle.exportKey('raw', NextSession.ECDHE.clientKeyPair.publicKey);
          NextSession.ECDHE.clientPrivateKey = NextSession.ECDHE.clientKeyPair.privateKey;

          await generateUpdateBody(Update, CurrentSession, NextSession);

          const error = await sendUpdateRequest(Update, Accept, CurrentSession, NextSession);
          if (error) {
            console.error('doUpdate: failed in sendUpdateRequest; retry later', error);
            return;
          }

          if (!await validateAcceptResponseHeaders(Update, Accept, CurrentSession, NextSession)) {
            throw new Error('doUpdate: validateAcceptResponseHeaders without NextSession.server_write_salt failed');
          }
          await parseAcceptResponse(Update, Accept, CurrentSession, NextSession);
          if (!await validateAcceptResponseHeaders(Update, Accept, CurrentSession, NextSession)) {
            throw new Error('doUpdate: validateAcceptResponseHeaders with NextSession.server_write_salt failed');
          }

          // proceed to NextSession
          NextSession.session_timestamp = Date.now();
          Sessions.push(NextSession);
          CurrentSession = NextSession;
          NextSession = null;
        }
        catch (e) {
          console.error(e);
          // try to upgrade
          //console.log('integrity.js: try to upgrade');
          await tryUpgrade();
        }
        //console.log('doUpdate: Sessions = ', Sessions);
      }

      let updateSessionInProgress = false;
      const updateSessionWhenDesired = async function updateSessionWhenDesired(force = false) {
        if (!updateSessionInProgress) {
          updateSessionInProgress = true;
          //console.log('updateSessionInProgress');
          const now = Date.now();
          let _CurrentSession = getCurrentSession(doSuspend);
          if (!_CurrentSession) {
            return;
          }
          CurrentSession = _CurrentSession;
          if (force || CurrentSession.session_timestamp + SessionTimestamp.session_early_lifetime < now) {
            // forced or CurrentSession early_lifetime expired
            // update CurrentSession;
            await doUpdate();
          }
          updateSessionInProgress = false;
        }
      }

      const startSessionUpdater = async function startSessionUpdater() {
        //console.log('startSessionUpdater: started');
        let intervalId = setInterval(() => {
          if (!Sessions || !Array.isArray(Sessions) || Sessions.length < 1) {
            clearInterval(intervalId);
            console.error('startSessionUpdater: missing Sessions object');
            //halt();
            return;
          }
          cleanupExpiredSessions();
          updateSessionWhenDesired();
        }, SessionTimestamp.session_check_interval);
      }

      const getSessions = async function () {
        try {
          if (getCurrentSession()) {
            return;
          }
          const CLIENT_INTERVAL = 1000; // ms
          const CLIENT_MAXCOUNT = 10; // times
          const initiatorUrl = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator'));
          let resolved = false;
          let iteration = 0;
          while (!resolved && iteration < CLIENT_MAXCOUNT) {
            if (getCurrentSession()) {
              resolved = true;
              break;
            }
            clientWindows = (await self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
              .filter(client => {
                let clientUrl = new URL(client.url);
                return clientUrl.origin === initiatorUrl.origin && clientUrl.pathname.startsWith(initiatorUrl.pathname);
              });
            //console.log('integrity.js: getSessions: clientWindows ' + JSON.stringify(clientWindows.map(c => c.url)));
            if (clientWindows.length > 0) {
              for (let client of clientWindows) {
                if (getCurrentSession()) {
                  resolved = true;
                  break;
                }
                let clientUrl = new URL(client.url);
                if (clientUrl.origin === initiatorUrl.origin && clientUrl.pathname.startsWith(initiatorUrl.pathname)) {
                  // entry window
                  client.postMessage([ 'plugin', pluginId, version, 'Sessions' ]);
                  //console.log('integrity.js: getSessions: sending request id = ', client.id, client.url);
                }
              }
            }
            await Promise.race([
              new Promise(resolve => {
                waitingForSessions.push(resolve);
              }),
              new Promise(resolveTimeout => setTimeout(() => {
                resolveTimeout();
              }, CLIENT_INTERVAL))
            ]);
            iteration++;
          }
        }
        catch (e) {
          console.error(e);
        }
      }
      getSessions().then(async () => {
        await verifyMandatoryNoHookScripts();
        startSessionUpdater();
      });

      const getIntegrityJSON = async function (cache) {
        let integrityJSONResponse;
        try {
          if (!(hook.parameters.integrity && hook.parameters.integrity.version === version)) {
            //console.log('integrity.js: getIntegrityJSON: trying to set hook.parameters.integrity');
            hook.parameters.integrity = undefined;
            let integrityJSONRequest = new Request(INTEGRITY_PSEUDO_URL);
            integrityJSONResponse = await cache.match(integrityJSONRequest);
            if (integrityJSONResponse) {
              //console.log('integrity.js: getIntegrityJSON: cache matched for ' + INTEGRITY_PSEUDO_URL);
              let integrity = JSON.parse(await integrityJSONResponse.text());
              if (integrity.version !== version) {
                console.error('getIntegrityJSON: ' + version + ' incorrect integrity version ' + integrity.version);
                halt();
              }
              else {
                //console.log('integrity.js: getIntegrityJSON: setting hook.parameters.integrity for version ' + integrity.version);
                hook.parameters.integrity = integrity;
              }
            }
            else {
              console.error('getIntegrityJSON: ' + version + ' cache did not match for integrity');
            }
          }
        }
        catch (e) {
          console.log('getIntegrityJSON: ', e);
          halt();
        }
      }

      /*
        Append custom headers onto fetch requests for integrity checking at the server

        POST /url/path/file.txt?abc=def#hash HTTP/1.1
        list-of-headers: values
        ...
        x-timestamp: {Date.now()}
        x-digest: sha256-{base64(SHA256(body))}
        x-integrity: list-of-headers,x-timestamp,x-digest,x-url;hmac-sha256-{base64(HMAC_SHA256("listed headers (name: value) joined with \n"))}

        Notes:
        - Headers are appended only for same-origin requests which are NOT cached
        - x-digest headers are added only for POST and PUT requests
        - x-url is a pseudo-header which is a URL path with params and hashes in a format x-url: /url/path/file.txt?abc=def#hash
        - x-integrity is a list of headers followed by a HMAC-SHA256 of the listed header names and values delimited with newlines
          - The last header ends with a newline as well
          - The secret key is serverRandom
          - Some headers are missing since they are missing in event.request.headers

        TODO:
        - Handle "Referer" header
        - Implement verification at the server side
      */
      hook.parameters.checkRequest = async function (event, response, cache) {
        //console.log('integrity.js: checkRequest received ' + event.request.url + ' from clientId ' + event.clientId);
        let url = new URL(event.request.url);
        if (url.origin === origin && url.pathname === integrityURL.pathname) {
          response = Response.error(); // reject access to integrityURL from clients
        }
        else if (!response) {
          //const start = Date.now();
          if (hook.parameters.integrity) {
            let integrityKey;
            if (url.origin === origin) {
              integrityKey = url.pathname;
            }
            else {
              integrityKey = url.origin + url.pathname;
            }
            if (event.request.method === 'GET' && hook.parameters.integrity[integrityKey]) {
              // static contents via GET method
              if (!(url.origin === origin && url.pathname.endsWith('/hook.min.js'))) { // exclude hook.min.js
                response = await cache.match(event.request, { ignoreSearch: true }); // ignore search paramaters
              }
            }
          }
          if (!response) {
            let CurrentSession = getCurrentSession(halt);
            event.CurrentSession = CurrentSession;
            let request = await encryptRequest(event.request, CurrentSession, event);
            //console.log('integrity.js: checkRequest', request, JSON.stringify(init, null, 2));
            Object.defineProperty(event, 'request', { value: request, writable: true, configurable: true });
            //const end = Date.now();
            //console.log('integrity.js: checkRequest processed ' + request.url + ' in ' + (end - start) + 'ms');
          }
        }
        return response;
      }

      hook.parameters.checkResponse = async function (event, request, response, cache) {
        if (!getCurrentSession()) {
          if (waitingForSessions.length === 0) {
            getSessions();
          }
          console.log('integrity.js: checkResponse: ' + version + ' CurrentSession unavailable for request ' + request.url, event.clientId);
        }
        await getIntegrityJSON(cache);
        let CurrentSession = event.CurrentSession;
        if (request.method === 'GET' && response.ok) {
          if (hook.parameters.integrity) {
            const start = Date.now();
            try {
              response = await decryptResponse(request, response, CurrentSession);
              if (CurrentSession && CurrentSession.unregisteringServiceWorker) {
                return Response.redirect(request.url);
              }
              const arrayBuffer = response._body ? response._body : await response.clone().arrayBuffer();
              const hash = await crypto.subtle.digest(SHA256.hashName, arrayBuffer);
              const digest = toBase64(hash);
              const url = new URL(request.url);
              let key;
              if (url.origin === location.origin) {
                key = url.pathname;
              }
              else {
                key = url.origin + url.pathname;
              }
              let integrity = hook.parameters.integrity[key];
              if (integrity) {
                if (integrity === digest) {
                  //console.log('checkResponse: ' + version + ' integrity matched for ' + key);
                }
                else {
                  console.error('checkResponse: ' + version + ' integrity not matched for ' + key, integrity, digest);
                  halt();
                  throw new Error('checkResponse: ' + version + ' integrity not matched for ' + key);
                }
              }
              else {
                //console.log('checkResponse: ' + version + ' integrity inexistent for ' + key);
              }
            }
            catch (e) {
              console.error('checkResponse: ' + version + ' error in integrity verification for ' + request.url, e);
              halt();
              throw e;
            }
            const end = Date.now();
            //console.log('integrity.js: checkResponse processed ' + request.url + ' in ' + (end - start) + 'ms');
          }
          else {
            //console.log('checkResponse: ' + version + ' integrity unavailable ' + request.url, event.clientId);
          }
        }
        else if (response.ok) {
          if (CurrentSession) {
            try {
              response = await decryptResponse(request, response, CurrentSession);
              //console.log('checkResponse: ' + version + ' decrypted request.method is ' + request.method + ' and response.status is ' + response.status + ' for ' + request.url);
            }
            catch (e) {
              console.log('checkResponse: ' + version + ' decryption failed ' + e + ' request.method is ' + request.method + ' and response.status is ' + response.status + ' for ' + request.url);
              updateSessionWhenDesired(true); // forced and no await
              response = Response.error();
            }
          }
          else {
            //console.log('checkResponse: ' + version + ' request.method is ' + request.method + ' and response.status is ' + response.status + ' for ' + request.url);
            // TODO: error?
            console.error('checkResponse: TODO: error?', request, response);
          }
        }
        else {
          // !response.ok
          //console.log('checkResponse: ' + version + ' request.method is ' + request.method + ' and response.status is ' + response.status + ', response.type is ' + response.type + ' for ' + request.url);
          switch (response.type) {
          case 'opaque': // pass through opaque responses
          case 'opaqueredirect':
            break;
          case 'error': // error as error
            break;
          case 'basic':
            try {
              response = await decryptResponse(request, response, CurrentSession);
              //console.log('checkResponse: ' + version + ' decrypted request.method is ' + request.method + ' and response.status is ' + response.status + ' for ' + request.url);
            }
            catch (e) {
              console.log('checkResponse: ' + version + ' decryption failed ' + e + ' request.method is ' + request.method + ' and response.status is ' + response.status + ' for ' + request.url);
              updateSessionWhenDesired(true); // forced and no await
            }
            response = Response.error();
            break;
          case 'cors': // CORS responses are vulnerable to MITM attacks
          default:
            // other responses are converted to Response.error()
            response = Response.error();
            break;
          }
        }
        return response;
      }

      const entryPageRefresherHtml = function entryPageRefresherHtml(request) {
        return `<html><head><meta http-equiv="refresh" content = "0;URL=${request.url}" ></head><body></body></html>`;
      }
      hook.parameters.decodeEntryHtml = async function (event, request, response, cache, original, decoded) {
        await getIntegrityJSON(cache);
        if (!event.CurrentSession) {
          event.CurrentSession = getCurrentSession();
        }
        if (hook.parameters.integrity && event.CurrentSession) {
          // Decode the original entry HTML
          try {
            switch (response.headers.get('x-content-encoding')) {
            case XContentEncoding.AES_256_GCM:
            case XContentEncoding.GZIP_AES_256_GCM:
              // no cut off in decoded
              break;
            default:
              decoded = hook.serviceWorkerTransformers.decodeHtml(decoder.decode(await (await secureFetch(request.url)).arrayBuffer()));
              break;
            }
            //console.log('decodeEntryHtml: ' + version + ' integrity is available; returning decoded HTML', event.clientId);
            return decoded;
          }
          catch (e) {
            console.error('decodeEntryHtml: ' + version + ' failed to decode; returning entry page refresher HTML', e, event.clientId);
            await registration.unregister();
            return entryPageRefresherHtml(request);
          }
        }
        else {
          if (!hook.parameters.integrity) {
            console.log('decodeEntryHtml: ' + version + ' integrity is not available; returning entry page refresher HTML', event.clientId);
          }
          else {
            console.log('decodeEntryHtml: ' + version + ' CurrentSession is not available; returning entry page refresher HTML', event.clientId);
          }
          await registration.unregister();
          return entryPageRefresherHtml(request);
        }
      }
    }
  }
})();
