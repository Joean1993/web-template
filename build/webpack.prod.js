const path = require('path')
const { merge } = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.js')

const domain = process.env.npm_config_domain

module.exports = merge(baseConfig, {
	mode: 'production',
	optimization: {
		splitChunks: {
			// 分隔代码
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					minChunks: 1,
					chunks: 'initial',
					minSize: 0,
					priority: 1,
				},
				commons: {
					name: 'commons',
					minChunks: 2,
					chunks: 'initial',
					minSize: 0,
				},
			},
		},
		minimizer: [
			new TerserWebpackPlugin({
				extractComments: false, // 移除 LICENSE.txt
				parallel: true,
				terserOptions: {
					compress: {
						warnings: true,
						drop_console: true,
						drop_debugger: true,
						pure_funcs: ['console.log', 'console.table'],
					},
					format: {
						comments: false, // 移除 LICENSE 注释
					},
				},
			}),
			new CssMinimizerPlugin(),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[contenthash:8].css' }),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../public'),
					to: path.resolve(__dirname, '../dist'),
					filter: source => !source.includes('index.html'),
				},
				{
					from: path.resolve(__dirname, '../public/favicon.ico'),
					to: path.resolve(__dirname, `../dist`),
					toType: 'dir',
				},
			],
		}),
	],
})
