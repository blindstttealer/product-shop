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
import { SendMessageIcon } from './components/SendMessageIcon';

const FloatingIcon = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4aa8ff 0%, #0066cc 100%);
  box-shadow: 0 10px 30px rgba(5, 22, 48, 0.28);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition:
    transform 180ms cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 180ms;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 18px 40px rgba(5, 22, 48, 0.36);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const Panel = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100%;
  min-height: 0;
  gap: 0;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-right: 1px solid rgba(18, 39, 63, 0.06);
  background: linear-gradient(180deg, rgba(250, 250, 252, 0.92), rgba(245, 246, 250, 0.92));
  min-height: 0;
`;

const Search = styled.div`
  padding: 6px 0 2px;
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding-right: 6px;
  min-height: 0;
`;

const UserContainer = styled.button<{ active?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${({ active }) => (active ? 'rgba(0,102,204,0.08)' : 'transparent')};
  transition:
    background 140ms ease,
    transform 120ms ease,
    box-shadow 120ms;

  &:hover {
    transform: translateY(-2px);
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
  font-size: 15px;
  color: #fff;
  background: linear-gradient(135deg, #5ac3ff 0%, #0066cc 100%);
  flex: 0 0 auto;
  box-shadow: 0 6px 18px rgba(9, 20, 40, 0.06);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0f1724;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserSnippet = styled.div`
  font-size: 13px;
  color: #697386;
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
  padding: 14px 18px;
  border-bottom: 1px solid rgba(18, 39, 63, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(250, 251, 253, 0.6));
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const Status = styled.div`
  font-size: 13px;
  color: #1f6feb; /* online accent */
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 6px 0;
  overflow-y: auto;
  min-height: 0;
  max-height: 220px;
`;

const MessagesWindow = styled.div`
  padding: 18px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0; /* critical for flex containers */
  background: linear-gradient(180deg, #ffffff, #fbfcff);
`;

const MessageRow = styled.div<{ isOwn?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ isOwn?: boolean }>`
  position: relative;
  padding: 12px 14px;
  border-radius: 14px;
  border-bottom-right-radius: ${({ isOwn }) => (isOwn ? '6px' : '14px')};
  border-bottom-left-radius: ${({ isOwn }) => (isOwn ? '14px' : '6px')};
  background: ${({ isOwn }) => (isOwn ? 'linear-gradient(180deg,#2b86d1,#0066cc)' : '#f4f6f9')};
  color: ${({ isOwn }) => (isOwn ? '#fff' : '#0f1724')};
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 6px 18px rgba(12, 20, 40, 0.06);
`;

const Meta = styled.div`
  font-size: 11px;
  color: #91a0b4;
  margin-top: 6px;
  text-align: left;
`;

