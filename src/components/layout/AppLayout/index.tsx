import React from 'react';
import { Layout } from 'antd';
import { MainContent } from './styles';
import { UserAvatar } from '../../ui/user-avatar';
import AppHeader from '../AppHeader';
import { NavigationPanel } from '../../navigation/NavigationPanel';
import { observer } from 'mobx-react-lite';
import { PopoverComponent } from '../../ui/popover/Popover';
import { AuthMenu } from '@/features/auth/ui/auth-menu/AuthMenu';
import { useAuthStore } from '@/providers/AuthProvider';
import { ThemeToggle } from '@/components/theme-switcher/ThemeSwitcher';
import { useThemeContext } from '@/providers/ThemeProvider';
import { Chat } from '@/features/online-chat/ui/OnlineChat';

interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = observer(
  ({ children, collapsed, toggleCollapse }) => {
    const authStore = useAuthStore();
    const { isDarkMode, toggleTheme } = useThemeContext();
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader>
          <NavigationPanel />
          <PopoverComponent content={<AuthMenu />} buttonTitle="Профиль" />
          <UserAvatar
            name={authStore.authorizationUser?.userName}
            email={authStore.authorizationUser?.email}
          />
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </AppHeader>
        <Layout
          style={{
            marginTop: '100px',
            display: 'flex',
            minHeight: 'calc(100vh - 100px)',
          }}
        >
          <MainContent collapsed={collapsed}>{children}</MainContent>
          <Chat currentUser="Slava Petrovskiy" />
        </Layout>
      </Layout>
    );
  },
);
