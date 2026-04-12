import { useState, useCallback, ReactNode } from 'react';
import styled from 'styled-components';
import { Button, T } from '@admiral-ds/react-ui';
import {
  FormInput,
  FormNumberInput,
  FormTextArea,
  FormSelect,
  FormPhoneInput,
  FormDateInput,
  FormTimeInput,
  FormFileInput,
  FormSlider,
  FormCheckbox,
  FormCheckboxGroup,
  FormRadioGroup,
  FormToggle,
} from '../form-fields';

type FieldType =
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

export type FieldValidation = {
  minLength?: number | null;
  maxLength?: number | null;
  min?: number | null;
  max?: number | null;
  pattern?: string | null;
  errorMessage?: string;
};

export type Field<T> = {
  name: keyof T;
  label: string;
  required?: boolean;
  render?: () => ReactNode;
  type?: FieldType;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  width?: number;
  options?: { label: string; value: string }[];
  validation?: FieldValidation;
};

type UniversalFormProps<T> = {
  title: string;
  description?: string;
  fields: Field<T>[];
  buttonNextText?: string;
  buttonBackText?: string;
  buttonSkipText?: string;
  showBackButton?: boolean;
  onFinish?: (values: any) => void;
  onFinishFailed?: (error: any) => void;
  initialState?: Partial<T>;
  onValuesChangeHandler: (values: Partial<T>) => void;
  onClickBackButton?: () => void;
  onClickSkipButton?: () => void;
};

function validateField<T>(field: Field<T>, value: any): string | null {
  const v = field.validation;
  const errMsg = v?.errorMessage;

  if (field.required) {
    if (field.type === 'switch') {
      if (!value) return errMsg || `Поле "${field.label}" обязательно`;
    } else if (field.type === 'checkbox' && field.options?.length) {
      if (!Array.isArray(value) || value.length === 0)
        return errMsg || 'Выберите хотя бы один вариант';
    } else if (field.type === 'file') {
      if (!value || (Array.isArray(value) && value.length === 0)) return errMsg || 'Загрузите файл';
    } else {
      if (value == null || value === '')
        return errMsg || `Пожалуйста, заполните поле "${field.label}"`;
    }
  }

  if (value == null || value === '') return null;
  if (!v) return null;

  if (typeof value === 'string') {
    if (v.minLength != null && value.length < v.minLength) {
      return errMsg || `Минимум ${v.minLength} символов`;
    }
    if (v.maxLength != null && value.length > v.maxLength) {
      return errMsg || `Максимум ${v.maxLength} символов`;
    }
    if (v.pattern && !new RegExp(v.pattern).test(value)) {
      return errMsg || 'Значение не соответствует формату';
    }
  }

  if (field.type === 'email' && typeof value === 'string') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Введите корректный email';
  }

  if (field.type === 'url' && typeof value === 'string') {
    try {
      new URL(value);
    } catch {
      return 'Введите корректный URL';
    }
  }

  return null;
}

