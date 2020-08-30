/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
(/* @endexclude */
{ // initial monolithic policy implementation for now
// irregular indentation to keep the original contextNormalizer and acl contents unchanged but they will be reformatted later
contextNormalizer: {
  '/components/iron-location/iron-location.html,script@1800,_updateUrl': '@route_manipulator',
  '/components/iron-location/iron-location.html,script@1800,_globalOnClick': '@route_manipulator',
  '/components/thin-hook/demo/web-worker-client.js,worker': '@worker_manipulator',
  '/components/thin-hook/demo/web-worker-client.js': '@worker_manipulator',
  '/components/thin-hook/demo/web-worker-module-client.js,worker': '@worker_manipulator',
  '/components/thin-hook/demo/web-worker-module-client.js': '@worker_manipulator',
  '/components/thin-hook/demo/shared-worker-client.js,worker': '@shared_worker_manipulator',
  '/components/thin-hook/demo/shared-worker-client.js': '@shared_worker_manipulator',
  '/components/thin-hook/demo/normalize.js': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,f': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,get': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,caches': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,F,Function': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,dummyClass3Instance': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,SubClass1': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,SubClass2': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,SubClass3': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,SubClass4,SubClass4': '@normalization_checker',
  '/components/thin-hook/demo/normalize.js,BaseClass1,constructor': '@XClass1_constructor',
  '/components/thin-hook/demo/normalize.js,SubClass1,constructor': '@XClass1_constructor',
  '/components/thin-hook/demo/normalize.js,SubClass2,constructor': '@XClass1_constructor',
  '/components/thin-hook/demo/normalize.js,SubClass3,constructor': '@XClass1_constructor',
  '/components/thin-hook/demo/normalize.js,SubClass4,SubClass4,constructor': '@XClass1_constructor',
  '/components/thin-hook/demo/normalize.js,SubClass5': '@normalization_checker',
  '/components/thin-hook/demo/Function.js': '@Function_js',
  '/components/thin-hook/demo/Function.js,strictMode': '@Function_js',
  '/components/thin-hook/demo/Function.js,F': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode,F': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode': '@normalization_checker',
  '/components/thin-hook/demo/Function.js,f3': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode,f3': '@Function_reader',
  '/components/thin-hook/demo/Function.js,f4': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode,f4': '@Function_reader',
  '/components/thin-hook/demo/Function.js,SubclassFunction': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode,SubclassFunction': '@Function_reader',
  '/components/thin-hook/demo/Function.js,CustomConstructorSubclassFunction': '@Function_reader',
  '/components/thin-hook/demo/Function.js,strictMode,CustomConstructorSubclassFunction': '@Function_reader',
  '/components/thin-hook/demo/Function.js,cannotBindFunction': '@Function_cannotBindFunction',
  '/components/thin-hook/demo/normalize.js,ArraySubclass2,constructor': '@super_normalization_checker',
  '/components/thin-hook/demo/normalize.js,ArraySubclass4,constructor': '@super_normalization_checker',
  '/components/thin-hook/demo/normalize.js,bindCheck': '@bind_normalization_checker',
  '/components/thin-hook/demo/normalize.js,bindCheck,boundF': '@bind_normalization_checker',
  '/components/thin-hook/demo/normalize.js,bindCheck,b': '@bind_normalization_checker',
  '/components/thin-hook/demo/normalize.js,bindCheck,B,static now': '@bind_normalization_checker',
  '/components/thin-hook/demo/normalize.js,cannotAccessNavigator': '@normalization_checker_cannot_access_navigator',
  '/components/dexie/dist/dexie.min.js,r': '@custom_error_constructor_creator',
  '/components/firebase/firebase-app.js': '@firebase_app',
  '/components/firebase/firebase-auth.js,t': '@custom_error_constructor_creator',
  '/components/polymer/lib/utils/templatize.html,script@695,upgradeTemplate': '@template_element_prototype_setter',
  '/components/thin-hook/demo/my-view2.html,script@2946,getData': '@hook_visualizer',
  '/components/thin-hook/demo/my-view2.html,script@2946,attached,_lastEdges': '@hook_visualizer',
  '/components/thin-hook/demo/my-view2.html,script@2946,drawGraph': '@hook_visualizer',
  '/components/thin-hook/demo/my-view2.html,script@2946,descriptors': '@window_enumerator',
  '/components/thin-hook/demo/my-view2.html,script@2946': '@Object_prototype_reader',
  '/components/web-animations-js/web-animations-next-lite.min.js': '@web_animations_next_lite',
  '/components/web-animations-js/web-animations-next-lite.min.js,*': '@web_animations_next_lite',
  '/components/live-localizer/live-localizer-browser-storage.html,script@3348,modelReady': '@Dexie_instantiator',
  '/components/deepcopy/build/deepcopy.min.js': '@deepcopy',
  '/components/deepcopy/build/deepcopy.min.js,*': '@deepcopy',
  '/components/deepcopy/build/deepcopy.min.js,u': '@Object_keys_reader',
  '/components/dexie/dist/dexie.min.js,jn': '@Object_keys_reader',
  '/components/dexie/dist/dexie.min.js,Pn': '@Object_getPrototypeOf_reader',
  '/components/firebase/firebase-app.js,*': '@firebase_app',
  '/components/firebase/firebase-app.js,p': '@Object_getPrototypeOf_reader',
  '/components/dexie/dist/dexie.min.js,In': '@Object_getOwnPropertyDescriptor_reader',
  '/components/firebase/firebase-auth.js': '@firebase_auth',
  '/components/firebase/firebase-auth.js,*': '@firebase_auth',
  '/components/firebase/firebase-auth.js,Xb': '@Object_defineProperty_reader',
  '/components/firebase/firebase-auth.js,mc': '@firebase_auth_closure_global_variable_writer',
  '/components/firebase/firebase-auth.js,Lh': '@firebase_auth_iframecb_writer',
  '/components/firebase/firebase-database.js': '@firebase_database',
  '/components/firebase/firebase-database.js,*': '@firebase_database',
  '/components/firebase/firebase-database.js,u,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,lt,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,St,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Ut,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Zt,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,ie,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Ln,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Qn,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Er,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,jr,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,Gr,t': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-database.js,ir': '@document_createElement_reader',
  '/components/firebase/firebase-database.js,or': '@iframe_contentWindow_accessor',
  '/components/firebase/firebase-database.js,or,t': '@firebase_database_callback_global_variable_writer',
  '/components/firebase/firebase-messaging.js': '@firebase_messaging',
  '/components/firebase/firebase-messaging.js,*': '@firebase_messaging',
  '/components/firebase/firebase-messaging.js,24,k,e': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-messaging.js,24,P,e': '@Object_setPrototypeOf_reader',
  '/components/firebase/firebase-storage.js': '@firebase_storage',
  '/components/firebase/firebase-storage.js,*': '@firebase_storage',
  '/components/polymerfire/firebase-common-behavior.html,script@437,__appNameChanged': '@polymerfire', // TODO: More contexts should be mapped to @polymerfire
  '/components/polymerfire/firebase-app.html,script@802,__computeApp': '@polymerfire',
  '/components/polymerfire/firebase-auth.html,script@2320,_providerFromName': '@polymerfire',
  '/components/polymer/lib/mixins/element-mixin.html,script@926,*': '@Polymer_element_mixin',
  '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,*': '@Polymer_legacy_element_mixin',
  '/components/polymer/lib/legacy/legacy-element-mixin.html,script@1013,LegacyElement,fire': '@Event_detail_writer',
  '/components/polymer/lib/mixins/property-effects.html,script@914,setupBindings': '@HTMLElement___dataHost_writer',
  '/components/polymer/lib/mixins/property-accessors.html,script@741': '@HTMLElement_prototype_reader',
  '/components/polymer/lib/mixins/property-accessors.html,script@741,*': '@Polymer_property_accessors',
  '/components/polymer/lib/mixins/property-accessors.html,script@741,props': '@HTMLElement_prototype_reader',
  '/components/polymer/lib/mixins/property-accessors.html,script@741,proto': '@HTMLElement_prototype_reader',
  '/components/polymer/lib/mixins/property-effects.html,script@914,*': '@Polymer_property_effects',
  '/components/polymer/lib/mixins/template-stamp.html,script@630,*': '@Polymer_template-stamp',
  '/components/polymer/lib/legacy/polymer.dom.html,script@701': '@Event___domApi_writer',
  '/components/polymer/lib/legacy/polymer.dom.html,script@701,forwardMethods': '@DocumentFragment_querySelector_reader',
  '/components/polymer/lib/elements/dom-module.html,script@634': '@Polymer_lib',
  '/components/polymer/lib/elements/dom-bind.html,script@777': '@Polymer_lib',
  '/components/polymer/lib/elements/dom-repeat.html,script@816': '@Polymer_lib',
  '/components/polymer/lib/elements/dom-repeat.html,script@816,*': '@Polymer_lib',
  '/components/polymer/lib/elements/dom-if.html,script@754': '@Polymer_lib',
  '/components/polymer/lib/elements/array-selector.html,script@699': '@Polymer_lib',
  '/components/polymer/lib/elements/custom-style.html,script@662': '@Polymer_lib',
  '/components/polymer/lib/legacy/class.html,script@581,*': '@Polymer_legacy_class',
  '/components/polymer/lib/legacy/polymer-fn.html,script@568': '@Polymer_lib',
  '/components/polymer/lib/utils/import-href.html,script@567,*': '@Polymer_lib',
  '/components/polymer/lib/utils/mixin.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/boot.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/case-map.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/resolve-url.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/style-gather.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/path.html,*': '@Polymer_lib',
  '/components/polymer/lib/utils/async.html,*': '@Polymer_lib',
  '/components/polymer/lib/mixins/property-accessors.html,*': '@Polymer_lib',
  '/components/chai/chai.js,30': '@custom_error_constructor_creator',
  '/components/chai/chai.js,9,hasProtoSupport': '@Object__proto__reader',
  '/components/chai/chai.js,36,getType,type': '@Object_prototype_reader',
  '/components/chai/chai.js,24,type': '@Object_prototype_reader',
  '/components/chai/chai.js': '@chai_js',
  '/components/chai/chai.js,*': '@chai_js',
  '/components/dexie/dist/dexie.min.js,p': '@Object_static_method_user',
  '/components/dexie/dist/dexie.min.js,Cn': '@dexie_Object_hasOwnProperty_reader',
  '/components/dexie/dist/dexie.min.js,*': '@dexie_js',
  '/components/dexie/dist/dexie.min.js': '@dexie_js',
  '/components/webcomponentsjs/webcomponents-lite.js': '@Object_assign_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,Xa,b': '@Event_ja_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,rc,get composed': '@Event_ja_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,lc': '@Event__target_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Ja': '@Event_composed_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,kc': '@Event_composedPath_executor',
  '/components/webcomponentsjs/webcomponents-lite.js,rc,get target': '@Event_composedPath_executor',
  '/components/webcomponentsjs/webcomponents-lite.js,rc,composedPath': '@Event_ya_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,rc,stopPropagation': '@Event_ka_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,rc,get relatedTarget': '@Event_za_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,nd': '@HTMLElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,nd,b': '@HTMLElement_proto_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,nd,b,e': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,rd': '@CustomEvent_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,I': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,bc': '@HTMLElement___shady_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,u': '@HTMLElement_insertAdjacentElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,l': '@DocumentFragment_$__proto__$_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Ra': '@DocumentFragment_querySelectorAll_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,la': '@HTMLElement___shady_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Wb': '@HTMLElement___shady_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Wd': '@HTMLElement_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,Ba': '@HTMLElement_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,wb': '@HTMLElement_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,lc,d': '@Event_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,c': '@Node_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,eb': '@Node_prototype_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,Mc': '@Element_matches_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,M': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,M,e': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,yb': '@HTMLElement_insertAdjacentElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,hd,b': '@HTMLElement_insertAdjacentElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,$c,b': '@HTMLElement_insertAdjacentElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,cd': '@HTMLElement_insertAdjacentElement_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,hb': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,ib': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Fa': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Aa': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,ua': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,xa': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,a': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,ke': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,Q,b': '@customElement_localName_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,h': '@customElement_localName_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,Bd,a': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,mc': '@Node_prototype_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,U': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,S': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Ha': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Sb': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Mb': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,Ia': '@TreeWalker_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,b': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,d,b': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,id': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,xd': '@FocusEvent_currentTarget_writer',
  '/components/webcomponentsjs/webcomponents-lite.js,oa': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,cc': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,T': '@customElements_reader',
  '/components/webcomponentsjs/webcomponents-lite.js,*': '@webcomponents-lite',
  '/components/thin-hook/demo/es6-module.js': '@es6-module',
  '/components/thin-hook/demo/es6-module.js,*': '@es6-module',
  '/components/thin-hook/demo/es6-module2.js,f2,module': '@Module_importer',
  '/components/thin-hook/demo/es6-module2.js': '@Module_importer',
  '/components/thin-hook/demo/es6-module2.js,*': '@es6-module2',
  '/components/thin-hook/demo/es6-module3.js': '@es6-module3',
  '/components/thin-hook/demo/es6-module3.js,*': '@es6-module3',
  '/components/thin-hook/demo/es6-module4.js': '@es6-module4',
  '/components/thin-hook/demo/es6-module4.js,baseUrl': '@es6-module4',
  '/components/thin-hook/demo/es6-module4.js,f': '@es6-module4,f',
  '/components/thin-hook/demo/es6-module4.js,f,*': '@es6-module4,f',
  '/components/polymer/lib/utils/async.html,script@566,timeOut,run': '@setTimeout_reader',
  '/components/thin-hook/demo/,script@4964': '@document_writer',
  '/components/thin-hook/demo/,script@5028': '@document_writer',
  '/components/thin-hook/demo/,script@5911': '@document_writer',
  '/components/thin-hook/demo/,script@5963': '@document_writer',
  '/components/thin-hook/demo/,script@5964': '@document_writer',
  '/components/thin-hook/demo/sub-document.html,*': '@document_writer',
  '/components/thin-hook/demo/commonjs2.js': '@path_join_prohibited',
  '/components/thin-hook/demo/commonjs2.js,tty': '@tty_prohibited',
  '/components/live-localizer/live-localizer-lazy.html,*': '@live-localizer-lazy',
  '/components/live-localizer/draggable-behavior.html,*': '@draggable-behavior',
  '/components/iron-location/iron-location.html,*': '@iron-location',
  '/components/live-localizer/live-localizer-model.html,script@1001,reload': '@route_manipulator',
  '/components/xliff-conv/xliff-conv.js': '@xliff-conv',
  '/components/xliff-conv/xliff-conv.js,*': '@xliff-conv',
  '/components/iron-a11y-announcer/iron-a11y-announcer.html,*': '@iron-a11y-announcer',
  '/components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html,*': '@iron-a11y-keys-behavior',
  '/components/thin-hook/demo/spread.js': '@spread_js',
  '/components/thin-hook/demo/spread.js,*': '@spread_js',
  '/components/thin-hook/demo/lhs.js': '@lhs_js',
  '/components/thin-hook/demo/lhs.js,*': '@lhs_js',
  '/components/thin-hook/demo/,*': '@demo_entry_page_scripts',
  '/components/i18n-behavior/i18n-behavior.html,script@754,isStandardPropertyConfigurable,langPropertyDescriptor': '@lang_descriptor_reader',
  '/components/i18n-behavior/i18n-behavior.html,*': '@i18n-behavior',
  '/components/i18n-behavior/i18n-attr-repo.html,*': '@i18n-behavior',
  '/components/i18n-number/i18n-number.html,*': '@i18n-number',
  '/components/thin-hook/node_modules/process/browser.js': '@process_browser_js',
  '/components/thin-hook/demo/normalize.js,GetterSetterClass': '@GetterSetterClass',
  '/components/thin-hook/demo/normalize.js,GetterSetterClass,*': '@GetterSetterClass',
  '/components/thin-hook/demo/normalize.js,createProperty': '@GetterSetterClass_creator',
  '/components/thin-hook/demo/normalize.js,createProperty,get': '@GetterSetterClass_creator',
  '/components/thin-hook/demo/normalize.js,createProperty,set': '@GetterSetterClass_creator',
  '/components/thin-hook/demo/normalize.js,writeProperty': '@GetterSetterClass_writer',
  '/components/thin-hook/demo/normalize.js,readProperty': '@GetterSetterClass_reader',
  '/components/thin-hook/demo/my-view3.html,*': '@iframe_contentWindow_accessor',
  '/components/thin-hook/demo/view3,*': '@iframe_contentWindow_accessor',
  '/components/thin-hook/demo/sub-document.html,script@8036,onLoad': '@iframe_contentWindow_accessor',
  '/components/thin-hook/demo/sub-document.html,script@8036,onLoad,*': '@iframe_contentWindow_accessor',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js,41,o': '@iframe_contentWindow_accessor',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js,26': '@iframe_contentWindow_accessor',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js': '@Chart.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js,*': '@Chart.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.2.0/sha.js': '@sha.js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js': '@crypto-js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js,*': '@crypto-js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js': '@crypto-js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js,*': '@crypto-js',
  '/components/thin-hook/demo/my-view1.html,script@4544,attached': '@svg_contentWindow_accessor',
  '/components/iron-behaviors/iron-control-state.html,script@581,properties,_boundFocusBlurHandler,type': '@Function_reader',
  '/components/paper-ripple/paper-ripple.html,script@4438,properties,_boundAnimate,type': '@Function_reader',
  '/components/iron-ajax/iron-ajax.html,script@1410,properties,_boundHandleResponse,type': '@Function_reader',
  '/components/vaadin-grid/vaadin-grid-table.html,script@8651,properties,bindData': '@Function_reader',
  '/components/vaadin-grid/vaadin-grid-active-item-behavior.html,script@320': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-table-scroll-behavior.html,script@1638': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-cell-click-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-focusable-cell-container-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-templatizer.html,script@67': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-row-details-behavior.html,script@593': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-data-provider-behavior.html,script@1161': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-selection-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-keyboard-navigation-behavior.html,script@623': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-column-reordering-behavior.html,script@951': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-column.html,script@281': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-array-data-provider-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-dynamic-columns-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-sort-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/vaadin-grid-filter-behavior.html,script@8': '@vaadin-grid',
  '/components/vaadin-grid/iron-list-behavior.html,script@165': '@vaadin-grid',
  '/components/app-storage/app-storage-behavior.html,script@579,valueIsEmpty': '@Object_prototype_reader',
  '/components/thin-hook/demo/global.js': '@global_js',
  '/components/thin-hook/demo/global.js,inaccessible': '@global_js_inaccessible',
  '/components/thin-hook/demo/global.js,inaccessible,accessible': '@global_js_accessible',
  '/components/shadycss/apply-shim.min.js': '@apply-shim',
  '/components/shadycss/apply-shim.min.js,*': '@apply-shim',
  '/components/shadycss/custom-style-interface.min.js': '@custom-style-interface',
  '/components/shadycss/custom-style-interface.min.js,*': '@custom-style-interface',
  '/components/make-plural/plurals.js': '@plurals.js',
  '/components/make-plural/plurals.js,*': '@plurals.js',
  "lit-html": "@lit-html",
  "lit-html,*": "@lit-html",
  "lit-html/*": "@lit-html",
  "lit-element/": "@lit-element",
  "lit-element/,*": "@lit-element",
  "lit-element/lib/*": "@lit-element",
  "lit-element/*": "@lit-element",
  "focus-visible": "@focus-visible",
  "focus-visible,*": "@focus-visible",
  "@spectrum-web-components/shared/*": "@spectrum-web-components/shared",
  "@spectrum-web-components/button/*": "@spectrum-web-components/button",
  "@spectrum-web-components/theme/*": "@spectrum-web-components/theme",
  "tslib": "@tslib",
  "tslib,*": "@tslib",
  "./modules/module1.js": "@module1",
  "./modules/module1.js,*": "@module1",
  "./modules/module2.js": "@module2",
  "./modules/module2.js,*": "@module2",
  'https://thin-hook.localhost.localdomain/automation.json,*': '@cache_automation',
},
acl: {
  // blacklist objects/classes
  caches: '---',
  __hook__: '---', // TODO: ineffective
  __unexpected_access_to_hook_callback_function__: '---',
  __unexpected_access_to_hook_with_object__: '---',
  __unexpected_access_to_hook_alias_object__: '---',
  hook: '---',
  $hook$: '---',
  top: 'r--',
  parent: 'r--',
  frames: 'r--',
  globalThis: 'r--',
  content: 'r--',
  self: 'r--',
  _global: 'r--',
  [mainGlobalObjectName]: { // overwrite self: in worker threads
    [S_CHAIN]: () => acl,
    [S_OBJECT]: 'r--',
    [S_DEFAULT]: Policy.globalAcl(),
    [S_ALL]: '---',
  },
  '@window_enumerator': 'r--R-',
  Window: {
    [S_CHAIN]: () => acl.EventTarget, // EventTarget is a prototype of Window
    [S_DEFAULT]: 'r--',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: '---',
      '@window_enumerator': 'r--R-',
      '@Object_prototype_reader': 'r--',
      addEventListener: {
        [S_DEFAULT]: '--x',
        '@Node_prototype_writer': 'rwx',
      },
      removeEventListener: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwx',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: () => acl,
      },
    },
  },
  _data: {
    [S_DEFAULT]: '---',
    '@hook_visualizer': 'r--',
  },
  _data2: {
    [S_DEFAULT]: '---',
    '@hook_visualizer': 'r--',
  },
  globalObjectAccess: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'r--',
    '@Function_js': 'r--',
  },
  Reflect: {
    [S_OBJECT]: 'r--',
    [S_DEFAULT]: '--x',
    '@normalization_checker': 'r-x',
    '@bind_normalization_checker': 'r-x',
    '@tslib': 'r-x',
  },
  Object: {
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: '--x',
    '@Object_static_method_reader': 'r--',
    '@Object_static_method_user': 'r-x',
    '@Object_assign_reader': 'r--',
    '@Object__proto__reader': 'r--',
    '@normalization_checker': 'r--',
    '@bind_normalization_checker': 'r-x',
    $__proto__$: 'r--',
    create: 'r-x',
    keys: {
      [S_DEFAULT]: '--x',
      '@Object_keys_reader': 'r--',
      '@bind_normalization_checker': 'r-x',
    },
    getPrototypeOf: {
      [S_DEFAULT]: '--x',
      '@Object_getPrototypeOf_reader': 'r--',
      '@bind_normalization_checker': 'r-x',
    },
    setPrototypeOf: {
      [S_DEFAULT]: '--x',
      '@Object_setPrototypeOf_reader': 'r--',
      '@bind_normalization_checker': 'r-x',
    },
    getOwnPropertyDescriptor: {
      [S_DEFAULT]: '--x',
      '@Object_getOwnPropertyDescriptor_reader': 'r--',
      '@normalization_checker': 'r-x',
      '@bind_normalization_checker': 'r-x',
    },
    defineProperty: {
      [S_DEFAULT]: '--x',
      '@Object_defineProperty_reader': 'r--',
      '@bind_normalization_checker': 'r-x',
    },
    assign: {
      [S_DEFAULT]: '--x',
      '@Object_assign_reader': 'r-x',
    },
    $prototype$: 'r--',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      '@HTMLElement_prototype_reader': 'r--',
      '@Object_prototype_reader': 'r-x',
      '@window_enumerator': 'r--R-',
      [S_INSTANCE]: {
        $__proto__$: 'rwx',
        $constructor$: 'rwxRW',
        $__defineGetter__$: '-wxRW',
        $__defineSetter__$: '-wxRW',
        $__lookupGetter__$: '-wxRW',
        $__lookupSetter__$: '-wxRW',
        $hasOwnProperty$: {
          [S_DEFAULT]: '-wxRW',
          '@dexie_Object_hasOwnProperty_reader': 'r--',
          '@firebase_auth': 'r--', // module-wise
        },
        $isPrototypeOf$: {
          [S_DEFAULT]: '-wxRW',
          '@firebase_auth': 'r--', // module-wise
        },
        $propertyIsEnumerable$: {
          [S_DEFAULT]: '-wxRW',
          '@firebase_auth': 'r--', // module-wise
        },
        $toLocaleString$: 'rwxRW',
        $toString$: 'rwxRW',
        $valueOf$: {
          [S_DEFAULT]: '-wxRW',
          '@firebase_auth': 'r--', // module-wise
        },
        dummyObjectMethod: '---',
      },
    },
    // Polymer examines 'Object' as a Polymer property descriptor object since vaadin-grid.properties._rowDetailsTemplate has the value 'Object'.
    // Note: The following 5 ACLs are unnecessary if the vaadin-grid element is not defined.
    computed: {
      [S_DEFAULT]: '---',
      '@Polymer_element_mixin': 'r--',
    },
    readOnly: {
      [S_DEFAULT]: '---',
      '@Polymer_element_mixin': 'r--',
    },
    reflectToAttribute: {
      [S_DEFAULT]: '---',
      '@Polymer_element_mixin': 'r--',
    },
    notify: {
      [S_DEFAULT]: '---',
      '@Polymer_element_mixin': 'r--',
    },
    observer: {
      [S_DEFAULT]: '---',
      '@Polymer_element_mixin': 'r--',
    },
  },
  String: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        small: '---', // just for acl verification; Deprecated APIs can be prohibited, of course.
        [Symbol.iterator]: { // acl for a symbol property
          [S_DEFAULT]: 'r-x',
          '@normalization_checker': '---',
        },
      },
    },
  },
  Number: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        toExponential: {
          [S_DEFAULT]: 'r-x',
          '@normalization_checker': '---',
        },
      },
    },
  },
  BigInt: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        $valueOf$: {
          [S_DEFAULT]: '--x',
          '@normalization_checker': '---',
        },
      },
    },
  },
  Boolean: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        $valueOf$: {
          [S_DEFAULT]: '--x',
          '@normalization_checker': '---',
        },
      },
    },
  },
  Symbol: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        description: {
          [S_DEFAULT]: 'r--',
          '@normalization_checker': '---',
        },
        [Symbol.toPrimitive]: { // acl for a symbol property
          [S_DEFAULT]: 'r-x',
          '@normalization_checker': '---',
        },
      },
    },
  },
  Proxy: {
    [S_OBJECT]: {
      [S_DEFAULT]: Policy.setAlias(false),
    },
    revocable: {
      [S_DEFAULT]: Policy.setAlias(true),
    },
    [S_DEFAULT]: '---',
  },
  import: {
    [S_OBJECT]: {
      [S_DEFAULT]: '--x',
    },
    [S_DEFAULT]: '---',
    invalidImportUrl: '---',
    meta: {
      [S_DEFAULT]: function importMetaAcl(normalizedThisArg,
                                          normalizedArgs /* ['property', args], ['property', value], etc. */,
                                          aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                          hookArgs /* [f, thisArg, args, context, newTarget] */,
                                          applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        const contexts = {
          '@es6-module4': true,
          '@es6-module4,f': true,
          '@module1': true,
        };
        if (contexts.hasOwnProperty(aclArgs[5]) && opType === 'r') {
          Policy.trackClass('import.meta', hookArgs[0]()); // TODO: this tracking may be inefficient
          return true;
        }
        return false;
      },
      url: {
        [S_DEFAULT]: '---',
        '@module1': 'r--',
        '@es6-module4': 'r--',
      },
    },
  },
  'import.meta': {
    [S_CHAIN]: () => acl.import.meta,
  },
  require: {
    [S_OBJECT]: {
      [S_DEFAULT]: function requireAcl(normalizedThisArg,
                                       normalizedArgs /* ['require', './module.js'] */,
                                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                                       applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        if (opType === 'x') {
          //console.log('requireAcl: ' + hookArgs[3] + ': require(' + (normalizedArgs[1] ? '\'' + normalizedArgs[1].toString() + '\'' : normalizedArgs[1]) + ') resolved = ' + normalizedArgs[2].toString());
          // recursively apply ACL for the target module for reading
          return applyAcl(normalizedArgs[2], true, true, S_UNSPECIFIED, 'r', hookArgs[3], normalizedThisArg, normalizedArgs, hookArgs);
        }
        else {
          //console.log('requireAcl: ' + hookArgs[3] + ': opType = ' + opType + ' for require');
          return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
        }
      },
    },
    [S_DEFAULT]: '---',
    invalidRequireName: '---',
  },
  navigator: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@normalization_checker': 'r--R-',
      '@normalization_checker_cannot_access_navigator': '---',
    },
    [S_DEFAULT]: 'r--',
    [S_ALL]: '---',
    serviceWorker: '---',
    usb: '---',
    geolocation: '---',
    'a_new_navigator_property': {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rw-',
    },
  },
  // read-only except for manipulators
  location: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@location_setter': 'rw-',
    },
    [S_DEFAULT]: 'r--',
    [S_ALL]: '---',
    reload: {
      [S_DEFAULT]: '---',
      '@route_manipulator': 'r-x',
    },
    $__proto__$: '---',
    href: {
      [S_DEFAULT]: 'r--',
      '@route_manipulator': 'rw-',
    }
  },
  // call-only for manipulators
  history: {
    [S_OBJECT]: 'r--',
    [S_DEFAULT]: 'rwx',
    [S_ALL]: '---',
    replaceState: {
      [S_DEFAULT]: '---',
      '@route_manipulator': '--x',
    },
    pushState: {
      [S_DEFAULT]: '---',
      '@route_manipulator': '--x',
    }
  },
  Worker: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@worker_manipulator': function _WorkerAcl(normalizedThisArg,
                                                 normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                 aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                 hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                 applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        if (opType === 'x') {
          let url = new URL(normalizedArgs[0], hook.parameters.baseURI);
          if (url.protocol === 'blob:' || url.protocol === 'data:') {
            return false;
          }
          if (!url.pathname.match(/\.m?js$/)) {
            return false;
          }
        }
        return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
      },
    },
    [S_DEFAULT]: '---',
    [S_ALL]: '---',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      [S_ALL]: '---',
      [S_INSTANCE]: {
        [S_DEFAULT]: '---',
        '@worker_manipulator': 'rwx',
      },
    },
  },
  SharedWorker: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@shared_worker_manipulator': function _WorkerAcl(normalizedThisArg,
                                                        normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                        aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                        hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                        applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        if (opType === 'x') {
          let url = new URL(normalizedArgs[0], hook.parameters.baseURI);
          if (url.protocol === 'blob:' || url.protocol === 'data:') {
            return false;
          }
          if (!url.pathname.match(/\.m?js$/)) {
            return false;
          }
        }
        return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
      },
    },
    [S_DEFAULT]: '---',
    [S_ALL]: '---',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      [S_ALL]: '---',
      [S_INSTANCE]: {
        [S_DEFAULT]: '---',
        '@shared_worker_manipulator': 'rwx',
      },
    },
  },
  Error: {
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_ALL]: 'r--',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
      $constructor$: {
        [S_DEFAULT]: 'r-x',
        '@custom_error_constructor_creator': 'rwxRW',
        '@firebase_app': 'rwx',
      },
    }
  },
  [S_CHAIN]: () => acl.EventTarget[S_PROTOTYPE][S_INSTANCE], // self instanceof EventTarget;
  // Thus, acl for window.addEventListener should reside at acl.EventTarget[S_PROTOTYPE][S_INSTANCE].addEventListener
  EventTarget: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_ALL]: '---',
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_DEFAULT]: 'r-x',
      '@HTMLElement_prototype_reader': 'r--',
      '@window_enumerator': 'r--R-',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        '@window_enumerator': 'r--R-',
      },
    },
  },
  Node: {
    [S_CHAIN]: () => acl.EventTarget,
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r-x',
    [S_ALL]: '---',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      '@HTMLElement_prototype_reader': 'r--',
      '@Node_prototype_reader': 'r--',
      '@Object_assign_reader': 'r--',
      addEventListener: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      removeEventListener: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      appendChild: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        '@Node_prototype_writer': 'rwxRW',
      },
      removeChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      replaceChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      insertBefore: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      cloneNode: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      getRootNode: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      isConnected: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      dispatchEvent: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      parentElement: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      parentNode: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      nextSibling: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      previousSibling: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      childNodes: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      children: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      firstChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@Node_prototype_reader': 'rwxR-',
      },
      lastChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      textContent: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      innerHTML: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      baseURI: {
        [S_DEFAULT]: 'r--',
        '@Object_assign_reader': 'rw--W',
        '@Node_prototype_reader': 'rw-R-',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      className: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      nextElementSibling: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      previousElementSibling: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      childElementCount: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      firstElementChild: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      lastElementChild: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      activeElement: {
        [S_DEFAULT]: 'r--',
        '@Node_prototype_writer': 'rwxRW',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
        [S_ALL]: '---',
      },
    },
  },
  Text: {
    [S_DEFAULT]: 'r-x',
    [S_CHAIN]: () => acl.Node,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      '@HTMLElement___shady_writer': 'rwxRW',
      '@Node_prototype_writer': 'rwxRW',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx', // TODO: Loose ACL
        '@HTMLElement___shady_writer': 'rwxRW',
      },
    },
  },
  TreeWalker: {
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_DEFAULT]: 'r-x',
        '@TreeWalker_writer': 'rwx',
      },
    },
  },
  Element: {
    [S_DEFAULT]: 'r-x',
    [S_CHAIN]: () => acl.Node,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      '@HTMLElement_prototype_reader': 'r--',
      '@Object_assign_reader': 'r--',
      animate: {
        [S_DEFAULT]: 'r-x',
        '@web_animations_next_lite': 'rwx',
      },
      getAnimations: {
        [S_DEFAULT]: 'r-x',
        '@web_animations_next_lite': 'rwx',
      },
      matches: {
        [S_DEFAULT]: 'r--',
        '@Element_matches_reader': 'r--',
      },
      addEventListener: 'r-x',
      removeEventListener: 'r-x',
      appendChild: 'r-x',
      setAttribute: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      setAttributeNS: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      getAttribute: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      getAttributeNS: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      removeAttribute: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      removeAttributeNS: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      attachShadow: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      insertAdjacentElement: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      append: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      prepend: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      before: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      after: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      slot: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      assignedSlot: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      querySelector: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      querySelectorAll: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      assignedNodes: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      shadowRoot: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      className: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      nextElementSibling: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      previousElementSibling: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      childElementCount: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      firstElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      lastElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      children: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      innerHTML: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      replaceWith: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      remove: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        // Note: This ACL may significantly degrade performance
        innerHTML: function innerHtmlAcl(normalizedThisArg,
                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                         applyAcl /* for recursive application of ACL */) {
          let opType = aclArgs[4];
          let result = 'rw-'[opTypeMap[opType]] === opType;
          if (result) {
            if (opType === 'w') {
              //console.log('set innerHTML: context = ' + hookArgs[3]);
              let stream = new HTMLParser.WritableStream({
                onopentag(name, attributes) {
                  //console.log('set innerHTML: tagName = ' + name);
                  // TODO: Apply ACL for attributes as well with normalization of attributes to properties (mostly identical)
                  result = result && applyAcl('document', true, true, 'createElement', 'x', hookArgs[3], document, ['createElement', [name.toLowerCase()]], hookArgs);
                },
              });
              stream.write(normalizedArgs[1]);
              stream.end();
            }
          }
          return result;
        },
      },
    },
  },
  HTMLElement: {
    [S_DEFAULT]: 'r-x',
    [S_CHAIN]: () => acl.Element,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@HTMLElement_writer': 'rwx',
    },
    $prototype$: {
      [S_DEFAULT]: 'r--',
      '@HTMLElement_prototype_reader': 'r--',
    },
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_ALL]: '---',
      '@HTMLElement_prototype_reader': 'r--',
      [S_DEFAULT]: 'r-x',
      textContent: {
        [S_DEFAULT]: 'rw-',
        '@Node_prototype_writer': 'rwxRW',
      },
      innerHTML: {
        [S_DEFAULT]: '---',
        '@HTMLElement_prototype_reader': 'r--R-',
        '@Node_prototype_writer': 'rwxRW',
      },
      blur: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwx',
      },
      __shady: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement___shady_writer': 'rwx',
        '@Object_assign_reader': 'rwx',
      },
      insertAdjacentElement: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      type: 'rw-',
      __dataHost: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement___dataHost_writer': 'rwx',
      },
      __domApi: {
        [S_DEFAULT]: 'r-x',
        '@Event___domApi_writer': 'rwx',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        $__proto__$: {
          [S_DEFAULT]: 'r--',
          '@HTMLElement_proto_writer': 'rw-',
        },
      },
    },
  },
  HTMLVideoElement: {
    [S_CHAIN]: () => acl.HTMLMediaElement,
  },
  HTMLUnknownElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLUListElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTrackElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTitleElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTimeElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTextAreaElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTemplateElement: {
    [S_OBJECT]: 'r-x',
    [S_DEFAULT]: 'r--',
    [S_ALL]: 'r--',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: 'rwx',
      [S_ALL]: '---',
      $__proto__$: {
        [S_DEFAULT]: 'r--',
        '@template_element_prototype_setter': 'rw-',
      },
    },
  },
  HTMLTableSectionElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTableRowElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTableElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTableColElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTableCellElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLTableCaptionElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLStyleElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLSpanElement: {
    [S_CHAIN]: () => acl.HTMLElement,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        'lang': {
          [S_DEFAULT]: 'rw-',
          '@lang_descriptor_reader': 'rw-R-',
        },
      },
    },
  },
  HTMLSourceElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLSlotElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLShadowElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLSelectElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLScriptElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLQuoteElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLProgressElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLPreElement: {
    [S_CHAIN]: () => acl.HTMLElement,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@document_writer': '---',
    },
    '@document_writer': '---',
  },
  HTMLPictureElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLParamElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLParagraphElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLOutputElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLOptionElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLOptGroupElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLObjectElement: {
    [S_CHAIN]: () => acl.HTMLElement,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        contentDocument: {
          [S_DEFAULT]: '---',
          '@svg_contentWindow_accessor': function _svgContentDocumentAcl(normalizedThisArg,
                                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                         applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('data') || !normalizedThisArg.data) {
              return false; // reject on empty data
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg.contentWindow;
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
        contentWindow: {
          [S_DEFAULT]: '---',
          '@svg_contentWindow_accessor': function _svgContentWindowAcl(normalizedThisArg,
                                                                       normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                       applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('data') || !normalizedThisArg.data) {
              return false; // reject on empty data
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg[normalizedArgs[0]]
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
      },
    },
  },
  HTMLOListElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLModElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMeterElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMetaElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMenuElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMediaElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMarqueeElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLMapElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLLinkElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLLegendElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLLabelElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLLIElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLInputElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLImageElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLIFrameElement: {
    [S_CHAIN]: () => acl.HTMLElement,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        addEventListener: {
          [S_DEFAULT]: '---',
          '@iframe_contentWindow_accessor': function _iframeAddEventListenerAcl(normalizedThisArg,
                                                                                normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                                aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                                hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                                applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (opType === 'x') {
              if (normalizedArgs[1] && normalizedArgs[1][0] === 'load') {
                if (!normalizedThisArg.src) {
                  normalizedThisArg.src = emptyDocumentURL;
                }
                if (hookArgs[0] === '()' || hookArgs[0] === '#()') {
                  if (hookArgs[1] === normalizedThisArg && hookArgs[2][1][0] === 'load') {
                    let onloadAttribute = normalizedThisArg.getAttribute('onload');
                    if (onloadAttribute && 
                        (onloadAttribute.startsWith('event.target.contentDocument.write(') ||
                         onloadAttribute.startsWith('let iframe = this; fetch(new Request('))) {
                      hookArgs[2][1][0] = 'srcdoc-load';
                    }
                    if (hook.parameters.scriptHashes && normalizedThisArg.src.startsWith(hook.parameters.emptyDocumentUrl.href)) {
                      hookArgs[2][1][0] = 'srcdoc-load';
                    }
                  }
                }
              }
            }
            return 'r-x'[opTypeMap[opType]] === opType; // equivalent to 'r-x' acl
          },
        },
        onload: {
          [S_DEFAULT]: '---',
          '@iframe_contentWindow_accessor': function _iframeOnloadAcl(normalizedThisArg,
                                                                      normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                      aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                      hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                      applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (opType === 'w') {
              if (hookArgs[1] === normalizedThisArg && hookArgs[2][0] === normalizedArgs[0]) {
                let onloadAttribute = normalizedThisArg.getAttribute('onload');
                if (onloadAttribute && 
                    (onloadAttribute.startsWith('event.target.contentDocument.write(') ||
                     onloadAttribute.startsWith('let iframe = this; fetch(new Request('))) {
                  hookArgs[2][0] = '_onload'; // dummy to avoid overriding the existing onload event converted from srcdoc
                  normalizedThisArg.addEventListener('srcdoc-load', hookArgs[2][1]); // Redirect to srcdoc-load
                }
              }
            }
            return 'rw-'[opTypeMap[opType]] === opType; // equivalent to 'rw-' acl
          },
        },
        contentDocument: {
          [S_DEFAULT]: '---',
          '@iframe_contentWindow_accessor': function _iframeContentDocumentAcl(normalizedThisArg,
                                                                               normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                               aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                               hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                               applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
              return false; // reject on empty src
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg.contentWindow;
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
        contentWindow: {
          [S_DEFAULT]: '---',
          '@iframe_contentWindow_accessor': function _iframeContentWindowAcl(normalizedThisArg,
                                                                             normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                             aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                             hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                             applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
              return false; // reject on empty src
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg[normalizedArgs[0]]
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
      },
    },
  },
  HTMLHtmlElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLHeadingElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLHeadElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLHRElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLFrameSetElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLFrameElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLFormElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLFontElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLFieldSetElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLEmbedElement: {
    [S_CHAIN]: () => acl.HTMLElement,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        contentDocument: {
          [S_DEFAULT]: '---',
          '@svg_contentWindow_accessor': function _svgContentDocumentAcl(normalizedThisArg,
                                                                         normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                         aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                         hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                         applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
              return false; // reject on empty src
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg.contentWindow;
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
        contentWindow: {
          [S_DEFAULT]: '---',
          '@svg_contentWindow_accessor': function _svgContentWindowAcl(normalizedThisArg,
                                                                       normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                                       applyAcl /* for recursive application of ACL */) {
            let opType = aclArgs[4];
            if (!normalizedThisArg.getAttribute('src') || !normalizedThisArg.src) {
              return false; // reject on empty src
            }
            if (this.contentWindow && !this.contentWindow.__hook__) {
              return false; // reject on missing hook infrastructure
            }
            if (opType === 'r') {
              let contentWindow = normalizedThisArg[normalizedArgs[0]]
              otherWindowObjects.set(contentWindow.Object, contentWindow);
              otherWindowObjectsStatus.set = true;
            }
            return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
          },
        },
      },
    },
  },
  HTMLDivElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDirectoryElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDialogElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDetailsElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDataListElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDataElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLDListElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLContentElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLCanvasElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLButtonElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLBodyElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLBaseElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLBRElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLAudioElement: {
    [S_CHAIN]: () => acl.HTMLMediaElement,
  },
  HTMLAreaElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  HTMLAnchorElement: {
    [S_CHAIN]: () => acl.HTMLElement,
  },
  Array: {
    [S_DEFAULT]: 'r-x',
    '@super_normalization_checker': '---',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: 'rwx',
      map: {
        [S_DEFAULT]: 'r-x',
        '@bind_normalization_checker': 'r--',
      },
      [S_INSTANCE]: {
        [S_DEFAULT]: 'rwxRW',
      },
    },
  },
  Function: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE], // Function is an instance of Function itself
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@Function_reader': 'r-x',
      '@Function_js': 'r-x',
      '@Function_cannotBindFunction': '--x',
      '@normalization_checker': 'r-x',
      '@Polymer_lib': 'r-x',
      '@Object_prototype_reader': 'r--',
    },
    [S_DEFAULT]: 'r-x',
    '@bind_normalization_checker': 'r-x',
    $__proto__$: 'r--',
    $prototype$: 'r--',
    $constructor$: 'r-x',
    [S_PROTOTYPE] : {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_DEFAULT]: 'r-x',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: Policy.defaultAcl(),
        //[S_ALL]: 'r--',
        $__proto__$: 'rw-',
        $prototype$: 'rw-',
        $constructor$: 'r-x',
        apply: 'r-x',
        call: 'r-x',
        bind: {
          [S_DEFAULT]: 'r-x',
          '@bind_normalization_checker': '--x',
        },
      },
    },
  },
  onload: {
    [S_DEFAULT]: 'r-x',
    '@demo_entry_page_scripts': 'rwx',
  },
  Event: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
    [S_DEFAULT]: 'r-x',
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@Object_assign_reader': 'rwx',
    },
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_DEFAULT]: 'r-x',
      __patchProto: {
        [S_DEFAULT]: 'r-x',
        '@Event__target_writer': 'rwx',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        $__proto__$: {
          [S_DEFAULT]: 'rw-', // TODO: Loose ACL
          '@Event__target_writer': 'rwx',
        },
        ja: {
          [S_DEFAULT]: 'r-x',
          '@Event_ja_writer': 'rwx',
        },
        __target: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        za: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        Bb: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        composed: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        composedPath: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        target: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        relatedTarget: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        stopPropagation: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        stopImmediatePropagation: {
          [S_DEFAULT]: 'r-x',
          '@Event_composed_writer': 'rwxRW',
        },
        __target: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        za: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        __target: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        za: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        __target: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
        za: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
      },
    },
  },
  UIEvent: {
    [S_CHAIN]: () => acl.Event,
  },
  CustomEvent: {
    [S_CHAIN]: () => acl.Event,
    [S_DEFAULT]: 'r-x',
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@Object_assign_reader': 'rwx',
    },
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      $__proto__$: {
        [S_DEFAULT]: 'r--',
        '@Event__target_writer': 'rw-',
      },
      __patchProto: {
        [S_DEFAULT]: 'r--',
        '@Event__target_writer': 'rw-',
      },
      composed: {
        [S_DEFAULT]: 'r--',
        '@Event_composed_writer': 'rw-',
      },
      composedPath: {
        [S_DEFAULT]: 'r--',
        '@Event_composed_writer': 'rw-RW',
        '@Event_composedPath_executor': 'rwx',
      },
      stopPropagation: {
        [S_DEFAULT]: 'r-x',
        '@Event_composed_writer': 'rwx',
      },
      stopImmediatePropagation: {
        [S_DEFAULT]: 'r-x',
        '@Event_composed_writer': 'rwx',
      },
      target: {
        [S_DEFAULT]: 'r--',
        '@Event_composed_writer': 'rw-',
      },
      relatedTarget: {
        [S_DEFAULT]: 'r--',
        '@Event_composed_writer': 'rw-',
      },
      __target: {
        [S_DEFAULT]: 'r--',
        '@Event__target_writer': 'rw-',
      },
      ja: {
        [S_DEFAULT]: 'r--',
        '@Event_ja_writer': 'rw-',
      },
      za: {
        [S_DEFAULT]: 'r--',
        '@Event__target_writer': 'rw-',
      },
      Bb: {
        [S_DEFAULT]: 'r--',
        '@Event__target_writer': 'rw-',
      },
      ya: {
        [S_DEFAULT]: 'r--',
        '@Event_ya_writer': 'rw-',
      },
    },
  },
  FocusEvent: {
    [S_CHAIN]: () => acl.UIEvent,
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      $__proto__$: {
        [S_DEFAULT]: 'r-x',
        '@Event__target_writer': 'rwx',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        composed: {
          [S_DEFAULT]: 'r--',
          '@Event_composed_writer': 'rw-RW',
        },
        currentTarget: {
          [S_DEFAULT]: 'r--',
          '@FocusEvent_currentTarget_writer': 'rwxRW',
        },
        eventPhase: {
          [S_DEFAULT]: 'r--',
          '@FocusEvent_currentTarget_writer': 'rwxRW',
        },
      },
    },
  },
  MouseEvent: {
    [S_CHAIN]: () => acl.UIEvent,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
      },
    },
  },
  WheelEvent: {
    [S_CHAIN]: () => acl.MouseEvent,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
      },
    },
  },
  AnimationEvent: {
    [S_CHAIN]: () => acl.Event,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
      },
    },
  },
  KeyboardEvent: {
    [S_CHAIN]: () => acl.UIEvent,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@Event__target_writer': 'rwx',
        },
      },
    },
  },
  DocumentFragment: {
    [S_CHAIN]: () => acl.Node,
    [S_DEFAULT]: 'r-x',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      $__proto__$: {
        [S_DEFAULT]: 'r--',
        '@DocumentFragment_$__proto__$_writer': 'rw-',
      },
      querySelector: {
        [S_DEFAULT]: '--x',
        '@Node_prototype_writer': 'rwxRW',
        '@DocumentFragment_querySelector_reader': 'r-x',
      },
      querySelectorAll: {
        [S_DEFAULT]: '--x',
        '@Node_prototype_writer': 'rwxRW',
        '@DocumentFragment_querySelectorAll_reader': 'r-x',
        '@DocumentFragment_querySelector_reader': 'r-x',
      },
      childElementCount: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      firstElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      lastElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      children: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      append: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        '@Node_prototype_writer': 'rwxRW',
      },
      prepend: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
        '@Node_prototype_writer': 'rwxRW',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'rwx',
        $__proto__$: {
          [S_DEFAULT]: 'r-x',
          '@DocumentFragment_$__proto__$_writer': 'rwx',
        },
        _renderRoot: {
          [S_DEFAULT]: 'r-x',
          '@Object_assign_reader': 'rwx',
        },
        addEventListener: {
          [S_DEFAULT]: 'r-x',
          '@Object_assign_reader': 'rwx',
        },
        removeEventListener: {
          [S_DEFAULT]: 'r-x',
          '@Object_assign_reader': 'rwx',
        },
        getElementById: {
          [S_DEFAULT]: 'r-x',
          '@Object_assign_reader': 'rwx',
        },
        childNodes: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        children: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        childElementCount: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstChild: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastChild: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        textContent: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        firstElementChild: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        lastElementChild: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        innerHTML: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
        activeElement: {
          [S_DEFAULT]: 'rwx',
          '@Node_prototype_writer': 'rwxRW',
        },
      },
    },
  },
  Date: {
    [S_DEFAULT]: 'r-x',
    now: {
      [S_DEFAULT]: 'r-x',
      '@bind_normalization_checker': 'r--',
    },
  },
  Math: {
    [S_DEFAULT]: 'r-x',
    PI: {
      [S_DEFAULT]: 'r--',
      '@normalization_checker': 'r--R-',
    },
  },
  Crypto: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      getRandomValues: '---',
      subtle: '---',
      [S_INSTANCE]: {
        getRandomValues: '--x',
        subtle: {
          [S_CHAIN]: () => acl.SubtleCrypto[S_PROTOTYPE][S_INSTANCE],
        },
      },
    },
  },
  crypto: {
    [S_CHAIN]: () => acl.Crypto[S_PROTOTYPE][S_INSTANCE],
  },
  SubtleCrypto: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_DEFAULT]: '---',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r-x',
      },
    },
  },
  btoa: {
    [S_DEFAULT]: 'r-x',
    '@normalization_checker': '---',
    '@bind_normalization_checker': 'r--',
  },
  setTimeout: {
    [S_DEFAULT]: 'r-x',
    '@setTimeout_reader': 'r-x',
    '@firebase_app': 'r-x',
    '@process_browser_js': 'r-x',
  },
  Document: {
    [S_CHAIN]: () => acl.Node,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
      createElement: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      createElementNS: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      importNode: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      getElementById: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      querySelector: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      querySelectorAll: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      childElementCount: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      firstElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      lastElementChild: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      children: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      activeElement: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
      append: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      prepend: {
        [S_DEFAULT]: 'r-x',
        '@HTMLElement_insertAdjacentElement_writer': 'rwxRW',
      },
      _activeElement: {
        [S_DEFAULT]: 'r-x',
        '@Node_prototype_writer': 'rwxRW',
      },
    },
  },
  HTMLDocument: {
    [S_CHAIN]: () => acl.Document,
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        __shady: {
          [S_DEFAULT]: 'r-x',
          '@HTMLElement___shady_writer': 'rwx',
        },
      },
    },
  },
  document: {
    [S_CHAIN]: () => acl.HTMLDocument[S_PROTOTYPE][S_INSTANCE],
    [S_OBJECT]: 'r--',
    [S_DEFAULT]: 'r-x',
    write: {
      [S_DEFAULT]: '---',
      // TODO: Apply ACL for tags in HTML like in Element.innerHTML ACL
      '@document_writer': '--x',
    },
    timeline: {
      [S_DEFAULT]: 'r-x',
      '@web_animations_next_lite': 'rwxRW',
    },
    createElement: {
      [S_DEFAULT]: function createElementAcl(normalizedThisArg,
                                             normalizedArgs /* ['property', args], ['property', value], etc. */,
                                             aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                             hookArgs /* [f, thisArg, args, context, newTarget] */,
                                             applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        let result = (aclArgs[5] === '@document_createElement_reader' ? 'r-x' : '--x')[opTypeMap[opType]] === opType;
        if (result) {
          if (opType === 'x') {
            //console.log('document.createElement: tagName = ' + normalizedArgs[1][0] + ' context = ' + hookArgs[3]);
            // This ACL can be forwarded to its corresponding HTMLElement subclass ACL or a custom element ACL like the following
            let tag = normalizedArgs[1][0].toLowerCase();
            let name;
            if (tagToElementClass.hasOwnProperty(tag)) {
              name = tagToElementClass[tag];
            }
            if (!name) {
              if (tag.indexOf('-') < 0) {
                // Supplement missing tag in the table for the next lookup
                name = tagToElementClass[tag] = document.createElement(tag).constructor.name;
                console.log('createElementAcl: Supplement the missing tag "' + tag + '" with "' + tagToElementClass[tag] + '" in tagToElementClass table');
              }
              else {
                // Custom Elements with hyphen(s) in the name
                // Note: Use the custom element name itself as its virtual object name in ACL here for now.
                //       The name can be customized such as 'CustomElement:tag-name' to avoid name conflicts in ACL.
                // Note: The custom element may not be defined yet.
                name = tag;
              }
            }
            // Apply ACL for the element class
            result = applyAcl(name, true, true, S_UNSPECIFIED, 'x', hookArgs[3], HTMLElement /* TODO: More appropriate normalizedThisArg */, [], hookArgs);
          }
        }
        return result;
      },
    },
    createElementNS: {
      [S_DEFAULT]: function createElementNSAcl(normalizedThisArg,
                                               normalizedArgs /* ['property', args], ['property', value], etc. */,
                                               aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                               hookArgs /* [f, thisArg, args, context, newTarget] */,
                                               applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        let result = '--x'[opTypeMap[opType]] === opType;
        if (result) {
          if (opType === 'x') {
            // This ACL can be forwarded to its corresponding HTMLElement subclass ACL or a custom element ACL like the following
            let tag = normalizedArgs[1][1].toLowerCase();
            let name;
            if (tagToElementClass.hasOwnProperty(tag)) {
              name = tagToElementClass[tag];
            }
            if (!name) {
              if (tag.indexOf('-') < 0) {
                // Supplement missing tag in the table for the next lookup
                name = tagToElementClass[tag] = document.createElementNS(normalizedArgs[1][0], tag).constructor.name;
                console.log('createElementNSAcl: Supplement the missing tag "' + tag + '" with "' + tagToElementClass[tag] + '" in tagToElementClass table');
              }
              else {
                // Custom Elements with hyphen(s) in the name
                // Note: Use the custom element name itself as its virtual object name in ACL here for now.
                //       The name can be customized such as 'CustomElement:tag-name' to avoid name conflicts in ACL.
                // Note: The custom element may not be defined yet.
                name = tag;
              }
            }
            // Apply ACL for the element class
            result = applyAcl(name, true, true, S_UNSPECIFIED, 'x', hookArgs[3], HTMLElement /* TODO: More appropriate normalizedThisArg */, [], hookArgs);
          }
        }
        return result;
      },
    },
    __handlers: {
      [S_DEFAULT]: 'r-x',
      '@Event_composedPath_executor': 'rwx',
    },
    __CE_hasRegistry: {
      [S_DEFAULT]: 'r-x',
      '@Object_assign_reader': 'rwx',
    },
  },
  // Custom Elements
  customElements: {
    [S_CHAIN]: () => acl.Object[S_PROTOTYPE][S_INSTANCE],
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@customElements_reader': 'r--',
      '@Event___domApi_writer': 'r--',
      '@Polymer_lib': 'r--',
      '@Object_assign_reader': 'rwxRW', // webcomponents-lite.js
      "@lit-html": 'r--',
      "@module1": 'r--',
      "@spectrum-web-components/button": 'r--',
      "@spectrum-web-components/theme": 'r--',
    },
    [S_DEFAULT]: '---',
    define: {
      [S_DEFAULT]: '---',
      '@Object_assign_reader': 'rwx',
      '@customElements_reader': 'rwx',
      '@module1': 'r-x', // TODO: integrate with customElementsDefineAcl()
      "@spectrum-web-components/button": 'r-x',
      "@spectrum-web-components/theme": 'r-x',
      '@Polymer_lib': function customElementsDefineAcl(normalizedThisArg,
                                                       normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                       aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                       hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                       applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        let args = normalizedArgs[1];
        if (opType === 'x') {
          let name = args[0];
          let ctor = args[1];
          let base = Object.getPrototypeOf(ctor);
          //console.log('customElementsDefineAcl context = ' + hookArgs[3] + ' element name = ' + name);
          if (!Reflect.has(acl, name)) {
            const baseElementsMap = {
              PolymerGenerated: 'Polymer.LegacyElement',
              PolymerElement: 'Polymer.Element',
              HTMLElement: 'HTMLElement',
              // Element is omitted
              Function: 'Function',
              Object: 'Object',
            };
            let proto = Object.getPrototypeOf(ctor);
            while (proto && !Reflect.has(baseElementsMap, proto.name)) {
              proto = Object.getPrototypeOf(proto);
            }
            // Register acl[name], chained to the base class
            if (proto && Reflect.has(baseElementsMap, proto.name)) {
              Policy.trackClass(baseElementsMap[proto.name], proto);
              acl[name] = Object.create(acl[baseElementsMap[proto.name]]);
            }
            else {
              acl[name] = Object.create(acl.HTMLElement);
            }
          }
          return Policy.trackClass(name, ctor); // synchronous just before definition
        }
        else {
          return false;
        }
      },
    },
    get: {
      [S_DEFAULT]: '--x',
      '@Object_assign_reader': 'r-x',
      '@module1': 'r-x',
    },
    whenDefined: {
      [S_DEFAULT]: '--x',
    },
    forcePolyfill: {
      [S_DEFAULT]: '---',
      '@Object_assign_reader': 'r--',
    },
    polyfillWrapFlushCallback: {
      [S_DEFAULT]: '---',
      '@Object_assign_reader': 'rwx',
      '@Event___domApi_writer': 'r-x',
      "@lit-html": "r--",
    },
    '@Object_assign_reader': 'rwx',
    '@customElements_reader': 'r--',
  },
  Polymer: {
    [S_DEFAULT]: 'rwx', // TODO: Loose ACL
    '@Polymer_lib': 'rwxRW', // TODO: Loose ACL
  },
  // Example base policy for custom elements generated via the Polymer({}) legacy method
  'Polymer.LegacyElement': { // virtual name
    [S_CHAIN]: () => acl.HTMLElement, // TODO: should be Polymer.Element virtual object
    [S_OBJECT]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: 'r-x',
    },
    '@Polymer_element_mixin': 'rwx',
    '@iron-a11y-announcer': 'rw-',
    '@Polymer_lib': 'rwx',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_DEFAULT]: '---',
      $__proto__$: {
        [S_DEFAULT]: '---',
        '@Polymer_element_mixin': 'rw-',
      },
      $constructor$: {
        [S_DEFAULT]: '---',
        '@customElements_reader': 'r--',
        '@Object_assign_reader': 'r--',
        '@Polymer_element_mixin': 'r--',
        '@Node_prototype_reader': 'r--',
        '@Polymer_property_effects': 'r--',
      },
      '@Polymer_element_mixin': 'rwx',
      '@Polymer_legacy_element_mixin': 'rwx',
      '@Polymer_property_effects': 'rwx',
      '@Polymer_property_accessors': 'rwxRW',
      '@Polymer_legacy_class': 'rwx',
      '@iron-a11y-keys-behavior': 'rwx',
      '@customElements_reader': 'r--',
      '@HTMLElement_proto_writer' : 'r--',
      type: {
        [S_DEFAULT]: '---',
        '@Polymer_property_accessors': 'rwxRW',
      },
      _template: {
        [S_DEFAULT]: '---',
        '@Polymer_legacy_class': 'rwx',
        '@Polymer_element_mixin': 'rwx',
      },
      is: 'r--',
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        // TODO: Loose ACL. Policies can be defined per property.
        [S_DEFAULT]: 'rwx',
        nodeType: 'r--',
        '@Polymer_element_mixin': 'rwx',
        '@Polymer_legacy_element_mixin': 'rwx',
        '@Polymer_legacy_class': 'rwx',
        '@Polymer_property_effects': 'rwx',
        '@Polymer_property_accessors': 'rwx',
        '@Event___domApi_writer': 'rwx',
        '@DocumentFragment_querySelector_reader': 'r-x',
        '@customElement_localName_reader': 'r--',
        '@Object_assign_reader': 'rwx',
        '@Polymer_lib': 'rwx',
        '@customElements_reader': 'r-x',
        '@webcomponents-lite': 'rwx',
        '@HTMLElement___shady_writer': 'rwx',
        '@FocusEvent_currentTarget_writer': 'rwx',
      },
    },
  },
  'Polymer.Element': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'], // TODO: Define specific ACL for Polymer.Element
  },
  'i18n-attr-repo': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      isLocalizableAttribute: {
        [S_DEFAULT]: '---',
        '@i18n-behavior': '--x',
      },
      _created: {
        [S_DEFAULT]: '---',
        '@i18n-behavior': '--x',
      },
    },
  },
  'i18n-number': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      resolveUrl: {
        [S_DEFAULT]: '---',
        '@i18n-number': '--x',
      },
    },
  },
  'i18n-behavior': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      _fetchStatus: {
        [S_DEFAULT]: '---',
        '@i18n-behavior': 'rw-',
      },
    },
  },
  'my-app': {
    [S_CHAIN]: () => acl['i18n-behavior'],
  },
  'my-view1': {
    [S_CHAIN]: () => acl['i18n-behavior'],
  },
  'my-view2': {
    [S_CHAIN]: () => acl['i18n-behavior'],
  },
  'my-view3': {
    [S_CHAIN]: () => acl['i18n-behavior'],
  },
  'live-localizer-model': {
    [S_CHAIN]: () => acl['i18n-behavior'],
  },
  'live-localizer-firebase-storage': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        model: {
          [S_DEFAULT]: 'rw-', // TODO: Loose ACL
          '@Polymer_property_accessors': 'rw-RW',
        },
      },
    },
  },
  'live-localizer-storage-view': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
      },
    },
  },
  'live-localizer-main': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
  },
  'live-localizer-panel': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
  },
  'live-localizer-dialog': {
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
  },
  'live-localizer': {
    [S_DEFAULT]: 'r-x',
    [S_CHAIN]: () => acl['Polymer.LegacyElement'],
    [S_OBJECT]: {
      [S_CHAIN]: S_CHAIN,
      '@document_writer': '---',
    },
    '@document_writer': '---',
    [S_PROTOTYPE]: {
      [S_CHAIN]: S_CHAIN,
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: 'r--',
        '@live-localizer-lazy': 'rwx',
        tagName: {
          [S_DEFAULT]: '---',
          '@iron-location': 'r--',
        },
        '@cache_automation': 'r--',
      },
    },
  },
  BehaviorsStore: {
    [S_DEFAULT]: 'r--',
    '@i18n-behavior': 'rwxRW',
    '@draggable-behavior': 'rwxRW',
    _I18nAttrRepo: {
      [S_DEFAULT]: 'r-x',
      '@i18n-behavior': function _I18nAttrRepoAcl(normalizedThisArg,
                                                  normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                  aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                  hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                  applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        if (opType === 'w') {
          Policy.trackClass('BehaviorsStore._I18nAttrRepo', normalizedArgs[1]);
        }
        return 'rwx'[opTypeMap[opType]] === opType; // equivalent to 'rwx' acl
      },
    },
  },
  'BehaviorsStore._I18nAttrRepo': {
    [S_DEFAULT]: 'r-x',
    '@i18n-behavior': 'rwx',
    '@Polymer_legacy_class': 'r-xR-',
  },
  // accessible private API
  DClass: 'rwx',
  // blocked private API
  DummyClass: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': '-w-',
    },
    [S_DEFAULT]: '---',
  },
  DummyClass2: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@normalization_checker': 'rwx',
    },
    [S_DEFAULT]: 'r-x',
    isDummy: '---',
    dummyMethod: '---',
    dummyMethod2: 'r--',
  },
  DummyClass3: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rwx',
    },
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rwx',
    staticMethod: {
      [S_DEFAULT]: '---',
      '@normalization_checker': '--x',
    },
    staticProperty: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rw-',
    },
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'r--',
      prototypeProperty: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rw-',
      },
      prototypeProperty2: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'r--',
      },
      [S_INSTANCE]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rwx',
        instanceMethod: {
          [S_DEFAULT]: '---',
          '@normalization_checker': '--x',
        },
        instanceProperty: {
          [S_DEFAULT]: '---',
          '@normalization_checker': 'rw-',
        },
      },
    },
  },
  DummyObject1: {
    [S_DEFAULT]: '---',
    [S_ALL]: '---',
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': '-w--W', // write-only to throw on reading
    },
  },
  BaseClass1: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rwx',
      '@XClass1_constructor': 'rwx',
    },
    [S_DEFAULT]: '---',
    staticMethod: {
      [S_DEFAULT]: '---',
      '@normalization_checker': '--x',
    },
    staticProperty: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rw-',
    },
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      [S_INSTANCE]: {
        [S_DEFAULT]: '---',
        $__proto__$: {
          [S_DEFAULT]: '---',
          '@normalization_checker': 'r--',
        },
        instanceMethod: {
          [S_DEFAULT]: '---',
          '@normalization_checker': '--x',
        },
        instanceProperty: {
          [S_DEFAULT]: '---',
          '@XClass1_constructor': 'rw-',
          '@normalization_checker': 'rw-',
        },
      },
    },
  },
  SubClass1: {
    [S_CHAIN]: () => acl.BaseClass1,
    staticProperty: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': 'r--',
    },
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.BaseClass1[S_PROTOTYPE],
      [S_INSTANCE]: {
        [S_CHAIN]: (path /* [ [acl, 'acl'], [acl.SubClass1, 'SubClass1'], [acl.SubClass1[S_PROTOTYPE], S_PROTOTYPE], [acl.SubClass1[S_PROTOTYPE][S_INSTANCE], S_INSTANCE] ] */) => 
          path[path.length - 2][0].__proto__[path[path.length - 1][1]], // equivalent to acl.BaseClass1[S_PROTOTYPE].__proto__[S_INSTANCE]
        instanceProperty: {
          [S_CHAIN]: S_CHAIN, // alias for (path) => path[path.length - 2][0].__proto__[path[path.length - 1][1]]
          '@normalization_checker': 'r--', // override
        },
      },
    },
  },
  SubClass2: {
    [S_CHAIN]: () => acl.SubClass1,
    staticProperty: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': 'rw-', // override SubClass1's 'r--' acl
    },
    staticMethod: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': '---', // override BaseClass1's '--x' acl
    },
  },
  SubClass3: {
    [S_CHAIN]: () => acl.SubClass2,
    staticProperty: {
      [S_CHAIN]: S_CHAIN,
      // ABAC policy by a function with raw parameters
      '@normalization_checker': function plainAcl(normalizedThisArg,
                                                  normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                  aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                  hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                  applyAcl /* for recursive application of ACL */) {
        let opType = aclArgs[4];
        return 'r--'[opTypeMap[opType]] === opType; // equivalent to 'r--' acl
      },
    },
    staticProperty2: {
      [S_DEFAULT]: '---',
      '@normalization_checker': Policy.acl('r--'), // plain policy function equivalent to 'r--' acl
    },
    staticMethod: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': Policy.args("opType === 'x' && typeof args[0] === 'number' && typeof args[1] === 'number' && args[0] > 0 && args[1] > 0"), // check arguments
    },
  },
  SubClass4: {
    [S_CHAIN]: () => acl.SubClass2,
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rwx',
    },
    staticProperty: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': 'r--',
    },
    staticProperty2: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'r--',
    },
    staticMethod: {
      [S_CHAIN]: S_CHAIN,
      '@normalization_checker': Policy.args("opType === 'x' && typeof args[0] === 'number' && typeof args[1] === 'number' && args[0] > 0 && args[1] > 0"), // check arguments
    },
  },
  GlobalObject: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rw-',
    },
    [S_DEFAULT]: '---',
    property: '---',
    method: '---',
    accessor: '---',
  },
  OrphanedGlobalObject: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rw-',
    },
    [S_DEFAULT]: '---',
    property: '---',
    method: '---',
    accessor: '---',
  },
  DefinePropertyGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertyGetterGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertyGetterVolatileGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertyGetterReflectGetGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertyGetterReflectGetExtendedGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertyGetterReflectGetExtendedGlobalClassWithReceiver: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertiesGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertiesGetterGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DefinePropertiesGetterVolatileGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  ReflectSetGlobalClass: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw--W',
  },
  DummyContainer: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@normalization_checker': 'rwxRW',
    },
    [S_DEFAULT]: '---',
    '': 'r--',
    navigator: {
      [S_DEFAULT]: function _copiedNavigatorAcl(normalizedThisArg,
                                                normalizedArgs /* ['property', args], ['property', value], etc. */,
                                                aclArgs /* [name, isStatic, isObject, property, opType, context] */,
                                                hookArgs /* [f, thisArg, args, context, newTarget] */,
                                                applyAcl /* for recursive application of ACL */) {
        // TODO: automate and force this process
        let opType = aclArgs[4];
        let target;
        if (opType === 'r') {
          Policy.trackClass('DummyContainer.navigator', normalizedThisArg[normalizedArgs[0]]);
          return true;
        }
        return false;
      },
      language: {
        [S_DEFAULT]: 'r--',
        '@normalization_checker': '---',
      },
    },
  },
  'DummyContainer.navigator': {
    [S_DEFAULT]: 'r--', // avoid redundant calls of Policy.trackClass('DummyContainer.navigator', target)
    [S_CHAIN]: () => acl.DummyContainer.navigator,
  },
  UniterableArray: {
    [S_DEFAULT]: 'rwx',
    [S_ALL]: '---',
  },
  GetterSetterClass: {
    [S_CHAIN]: () => acl.Function[S_PROTOTYPE][S_INSTANCE],
    [S_DEFAULT]: '---',
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@normalization_checker': 'rwx',
      '@GetterSetterClass_creator': 'r-x',
      '@GetterSetterClass_writer': 'r--',
      '@GetterSetterClass_reader': 'r--',
    },
    '@GetterSetterClass': 'rwx',
    staticProperty: {
      [S_DEFAULT]: '---',
      '@GetterSetterClass_creator': 'rw-RW',
      '@GetterSetterClass_writer': 'rw-',
      '@GetterSetterClass_reader': 'r--',
    },
    clonedStaticProperty: {
      [S_DEFAULT]: '---',
      '@GetterSetterClass_creator': 'rw-RW',
      '@GetterSetterClass_writer': 'rw-',
      '@GetterSetterClass_reader': 'r--',
    },
    $prototype$: {
      [S_DEFAULT]: '---',
      '@GetterSetterClass_creator': 'r--',
      '@GetterSetterClass_writer': 'r--', // for verification
      '@GetterSetterClass_reader': 'r--', // for verification
    },
    [S_PROTOTYPE]: {
      [S_CHAIN]: () => acl.Object[S_PROTOTYPE],
      [S_DEFAULT]: '---',
      prototypeProperty: {
        [S_DEFAULT]: '---',
        '@GetterSetterClass_creator': 'rw-RW',
      },
      clonedPrototypeProperty: {
        [S_DEFAULT]: '---',
        '@GetterSetterClass_creator': 'rw-RW',
      },
      [S_INSTANCE]: {
        [S_CHAIN]: S_CHAIN,
        [S_DEFAULT]: '---',
        '@GetterSetterClass': 'rwx',
        prototypeProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rwx',
          '@GetterSetterClass_writer': 'rw-',
          '@GetterSetterClass_reader': 'r--',
        },
        clonedPrototypeProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rwx',
          '@GetterSetterClass_writer': 'rw-',
          '@GetterSetterClass_reader': 'r--',
        },
        instanceProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rw-RW',
          '@GetterSetterClass_writer': 'rw-',
          '@GetterSetterClass_reader': 'r--',
        },
        getInstanceProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'r--',
        },
        setInstanceProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'r--',
        },
        clonedInstanceProperty: {
          [S_DEFAULT]: '---',
          '@GetterSetterClass_creator': 'rw-RW',
          '@GetterSetterClass_writer': 'rw-',
          '@GetterSetterClass_reader': 'r--',
        },
      },
    },
  },
  // 3rd party API
  firebase: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@polymerfire': 'r--',
      '@firebase_app': 'rw-RW',
      '@firebase_auth': 'r--',
    },
    [S_DEFAULT]: '---', // Note: Only @polymerfire can access firebase API
    '@firebase_app': 'rw-',
    '@firebase_auth': 'r--',
    '@firebase_storage': 'r--',
    '@firebase_messaging': 'r--',
    '@firebase_database': 'r--',
    '@firebase_app_initializer': '--x',
    '@polymerfire': 'r-x',
    // TODO: Apply more detailed ACLs to deeper objects in modules
    initializeApp: {
      [S_DEFAULT]: '---', // Note: No others can initialize firebase app
      '@polymerfire': 'r-x', // Note: polymerfire can solely initialize firebase app
    },
  },
  Dexie: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@dexie_js': 'rwxRW',
      '@Dexie_instantiator': 'r-x', // Note: No others can instantiate Dexie
    },
    [S_DEFAULT]: 'r-x',
    '@dexie_js': 'rwxRW',
    [S_PROTOTYPE]: {
      [S_DEFAULT]: '---',
      '@dexie_js': 'rwxRW',
      [S_INSTANCE]: {
        [S_DEFAULT]: 'r-x',
        '@dexie_js': 'rwxRW',
        '@custom_error_constructor_creator': 'rwxRW',
      },
    },
  },
  XliffConv: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@xliff-conv': 'rwxRW',
    },
    [S_DEFAULT]: 'r-x',
    '@xliff-conv': 'rwxRW',
  },
  SequenceEffect: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
    $prototype$: {
      [S_DEFAULT]: 'r--',
      '@web_animations_next_lite': 'rw-',
    }
  },
  GroupEffect: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
    $prototype$: {
      [S_DEFAULT]: 'r--',
      '@web_animations_next_lite': 'rw-',
    }
  },
  jsSHA: {
    [S_DEFAULT]: 'r-x',
    '@sha.js': 'rwx',
  },
  Chart: {
    [S_DEFAULT]: 'r-x',
    '@Chart.min.js': 'rwx',
  },
  Color: {
    [S_DEFAULT]: 'r-x',
    '@Chart.min.js': 'rwx',
  },
  CryptoJS: {
    [S_DEFAULT]: 'r-x',
    '@crypto-js': 'rwx',
  },
  JSCompiler_renameProperty: {
    [S_DEFAULT]: 'r-x',
    '@Polymer_lib': 'rwx',
    "@lit-element": 'rwx',
  },
  plurals: {
    [S_DEFAULT]: 'r-x',
    '@plurals.js': 'rwxRW',
  },
  _cp: {
    [S_DEFAULT]: 'r-x',
    '@plurals.js': 'rwxRW',
  },
  deepcopy: {
    [S_DEFAULT]: 'r-x',
    '@deepcopy': 'rwxRW',
  },
  requestAnimationFrame: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
  },
  Animation: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
  },
  KeyframeEffect: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
  },
  getComputedStyle: {
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwxRW',
  },
  true: { // This is a bug in web-animations-next-lite.min.js that creates window["true"] property
    [S_DEFAULT]: 'r-x',
    '@web_animations_next_lite': 'rwx',
  },
  vaadin: {
    [S_DEFAULT]: 'r-x',
    '@vaadin-grid': 'rwx',
  },
  webpackJsonpFirebase: {
    [S_DEFAULT]: 'r-x',
    '@firebase_app': 'rwx',
  },
  chai: {
    [S_DEFAULT]: 'r-x',
    '@chai_js': 'rwx',
  },
  ES6Promise: {
    [S_DEFAULT]: 'r-x',
    '@Object_assign_reader': 'rwx',
  },
  HTMLImports: {
    [S_DEFAULT]: 'r-x',
    '@Object_assign_reader': 'rwx',
  },
  WebComponents: {
    [S_DEFAULT]: 'r-x',
    '@Object_assign_reader': 'rwx',
  },
  CustomElementRegistry: {
    [S_DEFAULT]: 'r-x',
    '@Object_assign_reader': 'rwx',
  },
  ShadyCSS: {
    [S_DEFAULT]: 'r-x',
    '@Object_assign_reader': 'rwx',
    ApplyShim: {
      [S_DEFAULT]: 'r-x',
      '@apply-shim': 'rwx',
    },
    CustomStyleInterface: {
      [S_DEFAULT]: 'r-x',
      '@custom-style-interface': 'rwx',
    },
  },
  // global variables for demo acl
  a_new_global_variable: {
    [S_DEFAULT]: '---',
    '@normalization_checker': 'rw-',
  },
  __intervalId: {
    [S_DEFAULT]: '---',
    '@document_writer': 'rw-',
  },
  _data3: {
    [S_DEFAULT]: '---',
    '@Object_prototype_reader': 'rwx',
    '@hook_visualizer': 'rw-',
  },
  gA1: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  gX1: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  gU: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  gRestP: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  gA: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  gRestE: {
    [S_DEFAULT]: '---',
    '@spread_js': 'rwxRW',
  },
  _GV1: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV2: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV3: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV4: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV5: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV6: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV7: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV8: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV9: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV10: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV11: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GV12: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GO1: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  _GO2: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  lhsvalues: {
    [S_DEFAULT]: '---',
    '@lhs_js': 'rwxRW',
  },
  gvv: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gvv1: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gvv2: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv0: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv00: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  ga: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gb: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
    '@chai_js': 'r--',
  },
  ga1: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gb1: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gb2: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv2: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv3: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gv4: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  xx: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  uu: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  vv: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  q: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gl: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gc: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gC2: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gC4: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gC: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gC3: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  v2: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
    '@normalization_checker': 'r--',
  },
  v4: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
    '@normalization_checker': 'r--',
  },
  gfunc: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  globalConstant: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  globalVariable: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  globalClass: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  gf: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  ll1: {
    [S_DEFAULT]: '---',
    '@demo_entry_page_scripts': 'rwxRW',
  },
  globalObject: {
    [S_DEFAULT]: 'rw-',
  },
  _global_A: {
    [S_DEFAULT]: '---',
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      '@global_js': 'rwxRW',
      '@global_js_inaccessible': '---',
      '@global_js_accessible': 'rw-',
    },
  },
  tagFunction: {
    [S_DEFAULT]: 'r-x',
    '@normalization_checker': '-w--W',
  },
  onerror: {
    [S_DEFAULT]: 'rw-',
  },
  origin: {
    [S_DEFAULT]: 'r--',
  },
  locationbar: {
    [S_DEFAULT]: 'r-x',
  },
  menubar: {
    [S_DEFAULT]: 'r-x',
  },
  personalbar: {
    [S_DEFAULT]: 'r-x',
  },
  scrollbars: {
    [S_DEFAULT]: 'r-x',
  },
  statusbar: {
    [S_DEFAULT]: 'r-x',
  },
  toolbar: {
    [S_DEFAULT]: 'r-x',
  },
  external: {
    [S_DEFAULT]: 'r-x',
  },
  screen: {
    [S_DEFAULT]: 'r-x',
  },
  innerWidth: {
    [S_DEFAULT]: 'r--',
  },
  innerHeight: {
    [S_DEFAULT]: 'r--',
  },
  scrollX: {
    [S_DEFAULT]: 'r--',
  },
  pageXOffset: {
    [S_DEFAULT]: 'r--',
  },
  scrollY: {
    [S_DEFAULT]: 'r--',
  },
  pageYOffset: {
    [S_DEFAULT]: 'r--',
  },
  screenX: {
    [S_DEFAULT]: 'r--',
  },
  screenY: {
    [S_DEFAULT]: 'r--',
  },
  outerWidth: {
    [S_DEFAULT]: 'r--',
  },
  outerHeight: {
    [S_DEFAULT]: 'r--',
  },
  devicePixelRatio: {
    [S_DEFAULT]: 'r--',
  },
  clientInformation: {
    [S_CHAIN]: () => acl.navigator,
  },
  event: {
    [S_DEFAULT]: 'r--',
  },
  offscreenBuffering: {
    [S_DEFAULT]: 'r--',
  },
  screenLeft: {
    [S_DEFAULT]: 'r--',
  },
  screenTop: {
    [S_DEFAULT]: 'r--',
  },
  performance: {
    [S_DEFAULT]: 'r-x',
  },
  visualViewport: {
    [S_DEFAULT]: 'r-x',
  },
  // bundled modules
  '/components/thin-hook/node_modules/xliff-conv/xliff-conv.js': {
    [S_DEFAULT]: 'r-x',
    xliffStates: '---',
  },
  '/components/thin-hook/demo/commonjs2.js': {
    [S_DEFAULT]: 'r--', // add() is not executable
  },
  '/components/thin-hook/node_modules/path-browserify/index.js': {
    [S_DEFAULT]: 'r-x',
    join: {
      [S_DEFAULT]: '--x',
      '@path_join_prohibited': '---',
    },
  },
  '/components/thin-hook/node_modules/tty-browserify/index.js': {
    [S_DEFAULT]: 'r-x',
    '@tty_prohibited': '---',
  },
  './es6-module.js': { // module namespace object
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@es6-module': 'rw-RW',
      '@es6-module2': 'rw-RW',
      '@es6-module3': 'rw-R-',
      '@es6-module4': 'rw-R-',
      '@Module_importer': 'r--RW',
    },
    [S_DEFAULT]: {
      [S_DEFAULT]: 'r-x',
      '@es6-module': 'rwxRW',
      '@es6-module2': 'r-xR-',
      '@es6-module3': 'r-xR-',
      '@Module_importer': 'r-xR-',
    },
    [S_ALL]: {
      [S_DEFAULT]: 'r--R-',
    },
    default: { // default export
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-x',
        '@es6-module': 'rw-RW',
        '@es6-module2': 'r-xRW',
        '@es6-module3': 'rw-RW',
        '@es6-module4': 'rw-R-',
        '@Module_importer': 'r-xRW',
      },
      [S_DEFAULT]: {
        [S_DEFAULT]: 'r-x',
        '@es6-module': 'rwxRW',
        '@es6-module2': 'r-x',
        '@es6-module4': 'rw-R-',
        '@Module_importer': 'r-xRW',
      },
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'r-x',
          '@es6-module': 'rwx',
          '@es6-module2': 'rwx',
          '@es6-module4': 'rwx',
          '@Module_importer': 'rwx',
        },
      },
    },
    MutatableClass: { // named export
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-xRW',
        '@es6-module': 'rw-RW',
        '@es6-module2': 'r-xRW',
        '@Module_importer': 'r-xRW',
      },
      [S_DEFAULT]: {
        [S_DEFAULT]: 'r-x',
        '@es6-module': 'rwxRW',
        '@es6-module2': 'r-x',
        '@Module_importer': 'r-xRW',
      },
    },
    Class1: { // named export
      [S_OBJECT]: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rwx',
        '@XClass1_constructor': 'rwx',
      },
      [S_DEFAULT]: '---',
      staticMethod: {
        [S_DEFAULT]: '---',
        '@normalization_checker': '--x',
      },
      staticProperty: {
        [S_DEFAULT]: '---',
        '@normalization_checker': 'rw-',
      },
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_INSTANCE]: {
          [S_DEFAULT]: '---',
          instanceMethod: {
            [S_DEFAULT]: '---',
            '@normalization_checker': '--x',
          },
          instanceProperty: {
            [S_DEFAULT]: '---',
            '@XClass1_constructor': 'rw-',
            '@normalization_checker': 'rw-',
          },
        },
      },
    },
  },
  './es6-module2.js': {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@es6-module2': 'r--RW',
      '@es6-module3': 'r--RW',
      '@Module_importer': 'r--RW',
    },
    [S_DEFAULT]: {
      [S_DEFAULT]: 'r-x',
      '@es6-module': 'rwxRW',
      '@es6-module2': 'rwxRW',
      '@es6-module3': 'rwxRW',
      '@es6-module4': 'r-xRW',
      '@Module_importer': 'rwxRW',
    },
    es6Module: {
      [S_PROXY]: () => acl['./es6-module.js'],
    },
    T3: {
      [S_PROXY]: () => acl['./es6-module.js'].default,
    },
  },
  './es6-module3.js': {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-x',
      '@es6-module3': 'rw-RW',
    },
    [S_DEFAULT]: {
      [S_DEFAULT]: 'r-x',
      '@es6-module3': 'rwxRW',
    },
  },
  './es6-module4.js': {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      '@es6-module4': 'rw-RW',
    },
    [S_DEFAULT]: {
      [S_DEFAULT]: 'r-xRW',
      '@es6-module4': 'rwxRW',
    },
  },
  litHtmlVersions: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      "@lit-html": 'rw-',
    },
    [S_CHAIN]: () => acl.Array[S_PROTOTYPE][S_INSTANCE],
  },
  litElementVersions: {
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--',
      "@lit-element": 'rw-',
    },
    [S_CHAIN]: () => acl.Array[S_PROTOTYPE][S_INSTANCE],
  },
  applyFocusVisiblePolyfill: {
    [S_OBJECT]: {
      [S_DEFAULT]: '---',
      "@focus-visible": 'rwx',
      "@spectrum-web-components/shared": 'r-x',
    },
  },
  "@spectrum-web-components/shared/src/focusable.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    Focusable: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/theme/src/Theme.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    Theme: {
      [S_DEFAULT]: 'r-xRW',
      "@spectrum-web-components/theme": 'rwxRW',
      '@Object_assign_reader': 'rwx',
    },
  },
  "@spectrum-web-components/theme/src/theme.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
      "@spectrum-web-components/theme": 'rwxRW',
    },
  },
  "@spectrum-web-components/theme/src/theme-light.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
      "@spectrum-web-components/theme": 'rwxRW',
    },
  },
  "@spectrum-web-components/theme/src/scale-medium.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
      "@spectrum-web-components/theme": 'rwxRW',
    },
  },
  "@spectrum-web-components/button/src/ButtonBase.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    ButtonBase: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/button/src/Button.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    Button: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'r--',
        "@lit-element": 'rwxRW',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'rwx',
          "@spectrum-web-components/shared": 'rwx',
          "@lit-element": 'rwx',
        },
      },
    },
  },
  "@spectrum-web-components/button/src/ActionButton.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    ActionButton: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/button/src/ClearButton.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    ClearButton: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/button": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    Button: {
      [S_PROXY]: () => acl["@spectrum-web-components/button/src/Button.js"].Button,
    },
  },
  "@spectrum-web-components/shared/src/focusable.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/button/src/button-base.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "@spectrum-web-components/button/src/button.css.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
    default: {
      [S_DEFAULT]: 'r-xRW',
      "@lit-element": 'rwxRW',
    },
  },
  "lit-element/": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
  },
  "lit-element/lib/updating-element.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
  },
  "lit-html/lib/directive.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
  },
  "lit-html/lib/dom.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
  },
  "lit-html/lib/part.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'rwxRW', // TODO: too loose
  },
  "./modules/module2.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--R-', // not re-exportable
      "@module2": 'r--RW',
    },
    [S_DEFAULT]: '---RW',
    exportedName: {
      [S_DEFAULT]: 'r--RW',
      "@module2": 'rw-RW',
    },
    inaccessibleString: '---RW',
    inaccessibleNumber: '---RW',
    inaccessibleBoolean: '---RW',
    inaccessibleSymbol: '---RW',
    inaccessibleNull: '---RW',
    inaccessibleUndefined: '---RW',
    inaccessibleBigInt: '---RW',
    inaccessibleFunction: '---RW',
    inaccessibleObject: '---RW',
    ExportedClass: {
      [S_CHAIN]: S_FUNCTION,
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-xR-',
        "@module2": 'r-xRW',
      },
      [S_DEFAULT]: {
        [S_DEFAULT]: 'r-x',
        "@module2": 'rwx',
      },
      callableStaticMethod: '--x',
      [S_PROTOTYPE]: {
        [S_DEFAULT]: '---',
        [S_INSTANCE]: {
          [S_CHAIN]: S_OBJECT,
          [S_DEFAULT]: '---',
          readableProperty: {
            [S_DEFAULT]: 'r--',
            "@module2": 'rw-',
          },
          unreadableProperty: {
            [S_DEFAULT]: '---',
            "@module2": 'rw-',
          },
          callableMethod: '--x',
        },
      },
    },
  },
  "./modules/module1.js": {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r--RW',
    },
    [S_DEFAULT]: 'r-xRW',
    ReexportedClass: {
      [S_PROXY]: () => acl["./modules/module2.js"].ExportedClass,
      [S_OBJECT]: {
        "@module1": 'r-xRW',
      },
      callableStaticMethod: {
        "@module1": '-wx',
      },
      [S_PROTOTYPE]: {
        [S_INSTANCE]: {
          unreadableProperty: {
            "@module1": '-w-',
          },
        },
      },
    },
    HelloWorld: {
      [S_OBJECT]: 'r-xRW',
      [S_DEFAULT]: {
        [S_DEFAULT]: 'r-xRW',
        "@module1": 'rwxRW',
        "@lit-element": 'rwxRW',
      },
    },
  },
  // default for module namespace objects
  [S_MODULE]: {
    [S_TYPE]: S_NAMESPACE,
    [S_OBJECT]: {
      [S_DEFAULT]: 'r-xRW',
    },
    [S_DEFAULT]: { // default for module exports
      [S_OBJECT]: {
        [S_DEFAULT]: 'r-xRW',
      },
      [S_DEFAULT]: Policy.globalAcl(),//'rwx', // TODO: Policy.moduleAcl() required?
      /*
      [S_PROTOTYPE]: {
        [S_DEFAULT]: 'r-x',
        [S_INSTANCE]: {
          [S_DEFAULT]: 'rwxRW',
        },
      },
      */
    },
  },
  // default for global objects
  [S_GLOBAL]: {
    [S_DEFAULT]: Policy.globalAcl(),
    [S_ALL]: 'r--',
    $__proto__$: 'r--',
    $prototype$: 'r--',
    $constructor$: 'r-x',
    '@firebase_auth_closure_global_variable_writer': Policy.patternAcl({
      w: (name, prop) => name === 'window' && typeof prop === 'string' && prop.startsWith('closure_') && 
        (acl[prop] = acl[prop] || { [S_DEFAULT]: 'r--', '@firebase_auth': 'rwx', '@firebase_auth_closure_global_variable_writer': 'rwx' }) // generate acl on demand
    }),
    '@firebase_database_callback_global_variable_writer': Policy.patternAcl({ w: (name, prop) => name === 'window' && typeof prop === 'string' && (prop.startsWith('pLPCommand') || prop.startsWith('pRTLPCB')) }),
    '@firebase_auth_iframecb_writer': Policy.patternAcl({ w: (name, prop) => name === 'window' && typeof prop === 'string' && prop.startsWith('__iframefcb') }),
    [S_PROTOTYPE]: {
      [S_OBJECT]: 'r--',
      [S_DEFAULT]: Policy.globalAcl(), // TODO: Use S_INSTANCE policy
      [S_ALL]: 'r--',
      $__proto__$: 'r--',
      $prototype$: 'r--',
      $constructor$: 'r-x',
    },
  },
  // default for non-global objects
  [S_DEFAULT]: {
    // primitives
    //  string, boolean, number, undefined, null
    // orphaned objects
    //  Module
    //  plain and extended orphaned objects
    // object[undefined] property access
    [S_DEFAULT]: Policy.defaultAcl(),
    [S_PROTOTYPE]: {
      // prototype objects
      [S_DEFAULT]: Policy.defaultAcl(),
      [S_INSTANCE]: {
        // instances
        [S_CHAIN]: () => acl.Object[S_PROTOTYPE][S_INSTANCE],
        [S_DEFAULT]: Policy.defaultAcl(),
      },
    },
  }
}
}/* @exclude */)/* @endexclude */