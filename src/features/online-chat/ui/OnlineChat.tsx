import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerButtonPanel,
  Button,
  InputField,
  Badge,
  useId,
} from '@admiral-ds/react-ui';
import { ChatIcon as DefaultChatIcon } from './components/ChatIcon';
import { PhoneIcon } from './components/PhoneIcon';
import { SearchIcon } from './components/SearchIcon';

// ----------------- Styles -----------------
const FloatingIcon = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3a9ff3 0%, #0066cc 100%);
  box-shadow: 0 6px 18px rgba(20, 20, 20, 0.16);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(20, 20, 20, 0.2);
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    width: 26px;
    height: 26px;
  }
`;

const Panel = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, rgba(250, 250, 250, 0.9), rgba(245, 245, 245, 0.9));
  min-height: 0;
`;

const Search = styled.div`
  padding: 8px 0;
`;

const UserContainer = styled.button<{ active?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${({ active }) => (active ? 'rgba(0,102,204,0.08)' : 'transparent')};
  transition:
    background 120ms ease,
    transform 120ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.03);
  }
`;

const Avatar = styled.div<{ size?: number }>`
  width: ${({ size }) => size ?? 48}px;
  height: ${({ size }) => size ?? 48}px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(135deg, #3a9ff3 0%, #0066cc 100%);
  flex: 0 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserSnippet = styled.div`
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RightColumn = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 6px 0;
  overflow-y: auto;
  min-height: 0;

  max-height: 200px;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
`;

const MessagesWindow = styled.div`
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0; /* critical for flex containers */
  background: linear-gradient(180deg, #fff, #fbfbfc);
`;

const MessageRow = styled.div<{ isOwn?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ isOwn?: boolean }>`
  padding: 10px 14px;
  border-radius: 14px;
  background: ${({ isOwn }) => (isOwn ? 'linear-gradient(180deg,#2b86d1,#0066cc)' : '#f2f3f5')};
  color: ${({ isOwn }) => (isOwn ? '#fff' : '#111')};
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.04);
`;

const Meta = styled.div`
  font-size: 11px;
  color: #777;
  margin-top: 6px;
`;

const Composer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
`;

const EmptyState = styled.div`
  padding: 24px;
  color: #666;
  text-align: center;
`;

const StyledInput = styled(InputField)`
  flex: 1;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.color?.['Neutral/Neutral 05'] || '#f9f9f9'};
