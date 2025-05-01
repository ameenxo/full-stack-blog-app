import { useSocket } from '@/Context/SocketContext'
import React, { useState } from 'react'

function ChatInput() {

  const { sendMessage, selectedUser, setChatHistory, setChatUsers } = useSocket()
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (!selectedUser || trimmedMessage === '') return;
      sendMessage(selectedUser._id, message, ({ success, message, data }) => {
        console.log(message);
        if (success && data) {
          setChatHistory((prev) => [...prev, data]);
          setChatUsers((prevUsers) => {
            const existingIndex = prevUsers.findIndex(
              (user) => user._id === selectedUser._id
            );

            if (existingIndex !== -1) {
              const updatedUser = { ...prevUsers[existingIndex] };
              const updatedUsers = [...prevUsers];
              updatedUsers.splice(existingIndex, 1);
              return [updatedUser, ...updatedUsers];
            } else {
              return [selectedUser, ...prevUsers];
            }
          });
          setMessage('');
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-3 p-4 border-t">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput