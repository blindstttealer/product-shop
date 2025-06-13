import styled from "styled-components";
import { Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

export const StyledSider = styled(Sider)`
  position: fixed;
  right: 0;
  top: 100px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: auto;
`;

export const CollapseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  // svg {
  //   font-size: 16px;
  //   cursor: pointer;
  //   color: ${({ theme }) => theme.colors.text.secondary};
  //
  //   &:hover {
  //     color: ${({ theme }) => theme.colors.text.primary};
  //   }
  // }
`;

export const StyledMenu = styled(Menu)`
  border-right: 0;
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  border-radius: 5px;
`;
