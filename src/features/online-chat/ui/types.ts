import { User } from "@/features/auth/model/authStore";

export interface Message {
  id: string;
  sender: string;
  text: string;
  createdAt: string;
  from: string;
  to: string;
}
export interface Participant {
  id: string;
  name: string;
  lastMessage?: string;
  unread?: number;
}
export interface ChatDrawerProps {
  currentUser: User;
  chatIcon?: React.ReactNode;
  drawerContainerRef: HTMLDivElement | null
}

export type ChatModeType = 'modal' | 'drawer';