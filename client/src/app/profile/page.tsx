"use client"
import { useAuth } from '@/Context/AuthContext';
import { useBlog } from '@/Context/BlogContext';
import { Blog } from '@/types/blog';
import React from 'react'


export default function ProfilePage() {
  const { user } = useAuth();
  const { allBlogs } = useBlog()
  const userBlogs = allBlogs.filter((blog: Blog) => blog.author === user?._id);


  if (!user)
    return <div>user not logged in please logg in </div>

  return (
    <div>
      <h2>User Profile</h2>
      <p>Full Name: {user?.username}</p>
      <p>Bio: {user.bio}</p>
      <p>Country: {user.country}</p>
      <h2>User Blogs</h2>
      {userBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        userBlogs.map((blog) => (
          <div key={blog._id}>
            <p>{blog.title}</p>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  )
}

