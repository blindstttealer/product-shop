import { FieldSet, RadioButton } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { SettingsBlock } from './SettingsBlock';
import { SystemNotificationsSolid } from '@admiral-ds/icons';
import { Card, Content, SpanText, SubTitle } from '@/pages/settings/styles/settings.styles';
import { CheckboxBlock } from './CheckboxBlock';
import { useFormContext } from 'react-hook-form';

export const Notifications = () => {
  const { register, control } = useFormContext();

  return (
    <SettingsBlock title={'Настройки уведомлений'} icon={SystemNotificationsSolid}>
      <Content>
        <SubTitle>Настройки оповещений</SubTitle>

        <CheckboxBlock
          title={'Новые вакансии'}
          description={
            'Получать уведомления о новых вакансиях, соответствующих вашим предпочтениям'
          }
          name={'receive-new-vacancies'}
        />

        <CheckboxBlock
          title={'Обновления по откликам'}
          description={'Отслеживать статус ваших откликов на вакансии'}
          name={'receive-application-updates'}
        />

        <CheckboxBlock
          title={'Напоминания о собеседованиях'}
          description={'Не пропустить ни одного собеседования с своевременными напоминаниями'}
          name={'receive-interview-reminders'}
        />

        <CheckboxBlock
          title={'Карьерные инсайты'}
          description={'Получать советы и тренды в индустрии'}
          name={'receive-career-insights'}
        />

        <NotificationWrapper hoverable={false}>
          <SubTitle>Способ доставки уведомлений</SubTitle>
          <FieldSet>
            <Card>
              <StyledRadioButton value={1} name="notification-channel">
                Только push-уведомления
                <SpanText>Получать мгновенные оповещения на устройство</SpanText>
              </StyledRadioButton>
            </Card>
            <Card>
              <StyledRadioButton value={2} name="notification-channel">
                Только email <SpanText>Получать обновления по электронной почте</SpanText>
              </StyledRadioButton>
            </Card>
            <Card>
              <StyledRadioButton value={3} name="notification-channel">
                Push и Email <SpanText>Получать уведомления по всем каналам</SpanText>
              </StyledRadioButton>
            </Card>
          </FieldSet>
        </NotificationWrapper>
      </Content>
    </SettingsBlock>
  );
};

const NotificationWrapper = styled(Card)`
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
`;

const StyledRadioButton = styled(RadioButton)`
  align-items: center;
  gap: 5px;
`;
