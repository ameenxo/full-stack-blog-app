'use client'
import { RecentChatUser } from '@/types/message/recentChatUserType';
import { fetchUnReadMassages } from '@/utility/api';
import React, { useEffect, useState } from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage';

function UnReadList() {
    const [unreadUsers, setUnreadUsers] = useState<RecentChatUser[]>([]);
    useEffect(() => {
        const fetchUnreadUsers = async () => {
            const res = await fetchUnReadMassages(); // your API
            if (!res.error && res.data) {
                return setUnreadUsers(res.data);
            }
            alert(res.message);
        };
        fetchUnreadUsers();
    }, []);
    if (unreadUsers.length === 0) return <div>no more unread messages </div>;
    return (
        <>
            <div>un read messages</div>
            {unreadUsers.map((obj, index) => {
                return <ListUserMessage message={obj} key={index} />
            })}
        </>
    )
}

export default UnReadList