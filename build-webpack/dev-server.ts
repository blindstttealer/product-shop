import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export const getDevServer = (options: any): DevServerConfiguration => ({
  historyApiFallback: true,
  hot: true,
  port: options.port || 3000,
  host: options.host || 'localhost',
  open: options.open ?? true,
});