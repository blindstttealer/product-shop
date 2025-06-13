import React from "react";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const UserName = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const UserAvatar: React.FC = () => (
  <Space align="center" size="middle">
    <Avatar
      size="default"
      icon={<UserOutlined />}
      style={{ cursor: "pointer" }}
    />
    <UserName>Petrovskiy Slava</UserName>
  </Space>
);
