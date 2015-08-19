'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		var done = this.async();
		var pkg = this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {
			config: {
				src: '',
				dist: ''
			}
		});

		this.prompt([{
			type    : 'input',
			name    : 'iconfontPath',
			message : 'Font files folder from project root:',
			default : path.join(pkg.config.src, '/fonts')
		}, {
			type    : 'input',
			name    : 'iconfontSamplePath',
			message : 'Folder to output the icon sampling icons.html:',
			default : 'assets/'
		}, {
			type    : 'input',
			name    : 'iconfontSCSSPath',
			message : 'Folder to output the style file _icons.scss:',
			default : path.join(pkg.config.src, '/css')
		}], function (props) {
			// To access props later use this.props.someOption;
			this.props = props;

			done();
		}.bind(this));

	},

	writing: function () {
		// update package.json
		var pkg = this.pkg;

		// add iconfont dependency
		pkg.devDependencies['gulp-iconfont'] = '^4.0.0';
		pkg.devDependencies['gulp-consolidate'] = '^0.1.2';
		pkg.devDependencies['lodash'] = '^3.10.1';

		this.fs.writeJSON(this.destinationPath('package.json'), pkg);

		// update gulpfile.js
		this.fs.copy(
			this.destinationPath('gulpfile.js'),
			this.destinationPath('gulpfile.js'),
			{
				process: function(content) {
					var re = /\/\*generator:\s*iconfont\*\//g;
					content = content.toString();

					if (re.test(content)) {
						var gulpIconfont = this.fs.read(this.templatePath('gulpfile-iconfont.js'));
						gulpIconfont = this.engine(gulpIconfont, this);
						return content.replace(re, gulpIconfont);
					} else {
						this.log(chalk.yellow('Cannot find pattern /*generator: iconfont*/ in gulpfile.js. iconfont task already generated'));
						return content;
					}
				}.bind(this)
			}
		);

		// copy files in assets folder
		this.fs.copy(
			this.templatePath('assets/**/*'),
			this.destinationPath('assets/'),
			this
		);
	},

	install: function () {
		// install the new iconfont package
		this.npmInstall();
	}
});
