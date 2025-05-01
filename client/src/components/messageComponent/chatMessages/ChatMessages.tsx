"use client"
import { useAuth } from '@/Context/AuthContext';
import { useSocket } from '@/Context/SocketContext';
import { fetchChatHistory } from '@/utility/api';
import React, { useEffect, useRef, useState } from 'react'

function ChatMessages() {
  const { user } = useAuth()
  const { selectedUser, setChatHistory, chatHistory } = useSocket()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        if (!selectedUser) return; // don't do anything if user is not yet selected

        setLoading(true);
        setError(null); // clear previous error

        const response = await fetchChatHistory(selectedUser._id);
        if (response.data && !response.error) {
          return setChatHistory(response.data);
        }
        setError(response.message || "Failed to fetch chat");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAllChat();
  }, [selectedUser])
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  if (!selectedUser) return <div className="p-4 text-gray-500">No user selected</div>;
  if (loading) return <div className="p-4 text-gray-500">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (chatHistory.length === 0) return <div className="p-4 text-gray-500">No chat history yet</div>;

  return (
    <div className="p-4 h-full space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
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
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;
