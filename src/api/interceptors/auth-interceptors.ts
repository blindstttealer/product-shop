import type { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';
import { getUserControllerGetMeQueryKey } from '@/api/generated/user/user';
import { orvalAxiosInstance } from '@/api/orval-axios-instance';
import { apiService } from '@/api/services';
import { userStore } from '@/entities/user/model/userStore';

function attachUnauthorizedHandler(instance: AxiosInstance, queryClient: QueryClient) {
  const id = instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        userStore.setUser(null);
        queryClient.removeQueries({ queryKey: getUserControllerGetMeQueryKey() });
      }
      return Promise.reject(err);
    },
  );
  return () => instance.interceptors.response.eject(id);
}

/** Clears session on 401 for both legacy {@link apiService} and Orval axios instance. */
export function setupUnauthorizedInterceptor(queryClient: QueryClient) {
  const ejectLegacy = attachUnauthorizedHandler(apiService.instance, queryClient);
  const ejectOrval = attachUnauthorizedHandler(orvalAxiosInstance, queryClient);
  return () => {
    ejectLegacy();
    ejectOrval();
  };
}
