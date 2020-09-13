/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  let searchParams = new URL(location.href).searchParams;
  if (searchParams.has('content')) {
    let currentScript = document.currentScript;
    let content = decodeURIComponent(atob(searchParams.get('content').replace(/[-]/g, '+').replace(/_/g, '/')));
    //console.log('content-loader.js: document.write ' + content);
    document.write(content);
    //currentScript.parentElement.removeChild(currentScript);
  }
  else if (searchParams.has('blob')) {
    let currentScript = document.currentScript;
    let blobURL = decodeURIComponent(searchParams.get('blob'));
    onload = async (event) => {
      let response = await fetch(new Request(blobURL));
      let blob = await response.blob();
      let reader = new FileReader();
      switch (blob.type) {
      case 'text/html':
        reader.addEventListener('loadend', () => {
          // Recent Firefox browsers keep variables on document.write() after the load event
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/open#Notes
          //console.log('content-loader.js: blobURL ' + blobURL);
          let content = reader.result + hook.parameters.bootstrap;
          //console.log('content-loader.js: document.write ' + content);
          document.write(content);
        });
        reader.readAsText(blob);
        break;
      case 'image/svg+xml':
        // block SVG Blobs
        console.error('content-loader.js: blocking SVG blobURL ' + blobURL);
        break;
      case 'text/plain':
        reader.addEventListener('loadend', () => {
          let dataURL = reader.result.replace('data:text/plain;base64,','data:text/plain;charset=utf-8;base64,');
          if (frameElement && frameElement.src) {
            frameElement.src = dataURL;
          }
          else {
            location = dataURL;
          }
        });
        reader.readAsDataURL(blob);
        break;
      default:
        reader.addEventListener('loadend', () => {
          let dataURL = reader.result;
          //console.log('content-loader.js: blobURL ' + blobURL);
          //console.log('content-loader.js: dataURL ' + dataURL);
          if (frameElement && frameElement.src) {
            frameElement.src = dataURL;
          }
          else {
            location = dataURL;
          }
        });
        reader.readAsDataURL(blob);
        break;
      }
    };
  }
}