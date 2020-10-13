import Test from './es6-module.js';
const baseUrl = import.meta.url;
console.log('import.meta.url = ' + baseUrl);
chai.assert.isOk(baseUrl.endsWith('/es6-module4.js'), 'import.meta.url');
chai.assert.throws(() => {
	import.meta.url = undefined;
}, /^Permission Denied:/);
(function f() {
	const meta = import.meta;
	chai.assert.throws(() => {
		import.meta.url;
	}, /^Permission Denied:/);
})();
