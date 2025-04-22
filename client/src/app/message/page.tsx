

// import MessageHome from '@/components/messageComponenets/MessageHome'
import { SocketProvider } from '@/Context/SocketContext'
import React from 'react'

function MessagePage() {
    return (
        <SocketProvider>
            {/* <MessageHome /> */}
        </SocketProvider>
    )
}

export default MessagePage