{
  let baseURI;
  switch (self.constructor.name) {
  case 'Window':
    if (self === top) {
      baseURI = location.href;
    }
    else {
      baseURI = top.hook.parameters.baseURI;
    }
    hook.parameters.baseURI = baseURI;
    break;
  case 'ServiceWorkerGlobalScope':
    baseURI = new URL(location.origin + new URL(location.href).searchParams.get('service-worker-initiator')).href;
    hook.parameters.baseURI = baseURI;
    break;
  case 'DedicatedWorkerGlobalScope':
  case 'SharedWorkerGlobalScope':
    // For Hook Workers; Insignificant in hooked web workers
    baseURI = new URL(location.origin + 
        (new URL(location.href).searchParams.has('service-worker-initiator')
          ? new URL(location.href).searchParams.get('service-worker-initiator')
          : location.pathname
        )
      ).href;
    hook.parameters.baseURI = baseURI;
    break;
  default:
    baseURI = location.href;
    hook.parameters.baseURI = baseURI;
    break;
  }
  hook.parameters.emptyDocumentUrl = new URL('./empty-document.html', baseURI);
  hook.parameters.bootstrap = `<script>frameElement.dispatchEvent(new Event('srcdoc-load'))</script>`;
  hook.parameters.onloadWrapper = `event.target.addEventListener('srcdoc-load', () => { $onload$ })`;
  //console.log('bootstrap.js: location.href = ' + location.href + ' baseURI = ' + baseURI + ' bootstrap = ' + hook.parameters.bootstrap);
}
