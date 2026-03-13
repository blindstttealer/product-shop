import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@/providers/AuthProvider';
import AppHeader from '../AppHeader';
import { NavigationPanel } from '../../navigation/NavigationPanel';
import { AuthorizationMenu } from '@/features/auth/ui/authorization-menu';
import { ThemeToggle } from '@/components/theme-switcher/ThemeSwitcher';
import { Chat } from '@/features/online-chat/ui/OnlineChat';
import { useThemeContext } from '@/providers/ThemeProvider';
import { ContentLayout, LayoutContainer, MainContent } from './styles';
import { useNavigate } from 'react-router';
import { DropDownUserMenuContainer } from '@/features/auth/ui/authorization-menu/components/user-menu/DropDownUserMenuContainer';

interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = observer(({ children, collapsed }) => {
  const authStore = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const [headerContainer, setHeaderContainer] = useState<HTMLDivElement | null>(null);

  const setDrawerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setHeaderContainer(node);
    }
  }, []);

  /* TODO: Временный коммент, чтобы каждый раз не логиниться и видеть приложение,
        раскоментируй нижние строки и закоментируй данные стора чтобы работало
 */
  const isAuthenticated = authStore.isAuthenticated;
  // let isAuthenticated = true;
  // console.log('isAuthenticated2', isAuthenticated2);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/registration', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <LayoutContainer>
      {isAuthenticated && (
        <AppHeader ref={setDrawerRef}>
          <NavigationPanel />
          <DropDownUserMenuContainer
            login={authStore.authenticatedUser?.login}
            email={authStore.authenticatedUser?.email}
          />
          <AuthorizationMenu />
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </AppHeader>
      )}

      <ContentLayout $hasHeader={isAuthenticated}>
        <MainContent $collapsed={collapsed}>{children}</MainContent>

        {isAuthenticated && headerContainer && (
          <Chat drawerContainerRef={headerContainer} currentUser={authStore.authenticatedUser} />
        )}
      </ContentLayout>
    </LayoutContainer>
  );
});
