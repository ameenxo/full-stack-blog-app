import { useState } from "react";
import { createBlog } from "@/utility/api"


export default function BlogForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    if (!title || !content || !image || !tags) {
      alert("All fields are required!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("tags", tags);


    try {
      const response = await createBlog(formData);
      if (response.error) {
         alert(response.message);
         setIsLoading(false);
         return

      }
      setContent('');
      setImage(null);
      setTags('');
      setTitle('');
      alert(response.message);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to create blog.");
      setIsLoading(false)
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Blog tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Create Blog"}
      </button>
    </form>
  );
}
