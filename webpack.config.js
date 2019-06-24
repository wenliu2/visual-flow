const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
				include: [path.resolve(__dirname, 'src')],
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
			{
				test: /\.(scss|css)$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{ 
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: path.resolve(__dirname, "./"),
						outputPath: './',
						publicPath: './',
						useRelativePaths: true
					}
				}]
			},
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
		filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        template: './html/index.html',
        filename: './index.html' //relative to root of the application
    })
  ],
	optimization: {
		minimizer: [new UglifyJSPlugin({
			extractComments: 'all',
			sourceMap: true,
		})],
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};