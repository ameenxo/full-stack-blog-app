import { useAuth } from '@/Context/AuthContext'
import { Comment } from '@/types/Comment'
import React from 'react'
import { BsTrash2 } from 'react-icons/bs'

function SingleComment({ comment, onDelete }: { comment: Comment, onDelete: (commentId: string) => void }) {
    const { user } = useAuth()
    return (
        <div className="flex items-center gap-2 p-2 border-b">
            {/* Avatar */}
            <img
                src={"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
            />

            {/* Comment Content */}
            <div className="flex-1">
                <span className="font-bold">{"username"}</span>:<span className='pl-3'>{comment.text}</span>
            </div>

            {/* Delete Button (only if the user is the author) */}
            {comment.user === user?._id && (
                <button onClick={() => onDelete(comment._id)} className="text-red-500 hover:text-red-700">
                    <BsTrash2 className='cursor-pointer' size={18} />
                </button>
            )}
        </div>
    )
}

export default SingleComment