import styled from "styled-components";
import { theme } from "antd";

interface MainContentProps {
  collapsed: boolean;
}

export const MainContent = styled.div<MainContentProps>`
  width: calc(100% - 280px);
  margin: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 280px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-right: ${({ collapsed }) => (collapsed ? "80px" : "200px")};
  transition: margin-right 0.2s;
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
`;
