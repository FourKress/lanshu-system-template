const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressbarWebpack = require('progress-bar-webpack-plugin');

const config = require('../config');

const { title } = config;
const { runtime } = process.env;
const isDev = runtime !== 'production';
const version = config.version || Date.now();

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}

const configFileMap = {
  test: resolve(
    '../node_modules/@lanshu/system-common/config/wd.config.test.js',
  ),
  production: resolve(
    '../node_modules/@lanshu/system-common/config/wd.config.build.js',
  ),
  dev: resolve('../node_modules/@lanshu/system-common/config/wd.config.js'),
};
const configFile = configFileMap[runtime] || configFileMap.dev;
const iconfontFile = resolve(
  '../node_modules/@lanshu/system-common/assets/styles/iconfont/iconfont.js',
);

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title,
    template: resolve('../index.html'),
    favicon: resolve('../favicon.ico'),
    hash: true,
    version,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
  }),
  new ProgressbarWebpack(),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    CONFIG: JSON.stringify(config),
  }),
  new CopyPlugin([
    { from: configFile, to: 'js/wd.config.js' },
    { from: iconfontFile, to: 'js/iconfont.js' },
  ]),
];

if (!isDev) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash:5].${version}.css`,
      chunkFilename: `css/[name].[hash:5].${version}.css`,
    }),
  );
}

module.exports = {
  entry: resolve('../src/main.js'),
  output: {
    path: resolve('../dist'),
    filename: `js/[name].[hash:5].${version}.js`,
    chunkFilename: `js/[name].[hash:5].${version}.js`,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css', '.less'],
    alias: {
      '@': resolve('../src'),
      '@common': resolve('../node_modules/@lanshu/system-common'),
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!.*@lanshu\/system-common(?!.*node_modules))/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader?importLoaders=1' },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules(?!.*@lanshu\/system-common(?!.*node_modules))/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules(?!.*@lanshu\/system-common(?!.*node_modules))/,
        options: {
          loaders: {
            less: [
              'vue-style-loader',
              'css-loader',
              'less-loader?indentedSyntax',
            ],
          },
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules(?!.*@lanshu\/system-common(?!.*node_modules))/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]?[hash]',
            },
          },
        ],
      },
      {
        test: /(iconfont.svg)|\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules(?!.*@lanshu\/system-common(?!.*node_modules))/,
        use: 'url-loader',
      },
    ],
  },
};
