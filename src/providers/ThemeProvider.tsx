import React, { createContext, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
} from "@admiral-ds/react-ui";

interface ThemeContextType {
  theme: typeof LIGHT_THEME;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT_THEME,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <StyledThemeProvider theme={theme}>
        <DropdownProvider>
          <FontsVTBGroup />
          {children}
        </DropdownProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
