"use client"
import React, { useState } from 'react'
import ChatHeader from '../chatHeader/ChatHeader'
import ChatMessages from '../chatMessages/ChatMessages'
import ChatInput from '../chatInput/ChatInput'
import { ChatMessage } from '@/types/message/chatMessageType';

function RightChatArea() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    return (
        <div className='p-4 border-4 h-full '>
            <div className='h-[10%]'>
                <ChatHeader />
            </div>
            <div className="flex-1 overflow-y-auto h-[80%]">
                <ChatMessages chatHistory={chatHistory} setChatHistory={setChatHistory} />
            </div>
            <div className='h-[10%]'>
                <ChatInput chatHistory={chatHistory} />
            </div>

        </div>
    )
}

export default RightChatArea