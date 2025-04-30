export interface RecentChatUser {
  userId: string;
  username: string;
  avatar: string;
  count: number;
  lastMessage: {
    text: string;
    timestamp: string;
    isSender: boolean;
  };
  unreadCount: number;
}

export interface NewChatUser {
  _id: string;
  username: string;
  bio: string;
  avatar: string;
}
