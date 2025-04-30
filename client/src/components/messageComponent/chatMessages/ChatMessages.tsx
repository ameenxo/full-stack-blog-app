"use client"
import { useAuth } from '@/Context/AuthContext';
import { useSocket } from '@/Context/SocketContext';
import { ChatMessage } from '@/types/message/chatMessageType'
import { fetchChatHistory } from '@/utility/api';
import React, { useEffect, useState } from 'react'

function ChatMessages({ chatHistory, setChatHistory }: { chatHistory: ChatMessage[], setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>> }) {
  const { user } = useAuth()
  const { selectedUser } = useSocket()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        setLoading(true)
        console.log(selectedUser);

        if (selectedUser === null) {
          return
        }
        let otherUserId: string | undefined;

        if ('userId' in selectedUser && typeof selectedUser.userId === 'string') {
          otherUserId = selectedUser.userId;
        } else if ('_id' in selectedUser && typeof selectedUser._id === 'string') {
          otherUserId = selectedUser._id;
        }
        if (!otherUserId) {
          return setError("id is not valid")
        }
        const response = await fetchChatHistory(otherUserId);
        if (response.error || !response.data) {
          return setError(response.message)
        } setChatHistory(response.data);
        setError(null)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false)
      }
    }
    fetchAllChat();
  }, [selectedUser])

  if (!selectedUser) return <div className="p-4 text-gray-500">No user selected</div>;
  if (loading) return <div className="p-4 text-gray-500">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (chatHistory.length === 0) return <div className="p-4 text-gray-500">No chat history yet</div>;

  return (
    <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
      {chatHistory.map((message) => {
        const isSender = message.sender === user?._id;

        return (
          <div
            key={message._id}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-xs md:max-w-md text-sm break-words shadow 
              ${isSender ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}`}
            >
              <p>{message.text}</p>
              <div className="text-[10px] mt-1 opacity-70 text-right">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