const Composer = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  align-items: center;
  border-top: 1px solid rgba(18, 39, 63, 0.04);
  background: linear-gradient(180deg, #fff, #fbfcff);
`;

const EmptyState = styled.div`
  padding: 24px;
  color: #697386;
  text-align: center;
`;

const StyledInput = styled(InputField)`
  display: block;
  flex: 1;
  box-sizing: border-box;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff, #f9fafb);
  padding: 6px;
  transition:
    box-shadow 180ms ease,
    border-color 180ms ease,
    transform 120ms ease;

  &:focus-within {
    border-color: #2b86d1;
    box-shadow:
      0 6px 18px rgba(9, 20, 40, 0.06),
      0 0 0 4px rgba(43, 134, 209, 0.06);
    transform: translateY(-1px);
  }
`;

const fade = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 12, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const ModalCard = styled.div`
  width: 480px;
  max-width: calc(100% - 40px);
  background: linear-gradient(180deg, #ffffff, #fbfbff);
  border-radius: 14px;
  box-shadow: 0 18px 48px rgba(12, 34, 80, 0.14);
  padding: 20px;
  animation: ${fade} 160ms ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
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
  width: 160px;
  height: 110px;
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
  margin-top: 6px;
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

  const [callModalOpen, setCallModalOpen] = React.useState(false);
  const [previewActive, setPreviewActive] = React.useState(false);
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = React.useState(false);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, active, opened]);

  React.useEffect(() => {
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
    setParticipants((prev) =>
      prev.map((p) => (p.id === active ? { ...p, lastMessage: msg.text, unread: 0 } : p)),
    );
  };

  const activeParticipant = participants.find((p) => p.id === active);

  const openCallModal = () => {
    setCallModalOpen(true);
  };
  const closeCallModal = () => {
    setCallModalOpen(false);
  };

  const handleStartVideoPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setPreviewActive(true);
    } catch (err) {
      console.error('camera access denied or error', err);
      alert('Не удалось получить доступ к камере. Проверьте разрешения браузера.');
    }
  };

  const handleStartCall = () => {
    if (!activeParticipant) return;
    setIsCalling(true);
    setCallModalOpen(false);
    setMessages((s) => [
      ...s,
      {
        id: Date.now().toString(),
        sender: 'me',
        text: `Звонок ${activeParticipant.name} инициирован…`,
        timestamp: new Date().toISOString(),
      },
    ]);
    setTimeout(() => setIsCalling(false), 2000);
  };

  return (
    <>
      <FloatingIcon onClick={() => setOpened((v) => !v)} aria-label="Открыть чат">
        {chatIcon ?? <DefaultChatIcon />}
      </FloatingIcon>

      <Drawer
        isOpen={opened}
        onClose={closeChat}
        style={{ position: 'fixed', top: 0, height: '100vh', zIndex: 20000 }}
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

              <UsersGrid aria-hidden />

              <UsersList>
                {participants.map((p) => (
                  <UserContainer
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    active={p.id === active}
                  >
                    <Avatar size={44}>{p.name.slice(0, 1).toUpperCase()}</Avatar>

                    <UserInfo>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <UserName>{p.name}</UserName>
                        {p.unread ? <Badge>{p.unread}</Badge> : null}
                      </div>
                      <UserSnippet>{p.lastMessage}</UserSnippet>
                    </UserInfo>
                  </UserContainer>
                ))}
              </UsersList>

              <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                <Button appearance="ghost" dimension="s" onClick={() => alert('Открыть все чаты')}>
                  Все чаты
                </Button>
              </div>
            </Sidebar>

            <RightColumn>
              <ChatHeader>
                {activeParticipant ? (
                  <>
                    <Avatar size={48}>{activeParticipant.name.slice(0, 1).toUpperCase()}</Avatar>
                    <HeaderMeta>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{activeParticipant.name}</div>
                      <Status>Онлайн</Status>
                    </HeaderMeta>

                    <div
                      style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}
                    >
                      <SearchIcon />
                      <button
                        onClick={openCallModal}
                        aria-label="Start call"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
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
                  <div style={{ fontSize: 14, color: '#697386' }}>
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
                                <Avatar size={36}>{msg.sender.slice(0, 1).toUpperCase()}</Avatar>
                              )}

                              <div>
                                <MessageBubble isOwn={isOwn}>{msg.text}</MessageBubble>
                                <Meta>{new Date(msg.timestamp).toLocaleTimeString()}</Meta>
                              </div>

                              {isOwn && (
                                <Avatar size={36}>
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
                    <button
                      aria-label="Attach"
                      title="Attach"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      📎
                    </button>

                    <StyledInput
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={'Написать сообщение...'}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      style={{ flex: 1 }}
                    />

                    <div onClick={handleSend} style={{ cursor: 'pointer' }}>
                      <SendMessageIcon />
                    </div>
                  </Composer>
                </>
              ) : (
                <EmptyState>Выберите участника в списке слева, чтобы начать разговор.</EmptyState>
              )}
            </RightColumn>
          </Panel>
        </DrawerContent>

        <DrawerButtonPanel />
      </Drawer>

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
      )}
    </>
  );
};
