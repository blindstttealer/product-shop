import React, { ReactNode } from "react";
import { StyledHeader, Container } from "./styles";
import { ThemeToggle } from "../../theme-switcher/ThemeSwitcher";
import { useTheme } from "../../../context/ThemeContext";
export default function AppHeader({ children }: { children?: ReactNode }) {
  const { isDarkMode, toggleTheme } = useTheme();
  // @ts-ignore
  return (
    <StyledHeader>
      <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Container>{children}</Container>
    </StyledHeader>
  );
}
