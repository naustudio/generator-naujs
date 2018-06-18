/* © 2017 NauStud.io
 * @author Thanh Tran
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const eslintHelper = require('../dotfiles/eslint');

const eslintEnvOptions = eslintHelper.env;

module.exports = class NauAppGenerator extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the ' + chalk.red('Naujs') + ' generator!'));

		let prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'Your project name',
				default: this.appname, // Default to current folder name
			},
			{
				type: 'input',
				name: 'description',
				message: 'Brief description of your project:',
				default: '',
			},
			{
				type: 'input',
				name: 'src',
				message: 'Your main source folder',
				default: 'src',
			},
			{
				type: 'input',
				name: 'dist',
				message: 'Your build folder:',
				default: 'dist',
			},
			{
				type: 'input',
				name: 'assets',
				message: 'Your dev assets folder:',
				default: 'private',
			},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;
			// Some global properties
			this.props.nameSlug = _.kebabCase(this.props.name);
		});
	}

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

		// copy base HTML files with webpack config
		var src = this.props.src;
		copy('src/css/*', src + '/css');
		copy('public/img/.gitignore', 'public/img/.gitignore');
		copy('src/js/*', src + '/js');
		copy('src/index.html', src + '/index.html');
		// copy files without template processing
		this.fs.copy(
			this.templatePath('src/apple-touch-icon.png'),
			this.destinationPath(src + '/apple-touch-icon.png')
		);
		this.fs.copy(this.templatePath('src/favicon.ico'), this.destinationPath(src + '/favicon.ico'));

		copy('webpack.config.js', 'webpack.config.js');
		copy('editorconfig', '.editorconfig');
		copy('gitignore', '.gitignore');
		copy('eslintignore', '.eslintignore');
		copy('eslintrc.yml', '.eslintrc.yml');
		copy('prettierrc.yml', '.prettierrc.yml');
		copy('stylelintrc.yml', '.stylelintrc.yml');
	}

	install() {
		this.yarnInstall(
			[
				'@babel/core@>=7.0.0',
				'@babel/preset-env@>=7.0.0',
				'@babel/preset-stage-2@>=7.0.0',
				'autoprefixer',
				'babel-eslint',
				'babel-loader@>=8.0.0',
				'css-loader',
				'eslint',
				'eslint-config-nau',
				'eslint-config-prettier',
				'eslint-plugin-import',
				'html-webpack-plugin',
				'mini-css-extract-plugin',
				'postcss-loader',
				'postcss-preset-env',
				'style-loader',
				'stylelint',
				'stylelint-config-standard',
				'webpack',
				'webpack-cli',
				'webpack-dev-server',
			],
			{ dev: true }
		);
	}
};
