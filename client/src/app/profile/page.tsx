"use client"
import React, { } from 'react'
import { useAuth } from '@/Context/AuthContext'
import UserInfo from '@/components/user-info/UserInfo'
import AuthError from '@/components/error/AuthError'
// import { User } from '@/types/user'
// import { useBlog } from '@/Context/BlogContext'
// import BlogList from '@/components/blog-list/BlogList'
interface user {
  username: string,
  avatar: string,
  bio: string,
  date: string,
}
const userInfo: user = {
  avatar: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
  bio: "Hey there! I love blogging and sharing my thoughts.",
  username: "Ameen Xo",
  date: "10 / 25 / 2022",

}
function Page() {
  const { user } = useAuth()
  // const { allBlogs } = useBlog()


  if (!user) return <AuthError error={"Cannot Find User"} />
  // const userBlogs = allBlogs.filter(blog => blog.author === user._id);


  return (
    <div className='mt-20 mb-20'>
      <UserInfo user={userInfo} />
    </div>
  )
}

export default Page