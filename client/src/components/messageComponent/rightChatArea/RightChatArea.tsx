import React from 'react'
import ChatHeader from '../chatHeader/ChatHeader'
import ChatMessages from '../chatMessages/ChatMessages'
import ChatInput from '../chatInput/ChatInput'

function RightChatArea() {
    return (
        <div>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatMessages />
            </div>
            <ChatInput />
        </div>
    )
}

export default RightChatArea