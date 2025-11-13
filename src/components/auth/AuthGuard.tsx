import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '@/providers/AuthProvider';
import { Spinner } from '@admiral-ds/react-ui';
import { useEffect, useState } from 'react';
import { LayoutContainer, LoaderContainer } from '../layout/AppLayout/styles';

export type AuthAccess = 'public' | 'protected' | 'guest-only';

interface AuthGuardProps {
  children: React.ReactNode;
  access?: AuthAccess;
  redirectTo?: string;
  redirectAuthenticatedTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = observer(
  ({ children, access = 'public', redirectTo = '/login', redirectAuthenticatedTo = '/' }) => {
    const authStore = useAuthStore();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const initializeAuth = async () => {
        if (!authStore.initialized) {
          await authStore.hydrate();
        }
        setIsChecking(false);
      };

      initializeAuth();
    }, [authStore]);

    if (isChecking || authStore.isLoading) {
      return (
        <LayoutContainer>
          <LoaderContainer>
            <Spinner />
          </LoaderContainer>
        </LayoutContainer>
      );
    }

    switch (access) {
      case 'guest-only':
        if (authStore.isAuthenticated) {
          const from = location.state?.from?.pathname || redirectAuthenticatedTo;
          return <Navigate to={from} replace />;
        }
        break;

      case 'protected':
        if (!authStore.isAuthenticated) {
          return <Navigate to={redirectTo} state={{ from: location }} replace />;
        }
        break;

      case 'public':
      default:
        break;
    }

    return <>{children}</>;
  },
);
