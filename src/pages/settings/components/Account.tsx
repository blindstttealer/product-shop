import { SelectField, Option, Button, InputField } from '@admiral-ds/react-ui';
import { SettingsBlock } from './SettingsBlock';
import styled from 'styled-components';
import { languageOptions } from '../mocks';
import {
  SystemSettingsSolid,
  SystemEmailOutline,
  SecurityLockOutline,
  ServiceInfoOutline,
  CategoryGlobeOutline,
  SystemExitOutline,
} from '@admiral-ds/icons';
import { Card, Content, SpanText, StyledButton, SubTitle } from '../styles/settings.styles';
import type { ComponentType } from 'react';

export const Account = () => {
  return (
    <SettingsBlock title={'Настройки аккаунта'} icon={SystemSettingsSolid}>
      <Content>
        <SettingCard>
          <SectionTitle title={'Email адрес'} icon={SystemEmailOutline} />
          <InputRow>
            <EmailInput placeholder={'Email адрес'} name={'email'} />
            <UpdateButton dimension={'m'}>Обновить</UpdateButton>
          </InputRow>
        </SettingCard>

        <SettingCard>
          <SectionTitle title={'Пароль и безопасность'} icon={SecurityLockOutline} />
          <ActionBlock>
            <SpanText>Обеспечьте безопасность вашего аккаунта, регулярно обновляя пароль.</SpanText>
            <StyledButton dimension={'m'} appearance={'tertiary'}>
              Изменить пароль
            </StyledButton>
          </ActionBlock>
        </SettingCard>

        <SettingCard>
          <SectionTitle title={'Информация о платформе'} icon={ServiceInfoOutline} />
          <p>
            Версия: <SpanText>3.2.1</SpanText>
          </p>
          <p>
            Последнее обновление: <SpanText>2 января 2026</SpanText>
          </p>
          <p>
            Окружение: <SpanText>Production</SpanText>
          </p>
        </SettingCard>
        <SettingCard>
          <SectionTitle title={'Язык интерфейса'} icon={CategoryGlobeOutline} />
          <SelectField defaultValue={languageOptions[0].value} name={'language'}>
            {languageOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>
        </SettingCard>

        <SettingCard>
          <SectionTitle title={'Выход из аккаунта'} icon={SystemExitOutline} />
          <ActionBlock>
            <SpanText>
              Выйти из аккаунта. Вам потребуется снова войти для доступа к профилю и откликам.
            </SpanText>
            <StyledButton dimension={'m'} appearance={'tertiary'}>
              Выйти
            </StyledButton>
          </ActionBlock>
        </SettingCard>
      </Content>
    </SettingsBlock>
  );
};

const TitleRow = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
  margin-left: -4px;
  align-items: center;
`;

type Props = {
  title: string;
  icon?: ComponentType<{ width?: number; height?: number }>;
};

const SectionTitle = ({ title, icon: Icon }: Props) => {
  return (
    <TitleRow>
      {Icon && <Icon width={28} height={28} />}
      <SubTitle>{title}</SubTitle>
    </TitleRow>
  );
};

const SettingCard = styled(Card).attrs({
  hoverable: false,
})`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled(InputField)`
  flex: 7;
`;

const UpdateButton = styled(Button)`
  flex: 1;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
