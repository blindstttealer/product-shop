import { Link, Outlet } from "react-router";
import React from "react";
import { AppLayout } from "../../components/layout/AppLayout";

export default function MainLayout() {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AppLayout collapsed={collapsed} toggleCollapse={toggleCollapse}>
      <Outlet />
    </AppLayout>
  );
}
