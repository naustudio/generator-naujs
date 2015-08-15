'use strict';
/*global describe, it, before*/

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
// var os = require('os');

describe('generator-naujs:app', function () {

	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: true })
			.withPrompts({ name: 'Nau App' })
			.withPrompts({ jshint_esnext: false })
			.withPrompts({ jshint_es3: false })
			.withPrompts({ jshint_env: ['Node.js', 'Web Browser (window, document, etc)'] })
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'nau-app.sublime-project',
			'package.json',
			'README.md',
			'.editorconfig',
			'.gitignore',
			'.jshintrc',
			'.jscsrc',
			'.scss-lint.yml'
		]);
	});

	it('sets jshintrc rules', function () {
		assert.fileContent('.jshintrc', /"browser":\s*true/);
		assert.fileContent('.jshintrc', /"dojo":\s*false/);
		assert.fileContent('.jshintrc', /"esnext":\s*false/);
		assert.fileContent('.jshintrc', /"es3":\s*false/);
		assert.fileContent('.jshintrc', /"jquery":\s*false/);
		assert.fileContent('.jshintrc', /"node":\s*true/);
		assert.fileContent('.jshintrc', /"globals":\s*{}/);
	});
});
