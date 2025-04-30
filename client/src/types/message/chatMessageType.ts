export interface ChatMessage {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
export interface ReceivedMessageType {
  from: {
    userId: string;
    userName: string;
    avatar: string;
  };
  message: {
    _id: string;
    sender: string;
    receiver: string;
    text: string;
    isRead: boolean;
    timestamp: number;
  };
}
