import styled from "styled-components";
import { Modal } from "antd";

export const Wrapper = styled.div`
  padding: 24px 32px;
  background: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 768px;
  margin: 32px auto;
  font-family: "VTB Group UI", sans-serif;
  border: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.color["Primary/Primary 60"]};
  }
`;

export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.color["Primary/Primary 60"]};
`;

export const StepInfo = styled.button<{ hasFormId?: boolean }>`
  cursor: pointer;
  background-color: ${({ theme, hasFormId }) =>
    hasFormId
      ? theme.color["Attention/Attention 70"]
      : theme.color["Success/Success 70"]};
  color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  font-weight: 700;
  padding: 16px 24px;
  border-radius: 16px;
  border: none;
  width: 100%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, hasFormId }) =>
      hasFormId
        ? theme.color["Attention/Attention 80"]
        : theme.color["Success/Success 80"]};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ theme, hasFormId }) =>
      hasFormId
        ? theme.color["Attention/Attention 90"]
        : theme.color["Success/Success 90"]};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, hasFormId }) =>
        hasFormId
          ? theme.color["Attention/Attention 60"]
          : theme.color["Success/Success 60"]};
    outline-offset: 2px;
  }
`;

export const CompanyInfo = styled.p`
  margin-top: 24px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.color["Neutral/Neutral 70"]};
  text-align: center;
  user-select: none;
`;

export const StyledModal = styled(Modal)``;

export const ModalOkButton = styled.button`
  background-color: #3bc14a;
  border-color: #3bc14a;
  color: white;
  border: 1px solid;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #32a844;
    border-color: #32a844;
  }

  &:focus {
    outline: 2px solid #3bc14a;
    outline-offset: 2px;
  }
`;

export const modalOkButtonClass = "modal-ok-button";
