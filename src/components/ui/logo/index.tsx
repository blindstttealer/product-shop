import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const Logo: React.FC = () => <LogoContainer />;
