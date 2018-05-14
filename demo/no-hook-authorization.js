{
  // Authorization Tickets for no-hook scripts
  // Ticket for this script itself is specified in URL of script tag as
  // hook.min.js?no-hook-authorization={ticket}
  // Note: no-hook-authorization must not exist in learning mode
  let noHookAuthorization = {
    // '*' is for learning mode to detect authorization tickets in 
    //   hook.parameters.noHookAuthorizationPassed,
    //   hook.parameters.noHookAuthorizationFailed
    // JSONs are output to console in the learning mode
    //'*': true,
    "9c379990c626b36ea5123a93826dcebfb30e5f60a6c4a1d68914124d37007b84": true, // hook.min.js
    "66f45ad3f68dc9cf7bfb0a9400858b863956254540574b2ccc8b2162daaf5690": true, // demo/disable-devtools.js
    "7e0fcbf73f8a30d98082c497e4bec73f2b49e5bee70605bb8838aed035763868": true, // demo/context-generator.js
    "406e250e388860b3e78420721fba552ac89b94c30683481b43bf87b5bd2e7994": true, // demo/bootstrap.js
    "541bdf26ff69d9610d41e500069d1949dbcf75265af21702a945c9e393f3095f": true, // demo/hook-callback.js
    "ddeb42ce2835425c714fd9ccff700fc7ef12f3f2315689d2b86887a2240b6e4d": true, // demo/hook-native-api.js
    "e2e42b1f8c6c518b5878b5bd95d34c0f15e139a1afb6ab6a6642b6e81219d2c5": true, // demo/hook-worker.js
    "163ba1450660d02306936ad39a0b5977e042ba3270eca749fc30d98170e9be03": true, // demo/cache-bundle.js
    "ff8eabd87f1b4f06708136c4eac7d8370cd6daec34411be6c590b23631c83a98": true, // demo/browserify-commonjs.js
    "de5407e69386ad2e9aac39e5bc621ba098bd5b5678b0226696a895fc777cad79": true, // demo/webpack-es6-module.js
    "3d4c065d49b8479c8a983ba7cb642f79a8e3c1dad5295269b757a924077b0445": true, // demo/webpack-commonjs.js
    "a578e741369d927f693fedc88c75b1a90f1a79465e2bb9774a3f68ffc6e011e6": true, // /components/thin-hook/demo/ inline cors
    "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd": true, // /components/thin-hook/demo/ inline hooked eval results
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true, // https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true, // (function write2() { console.log("no-hook script tag via document.write"); })()
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true, // (function write4() { console.log("no-hook script tag in div tag via document.write"); })()
    "c135fd6ba3cad41e63985ecca191995bf311abc756c5f574ef5b641e7db56914": true, // (function writeln2() { console.log("no-hook script tag via document.writeln"); })()
    "e233738578fd7e8f2e961fb11885e2c187146314a8e3fc65692633ff89c5d34a": true, // (function writeln4() { console.log("no-hook script tag in div tag via document.writeln"); })()
    "4f0395d52a8c1c7edaacacade9c31fe18555b79ce963dfb1abaaa34990993374": true, // location = "about:blank";
  };
  let hidden;
  const passcode = 'XX02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a';
  if (typeof self === 'object' && self.constructor.name === 'ServiceWorkerGlobalScope') {
    // Service Worker
    let reconfigure = false;
    if (hook.parameters.noHookAuthorization) {
      if (Object.getOwnPropertyDescriptor(hook.parameters, 'noHookAuthorization').configurable) {
        reconfigure = true;
      }
    }
    else {
      reconfigure = true;
    }
    if (reconfigure) {
      Object.defineProperty(hook.parameters, 'noHookAuthorization', {
        configurable: false,
        enumerable: true,
        get() {
          return hidden;
        },
        set(value) {
          if (value && value.passcode === passcode) {
            delete value.passcode;
            Object.freeze(value);
            hidden = value;
          }
        }
      });
    }
    noHookAuthorization.passcode = passcode;
    hook.parameters.noHookAuthorization = noHookAuthorization;
  }
  else {
    // Browser Document
    Object.defineProperty(hook.parameters, 'noHookAuthorization', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Object.freeze(noHookAuthorization)
    });
  }
  if (!noHookAuthorization['*']) {
    Object.seal(hook.parameters.noHookAuthorizationPassed);
  }
}
{
  hook.parameters.sourceMap = [
    url => location.origin === url.origin && url.pathname.match(/^\/components\/thin-hook\/demo\//)
  ];
  hook.parameters.hookWorker = 'hook-worker.js?no-hook=true';
}