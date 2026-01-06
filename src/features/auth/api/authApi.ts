import { AxiosRequestConfig } from 'axios';
import { apiService } from '../../../api/services';

export interface User {
  id: string;
  login: string;
  password?: string;
  email: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  login: string
}

export interface RegistrationResponse {
  user: User;
}

export interface getUserResponse {
  id: string;
  email: string;
}

export class AuthApi {
  static async registration(
    data: { email?: string; password?: string; login?: string },
    config: AxiosRequestConfig = {},
  ): Promise<RegistrationResponse> {
    return apiService
      .post<any>('api/user/register', data, {
        ...config,
      })
      .then((response) => response.data);
  }

  static async login(
    data?: { login: string; password: string },
    config: AxiosRequestConfig = {},
  ): Promise<LoginResponse> {
    console.log('data', data);
    return apiService
      .post<any>('api/user/login', data, {
        ...config,
      })
      .then((response) => response.data);
  }

  static async logout(config: AxiosRequestConfig = {}): Promise<any> {
    return apiService
      .delete<any>('api/user/logout', {
        ...config,
      })
      .then((response) => response.data);
  }
  // TODO: Вынести в контроллер users?

  static async me(config: AxiosRequestConfig = {}): Promise<getUserResponse> {
    return apiService
      .get<any>('api/user/me', {
        ...config,
      })
      .then((response) => response.data);
  }
}
