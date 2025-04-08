import { useState } from "react"

interface user {
    username: string,
    avatar: string,
    bio: string,
    date: string,
}
interface Prop {
    user: user
}
function UserInfo({ user }: Prop) {
    const [isOpenEditWindow, setIsOpenEditWindow] = useState(false);

    return (
        <div className="flex flex-col">
            <div className=" bg-amber-500 flex items-center justify-center p-3">
                <img className="w-[50%] h-48 rounded-full" src={user.avatar} alt="" />
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold pt-2 text-center">{user.username}</h1>
                <p className="text-gray-500  text-center">{user.bio}</p>
                <p className="text-center">created at : {user.date}</p>
            </div>
            <div className="flex items-center justify-center p-3">
                <button onClick={() => setIsOpenEditWindow(true)} className="p-2  bg-green-500 border-2 rounded-md">edit</button>
            </div>
            {
                isOpenEditWindow && (<div className="fixed inset-0 flex items-center justify-center min-h-44">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative min-h-44">
                        {/* Close Button */}
                        <button onClick={() => setIsOpenEditWindow(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>

                        {/* Modal Content */}
                        { }
                    </div>
                </div>)
            }

        </div>
    )
}

export default UserInfo