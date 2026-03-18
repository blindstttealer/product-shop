import styled from 'styled-components';
import { StyledButton } from './styles/settings.styles';
import { General } from './components/General';
import { WorkPreferences } from './components/WorkPreferences';
import { Notifications } from './components/Notifications';
import { ProfileVisibility } from './components/ProfileVisibility';
import { Account } from './components/Account';

export default function Settings() {
  return (
    <Container>
      <General />
      <WorkPreferences />
      <Notifications />
      <ProfileVisibility />
      <Account />
      <StyledButton dimension={'l'}>Сохранить изменения</StyledButton>
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
