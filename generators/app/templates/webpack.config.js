const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

// Enviroments
const PRODUCTION = String(process.env.NODE_ENV).toLowerCase() === 'production';

module.exports = {
	mode: PRODUCTION ? 'production' : 'development',
	entry: {
		app: ['<%= src %>/js/app.js'],
	},
	output: {
		path: path.resolve('build'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '<%= src %>/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							modules: false, // don't use CSS module for now
							localIdentName: '[name]__[local]__[hash:base64:5]',
							minimize: PRODUCTION,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !PRODUCTION,
							plugins: () => [
								postcssPresetEnv({
									/* use stage 3 features + css nesting rules */
									stage: 3,
									features: {
										'nesting-rules': true,
									},
								}),
							],
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', ['@babel/preset-stage-2', { decoratorsLegacy: true }]],
				},
			},
		],
	},
	devServer: {
		contentBase: './public/',
	},
	devtool: 'inline-source-map',
};
