import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DropdownContainer} from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/providers/AuthProvider';
import { UserAvatar } from '@/components/ui/user-avatar';

interface UserMenuProps {
  name?: string;
  email?: string;
  targetElem: HTMLDivElement 
}

export const DropDownUserMenu: FC<UserMenuProps> = observer(({ name, email, targetElem }) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    authStore.logout();
    navigate('/registration', { replace: true });
  }, [authStore, navigate]);

  return (
    <DropdownContainer targetElement={targetElem}>
      <span>{name}</span>
      <span>{email}</span>
      <Button onClick={handleLogout}>Выйти</Button>
      <Button onClick={() => {}}>Настройки</Button>
    </DropdownContainer>
  );
});
