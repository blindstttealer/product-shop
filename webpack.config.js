const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AppConfig = require("./src/app.config");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require("webpack");
require("dotenv").config(); 
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.bundle.js",
    publicPath: AppConfig.webPackPublicPath,
  },
  plugins: [
 new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "public/index.html"),
}),
new Dotenv({
    systemvars: true, 
  }),
  ],
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(gif|svg|jpg|png|otf|ttf)$/,
        use: "file-loader",
      },
      {
        test: /\.(js|ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [ new TsconfigPathsPlugin({ configFile: path.resolve(process.cwd(), 'tsconfig.json') }) ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,        
    host: 'localhost', 
    open: true,       
  },
};
