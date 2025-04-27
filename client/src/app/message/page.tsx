"use client"
import AuthError from '@/components/error/AuthError'
import LeftSideBar from '@/components/messageComponent/leftSideBar/LeftSideBar';
import RightChatArea from '@/components/messageComponent/rightChatArea/RightChatArea';
import { useAuth } from '@/Context/AuthContext'
import { useSocket } from '@/Context/SocketContext';
import React from 'react'

function Message() {
    const { user } = useAuth();
    const { socket } = useSocket()

    if (!user) return <AuthError error={'user not Authorized for this resource'} />
    if (!socket) return <AuthError error={"socket not connected successfully"} />

    return (
        <div className='bg-green-400 flex pt-16 min-h-screen items-center justify-center'>
            <div className="w-full h-full md:w-[30%] border-r overflow-y-auto">
                <LeftSideBar />
            </div>
            <div className="hidden h-full md:flex flex-col w-[70%]">
                <RightChatArea />
            </div>
        </div>
    )
}

export default Message