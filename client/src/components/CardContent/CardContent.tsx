import React from 'react'

function CardContent({ content}: { content: string }) {
    return (
        <div className="m flex items-center justify-between">
            <p className="text-slate-800 text-xl font-semibold">
              {content}
            </p>
        </div>
    )
}

export default CardContent