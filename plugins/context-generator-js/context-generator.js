/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
if (hook.parameters[Symbol.for('context-generator.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('context-generator.js')] = true;
/* #include custom-context-generator.js */

  Object.freeze(hook.contextGenerators);
}
