import { AxiosRequestConfig } from 'axios';
import { apiService } from '../../services';
import {  UsersResponse } from './types';



export class UsersApi {
  static async getUsers(config: AxiosRequestConfig = {}): Promise<UsersResponse> {
    return apiService
      .get<any>('api/user/users', {
        ...config,
      })
      .then((response) => response.data);
  }

  
}
