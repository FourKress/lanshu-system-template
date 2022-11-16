const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfigBase = require('./webpack.base.config');

const isProduction = process.env.runtime === 'production';

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}

module.exports = merge(webpackConfigBase, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'minimal',
  plugins: [new CompressionPlugin(), new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
        elementUI: {
          name: 'element-ui',
          priority: 20,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'),
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        // 压缩js
        terserOptions: {
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        // 压缩css
        cssProcessorOptions: {
          safe: true,
        },
      }),
    ],
  },
});
