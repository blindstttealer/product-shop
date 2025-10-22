import React from "react";
import { Layout } from "antd";
import { MainContent } from "./styles";
import { UserAvatar } from "../../ui/user-avatar";
import AppHeader from "../AppHeader";
import { NavigationPanel } from "../../navigation/NavigationPanel";
import { observer } from "mobx-react-lite";
import { PopoverComponent } from "../../ui/popover/Popover";
import { AuthMenu } from "../../../features/auth/ui/auth-menu/AuthMenu";
import { useAuthStore } from "../../../providers/AuthProvider";

interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = observer(
  ({ children, collapsed, toggleCollapse }) => {
    const authStore = useAuthStore();
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader>
          <NavigationPanel />
          <PopoverComponent content={<AuthMenu />} buttonTitle="Профиль" />
          <UserAvatar
            name={authStore.authorizationUser?.userName}
            email={authStore.authorizationUser?.email}
          />
        </AppHeader>
        <Layout
          style={{
            marginTop: "100px",
            display: "flex",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <MainContent collapsed={collapsed}>{children}</MainContent>
        </Layout>
      </Layout>
    );
  }
);
