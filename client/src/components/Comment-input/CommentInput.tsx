import React from 'react'
import { FaComment } from 'react-icons/fa';

function CommentInput({ newComment, setNewComment, handleAddComment }: { newComment: string, setNewComment: (value: string) => void, handleAddComment: () => void }) {
    const HandlePostComment = () => {
        if (newComment.trim() === "") return;
        handleAddComment();
    }
    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaComment />
                </div>
                <div className='h-10 flex gap-2 '>
                    <input onChange={(e)=>setNewComment(e.target.value)} type="text" id="commentInput" className="block w-full h-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-blue-500  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comment..." required />
                    <button onClick={HandlePostComment} type="button" className="text-white  rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
                </div>
            </div>
        </ >
    )
}

export default CommentInput