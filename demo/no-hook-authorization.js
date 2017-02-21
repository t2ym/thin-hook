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
    "5b7ebf7b0b2977d44f47ffa4b19907abbc443feb31c343a6cbbbb033c8deb01a": true,
    "c714633723320be54f106de0c50933c0aeda8ac3fba7c41c97a815ed0e71594c": true,
    "2f43d927664bdfcbcb2cc4e3743652c7eb070057efe7eaf43910426c6eae7e45": true,
    "66d7a8c3e1edc4c38f20cda492f764adcd4c7689fbd5cb203dbdc17ddb8c1eb2": true,
    "02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a": true,
    "e18a865bb35e80422a28d1a2f60cd34a7d4c8bb6aa0f551c0a66c4e03d321b92": true
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