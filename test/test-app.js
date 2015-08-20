'use strict';
/*global describe, it, before*/

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
// var os = require('os');

describe('generator-naujs:app src at root', function () {

	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: true })
			.withPrompts({ name: 'Nau App' })
			.withPrompts({ jshint_esnext: true })
			.withPrompts({ jshint_env: ['Web Browser (window, document, etc)','Dojo Toolkit / RequireJS','jQuery','Node.js'] })
			.on('end', done);
	});

	it('creates setting files', function () {
		assert.file([
			'.editorconfig',
			'.gitignore',
			'.jscsrc',
			'.jshintrc',
			'.scss-lint.yml',
			'gulpfile.js',
			'nau-app.sublime-project',
			'package.json',
			'README.md'
		]);
	});

	it('sets jshintrc rules', function () {
		assert.fileContent([
			['.jshintrc', /"browser":\s*true/],
			['.jshintrc', /"dojo":\s*true/],
			['.jshintrc', /"esnext":\s*true/],
			['.jshintrc', /"jquery":\s*true/],
			['.jshintrc', /"node":\s*true/],
			['.jshintrc', /"globals":\s*{}/]
		]);
		assert.noFileContent('.jshintrc', /"es3"/); // es3 option is obmitted if esnext is on
	});

	it('sets package.json dependencies', function () {
		assert.fileContent([
			['package.json', 'autoprefixer-core'],
			['package.json', 'browser-sync'],
			['package.json', 'del'],
			['package.json', 'gulp'],
			['package.json', 'gulp-if'],
			['package.json', 'gulp-jshint'],
			['package.json', 'gulp-postcss'],
			['package.json', 'gulp-sass'],
			['package.json', 'gulp-sourcemaps'],
			['package.json', 'jshint-stylish']
		]);
	});

	it('sets gulpfile.js paths', function () {
		assert.fileContent([
			['gulpfile.js', /src:\s*'.'/],
			['gulpfile.js', /dist:\s*'dist'/]
		]);
	});

	it('creates h5bp files', function () {
		assert.file([
			'apple-touch-icon.png',
			'favicon.ico',
			'index.html',
			'css/_normalize.scss',
			'css/main.scss',
			'js/main.js',
			'js/plugins.js',
			'js/vendor/jquery-1.11.3.min.js',
			'js/vendor/modernizr-2.8.3.min.js',
			'img/.gitignore'
		]);
	});
});

describe('generator-naujs:app src at subfolder', function () {

	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: true })
			.withPrompts({ name: 'Nau App' })
			.withPrompts({ src: 'src' })
			.withPrompts({ dist: '~build' })
			.withPrompts({ jshint_esnext: false })
			.withPrompts({ jshint_es3: true })
			.withPrompts({ jshint_env: ['Node.js', 'Web Browser (window, document, etc)'] })
			.withPrompts({ jshint_globals: 'moment, modernizr' })
			.on('end', done);
	});

	it('creates setting files', function () {
		assert.file([
			'.editorconfig',
			'.gitignore',
			'.jscsrc',
			'.jshintrc',
			'.scss-lint.yml',
			'gulpfile.js',
			'nau-app.sublime-project',
			'package.json',
			'README.md'
		]);
	});

	it('sets jshintrc rules', function () {
		assert.fileContent([
			['.jshintrc', /"browser":\s*true/],
			['.jshintrc', /"dojo":\s*false/],
			['.jshintrc', /"esnext":\s*false/],
			['.jshintrc', /"es3":\s*true/],
			['.jshintrc', /"jquery":\s*false/],
			['.jshintrc', /"node":\s*true/],
			['.jshintrc', /"globals":\s*{"moment":false,"modernizr":false}/]
		]);
	});

	it('sets package.json dependencies', function () {
		assert.fileContent([
			['package.json', 'autoprefixer-core'],
			['package.json', 'browser-sync'],
			['package.json', 'del'],
			['package.json', 'gulp'],
			['package.json', 'gulp-if'],
			['package.json', 'gulp-jshint'],
			['package.json', 'gulp-postcss'],
			['package.json', 'gulp-sass'],
			['package.json', 'gulp-sourcemaps'],
			['package.json', 'jshint-stylish']
		]);
	});

	it('sets gulpfile.js paths', function () {
		assert.fileContent([
			['gulpfile.js', /src:\s*'src'/],
			['gulpfile.js', /dist:\s*'~build'/]
		]);
	});

	it('creates h5bp files', function () {
		assert.file([
			'src/apple-touch-icon.png',
			'src/favicon.ico',
			'src/index.html',
			'src/css/_normalize.scss',
			'src/css/main.scss',
			'src/js/main.js',
			'src/js/plugins.js',
			'src/js/vendor/jquery-1.11.3.min.js',
			'src/js/vendor/modernizr-2.8.3.min.js',
			'src/img/.gitignore'
		]);
	});

});

describe('generator-naujs:app skip H5BP', function () {

	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: true })
			.withPrompts({ name: 'Nau App' })
			.withPrompts({ src: 'src' })
			.withPrompts({ dist: '~build' })
			.withPrompts({ copyh5bp: false }) // true by default
			.on('end', done);
	});

	it('creates setting files', function () {
		assert.file(['.editorconfig','.gitignore','.jscsrc','.jshintrc','.scss-lint.yml','gulpfile.js','nau-app.sublime-project','package.json','README.md'
		]);
	});

	it('sets jshintrc rules', function () {
		assert.fileContent([['.jshintrc', /"browser":\s*false/],['.jshintrc', /"dojo":\s*false/],['.jshintrc', /"esnext":\s*false/],['.jshintrc', /"es3":\s*false/],['.jshintrc', /"jquery":\s*false/],['.jshintrc', /"node":\s*false/],['.jshintrc', /"globals":\s*{}/]
		]);
	});

	it('sets package.json dependencies', function () {
		assert.fileContent([['package.json', /autoprefixer-core/],['package.json', /browser-sync/],['package.json', /del/],['package.json', /gulp/],['package.json', /gulp-if/],['package.json', /gulp-jshint/],['package.json', /gulp-postcss/],['package.json', /gulp-sass/],['package.json', /gulp-sourcemaps/],['package.json', /jshint-stylish/]
		]);
	});

	it('sets gulpfile.js paths', function () {
		assert.fileContent([['gulpfile.js', /src:\s*'src'/],['gulpfile.js', /dist:\s*'~build'/]]);
	});

	it('skips h5bp files', function () {
		assert.noFile([
			'src/apple-touch-icon.png',
			'src/favicon.ico',
			'src/index.html',
			'src/css/_normalize.scss',
			'src/css/main.scss',
			'src/js/main.js',
			'src/js/plugins.js',
			'src/js/vendor/jquery-1.11.3.min.js',
			'src/js/vendor/modernizr-2.8.3.min.js',
			'src/img/.gitignore',
			'apple-touch-icon.png',
			'favicon.ico',
			'index.html',
			'css/_normalize.scss',
			'css/main.scss',
			'js/main.js',
			'js/plugins.js',
			'js/vendor/jquery-1.11.3.min.js',
			'js/vendor/modernizr-2.8.3.min.js',
			'img/.gitignore'
		]);
	});
});
