import React from 'react'
import ChatHeader from '../chatHeader/ChatHeader'
import ChatMessages from '../chatMessages/ChatMessages'
import ChatInput from '../chatInput/ChatInput'

function RightChatArea() {
    return (
        <div className='p-4 border-4 min-h-[80%]'>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatMessages />
            </div>
            <ChatInput />
        </div>
    )
}

export default RightChatArea