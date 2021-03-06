var path = require('path')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var tsconfig = require('./tsconfig.json')
var entry = tsconfig.files.filter(function (file) {
  return path.basename(file, path.extname(file)) === 'index'
})[0]

module.exports = {
  entry: entry,
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8000/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '',
      '.ts', '.tsx', '.js',
      '.css'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'ts'
        ]
      },
      {
        test: /\.json?$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [
          'style',
          'css',
        ]
      },
      {
        test: /\.s[ca]ss$/,
        loaders: [
          'style',
          'css',
          'sass',
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=[sha512:hash:base64:7].[ext]&limit=10000&mimetype=application/font-woff'
      },
    ]
  },
  postcss: function () {
    return [
      require('postcss-modules-local-by-default'),
      require('autoprefixer'),
      require('precss'),
      require('postcss-url'),
    ]
  },
  plugins: [
    new LiveReloadPlugin()
  ]
}