export function UniversalForm<T extends object>({
  title,
  description,
  fields,
  buttonNextText = 'Далее',
  buttonBackText = 'Назад',
  buttonSkipText = 'Пропустить',
  showBackButton = true,
  onFinish,
  onFinishFailed,
  initialState,
  onValuesChangeHandler,
  onClickBackButton,
  onClickSkipButton,
}: UniversalFormProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>(() => ({
    ...(initialState || {}),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (fieldName: string, value: any) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      onValuesChangeHandler({ [fieldName]: value } as Partial<T>);
      setErrors((prev) => {
        if (!prev[fieldName]) return prev;
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    },
    [onValuesChangeHandler],
  );

  const handleSubmit = useCallback(() => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const error = validateField(field, formData[String(field.name)]);
      if (error) newErrors[String(field.name)] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onFinish?.(formData);
    } else {
      onFinishFailed?.(newErrors);
    }
  }, [fields, formData, onFinish, onFinishFailed]);

  return (
    <PageWrapper>
      <StyledCard>
        <CardHeader>
          <T font="Header/H6" as="h3">
            {title}
          </T>
          {description && (
            <T font="Body/Body 2 Long" as="p">
              {description}
            </T>
          )}
        </CardHeader>
        <CardBody>
          <FormGrid>
            {fields.map((field) => {
              const key = String(field.name);
              if (field.render) {
                return (
                  <FieldCell key={key} $width={field.width}>
                    {field.render()}
                  </FieldCell>
                );
              }
              return (
                <FieldCell key={key} $width={field.width}>
                  <FieldRenderer
                    field={field}
                    value={formData[key]}
                    error={errors[key]}
                    onChange={(val: any) => handleChange(key, val)}
                  />
                </FieldCell>
              );
            })}
          </FormGrid>

          <ButtonsRow>
            {showBackButton && onClickBackButton && (
              <Button appearance="secondary" dimension="m" onClick={onClickBackButton}>
                {buttonBackText}
              </Button>
            )}
            {onClickSkipButton && (
              <Button appearance="secondary" dimension="m" onClick={onClickSkipButton}>
                {buttonSkipText}
              </Button>
            )}
            <Button appearance="primary" dimension="m" onClick={handleSubmit}>
              {buttonNextText}
            </Button>
          </ButtonsRow>
        </CardBody>
      </StyledCard>
    </PageWrapper>
  );
}

function FieldRenderer<T>({
  field,
  value,
  error,
  onChange,
}: {
  field: Field<T>;
  value: any;
  error?: string;
  onChange: (val: any) => void;
}) {
  const status = error ? ('error' as const) : undefined;
  const extraText = error || field.description || undefined;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'url':
      return (
        <FormInput
          type={field.type}
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'password':
      return (
        <FormInput
          type="password"
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'tel':
      return (
        <FormPhoneInput
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'number':
      return (
        <FormNumberInput
          label={field.label}
          value={value != null ? String(value) : ''}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          minValue={field.validation?.min ?? undefined}
          maxValue={field.validation?.max ?? undefined}
          status={status}
          extraText={extraText}
        />
      );

    case 'textarea':
      return (
        <FormTextArea
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.validation?.maxLength ?? undefined}
          status={status}
          extraText={extraText}
        />
      );

    case 'select':
      return (
        <FormSelect
          label={field.label}
          value={value}
          onChange={onChange}
          options={field.options || []}
          placeholder={field.placeholder}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'radio':
      return (
        <FormRadioGroup
          name={String(field.name)}
          label={field.label}
          value={value ?? null}
          onChange={onChange}
          options={field.options || []}
          required={field.required}
          error={!!error}
          extraText={extraText}
        />
      );

    case 'checkbox':
      if (field.options?.length) {
        return (
          <FormCheckboxGroup
            label={field.label}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            options={field.options}
            required={field.required}
            error={!!error}
            extraText={extraText}
          />
        );
      }
      return (
        <FormCheckbox checked={!!value} onChange={onChange} error={!!error}>
          {field.label}
        </FormCheckbox>
      );

    case 'date':
      return (
        <FormDateInput
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'time':
      return (
        <FormTimeInput
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'switch':
      return (
        <FormToggle
          label={field.label}
          checked={!!value}
          onChange={onChange}
          required={field.required}
          error={!!error}
          extraText={extraText}
        />
      );

    case 'slider':
      return (
        <FormSlider
          label={field.label}
          value={value ?? field.validation?.min ?? 0}
          onChange={onChange}
          minValue={field.validation?.min ?? 0}
          maxValue={field.validation?.max ?? 100}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    case 'file':
      return (
        <FormFileInput
          label={field.label}
          onChange={onChange}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );

    default:
      return (
        <FormInput
          label={field.label}
          value={value ?? ''}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          status={status}
          extraText={extraText}
        />
      );
  }
}

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px;
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.color['Background/Background 1']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardBody = styled.div`
  padding: 24px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;
`;

const FieldCell = styled.div<{ $width?: number }>`
  grid-column: ${({ $width }) => ($width === 50 ? 'span 1' : 'span 2')};
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
