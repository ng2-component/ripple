'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


let extractCSS = new ExtractTextPlugin('[name].css');
let extractLESS = new ExtractTextPlugin('[name].less');

const fs = require('fs');
const fsExa = require('fs.extra');
const path = require('path');

const env = process.env.NODE_ENV;

//入口文件，根据不同环境, 开发和发布不同
const index = env == 'pro' ?  './src/index' : './src/container/index'; 

console.log('index', index);
//发布环境下，先删除 build 目录
if(env == 'pro'){
  let buildPath = path.join(__dirname, 'build');
  let isBuildExits = fs.existsSync(buildPath);
  if(isBuildExits) {
    fsExa.rmrfSync(buildPath);
  }
}

module.exports = {
  //字符串、数组和对象
  entry: {
    index: index          
  },
  output: {
    path: path.join('./build'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['to-string-loader', 'css-loader'])
    }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(['to-string-loader', 'css-loader', 'less-loader'])
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
    }]
  },
  resolve: {
    root: [
      path.join(__dirname, './src')
    ],
    extensions: ['', '.ts', '.js']
  },
  plugins: [
    extractCSS,
    extractLESS,
    commonsPlugin
  ]
};
