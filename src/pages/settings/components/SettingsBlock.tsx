import styled from 'styled-components';
import type { ComponentType, ReactNode } from 'react';
import { Card } from '@/pages/settings/styles/settings.styles';

type Props = {
  children: ReactNode;
  title: string;
  icon?: ComponentType<{ width?: number; height?: number }>;
};

export const SettingsBlock = ({ children, title, icon: Icon }: Props) => {
  return (
    <SettingsBlockWrapper>
      <BlockHeader>
        {Icon && <Icon width={28} height={28} />}
        <Title>{title}</Title>
      </BlockHeader>
      {children}
    </SettingsBlockWrapper>
  );
};

const SettingsBlockWrapper = styled(Card).attrs({
  hoverable: false,
})`
  margin: 32px auto;
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8eaed;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-weight: 500;
`;
