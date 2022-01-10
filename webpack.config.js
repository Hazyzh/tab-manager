const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const base = {
  mode: 'development',
  entry: {
    client: './dev/client.ts',
    worker: './dev/worker.ts',
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    compress: true,
    port: 8080,
    open: true,
    hot: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/
      },
    ]
  },
}

module.exports = {
  mode: 'development',
  entry: {
    client: './dev/client.ts',
    worker: './dev/worker.ts',
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/
      },
    ]
  },
};