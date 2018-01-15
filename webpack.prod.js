const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, 'sass-loader']
        }),
        exclude: /node_modules/
      }
    ].concat(common.module.rules[0])
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Notes App',
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('style.css'),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin()
  ]
};

module.exports = merge.strategy({
  'module.rules': 'replace',
  'plugins': 'replace'
})(common, config);
