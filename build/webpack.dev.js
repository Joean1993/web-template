const path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
	mode: 'development',
	devServer: {
		compress: false,
		hot: true,
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, '../public'),
		},
		open: true,
		proxy: {
			'/dev': {
				target: 'https://kunlun-cn-dev.changdu.ltd',
				pathRewrite: {
					'^/dev': '/',
				},
				secure: false,
				changeOrigin: true,
			},
		},
	},
	plugins: [new ReactRefreshWebpackPlugin()],
})
