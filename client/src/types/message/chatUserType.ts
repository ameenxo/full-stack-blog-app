export interface ChatUserLastMessage {
  text: string;
  timestamp: string; // or Date, depending on your usage
}

export interface ChatUser {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  lastMessage: ChatUserLastMessage | null;
  unreadCount: number;
}
