hook.parameters.cors = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js',
  (url) => {
    let _url = new URL(url);
    return _url.hostname !== location.hostname &&
      !_url.href.match(/^(https:\/\/www.gstatic.com|https:\/\/apis.google.com\/js\/api.js|https:\/\/apis.google.com\/_\/)/);
  }
];
hook.parameters.opaque = [
  'https://www.gstatic.com/charts/loader.js',
  (url) => {
    let _url = new URL(url);
    return _url.hostname !== location.hostname &&
      _url.href.match(/^(https:\/\/www.gstatic.com|https:\/\/apis.google.com\/js\/api.js|https:\/\/apis.google.com\/_\/)/);
  }
];
hook.parameters.worker = {
  scripts: [
    '../hook.min.js?no-hook=true',
    'no-hook-authorization.js?no-hook=true',
    'hook-callback.js?no-hook=true',
    'hook-native-api.js?no-hook=true'
  ]
};