import styled from "styled-components";
import { Button, Typography } from "antd";

export const FormItemContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s;
  max-width: 500px;
  width: 100%;
  background-color: ${(props) => (props.$isActive ? "#eaeaea" : "#f8f8f8")};

  &:hover {
    border-color: #d9d9d9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;

export const FormTitle = styled(Typography)`
  flex: 1;
  cursor: pointer;
  margin: 0;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.current {
    font-weight: 500;
    color: #1890ff;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled(Button).attrs({
  type: "text",
  size: "small",
})`
  color: #8c8c8c;

  &:hover {
    color: #1890ff;
    background: #e6f7ff;
  }
`;
