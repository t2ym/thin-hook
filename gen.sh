#!/bin/sh
# gen.sh
browserify hook.js --s hook -o hook.browserify.js 
babel --presets es2015 hook.browserify.js -o hook.es5.js 
uglifyjs hook.es5.js -o hook.min.js
rm -f hook.browserify.js hook.es5.js
