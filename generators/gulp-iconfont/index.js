/* © 2017 NauStud.io
 * @author Thanh Tran
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const ejs = require('ejs');

module.exports = Generator.extend({
	initializing: function () {
		// Have Yeoman greet the user.
		this.log(yosay(
			`Welcome to the ${chalk.red('Naujs:gulp-iconfont')} subgenerator!\n
${chalk.yellow('Note:')} This subgenerator must be executed in project root`
		));

		// check if the main generator already executed
		var pkg = this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {
			config: {
				src: 'src',
				dist: 'dist',
				assets: 'private',
			}
		});

		let prompts = [{
			type    : 'input',
			name    : 'iconfontName',
			message : 'Icon font name (as in icons.woff):',
			default : 'icons'
		}, {
			type    : 'input',
			name    : 'iconfontPath',
			message : 'Font files folder from project root:',
			default : path.join(pkg.config.src, '/fonts')
		}, {
			type    : 'input',
			name    : 'iconfontSCSSPath',
			message : 'Folder to output the style file _icons.scss:',
			default : path.join(pkg.config.src, '/css')
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someOption;
			this.props = props;
			//
			this.props.assets = this.pkg.config.assets;
		});

	},

	writing: function () {

		// update gulpfile.js
		var currentGulpfile;
		try {
			currentGulpfile = this.fs.read(this.destinationPath('gulpfile.js'));
		} catch (err) {
			this.log(chalk.yellow('gulpfile.js does not existed. Generate the iconfont task to a new gulpfile.js.'))
			currentGulpfile = '/*generator: iconfont*/';
		}
		var re = /\/\*generator:\s*iconfont\*\//g;
		var newGulpfile;

		if (re.test(currentGulpfile)) {
			var gulpIconfont = this.fs.read(this.templatePath('gulpfile-iconfont.js'));
			gulpIconfont = ejs.render(gulpIconfont, this.props);
			newGulpfile = currentGulpfile.replace(re, gulpIconfont);
		} else {
			this.log(chalk.yellow('Cannot find placeholder /*generator: iconfont*/ in gulpfile.js. iconfont task already generated'));
			newGulpfile = currentGulpfile;
		}

		this.fs.write(
			this.destinationPath('gulpfile.js'),
			newGulpfile
		);

		// copy files in assets folder
		// note: we don't process ejs templates here
		this.fs.copy(
			this.templatePath('private/**/*'),
			this.destinationPath(this.props.assets)
		);

	},

	install: function () {
		// install the new iconfont package
		this.yarnInstall([
			'gulp-iconfont',
			'gulp-consolidate',
			'lodash',
		], { dev: true });
	},

	end: function() {
		this.log(
			`${chalk.green('Gulp iconfont task generated.')}
Please import ${this.props.iconfontSCSSPath}/_icons.scss
to your main SCSS file and fix the path to the font files.`
		);
	}
});
