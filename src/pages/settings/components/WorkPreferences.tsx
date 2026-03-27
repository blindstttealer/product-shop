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
} from '@/pages/settings/validationSchema';
import { Controller, useFormContext } from 'react-hook-form';

export const WorkPreferences = () => {
  const { register, control } = useFormContext();

  return (
    <SettingsBlock title={'Предпочтения по работе'} icon={CategoryColorSolid}>
      <Content>
        <Controller
          name="jobPreferences.jobType"
          control={control}
          render={({ field }) => (
            <CheckboxGroup {...field} title={'Тип занятости'} data={EmploymentTypesData} />
          )}
        />

        <SelectField
          {...register('jobPreferences.workLocation')}
          defaultValue={workFormatOptions[0].value}
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
              {...register('jobPreferences.salaryMin')}
              min={0}
              step={1000}
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

        <Controller
          name="jobPreferences.industries"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              {...field}
              title={'Предпочтительные отрасли'}
              data={PreferredIndustriesData}
            />
          )}
        />

        <Controller
          name="jobPreferences.willingToRelocate"
          control={control}
          render={({ field }) => (
            <CheckboxBlock
              {...field}
              title={'Готовность к переезду'}
              description={'Рассматривать вакансии в других городах'}
              background={'Neutral/Neutral 05'}
            />
          )}
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
