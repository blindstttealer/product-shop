// lib/utils/field-mappers.ts
import { Field } from '../../../../components/ui/universal-step-form/UniversalStepForm';
import { ServerField } from '../../model/types';

/**
 Реализовывать по мере добавления компонентов которые будут обрабатываться
 */

export const mapServerFieldToUniversal = (f: ServerField): Field<any> => {
  const base: Partial<Field<any>> = {
    name: f.key,
    label: f.label ?? f.key,
    required: !!f.required,
  };

  switch (f.type) {
    case 'select':
      return {
        ...base,
        type: 'select',
        options: (f.options || []).map((o: any) => ({ label: o.label, value: o.value })),
      } as Field<any>;

    case 'date':
      return {
        ...base,
        type: 'date',
      } as Field<any>;

    case 'phone':
      return {
        ...base,
        type: 'phone',
      } as Field<any>;

    default:
      // text / default
      return {
        ...base,
        type: 'text',
      } as Field<any>;
  }
};
