const path = require('path');
const webpack = require('webpack');

module.exports = {

     entry: {
       app: "./src/main.js"
     },

     output: {
       path: path.resolve(__dirname, "../dist"),
       filename: '[name].js'
     },

     module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },

          {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "url-loader"
          }
          
        ]
     }

}
