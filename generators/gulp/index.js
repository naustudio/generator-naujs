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

		// check if the main generator already executed
		let pkg = this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {
			config: {
				src: '.',
				dist: 'dist',
			},
			devDependencies: {}
		});

		let prompts = [{
			type    : 'input',
			name    : 'projectSrc',
			message : 'Your project folder (as root for other path config)',
			default : '.',
		}, {
			type    : 'input',
			name    : 'src',
			message : 'Your main source folder (relative to project source):',
			default : '.',
		}, {
			type    : 'input',
			name    : 'dist',
			message : 'Your build folder (relative to project source):',
			default : 'dist',
		},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;
		});
	},

	paths() {
		this.sourceRoot(__dirname + '/../app/templates/');
		this.destinationRoot(this.props.projectSrc);
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

		copy('gulpfile.js', 'gulpfile.js');
	}
});
