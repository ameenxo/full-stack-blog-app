import React from 'react'
import RecentList from '../recentList/RecentList'
import OtherUserList from '../otherUserList/OtherUserList'

function LeftSideBar() {

    return (
        <div className='flex flex-col gap-3 p-3'>
            <RecentList />
            <OtherUserList />
        </div>
    )
}

export default LeftSideBar