`;

/* ----------------- Call Modal styles ----------------- */

const fade = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

const ModalCard = styled.div`
  width: 420px;
  max-width: calc(100% - 40px);
  background: linear-gradient(180deg, #ffffff, #fbfbff);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(12, 34, 80, 0.14);
  padding: 18px;
  animation: ${fade} 160ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const VideoPreview = styled.div<{ active?: boolean }>`
  width: 120px;
  height: 90px;
  border-radius: 10px;
  background: ${({ active }) => (active ? '#000' : 'linear-gradient(180deg,#f5f6fb,#eef2ff)')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? '#fff' : '#9aa2b2')};
  font-weight: 600;
  font-size: 13px;
  overflow: hidden;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
  justify-content: flex-end;
`;

/* ----------------- Types ----------------- */
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Participant {
  id: string;
  name: string;
  lastMessage?: string;
  unread?: number;
}

interface ChatDrawerProps {
  currentUser: string;
  chatIcon?: React.ReactNode;
}

export const Chat: React.FC<ChatDrawerProps> = ({ currentUser, chatIcon }) => {
  const [opened, setOpened] = React.useState(false);
  const [participants, setParticipants] = React.useState<Participant[]>([
    { id: 'hr', name: 'HR', lastMessage: 'Привет! Добро пожаловать в команду.', unread: 0 },
    { id: 'anna', name: 'Anna', lastMessage: 'Готов обсудить дизайн', unread: 2 },
    { id: 'max', name: 'Max', lastMessage: 'Починил баг в тестах', unread: 0 },
    { id: 'dev', name: 'Dev Team', lastMessage: 'Деплой на staging прошёл', unread: 5 },
  ]);

  const [active, setActive] = React.useState<string>('hr');

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      sender: 'hr',
      text: 'Привет! Добро пожаловать в команду.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      sender: 'me',
      text: 'Спасибо! Рад быть здесь.',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonProps = { 'data-testid': useId() };

  // states for call modal
  const [callModalOpen, setCallModalOpen] = React.useState(false);
  const [previewActive, setPreviewActive] = React.useState(false);
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = React.useState(false);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, active, opened]);

  React.useEffect(() => {
    // cleanup local stream when modal closed
    if (!callModalOpen && localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
      setPreviewActive(false);
    }
  }, [callModalOpen, localStream]);

  const closeChat = () => setOpened(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((s) => [...s, msg]);
    setInput('');

    // update participant last message and clear unread for active
    setParticipants((prev) =>
      prev.map((p) => (p.id === active ? { ...p, lastMessage: msg.text, unread: 0 } : p)),
    );
  };

  const activeParticipant = participants.find((p) => p.id === active);

  /* ----------------- Call modal handlers ----------------- */

  const openCallModal = () => {
    setCallModalOpen(true);
    // we don't auto-start preview; user must click Start video
  };

  const closeCallModal = () => {
    setCallModalOpen(false);
  };

  const handleStartVideoPreview = async () => {
    try {
      // request camera (video only preview)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setPreviewActive(true);
      // you can attach stream to a video element if you want a real preview
      // For simplicity we keep a placeholder background; if you want real preview,
      // add a <video ref={...} autoPlay playsInline muted srcObject={stream} />
    } catch (err) {
      console.error('camera access denied or error', err);
      alert('Не удалось получить доступ к камере. Проверьте разрешения браузера.');
    }
  };

  const handleStartCall = () => {
    if (!activeParticipant) return;
    // here — старт звонка (подключение WebRTC и сигналинг)
    // для демо просто переключаем состояние и закрываем модалку
    setIsCalling(true);
    setCallModalOpen(false);

    // demo: создадим системное сообщение
    setMessages((s) => [
      ...s,
      {
        id: Date.now().toString(),
        sender: 'me',
        text: `Звонок ${activeParticipant.name} инициирован…`,
        timestamp: new Date().toISOString(),
      },
    ]);

    // здесь нужно:
    // - открыть PeerConnection / отправить сигнал по websocket
    // - управлять состоянием звонка, звонок в фоне и т.д.
    setTimeout(() => {
      setIsCalling(false);
    }, 2000);
  };

  return (
    <>
      <FloatingIcon onClick={() => setOpened((v) => !v)} aria-label="Открыть чат">
        {chatIcon ?? <DefaultChatIcon />}
      </FloatingIcon>

      <Drawer
        isOpen={opened}
        onClose={closeChat}
        style={{ height: '100vh', top: 0 }}
        aria-labelledby="chat-drawer-title"
        closeButtonPropsConfig={() => closeButtonProps}
        closeOnBackdropClick
      >
        <DrawerTitle id="chat-drawer-title">Онлайн чат</DrawerTitle>

        <DrawerContent>
          <Panel>
            <Sidebar>
              <Search>
                <InputField placeholder="Поиск по участникам" onChange={() => {}} />
              </Search>

              <UsersGrid>
                {participants.map((p) => (
                  <UserContainer
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    active={p.id === active}
                  >
                    <Avatar size={40}>{p.name.slice(0, 1).toUpperCase()}</Avatar>

                    <UserInfo>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <UserName>{p.name}</UserName>
                        {p.unread ? <Badge>{p.unread}</Badge> : null}
                      </div>
                      <UserSnippet>{p.lastMessage}</UserSnippet>
                    </UserInfo>
                  </UserContainer>
                ))}
              </UsersGrid>
            </Sidebar>

            <RightColumn>
              <ChatHeader>
                {activeParticipant ? (
                  <>
                    <Avatar size={44}>{activeParticipant.name.slice(0, 1).toUpperCase()}</Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{activeParticipant.name}</div>
                      <div style={{ fontSize: 13, color: '#666' }}>Онлайн</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
                      <SearchIcon />
                      <button
                        onClick={openCallModal}
                        aria-label="Start call"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <PhoneIcon />
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 14, color: '#666' }}>
                    Выберите участника, чтобы начать чат
                  </div>
                )}
              </ChatHeader>

              {activeParticipant ? (
                <>
                  <MessagesWindow>
                    {messages
                      .filter(
                        (m) =>
                          m.sender === activeParticipant.id ||
                          m.sender === 'me' ||
                          m.sender === 'hr',
                      )
                      .map((msg) => {
                        const isOwn = msg.sender === 'me';
                        return (
                          <div key={msg.id}>
                            <MessageRow isOwn={isOwn}>
                              {!isOwn && (
                                <Avatar size={32}>{msg.sender.slice(0, 1).toUpperCase()}</Avatar>
                              )}
                              <div>
                                <MessageBubble isOwn={isOwn}>{msg.text}</MessageBubble>
                                <Meta>{new Date(msg.timestamp).toLocaleTimeString()}</Meta>
                              </div>
                              {isOwn && (
                                <Avatar size={32}>
                                  {(currentUser || 'You').slice(0, 1).toUpperCase()}
                                </Avatar>
                              )}
                            </MessageRow>
                          </div>
                        );
                      })}
                    <div ref={messagesEndRef} />
                  </MessagesWindow>

                  <Composer>
                    <StyledInput
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={'Написать сообщение...'}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      style={{ flex: 1 }}
                    />
                    <Button dimension="m" appearance="primary" onClick={handleSend}>
                      Отправить
                    </Button>
                  </Composer>
                </>
              ) : (
                <EmptyState>Выберите участника в списке слева, чтобы начать разговор.</EmptyState>
              )}
            </RightColumn>
          </Panel>
        </DrawerContent>

        <DrawerButtonPanel></DrawerButtonPanel>
      </Drawer>

      {/* Call Modal */}
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
              <Avatar size={44}>{activeParticipant.name.slice(0, 1).toUpperCase()}</Avatar>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ModalTitle id="call-modal-title">{activeParticipant.name}</ModalTitle>
                <div style={{ fontSize: 13, color: '#666' }}>Начать звонок</div>
              </div>
            </ModalHeader>

            <ModalBody>
              <VideoPreview active={previewActive}>
                {previewActive ? (
                  // If you want a real <video />, insert it here with ref and srcObject = localStream
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
                <div style={{ fontSize: 14, fontWeight: 600 }}>{activeParticipant.name}</div>
                <div style={{ fontSize: 13, color: '#666' }}>
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
      )}
    </>
  );
};
