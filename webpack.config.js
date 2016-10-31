const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';

const generatePlugins = function () {
  return [
    /**
   * Define build variables.
   */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),

  /**
   * Package resources into index.html.
   */
    new HtmlWebpackPlugin({
      inject: true,
      path: 'dist',
      filename: 'index.html',
      template: 'src/index.html'
    })
  ].concat(...
    ({
      development: [
        new ExtractTextPlugin('[name].css')
      ],
      production: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('style.css')
      ]
    })[env]);
};

module.exports = {
    entry: path.resolve('src', 'index.js'),
    output: {
      path: path.resolve('dist'),
      filename: 'index.js'
    },
    resolve: {
      alias: {
        config: path.resolve('config'),
        core: path.resolve('src/core')
      },
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.jsx']
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['eslint-loader?']
        }
      ],
      loaders: [
        ({
          development: {
            test: /\.jsx?$/,
            loaders: ['react-hot-loader/webpack', 'babel-loader'],
            exclude: /node_modules/
          },
          production: {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        })[env],
        { test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'babel!svg-react'
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]:!less-loader'
          )
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'url?limit=25000'
        }
      ]
    },
    plugins: generatePlugins()
  };
