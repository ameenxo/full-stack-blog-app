import { Comment } from "./Comment";
export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    imageUrl: string;
    likes: string[]; // Array of user IDs who liked the post
    tags: string[];
    commentCount: number;
    comments:Comment []; // You can type this better if you define a Comment type
    createdAt: string; // ISO Date string
    __v: number;
  }
  