/* © 2017 NauStud.io
 * @author Thanh Tran
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const eslintHelper = require('./eslint');

const eslintEnvOptions = eslintHelper.env;

module.exports = Generator.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			`Welcome to ${chalk.red('Naujs:dotfiles')} subgenerator!\n
This generator will generate default dotfiles for projects`
		));

		let prompts = [{
			// eslint
			name    : 'eslint_env',
			type    : 'checkbox',
			message : 'Let ESLint know about some pre-defined global variables:',
			default : [],
			choices : Object.keys(eslintEnvOptions).map(key => {
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
		},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;

			this.props.eslintOptions = eslintHelper.getEslintOptions(props);
		});

	},

	paths() {
		this.sourceRoot(__dirname + '/../app/templates/');
		// console.log('this.sourceRoot()', this.sourceRoot());
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

		copy('editorconfig', '.editorconfig');
		copy('gitignore', '.gitignore');
		copy('eslintignore', '.eslintignore');
		copy('eslintrc.js', '.eslintrc.js');
		copy('stylelintrc', '.stylelintrc');
	},

	install() {
		this.yarnInstall([
			'eslint',
			'stylelint',
			'stylelint-config-standard',
		], { dev: true });
	}
});
