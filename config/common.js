const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Webpackbar = require('webpackbar');

const PUBLIC_PATH = '/';

const basePath = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    main: path.resolve(basePath, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(basePath, 'dist'),
    publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: '[name].js', // 编译后的文件名字
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: 'pre',
        use: ['eslint-loader'],
        include: path.resolve(basePath, 'src'),
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
        include: path.resolve(basePath, 'src'),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: path.resolve(basePath, 'src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[hash:4].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Webpackbar(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(basePath, 'public'),
          to: './',
          globOptions: {
            ignore: ['**/favicon.png', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    alias: {
      '@': path.resolve(basePath, 'src'),
    },
  },
};
