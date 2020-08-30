/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
  // Track mutations of elements
  if (self.constructor.name === 'Window') {
    const console = _global.console;
    const document = _global.document;
    const Node = _global.Node;
    const HTMLAnchorElement = _global.HTMLAnchorElement;
    const HTMLAreaElement = _global.HTMLAreaElement;
    const HTMLEmbedElement = _global.HTMLEmbedElement;
    const HTMLObjectElement = _global.HTMLObjectElement;
    const ELEMENT_NODE = Node.ELEMENT_NODE;
    const TEXT_NODE = Node.TEXT_NODE;
    const CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE;
    const PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE;
    const COMMENT_NODE = Node.COMMENT_NODE;
    const DOCUMENT_NODE = Node.DOCUMENT_NODE;
    const DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE;
    const DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE;
    const { appendChild, replaceChild, insertBefore } = Node.prototype;
    const S_MUTATION = Symbol.for('mutation');
    const S_PARSED = Symbol.for('parsed');
    const detectDOMIntrusion = true; // false to disable DOM intrusion detection
    let documentType;

    Object.defineProperty(Node.prototype, 'appendChild', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function _appendChild (node) {
        if (node) {
          switch (node.nodeType) {
          case ELEMENT_NODE:
            node[S_MUTATION] = node[S_MUTATION] ? node[S_MUTATION] + 1 : 1;
            break;
          case DOCUMENT_FRAGMENT_NODE:
            for (let child of node.children) {
              child[S_MUTATION] = child[S_MUTATION] ? child[S_MUTATION] + 1 : 1;
            }
            break;
          }  
        }
        return appendChild.call(this, node);
      },
    });
    Object.defineProperty(Node.prototype, 'replaceChild', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function _replaceChild (newNode, oldNode) {
        if (newNode && newNode.nodeType === ELEMENT_NODE) {
          newNode[S_MUTATION] = newNode[S_MUTATION] ? newNode[S_MUTATION] + 1 : 1;
        }
        return replaceChild.call(this, newNode, oldNode);
      },
    });
    Object.defineProperty(Node.prototype, 'insertBefore', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function _insertBefore (newNode, referenceNode) {
        if (newNode) {
          switch (newNode.nodeType) {
          case ELEMENT_NODE:
            newNode[S_MUTATION] = newNode[S_MUTATION] ? newNode[S_MUTATION] + 1 : 1;
            break;
          case DOCUMENT_FRAGMENT_NODE:
            for (let child of newNode.children) {
              child[S_MUTATION] = child[S_MUTATION] ? child[S_MUTATION] + 1 : 1;
            }
            break;
          }  
        }
        return insertBefore.call(this, newNode, referenceNode);
      },
    });
    hook.parameters.innerHTMLTracker = function innerHTMLTracker(node, value, processed) {
      node[S_MUTATION] = 'parent';
    };

    let isLoaded = false;
    if (location.href.startsWith(hook.parameters.emptyDocumentUrl.href) && _global.frameElement) {
      documentType = 'emptyDocument';
      _global.frameElement.addEventListener('srcdoc-load', function onSrcdocLoad(event) {
        isLoaded = true;
        let mutations = observer.takeRecords();
        observerCallback(mutations, observer);
        //console.log('emptyDocumentUrl: srcdoc-load mutations ', location.href, mutations);
      });
    }
    else if (new URL(location.href).searchParams.get('referrer') === 'hook.parameters.emptySvg') {
      documentType = 'emptySvg';
      _global.addEventListener('load', function onLoad(event) {
        isLoaded = true;
        let mutations = observer.takeRecords();
        observerCallback(mutations, observer);
        //console.log('emptySvg: load mutations ', mutations);
      });
    }
    else if (typeof frameElement === 'object' && frameElement && frameElement.tagName === 'IFRAME') {
      documentType = 'iframe';
      _global.addEventListener('load', function onLoad(event) {
        isLoaded = true;
        let mutations = observer.takeRecords();
        observerCallback(mutations, observer);
        //console.log('iframe: load mutations ', mutations);
      });
    }
    else {
      documentType = 'document';
      _global.document.addEventListener('readystatechange', function onReadyStateChange(event) {
        switch (document.readyState) {
        case 'loading':
          break;
        case 'interactive':
        case 'complete':
          isLoaded = true;
          let mutations = observer.takeRecords();
          observerCallback(mutations, observer);
          //console.log(`document: readystatechange ${document.readyState} mutations `, mutations);
          break;
        }
      });
    }
    //console.log('documentType: ', documentType, document);

    const auditChildList = function (targetNode, mutationRecord) {
      if (!detectDOMIntrusion) { // check the configuration
        return;
      }
      let unauthorized = false;
      if (targetNode[S_MUTATION] === 'parent') {
        targetNode[S_MUTATION] = 0;
        //console.log('auditChildList: targetNode matched', targetNode);
        return;
      }
      for (let node of mutationRecord.addedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          if (node[S_MUTATION]) {
            //console.log('auditChildList: addedNode matched', node);
            node[S_MUTATION]--;
          }
          else if (!node[S_PARSED]){
            if (node.tagName === 'BODY' && node.children.length === 0) {
              // automatically inserted empty body element
            }
            else {
              //console.log('auditChildList: addedNode not matched', node);
              unauthorized = true;
            }
          }
        }
      }
      if (unauthorized) {
        //console.error('auditChildList: unauthorized mutation(s) on node', targetNode, mutationRecord); // avoid giving hints to hackers
        onUnauthorizedMutation();
      }
    };

    const messagesOnUnauthorizedMutation = {
      en: 'Blocked on Browser Extensions',
      // messages for other languages based on navigator.language
    };
    const getMessageOnUnauthorizedMutation = function () {
      return messagesOnUnauthorizedMutation[navigator.language] ||
        messagesOnUnauthorizedMutation[navigator.language.replace(/^([a-z]{2,3})[-_].*$/, '$1')] ||
        messagesOnUnauthorizedMutation['en'];
    }
    const halt = async function halt() {
      let registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
      }
      await caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))));
      if (self.top) {
        top.location = halt.location = 'about:blank';
      }
      else {
        location = halt.location = 'about:blank';
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // The application is blocked on an unauthorized DOM mutation suspectedly by an intrusive browser extension
    // Since the mutation has already been done and effective, there is no choice but halting the application
    // It should be helpful for users to be notified of the requirement that some browser extensions must be disabled
    const onUnauthorizedMutation = async function () {
      let message = getMessageOnUnauthorizedMutation();
      alert(message);
      await halt();
    };

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      //attributeFilter: ['src', 'data', 'srcdoc', 'href', 'action'],
      attributeOldValue: true,
      //characterData: true, // TODO: track characterData mutation
      //characterDataOldValue: true,
    };

    const auditURL = function (node, name, urlStr) {
      let url = new URL(urlStr, location.href);
      let allowed = false;
      if (hook.parameters.hangUpOnEmbedAndObjectElement) {
        if (node instanceof HTMLEmbedElement || node instanceof HTMLObjectElement) {
          if (urlStr !== 'about:blank') {
            node[name] = 'about:blank';
            if (urlStr) {
              _global.top.location = 'about:blank'; // The application hangs up since all <embed> and <object> nodes are unexpected and malicious
            }
          }
          return;
        }
      }
      switch (url.protocol) {
      case 'javascript:':
        if (name === 'href') {
          if (!urlStr.match(/^javascript:const __[0-9a-zA-Z]*__=\$hook\$[.]\$/)) {
            //console.warn(`auditURL: hooking ${node.tagName.toLowerCase()}.${name} with value "${urlStr}" for `, node);
            node.setAttribute(name, urlStr);
          }
        }
        else {
          node.removeAttribute(name);
          //console.warn(`auditURL: blocking ${node.tagName.toLowerCase()}.${name} with value "${urlStr}" for `, node);
        }
        break;
      case 'http:':
      case 'https:':
        break;
      case 'blob:':
        if (node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement) {
          if (node.hasAttribute('download')) {
            allowed = true; // <a download href="blob:*">
          }
        }
        if (!allowed) {
          node.removeAttribute(name);
          //console.warn(`auditURL: blocking ${node.tagName.toLowerCase()}.${name} with value "${urlStr}" for `, node);
        }
        break;
      case 'data:':
      case 'about:':
      default:
        break;
      }
    };

    const auditNode = function (node) {
      switch (node.nodeType) {
      case ELEMENT_NODE:
        {
          let tagName = node.tagName.toLowerCase();
          let targets = Object.create(null);
          switch (tagName) {
          case 'script':
            targets.src = node.src;
            break;
          case 'iframe':
            targets.src = node.src;
            targets.srcdoc = node.srcdoc;
            break;
          case 'object':
            targets.data = node.data;
            break;
          case 'embed':
            targets.src = node.src;
            break;
          case 'form':
            targets.action = node.action;
            break;
          case 'a':
          case 'area':
            targets.href = node.href;
            targets.download = node.download;
            break;
          default:
            break;
          }
          for (let name in targets) {
            switch (name) {
            case 'srcdoc':
              if (targets[name]) {
                node.removeAttribute('srcdoc');
                //console.warn(`auditURL: blocking ${node.tagName.toLowerCase()}.${name} with value "${targets[name]}" for `, node);
              }
              break;
            case 'download':
              if (!node.hasAttribute('download')) {
                if (node.href && node.href.startsWith('blob:')) {
                  node.removeAttribute('href'); // invalidate href link for downloading
                }
              }
              break;
            default:
              auditURL(node, name, targets[name]);
              break;
            }
          }
        }
        break;
      case TEXT_NODE:
      case CDATA_SECTION_NODE:
      case PROCESSING_INSTRUCTION_NODE:
      case COMMENT_NODE:
      case DOCUMENT_NODE:
      case DOCUMENT_TYPE_NODE:
      case DOCUMENT_FRAGMENT_NODE:
      default:
        break;
      }
    };

    const addTargetNodes = function (targetNodes, node) {
      targetNodes.add(node);
      if (node.children) {
        for (let child of node.children) {
          addTargetNodes(targetNodes, child);
        }
      }
      if (node.shadowRoot) {
        observer.observe(node.shadowRoot, config);
        for (let child of node.shadowRoot.children) {
          addTargetNodes(targetNodes, child);
        }
      }
      if (node.content && node.tagName === 'TEMPLATE') {
        observer.observe(node.content, config);
        for (let child of node.content.children) {
          addTargetNodes(targetNodes, child);
        }
      }
    };

    const observerCallback = function (mutations, observer) {
      let targetNodes = new Set();
      switch (documentType) {
      case 'document':
        switch (document.readyState) {
        case 'interactive':
        case 'complete':
          if (!isLoaded) {
            isLoaded = true;
            //console.log('observerCallback: isLoaded = true for ', document, document.readyState, document.querySelector('html').outerHTML);
          }
          break;
        case 'loading':
        default:
          break;
        }
        break;
      case 'iframe':
        switch (document.readyState) {
        case 'complete':
          isLoaded = true;
          break;
        case 'loading':
        case 'interactive':
          default:
          break;
        }
        break;
      case 'emptySvg':
      case 'emptyDocument':
        break;
      }
      for(let mutation of mutations) {
        switch (mutation.type) {
        case 'childList':
          if (isLoaded) {
            auditChildList(mutation.target, mutation);
          }
          if (mutation.addedNodes.length > 0) {
            for (let node of mutation.addedNodes) {
              addTargetNodes(targetNodes, node);
            }
          }
          break;
        case 'attributes':
          targetNodes.add(mutation.target);
          break;
        case 'characterData': // TODO: track characterData mutation
          break;
        default:
          break;
        }
      }
      for (let node of targetNodes) {
        auditNode(node);
      }
      //if (targetNodes.length > 0) { console.log('observerCallback: nodes should be audited', ...targetNodes); }
    };

    const observer = new MutationObserver(observerCallback);

    // For ShadowRoot
    hook.parameters.mutationObserver = observer;
    hook.parameters.mutationObserverConfig = config;

    try {
      observer.observe(document, config);
    }
    catch (e) {
      console.error(e, document);
    }
  }
