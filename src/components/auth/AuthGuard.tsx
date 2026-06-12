import { observer } from 'mobx-react-lite';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { Spinner } from '@admiral-ds/react-ui';
import { LayoutContainer, LoaderContainer } from '../layout/AppLayout/styles';
import { useAuth } from '@/features/auth/hooks';
import { useEffect } from 'react';

export type AuthAccess = 'public' | 'protected' | 'guest-only';

interface AuthGuardProps {
  children: React.ReactNode;
  access?: AuthAccess;
  redirectTo?: string;
  redirectAuthenticatedTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = observer((props: AuthGuardProps) => {
  const { children, access = 'public', redirectAuthenticatedTo = '/' } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/registration', { replace: true });
    }
  }, [isAuth, navigate]);

  if (isLoading) {
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
      if (isAuth) {
        const from = location.state?.from?.pathname || redirectAuthenticatedTo;
        return <Navigate to={from} replace />;
      }
      break;

    case 'public':
    default:
      break;
  }

  return <>{children}</>;
});
