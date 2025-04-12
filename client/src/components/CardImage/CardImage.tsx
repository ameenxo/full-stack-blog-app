"use client"
import React from 'react'
import { useAuth } from "@/Context/AuthContext"
import LikeAnimation from '../like-animation/LikeAnimation';

interface CardImageProps {
    imageUrl: string;
    likes: string[];
    toggleLike: (blogId: string) => void;
    blogId: string,
}

function CardImage({ likes, blogId, toggleLike }: CardImageProps) {
    const [liked, setLiked] = React.useState(false);
    const { user } = useAuth();
    const hasLiked = user && likes.includes(user._id);
    const handleDoubleClickOnImage = () => {
        if (!hasLiked) {
            toggleLike(blogId)
        }
        setLiked(true);
        setTimeout(() => {
            setLiked(false);
        }, 1000); // animation duration
    };
    const HandleLikeIconClick = () => {
        toggleLike(blogId);
        if (!hasLiked) {
            setLiked(true);
            setTimeout(() => {
                setLiked(false);
            }, 1000); // animation duration
        }

    }
    return (
        <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">

            <div className='absolute px-4 py-2 rounded-lg bg-gray-50 border-2 top-4 left-4'> <span onClick={HandleLikeIconClick} className={`flex gap-2 hover:cursor-pointer font-bold`}>{likes.length}  <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={hasLiked ? '#ef4444' : '#6b7280'}
                className="w-6 h-6"
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.18 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.68-3.4 6.86-8.55 11.53L12 21.35z" />
            </svg></span></div>
            <img
                onDoubleClick={handleDoubleClickOnImage}
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
                alt="card-image"
                className="h-full w-full object-cover rounded-md"
            />
            {liked && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <LikeAnimation />
                </div>
            )}
        </div>
    )

}

export default CardImage