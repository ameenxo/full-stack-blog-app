import { useSocket } from "@/Context/SocketContext"
import { ChatUser } from "@/types/message/chatUserType"


function ListUserMessage({ user }: { user: ChatUser }) {
    const { setSelectedUser } = useSocket()

    return (
        <div className='h-10 p-1.5 mt-1 mb-1 cursor-pointer' onClick={() => setSelectedUser(user)}>
            <div className="flex items-center">
                <div className="shrink-0">
                    <img className="w-8 h-8 rounded-full" src={user.avatar} alt="Michael image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                        {user.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.lastMessage ? user.lastMessage.text : user.bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ListUserMessage