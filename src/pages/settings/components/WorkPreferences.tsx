import { SelectField, Option, NumberInputField, FieldSet } from '@admiral-ds/react-ui';
import { Content, labelStyles, LegendText } from '../styles/settings.styles';
import { SettingsBlock } from './SettingsBlock';
import { mokEmploymentTypesData, mokPreferredIndustriesData, workFormatOptions } from '../mocks';
import styled from 'styled-components';
import { CategoryColorSolid } from '@admiral-ds/icons';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { CheckboxBlock } from '@/pages/settings/components/CheckboxBlock';

export const WorkPreferences = () => {
  return (
    <SettingsBlock title={'Предпочтения по работе'} icon={CategoryColorSolid}>
      <Content>
        <CheckboxGroup
          title={'Тип занятости'}
          data={mokEmploymentTypesData}
          name={'type-of-employment'}
        />

        <SelectField
          defaultValue={workFormatOptions[0].value}
          name={'work-format'}
          label={'Предпочтения по местоположению работы'}
          labelCssMixins={{
            label: labelStyles,
          }}
        >
          {workFormatOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </SelectField>

        <FieldSet>
          <LegendText>Ожидаемая зарплата (₽)</LegendText>
          <InputsBlockWrapper>
            <NumberInputField
              name={'salary-min'}
              min={0}
              step={1000}
              label={'Минимум'}
              labelCssMixins={{
                label: labelStyles,
              }}
            />
            <NumberInputField
              name={'salary-max'}
              min={0}
              step={1000}
              label={'Максимум'}
              labelCssMixins={{
                label: labelStyles,
              }}
            />
          </InputsBlockWrapper>
        </FieldSet>

        <CheckboxGroup
          title={'Предпочтительные отрасли'}
          data={mokPreferredIndustriesData}
          name={'preferred-industries'}
        />

        <CheckboxBlock
          title={'Готовность к переезду'}
          description={'Рассматривать вакансии в других городах'}
          name={'relocate'}
          background={'Neutral/Neutral 05'}
        />
      </Content>
    </SettingsBlock>
  );
};

const InputsBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  margin: 0;
`;
