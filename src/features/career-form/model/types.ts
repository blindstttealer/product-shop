export type Option = { label: string; value: string | number };

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'select'
  | 'multiSelect'
  | 'checkbox'
  | 'radio'
  | 'textArea'
  | 'tags'
  | 'file'
  | 'url'
  | 'group'
  | 'repeater';

export type ServerField = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Option[];
  multiple?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  itemSchema?: ServerField[];
  fields?: ServerField[];
  defaultValue?: any;
};

export type StepDefinition = {
  id: string;
  title: string;
  fields: ServerField[];
};

export type FormDefinition = {
  id: string;
  name: string;
  version?: string | number;
  description?: string;
  steps: StepDefinition[];
  initialData?: Record<string, any>;
};
