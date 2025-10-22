import { Outlet } from "react-router";
import React, { useEffect } from "react";
import { AppLayout } from "../../components/layout/AppLayout";
import { useAuthStore } from "../../providers/AuthProvider";

export default function MainLayout() {
  const authStore = useAuthStore();
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const meRequest = async () => {
    await authStore.me();
  };

  useEffect(() => {
    meRequest();
  }, []);

  return (
    <AppLayout collapsed={collapsed} toggleCollapse={toggleCollapse}>
      <Outlet />
    </AppLayout>
  );
}
