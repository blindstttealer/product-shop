import React, { useContext, useEffect } from 'react';
import { authStore, AuthStore } from '@/features/auth/model/authStore';
import { setupAuthInterceptor } from '@/api/interceptors/auth-interceptors';
import { apiService } from '@/api/services';

const AuthStoreContext = React.createContext<AuthStore | null>(null);

export const AuthStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    setupAuthInterceptor(apiService, authStore);
  }, []);
  return <AuthStoreContext.Provider value={authStore}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = () => {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error('useAuthStore must be used within AuthStoreProvider');
  return store;
};
