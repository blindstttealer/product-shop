import { SettingsBlock } from './SettingsBlock';
import { AvatarBlock } from './AvatarBlock';
import styled from 'styled-components';
import { InputField, SelectField, TextField, Option } from '@admiral-ds/react-ui';
import { experienceOptions, locationOptions, mokSkillsData } from '../mocks';
import { SystemPersonSolid } from '@admiral-ds/icons';
import { Content, labelStyles } from '@/pages/settings/styles/settings.styles';
import { CheckboxGroup } from '@/components/ui/checkbox-group';

export const General = () => {
  return (
    <SettingsBlock title={'Профессиональный профиль'} icon={SystemPersonSolid}>
      <Content>
        <AvatarBlock />
        <InputsBlockWrapper>
          <InputField
            name="full-name"
            placeholder={'Полное имя'}
            label={'Полное имя'}
            labelCssMixins={{
              label: labelStyles,
            }}
          />

          <InputField
            name={'current-position'}
            placeholder={'Текущая должность'}
            label={'Текущая должность'}
            labelCssMixins={{
              label: labelStyles,
            }}
          />

          <SelectField
            defaultValue="0-1"
            name={'experience'}
            label={'Опыт работы'}
            labelCssMixins={{
              label: labelStyles,
            }}
          >
            {experienceOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>

          <SelectField
            defaultValue="Moscow"
            name={'location'}
            label={'Местоположение'}
            labelCssMixins={{
              label: labelStyles,
            }}
          >
            {locationOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>
        </InputsBlockWrapper>

        <TextField
          name={'professional-biography'}
          label={'Профессиональная биография'}
          labelCssMixins={{
            label: labelStyles,
          }}
          autoHeight
          dimension={'xl'}
        />

        <CheckboxGroup title={'Навыки и экспертиза'} data={mokSkillsData} name={'skills-list'} />
      </Content>
    </SettingsBlock>
  );
};

const InputsBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
