/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  // Handle exceptions
  const errorReportBaseUrl = (new URL('errorReport.json', typeof window === 'object' ? top.location : location)).pathname;
  const criticalErrorPageUrl = 'about:blank';
  let hookCallbackCompatibilityTestDone = false;
  const _caches = caches; // Take a backup just in case (still not robust)
  // Optionally, hide caches completely.
  // Object.defineProperty(_global, 'caches', { configurable: false, enumerable: false, writable: false, value: null });
  // Object.defineProperty(_global, 'CacheStorage', { configurable: false, enumerable: false, writable: false, value: null });
  const onThrowAsync = async function onThrowAsync(error, hookArgs, contextStack, aclArgs) {
    if (!hookCallbackCompatibilityTestDone || !error.message.match(/^Permission Denied:/) || !Array.isArray(aclArgs)) {
      return true; // Skipping non-ACL errors for the demo. They can be reported to the server, of course.
    }
    // Report the error to the server
    // Notes:
    //  - Customizations are required such as
    //    1. Use a HTTP POST message to report more detailed data on the error
    //    2. Clean up caches and other application data if the error is regarded as fatal
    //    3. Unregister the running Service Worker instance
    //    4. Transition to a predefined critical error page or about:blank
    //    etc.
    //
    //console.log('aclArgs = ', aclArgs);
    let errorReportUrl = errorReportBaseUrl/* +
      '?context=' + encodeURIComponent(hookArgs[3]) +
      '&error=' + error.name +
      '&message=' + encodeURIComponent(error.message) +
      (Array.isArray(aclArgs)
        ? ('&name=' + (typeof aclArgs[0] === 'string' ? encodeURIComponent(aclArgs[0]) : 'typeof:' + typeof aclArgs[0]) +
           '&property=' + (typeof aclArgs[3] === 'string' ? encodeURIComponent(aclArgs[3]) : 'typeof:' + typeof aclArgs[3]) +
           '&opType=' + aclArgs[4])
        : '');*/
    let data = {
      'context': hookArgs[3],
      'error': error.name,
      'message': error.message,
    };
    if (Array.isArray(aclArgs)) {
      data['name'] =  typeof aclArgs[0] === 'string'
        ? aclArgs[0]
        : aclArgs[0] instanceof Set
          ? SetMap.getStringValues(aclArgs[0], ' ')
          : 'typeof:' + typeof aclArgs[0];
      data['isStatic'] = aclArgs[1];
      data['isObject'] = aclArgs[2];
      data['property'] = typeof aclArgs[3] === 'string' 
                          ? aclArgs[3]
                          : Array.isArray(aclArgs[3])
                            ? JSON.stringify(aclArgs[3]) // this can be a raw object aclArgs[3] instead of a JSON string
                            : typeof aclArgs[3] === 'symbol'
                              ? aclArgs[3].toString()
                              : 'typeof:' + typeof aclArgs[3];
      data['opType'] = aclArgs[4];
    }
    let errorReportResponseJSON;
    try {
      let errorReportResponse = await fetch(errorReportUrl, {
        method: 'POST', // Note: On 'GET' method, make sure the request reaches the server through the Service Worker with appropriate cache control.
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data,null,0),
        mode: 'same-origin',
        cache: 'no-cache'
      });
      let errorReportResponseText = await errorReportResponse.text();
      errorReportResponseJSON = JSON.parse(errorReportResponseText) || {};
    }
    catch (e) {
      errorReportResponseJSON = {
        severity: 'permissive' // default severity on a fetch error
      };
    }
    finally {
      switch (errorReportResponseJSON.severity) {
      case 'critical':
      default:
        //let keys = await _caches.keys()
        //await Promise.all(keys.map(key => _caches.delete(key)));
        location = criticalErrorPageUrl;
        return false;
      case 'observing':
      case 'permissive':
        return true;
      }
    }
  }
  const onThrow = function onThrow(error, hookArgs, contextStack, aclArgs) {
    onThrowAsync(error, hookArgs, contextStack, aclArgs);
    // Synchronous immediate handling of the error
    /*
    if (hookCallbackCompatibilityTestDone && error.message.match(/^Permission Denied:/) && Array.isArray(aclArgs)) {
      location = criticalErrorPageUrl; // Note: Probably no time to report errors to the server
    }
    // Skipping non-ACL errors
    */
  }