const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV == 'development'

module.exports = {
	entry: path.join(__dirname, '../src/index.jsx'),
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.join(__dirname, '../dist'),
		clean: true,
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				use: [
					// 多线程
					'thread-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: 3,
									},
								],
								'@babel/preset-react',
							],
						},
					},
				],
				include: [path.resolve(__dirname, '../src')],
			},
			{
				test: /.(s?css)$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: isDev ? '[path]_[name]_[local]' : '[local]-[hash:base64:8]',
							},
						},
					},
					'postcss-loader',
					'sass-loader',
				],
				include: [path.resolve(__dirname, '../src')],
			},
			{
				test: /.(png|jpg|jpeg|gif|svg|woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
				type: 'asset',
				parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
				generator: { filename: '[contenthash:8][ext]' },
			},
		],
	},
	// 构建缓存
	cache: false,
	resolve: {
		alias: {
			'@': path.join(__dirname, '../src'),
		},
		extensions: ['.js', '.jsx', '.scss', '.css'],
		modules: [path.resolve(__dirname, '../node_modules')],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
			inject: true,
		}),
	],
}
