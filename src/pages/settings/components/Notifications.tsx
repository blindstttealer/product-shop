import { FieldSet, RadioButton } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { SettingsBlock } from './SettingsBlock';
import { SystemNotificationsSolid } from '@admiral-ds/icons';
import { Card, Content, SpanText, SubTitle } from '@/pages/settings/styles/settings.styles';
import { ControlledCheckboxBlock } from '@/pages/settings/controlled/ControlledCheckboxBlock';
import { Controller } from 'react-hook-form';
import { notificationOptions } from '@/pages/settings/mocks';

export const Notifications = () => {
  return (
    <SettingsBlock title={'Настройки уведомлений'} icon={SystemNotificationsSolid}>
      <Content>
        <SubTitle>Настройки оповещений</SubTitle>

        <ControlledCheckboxBlock
          title={'Новые вакансии'}
          description={
            'Получать уведомления о новых вакансиях, соответствующих вашим предпочтениям'
          }
          name={'notifications.alerts.jobMatches'}
        />

        <ControlledCheckboxBlock
          title={'Обновления по откликам'}
          description={'Отслеживать статус ваших откликов на вакансии'}
          name={'notifications.alerts.applicationUpdates'}
        />

        <ControlledCheckboxBlock
          title={'Напоминания о собеседованиях'}
          description={'Не пропустить ни одного собеседования с своевременными напоминаниями'}
          name={'notifications.alerts.interviewReminders'}
        />

        <ControlledCheckboxBlock
          title={'Карьерные инсайты'}
          description={'Получать советы и тренды в индустрии'}
          name={'notifications.alerts.careerInsights'}
        />

        <NotificationWrapper hoverable={false}>
          <SubTitle>Способ доставки уведомлений</SubTitle>

          <Controller
            name={'notifications.notificationStyle'}
            render={({ field }) => (
              <FieldSet>
                {notificationOptions.map((option) => (
                  <Card key={option.value}>
                    <StyledRadioButton
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                    >
                      {option.label}
                      <SpanText>{option.description}</SpanText>
                    </StyledRadioButton>
                  </Card>
                ))}
              </FieldSet>
            )}
          ></Controller>
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
