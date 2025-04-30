import { useSocket } from "@/Context/SocketContext"
import { NewChatUser, RecentChatUser } from "@/types/message/chatUserType"


function ListUserMessage({ messageInfo }: { messageInfo: RecentChatUser | NewChatUser }) {
    const { setSelectedUser } = useSocket()
    const isRecentChat = (info: RecentChatUser | NewChatUser): info is RecentChatUser => {
        return 'lastMessage' in info;
    };
    return (
        <div className='h-10 p-1.5 mt-1 mb-1 cursor-pointer' onClick={() => setSelectedUser(messageInfo)}>
            <div className="flex items-center">
                <div className="shrink-0">
                    <img className="w-8 h-8 rounded-full" src={messageInfo.avatar} alt="Michael image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                        {messageInfo.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {isRecentChat(messageInfo) ? messageInfo.lastMessage.text : messageInfo.bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ListUserMessage