import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, InputField } from '@admiral-ds/react-ui';
import { Column } from '../../styles';
import { LoginFormData, loginSchema } from './validationSchema';

interface LoginProps {
  setLoginVisible: (value: boolean) => void;
  showForgot: () => void;
  loginVisible: boolean;
}

export const Login = ({ setLoginVisible, showForgot, loginVisible }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = async (values: LoginFormData) => {
    try {
      console.log('Login data:', values);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!loginVisible) return null;

  return (
    <Modal onClose={() => setLoginVisible(false)} title="Вход">
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <Column>
          <InputField
            label="Логин или Email"
            {...register('loginOrEmail')}
            status={errors.loginOrEmail ? 'error' : undefined}
            extraText={errors.loginOrEmail?.message}
          />

          <InputField
            label="Пароль"
            type="password"
            {...register('password')}
            status={errors.password ? 'error' : undefined}
            extraText={errors.password?.message}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              appearance="ghost"
              onClick={() => {
                setLoginVisible(false);
                showForgot();
              }}
            >
              Забыли пароль?
            </Button>
            <Button appearance="primary" type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </div>
        </Column>
      </form>
    </Modal>
  );
};
