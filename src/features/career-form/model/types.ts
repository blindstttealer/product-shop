export type Option = { label: string; value: string };

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'time'
  | 'file'
  | 'switch'
  | 'slider';

export type ValidationRule = {
  minLength?: number | null;
  maxLength?: number | null;
  min?: number | null;
  max?: number | null;
  pattern?: string | null;
  errorMessage?: string;
};

export type ServerField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  required?: boolean;
  width?: number;
  options?: Option[];
  validation?: ValidationRule;
};

export type StepDefinition = {
  id: string;
  title: string;
  description?: string;
  order: number;
  isSkippable?: boolean;
  allowBack?: boolean;
  fields: ServerField[];
};

export type FormDefinition = {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  steps: StepDefinition[];
};
