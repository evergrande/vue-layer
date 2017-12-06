const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const etcss = new ExtractTextPlugin("../dist/[name].css");
module.exports = {

     entry: {
       "vue-middleware-layer": "./src/main.js"
     },

     output: {
       path: path.resolve(__dirname, "../dist"),
       filename: '[name].js'
     },

     module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },

          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: etcss.extract([ 'css-loader' ])
          },

          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: '../dist/img/[name].[hash:7].[ext]'
            }
          },

          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: '../dist/fonts/[name].[ext]'
            }
          }
        ]
     },

     plugins: [
        etcss
     ]

}
