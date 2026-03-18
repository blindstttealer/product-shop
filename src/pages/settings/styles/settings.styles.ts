import styled from 'styled-components';
import { css } from 'styled-components';
import { Button } from '@admiral-ds/react-ui';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SubTitle = styled.h3`
  font-weight: 500;
`;

export const SpanText = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  font-size: 14px;
  font-weight: 400;
`;

export const labelStyles = css`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;

export const LegendText = styled.legend`
  ${labelStyles};
  margin-bottom: -8px;
`;

export const StyledButton = styled(Button)`
  align-self: flex-start;
`;

export const Card = styled.div<{ hoverable?: boolean; background?: string }>`
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  width: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ background, theme }) => {
    const bg = background ?? 'Neutral/Neutral 00';

    return `
    background: ${theme.color[bg]};
  `;
  }}

  ${({ hoverable = true, theme }) =>
    hoverable &&
    `
    &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: ${theme.color['Primary/Primary 60 Main']};
    background-color: ${theme.color['Neutral/Neutral 05']};
  }`}
`;
