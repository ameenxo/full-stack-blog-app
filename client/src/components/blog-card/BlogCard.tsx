import CommentSection from "@/components/comment-section/CommentSection";
import React from "react";
import { Blog } from "@/types/blog";
import CardHeader from "../CardHeader/CardHeader";
import CardImage from "../CardImage/CardImage";
import CardContent from "../CardContent/CardContent";
import { toggleLike } from "@/utility/api";

interface BlogCardProps {
    blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
    const [currentBlog, setCurrentBlog] = React.useState<Blog>(blog);
    const handleToggleLike = async (blogId: string) => {
        const { error, message, data } = await toggleLike(blogId);
        if (error) {
            alert(message);
        } else if (data) {
            setCurrentBlog(data);
        } else {
            alert("Something went wrong");
        }

    }
    
    return (

        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg min-w-[5px] lg:min-w-[450px] lg:max-w-[600px] ">
            <CardHeader />
            <CardImage imageUrl="somthing" likes={currentBlog.likes} toggleLike={handleToggleLike} blogId={currentBlog._id} />
            <div className="px-4 py-2">
                <CardContent content=" Apple AirPods" />
                <CommentSection blogId={currentBlog._id} blogAuthor={currentBlog.author} comments={currentBlog.comments} />
            </div>
        </div>
    )
}
