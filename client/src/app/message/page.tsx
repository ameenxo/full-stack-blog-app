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
        <div className=' flex p-10 pt-16 h-screen items-center justify-center gap-2'>
            <div className="w-full  h-[80%] md:w-[30%] border-2 overflow-y-auto ">
                <LeftSideBar />
            </div>
            <div className="hidden h-[80%] md:flex flex-col w-[70%]">
                <RightChatArea />
            </div>

        </div>

    )
}

export default Message