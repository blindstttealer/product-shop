import { Control, Controller, FieldValues } from 'react-hook-form';
import { CheckboxBlock } from '@/pages/settings/components/CheckboxBlock';

export const ControlledCheckboxBlock = (control: Control<FieldValues, any, FieldValues>) => {
  return (
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
  );
};
