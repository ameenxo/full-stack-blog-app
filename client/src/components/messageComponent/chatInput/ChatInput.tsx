import { useSocket } from '@/Context/SocketContext'
import { ChatMessage } from '@/types/message/chatMessageType'
import React, { useState } from 'react'

function ChatInput({  }: { chatHistory: ChatMessage[] }) {

  const { sendMessage, selectedUser } = useSocket()
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      let otherUserId: string | null = null;
      if (!selectedUser) {
        return
      }
      if ('userId' in selectedUser && typeof selectedUser.userId === 'string') {
        otherUserId = selectedUser.userId;
      } else if ('_id' in selectedUser && typeof selectedUser._id === 'string') {
        otherUserId = selectedUser._id;
      }
      if (!otherUserId) {
        return
      }
      sendMessage(otherUserId, message, () => {

      })

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex'>
      <input onChange={(e) => setMessage(e.target.value)} className='rounded-md w-[60%] h-16 p-3' type="text" />
      <button onClick={handleSendMessage} className='p-5'>send</button>
    </div>
  )
}

export default ChatInput