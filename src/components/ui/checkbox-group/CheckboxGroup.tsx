import { CheckboxField, FieldSet } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { LegendText } from '@/pages/settings/styles/settings.styles';

type Props = {
  title: string;
  name?: string;
  data: string[];
};
export const CheckboxGroup = ({ title, name, data }: Props) => {
  return (
    <FieldSet flexDirection={'row'} name={name}>
      <LegendText>{title}</LegendText>
      {data.map((option) => (
        <StyledCheckboxField key={option}>{option}</StyledCheckboxField>
      ))}
    </FieldSet>
  );
};

const StyledCheckboxField = styled(CheckboxField)`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  border-radius: 8px;
  padding: 10px;
  max-width: 180px;
  width: 100%;
`;
