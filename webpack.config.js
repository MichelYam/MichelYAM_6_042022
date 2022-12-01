const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/pages/index.js'),
    photographer: path.resolve(__dirname, 'src/pages/photographer.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/assets',
          to: 'assets',
        },
        {
          from: './public/css',
          to: 'css',
        },
        {
          from: './data/photographers.json',
          to: 'data',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      chunks: ['index'],
      scriptLoading: 'module',
    }),
    new HtmlWebpackPlugin({
      filename: 'photographer.html',
      template: path.resolve(__dirname, 'public/photographer.html'),
      chunks: ['photographer'],
      scriptLoading: 'module',
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    port: 4000,
  },
};
