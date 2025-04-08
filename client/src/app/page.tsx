"use client"

import BlogList from "@/components/blog-list/BlogList";
import AuthError from "@/components/error/AuthError";
import { useAuth } from "@/Context/AuthContext";
import { useBlog } from "@/Context/BlogContext";

export default function Home() {

  const { authError } = useAuth();
  const { allBlogs, blogError } = useBlog();


  if (authError) return <AuthError error={null} />;
  if (blogError) return <AuthError error={blogError.message} />


  return (
    <div className="mt-20 mb-20">
      <BlogList blogs={allBlogs} />

    </div>
  );
}
