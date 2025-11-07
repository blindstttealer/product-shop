import { removeFromLocalStorage, saveToLocalStorage } from '../../../shared/utils/localStorage';
import { AuthApi } from '../api/authApi';
import { makeAutoObservable, runInAction } from 'mobx';

interface User {
  id: string;
  userName?: string;
  email?: string;
  meta?: {
    ip: string;
    userAgent: string;
  };
}

export interface LoginCredits {
  email: string;
  password: string;
}

export interface RegistrationCredits {
  email: string;
  password: string;
  userName: string;
}

export class AuthStore {
  private user: User | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async registration(credits: RegistrationCredits) {
    this.loading = true;
    try {
      const response = await AuthApi.registration(credits);

      saveToLocalStorage('accessToken', response.token.accessToken);

      saveToLocalStorage('refreshToken', response.token.refreshToken);

      runInAction(() => {
        this.user = {
          id: response.user.id,
          email: response.user.email,
          userName: response.user.userName,
        };
      });

      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  async login(credits: LoginCredits) {
    this.loading = true;
    try {
      const response = await AuthApi.login(credits);

      saveToLocalStorage('accessToken', response.token.accessToken);

      saveToLocalStorage('refreshToken', response.token.refreshToken);

      runInAction(() => {
        this.user = {
          id: response.user.id,
          email: response.user.email,
          userName: response.user.userName,
        };
      });

      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  logout() {
    this.user = null;
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('refreshToken');
  }

  async me() {
    this.loading = true;
    try {
      const response = await AuthApi.me();

      runInAction(() => {
        this.user = {
          id: response.user.id,
          email: response.user.email,
          userName: response.user.userName,
        };
        this.user.meta = response.meta;
      });

      this.loading = false;
    } catch (error) {
      console.error('error me---', error);
      this.loading = false;
    }
  }

  get authorizationUser() {
    return this.user;
  }
}
