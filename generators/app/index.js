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
			name: 'jsHintBrowser',
			message: 'Would you like to enable jsHint `browser` option?',
			default: true
		}, {
			type: 'confirm',
			name: 'jsHintEsnext',
			message: 'Would you like to enable jsHint `esnext` option?',
			default: false
		}, {
			type: 'confirm',
			name: 'jsHintNode',
			message: 'Would you like to enable jsHint `node` option?',
			default: false
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json')
			);
		},

		projectfiles: function () {
			var projectName = this.projectName || 'project';
			this.fs.copyTpl(
				this.templatePath('_project.sublime-package'),
				this.destinationPath(projectName + '.sublime-package')
			);

			this.fs.copyTpl(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copyTpl(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
			this.fs.copyTpl(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
			this.fs.copyTpl(
				this.templatePath('jscsrc'),
				this.destinationPath('.jscsrc')
			);
			this.fs.copyTpl(
				this.templatePath('scss-lint.yml'),
				this.destinationPath('.scss-lint.yml')
			);
		}
	},

	install: function () {
		this.installDependencies();
	}
});
