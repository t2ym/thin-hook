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
    "ea77eba942d10f2d72490b7aa41949c18b33281bbf20b7b7b8ff612c4615e452": true, // hook.min.js
    "7e0fcbf73f8a30d98082c497e4bec73f2b49e5bee70605bb8838aed035763868": true, // demo/context-generator.js
    "680dd69d4f9bce1ec9b5171f322788c5851cfd08141ec9edf2128090bd969f3a": true, // demo/bootstrap.js
    "bf9787b7560b47bd4dcacf84cdfb944e0152e7386590773c4b87dd866483f011": true, // demo/hook-callback.js
    "4fd89b62d9ca6af49d8f619d659fe145beb65c566862abb6d67a0e03f38be494": true, // demo/hook-native-api.js
    "e2e42b1f8c6c518b5878b5bd95d34c0f15e139a1afb6ab6a6642b6e81219d2c5": true, // demo/hook-worker.js
    "b08b09b3cb1ff096c2117b133d38d848a0b486499e93fbd17b2f3ebf05f0c905": true, // demo/browserify-commonjs.js
    "de5407e69386ad2e9aac39e5bc621ba098bd5b5678b0226696a895fc777cad79": true, // demo/webpack-es6-module.js
    "ce8bd5917e14e8e138aecc6a61bc5779668fde1b3f762eb16e609f429d9f9475": true, // demo/webpack-commonjs.js
    "a578e741369d927f693fedc88c75b1a90f1a79465e2bb9774a3f68ffc6e011e6": true, // https://www.local162.org/components/thin-hook/demo/ inline cors
    "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd": true, // https://www.local162.org/components/thin-hook/demo/ inline hooked eval results
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true, // https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true, // (function write2() { console.log("no-hook script tag via document.write"); })()
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true, // (function write4() { console.log("no-hook script tag in div tag via document.write"); })()
    "c135fd6ba3cad41e63985ecca191995bf311abc756c5f574ef5b641e7db56914": true, // (function writeln2() { console.log("no-hook script tag via document.writeln"); })()
    "e233738578fd7e8f2e961fb11885e2c187146314a8e3fc65692633ff89c5d34a": true, // (function writeln4() { console.log("no-hook script tag in div tag via document.writeln"); })()
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