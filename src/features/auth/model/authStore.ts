import { makeAutoObservable, runInAction } from 'mobx';
import { AuthApi } from '../api/authApi';

export interface User {
  id: string;
  login?: string;
  email: string;
}

export class AuthStore {
  user: User | null = null;
  loading = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  get authenticatedUser() {
    return this.user;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }

  setLoading(flag: boolean) {
    this.loading = flag;
  }

  setInitialized(flag: boolean) {
    this.initialized = flag;
  }

  async hydrate() {
    this.setLoading(true);
    try {
      const resp = await AuthApi.getUser();
      runInAction(() => {
        if (resp && resp.id) {
          this.user = {
            id: resp.id,
            email: resp.email,
            // бэк забыл добавить логин, потом еще и его устанавливать
          };
        } else {
          this.user = null;
        }
        this.initialized = true;
      });
      return this.user;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async registration(payload: { email?: string; password?: string; login?: string }) {
    this.setLoading(true);
    try {
      const res = await AuthApi.registration(payload);
      runInAction(() => {
        if (res.user) {
          const { email, id, login } = res.user;
          this.user = { email, id, login };
        }
      });
      return res;
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async login(payload: { login: string; password: string }) {
    this.setLoading(true);
    try {
      const res = await AuthApi.login({ email: payload.login, password: payload.password });

      runInAction(() => {
        if (res) {
          const { email, id } = res;
          this.user = { email, id };
        }
      });
      return res;
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      await AuthApi.logout();
      runInAction(() => {
        this.user = null;
      });
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}
