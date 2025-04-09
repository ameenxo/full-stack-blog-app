import React from 'react'
import { FcLike } from 'react-icons/fc';

interface CardImageProps {
    imageUrl: string;
    likes: number;
}

function CardImage({likes}:CardImageProps) {

    return (
        <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
            <div className='absolute px-4 py-2 rounded-lg bg-gray-50 border-2 top-4 left-4'> <span className='flex gap-2 font-bold'>{likes}<FcLike className='w-6 h-6' /></span></div>
            <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
                alt="card-image"
                className="h-full w-full object-cover rounded-md"
            />
        </div>
    )

}

export default CardImage