import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import dotenv from 'dotenv';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
dotenv.config();

const createConfig = (isProduction: boolean): webpack.Configuration => ({
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [!isProduction && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              exportType: 'named',
              namedExport: 'ReactComponent',
              svgoConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isProduction,
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_URL': JSON.stringify(
        process.env.REACT_APP_API_URL || 'http://localhost:3000',
      ),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});

const devServerConfig: DevServerConfiguration = {
  historyApiFallback: true,
  hot: true,
  port: process.env.PORT ?? 4000,
  host: process.env.HOST ?? 'localhost',
  open: true,
};

export default (env: any, argv: any) => {
  console.log('env---', env);
  console.log('argv---', argv);

  const isProduction = process.env.NODE_ENV === 'production';

  const config = createConfig(isProduction);

  if (!isProduction) {
    return {
      ...config,
      devtool: 'inline-source-map',
      devServer: devServerConfig,
    };
  }

  return config;
};
