import React from 'react'

function BlogImage({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="w-full">
            <img
                src={imageUrl}
                alt="Blog Post"
                className="w-full h-80 object-cover rounded-md"
            />
        </div>
    )
}

export default BlogImage