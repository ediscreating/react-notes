const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
  entry: ['react-hot-loader/patch'].concat(common.entry),
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
};

module.exports = merge(common, config);
