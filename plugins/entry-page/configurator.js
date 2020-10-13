/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const through = require('through2');
const htmlparser = require('htmlparser2');

const pluginName = 'entry-page';

const configurator = function (targetConfig) {
  const dirname = path.resolve(this.path.base, this.path.root);
  return this.gulp.series(
    Object.assign(done => {
      if (!fs.existsSync(path.resolve(dirname, this.path.decodedIndexHtml))) {
        // supply the missing decoded index.html
        if (fs.existsSync(path.resolve(dirname, this.path.encodedIndexHtml))) {
          // assumuing encoded index.html must be the plain one (not encoded)
          let html = fs.readFileSync(path.resolve(dirname, this.path.encodedIndexHtml), 'utf-8');
          fs.writeFileSync(path.resolve(dirname, this.path.decodedIndexHtml), html, 'utf-8');
          console.log(`${pluginName} generating ${this.path.decodedIndexHtml}`);
        }
        else {
          // index.html is missing
          throw new Error(`${pluginName} cannot find index.html`);
        }
      }
      done();
    }, { displayName: `${pluginName} generate ${this.path.decodedIndexHtml} if missing`}),
    Object.assign(this.inject.injectors.html(pluginName), { displayName: `${pluginName} inject decoded entry page`}),
    Object.assign(() => this.gulp.src([this[pluginName].dest])
      .pipe(through.obj((file, end, callback) => {
        const hook = this['thin-hook'].hook;
        let html = String(file.contents);
        html = hook.serviceWorkerTransformers.encodeHtml(html);
        file.path = path.resolve(dirname, this.path.encodedIndexHtml);
        file.contents = Buffer.from(html);
        callback(null, file);
      }))
      .pipe(this.gulp.dest(dirname))
      .pipe(through.obj((file, enc, callback) => {
        // for demo-backend/integrityService.js
        // demo-backend/whitelist.json - list of URL paths which can be retrieved without encryption
        // demo-backend/blacklist.json - list of URL paths which cannot be retrieved
        const hook = this['thin-hook'].hook;
        let html = String(file.contents);
        let whitelist = {...(this['integrityService'].additionalWhitelist || {})};
        let blacklist = {...(this['integrityService'].additionalBlacklist || {})};
        const entryPageURL = new URL(this.url.root + '/', 'https://localhost');
        whitelist[entryPageURL.pathname] = true;
        blacklist[new URL(this.path.encodedIndexHtml, entryPageURL).pathname] = true;
        let stream = new htmlparser.WritableStream({
          onopentag(name, attributes) {
            if (name === 'script') {
              const src = attributes['src'];
              if (src) {
                const url = new URL(src, entryPageURL);
                whitelist[url.pathname] = true;
              }
            }
          },
        });
        stream.write(html);
        stream.end();
        fs.writeFileSync(this['integrityService'].whitelist, JSON.stringify(whitelist, null, 2));
        fs.writeFileSync(this['integrityService'].blacklist, JSON.stringify(blacklist, null, 2));
        callback(null, file);
      })),
      { displayName: `${pluginName} encode decoded entry page` }),
  );
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [ 'injector-helpers' ],
};