import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaEllipsisH } from "react-icons/fa";
import { Blog } from "@/types/blog"; 



const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes.length);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg w-full max-w-lg">
      {/* 🔹 Header (User Info) */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="/default-avatar.png" // Change this if you have user avatars
            alt="Author"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h3 className="font-semibold">User ID: {blog.author}</h3>
            <p className="text-xs text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
          </div>
        </div>
        <FaEllipsisH className="text-gray-600 cursor-pointer" />
      </div>

      {/* 🔹 Blog Image */}
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt="Blog" className="w-full h-96 object-cover" />
      )}

      {/* 🔹 Like & Comment Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="focus:outline-none">
            {liked ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-2xl" />}
          </button>
          <button className="focus:outline-none">
            <FaComment className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* 🔹 Like Count */}
      <p className="px-4 font-semibold">{likesCount} likes</p>

      {/* 🔹 Title & Description */}
      <div className="px-4 py-2">
        <p className="font-semibold">{blog.title}</p>
        <p className="text-gray-700">{blog.content}</p>
      </div>

      {/* 🔹 Comments Count */}
      <p className="px-4 py-2 text-gray-500 text-sm cursor-pointer">
        View all {blog.commentCount} comments
      </p>
    </div>
  );
};

export default BlogCard;
