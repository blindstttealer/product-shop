import React from "react";
import { Layout } from "antd";
import { MainContent } from "./styles";
import { AppSidebar } from "../AppSidebar";
import { UserAvatar } from "../../ui/user-avatar";
import AppHeader from "../AppHeader";
import { Logo } from "../../ui/logo";
import { NavigationPanel } from "../../navigation/NavigationPanel";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  collapsed,
  toggleCollapse,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader>
        <UserAvatar />
        <NavigationPanel />
      </AppHeader>
      <Layout
        style={{
          marginTop: "100px",
          display: "flex",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <MainContent collapsed={collapsed}>{children}</MainContent>
        <AppSidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      </Layout>
    </Layout>
  );
};
