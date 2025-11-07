import { AxiosRequestConfig } from 'axios';
import { apiService } from '../../../api/services';

export interface User {
  id: string;
  login: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  id: string;
  email: string;
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
    data?: { email: string; password: string },
    config: AxiosRequestConfig = {},
  ): Promise<LoginResponse> {
    return apiService
      .post<any>('http://127.0.0.1:7000/auth/login', data, {
        ...config,
      })
      .then((response) => response.data);
  }

  static async logout(config: AxiosRequestConfig = {}): Promise<any> {
    return apiService
      .get<any>('http://127.0.0.1:7000/auth/logout', {
        ...config,
      })
      .then((response) => response.data);
  }

  static async getUser(config: AxiosRequestConfig = {}): Promise<getUserResponse> {
    return apiService
      .get<any>('api/user/get', {
        ...config,
      })
      .then((response) => response.data);
  }
}
