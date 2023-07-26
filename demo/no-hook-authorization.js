if (hook.parameters[Symbol.for('no-hook-authorization.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('no-hook-authorization.js')] = true;
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
    "cc9b848173d4252b1dbe5fcca8c8e6a079be0bea4bc4e2e4a2253e2d7b09ca60": true, // hook.min.js
    "a81209228209941097ac41c5bda3bc1cd64375e69b7c8113aff68c2fe6729ff2": true, // demo/disable-devtools.js
    "4374ae1f28cec2b969ab488895a4266244d65e28e1f82728fd2cd39130fe0d9e": true, // demo/context-generator.js
    "dca933fb4ade771ca8ed30823b52e7e36762522711ebf1d87eb9905c21b840ea": true, // demo/bootstrap.js
    "00d44156f4bc361a4ef8de575a2298e94d0f11053a093a5b473aa75306eefb09": true, // demo/hook-callback.js
    "0979646683bec9b9682d974d549effb61b1fc981ad87dac76d44d0440d87b396": true, // demo/hook-native-api.js
    "5b615aa885a0518466153be6ecb2cfeef1300f181ff60ca91cad964659c92052": true, // demo/hook-worker.js
    "478aa0846542d93ec7ba38ae2cf1794849220539393895c9d36aba2c8e2d8386": true, // demo/cache-bundle.js
    "7f852cb0b61db5a2b58920b03dd8626c3f67331ef9a7a8cdbe04d77dbeb3fdfc": true, // demo/browserify-commonjs.js
    "e992640bf3759389183b8cb9f06e289f97d6390ebd10515eef7f670366db9291": true, // demo/webpack-es6-module.js
    "b1e27e7e3e5b9481a9ef12f22c11ac72940f07bd9a49e7b4b18cd4a701627557": true, // demo/webpack-commonjs.js
    "be62ecde142b4cdf07dfa764b264215b0d52ab6209d666fe0f3bc1832f021cd0": true, // demo/rollup-es6-module.js
    "2d94340807fac358e8e0ae20296e1795afacab72d8af37c40a495ed7147c5504": true, // demo/rollup-module1.js
    "c46af0c64c274fa3ce4859243777218fc83c7f57f8176e8e35ab815b8eecb19c": true, // demo/wrap-globals.js
    "a578e741369d927f693fedc88c75b1a90f1a79465e2bb9774a3f68ffc6e011e6": true, // /components/thin-hook/demo/ inline cors
    "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd": true, // /components/thin-hook/demo/ inline hooked eval results
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true, // https://cdnjs.cloudflare.com/ajax/libs/vis/4.18.1/vis.min.js
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true, // (function write2() { console.log("no-hook script tag via document.write"); })()
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true, // (function write4() { console.log("no-hook script tag in div tag via document.write"); })()
    "c135fd6ba3cad41e63985ecca191995bf311abc756c5f574ef5b641e7db56914": true, // (function writeln2() { console.log("no-hook script tag via document.writeln"); })()
    "e233738578fd7e8f2e961fb11885e2c187146314a8e3fc65692633ff89c5d34a": true, // (function writeln4() { console.log("no-hook script tag in div tag via document.writeln"); })()
    "4f0395d52a8c1c7edaacacade9c31fe18555b79ce963dfb1abaaa34990993374": true, // location = "about:blank";
    "63f87adc3e346752a761c840f9aedf26ee6083e73c173ffacd125ba47f72e40b": true, // demo/integrity.js
    "ba07654d1c24a271ba0fa7ee5c55cd60c02133b0e53cb6bb6e634da473b1e540": true, // demo/script-hashes.js
    "0242016e2887b322ab28b887f03779c63899db232bb036d794a0278db9e54339": true, // demo/content-loader.js
    "6249373b8a4e3bb915788ea4f77e8b892f5bb77407e4fe5d981ebd118876be20": true, // demo/mark-parsed.js
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
  hook.parameters.sourceMap = [
    url => location.origin === url.origin && url.pathname.match(/^\/components\/thin-hook\/demo\//)
  ];
  hook.parameters.hookWorker = 'hook-worker.js?no-hook=true';
}