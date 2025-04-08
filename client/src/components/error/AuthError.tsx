import Link from 'next/link'
import React from 'react'
import "./AuthError.css"

interface AuthErrorProps {
    error: string | null
}

const AuthError: React.FC<AuthErrorProps> = ({ error }) => {
    return (
        <>
            <div className=' bg-gray-200 min-h-screen flex items-center justify-center  '>
                <div className=' bg-white  w-[90%]  text-center border  p-3 pt-6 pb-6 rounded-2xl flex flex-col gap-6 lg:w-[30%]'>
                    <h1 className='text-4xl font-bold headingFont text-red-600'>ACCESS DENIED</h1>
                    <p className='text-lg font-bold'> {error ? error : "You must log in to access this page."}</p>
                    <p className="text-center ">
                        Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register here</Link>
                    </p>
                    <p className='text-center '>
                        Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default AuthError