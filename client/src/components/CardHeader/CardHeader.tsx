import React from 'react'
import HeaderDot from './HeaderDot';

function CardHeader() {
    return (
        <div className='h-10 p-1.5 mt-1 mb-1'>
            <div className="flex items-center">
                <div className="shrink-0">
                    <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Michael image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                        Michael Gough
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                    </p>
                </div>
                <HeaderDot />
            </div>
        </div>
    )
}



export default CardHeader