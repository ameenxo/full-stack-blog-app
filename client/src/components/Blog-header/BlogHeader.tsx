import React from 'react'
import { BsThreeDots } from 'react-icons/bs';


export default function BlogHeader({ author }: { author: { avatar: string; username: string } }) {
    return (
        <div className="flex items-center justify-between p-2 border-b border-gray-300">
            {/* Left Side - Avatar & Username */}
            <div className="flex items-center gap-4">
                <img
                    src={author.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-400 object-cover"
                />
                <h4 className="font-semibold text-gray-800">{author.username}</h4>
            </div>

            {/* Right Side - Three Dot Menu */}
            <button className="text-gray-500 hover:text-gray-700">
                <BsThreeDots size={20} />
            </button>
        </div>
    )
}
