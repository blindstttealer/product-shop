import { PropsWithChildren } from 'react';
import { StyledDrawer } from './styles';
import { DrawerTitle, DrawerContent, DrawerButtonPanel, Button } from '@admiral-ds/react-ui';

interface DrawerChatModeProps {
  isOpen: boolean;
  onCloseChat: () => void;
  // onCloseButtonProps: () => void
  setChatMode: () => void;
  container: HTMLDivElement | null;
}

export const DrawerChatMode = ({
  children,
  isOpen,
  onCloseChat,
  setChatMode,
  container,
}: PropsWithChildren<DrawerChatModeProps>) => {
  console.log('container', container);
  return (
    <StyledDrawer
      isOpen={isOpen}
      onClose={onCloseChat}
      aria-labelledby="chat-drawer-title"
      // closeButtonPropsConfig={ onCloseButtonProps}
      closeOnBackdropClick
      container={container}
    >
      <DrawerTitle id="chat-drawer-title">Онлайн чат</DrawerTitle>
      <Button dimension="s" appearance="ghost" onClick={setChatMode}>
        Модальное окно
      </Button>

      <DrawerContent>{children}</DrawerContent>

      <DrawerButtonPanel />
    </StyledDrawer>
  );
};
