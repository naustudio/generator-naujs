/* © 2015 NauStud.io
 * @author Thanh Tran
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the  ' + chalk.red('Naujs') + ' generator!'
		));

		// all jshint environment options mapping with prompting friendly text
		var jshintEnv = {
			'browser': 'Web Browser (window, document, etc)',
			'dojo': 'Dojo Toolkit / RequireJS',
			'jquery': 'jQuery',
			'node': 'Node.js'
		};

		var prompts = [{
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
			message : 'Your main source folder (default is current folder)',
			default : '.'
		}, {
			type    : 'input',
			name    : 'dist',
			message : 'Your build folder:',
			default : 'dist'
		},

		// JSHINT
		{
			type: 'confirm',
			name: 'jshint_esnext',
			message: 'Your JavaScript is written in ES6 (JSHint `esnext` option)?',
			default: false
		}, {
			when: function (response) {
				return !response.jshint_esnext;
			},
			type: 'confirm',
			name: 'jshint_es3',
			message: 'Your JavaScript runs in IE6/7/8 (JSHint `es3` option)?',
			default: false
		}, {
			type: 'checkbox',
			name: 'jshint_env',
			message: 'Let JSHint know about some pre-defined global variables:',
			choices: [
				{
					name: jshintEnv['browser'],
					checked: true
				},
				{
					name: jshintEnv['dojo'],
					checked: true
				},
				{
					name: jshintEnv['jquery'],
					checked: true
				},
				{
					name: jshintEnv['node'],
					checked: false
				}
			]
		}, {
			name: 'jshint_globals',
			message: 'Additional predefined global variables (e.g. {"SomeGlobal": true})',
			type: 'input',
			default: '{}',
			validate: function(input) {
				// shamelessly copied from https://github.com/losingkeys/generator-jshint/blob/master/app/index.js
				try {
					var globals = JSON.parse(input);

					for (var name in globals) {
						if (globals.hasOwnProperty(name)) {
							if (typeof globals[name] !== 'boolean') {
								return 'Please enter a JSON object with only boolean ' +
									'values to indicate which globals are or are not allowed';
							}
						}
					}
				} catch(e) {
					return 'Please enter a valid JSON object';
				}

				return true;
			}
		}];

		this.prompt(prompts, function (props) {
			// To access props later use this.props.someOption;
			this.props = props;
			// Some global properties
			this.name = props.name;
			this.nameSlug = _.kebabCase(this.name);
			this.description = props.description;

			this.jshintOptions = getJshintOptions(props);

			done();
		}.bind(this));

		function getJshintOptions(props) {
			var jshintOptions = {};
			for (var prop in props) {
				if (prop === 'jshint_env') {
					var checkedEnv = props[prop];
					/*jshint loopfunc:true*/
					jshintOptions[prop.substring(7)] =
						_.mapValues(jshintEnv, function(value) {
							if (checkedEnv.indexOf(value) >= 0) {
								return true;
							} else {
								return false;
							}
						});
					/*jshint loopfunc:false*/

					// console.log(jshintOptions[prop.substring(7)]);
				} else if (prop.indexOf('jshint') >= 0) {
					jshintOptions[prop.substring(7)] = props[prop];
				}
			}

			return jshintOptions;
		}
	},

	writing: {
		app: function () {
			this.template('package.json', 'package.json');
			this.template('README.md', 'README.md');
			this.template('gulpfile.js', 'gulpfile.js');
		},

		h5bp: function() {
			var src = this.props.src;
			this.directory('src/css', src + '/css');
			this.directory('src/img', src + '/img');
			this.directory('src/js', src + '/js');

			this.fs.copy(this.templatePath('src/*'), this.destinationPath(src + '/'));
		},

		projectfiles: function () {
			this.template('project.sublime-project', this.nameSlug + '.sublime-project');
			this.template('editorconfig', '.editorconfig');
			this.template('gitignore', '.gitignore');
			this.template('jshintrc', '.jshintrc');
			this.template('jscsrc', '.jscsrc');
			this.template('scss-lint.yml', '.scss-lint.yml');
		}
	},

	install: function () {

		this.npmInstall([

		], {saveDev: true});
	}
});
