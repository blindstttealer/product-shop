import { ApiService } from "./api-service";
import { AuthExtension } from "./auth-service";

export function createApiService() {
  const api = new ApiService()

  new AuthExtension(api, () => () => console.log('AuthExtension'));

  return api;
}

export const apiService = createApiService();