const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const glob = require('glob');

// const dev = process.env.NODE_ENV === 'dev';

const config = {
  // entry: path.resolve(__dirname, './src'),
  entry: [
    './src/pages/index.js',
    './src/pages/photographer.js',
    './src/factories/lightBox.js',
    './src/factories/media.js',
    './src/factories/photographer.js',
    './src/utils/contactForm.js',
    './src/api/api.js',
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    port: 4000,
  },
  // devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['main'],
    }),
    new HtmlWebPackPlugin({
      filename: 'photographer.html',
      template: 'public/photographer.html',
      chunks: ['exampleEntry'],
    }),
    new MiniCssExtractPlugin(),
  ],

  // mode: 'development',
};

// if (!dev) {
//   config.plugins.push(new UglifyJSPlugin({
//     sourceMap: true,
//   }));
// }
// const files = glob.sync(`${process.cwd()}/public/*.html`);

// files.forEach((element) => {
//   config.plugins.push(new HtmlWebPackPlugin({
//     template: element,
//   }));
// });
module.exports = config;
