import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

interface ThemeToggleProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => (
  <ToggleContainer>
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  </ToggleContainer>
);
