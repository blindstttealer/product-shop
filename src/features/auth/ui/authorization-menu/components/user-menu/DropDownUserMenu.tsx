import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DropdownContainer } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { getUserControllerGetMeQueryKey, useUserControllerLogout } from '@/api/generated/user/user';
import { userStore } from '@/entities/user/model/userStore';
import { UserAvatar } from '@/components/ui/user-avatar';

interface UserMenuProps {
  name?: string;
  email?: string;
  targetElem: HTMLDivElement;
}

export const DropDownUserMenu: FC<UserMenuProps> = observer(({ name, email, targetElem }) => {
  const queryClient = useQueryClient();
  const logoutMutation = useUserControllerLogout();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: getUserControllerGetMeQueryKey() });
        userStore.setUser(null);
        navigate('/registration', { replace: true });
      },
    });
  }, [logoutMutation, navigate, queryClient]);

  return (
    <DropdownContainer targetElement={targetElem}>
      <span>{name}</span>
      <span>{email}</span>
      <Button onClick={handleLogout}>Выйти</Button>
      <Button onClick={() => {}}>Настройки</Button>
    </DropdownContainer>
  );
});
