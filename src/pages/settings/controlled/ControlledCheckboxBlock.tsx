import { useController } from 'react-hook-form';
import { CheckboxBlock, CheckboxBlockProps } from '@/pages/settings/components/CheckboxBlock';

type Props = Omit<CheckboxBlockProps, 'onChange' | 'value'>;

export const ControlledCheckboxBlock = ({ name, ...rest }: Props) => {
  const { field } = useController({
    name,
  });

  return (
    <CheckboxBlock
      value={field.value ?? false}
      name={field.name}
      onChange={field.onChange}
      {...rest}
    />
  );
};
