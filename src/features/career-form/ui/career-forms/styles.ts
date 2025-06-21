import styled from "styled-components";

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
