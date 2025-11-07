import React, { ReactNode } from 'react';
import { ToastProvider as AdmiralToastProvider, Toast } from '@admiral-ds/react-ui';

interface ToastProviderProps {
  children: ReactNode;
  autoDeleteTime?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  autoDeleteTime = 5000,
}) => {
  return (
    <AdmiralToastProvider autoDeleteTime={autoDeleteTime}>
      {children}
      <Toast position="bottom-right" />
    </AdmiralToastProvider>
  );
};
