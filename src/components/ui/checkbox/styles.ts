import styled from "styled-components";
import { Checkbox as AntCheckbox, Typography, Space } from "antd";

export const StyledCheckboxContainer = styled(Space)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledCheckbox = styled(AntCheckbox)<{ $error?: boolean }>`
  && {
    .ant-checkbox-inner {
      border-color: ${({ $error, theme }) =>
        $error ? theme.colors.error : ""};
    }

    .ant-checkbox + span {
      padding-inline-start: 8px;
    }
  }
`;

export const HelperText = styled(Typography.Text)`
  font-size: 12px;
  margin-left: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ErrorText = styled(Typography.Text)`
  font-size: 12px;
  margin-left: 24px;
  color: ${({ theme }) => theme.colors.error};
`;
