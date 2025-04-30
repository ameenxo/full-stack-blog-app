"use client"
import { NewChatUser } from '@/types/message/chatUserType'
import api from '@/utility/axios.config'
import React, { useEffect, useState } from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage';

function OtherUserList() {
    const [newChatUser, setNewChatUser] = useState<NewChatUser[]>([])
    useEffect(() => {
        const fetchChatUser = async () => {
            const response = await api.get('/messages/users')
            if (response.status === 200 && !response.data.error) {
                setNewChatUser(response.data.data)
            }
        }
        fetchChatUser()
    }, []);
    return (
        <div className='flex flex-col gap-2'>
            <div>users you can message</div>
            {newChatUser.map((obj, index) => {
                return <ListUserMessage messageInfo={obj} key={index} />
            })}

        </div>
    )
}

export default OtherUserList