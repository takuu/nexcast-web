var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
console.log('NODE_ENV: ', process.env.NODE_ENV);
const bundle = process.env.BUNDLE || 'client';
const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: bundle === 'server'
    ? 'source-map'
    : 'eval-cheap-module-source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    './client',
    'webpack-hot-middleware/client'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/app.js'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new CopyWebpackPlugin([
      { from: './template.html', to: 'index.html' },
    ]),
    new ExtractTextPlugin({
      filename:  'css/[name].css',
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true)
      }
    })
  ] : [
    new ExtractTextPlugin('css/app.css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env), BROWSER: JSON.stringify(true) }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [{removeTitle: false}],
                floatPrecision: 2
              }
            }
          }
        ]
      }
      //{
      //  test: /\.js$/,
      //  loader: "eslint-loader", exclude: /node_modules/
      //}
      //{
      //  test: /\.css$/,
      //  loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      //},
      //{
      //  test: /\.styl$/,
      //  loader: 'style!css?modules&localIdentName=[local]___[hash:base64:10]!stylus' // eslint-disable-line
      //}
    ]
  }
};