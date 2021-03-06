const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const port = parseInt(process.env.PORT)
module.exports = {
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000
  },
  entry: './src/index.tsx',
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    port: port
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./templates/index.html",
    }),
  ],
  output:{
    filename: "[hash].js"
  },
  optimization:{
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        },
      },
    ]
  },
  resolve: {
    alias: {
      '~': '/srv/src',
      'stories': '/srv/stories',
      'tests': '/srv/tests',
      'package.json':'/srv/package.json',
    },
    extensions: ['.tsx', '.ts', '.js' ]
  }
};
