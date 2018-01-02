const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../server/render.js'),
  output: {
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: 'css-loader/locals'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
    ]
  },
  plugins: [
    // REQUIRED: To make dynamic css work correctly
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
