import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { setupUnauthorizedInterceptor } from '@/api/interceptors/auth-interceptors';
import { AuthSessionSync } from '@/features/auth/ui/AuthSessionSync';

export const AuthStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return setupUnauthorizedInterceptor(queryClient);
  }, [queryClient]);

  return (
    <>
      <AuthSessionSync />
      {children}
    </>
  );
};
