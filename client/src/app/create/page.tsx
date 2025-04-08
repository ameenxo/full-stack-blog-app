"use client"
import React from 'react'
import { useAuth } from '@/Context/AuthContext'
import AuthError from '@/components/error/AuthError';
import BlogForm from '@/components/blog-form/BlogForm';

function Page() {
  const { user, authError } = useAuth();

  if (!user) return <AuthError error={authError?.message || "Your  Not Authorized "} />
  if (authError) return <AuthError error={authError.message} />

  return (
    <div className='mt-20 mb-20 text-4xl text-center bg '>
        <BlogForm />
    </div>
  )
}

export default Page