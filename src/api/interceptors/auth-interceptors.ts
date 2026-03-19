import { AuthStore } from '@/features/auth/model/authStore';
import { ApiService } from '../services/api-service';
import { userStore } from '@/entities/user/model/userStore';

export function setupAuthInterceptor(api: ApiService, authStore: AuthStore) {
  api.instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        userStore.setUser(null);
      }
      return Promise.reject(err);
    },
  );
}
