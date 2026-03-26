import { makeAutoObservable } from 'mobx';
import { User } from './types';

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }

  updateUser(data: Partial<User>) {
    if (this.user) this.user = { ...this.user, ...data };
  }

  get isAuth(): boolean {
    return !!this.user;
  }
}

export const userStore = new UserStore();
