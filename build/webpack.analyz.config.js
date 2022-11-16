const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfigBuild = require('./webpack.build.config');

module.exports = merge(webpackConfigBuild, {
  devtool: '#cheap-module-source-map',
  plugins: [new BundleAnalyzerPlugin()],
});
