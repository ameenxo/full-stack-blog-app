"use client"
import React, { useState } from "react";
import { addComment, deleteComment } from "@/utility/api"; // API functions
import { Comment } from "@/types/Comment";
import SingleComment from "../single-comment/SingleComment";
import CommentInput from "../Comment-input/CommentInput";

interface CommentSectionProps {
    blogId: string;
    comments: Comment[];
    blogAuthor: string
}

export default function CommentSection({ blogId, comments, blogAuthor }: CommentSectionProps) {
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

    function CommentHeading() {
        return (
            <div className='mt-1.5 flex border-b-2'>
                <div className="text-slate-500 text-sm font-bold  w-full">
                    Comments
                </div>
                {
                    commentList.length > 1 && (
                        <div className='text-sm text-slate-500 mr-auto hover:cursor-pointer'> more </div>
                    )
                }


            </div>
        )
    }



    return (
        <div>
            <CommentHeading />
            <div className="flex py-2 flex-col gap-3.5">
                <SingleComment blogAuthor={blogAuthor} comment={commentList[commentList.length - 1]} onDelete={handleDeleteComment} />
                <CommentInput handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} />
            </div>
        </div>
    );
}

