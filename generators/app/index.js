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
			message : 'Your main source folder',
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
			message: 'Additional predefined global variables (e.g: moment, modernizr...)',
			type: 'input',
			default: ''
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
					jshintOptions['env'] =
						_.mapValues(jshintEnv, function(value) {
							if (checkedEnv.indexOf(value) >= 0) {
								return true;
							} else {
								return false;
							}
						});
					/*jshint loopfunc:false*/

					// console.log(jshintOptions[prop.substring(7)]);
				} else if (prop === 'jshint_globals') {
					var globals = String(props[prop]);
					globals = globals.split(',');
					var jshintGlobals = {};
					for (var i = 0; i < globals.length; i++) {
						var globalName = globals[i].trim();
						if (globalName) {
							jshintGlobals[globalName] = false; // globals are not mutable by default
						}
					}
					jshintOptions['globals'] = JSON.stringify(jshintGlobals);
					// console.log(jshintOptions['globals']);

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
