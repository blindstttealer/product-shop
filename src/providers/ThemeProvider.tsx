import React, { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import { ThemeToggle } from "../components/theme-switcher/ThemeSwitcher";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Состояние для переключения тем (можно заменить на контекст или хранилище)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Функция для переключения темы
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      {children}
    </StyledThemeProvider>
  );
};
