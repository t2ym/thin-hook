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
    "35ae97a3305b863af7eb0ac75c8679233a2a7550e4c3046507fc9ea182c03615": true,
    "16afd3d5aa90cbd026eabcc4f09b1e4207a7042bc1e9be3b36d94415513683ed": true,
    "9b1051b68112c30d581f8257b4d80a81c87cef7bfbebe67e9bf6a978724e88f8": true,
    "79e7de76f145b46c9096b8a3ae5728e635715544bf5ded596df3d8816798d36c": true,
    "9c84034cd3f81fcd3e39cf0065e297ba7dae755044aec3a1c4fc3b6ab418ccbd": true,
    "6c8160fc67d9911922c32ba920563fe6f50c53d5e00f41ac4ab968ddbfd9c0f4": true,
    "7e0fcbf73f8a30d98082c497e4bec73f2b49e5bee70605bb8838aed035763868": true,
    "6bd19a73604ee6687e3a3e218d3745e01dd49c082df4582bcf951c9e46b94c31": true,
    "b0743cace06613ee0d905fccc2fb26cc5b3e3174367fc3528372f5850aee8951": true,
    "805d28de4b9284cd770b0336205b7a66d8cf0a3fcc16ee02743990a01f8b9d54": true,
    "a0ab361fa9b16becf45a5b57a90866df74daaef429472069996a0381c055181d": true,
    "7262c922f681e504d9173e7fdce155b6e93e9cc9fc1a05ba420d89e732a09b71": true,
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true,
    "85ee19dcfadf597919e073de9ecd071a2eb263d105524f45eace0318230e66a7": true
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