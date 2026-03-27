import { SettingsBlock } from './SettingsBlock';
import { AvatarBlock } from './AvatarBlock';
import styled from 'styled-components';
import { InputField, SelectField, TextField, Option } from '@admiral-ds/react-ui';
import { experienceOptions, mokSkillsData } from '../mocks';
import { SystemPersonSolid } from '@admiral-ds/icons';
import { Content, labelStyles } from '@/pages/settings/styles/settings.styles';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { Controller, useFormContext } from 'react-hook-form';
import { LocationOptionsData, SkillsData } from '@/pages/settings/validationSchema';

export const General = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <SettingsBlock title={'Профессиональный профиль'} icon={SystemPersonSolid}>
      <Content>
        <AvatarBlock />
        <InputsBlockWrapper>
          <InputField
            {...register('profile.name')}
            placeholder={'Полное имя'}
            label={'Полное имя'}
            labelCssMixins={{
              label: labelStyles,
            }}
            // status={errors}
          />

          <InputField
            {...register('profile.jobTitle')}
            placeholder={'Текущая должность'}
            label={'Текущая должность'}
            labelCssMixins={{
              label: labelStyles,
            }}
          />

          <SelectField
            {...register('profile.experience')}
            defaultValue={experienceOptions[0].value}
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
            {...register('profile.location')}
            defaultValue={LocationOptionsData[0]}
            label={'Местоположение'}
            labelCssMixins={{
              label: labelStyles,
            }}
          >
            {LocationOptionsData.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </SelectField>
        </InputsBlockWrapper>

        <TextField
          {...register('profile.bio')}
          label={'Профессиональная биография'}
          labelCssMixins={{
            label: labelStyles,
          }}
          autoHeight
          dimension={'xl'}
        />

        <Controller
          name="profile.skills"
          control={control}
          render={({ field }) => (
            <CheckboxGroup {...field} data={SkillsData} title={'Навыки и экспертиза'} />
          )}
        />
      </Content>
    </SettingsBlock>
  );
};

const InputsBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
