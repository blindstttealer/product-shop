import styled from 'styled-components';
import { StyledButton } from './styles/settings.styles';
import { General } from './components/General';
import { WorkPreferences } from './components/WorkPreferences';
import { Notifications } from './components/Notifications';
import { ProfileVisibility } from './components/ProfileVisibility';
import { Account } from './components/Account';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileSettingsData, profileSettingsSchema } from './validationSchema';
import { UserApi } from '@/entities/user/api/userApi';

export default function Settings() {
  const methods = useForm({
    resolver: yupResolver(profileSettingsSchema),
    mode: 'onChange',
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await UserApi.getUserProfile();
        console.log('User profile:', profile);
        reset({
          account: {
            email: profile.user.email,
          },
        });
      } catch (err) {
        console.error('Error profile:', err);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit: SubmitHandler<ProfileSettingsData> = async (data) => {
    // const formData = new FormData();
    // formData.append('settings', JSON.stringify(data));
    // const res = await UserApi.updateUserProfile(formData);
    // console.log('RESULT', res);
    // if (data.profile.photo) {
    //   formData.append('profile.photo', data.profile.photo);
    // }
  };
  const onError = (errors) => console.log('errors', errors);

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <General />
          <WorkPreferences />
          <Notifications />
          <ProfileVisibility />
          <Account />
          <StyledButton type="submit" dimension={'l'}>
            Сохранить изменения
          </StyledButton>
        </form>
      </FormProvider>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'VTB Group UI', sans-serif;
  text-rendering: geometricPrecision;
  font-weight: 500;
`;
