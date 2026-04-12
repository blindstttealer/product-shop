import { useCallback, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  DropdownContainer,
  Menu,
  MenuItem,
  RenderOptionProps,
  typography,
} from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { getUserControllerGetMeQueryKey, useUserControllerLogout } from '@/api/generated/user/user';
import { userStore } from '@/entities/user/model/userStore';
import { UserAvatar } from '@/components/ui/user-avatar';

interface Props {
  login: string;
  email: string;
}

const MenuWrapper = styled.div`
  min-width: 180px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;

const MenuItemStyled = styled(MenuItem)`
  ${typography['Body/Body 1 Short']};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const DropDownUserMenuContainer = observer(({ login, email }: Props) => {
  const queryClient = useQueryClient();
  const logoutMutation = useUserControllerLogout();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: getUserControllerGetMeQueryKey() });
        userStore.setUser(null);
        navigate('/registration', { replace: true });
      },
    });
  }, [logoutMutation, navigate, queryClient]);

  const handleClickOutside = (e: Event) => {
    if (e.target && targetRef.current?.contains(e.target as Node)) return;
    setOpen(false);
  };

  const model = useMemo(() => {
    return [
      {
        id: 'settings',
        render: (props: RenderOptionProps) => (
          <MenuItemStyled {...props} key="settings" onClick={() => navigate('/settings')}>
            Настройки
          </MenuItemStyled>
        ),
      },
      {
        id: 'logout',
        render: (props: RenderOptionProps) => (
          <MenuItemStyled {...props} key="logout" onClick={handleLogout}>
            Выйти
          </MenuItemStyled>
        ),
      },
    ];
  }, [handleLogout, navigate]);

  return (
    <>
      <div onClick={() => setOpen((v) => !v)} style={{ display: 'inline-block' }}>
        <UserAvatar ref={targetRef} name={login} email={email} />
      </div>

      {open && targetRef.current && (
        <DropdownContainer
          targetElement={targetRef.current}
          alignSelf="center"
          onClickOutside={handleClickOutside}
        >
          <MenuWrapper>
            <Menu model={model} />
          </MenuWrapper>
        </DropdownContainer>
      )}
    </>
  );
});
