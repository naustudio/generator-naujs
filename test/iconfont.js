'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Naujs:generators/iconfont', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/iconfont'))
			.withOptions({ skipInstall: true, force: true })
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'assets/iconfont-templates/_icons.scss',
			'assets/iconfont-templates/icons.html',
			'assets/icons/_README.md',
			'gulpfile.js',
			'package.json'
		]);
	});

	it('sets package.json dependencies', function () {
		assert.fileContent([
			['package.json', 'gulp-iconfont'],
			['package.json', 'gulp-consolidate'],
			['package.json', 'lodash']
		]);
	});

	it('injects iconfont task to gulpfile.js', function () {
		assert.fileContent([
			['gulpfile.js', /gulp\.task\('iconfont'/]
		]);
	});
});
