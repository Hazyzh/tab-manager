const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'production',
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
  optimization: {
    minimize: false, 
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['client'],
      template: './dev/index.html'
    })
  ]
};