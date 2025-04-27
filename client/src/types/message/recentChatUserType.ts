export interface RecentChatUser {
  senderId: string;
  username: string;
  avatar: string;
  count: number;
  lastMessage: {
    text: string;
    timestamp: string;
  };
}
