import { AuthStore } from '@/features/auth/model/authStore';
import { ApiService } from '../services/api-service';

// export class AuthExtensionSimple {
//   constructor(
//     private api: ApiService,
//     private authStore: AuthStore,
//   ) {
//     this.setupInterceptors();
//   }

//   private setupInterceptors() {
//     this.api.instance.interceptors.response.use(
//       (res) => res,
//       (err) => {
//         const status = err?.response?.status;
//         if (status === 401) {
//           console.warn('[AuthExtensionSimple] 401 — clearing authStore');
//           this.authStore.clearUser();
//         }
//         return Promise.reject(err);
//       },
//     );
//   }
// }

export function setupAuthInterceptor(api: ApiService, authStore: AuthStore) {
  api.instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        authStore.clearUser();
      }
      return Promise.reject(err);
    },
  );
}