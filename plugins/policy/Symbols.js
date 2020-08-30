/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
const S_GLOBAL = Symbol('global'); // global object
const S_PROTOTYPE = Symbol('prototype'); // prototype object
const S_DEFAULT = Symbol('default'); // default policy
const S_OBJECT = Symbol('object'); // parent object
const S_INSTANCE = Symbol('instance'); // instance object
const S_MODULE = Symbol('module'); // module object
const S_TYPE = Symbol('type'); // ACL type property
const S_NAMESPACE = Symbol('namespace'); // namespace ACL type
const S_CLASS = Symbol('class'); // class ACL type
const S_PROXY = Symbol('proxy'); // proxied policy
const S_CHAIN = Symbol('chain'); // chained policy
const S_FUNCTION = Symbol('function'); // function
const S_CONSTRUCT = Symbol('construct'); // new operation
const S_UNSPECIFIED = Symbol('unspecified'); // no property is specified
const S_ALL = Symbol('all properties'); // all properties are specified
const S_TARGETED = Symbol('targeted properties'); // properties are targeted