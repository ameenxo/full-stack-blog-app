import React, { useState } from "react";
import { addComment, deleteComment } from "@/utility/api"; // API functions
import { Comment } from "@/types/Comment";
import SingleComment from "../single-comment/SingleComment";
import CommentInput from "../Comment-input/CommentInput";

interface CommentSectionProps {
    blogId: string;
    comments: Comment[];
}

export default function CommentSection({ blogId, comments }: CommentSectionProps) {
    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState<Comment[]>(comments);

    // Add Comment Handler
    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        const response = await addComment(blogId, newComment);
        if (!response.error) {
            if (response.data?.comments) {
                setCommentList(response.data.comments);
                setNewComment("");
            }
        } else {
            alert(response.message);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        const response = await deleteComment(blogId, commentId);
        if (!response.error) {
            setCommentList((prevComments) =>
                prevComments.filter(comment => comment._id !== commentId)
            );
        } else {
            alert(response.message);
        }
    };


    return (
        // <div className=" p-2 bg-gray-100 rounded-lg">
        //     {!comments.length && (
        //         <div className="h-10 flex items-center justify-center">
        //             <p className="text-sm text-gray-400">No comments yet. Be the first!</p>

        //         </div>
        //     )}
        //     {comments.length > 0 && (
        //         <SingleComment comment={comments[0]} onDelete={handleDeleteComment} />
        //     )}
        //     <CommentInput handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} />
        //     {/* Show only first 1 comments */}
        //     {/* {commentList.slice(0, 1).map((comment, index) => (
        //         <SingleComment comment={comment} key={index} onDelete={handleDeleteComment} />
        //     ))} */}

        //     {/* Show More Button */}
        //     {/* {commentList.length > 1 && !showAll && (
        //         <button
        //             onClick={() => setShowAll(true)}
        //             className="text-blue-500 p-2 text-sm mt-1"
        //         >
        //             Show more comments...
        //         </button>
        //     )} */}

        //     {/* Modal for all comments */}
        //     {showAll && (
        //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        //             <div className="bg-white p-5 rounded-lg w-96 max-h-96 overflow-y-auto">
        //                 <h3 className="text-lg font-semibold mb-3">All Comments</h3>
        //                 {commentList.map((comment, index) => (
        //                     <SingleComment comment={comment} onDelete={handleDeleteComment} key={index} />
        //                 ))}
        //                 {/* Close Button */}
        //                 <button
        //                     onClick={() => setShowAll(false)}
        //                     className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg"
        //                 >
        //                     Close
        //                 </button>
        //             </div>
        //         </div>
        //     )}

        //     {/* Add Comment Input */}
        //     {/* <CommentInput handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} /> */}
        // </div>
        <div>
            <CommentHeading />
            <div className="flex py-2 flex-col gap-3.5">
                {comments.length === 0 ? <EmptyComment /> : <SingleComment comment={commentList[0]} onDelete={handleDeleteComment} />}
                <CommentInput handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} />
            </div>
        </div>
    );
}

function CommentHeading() {
    return (
        <div className='mt-1.5 flex border-b-2'>
            <div className="text-slate-500 text-sm font-bold  w-full">
                Comments
            </div>
            <div className='text-sm text-slate-500 mr-auto'> more </div>

        </div>
    )
}

function EmptyComment() {
    return (
        <div className='h-10 p-1.5 pt-2 flex items-center justify-center'>
            <p className="text-sm text-black italic ">No comments yet. Be the first to comment!</p>

        </div>
    )
}