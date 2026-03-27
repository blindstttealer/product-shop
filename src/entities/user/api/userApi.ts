import { AxiosRequestConfig } from 'axios';
import { apiService } from '@/api/services';

export class UserApi {
  static async getUserProfile(config: AxiosRequestConfig = {}): Promise<any> {
    return apiService
      .get('api/user/profile', {
        ...config,
      })
      .then((response) => response.data);
  }
}
