import { SelectField, Option, NumberInputField, FieldSet } from '@admiral-ds/react-ui';
import { Content, labelStyles, LegendText } from '../styles/settings.styles';
import { SettingsBlock } from './SettingsBlock';
import { mokEmploymentTypesData, mokPreferredIndustriesData, workFormatOptions } from '../mocks';
import styled from 'styled-components';
import { CategoryColorSolid } from '@admiral-ds/icons';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { CheckboxBlock } from '@/pages/settings/components/CheckboxBlock';
import {
  EmploymentTypesData,
  PreferredIndustriesData,
  SkillsData,
  WorkFormatOptionsData,
} from '@/pages/settings/validationSchema';
import { Controller, useFormContext } from 'react-hook-form';
import { ControlledCheckboxGroup } from '@/pages/settings/controlled/ControlledCheckboxGroup';
import { ControlledCheckboxBlock } from '@/pages/settings/controlled/ControlledCheckboxBlock';

export const WorkPreferences = () => {
  const { register, control } = useFormContext();

  return (
    <SettingsBlock title={'Предпочтения по работе'} icon={CategoryColorSolid}>
      <Content>
        <ControlledCheckboxGroup
          name={'jobPreferences.jobType'}
          data={EmploymentTypesData}
          title={'Тип занятости'}
        />

        <SelectField
          {...register('jobPreferences.workLocation')}
          defaultValue={WorkFormatOptionsData[0]}
          label={'Предпочтения по местоположению работы'}
          labelCssMixins={{
            label: labelStyles,
          }}
        >
          {WorkFormatOptionsData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </SelectField>

        <FieldSet>
          <LegendText>Ожидаемая зарплата (₽)</LegendText>
          <InputsBlockWrapper>
            <NumberInputField
              {...register('jobPreferences.salaryMin')}
              min={0}
              step={1000}
              precision={0}
              label={'Минимум'}
              labelCssMixins={{
                label: labelStyles,
              }}
            />
            <NumberInputField
              {...register('jobPreferences.salaryMax')}
              min={0}
              step={1000}
              label={'Максимум'}
              labelCssMixins={{
                label: labelStyles,
              }}
            />
          </InputsBlockWrapper>
        </FieldSet>

        <ControlledCheckboxGroup
          name={'jobPreferences.industries'}
          data={PreferredIndustriesData}
          title={'Предпочтительные отрасли'}
        />

        <ControlledCheckboxBlock
          name={'jobPreferences.willingToRelocate'}
          title={'Готовность к переезду'}
          description={'Рассматривать вакансии в других городах'}
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
