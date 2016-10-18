const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const cfg = require(__dirname + '/app/config.js');

const isProd = process.env.NODE_ENV === 'production';
const hash = '[hash:7]';

const entry = {
  app: './app/index.js',
};

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new HTMLWebpackPlugin({
    title: cfg.title,
    description: cfg.description,
    template: 'app/index.html',
    prod: isProd,
    minify: isProd ? {
      removeComments: true,
      collapseWhitespace: true,
    } : null,
  }),
  new ExtractTextPlugin({
    filename: `css/app.${hash}.css`,
    allChunks: true,
  }),
];
const envPlugins = isProd
? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin(`build: ${new Date().toString()}`),
]
: [];

const config = {

  devtool: isProd ? '' : 'source-map',

  entry: entry,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: `js/[name].${hash}.js`,
    publicPath: cfg.dist_url,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel',
        include: [
          path.join(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/amazeui-touch/js'),
        ]
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: isProd ? `css?minimize!postcss!sass` : 'css?sourceMap!postcss!sass?sourceMap',
        }),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loaders: 'file?name=[path][name].[ext]&context=app',
      },
      {
        test: /\.txt$|\.json$|\.webapp$/,
        loader: 'file?name=[path][name].[ext]&context=app'
      },
      {
        test: /\.svg$/,
        loader: 'url?mimetype=image/svg+xml&name=[name].[ext]'
      },
      {
        test: /\.woff$/,
        loader: 'url?mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url?mimetype=application/font-woff2&name=[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url?mimetype=application/octet-stream&name=[name].[ext]'
      },
    ],
  },

  plugins: basePlugins.concat(envPlugins),

};

module.exports = config;
