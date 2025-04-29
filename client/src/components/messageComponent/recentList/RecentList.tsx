import { RecentChatUser } from '@/types/message/recentChatUserType';
import { fetchRecentMassages } from '@/utility/api';
import React, { useEffect, useState } from 'react'
import ListUserMessage from '../listUserMessage/ListUserMessage';

function RecentList() {
    const [recentUserMessages, setRecentUserMessages] = useState<RecentChatUser[]>([]);
    useEffect(() => {
        const fetchUnreadUsers = async () => {
            const res = await fetchRecentMassages(); // your API
            if (!res.error && res.data) {
                return setRecentUserMessages(res.data);
            }
            alert(res.message);
        };
        fetchUnreadUsers();
    }, []);
    return (
        <>
            <div>recent messages</div>
            {recentUserMessages.map((obj, index) => {
                return <ListUserMessage message={obj} key={index} />
            })}
        </>
    )
}

export default RecentList