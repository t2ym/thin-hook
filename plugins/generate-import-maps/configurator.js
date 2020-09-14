/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2020, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const path = require('path');
const fs = require('fs');
const ImportMaps = require("@jsenv/node-module-import-map");

const pluginName = 'generate-import-maps';

const configurator = function (targetConfig) {
  const configPath = path.resolve(this.path.base, this.path.config, pluginName);
  const destPath = path.resolve(this.path.base, this.path.root);
  const pluginDirname = __dirname;
  const sourceFile = this['import-maps'] && this['import-maps'].privateImportMapName
    ? this['import-maps'].privateImportMapName
    : 'modules-private.importmap';

  // Convert relative URL paths to their corresponding absolute URL paths
  // Note: baseUrlPath must end with '/' if it is for a directory URL
  const convertToAbsoluteUrlPath = function (url, baseUrlPath) {
    if (url.startsWith('.')) {
      //console.log('convertToAbsolutePath', baseUrlPath, url);
      url = new URL(url, 'file://' + baseUrlPath).pathname;
      //url = path.resolve(baseUrlPath, url) + (url.endsWith('/') ? '/' : '');
    }
    return url;
  };

  // Normalize relative URL paths in an import maps object as their corresponding absolute ones
  const normalizeImportMap = function (importMaps, baseUrlPath) {
    function _normalize(normalized, original) {
      switch (typeof original) {
      case 'object':
        if (original) {
          for (let key in original) {
            normalized[convertToAbsoluteUrlPath(key, baseUrlPath)] = _normalize({}, original[key]);
          }
        }
        return normalized;
      case 'string':
        return convertToAbsoluteUrlPath(original, baseUrlPath);
      default:
        return original;
      }
    }
    return _normalize({}, importMaps);
  };

  // Copy module scopes with "bare-specifier/" to global imports in import maps 
  // so that "bare-specifier/path/to/module.js" can be resolved from outside of the "bare-specifier" module
  /*
    importMaps = {
      "imports": {
        "bare-specifier": "/components/bare-specifier/main.js"
      },
      "scopes": {
        "/components/bare-specifier/": {
          "bare-specifier/": "/components/bare-specifier/" // copy this property to imports["bare-specifier/"]
        }
      }
    }
  */
  const copyModuleScopesToImports = function (importMaps) {
    for (let mod in importMaps.scopes) {
      let scope = importMaps.scopes[mod];
      for (let specifier in scope) {
        if (specifier.endsWith('/') && importMaps.imports && !importMaps.imports[specifier]) {
          let bareSpecifier = specifier.substring(0, specifier.length - 1);
          if (importMaps.imports[bareSpecifier]) {
            importMaps.imports[specifier] = scope[specifier];
          }
        }
      }
    }
    return importMaps;
  }

  return this.gulp.series(
    () => this.gulp.src([ path.resolve(configPath, sourceFile) ]).pipe(this.gulp.dest(destPath)),
    async () => {
      // Paths for import maps
        // demo/ -- project directory for demo
        // demo/package.json -- frontend nodejs package.json for the thin-hook demo
        // demo/package-lock.json -- lock file for the frontend nodejs packages
        // demo/node_modules/ -- frontend nodejs packages for modules
        // demo/modules/ -- private/local frontend modules, whose paths are configurable in demo/modules-private.importmap
      // 'modules-private.importmap'; // import maps for private/local modules for demo (manually configured)
        // demo/modules-private.importmap
      // 'modules.importmap'; // embedded into bootstrap.js as hook.parameters.importMapsJson
        // demo/modules.importmap
        // Notes:
        //  - JSON for the generated import maps is embedded into demo/bootstrap.js as a string value for hook.parameters.importMapsJson 
        //  - Normalized absolute URL paths for modules are used as their contexts in preprocessed code and acl
        //  - Scoped import maps for "bare-specifier/" are copied to global imports so that "bare-specifier/path/module.js" can be resolved from outside of the module scope
        //  - **NOT** loaded via <script type="importmap" src="modules.importmap"></script> nor <script type="importmap">JSON</script> for the time being
      const projectDirectoryFileUrl = new URL(this.path.root + '/', `file://${this.path.base}/`);
      const baseUrlPath = this.mapper(this.url.mappings, projectDirectoryFileUrl.pathname) + '/';
      const privateImportMapFileUrl = new URL(this['import-maps'].privateImportMapName, projectDirectoryFileUrl);
      const normalizedImportMapFilePath = new URL(this['import-maps'].importMapName, projectDirectoryFileUrl).pathname;
      const importMapInputs = [
        ImportMaps.getImportMapFromNodeModules({
          projectDirectoryUrl: projectDirectoryFileUrl,
          projectPackageDevDependenciesIncluded: false,
          packagesExportsPreference: ["import", "node", "require"],
        }),
        ImportMaps.getImportMapFromFile(privateImportMapFileUrl),
        this['import-maps'].auxiliaryImportMap,
      ];
      
      let importMaps = await ImportMaps.generateImportMapForProject(importMapInputs, {
        projectDirectoryUrl: projectDirectoryFileUrl,
        importMapFile: false,
      });
      
      const importMapsJSON = JSON.stringify(copyModuleScopesToImports(normalizeImportMap(importMaps, baseUrlPath)), null, 2);
      fs.writeFileSync(normalizedImportMapFilePath, importMapsJSON);
      console.log(importMapsJSON);
    },
  );
}

module.exports = {
  configurator,
  name: pluginName,
  dependencies: [],
};