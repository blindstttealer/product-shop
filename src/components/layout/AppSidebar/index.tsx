import React from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledSider, CollapseButton, StyledMenu } from "./styles";

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const sideMenuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Профиль",
  },
  {
    key: "2",
    icon: <SettingOutlined />,
    label: "Настройки",
  },
  {
    key: "3",
    icon: <LogoutOutlined />,
    label: "Выход",
  },
];

export const AppSidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggleCollapse,
}) => (
  <>
    <StyledSider
      width={200}
      collapsedWidth={80}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      trigger={null}
    >
      <CollapseButton>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            onClick: toggleCollapse,
          },
        )}
      </CollapseButton>
      <StyledMenu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sideMenuItems}
      />
    </StyledSider>
  </>
);
