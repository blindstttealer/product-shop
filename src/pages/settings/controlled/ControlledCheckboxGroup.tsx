import { useController } from 'react-hook-form';
import { CheckboxGroup } from '@/components/ui/checkbox-group';

type Props = {
  name: string;
  data: string[];
  title: string;
};

export const ControlledCheckboxGroup = ({ name, data, title }: Props) => {
  const { field } = useController({
    name,
  });

  return (
    <CheckboxGroup
      name={field.name}
      data={data}
      title={title}
      value={field.value || []}
      onChange={field.onChange}
    />
  );
};
