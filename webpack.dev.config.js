const { resolve } = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    // 'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8082', // bundle the client for webpack-dev-server and connect to the provided endpoint
    './src/index.tsx', // the entry point of our app
  ],
  // entry: { app: './src/index.tsx' },
  devServer: {
    // 개발 서버 설정
    port: 8082, // 포트 설정
    // hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true, // 압축 유무
    historyApiFallback: true,
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
