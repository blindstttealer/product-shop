import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/providers/AuthProvider';
import { LoginFormData, loginSchema } from './validationSchema';
import {
  PageWrapper,
  FormCard,
  FormHeader,
  FormIcon,
  FormTitle,
  FormSubtitle,
  FieldRow,
  Actions,
  AuthLinkWrapper,
  AuthText,
  StyledLink,
  SubmitButton,
  GhostButton,
} from '../../styles';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = async (values: LoginFormData) => {
    console.log('values', values);
    try {
      await authStore.login({ loginOrEmail: values.loginOrEmail, password: values.password });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const goToForgot = () => navigate('/forgot');
  const handleBackToRegister = () => navigate('/registration');

  return (
    <PageWrapper>
      <FormCard>
        <FormHeader>
          <FormIcon icon="🔐" />
          <FormTitle>Вход в аккаунт</FormTitle>
          <FormSubtitle>Введите свои данные, чтобы войти в систему</FormSubtitle>
        </FormHeader>

        <form onSubmit={handleSubmit(handleLogin)} style={{ width: '100%' }} noValidate>
          <FieldRow>
            <InputField
              label="Логин или Email"
              {...register('loginOrEmail')}
              status={errors.loginOrEmail ? 'error' : undefined}
              extraText={errors.loginOrEmail?.message}
              dimension="xl"
            />
          </FieldRow>

          <FieldRow>
            <InputField
              label="Пароль"
              type="password"
              {...register('password')}
              status={errors.password ? 'error' : undefined}
              extraText={errors.password?.message}
              dimension="xl"
            />
          </FieldRow>

          <Actions>
            <GhostButton appearance="ghost" onClick={goToForgot} dimension="xl">
              Забыли пароль?
            </GhostButton>
            <SubmitButton
              appearance="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
              dimension="xl"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </Actions>

          <AuthLinkWrapper>
            <AuthText>Нет аккаунта?</AuthText>
            <StyledLink appearance="primary" onClick={handleBackToRegister}>
              Зарегистрироваться
            </StyledLink>
          </AuthLinkWrapper>
        </form>
      </FormCard>
    </PageWrapper>
  );
};
