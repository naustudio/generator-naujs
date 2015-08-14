/* © 2015 NauStud.io
 * @author Thanh Tran
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the  ' + chalk.red('Naujs') + ' generator!'
		));

		var prompts = [{
			type: 'confirm',
			name: 'jshint_browser',
			message: 'Would you like to enable jsHint `browser` option?',
			default: true
		}, {
			type: 'confirm',
			name: 'jshint_esnext',
			message: 'Would you like to enable jsHint `esnext` option?',
			default: false
		}, {
			type: 'confirm',
			name: 'jshint_node',
			message: 'Would you like to enable jsHint `node` option?',
			default: false
		}];

		this.prompt(prompts, function (props) {
			// To access props later use this.props.someOption;
			this.props = props;

			this.jshintOptions = getJshintOptions(props);

			done();
		}.bind(this));

		function getJshintOptions(props) {
			var jshintOptions = {};
			for (var prop in props) {
				if (prop.indexOf('jshint') >= 0) {
					jshintOptions[prop.substring(7)] = props[prop];
				}
			}
			return jshintOptions;
		}
	},

	writing: {
		app: function () {
			this.template('_package.json', 'package.json');
		},

		projectfiles: function () {
			var projectName = this.appname || 'project';
			this.template('_project.sublime-project', projectName + '.sublime-project');

			this.template('editorconfig', '.editorconfig');
			this.template('gitignore', '.gitignore');
			this.template('jshintrc', '.jshintrc');
			this.template('jscsrc', '.jscsrc');
			this.template('scss-lint.yml', '.scss-lint.yml');
		}
	},

	install: function () {
		this.installDependencies({
			bower: false,
			npm: true,
			skipInstall: false,
			callback: function () {
				console.log('Everything is ready!');
			}
		});
	}
});
