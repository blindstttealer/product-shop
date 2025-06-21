import styled from "styled-components";
import { Modal } from "antd";

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  max-width: ${({ theme }) => theme.breakpoints.md};
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StepInfo = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.successHover};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.successActive};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.success};
    outline-offset: 2px;
  }
`;

export const CompanyInfo = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  user-select: none;
`;

export const StyledModal = styled(Modal)``;
