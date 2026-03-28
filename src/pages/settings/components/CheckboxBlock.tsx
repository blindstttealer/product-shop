import { Card, SpanText } from '@/pages/settings/styles/settings.styles';
import { CheckboxField } from '@admiral-ds/react-ui';
import styled from 'styled-components';

export type CheckboxBlockProps = {
  title: string;
  description?: string;
  name: string;
  background?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const CheckboxBlock = ({
  value,
  title,
  description,
  name,
  background,
  onChange,
}: CheckboxBlockProps) => {
  return (
    <CheckboxWrapper background={background}>
      <div>
        <p>{title}</p>
        <SpanText>{description}</SpanText>
      </div>
      <CheckboxField
        name={name}
        checked={value}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
