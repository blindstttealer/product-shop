import { AuthExtensionSimple } from '../interceptors/auth-interceptors';
import { ApiService } from './api-service';

const apiService = new ApiService({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  timeout: 10_000,
});

new AuthExtensionSimple(apiService);

export { apiService };
