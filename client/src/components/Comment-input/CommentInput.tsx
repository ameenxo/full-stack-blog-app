import React, { useState } from 'react'

function CommentInput({ newComment, setNewComment, handleAddComment }: { newComment: string, setNewComment: (value: string) => void, handleAddComment: () => void }) {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const HandlePostComment = () => {
        if (newComment.trim() === "") return;
        handleAddComment();
        setIsInputVisible(false)
    }
    return (
        <>
            {
                !isInputVisible ? (
                    <p
                        onClick={() => setIsInputVisible(true)}
                        className=" text-blue-600 cursor-pointer pl-3"
                    >
                        Add a comment...
                    </p>

                ) : (
                    <div className='flex items-center mt-2 mb-2 justify-around max-h-16 '>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="border  w-[70%] p-2 rounded "
                        />
                        <button
                            onClick={HandlePostComment}
                            className="bg-blue-500 w-[20%] p-2 text-white rounded  "
                        >
                            Post
                        </button>
                    </div>
                )
            }

        </ >
    )
}

export default CommentInput