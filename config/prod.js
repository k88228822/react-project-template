const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./common');

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    ...baseConfig.output,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  stats: {
    children: false, // 不输出子模块的打包信息
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ APP_ENV: JSON.stringify('prod') }),
    new MiniCssExtractPlugin({
      filename: 'dist/[name].[chunkhash:8].css', // 生成的文件名
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.png',
      template: './public/index.html',
      hash: false,
      inject: 'body',
    }),
    ...baseConfig.plugins,
  ],
};
