export interface ChatUserLastMessage {
  text: string;
  timestamp: string;
  isSender: boolean;
}

export interface ChatUser {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  lastMessage: ChatUserLastMessage | null;
  unreadCount: number;
}
