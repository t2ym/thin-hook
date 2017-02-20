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
    "ae11a06c0ddec9f5b75de82a40745d6d1f92aea1459e8680171c405a5497d1c8": true,
    "477a46cd19b0db0cc97d660a91cb57a8567e415d1e4a4efe4eafe6e0a6a2037b": true,
    "7ecb3aeb79e5b143f0f5efd4070e55584abf96ce4ad8b54f44dec377c2e455ee": true,
    "a6b4709f6d2d0e0c070c98a28f3ad122a830388df23b0d1fd0ad597cd34542fd": true,
    "02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a": true,
    "18fc57b3d13b0ff185c77c0d0c343e30999dc9ebb84213c1749e739218262ee4": true
  };
  const hidden = Symbol('hidden');
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
          return this[hidden];
        },
        set(value) {
          if (value && value.passcode === passcode) {
            delete value.passcode;
            Object.freeze(value);
            this[hidden] = value;
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