import CommentSection from "@/components/comment-section/CommentSection";
import React from "react";
import { Blog } from "@/types/blog";
import CardHeader from "../CardHeader/CardHeader";
import CardImage from "../CardImage/CardImage";
import CardContent from "../CardContent/CardContent";

interface BlogCardProps {
    blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        // <div className="border rounded-lg shadow-md min-w-[380px] h-[600px] max-w-[400px]">
        //     <BlogHeader author={{ avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJ0rygTw_DT-j_Edu53eB2rDpkBROln0YCDFngUS2yPD9KkMCLZ9pn7wQkp0snRDoalA&usqp=CAU", username: "Ameen" }} />
        //     <div className="pr-2 pl-2">
        //         <BlogImage imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"} />
        //     </div>
        //     <h2 className="text-xl font-bold p-2">{blog.content}</h2>
        //     {/* <p className="text-gray-600">{blog.content}</p> */}
        //     <LikeButton blogId={blog._id} likes={blog.likes} />
        //     <CommentSection blogId={blog._id} comments={blog.comments} />
        // </div>
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg min-w-[5px] lg:min-w-[450px] lg:max-w-[600px] ">
            <CardHeader />
            <CardImage imageUrl="somthing" likes={500} />
            <div className="px-4 py-2">
                <CardContent content=" Apple AirPods" />
                <CommentSection blogId={blog._id} comments={blog.comments}/>
            </div>
        </div>
    )
}
