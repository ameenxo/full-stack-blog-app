import { Blog } from "./blog";
import { BlogFetchError } from "./error";
export interface BlogContextType {
  allBlogs: Blog[];
  setAllBlogs: (blogs: Blog[]) => void;
  blogError: BlogFetchError | null;
  setBlogError: (error: BlogFetchError | null) => void;
}
