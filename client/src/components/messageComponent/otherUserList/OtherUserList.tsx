"use client"
import React, { useEffect, useState } from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage';
import { useSocket } from '@/Context/SocketContext';
import { fetchUserForNewMessage } from '@/utility/api';

function OtherUserList() {
    const { otherUsers, setOtherUsers } = useSocket();
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchChatUser = async () => {
            try {
                const response = await fetchUserForNewMessage();
                if (!response.error && response.data) {
                    setError(null);
                    setOtherUsers(response.data);
                    return
                }
                return setError(response.message);

            } catch (error) {
                if (error instanceof Error) {
                    return setError(error.message);
                } else {
                    return setError('An unknown error occurred');
                }
            }
        }
        fetchChatUser()
    }, [setOtherUsers]);
    if (error) {
        return <div><div>users you can message</div> <div>{error}</div></div>
    }
    return (
        <div className='flex flex-col gap-2'>
            <div>users you can message</div>
            {otherUsers.map((user, index) => {
                return <ListUserMessage user={user} key={index} />
            })}

        </div>
    )
}

export default OtherUserList