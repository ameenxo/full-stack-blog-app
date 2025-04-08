import { useState } from "react";
import { toggleLike } from "@/utility/api"; // Your utility function
import { ApiResponse } from "@/types/api-response";
import { Blog } from "@/types/blog";

interface LikeButtonProps {
    blogId: string,
    likes: string[]
}


export default function LikeButton({ blogId, likes }: LikeButtonProps) {
    const [likeCount, setLikeCount] = useState<number>(likes.length);

    const handleLike = async () => {
        const response: ApiResponse<Blog> = await toggleLike(blogId);
        if (response.error) {
            return alert(response.message);
        }
        if (!response.error) {
            if (response.data?.likes) {
                return setLikeCount(response.data?.likes.length)
            }
            else
                return setLikeCount(0)
        } else {
            return alert(response.message);
        }
    };

    return (
        <div className="flex" >
            <div className="p-1.5 pl-2 font-extrabold">Comments</div>

            <button onClick={handleLike} className="text-blue-500 font-bold ml-auto flex items-center gap-3">
                {likeCount} Likes <span className="text-2xl">❤️</span>
            </button>

        </div>
    );
}
