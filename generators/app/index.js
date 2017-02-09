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

module.exports = Generator.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('Naujs') + ' generator!'
		));

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
			type    : 'input',
			name    : 'assets',
			message : 'Your dev assets folder:',
			default : 'private'
		}, {
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
		}, {
			name    : 'copyST3Project',
			message : 'Generate *.sublime-project file?',
			type    : 'confirm',
			default : false,
		}, {
			name    : 'copyGulpfile',
			message : 'Generate Gulpfile.js?',
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

			this.props.eslintOptions = eslintHelper.getEslintOptions(props);
		});
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
			copy('src/index.html', src + '/index.html');
			// copy files without template processing
			this.fs.copy(this.templatePath('src/apple-touch-icon.png'), this.destinationPath(src + '/apple-touch-icon.png'));
			this.fs.copy(this.templatePath('src/favicon.ico'), this.destinationPath(src + '/favicon.ico'));
		}

		if (this.props.copyST3Project) {
			copy('project.sublime-project', this.props.nameSlug + '.sublime-project');
		}

		copy('editorconfig', '.editorconfig');
		copy('gitignore', '.gitignore');
		copy('eslintignore', '.eslintignore');
		copy('eslintrc.js', '.eslintrc.js');
		copy('stylelintrc', '.stylelintrc');
	},

	install() {
		this.yarnInstall([
			'autoprefixer',
			'eslint',
			'stylelint',
		], {dev: true});

		if (this.props.copyGulpfile) {
			this.yarnInstall([
				'browser-sync',
				'del',
				'gulp',
				'gulp-load-plugins',
				'gulp-if',
				'gulp-postcss',
				'gulp-sass',
				'gulp-sourcemaps',
			], {dev: true});
		}
	}
});
