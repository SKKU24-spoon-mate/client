const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsWebpackPlugin()],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      querystring: require.resolve('querystring-es3'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['source-map-loader'],
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'spoon-mate',
      template: './public/index.html',
      // favicon: './public/onlyLogo.png',
      // custom: `<script src="./runtime-env.js"></script>`,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      defaults: './.env',
      systemvars: true,
    }),
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: false,
  },
  ignoreWarnings: [/Failed to parse source map/],
};
