/* © 2017 NauStud.io
 * @author Thanh Tran
 */
module.exports = {

	/**
	 * Return params to pass to the eslintrc.js template
	 *
	 * @param {Object} props yeoman prompt result
	 * @returns {Object} template consumable data
	 */
	getEslintOptions(props) {
		let eslintOptions = {};

		// eslint_env
		let envArr = props.eslint_env; // list of selected env
		console.log('envArr', envArr);
		let eslintEnv = envArr.map(env => {
			return `\t\t${env}: true,`;
		}).join('\n');
		eslintOptions.env = eslintEnv;
		console.log('eslintOptions.env', eslintOptions.env);

		// eslint_globals
		let globals = props.eslint_globals;
		let eslintGlobals = {};

		globals.split(',').forEach(globalName => {
			globalName = globalName.trim();
			if (globalName) {
				eslintGlobals[globalName] = false; // globals are not mutable by default
			}
		});

		eslintOptions.globals = JSON.stringify(eslintGlobals)
									.replace(/"/g, '\'')       // replace double quote to single quote
									.replace(/(:|,)/g, '$1 '); // add 1 space after : and ,
		console.log(eslintOptions.globals);

		return eslintOptions;
	},

	env: {
		'browser': 'browser global variables.',
		'node': 'Node.js global variables and Node.js scoping.',
		'commonjs': 'CommonJS global variables and CommonJS scoping.',
		'es6': 'enable all ECMAScript 6 features except for modules.',
		'amd': 'defines require() and define() as global variables as per the amd spec.',
		'mocha': 'adds all of the Mocha testing global variables.',
		'jasmine': 'adds all of the Jasmine testing global variables for v.1.3 and 2.0.',
		'jest': 'Jest global variables.',
		'jquery': 'jQuery global variables.',
		'meteor': 'Meteor global variables.',
	}
};
