export interface ChatMessage {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
