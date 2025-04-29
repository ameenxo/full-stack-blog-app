import React from 'react'
import UnReadList from '../unReadList/UnReadList'
import RecentList from '../recentList/RecentList'
import OtherUserList from '../otherUserList/OtherUserList'

function LeftSideBar() {
    
    return (
        <div className='border-4 p-5 h-full'> 
            <UnReadList />
            <RecentList />
            <OtherUserList />
        </div>
    )
}

export default LeftSideBar