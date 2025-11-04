import { useMemo, useState } from 'react';
import { useAuthStore } from '../../../../providers/AuthProvider';
import { Login } from './components/login';
import { Register } from './components/register';
import { ForgotVisible } from './components/forgot-password';

import { Button, T } from '@admiral-ds/react-ui';
import { StyledWrapper } from './styles';
import { EmailConfirmation } from './components/email-confirmation';

export const AuthorizationMenu = () => {
  const [loginVisible, setLoginVisible] = useState(false);

  const [registerVisible, setRegisterVisible] = useState(false);

  const [forgotVisible, setForgotVisible] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [emailToConfirm, setEmailToConfirm] = useState<string | null>(null);

  const authStore = useAuthStore();

  const logoutHandler = () => {
    console.log('logoutHandler');
  };

  const isAnyAuthVisible = loginVisible || registerVisible || forgotVisible || confirmVisible;

  const authMenuPopup = useMemo(() => {
    if (authStore.authorizationUser) {
      return (
        <Button appearance="ghost" onClick={logoutHandler}>
          Выйти
        </Button>
      );
    }

    return (
      <div>
        <Button appearance="ghost" onClick={() => setLoginVisible(true)}>
          Войти
        </Button>
        <Button appearance="ghost" onClick={() => setRegisterVisible(true)}>
          Зарегистрироваться
        </Button>
      </div>
    );
  }, [authStore.authorizationUser]);

  return (
    <StyledWrapper>
      {!isAnyAuthVisible && authMenuPopup}
      <Login
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        showForgot={() => setForgotVisible(true)}
      />
      <Register
        registerVisible={registerVisible}
        setConfirmVisible={setConfirmVisible}
        setRegisterVisible={setRegisterVisible}
        setEmailToConfirm={setEmailToConfirm}
      />
      <ForgotVisible forgotVisible={forgotVisible} setForgotVisible={setForgotVisible} />
      <EmailConfirmation
        confirmVisible={confirmVisible}
        emailToConfirm={emailToConfirm}
        setConfirmVisible={setConfirmVisible}
      />
    </StyledWrapper>
  );
};
