"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { BlogContextType } from "@/types/BlogContext";
import { Blog } from "@/types/blog";
import { BlogFetchError } from "@/types/error";
import { useAuth } from "./AuthContext";

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
    const [blogError, setBlogError] = useState<BlogFetchError | null>(null);
    const { user } = useAuth()

    useEffect(() => {
        fetchAllBlogs();
    }, [user]);


    const fetchAllBlogs = async () => {
        try {
            const response = await fetch('http://localhost:2025/blog', {
                method: 'GET', // or 'POST', 'PUT', etc.
                credentials: 'include' // Ensures cookies are sent with the request
            });
            const data = await response.json();
            if (response.status === 200) {
                if (data.error) {
                    setBlogError(data)
                    return;
                }
                setBlogError(null)
                setAllBlogs(data.data);
            }
            else {
                setBlogError(data);
                return;
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setBlogError({ error: true, message: error.message || "An unknown error occurred" });
                return;
            } else {
                setBlogError({ error: true, message: "An unknown error occurred" });
                return;
            }
        }
    };

    return (
        <BlogContext.Provider value={{ allBlogs, setAllBlogs, blogError, setBlogError }}>
            {children}
        </BlogContext.Provider>
    );
}

export function useBlog() {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
}
