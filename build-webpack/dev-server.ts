import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export const getDevServer = (options: any): DevServerConfiguration => ({
  historyApiFallback: true,
  hot: true,
  port: options.port || Number(process.env.PORT) || 8080,
  host: options.host || 'localhost',
  open: options.open ?? true,
});