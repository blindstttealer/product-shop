import React, { useCallback, useEffect, useState } from 'react';

import { FloatingButton } from './components/floating-button';
import { DrawerChatMode } from './components/drawer-mode';
import { ModalChatMode } from './components/modal-mode';

import { ChatDrawerProps, ChatModeType, Message, Participant } from './types';
import { ChatContent } from './components/chat-content';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '@/api/services';
export const Chat: React.FC<ChatDrawerProps> = ({ currentUser, chatIcon, drawerContainerRef }) => {
  const [opened, setOpened] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'hr', name: 'HR', lastMessage: 'Привет! Добро пожаловать в команду.', unread: 0 },
    { id: 'anna', name: 'Anna', lastMessage: 'Готов обсудить дизайн', unread: 2 },
    { id: 'max', name: 'Max', lastMessage: 'Починил баг в тестах', unread: 0 },
    { id: 'dev', name: 'Dev Team', lastMessage: 'Деплой на staging прошёл', unread: 5 },
  ]);

  const [activeParticipant, setActiveParticipant] = useState<Participant>(null);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    ['hr']: [],
    ['anna']: [],
    ['max']: [],
    ['dev']: [],
  });

  const [inputMessage, setInputMessage] = useState('');

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [chatMode, setChatMode] = useState<ChatModeType>('drawer');

  // useEffect(() => {
  //   if (!callModalOpen && localStream) {
  //     localStream.getTracks().forEach((t) => t.stop());
  //     setLocalStream(null);
  //     setPreviewActive(false);
  //   }
  // }, [callModalOpen, localStream]);

  console.log('socket-', socket);

  useEffect(() => {
    socket.on('new-message', (message: Message) => {
      const dialogUserId = message.from === currentUser.id ? message.to : message.from;

      console.log('dialogUserId', dialogUserId);

      setMessages((prev) => ({
        ...prev,
        [dialogUserId]: [...(prev[dialogUserId] || []), message],
      }));
    });

    return () => {
      socket.off('new-message');
    };
  }, [currentUser.id]);

  const closeChat = () => setOpened(false);

  // const handleSend = () => {
  //   if (!inputMessage.trim()) return;
  //   const message: Message = {
  //     id: uuidv4(),
  //     sender: 'me',
  //     text: inputMessage.trim(),
  //     timestamp: new Date().toISOString(),
  //   };

  //   setMessages((prevMessages) => {
  //     console.log('prevMessage', prevMessages);
  //     console.log('activeParticipant', activeParticipant);
  //     return {
  //       ...prevMessages,
  //       [activeParticipant.id]: [...prevMessages[activeParticipant.id], message],
  //     };
  //   });
  //   setInputMessage('');
  //   setParticipants((prev) =>
  //     prev.map((p) =>
  //       p.id === activeParticipant.id ? { ...p, lastMessage: message.text, unread: 0 } : p,
  //     ),
  //   );
  // };

  const handleSend = () => {
    if (!inputMessage.trim() || !activeParticipant) return;

    socket.emit('send-message', {
      toUserId: activeParticipant.id,
      text: inputMessage,
    });

    setInputMessage('');
  };

  const openCallModal = () => {
    setCallModalOpen(true);
  };

  // const closeCallModal = () => {
  //   setCallModalOpen(false);
  // };

  // const handleStartVideoPreview = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //     setLocalStream(stream);
  //     setPreviewActive(true);
  //   } catch (err) {
  //     console.error('camera access denied or error', err);
  //     alert('Не удалось получить доступ к камере. Проверьте разрешения браузера.');
  //   }
  // };

  // const handleStartCall = () => {
  //   if (!activeParticipant) return;
  //   setIsCalling(true);
  //   setCallModalOpen(false);
  //   setMessages((s) => [
  //     ...s,
  //     {
  //       id: Date.now().toString(),
  //       sender: 'me',
  //       text: `Звонок ${activeParticipant.name} инициирован…`,
  //       timestamp: new Date().toISOString(),
  //     },
  //   ]);
  //   setTimeout(() => setIsCalling(false), 2000);
  // };

  const setChatModeHandler = (mode: ChatModeType) => {
    setChatMode(mode);
  };

  const renderChatByMode = (chatMode: ChatModeType) => {
    const contentProps = {
      activeParticipant,
      inputMessage,
      onChangeInputMessage: setInputMessage,
      participants,
      userMessages: messages[activeParticipant?.id] || [],
      sendMessage: handleSend,
      onOpenCallModal: openCallModal,
      setActiveParticipant,
      currentUser: currentUser?.id,
    };

    switch (chatMode) {
      case 'drawer': {
        return (
          <DrawerChatMode
            isOpen={opened}
            onCloseChat={closeChat}
            setChatMode={() => setChatModeHandler('modal')}
            container={drawerContainerRef}
          >
            <ChatContent {...contentProps} isDrawerMode={chatMode === 'drawer'} />
          </DrawerChatMode>
        );
      }

      case 'modal': {
        return (
          <ModalChatMode
            onCloseChat={closeChat}
            onOpen={opened}
            setChatMode={() => setChatModeHandler('drawer')}
          >
            <ChatContent {...contentProps} />
          </ModalChatMode>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      <FloatingButton chatIcon={chatIcon} onOpen={() => setOpened((prevValue) => !prevValue)} />

      {renderChatByMode(chatMode)}

      {/*
        TODO: Раскоментировать когда будут аудио и видеозвонки

      {callModalOpen && activeParticipant && (
        <ModalOverlay
          role="dialog"
          aria-modal="true"
          aria-labelledby="call-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeCallModal();
            }
          }}
        >
          <ModalCard>
            <ModalHeader>
              <Avatar size={48}>{activeParticipant.name.slice(0, 1).toUpperCase()}</Avatar>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ModalTitle id="call-modal-title">{activeParticipant.name}</ModalTitle>
                <div style={{ fontSize: 13, color: '#697386' }}>Начать звонок</div>
              </div>
            </ModalHeader>

            <ModalBody>
              <VideoPreview active={previewActive}>
                {previewActive ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span>Preview</span>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 8 }}>
                    <div style={{ fontSize: 12, marginBottom: 6 }}>Видео предпросмотра</div>
                    <div style={{ fontSize: 11, color: '#9aa2b2' }}>Включите камеру</div>
                  </div>
                )}
              </VideoPreview>

              <ModalInfo>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{activeParticipant.name}</div>
                <div style={{ fontSize: 13, color: '#697386' }}>
                  {activeParticipant.lastMessage ?? 'Нет последних сообщений'}
                </div>

                <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
                  <Button
                    dimension="s"
                    appearance="ghost"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeParticipant.id);
                    }}
                  >
                    Copy ID
                  </Button>
                  <Button dimension="s" appearance="ghost" onClick={() => alert('Открыть профиль')}>
                    Profile
                  </Button>
                </div>
              </ModalInfo>
            </ModalBody>

            <ModalActions>
              <Button appearance="ghost" onClick={closeCallModal}>
                Cancel
              </Button>
              <Button appearance="secondary" onClick={handleStartVideoPreview}>
                Start video
              </Button>
              <Button appearance="primary" onClick={handleStartCall}>
                Start call
              </Button>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )} */}
    </>
  );
};
