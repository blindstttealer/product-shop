import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  max-width: 720px;
  margin: 40px auto;
  padding: 30px 35px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

export const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
    background-color: ${({ theme }) => theme.colors.background.secondary};

    .ant-card-head-title {
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: 500;
    }
  }

  .ant-card-body {
    padding: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-left: 5px solid ${({ theme }) => theme.colors.primary};
  padding-left: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: capitalize;
  letter-spacing: 0.04em;
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
`;

export const NoData = styled.div`
  color: ${({ theme }) => theme.colors.text.disabled};
  font-style: italic;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  text-align: center;
`;

export const EditButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
