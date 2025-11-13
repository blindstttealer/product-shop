import { ApiService } from './api-service';
import { AuthExtensionSimple } from '../interceptors/auth-interceptors';
import { authStore } from '@/features/auth/model/authStore';

const apiService = new ApiService({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  timeout: 10000,
});

new AuthExtensionSimple(apiService, authStore);

export { apiService };
