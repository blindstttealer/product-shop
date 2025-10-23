import styled from "styled-components";

interface MainContentProps {
  collapsed: boolean;
}

export const MainContent = styled.div<MainContentProps>`
  padding: 24px;
  min-height: 280px;
`;
