const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_PATH = '/';

const baseConfig = require('./common');

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-source-map', // 报错的时候在控制台输出哪一行报错
  cache: true,
  plugins: [
    new webpack.DefinePlugin({ APP_ENV: JSON.stringify('dev') }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.png',
      template: './public/index.html',
      inject: true,
    }),
    ...baseConfig.plugins,
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 8001,
    hot: true,
    historyApiFallback: {
      index: `${PUBLIC_PATH}/index.html`,
    },
  },
};
