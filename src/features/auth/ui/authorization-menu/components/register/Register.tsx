import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, InputField } from '@admiral-ds/react-ui';
import { Column } from '../../styles';
import { RegisterFormData, registerSchema } from './validationSchema';
import { AuthApi } from '@/features/auth/api/authApi';
import { useAppToast } from '@/shared/hooks/useAppToast';
import axios from 'axios';
import { useAuthStore } from '@/providers/AuthProvider';

interface RegisterProps {
  setRegisterVisible: (value: boolean) => void;
  setConfirmVisible: (value: boolean) => void;
  registerVisible: boolean;
  setEmailToConfirm: (value: string) => void;
}

export const Register = ({
  setRegisterVisible,
  setConfirmVisible,
  registerVisible,
  setEmailToConfirm,
}: RegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const authStore = useAuthStore();

  const { showSuccessToast, showErrorToast } = useAppToast();

  const handleRegistration = async (values: RegisterFormData) => {
    try {
      await authStore.registration(values);

      setEmailToConfirm(values.email);
      setConfirmVisible(true);
      setRegisterVisible(false);
      showSuccessToast('Регистрация прошла успешно', 'Успех');
    } catch (err) {
      console.log('err---', err);
      if (axios.isAxiosError(err)) {
        const response = err.response?.data;

        const message = response?.message || err.message || 'Ошибка регистрации';
        showErrorToast(message, 'Ошибка при регистрации');
        return;
      }

      showErrorToast('Произошла ошибка. Попробуйте позже.', 'Ошибка');
    }
  };

  if (!registerVisible) return null;

  return (
    <Modal onClose={() => setRegisterVisible(false)} title="Регистрация">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <Column>
          <InputField
            label="Логин"
            {...register('login')}
            status={errors.login ? 'error' : undefined}
            extraText={errors.login?.message}
          />

          <InputField
            label="Email"
            type="email"
            {...register('email')}
            status={errors.email ? 'error' : undefined}
            extraText={errors.email?.message}
          />

          <InputField
            label="Пароль"
            type="password"
            {...register('password')}
            status={errors.password ? 'error' : undefined}
            extraText={errors.password?.message}
          />

          <Button appearance="primary" type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </Column>
      </form>
    </Modal>
  );
};
