import axios from "axios";
import { ApiError } from "./error";
import { ApiResponse } from "@/types/api-response";
import { Blog } from "@/types/blog";
import { User } from "@/types/user";
import api from "./axios.config";
import { ChatMessage } from "@/types/message/chatMessageType";
import { RecentChatUser } from "@/types/message/recentChatUserType";

export const toggleLike = async (
  blogId: string
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.post(`/blog/like/${blogId}`, {});
    if (response.status === 200 && !response.data.error) {
      return {
        error: false,
        message: response.data.message,
        data: response.data.data, // Return the updated blog data
      };
    }
    throw new ApiError(response.data.message || "Failed to toggle like", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data?.message || "Failed to toggle like",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred",
    };
  }
};

export const addComment = async (
  blogId: string,
  comment: string
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.post(`blog/comment/${blogId}`, { comment });
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(response.data.message || "Failed to add comment", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data?.message || "Failed To Add Comment ",
      };
    } else {
      return {
        error: true,
        message: "An unexpected error occurred",
      };
    }
  }
};

export const deleteComment = async (
  blogId: string,
  commentId: string
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.delete(`/blog/comment/${blogId}/${commentId}`);
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(response.data.message || "Failed delete Comment", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data?.message || "Failed To Delete Comment ",
      };
    } else {
      return {
        error: true,
        message: "An unexpected error occurred when deleting the comment ",
      };
    }
  }
};

export const getOneBlog = async (
  blogId: string
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.get(`/blog/${blogId}`, {});
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(response.data.message || "Failed Get One Blog", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data?.message || "Failed To Get One Blog",
      };
    } else {
      return {
        error: true,
        message: "An unexpected error occurred when Get One Blog",
      };
    }
  }
};

export const createBlog = async (
  data: FormData
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.post("/blog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response.data.error) {
      throw new ApiError(response.data.message || "Failed create Blog", true);
    }
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(response.data.message || "Failed create Blog", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data.message || "Failed To  Create Blog ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when creating  the Blog",
    };
  }
};
export const deleteBlog = async (
  blogID: string
): Promise<ApiResponse<Blog>> => {
  try {
    const response = await api.post(`/blog/${blogID}`, {});
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(response.data.message || "Failed Delete Blog", true);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data.message || "Failed To Delete  Blog ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when Deleting  the Blog",
    };
  }
};

export const fetchUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get("/user/profile", {});
    if (response.status === 200 && !response.data.error) {
      return response.data;
    } else {
      throw new ApiError(
        response.data.message || "Failed to fetch user profile",
        true
      );
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data.message || "Failed To Delete  Blog ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when Deleting  the Blog",
    };
  }
};
export const UpdateUserProfile = async (data: {
  fullName: string;
  bio: string;
  country: string;
  avatar: File;
}): Promise<ApiResponse<User>> => {
  try {
    const response = await api.patch("/user/profile", { updates: data });
    if (response.status === 200 && !response.data.error) return response.data;
    else {
      throw new ApiError(
        response.data.message || "Failed to update user profile",
        true
      );
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data.message || "Failed To Delete  Blog ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when Deleting  the Blog",
    };
  }
};

export async function fetchChatHistory(
  userId: string
): Promise<ApiResponse<ChatMessage>> {
  try {
    const response = await api.get(`/messages/history/${userId}`);
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(
      response.data.message || "failed to fetch chat history",
      true
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data.message || "failed to fetch chat history",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when fetching chat history",
    };
  }
}
export async function fetchUnReadMassages(): Promise<
  ApiResponse<RecentChatUser>
> {
  try {
    const response = await api.get(`/messages/unread`);
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(
      response.data.message || "failed to fetch unread messages",
      true
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message:
          error.response?.data.message || "failed to fetch unread messages ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when fetching  unread messages",
    };
  }
}
export async function fetchRecentMassages(): Promise<
  ApiResponse<RecentChatUser>
> {
  try {
    const response = await api.get(`/messages/recent`);
    if (response.status === 200 && !response.data.error) {
      return response.data;
    }
    throw new ApiError(
      response.data.message || "failed to fetch recent messages",
      true
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: true,
        message: error.message,
      };
    } else if (axios.isAxiosError(error)) {
      return {
        error: true,
        message:
          error.response?.data.message || "failed to fetch recent messages ",
      };
    }
    return {
      error: true,
      message: "An unexpected error occurred when fetching recent messages",
    };
  }
}
