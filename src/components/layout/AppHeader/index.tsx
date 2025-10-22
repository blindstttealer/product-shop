import { ReactNode } from "react";
import { StyledHeader, Container } from "./styles";
export default function AppHeader({ children }: { children?: ReactNode }) {
  return (
    <StyledHeader>
      <Container>{children}</Container>
    </StyledHeader>
  );
}
