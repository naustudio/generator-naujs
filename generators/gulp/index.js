/* © 2017 NauStud.io
 * @author Thanh Tran
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = Generator.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			`Welcome to the ${chalk.red('Naujs:gulp')} subgenerator!\n
${chalk.yellow('Note:')} This subgenerator must be executed in project root
			`
		));

		// check if the main generator already executed
		let pkg = this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {
			config: {
				src: '.',
				dist: 'dist',
			}
		});

		let prompts = [{
			type    : 'input',
			name    : 'src',
			message : 'Your main source folder (relative to project source):',
			default : pkg.config.src,
		}, {
			type    : 'input',
			name    : 'dist',
			message : 'Your build folder (relative to project source):',
			default : pkg.config.dist,
		}, {
			type: 'input',
			name: 'assets',
			message: 'Your dev assets folder (relative to project source):',
			default: pkg.config.assets,
		},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;
			// Update pkg config from the prompt:
			this.pkg.config.src = props.src;
			this.pkg.config.dist = props.dist;
			this.pkg.config.assets = props.assets;
		});
	},

	paths() {
		this.sourceRoot(__dirname + '/../app/templates/');
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

		this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);

		copy('gulpfile.js', 'gulpfile.js');
	},

	install() {
		this.yarnInstall([
			'browser-sync',
			'del',
			'gulp',
			'gulp-load-plugins',
			'gulp-if',
			'gulp-postcss',
			'gulp-sass',
			'gulp-sourcemaps',
		], { dev: true });
	}
});
