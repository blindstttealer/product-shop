import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Space,
} from "antd";
import styled from "styled-components";
import { Card } from "antd";
import { ReactNode } from "react";
import TextArea from "antd/es/input/TextArea";
import PhoneInput from "react-phone-number-input/input";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

function getRules<T>(field: Field<T>) {
  const rules = [];

  if (field.required) {
    rules.push({
      required: true,
      message: `Пожалуйста, заполните поле "${field.label}"`,
    });
  }

  if (field.type === "phone") {
    rules.push({
      validator: (_: any, value: string) => {
        if (!value) {
          return Promise.resolve();
        }
        if (!isValidPhoneNumber(value)) {
          return Promise.reject("Введите корректный номер телефона");
        }
        return Promise.resolve();
      },
    });
  }

  return rules;
}
type FieldType = "text" | "textArea" | "date" | "select" | "phone";

type Field<T> = {
  name: keyof T;
  label: string;
  required?: boolean;
  render?: () => ReactNode;
  type?: FieldType;
  options?: { label: string; value: string }[];
};

type UniversalFormProps<T> = {
  title: string;
  fields: Field<T>[];
  buttonNextText?: string;
  buttonBackText?: string;
  onFinish?: (values: any) => void;
  onFinishFailed?: (error: any) => void;
  initialState?: Partial<T>;
  onValuesChangeHandler: (values: Partial<T>) => void;
  onClickBackButton: () => void;
};

export function UniversalForm<T extends object>({
  title,
  fields,
  buttonNextText = "Submit",
  buttonBackText = "back",
  onFinish,
  onFinishFailed,
  initialState,
  onValuesChangeHandler,
  onClickBackButton,
}: UniversalFormProps<T>) {
  const form = useFormInstance();

  return (
    <PageWrapper>
      <StyledCard title={title}>
        <StyledForm
          onValuesChange={(values: Partial<T>) => onValuesChangeHandler(values)}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={initialState}
        >
          {fields.map((field) => (
            <Form.Item
              key={String(field.name)}
              label={field.label}
              name={field.name as string}
              rules={getRules(field)}
            >
              {field.render ? field.render() : renderInputByType(field, form)}
            </Form.Item>
          ))}

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={onClickBackButton}
                type="default"
                htmlType="button"
              >
                {buttonBackText}
              </Button>
              <Button type="primary" htmlType="submit">
                {buttonNextText}
              </Button>
            </div>
          </Form.Item>
        </StyledForm>
      </StyledCard>
    </PageWrapper>
  );
}

// Styled Components
const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 700px;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function renderInputByType<T>(field: Field<T>, form: any): ReactNode {
  switch (field.type) {
    case "textArea":
      return <TextArea rows={4} />;
    case "select":
      return (
        <Select>
          {field.options?.map((opt) => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      );
    // case "date":
    //   return <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />;
    case "phone":
      return (
        <PhoneInput
          masks={{ ru: "(...) ...-..-.." }}
          country="RU"
          value={form?.getFieldValue(field.name as string)}
          onChange={(value: any | undefined) => {
            form?.setFieldsValue({ [field.name as string]: value });
          }}
          maxLength={17}
          style={{
            width: "100%",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid #d9d9d9",
            paddingLeft: "11px",
          }}
        />
      );
    case "text":
    default:
      return <Input />;
  }
}
