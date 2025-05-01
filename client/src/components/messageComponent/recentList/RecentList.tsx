"use client"
import React, { useEffect, useState } from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage';
import { useSocket } from '@/Context/SocketContext';
import { fetchRecentMassages } from '@/utility/api';

function RecentList() {
    const { chatUsers, setChatUsers, socket } = useSocket();
    const [error, setError] = useState<string | null>()
    useEffect(() => {
        const fetchRecentMessage = async () => {
            try {
                const response = await fetchRecentMassages();
                if (!response.error && response.data) {
                    setChatUsers(response.data)
                    setError(null);
                }
                if (response.error) {
                    return setError(response.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    return setError(error.message);
                } else {
                    return setError('An unknown error occurred');
                }
            }

        }
        fetchRecentMessage()
    }, [socket, setChatUsers])
    if (error) {
        return <div><div>recent messages </div><div>{error}</div></div>
    }
    return (
        <div className='flex flex-col gap-2'>
            <div>recent messages</div>
            {chatUsers.map((user, index) => {
                return <ListUserMessage user={user} key={index} />
            })}

        </div>
    )
}

export default RecentList