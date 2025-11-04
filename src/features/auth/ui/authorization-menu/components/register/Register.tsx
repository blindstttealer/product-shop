import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, InputField } from '@admiral-ds/react-ui';
import { Column } from '../../styles';
import { RegisterFormData, registerSchema } from './validationSchema';

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

  const handleRegistration = async (values: RegisterFormData) => {
    try {
      console.log('Registration data:', values);
      setEmailToConfirm(values.email);
      setConfirmVisible(true);
      setRegisterVisible(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (!registerVisible) return null;

  return (
    <Modal onClose={() => setRegisterVisible(false)} title="Регистрация">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <Column>
          <InputField
            label="Логин"
            {...register('username')}
            status={errors.username ? 'error' : undefined}
            extraText={errors.username?.message}
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
