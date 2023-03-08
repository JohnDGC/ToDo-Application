/** @type {import('webpack).Configuration} */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  // entry: "./src/main.ts",
  entry: {
    bundle: path.resolve(__dirname, "./src/main.ts"),
  },
  output: {
    // filename: "build.js",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    // filename: "[name].js",
    // publicPath: ""
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "/index.html"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: "ToDo Application",
        filename: "login.html",
        template: "./login.html",
      }
    ),
    new HtmlWebpackPlugin({
        title: "ToDo Application",
        filename: "index.html",
        template: "./index.html",
    })
  ],
  // target: 'node'
  target: "web",
};

