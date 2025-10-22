import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProgressContainer = styled.div`
  width: 100%;
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const FormContent = styled.div`
  margin-top: 20px;
`;

export const FormInfo = styled.div`
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 24px;

  h4 {
    margin-bottom: 12px;
    color: #343a40;
  }

  p {
    margin: 6px 0;
    color: #495057;
  }
`;

export const FormsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
`;

export const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
  margin-top: 12px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  max-width: 240px;
`;
