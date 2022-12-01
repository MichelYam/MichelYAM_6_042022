// const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// // const glob = require('glob');

// // const dev = process.env.NODE_ENV === 'dev';

// const config = {
//   // entry: path.resolve(__dirname, './src'),
//   entry: [
//     './src/pages/index.js',
//     './src/pages/photographer.js',
//     './src/factories/lightBox.js',
//     './src/factories/media.js',
//     './src/factories/photographer.js',
//     './src/utils/contactForm.js',
//     './src/api/api.js',
//   ],
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'bundle.js',
//   },
//   devServer: {
//     static: path.resolve(__dirname, './dist'),
//     open: true,
//     port: 4000,
//   },
//   // devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.(scss|css)$/,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//     ],
//   },
//   plugins: [
//     new ESLintPlugin(),
//     new CleanWebpackPlugin(),
//     new HtmlWebPackPlugin({
//       filename: 'index.html',
//       template: 'public/index.html',
//       chunks: ['main'],
//     }),
//     new HtmlWebPackPlugin({
//       filename: 'photographer.html',
//       template: 'public/photographer.html',
//       chunks: ['exampleEntry'],
//     }),
//     new MiniCssExtractPlugin(),
//   ],

//   // mode: 'development',
// };

// module.exports = config;
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
