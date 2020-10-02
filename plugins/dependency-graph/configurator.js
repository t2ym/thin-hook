/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const fs = require('fs');

const pluginName = 'dependency-graph';

const configurator = function (targetConfig) {
  return (done) => {
    let trace = targetConfig.trace;
    let dot = trace.dot.header;
    let traceLog = trace.log;
    for (let plugin in traceLog) {
      let _logs = traceLog[plugin];
      dot += trace.dot.plugin(plugin);
      for (let log of _logs) {
        log = log.replace(/\"/g, '\\"');
        if (log.endsWith(' set')) {
          dot += trace.dot.property(log.substring(0, log.length - ' set'.length));
          dot += trace.dot.writeProperty(log.substring(0, log.length - ' set'.length), plugin);
        }
        else if (log.endsWith(' w')) {
          dot += trace.dot.file(log.substring(0, log.length - ' w'.length));
          dot += trace.dot.writeFile(log.substring(0, log.length - ' w'.length), plugin);
        }
        else if (log.endsWith(' r')) {
          dot += trace.dot.file(log.substring(0, log.length - ' w'.length));
          dot += trace.dot.readFile(log.substring(0, log.length - ' r'.length), plugin);
        }
        else {
          dot += trace.dot.property(log);
          dot += trace.dot.readProperty(log, plugin);
        }
      }
    }
    dot += trace.dot.footer;
    //console.log(dot);
    fs.writeFileSync(trace.dot.path, dot, 'utf-8');
    //console.log(traceLog);
    done();
  }
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};