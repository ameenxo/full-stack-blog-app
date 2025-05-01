import React from 'react'
import ChatHeader from '../chatHeader/ChatHeader'
import ChatMessages from '../chatMessages/ChatMessages'
import ChatInput from '../chatInput/ChatInput'

function RightChatArea() {
    return (
        <div className='p-4 border-4 h-full '>
            <div className='h-[10%]'>
                <ChatHeader />
            </div>
            <div className="flex-1 h-[80%]">
                <ChatMessages />
            </div>
            <div className='h-[10%]'>
                <ChatInput />
            </div>

        </div>
    )
}

export default RightChatArea