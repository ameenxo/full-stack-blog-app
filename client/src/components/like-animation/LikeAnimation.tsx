import React from 'react'
import "./LikeAnimation.css"

function LikeAnimation() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ef4444"
            className="w-20 h-20 like-animation"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.18 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.68-3.4 6.86-8.55 11.53L12 21.35z" />
        </svg>
    )
}

export default LikeAnimation