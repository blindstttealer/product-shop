import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@/providers/AuthProvider';
import AppHeader from '../AppHeader';
import { NavigationPanel } from '../../navigation/NavigationPanel';
import { UserAvatar } from '../../ui/user-avatar';
import { AuthorizationMenu } from '@/features/auth/ui/authorization-menu';
import { ThemeToggle } from '@/components/theme-switcher/ThemeSwitcher';
import { Chat } from '@/features/online-chat/ui/OnlineChat';
import { useThemeContext } from '@/providers/ThemeProvider';
import { ContentLayout, LayoutContainer, MainContent } from './styles';

interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = observer(({ children, collapsed }) => {
  const authStore = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const isAuthenticated = authStore.isAuthenticated;

  return (
    <LayoutContainer>
      {isAuthenticated && (
        <AppHeader>
          <NavigationPanel />
          <UserAvatar
            name={authStore.authenticatedUser?.login}
            email={authStore.authenticatedUser?.email}
          />
          <AuthorizationMenu />
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </AppHeader>
      )}

      <ContentLayout $hasHeader={isAuthenticated}>
        <MainContent $collapsed={collapsed}>{children}</MainContent>

        {isAuthenticated && <Chat currentUser={authStore.authenticatedUser?.login ?? 'Гость'} />}
      </ContentLayout>
    </LayoutContainer>
  );
});
