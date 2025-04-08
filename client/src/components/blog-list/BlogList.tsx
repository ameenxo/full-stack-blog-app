import BlogCard from "@/components/blog-card/BlogCard";
import { Blog } from "@/types/blog";

interface BlogListProps {
  blogs: Blog[]
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="w-full flex items-center flex-col gap-3 md:flex-row flex-wrap">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p>No blogs available.</p>
      )}


    </div>
  );
}
