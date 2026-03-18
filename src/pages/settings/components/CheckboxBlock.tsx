import { Card, SpanText } from '@/pages/settings/styles/settings.styles';
import { CheckboxField } from '@admiral-ds/react-ui';
import styled from 'styled-components';

type Props = {
  title: string;
  description?: string;
  name: string;
  background?: string;
};

export const CheckboxBlock = ({ title, description, name, background }: Props) => {
  return (
    <CheckboxWrapper background={background}>
      <div>
        <p>{title}</p>
        <SpanText>{description}</SpanText>
      </div>
      <CheckboxField name={name} />
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
