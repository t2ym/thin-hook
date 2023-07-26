import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const REACT_PACKAGES = process.env.REACT_PACKAGES.split(' ');
const [ REACT_PKG, REACT_DOM_PKG, SCHEDULER_PKG ] = REACT_PACKAGES;

const PRODUCTION_SUFFIX = '.production.min.js';
const PROFILING_SUFFIX = '.profiling.min.js';
const DEVELOPMENT_SUFFIX = '.development.js';

const PROD = 'production';
const DEV = 'development';

const exports_list = {
	[REACT_PKG]: {
		"exports": {
			".": {
				"react-server": "./react.shared-subset.js",
				"default": "./index.js",
				"import": `./esm/react${PRODUCTION_SUFFIX}`,
			},
			"./package.json": "./package.json",
			"./jsx-runtime": {
				"default": "./jsx-runtime.js",
				"import": `./esm/react-jsx-runtime${PRODUCTION_SUFFIX}`,
			},
			"./jsx-dev-runtime": {
				"default": "./jsx-dev-runtime.js",
				"import": `./esm/react-jsx-dev-runtime${PRODUCTION_SUFFIX}`,
			},
		},
	},
	[REACT_DOM_PKG]: {
		"exports": {
			".": {
				"default": "./index.js",
				"import": `./esm/react-dom${PRODUCTION_SUFFIX}`,
			},
			"./client": {
				"default": "./client.js",
				"import": `./esm/react-dom${PRODUCTION_SUFFIX}`,
			},
			"./server": {
				"deno": "./server.browser.js",
				"worker": "./server.browser.js",
				"browser": "./server.browser.js",
				"default": "./server.node.js"
			},
			"./server.browser": "./server.browser.js",
			"./server.node": "./server.node.js",
			"./profiling": "./profiling.js",
			"./test-utils": "./test-utils.js",
			"./package.json": "./package.json"
		},
	},
	[SCHEDULER_PKG]: {
		"exports": {
			".": {
				"default": "./index.js",
				"import": `./esm/scheduler${PRODUCTION_SUFFIX}`,
			},
		},
	},
}

const update_package = (name) => {
	const package_path = `expanded-packages/${name}/package/package.json`;
	let package_json = JSON.parse(fs.readFileSync(package_path, "UTF-8"));
	if (package_json.files.indexOf('esm/') < 0) {
		package_json.files.push('esm/');
	}
	package_json.exports = exports_list[name].exports;
	fs.writeFileSync(package_path, JSON.stringify(package_json, null, 2));
};

const config = (NODE_ENV, name, suffix) => ({
	input: Object.fromEntries(
		glob.sync(`expanded-packages/${name}/package/cjs/**/*${suffix}`).map(file => [
			path.relative(
				`expanded-packages/${name}/package/cjs`,
				file.slice(0, file.length - path.extname(file).length)
			),
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
	plugins: [
		commonjs(),
		replace({
			preventAssignment: false, 
			values: {
			"process.env.NODE_ENV": `"${NODE_ENV}"`,
		}}),
	],
	output: {
		format: 'esm',
		name: '[name].js',
		dir: `expanded-packages/${name}/package/esm`
	}
});

const configs = (NODE_ENV, name, suffix) => (
	glob.sync(`expanded-packages/${name}/package/cjs/**/*${suffix}`).map(file => [
		path.relative(
			`expanded-packages/${name}/package/cjs`,
			file.slice(0, file.length - path.extname(file).length)
		),
		fileURLToPath(new URL(file, import.meta.url))
	]).map(([key, value]) => ({
		input: { [key]: value },
		plugins: [
			commonjs(),
			replace({
				preventAssignment: false, 
				values: {
				"process.env.NODE_ENV": `"${NODE_ENV}"`,
			}}),
		],
		output: {
			format: 'esm',
			name: '[name].js',
			dir: `expanded-packages/${name}/package/esm`
		}
	}))
);

[ REACT_PKG, REACT_DOM_PKG, SCHEDULER_PKG ].forEach(name => update_package(name));

export default [
	...configs(PROD, REACT_PKG, PRODUCTION_SUFFIX),
	...configs(DEV, REACT_PKG, PROFILING_SUFFIX),
	...configs(DEV, REACT_PKG, DEVELOPMENT_SUFFIX),
	...configs(PROD, REACT_DOM_PKG, PRODUCTION_SUFFIX),
	...configs(DEV, REACT_DOM_PKG, PROFILING_SUFFIX),
	...configs(DEV, REACT_DOM_PKG, DEVELOPMENT_SUFFIX),
	...configs(PROD, SCHEDULER_PKG, PRODUCTION_SUFFIX),
	...configs(DEV, SCHEDULER_PKG, DEVELOPMENT_SUFFIX),
];
