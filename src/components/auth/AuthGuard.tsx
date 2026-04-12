import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from '@admiral-ds/react-ui';
import { useUserControllerGetMe } from '@/api/generated/user/user';
import { LayoutContainer, LoaderContainer } from '../layout/AppLayout/styles';
import { mapSessionToUser } from '@/features/auth/lib/mapSessionUser';
import { sessionUserQueryOptions } from '@/features/auth/lib/sessionUserQueryOptions';

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
  const sessionQuery = useUserControllerGetMe({
    query: sessionUserQueryOptions,
  });

  const isBootstrapping = !sessionQuery.isFetched;

  if (isBootstrapping) {
    return (
      <LayoutContainer>
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      </LayoutContainer>
    );
  }

  const isAuthed = mapSessionToUser(sessionQuery.data) !== null && !sessionQuery.isError;

  switch (access) {
    case 'guest-only':
      if (isAuthed) {
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
