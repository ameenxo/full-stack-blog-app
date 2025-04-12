"use client"
import React from 'react'
import { useAuth } from '@/Context/AuthContext'
import { AiFillDelete } from "react-icons/ai";

interface DeleteCommentProps {
    commentId: string,
    commentAuthor: string,
    onDelete: (commentId: string) => void,
    blogAuthor: string,
}

export default function DeleteComment({ blogAuthor, commentId, onDelete, commentAuthor }: DeleteCommentProps) {
    const { user } = useAuth();
    const canDelete: boolean | null = user && (user._id === commentAuthor || user._id === blogAuthor);
    if (!canDelete) return null;
    return (
        <AiFillDelete onClick={() => { onDelete(commentId) }} />
    )

}