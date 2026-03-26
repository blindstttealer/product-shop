import { makeAutoObservable, runInAction } from 'mobx';
import { AuthApi } from '../api/authApi';
import { userStore } from '@/entities/user/model/userStore';

export class AuthStore {
  isLoading = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading(flag: boolean) {
    this.isLoading = flag;
  }

  setInitialized(flag: boolean) {
    this.initialized = flag;
  }

  async hydrate() {
    this.setLoading(true);
    try {
      const resp = await AuthApi.me();
      runInAction(() => {
        userStore.setUser(resp || null);
      });
    } catch (err) {
      runInAction(() => {
        userStore.setUser(null);
      });
    } finally {
      runInAction(() => {
        this.initialized = true;
        this.isLoading = false;
      });
    }
  }

  async registration(payload: { email?: string; password?: string; login?: string }) {
    this.setLoading(true);
    try {
      const res = await AuthApi.registration(payload);
      runInAction(() => {
        if (res.user) {
          userStore.setUser(res.user);
        }
      });
      return res;
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async login(payload: { loginOrEmail: string; password: string }) {
    this.setLoading(true);
    try {
      console.log('payload', payload);
      const res = await AuthApi.login({ login: payload.loginOrEmail, password: payload.password });

      runInAction(() => {
        if (res) {
          userStore.setUser(res);
        }
      });
      return res;
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      await AuthApi.logout();
      runInAction(() => {
        userStore.setUser(null);
      });
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}
export const authStore = new AuthStore();
