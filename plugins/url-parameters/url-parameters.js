/* @ifdef inline */
/* @echo NEWLINE */  {
    /* #include url-parameters.js */
  }
/* @echo SPACE *//* @echo SPACE *//* @endif */
/* @ifndef inline */
if (hook.parameters[Symbol.for('url-parameters.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('url-parameters.js')] = true;
  /* #include url-parameters.js */
}
/* @endif */