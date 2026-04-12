import { Field } from '../../../../components/ui/universal-step-form/UniversalStepForm';
import { ServerField } from '../../model/types';

export const mapServerFieldToUniversal = (f: ServerField): Field<any> => ({
  name: f.id,
  label: f.label,
  required: !!f.required,
  type: f.type,
  placeholder: f.placeholder,
  description: f.description,
  defaultValue: f.defaultValue,
  width: f.width,
  options: f.options?.length ? f.options : undefined,
  validation: f.validation,
});
