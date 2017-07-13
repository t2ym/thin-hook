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
    "afdece554cc7287c0e63f8b8eebc005fd4ffce065960db4018aceb66e2b8b758": true,
    "0c038c34881d8cf62db428bda81e55fd7e78317ef531868600234c6251611d5b": true,
    "a966ca5a31eebd35c0e8d910d198eff5d4468edfa0611f23bb02d1189982b6ee": true,
    "02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a": true,
    "db82c32a68bc3ddbb2232a947c3cdeb88f5ee7ba41d05d686146507687a6897f": true,
    "b0743cace06613ee0d905fccc2fb26cc5b3e3174367fc3528372f5850aee8951": true,
    "2a9643f65d9620246313afc0f3371cfc721f0447202d0ba768818bad0af2d798": true,
    "2fa8489e8936d8da29ebb10f93b1ef713ae1ef41344e8ad6fce1fd7ea23384c9": true,
    "a0ab361fa9b16becf45a5b57a90866df74daaef429472069996a0381c055181d": true
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