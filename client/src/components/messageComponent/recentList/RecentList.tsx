import { RecentChatUser } from '@/types/message/chatUserType';
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
        <div className='flex flex-col gap-2'>
            <div>recent messages</div>
            {recentUserMessages.map((obj, index) => {
                return <ListUserMessage messageInfo={obj} key={index} />
            })}

        </div>
    )
}

export default RecentList