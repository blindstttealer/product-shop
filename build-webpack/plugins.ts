import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import type { WebpackOptions } from './options';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
export const getPlugins = (options: WebpackOptions, paths: any, isProduction: boolean) =>
  [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.template,
      minify: isProduction,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.mode),
      'process.env.REACT_APP_API_URL': JSON.stringify(options.apiUrl),
    }),
    new webpack.ProgressPlugin(),
    !isProduction && new ReactRefreshWebpackPlugin(),
    options.analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', 
        reportFilename: '../bundle-report.html',
        openAnalyzer: true, 
      }),
  ].filter(Boolean);