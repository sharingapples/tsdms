var webpack = require('webpack');
var path = require('path');

// The plugin used for generating the final CSS file
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
  name: "browser",

  devtool: 'inline-source-map',

  entry: [
    './react/index.js',
  ],
  output: {
    path:  './www/assets',
    filename: 'js/bundle.js',

    /* Needed to make sure the styles don't use relative url, should also affect other static assets */
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles/style.css", { allChunks: true }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"    /* the jQuery used by bootstrap */
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'NODE': false
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'stage-0', 'es2015', 'react' ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: 'file?name=styles/fonts/[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'file?name=img/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'wscada-ui': path.resolve('./src/js'), /* This the name that references this project */
      'styles': path.resolve('./src/styles') /* Easily include styles in the project */
    }
  }
},{
  name: "server-side",
  entry: "./react/routes.js",
  target: "node",
  output: {
    path: "./www/assets",
    filename: "../../react/server.generated.js",
    publicPath: "/assets/",
    libraryTarget: "commonjs2"
  },
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles/style.css", { allChunks: true }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"    /* the jQuery used by bootstrap */
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'NODE': true
    }),
  ],
  module :{
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'stage-0', 'es2015', 'react' ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: 'file?name=styles/fonts/[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'file?name=img/[name].[ext]'
      }
    ]
  }
}]
