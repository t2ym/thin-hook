/*
@license https://github.com/t2ym/reportage/blob/master/LICENSE.md
Copyright (c) 2023 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Config from './reportage.config.js';
const { default: Suite } = await import(Config.scenaristLoaderPath);
import './common-suite.js';
import './basic-suite.js';

export default Suite;
