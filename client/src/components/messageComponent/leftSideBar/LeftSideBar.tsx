import React from 'react'
import UnReadList from '../unReadList/UnReadList'
import RecentList from '../recentList/RecentList'
import OtherUserList from '../otherUserList/OtherUserList'

function LeftSideBar() {
    
    return (
        <div>
            <UnReadList />
            <RecentList />
            <OtherUserList />
        </div>
    )
}

export default LeftSideBar