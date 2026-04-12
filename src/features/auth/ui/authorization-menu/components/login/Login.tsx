import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { getUserControllerGetMeQueryKey, useUserControllerLogin } from '@/api/generated/user/user';
import { mapSessionToUser } from '@/features/auth/lib/mapSessionUser';
import { userStore } from '@/entities/user/model/userStore';
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
  const queryClient = useQueryClient();
  const loginMutation = useUserControllerLogin();
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
      const data = await loginMutation.mutateAsync({
        data: { login: values.loginOrEmail, password: values.password },
      });
      queryClient.setQueryData(getUserControllerGetMeQueryKey(), data);
      const user = mapSessionToUser(data);
      if (user) userStore.setUser(user);
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
              disabled={isSubmitting || !isValid || loginMutation.isPending}
              dimension="xl"
            >
              {isSubmitting || loginMutation.isPending ? 'Вход...' : 'Войти'}
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
