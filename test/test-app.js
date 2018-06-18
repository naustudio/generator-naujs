'use strict';
/*global describe, it, before*/

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

// var os = require('os');

describe('generator-naujs:app src at root', function() {
	before(function(done) {
		helpers
			.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: false })
			.withPrompts({ name: 'Nau App' })
			.on('end', done);
	});

	it('creates setting files', function() {
		assert.file([
			'.editorconfig',
			'.eslintignore',
			'.eslintrc.yml',
			'.gitignore',
			'.prettierrc.yml',
			'.stylelintrc.yml',
			'package.json',
			'README.md',
			'webpack.config.js',
		]);
	});

	it('sets eslint rules', function() {
		// just some random lines checking for current eslintrc.yml
		assert.fileContent([
			['.eslintrc.yml', /  - nau/],
			['.eslintrc.yml', /  - prettier/],
			['.eslintrc.yml', /  import\/prefer-default-export: 'off'/],
			['.eslintrc.yml', /parser: babel-eslint/],
			['.eslintrc.yml', /  - import/],
			['.eslintrc.yml', /      config: webpack.config.js/],
		]);
	});

	it('sets package.json dependencies', function() {
		assert.fileContent([
			['package.json', '@babel/core'],
			['package.json', '@babel/preset-env'],
			['package.json', '@babel/preset-stage-2'],
			['package.json', 'autoprefixer'],
			['package.json', 'babel-eslint'],
			['package.json', 'babel-loader'],
			['package.json', 'css-loader'],
			['package.json', 'eslint'],
			['package.json', 'eslint-config-nau'],
			['package.json', 'eslint-config-prettier'],
			['package.json', 'eslint-plugin-import'],
			['package.json', 'html-webpack-plugin'],
			['package.json', 'mini-css-extract-plugin'],
			['package.json', 'postcss-loader'],
			['package.json', 'postcss-preset-env'],
			['package.json', 'style-loader'],
			['package.json', 'stylelint'],
			['package.json', 'stylelint-config-standard'],
			['package.json', 'webpack'],
			['package.json', 'webpack-cli'],
			['package.json', 'webpack-dev-server'],
		]);
	});

	it('creates simple webpack boilerplate', function() {
		assert.file([
			'apple-touch-icon.png',
			'favicon.ico',
			'index.html',
			'css/_normalize.css',
			'css/_grid.css',
			'css/main.css',
			'js/app.js',
			'img/.gitignore',
		]);
	});
});

describe('generator-naujs:app src at subfolder', function() {
	before(function(done) {
		helpers
			.run(path.join(__dirname, '../generators/app'))
			.withOptions({ skipInstall: false })
			.withPrompts({ name: 'Nau App' })
			.withPrompts({ src: 'src' })
			.withPrompts({ dist: '~build' })
			.on('end', done);
	});

	it('creates setting files', function() {
		assert.file([
			'.editorconfig',
			'.eslintignore',
			'.eslintrc.yml',
			'.gitignore',
			'.prettierrc.yml',
			'.stylelintrc.yml',
			'package.json',
			'README.md',
			'webpack.config.js',
		]);
	});

	it('sets eslint rules', function() {
		// just some random lines checking for current eslintrc.yml
		assert.fileContent([
			['.eslintrc.yml', /  - nau/],
			['.eslintrc.yml', /  - prettier/],
			['.eslintrc.yml', /  import\/prefer-default-export: 'off'/],
			['.eslintrc.yml', /parser: babel-eslint/],
			['.eslintrc.yml', /  - import/],
			['.eslintrc.yml', /      config: webpack.config.js/],
		]);
	});

	it('sets package.json dependencies', function() {
		assert.fileContent([
			['package.json', '@babel/core'],
			['package.json', '@babel/preset-env'],
			['package.json', '@babel/preset-stage-2'],
			['package.json', 'autoprefixer'],
			['package.json', 'babel-eslint'],
			['package.json', 'babel-loader'],
			['package.json', 'css-loader'],
			['package.json', 'eslint'],
			['package.json', 'eslint-config-nau'],
			['package.json', 'eslint-config-prettier'],
			['package.json', 'eslint-plugin-import'],
			['package.json', 'html-webpack-plugin'],
			['package.json', 'mini-css-extract-plugin'],
			['package.json', 'postcss-loader'],
			['package.json', 'postcss-preset-env'],
			['package.json', 'style-loader'],
			['package.json', 'stylelint'],
			['package.json', 'stylelint-config-standard'],
			['package.json', 'webpack'],
			['package.json', 'webpack-cli'],
			['package.json', 'webpack-dev-server'],
		]);
	});

	it('creates simple webpack boilerplate', function() {
		assert.file([
			'src/apple-touch-icon.png',
			'src/favicon.ico',
			'src/index.html',
			'src/css/_normalize.css',
			'src/css/_grid.css',
			'src/css/main.css',
			'src/js/app.js',
			'src/img/.gitignore',
		]);
	});
});
