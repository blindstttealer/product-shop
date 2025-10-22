const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AppConfig = require("./src/app.config");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.bundle.js",
    publicPath: AppConfig.webPackPublicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "src/favicon.ico",
      template: "src/index.html",
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
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    hot: true,
  },
};
