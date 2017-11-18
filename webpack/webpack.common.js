var webpack = require('webpack');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },
  

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
      },
    ]
  },

  plugins: [
    // Workaround for https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      helpers.root('./src'),
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};