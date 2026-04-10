import { AxiosRequestConfig } from 'axios';
import { apiService } from '@/api/services';
import { UpdateUserProfileRequest, UserProfileResponse } from '@/entities/user/api/userApi.types';

export class UserApi {
  static async getUserProfile(config: AxiosRequestConfig = {}): Promise<UserProfileResponse> {
    return apiService
      .get('api/user/profile', {
        ...config,
      })
      .then((response) => response.data);
  }

  static async updateUserProfile(
    data: UpdateUserProfileRequest,
    config: AxiosRequestConfig = {},
  ): Promise<UserProfileResponse> {
    return apiService
      .put('api/user/settings', data, {
        ...config,
      })
      .then((response) => response.data);
  }
}
