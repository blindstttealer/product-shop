import styled from "styled-components";
import { Layout } from "antd";

export const StyledHeader = styled(Layout)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
