/* © 2017 NauStud.io
 * @author Thanh Tran
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = Generator.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the  ' + chalk.red('Naujs') + ' generator!'
		));

		// some eslint environment options mapping with prompting friendly text
		let eslintEnvOptions = {
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
		};

		let prompts = [{
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			default : this.appname // Default to current folder name
		}, {
			type    : 'input',
			name    : 'description',
			message : 'Brief description of your project:',
			default : ''
		}, {
			type    : 'input',
			name    : 'src',
			message : 'Your main source folder',
			default : '.'
		}, {
			type    : 'input',
			name    : 'dist',
			message : 'Your build folder:',
			default : 'dist'
		}, {
			// eslint
			type: 'checkbox',
			name: 'eslint_env',
			message: 'Let ESLint know about some pre-defined global variables:',
			default: [],
			choices: Object.keys(eslintEnvOptions).map(key => {
				let checked = false;
				if (key === 'browser' || key === 'es6') {
					checked = true;
				}

				return {
					checked,
					name: eslintEnvOptions[key],
					value: key,
					short: key,
				};
			})

		}, {
			name    : 'eslint_globals',
			message : 'Additional predefined global variables (e.g: moment, modernizr...)',
			type    : 'input',
			default : ''
		}, {
			name    : 'copyST3Project',
			message : 'Generate *.sublime-project file?',
			type    : 'confirm',
			default : false,
		}, {
			name    : 'copyGulpfile',
			message : 'Generate base Gulpfile?',
			type    : 'confirm',
			default : false,
		}, {
			name    : 'copyh5bp',
			message : 'Generate HTML5 Boilerplate?',
			type    : 'confirm',
			default : false,
		}
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;
			// Some global properties
			this.props.nameSlug = _.kebabCase(this.props.name);

			this.props.eslintOptions = getEslintOptions(props);
		});

		function getEslintOptions(props) {
			let eslintOptions = {};

			// eslint_env
			let envArr = props.eslint_env; // list of selected env
			console.log('envArr', envArr);
			let eslintEnv = '';
			envArr.map(env => {
				eslintEnv += env + ': true,\n';
			});
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

			eslintOptions.globals = JSON.stringify(eslintGlobals).replace(/"/g, '\'');
			console.log(eslintOptions.globals);

			return eslintOptions;
		}
	},

	writing() {
		/**
		 * Helper method to copyTpl without all the templatePath and destinationPath boilerplate
		 *
		 * @param {any} from from glob, default to ./template/
		 * @param {any} to to glob
		 * @return {any} any
		 */
		const copy = (from, to) => {
			console.log('copy', from, to);
			return this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
		};

		copy('package.json', 'package.json');
		copy('README.md', 'README.md');

		if (this.props.copyGulpfile) {
			copy('gulpfile.js', 'gulpfile.js');
		}

		if (this.props.copyh5bp) {
			var src = this.props.src;
			copy('src/css/*', src + '/css');
			copy('src/img/.gitignore', src + '/img/');
			copy('src/js/*', src + '/js');
			copy('src/*', src + '/');
		}

		if (this.props.copyST3Project) {
			copy('project.sublime-project', this.props.nameSlug + '.sublime-project');
		}
		copy('editorconfig', '.editorconfig');
		copy('gitignore', '.gitignore');
		copy('eslintrc.js', '.eslintrc.js');
		copy('stylelintrc', '.stylelintrc');
	},

	install() {
		this.npmInstall([], {saveDev: true});
	}
});
