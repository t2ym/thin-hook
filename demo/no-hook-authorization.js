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
    "a54837af75d7241250bb51056364b057450692b10916680fdf6d05c633dce99f": true, // hook.min.js
    "0d4c2a093c28157a724d7861a01005e666b36e8467c12faca041e58a0d6fccde": true, // demo/disable-devtools.js
    "7e0fcbf73f8a30d98082c497e4bec73f2b49e5bee70605bb8838aed035763868": true, // demo/context-generator.js
    "ecf7395d2e2b4f71c81e0b974daea73315e8cf4360576275b7d39b315c254303": true, // demo/bootstrap.js
    "38aed411068a1c62ba5495867607d43d65d78ab397fb5cc302ee1f6602687cce": true, // demo/hook-callback.js
    "0979646683bec9b9682d974d549effb61b1fc981ad87dac76d44d0440d87b396": true, // demo/hook-native-api.js
    "5b615aa885a0518466153be6ecb2cfeef1300f181ff60ca91cad964659c92052": true, // demo/hook-worker.js
    "eb0d21fa2443142565dfbd7e17153e3d5b94d4ad04c6d899857b091fa1b67178": true, // demo/cache-bundle.js
    "4ad4ce1e63efcdbe9efbe99452e53b9e07bc764f8d5bfc85f769c1b8c925261d": true, // demo/browserify-commonjs.js
    "e8647e508ab87d1144ca7c5380746217b4787fff22d38a74a440dd46f7bdc308": true, // demo/webpack-es6-module.js
    "bad71d7e092fc1df2c6625ae599c2c50638c392c6d4d659783f685c4318fed68": true, // demo/webpack-commonjs.js
    "c46af0c64c274fa3ce4859243777218fc83c7f57f8176e8e35ab815b8eecb19c": true, // demo/wrap-globals.js
    "a578e741369d927f693fedc88c75b1a90f1a79465e2bb9774a3f68ffc6e011e6": true, // /components/thin-hook/demo/ inline cors
    "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd": true, // /components/thin-hook/demo/ inline hooked eval results
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true, // https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true, // (function write2() { console.log("no-hook script tag via document.write"); })()
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true, // (function write4() { console.log("no-hook script tag in div tag via document.write"); })()
    "c135fd6ba3cad41e63985ecca191995bf311abc756c5f574ef5b641e7db56914": true, // (function writeln2() { console.log("no-hook script tag via document.writeln"); })()
    "e233738578fd7e8f2e961fb11885e2c187146314a8e3fc65692633ff89c5d34a": true, // (function writeln4() { console.log("no-hook script tag in div tag via document.writeln"); })()
    "4f0395d52a8c1c7edaacacade9c31fe18555b79ce963dfb1abaaa34990993374": true, // location = "about:blank";
    "281dbc915940af3b2f3d74837549c15dc17e82c9caceadb5e64cee0f606fb831": true, // demo/script-hashes.js
    "0242016e2887b322ab28b887f03779c63899db232bb036d794a0278db9e54339": true, // demo/content-loader.js
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