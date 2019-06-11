const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    tailwind: './src/tailwind.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Dementoren - Whiteboard to Code',
      myPageHeader: 'Dementoren - Whiteboard to Code',
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].style.css"
    })
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          "postcss-loader",
        ]
      }
    ]
  },
  devtool: 'source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true
  }
};
