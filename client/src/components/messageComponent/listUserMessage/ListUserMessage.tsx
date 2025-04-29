import { useSocket } from "@/Context/SocketContext"
import { RecentChatUser } from "@/types/message/recentChatUserType"


function ListUserMessage({ message }: { message: RecentChatUser }) {
    const { setSelectedUser } = useSocket()
    return (
        <div className='h-10 p-1.5 mt-1 mb-1 cursor-pointer' onClick={() => setSelectedUser(message)}>
            <div className="flex items-center">
                <div className="shrink-0">
                    <img className="w-8 h-8 rounded-full" src={message.avatar} alt="Michael image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                        {message.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {message.lastMessage.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ListUserMessage